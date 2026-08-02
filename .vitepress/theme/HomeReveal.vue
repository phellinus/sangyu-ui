<script setup lang="ts">
import { nextTick, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();

let hero: HTMLElement | null = null;
let reveal: HTMLDivElement | null = null;
let animationFrame = 0;

/**
 * 根据指针位置更新首页 Hero 区域的光效坐标。
 *
 * @param event 指针事件
 */
const updateRevealPoint = (event: PointerEvent): void => {
	if (!hero || !reveal) return;
	reveal.classList.add('is-active');

	window.cancelAnimationFrame(animationFrame);
	animationFrame = window.requestAnimationFrame(() => {
		if (!hero || !reveal) return;

		const bounds = hero.getBoundingClientRect();
		const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
		const y = Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));

		reveal.style.setProperty('--sy-reveal-x', `${x}px`);
		reveal.style.setProperty('--sy-reveal-y', `${y}px`);
	});
};

/**
 * 激活首页 Hero 区域的跟随光效。
 *
 * @param event 指针事件
 */
const activateReveal = (event: PointerEvent): void => {
	reveal?.classList.add('is-active');
	updateRevealPoint(event);
};

/**
 * 在指针离开时关闭首页 Hero 区域的跟随光效。
 *
 * @param event 指针事件
 */
const deactivateReveal = (event: PointerEvent): void => {
	if (event.pointerType !== 'touch') reveal?.classList.remove('is-active');
};

/**
 * 移除首页 Hero 区域的跟随光效和事件监听。
 */
const detachReveal = (): void => {
	// VitePress 服务端渲染环境不存在 window。
	if (typeof window !== 'undefined') {
		window.cancelAnimationFrame(animationFrame);
	}

	if (hero) {
		hero.removeEventListener('pointerenter', activateReveal);
		hero.removeEventListener('pointermove', updateRevealPoint);
		hero.removeEventListener('pointerleave', deactivateReveal);
		hero.removeEventListener('pointerdown', activateReveal);
	}

	reveal?.remove();
	hero = null;
	reveal = null;
	animationFrame = 0;
};

/**
 * 在首页 Hero 区域挂载跟随光效和事件监听。
 */
const attachReveal = async (): Promise<void> => {
	// VitePress 构建期间会进行服务端渲染，此时无法访问浏览器 DOM。
	if (typeof window === 'undefined' || typeof document === 'undefined') return;

	detachReveal();
	await nextTick();

	hero = document.querySelector<HTMLElement>('.VPHomeHero');
	if (!hero) return;

	reveal = document.createElement('div');
	reveal.className = 'sy-home-reveal';
	reveal.setAttribute('aria-hidden', 'true');
	hero.prepend(reveal);

	hero.addEventListener('pointerenter', activateReveal, { passive: true });
	hero.addEventListener('pointermove', updateRevealPoint, { passive: true });
	hero.addEventListener('pointerleave', deactivateReveal, { passive: true });
	hero.addEventListener('pointerdown', activateReveal, { passive: true });
};

watch(() => route.path, attachReveal, { immediate: true, flush: 'post' });
onBeforeUnmount(detachReveal);
</script>

<template>
	<span class="sy-home-reveal-controller" aria-hidden="true"></span>
</template>
