const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../assets/data/quran/pages');
const outputPath = path.join(__dirname, '../supabase/fill_quran_metadata.sql');

let sqlValues = [];

for (let i = 1; i <= 604; i++) {
    try {
        const filePath = path.join(pagesDir, `${i}.json`);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(content);
            const count = Array.isArray(json) ? json.length : 0;
            sqlValues.push(`(${i}, ${count})`);
        } else {
            console.warn(`Page ${i} not found, skipping.`);
        }
    } catch (e) {
        console.error(`Error processing page ${i}:`, e);
    }
}

if (sqlValues.length > 0) {
    const sql = `
-- Auto-generated metadata population
INSERT INTO public.quran_page_metadata (page_number, verse_count)
VALUES
${sqlValues.join(',\n')}
ON CONFLICT (page_number) DO UPDATE SET verse_count = EXCLUDED.verse_count;
`;

    fs.writeFileSync(outputPath, sql);
    console.log(`Generated SQL for ${sqlValues.length} pages at ${outputPath}`);
} else {
    console.log('No data found.');
}
