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
        // Diyanet relative path fix
        cleaned = cleaned.startsWith('/') ? BASE_URL + cleaned : BASE_URL + '/' + cleaned;
      }

      // NO PREMATURE ENCODING! Return raw URL string.
      // Encoding will be handled by the viewer component.
      return cleaned;
    };

    const processTitle = (url, rawTitle) => {
      let title = rawTitle ? rawTitle.replace(/<[^>]*>/g, '').trim() : '';

      // Clean up common prefixes/suffixes
      title = title.replace(/^Hutbe:\s*/i, '').replace(/\.pdf$/i, '');

      // If title is garbage or empty, try to derive from URL
      if (!title || title.length < 5 || /^(PDF|İndir|Hutbe|Tıklayınız|Dosya)$/i.test(title)) {
        // Try to decode URL part
        try {
          const filename = url.split('/').pop();
          // Remove extension and common prefixes
          let decoded = decodeURIComponent(filename).replace('.pdf', '');
          // Remove date prefixes like "2024_01_01_" or "2024-01-01-"
          decoded = decoded.replace(/^\d{4}[-_]\d{2}[-_]\d{2}[-_]/, '');
          // Remove year prefix "2024_"
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

    // Strategy 1: JSON/Script extraction (Common in SharePoint/ASP.NET sites)
    const jsonRegex = /"PDF"\s*:\s*"([^"]+)"/gi;
    let match;
    while ((match = jsonRegex.exec(html)) !== null) {
      const url = processUrl(match[1]);
      if (url) rawItems.push({ url, title: null });
    }

    // Strategy 2: Improved HTML Tag extraction
    // Matches href="..." containing .pdf OR "Hutbe" link text
    // Capture Group 1: URL, Capture Group 2: Link Text
    const anchorRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;
    while ((match = anchorRegex.exec(html)) !== null) {
      const url = processUrl(match[1]);
      const text = match[2];

      if (url && (url.toLowerCase().endsWith('.pdf') || /hutbe/i.test(url) || /hutbe/i.test(text))) {
        // Filter out navigation links if possible
        if (!url.includes('javascript:')) {
          rawItems.push({ url, title: text });
        }
      }
    }

    // Process and deduplicate
    rawItems.forEach((item) => {
      if (validUrls.has(item.url)) return;

      // Additional check: valid PDF extension or reliable source
      if (!item.url.toLowerCase().endsWith('.pdf')) return;

      validUrls.add(item.url);

      const title = processTitle(item.url, item.title);
      const index = hutbes.length;

      // Calculate date based on index (assuming blocking reverse chronological order)
      const hutbeDate = new Date(currentFriday);
      hutbeDate.setDate(currentFriday.getDate() - (index * 7));

      hutbes.push({
        id: 2000 + index,
        title: title,
        date: formatDate(hutbeDate),
        pdfUrl: item.url // Raw URL
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
