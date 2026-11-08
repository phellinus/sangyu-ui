import { createCommentVNode, createTextVNode, defineComponent, Fragment, h, type VNode } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getTriggerNode } from '../helpers/getTriggerNode';

describe('getTriggerNode', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('returns no trigger without warning for absent or empty normalized children', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		expect(getTriggerNode(undefined)).toBeNull();
		expect(getTriggerNode([])).toBeNull();
		expect(
			getTriggerNode([createCommentVNode(), createTextVNode(' \n '), h(Fragment, [h(Fragment, [])])]),
		).toBeNull();
		expect(warn).not.toHaveBeenCalled();
	});

	it('returns the original element through nested fragments and ignored nodes', () => {
		const trigger = h('button', { onClick: vi.fn() }, 'trigger');
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		expect(
			getTriggerNode([
				createCommentVNode(),
				h(Fragment, [createTextVNode(' '), h(Fragment, [trigger]), h(Fragment, [])]),
			]),
		).toBe(trigger);
		expect(warn).not.toHaveBeenCalled();
	});

	it('accepts stateful and functional component triggers', () => {
		const component = h(defineComponent({ render: () => h('button') }));
		const functional = h(() => h('button'));

		expect(getTriggerNode([component])).toBe(component);
		expect(getTriggerNode([functional])).toBe(functional);
	});

	it('preserves acceptance of a nonempty text VNode', () => {
		const text = createTextVNode('trigger text');
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		expect(getTriggerNode([text])).toBe(text);
		expect(warn).not.toHaveBeenCalled();
	});

	it.each([null, undefined, false, true, 0, '', ' ', 'text', Symbol('trigger')])(
		'warns and rejects a raw base value (%s)',
		(value) => {
			const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

			expect(getTriggerNode([value] as unknown as VNode[])).toBeNull();
			expect(warn).toHaveBeenCalledExactlyOnceWith('SyTooltip: must have a child component');
		},
	);

	it('warns and rejects multiple children exposed by fragments', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		expect(getTriggerNode([h(Fragment, [h('button'), h(Fragment, [h('span')])])])).toBeNull();
		expect(warn).toHaveBeenCalledExactlyOnceWith('SyTooltip: only one child is allowed');
	});

	it('counts nonempty text VNodes when checking for multiple children', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		expect(getTriggerNode([createTextVNode('text'), h('button')])).toBeNull();
		expect(warn).toHaveBeenCalledExactlyOnceWith('SyTooltip: only one child is allowed');
	});
});
