/**
 * 需要自动转发给原生 input 的属性。
 *
 * class、style、data-* 和普通点击事件仍然保留在组件根节点，
 * 表单校验、键盘输入和无障碍属性则交给真实输入框。
 */
const NATIVE_INPUT_ATTRS = new Set([
	'accept',
	'alt',
	'autocapitalize',
	'autofocus',
	'capture',
	'checked',
	'dirname',
	'enterkeyhint',
	'form',
	'formaction',
	'formenctype',
	'formmethod',
	'formnovalidate',
	'formtarget',
	'inputmode',
	'list',
	'max',
	'min',
	'multiple',
	'pattern',
	'popovertarget',
	'popovertargetaction',
	'required',
	'spellcheck',
	'step',
	'tabindex',
]);

/**
 * 需要绑定到原生 input 的事件监听器。
 *
 * click 保留在根节点，避免破坏组件旧有的根节点点击行为；
 * 键盘、剪贴板和组合输入事件默认绑定到真实 input。
 */
const NATIVE_INPUT_EVENT_RE =
	/^on(?:beforeinput|keydown|keyup|keypress|compositionstart|compositionupdate|compositionend|paste|copy|cut|select|invalid)$/i;

export interface SplitInputAttrsResult {
	/** 继续绑定到 SyInput 根节点的属性。 */
	rootAttrs: Record<string, unknown>;
	/** 自动转发给原生 input 的属性。 */
	inputAttrs: Record<string, unknown>;
}

/**
 * 将 Vue 的透传属性拆分为根节点属性和原生 input 属性。
 */
export function splitInputAttrs(attrs: Readonly<Record<string, unknown>>): SplitInputAttrsResult {
	const rootAttrs: Record<string, unknown> = {};
	const inputAttrs: Record<string, unknown> = {};

	Object.entries(attrs).forEach(([key, value]) => {
		const normalizedKey = key.toLowerCase();
		const shouldForwardToInput =
			normalizedKey.startsWith('aria-') ||
			NATIVE_INPUT_ATTRS.has(normalizedKey) ||
			NATIVE_INPUT_EVENT_RE.test(key);

		if (shouldForwardToInput) {
			inputAttrs[key] = value;
			return;
		}

		rootAttrs[key] = value;
	});

	return {
		rootAttrs,
		inputAttrs,
	};
}
