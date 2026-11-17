<template>
	<SyCarousel animation="fade" indicator="line" aria-label="淡入淡出轮播">
		<SyCarouselItem><div class="carousel-demo-slide">淡入淡出一</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">淡入淡出二</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">淡入淡出三</div></SyCarouselItem>
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
