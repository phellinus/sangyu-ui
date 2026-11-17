<template>
	<div class="carousel-demo-stack">
		<SyCarousel v-model="current" aria-label="受控轮播">
			<SyCarouselItem v-for="(slide, index) in slides" :key="slide.src">
				<CarouselImageSlide :slide="slide" :loading="index === 0 ? 'eager' : 'lazy'" />
			</SyCarouselItem>
		</SyCarousel>
		<p>当前索引：{{ current }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyCarousel, SyCarouselItem } from 'sangyu-ui';
import CarouselImageSlide from './components/CarouselImageSlide.vue';
import { rotateImageSlides } from './imageSlides';

const current = ref(0);
const slides = rotateImageSlides(3);
</script>

<style scoped>
.carousel-demo-stack {
	display: grid;
	gap: var(--sy-spacing-sm);
}
</style>
