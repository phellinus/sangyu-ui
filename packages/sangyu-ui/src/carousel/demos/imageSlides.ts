export const imageSlides = [
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
] as const;

export type ImageSlide = (typeof imageSlides)[number];

export function rotateImageSlides(start: number): ImageSlide[] {
	return [...imageSlides.slice(start), ...imageSlides.slice(0, start)];
}
