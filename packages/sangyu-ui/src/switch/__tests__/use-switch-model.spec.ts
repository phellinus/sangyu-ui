import { reactive } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import type { SwitchEmits, SwitchProps } from '../Switch.type';
import { useSwitchModel } from '../composables/useSwitchModel';

describe('useSwitchModel', () => {
	it('normalizes unsupported model values to inactiveValue', () => {
		const props = reactive({
			modelValue: 'unknown',
			activeValue: 'on',
			inactiveValue: 'off',
		}) as SwitchProps;

		const emit = vi.fn() as unknown as SwitchEmits;
		const { checked, normalizedValue, nextValue } = useSwitchModel(props, emit);

		expect(checked.value).toBe(false);
		expect(normalizedValue.value).toBe('off');
		expect(nextValue.value).toBe('on');
	});

	it('emits update:modelValue, change and onChange in order when toggled', () => {
		const calls: Array<[string, ...unknown[]]> = [];
		const onChange = vi.fn((value, checked) => {
			calls.push(['onChange', value, checked]);
		});
		const props = reactive({
			modelValue: false,
			activeValue: true,
			inactiveValue: false,
			onChange,
		}) as SwitchProps;

		const emit = ((event: 'update:modelValue' | 'change', ...args: unknown[]) => {
			calls.push([event, ...args]);
		}) as SwitchEmits;

		const { toggle } = useSwitchModel(props, emit);
		toggle();

		expect(calls).toEqual([
			['update:modelValue', true],
			['change', true, true],
			['onChange', true, true],
		]);
		expect(onChange).toHaveBeenCalledOnce();
	});
});
