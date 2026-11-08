# Tarball 消费者验证

本轮裁剪修复基线：`eb4c4a8358be202fa2d40e7dd9ac397e3cea60ed`，实现分支：`fix/v2-tree-shaking`。最初的消费者脚本来自 `test/v2-consumer-smoke`。

在仓库根目录运行：

```sh
pnpm install --frozen-lockfile
node scripts/consumer-smoke.mjs
```

根脚本 `pnpm test:consumer` 等价于上述 Node 命令，并已接入 `pnpm check`；Quality 工作流通过 `pnpm check` 执行同一门禁。下方体积数据是记录工具版本下的观察结果，不作为固定体积断言；请以当前运行生成的 `report.json` 为准。

需要项目当前的 Node 和 pnpm 环境。实测 Node `22.20.0`、pnpm `10.18.3`、Vue `3.5.24`、TypeScript `5.9.3`、vue-tsc `3.1.3`、Vite `7.3.5`、plugin-vue `6.0.1`。脚本从本 Worktree 的安装结果读取工具确切版本，不升级根依赖或修改根锁文件。

脚本依次对 icons、UI 执行 `pnpm pack`，由现有 `prepack` 先后构建两个包，因此运行时不需要提前构建。两个真实 tarball 位于每次新建的系统临时目录；消费者在其 `consumer/` 子目录中独立安装依赖。UI 和 icons 均使用显式 `file:../*.tgz`，并用 pnpm override 将 UI 的传递图标依赖指向同一个 icons tarball。

消费者锁文件以根锁文件为起点，移除 workspace importer，保留既有解析与完整性记录。生成消费者锁文件后，脚本拒绝任何不在根锁文件中的依赖版本，只有两个本地 tarball 例外；同时拒绝 `workspace:`、`link:`。随后使用 `--frozen-lockfile` 安装。安装优先复用缓存，缓存不完整时可能需要网络；不会退回 workspace 源码、其他 Worktree 的 node_modules 或 dist。消费者关闭安装脚本，实际 esbuild/Vite 构建仍必须成功。

验证内容：

- 通过 Node 实际导入两个包，严格比对当前 35 个 UI、74 个 icons ESM 公开值导出；检查默认插件、组件注册、Notification 服务安装与图标注册结果。
- 检查根入口、CSS 和 package.json 解析到消费者自己的 node_modules，检查 UI 内部解析到同一个 icons 安装结果。
- 通过独立 `tsconfig.json` 和 `vue-tsc --noEmit` 检查公开值导出的声明、默认插件、ButtonProps、实例方法、图标及 Vue SFC 模板。开启 strict，关闭 skipLibCheck，无 paths 或源码 alias；另有类型断言防止组件声明退化为 any、错误尺寸被放行。
- 通过 Vite 的正常生产构建消费 Vue SFC，显式引入 `sangyu-ui/style.css` 和 `@sangyu-ui/icons/style.css`，检查输出中确有按钮与图标 CSS。
- 分别构建纯 Vue 基线、仅 SyButton、仅 SySwitch、仅 SyAimIcon、按名称使用 SyIcon、完整 SFC；每个场景使用独立输出目录。打包后的 UI/icons 模块必须来自消费者 node_modules 内的 dist。
- 单按钮不能保留无关 UI 组件或图标，单 Switch 不能保留无关 UI 组件，单图标不能保留注册表及其他图标实现。结合非零 renderedLength 的包内模块、导出和组件名字串断言，不使用整个 chunk 的同名字串跨包归属，避免 UI 和 icons 的 SyTag 重名误判。
- 按名称使用 SyIcon 仍保留内置图标表；运行时验证首次查找前注册自定义覆盖、别名、恢复内置图标和默认完整插件安装，防止以破坏兼容性换取体积减少。

任何构建、安装、类型或断言失败都非零退出，无 skip 分支。成功和失败都保留临时目录供复核，脚本打印路径；需要时可自行清理对应目录。

## 测量方法与证据

`consumer/measurements.json` 记录每个生产 JS/CSS 文件的字节数、Node `gzipSync` 默认设置的压缩字节数、Rollup `chunk.modules` 中包模块的 `originalLength`、`renderedLength`、`renderedExports`、`removedExports`，以及归属到实际保留包模块的组件名字符串。`report.json` 汇总工具版本、根锁文件 SHA-256、tarball SHA-256、运行时解析结果和测量值。`consumer/pnpm-lock.yaml` 可用于对同一对 tarball 冻结重装；`consumer/dist/` 保留六组构建产物。

以下为上述工具版本的实测，单位为字节。JS 包含 Vue 和其余被保留依赖，CSS 是显式导入的整包样式；体积用于观察，不作为稳定断言。

| 场景         |      JS | JS gzip |    CSS | CSS gzip |
| ------------ | ------: | ------: | -----: | -------: |
| 纯 Vue       |  58,166 |  23,296 |      0 |        0 |
| 仅 SyButton  |  66,278 |  26,466 | 69,529 |   12,144 |
| 仅 SySwitch  | 118,427 |  35,805 | 69,529 |   12,144 |
| 仅 SyAimIcon |  59,247 |  23,668 |    312 |      220 |
| SyIcon name  | 110,792 |  32,953 |    312 |      220 |
| 完整 SFC     | 278,072 |  88,532 | 69,529 |   12,150 |

修复前，同一基线的单按钮 JS 为 278,265 字节，单图标为 108,956 字节；新增裁剪断言已在旧实现上真实失败。修复后，单按钮只保留按钮及必要工具实现，单图标只保留 SyAimIcon 实现，不再保留内置图标表和注册逻辑。两个包保留多模块 ESM，公开入口、完整插件与 CSS 路径不变；打包的内部依赖使用 vendor 路径，不泄漏 node_modules 布局或测试文件。

SySwitch 内部支持 SyIcon 动态名称，因此会保留内置图标集合，但不会保留无关 UI 组件。`removedExports` 只表示导出绑定被移除，不保证对应实现全部消失；组件名字符串是辅助证据，需要同时检查实际保留模块。整包 CSS 尚未拆分，不把本轮 JS 裁剪描述为 CSS 按需引入。

上述六场景通过的原始报告：`/var/folders/w7/jdnn2h_13r92qc61w3tsfntw0000gn/T/sangyu-consumer-COwWM5/report.json`。修复前失败证据：同一临时目录根下 `sangyu-consumer-jpYjL4/consumer/measurements.json`。临时目录不属于长期归档，重新运行会生成新路径、tarball SHA-256 和完整证据。

## 范围和限制

覆盖当前实际公开的 ESM 根入口、Vue/TS Bundler 解析、显式 CSS 引入和 Vite 构建；不制造 Provider、unstyled、composables 或其他未来入口。没有浏览器交互、视觉、SSR 渲染、CommonJS 或其他 TypeScript moduleResolution 模式验证。Vue 插件安装在 Node 中执行，页面是否挂载和交互正确不在本 smoke 范围内。

锁文件检查针对当前 pnpm v9 格式，未来格式变更会明确失败，需要维护脚本。公开值导出清单是当前 API 契约，API 有意变更时应同步更新 fixture。消费者安装会用网络补齐缓存；没有网络且缓存不完整时会明确失败。
