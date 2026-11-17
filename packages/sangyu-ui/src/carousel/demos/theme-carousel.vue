<template>
	<div class="carousel-demo-stack">
		<button type="button" @click="dark = !dark">切换{{ dark ? '亮色' : '暗色' }}主题</button>
		<ThemeProvider :mode="dark ? 'dark' : 'light'">
			<SyCarousel aria-label="主题轮播">
				<SyCarouselItem><div class="carousel-demo-slide">主题项一</div></SyCarouselItem>
				<SyCarouselItem><div class="carousel-demo-slide">主题项二</div></SyCarouselItem>
			</SyCarousel>
		</ThemeProvider>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SyCarousel, SyCarouselItem, ThemeProvider } from 'sangyu-ui';

const dark = ref(false);
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
