/**
 * Sure ve Cüz'ün hangi sayfada olduğunu bulmak için mapping
 * Kuran-ı Kerim'de her sure ve cüz belirli sayfalarda başlar
 * Bu mapping'ler standart Mushaf sayfa numaralarına göredir
 */

// Sure başlangıç sayfaları (Mushaf sayfa numaraları)
const SURAH_START_PAGES = {
  1: 1,   // Fâtiha
  2: 2,   // Bakara
  3: 50,  // Âl-i İmrân
  4: 77,  // Nisâ
  5: 106, // Mâide
  6: 128, // En'âm
  7: 151, // A'râf
  8: 177, // Enfâl
  9: 187, // Tevbe
  10: 208, // Yûnus
  11: 221, // Hûd
  12: 235, // Yûsuf
  13: 249, // Ra'd
  14: 255, // İbrâhîm
  15: 262, // Hicr
  16: 267, // Nahl
  17: 282, // İsrâ
  18: 293, // Kehf
  19: 305, // Meryem
  20: 312, // Tâhâ
  21: 322, // Enbiyâ
  22: 332, // Hac
  23: 342, // Mü'minûn
  24: 350, // Nûr
  25: 359, // Furkân
  26: 367, // Şuarâ
  27: 377, // Neml
  28: 385, // Kasas
  29: 396, // Ankebût
  30: 404, // Rûm
  31: 411, // Lokmân
  32: 415, // Secde
  33: 418, // Ahzâb
  34: 428, // Sebe'
  35: 434, // Fâtır
  36: 440, // Yâsîn
  37: 446, // Sâffât
  38: 453, // Sâd
  39: 458, // Zümer
  40: 467, // Mü'min
  41: 477, // Fussilet
  42: 483, // Şûrâ
  43: 489, // Zuhruf
  44: 496, // Duhân
  45: 499, // Câsiye
  46: 502, // Ahkâf
  47: 507, // Muhammed
  48: 511, // Feth
  49: 515, // Hucurât
  50: 518, // Kâf
  51: 520, // Zâriyât
  52: 523, // Tûr
  53: 526, // Necm
  54: 529, // Kamer
  55: 531, // Rahmân
  56: 534, // Vâkıa
  57: 537, // Hadîd
  58: 542, // Mücâdele
  59: 545, // Haşr
  60: 549, // Mümtehine
  61: 551, // Saff
  62: 553, // Cum'a
  63: 554, // Münâfıkûn
  64: 556, // Teğâbün
  65: 558, // Talâk
  66: 560, // Tahrîm
  67: 562, // Mülk
  68: 564, // Kalem
  69: 566, // Hâkka
  70: 568, // Me'âric
  71: 570, // Nûh
  72: 572, // Cin
  73: 574, // Müzzemmil
  74: 575, // Müddessir
  75: 577, // Kıyâmet
  76: 578, // İnsân
  77: 580, // Mürselât
  78: 582, // Nebe'
  79: 583, // Nâzi'ât
  80: 585, // Abese
  81: 586, // Tekvîr
  82: 587, // İnfitâr
  83: 588, // Mutaffifîn
  84: 589, // İnşikâk
  85: 590, // Bürûc
  86: 591, // Târık
  87: 592, // A'lâ
  88: 593, // Gâşiye
  89: 594, // Fecr
  90: 595, // Beled
  91: 596, // Şems
  92: 597, // Leyl
  93: 598, // Duhâ
  94: 598, // İnşirâh
  95: 599, // Tîn
  96: 599, // Alak
  97: 600, // Kadir
  98: 600, // Beyyine
  99: 601, // Zilzâl
  100: 602, // Âdiyât
  101: 602, // Kâria
  102: 603, // Tekâsür
  103: 603, // Asr
  104: 603, // Hümeze
  105: 604, // Fîl
  106: 604, // Kureyş
  107: 604, // Mâûn
  108: 604, // Kevser
  109: 604, // Kâfirûn
  110: 604, // Nasr
  111: 604, // Tebbet
  112: 604, // İhlâs
  113: 604, // Felak
  114: 604, // Nâs
};

// Cüz başlangıç sayfaları (30 cüz, her cüz yaklaşık 20 sayfa)
const JUZ_START_PAGES = {
  1: 1,
  2: 22,
  3: 42,
  4: 62,
  5: 82,
  6: 102,
  7: 121,
  8: 142,
  9: 162,
  10: 182,
  11: 201,
  12: 221,
  13: 242,
  14: 262,
  15: 282,
  16: 302,
  17: 322,
  18: 342,
  19: 362,
  20: 382,
  21: 402,
  22: 422,
  23: 442,
  24: 462,
  25: 482,
  26: 502,
  27: 522,
  28: 542,
  29: 562,
  30: 582,
};

/**
 * Sure numarasına göre başlangıç sayfasını bulur
 */
export const getSurahStartPage = (surahNumber) => {
  return SURAH_START_PAGES[surahNumber] || 1;
};

/**
 * Cüz numarasına göre başlangıç sayfasını bulur
 */
export const getJuzStartPage = (juzNumber) => {
  return JUZ_START_PAGES[juzNumber] || 1;
};
