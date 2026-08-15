import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import { defineComponent, h, nextTick, onUnmounted } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SyDrawer from '../SyDrawer';

const mountedWrappers: Array<{ unmount: () => void }> = [];

/**
 * 挂载 Drawer 并启用真实 Transition
 */
const mountDrawer = (options: ComponentMountingOptions<typeof SyDrawer> = {}) => {
	const wrapper = mount(SyDrawer, {
		...options,
		props: {
			visible: true,
			...options.props,
		},
		global: {
			...options.global,
			stubs: {
				transition: false,
				...options.global?.stubs,
			},
		},
	});

	mountedWrappers.push(wrapper);
	return wrapper;
};

/**
 * 等待 Drawer 完成挂载和焦点初始化
 */
const flushDrawer = async () => {
	await nextTick();
	await nextTick();
};

/**
 * 等待 Drawer 完成关闭动画
 */
const finishLeave = async () => {
	await nextTick();
	await vi.advanceTimersByTimeAsync(400);
	await nextTick();
};

/**
 * 获取 Teleport 到页面中的 Drawer 根节点
 */
const getDrawer = () => document.body.querySelector<HTMLElement>('.sy-drawer');

afterEach(() => {
	mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount());
	vi.useRealTimers();
	document.body.innerHTML = '';
	document.body.removeAttribute('style');
});

describe('SyDrawer', () => {
	it('renders content, size, placement and accessibility attributes', async () => {
		mountDrawer({
			props: {
				visible: true,
				title: '编辑用户',
				placement: 'left',
				width: 400,
				customStyle: { marginTop: '8px' },
				lockScroll: false,
			},
			slots: {
				default: () => '抽屉内容',
				footer: () => h('button', { class: 'footer-action' }, '保存'),
			},
		});

		await flushDrawer();

		const drawer = getDrawer();
		const panel = drawer?.querySelector<HTMLElement>('.sy-drawer__panel');
		const title = drawer?.querySelector<HTMLElement>('.sy-drawer__title');

		expect(drawer).not.toBeNull();
		expect(drawer?.classList.contains('sy-drawer--left')).toBe(true);
		expect(drawer?.style.marginTop).toBe('8px');
		expect(panel?.style.width).toBe('400px');
		expect(panel?.getAttribute('role')).toBe('dialog');
		expect(panel?.getAttribute('aria-modal')).toBe('true');
		expect(panel?.getAttribute('aria-labelledby')).toBe(title?.id);
		expect(title?.textContent).toBe('编辑用户');
		expect(drawer?.textContent).toContain('抽屉内容');
		expect(drawer?.querySelector('.footer-action')).not.toBeNull();
	});

	it('emits update and close events from the close button', async () => {
		const wrapper = mountDrawer({
			props: { visible: true, lockScroll: false },
		});

		await flushDrawer();
		const closeButton = document.body.querySelector<HTMLButtonElement>('.sy-drawer__close');
		closeButton?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await nextTick();

		expect(wrapper.emitted('update:visible')).toEqual([[false]]);
		expect(wrapper.emitted('close')).toHaveLength(1);
		expect(wrapper.emitted('close')?.[0]?.[0]).toBeInstanceOf(MouseEvent);
	});

	it('respects mask and maskClosable properties', async () => {
		const wrapper = mountDrawer({
			props: { visible: true, maskClosable: false, lockScroll: false },
		});

		await flushDrawer();
		const mask = document.body.querySelector<HTMLElement>('.sy-drawer__mask');
		mask?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await nextTick();
		expect(wrapper.emitted('update:visible')).toBeUndefined();

		await wrapper.setProps({ maskClosable: true });
		mask?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		await nextTick();
		expect(wrapper.emitted('update:visible')).toEqual([[false]]);

		await wrapper.setProps({ mask: false });
		expect(document.body.querySelector('.sy-drawer__mask')).toBeNull();
		expect(document.body.querySelector('.sy-drawer__panel')?.getAttribute('aria-modal')).toBeNull();
	});

	it('teleports to a selector and supports rendering in place', async () => {
		const target = document.createElement('div');
		target.id = 'drawer-target';
		document.body.appendChild(target);

		const teleportedWrapper = mountDrawer({
			props: { visible: true, getContainer: '#drawer-target', lockScroll: false },
		});
		await flushDrawer();
		expect(target.querySelector('.sy-drawer')).not.toBeNull();
		teleportedWrapper.unmount();

		const inlineWrapper = mountDrawer({
			props: { visible: true, getContainer: false, lockScroll: false },
		});
		await flushDrawer();
		expect(inlineWrapper.find('.sy-drawer').exists()).toBe(true);
	});

	it('destroys slot content after the leave transition', async () => {
		vi.useFakeTimers();
		const onChildUnmounted = vi.fn();
		const DrawerChild = defineComponent({
			setup() {
				onUnmounted(onChildUnmounted);
				return () => h('input', { class: 'drawer-child' });
			},
		});
		const wrapper = mountDrawer({
			props: { visible: true, destroyOnClose: true, lockScroll: false },
			slots: { default: () => h(DrawerChild) },
		});

		await flushDrawer();
		expect(document.body.querySelector('.drawer-child')).not.toBeNull();
		await wrapper.setProps({ visible: false });
		await nextTick();
		expect(document.body.querySelector('.sy-drawer')).not.toBeNull();

		await finishLeave();
		expect(document.body.querySelector('.sy-drawer')).toBeNull();
		expect(onChildUnmounted).toHaveBeenCalledTimes(1);
	});

	it('keeps slot content mounted when destroyOnClose is false', async () => {
		vi.useFakeTimers();
		const onChildUnmounted = vi.fn();
		const DrawerChild = defineComponent({
			setup() {
				onUnmounted(onChildUnmounted);
				return () => h('input', { class: 'drawer-child' });
			},
		});
		const wrapper = mountDrawer({
			props: { visible: true, destroyOnClose: false, lockScroll: false },
			slots: { default: () => h(DrawerChild) },
		});

		await flushDrawer();
		const originalChild = document.body.querySelector('.drawer-child');
		await wrapper.setProps({ visible: false });
		await finishLeave();

		expect(document.body.querySelector('.sy-drawer')).not.toBeNull();
		expect(document.body.querySelector('.drawer-child')).toBe(originalChild);
		expect(onChildUnmounted).not.toHaveBeenCalled();
	});

	it('closes with Escape only when keyboard is enabled', async () => {
		const wrapper = mountDrawer({
			props: { visible: true, keyboard: false, lockScroll: false },
		});
		await flushDrawer();

		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		expect(wrapper.emitted('update:visible')).toBeUndefined();

		await wrapper.setProps({ keyboard: true });
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		expect(wrapper.emitted('update:visible')).toEqual([[false]]);
		expect(wrapper.emitted('close')?.[0]?.[0]).toBeInstanceOf(KeyboardEvent);
	});

	it('keeps body locked until every open Drawer finishes leaving', async () => {
		vi.useFakeTimers();
		document.body.style.overflow = 'scroll';
		document.body.style.paddingRight = '7px';
		const firstDrawer = mountDrawer({ props: { visible: true, autoFocus: false } });
		const secondDrawer = mountDrawer({ props: { visible: true, autoFocus: false } });

		await flushDrawer();
		expect(document.body.style.overflow).toBe('hidden');
		await secondDrawer.setProps({ visible: false });
		await finishLeave();
		expect(document.body.style.overflow).toBe('hidden');
		await firstDrawer.setProps({ visible: false });
		await finishLeave();
		expect(document.body.style.overflow).toBe('scroll');
		expect(document.body.style.paddingRight).toBe('7px');
	});

	it('traps Tab focus and restores the opening element after close', async () => {
		vi.useFakeTimers();
		const opener = document.createElement('button');
		document.body.appendChild(opener);
		opener.focus();
		const wrapper = mountDrawer({
			props: { visible: true, closable: false, lockScroll: false },
			slots: {
				default: () => [h('input', { class: 'first-control' }), h('button', { class: 'last-control' }, '提交')],
			},
		});

		await flushDrawer();
		const panel = document.body.querySelector<HTMLElement>('.sy-drawer__panel');
		const firstControl = document.body.querySelector<HTMLInputElement>('.first-control');
		const lastControl = document.body.querySelector<HTMLButtonElement>('.last-control');
		expect(document.activeElement).toBe(panel);

		panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
		expect(document.activeElement).toBe(firstControl);
		lastControl?.focus();
		lastControl?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
		expect(document.activeElement).toBe(firstControl);
		firstControl?.focus();
		firstControl?.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }),
		);
		expect(document.activeElement).toBe(lastControl);

		await wrapper.setProps({ visible: false });
		await finishLeave();
		expect(document.activeElement).toBe(opener);
	});

	it('lets only the topmost Drawer respond to Escape', async () => {
		vi.useFakeTimers();
		const firstDrawer = mountDrawer({
			props: { visible: true, autoFocus: false, lockScroll: false },
		});
		const secondDrawer = mountDrawer({
			props: { visible: true, autoFocus: false, lockScroll: false },
		});
		await flushDrawer();

		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		expect(firstDrawer.emitted('update:visible')).toBeUndefined();
		expect(secondDrawer.emitted('update:visible')).toEqual([[false]]);

		await secondDrawer.setProps({ visible: false });
		await finishLeave();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		expect(firstDrawer.emitted('update:visible')).toEqual([[false]]);
	});

	it('cleans global side effects when unmounted while open', async () => {
		document.body.style.overflow = 'auto';
		const wrapper = mountDrawer({ props: { visible: true, autoFocus: false } });
		await flushDrawer();
		expect(document.body.style.overflow).toBe('hidden');

		wrapper.unmount();
		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
		expect(document.body.style.overflow).toBe('auto');
		expect(wrapper.emitted('update:visible')).toBeUndefined();
	});

	it('skips controls with a negative tabindex during focus trapping', async () => {
		mountDrawer({
			props: { visible: true, closable: false, lockScroll: false },
			slots: {
				default: () => [
					h('button', { class: 'negative-control', tabindex: -2 }, '跳过'),
					h('button', { class: 'valid-control' }, '有效'),
				],
			},
		});
		await flushDrawer();

		const panel = document.body.querySelector<HTMLElement>('.sy-drawer__panel');
		const validControl = document.body.querySelector<HTMLButtonElement>('.valid-control');
		panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
		expect(document.activeElement).toBe(validControl);
	});
});
