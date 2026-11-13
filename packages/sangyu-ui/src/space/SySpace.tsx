import { defineComponent, type PropType } from 'vue';
import type { SpaceProps } from './Space.type';

export default defineComponent({
	name: 'SySpace',
	props: {
		size: { type: [String, Number, Array] as PropType<SpaceProps['size']>, default: 'medium' },
		direction: { type: String as PropType<SpaceProps['direction']>, default: 'horizontal' },
		align: { type: String as PropType<SpaceProps['align']>, default: undefined },
		wrap: { type: Boolean, default: false },
		split: { type: [String, Number] as PropType<SpaceProps['split']>, default: undefined },
	},
	setup(_, { slots }) {
		return () => <span class='sy-space'>{slots.default?.()}</span>;
	},
});
