<template>
	<div class="draft-form">
		<label for="drawer-draft-input">临时内容</label>
		<input id="drawer-draft-input" v-model="draft" placeholder="输入内容后关闭抽屉" />
		<span>当前内容：{{ draft || '暂无内容' }}</span>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 状态保存在抽屉的子组件中用于观察销毁效果
const draft = ref('');
</script>

<style scoped>
.draft-form {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.draft-form input {
	box-sizing: border-box;
	width: 100%;
	padding: 9px 12px;
	border: 1px solid var(--sy-color-border);
	border-radius: 8px;
}

.draft-form span {
	font-size: 13px;
	color: var(--sy-color-text-secondary);
}
</style>
