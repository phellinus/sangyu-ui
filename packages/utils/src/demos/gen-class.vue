<template>
    <div :class="c('primary')">
        {{ c('primary') }}
    </div>
</template>

<script setup lang="ts">
    import { useClassnames } from '../gen-class';

    const { c } = useClassnames('button');
</script>

<style scoped></style>
