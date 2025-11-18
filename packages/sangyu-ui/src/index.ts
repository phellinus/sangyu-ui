import type { App, Plugin } from 'vue';
import * as components from './components';
import pkg from '../package.json';
export default {
    install(app: App) {
        Object.entries(components).forEach(([_name, comp]) => {
            if (comp.install) {
                app.use(comp as any);
            }
        });
    },
    version: pkg.version,
} as Plugin;
