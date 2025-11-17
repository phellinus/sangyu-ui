<template>
    <div :class="c('primary')">
        {{ c('primary') }}
        {{ clx }}
    </div>
    <button style="background-color: aqua" @click="handleClick">切换</button>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useClassnames } from '../gen-class';
    const { c, cx } = useClassnames('button');
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
