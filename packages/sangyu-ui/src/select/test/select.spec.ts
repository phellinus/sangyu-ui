import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import { defineComponent, h, nextTick, reactive, ref } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SyForm, SyFormItem } from '../../form';
import SySelect from '../SySelect';
import type { SelectModelValue, SelectOption } from '../Select.type';

const options: SelectOption[] = [
	{ label: '设计系统', value: 'design' },
	{ label: '组件库', value: 'components' },
	{ label: '文档站', value: 'docs', code: 'DOC' },
];

const mountedWrappers: Array<{ unmount: () => void }> = [];

/**
 * 挂载 Select 并记录实例，测试结束后统一卸载全局事件监听。
 * @param mountingOptions Vue Test Utils 挂载配置
 */
const mountSelect = (mountingOptions: ComponentMountingOptions<typeof SySelect> = {}) => {
	const wrapper = mount(SySelect, mountingOptions);
	mountedWrappers.push(wrapper);
	return wrapper;
};

afterEach(() => {
	mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount());
	vi.useRealTimers();
	document.body.innerHTML = '';
});

describe('SySelect', () => {
	it('renders placeholder, size, width and custom style', () => {
		const wrapper = mountSelect({
			props: {
				modelValue: undefined,
				options,
				size: 'large',
				width: '320px',
				customStyle: { marginTop: '8px' },
			},
		});

		expect(wrapper.classes()).toEqual(expect.arrayContaining(['sy-select', 'sy-select-large']));
		expect(wrapper.get('.sy-select-placeholder').text()).toBe('请选择');
		expect(wrapper.attributes('style')).toContain('width: 320px;');
		expect(wrapper.attributes('style')).toContain('margin-top: 8px;');
		expect(wrapper.get('.sy-select-trigger').attributes('tabindex')).toBe('0');
	});

	it('opens on trigger click and closes when clicking outside', async () => {
		const wrapper = mountSelect({
			attachTo: document.body,
			props: {
				modelValue: undefined,
				options,
				virtual: false,
			},
		});

		await wrapper.get('.sy-select-trigger').trigger('click');

		expect(wrapper.classes()).toContain('sy-select-open');
		expect(wrapper.findAll('.sy-select-option')).toHaveLength(3);
		expect(wrapper.emitted('visibleChange')).toEqual([[true]]);

		document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
		await nextTick();

		expect(wrapper.classes()).not.toContain('sy-select-open');
		expect(wrapper.find('.sy-select-dropdown').exists()).toBe(false);
		expect(wrapper.emitted('visibleChange')).toEqual([[true], [false]]);
	});

	it('selects an enabled option and closes single-select dropdown', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: undefined,
				options,
				virtual: false,
			},
		});

		await wrapper.get('.sy-select-trigger').trigger('click');
		await wrapper.findAll('.sy-select-option')[1].trigger('click');

		expect(wrapper.emitted('update:modelValue')).toEqual([['components']]);
		expect(wrapper.emitted('change')).toEqual([['components', options[1]]]);
		expect(wrapper.classes()).not.toContain('sy-select-open');
	});

	it('blocks disabled component and disabled option interactions', async () => {
		const disabledWrapper = mountSelect({
			props: {
				modelValue: undefined,
				options,
				disabled: true,
			},
		});

		await disabledWrapper.get('.sy-select-trigger').trigger('click');
		expect(disabledWrapper.classes()).toContain('sy-select-disabled');
		expect(disabledWrapper.get('.sy-select-trigger').attributes('tabindex')).toBe('-1');
		expect(disabledWrapper.find('.sy-select-dropdown').exists()).toBe(false);

		const optionWrapper = mountSelect({
			props: {
				modelValue: undefined,
				options: [{ label: '禁用选项', value: 'disabled', disabled: true }],
				virtual: false,
			},
		});

		await optionWrapper.get('.sy-select-trigger').trigger('click');
		await optionWrapper.get('.sy-select-option').trigger('click');

		expect(optionWrapper.get('.sy-select-option').classes()).toContain('sy-select-option-disabled');
		expect(optionWrapper.emitted('update:modelValue')).toBeUndefined();
	});

	it('inherits the Form disabled state and reacts to dynamic updates', async () => {
		const formDisabled = ref(false);
		const model = reactive<{ category: SelectModelValue }>({
			category: undefined,
		});
		const wrapper = mount(
			defineComponent({
				components: {
					SyForm,
					SyFormItem,
					SySelect,
				},

				/**
				 * 提供测试所需的表单模型、选项和动态禁用状态。
				 */
				setup() {
					return {
						formDisabled,
						model,
						options,
					};
				},

				template: `
					<SyForm :model="model" :disabled="formDisabled">
						<SyFormItem name="category">
							<SySelect
								v-model="model.category"
								:options="options"
								filterable
								:virtual="false"
							/>
						</SyFormItem>
					</SyForm>
				`,
			}),
		);
		mountedWrappers.push(wrapper);

		const select = wrapper.getComponent(SySelect);
		const trigger = select.get('.sy-select-trigger');
		const searchInput = select.get('.sy-select-search');

		// 先展开面板，用于验证 Form 动态禁用后会主动收起。
		await trigger.trigger('click');
		expect(select.classes()).toContain('sy-select-open');

		formDisabled.value = true;
		await nextTick();

		expect(select.classes()).toContain('sy-select-disabled');
		expect(select.attributes('aria-disabled')).toBe('true');
		expect(trigger.attributes('tabindex')).toBe('-1');
		expect(searchInput.attributes('disabled')).toBeDefined();
		expect(select.classes()).not.toContain('sy-select-open');
		expect(select.emitted('visibleChange')).toEqual([[true], [false]]);

		// Form 禁用期间，点击和键盘事件都不能重新打开面板或修改模型。
		await trigger.trigger('click');
		await select.trigger('keydown', { key: 'ArrowDown' });
		await select.trigger('keydown', { key: 'Enter' });

		expect(select.find('.sy-select-dropdown').exists()).toBe(false);
		expect(select.emitted('update:modelValue')).toBeUndefined();
		expect(model.category).toBeUndefined();

		// Form 恢复可用后，Select 应立即恢复正常交互。
		formDisabled.value = false;
		await nextTick();

		expect(select.classes()).not.toContain('sy-select-disabled');
		expect(select.attributes('aria-disabled')).toBe('false');
		expect(trigger.attributes('tabindex')).toBe('0');
		expect(searchInput.attributes('disabled')).toBeUndefined();

		await trigger.trigger('click');
		await select.findAll('.sy-select-option')[0].trigger('click');

		expect(model.category).toBe('design');
	});

	it('clears the selected value without toggling the dropdown', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: 'design',
				options,
				clearable: true,
			},
		});

		expect(wrapper.get('.sy-select-value').text()).toBe('设计系统');
		expect(wrapper.find('.sy-select-clear svg').exists()).toBe(true);

		await wrapper.get('.sy-select-clear').trigger('click');

		expect(wrapper.emitted('update:modelValue')).toEqual([[undefined]]);
		expect(wrapper.emitted('change')?.[0][0]).toBeUndefined();
		expect(wrapper.emitted('clear')).toEqual([[]]);
		expect(wrapper.emitted('visibleChange')).toBeUndefined();
	});

	it('renders multiple tags, limits visible tags and removes a tag', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: ['design', 'components', 'docs'],
				options,
				multiple: true,
				maxTagCount: 2,
			},
		});

		const tags = wrapper.findAll('.sy-select-tags-item');
		expect(tags).toHaveLength(3);
		expect(tags[0].text()).toContain('设计系统');
		expect(tags[1].text()).toContain('组件库');
		expect(tags[2].text()).toBe('+1');
		expect(wrapper.findAll('.sy-select-tags-close-icon')).toHaveLength(2);

		await wrapper.findAll('.sy-select-tags-close')[0].trigger('click');

		expect(wrapper.emitted('update:modelValue')).toEqual([[['components', 'docs']]]);
		expect(wrapper.emitted('change')?.[0][1]).toEqual([options[1], options[2]]);
		expect(wrapper.emitted('visibleChange')).toBeUndefined();
	});

	it('respects the maximum number of multiple selections', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: ['design'],
				options,
				multiple: true,
				max: 1,
				virtual: false,
			},
		});

		await wrapper.get('.sy-select-trigger').trigger('click');
		await wrapper.findAll('.sy-select-option')[1].trigger('click');

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
	});

	it('filters options locally and emits the search keyword', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: undefined,
				options,
				filterable: true,
				virtual: false,
			},
		});
		const input = wrapper.get('.sy-select-search');

		await input.trigger('focus');
		await input.setValue('文档');

		expect(wrapper.findAll('.sy-select-option')).toHaveLength(1);
		expect(wrapper.get('.sy-select-option').text()).toContain('文档站');
		expect(wrapper.emitted('search')).toEqual([['文档']]);
	});

	it('supports a custom local filter method', async () => {
		const filterMethod = vi.fn((query: string, option: SelectOption) =>
			String(option.code ?? '').toLowerCase().includes(query.toLowerCase()),
		);
		const wrapper = mountSelect({
			props: {
				modelValue: undefined,
				options,
				filterable: true,
				filterMethod,
				virtual: false,
			},
		});

		await wrapper.get('.sy-select-search').trigger('focus');
		await wrapper.get('.sy-select-search').setValue('doc');

		expect(wrapper.findAll('.sy-select-option')).toHaveLength(1);
		expect(wrapper.get('.sy-select-option').text()).toContain('文档站');
		expect(filterMethod).toHaveBeenCalledTimes(options.length);
	});

	it('shows the typed label candidate and appends the created label to the dropdown bottom', async () => {
		const labelOptions: SelectOption[] = [
			{ label: 'Vue', value: 'Vue' },
			{ label: 'React', value: 'React' },
		];
		const wrapper = mountSelect({
			props: {
				modelValue: ['Vue', '已有标签'],
				options: labelOptions,
				mode: 'label',
				virtual: false,
			},
		});
		const input = wrapper.get('.sy-select-search');

		await input.trigger('focus');
		await input.setValue('新标签');

		expect(wrapper.find('.sy-select-dropdown-empty').exists()).toBe(false);
		expect(wrapper.findAll('.sy-select-option')).toHaveLength(1);
		expect(wrapper.get('.sy-select-option').text()).toBe('新标签');
		expect(wrapper.get('.sy-select-option').classes()).not.toContain('sy-select-option-selected');

		await input.trigger('keydown', { key: 'Enter' });

		const nextValue = wrapper.emitted('update:modelValue')?.[0][0] as SelectModelValue;
		expect(nextValue).toEqual(['Vue', '已有标签', '新标签']);

		// 模拟父组件响应 v-model 更新，让新标签重新进入下拉选项列表
		await wrapper.setProps({ modelValue: nextValue });

		const dropdownOptions = wrapper.findAll('.sy-select-option');
		expect(dropdownOptions.map((option) => option.text())).toEqual(['Vue✓', 'React', '已有标签✓', '新标签✓']);
		expect(dropdownOptions.at(-1)?.classes()).toContain('sy-select-option-selected');
	});

	it('reuses an existing label option and does not create duplicate labels', async () => {
		const labelOptions: SelectOption[] = [
			{ label: 'Vue', value: 'vue' },
			{ label: 'React', value: 'react' },
		];
		const wrapper = mountSelect({
			props: {
				modelValue: ['vue'],
				options: labelOptions,
				mode: 'label',
				virtual: false,
			},
		});
		const input = wrapper.get('.sy-select-search');

		await input.trigger('focus');
		await input.setValue('VUE');
		await input.trigger('keydown', { key: 'Enter' });

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect((input.element as HTMLInputElement).value).toBe('');

		await input.setValue('React');
		await input.trigger('keydown', { key: 'Enter' });

		expect(wrapper.emitted('update:modelValue')).toEqual([[['vue', 'react']]]);
	});

	it('creates a label by clicking the typed candidate option', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: [],
				options: [],
				mode: 'label',
				virtual: false,
			},
		});
		const input = wrapper.get('.sy-select-search');

		await input.trigger('focus');
		await input.setValue('可点击标签');
		await wrapper.get('.sy-select-option').trigger('click');

		expect(wrapper.emitted('update:modelValue')).toEqual([[['可点击标签']]]);
		expect(wrapper.emitted('change')?.[0][1]).toEqual([
			{ label: '可点击标签', value: '可点击标签' },
		]);
	});

	it('respects max when creating labels with Enter', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: ['已有标签'],
				options: [],
				mode: 'label',
				max: 1,
				virtual: false,
			},
		});
		const input = wrapper.get('.sy-select-search');

		await input.trigger('focus');
		await input.setValue('超出限制');
		await input.trigger('keydown', { key: 'Enter' });

		expect(wrapper.emitted('update:modelValue')).toBeUndefined();
		expect((input.element as HTMLInputElement).value).toBe('超出限制');
	});

	it('debounces remote search, displays loading and aborts the stale request', async () => {
		vi.useFakeTimers();
		const signals: AbortSignal[] = [];
		let resolveLatest: (() => void) | undefined;
		const remoteMethod = vi.fn((_query: string, signal: AbortSignal) => {
			return new Promise<void>((resolve, reject) => {
				signals.push(signal);
				resolveLatest = resolve;
				signal.addEventListener(
					'abort',
					() => reject(new DOMException('请求已取消', 'AbortError')),
					{ once: true },
				);
			});
		});
		const wrapper = mountSelect({
			props: {
				modelValue: undefined,
				options,
				filterable: true,
				remoteMethod,
				remoteDebounce: 100,
				virtual: false,
			},
		});
		const input = wrapper.get('.sy-select-search');

		await input.trigger('focus');
		await input.setValue('de');
		vi.advanceTimersByTime(99);
		expect(remoteMethod).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		await nextTick();
		expect(remoteMethod).toHaveBeenCalledTimes(1);
		expect(wrapper.get('.sy-select-dropdown-loading').text()).toBe('加载中...');

		await input.setValue('design');
		expect(signals[0].aborted).toBe(true);

		vi.advanceTimersByTime(100);
		await nextTick();
		expect(remoteMethod).toHaveBeenCalledTimes(2);
		expect(remoteMethod.mock.calls[1][0]).toBe('design');

		resolveLatest?.();
		await Promise.resolve();
		await nextTick();

		expect(wrapper.find('.sy-select-dropdown-loading').exists()).toBe(false);
	});

	it('navigates with the keyboard, skips disabled options and selects with Enter', async () => {
		const keyboardOptions: SelectOption[] = [
			{ label: '不可选择', value: 'disabled', disabled: true },
			{ label: '可以选择', value: 'enabled' },
		];
		const wrapper = mountSelect({
			props: {
				modelValue: undefined,
				options: keyboardOptions,
				virtual: false,
			},
		});

		await wrapper.get('.sy-select-trigger').trigger('click');
		await wrapper.trigger('keydown', { key: 'ArrowDown' });

		expect(wrapper.findAll('.sy-select-option')[1].classes()).toContain('sy-select-option-active');

		await wrapper.trigger('keydown', { key: 'Enter' });
		expect(wrapper.emitted('update:modelValue')).toEqual([['enabled']]);
	});

	it('closes with Escape and deletes selected values with Backspace or Delete', async () => {
		const singleWrapper = mountSelect({
			props: {
				modelValue: 'docs',
				options,
				filterable: true,
				virtual: false,
			},
		});
		const input = singleWrapper.get('.sy-select-search');

		await input.trigger('focus');
		await singleWrapper.trigger('keydown', { key: 'Escape' });
		expect(singleWrapper.emitted('visibleChange')).toEqual([[true], [false]]);

		await input.setValue('d');
		await input.trigger('keydown', { key: 'Backspace' });
		expect(singleWrapper.emitted('update:modelValue')).toBeUndefined();

		await input.setValue('');
		await input.trigger('keydown', { key: 'Backspace' });
		expect(singleWrapper.emitted('update:modelValue')).toEqual([[undefined]]);
		expect(singleWrapper.emitted('clear')).toEqual([[]]);

		const multipleWrapper = mountSelect({
			props: {
				modelValue: ['design', 'components'],
				options,
				multiple: true,
				filterable: true,
			},
		});

		await multipleWrapper.get('.sy-select-search').trigger('keydown', { key: 'Delete' });
		expect(multipleWrapper.emitted('update:modelValue')).toEqual([[['design']]]);
	});

	it('renders custom option, label, loading and empty slots', async () => {
		const optionWrapper = mountSelect({
			props: {
				modelValue: 'design',
				options,
				virtual: false,
			},
			slots: {
				label: ({ option }: { option?: SelectOption }) => h('strong', { class: 'custom-label' }, option?.label),
				option: ({ option, selected }: { option: SelectOption; selected: boolean }) =>
					h('span', { class: 'custom-option' }, `${option.label}-${selected}`),
			},
		});

		expect(optionWrapper.get('.custom-label').text()).toBe('设计系统');
		await optionWrapper.get('.sy-select-trigger').trigger('click');
		expect(optionWrapper.findAll('.custom-option')).toHaveLength(options.length);
		expect(optionWrapper.findAll('.custom-option')[0].text()).toBe('设计系统-true');

		const stateWrapper = mountSelect({
			props: {
				modelValue: undefined,
				options: [],
				loading: true,
			},
			slots: {
				loading: () => h('span', { class: 'custom-loading' }, '正在加载'),
				empty: () => h('span', { class: 'custom-empty' }, '没有结果'),
			},
		});

		await stateWrapper.get('.sy-select-trigger').trigger('click');
		expect(stateWrapper.get('.custom-loading').text()).toBe('正在加载');

		await stateWrapper.setProps({ loading: false });
		expect(stateWrapper.get('.custom-empty').text()).toBe('没有结果');
	});

	it('emits focus and blur events from the trigger', async () => {
		const wrapper = mountSelect({
			props: {
				modelValue: undefined,
				options,
			},
		});
		const trigger = wrapper.get('.sy-select-trigger');

		await trigger.trigger('focus');
		await trigger.trigger('blur');

		expect(wrapper.emitted('focus')).toHaveLength(1);
		expect(wrapper.emitted('blur')).toHaveLength(1);
	});
});
