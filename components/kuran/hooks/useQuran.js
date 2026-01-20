import { useState, useEffect, useCallback, useMemo } from 'react';
import { PAGE_DATA } from './quranData';

/**
 * Kuran Yerel Veri hook'u
 * Sure, cüz, sayfa bazlı veri çeker
 * Tüm veriler yerelden (offline) okunur
 */

// Sure bilgileri (sabit veri)
export const SURAH_INFO = [
  { number: 1, name: 'Fâtiha', nameTransliterated: 'Al-Fatiha', nameTranslated: 'Açılış', ayahCount: 7 },
  { number: 2, name: 'Bakara', nameTransliterated: 'Al-Baqarah', nameTranslated: 'İnek', ayahCount: 286 },
  { number: 3, name: 'Âl-i İmrân', nameTransliterated: 'Ali Imran', nameTranslated: 'İmran Ailesi', ayahCount: 200 },
  { number: 4, name: 'Nisâ', nameTransliterated: 'An-Nisa', nameTranslated: 'Kadınlar', ayahCount: 176 },
  { number: 5, name: 'Mâide', nameTransliterated: 'Al-Ma\'idah', nameTranslated: 'Sofra', ayahCount: 120 },
  { number: 6, name: 'En\'âm', nameTransliterated: 'Al-An\'am', nameTranslated: 'Davar', ayahCount: 165 },
  { number: 7, name: 'A\'râf', nameTransliterated: 'Al-A\'raf', nameTranslated: 'Yüksek Yerler', ayahCount: 206 },
  { number: 8, name: 'Enfâl', nameTransliterated: 'Al-Anfal', nameTranslated: 'Ganimetler', ayahCount: 75 },
  { number: 9, name: 'Tevbe', nameTransliterated: 'At-Tawbah', nameTranslated: 'Tövbe', ayahCount: 129 },
  { number: 10, name: 'Yûnus', nameTransliterated: 'Yunus', nameTranslated: 'Yunus', ayahCount: 109 },
  { number: 11, name: 'Hûd', nameTransliterated: 'Hud', nameTranslated: 'Hud', ayahCount: 123 },
  { number: 12, name: 'Yûsuf', nameTransliterated: 'Yusuf', nameTranslated: 'Yusuf', ayahCount: 111 },
  { number: 13, name: 'Ra\'d', nameTransliterated: 'Ar-Ra\'d', nameTranslated: 'Gök Gürültüsü', ayahCount: 43 },
  { number: 14, name: 'İbrâhîm', nameTransliterated: 'Ibrahim', nameTranslated: 'İbrahim', ayahCount: 52 },
  { number: 15, name: 'Hicr', nameTransliterated: 'Al-Hijr', nameTranslated: 'Hicr', ayahCount: 99 },
  { number: 16, name: 'Nahl', nameTransliterated: 'An-Nahl', nameTranslated: 'Arı', ayahCount: 128 },
  { number: 17, name: 'İsrâ', nameTransliterated: 'Al-Isra', nameTranslated: 'Gece Yürüyüşü', ayahCount: 111 },
  { number: 18, name: 'Kehf', nameTransliterated: 'Al-Kahf', nameTranslated: 'Mağara', ayahCount: 110 },
  { number: 19, name: 'Meryem', nameTransliterated: 'Maryam', nameTranslated: 'Meryem', ayahCount: 98 },
  { number: 20, name: 'Tâhâ', nameTransliterated: 'Ta-Ha', nameTranslated: 'Ta-Ha', ayahCount: 135 },
  { number: 21, name: 'Enbiyâ', nameTransliterated: 'Al-Anbya', nameTranslated: 'Peygamberler', ayahCount: 112 },
  { number: 22, name: 'Hac', nameTransliterated: 'Al-Hajj', nameTranslated: 'Hac', ayahCount: 78 },
  { number: 23, name: 'Mü\'minûn', nameTransliterated: 'Al-Mu\'minun', nameTranslated: 'Müminler', ayahCount: 118 },
  { number: 24, name: 'Nûr', nameTransliterated: 'An-Nur', nameTranslated: 'Işık', ayahCount: 64 },
  { number: 25, name: 'Furkân', nameTransliterated: 'Al-Furqan', nameTranslated: 'Furkan', ayahCount: 77 },
  { number: 26, name: 'Şuarâ', nameTransliterated: 'Ash-Shu\'ara', nameTranslated: 'Şairler', ayahCount: 227 },
  { number: 27, name: 'Neml', nameTransliterated: 'An-Naml', nameTranslated: 'Karınca', ayahCount: 93 },
  { number: 28, name: 'Kasas', nameTransliterated: 'Al-Qasas', nameTranslated: 'Hikayeler', ayahCount: 88 },
  { number: 29, name: 'Ankebût', nameTransliterated: 'Al-Ankabut', nameTranslated: 'Örümcek', ayahCount: 69 },
  { number: 30, name: 'Rûm', nameTransliterated: 'Ar-Rum', nameTranslated: 'Romalılar', ayahCount: 60 },
  { number: 31, name: 'Lokmân', nameTransliterated: 'Luqman', nameTranslated: 'Lokman', ayahCount: 34 },
  { number: 32, name: 'Secde', nameTransliterated: 'As-Sajdah', nameTranslated: 'Secde', ayahCount: 30 },
  { number: 33, name: 'Ahzâb', nameTransliterated: 'Al-Ahzab', nameTranslated: 'Gruplar', ayahCount: 73 },
  { number: 34, name: 'Sebe\'', nameTransliterated: 'Saba', nameTranslated: 'Saba', ayahCount: 54 },
  { number: 35, name: 'Fâtır', nameTransliterated: 'Fatir', nameTranslated: 'Yaratan', ayahCount: 45 },
  { number: 36, name: 'Yâsîn', nameTransliterated: 'Ya-Sin', nameTranslated: 'Ya-Sin', ayahCount: 83 },
  { number: 37, name: 'Sâffât', nameTransliterated: 'As-Saffat', nameTranslated: 'Saf Tutanlar', ayahCount: 182 },
  { number: 38, name: 'Sâd', nameTransliterated: 'Sad', nameTranslated: 'Sad', ayahCount: 88 },
  { number: 39, name: 'Zümer', nameTransliterated: 'Az-Zumar', nameTranslated: 'Yığınlar', ayahCount: 75 },
  { number: 40, name: 'Mü\'min', nameTransliterated: 'Ghafir', nameTranslated: 'Bağışlayan', ayahCount: 85 },
  { number: 41, name: 'Fussilet', nameTransliterated: 'Fussilat', nameTranslated: 'Ayrıntılı', ayahCount: 54 },
  { number: 42, name: 'Şûrâ', nameTransliterated: 'Ash-Shuraa', nameTranslated: 'Danışma', ayahCount: 53 },
  { number: 43, name: 'Zuhruf', nameTransliterated: 'Az-Zukhruf', nameTranslated: 'Süsler', ayahCount: 89 },
  { number: 44, name: 'Duhân', nameTransliterated: 'Ad-Dukhan', nameTranslated: 'Duman', ayahCount: 59 },
  { number: 45, name: 'Câsiye', nameTransliterated: 'Al-Jathiyah', nameTranslated: 'Çöken', ayahCount: 37 },
  { number: 46, name: 'Ahkâf', nameTransliterated: 'Al-Ahqaf', nameTranslated: 'Kum Tepeleri', ayahCount: 35 },
  { number: 47, name: 'Muhammed', nameTransliterated: 'Muhammad', nameTranslated: 'Muhammed', ayahCount: 38 },
  { number: 48, name: 'Feth', nameTransliterated: 'Al-Fath', nameTranslated: 'Fetih', ayahCount: 29 },
  { number: 49, name: 'Hucurât', nameTransliterated: 'Al-Hujurat', nameTranslated: 'Odalar', ayahCount: 18 },
  { number: 50, name: 'Kâf', nameTransliterated: 'Qaf', nameTranslated: 'Kaf', ayahCount: 45 },
  { number: 51, name: 'Zâriyât', nameTransliterated: 'Adh-Dhariyat', nameTranslated: 'Savuranlar', ayahCount: 60 },
  { number: 52, name: 'Tûr', nameTransliterated: 'At-Tur', nameTranslated: 'Tur Dağı', ayahCount: 49 },
  { number: 53, name: 'Necm', nameTransliterated: 'An-Najm', nameTranslated: 'Yıldız', ayahCount: 62 },
  { number: 54, name: 'Kamer', nameTransliterated: 'Al-Qamar', nameTranslated: 'Ay', ayahCount: 55 },
  { number: 55, name: 'Rahmân', nameTransliterated: 'Ar-Rahman', nameTranslated: 'Rahman', ayahCount: 78 },
  { number: 56, name: 'Vâkıa', nameTransliterated: 'Al-Waqi\'ah', nameTranslated: 'Olay', ayahCount: 96 },
  { number: 57, name: 'Hadîd', nameTransliterated: 'Al-Hadid', nameTranslated: 'Demir', ayahCount: 29 },
  { number: 58, name: 'Mücâdele', nameTransliterated: 'Al-Mujadila', nameTranslated: 'Tartışan', ayahCount: 22 },
  { number: 59, name: 'Haşr', nameTransliterated: 'Al-Hashr', nameTranslated: 'Toplanma', ayahCount: 24 },
  { number: 60, name: 'Mümtehine', nameTransliterated: 'Al-Mumtahanah', nameTranslated: 'Sınanan', ayahCount: 13 },
  { number: 61, name: 'Saff', nameTransliterated: 'As-Saff', nameTranslated: 'Saf', ayahCount: 14 },
  { number: 62, name: 'Cum\'a', nameTransliterated: 'Al-Jumu\'ah', nameTranslated: 'Cuma', ayahCount: 11 },
  { number: 63, name: 'Münâfıkûn', nameTransliterated: 'Al-Munafiqun', nameTranslated: 'İkiyüzlüler', ayahCount: 11 },
  { number: 64, name: 'Teğâbün', nameTransliterated: 'At-Taghabun', nameTranslated: 'Aldatış', ayahCount: 18 },
  { number: 65, name: 'Talâk', nameTransliterated: 'At-Talaq', nameTranslated: 'Boşanma', ayahCount: 12 },
  { number: 66, name: 'Tahrîm', nameTransliterated: 'At-Tahrim', nameTranslated: 'Yasaklama', ayahCount: 12 },
  { number: 67, name: 'Mülk', nameTransliterated: 'Al-Mulk', nameTranslated: 'Egemenlik', ayahCount: 30 },
  { number: 68, name: 'Kalem', nameTransliterated: 'Al-Qalam', nameTranslated: 'Kalem', ayahCount: 52 },
  { number: 69, name: 'Hâkka', nameTransliterated: 'Al-Haqqah', nameTranslated: 'Gerçek', ayahCount: 52 },
  { number: 70, name: 'Me\'âric', nameTransliterated: 'Al-Ma\'arij', nameTranslated: 'Yükseliş Yolları', ayahCount: 44 },
  { number: 71, name: 'Nûh', nameTransliterated: 'Nuh', nameTranslated: 'Nuh', ayahCount: 28 },
  { number: 72, name: 'Cin', nameTransliterated: 'Al-Jinn', nameTranslated: 'Cin', ayahCount: 28 },
  { number: 73, name: 'Müzzemmil', nameTransliterated: 'Al-Muzzammil', nameTranslated: 'Örtünen', ayahCount: 20 },
  { number: 74, name: 'Müddessir', nameTransliterated: 'Al-Muddaththir', nameTranslated: 'Örtünen', ayahCount: 56 },
  { number: 75, name: 'Kıyâmet', nameTransliterated: 'Al-Qiyamah', nameTranslated: 'Kıyamet', ayahCount: 40 },
  { number: 76, name: 'İnsân', nameTransliterated: 'Al-Insan', nameTranslated: 'İnsan', ayahCount: 31 },
  { number: 77, name: 'Mürselât', nameTransliterated: 'Al-Mursalat', nameTranslated: 'Gönderilenler', ayahCount: 50 },
  { number: 78, name: 'Nebe\'', nameTransliterated: 'An-Naba', nameTranslated: 'Haber', ayahCount: 40 },
  { number: 79, name: 'Nâzi\'ât', nameTransliterated: 'An-Nazi\'at', nameTranslated: 'Çekip Koparanlar', ayahCount: 46 },
  { number: 80, name: 'Abese', nameTransliterated: '\'Abasa', nameTranslated: 'Yüzünü Çevirdi', ayahCount: 42 },
  { number: 81, name: 'Tekvîr', nameTransliterated: 'At-Takwir', nameTranslated: 'Bürüme', ayahCount: 29 },
  { number: 82, name: 'İnfitâr', nameTransliterated: 'Al-Infitar', nameTranslated: 'Yarılma', ayahCount: 19 },
  { number: 83, name: 'Mutaffifîn', nameTransliterated: 'Al-Mutaffifin', nameTranslated: 'Aldatanlar', ayahCount: 36 },
  { number: 84, name: 'İnşikâk', nameTransliterated: 'Al-Inshiqaq', nameTranslated: 'Yarılma', ayahCount: 25 },
  { number: 85, name: 'Bürûc', nameTransliterated: 'Al-Buruj', nameTranslated: 'Burçlar', ayahCount: 22 },
  { number: 86, name: 'Târık', nameTransliterated: 'At-Tariq', nameTranslated: 'Gece Gelen', ayahCount: 17 },
  { number: 87, name: 'A\'lâ', nameTransliterated: 'Al-A\'la', nameTranslated: 'En Yüce', ayahCount: 19 },
  { number: 88, name: 'Gâşiye', nameTransliterated: 'Al-Ghashiyah', nameTranslated: 'Kaplayan', ayahCount: 26 },
  { number: 89, name: 'Fecr', nameTransliterated: 'Al-Fajr', nameTranslated: 'Şafak', ayahCount: 30 },
  { number: 90, name: 'Beled', nameTransliterated: 'Al-Balad', nameTranslated: 'Şehir', ayahCount: 20 },
  { number: 91, name: 'Şems', nameTransliterated: 'Ash-Shams', nameTranslated: 'Güneş', ayahCount: 15 },
  { number: 92, name: 'Leyl', nameTransliterated: 'Al-Layl', nameTranslated: 'Gece', ayahCount: 21 },
  { number: 93, name: 'Duhâ', nameTransliterated: 'Ad-Duhaa', nameTranslated: 'Kuşluk', ayahCount: 11 },
  { number: 94, name: 'İnşirâh', nameTransliterated: 'Ash-Sharh', nameTranslated: 'Açma', ayahCount: 8 },
  { number: 95, name: 'Tîn', nameTransliterated: 'At-Tin', nameTranslated: 'İncir', ayahCount: 8 },
  { number: 96, name: 'Alak', nameTransliterated: 'Al-\'Alaq', nameTranslated: 'Pıhtı', ayahCount: 19 },
  { number: 97, name: 'Kadir', nameTransliterated: 'Al-Qadr', nameTranslated: 'Kadir', ayahCount: 5 },
  { number: 98, name: 'Beyyine', nameTransliterated: 'Al-Bayyinah', nameTranslated: 'Kanıt', ayahCount: 8 },
  { number: 99, name: 'Zilzâl', nameTransliterated: 'Az-Zalzalah', nameTranslated: 'Deprem', ayahCount: 8 },
  { number: 100, name: 'Âdiyât', nameTransliterated: 'Al-\'Adiyat', nameTranslated: 'Koşanlar', ayahCount: 11 },
  { number: 101, name: 'Kâria', nameTransliterated: 'Al-Qari\'ah', nameTranslated: 'Vuran', ayahCount: 10 },
  { number: 102, name: 'Tekâsür', nameTransliterated: 'At-Takathur', nameTranslated: 'Çokluk', ayahCount: 8 },
  { number: 103, name: 'Asr', nameTransliterated: 'Al-\'Asr', nameTranslated: 'Zaman', ayahCount: 3 },
  { number: 104, name: 'Hümeze', nameTransliterated: 'Al-Humazah', nameTranslated: 'Gıybetçi', ayahCount: 7 },
  { number: 105, name: 'Fîl', nameTransliterated: 'Al-Fil', nameTranslated: 'Fil', ayahCount: 7 },
  { number: 106, name: 'Kureyş', nameTransliterated: 'Quraysh', nameTranslated: 'Kureyş', ayahCount: 4 },
  { number: 107, name: 'Mâûn', nameTransliterated: 'Al-Ma\'un', nameTranslated: 'Yardım', ayahCount: 7 },
  { number: 108, name: 'Kevser', nameTransliterated: 'Al-Kawthar', nameTranslated: 'Kevser', ayahCount: 3 },
  { number: 109, name: 'Kâfirûn', nameTransliterated: 'Al-Kafirun', nameTranslated: 'Kafirler', ayahCount: 6 },
  { number: 110, name: 'Nasr', nameTransliterated: 'An-Nasr', nameTranslated: 'Yardım', ayahCount: 3 },
  { number: 111, name: 'Tebbet', nameTransliterated: 'Al-Masad', nameTranslated: 'Alev', ayahCount: 5 },
  { number: 112, name: 'İhlâs', nameTransliterated: 'Al-Ikhlas', nameTranslated: 'Samimiyet', ayahCount: 4 },
  { number: 113, name: 'Felak', nameTransliterated: 'Al-Falaq', nameTranslated: 'Tan', ayahCount: 5 },
  { number: 114, name: 'Nâs', nameTransliterated: 'An-Nas', nameTranslated: 'İnsanlar', ayahCount: 6 },
];

// Cüz bilgileri
const JUZ_INFO = Array.from({ length: 30 }, (_, i) => ({
  number: i + 1,
  name: `${i + 1}. Cüz`,
}));

// Sayfa bilgileri
const PAGE_INFO = Array.from({ length: 604 }, (_, i) => ({
  number: i + 1,
  name: `${i + 1}. Sayfa`,
}));

export const useSurahs = () => ({ surahs: SURAH_INFO, loading: false, totalSurahs: 114 });
export const useJuzs = () => ({ juzs: JUZ_INFO, loading: false, totalJuzs: 30 });
export const usePages = () => ({ pages: PAGE_INFO, loading: false, totalPages: 604 });

/**
 * Sayfa bazlı ayet çekme hook'u
 */
export const usePageVerses = (pageNumber) => {
  // Veriyi direkt useMemo ile hazırla - Loading state'e gerek yok çünkü veri local JSON
  const verses = useMemo(() => {
    if (!pageNumber) return [];
    const data = PAGE_DATA[pageNumber];
    return data || [];
  }, [pageNumber]);

  return { verses, loading: false, error: null };
};


