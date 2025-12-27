# Hutbe Modülü

Bu modül, hutbe listesi ve detay ekranlarını içerir.

## Bileşenler

- **HutbeContainer**: Ana hutbe listesi container'ı
- **HutbeDetailContainer**: Hutbe detay container'ı
- **HutbeHeader**: Hutbe listesi header component'i
- **HutbeDetailHeader**: Hutbe detay header component'i
- **HutbeList**: Hutbe listesi component'i
- **HutbeListItem**: Tek bir hutbe list item component'i
- **HutbeDetailTitle**: Hutbe detay başlık component'i
- **HutbePDFViewer**: PDF görüntüleyici component'i (WebView kullanır)
- **HutbeLoading**: Yükleme durumu component'i
- **HutbeError**: Hata durumu component'i

## API Entegrasyonu

### Mevcut Durum

`hooks/useHutbes.js` dosyası Diyanet İşleri Başkanlığı'nın resmi web sitesinden ([https://dinhizmetleri.diyanet.gov.tr/kategoriler/yayinlarimiz/hutbeler/türkçe](https://dinhizmetleri.diyanet.gov.tr/kategoriler/yayinlarimiz/hutbeler/türkçe)) hutbe verilerini çeker.

Web scraping kullanılarak HTML'den hutbe bilgileri (tarih, başlık, PDF URL) parse edilir. PDF URL'leri doğrudan Diyanet'in sunucusundan alınır ve Google Docs Viewer üzerinden gösterilir.

### Önemli Notlar

- CORS proxy kullanılıyor (allorigins.win)
- Production'da kendi backend servisinizi kullanmanız önerilir (CORS sorunlarını önlemek için)
- HTML parsing hassas bir işlemdir, web sitesi yapısı değişirse parse mantığı güncellenmelidir

### Beklenen API Formatı

#### Hutbe Listesi Response:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Hutbe Başlığı",
      "date": "28 Kasım 2025",
      "pdfUrl": "https://example.com/hutbe.pdf"
    }
  ]
}
```

veya

```json
[
  {
    "id": 1,
    "title": "Hutbe Başlığı",
    "date": "28 Kasım 2025",
    "pdfUrl": "https://example.com/hutbe.pdf"
  }
]
```

#### Hutbe Detay Response:
```json
{
  "data": {
    "id": 1,
    "title": "Hutbe Başlığı",
    "date": "28 Kasım 2025",
    "pdfUrl": "https://example.com/hutbe.pdf"
  }
}
```

## Kullanım

### Hutbe Listesi Ekranı
```jsx
import HutbeContainer from '../components/hutbe/HutbeContainer';

export default function HutbeScreen() {
  return <HutbeContainer />;
}
```

### Hutbe Detay Ekranı
```jsx
import HutbeDetailContainer from '../components/hutbe/HutbeDetailContainer';

export default function HutbeDetailScreen() {
  return <HutbeDetailContainer />;
}
```

## PDF Görüntüleme

PDF görüntüleme için `react-native-webview` paketi kullanılmaktadır. PDF URL'leri Google Docs Viewer üzerinden gösterilir (CORS sorunlarını önlemek için).

## Mock Data

Şu anda mock data kullanılıyor. Mock data, son 20 Cuma günü için örnek hutbe başlıkları içerir. Gerçek API eklendiğinde mock data otomatik olarak devre dışı kalacaktır.

## Notlar

- Tüm hardcoded değerler kaldırılmıştır
- API entegrasyonu için `useHutbes` hook'u kullanılır
- Responsive tasarım tüm cihazlarda çalışır
- Production-ready, optimize edilmiş kod yapısı
- Mock data fallback mekanizması ile çalışır

## Öneriler

1. **Backend Servisi**: Kendi backend servisinizi oluşturarak Diyanet İşleri Başkanlığı'nın web sitesinden hutbe verilerini çekebilirsiniz.
2. **API Endpoint**: Backend servisiniz hazır olduğunda `HUTBE_API_BASE` değişkenini güncelleyin.
3. **PDF URL'leri**: PDF URL'lerinin gerçek ve erişilebilir olduğundan emin olun.
