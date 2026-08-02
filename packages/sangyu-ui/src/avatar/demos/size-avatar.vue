<docs>
---
 title: SyAvatar的size尺寸
---

通过 size 控制头像的尺寸，同时同步调整文本字号，可搭配 shape 与配色组合展示。
</docs>

<template>
	<div class="avatar-size-demo">
		<div class="avatar-row">
			<div class="avatar-item">
				<SyAvatar :size="40">
					<template #text>AB</template>
				</SyAvatar>
				<span class="avatar-label">40px</span>
			</div>
			<div class="avatar-item">
				<SyAvatar :size="60" shape="circle" bgcolor="success" color="#ffffff">
					<template #text>CD</template>
				</SyAvatar>
				<span class="avatar-label">60px</span>
			</div>
			<div class="avatar-item">
				<SyAvatar
					:size="80"
					shape="circle"
					src="https://sangyuoj.oss-cn-hangzhou.aliyuncs.com/oj/avatar/eed4d937295b4264bd13ee8ea716630f.png"
				></SyAvatar>
				<span class="avatar-label">80px</span>
			</div>
			<div class="avatar-item">
				<SyAvatar :size="96" bgcolor="primary" color="#ffffff">
					<template #text>GH</template>
				</SyAvatar>
				<span class="avatar-label">96px</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SyAvatar } from 'sangyu-ui';
</script>

<style scoped>
.avatar-size-demo {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.avatar-row {
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
}

.avatar-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
}

.avatar-label {
	font-size: 12px;
	color: #6a7076;
}
</style>
