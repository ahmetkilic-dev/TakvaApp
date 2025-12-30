const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, 'components', 'kuran', 'hooks', 'quranData.js');

let content = '/* eslint-disable global-require */\n\n';

// Surahs
content += 'export const SURAH_DATA = {\n';
for (let i = 1; i <= 114; i++) {
    content += `  ${i}: require('../../../assets/data/quran/${i}.json'),\n`;
}
content += '};\n\n';

// Pages
content += 'export const PAGE_DATA = {\n';
for (let i = 1; i <= 604; i++) {
    content += `  ${i}: require('../../../assets/data/quran/pages/${i}.json'),\n`;
}
content += '};\n\n';

// Juzs
content += 'export const JUZ_DATA = {\n';
for (let i = 1; i <= 30; i++) {
    content += `  ${i}: require('../../../assets/data/quran/juzs/${i}.json'),\n`;
}
content += '};\n';

fs.writeFileSync(OUTPUT_FILE, content);
console.log('✅ quranData.js başarıyla oluşturuldu!');
