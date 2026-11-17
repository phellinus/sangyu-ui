<template>
	<SyCarousel autoplay :interval="2500" aria-label="自动播放示例">
		<SyCarouselItem v-for="(slide, index) in slides" :key="slide.src">
			<CarouselImageSlide :slide="slide" :loading="index === 0 ? 'eager' : 'lazy'" />
		</SyCarouselItem>
	</SyCarousel>
</template>

<script setup lang="ts">
import { SyCarousel, SyCarouselItem } from 'sangyu-ui';
import CarouselImageSlide from './components/CarouselImageSlide.vue';
import { rotateImageSlides } from './imageSlides';

const slides = rotateImageSlides(2);
</script>
