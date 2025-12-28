import { useState, useEffect, useCallback } from 'react';

const HUTBE_PAGE_URL = 'https://dinhizmetleri.diyanet.gov.tr/kategoriler/yayinlarimiz/hutbeler/türkçe';
const BASE_URL = 'https://dinhizmetleri.diyanet.gov.tr';

// Tarih formatla: DD.MM.YYYY
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  // return `${day}.${month}.${year}`;
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
};

// En son Cuma gününü bul
const getLastFriday = () => {
  const d = new Date();
  const day = d.getDay();
  const diff = (day <= 5) ? (7 - 5 + day) : (day - 5);
  // Eğer bugün Cuma ise (day === 5) ve saat 00:00'dan büyükse bugün sayılır
  // Ancak diff hesabı: Cuma(5) -> 5-5=0. Bugün.
  // Cmt(6) -> 6-5=1. Dün.
  // Paz(0) -> 7-5+0=2. Önceki gün.
  // Pzt(1) -> 7-5+1=3.

  // Doğru mantık:
  // Pazar=0, Pzt=1... Cuma=5, Cmt=6

  // Eğer bugün Cuma(5) ise, diff 0 olmalı.
  // Eğer bugün Cmt(6) ise, diff 1 olmalı.
  // Eğer bugün Paz(0) ise, diff 2 olmalı.
  // ...
  // Eğer bugün Per(4) ise, diff -1 mi? Hayır, geçen haftanın Cuması olmalı. 
  // Yani Cuma gününe olan uzaklık (geriye doğru).

  // Basitçe: 
  // day < 5 (Paz-Per) -> day + 2 gün geri git. (Paz(0)+2 = 2 gün geri = Cuma)
  // day >= 5 (Cuma-Cmt) -> day - 5 gün geri git.

  const daysToGoBack = (day + 2) % 7;
  // Pazar(0) -> 2 gün geri (Cuma)
  // Pzt(1) -> 3 gün geri
  // Sal(2) -> 4 gün geri
  // Çar(3) -> 5 gün geri
  // Per(4) -> 6 gün geri
  // Cuma(5) -> 0 gün geri (Bugün) -- Ama hutbe saati henüz gelmediyse? Genelde hutbe öğlen okunur.
  // Varsayalım Cuma günü hutbe yayınlandı.
  // Cmt(6) -> 1 gün geri

  d.setDate(d.getDate() - daysToGoBack);
  return d;
};

const parseHutbes = (html) => {
  try {
    const hutbes = [];

    // YENİ STRATEJİ: JSON/JS Objesi İçinden Veri Çekme
    const jsonRegex = /"PDF"\s*:\s*"([^"]+)"/gi;
    const jsonMatches = Array.from(html.matchAll(jsonRegex));

    console.log(`JSON Regex found ${jsonMatches.length} matches`);

    if (jsonMatches.length > 0) {
      // En son Cuma'yı bul
      let currentFriday = getLastFriday();

      jsonMatches.forEach((m, index) => {
        let rawUrl = m[1];
        if (!rawUrl) return;

        // Unicode ve escape temizliği
        rawUrl = rawUrl.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
        rawUrl = rawUrl.replace(/\\/g, '');

        let pdfUrl = rawUrl.trim();

        // Link tamamlama
        if (pdfUrl.startsWith('http')) {
          // ok
        } else if (pdfUrl.startsWith('/')) {
          pdfUrl = BASE_URL + pdfUrl;
        } else {
          pdfUrl = BASE_URL + '/' + pdfUrl;
        }

        // Dosya isminden başlık
        let title = pdfUrl.split('/').pop()?.replace('.pdf', '') || 'Hutbe';
        try { title = decodeURIComponent(title); } catch (e) { }

        // Tarih Hesaplama: Her hutbe için 1 hafta geri git
        // Listenin sıralı olduğunu varsayıyoruz (En yeni en üstte)
        // Index 0: Bu haftanın Cuma'sı
        // Index 1: Geçen haftanın Cuma'sı
        const hutbeDate = new Date(currentFriday);
        hutbeDate.setDate(currentFriday.getDate() - (index * 7));

        const dateStr = formatDate(hutbeDate);

        // Duplicate kontrolü
        if (pdfUrl.includes('.pdf') && !hutbes.some(h => h.pdfUrl === pdfUrl)) {
          hutbes.push({
            id: index + 2000,
            title: title.trim(),
            date: dateStr,
            pdfUrl
          });
        }
      });
    }

    // Fallback kısmı şimdilik pasif çünkü JSON çalışıyor.

    console.log(`Parsed ${hutbes.length} hutbes total`);
    return hutbes;
  } catch (error) {
    console.error('ParseHutbes general error:', error);
    return [];
  }
};

export const useHutbes = () => {
  const [hutbes, setHutbes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHutbes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // URL Encoding
      const url = encodeURI(`${HUTBE_PAGE_URL}?ts=${Date.now()}`);

      console.log('Fetching hutbes from:', url);

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        }
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const html = await response.text();
      console.log(`Fetched HTML length: ${html.length}`);

      const parsedData = parseHutbes(html);

      if (parsedData.length === 0) {
        console.warn('No hutbes found via parsing. HTML structure changed?');
        setHutbes([]);
        setError('Hutbe listesi güncel kaynak yapısından okunamadı.');
      } else {
        setHutbes(parsedData);
      }

    } catch (err) {
      console.error('FetchHutbes Error:', err);
      setError(err.message || 'Veri çekilemedi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHutbes();
  }, [fetchHutbes]);

  return { hutbes, loading, error, refresh: fetchHutbes };
};

export const useHutbeDetail = (hutbeId) => {
  const [hutbe, setHutbe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setHutbe(null);
    setLoading(false);
  }, [hutbeId]);

  return { hutbe, loading, error };
};
