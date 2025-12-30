/* eslint-disable global-require */

/**
 * require.context: 
 * Belirli bir klasördeki tüm dosyaları tek seferde, otomatik olarak taramamızı sağlar.
 * Manuel olarak 700+ dosyayı require etmek yerine bu yöntem çok daha güvenli ve temizdir.
 */

// Sureler (assets/data/quran/*.json)
const surahContext = require.context('../../../assets/data/quran', false, /^\.\/\d+\.json$/);
export const SURAH_DATA = surahContext.keys().reduce((acc, key) => {
  const num = key.match(/\d+/)[0];
  acc[num] = surahContext(key);
  return acc;
}, {});

// Sayfalar (assets/data/quran/pages/*.json)
const pageContext = require.context('../../../assets/data/quran/pages', false, /^\.\/\d+\.json$/);
export const PAGE_DATA = pageContext.keys().reduce((acc, key) => {
  const num = key.match(/\d+/)[0];
  acc[num] = pageContext(key);
  return acc;
}, {});

// Cüzler (assets/data/quran/juzs/*.json)
const juzContext = require.context('../../../assets/data/quran/juzs', false, /^\.\/\d+\.json$/);
export const JUZ_DATA = juzContext.keys().reduce((acc, key) => {
  const num = key.match(/\d+/)[0];
  acc[num] = juzContext(key);
  return acc;
}, {});
