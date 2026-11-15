<template>
	<div class="carousel-demo-stack">
		<SyCarousel v-model="current" aria-label="受控轮播">
			<SyCarouselItem><div class="carousel-demo-slide">受控项一</div></SyCarouselItem>
			<SyCarouselItem><div class="carousel-demo-slide">受控项二</div></SyCarouselItem>
			<SyCarouselItem><div class="carousel-demo-slide">受控项三</div></SyCarouselItem>
		</SyCarousel>
		<p>当前索引：{{ current }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyCarousel, SyCarouselItem } from 'sangyu-ui';

const current = ref(0);
</script>

<style scoped>
.carousel-demo-stack {
	display: grid;
	gap: var(--sy-spacing-sm);
}
.carousel-demo-slide {
	display: grid;
	place-items: center;
	width: 100%;
	height: 100%;
	background: var(--sy-color-bg);
	color: var(--sy-color-text);
	font-size: 2rem;
}
</style>
