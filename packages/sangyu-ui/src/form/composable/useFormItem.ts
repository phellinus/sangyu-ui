import { computed, ref, Ref } from 'vue';
import { FormItemProps } from '../Form.type';
import { getValue, namePathToString, normalizeNamePath } from '../utils';
import { useFormContext } from './useFormContext';

export function useFormItem(props: FormItemProps, elementRef: Ref<HTMLElement | undefined>) {
	const form = useFormContext();

	if (!form || props.name == null) {
		return {
			form,
			errors: ref<string[]>([]),
			validateStatus: ref('' as const),
			touched: ref(false),
			dirty: ref(false),
			validating: ref(false),
			validate: async () => undefined,
			clearValidate: () => undefined,
			resetField: () => undefined,
			onChange: () => undefined,
			onBlur: () => undefined,
		};
	}
	// 当前表单字段对应的数据路径
	const name = normalizeNamePath(props.name);
	// 当前表单字段对应的唯一字符串标识
	const nameKey = namePathToString(name);
	// 当前表单字段注册时保存的初始值
	const initialValue = structuredClone(getValue(form.props.model, name));
	// 当前表单字段的值
	const value = computed(() => getValue(form.props.model, name));
}
