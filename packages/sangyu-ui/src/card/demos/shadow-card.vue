<docs>
---
title: SyCard的插槽
---
SyCard的插槽包括3个，分别是：`header`、`body`、`footer`。
</docs>

<template>
	<div style="display: flex; gap: 30px">
		<SyCard :custom-style="'width: 240px'">
			<template #header>shadow:always</template>
			这是重新调色后的淡白卡片。去除了所有的黄/棕色调，采用了纯净的白底搭配柔和的中性灰边框与阴影，整体感觉更加清新、极简且现代。
		</SyCard>
		<SyCard :custom-style="'width: 240px'" shadow="hover">
			<template #header>shadow:hover</template>
			这是重新调色后的淡白卡片。去除了所有的黄/棕色调，采用了纯净的白底搭配柔和的中性灰边框与阴影，整体感觉更加清新、极简且现代。
		</SyCard>
		<SyCard :custom-style="'width: 240px'" shadow="never">
			<template #header>shadow:never</template>
			这是重新调色后的淡白卡片。去除了所有的黄/棕色调，采用了纯净的白底搭配柔和的中性灰边框与阴影，整体感觉更加清新、极简且现代。
		</SyCard>
	</div>
</template>

<script lang="ts" setup>
	import { SyCard } from 'sangyu-ui';
</script>
