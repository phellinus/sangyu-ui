# Tarball 消费者验证

基线：`bf346537040a763904cd69dbcd8d9b103776ca28`，实现分支：`test/v2-consumer-smoke`。

在仓库根目录运行：

```sh
pnpm install --frozen-lockfile
node scripts/consumer-smoke.mjs
```

需要项目当前的 Node 和 pnpm 环境。实测 Node `22.20.0`、pnpm `10.18.3`、Vue `3.5.24`、TypeScript `5.9.3`、vue-tsc `3.1.3`、Vite `7.3.5`、plugin-vue `6.0.1`。脚本从本 Worktree 的安装结果读取工具确切版本，不升级根依赖或修改根锁文件。

脚本依次对 icons、UI 执行 `pnpm pack`，由现有 `prepack` 先后构建两个包，因此运行时不需要提前构建。两个真实 tarball 位于每次新建的系统临时目录；消费者在其 `consumer/` 子目录中独立安装依赖。UI 和 icons 均使用显式 `file:../*.tgz`，并用 pnpm override 将 UI 的传递图标依赖指向同一个 icons tarball。

消费者锁文件以根锁文件为起点，移除 workspace importer，保留既有解析与完整性记录。生成消费者锁文件后，脚本拒绝任何不在根锁文件中的依赖版本，只有两个本地 tarball 例外；同时拒绝 `workspace:`、`link:`。随后使用 `--frozen-lockfile` 安装。安装优先复用缓存，缓存不完整时可能需要网络；不会退回 workspace 源码、其他 Worktree 的 node_modules 或 dist。消费者关闭安装脚本，实际 esbuild/Vite 构建仍必须成功。

验证内容：

- 通过 Node 实际导入两个包，严格比对当前 35 个 UI、74 个 icons ESM 公开值导出；检查默认插件、组件注册、Notification 服务安装与图标注册结果。
- 检查根入口、CSS 和 package.json 解析到消费者自己的 node_modules，检查 UI 内部解析到同一个 icons 安装结果。
- 通过独立 `tsconfig.json` 和 `vue-tsc --noEmit` 检查公开值导出的声明、默认插件、ButtonProps、实例方法、图标及 Vue SFC 模板。开启 strict，关闭 skipLibCheck，无 paths 或源码 alias；另有类型断言防止组件声明退化为 any、错误尺寸被放行。
- 通过 Vite 的正常生产构建消费 Vue SFC，显式引入 `sangyu-ui/style.css` 和 `@sangyu-ui/icons/style.css`，检查输出中确有按钮与图标 CSS。
- 分别构建纯 Vue 基线、仅 SyButton、仅 SyAimIcon、完整 SFC；每个场景使用独立输出目录。打包后的 UI/icons 模块必须来自消费者 node_modules 内的 dist。

任何构建、安装、类型或断言失败都非零退出，无 skip 分支。成功和失败都保留临时目录供复核，脚本打印路径；需要时可自行清理对应目录。

## 测量方法与证据

`consumer/measurements.json` 记录每个生产 JS/CSS 文件的字节数、Node `gzipSync` 默认设置的压缩字节数、Rollup `chunk.modules` 中包模块的 `originalLength`、`renderedLength`、`renderedExports`、`removedExports`，以及产物中的组件名字符串。`report.json` 汇总工具版本、根锁文件 SHA-256、tarball SHA-256、运行时解析结果和测量值。`consumer/pnpm-lock.yaml` 可用于对同一对 tarball 冻结重装；`consumer/dist/` 保留四组构建产物。

以下为上述基线、上述工具版本的实测，单位为字节。JS 包含 Vue 和其余被保留依赖，CSS 是显式导入的整包样式；体积用于观察，不作为稳定断言。

| 场景         |      JS | JS gzip |    CSS | CSS gzip |
| ------------ | ------: | ------: | -----: | -------: |
| 纯 Vue       |  58,166 |  23,296 |      0 |        0 |
| 仅 SyButton  | 308,894 |  96,945 | 69,529 |   12,144 |
| 仅 SyAimIcon | 108,956 |  32,007 |    312 |      220 |
| 完整 SFC     | 309,956 |  97,501 | 69,529 |   12,150 |

仅 SyAimIcon 场景中，Rollup 保留 icons 模块的 71 个导出，仅移除 `SyIcon`、`getIconComponent`、`listRegisteredIcons`。非所选图标 `SyHome`、`SyZoomOut` 等仍在保留清单和产物名称字符串中。结合 icons 根入口调用 `registerIcons(builtInIcons)`，可判断当前全局注册保留了内置图标集合，影响单图标 tree-shaking。本任务只报告，不改变注册架构。

仅 SyButton 场景中，UI 模块仍有 23 个 renderedExports，icons 模块有 73 个；例如未主动导入的 `SyTable`、`SyMenu`、`SyHome` 仍被保留。因此当前根入口的单组件导入也不是最小组件产物。`removedExports` 只表示导出绑定被移除，不保证对应实现全部消失。组件名字符串是辅助证据，不能独立代表组件计数，尤其 UI 和 icons 存在同名 `SyTag`。

最近一次完整通过的原始报告：`/var/folders/w7/jdnn2h_13r92qc61w3tsfntw0000gn/T/sangyu-consumer-Dcjiex/report.json`。

该次 UI tarball SHA-256：`7c98aa9868623e07b69fe704d535db4fd9b1fbce466c898f5721ef2ce085586b`；icons：`65a25fb844313dbab08329d60b6d12bc1d1974c971e638fae313d908496f64ed`。临时目录不属于长期归档，重新运行会生成新路径和完整证据。

## 范围和限制

覆盖当前实际公开的 ESM 根入口、Vue/TS Bundler 解析、显式 CSS 引入和 Vite 构建；不制造 Provider、unstyled、composables 或其他未来入口。没有浏览器交互、视觉、SSR 渲染、CommonJS 或其他 TypeScript moduleResolution 模式验证。Vue 插件安装在 Node 中执行，页面是否挂载和交互正确不在本 smoke 范围内。

锁文件检查针对当前 pnpm v9 格式，未来格式变更会明确失败，需要维护脚本。公开值导出清单是当前 API 契约，API 有意变更时应同步更新 fixture。消费者安装会用网络补齐缓存；没有网络且缓存不完整时会明确失败。
