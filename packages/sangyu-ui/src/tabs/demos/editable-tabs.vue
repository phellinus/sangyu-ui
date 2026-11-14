<template>
	<SyTabs v-model="current" type="card" removable editable show-add-button @remove="remove" @add="add">
		<SyTabPane
			v-for="tab in tabs"
			:key="tab.name"
			:name="tab.name"
			:title="tab.title"
			:closable="tab.name !== 'home'"
		>
			{{ tab.title }}的内容
		</SyTabPane>
	</SyTabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyTabs, SyTabPane } from 'sangyu-ui';

const current = ref('home');
const tabs = ref([
	{ name: 'home', title: '首页' },
	{ name: 'draft', title: '草稿' },
]);
let nextId = 1;
const add = () => {
	const name = `new-${nextId++}`;
	tabs.value.push({ name, title: `新标签 ${nextId - 1}` });
	current.value = name;
};
const remove = (name: string | number) => {
	tabs.value = tabs.value.filter((tab) => tab.name !== name);
	if (current.value === name) current.value = tabs.value[0]?.name ?? '';
};
</script>
