# SyCollapse 折叠面板

使用 `SyCollapse` 和 `SyCollapseItem` 组合内容。每个面板必须提供唯一的 `name`。

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SyCollapse, SyCollapseItem } from 'sangyu-ui';
const open = ref<(string | number)[]>(['guide']);
</script>

<template>
	<SyCollapse v-model="open">
		<SyCollapseItem name="guide">
			<template #header>使用指南</template>
			指南内容
		</SyCollapseItem>
		<SyCollapseItem name="faq" lazy>
			<template #header>常见问题</template>
			<template #extra><a href="/help">帮助</a></template>
			常见问题内容
		</SyCollapseItem>
	</SyCollapse>
</template>
```

`accordion` 模式下，绑定值为单个 `string | number | undefined`；默认多开模式下为 `name[]`。省略 `modelValue` 时，可用 `defaultValue` 指定初始展开项。`update:modelValue` 和 `change` 返回同形状的值。

`disabled` 阻止切换。默认内容始终挂载；设置 `lazy` 后，内容在首次展开时挂载，之后保持挂载。删除面板会清理其展开值。

面板标题使用原生按钮，支持键盘操作。`#expand-icon="{ expanded }"` 可替换右侧图标；`#extra` 位于按钮外，点击不会切换面板。
