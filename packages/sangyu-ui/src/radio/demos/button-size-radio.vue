<docs>
---
title: 按钮尺寸
---

按钮单选在分组中同样支持 `small`、`default`、`large` 三种尺寸。
</docs>

<template>
	<div class="demo-grid">
		<div class="demo-block">
			<div class="demo-title">Small</div>
			<sy-radio-group v-model="smallValue" size="small">
				<sy-radio-button label="day">按天</sy-radio-button>
				<sy-radio-button label="week">按周</sy-radio-button>
				<sy-radio-button label="month">按月</sy-radio-button>
			</sy-radio-group>
		</div>

		<div class="demo-block">
			<div class="demo-title">Default</div>
			<sy-radio-group v-model="defaultValue">
				<sy-radio-button label="list">列表视图</sy-radio-button>
				<sy-radio-button label="board">看板视图</sy-radio-button>
				<sy-radio-button label="calendar">日历视图</sy-radio-button>
			</sy-radio-group>
		</div>

		<div class="demo-block">
			<div class="demo-title">Large</div>
			<sy-radio-group v-model="largeValue" size="large">
				<sy-radio-button label="basic">基础版</sy-radio-button>
				<sy-radio-button label="pro">专业版</sy-radio-button>
				<sy-radio-button label="team">团队版</sy-radio-button>
			</sy-radio-group>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SyRadioButton, SyRadioGroup } from 'sangyu-ui';
import { ref } from 'vue';

const smallValue = ref('week');
const defaultValue = ref('board');
const largeValue = ref('pro');
</script>

<style scoped>
.demo-grid {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.demo-block {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.demo-title {
	font-size: 14px;
	color: var(--sy-color-text-secondary);
}
</style>
