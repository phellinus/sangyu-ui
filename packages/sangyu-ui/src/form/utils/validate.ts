import Schema, { type RuleItem } from 'async-validator';
import type { FormRule } from '../Form.type';

// 表单字段验证选项
interface ValidateOptions {
	// 当前字段的唯一名称
	name: string;
	// 当前字段展示的标签
	label?: string;
	// 当前字段需要校验的值
	value: unknown;
	// 当前字段使用的校验规则
	rules: FormRule[];
	// 当前表单的完整数据模型
	model: Record<string, unknown>;
}

/** async-validator 抛出的校验错误结构 */
interface AsyncValidatorError {
	// 当前字段的错误信息列表
	errors?: Array<{
		// 单条校验错误信息
		message?: string;
	}>;
}

/**
 * 验证表单字段的值
 *
 * @param options 字段值、校验规则和完整表单模型
 * @returns 当前字段的错误信息列表，校验通过时返回空数组
 */
export async function validateValue(options: ValidateOptions): Promise<string[]> {
	const { name, label = name, value, rules, model } = options;

	if (!rules.length) return [];

	const descriptors: RuleItem[] = rules.map((rule): RuleItem => {
		const { validator, trigger: _trigger, warningOnly: _warningOnly, ...descriptor } = rule;
		const normalizedRule: RuleItem = { ...descriptor };

		if (validator) {
			/**
			 * 将 Sangyu UI 自定义校验函数转换为 async-validator 异步校验函数。
			 * @param _rule async-validator 内部生成的规则
			 * @param fieldValue 当前字段值
			 */
			normalizedRule.asyncValidator = async (_rule, fieldValue): Promise<void> => {
				const result = await validator(rule, fieldValue, model);

				if (result === false) {
					throw new Error(rule.message || `${label}校验失败`);
				}

				if (typeof result === 'string') {
					throw new Error(result);
				}

				if (result instanceof Error) {
					throw result;
				}
			};
		}

		return normalizedRule;
	});

	const validator = new Schema({
		[name]: descriptors,
	});

	try {
		await validator.validate(
			{ [name]: value },
			{
				firstFields: true,
				messages: {
					required: `${label}为必填项`,
				},
			},
		);

		return [];
	} catch (error: unknown) {
		const validationError = error as AsyncValidatorError;

		return (validationError.errors || []).map((item) => item.message || `${label}校验失败`);
	}
}
