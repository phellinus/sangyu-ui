export type PaletteStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type PaletteName = 'primary' | 'success' | 'warning' | 'error' | 'gray';

export type BaseTokenPath = `base.color.${PaletteName}.${PaletteStep}`;

export interface BaseTokens {
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
}

export type SemanticTokenPath = `semantic.color.${keyof SemanticColors}`;
export type TokenReference<Path extends string> = { readonly ref: Path };
export type SemanticValue = string | TokenReference<BaseTokenPath>;
export type ComponentValue = string | TokenReference<BaseTokenPath | SemanticTokenPath>;

export interface SemanticTokens {
	color: { [K in keyof SemanticColors]: SemanticValue };
}

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
