import { useState, useEffect, useCallback } from 'react';

const HUTBE_PAGE_URL = 'https://dinhizmetleri.diyanet.gov.tr/kategoriler/yayinlarimiz/hutbeler/türkçe';
const BASE_URL = 'https://dinhizmetleri.diyanet.gov.tr';

/**
 * Tarih formatını dönüştür (DD.MM.YYYY -> DD MMMM YYYY)
 */
const formatDate = (dateStr) => {
  try {
    const [day, month, year] = dateStr.split('.');
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  } catch {
    return dateStr;
  }
};

/**
 * HTML'den hutbe verilerini parse et
 */
const parseHutbes = (html) => {
  try {
    const hutbes = [];
    
    // Önce tüm PDF linklerini bul - geniş arama
    let pdfLinks = Array.from(html.matchAll(/href=["']([^"']*\.pdf[^"']*)["']/gi));
    
    console.log('Bulunan PDF link sayısı:', pdfLinks.length);
    
    // İlk PDF linkinin etrafına bak
    if (pdfLinks.length > 0) {
      const firstLink = pdfLinks[0][0];
      const linkIndex = html.indexOf(firstLink);
      const sample = html.substring(Math.max(0, linkIndex - 300), linkIndex + 500);
      console.log('İlk PDF link örneği:', sample);
    }
    
    if (pdfLinks.length === 0) {
      return [];
    }
    
    let id = 1;
    
    // Her PDF linki için tarih ve başlık bul
    for (const linkMatch of pdfLinks) {
      try {
        let pdfUrl = linkMatch[1];
        if (!pdfUrl) continue;
        
        // PDF linkinin etrafındaki HTML'i al (önceki 500 karakter)
        const linkIndex = html.indexOf(linkMatch[0]);
        const contextStart = Math.max(0, linkIndex - 500);
        const context = html.substring(contextStart, linkIndex + linkMatch[0].length);
        
        // Tarih bul (DD.MM.YYYY formatında)
        const dateMatch = context.match(/(\d{1,2}\.\d{1,2}\.\d{4})/);
        if (!dateMatch) continue;
        
        const dateStr = dateMatch[1].trim();
        
        // Tarihten sonraki text'i al (başlık olabilir)
        const dateIndex = context.indexOf(dateStr);
        const afterDate = context.substring(dateIndex + dateStr.length);
        
        // İlk [ veya < karakterinden önceki text'i al
        const bracketIndex = afterDate.indexOf('[');
        const tagIndex = afterDate.indexOf('<');
        const cutIndex = bracketIndex > 0 ? bracketIndex : (tagIndex > 0 ? tagIndex : -1);
        
        let title = '';
        if (cutIndex > 0) {
          title = afterDate.substring(0, cutIndex);
        } else {
          // Başlık bulunamazsa PDF URL'inden çıkar
          const fileName = pdfUrl.split('/').pop() || '';
          try {
            title = decodeURIComponent(fileName).replace(/\.pdf$/i, '');
          } catch {
            title = fileName
              .replace(/\.pdf$/i, '')
              .replace(/%20/g, ' ')
              .replace(/%C4%9F/g, 'ğ')
              .replace(/%C4%9E/g, 'Ğ')
              .replace(/%C3%BC/g, 'ü')
              .replace(/%C3%9C/g, 'Ü')
              .replace(/%C5%9F/g, 'ş')
              .replace(/%C5%9E/g, 'Ş')
              .replace(/%C4%B1/g, 'ı')
              .replace(/%C4%B0/g, 'İ')
              .replace(/%C3%B6/g, 'ö')
              .replace(/%C3%96/g, 'Ö')
              .replace(/%C3%A7/g, 'ç')
              .replace(/%C3%87/g, 'Ç');
          }
        }
        
        // HTML temizle
        title = title
          .replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&apos;/g, "'")
          .replace(/\s+/g, ' ')
          .trim();
        
        if (!title || title.length < 2) continue;
        
        // URL'i tamamla
        pdfUrl = pdfUrl.replace(/["']/g, '');
        if (pdfUrl.startsWith('/')) {
          pdfUrl = BASE_URL + pdfUrl;
        } else if (!pdfUrl.startsWith('http')) {
          pdfUrl = BASE_URL + '/' + pdfUrl;
        }
        
        // Duplicate kontrolü
        const isDuplicate = hutbes.some(h => h.pdfUrl === pdfUrl);
        if (isDuplicate) continue;
        
        hutbes.push({
          id: id++,
          title,
          date: formatDate(dateStr),
          pdfUrl,
        });
      } catch (err) {
        continue;
      }
    }
    
    console.log('Parse edilen hutbe sayısı:', hutbes.length);
    
    // Tarihe göre sırala (en yeni önce)
    const monthMap = {
      'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04', 'Mayıs': '05', 'Haziran': '06',
      'Temmuz': '07', 'Ağustos': '08', 'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
    };
    
    hutbes.sort((a, b) => {
      try {
        const partsA = a.date.split(' ');
        const partsB = b.date.split(' ');
        if (partsA.length !== 3 || partsB.length !== 3) return 0;
        const dateA = partsA[2] + monthMap[partsA[1]] + partsA[0].padStart(2, '0');
        const dateB = partsB[2] + monthMap[partsB[1]] + partsB[0].padStart(2, '0');
        return dateB.localeCompare(dateA);
      } catch {
        return 0;
      }
    });
    
    return hutbes;
  } catch (error) {
    console.error('Parse error:', error);
    return [];
  }
};

/**
 * Hutbe listesi hook'u
 */
export const useHutbes = () => {
  const [hutbes, setHutbes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHutbes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${HUTBE_PAGE_URL}?_=${Date.now()}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();

        if (!html || html.length < 1000) {
          throw new Error('HTML içeriği alınamadı');
        }
        
        // HTML'de "Documents" kelimesini kontrol et
        console.log('HTML uzunluğu:', html.length);
        console.log('HTML içinde "Documents" var mı:', html.includes('/Documents/'));
        console.log('HTML içinde ".pdf" var mı:', html.includes('.pdf'));

        const hutbeList = parseHutbes(html);

        if (!hutbeList || hutbeList.length === 0) {
          throw new Error('Hutbe verileri bulunamadı');
        }

        setHutbes(hutbeList.slice(0, 30));
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          throw new Error('Bağlantı zaman aşımına uğradı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');
        }
        throw fetchError;
      }
    } catch (err) {
      console.error('Hutbe fetch error:', err);
      setError(err.message || 'Hutbeler yüklenemedi. Lütfen tekrar deneyin.');
      setHutbes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHutbes();
  }, [fetchHutbes]);

  return {
    hutbes,
    loading,
    error,
    refresh: fetchHutbes,
  };
};

/**
 * Tek bir hutbe detayını çeken hook
 */
export const useHutbeDetail = (hutbeId) => {
  const [hutbe, setHutbe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setHutbe(null);
    setLoading(false);
  }, [hutbeId]);

  return {
    hutbe,
    loading,
    error,
  };
};
