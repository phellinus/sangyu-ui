import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, reactive, ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { ThemeProvider, useTheme } from '../../index';
import SyCheckbox from '../../checkbox/SyCheckbox';
import SyRadio from '../../radio/syradio';
import SySelect from '../../select/SySelect';
import SySwitch from '../../switch/SySwitch.vue';
import SyInput from '../../input/SyInput.vue';
import SyForm from '../SyForm';
import SyFormItem from '../SyFormItem';
import { lightTheme, darkTheme, themeToVariables } from '../../index';

const model = reactive({ name: '', choice: '', checked: false, radio: 'one', enabled: false });

describe('Form theme integration', () => {
	it('has form component tokens in both presets with semantic status references', () => {
		for (const theme of [lightTheme, darkTheme]) {
			expect(theme.components.form.labelWidth).toBe('auto');
			expect(theme.components.form.warningColor).toEqual({ ref: 'semantic.color.warning' });
			expect(theme.components.form.warningMessageColor).toEqual({ ref: 'semantic.color.warningActive' });
		}
		const vars = themeToVariables(lightTheme);
		expect(vars['--sy-form-required-mark-margin']).toBe('4px');
		expect(vars['--sy-form-vertical-label-padding']).toBe('0 0 6px');
		expect(vars['--sy-form-control-width']).toBe('90%');
		expect(vars['--sy-form-warning-color']).toBe('var(--sy-color-warning)');
		expect(vars['--sy-form-warning-message-color']).toBe('var(--sy-color-warning-active)');
	});

	it('keeps controls and Form context while theme scopes nest and update', async () => {
		const dark = ref(false);
		const required = ref(false);
		const width = ref('90%');
		const feedbackSize = ref('16px');
		const FormProbe = defineComponent({
			setup() {
				const theme = useTheme();
				return () => h('i', { class: 'form-probe' }, theme.mode.value);
			},
		});
		const Host = defineComponent(
			() => () =>
				h(ThemeProvider, { mode: dark.value ? 'dark' : 'light' }, () =>
					h(
						ThemeProvider,
						{
							tokens: {
								components: { form: { controlWidth: width.value, feedbackWidth: feedbackSize.value } },
							},
						},
						() =>
							h(SyForm, { model, disabled: true, labelWidth: 96 }, () => [
								h(
									SyFormItem,
									{
										name: 'name',
										label: 'Name',
										help: 'Invalid name',
										required: required.value,
										hasFeedback: true,
										validateStatus: 'error',
									},
									() =>
										h(SyInput, {
											modelValue: model.name,
											'onUpdate:modelValue': (v: string) => (model.name = v),
										}),
								),
								h(SyFormItem, { name: 'choice', label: 'Choice' }, () =>
									h(SySelect, {
										modelValue: model.choice,
										options: [{ label: 'One', value: 'one' }],
									}),
								),
								h(SyFormItem, { name: 'checked' }, () => h(SyCheckbox, { modelValue: model.checked })),
								h(SyFormItem, { name: 'radio' }, () => h(SyRadio, { checked: model.radio === 'one' })),
								h(SyFormItem, { name: 'enabled' }, () => h(SySwitch, { modelValue: model.enabled })),
								h(FormProbe),
							]),
					),
				),
		);
		const wrapper = mount(Host);
		const scopes = wrapper.findAll('[data-sy-theme]');
		const form = wrapper.get('form');
		const item = wrapper.get('.sy-form-item');
		expect(scopes).toHaveLength(2);
		expect(scopes[1].element.getAttribute('style')).toContain('--sy-form-control-width: 90%');
		expect(item.classes()).toContain('sy-form-item--error');
		expect(item.get('.sy-form-item__message').text()).toBe('Invalid name');
		expect(item.get('.sy-form-item__feedback').text()).toBe('×');
		expect(form.attributes('aria-disabled')).toBe('true');
		expect(wrapper.findAll('input').length).toBeGreaterThanOrEqual(4);
		expect(wrapper.find('.form-probe').text()).toBe('light');
		required.value = true;
		width.value = '72%';
		feedbackSize.value = '20px';
		dark.value = true;
		await nextTick();
		expect(scopes[1].element.getAttribute('style')).toContain('--sy-form-control-width: 72%');
		expect(scopes[1].element.getAttribute('style')).toContain('--sy-form-feedback-width: 20px');
		expect(wrapper.get('.sy-form-item').classes()).toContain('sy-form-item--required');
		expect(wrapper.find('.form-probe').text()).toBe('dark');
		wrapper.unmount();
	});
});
