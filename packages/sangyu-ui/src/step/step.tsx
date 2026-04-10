import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import { useClassnames } from '@sangyu-ui/utils';
import { SyIcon } from '@sangyu-ui/icons';
import { StepDirection, StepProps, StepStatus } from './interface';
import { stepsKey } from './steps';

export default defineComponent({
	name: 'SyStep',
	props: {
		title: {
			type: String,
			default: '',
		},
		description: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		status: {
			type: String as PropType<StepProps['status']>,
			default: undefined,
		},
		index: {
			type: Number,
			default: -1,
		},
		total: {
			type: Number,
			default: 0,
		},
		customStyle: {
			type: String,
			default: '',
		},
	},
	setup(props, { slots }) {
		const stepsContext = inject<{
			active: Ref<number>;
			direction: Ref<StepDirection>;
		}>(stepsKey, {
			active: computed(() => 0),
			direction: computed(() => 'horizontal'),
		});

		const { c } = useClassnames('step');
		const direction = computed(() => stepsContext.direction?.value || 'horizontal');
		const resolvedStatus = computed<StepStatus>(() => {
			if (props.status) {
				return props.status;
			}

			const active = stepsContext.active?.value ?? 0;

			if (props.index < active) {
				return 'finish';
			}

			if (props.index === active) {
				return 'process';
			}

			return 'wait';
		});
		const isLast = computed(() => props.index === props.total - 1);
		const hasDescription = computed(() => !!(slots.description?.() || props.description));

		const getStepCls = () => ({
			[c()]: true,
			[c(direction.value)]: true,
			[c(resolvedStatus.value)]: true,
			[c('with-description')]: hasDescription.value,
			'is-last': isLast.value,
		});
		const getIndicatorCls = () => ({
			[c('indicator')]: true,
			[c(`indicator-${resolvedStatus.value}`)]: true,
		});
		const getTailCls = () => ({
			[c('tail')]: true,
			[c(`tail-${resolvedStatus.value}`)]: true,
		});

		const renderIndicatorContent = () => {
			if (slots.icon) {
				return slots.icon();
			}

			if (props.icon) {
				return <SyIcon name={props.icon} size={18} />;
			}

			if (resolvedStatus.value === 'finish') {
				return <SyIcon name='check' size={16} />;
			}

			if (resolvedStatus.value === 'error') {
				return <SyIcon name='close' size={16} />;
			}

			return <span class={c('index')}>{props.index >= 0 ? props.index + 1 : ''}</span>;
		};

		return () => {
			const titleNode = slots.title?.() ?? props.title;
			const descriptionNode = slots.description?.() ?? props.description;

			return (
				<div
					class={getStepCls()}
					style={props.customStyle}
					data-index={props.index}
					data-status={resolvedStatus.value}
					data-direction={direction.value}
				>
					<div class={c('head')}>
						<div class={getIndicatorCls()}>{renderIndicatorContent()}</div>
						{!isLast.value && <div class={getTailCls()}></div>}
					</div>
					<div class={c('main')}>
						<div class={c('title')}>{titleNode}</div>
						{descriptionNode && <div class={c('description')}>{descriptionNode}</div>}
					</div>
				</div>
			);
		};
	},
});
