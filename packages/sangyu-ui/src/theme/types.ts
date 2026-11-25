import type { ThemeDefinition } from './presets';

export type TokenReference<Path extends string> = { readonly ref: Path };

type TokenPaths<Tree> = {
	[Key in keyof Tree & (number | string)]: Tree[Key] extends string | TokenReference<string>
		? `${Key}`
		: `${Key}.${TokenPaths<Tree[Key]>}`;
}[keyof Tree & (number | string)];

type TokenValues<Tree, Value> = {
	[Key in keyof Tree]: Tree[Key] extends string | TokenReference<string> ? Value : TokenValues<Tree[Key], Value>;
};

type WithOptionalKeys<T, Key extends keyof T> = Omit<T, Key> & Partial<Pick<T, Key>>;

export type BaseTokenPath = `base.${TokenPaths<ThemeDefinition['base']>}`;
export type SemanticTokenPath = `semantic.${TokenPaths<ThemeDefinition['semantic']>}`;
export type SemanticValue = string | TokenReference<BaseTokenPath>;
export type ComponentValue = string | TokenReference<BaseTokenPath | SemanticTokenPath>;

export type BaseTokens = TokenValues<ThemeDefinition['base'], string>;

type SemanticDefinition = TokenValues<ThemeDefinition['semantic'], SemanticValue>;
export type SemanticTokens = Omit<SemanticDefinition, 'control'> & {
	control?: Partial<SemanticDefinition['control']>;
};

type Components = TokenValues<ThemeDefinition['components'], ComponentValue>;
export type SelectTokens = WithOptionalKeys<Components['select'], 'triggerHeightLarge'>;

export interface ThemeTokens {
	base: BaseTokens;
	semantic: SemanticTokens;
	components: Omit<Components, 'select'> & { select: SelectTokens };
}

type DeepPartial<T> = T extends string | TokenReference<string> ? T : { [Key in keyof T]?: DeepPartial<T[Key]> };

export type ThemeOverride = DeepPartial<ThemeTokens>;
