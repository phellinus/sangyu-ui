<docs>
---
title: tooltip的基础使用
---
`tooltip` 的基本用法
</docs>

<template>
    <div>
        <SyTooltip placement="top" content="测试内容">
            <span>12312</span>
            <template #content>
                <div>qweeqe</div>
            </template>
        </SyTooltip>
    </div>
</template>
