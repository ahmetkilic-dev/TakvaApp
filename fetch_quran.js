const fs = require('fs');
const path = require('path');

const API_BASE = 'https://api.alquran.cloud/v1';
const DATA_DIR = path.join(__dirname, 'assets', 'data', 'quran');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function fetchSurah(n) {
    console.log(`[${n}/114] Sure indiriliyor...`);
    try {
        const [arabicRes, turkishRes] = await Promise.all([
            fetch(`${API_BASE}/surah/${n}/quran-uthmani`),
            fetch(`${API_BASE}/surah/${n}/tr.yazir`)
        ]);

        const arabic = await arabicRes.json();
        const turkish = await turkishRes.json();

        if (arabic.code === 200 && turkish.code === 200) {
            const combined = {
                number: arabic.data.number,
                name: arabic.data.name,
                englishName: arabic.data.englishName,
                englishNameTranslation: arabic.data.englishNameTranslation,
                revelationType: arabic.data.revelationType,
                ayahs: arabic.data.ayahs.map((ayah, index) => ({
                    number: ayah.number,
                    text: ayah.text,
                    numberInSurah: ayah.numberInSurah,
                    juz: ayah.juz,
                    page: ayah.page,
                    translation: turkish.data.ayahs[index].text
                }))
            };

            fs.writeFileSync(
                path.join(DATA_DIR, `${n}.json`),
                JSON.stringify(combined, null, 2)
            );
        } else {
            console.error(`Hata: Sure ${n} indirilemedi.`);
        }
    } catch (err) {
        console.error(`Sure ${n} hatası:`, err.message);
    }
}

async function run() {
    for (let i = 1; i <= 114; i++) {
        await fetchSurah(i);
        // API'yi yormamak için kısa bir bekleme
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('✅ Tüm Kuran başarıyla indirildi!');
}

run();
