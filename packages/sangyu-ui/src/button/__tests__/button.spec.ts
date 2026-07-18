import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import SyButton from '../SyButton.vue';

describe('SyButton', () => {
	it('renders slot content with modifier classes and custom style', () => {
		const wrapper = mount(SyButton, {
			props: {
				type: 'gradient',
				size: 'large',
				radius: 'small',
				linePosition: 'top',
				lineOrigin: 'left',
				disabled: true,
				color: '#336699',
				gradientDirection: '60deg',
				gradientColorSecondary: '#99ccff',
				customStyle: 'width: 120px;',
			},
			slots: {
				default: () => '提交需求',
			},
		});

		const button = wrapper.get('button');

		expect(button.attributes('disabled')).toBeDefined();
		expect(button.classes()).toContain('sy-button');
		expect(button.classes()).toContain('sy-button--gradient');
		expect(button.classes()).toContain('sy-button-size--large');
		expect(button.classes()).toContain('sy-button-radius--small');
		expect(button.classes()).toContain('sy-button-gradient-position--top');
		expect(button.classes()).toContain('sy-button-gradient-origin--left');
		expect(button.attributes('style')).toContain('width: 120px;');
		expect(button.attributes('style')).toContain('linear-gradient(60deg');
		expect(wrapper.get('.sy-text').text()).toBe('提交需求');
	});

	it('emits pointer-related events', async () => {
		const wrapper = mount(SyButton, {
			slots: {
				default: () => '交互按钮',
			},
		});

		const button = wrapper.get('button');

		await button.trigger('mouseover');
		await button.trigger('mouseout');
		await button.trigger('blur');

		expect(wrapper.emitted('mouseover')).toHaveLength(1);
		expect(wrapper.emitted('mouseout')).toHaveLength(1);
		expect(wrapper.emitted('blur')).toHaveLength(1);
	});

	it('creates and removes ripple on click for filled buttons', async () => {
		const wrapper = mount(SyButton, {
			props: {
				type: 'filled',
				color: '#336699',
			},
			slots: {
				default: () => '波纹按钮',
			},
		});

		const button = wrapper.get('button');
		vi.spyOn(button.element, 'getBoundingClientRect').mockReturnValue({
			width: 100,
			height: 40,
			top: 20,
			right: 110,
			bottom: 60,
			left: 10,
			x: 10,
			y: 20,
			toJSON: () => ({}),
		} as DOMRect);

		await button.trigger('click', {
			clientX: 60,
			clientY: 50,
		});
		await nextTick();

		expect(wrapper.emitted('click')).toHaveLength(1);

		const ripple = button.get('.sy-button__ripple');
		expect(ripple.element).toBeInstanceOf(HTMLSpanElement);
		expect((ripple.element as HTMLElement).style.width).toBe('100px');
		expect((ripple.element as HTMLElement).style.left).toBe('0px');
		expect((ripple.element as HTMLElement).style.top).toBe('-20px');

		ripple.element.dispatchEvent(new Event('animationend'));
		await nextTick();

		expect(button.find('.sy-button__ripple').exists()).toBe(false);
	});

	it('updates border button styles across hover, click and blur', async () => {
		const wrapper = mount(SyButton, {
			props: {
				type: 'border',
				color: '#336699',
			},
			slots: {
				default: () => '描边按钮',
			},
		});

		const button = wrapper.get('button');
		vi.spyOn(button.element, 'getBoundingClientRect').mockReturnValue({
			width: 100,
			height: 40,
			top: 20,
			right: 110,
			bottom: 60,
			left: 10,
			x: 10,
			y: 20,
			toJSON: () => ({}),
		} as DOMRect);

		expect(button.attributes('style')).toContain('border: 1px solid rgb(51, 102, 153);');
		expect(button.attributes('style')).toContain('background-color: transparent;');
		expect(button.attributes('style')).toContain('color: rgb(51, 102, 153);');

		await button.trigger('mouseover');
		expect(button.attributes('style')).toContain('background-color: rgba(51, 102, 153, 0.2);');

		await button.trigger('click', {
			clientX: 60,
			clientY: 50,
		});
		await nextTick();

		const ripple = button.get('.sy-button__ripple');
		expect((ripple.element as HTMLElement).style.backgroundColor).toBe('rgb(51, 102, 153)');

		ripple.element.dispatchEvent(new Event('animationend'));
		await nextTick();

		expect(button.attributes('style')).toContain('background-color: rgb(51, 102, 153);');
		expect(button.attributes('style')).toContain('color: white;');

		await button.trigger('blur');
		expect(button.attributes('style')).toContain('background-color: rgba(51, 102, 153, 0.2);');
	});

	it('updates flat and line button visual states after interaction', async () => {
		const flatWrapper = mount(SyButton, {
			props: {
				type: 'flat',
				color: '#336699',
			},
		});
		const flatButton = flatWrapper.get('button');
		vi.spyOn(flatButton.element, 'getBoundingClientRect').mockReturnValue({
			width: 80,
			height: 36,
			top: 10,
			right: 90,
			bottom: 46,
			left: 10,
			x: 10,
			y: 10,
			toJSON: () => ({}),
		} as DOMRect);

		await flatButton.trigger('click', {
			clientX: 50,
			clientY: 28,
		});
		await nextTick();

		const flatRipple = flatButton.get('.sy-button__ripple');
		expect((flatRipple.element as HTMLElement).style.backgroundColor).toBe('rgb(51, 102, 153)');

		flatRipple.element.dispatchEvent(new Event('animationend'));
		await nextTick();

		expect(flatButton.attributes('style')).toContain('background-color: rgb(51, 102, 153);');
		expect(flatButton.attributes('style')).toContain('color: white;');

		const lineWrapper = mount(SyButton, {
			props: {
				type: 'line',
				color: '#336699',
			},
		});
		const lineButton = lineWrapper.get('button');

		expect(lineButton.attributes('style')).toContain('--sy-line-color: #336699;');
		expect(lineButton.attributes('style')).toContain('--sy-line-color-fade: rgba(51, 102, 153, 0.3);');

		await lineButton.trigger('click', {
			clientX: 40,
			clientY: 24,
		});
		await nextTick();

		expect(lineButton.attributes('style')).toContain('--sy-line-color-fade: #336699;');

		await lineButton.trigger('blur');
		expect(lineButton.attributes('style')).toContain('--sy-line-color-fade: rgba(51, 102, 153, 0.3);');
	});
});
