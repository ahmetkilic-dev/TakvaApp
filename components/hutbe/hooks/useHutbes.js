import { useState, useEffect, useCallback } from 'react';

// Percent-encoded URL for production compatibility (Turkish characters encoded)
const HUTBE_PAGE_URL = 'https://dinhizmetleri.diyanet.gov.tr/kategoriler/yayinlarimiz/hutbeler/t%C3%BCrk%C3%A7e';
const BASE_URL = 'https://dinhizmetleri.diyanet.gov.tr';

// Tarih formatla: DD Ay YYYY
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.getMonth();
  const year = d.getFullYear();
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  return `${parseInt(day, 10)} ${months[month]} ${year}`;
};

// En son Cuma gününü bul
const getLastFriday = () => {
  const d = new Date();
  const day = d.getDay();
  // Pazar(0) -> 2 gün geri, Pzt(1) -> 3, ..., Cuma(5) -> 0, Cmt(6) -> 1
  const daysToGoBack = (day + 2) % 7;
  d.setDate(d.getDate() - daysToGoBack);
  return d;
};

const parseHutbes = (html) => {
  try {
    const hutbes = [];
    const currentFriday = getLastFriday();

    // Helper to process a raw URL
    const processUrl = (rawUrl) => {
      if (!rawUrl) return null;
      // Handle unicode escaped slashes and remove backslashes
      let cleaned = rawUrl.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
      cleaned = cleaned.replace(/\\/g, '').trim();

      // Ensure domain
      if (!cleaned.startsWith('http')) {
        cleaned = cleaned.startsWith('/') ? BASE_URL + cleaned : BASE_URL + '/' + cleaned;
      }

      // Final encode for Turkish characters in filenames
      try {
        const urlObj = new URL(cleaned);
        urlObj.pathname = encodeURI(decodeURI(urlObj.pathname));
        return urlObj.toString();
      } catch (e) {
        return cleaned;
      }
    };

    const processTitle = (url, rawTitle) => {
      let title = rawTitle ? rawTitle.replace(/<[^>]*>/g, '').trim() : '';
      if (!title || title.length < 3 || /^(PDF|İndir|Hutbe)$/i.test(title)) {
        title = url.split('/').pop()?.replace('.pdf', '') || 'Hutbe';
        try { title = decodeURIComponent(title); } catch { }
      }
      return title;
    };

    const validUrls = new Set();
    const rawItems = [];

    // Strategy 1: JSON/Script extraction
    const jsonRegex = /"PDF"\s*:\s*"([^"]+)"/gi;
    let match;
    while ((match = jsonRegex.exec(html)) !== null) {
      const url = processUrl(match[1]);
      if (url) rawItems.push({ url, title: null });
    }

    // Strategy 2: HTML Anchor extraction
    const anchorRegex = /<a[^>]+href=["']([^"']+\.pdf)["'][^>]*>(.*?)<\/a>/gi;
    while ((match = anchorRegex.exec(html)) !== null) {
      const url = processUrl(match[1]);
      if (url) rawItems.push({ url, title: match[2] });
    }

    // Strategy 3: Fallback - any string that looks like a PDF link
    if (rawItems.length === 0) {
      const fallbackRegex = /[^"'\s>]+\.pdf/gi;
      const fallbackMatches = html.match(fallbackRegex) || [];
      fallbackMatches.forEach(rawUrl => {
        const url = processUrl(rawUrl);
        if (url) rawItems.push({ url, title: null });
      });
    }

    // Process and deduplicate
    rawItems.forEach((item) => {
      if (validUrls.has(item.url)) return;
      validUrls.add(item.url);

      const title = processTitle(item.url, item.title);
      const index = hutbes.length;
      const hutbeDate = new Date(currentFriday);
      hutbeDate.setDate(currentFriday.getDate() - (index * 7));

      hutbes.push({
        id: 2000 + index,
        title: title,
        date: formatDate(hutbeDate),
        pdfUrl: item.url
      });
    });

    return hutbes;
  } catch (error) {
    console.error('ParseHutbes error:', error);
    return [];
  }
};

// Fallback hutbe listesi (API başarısız olursa)
const getFallbackHutbes = () => {
  const currentFriday = getLastFriday();
  return Array.from({ length: 10 }, (_, i) => {
    const hutbeDate = new Date(currentFriday);
    hutbeDate.setDate(currentFriday.getDate() - (i * 7));
    const year = hutbeDate.getFullYear();
    const month = String(hutbeDate.getMonth() + 1).padStart(2, '0');
    const day = String(hutbeDate.getDate()).padStart(2, '0');
    return {
      id: 2000 + i,
      title: `${formatDate(hutbeDate)} Cuma Hutbesi`,
      date: formatDate(hutbeDate),
      pdfUrl: `https://dinhizmetleri.diyanet.gov.tr/Documents/Hutbe/${year}/Turkce/${year}_${month}_${day}.pdf`
    };
  });
};

export const useHutbes = () => {
  const [hutbes, setHutbes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHutbes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Production-ready fetch with proper headers and timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch(HUTBE_PAGE_URL, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const html = await response.text();
      const parsedData = parseHutbes(html);

      if (parsedData.length === 0) {
        // API parse başarısız, fallback kullan
        console.log('Hutbe parse başarısız, fallback kullanılıyor');
        setHutbes(getFallbackHutbes());
      } else {
        setHutbes(parsedData);
      }
    } catch (err) {
      console.error('Hutbe Fetch Error:', err.message || err);
      // APK'da hata olursa fallback kullan
      setHutbes(getFallbackHutbes());
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
