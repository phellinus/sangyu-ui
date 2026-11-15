<template>
	<SyCarousel direction="vertical" indicator-position="right" aria-label="纵向轮播">
		<SyCarouselItem><div class="carousel-demo-slide">向下切换一</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">向下切换二</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">向下切换三</div></SyCarouselItem>
	</SyCarousel>
</template>

<script setup lang="ts">
import { SyCarousel, SyCarouselItem } from 'sangyu-ui';
</script>

<style scoped>
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
