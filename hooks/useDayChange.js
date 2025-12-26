import { useState, useEffect, useCallback, useMemo } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Gün değişimi kontrolü hook'u
 * Firebase hesap bazlı gün kontrolü yapar
 * Sıfır hata payı ile çalışır
 * 
 * @returns {Object} { isDayChanged, daysPassed, isLoading, updateLastActiveDate }
 */
export const useDayChange = () => {
  const [user, setUser] = useState(null);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Firebase auth state dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Bugünkü tarihi hesapla (sadece gün/ay/yıl, saat bilgisi yok)
  const getToday = useCallback(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  // Firebase'den kullanıcının son aktif tarihini al
  const fetchLastActiveDate = useCallback(async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        let lastDate = null;

        // lastActiveDate field'ını kontrol et
        if (data.lastActiveDate) {
          // Firestore Timestamp ise
          if (data.lastActiveDate.toDate) {
            lastDate = data.lastActiveDate.toDate();
          } 
          // Date objesi ise
          else if (data.lastActiveDate instanceof Date) {
            lastDate = data.lastActiveDate;
          }
          // Timestamp objesi ise
          else if (data.lastActiveDate.seconds) {
            lastDate = new Date(data.lastActiveDate.seconds * 1000);
          }
          // String ise
          else if (typeof data.lastActiveDate === 'string') {
            lastDate = new Date(data.lastActiveDate);
          }

          // Tarihi normalize et (sadece gün/ay/yıl)
          if (lastDate) {
            lastDate.setHours(0, 0, 0, 0);
            setLastActiveDate(lastDate);
          }
        } else {
          // Eğer lastActiveDate yoksa, bugünü kaydet
          const todayDate = getToday();
          await updateLastActiveDate(userId);
          setLastActiveDate(todayDate);
        }
      } else {
        // Kullanıcı dokümanı yoksa, oluştur ve bugünü kaydet
        await updateLastActiveDate(userId);
        setLastActiveDate(today);
      }
    } catch (err) {
      console.error('🔴 Gün kontrolü hatası (fetchLastActiveDate):', err);
      setError(err);
        // Hata durumunda bugünü varsayılan olarak kullan
        setLastActiveDate(getToday());
    } finally {
      setIsLoading(false);
    }
  }, [getToday]);

  // Firebase'e son aktif tarihi kaydet/güncelle
  const updateLastActiveDate = useCallback(async (userId) => {
    if (!userId) return;

    try {
      const userDocRef = doc(db, 'users', userId);
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      // Firestore Timestamp olarak kaydet
      await setDoc(
        userDocRef,
        {
          lastActiveDate: Timestamp.fromDate(now),
          lastActiveDateUpdated: serverTimestamp(),
        },
        { merge: true }
      );

      setLastActiveDate(now);
      console.log('✅ Son aktif tarih güncellendi:', now.toISOString().split('T')[0]);
    } catch (err) {
      console.error('🔴 Son aktif tarih güncelleme hatası:', err);
      setError(err);
    }
  }, []);

  // Kullanıcı değiştiğinde son aktif tarihi al
  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
      fetchLastActiveDate(user.uid);
    } else {
      setIsLoading(false);
      setLastActiveDate(null);
    }
  }, [user?.uid, fetchLastActiveDate]);

  // Gün değişmiş mi kontrolü
  const isDayChanged = useMemo(() => {
    if (!lastActiveDate || isLoading) return false;

    // Tarihleri karşılaştır (sadece gün/ay/yıl)
    const lastDate = new Date(lastActiveDate);
    lastDate.setHours(0, 0, 0, 0);

    const todayDate = getToday();

    // Gün değişmiş mi?
    return lastDate.getTime() !== todayDate.getTime();
  }, [lastActiveDate, isLoading, getToday]);

  // Kaç gün geçmiş hesapla
  const daysPassed = useMemo(() => {
    if (!lastActiveDate || isLoading || !isDayChanged) return 0;

    const lastDate = new Date(lastActiveDate);
    lastDate.setHours(0, 0, 0, 0);

    const todayDate = getToday();

    // Milisaniye farkını güne çevir
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Negatif değerleri 0 yap (gelecek tarih durumu)
    return Math.max(0, diffDays);
  }, [lastActiveDate, isLoading, isDayChanged, getToday]);

  // Gün değiştiyse otomatik güncelle
  useEffect(() => {
    if (isDayChanged && user?.uid && !isLoading) {
      console.log(`📅 Gün değişti! ${daysPassed} gün geçmiş. Son aktif tarih güncelleniyor...`);
      updateLastActiveDate(user.uid);
    }
  }, [isDayChanged, daysPassed, user?.uid, isLoading, updateLastActiveDate]);

  return {
    // Gün değişmiş mi? (true/false)
    isDayChanged,
    
    // Kaç gün geçmiş? (0 = bugün, 1 = dün, 2 = 2 gün önce, ...)
    daysPassed,
    
    // Yükleniyor mu?
    isLoading,
    
    // Hata var mı?
    error,
    
    // Son aktif tarih (Date objesi)
    lastActiveDate,
    
    // Bugünkü tarih (Date objesi) - fonksiyon
    getToday,
    
    // Kullanıcı var mı?
    user,
    
    // Manuel güncelleme fonksiyonu
    updateLastActiveDate: () => user?.uid && updateLastActiveDate(user.uid),
  };
};

