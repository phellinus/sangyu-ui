<template>
	<div class="carousel-demo-stack">
		<button type="button" @click="dark = !dark">切换{{ dark ? '亮色' : '暗色' }}主题</button>
		<ThemeProvider :mode="dark ? 'dark' : 'light'">
			<SyCarousel aria-label="主题轮播">
				<SyCarouselItem v-for="(slide, index) in slides" :key="slide.src">
					<CarouselImageSlide :slide="slide" :loading="index === 0 ? 'eager' : 'lazy'" />
				</SyCarouselItem>
			</SyCarousel>
		</ThemeProvider>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyCarousel, SyCarouselItem, ThemeProvider } from 'sangyu-ui';
import CarouselImageSlide from './components/CarouselImageSlide.vue';
import { rotateImageSlides } from './imageSlides';

const dark = ref(false);
const slides = rotateImageSlides(3);
</script>

<style scoped>
.carousel-demo-stack {
	display: grid;
	gap: var(--sy-spacing-sm);
}
</style>
