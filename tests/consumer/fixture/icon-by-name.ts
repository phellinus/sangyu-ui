import { createApp, h } from 'vue';
import { SyIcon } from '@sangyu-ui/icons';
import '@sangyu-ui/icons/style.css';

createApp({ render: () => h(SyIcon, { name: 'zoom-out' }) }).mount('#app');
