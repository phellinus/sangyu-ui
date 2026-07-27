import type { App } from 'vue';
import SyTooltip from './SyTooltip';

// 注册 Tooltip 全局组件
(SyTooltip as any).install = (app: App) => {
	app.component(SyTooltip.name || 'SyTooltip', SyTooltip);
};

export { SyTooltip };
export * from './Tooltip.type';
export default SyTooltip;
