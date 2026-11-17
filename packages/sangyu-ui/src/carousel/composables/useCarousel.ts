import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import type { CarouselProps } from '../Carousel.type';

type ChangeEmit = {
	(event: 'update:modelValue', index: number): void;
	(event: 'change', index: number, previousIndex: number, isManual: boolean): void;
};

function normalize(index: number | undefined, count: number): number {
	if (count < 1 || !Number.isFinite(index)) return 0;
	return Math.min(Math.max(Math.trunc(index ?? 0), 0), count - 1);
}

/** 管理受控索引、镜像边界和自动播放的浏览器生命周期 */
export function useCarousel(props: CarouselProps, count: Ref<number>, emit: ChangeEmit) {
	const internal = ref(props.defaultValue ?? 0);
	const controlled = computed(() => props.modelValue !== undefined);
	const current = computed(() => normalize(controlled.value ? props.modelValue : internal.value, count.value));
	const targetVisualIndex = ref<number | null>(null);
	const animating = ref(false);
	const suppressTransition = ref(false);
	const hovered = ref(false);
	const focused = ref(false);
	const paused = ref(false);
	const mounted = ref(false);
	const pageHidden = ref(false);
	const reducedMotion = ref(false);
	const pending = ref<number | null>(null);
	let directionHint: -1 | 0 | 1 = 0;
	let autoplayTimer: ReturnType<typeof setTimeout> | undefined;
	let transitionTimer: ReturnType<typeof setTimeout> | undefined;
	let media: MediaQueryList | undefined;
	let snapFrame: number | undefined;

	const hasClones = computed(() => {
		return props.animation === 'slide' && props.loop !== false && count.value > 1;
	});
	const visualIndex = computed(() => {
		return targetVisualIndex.value ?? current.value + (hasClones.value ? 1 : 0);
	});
	const canPlay = computed(
		() =>
			mounted.value &&
			props.autoplay === true &&
			count.value > 1 &&
			!paused.value &&
			(!props.pauseOnHover || !hovered.value) &&
			!focused.value &&
			!pageHidden.value &&
			!reducedMotion.value &&
			!animating.value &&
			pending.value === null,
	);

	function clearAutoplay() {
		if (autoplayTimer !== undefined) {
			clearTimeout(autoplayTimer);
		}
		autoplayTimer = undefined;
	}

	function settle() {
		if (transitionTimer !== undefined) {
			clearTimeout(transitionTimer);
		}
		transitionTimer = undefined;
		if (snapFrame !== undefined) {
			cancelAnimationFrame(snapFrame);
		}
		snapFrame = undefined;
		suppressTransition.value = false;
		const snapping =
			hasClones.value && (targetVisualIndex.value === 0 || targetVisualIndex.value === count.value + 1);
		if (snapping) {
			suppressTransition.value = true;
		}
		targetVisualIndex.value = null;
		animating.value = false;
		if (snapping && typeof requestAnimationFrame === 'function') {
			// 镜像项归位先提交无过渡的 DOM，再恢复后续切换动画
			void nextTick(() => {
				if (!mounted.value) {
					return;
				}
				snapFrame = requestAnimationFrame(() => {
					snapFrame = requestAnimationFrame(() => {
						suppressTransition.value = false;
						snapFrame = undefined;
					});
				});
			});
		}
	}

	function request(index: number, isManual = true, hint: -1 | 0 | 1 = 0) {
		if (count.value < 2 || animating.value || suppressTransition.value) {
			return;
		}
		const next =
			props.loop === false ? normalize(index, count.value) : ((index % count.value) + count.value) % count.value;
		if (next === current.value || pending.value === next) {
			return;
		}
		const previous = current.value;
		directionHint = hint;
		if (controlled.value) {
			pending.value = next;
		} else {
			internal.value = next;
		}
		emit('update:modelValue', next);
		emit('change', next, previous, isManual);
	}

	function next(isManual = true) {
		request(current.value + 1, isManual, 1);
	}

	function previous() {
		request(current.value - 1, true, -1);
	}

	function select(index: number) {
		request(index);
	}

	function restartAutoplay() {
		clearAutoplay();
		if (!canPlay.value) {
			return;
		}
		autoplayTimer = setTimeout(
			() => {
				autoplayTimer = undefined;
				next(false);
			},
			Math.max(1, props.interval ?? 3000),
		);
	}

	function onVisibilityChange() {
		pageHidden.value = document.hidden;
		if (pageHidden.value) {
			clearAutoplay();
		}
	}

	function onMediaChange(event: MediaQueryListEvent) {
		reducedMotion.value = event.matches;
		if (reducedMotion.value) {
			clearAutoplay();
		}
	}

	watch(
		current,
		(value, previousValue) => {
			pending.value = null;
			if (value === previousValue || count.value < 2) {
				return;
			}
			settle();
			if (props.animation !== 'slide' && props.animation !== 'fade') {
				return;
			}
			const duration = reducedMotion.value ? 0 : Math.max(0, props.transitionDuration ?? 500);
			if (duration === 0) {
				return;
			}
			if (props.animation === 'slide') {
				const last = count.value - 1;
				if (hasClones.value && previousValue === last && value === 0 && directionHint === 1) {
					targetVisualIndex.value = count.value + 1;
				} else if (hasClones.value && previousValue === 0 && value === last && directionHint === -1) {
					targetVisualIndex.value = 0;
				} else {
					targetVisualIndex.value = value + (hasClones.value ? 1 : 0);
				}
			}
			animating.value = true;
			transitionTimer = setTimeout(settle, duration + 40);
		},
		{ flush: 'sync' },
	);

	watch(count, () => {
		pending.value = null;
		settle();
	});
	watch(() => [props.animation, props.loop, props.transitionDuration, reducedMotion.value], settle);
	watch([canPlay, () => props.interval, current], restartAutoplay, { immediate: true });

	onMounted(() => {
		pageHidden.value = document.hidden;
		document.addEventListener('visibilitychange', onVisibilityChange);
		if (typeof window.matchMedia === 'function') {
			media = window.matchMedia('(prefers-reduced-motion: reduce)');
			reducedMotion.value = media.matches;
			media.addEventListener('change', onMediaChange);
		}
		mounted.value = true;
	});
	onBeforeUnmount(() => {
		mounted.value = false;
		clearAutoplay();
		settle();
		if (snapFrame !== undefined) {
			cancelAnimationFrame(snapFrame);
		}
		document.removeEventListener('visibilitychange', onVisibilityChange);
		media?.removeEventListener('change', onMediaChange);
	});

	return {
		current,
		visualIndex,
		animating,
		suppressTransition,
		hasClones,
		paused,
		hovered,
		focused,
		reducedMotion,
		canPlay,
		next,
		previous,
		select,
		settle,
	};
}
