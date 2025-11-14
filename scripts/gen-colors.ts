import { blue, green, red, gold, grey } from '@ant-design/colors';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

let colors = '';
blue.forEach((item, index) => {
    colors += `--sy-color-primary-${index + 1}:${item};\n`;
});
colors += `\n`;

green.forEach((item, index) => {
    colors += `--sy-color-success-${index + 1}:${item};\n`;
});
colors += `\n`;

red.forEach((item, index) => {
    colors += `--sy-color-error-${index + 1}:${item};\n`;
});
colors += `\n`;

gold.forEach((item, index) => {
    colors += `--sy-color-warning-${index + 1}:${item};\n`;
});
colors += `\n`;

grey.forEach((item, index) => {
    colors += `--gray-${index + 1}:${item};\n`;
});

const baseUrl = fileURLToPath(new URL('../', import.meta.url));
const cssFile = path.resolve(baseUrl, 'packages/sangyu-ui/src/style/theme/colors.css');
fs.writeFileSync(cssFile, `:root{\n${colors}\n}`);

console.log('颜色变量生成成功');
