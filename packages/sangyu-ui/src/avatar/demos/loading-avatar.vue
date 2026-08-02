<docs>
---
 title: SyAvatar的loading用法
---

loading 状态会在头像上层显示转圈，并使用浅灰背景提示加载中，适合图片请求中的占位。
</docs>

<template>
	<div class="avatar-loading-demo">
		<div class="avatar-row">
			<SyAvatar loading>
				<template #text>AB</template>
			</SyAvatar>
			<SyAvatar loading bgcolor="success" color="#f5f7f8">
				<template #text>CD</template>
			</SyAvatar>
			<SyAvatar loading bgcolor="error" color="#f5f7f8">
				<template #text>EF</template>
			</SyAvatar>
			<SyAvatar loading bgcolor="warning" color="#f5f7f8">
				<template #text>GH</template>
			</SyAvatar>
			<SyAvatar loading bgcolor="primary" color="#f5f7f8">
				<template #text>IJ</template>
			</SyAvatar>
			<SyAvatar loading icon="camera" bgcolor="success" color="#f5f7f8"></SyAvatar>
			<SyAvatar
				loading
				src="https://sangyuoj.oss-cn-hangzhou.aliyuncs.com/oj/avatar/312062759d2f4e099eaf79bc9cfdfbad.jpeg"
			></SyAvatar>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SyAvatar } from 'sangyu-ui';
</script>

<style scoped>
.avatar-loading-demo {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.avatar-row {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}
</style>
