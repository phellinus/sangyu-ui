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
}

export interface ThemeTokens {
	base: BaseTokens;
	semantic: SemanticTokens;
	components: { select: SelectTokens };
}

export type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? (T[K] extends TokenReference<string> ? T[K] : DeepPartial<T[K]>) : T[K];
};

export type ThemeOverride = DeepPartial<ThemeTokens>;
