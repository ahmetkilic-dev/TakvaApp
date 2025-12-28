import { useEffect, useMemo, useState } from 'react';
import { useLocation } from '../contexts/LocationContext';

const API_BASE = 'https://api.aladhan.com/v1/timings';
const METHOD = 13; // Türkiye için

const pad2 = (n) => String(n).padStart(2, '0');

const safeSplitTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const clean = timeStr.split(' ')[0];
  const [h, m] = clean.split(':').map((x) => Number(x));
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return { h, m };
};

const toDateTodayAt = (timeStr) => {
  const parts = safeSplitTime(timeStr);
  if (!parts) return null;
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parts.h, parts.m, 0, 0);
};

/**
 * Bugünün namaz vakitlerini getirir (konum varsa koordinat ile, yoksa İstanbul fallback).
 * Ayrıca "hangi vakit geldi" ve hangi vakitlerin aktif (işaretlenebilir) olduğunu hesaplar.
 */
export function useDailyPrayerTimes() {
  const { location: userLocation, city: userCity, hasPermission, isLoading: locationLoading } =
    useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [times, setTimes] = useState(null);

  useEffect(() => {
    if (locationLoading) return;

    const fetchTimes = async () => {
      try {
        setLoading(true);
        setError(null);

        const now = new Date();
        const dateStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        let finalUrl;
        let resolvedCity;

        if (hasPermission && userLocation?.latitude && userLocation?.longitude) {
          finalUrl = `${API_BASE}/${dateStr}?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&method=${METHOD}`;
          resolvedCity = userCity || 'Türkiye';
        } else {
          finalUrl = `${API_BASE}/${dateStr}?city=Istanbul&country=Turkey&method=${METHOD}`;
          resolvedCity = 'İstanbul';
        }

        const response = await fetch(finalUrl);
        const result = await response.json();

        if (!result?.data?.timings) {
          throw new Error('Namaz vakitleri alınamadı');
        }

        const t = result.data.timings;
        setTimes({
          city: resolvedCity,
          imsak: t.Fajr,
          gunes: t.Sunrise,
          ogle: t.Dhuhr,
          ikindi: t.Asr,
          aksam: t.Maghrib,
          yatsi: t.Isha,
        });
      } catch (e) {
        // Fallback: sabit örnek değerler (HomeHeader ile uyumlu)
        setTimes({
          city: 'İstanbul',
          imsak: '06:43',
          gunes: '08:15',
          ogle: '13:06',
          ikindi: '15:24',
          aksam: '17:44',
          yatsi: '19:10',
        });
        setError(e?.message || 'Namaz vakitleri alınamadı');
      } finally {
        setLoading(false);
      }
    };

    void fetchTimes();
  }, [hasPermission, locationLoading, userCity, userLocation]);

  // “Geldi mi?” hesabı için lightweight tick (30sn)
  const [nowTick, setNowTick] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNowTick(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const derived = useMemo(() => {
    if (!times) {
      return {
        arrived: { sabah: false, ogle: false, ikindi: false, aksam: false, yatsi: false },
        currentPrayerKey: null,
        nextPrayerKey: null,
      };
    }

    const now = new Date(nowTick);
    const sabahAt = toDateTodayAt(times.imsak);
    const ogleAt = toDateTodayAt(times.ogle);
    const ikindiAt = toDateTodayAt(times.ikindi);
    const aksamAt = toDateTodayAt(times.aksam);
    const yatsiAt = toDateTodayAt(times.yatsi);

    const order = [
      { key: 'sabah', at: sabahAt },
      { key: 'ogle', at: ogleAt },
      { key: 'ikindi', at: ikindiAt },
      { key: 'aksam', at: aksamAt },
      { key: 'yatsi', at: yatsiAt },
    ].filter((x) => x.at instanceof Date);

    const arrived = {
      sabah: sabahAt ? now >= sabahAt : false,
      ogle: ogleAt ? now >= ogleAt : false,
      ikindi: ikindiAt ? now >= ikindiAt : false,
      aksam: aksamAt ? now >= aksamAt : false,
      yatsi: yatsiAt ? now >= yatsiAt : false,
    };

    let nextPrayerKey = null;
    for (const item of order) {
      if (item.at > now) {
        nextPrayerKey = item.key;
        break;
      }
    }

    let currentPrayerKey = null;
    for (let i = order.length - 1; i >= 0; i--) {
      if (order[i].at <= now) {
        currentPrayerKey = order[i].key;
        break;
      }
    }

    return { arrived, currentPrayerKey, nextPrayerKey };
  }, [nowTick, times]);

  const todayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  }, [nowTick]);

  return {
    times,
    todayKey,
    loading: locationLoading || loading,
    error,
    ...derived,
  };
}


