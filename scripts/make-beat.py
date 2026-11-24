#!/usr/bin/env python3
"""Synthesize the 30s / 120 BPM soundtrack for the Remotion composition.

Every sound is generated from math (sine sweeps, shaped noise, envelopes).
No samples, no network, no licensing concerns.

    python scripts/make-beat.py    ->    public/beat.wav
"""

from __future__ import annotations

import math
import os
import wave

import numpy as np

SR = 44_100
DURATION = 30.0
BPM = 120.0
BEAT = 60.0 / BPM          # 0.5 s == 15 frames @ 30fps
BAR = BEAT * 4             # 2.0 s == 60 frames
N = int(SR * DURATION)
t = np.arange(N) / SR

rng = np.random.default_rng(20261124)
left = np.zeros(N, dtype=np.float64)
right = np.zeros(N, dtype=np.float64)


def add(start: float, buf: np.ndarray, gain: float = 1.0, pan: float = 0.0) -> None:
    """Mix a mono buffer into the stereo bus at `start` seconds.

    pan: -1 (left) .. +1 (right), equal-power law.
    """
    i = int(start * SR)
    if i >= N or i < 0:
        return
    j = min(N, i + len(buf))
    seg = buf[: j - i] * gain
    gl = math.cos((pan + 1) * math.pi / 4)
    gr = math.sin((pan + 1) * math.pi / 4)
    left[i:j] += seg * gl
    right[i:j] += seg * gr


def kick(dur: float = 0.42) -> np.ndarray:
    n = int(SR * dur)
    x = np.arange(n) / SR
    freq = 150.0 * np.exp(-x * 28.0) + 48.0
    phase = 2.0 * np.pi * np.cumsum(freq) / SR
    body = np.sin(phase) * np.exp(-x * 9.0)
    click = rng.normal(0, 1, n) * np.exp(-x * 180.0) * 0.22
    return (body * 0.92 + click) * 0.88


def snare(dur: float = 0.24) -> np.ndarray:
    n = int(SR * dur)
    x = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    noise = np.diff(np.concatenate([[0.0], noise]))       # crude high-pass
    tone = np.sin(2.0 * np.pi * 190.0 * x) * np.exp(-x * 18.0) * 0.32
    return (noise * np.exp(-x * 22.0) * 0.42 + tone) * 0.62


def hat(dur: float = 0.08, bright: float = 1.0) -> np.ndarray:
    n = int(SR * dur)
    x = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    noise = np.diff(np.concatenate([[0.0], noise]))
    noise = np.diff(np.concatenate([[0.0], noise]))       # brighter metallic hiss
    return noise * np.exp(-x * (60.0 / bright)) * 0.20


def bass(freq: float, dur: float = 0.40) -> np.ndarray:
    n = int(SR * dur)
    x = np.arange(n) / SR
    env = np.exp(-x * 4.5) * (1.0 - np.exp(-x * 180.0))
    wave = (
        np.sin(2.0 * np.pi * freq * x)
        + 0.25 * np.sin(2.0 * np.pi * freq * 2.0 * x)
        + 0.15 * np.sin(2.0 * np.pi * freq * 0.5 * x)
    )
    return wave * env * 0.30


def pluck(freq: float, dur: float = 0.52) -> np.ndarray:
    n = int(SR * dur)
    x = np.arange(n) / SR
    env = np.exp(-x * 5.0) * (1.0 - np.exp(-x * 300.0))
    wave = (
        np.sin(2.0 * np.pi * freq * x)
        + 0.40 * np.sin(2.0 * np.pi * 2.0 * freq * x)
        + 0.18 * np.sin(2.0 * np.pi * 3.0 * freq * x)
    )
    return wave * env * 0.15


def pad(freqs: list[float], dur: float = 1.95) -> np.ndarray:
    n = int(SR * dur)
    x = np.arange(n) / SR
    env = np.minimum(1.0, x / 0.18) * np.exp(-np.maximum(0.0, x - 1.2) * 3.0)
    out = np.zeros(n)
    for f in freqs:
        out += np.sin(2.0 * np.pi * f * x + 0.3 * np.sin(2.0 * np.pi * 0.4 * x)) * 0.5
    return out * env * 0.085


# Am - F - C - G, one chord per bar.
CHORDS: list[list[float]] = [
    [220.00, 261.63, 329.63],
    [174.61, 220.00, 261.63],
    [261.63, 329.63, 392.00],
    [196.00, 246.94, 293.66],
]

bars = int(DURATION / BAR)   # 15 bars

for b in range(bars):
    t0 = b * BAR
    chord = CHORDS[b % len(CHORDS)]
    root = chord[0] / 2.0

    if 4 <= b < 14:
        add(t0, pad(chord), pan=0.0)

    for k in range(4):
        bt = t0 + k * BEAT
        add(bt, kick(), gain=1.0 if k == 0 else 0.80)

        if b >= 1 and k in (1, 3):
            add(bt, snare(), gain=0.90)

        add(bt, hat(0.075), gain=0.78 if b >= 2 else 0.42, pan=0.25)
        if b >= 2:
            add(bt + BEAT / 2, hat(0.055, 1.3), gain=0.55, pan=-0.25)

        if b >= 1 and k in (0, 2):
            add(bt, bass(root if k == 0 else root * 1.5))

        if 4 <= b < 13:
            add(
                bt,
                pluck(chord[(k + b) % 3] * 2.0),
                pan=-0.30 if k % 2 else 0.30,
            )

        # Section accents every four bars once the full arrangement is in.
        if b >= 8 and k == 0 and b % 4 == 0:
            add(bt, snare(0.34), gain=0.65)

    # A short riser at each section boundary.
    if b in (3, 7, 11, 13):
        add(t0 + BAR - 0.5, hat(0.48, 3.2), gain=1.10)

fade = np.minimum(1.0, t / 0.05) * np.minimum(1.0, (DURATION - t) / 0.65)
left *= fade
right *= fade

peak = max(float(np.max(np.abs(left))), float(np.max(np.abs(right))), 1e-9)
scale = min(1.0, 0.89 / peak)
left *= scale
right *= scale

stereo = np.empty(N * 2, dtype=np.float64)
stereo[0::2] = left
stereo[1::2] = right
pcm = (np.clip(stereo, -1.0, 1.0) * 32767).astype("<i2")

here = os.path.dirname(os.path.abspath(__file__))
public = os.path.normpath(os.path.join(here, "..", "public"))
os.makedirs(public, exist_ok=True)
out_path = os.path.join(public, "beat.wav")

with wave.open(out_path, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())

print(f"wrote {out_path}  ({os.path.getsize(out_path) / 1024 / 1024:.2f} MiB, "
      f"{DURATION:.0f}s @ {SR} Hz, {BPM:.0f} BPM, {bars} bars)")
