import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import SyStep from '../step';
import SySteps from '../steps';

describe('SySteps', () => {
	it('infers step status from active and updates reactively', async () => {
		const wrapper = mount(SySteps, {
			props: {
				active: 1,
			},
			slots: {
				default: () => [
					h(SyStep, { title: '提交需求' }),
					h(SyStep, { title: '设计评审' }),
					h(SyStep, { title: '开发联调' }),
				],
			},
		});

		const getStatuses = () => wrapper.findAll('.sy-step').map((item) => item.attributes('data-status'));

		expect(getStatuses()).toEqual(['finish', 'process', 'wait']);

		await wrapper.setProps({ active: 2 });

		expect(getStatuses()).toEqual(['finish', 'finish', 'process']);
	});

	it('renders vertical direction and supports custom slots', () => {
		const wrapper = mount(SySteps, {
			props: {
				active: 2,
				direction: 'vertical',
			},
			slots: {
				default: () => [
					h(
						SyStep,
						{
							status: 'error',
						},
						{
							icon: () => h('span', { class: 'slot-icon' }, '!'),
							title: () => h('span', { class: 'slot-title' }, '人工复核'),
							description: () => h('span', { class: 'slot-description' }, '当前步骤需要人工确认。'),
						},
					),
				],
			},
		});

		expect(wrapper.classes()).toContain('sy-steps-vertical');

		const step = wrapper.find('.sy-step');
		expect(step.attributes('data-direction')).toBe('vertical');
		expect(step.attributes('data-status')).toBe('error');
		expect(wrapper.find('.slot-icon').text()).toBe('!');
		expect(wrapper.find('.slot-title').text()).toBe('人工复核');
		expect(wrapper.find('.slot-description').text()).toBe('当前步骤需要人工确认。');
	});

	it('warns when children are not SyStep', () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		mount(SySteps, {
			slots: {
				default: () => [h('div', 'invalid child'), h(SyStep, { title: '有效步骤' })],
			},
		});

		expect(warnSpy).toHaveBeenCalledWith('[SySteps] 子组件只能是 SyStep');

		warnSpy.mockRestore();
	});
});
