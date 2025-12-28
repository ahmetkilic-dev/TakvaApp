const pad2 = (n) => String(n).padStart(2, '0');

export function toDayKeyLocal(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
}

export function getTodayKeyLocal() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return toDayKeyLocal(now);
}


