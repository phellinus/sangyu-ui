<docs>
---
    title: 跳转按钮-href
---

点击按钮时，你希望可以直接跳转的话，可以在按钮上设置`href`值，点击后会跳转到指定链接。

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
