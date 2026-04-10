import { cloneVNode, Comment, defineComponent, Fragment, PropType, provide, toRef, VNode } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { StepDirection, StepsProps } from './interface';

export const stepsKey = Symbol('stepsKey');

const flattenChildren = (children: any[]): VNode[] => {
	const result: VNode[] = [];

	children.forEach((child) => {
		if (!child) {
			return;
		}

		if (Array.isArray(child)) {
			result.push(...flattenChildren(child));
			return;
		}

		if (child.type === Fragment && Array.isArray(child.children)) {
			result.push(...flattenChildren(child.children as any[]));
			return;
		}

		if (child.type !== Comment) {
			result.push(child);
		}
	});

	return result;
};

export default defineComponent({
	name: 'SySteps',
	props: {
		active: {
			type: Number,
			default: 0,
		},
		direction: {
			type: String as PropType<StepsProps['direction']>,
			default: 'horizontal',
		},
		customStyle: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		provide(stepsKey, {
			active: toRef(props, 'active'),
			direction: toRef(props, 'direction') as any,
		});

		const { c } = useClassnames('steps');
		const getStepsCls = () => ({
			[c()]: true,
			[c(props.direction as StepDirection)]: true,
		});

		return () => {
			const children = flattenChildren(slots.default?.() || []);
			const validChildren = children.filter((child) => {
				const componentName = (child.type as any)?.name;
				const isValid = componentName === 'SyStep';

				if (!isValid) {
					console.warn('[SySteps] 子组件只能是 SyStep');
				}

				return isValid;
			});

			const total = validChildren.length;
			const items = validChildren.map((child, index) =>
				cloneVNode(child, {
					index,
					total,
				}),
			);

			return (
				<div class={getStepsCls()} style={props.customStyle}>
					{items}
				</div>
			);
		};
	},
});
