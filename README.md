# Claude Motion — Remotion 复刻

用 [Remotion](https://www.remotion.dev/) 逐帧重建一段 **30 秒 / 1280×720 / 30fps** 的动效编辑器演示录屏，并额外配了一段**程序化合成的 120 BPM 音轨**，用节拍驱动片中的缩放、弹跳、贴纸弹出与播放头脉冲。

所有画面元素（编辑器 UI、手机插画、小怪兽、手写贴纸、时间轴波形）与声音都是代码生成的，**不依赖任何外部素材、字体文件或网络请求**。

## 复刻规格

| 项 | 值 |
| --- | --- |
| 画幅 / 帧率 / 时长 | 1280×720 / 30fps / 900 帧（30s） |
| 底色 | 奶油米白 `#F5F1E7`，描边深灰 `#2F2C28` |
| 强调色 | 砖红 `#C9563F`、亮黄 `#F6C445`、青绿 `#2FA99B`、夜空蓝紫 `#241F4B`、时间轴紫 `#8A7BD8` |
| 字体 | 楷体 / 手写体优先的系统字体栈，配合轻微旋转与描边模拟原片涂鸦感 |
| 构图 | 顶栏 + 左侧素材库 + 中央手机预览 + 右侧属性面板 + 底部双轨时间轴 |
| 节奏 | 0–2s 代码窗口开场 → 2–27s 编辑器操作（每小节切换场景/贴纸）→ 27–30s 便签片尾 |

### 时间轴分段（`src/Main.tsx`）

- `0–60f`：Mac 风格代码窗口，逐字打出 `const 剪辑软件 = 小克.写代`，红色光标按拍闪烁
- `60–90f`：界面从中心缩放展开（spring 转场）
- `90–810f`：编辑器主段。手机场景按小节轮播（星空猫 → 拉面 → 柴犬 → 霓虹舞台），涂鸦贴纸逐小节弹出，红色路径箭头绘制，小怪兽沿播放头移动并按拍弹跳
- `810–900f`：`30 秒剪完，Opus 5.5 / — 小克 收工` 便签卡 + 舞台版手机 + 挥手小怪兽

## 音乐与卡点

`scripts/make-beat.py` 用 numpy 从正弦、噪声与包络直接合成 30 秒立体声 WAV，无采样、无版权素材：

- **120 BPM** → 每拍 0.5s = **15 帧**，每小节 2s = **60 帧**，全片 15 小节
- 音色：kick（扫频正弦）、snare（高通噪声 + 音调）、hihat（双差分噪声）、bass、pluck arp、pad
- 编排：0–2s 只有底鼓 → 2–8s 加军鼓/贝斯 → 8–20s 加和弦琶音 → 20–26s 全奏与段落重音 → 26–30s 收束
- 和弦进行 Am–F–C–G，每小节一换

`src/beat.ts` 把 BPM 换算成帧号工具（`beatIndex` / `beatPulse` / `barIndex`），所有卡点动效都读同一套常量，改 BPM 时音轨与画面一起对齐。卡点表现：

- 每拍：小怪兽弹跳、播放头脉冲、底部黄色节拍三角依次点亮、整体轻微呼吸缩放
- 每小节：手机场景切换、涂鸦贴纸 spring 弹出、素材面板选中态切换
- 每 4 小节：段落重音时全屏极轻微闪白 + 红色路径箭头重绘

## 运行

```bash
npm install
npm run dev          # 打开 Remotion Studio 实时预览
```

渲染成片：

```bash
npm run render       # -> out/claude-motion.mp4
```

其他：

```bash
npm run still        # 导出第 840 帧海报 -> out/poster.png
npm run audio        # 重新合成 public/beat.wav（需 Python 3 + numpy）
npm run typecheck    # TypeScript 类型检查
```

也可直接指定参数：

```bash
npx remotion render ClaudeMotion out/claude-motion.mp4 --codec=h264 --fps=30 --crf=18
```

## 目录

```
src/
  index.ts                # registerRoot
  Root.tsx                # <Composition> 定义
  Main.tsx                # 总时间线 + 音乐 + 全局卡点
  theme.ts                # 配色与字体常量
  beat.ts                 # BPM / 帧 / 节拍工具
  components/
    EditorShell.tsx       # 编辑器外框（顶栏 + 左右面板）
    Timeline.tsx          # 双轨时间轴、播放头、节拍三角
    Phone.tsx             # 手机外壳与播放控件
    Scenes.tsx            # 四组纯 SVG 插画场景
    Monster.tsx           # 砖红色小怪兽
    Stickers.tsx          # 手写涂鸦贴纸
    Arrows.tsx            # 红色运动路径箭头
    IntroCard.tsx         # 开场代码窗口
    OutroCard.tsx         # 片尾便签
public/beat.wav           # 合成音轨
scripts/make-beat.py      # 音轨生成脚本
```

## 说明

- 中文手写观感依赖本机字体栈（楷体/华文楷体/微软雅黑）。换机器渲染时字形会略有差异，布局与动效不受影响。
- 仓库内不含任何参考视频、外部链接或访问凭证；参考素材仅用于本地比对，不随源码分发。
