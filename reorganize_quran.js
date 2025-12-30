const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'assets', 'data', 'quran');
const PAGES_DIR = path.join(__dirname, 'assets', 'data', 'quran', 'pages');
const JUZS_DIR = path.join(__dirname, 'assets', 'data', 'quran', 'juzs');

if (!fs.existsSync(PAGES_DIR)) fs.mkdirSync(PAGES_DIR, { recursive: true });
if (!fs.existsSync(JUZS_DIR)) fs.mkdirSync(JUZS_DIR, { recursive: true });

const pages = {};
const juzs = {};

for (let i = 1; i <= 114; i++) {
    const surahPath = path.join(DATA_DIR, `${i}.json`);
    if (!fs.existsSync(surahPath)) continue;

    const surah = JSON.parse(fs.readFileSync(surahPath, 'utf8'));

    surah.ayahs.forEach(ayah => {
        // Reorganize by page
        if (!pages[ayah.page]) pages[ayah.page] = [];
        pages[ayah.page].push({
            id: ayah.number,
            arabic: ayah.text,
            turkish: ayah.translation,
            verseNumber: ayah.numberInSurah,
            surahNumber: surah.number,
            surahName: surah.name,
            englishName: surah.englishName
        });

        // Reorganize by juz
        if (!juzs[ayah.juz]) juzs[ayah.juz] = [];
        juzs[ayah.juz].push({
            id: ayah.number,
            arabic: ayah.text,
            turkish: ayah.translation,
            verseNumber: ayah.numberInSurah,
            surahNumber: surah.number,
            surahName: surah.name,
            englishName: surah.englishName
        });
    });
}

// Save pages
Object.keys(pages).forEach(pageNumber => {
    fs.writeFileSync(
        path.join(PAGES_DIR, `${pageNumber}.json`),
        JSON.stringify(pages[pageNumber], null, 2)
    );
});

// Save juzs
Object.keys(juzs).forEach(juzNumber => {
    fs.writeFileSync(
        path.join(JUZS_DIR, `${juzNumber}.json`),
        JSON.stringify(juzs[juzNumber], null, 2)
    );
});

console.log('✅ Sayfa ve Cüz dosyaları başarıyla oluşturuldu!');
