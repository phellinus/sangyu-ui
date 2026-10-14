<script setup lang="ts">
import { ref } from 'vue';
import { SyButton, SyInput, SySwitch } from 'sangyu-ui';

const projectName = ref('Sangyu Design UI');
const autoSave = ref(true);
</script>

<template>
	<section class="sy-showcase" aria-labelledby="sy-showcase-title">
		<header class="sy-showcase-header">
			<h2 id="sy-showcase-title">Component study</h2>
			<span>01 / 04</span>
		</header>
		<div class="sy-showcase-controls">
			<div class="sy-showcase-buttons">
				<SyButton href="/components/button/">Button</SyButton>
				<SyButton type="border" href="/components/">
					浏览组件
					<span aria-hidden="true">↗</span>
				</SyButton>
			</div>
			<label class="sy-showcase-label" for="sy-showcase-project">项目名称</label>
			<SyInput
				id="sy-showcase-project"
				v-model="projectName"
				:input-attrs="{ 'aria-label': '项目名称' }"
				placeholder="输入项目名称"
				clearable
			/>
			<div class="sy-showcase-switch">
				<div>
					<span id="sy-showcase-autosave">自动保存</span>
					<p aria-live="polite">{{ autoSave ? '让每一次修改，都被记住。' : '自动保存已关闭。' }}</p>
				</div>
				<SySwitch v-model="autoSave" aria-labelledby="sy-showcase-autosave" />
			</div>
		</div>
		<table class="sy-showcase-table">
			<caption class="sy-sr-only">组件类型概览</caption>
			<thead>
				<tr>
					<th scope="col">组件</th>
					<th scope="col">分类</th>
					<th scope="col">交互</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">Button</th>
					<td>基础控件</td>
					<td><span class="sy-showcase-state">点击</span></td>
				</tr>
				<tr>
					<th scope="row">Input</th>
					<td>表单输入</td>
					<td><span class="sy-showcase-state">编辑</span></td>
				</tr>
				<tr>
					<th scope="row">Switch</th>
					<td>状态切换</td>
					<td><span class="sy-showcase-state">切换</span></td>
				</tr>
			</tbody>
		</table>
		<footer class="sy-showcase-footer">
			<span>少一点杂乱，多一点秩序。</span>
			<span aria-hidden="true">S / D</span>
		</footer>
	</section>
</template>
