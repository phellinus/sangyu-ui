<template>
	<SyCarousel autoplay :interval="4000" aria-label="四季图片轮播">
		<SyCarouselItem v-for="(slide, index) in slides" :key="slide.src">
			<figure class="image-carousel-demo__figure">
				<img
					class="image-carousel-demo__image"
					:src="slide.src"
					:alt="slide.alt"
					:loading="index === 0 ? 'eager' : 'lazy'"
					decoding="async"
				/>
				<figcaption class="image-carousel-demo__caption">
					<h3 class="image-carousel-demo__title">{{ slide.title }}</h3>
					<p class="image-carousel-demo__description">{{ slide.description }}</p>
				</figcaption>
			</figure>
		</SyCarouselItem>
	</SyCarousel>
</template>

<script setup lang="ts">
import { SyCarousel, SyCarouselItem } from 'sangyu-ui';
import { imageSlides } from './imageSlides';

const slides = imageSlides;
</script>

<style scoped>
.image-carousel-demo__figure {
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0;
	overflow: hidden;
}

.image-carousel-demo__image {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.image-carousel-demo__caption {
	position: absolute;
	top: var(--sy-spacing-md, 16px);
	left: var(--sy-spacing-md, 16px);
	z-index: 1;
	display: grid;
	gap: var(--sy-spacing-xs, 4px);
	max-width: min(70%, 30rem);
	padding: var(--sy-spacing-sm, 8px) var(--sy-spacing-md, 16px);
	border-radius: var(--sy-carousel-radius, 6px);
	background: color-mix(in srgb, var(--sy-color-surface, var(--sy-color-bg)) 88%, transparent);
	color: var(--sy-color-text);
}

.image-carousel-demo__title,
.image-carousel-demo__description {
	margin: 0;
}

.image-carousel-demo__title {
	font-size: var(--sy-font-size-lg, 16px);
	line-height: 1.4;
}

.image-carousel-demo__description {
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-md, 14px);
	line-height: 1.5;
}
</style>
