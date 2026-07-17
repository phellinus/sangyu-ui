import { cloneVNode, computed, defineComponent, provide, type CSSProperties, type PropType, type VNode } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import type { BreadcrumbProps } from './Breadcrumb.type';
import { SyBreadcrumbItem } from './components';
import { breadcrumbContextKey } from './context';
import { flattenChildren } from './helpers';

function isBreadcrumbItem(child: VNode): boolean {
	return (
		(child.type as unknown) === SyBreadcrumbItem || (child.type as { name?: string })?.name === 'SyBreadcrumbItem'
	);
}

export default defineComponent({
	// 保留原组件名，避免现有项目产生破坏性变更
	name: 'SyBreadCrumb',

	props: {
		separator: {
			type: String,
			default: '/',
		},
		separatorIcon: {
			type: String,
			default: '',
		},
		customStyle: {
			type: [String, Object] as PropType<string | CSSProperties>,
			default: undefined,
		},
		handleClick: {
			type: Function as PropType<BreadcrumbProps['handleClick']>,
			default: undefined,
		},
	},

	setup(props, { slots }) {
		const { c } = useClassnames('breadcrumb');

		provide(breadcrumbContextKey, {
			separator: computed(() => props.separator),
			separatorIcon: computed(() => props.separatorIcon),
			handleItemClick: (to?: string) => {
				props.handleClick?.(to);
			},
		});

		return () => {
			const children = flattenChildren(slots.default?.() ?? []);

			const validChildren = children.filter((child) => {
				const valid = isBreadcrumbItem(child);

				if (!valid) {
					console.warn('[SyBreadCrumb] 子组件只能是 SyBreadcrumbItem');
				}

				return valid;
			});

			const items = validChildren.map((child, index) =>
				cloneVNode(child, {
					isLast: index === validChildren.length - 1,
				}),
			);

			return (
				<nav class={c()} style={props.customStyle} aria-label='breadcrumb'>
					{items}
				</nav>
			);
		};
	},
});
