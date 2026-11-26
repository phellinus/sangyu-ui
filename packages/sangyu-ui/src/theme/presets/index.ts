import { mergeTheme } from '../merge';
import type { ThemeOverride, ThemeTokens } from '../types';
import { darkBaseOverride, lightBase } from './base';
import { darkSemanticOverride, lightSemantic } from './semantic';
import { avatarTokens } from './components/avatar';
import { breadcrumbTokens } from './components/breadcrumb';
import { buttonTokens } from './components/button';
import { cardTokens } from './components/card';
import { carouselTokens } from './components/carousel';
import { checkboxGroupTokens, checkboxTokens } from './components/checkbox';
import { collapseTokens } from './components/collapse';
import { dividerTokens } from './components/divider';
import { drawerTokens } from './components/drawer';
import { formTokens } from './components/form';
import { inputTokens } from './components/input';
import { layoutTokens } from './components/layout';
import { menuTokens } from './components/menu';
import { notificationTokens } from './components/notification';
import { paginationTokens } from './components/pagination';
import { progressTokens } from './components/progress';
import { radioButtonTokens, radioGroupTokens, radioTokens } from './components/radio';
import { resultTokens } from './components/result';
import { selectTokens } from './components/select';
import { spaceTokens } from './components/space';
import { stepTokens } from './components/step';
import { darkSwitchOverride, switchTokens } from './components/switch';
import { tableTokens } from './components/table';
import { tabsTokens } from './components/tabs';
import { tagTokens } from './components/tag';
import { tooltipTokens } from './components/tooltip';
import { verifyTokens } from './components/verify';

const lightDefinition = {
	base: lightBase,
	semantic: lightSemantic,
	components: {
		button: buttonTokens,
		input: inputTokens,
		checkbox: checkboxTokens,
		checkboxGroup: checkboxGroupTokens,
		radio: radioTokens,
		radioGroup: radioGroupTokens,
		radioButton: radioButtonTokens,
		switch: switchTokens,
		select: selectTokens,
		form: formTokens,
		menu: menuTokens,
		pagination: paginationTokens,
		breadcrumb: breadcrumbTokens,
		step: stepTokens,
		card: cardTokens,
		collapse: collapseTokens,
		tag: tagTokens,
		avatar: avatarTokens,
		divider: dividerTokens,
		space: spaceTokens,
		layout: layoutTokens,
		result: resultTokens,
		progress: progressTokens,
		tooltip: tooltipTokens,
		drawer: drawerTokens,
		notification: notificationTokens,
		table: tableTokens,
		tabs: tabsTokens,
		carousel: carouselTokens,
		verify: verifyTokens,
	},
};

export type ThemeDefinition = typeof lightDefinition;
export const lightTheme: ThemeTokens = lightDefinition;

const darkOverride = {
	base: darkBaseOverride,
	semantic: darkSemanticOverride,
	components: { switch: darkSwitchOverride },
} satisfies ThemeOverride;

export const darkTheme = mergeTheme(lightTheme, darkOverride);
