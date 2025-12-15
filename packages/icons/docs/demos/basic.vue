<docs>
---
title: 图标库
---
图标的基本用法（点击卡片复制 name）
</docs>

<template>
	<div class="icon-page">
		<div class="icon-grid">
			<button
				v-for="name in iconNames"
				:key="name"
				class="icon-card"
				type="button"
				:title="`点击复制：${name}`"
				@click="copyName(name)"
			>
				<div class="icon-preview">
					<sy-icon :name="name" />
				</div>
				<div class="icon-name">
					{{ name }}
				</div>
			</button>
		</div>
		<div v-if="toast.show" class="toast" role="status" aria-live="polite">已复制：{{ toast.text }}</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';
	import { SyIcon } from '@sangyu-ui/icons';

	const iconNames = [
		'aim',
		'all-application',
		'arrow-down',
		'arrow-left-down',
		'arrow-left-up',
		'arrow-left',
		'arrow-right-down',
		'arrow-right-up',
		'arrow-right',
		'arrow-up',
		'bill',
		'book-mark',
		'bookmark-one',
		'camera',
		'check-one',
		'check-small',
		'check',
		'close-one',
		'close-small',
		'close',
		'config',
		'delete-two',
		'dislike-two',
		'dislike',
		'equalizer',
		'female',
		'hamburger-button',
		'home',
		'hourglass-full',
		'hourglass-null',
		'lightning',
		'like',
		'loading-four',
		'loading',
		'male',
		'more-app',
		'more-one',
		'more-two',
		'more',
		'pic',
		'power',
		'preview-close-one',
		'preview-close',
		'preview-open',
		'radar',
		'refresh',
		'rss',
		'save-one',
		'save',
		'search',
		'setting-config',
		'setting-one',
		'setting-three',
		'setting-two',
		'setting',
		'share-three',
		'share',
		'sleep',
		'system',
		'tag-one',
		'tag',
		'tips',
		'tool',
		'translate',
		'unlike',
		'waterfalls-h',
		'waterfalls-v',
		'zoom-in',
		'zoom-out',
	];

	const toast = reactive({ show: false, text: '' });
	let toastTimer: number | undefined;

	async function copyName(name: string) {
		// 优先用 Clipboard API（需要 https 或 localhost）
		try {
			await navigator.clipboard.writeText(name);
		} catch {
			// 兜底：老浏览器/非安全环境
			const ta = document.createElement('textarea');
			ta.value = name;
			ta.setAttribute('readonly', 'true');
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			document.execCommand('copy');
			document.body.removeChild(ta);
		}

		toast.text = name;
		toast.show = true;
		window.clearTimeout(toastTimer);
		toastTimer = window.setTimeout(() => (toast.show = false), 1200);
	}
</script>

<style lang="less" scoped>
	.icon-page {
		position: relative;
	}

	.icon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
		gap: 12px;
	}

	.icon-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding: 14px 10px;
		border-radius: 14px;
		border: 1px solid rgba(0, 0, 0, 0.08);
		background: #fff;
		cursor: pointer;

		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			border-color 0.12s ease;
		user-select: none;

		&:hover {
			transform: translateY(-1px);
			border-color: rgba(0, 0, 0, 0.14);
			box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
		}

		&:active {
			transform: translateY(0px) scale(0.99);
			box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
		}

		&:focus-visible {
			outline: 2px solid rgba(59, 130, 246, 0.7);
			outline-offset: 2px;
		}
	}

	.icon-preview {
		display: grid;
		place-items: center;
		width: 56px;
		height: 56px;
		border-radius: 12px;
		background: rgba(0, 0, 0, 0.03);

		/* 让图标大小跟随容器字体大小 */
		font-size: 26px;
	}

	.icon-name {
		margin-top: 10px;
		font-size: 12px;
		line-height: 1.2;
		opacity: 0.78;
		word-break: break-all;
		text-align: center;
	}

	.toast {
		position: fixed;
		left: 50%;
		bottom: 22px;
		transform: translateX(-50%);
		padding: 10px 14px;
		border-radius: 999px;
		font-size: 13px;

		background: rgba(0, 0, 0, 0.82);
		color: #fff;
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
	}
</style>
