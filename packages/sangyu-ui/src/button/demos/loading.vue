<docs>
---
    title: 加载状态
---

通过设置 `loading` 属性让按钮进入加载状态。加载时会显示旋转图标，同时禁止点击，适合提交表单、请求数据等需要避免重复操作的场景。

- 不传 `loading` 插槽时，使用组件内置的旋转图标。
- 通过 `#loading` 插槽可以替换为自定义加载内容。
- `loading` 支持动态绑定，可在异步操作完成后恢复按钮状态。

</docs>

<template>
	<div class="button-loading-demo">
		<div class="button-row">
			<sy-button loading type="filled">加载中</sy-button>
			<sy-button loading type="border" color="success">加载中</sy-button>
			<sy-button loading type="flat" color="warning">加载中</sy-button>
			<sy-button loading type="gradient" color="error">加载中</sy-button>
		</div>

		<div class="button-row">
			<sy-button :loading="submitting" @click="handleSubmit">
				{{ submitting ? '提交中' : '模拟异步提交' }}
			</sy-button>

			<sy-button loading type="border">
				<template #loading>
					<span class="custom-loading" aria-hidden="true">•••</span>
				</template>
				自定义加载
			</sy-button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeUnmount, ref } from 'vue';

	const submitting = ref(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const handleSubmit = () => {
		submitting.value = true;

		timer = setTimeout(() => {
			submitting.value = false;
		}, 1500);
	};

	onBeforeUnmount(() => {
		if (timer) clearTimeout(timer);
	});
</script>

<style scoped>
	.button-loading-demo {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.button-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}

	.custom-loading {
		display: inline-block;
		min-width: 20px;
		letter-spacing: 2px;
		animation: custom-loading-pulse 0.8s ease-in-out infinite alternate;
	}

	@keyframes custom-loading-pulse {
		from {
			opacity: 0.35;
			transform: translateY(1px);
		}

		to {
			opacity: 1;
			transform: translateY(-1px);
		}
	}
</style>
