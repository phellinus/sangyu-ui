<script setup lang="ts">
import { ref } from 'vue';
import SangyuUI, { SyButton, type ButtonProps, type SangyuUIPlugin, type SyButtonInstance } from 'sangyu-ui';
import { SyAimIcon, SyIcon, getIconComponent } from '@sangyu-ui/icons';

const plugin: SangyuUIPlugin = SangyuUI;
const button = ref<SyButtonInstance>();
const props: ButtonProps = { type: 'filled', size: 'small', nativeType: 'button' };
const icon = getIconComponent('aim');
const focus = () => button.value?.focus();
</script>

<template>
	<SyButton ref="button" v-bind="props" @click="focus">{{ plugin.version }}</SyButton>
	<SyAimIcon />
	<SyIcon name="aim" :component="icon" :size="20" spin />
</template>
