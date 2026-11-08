import { mount } from '@vue/test-utils';
import { createCommentVNode, createTextVNode, defineComponent, Fragment, h, nextTick, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SyTooltip } from 'sangyu-ui';

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

	it('binds click behavior to a component trigger inside nested fragments', async () => {
		const onClick = vi.fn();
		const Trigger = defineComponent({ render: () => h('button', { class: 'nested-trigger' }, '打开') });
		const wrapper = mount(SyTooltip, {
			attachTo: document.body,
			props: { trigger: 'click', content: '嵌套提示' },
			slots: {
				default: () => [
					createCommentVNode(),
					h(Fragment, [createTextVNode(' '), h(Fragment, [h(Trigger, { onClick })])]),
				],
			},
		});

		await wrapper.get('.nested-trigger').trigger('click');
		await nextTick();

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenLastCalledWith(expect.any(MouseEvent));
		expect(document.body.querySelector('.sy-tooltip')?.textContent).toContain('嵌套提示');

		await wrapper.get('.nested-trigger').trigger('click');

		expect(onClick).toHaveBeenCalledTimes(2);
		expect(document.body.querySelector('.sy-tooltip')).toBeNull();
		wrapper.unmount();
	});

	it('calls the original DOM click listener once per click and preserves props and ref', async () => {
		const onClick = vi.fn();
		const onFocus = vi.fn();
		const triggerRef = ref<HTMLButtonElement | null>(null);
		const Host = defineComponent({
			setup: () => () =>
				h(
					SyTooltip,
					{ trigger: 'click', content: 'DOM 提示' },
					{
						default: () =>
							h(
								'button',
								{
									ref: triggerRef,
									class: 'dom-trigger',
									style: { color: 'red' },
									title: '原始标题',
									'data-trigger': 'original',
									onClick,
									onFocus,
								},
								'打开',
							),
					},
				),
		});
		const wrapper = mount(Host, { attachTo: document.body });
		const trigger = wrapper.get('.dom-trigger');
		const firstClick = new MouseEvent('click', { bubbles: true });

		trigger.element.dispatchEvent(firstClick);
		await nextTick();

		expect(onClick).toHaveBeenCalledExactlyOnceWith(firstClick);
		expect(document.body.querySelector('.sy-tooltip')?.textContent).toContain('DOM 提示');
		expect(triggerRef.value).toBe(trigger.element);
		expect(trigger.attributes('title')).toBe('原始标题');
		expect(trigger.attributes('data-trigger')).toBe('original');
		expect((trigger.element as HTMLElement).style.color).toBe('red');

		await trigger.trigger('focus');
		expect(onFocus).toHaveBeenCalledTimes(1);

		const secondClick = new MouseEvent('click', { bubbles: true });
		trigger.element.dispatchEvent(secondClick);
		await nextTick();

		expect(onClick).toHaveBeenCalledTimes(2);
		expect(onClick).toHaveBeenLastCalledWith(secondClick);
		expect(document.body.querySelector('.sy-tooltip')).toBeNull();
		expect(triggerRef.value).toBe(trigger.element);
		wrapper.unmount();
		expect(triggerRef.value).toBeNull();
	});

	it('preserves component props, ref and each distinct listener in an event array', async () => {
		const calls: string[] = [];
		const first = vi.fn(() => calls.push('first'));
		const second = vi.fn(() => calls.push('second'));
		const onClick = [first, second];
		const triggerRef = ref<InstanceType<typeof Trigger> | null>(null);
		const Trigger = defineComponent({
			props: { label: String },
			setup: (props) => () => h('button', { class: 'array-trigger' }, props.label),
		});
		const Host = defineComponent({
			setup: () => () =>
				h(
					SyTooltip,
					{ trigger: 'click', content: '数组提示' },
					{
						default: () =>
							h(Fragment, [h(Fragment, [h(Trigger, { ref: triggerRef, label: '原始标签', onClick })])]),
					},
				),
		});
		const wrapper = mount(Host, { attachTo: document.body });
		const trigger = wrapper.get('.array-trigger');
		const event = new MouseEvent('click', { bubbles: true });

		trigger.element.dispatchEvent(event);
		await nextTick();

		expect(first).toHaveBeenCalledExactlyOnceWith(event);
		expect(second).toHaveBeenCalledExactlyOnceWith(event);
		expect(calls).toEqual(['first', 'second']);
		expect(onClick).toEqual([first, second]);
		expect(trigger.text()).toBe('原始标签');
		expect(triggerRef.value).toBe(wrapper.getComponent(Trigger).vm);
		expect(triggerRef.value?.$el).toBe(trigger.element);
		expect(document.body.querySelector('.sy-tooltip')?.textContent).toContain('数组提示');

		await trigger.trigger('click');

		expect(first).toHaveBeenCalledTimes(2);
		expect(second).toHaveBeenCalledTimes(2);
		expect(calls).toEqual(['first', 'second', 'first', 'second']);
		expect(triggerRef.value).toBe(wrapper.getComponent(Trigger).vm);
		expect(document.body.querySelector('.sy-tooltip')).toBeNull();
		wrapper.unmount();
		expect(triggerRef.value).toBeNull();
	});

	it('calls original hover listeners once and keeps the floating content interactive', async () => {
		vi.useFakeTimers();
		const onMouseenter = vi.fn();
		const onMouseleave = vi.fn();
		const wrapper = mount(SyTooltip, {
			attachTo: document.body,
			props: { content: '悬浮提示' },
			slots: {
				default: () => h('button', { class: 'hover-trigger', onMouseenter, onMouseleave }, '悬浮'),
			},
		});

		try {
			const trigger = wrapper.get('.hover-trigger');
			await trigger.trigger('mouseenter');

			expect(onMouseenter).toHaveBeenCalledTimes(1);
			expect(onMouseenter).toHaveBeenLastCalledWith(expect.any(MouseEvent));
			expect(document.body.querySelector('.sy-tooltip')?.textContent).toContain('悬浮提示');

			await trigger.trigger('mouseleave');

			expect(onMouseleave).toHaveBeenCalledTimes(1);
			expect(onMouseleave).toHaveBeenLastCalledWith(expect.any(MouseEvent));

			const tooltip = document.body.querySelector('.sy-tooltip')!;
			tooltip.dispatchEvent(new MouseEvent('mouseenter'));
			await vi.runOnlyPendingTimersAsync();
			await nextTick();

			expect(document.body.querySelector('.sy-tooltip')).toBe(tooltip);
			tooltip.dispatchEvent(new MouseEvent('mouseleave'));
			await nextTick();

			expect(document.body.querySelector('.sy-tooltip')).toBeNull();
			expect(onMouseenter).toHaveBeenCalledTimes(1);
			expect(onMouseleave).toHaveBeenCalledTimes(1);
		} finally {
			wrapper.unmount();
			vi.useRealTimers();
		}
	});
});
