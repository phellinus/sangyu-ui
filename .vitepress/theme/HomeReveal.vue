<script setup lang="ts">
	import { nextTick, onBeforeUnmount, watch } from 'vue';
	import { useRoute } from 'vitepress';

	const route = useRoute();

	let hero: HTMLElement | null = null;
	let reveal: HTMLDivElement | null = null;
	let animationFrame = 0;

	const updateRevealPoint = (event: PointerEvent) => {
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

	const activateReveal = (event: PointerEvent) => {
		reveal?.classList.add('is-active');
		updateRevealPoint(event);
	};

	const deactivateReveal = (event: PointerEvent) => {
		if (event.pointerType !== 'touch') reveal?.classList.remove('is-active');
	};

	const detachReveal = () => {
		window.cancelAnimationFrame(animationFrame);

		if (hero) {
			hero.removeEventListener('pointerenter', activateReveal);
			hero.removeEventListener('pointermove', updateRevealPoint);
			hero.removeEventListener('pointerleave', deactivateReveal);
			hero.removeEventListener('pointerdown', activateReveal);
		}

		reveal?.remove();
		hero = null;
		reveal = null;
	};

	const attachReveal = async () => {
		detachReveal();
		if (typeof document === 'undefined') return;
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
