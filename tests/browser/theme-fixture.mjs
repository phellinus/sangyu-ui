import { createApp, defineComponent, h, nextTick, ref } from 'vue';
import { createNotification, SyButton, SyDrawer, ThemeProvider, useTheme } from 'sangyu-ui';

const primaryColor = ref('#7040b0');
const notification = createNotification();

const ThemedContent = defineComponent({
	setup() {
		const theme = useTheme();
		const notify = () =>
			notification.info({ title: 'Theme test', content: 'Notification', type: 'success', duration: 0, theme });

		return () => [
			h(SyButton, { id: 'themed-button', onClick: () => (primaryColor.value = '#8660aa') }, () => 'Change color'),
			h('button', { id: 'notify', onClick: notify }, 'Notify'),
			h(SyDrawer, { visible: true, lockScroll: false }),
		];
	},
});

const App = defineComponent({
	setup() {
		return () =>
			h(
				ThemeProvider,
				{
					mode: 'dark',
					tokens: {
						base: { color: { primary: { 6: primaryColor.value } }, spacing: { xs: '12px' } },
						components: {
							drawer: { panelBackground: '#112233' },
							notification: { successColor: '#115533' },
						},
					},
				},
				() => [
					h(ThemeProvider, { id: 'inherited-scope' }, () => h(ThemedContent)),
					h(ThemeProvider, { id: 'light-scope', mode: 'light' }),
				],
			);
	},
});

const property = (element, name) => getComputedStyle(element).getPropertyValue(name).trim();

async function measure() {
	const app = createApp(App);
	app.mount('#app');
	await nextTick();

	const inheritedScope = document.getElementById('inherited-scope');
	const button = document.getElementById('themed-button');
	const initialButtonColor = property(button, 'background-color');
	button.click();
	await nextTick();
	document.getElementById('notify').click();
	await nextTick();

	const lightScope = document.getElementById('light-scope');
	const drawer = document.querySelector('.sy-drawer');
	const item = document.querySelector('.sy-notification-notify');
	return {
		inheritance: {
			initialButtonColor,
			updatedButtonColor: property(button, 'background-color'),
			inlineStyle: inheritedScope.getAttribute('style'),
		},
		lightBoundary: {
			background: property(lightScope, '--sy-color-bg'),
			spacing: property(lightScope, '--sy-spacing-xs'),
		},
		drawer: {
			insideApp: document.getElementById('app').contains(drawer),
			background: property(drawer, '--sy-color-bg'),
			panelBackground: property(drawer, '--sy-drawer-panel-background'),
		},
		notification: {
			insideApp: document.getElementById('app').contains(item),
			background: property(item, '--sy-color-bg'),
			successColor: property(item, '--sy-notification-success-color'),
		},
	};
}

const result = document.getElementById('theme-test-result');
measure().then(
	(values) => (result.textContent = JSON.stringify({ values })),
	(error) => (result.textContent = JSON.stringify({ error: String(error) })),
);
