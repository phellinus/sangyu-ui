export type PaletteStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type PaletteName = 'primary' | 'success' | 'warning' | 'error' | 'gray';

export interface CommonScales {
	spacing: { xs: string; sm: string; md: string; lg: string; xl: string };
	controlHeight: { sm: string; md: string; lg: string };
	fontSize: { sm: string; md: string; lg: string };
	radius: { sm: string; md: string; lg: string; round: string };
	shadow: { control: string; focus: string; popover: string; overlay: string };
}

export type BaseTokenPath =
	| `base.color.${PaletteName}.${PaletteStep}`
	| { [Group in keyof CommonScales]: `base.${Group}.${keyof CommonScales[Group] & string}` }[keyof CommonScales];

export interface BaseTokens extends CommonScales {
	color: Record<PaletteName, Record<PaletteStep, string>>;
}

export interface SemanticColors {
	primary: string;
	primaryHover: string;
	primaryActive: string;
	primarySelect: string;
	success: string;
	successHover: string;
	successActive: string;
	successSelect: string;
	warning: string;
	warningHover: string;
	warningActive: string;
	warningSelect: string;
	error: string;
	errorHover: string;
	errorActive: string;
	errorSelect: string;
	base: string;
	text: string;
	textSecondary: string;
	textDisabled: string;
	border: string;
	divider: string;
	bg: string;
	surface: string;
}

export type SemanticTokenPath =
	| `semantic.color.${keyof SemanticColors}`
	| { [Group in keyof CommonScales]: `semantic.${Group}.${keyof CommonScales[Group] & string}` }[keyof CommonScales];
export type TokenReference<Path extends string> = { readonly ref: Path };
export type SemanticValue = string | TokenReference<BaseTokenPath>;
export type ComponentValue = string | TokenReference<BaseTokenPath | SemanticTokenPath>;

export type SemanticTokens = {
	color: { [K in keyof SemanticColors]: SemanticValue };
} & { [Group in keyof CommonScales]: { [Key in keyof CommonScales[Group]]: SemanticValue } };

// Select already reads these variables without defining them on its own root.
export interface SelectTokens {
	color: ComponentValue;
	bg: ComponentValue;
	borderColor: ComponentValue;
	focusBorderColor: ComponentValue;
	disabledBg: ComponentValue;
	disabledColor: ComponentValue;
	placeholderColor: ComponentValue;
	dropdownBg: ComponentValue;
	optionHoverBg: ComponentValue;
	optionSelectedColor: ComponentValue;
	optionSelectedBg: ComponentValue;
	triggerHeightSmall: ComponentValue;
	triggerHeightMedium: ComponentValue;
	fontSizeSmall: ComponentValue;
	fontSizeLarge: ComponentValue;
	dropdownBorderColor: ComponentValue;
	dropdownShadow: ComponentValue;
	iconColor: ComponentValue;
	tagBg: ComponentValue;
	optionDisabledColor: ComponentValue;
	clearHoverBg: ComponentValue;
	scrollbarThumb: ComponentValue;
	scrollbarThumbHover: ComponentValue;
	tagHeight: ComponentValue;
	tagPadding: ComponentValue;
}

export interface ButtonTokens {
	color: ComponentValue;
	filledTextColor: ComponentValue;
	focusShadow: ComponentValue;
	hoverShadow: ComponentValue;
	paddingSmall: ComponentValue;
	paddingMedium: ComponentValue;
	paddingLarge: ComponentValue;
	radiusSmall: ComponentValue;
	radiusLarge: ComponentValue;
}

export interface InputTokens {
	color: ComponentValue;
	bg: ComponentValue;
	borderColor: ComponentValue;
	focusColor: ComponentValue;
	lineColor: ComponentValue;
	placeholderColor: ComponentValue;
	disabledBg: ComponentValue;
	focusShadow: ComponentValue;
	iconShadow: ComponentValue;
	heightSmall: ComponentValue;
	heightMedium: ComponentValue;
	heightLarge: ComponentValue;
	fontSizeLarge: ComponentValue;
	paddingSmall: ComponentValue;
	paddingLarge: ComponentValue;
	radius: ComponentValue;
}

export interface CheckboxTokens {
	size: ComponentValue;
	sizeSmall: ComponentValue;
	sizeLarge: ComponentValue;
	dotRadius: ComponentValue;
	dotRadiusSmall: ComponentValue;
	dotRadiusLarge: ComponentValue;
	fontSize: ComponentValue;
	fontSizeSmall: ComponentValue;
	fontSizeLarge: ComponentValue;
	gap: ComponentValue;
	gapSmall: ComponentValue;
	gapLarge: ComponentValue;
	color: ComponentValue;
	hoverColor: ComponentValue;
	activeColor: ComponentValue;
	borderColor: ComponentValue;
	background: ComponentValue;
	disabledColor: ComponentValue;
	disabledBackground: ComponentValue;
	markColor: ComponentValue;
	squareMarkRadius: ComponentValue;
	focusShadow: ComponentValue;
}

export interface CheckboxGroupTokens {
	gapX: ComponentValue;
	gapY: ComponentValue;
}

export interface RadioTokens {
	size: ComponentValue;
	sizeSmall: ComponentValue;
	sizeLarge: ComponentValue;
	dotSize: ComponentValue;
	dotSizeSmall: ComponentValue;
	dotSizeLarge: ComponentValue;
	fontSize: ComponentValue;
	fontSizeSmall: ComponentValue;
	fontSizeLarge: ComponentValue;
	gap: ComponentValue;
	gapSmall: ComponentValue;
	gapLarge: ComponentValue;
	squareRadius: ComponentValue;
	color: ComponentValue;
	hoverColor: ComponentValue;
	activeColor: ComponentValue;
	borderColor: ComponentValue;
	background: ComponentValue;
	disabledColor: ComponentValue;
	disabledBackground: ComponentValue;
	squareDotRadius: ComponentValue;
	focusShadow: ComponentValue;
}

export interface RadioGroupTokens {
	gapX: ComponentValue;
	gapY: ComponentValue;
}

export interface RadioButtonTokens {
	fontSize: ComponentValue;
	fontSizeSmall: ComponentValue;
	fontSizeLarge: ComponentValue;
	height: ComponentValue;
	heightSmall: ComponentValue;
	heightLarge: ComponentValue;
	paddingX: ComponentValue;
	paddingXSmall: ComponentValue;
	paddingXLarge: ComponentValue;
	radius: ComponentValue;
	radiusSmall: ComponentValue;
	radiusLarge: ComponentValue;
	color: ComponentValue;
	hoverColor: ComponentValue;
	activeColor: ComponentValue;
	borderColor: ComponentValue;
	background: ComponentValue;
	checkedColor: ComponentValue;
	checkedBackground: ComponentValue;
	checkedShadow: ComponentValue;
	disabledColor: ComponentValue;
	disabledBackground: ComponentValue;
}

export interface SwitchTokens {
	width: ComponentValue;
	widthSmall: ComponentValue;
	widthLarge: ComponentValue;
	height: ComponentValue;
	heightSmall: ComponentValue;
	heightLarge: ComponentValue;
	thumbSize: ComponentValue;
	thumbSizeSmall: ComponentValue;
	thumbSizeLarge: ComponentValue;
	thumbActiveSize: ComponentValue;
	thumbActiveSizeSmall: ComponentValue;
	thumbActiveSizeLarge: ComponentValue;
	padding: ComponentValue;
	gap: ComponentValue;
	fontSize: ComponentValue;
	fontSizeSmall: ComponentValue;
	fontSizeLarge: ComponentValue;
	activeColor: ComponentValue;
	activeColorSoft: ComponentValue;
	activeColorStrong: ComponentValue;
	inactiveColor: ComponentValue;
	inactiveBorderColor: ComponentValue;
	inactiveBackground: ComponentValue;
	inactiveHoverBackground: ComponentValue;
	activeBackground: ComponentValue;
	thumbBackground: ComponentValue;
	thumbColor: ComponentValue;
	thumbShadow: ComponentValue;
	disabledThumbShadow: ComponentValue;
	loadingThumbShadow: ComponentValue;
	focusShadow: ComponentValue;
	radius: ComponentValue;
	squareRadius: ComponentValue;
	squareThumbRadius: ComponentValue;
	indicatorSize: ComponentValue;
	indicatorThickness: ComponentValue;
	spinnerSize: ComponentValue;
	spinnerBorderWidth: ComponentValue;
}

export interface FormTokens {
	itemGapSmall: ComponentValue;
	itemGapDefault: ComponentValue;
	itemGapLarge: ComponentValue;
	inlineGap: ComponentValue;
	labelWidth: ComponentValue;
	labelPadding: ComponentValue;
	verticalLabelPadding: ComponentValue;
	labelLineHeight: ComponentValue;
	requiredMarkMargin: ComponentValue;
	controlWidth: ComponentValue;
	controlMinHeight: ComponentValue;
	feedbackWidth: ComponentValue;
	feedbackHeight: ComponentValue;
	feedbackFontSize: ComponentValue;
	feedbackRight: ComponentValue;
	messageMarginTop: ComponentValue;
	messageFontSize: ComponentValue;
	messageLineHeight: ComponentValue;
	extraMarginTop: ComponentValue;
	extraFontSize: ComponentValue;
	labelColor: ComponentValue;
	extraColor: ComponentValue;
	requiredColor: ComponentValue;
	errorColor: ComponentValue;
	successColor: ComponentValue;
	warningColor: ComponentValue;
	warningMessageColor: ComponentValue;
	validatingColor: ComponentValue;
}

export interface ThemeTokens {
	base: BaseTokens;
	semantic: SemanticTokens;
	components: {
		select: SelectTokens;
		button: ButtonTokens;
		input: InputTokens;
		checkbox: CheckboxTokens;
		checkboxGroup: CheckboxGroupTokens;
		radio: RadioTokens;
		radioGroup: RadioGroupTokens;
		radioButton: RadioButtonTokens;
		switch: SwitchTokens;
		form: FormTokens;
	};
}

export type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? (T[K] extends TokenReference<string> ? T[K] : DeepPartial<T[K]>) : T[K];
};

export type ThemeOverride = DeepPartial<ThemeTokens>;
