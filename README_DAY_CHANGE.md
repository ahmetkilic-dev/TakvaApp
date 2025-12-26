# Gün Değişimi Kontrolü (Day Change Check)

## 📋 Genel Bakış

Bu sistem, Firebase hesap bazlı gün kontrolü yapar. Kullanıcının son aktif olduğu günü takip eder ve gün değişikliğini sıfır hata payı ile kontrol eder.

## 🎯 Özellikler

- ✅ **Firebase Hesap Bazlı**: Her kullanıcı için ayrı takip
- ✅ **Sıfır Hata Payı**: Tarih karşılaştırması tam olarak yapılır
- ✅ **Otomatik Güncelleme**: Gün değiştiğinde otomatik Firebase'e yazılır
- ✅ **Çoklu Format Desteği**: Firestore Timestamp, Date, String formatlarını destekler
- ✅ **Hata Toleranslı**: Hata durumlarında bile çalışmaya devam eder

## 📁 Dosya Yapısı

```
hooks/
  └── useDayChange.js          # Ana hook (gün kontrolü mantığı)

contexts/
  └── DayChangeContext.js      # Context provider

app/
  └── _layout.jsx              # DayChangeProvider entegrasyonu
```

## 🚀 Kullanım

### 1. Context'ten Kullanım (Önerilen)

```jsx
import { useDayChangeContext } from '../contexts/DayChangeContext';

function MyComponent() {
  const { 
    isDayChanged,    // Gün değişmiş mi? (boolean)
    daysPassed,      // Kaç gün geçmiş? (number: 0, 1, 2, ...)
    isLoading,       // Yükleniyor mu? (boolean)
    error,           // Hata var mı? (Error | null)
    lastActiveDate,  // Son aktif tarih (Date | null)
    getToday,        // Bugünkü tarih fonksiyonu
    user,            // Firebase kullanıcı objesi
    updateLastActiveDate // Manuel güncelleme fonksiyonu
  } = useDayChangeContext();

  useEffect(() => {
    if (isDayChanged) {
      console.log(`${daysPassed} gün geçmiş!`);
      // Gün değişikliği ile ilgili işlemler yapılabilir
    }
  }, [isDayChanged, daysPassed]);

  return (
    <View>
      {isLoading ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <Text>
          {isDayChanged 
            ? `${daysPassed} gün geçmiş` 
            : 'Bugün'}
        </Text>
      )}
    </View>
  );
}
```

### 2. Hook'tan Direkt Kullanım

```jsx
import { useDayChange } from '../hooks/useDayChange';

function MyComponent() {
  const { isDayChanged, daysPassed, isLoading } = useDayChange();
  
  // ... kullanım aynı
}
```

## 🔧 Firebase Veritabanı Yapısı

Hook, Firebase'deki `users` koleksiyonunda şu field'ları kullanır:

```javascript
{
  uid: "user123",
  lastActiveDate: Timestamp,           // Son aktif tarih (Firestore Timestamp)
  lastActiveDateUpdated: Timestamp,    // Son güncelleme zamanı (serverTimestamp)
  // ... diğer kullanıcı bilgileri
}
```

## 📊 Dönen Değerler

### `isDayChanged` (boolean)
- `true`: Gün değişmiş (son aktif tarih bugünden farklı)
- `false`: Gün değişmemiş (bugün aktif olunmuş) veya henüz yükleniyor

### `daysPassed` (number)
- `0`: Bugün aktif olunmuş veya gün değişmemiş
- `1`: 1 gün önce aktif olunmuş
- `2`: 2 gün önce aktif olunmuş
- `...`: Daha fazla gün

### `lastActiveDate` (Date | null)
- Son aktif olunan tarih (Date objesi)
- `null`: Henüz yükleniyor veya kullanıcı giriş yapmamış

### `today` / `getToday()` (Date | Function)
- Bugünkü tarih (sadece gün/ay/yıl, saat: 00:00:00)

### `isLoading` (boolean)
- `true`: Firebase'den veri çekiliyor
- `false`: Veri hazır

### `error` (Error | null)
- Hata varsa Error objesi
- `null`: Hata yok

## 🎯 Kullanım Senaryoları

### Senaryo 1: Günlük Ödül Sistemi

```jsx
const { isDayChanged, daysPassed } = useDayChangeContext();

useEffect(() => {
  if (isDayChanged && daysPassed === 1) {
    // Kullanıcı dün aktif değildi, bugün giriş yaptı
    // Günlük ödül verilebilir
    giveDailyReward();
  }
}, [isDayChanged, daysPassed]);
```

### Senaryo 2: Streak Takibi

```jsx
const { isDayChanged, daysPassed } = useDayChangeContext();

useEffect(() => {
  if (isDayChanged) {
    if (daysPassed === 1) {
      // Streak devam ediyor
      incrementStreak();
    } else if (daysPassed > 1) {
      // Streak kırıldı
      resetStreak();
    }
  }
}, [isDayChanged, daysPassed]);
```

### Senaryo 3: Bildirim Gönderme

```jsx
const { isDayChanged, daysPassed } = useDayChangeContext();

useEffect(() => {
  if (isDayChanged && daysPassed >= 3) {
    // 3+ gün aktif olunmamış
    sendReminderNotification();
  }
}, [isDayChanged, daysPassed]);
```

## ⚠️ Önemli Notlar

1. **Otomatik Güncelleme**: Hook, gün değiştiğinde otomatik olarak Firebase'e yeni tarihi yazar. Manuel güncelleme yapmanıza gerek yok.

2. **İlk Kullanım**: Kullanıcı ilk kez giriş yaptığında, `lastActiveDate` field'ı yoksa otomatik olarak bugünün tarihi kaydedilir.

3. **Hata Durumu**: Hata durumunda bile sistem çalışmaya devam eder. Hata varsa `error` değişkeninde tutulur.

4. **Performans**: Hook, gereksiz Firebase çağrılarını önlemek için memoization kullanır.

5. **Timezone**: Tüm tarih karşılaştırmaları yerel timezone'a göre yapılır (UTC değil).

## 🔍 Debug

Console'da şu log'ları görebilirsiniz:

- `✅ Son aktif tarih güncellendi: YYYY-MM-DD`
- `📅 Gün değişti! X gün geçmiş. Son aktif tarih güncelleniyor...`
- `🔴 Gün kontrolü hatası: ...` (hata durumunda)

## 🧪 Test Senaryoları

1. **İlk Giriş**: Kullanıcı ilk kez giriş yaptığında `lastActiveDate` bugün olarak kaydedilmelidir.

2. **Aynı Gün Tekrar Giriş**: `isDayChanged = false`, `daysPassed = 0`

3. **Ertesi Gün Giriş**: `isDayChanged = true`, `daysPassed = 1`

4. **3 Gün Sonra Giriş**: `isDayChanged = true`, `daysPassed = 3`

5. **Hata Durumu**: Firebase bağlantısı kesilse bile hook çalışmaya devam etmelidir.

