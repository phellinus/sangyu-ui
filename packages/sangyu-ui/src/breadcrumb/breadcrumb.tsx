import { cloneVNode, defineComponent, Fragment, provide, VNode } from 'vue';
import { BreadcrumbProps } from './interface';
import { useClassnames } from '@sangyu-ui/utils';

export const breadcrumbKey = Symbol('breadcrumbKey');

const flattenChildren = (children: any[]): VNode[] => {
	const result: VNode[] = [];
	// 递归处理子节点，展开 Fragment 和数组
	children.forEach((child) => {
		if (!child) return;

		if (Array.isArray(child)) {
			result.push(...flattenChildren(child));
		} else if (child.type === Fragment && Array.isArray(child.children)) {
			result.push(...flattenChildren(child.children as any[]));
		} else if (child.type !== Comment) {
			result.push(child);
		}
	});

	return result;
};

export default defineComponent(
	(props: BreadcrumbProps, { slots }) => {
		provide(breadcrumbKey, {
			separator: props.separator || '/',
			separatorIcon: props.separatorIcon || '',
		});
		return () => {
			const { c } = useClassnames('breadcrumb');
			const BreadcrumbCls = {
				[c()]: true,
			};

			const children = flattenChildren(slots.default?.() || []);

			const validChildren = children.filter((child) => {
				const componentName = (child.type as any)?.name;
				const isValid = componentName === 'SyBreadcrumbItem';

				if (!isValid) {
					console.warn('[SyBreadCrumb] 子组件只能是 SangyuBreadcrumbItem');
				}

				return isValid;
			});
			const total = validChildren.length;

			const items = validChildren.map((child, index) => {
				return cloneVNode(child, {
					index,
					total,
				});
			});

			return <div class={BreadcrumbCls}>{items}</div>;
		};
	},
	{
		name: 'SyBreadCrumb',
	},
);
