<docs>
---
    title: 跳转按钮-href
---

要添加带下划线的按钮，我们更改该值`href`。

</docs>

<template>
    <div class="content">
        <sy-button href="https://github.com/phellinus" color="primary" type="filled" @click="handleCLick">
            SangYu
        </sy-button>
        <sy-button href="https://github.com/phellinus" color="success" type="border" @click="handleCLick">
            SangYu
        </sy-button>
        <sy-button href="https://github.com/phellinus" color="warning" type="flat" @click="handleCLick">
            SangYu
        </sy-button>
        <sy-button href="https://github.com/phellinus" color="error" type="line" @click="handleCLick">SangYu</sy-button>
        <sy-button
            href="https://github.com/phellinus"
            color="rgb(70, 130, 180)"
            gradientColorSecondary="rgb(10, 80, 10)"
            type="gradient"
            @click="handleCLick"
        >
            SangYu
        </sy-button>
        <sy-button href="https://github.com/phellinus" color="blue" type="relief" @click="handleCLick">
            SangYu
        </sy-button>
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
