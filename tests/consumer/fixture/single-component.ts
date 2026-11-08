import { createApp, h } from 'vue';
import { SyButton } from 'sangyu-ui';
import 'sangyu-ui/style.css';

createApp({ render: () => h(SyButton, {}, () => 'consumer') }).mount('#app');
