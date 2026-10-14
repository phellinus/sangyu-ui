<script setup lang="ts">
import HomePreview from './HomePreview.vue';

const themes = [
	{ mode: 'light', name: 'LIGHT', label: '浅色界面' },
	{ mode: 'dark', name: 'DARK', label: '深色界面' },
];
</script>

<template>
	<div class="sy-home-sections">
		<section class="sy-story" aria-labelledby="sy-story-components">
			<div class="sy-story-inner">
				<div class="sy-story-copy">
					<p class="sy-story-eyebrow">01 / COMPONENTS</p>
					<h2 id="sy-story-components">
						从基础控件，
						<br />
						到完整界面。
					</h2>
					<p>按钮、输入、表格与导航。把常用的界面语言沉淀为组件，让每一次构建都有清晰的起点。</p>
					<a class="sy-story-link" href="/components/">
						浏览组件
						<span aria-hidden="true">↗</span>
					</a>
				</div>
				<div class="sy-story-visual sy-design-visual"><HomePreview /></div>
			</div>
		</section>

		<section class="sy-story sy-story-reverse sy-theme-story" aria-labelledby="sy-story-design">
			<div class="sy-story-inner">
				<div class="sy-story-copy">
					<p class="sy-story-eyebrow">02 / DESIGN LANGUAGE</p>
					<h2 id="sy-story-design">
						不同的主题，
						<br />
						同一种秩序。
					</h2>
					<p>
						用统一的色彩、间距与圆角连接每一个细节。CSS 变量驱动主题，让浅色与深色界面保持同样清晰的层级。
					</p>
					<a class="sy-story-link" href="/introduce/theme">
						了解主题
						<span aria-hidden="true">↗</span>
					</a>
				</div>
				<figure class="sy-story-visual sy-theme-comparison" aria-labelledby="sy-theme-caption">
					<div
						v-for="theme in themes"
						:key="theme.mode"
						class="sy-theme-sample"
						:class="`sy-theme-sample-${theme.mode}`"
					>
						<div class="sy-theme-sample-heading">
							<span>{{ theme.name }}</span>
							<span aria-hidden="true">S / D</span>
						</div>
						<div class="sy-theme-sample-body" aria-hidden="true">
							<span class="sy-theme-sample-title">Design system</span>
							<div class="sy-theme-sample-line"></div>
							<div class="sy-theme-sample-line sy-theme-sample-line-short"></div>
							<div class="sy-theme-sample-field">Sangyu Design UI</div>
							<div class="sy-theme-sample-row">
								<span>通知</span>
								<span class="sy-theme-sample-switch"></span>
							</div>
							<div class="sy-theme-sample-button">开始构建</div>
						</div>
						<p class="sy-theme-sample-label">{{ theme.label }}</p>
					</div>
					<figcaption id="sy-theme-caption">一致的结构，自由的表达。</figcaption>
				</figure>
			</div>
		</section>

		<section class="sy-story sy-engineering-story" aria-labelledby="sy-story-engineering">
			<div class="sy-story-inner">
				<div class="sy-story-copy">
					<p class="sy-story-eyebrow">03 / DEVELOPER EXPERIENCE</p>
					<h2 id="sy-story-engineering">
						让代码更直接，
						<br />
						让想法更快落地。
					</h2>
					<p>基于 Vue 3、TypeScript 与 Vite。按需引入、类型推导与配套示例，让你把注意力留给产品本身。</p>
					<a class="sy-story-link" href="/introduce/">
						开始使用
						<span aria-hidden="true">↗</span>
					</a>
				</div>
				<figure class="sy-story-visual sy-engineering-visual" aria-labelledby="sy-engineering-caption">
					<div class="sy-code-window">
						<div class="sy-code-window-header">
							<span>App.vue</span>
							<span>Vue + TypeScript</span>
						</div>
						<pre><code><span class="sy-code-comment">// 从一个组件开始</span>
<span class="sy-code-keyword">import</span> { SyButton, SyInput }
  <span class="sy-code-keyword">from</span> <span class="sy-code-string">'sangyu-ui'</span>;
<span class="sy-code-keyword">import</span> <span class="sy-code-string">'sangyu-ui/style.css'</span>;

<span class="sy-code-keyword">&lt;SyInput</span> v-model=<span class="sy-code-string">"name"</span> <span class="sy-code-keyword">/&gt;</span>
<span class="sy-code-keyword">&lt;SyButton&gt;</span>开始构建<span class="sy-code-keyword">&lt;/SyButton&gt;</span></code></pre>
					</div>
					<figcaption id="sy-engineering-caption" class="sy-component-index">
						<span>Vue 3</span>
						<span>TypeScript</span>
						<span>按需引入</span>
						<span>CSS Variables</span>
					</figcaption>
				</figure>
			</div>
		</section>

		<section class="sy-community-section" aria-labelledby="sy-story-community">
			<div class="sy-community-inner">
				<p class="sy-story-eyebrow">04 / OPEN SOURCE</p>
				<h2 id="sy-story-community">
					一起构建，
					<br />
					一起变好。
				</h2>
				<div class="sy-community-bottom">
					<p>
						从一个想法到一次贡献，设计与研发共同打磨。
						<br />
						欢迎通过 Issue 和 Pull Request，让好的体验持续生长。
					</p>
					<a class="sy-story-link" href="https://github.com/phellinus/sangyu-ui">
						参与项目共建
						<span aria-hidden="true">↗</span>
					</a>
				</div>
			</div>
		</section>
	</div>
</template>
