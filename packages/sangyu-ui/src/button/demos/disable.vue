<docs>
---
    title: 禁用状态
---

按钮添加disabled属性,达到禁用效果
</docs>

<template>
    <div class="content">
        <sy-button disabled @click="handleCLick">按钮一</sy-button>
        <sy-button disabled type="dashed" @click="handleCLick">按钮二</sy-button>
        <sy-button disabled type="primary" @click="handleCLick">按钮三</sy-button>
    </div>
</template>

<script setup lang="ts">
    const handleCLick = () => {
        console.log('click');
    };
</script>
<style scoped>
    .content {
        display: flex;
        gap: 10px;
    }
</style>
