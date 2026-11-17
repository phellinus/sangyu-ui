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
	padding: 12px var(--sy-spacing-lg, 20px) 12px var(--sy-spacing-md, 20px);
	overflow: hidden;
	border: 1px solid rgb(255 255 255 / 16%);
	border-radius: var(--sy-carousel-radius, 8px);
	background: linear-gradient(135deg, rgb(15 23 42 / 88%), rgb(15 23 42 / 72%));
	box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
	color: #fff;
	-webkit-backdrop-filter: blur(14px) saturate(130%);
	backdrop-filter: blur(14px) saturate(130%);
}

.carousel-image-slide__caption::before {
	position: absolute;
	top: 12px;
	bottom: 12px;
	left: 0;
	width: 3px;
	border-radius: 0 3px 3px 0;
	background: var(--sy-color-primary, #4f7cff);
	content: '';
}

.carousel-image-slide__title,
.carousel-image-slide__description {
	margin: 0;
}

.carousel-image-slide__title {
	font-size: var(--sy-font-size-lg, 16px);
	font-weight: 600;
	line-height: 1.4;
	letter-spacing: 0.02em;
}

.carousel-image-slide__description {
	color: rgb(255 255 255 / 76%);
	font-size: var(--sy-font-size-md, 14px);
	line-height: 1.6;
}
</style>
