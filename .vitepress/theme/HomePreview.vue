<script setup lang="ts">
import { ref } from 'vue';
import { SyButton, SyInput, SySwitch, SyTag } from 'sangyu-ui';

const projectName = ref('Sangyu Design UI');
const notifications = ref(true);
</script>

<template>
	<section class="sy-preview" aria-labelledby="sy-preview-title">
		<header class="sy-preview-header">
			<span class="sy-preview-mark" aria-hidden="true">S</span>
			<span>组件工作台</span>
			<SyTag type="primary">Vue 3</SyTag>
		</header>
		<div class="sy-preview-body">
			<p class="sy-preview-eyebrow">SANGYU / COMPONENTS</p>
			<h2 id="sy-preview-title">从一个组件开始</h2>
			<p class="sy-preview-description">试试输入与开关，感受真实的组件交互。</p>
			<div class="sy-preview-field">
				<label for="sy-preview-project">项目名称</label>
				<SyInput
					id="sy-preview-project"
					v-model="projectName"
					:input-attrs="{ 'aria-label': '项目名称' }"
					placeholder="输入项目名称"
					clearable
				/>
			</div>
			<div class="sy-preview-setting">
				<div>
					<span id="sy-preview-notifications">消息提醒</span>
					<p aria-live="polite">{{ notifications ? '及时接收项目更新' : '消息提醒已关闭' }}</p>
				</div>
				<SySwitch v-model="notifications" aria-labelledby="sy-preview-notifications" />
			</div>
			<div class="sy-preview-actions">
				<SyButton href="/components/button/">探索按钮</SyButton>
				<SyButton type="border" href="/introduce/theme">主题变量</SyButton>
			</div>
		</div>
		<footer class="sy-preview-footer">
			<span>Vue 3</span>
			<span>TypeScript</span>
			<span>CSS Variables</span>
		</footer>
	</section>
</template>
