import { useState, useCallback, useEffect } from 'react';

// Percent-encoded URL for production compatibility (Turkish characters encoded)
export const HUTBE_PAGE_URL = 'https://dinhizmetleri.diyanet.gov.tr/kategoriler/yayinlarimiz/hutbeler/t%C3%BCrk%C3%A7e';
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

// Parsing Logic (Moved outside hook for efficiency)
const parseHutbes = (html) => {
  try {
    const hutbes = [];
    const currentFriday = getLastFriday();

    // DEBUG: Check document structure
    console.log(`[HutbeDebug] Processing HTML from WebView. Length: ${html.length}`);

    // Helper to process a raw URL
    const processUrl = (rawUrl) => {
      if (!rawUrl) return null;
      let cleaned = rawUrl.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
      cleaned = cleaned.replace(/\\/g, '').trim();

      if (!cleaned.startsWith('http')) {
        cleaned = cleaned.startsWith('/') ? BASE_URL + cleaned : BASE_URL + '/' + cleaned;
      }
      return cleaned;
    };

    const processTitle = (url, rawTitle) => {
      let title = rawTitle ? rawTitle.replace(/<[^>]*>/g, '').trim() : '';
      title = title.replace(/^Hutbe:\s*/i, '').replace(/\.pdf$/i, '');

      if (!title || title.length < 5 || /^(PDF|İndir|Hutbe|Tıklayınız|Dosya)$/i.test(title)) {
        try {
          const filename = url.split('/').pop();
          let decoded = decodeURIComponent(filename).replace('.pdf', '');
          decoded = decoded.replace(/^\d{4}[-_]\d{2}[-_]\d{2}[-_]/, '');
          decoded = decoded.replace(/^\d{4}[-_]/, '');
          if (decoded && decoded.length > 3) title = decoded.replace(/_/g, ' ');
          else title = "Cuma Hutbesi";
        } catch {
          title = "Cuma Hutbesi";
        }
      }
      return title;
    };

    const validUrls = new Set();
    const rawItems = [];

    // Strategy 1: JSON/Script extraction
    const jsonRegex = /"PDF"\s*:\s*"([^"]+)"/gi;
    let match;
    while ((match = jsonRegex.exec(html)) !== null) {
      if (rawItems.length >= 15) break;
      const url = processUrl(match[1]);
      if (url) rawItems.push({ url, title: null });
    }

    // Strategy 2: HTML Tag extraction
    const anchorRegex = /<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    while ((match = anchorRegex.exec(html)) !== null) {
      if (rawItems.length >= 15) break;
      const url = processUrl(match[1]);
      const text = match[2];
      if (url && (url.toLowerCase().endsWith('.pdf') || /hutbe/i.test(url))) {
        const cleanText = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (!url.includes('javascript:')) {
          rawItems.push({ url, title: cleanText });
        }
      }
    }

    // Strategy 3: Relaxed Direct PDF Extraction
    if (rawItems.length === 0) {
      console.log('[HutbeDebug] Strategies 1 & 2 failed. Trying Strategy 3 (Relaxed Regex)...');
      const simplePdfRegex = /href=["']([^"']+\.pdf)["']/gi;
      while ((match = simplePdfRegex.exec(html)) !== null) {
        if (rawItems.length >= 15) break;
        console.log(`[HutbeDebug] Strategy 3 match found: ${match[1]}`);
        const url = processUrl(match[1]);
        if (url && !validUrls.has(url)) {
          rawItems.push({ url, title: null });
        }
      }
    }

    // Process and deduplicate
    rawItems.forEach((item) => {
      if (validUrls.has(item.url)) return;
      if (!item.url.toLowerCase().endsWith('.pdf')) return;

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

    console.log(`[HutbeDebug] Total items found: ${hutbes.length}`);
    return hutbes.slice(0, 10);
  } catch (error) {
    console.error('[HutbeDebug] ParseHutbes error:', error);
    return [];
  }
};

// Fallback hutbe listesi
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
  const [refreshKey, setRefreshKey] = useState(0);

  const processHtml = useCallback((html) => {
    setLoading(true);
    try {
      const parsedData = parseHutbes(html);
      if (parsedData.length === 0) {
        // Eğer içerik WAF block sayfasıysa veya boşsa fallback
        if (html.includes('guvenlik') || html.length < 500) {
          console.log('[HutbeDebug] WAF block or empty content from WebView.');
        }
        console.log('[HutbeDebug] Parsing returned 0 items, using fallback.');
        setHutbes(getFallbackHutbes());
      } else {
        setHutbes(parsedData);
      }
      setError(null);
    } catch (err) {
      console.error('[HutbeDebug] Process HTML error:', err);
      setHutbes(getFallbackHutbes());
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleError = useCallback((errStr) => {
    console.error('[HutbeDebug] WebView Error:', errStr);
    // Wait a bit or fallback immediately?
    // Let's fallback
    setHutbes(getFallbackHutbes());
    setLoading(false);
  }, []);

  return { hutbes, loading, error, processHtml, refresh, refreshKey, handleError };
};

export const useHutbeDetail = (hutbeId) => {
  const [hutbe, setHutbe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => { setHutbe(null); setLoading(false); }, [hutbeId]);
  return { hutbe, loading, error };
};
