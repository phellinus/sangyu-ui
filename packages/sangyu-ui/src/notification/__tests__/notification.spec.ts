import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SyNotification from '../notification';
import { createNotification } from '../instance';
import type { NotificationInstance } from '../interface';

describe('SyNotification', () => {
	afterEach(() => {
		vi.useRealTimers();
		document.body.innerHTML = '';
	});

	it('renders notification content, type and position via exposed add', async () => {
		let instance: NotificationInstance | undefined;
		const wrapper = mount(SyNotification, {
			props: {
				onReady: (_instance: NotificationInstance) => {
					instance = _instance;
				},
			},
		});

		instance?.add({
			title: '系统提示',
			content: '发布成功',
			position: 'top-left',
			clamp: 2,
			type: 'success',
			durnation: 0,
		});
		await nextTick();

		expect(wrapper.find('.sy-notification-position-top-left').exists()).toBe(true);
		expect(wrapper.get('.sy-notification-wrapper-title').text()).toBe('系统提示');
		expect(wrapper.get('.sy-notification-wrapper-content').text()).toBe('发布成功');
		expect(wrapper.get('.sy-notification-icon-success').classes()).toContain('sy-notification-icon-success');
		expect(wrapper.get('.sy-notification-notify').attributes('style')).toContain(
			'--sy-notification-line-clamp: 2;',
		);
	});

	it('auto-removes notifications after duration elapses', async () => {
		vi.useFakeTimers();
		let instance: NotificationInstance | undefined;
		const wrapper = mount(SyNotification, {
			props: {
				onReady: (_instance: NotificationInstance) => {
					instance = _instance;
				},
			},
		});

		instance?.add({
			title: '自动关闭',
			content: '稍后消失',
			durnation: 20,
		});
		await nextTick();
		expect(wrapper.findAll('.sy-notification-notify')).toHaveLength(1);

		vi.advanceTimersByTime(21);
		await nextTick();

		expect(wrapper.find('.sy-notification-notify').exists()).toBe(false);
	});

	it('supports service creation and manual close callbacks', async () => {
		vi.useFakeTimers();
		const onClose = vi.fn();
		const service = createNotification();

		service.info({
			title: '服务通知',
			content: '请处理',
			showClose: true,
			onClose,
			durnation: 0,
		});
		await nextTick();

		expect(document.body.querySelector('.sy-notification-wrapper-title')?.textContent).toBe('服务通知');
		(document.body.querySelector('.sy-notification-close') as Element).dispatchEvent(new Event('click'));
		await nextTick();

		expect(onClose).toHaveBeenCalledTimes(1);
		expect(document.body.querySelector('.sy-notification-notify')).toBeNull();
	});
});
