<script setup lang="ts">
import { withBase } from 'vitepress';

import { componentCatalog } from './componentCatalog';

const componentCount = componentCatalog.reduce((total, group) => total + group.items.length, 0);
</script>

<template>
	<div class="vp-raw sy-components-catalog">
		<header class="sy-catalog-header">
			<div>
				<p class="sy-catalog-eyebrow">SANGYU DESIGN UI / COMPONENTS</p>
				<h1>组件概览</h1>
				<p class="sy-catalog-lead">为每一个界面，找到合适的组件。</p>
				<p class="sy-catalog-description">从基础控件到数据展示，浏览组件、查看示例，开始构建一致的产品体验。</p>
			</div>
			<dl class="sy-catalog-stats">
				<div>
					<dt>组件</dt>
					<dd>{{ componentCount }}</dd>
				</div>
				<div>
					<dt>分类</dt>
					<dd>{{ componentCatalog.length.toString().padStart(2, '0') }}</dd>
				</div>
			</dl>
		</header>

		<nav class="sy-catalog-jumps" aria-label="组件分类">
			<a v-for="group in componentCatalog" :key="group.id" :href="`#${group.id}`">
				{{ group.title }}
				<span>{{ group.items.length }}</span>
			</a>
		</nav>

		<section
			v-for="(group, index) in componentCatalog"
			:id="group.id"
			:key="group.id"
			class="sy-catalog-group"
			:aria-labelledby="`catalog-${group.id}`"
		>
			<header class="sy-catalog-group-header">
				<span class="sy-catalog-group-number" aria-hidden="true">
					{{ (index + 1).toString().padStart(2, '0') }}
				</span>
				<div>
					<h2 :id="`catalog-${group.id}`">
						{{ group.title }}
						<span>{{ group.items.length }}</span>
					</h2>
					<p>{{ group.description }}</p>
				</div>
			</header>
			<div class="sy-catalog-grid">
				<a v-for="item in group.items" :key="item.link" class="sy-catalog-entry" :href="withBase(item.link)">
					<div class="sy-catalog-entry-heading">
						<h3>{{ item.label }}</h3>
						<span aria-hidden="true">↗</span>
					</div>
					<span class="sy-catalog-entry-name">{{ item.name }}</span>
					<p>{{ item.description }}</p>
					<span class="sy-catalog-entry-footer">
						查看文档
						<span aria-hidden="true">→</span>
					</span>
				</a>
			</div>
		</section>

		<aside class="sy-catalog-guide" aria-label="文档阅读指引">
			<div>
				<span class="sy-catalog-eyebrow">NEXT STEP</span>
				<h2>从示例开始，逐步深入。</h2>
				<p>
					每份组件文档包含使用示例、API 与交互说明。建议先体验 Demo，再根据 Props、Events 和 Slots 接入项目。
				</p>
			</div>
			<a :href="withBase('/introduce/')">
				阅读使用指南
				<span aria-hidden="true">↗</span>
			</a>
		</aside>
	</div>
</template>
