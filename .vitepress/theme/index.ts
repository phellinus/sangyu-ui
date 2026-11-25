// https://vitepress.dev/guide/custom-theme
import { computed, defineComponent, h, watchEffect } from 'vue';
import { useData, type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme';
import sangyu, { ThemeProvider } from 'sangyu-ui';
import HomeSections from './HomeSections.vue';
import HomeHeroShowcase from './HomeHeroShowcase.vue';

const DocsLayout = defineComponent({
	name: 'DocsLayout',
	setup() {
		const { isDark } = useData();
		const mode = computed(() => (isDark.value ? 'dark' : 'light'));

		// Teleported overlays inherit the static theme from the document root.
		watchEffect(() => {
			if (typeof document === 'undefined') return;
			document.documentElement.setAttribute('data-sy-theme', mode.value);
		});

		return () =>
			h(ThemeProvider, { mode: mode.value }, () =>
				h(DefaultTheme.Layout, null, {
					'home-hero-image': () => h(HomeHeroShowcase),
					'home-hero-after': () => h(HomeSections),
				}),
			);
	},
});

export default {
	extends: DefaultTheme,
	Layout: DocsLayout,
	enhanceApp({ app }) {
		app.component('Demo', AntdTheme);
		app.use(sangyu);
	},
} satisfies Theme;
