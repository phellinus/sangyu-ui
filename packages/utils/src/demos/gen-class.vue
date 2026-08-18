<template>
	<div :class="c('primary')">
		{{ c('a', 'b', cm('pmimary')) }}
		{{ clx }}
	</div>
	<button style="background-color: aqua" @click="handleClick">切换</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClassnames } from '../gen-class';
const { c, cx, cm } = useClassnames('button');
const testRef = ref(false);
const handleClick = () => {
	testRef.value = !testRef.value;
};
const clx = cx(() => ({
	c: true,
	d: testRef.value,
}));
</script>

<style scoped></style>
