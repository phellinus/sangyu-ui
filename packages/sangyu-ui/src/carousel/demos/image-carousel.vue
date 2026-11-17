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

const slides = [
	{
		src: 'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/SpringFestival.JPG',
		alt: '新年快乐',
		title: '新年的第一束光',
		description: '在熟悉的风景里，开启新的篇章。',
	},
	{
		src: 'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/full.jpg',
		alt: '秋天',
		title: '收藏一整个秋天',
		description: '慢一点，发现日常里的温柔色彩。',
	},
	{
		src: 'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/snow.webp',
		alt: '冬天',
		title: '等一场冬日的雪',
		description: '把此刻的宁静，留给下一段旅程。',
	},
	{
		src: 'https://sangyu-blog.oss-cn-hangzhou.aliyuncs.com/spring.jpg',
		alt: '春天',
		title: '春天的第一缕风',
		description: '在熟悉的风景里，开启新的篇章。',
	},
];
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
