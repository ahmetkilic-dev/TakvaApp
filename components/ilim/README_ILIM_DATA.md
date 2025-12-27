# İlim Data Formatı

`constants/ilimData.js` dosyası aşağıdaki formatta export edilmelidir:

```javascript
export default {
  fikih: {
    questions: [
      {
        id: 'f_e_1',
        difficulty: 'easy',
        points: 10,
        question: "Soru metni...",
        options: ["Seçenek 1", "Seçenek 2", "Seçenek 3", "Seçenek 4"],
        correctAnswer: "Seçenek 1", // veya "1", "2" gibi string değer
        explanation: "Açıklama metni..."
      },
      // ... daha fazla soru
    ]
  },
  kuran: {
    questions: [/* ... */]
  },
  hadis: {
    questions: [/* ... */]
  },
  ahlak: {
    questions: [/* ... */]
  },
  siyer: {
    questions: [/* ... */]
  },
  gunler: {
    questions: [/* ... */]
  },
  kavramlar: {
    questions: [/* ... */]
  },
  esma: {
    questions: [/* ... */]
  },
};
```

## Kategori İsimleri

Kategori key'leri ve görünen isimleri:
- `fikih` → "Fıkıh Bilgisi"
- `kuran` → "Kuran"
- `hadis` → "Hadis"
- `ahlak` → "Ahlak & Adap"
- `siyer` → "Siyer"
- `gunler` → "Dini Günler"
- `kavramlar` → "Dini Kavramlar"
- `esma` → "Esmaü'l-Hüsna"

## Notlar

- `correctAnswer` değeri `options` array'indeki bir değerle eşleşmelidir
- Her soru `points` değerine sahip olmalıdır (default: 10)
- `options` array'i en az 2, genellikle 4 eleman içermelidir

