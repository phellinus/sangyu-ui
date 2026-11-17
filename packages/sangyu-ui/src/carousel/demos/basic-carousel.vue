<template>
	<SyCarousel aria-label="基础轮播">
		<SyCarouselItem v-for="(slide, index) in slides" :key="slide.src">
			<CarouselImageSlide :slide="slide" :loading="index === 0 ? 'eager' : 'lazy'" />
		</SyCarouselItem>
	</SyCarousel>
</template>

<script setup lang="ts">
import { SyCarousel, SyCarouselItem } from 'sangyu-ui';
import CarouselImageSlide from './components/CarouselImageSlide.vue';
import { rotateImageSlides } from './imageSlides';

const slides = rotateImageSlides(1);
</script>
