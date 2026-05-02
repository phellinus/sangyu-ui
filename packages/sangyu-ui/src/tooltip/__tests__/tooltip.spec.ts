import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SyTooltip from '../tooltip';

describe('SyTooltip', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('shows hover tooltip with content, arrow and placement data', async () => {
		const wrapper = mount(SyTooltip, {
			attachTo: document.body,
			props: {
				content: '按钮说明',
				placement: 'top',
				arrowSize: 8,
			},
			slots: {
				default: () => h('button', { class: 'trigger-btn' }, '按钮'),
			},
		});

		await wrapper.get('.trigger-btn').trigger('mouseenter');
		await nextTick();

		const tooltip = document.body.querySelector('.sy-tooltip') as HTMLElement;
		expect(tooltip).not.toBeNull();
		expect(tooltip.textContent).toContain('按钮说明');
		expect(tooltip.getAttribute('data-placement')).toContain('top');
		expect(tooltip.className).toContain('sy-tooltip-filled');
		expect(tooltip.style.getPropertyValue('--tooltip-arrow')).toBe('8px');
		expect(document.body.querySelector('.sy-tooltip-arrow')).not.toBeNull();
	});

	it('shows click tooltip without arrow and with custom style', async () => {
		const wrapper = mount(SyTooltip, {
			attachTo: document.body,
			props: {
				trigger: 'click',
				type: 'border',
				showArrow: false,
				customStyle: {
					maxWidth: '180px',
				},
			},
			slots: {
				default: () => h('span', { class: 'click-trigger' }, '查看'),
				content: () => '自定义提示',
			},
		});

		await wrapper.get('.click-trigger').trigger('click');
		await nextTick();

		const tooltip = document.body.querySelector('.sy-tooltip') as HTMLElement;
		expect(tooltip.className).toContain('sy-tooltip-border');
		expect(tooltip.textContent).toContain('自定义提示');
		expect(tooltip.style.maxWidth).toBe('180px');
		expect(document.body.querySelector('.sy-tooltip-arrow')).toBeNull();
	});

	it('warns when multiple default children are provided', () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		mount(SyTooltip, {
			slots: {
				default: () => [h('span', 'one'), h('span', 'two')],
			},
		});

		expect(warnSpy).toHaveBeenCalledWith('SyTooltip: only one child is allowed');

		warnSpy.mockRestore();
	});
});
