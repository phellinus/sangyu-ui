import { enableAutoUnmount, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createNotification } from '../Notification.service';
import SyNotificationContainer from '../SyNotification';
import type { NotificationManager } from '../Notification.type';

enableAutoUnmount(afterEach);

describe('SyNotification', () => {
	afterEach(() => {
		vi.useRealTimers();
		document.body.innerHTML = '';
	});

	it('通过管理器添加通知后正确渲染内容、类型、位置和折叠行数', async () => {
		let manager: NotificationManager | undefined;
		const wrapper = mount(SyNotificationContainer, {
			props: {
				onReady: (instance: NotificationManager) => {
					manager = instance;
				},
			},
		});

		expect(manager).toBeDefined();

		manager?.add({
			title: '系统提示',
			content: '发布成功',
			position: 'top-left',
			clamp: 2,
			type: 'success',
			duration: 0,
		});
		await nextTick();

		expect(wrapper.find('.sy-notification-position-top-left').exists()).toBe(true);
		expect(wrapper.get('.sy-notification-wrapper-title').text()).toBe('系统提示');
		expect(wrapper.get('.sy-notification-wrapper-content').text()).toBe('发布成功');
		expect(wrapper.get('.sy-notification-icon-success').attributes('aria-hidden')).toBe('true');
		expect(wrapper.get('.sy-notification-wrapper-content').attributes('style')).toContain(
			'--sy-notification-line-clamp: 2;',
		);
	});

	it('未传可选配置时使用默认位置、折叠行数和关闭按钮', async () => {
		let manager: NotificationManager | undefined;
		const wrapper = mount(SyNotificationContainer, {
			props: {
				onReady: (instance: NotificationManager) => {
					manager = instance;
				},
			},
		});

		manager?.add({
			title: '默认通知',
			content: '使用默认配置',
			duration: 0,
		});
		await nextTick();

		expect(wrapper.find('.sy-notification-position-top-right').exists()).toBe(true);
		expect(wrapper.get('.sy-notification-wrapper-content').attributes('style')).toContain(
			'--sy-notification-line-clamp: 3;',
		);
		expect(wrapper.find('button[aria-label="关闭通知"]').exists()).toBe(true);
		expect(wrapper.find('.sy-notification-icon').exists()).toBe(false);
	});

	it('到达duration后自动移除通知且不触发onClose', async () => {
		vi.useFakeTimers();
		const onClose = vi.fn();
		let manager: NotificationManager | undefined;
		const wrapper = mount(SyNotificationContainer, {
			props: {
				onReady: (instance: NotificationManager) => {
					manager = instance;
				},
			},
		});

		manager?.add({
			title: '自动关闭',
			content: '稍后消失',
			duration: 20,
			onClose,
		});
		await nextTick();

		expect(wrapper.findAll('.sy-notification-notify')).toHaveLength(1);

		vi.advanceTimersByTime(20);
		await nextTick();

		expect(wrapper.find('.sy-notification-notify').exists()).toBe(false);
		expect(onClose).not.toHaveBeenCalled();
	});

	it('点击关闭按钮时移除通知并触发onClose', async () => {
		const onClose = vi.fn();
		const service = createNotification();

		try {
			service.info({
				title: '服务通知',
				content: '请处理',
				showClose: true,
				onClose,
				duration: 0,
			});
			await nextTick();

			expect(document.body.querySelector('.sy-notification-wrapper-title')?.textContent).toBe('服务通知');

			(document.body.querySelector('.sy-notification-close') as HTMLButtonElement).click();
			await nextTick();

			expect(onClose).toHaveBeenCalledTimes(1);
			expect(document.body.querySelector('.sy-notification-notify')).toBeNull();
		} finally {
			service.destroy();
		}
	});

	it('调用返回的关闭函数时移除通知但不触发onClose', async () => {
		const onClose = vi.fn();
		const service = createNotification();

		try {
			const close = service.info({
				title: '程序关闭',
				content: '由业务代码主动关闭',
				onClose,
				duration: 0,
			});
			await nextTick();

			expect(document.body.querySelector('.sy-notification-notify')).not.toBeNull();

			close();
			await nextTick();

			expect(document.body.querySelector('.sy-notification-notify')).toBeNull();
			expect(onClose).not.toHaveBeenCalled();
		} finally {
			service.destroy();
		}
	});

	it('destroy销毁容器并清理未执行的计时器', async () => {
		vi.useFakeTimers();
		const service = createNotification();

		service.info({
			title: '待销毁通知',
			content: '计时器尚未结束',
			duration: 1000,
		});
		await nextTick();

		expect(document.body.querySelector('.sy-notification-host')).not.toBeNull();
		expect(vi.getTimerCount()).toBe(1);

		service.destroy();

		expect(document.body.querySelector('.sy-notification-host')).toBeNull();
		expect(vi.getTimerCount()).toBe(0);
	});
});
