import type { InjectionKey } from 'vue';
import type { MenuContext } from '../Menu.type';

export const DEFAULT_MENU_MODE = 'vertical';
export const DEFAULT_HOVER_BG_COLOR = '#f0f2f4';
export const DEFAULT_HOVER_COLOR = '#2c3034';

export const MENU_INJECTION_KEY: InjectionKey<MenuContext> = Symbol('SyMenuContext');
