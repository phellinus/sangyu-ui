import { toRaw } from 'vue';
import {
	FieldContext,
	FieldError,
	FormInstance,
	FormProps,
	FormScrollOptions,
	NamePath,
	ValidateErrorInfo,
} from '../Form.type';
import { getValue, namePathToString, setValue, mergeRules } from '../utils';

export function useFormController(props: FormProps): FormInstance & {
	fields: Map<string, FieldContext>;
	registerField: (field: FieldContext) => void;
	unregisterField: (nameKey: string) => void;
} {
	const fields = new Map<string, FieldContext>();
	// 注册字段
	const registerField = (field: FieldContext) => {
		fields.set(field.nameKey, field);
	};
	//卸载字段
	const unregisterField = (nameKey: string) => {
		fields.delete(nameKey);
	};
	//选择指定字段或全部字段
	const selectFields = (names?: NamePath[]) => {
		if (!names?.length) return [...fields.values()];

		const keys = new Set(names.map(namePathToString));
		return [...fields.values()].filter((field) => keys.has(field.nameKey));
	};
	//获取指定字段的错误信息列表
	const getFieldsError = (names?: NamePath[]): FieldError[] => {
		return selectFields(names).map((field) => ({
			name: field.name,
			errors: [...field.errors.value],
		}));
	};
	//获取指定字段的校验状态
	const validateFields = async (names?: NamePath[]) => {
		const selected = selectFields(names);

		const results = await Promise.allSettled(selected.map((field) => field.validate()));

		const errorFields = selected
			.map((field, index) => ({
				field,
				result: results[index],
			}))
			.filter((item) => item.result.status === 'rejected' || item.field.errors.value.length)
			.map(({ field }) => ({
				name: field.name,
				errors: [...field.errors.value],
			}));

		if (errorFields.length) {
			const error: ValidateErrorInfo = {
				values: structuredClone(toRaw(props.model)),
				errorFields,
				outOfDate: false,
			};

			throw error;
		}

		return structuredClone(toRaw(props.model));
	};
	//校验指定字段
	const validateField = async (name: NamePath) => {
		const field = fields.get(namePathToString(name));
		if (field) await field.validate();
	};
	//重置指定字段或全部字段
	const resetFields = (names?: NamePath[]) => {
		selectFields(names).forEach((field) => field.resetField());
	};
	//清空指定字段或全部字段的校验状态
	const clearValidate = (names?: NamePath[]) => {
		selectFields(names).forEach((field) => field.clearValidate());
	};
	//将指定字段滚动到可视区域并尝试获取焦点
	const scrollToField = (
		name: NamePath,
		options: FormScrollOptions = {
			behavior: 'smooth',
			block: 'center',
		},
	) => {
		const field = fields.get(namePathToString(name));

		field?.getElement()?.scrollIntoView(options);
		field?.focus();
	};
	//获取指定字段的错误信息
	const getFieldError = (name: NamePath) => fields.get(namePathToString(name))?.errors.value || [];
	//判断指定字段是否被触摸
	const isFieldsTouched = (names?: NamePath[], allTouched = false) => {
		const selected = selectFields(names);
		if (!selected.length) return false;

		return allTouched
			? selected.every((field) => field.touched.value)
			: selected.some((field) => field.touched.value);
	};

	return {
		fields,
		registerField,
		unregisterField,
		validateFields,
		validateField,
		resetFields,
		clearValidate,
		scrollToField,
		getFieldError,
		getFieldsError,
		isFieldsTouched,
		getFieldValue: (name) => getValue(props.model, name),
		setFieldValue: (name, value) => setValue(props.model, name, value),
	};
}

export { mergeRules };
