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
    const currentFriday = getLastFriday();

    // Strategy 1: JSON/JS Object Regex (Primary)
    // Looks for patterns like "PDF": "url"
    const jsonRegex = /"PDF"\s*:\s*"([^"]+)"/gi;
    const jsonMatches = Array.from(html.matchAll(jsonRegex));

    // Strategy 2: HTML Anchor Tags (Fallback)
    // Looks for href="...pdf" inside <a> tags
    // Match href inside anchor, capturing the URL and potential text content
    const anchorRegex = /<a[^>]+href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>|href=["']([^"']+\.pdf)["']/gi;
    const anchorMatches = Array.from(html.matchAll(anchorRegex));

    console.log(`Parsing Strategy: JSON matches: ${jsonMatches.length}, Anchor matches: ${anchorMatches.length}`);

    // Combine matches, prioritizing JSON if available but falling back to anchors
    // We will process JSON matches first, then anchors, and deduplicate by URL

    // Helper to process a raw URL
    const processUrl = (rawUrl) => {
      if (!rawUrl) return null;
      // Unicode/Clean
      let cleaned = rawUrl.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
      cleaned = cleaned.replace(/\\/g, '').trim();

      // Fix relative URLs
      if (cleaned.startsWith('http')) return cleaned;
      if (cleaned.startsWith('/')) return BASE_URL + cleaned;
      return BASE_URL + '/' + cleaned;
    };

    const processTitle = (url, rawTitle) => {
      // Decode title if present, otherwise fallback to filename
      let title = rawTitle ? rawTitle.replace(/<[^>]*>/g, '').trim() : '';
      if (!title || title === 'PDF' || title === 'İndir') {
        title = url.split('/').pop()?.replace('.pdf', '') || 'Hutbe';
      }
      try { return decodeURIComponent(title); } catch { return title; }
    };

    const validUrls = new Set();
    const rawItems = [];

    // 1. Process JSON Matches
    jsonMatches.forEach(m => {
      const url = processUrl(m[1]);
      if (url) rawItems.push({ url, title: null, source: 'json' });
    });

    // 2. Process Anchor Matches
    // anchorRegex groups: 1=url (with <a>), 2=text (with <a>), 3=url (standalone href)
    anchorMatches.forEach(m => {
      const url = processUrl(m[1] || m[3]);
      const text = m[2];
      if (url) rawItems.push({ url, title: text, source: 'html' });
    });

    // 3. Convert to Hutbe Objects
    // We assume the list is ordered by date (newest first)
    rawItems.forEach((item) => {
      // Deduplicate
      if (validUrls.has(item.url)) return;
      validUrls.add(item.url);

      const title = processTitle(item.url, item.title);

      // Date Calculation based on index of *unique* items found so far
      const index = hutbes.length;
      const hutbeDate = new Date(currentFriday);
      hutbeDate.setDate(currentFriday.getDate() - (index * 7));
      const dateStr = formatDate(hutbeDate);

      hutbes.push({
        id: index + 2000,
        title: title,
        date: dateStr,
        pdfUrl: item.url
      });
    });

    console.log(`Parsed ${hutbes.length} unique hutbes.`);
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
