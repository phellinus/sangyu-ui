<docs>
---
title: SyIcon 参数示例
---
`SyIcon` 支持以下核心参数：

- `name`: 内置图标的注册名，和上方列表一致。
- `component`: 直接传入一个 SVG/Vue 组件，跳过 name 解析。
- `size`: 数字（px）或字符串（如 `1.5em`），用于控制宽高与字体大小。
- `color`: 传入任意 CSS 颜色，内部使用 `currentColor` 统一驱动 stroke/fill。
- `strokeWidth`: 覆盖原始 SVG 的描边粗细。
- `spin`: 让图标以 1s 线性动画旋转（适合 loading）。
- `default slot`: 当 `name` / `component` 都缺失时可渲染占位内容。
</docs>

<template>
	<div class="icon-use">
		<section class="demo-card">
			<header>
				<h3>属性联动</h3>
				<p>通过 v-model 控制 name / size / color / strokeWidth / spin。</p>
			</header>

			<div class="live-preview">
				<SyIcon v-bind="controls" class="live-icon" :style="{ color: controls.color }" />
				<div class="preview-meta">
					<div>
						<strong>name:</strong>
						{{ controls.name }}
					</div>
					<div>
						<strong>size:</strong>
						{{ controls.size }}px
					</div>
					<div>
						<strong>stroke:</strong>
						{{ controls.strokeWidth || '默认' }}
					</div>
					<div>
						<strong>spin:</strong>
						{{ controls.spin ? '是' : '否' }}
					</div>
				</div>
			</div>

			<form class="control-panel" @submit.prevent>
				<label>
					名称
					<select v-model="controls.name">
						<option v-for="option in nameOptions" :key="option" :value="option">
							{{ option }}
						</option>
					</select>
				</label>
				<label>
					尺寸 {{ controls.size }}px
					<input v-model.number="controls.size" type="range" min="16" max="120" />
				</label>
				<label>
					颜色
					<input v-model="controls.color" type="color" />
				</label>
				<label>
					描边宽度
					<input v-model.number="controls.strokeWidth" type="number" min="1" max="8" />
				</label>
				<label class="checkbox">
					<input v-model="controls.spin" type="checkbox" />
					启用旋转
				</label>
			</form>
		</section>

		<section class="demo-card">
			<header>
				<h3>component / slot</h3>
				<p>直接传组件或使用默认插槽自定义占位。</p>
			</header>

			<div class="example-row">
				<div class="example">
					<p class="label">component</p>
					<SyIcon :component="SyLike" size="40" color="#FF6B6B" />
				</div>
				<div class="example">
					<p class="label">name + spin</p>
					<SyIcon name="loading" :size="36" color="#165DFF" :stroke-width="4" spin />
				</div>
				<div class="example">
					<p class="label">slot fallback</p>
					<SyIcon :size="40">
						<span class="slot-fallback">?</span>
					</SyIcon>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';
	import { SyIcon, SyLike } from '@sangyu-ui/icons';

	const nameOptions = ['aim', 'loading', 'loading-four', 'search', 'share', 'like', 'close', 'tag'];

	const controls = reactive({
		name: 'loading',
		size: 44,
		color: '#000000',
		strokeWidth: 4,
		spin: true,
	});
</script>

<style lang="less" scoped>
	.icon-use {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.demo-card {
		padding: 20px;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 16px;
		background: #fff;

		header {
			margin-bottom: 16px;

			h3 {
				margin: 0;
				font-size: 16px;
			}

			p {
				margin: 4px 0 0;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.55);
			}
		}
	}

	.live-preview {
		display: flex;
		align-items: center;
		gap: 18px;
		margin-bottom: 18px;
	}

	.live-icon {
		font-size: 0;
		width: 72px;
		height: 72px;
		display: grid;
		place-items: center;
		border-radius: 16px;
		background: rgba(22, 93, 255, 0.08);
	}

	.preview-meta {
		font-size: 13px;
		line-height: 1.6;
	}

	.control-panel {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 12px 16px;

		label {
			display: flex;
			flex-direction: column;
			gap: 6px;
			font-size: 13px;

			input,
			select {
				height: 34px;
				border-radius: 8px;
				border: 1px solid rgba(0, 0, 0, 0.1);
				padding: 0 10px;
				font-size: 14px;
			}

			input[type='range'] {
				padding: 0;
				height: auto;
			}

			input[type='color'] {
				padding: 0 4px;
			}
		}

		.checkbox {
			flex-direction: row;
			align-items: center;
			gap: 8px;
		}
	}

	.example-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 16px;
	}

	.example {
		border: 1px dashed rgba(0, 0, 0, 0.1);
		border-radius: 12px;
		padding: 16px;
		text-align: center;
	}

	.label {
		margin-bottom: 10px;
		font-size: 13px;
		color: rgba(0, 0, 0, 0.6);
	}

	.slot-fallback {
		font-size: 18px;
		font-weight: 600;
	}
</style>
