<docs>
---
title: SyCard的插槽
---
SyCard的插槽包括3个，分别是：`header`、`body`、`footer`。
</docs>

<template>
	<div>
		<SyCard :custom-style="'width: 480px'">
			<template #header>三个插槽</template>
			这是重新调色后的淡白卡片。去除了所有的黄/棕色调，采用了纯净的白底搭配柔和的中性灰边框与阴影，整体感觉更加清新、极简且现代。
			<template #footer>
				<sy-button color="primary">确定</sy-button>
				<sy-button color="error">取消</sy-button>
			</template>
		</SyCard>
	</div>
</template>

<script lang="ts" setup>
	import { SyCard, SyButton } from 'sangyu-ui';
</script>
