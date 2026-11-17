<template>
	<figure class="carousel-image-slide">
		<img
			class="carousel-image-slide__image"
			:src="slide.src"
			:alt="slide.alt"
			:loading="loading"
			decoding="async"
		/>
		<figcaption class="carousel-image-slide__caption">
			<h3 class="carousel-image-slide__title">{{ slide.title }}</h3>
			<p class="carousel-image-slide__description">{{ slide.description }}</p>
		</figcaption>
	</figure>
</template>

<script setup lang="ts">
import type { ImageSlide } from '../imageSlides';

withDefaults(defineProps<{ slide: ImageSlide; loading?: 'eager' | 'lazy' }>(), { loading: 'lazy' });
</script>

<style scoped>
.carousel-image-slide {
	position: relative;
	width: 100%;
	height: 100%;
	margin: 0;
	overflow: hidden;
}

.carousel-image-slide__image {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.carousel-image-slide__caption {
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

.carousel-image-slide__title,
.carousel-image-slide__description {
	margin: 0;
}

.carousel-image-slide__title {
	font-size: var(--sy-font-size-lg, 16px);
	line-height: 1.4;
}

.carousel-image-slide__description {
	color: var(--sy-color-text-secondary);
	font-size: var(--sy-font-size-md, 14px);
	line-height: 1.5;
}
</style>
