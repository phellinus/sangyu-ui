<template>
	<SyCarousel autoplay :interval="2500" aria-label="自动播放示例">
		<SyCarouselItem><div class="carousel-demo-slide">自动播放一</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">自动播放二</div></SyCarouselItem>
		<SyCarouselItem><div class="carousel-demo-slide">自动播放三</div></SyCarouselItem>
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
