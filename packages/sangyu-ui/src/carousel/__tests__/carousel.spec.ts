import { mount } from '@vue/test-utils';
import postcss from 'postcss';
import { renderThemeCSS } from '../../../../../scripts/sangyu-theme-css';
import { createApp, createSSRApp, defineComponent, h, nextTick, ref } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { themeToVariables } from '../../theme/css';
import { mergeTheme } from '../../theme/merge';
import { darkTheme, lightTheme } from '../../theme/presets';
import SyCarousel, { SyCarouselItem } from '..';

const slides = () => [
	h(SyCarouselItem, null, () => h('a', { href: '#one' }, 'One')),
	h(SyCarouselItem, null, () => h('a', { href: '#two' }, 'Two')),
	h(SyCarouselItem, null, () => h('a', { href: '#three' }, 'Three')),
];

function carousel(props: Record<string, unknown> = {}) {
	return mount(SyCarousel, { props: { transitionDuration: 0, ...props }, slots: { default: slides } });
}

afterEach(() => {
	vi.useRealTimers();
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

describe('SyCarousel', () => {
	it('registers both components and renders empty and single-item states without controls', () => {
		const app = createApp(defineComponent(() => () => null));
		app.use(SyCarousel);
		expect(app.component('SyCarousel')).toBe(SyCarousel);
		expect(app.component('SyCarouselItem')).toBe(SyCarouselItem);
		const empty = mount(SyCarousel);
		expect(empty.findAll('.sy-carousel__slide')).toHaveLength(0);
		expect(empty.findAll('button')).toHaveLength(0);
		const single = mount(SyCarousel, {
			props: { autoplay: true },
			slots: { default: () => h(SyCarouselItem, null, () => 'Only') },
		});
		expect(single.findAll('.sy-carousel__slide')).toHaveLength(1);
		expect(single.findAll('button')).toHaveLength(0);
	});

	it('changes noncontrolled index through arrows and indicators without duplicate events', async () => {
		const wrapper = carousel();
		expect(wrapper.findAll('.sy-carousel__slide')).toHaveLength(5);
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		expect(wrapper.get('[aria-label="转到第 2 张"]').attributes('aria-current')).toBe('true');
		expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
		expect(wrapper.emitted('change')).toEqual([[1, 0, true]]);
		await wrapper.get('[aria-label="转到第 2 张"]').trigger('click');
		expect(wrapper.emitted('change')).toHaveLength(1);
		await wrapper.get('[aria-label="转到第 3 张"]').trigger('click');
		expect(wrapper.emitted('change')?.[1]).toEqual([2, 1, true]);
		expect(wrapper.findAll('.sy-carousel__slide[aria-hidden="true"]')).toHaveLength(4);
	});

	it('waits for controlled feedback and deduplicates repeated pending requests', async () => {
		const wrapper = carousel({ modelValue: 0 });
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		expect(wrapper.emitted('update:modelValue')).toEqual([[1]]);
		expect(wrapper.get('[aria-label="转到第 1 张"]').attributes('aria-current')).toBe('true');
		await wrapper.setProps({ modelValue: 1 });
		expect(wrapper.get('[aria-label="转到第 2 张"]').attributes('aria-current')).toBe('true');
		expect(wrapper.emitted('change')).toEqual([[1, 0, true]]);
	});

	it('uses no-transition snapping after both slide loop boundaries', async () => {
		vi.useFakeTimers();
		const wrapper = carousel({ defaultValue: 2, transitionDuration: 500 });
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		expect(wrapper.get('.sy-carousel__track').attributes('style')).toContain('translate3d(-400%');
		await wrapper.get('.sy-carousel__track').trigger('transitionend', { propertyName: 'transform' });
		expect(wrapper.attributes('style')).toContain('--sy-carousel-transition-duration: 0ms');
		expect(wrapper.get('.sy-carousel__track').attributes('style')).toContain('translate3d(-100%');
		await nextTick();
		vi.runAllTimers();
		await nextTick();
		expect(wrapper.attributes('style')).toContain('--sy-carousel-transition-duration: 500ms');
		await wrapper.get('[aria-label="上一张"]').trigger('click');
		expect(wrapper.get('.sy-carousel__track').attributes('style')).toContain('translate3d(0%');
		await wrapper.get('.sy-carousel__track').trigger('transitionend', { propertyName: 'transform' });
		expect(wrapper.attributes('style')).toContain('--sy-carousel-transition-duration: 0ms');
		expect(wrapper.get('.sy-carousel__track').attributes('style')).toContain('translate3d(-300%');
		wrapper.unmount();
	});

	it('ignores rapid requests while a slide is moving and resumes after settling', async () => {
		vi.useFakeTimers();
		const wrapper = carousel({ transitionDuration: 500 });
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		await wrapper.get('[aria-label="转到第 3 张"]').trigger('click');
		expect(wrapper.emitted('change')).toEqual([[1, 0, true]]);
		vi.advanceTimersByTime(540);
		await nextTick();
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		expect(wrapper.emitted('change')?.[1]).toEqual([2, 1, true]);
		wrapper.unmount();
	});

	it('respects non-loop boundaries and vertical fade layout', async () => {
		const wrapper = carousel({ loop: false, direction: 'vertical', animation: 'fade', indicatorPosition: 'right' });
		expect(wrapper.classes()).toContain('sy-carousel--vertical');
		expect(wrapper.classes()).toContain('sy-carousel--fade');
		expect(wrapper.classes()).toContain('sy-carousel--indicator-right');
		expect(wrapper.get('[aria-label="上一张"]').attributes('disabled')).toBeDefined();
		await wrapper.get('[aria-label="转到第 3 张"]').trigger('click');
		expect(wrapper.get('[aria-label="下一张"]').attributes('disabled')).toBeDefined();
		expect(wrapper.findAll('.sy-carousel__slide')).toHaveLength(3);
	});

	it('pauses autoplay on hover, focus, explicit pause and page visibility, then cleans up', async () => {
		vi.useFakeTimers();
		const wrapper = carousel({ autoplay: true, interval: 100, pauseOnHover: true });
		expect(wrapper.get('[aria-label="暂停自动播放"]').text()).toBe('⏸');
		await wrapper.trigger('mouseenter');
		vi.advanceTimersByTime(300);
		expect(wrapper.emitted('change')).toBeUndefined();
		await wrapper.trigger('mouseleave');
		vi.advanceTimersByTime(100);
		await nextTick();
		expect(wrapper.emitted('change')?.[0]).toEqual([1, 0, false]);
		await wrapper.get('[aria-label="暂停自动播放"]').trigger('click');
		vi.advanceTimersByTime(300);
		expect(wrapper.emitted('change')).toHaveLength(1);
		await wrapper.get('[aria-label="继续自动播放"]').trigger('click');
		await wrapper.get('[aria-label="下一张"]').trigger('focusin');
		vi.advanceTimersByTime(300);
		expect(wrapper.emitted('change')).toHaveLength(1);
		await wrapper.get('[aria-label="下一张"]').trigger('focusout', { relatedTarget: document.body });
		const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
		document.dispatchEvent(new Event('visibilitychange'));
		vi.advanceTimersByTime(300);
		expect(wrapper.emitted('change')).toHaveLength(1);
		hidden.mockReturnValue(false);
		document.dispatchEvent(new Event('visibilitychange'));
		const changes = wrapper.emitted('change');
		wrapper.unmount();
		vi.advanceTimersByTime(300);
		expect(changes).toHaveLength(1);
		expect(vi.getTimerCount()).toBe(0);
	});

	it('suppresses motion and autoplay when the user prefers reduced motion', async () => {
		vi.useFakeTimers();
		const listeners = new Set<(event: MediaQueryListEvent) => void>();
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({
				matches: true,
				addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
					listeners.add(listener),
				removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) =>
					listeners.delete(listener),
			})),
		);
		const wrapper = carousel({ autoplay: true, interval: 100 });
		expect(wrapper.attributes('style')).toContain('--sy-carousel-transition-duration: 0ms');
		vi.advanceTimersByTime(300);
		expect(wrapper.emitted('change')).toBeUndefined();
		wrapper.unmount();
		expect(listeners.size).toBe(0);
		vi.unstubAllGlobals();
	});

	it('uses native labelled controls and configurable indicators', async () => {
		const wrapper = carousel({ showArrow: 'hover', indicator: 'line' });
		expect(wrapper.attributes('role')).toBe('region');
		expect(wrapper.findAll('button')).toHaveLength(5);
		expect(wrapper.get('.sy-carousel__indicators').classes()).toContain('sy-carousel__indicators--line');
		for (const button of wrapper.findAll('button')) expect(button.attributes('aria-label')).toBeTruthy();
		await wrapper.get('[aria-label="下一张"]').trigger('click');
		expect(wrapper.get('[aria-label="转到第 2 张"]').attributes('aria-current')).toBe('true');
	});

	it('passes custom attributes and listeners to the root exactly once', async () => {
		const listener = vi.fn();
		const wrapper = mount(SyCarousel, {
			attrs: {
				class: 'custom-carousel',
				style: '--sy-carousel-aspect-ratio: 2 / 1',
				'aria-label': '精选内容',
				onClick: listener,
			},
			slots: { default: slides },
		});
		expect(wrapper.classes()).toContain('custom-carousel');
		expect(wrapper.attributes('style')).toContain('--sy-carousel-aspect-ratio: 2 / 1');
		expect(wrapper.attributes('aria-label')).toBe('精选内容');
		await wrapper.trigger('click');
		expect(listener).toHaveBeenCalledTimes(1);
	});

	it('exposes light and dark tokens, overrides and reactive provider changes', async () => {
		for (const theme of [lightTheme, darkTheme]) {
			const vars = themeToVariables(theme);
			expect(vars['--sy-carousel-background']).toBe('var(--sy-color-surface)');
			expect(vars['--sy-carousel-arrow-color']).toBe('var(--sy-color-text)');
			expect(vars['--sy-carousel-indicator-active-color']).toBe('var(--sy-color-primary)');
		}
		const override = mergeTheme(lightTheme, { components: { carousel: { arrowColor: 'rebeccapurple' } } });
		expect(themeToVariables(override)['--sy-carousel-arrow-color']).toBe('rebeccapurple');
		const mode = ref<'light' | 'dark'>('light');
		const Host = defineComponent(
			() => () => h(ThemeProvider, { mode: mode.value }, () => h(SyCarousel, null, slides)),
		);
		const wrapper = mount(Host);
		expect(wrapper.get('[data-sy-theme]').attributes('data-sy-theme')).toBe('light');
		mode.value = 'dark';
		await nextTick();
		expect(wrapper.get('[data-sy-theme]').attributes('data-sy-theme')).toBe('dark');
		expect(wrapper.get('[data-sy-theme]').attributes('style')).toBeUndefined();
	});

	it('keeps carousel tokens usable with only the static style entry', () => {
		const root: Record<string, string> = {};
		const dark: Record<string, string> = {};
		postcss.parse(renderThemeCSS()).walkRules((rule) => {
			const target = rule.selectors.includes(':root')
				? root
				: rule.selector.startsWith("[data-sy-theme='dark']")
					? dark
					: null;
			if (target)
				rule.walkDecls((declaration) => {
					target[declaration.prop] = declaration.value;
				});
		});
		const carouselTokens = Object.entries(root).filter(([name]) => name.startsWith('--sy-carousel-'));
		expect(carouselTokens).toHaveLength(20);
		expect(root['--sy-color-bg']).toBeDefined();
		for (const [name, value] of carouselTokens) {
			for (const match of value.matchAll(/var\((--[\w-]+)(?=,|\))/g)) {
				const dependency = match[1];
				expect(
					root[dependency] !== undefined || value.includes(`var(${dependency},`),
					`${name} needs a static fallback for ${dependency}`,
				).toBe(true);
			}
		}
		for (const name of [
			'background',
			'color',
			'arrow-background',
			'arrow-color',
			'arrow-hover-background',
			'indicator-color',
			'indicator-active-color',
		]) {
			const property = `--sy-carousel-${name}`;
			expect(dark[property], `${property} must recalculate in the dark scope`).toBe(root[property]);
		}
	});

	it('renders on the server without browser globals', async () => {
		const html = await renderToString(createSSRApp({ render: () => h(SyCarousel, { autoplay: true }, slides) }));
		expect(html).toContain('aria-roledescription="轮播"');
		expect(html).toContain('One');
		expect(html).toContain('aria-label="暂停自动播放"');
	});
});
