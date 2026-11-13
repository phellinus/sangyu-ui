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

export interface MenuTokens {
	color: ComponentValue;
	bg: ComponentValue;
	borderColor: ComponentValue;
	fontSize: ComponentValue;
	hoverColor: ComponentValue;
	hoverBg: ComponentValue;
	activeColor: ComponentValue;
	activeBg: ComponentValue;
	activeIndicatorColor: ComponentValue;
	popupBg: ComponentValue;
	popupBorderColor: ComponentValue;
	popupShadow: ComponentValue;
	menuShadow: ComponentValue;
	horizontalRadius: ComponentValue;
	verticalRadius: ComponentValue;
	itemHeightHorizontal: ComponentValue;
	itemHeightVertical: ComponentValue;
	itemHeightSubmenu: ComponentValue;
	horizontalPadding: ComponentValue;
	itemPaddingHorizontal: ComponentValue;
	itemPaddingVertical: ComponentValue;
	itemMarginHorizontal: ComponentValue;
	itemMarginVertical: ComponentValue;
	collapsedWidth: ComponentValue;
	verticalWidth: ComponentValue;
	popupMinWidth: ComponentValue;
	collapsedPopupMinWidth: ComponentValue;
	collapsedPopupOffset: ComponentValue;
	popupRadius: ComponentValue;
	popupPadding: ComponentValue;
	itemRadius: ComponentValue;
	verticalItemRadius: ComponentValue;
	popupItemActiveBg: ComponentValue;
	indicatorWidth: ComponentValue;
	indicatorHeight: ComponentValue;
	indicatorInset: ComponentValue;
	indicatorRadius: ComponentValue;
	iconGap: ComponentValue;
	submenuContentGap: ComponentValue;
	submenuArrowGap: ComponentValue;
	popupItemPaddingX: ComponentValue;
	popupItemMarginBottom: ComponentValue;
	verticalPadding: ComponentValue;
	submenuIndent: ComponentValue;
}

export interface PaginationTokens {
	activeColor: ComponentValue;
	activeTextColor: ComponentValue;
	activeShadow: ComponentValue;
	dottedActiveShadow: ComponentValue;
	height: ComponentValue;
	minWidth: ComponentValue;
	radius: ComponentValue;
	gap: ComponentValue;
	fontSize: ComponentValue;
	heightSmall: ComponentValue;
	minWidthSmall: ComponentValue;
	fontSizeSmall: ComponentValue;
	heightLarge: ComponentValue;
	minWidthLarge: ComponentValue;
	fontSizeLarge: ComponentValue;
	hoverBg: ComponentValue;
	dottedColor: ComponentValue;
	disabledOpacity: ComponentValue;
	itemPaddingX: ComponentValue;
	circleRadius: ComponentValue;
	dottedHeight: ComponentValue;
	dottedMinWidth: ComponentValue;
	dottedGap: ComponentValue;
	dottedControlWidth: ComponentValue;
	dottedControlHeight: ComponentValue;
	dottedPagerGap: ComponentValue;
	dottedItemSize: ComponentValue;
	spinnerSize: ComponentValue;
	spinnerBorderWidth: ComponentValue;
	progressOffset: ComponentValue;
	progressHeight: ComponentValue;
	progressRadius: ComponentValue;
	jumperGap: ComponentValue;
	jumperWidth: ComponentValue;
}

export interface BreadcrumbTokens {
	fontSize: ComponentValue;
	color: ComponentValue;
	separatorColor: ComponentValue;
	separatorFontSize: ComponentValue;
	linkHoverColor: ComponentValue;
	linkHoverBg: ComponentValue;
	currentColor: ComponentValue;
	separatorGap: ComponentValue;
	contentGap: ComponentValue;
	paddingX: ComponentValue;
	paddingY: ComponentValue;
	radius: ComponentValue;
}

export interface StepTokens {
	waitColor: ComponentValue;
	waitBg: ComponentValue;
	processColor: ComponentValue;
	processBg: ComponentValue;
	finishColor: ComponentValue;
	finishBg: ComponentValue;
	errorColor: ComponentValue;
	errorBg: ComponentValue;
	tailColor: ComponentValue;
	indicatorSize: ComponentValue;
	indicatorFontSize: ComponentValue;
	indicatorProcessShadow: ComponentValue;
	horizontalHeadMinWidth: ComponentValue;
	verticalMinHeight: ComponentValue;
	verticalHeadGap: ComponentValue;
	horizontalTailGap: ComponentValue;
	verticalTailMinHeight: ComponentValue;
	verticalTailMarginTop: ComponentValue;
	horizontalMainPadding: ComponentValue;
	horizontalMainMaxWidth: ComponentValue;
	verticalMainPadding: ComponentValue;
	titleFontSize: ComponentValue;
	descriptionFontSize: ComponentValue;
	descriptionMarginTop: ComponentValue;
	descriptionColor: ComponentValue;
	waitDescriptionColor: ComponentValue;
	finishTitleColor: ComponentValue;
	errorTitleColor: ComponentValue;
	tailFinishColor: ComponentValue;
	tailProcessColor: ComponentValue;
	headMinWidth: ComponentValue;
	horizontalHeadPaddingTop: ComponentValue;
	indicatorRadius: ComponentValue;
	tailRadius: ComponentValue;
	tailWidth: ComponentValue;
	tailHeight: ComponentValue;
}

export interface CardTokens {
	background: ComponentValue;
	borderColor: ComponentValue;
	headerColor: ComponentValue;
	contentColor: ComponentValue;
	sectionBorderColor: ComponentValue;
	shadowAlways: ComponentValue;
	shadowHover: ComponentValue;
	borderRadius: ComponentValue;
	headerPadding: ComponentValue;
	headerFontSize: ComponentValue;
	contentPadding: ComponentValue;
	contentFontSize: ComponentValue;
	contentLineHeight: ComponentValue;
	footerPadding: ComponentValue;
	footerGap: ComponentValue;
}

export interface TagTokens {
	primaryColor: ComponentValue;
	successColor: ComponentValue;
	warningColor: ComponentValue;
	errorColor: ComponentValue;
	borderAlpha: ComponentValue;
	backgroundAlpha: ComponentValue;
	borderRadius: ComponentValue;
	focusShadow: ComponentValue;
	heightSmall: ComponentValue;
	heightDefault: ComponentValue;
	heightLarge: ComponentValue;
	paddingXSmall: ComponentValue;
	paddingXDefault: ComponentValue;
	paddingXLarge: ComponentValue;
	fontSizeSmall: ComponentValue;
	fontSizeDefault: ComponentValue;
	fontSizeLarge: ComponentValue;
	closeHoverBackground: ComponentValue;
	closeSize: ComponentValue;
	closeGap: ComponentValue;
	closeOffset: ComponentValue;
	closeRadius: ComponentValue;
	closeOpacity: ComponentValue;
	closeFocusShadow: ComponentValue;
}

export interface AvatarTokens {
	size: ComponentValue;
	fontSize: ComponentValue;
	textColor: ComponentValue;
	background: ComponentValue;
	loadingBackground: ComponentValue;
	loadingColor: ComponentValue;
	loadingOverlay: ComponentValue;
	loadingSize: ComponentValue;
	badgeColor: ComponentValue;
	badgeSize: ComponentValue;
	badgeTextMinWidth: ComponentValue;
	badgeTextHeight: ComponentValue;
	badgeTextPaddingX: ComponentValue;
	badgeTextColor: ComponentValue;
	badgeBorderColor: ComponentValue;
	badgeTextFontSize: ComponentValue;
	badgeFontSize: ComponentValue;
	badgeBorderWidth: ComponentValue;
	badgeTextRadius: ComponentValue;
	circleRadius: ComponentValue;
	squareRadius: ComponentValue;
	hoverBrightness: ComponentValue;
	loadingOpacity: ComponentValue;
}

export interface DividerTokens {
	defaultColor: ComponentValue;
	textColor: ComponentValue;
	thickTextColor: ComponentValue;
	thicknessThin: ComponentValue;
	thicknessMedium: ComponentValue;
	thicknessThick: ComponentValue;
	contentGap: ComponentValue;
	horizontalMargin: ComponentValue;
	verticalMargin: ComponentValue;
	startLineWidth: ComponentValue;
	endLineWidth: ComponentValue;
	contentMaxWidth: ComponentValue;
	contentPaddingX: ComponentValue;
	fontSize: ComponentValue;
	contentLineHeight: ComponentValue;
	contentFontWeight: ComponentValue;
	contentLetterSpacing: ComponentValue;
	lineOpacity: ComponentValue;
}

export interface SpaceTokens {
	gapSmall: ComponentValue;
	gapMedium: ComponentValue;
	gapLarge: ComponentValue;
}

export interface ResultTokens {
	primaryColor: ComponentValue;
	successColor: ComponentValue;
	warningColor: ComponentValue;
	errorColor: ComponentValue;
	forbiddenColor: ComponentValue;
	notFoundColor: ComponentValue;
	serverErrorColor: ComponentValue;
	surfaceAlpha: ComponentValue;
	compactSurfaceAlpha: ComponentValue;
	borderColor: ComponentValue;
	backgroundTop: ComponentValue;
	backgroundBottom: ComponentValue;
	shadow: ComponentValue;
	innerHighlight: ComponentValue;
	gap: ComponentValue;
	padding: ComponentValue;
	borderRadius: ComponentValue;
	compactGap: ComponentValue;
	compactPadding: ComponentValue;
	compactBorderRadius: ComponentValue;
	visualSize: ComponentValue;
	visualRadius: ComponentValue;
	visualHighlight: ComponentValue;
	visualShadow: ComponentValue;
	compactVisualSize: ComponentValue;
	compactVisualRadius: ComponentValue;
	exceptionMinWidth: ComponentValue;
	exceptionPadding: ComponentValue;
	exceptionRadius: ComponentValue;
	compactExceptionMinWidth: ComponentValue;
	compactExceptionPadding: ComponentValue;
	compactExceptionRadius: ComponentValue;
	codeFontSize: ComponentValue;
	compactCodeFontSize: ComponentValue;
	titleColor: ComponentValue;
	titleFontSize: ComponentValue;
	compactTitleFontSize: ComponentValue;
	subTitleMarginTop: ComponentValue;
	subTitleFontSize: ComponentValue;
	subTitleColor: ComponentValue;
	bodyMarginTop: ComponentValue;
	bodyPadding: ComponentValue;
	bodyRadius: ComponentValue;
	bodyBackground: ComponentValue;
	bodyFontSize: ComponentValue;
	bodyColor: ComponentValue;
	extraMarginTop: ComponentValue;
	extraGap: ComponentValue;
	mainMaxWidth: ComponentValue;
	compactMainMaxWidth: ComponentValue;
	mobilePadding: ComponentValue;
	mobileGap: ComponentValue;
	mobileTitleFontSize: ComponentValue;
	compactMobileTitleFontSize: ComponentValue;
}

export interface ProgressTokens {
	defaultColor: ComponentValue;
	defaultTrackColor: ComponentValue;
	lineHeight: ComponentValue;
	lineRadius: ComponentValue;
	lineMinWidth: ComponentValue;
	circleSize: ComponentValue;
	infoFontSize: ComponentValue;
	infoInsideFontSize: ComponentValue;
	infoColor: ComponentValue;
	infoInsideColor: ComponentValue;
	trackShadow: ComponentValue;
	gradientMix: ComponentValue;
	gap: ComponentValue;
}

export interface TooltipTokens {
	background: ComponentValue;
	textColor: ComponentValue;
	borderColor: ComponentValue;
	borderBackground: ComponentValue;
	borderThickShadow: ComponentValue;
	fontSize: ComponentValue;
	paddingX: ComponentValue;
	paddingY: ComponentValue;
	borderRadius: ComponentValue;
	arrowSize: ComponentValue;
	zIndex: ComponentValue;
}

export interface DrawerTokens {
	maskBackground: ComponentValue;
	panelBackground: ComponentValue;
	panelColor: ComponentValue;
	panelShadow: ComponentValue;
	headerMinHeight: ComponentValue;
	headerPadding: ComponentValue;
	headerBorderColor: ComponentValue;
	titleFontSize: ComponentValue;
	closeSize: ComponentValue;
	closeRadius: ComponentValue;
	closeColor: ComponentValue;
	closeHoverBackground: ComponentValue;
	closeHoverColor: ComponentValue;
	focusColor: ComponentValue;
	bodyPadding: ComponentValue;
	footerPadding: ComponentValue;
	footerBorderColor: ComponentValue;
}

export interface NotificationTokens {
	infoColor: ComponentValue;
	successColor: ComponentValue;
	warningColor: ComponentValue;
	errorColor: ComponentValue;
	zIndex: ComponentValue;
	hostMinWidth: ComponentValue;
	positionTop: ComponentValue;
	positionRight: ComponentValue;
	minWidth: ComponentValue;
	maxWidth: ComponentValue;
	paddingY: ComponentValue;
	paddingX: ComponentValue;
	itemGap: ComponentValue;
	background: ComponentValue;
	borderColor: ComponentValue;
	borderRadius: ComponentValue;
	color: ComponentValue;
	shadow: ComponentValue;
	titleColor: ComponentValue;
	titleFontSize: ComponentValue;
	titleMarginBottom: ComponentValue;
	contentGap: ComponentValue;
	contentColor: ComponentValue;
	contentFontSize: ComponentValue;
	contentLineHeight: ComponentValue;
	closeSize: ComponentValue;
	closeColor: ComponentValue;
	closeHoverColor: ComponentValue;
	closeFocusRadius: ComponentValue;
	iconSize: ComponentValue;
}

export interface TableTokens {
	background: ComponentValue;
	textColor: ComponentValue;
	headerBackground: ComponentValue;
	rowBackground: ComponentValue;
	rowHoverBackground: ComponentValue;
	stripedBackground: ComponentValue;
	cellBorderColor: ComponentValue;
	borderRadius: ComponentValue;
	cellPaddingY: ComponentValue;
	cellPaddingX: ComponentValue;
	cellPaddingYSmall: ComponentValue;
	cellPaddingXSmall: ComponentValue;
	cellPaddingYLarge: ComponentValue;
	cellPaddingXLarge: ComponentValue;
	headerHeight: ComponentValue;
	headerFontSize: ComponentValue;
	headerFontWeight: ComponentValue;
	cellFontSize: ComponentValue;
	cellLineHeight: ComponentValue;
	fixedShadow: ComponentValue;
	fixedShadowRight: ComponentValue;
	emptyColor: ComponentValue;
	emptyMinHeight: ComponentValue;
	emptyPadding: ComponentValue;
	loadingBackground: ComponentValue;
	loadingOpacity: ComponentValue;
	loadingColor: ComponentValue;
	loadingSpinnerSize: ComponentValue;
	loadingSpinnerBorder: ComponentValue;
	loadingSpinnerTrack: ComponentValue;
	loadingSpinnerActive: ComponentValue;
	scrollbarSize: ComponentValue;
	scrollbarTrack: ComponentValue;
	scrollbarThumb: ComponentValue;
	scrollbarThumbHover: ComponentValue;
	scrollbarRadius: ComponentValue;
	transitionDuration: ComponentValue;
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
		menu: MenuTokens;
		pagination: PaginationTokens;
		breadcrumb: BreadcrumbTokens;
		step: StepTokens;
		card: CardTokens;
		tag: TagTokens;
		avatar: AvatarTokens;
		divider: DividerTokens;
		space: SpaceTokens;
		result: ResultTokens;
		progress: ProgressTokens;
		tooltip: TooltipTokens;
		drawer: DrawerTokens;
		notification: NotificationTokens;
		table: TableTokens;
	};
}

export type DeepPartial<T> = {
	[K in keyof T]?: T[K] extends object ? (T[K] extends TokenReference<string> ? T[K] : DeepPartial<T[K]>) : T[K];
};

export type ThemeOverride = DeepPartial<ThemeTokens>;
