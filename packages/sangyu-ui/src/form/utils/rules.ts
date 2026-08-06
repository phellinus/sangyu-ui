import type { FormRule, FormRules, NamePath, ValidateTrigger } from '../Form.type';
import { namePathToString } from './namePath';

/**
 * 将rules格式化 转换成数组
 *
 * @param rules
 * @returns
 */
export function normalizeRules(rules?: FormRule | FormRule[]): FormRule[] {
	if (!rules) return [];
	return Array.isArray(rules) ? rules : [rules];
}
/**
 * 合并规则
 * @param formRules
 * @param name
 * @param itemRules
 * @param required
 * @returns
 */
export function mergeRules(
	formRules: FormRules | undefined,
	name: NamePath,
	itemRules?: FormRule | FormRule[],
	required?: boolean,
): FormRule[] {
	const key = namePathToString(name);

	const result = [...normalizeRules(formRules?.[key]), ...normalizeRules(itemRules)];

	if (required && !result.some((rule) => rule.required)) {
		result.unshift({
			required: true,
			message: '该字段为必填项',
		});
	}

	return result;
}
/**
 * 当前规则是否需要触发校验
 * @param rule
 * @param trigger
 * @returns
 */
export function matchesTrigger(
	rule: FormRule,
	trigger?: ValidateTrigger,
	defaultTrigger?: ValidateTrigger | ValidateTrigger[],
): boolean {
	if (!trigger) return true;

	const ruleTrigger = rule.trigger ?? defaultTrigger;
	if (!ruleTrigger) return true;

	const triggers = Array.isArray(ruleTrigger) ? ruleTrigger : [ruleTrigger];

	return triggers.includes(trigger);
}
