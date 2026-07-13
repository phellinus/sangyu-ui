<docs>
---
title: 异步搜索
---

传入 `remote-method` 后，组件会在用户停止输入后执行异步搜索。默认防抖时间为 300ms，新搜索开始时会通过 `AbortController` 取消上一次未完成的请求。
</docs>

<template>
	<div class="demo-stack">
		<sy-select
			v-model="value"
			filterable
			clearable
			:options="options"
			:remote-method="handleRemoteSearch"
			:remote-debounce="300"
			placeholder="输入组件名称"
			width="300px"
		>
			<template #loading>正在搜索...</template>
		</sy-select>
		<div class="current-value">当前值：{{ value || '未选择' }}</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import { SySelect } from '../index';
	import type { SelectOption, SelectValue } from '../Select.type';

	const value = ref<SelectValue>();

	const sourceOptions: SelectOption[] = [
		{ label: 'Button 按钮', value: 'button' },
		{ label: 'Input 输入框', value: 'input' },
		{ label: 'Select 选择器', value: 'select' },
		{ label: 'Table 表格', value: 'table' },
		{ label: 'Form 表单', value: 'form' },
		{ label: 'Dialog 对话框', value: 'dialog' },
		{ label: 'Pagination 分页', value: 'pagination' },
		{ label: 'Tooltip 文字提示', value: 'tooltip' },
	];

	const options = ref<SelectOption[]>(sourceOptions);

	/**
	 * 模拟一个支持 AbortSignal 的异步接口请求。
	 * @param timeout 模拟接口响应时间
	 * @param signal 取消请求使用的信号
	 */
	const wait = (timeout: number, signal: AbortSignal): Promise<void> => {
		return new Promise((resolve, reject) => {
			/** 清理定时器和取消事件监听 */
			const cleanup = () => {
				window.clearTimeout(timer);
				signal.removeEventListener('abort', handleAbort);
			};

			/** 请求取消时结束等待并抛出 AbortError */
			const handleAbort = () => {
				cleanup();
				reject(new DOMException('搜索请求已取消', 'AbortError'));
			};

			const timer = window.setTimeout(() => {
				cleanup();
				resolve();
			}, timeout);

			if (signal.aborted) {
				handleAbort();
				return;
			}

			signal.addEventListener('abort', handleAbort, { once: true });
		});
	};

	/**
	 * 根据用户输入的关键词异步筛选选项。
	 * @param query 当前搜索关键词
	 * @param signal 组件提供的请求取消信号
	 */
	const handleRemoteSearch = async (query: string, signal: AbortSignal): Promise<void> => {
		await wait(600, signal);

		const keyword = query.trim().toLowerCase();

		options.value = keyword
			? sourceOptions.filter((option) => option.label.toLowerCase().includes(keyword))
			: sourceOptions;
	};
</script>

<style scoped>
	.demo-stack {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.current-value {
		font-size: 13px;
		color: var(--sy-color-text-secondary);
	}
</style>
