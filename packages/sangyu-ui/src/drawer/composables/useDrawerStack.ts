import { onBeforeUnmount } from 'vue';

//记录所有抽屉的层级
const drawerStack: number[] = [];
let drawerSeed = 0;
//管理多个drawer的层级
export const useDrawerStack = () => {
	const drawerId = ++drawerSeed;
	let active = false;

	//当前抽屉放到栈顶
	const activate = () => {
		if (active) {
			return;
		}
		active = true;
		drawerStack.push(drawerId);
	};

	//将抽屉移出层级栈
	const deactivate = () => {
		if (!active) {
			return;
		}
		active = false;
		const index = drawerStack.indexOf(drawerId);

		if (index >= 0) {
			drawerStack.splice(index, 1);
		}
	};

	//判断当前的抽屉是否位于顶层
	const isTopmost = () => {
		return drawerStack[drawerStack.length - 1] === drawerId;
	};

	onBeforeUnmount(deactivate);

	return {
		activate,
		deactivate,
		isTopmost,
	};
};
