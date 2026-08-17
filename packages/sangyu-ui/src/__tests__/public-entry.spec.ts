import { createApp, defineComponent } from 'vue';
import { describe, expect, it } from 'vitest';
import pkg from '../../package.json';
import SangyuUIDefault, {
	SangyuUI,
	SyButton,
	SyMenuItem,
	SyNotificationContainer,
	SySubMenu,
	createNotification,
	version,
} from '../index';

describe('sangyu-ui public entry', () => {
	it('exports the complete plugin and public helpers', () => {
		expect(SangyuUIDefault).toBe(SangyuUI);
		expect(version).toBe(pkg.version);
		expect(SangyuUI.version).toBe(pkg.version);
		expect(SyMenuItem).toBeDefined();
		expect(SySubMenu).toBeDefined();
		expect(SyNotificationContainer).toBeDefined();
		expect(createNotification).toBeTypeOf('function');
	});

	it('registers primary and associated components', () => {
		const app = createApp(defineComponent(() => () => null));

		app.use(SangyuUI);

		expect(app.component('SyButton')).toBe(SyButton);
		expect(app.component('SyMenuItem')).toBe(SyMenuItem);
		expect(app.component('SySubMenu')).toBe(SySubMenu);
		expect(app.config.globalProperties.$notification).toBeTypeOf('function');
	});
});
