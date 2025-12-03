import SyAimIcon from './aim.vue';
import SyIcon from './sy-icon.vue';
import { getIconComponent, listRegisteredIcons, registerIcon, registerIcons } from './registry';

registerIcon('aim', SyAimIcon, { aliases: ['SyAimIcon', 'aimIcon', 'sy-aim'] });

export { SyIcon, SyAimIcon, getIconComponent, registerIcon, registerIcons, listRegisteredIcons };
