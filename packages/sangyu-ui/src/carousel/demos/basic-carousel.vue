<template>
	<SyCarousel aria-label="基础轮播">
		<SyCarouselItem><div class="carousel-demo-slide">第一张</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">第二张</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">第三张</div></SyCarouselItem>
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
