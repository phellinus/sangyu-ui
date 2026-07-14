import { computed, CSSProperties, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { SelectModelValue, SelectOption, SelectValue } from './Select.type';
import { useSelectKeyboard, useSelectModel, useSelectSearch } from './composables';
import { SelectDropdown, SelectTags } from './components';

export default defineComponent({
	name: 'SySelect',
	inheritAttrs: false,
	props: {
		modelValue: [String, Number, Boolean, Array] as PropType<SelectModelValue>,
		options: { type: Array as PropType<SelectOption[]>, default: () => [] },
		placeholder: { type: String, default: '请选择' },
		disabled: Boolean,
		loading: Boolean,
		clearable: Boolean,
		multiple: Boolean,
		filterable: Boolean,
		remoteMethod: Function as PropType<(query: string, signal: AbortSignal) => void | Promise<void>>,
		remoteDebounce: {
			type: Number,
			default: 300,
		},
		filterMethod: Function as PropType<(query: string, option: SelectOption) => boolean>,
		size: { type: String as PropType<'small' | 'default' | 'large'>, default: 'default' },
		width: String,
		placement: { type: String as PropType<'top' | 'bottom'>, default: 'bottom' },
		virtual: { type: Boolean, default: true },
		itemHeight: { type: [String, Number], default: 32 },
		listHeight: { type: [String, Number], default: 256 },
		overscan: { type: Number, default: 6 },
		emptyText: { type: String, default: '暂无数据' },
		max: Number,
		maxTagCount: Number,
		customStyle: [String, Object] as PropType<string | CSSProperties>,
		mode: {
			type: String as PropType<'default' | 'label'>,
			default: 'default',
		},
	},
	emits: ['update:modelValue', 'change', 'clear', 'search', 'visibleChange', 'focus', 'blur'],
	setup(props, { emit, slots }) {
		const { c } = useClassnames('select');
		const open = ref(false);
		const inputRef = ref<HTMLInputElement>();
		const selectRef = ref<HTMLElement>();

		const model = useSelectModel(props as any, emit as any);
		const search = useSelectSearch(props as any, emit as any);

		/** label 模式和 filterable 模式都需要显示输入框 */
		const searchable = computed(() => {
			return props.filterable || props.mode === 'label';
		});
		/**
		 * 将当前输入内容创建为标签。
		 * @returns 是否处理了本次创建操作
		 */
		const createInputLabel = (): boolean => {
			if (props.mode !== 'label' || props.disabled) {
				return false;
			}
			const label = search.query.value.trim();
			if (!label) return false;

			// 已存在相同标签时不重复添加
			if (model.values.value.includes(label)) {
				search.setQuery('');
				return true;
			}

			// 达到最大数量后阻止继续添加
			if (props.max !== undefined && model.values.value.length >= props.max) {
				return true;
			}

			model.selectOption({
				label,
				value: label,
			});

			search.setQuery('');
			return true;
		};
		/**
		 * 处理 Select 键盘事件。
		 * label 模式下按 Enter 优先创建标签。
		 * @param event 键盘事件
		 */
		const handleSelectKeydown = async (event: KeyboardEvent) => {
			const shouldCreateLabel =
				event.key === 'Enter' &&
				props.mode === 'label' &&
				!event.isComposing &&
				search.query.value.trim().length > 0;

			if (shouldCreateLabel) {
				event.preventDefault();
				createInputLabel();
				return;
			}

			await keyboard.handleKeydown(event);
		};
		/**
		 * 设置下拉面板展开状态。
		 * 只有状态真正变化时才触发 visibleChange。
		 * @param visible 是否展开
		 */
		const setDropdownVisible = (visible: boolean) => {
			if (props.disabled) return;
			if (open.value === visible) return;

			open.value = visible;
			emit('visibleChange', visible);
		};
		const close = () => {
			setDropdownVisible(false);
		};
		/**
		 * 判断当前事件是否发生在 Select 组件外部。
		 * 如果点击目标不属于组件根节点，则关闭下拉面板。
		 * @param event 鼠标或触摸事件
		 */
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node | null;
			if (!target) return;
			if (selectRef.value?.contains(target)) return;
			close();
		};
		/**打开下拉框 */
		const openDropdown = () => {
			setDropdownVisible(true);
		};
		/**
		 * 使用键盘删除当前选中项。
		 *
		 * 单选模式删除当前值；
		 * 多选模式删除最后一个标签；
		 * 搜索框存在输入内容时不删除选中项。
		 *
		 * @returns 是否成功处理了删除操作
		 */
		const removeSelectedByKeyboard = (): boolean => {
			if (props.disabled) return false;

			// 搜索框有内容时，让 Backspace/Delete 正常删除输入文字
			if (search.query.value.length > 0) {
				return false;
			}

			const selectedValues = model.values.value;

			if (!selectedValues.length) {
				return false;
			}

			if (model.isMultiple.value) {
				const lastValue = selectedValues[selectedValues.length - 1];

				model.removeOption(lastValue);
			} else {
				model.clearValue();
			}

			return true;
		};
		/**
		 * 点击选择器触发区域时切换下拉面板。
		 */
		const toggleDropdown = () => {
			setDropdownVisible(!open.value);
		};
		/**
		 * 合并组件外部 loading 和远程搜索 loading。
		 */
		const mergedLoading = computed(() => {
			return props.loading || search.searching.value;
		});
		/**
		 * 选择下拉选项，并在单选模式下关闭面板。
		 * 禁用状态或禁用选项不会触发任何后续行为。
		 * @param option 当前被选择的选项
		 */
		const selectOption = (option: SelectOption) => {
			if (props.disabled || option.disabled) return;

			model.selectOption(option);

			if (!model.isMultiple.value) {
				close();
			}

			search.setQuery('');
		};

		const keyboard = useSelectKeyboard(search.filteredOptions, selectOption, close, removeSelectedByKeyboard);

		const showClear = computed(() => props.clearable && !props.disabled && model.values.value.length > 0);
		const styles = computed(() => [props.customStyle, props.width ? { width: props.width } : undefined]);

		/**
		 * 组件挂载后监听全局点击，用于点击外部关闭下拉面板。
		 */
		onMounted(() => {
			document.addEventListener('mousedown', handleClickOutside);
			document.addEventListener('touchstart', handleClickOutside);
		});

		/**
		 * 组件卸载前移除全局监听，避免内存泄漏。
		 */
		onBeforeUnmount(() => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchstart', handleClickOutside);
		});
		/**
		 * 渲染默认下拉箭头图标。
		 */
		const renderArrowIcon = () => (
			<svg class={c('icon')} width='24' height='24' viewBox='0 0 48 48' fill='none' aria-hidden='true'>
				<path
					d='M36 18L24 30L12 18'
					stroke='currentColor'
					stroke-width='4'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</svg>
		);
		/**
		 * 渲染清空按钮图标。
		 */
		const renderClearIcon = () => (
			<svg class={c('icon')} width='24' height='24' viewBox='0 0 48 48' fill='none' aria-hidden='true'>
				<path
					d='M14 14L34 34'
					stroke='currentColor'
					stroke-width='4'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M14 34L34 14'
					stroke='currentColor'
					stroke-width='4'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</svg>
		);

		return () => (
			<div
				ref={selectRef}
				class={{
					[c()]: true,
					[c(props.size)]: true,
					[c('open')]: open.value,
					[c('disabled')]: props.disabled,
				}}
				style={styles.value}
				onKeydown={handleSelectKeydown}
			>
				<div
					class={c('trigger')}
					tabindex={props.disabled ? -1 : 0}
					onClick={toggleDropdown}
					onFocus={(event) => emit('focus', event)}
					onBlur={(event) => emit('blur', event)}
				>
					{slots.prefix ? <span class={c('prefix')}>{slots.prefix()}</span> : null}

					<div class={c('content')}>
						{model.isMultiple.value ? (
							<SelectTags
								options={model.selectedOptions.value}
								maxTagCount={props.maxTagCount}
								disabled={props.disabled}
								onRemove={(value: SelectValue) => model.removeOption(value)}
							>
								{{ tag: slots.tag }}
							</SelectTags>
						) : slots.label ? (
							slots.label({
								option: model.selectedOptions.value[0],
								value: props.modelValue,
							})
						) : model.selectedLabel.value ? (
							<span class={c('value')}>{model.selectedLabel.value}</span>
						) : null}

						{searchable.value ? (
							<input
								ref={inputRef}
								class={c('search')}
								value={search.query.value}
								disabled={props.disabled}
								placeholder={model.values.value.length ? '' : props.placeholder}
								onInput={(event) => search.setQuery((event.target as HTMLInputElement).value)}
								onFocus={openDropdown}
								onClick={(event) => event.stopPropagation()}
							/>
						) : !model.values.value.length ? (
							<span class={c('placeholder')}>{props.placeholder}</span>
						) : null}
					</div>

					{showClear.value ? (
						<button
							class={c('clear')}
							type='button'
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								model.clearValue();
							}}
						>
							{renderClearIcon()}
						</button>
					) : (
						<span class={c('suffix')}>
							{slots.suffix?.({
								open: open.value,
								disabled: props.disabled,
								loading: mergedLoading.value,
							}) ?? <span class={c('arrow')}>{renderArrowIcon()}</span>}
						</span>
					)}
				</div>

				<SelectDropdown
					visible={open.value}
					options={search.filteredOptions.value}
					loading={mergedLoading.value}
					emptyText={props.emptyText}
					virtual={props.virtual}
					itemHeight={props.itemHeight}
					listHeight={props.listHeight}
					overscan={props.overscan}
					activeIndex={keyboard.activeIndex.value}
					isSelected={model.isSelected}
					onSelect={selectOption}
				>
					{{ option: slots.option, empty: slots.empty, loading: slots.loading }}
				</SelectDropdown>
			</div>
		);
	},
});
