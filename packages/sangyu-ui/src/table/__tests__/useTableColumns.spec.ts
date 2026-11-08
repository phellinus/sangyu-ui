import { createCommentVNode, createTextVNode, Fragment, h, type Slots, type VNode } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { TableColumn } from '../components';
import { normalizeTableColumns } from '../composables/useTableColumns';

describe('normalizeTableColumns slot parsing', () => {
	it('returns no columns for absent or empty slots', () => {
		expect(normalizeTableColumns(undefined, {})).toEqual([]);
		expect(normalizeTableColumns([], { default: () => [] })).toEqual([]);
		expect(
			normalizeTableColumns(undefined, {
				default: () => [createCommentVNode(), createTextVNode(' '), h(Fragment, [])],
			}),
		).toEqual([]);
	});

	it('collects fragment columns in order, preserving keys, props and scoped slots', () => {
		const cell = vi.fn(() => h('button', 'cell'));
		const title = vi.fn(() => h('strong', 'title'));
		const first = h(
			TableColumn,
			{ key: 0, title: 'Name', dataIndex: 'name', width: 120, fixed: true },
			{ default: cell, title },
		);
		const second = h(TableColumn, { dataIndex: ['user', 'age'], title: 'Age', width: '80px' });

		const columns = normalizeTableColumns(undefined, {
			default: () => [createCommentVNode(), h(Fragment, [first, h(Fragment, [createTextVNode(' '), second])])],
		});

		expect(columns).toHaveLength(2);
		expect(columns[0]).toMatchObject({
			key: 0,
			__key: '0',
			title: 'Name',
			dataIndex: 'name',
			width: 120,
			fixed: 'left',
			__left: 0,
			__lastFixedLeft: true,
		});
		expect(columns[0].slots).toBe(first.children);
		expect(columns[0].slots?.default).toBe(cell);
		expect(columns[0].slots?.title).toBe(title);
		expect(columns[1]).toMatchObject({ __key: 'user.age', title: 'Age', width: '80px' });
		expect(cell).not.toHaveBeenCalled();
		expect(title).not.toHaveBeenCalled();
	});

	it('ignores raw values, text VNodes, unrelated components and columns inside elements', () => {
		const wrapped = h('div', [h(TableColumn, { title: 'wrapped' })]);
		const unrelated = h({ name: 'OtherColumn', render: () => null });
		const column = h(TableColumn, { title: 'accepted' });

		const columns = normalizeTableColumns(undefined, {
			default: () =>
				[
					null,
					undefined,
					false,
					true,
					0,
					'',
					'text',
					createTextVNode('text'),
					wrapped,
					unrelated,
					column,
				] as VNode[],
		});

		expect(columns).toHaveLength(1);
		expect(columns[0]).toMatchObject({ title: 'accepted', __key: '0' });
	});

	it('matches column component names and display names without requiring the same component identity', () => {
		const named = h({ name: 'SyTableColumn', render: () => null }, { key: 'named', title: 'named' });
		const displayed = h(
			{ displayName: 'SyTableColumn', render: () => null },
			{ key: 'displayed', title: 'displayed' },
		);

		expect(normalizeTableColumns(undefined, { default: () => [named, displayed] })).toMatchObject([
			{ __key: 'named', title: 'named' },
			{ __key: 'displayed', title: 'displayed' },
		]);
	});

	it('preserves shallow array handling instead of traversing every nested array or fragment', () => {
		const direct = h(TableColumn, { title: 'direct' });
		const nested = h(TableColumn, { title: 'nested' });
		const fragment = h(Fragment, [h(TableColumn, { title: 'array fragment' })]);
		const slots: Slots = { default: () => [[direct, [nested], fragment]] as unknown as VNode[] };

		expect(normalizeTableColumns(undefined, slots)).toMatchObject([{ title: 'direct' }]);
	});

	it('uses nonempty prop columns without evaluating the default slot and falls back for empty props', () => {
		const slot = vi.fn(() => [h(TableColumn, { title: 'slot', dataIndex: 'slot' })]);
		const columns = [{ title: 'prop', dataIndex: 'prop' }];

		expect(normalizeTableColumns(columns, { default: slot })).toMatchObject([{ title: 'prop', __key: 'prop' }]);
		expect(slot).not.toHaveBeenCalled();
		expect(normalizeTableColumns([], { default: slot })).toMatchObject([{ title: 'slot', __key: 'slot' }]);
		expect(slot).toHaveBeenCalledTimes(1);
	});
});
