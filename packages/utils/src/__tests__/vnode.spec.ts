import { createCommentVNode, createTextVNode, Fragment, h, type VNodeChild } from 'vue';
import { describe, expect, it } from 'vitest';
import { filterEmpty, isBaseType } from '../vnode';

describe('filterEmpty', () => {
	it('returns an empty list for absent children and empty fragments', () => {
		expect(filterEmpty()).toEqual([]);
		expect(filterEmpty(undefined)).toEqual([]);
		expect(filterEmpty([])).toEqual([]);
		expect(filterEmpty([h(Fragment, []), h(Fragment, [h(Fragment, [])])])).toEqual([]);
	});

	it('recursively unwraps fragments in order and preserves node identity', () => {
		const first = h('button', 'first');
		const second = h('span', 'second');
		const third = h('a', 'third');
		const children = [first, h(Fragment, [h(Fragment, [second]), third])];

		const result = filterEmpty(children);

		expect(result).toEqual([first, second, third]);
		expect(result[0]).toBe(first);
		expect(result[1]).toBe(second);
		expect(result[2]).toBe(third);
		expect(children).toHaveLength(2);
		expect(children[1].type).toBe(Fragment);
	});

	it('filters comments and whitespace text at each fragment level', () => {
		const text = createTextVNode(' text ');
		const element = h('span');

		expect(
			filterEmpty([
				createCommentVNode('v-if'),
				createTextVNode(''),
				createTextVNode(' \n\t '),
				h(Fragment, [createCommentVNode(), createTextVNode(' '), text, element]),
			]),
		).toEqual([text, element]);
	});

	it('keeps raw empty values, booleans, numbers and strings', () => {
		const children: VNodeChild[] = [null, undefined, false, true, 0, 1, '', ' \n ', 'text'];

		expect(filterEmpty(children)).toEqual(children);
	});

	it('skips sparse array holes while retaining explicit undefined entries', () => {
		const children = new Array<VNodeChild>(3);
		const element = h('span');
		children[1] = undefined;
		children[2] = element;

		expect(filterEmpty(children)).toEqual([undefined, element]);
	});

	it('only flattens one array level and filters empty nodes exposed by that level', () => {
		const element = h('button');
		const nested = [createCommentVNode(), element];
		const fragment = h(Fragment, [element]);
		const children = [[createCommentVNode(), createTextVNode(' '), h(Fragment, []), nested, fragment]];

		const result = filterEmpty(children);

		expect(result).toEqual([nested, fragment]);
		expect(result[0]).toBe(nested);
		expect(result[1]).toBe(fragment);
	});

	it('does not traverse element or component children or invoke slots', () => {
		const nested = h('span');
		const element = h('div', [nested]);
		let invoked = false;
		const component = h(
			{ render: () => null },
			{},
			{
				default: () => {
					invoked = true;
					return [nested];
				},
			},
		);

		expect(filterEmpty([element, component])).toEqual([element, component]);
		expect(element.children).toEqual([nested]);
		expect(invoked).toBe(false);
	});
});

describe('isBaseType', () => {
	it.each([null, undefined, false, true, 0, NaN, '', 'text', Symbol('text')])('recognizes %s', (value) => {
		expect(isBaseType(value)).toBe(true);
	});

	it.each([{}, [], () => undefined, h('div'), createTextVNode('text'), BigInt(0)])(
		'does not classify objects, functions or bigint as base types (%s)',
		(value) => {
			expect(isBaseType(value)).toBe(false);
		},
	);
});
