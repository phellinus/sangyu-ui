import { flushPromises, mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import SyVerify from '../SyVerify.vue';
import type { SequenceChallengeData, SliderChallengeData, VerifyResult } from '../Verify.type';

const sliderChallenge: SliderChallengeData = {
	id: 's1',
	mode: 'slider',
	image: 'slider.png',
	pieceY: 48,
	targetX: 160,
};

const sequenceChallenge: SequenceChallengeData = {
	id: 'q1',
	mode: 'sequence',
	image: 'sequence.png',
	items: [
		{ id: 'a', text: '春', x: 56, y: 48 },
		{ id: 'b', text: '夏', x: 284, y: 36 },
		{ id: 'c', text: '秋', x: 120, y: 148 },
		{ id: 'd', text: '冬', x: 312, y: 136 },
	],
	prompt: ['春', '夏', '秋', '冬'],
};

// jsdom 没有真实布局与指针捕获：固定轨道宽度供 maxOffset 计算，捕获方法置为空实现
beforeAll(() => {
	Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, get: () => 400 });
	Element.prototype.setPointerCapture = vi.fn();
});

function pointerEvent(type: string, clientX: number) {
	const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX });
	Object.assign(event, { pointerId: 1 });
	return event;
}

function mountVerify(props: Record<string, unknown> = {}) {
	return mount(SyVerify, {
		props: {
			challenge: sliderChallenge,
			verify: vi.fn(async () => ({ success: true })),
			...props,
		},
	});
}

// 模拟一次完整拖动：按下、移动、松手，松手时组件提交答案
// 拖动是相对位移：from 为按下时的指针位置，需与滑块当前偏移对应
async function dragSlider(wrapper: ReturnType<typeof mountVerify>, to: number, from = 0) {
	const handle = wrapper.get('.sy-verify-slider-handle');
	handle.element.dispatchEvent(pointerEvent('pointerdown', from));
	handle.element.dispatchEvent(pointerEvent('pointermove', to));
	handle.element.dispatchEvent(pointerEvent('pointerup', to));
	await flushPromises();
}

describe('SyVerify', () => {
	it('按 challenge.mode 渲染对应挑战区域', async () => {
		const wrapper = mountVerify();
		expect(wrapper.find('.sy-verify-slider').exists()).toBe(true);
		expect(wrapper.find('.sy-verify-sequence').exists()).toBe(false);

		await wrapper.setProps({ challenge: sequenceChallenge });
		expect(wrapper.find('.sy-verify-slider').exists()).toBe(false);
		expect(wrapper.find('.sy-verify-sequence').exists()).toBe(true);
	});

	it('拖动松手后提交答案，且拖动距离被限制在轨道范围内', async () => {
		const verify = vi.fn(async () => ({ success: true }));
		const wrapper = mountVerify({ verify });

		// 轨道宽 400、滑块宽 48，最大偏移 352；超出与负值都应被夹紧
		await dragSlider(wrapper, 500);
		expect(verify).toHaveBeenCalledWith({ mode: 'slider', challengeId: 's1', offsetX: 352 });

		// 上一次拖动停在 352，从该位置往回拖超出起点，应被夹紧到 0
		await dragSlider(wrapper, -50, 352);
		expect(verify).toHaveBeenLastCalledWith({ mode: 'slider', challengeId: 's1', offsetX: 0 });
	});

	it('校验成功时触发 success 并携带校验结果', async () => {
		const result: VerifyResult = { success: true, token: 'token-1' };
		const wrapper = mountVerify({ verify: vi.fn(async () => result) });

		await dragSlider(wrapper, 160);
		expect(wrapper.emitted('success')?.[0]).toEqual([result]);
		expect(wrapper.emitted('fail')).toBeUndefined();
	});

	it('校验失败时触发 fail，滑块回弹到起点并恢复可拖动', async () => {
		const verify = vi.fn(async () => ({ success: false }));
		const wrapper = mountVerify({ verify });

		await dragSlider(wrapper, 100);
		expect(wrapper.emitted('fail')?.[0]).toEqual([{ mode: 'slider', challengeId: 's1', offsetX: 100 }]);

		// 回弹期间进入 is-resetting 过渡窗口，位置已归零
		const slider = wrapper.get('.sy-verify-slider');
		expect(slider.classes()).toContain('is-resetting');
		expect(wrapper.get('.sy-verify-slider-piece').attributes('style')).toContain('left: 0px');

		// 兜底定时器结束后退出回弹状态，可以继续拖动
		await new Promise((resolve) => setTimeout(resolve, 450));
		expect(slider.classes()).not.toContain('is-resetting');
		await dragSlider(wrapper, 160);
		expect(verify).toHaveBeenCalledTimes(2);
	});

	it('verify 抛异常时同样触发 fail', async () => {
		const wrapper = mountVerify({
			verify: vi.fn(async () => {
				throw new Error('network');
			}),
		});

		await dragSlider(wrapper, 160);
		expect(wrapper.emitted('fail')).toHaveLength(1);
		expect(wrapper.emitted('success')).toBeUndefined();
	});

	it('校验期间禁用交互，重复拖动不会重复提交', async () => {
		let resolveVerify!: (result: VerifyResult) => void;
		const verify = vi.fn(
			() =>
				new Promise<VerifyResult>((resolve) => {
					resolveVerify = resolve;
				}),
		);
		const wrapper = mountVerify({ verify });

		await dragSlider(wrapper, 160);
		expect(wrapper.get('.sy-verify-slider-handle').attributes('disabled')).toBeDefined();

		await dragSlider(wrapper, 100);
		expect(verify).toHaveBeenCalledTimes(1);

		resolveVerify({ success: true });
		await flushPromises();
		expect(wrapper.emitted('success')).toHaveLength(1);
	});

	it('刷新后旧挑战的校验结果不会触发 success', async () => {
		let resolveVerify!: (result: VerifyResult) => void;
		const verify = vi.fn(
			() =>
				new Promise<VerifyResult>((resolve) => {
					resolveVerify = resolve;
				}),
		);
		const wrapper = mountVerify({ verify });

		await dragSlider(wrapper, 160);
		await wrapper.get('.sy-verify-header button').trigger('click');
		expect(wrapper.emitted('refresh')).toHaveLength(1);

		resolveVerify({ success: true });
		await flushPromises();
		expect(wrapper.emitted('success')).toBeUndefined();
		expect(wrapper.get('.sy-verify-slider-handle').attributes('disabled')).toBeUndefined();
	});

	it('loading 为 true 时禁用拖动', async () => {
		const verify = vi.fn(async () => ({ success: true }));
		const wrapper = mountVerify({ verify, loading: true });

		expect(wrapper.get('.sy-verify-slider-handle').attributes('disabled')).toBeDefined();
		await dragSlider(wrapper, 160);
		expect(verify).not.toHaveBeenCalled();
	});

	it('顺序点选按点击顺序提交 id 序列，且只提交一次', async () => {
		const verify = vi.fn(async () => ({ success: true }));
		const wrapper = mountVerify({ challenge: sequenceChallenge, verify });

		const items = wrapper.findAll('.sy-verify-sequence-item');
		for (const item of items) {
			await item.trigger('click');
		}
		await flushPromises();

		expect(verify).toHaveBeenCalledTimes(1);
		expect(verify).toHaveBeenCalledWith({ mode: 'sequence', challengeId: 'q1', itemIds: ['a', 'b', 'c', 'd'] });

		// 点满后全部禁用，继续点击不会再次提交
		await items[0].trigger('click');
		expect(verify).toHaveBeenCalledTimes(1);
	});

	it('顺序点选重复点击同一文字不计数', async () => {
		const verify = vi.fn(async () => ({ success: true }));
		const wrapper = mountVerify({ challenge: sequenceChallenge, verify });

		const items = wrapper.findAll('.sy-verify-sequence-item');
		await items[0].trigger('click');
		await items[0].trigger('click');
		await items[1].trigger('click');
		await items[2].trigger('click');
		await flushPromises();
		expect(verify).not.toHaveBeenCalled();

		await items[3].trigger('click');
		await flushPromises();
		expect(verify).toHaveBeenCalledWith({ mode: 'sequence', challengeId: 'q1', itemIds: ['a', 'b', 'c', 'd'] });
	});

	it('challenge.id 变化时重建挑战并清空点选进度', async () => {
		const wrapper = mountVerify({ challenge: sequenceChallenge });

		await wrapper.findAll('.sy-verify-sequence-item')[0].trigger('click');
		expect(wrapper.findAll('.sy-verify-sequence-item')[0].attributes('disabled')).toBeDefined();

		await wrapper.setProps({ challenge: { ...sequenceChallenge, id: 'q2' } });
		expect(wrapper.findAll('.sy-verify-sequence-item')[0].attributes('disabled')).toBeUndefined();
	});
});
