// https://vitepress.dev/guide/custom-theme
import { computed, defineComponent, h, watchEffect } from 'vue';
import { useData, type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme';
import sangyu, { darkTheme, lightTheme, ThemeProvider, themeToVariables } from 'sangyu-ui';
import 'sangyu-ui/style';
import HomeSections from './HomeSections.vue';
import HomeHeroShowcase from './HomeHeroShowcase.vue';

const DocsLayout = defineComponent({
	name: 'DocsLayout',
	setup() {
		const { isDark } = useData();
		const mode = computed(() => (isDark.value ? 'dark' : 'light'));

		// Demos can teleport overlays to body, outside the scoped Provider. Mirror
		// its variables on the document root so those overlays inherit the theme.
		watchEffect(() => {
			if (typeof document === 'undefined') return;

			const root = document.documentElement;
			root.setAttribute('data-sy-theme', mode.value);
			const theme = mode.value === 'dark' ? darkTheme : lightTheme;
			for (const [name, value] of Object.entries(themeToVariables(theme))) {
				root.style.setProperty(name, value);
			}
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
