<docs>
---
title: SyCard的基础用法
---
</docs>

<template>
	<div>
		<SyCard :custom-style="'width: 480px'">
			<template #header>基础卡片</template>
			这是重新调色后的淡白卡片。去除了所有的黄/棕色调，采用了纯净的白底搭配柔和的中性灰边框与阴影，整体感觉更加清新、极简且现代。
		</SyCard>
	</div>
</template>

<script lang="ts" setup>
	import { SyCard } from 'sangyu-ui';
</script>
