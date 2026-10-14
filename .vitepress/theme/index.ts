// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme';
import sangyu from 'sangyu-ui';
import 'sangyu-ui/style';
import HomeSections from './HomeSections.vue';
import HomeHeroShowcase from './HomeHeroShowcase.vue';

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'home-hero-image': () => h(HomeHeroShowcase),
			'home-hero-after': () => h(HomeSections),
		});
	},
	enhanceApp({ app }) {
		app.component('Demo', AntdTheme);
		app.use(sangyu);
	},
} satisfies Theme;
