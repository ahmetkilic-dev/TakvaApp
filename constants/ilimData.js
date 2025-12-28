export default {
  fikih: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-10) - ABDEST VE TEMİZLİK
  // --------------------------------------------------------
  {
    id: 'f_e_1',
    difficulty: 'easy',
    points: 10,
    question: "Abdestin farzları (yıkanması gereken yerler) kaç tanedir?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    explanation: "Abdestin farzları 4 tanedir: Yüzü yıkamak, kolları yıkamak, başı meshetmek ve ayakları yıkamak."
  },
  {
    id: 'f_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Aşağıdakilerden hangisi abdesti bozan durumlardan biridir?",
    options: ["Gülümsemek", "Uyumak", "Ağlamak", "Konuşmak"],
    correctAnswer: "Uyumak",
    explanation: "Bir yere dayanarak veya yatarak uyumak abdesti bozar. Diğer şıklar bozmaz."
  },
  {
    id: 'f_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Su bulunmadığında veya kullanımı sağlığa zararlı olduğunda toprakla yapılan temizliğe ne ad verilir?",
    options: ["Gusül", "Teyemmüm", "Mesh", "İstinca"],
    correctAnswer: "Teyemmüm",
    explanation: "Su olmadığında temiz toprak veya toprak cinsinden bir şeyle teyemmüm alınır."
  },
  {
    id: 'f_e_4',
    difficulty: 'easy',
    points: 10,
    question: "Gusül abdestinin (boy abdesti) farzı kaçtır?",
    options: ["3", "4", "6", "12"],
    correctAnswer: "3",
    explanation: "Guslün farzları 3'tür: Ağza su vermek, burna su vermek ve bütün bedeni kuru yer kalmayacak şekilde yıkamak."
  },
  {
    id: 'f_e_5',
    difficulty: 'easy',
    points: 10,
    question: "Tuvalet ihtiyacını giderdikten sonra yapılan temizliğe ne ad verilir?",
    options: ["Taharet", "Teyemmüm", "Gusül", "Abdest"],
    correctAnswer: "Taharet",
    explanation: "Necasetten (pislikten) temizlenmeye taharet denir."
  },
  {
    id: 'f_e_6',
    difficulty: 'easy',
    points: 10,
    question: "Mest üzerine mesh etme süresi yolcu olmayanlar (mukim) için kaç saattir?",
    options: ["12 Saat", "24 Saat", "48 Saat", "72 Saat"],
    correctAnswer: "24 Saat",
    explanation: "Yolcu olmayanlar için mest süresi 24 saattir (1 gün)."
  },
  {
    id: 'f_e_7',
    difficulty: 'easy',
    points: 10,
    question: "Namaz kılınacak yerin ve elbisenin temiz olması şartına ne denir?",
    options: ["Hadesten Taharet", "Necasetten Taharet", "Setr-i Avret", "İstikbal-i Kıble"],
    correctAnswer: "Necasetten Taharet",
    explanation: "Namaz kılacak kişinin bedeninde, elbisesinde ve namaz yerinde pislik bulunmamasına Necasetten Taharet denir."
  },
  {
    id: 'f_e_8',
    difficulty: 'easy',
    points: 10,
    question: "Ağız ve buruna su verirken suyun boğaza kaçması orucu bozar mı?",
    options: ["Bozmaz", "Bozar", "Mekruh olur", "Şüphelidir"],
    correctAnswer: "Bozar",
    explanation: "Oruçlu olduğunu hatırlayarak boğaza su kaçırmak orucu bozar ve kaza gerektirir."
  },
  {
    id: 'f_e_9',
    difficulty: 'easy',
    points: 10,
    question: "Diş kanaması abdesti bozar mı?",
    options: ["Asla bozmaz", "Tükürükle eşit veya fazlaysa bozar", "Az olsa da bozar", "Sadece namazda bozar"],
    correctAnswer: "Tükürükle eşit veya fazlaysa bozar",
    explanation: "Hanefi mezhebine göre dişten gelen kan tükürükle eşit veya tükürükten fazlaysa abdest bozulur."
  },
  {
    id: 'f_e_10',
    difficulty: 'easy',
    points: 10,
    question: "Aşağıdakilerden hangisi gusül gerektiren hallerden biri değildir?",
    options: ["Cünüplük", "Adet halinin bitmesi", "Lohusalığın bitmesi", "Saç kestirmek"],
    correctAnswer: "Saç kestirmek",
    explanation: "Saç veya tırnak kesmek gusül abdesti almayı gerektirmez."
  },

  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (11-20) - NAMAZ
  // --------------------------------------------------------
  {
    id: 'f_e_11',
    difficulty: 'easy',
    points: 10,
    question: "Günde kaç vakit farz namaz vardır?",
    options: ["3", "4", "5", "7"],
    correctAnswer: "5",
    explanation: "Sabah, Öğle, İkindi, Akşam ve Yatsı olmak üzere 5 vakit farz namaz vardır."
  },
  {
    id: 'f_e_12',
    difficulty: 'easy',
    points: 10,
    question: "Sabah namazının farzı kaç rekattır?",
    options: ["2", "3", "4", "10"],
    correctAnswer: "2",
    explanation: "Sabah namazı 2 rekat sünnet, 2 rekat farz olmak üzere toplam 4 rekattır."
  },
  {
    id: 'f_e_13',
    difficulty: 'easy',
    points: 10,
    question: "Namazın her rekatında okunan sure hangisidir?",
    options: ["İhlas", "Fatiha", "Kevser", "Yasin"],
    correctAnswer: "Fatiha",
    explanation: "Namazın her rekatında Fatiha suresi okunması vaciptir (Şafii'de farzdır)."
  },
  {
    id: 'f_e_14',
    difficulty: 'easy',
    points: 10,
    question: "Namaza başlarken 'Allahü Ekber' demeye ne ad verilir?",
    options: ["İftitah Tekbiri", "Rüku", "Secde", "Selam"],
    correctAnswer: "İftitah Tekbiri",
    explanation: "Namaza başlama tekbirine İftitah (Başlangıç) Tekbiri denir."
  },
  {
    id: 'f_e_15',
    difficulty: 'easy',
    points: 10,
    question: "Hangi namazın cemaatle kılınması farzdır?",
    options: ["Teravih", "Cuma", "Vitir", "Teheccüd"],
    correctAnswer: "Cuma",
    explanation: "Cuma namazı, şartları tutan erkeklere cemaatle kılınması farz olan bir namazdır."
  },
  {
    id: 'f_e_16',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan ayında yatsı namazından sonra kılınan sünnet namaz hangisidir?",
    options: ["Kuşluk", "Evvabin", "Teravih", "Hacet"],
    correctAnswer: "Teravih",
    explanation: "Ramazan gecelerinde kılınan özel sünnet namaz Teravih namazıdır."
  },
  {
    id: 'f_e_17',
    difficulty: 'easy',
    points: 10,
    question: "Namazda kıbleye, yani nereye yöneliriz?",
    options: ["Kudüs'e (Mescid-i Aksa)", "Medine'ye (Mescid-i Nebevi)", "Mekke'ye (Kabe)", "Şam'a"],
    correctAnswer: "Mekke'ye (Kabe)",
    explanation: "Müslümanların kıblesi Mekke şehrindeki Kabe'dir."
  },
  {
    id: 'f_e_18',
    difficulty: 'easy',
    points: 10,
    question: "Cenaze namazında hangisi yapılmaz?",
    options: ["Ayakta durmak (Kıyam)", "Tekbir getirmek", "Dua etmek", "Secde etmek"],
    correctAnswer: "Secde etmek",
    explanation: "Cenaze namazı ayakta kılınır; rükusu ve secdesi yoktur."
  },
  {
    id: 'f_e_19',
    difficulty: 'easy',
    points: 10,
    question: "Akşam namazının farzı kaç rekattır?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation: "Akşam namazının farzı 3 rekattır."
  },
  {
    id: 'f_e_20',
    difficulty: 'easy',
    points: 10,
    question: "Ezan okunduğunda namaz vaktinin ne olduğu anlaşılır?",
    options: ["Vaktin girdiği", "Vaktin çıktığı", "Orucun başladığı", "Bayram olduğu"],
    correctAnswer: "Vaktin girdiği",
    explanation: "Ezan, namaz vaktinin girdiğini bildiren çağrıdır."
  },

  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (21-30) - ORUÇ VE ZEKAT
  // --------------------------------------------------------
  {
    id: 'f_e_21',
    difficulty: 'easy',
    points: 10,
    question: "Hangi ayda oruç tutmak farzdır?",
    options: ["Recep", "Şaban", "Ramazan", "Muharrem"],
    correctAnswer: "Ramazan",
    explanation: "İslam'ın 5 şartından biri olan oruç, Ramazan ayında tutulur."
  },
  {
    id: 'f_e_22',
    difficulty: 'easy',
    points: 10,
    question: "Oruca başlamak için gece yenilen yemeğe ne denir?",
    options: ["İftar", "Sahur", "Fidye", "İmsak"],
    correctAnswer: "Sahur",
    explanation: "Oruç tutmak niyetiyle tan yeri ağarmadan önce yenen yemeğe sahur denir."
  },
  {
    id: 'f_e_23',
    difficulty: 'easy',
    points: 10,
    question: "Güneş batınca orucun açıldığı vakte ne denir?",
    options: ["İmsak", "Sahur", "İftar", "Kuşluk"],
    correctAnswer: "İftar",
    explanation: "Oruç yasaklarının sona erdiği, akşam ezanı vaktine İftar denir."
  },
  {
    id: 'f_e_24',
    difficulty: 'easy',
    points: 10,
    question: "Bilerek bir şey yiyip içmek orucu bozar mı?",
    options: ["Bozmaz", "Bozar", "Mekruh olur", "Unutursa bozmaz"],
    correctAnswer: "Bozar",
    explanation: "Oruçlu olduğunu bilerek yemek ve içmek orucu bozar."
  },
  {
    id: 'f_e_25',
    difficulty: 'easy',
    points: 10,
    question: "Unutarak bir şey yemek orucu bozar mı?",
    options: ["Bozar", "Bozmaz", "Kaza gerektirir", "Kefaret gerektirir"],
    correctAnswer: "Bozmaz",
    explanation: "Peygamberimiz (s.a.v), unutarak yiyenin orucunun bozulmayacağını müjdelemiştir."
  },
  {
    id: 'f_e_26',
    difficulty: 'easy',
    points: 10,
    question: "Zengin Müslümanların mallarının belli bir kısmını fakirlere vermesine ne denir?",
    options: ["Zekat", "Fidye", "Kefaret", "Adak"],
    correctAnswer: "Zekat",
    explanation: "Zekat, zenginlerin yılda bir kez malının belli bir oranını (%2.5) vermesidir."
  },
  {
    id: 'f_e_27',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan Bayramı'ndan önce verilmesi vacip olan sadakaya ne denir?",
    options: ["Zekat", "Fitre (Fıtır Sadakası)", "Fidye", "Hibe"],
    correctAnswer: "Fitre (Fıtır Sadakası)",
    explanation: "Ramazan ayında bayram namazına kadar verilmesi gereken sadakaya Fitre denir."
  },
  {
    id: 'f_e_28',
    difficulty: 'easy',
    points: 10,
    question: "Zekat kimlere verilemez?",
    options: ["Fakirlere", "Borçlulara", "Yolda kalmışlara", "Anne ve Babaya"],
    correctAnswer: "Anne ve Babaya",
    explanation: "Kişi bakmakla yükümlü olduğu usulüne (anne, baba, dede, nine) zekat veremez."
  },
  {
    id: 'f_e_29',
    difficulty: 'easy',
    points: 10,
    question: "Hangi malın zekatı verilmez?",
    options: ["Altın", "Para", "Oturulan Ev", "Ticaret Malı"],
    correctAnswer: "Oturulan Ev",
    explanation: "Kişinin temel ihtiyacı olan ve içinde oturduğu evin zekatı yoktur."
  },
  {
    id: 'f_e_30',
    difficulty: 'easy',
    points: 10,
    question: "Kurban Bayramı'nda kesilen hayvana ne denir?",
    options: ["Akika", "Adak", "Kurban (Udhiye)", "Hedy"],
    correctAnswer: "Kurban (Udhiye)",
    explanation: "Kurban bayramında Allah'a yakınlaşmak için kesilen hayvana Kurban denir."
  },

  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (31-40) - HAC, HARAMLAR VE GENEL
  // --------------------------------------------------------
  {
    id: 'f_e_31',
    difficulty: 'easy',
    points: 10,
    question: "Hac ibadeti nerede yapılır?",
    options: ["İstanbul", "Mekke", "Medine", "Kudüs"],
    correctAnswer: "Mekke",
    explanation: "Hac ibadeti Suudi Arabistan'ın Mekke şehrinde yapılır."
  },
  {
    id: 'f_e_32',
    difficulty: 'easy',
    points: 10,
    question: "Hacıların Kabe'nin etrafında 7 kez dönmesine ne denir?",
    options: ["Vakfe", "Sa'y", "Tavaf", "İhram"],
    correctAnswer: "Tavaf",
    explanation: "Kabe'nin etrafında usulüne uygun olarak 7 kez dönmeye Tavaf denir."
  },
  {
    id: 'f_e_33',
    difficulty: 'easy',
    points: 10,
    question: "Aşağıdakilerden hangisi dinimizce haram (yasak) kılınmıştır?",
    options: ["Su içmek", "Domuz eti yemek", "Balık yemek", "Koyun eti yemek"],
    correctAnswer: "Domuz eti yemek",
    explanation: "İslam dininde domuz eti ve ürünlerini yemek kesin olarak haramdır."
  },
  {
    id: 'f_e_34',
    difficulty: 'easy',
    points: 10,
    question: "İçki (alkol) içmenin hükmü nedir?",
    options: ["Helal", "Mekruh", "Haram", "Mubah"],
    correctAnswer: "Haram",
    explanation: "Sarhoşluk veren her türlü içki İslam dininde haramdır."
  },
  {
    id: 'f_e_35',
    difficulty: 'easy',
    points: 10,
    question: "Besmele ne demektir?",
    options: ["Allah büyüktür", "Rahman ve Rahim olan Allah'ın adıyla", "Allah'a hamd olsun", "Allah'tan başka ilah yoktur"],
    correctAnswer: "Rahman ve Rahim olan Allah'ın adıyla",
    explanation: "Bismillahirrahmanirrahim'in manası 'Rahman ve Rahim olan Allah'ın adıyla' demektir."
  },
  {
    id: 'f_e_36',
    difficulty: 'easy',
    points: 10,
    question: "Kelime-i Şehadet getirirken ilk ne söylenir?",
    options: ["Eşhedü...", "Bismillah...", "Elhamdülillah...", "Subhanallah..."],
    correctAnswer: "Eşhedü...",
    explanation: "Kelime-i Şehadet: 'Eşhedü en la ilahe illallah...' diye başlar."
  },
  {
    id: 'f_e_37',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın emirlerini yapıp yasaklarından kaçınan kişiye ne denir?",
    options: ["Münafık", "Müşrik", "Takva Sahibi (Müttaki)", "Kafir"],
    correctAnswer: "Takva Sahibi (Müttaki)",
    explanation: "Allah'tan korkan, emirlerine uyan ve günahlardan sakınan kişiye Müttaki veya Takva Sahibi denir."
  },
  {
    id: 'f_e_38',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimiz'in (s.a.v) yaptığı ve bize de tavsiye ettiği davranışlara ne denir?",
    options: ["Farz", "Sünnet", "Haram", "Vacip"],
    correctAnswer: "Sünnet",
    explanation: "Peygamberimizin sözleri, fiilleri ve onayladığı davranışlara Sünnet denir."
  },
  {
    id: 'f_e_39',
    difficulty: 'easy',
    points: 10,
    question: "Cuma günü imamın hutbe okuduğu merdivenli yere ne denir?",
    options: ["Minber", "Mihrap", "Kürsü", "Minare"],
    correctAnswer: "Minber",
    explanation: "İmamın Cuma ve Bayram hutbelerini okumak için çıktığı merdivenli yapıya Minber denir."
  },
  {
    id: 'f_e_40',
    difficulty: 'easy',
    points: 10,
    question: "İmamın namaz kıldırırken durduğu oyuk yere ne denir?",
    options: ["Minber", "Mihrap", "Mahfil", "Şadırvan"],
    correctAnswer: "Mihrap",
    explanation: "Camilerde kıble yönünü gösteren ve imamın namaz kıldırırken durduğu yere Mihrap denir."
  },
// --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - 20 PUANLIK SORULAR
  // --------------------------------------------------------
  {
    id: 'f_m_1',
    difficulty: 'medium',
    points: 20,
    question: "Vitir namazının hükmü Hanefi mezhebine göre nedir?",
    options: ["Farz", "Sünnet", "Vacip", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "İmam-ı Azam'a göre Vitir namazı vaciptir, diğer mezheplerde ise müekked sünnettir."
  },
  {
    id: 'f_m_2',
    difficulty: 'medium',
    points: 20,
    question: "Namazda 'Sübhaneke' duasını okumanın hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet", "Müstehap"],
    correctAnswer: "Sünnet",
    explanation: "Namazın ilk rekatında iftitah tekbirinden sonra Sübhaneke okumak sünnettir."
  },
  {
    id: 'f_m_3',
    difficulty: 'medium',
    points: 20,
    question: "Oruçlu iken unutarak yiyip içen kişinin durumu nedir?",
    options: ["Orucu bozulur, kaza gerekir", "Orucu bozulur, kefaret gerekir", "Orucu bozulmaz", "Mekruh olur"],
    correctAnswer: "Orucu bozulmaz",
    explanation: "Unutarak yiyip içmek orucu bozmaz. Hatırladığı an yemeği bırakıp ağzını çalkalamalıdır."
  },
  {
    id: 'f_m_4',
    difficulty: 'medium',
    points: 20,
    question: "Hangi namazda rüku ve secde yoktur?",
    options: ["Bayram Namazı", "Cenaze Namazı", "Vitir Namazı", "Kuşluk Namazı"],
    correctAnswer: "Cenaze Namazı",
    explanation: "Cenaze namazı ölüye dua mahiyetindedir; ayakta kılınır, rüku ve secdesi yoktur."
  },
  {
    id: 'f_m_5',
    difficulty: 'medium',
    points: 20,
    question: "Seferi (yolcu) olan bir kimse 4 rekatlık farz namazları kaç rekat kılar?",
    options: ["4 rekat", "3 rekat", "2 rekat", "Kılmaz"],
    correctAnswer: "2 rekat",
    explanation: "Seferilikte 4 rekatlı farzlar 2 rekat olarak kısaltılarak (Kasr-ı Salat) kılınır."
  },
  {
    id: 'f_m_6',
    difficulty: 'medium',
    points: 20,
    question: "Bayram namazlarının hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet", "Nafile"],
    correctAnswer: "Vacip",
    explanation: "Kendisine Cuma namazı farz olan erkeklere Ramazan ve Kurban bayramı namazlarını kılmak vaciptir."
  },
  {
    id: 'f_m_7',
    difficulty: 'medium',
    points: 20,
    question: "Zekatın farz olması için sahip olunması gereken zenginlik ölçüsüne ne denir?",
    options: ["Fidye", "Fitre", "Nisap", "Öşür"],
    correctAnswer: "Nisap",
    explanation: "Nisap, dinen zengin sayılmak için gereken asgari mal varlığı miktarıdır."
  },
  {
    id: 'f_m_8',
    difficulty: 'medium',
    points: 20,
    question: "Aşağıdakilerden hangisi namazın içindeki farzlardan (rükunlar) biridir?",
    options: ["Kıbleye dönmek", "Abdest almak", "Secde etmek", "Niyet etmek"],
    correctAnswer: "Secde etmek",
    explanation: "Secde namazın içindeki farzlardandır. Diğer şıklar namazın dışındaki farzlardandır (şartlar)."
  },
  {
    id: 'f_m_9',
    difficulty: 'medium',
    points: 20,
    question: "Namazda Fatiha suresinden sonra okunan sure veya ayetlere ne denir?",
    options: ["Zamm-ı Sure", "Sübhaneke", "Kunut Duaları", "Tahiyyat"],
    correctAnswer: "Zamm-ı Sure",
    explanation: "Fatiha'dan sonra Kuran'dan en az bir sure veya üç kısa ayet okumaya Zamm-ı Sure denir."
  },
  {
    id: 'f_m_10',
    difficulty: 'medium',
    points: 20,
    question: "Cuma namazının farzı kaç rekattır?",
    options: ["2", "4", "10", "12"],
    correctAnswer: "2",
    explanation: "Cuma namazının farzı 2 rekattır. Öncesinde ve sonrasında sünnetleri vardır."
  },
  {
    id: 'f_m_11',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de secde ayeti okunduğunda yapılan secdeye ne denir?",
    options: ["Sehiv Secdesi", "Tilavet Secdesi", "Şükür Secdesi", "Sahv Secdesi"],
    correctAnswer: "Tilavet Secdesi",
    explanation: "Secde ayeti okuyan veya dinleyen kişinin yapması vacip olan secdeye Tilavet Secdesi denir."
  },
  {
    id: 'f_m_12',
    difficulty: 'medium',
    points: 20,
    question: "Oruç tutamayacak kadar yaşlı veya iyileşme ümidi olmayan hastaların ödediği bedele ne denir?",
    options: ["Fitre", "Fidye", "Kefaret", "Zekat"],
    correctAnswer: "Fidye",
    explanation: "Tutulamayan her gün oruç için bir fakiri doyuracak kadar verilen bedele Fidye denir."
  },
  {
    id: 'f_m_13',
    difficulty: 'medium',
    points: 20,
    question: "Hangi durumlarda namazda 'Sehiv Secdesi' (yanılma secdesi) yapılır?",
    options: ["Farzı geciktirince", "Sünneti terkedince", "Abdest bozulunca", "Niyet etmeyince"],
    correctAnswer: "Farzı geciktirince",
    explanation: "Farzın geciktirilmesi veya vacibin terk edilmesi/geciktirilmesi durumunda sehiv secdesi gerekir."
  },
  {
    id: 'f_m_14',
    difficulty: 'medium',
    points: 20,
    question: "Kurban Bayramı'nda kesilen kurbana fıkıh dilinde ne ad verilir?",
    options: ["Akika", "Hedy", "Udhiye", "Adak"],
    correctAnswer: "Udhiye",
    explanation: "Kurban bayramı günlerinde kesilen kurbana Udhiye denir."
  },
  {
    id: 'f_m_15',
    difficulty: 'medium',
    points: 20,
    question: "Yolculuğa çıkan kişi kaç kilometreyi geçerse 'Seferi' sayılır?",
    options: ["50 km", "90 km", "150 km", "200 km"],
    correctAnswer: "90 km",
    explanation: "Yaklaşık 90 km (eski ölçüyle 18 saatlik yol veya 3 günlük yürüyüş) mesafeye giden kişi seferi olur."
  },
  {
    id: 'f_m_16',
    difficulty: 'medium',
    points: 20,
    question: "İmamın namaz kıldırırken sessiz okuması gereken yerde sesli okuması neyi gerektirir?",
    options: ["Namazı bozar", "Sehiv Secdesi", "Tilavet Secdesi", "Bir şey gerekmez"],
    correctAnswer: "Sehiv Secdesi",
    explanation: "Kıraatte sesli/sessiz okuma (cehri/hafi) vaciptir. Yanlışlıkla yapılırsa sehiv secdesi gerekir."
  },
  {
    id: 'f_m_17',
    difficulty: 'medium',
    points: 20,
    question: "Aşağıdakilerden hangisi abdesti bozmaz?",
    options: ["Kan akması", "Ağız dolusu kusmak", "Tırnak kesmek", "Bayılmak"],
    correctAnswer: "Tırnak kesmek",
    explanation: "Tırnak kesmek, saç traşı olmak abdesti bozmaz. Diğerleri bozar."
  },
  {
    id: 'f_m_18',
    difficulty: 'medium',
    points: 20,
    question: "Teravih namazı kaç rekattır?",
    options: ["8", "12", "20", "33"],
    correctAnswer: "20",
    explanation: "Hz. Ömer döneminden itibaren Teravih namazı cemaatle 20 rekat olarak kılınagelmiştir."
  },
  {
    id: 'f_m_19',
    difficulty: 'medium',
    points: 20,
    question: "Hac ibadetinde Arafat'ta bir süre beklemeye ne ad verilir?",
    options: ["Tavaf", "Sa'y", "Vakfe", "İhram"],
    correctAnswer: "Vakfe",
    explanation: "Haccın en önemli farzı Arafat Vakfesi'dir."
  },
  {
    id: 'f_m_20',
    difficulty: 'medium',
    points: 20,
    question: "Hangi akrabaya zekat verilmez?",
    options: ["Kardeş", "Amca", "Baba", "Teyze"],
    correctAnswer: "Baba",
    explanation: "Kişi kendi anne-babasına (usul) ve çocuklarına (füru) zekat veremez. Kardeş, amca, teyze gibi yan soyuna verebilir."
  },
  {
    id: 'f_m_21',
    difficulty: 'medium',
    points: 20,
    question: "Namazda 'Tahiyyat' duasını okumanın hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "İlk ve son oturuşlarda Tahiyyat duasını okumak vaciptir."
  },
  {
    id: 'f_m_22',
    difficulty: 'medium',
    points: 20,
    question: "Yeminini bozan kişinin ödemesi gereken bedele ne denir?",
    options: ["Yemin Kefareti", "Fidye", "Adak", "Diyet"],
    correctAnswer: "Yemin Kefareti",
    explanation: "Yeminini bozan kişi kefaret olarak 10 fakiri doyurur veya giydirir; gücü yoksa 3 gün oruç tutar."
  },
  {
    id: 'f_m_23',
    difficulty: 'medium',
    points: 20,
    question: "Toprak ürünlerinden (tarım mahsulleri) verilen zekata ne ad verilir?",
    options: ["Fitre", "Öşür", "Sadaka", "Haraç"],
    correctAnswer: "Öşür",
    explanation: "Toprak mahsullerinin zekatına Öşür denir (1/10 veya 1/20 oranında)."
  },
  {
    id: 'f_m_24',
    difficulty: 'medium',
    points: 20,
    question: "Cemaatle namazda imama uyan kişiye ne ad verilir?",
    options: ["Müezzin", "Müktedi", "Hatip", "Kayyım"],
    correctAnswer: "Müktedi",
    explanation: "İmama uyarak namaz kılan kişiye fıkıh terimi olarak Müktedi denir."
  },
  {
    id: 'f_m_25',
    difficulty: 'medium',
    points: 20,
    question: "Kurban kesilirken okunması gereken dua hangisidir?",
    options: ["Sübhaneke", "Tekbir (Bismillahi Allahu Ekber)", "Fatiha", "Ayetel Kürsi"],
    correctAnswer: "Tekbir (Bismillahi Allahu Ekber)",
    explanation: "Hayvan kesilirken 'Bismillahi Allahu Ekber' diyerek kesmek şarttır."
  },
  {
    id: 'f_m_26',
    difficulty: 'medium',
    points: 20,
    question: "Hangi hayvanın kurban edilmesi caiz değildir?",
    options: ["Deve", "Sığır", "Koyun", "Tavuk"],
    correctAnswer: "Tavuk",
    explanation: "Kurban sadece deve, sığır (manda) ve davar (koyun-keçi) cinsinden olur. Tavuk, horoz vb. kurban olmaz."
  },
  {
    id: 'f_m_27',
    difficulty: 'medium',
    points: 20,
    question: "Şevval ayında tutulan 6 gün orucun hükmü nedir?",
    options: ["Farz", "Vacip", "Müstehap/Sünnet", "Mekruh"],
    correctAnswer: "Müstehap/Sünnet",
    explanation: "Ramazan'dan sonra Şevval ayında 6 gün oruç tutmak çok sevaptır ve sünnettir."
  },
  {
    id: 'f_m_28',
    difficulty: 'medium',
    points: 20,
    question: "Namazda gülmek namazı bozar mı?",
    options: ["Bozmaz", "Sadece namazı bozar", "Hem namazı hem abdesti bozar", "Sadece abdesti bozar"],
    correctAnswer: "Hem namazı hem abdesti bozar",
    explanation: "Namazda yanındakilerin duyacağı kadar (kahkaha ile) gülmek hem namazı hem de abdesti bozar."
  },
  {
    id: 'f_m_29',
    difficulty: 'medium',
    points: 20,
    question: "İhramlı iken aşağıdakilerden hangisini yapmak yasaktır?",
    options: ["Yıkanmak", "Dikişli elbise giymek (Erkekler)", "Uyumak", "Konuşmak"],
    correctAnswer: "Dikişli elbise giymek (Erkekler)",
    explanation: "Erkeklerin ihramda dikişli elbise, çorap, iç çamaşırı giymesi yasaktır."
  },
  {
    id: 'f_m_30',
    difficulty: 'medium',
    points: 20,
    question: "Diş dolgusu veya kaplaması gusül abdestine engel midir?",
    options: ["Evet, engeldir", "Hayır, engel değildir", "Sökülmesi gerekir", "Mezhebe göre değişir"],
    correctAnswer: "Hayır, engel değildir",
    explanation: "Zaruret olduğu için diş dolgusu gusle engel olmaz, o kısım yıkanmış sayılır."
  },
  {
    id: 'f_m_31',
    difficulty: 'medium',
    points: 20,
    question: "Aşağıdakilerden hangisi 'Sadaka-i Cariye' (Devam eden sadaka) sayılır?",
    options: ["Bir fakire yemek vermek", "Çeşme/Okul yaptırmak", "Selam vermek", "Gülümsemek"],
    correctAnswer: "Çeşme/Okul yaptırmak",
    explanation: "İnsanlar faydalandığı sürece sevabı devam eden (çeşme, cami, okul, ağaç vb.) hayırlara Sadaka-i Cariye denir."
  },
  {
    id: 'f_m_32',
    difficulty: 'medium',
    points: 20,
    question: "Mahremiyet açısından, kadının erkek kardeşinin yanında başı açık durmasının hükmü nedir?",
    options: ["Haramdır", "Caizdir (Helaldir)", "Mekruhtur", "Mübahtır"],
    correctAnswer: "Caizdir (Helaldir)",
    explanation: "Erkek kardeş, kadının mahremidir (evlenmesi ebediyen haramdır), yanında başı açık durması caizdir."
  },
  {
    id: 'f_m_33',
    difficulty: 'medium',
    points: 20,
    question: "Adak kurbanının etinden kimler yiyemez?",
    options: ["Komşular", "Fakirler", "Adayan kişi ve ailesi", "Akrabalar"],
    correctAnswer: "Adayan kişi ve ailesi",
    explanation: "Adak sahibi, eşi, çocukları, torunları, anne ve babası adak etinden yiyemez; tamamı fakirlere dağıtılmalıdır."
  },
  {
    id: 'f_m_34',
    difficulty: 'medium',
    points: 20,
    question: "Su varken teyemmüm alınır mı?",
    options: ["Evet", "Hayır", "Vakit darsa alınır", "İstenirse alınır"],
    correctAnswer: "Hayır",
    explanation: "Su varken ve kullanmaya güç yeterken teyemmüm geçersizdir."
  },
  {
    id: 'f_m_35',
    difficulty: 'medium',
    points: 20,
    question: "Kabe'nin etrafında 'Sa'y' ibadeti hangi iki tepe arasında yapılır?",
    options: ["Mina ve Müzdelife", "Safa ve Merve", "Arafat ve Mina", "Uhud ve Hendek"],
    correctAnswer: "Safa ve Merve",
    explanation: "Hac ve umrede Sa'y, Safa ve Merve tepeleri arasında 4 gidiş 3 geliş şeklinde yapılır."
  },
  {
    id: 'f_m_36',
    difficulty: 'medium',
    points: 20,
    question: "Öğle namazının sünnetini kılarken, 2. rekatta oturduğumuzda sadece ne okunur?",
    options: ["Sadece Ettehiyyatü", "Ettehiyyatü, Salli ve Barik", "Sübhaneke", "Fatiha"],
    correctAnswer: "Sadece Ettehiyyatü",
    explanation: "Öğle namazının ilk sünneti (müekked sünnet) olduğu için ilk oturuşta sadece Ettehiyyatü okunur ve kalkılır."
  },
  {
    id: 'f_m_37',
    difficulty: 'medium',
    points: 20,
    question: "Faiz (Riba) alıp vermenin İslam'daki hükmü nedir?",
    options: ["Mekruh", "Haram", "Mübah", "Şüpheli"],
    correctAnswer: "Haram",
    explanation: "Faiz, Kuran-ı Kerim'de kesin ayetlerle haram kılınmış büyük günahlardandır."
  },
  {
    id: 'f_m_38',
    difficulty: 'medium',
    points: 20,
    question: "Namazda kıyamda (ayakta) iken elleri bağlamaya ne ad verilir?",
    options: ["İftitah", "Kıyam", "Kıraat", "Tekbir"],
    correctAnswer: "Kıyam",
    explanation: "Namazda ayakta durmaya Kıyam denir. (Soru metnindeki detay, duruş şeklidir, genel isim Kıyam'dır)."
  },
  {
    id: 'f_m_39',
    difficulty: 'medium',
    points: 20,
    question: "Erkeklerin Cuma namazına gitmesi için gereken şartlardan biri değildir?",
    options: ["Hür olmak", "Yolcu olmamak", "Sağlıklı olmak", "Zengin olmak"],
    correctAnswer: "Zengin olmak",
    explanation: "Cuma namazı için zenginlik şartı yoktur; fakir-zengin her mükellef erkeğe farzdır."
  },
  {
    id: 'f_m_40',
    difficulty: 'medium',
    points: 20,
    question: "Hangi durumlarda 'Mesh' üzerine mesh yapılmaz?",
    options: ["Süresi dolunca", "Ayaktan çıkınca", "İçine su girince", "Hepsi"],
    correctAnswer: "Hepsi",
    explanation: "Süresi dolan, ayaktan çıkan veya içine su giren mestin üzerine mesh yapılamaz; ayakların yıkanması gerekir."
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - 30 PUANLIK SORULAR
  // --------------------------------------------------------
  {
    id: 'f_h_1',
    difficulty: 'hard',
    points: 30,
    question: "Altın nisap miktarı (zekat verecek zenginlik sınırı) kaç gramdır?",
    options: ["80.18 gr", "96 gr", "561 gr", "100 gr"],
    correctAnswer: "80.18 gr",
    explanation: "Altının nisabı 20 miskaldir, bu da günümüzde yaklaşık 80.18 gram olarak kabul edilir."
  },
  {
    id: 'f_h_2',
    difficulty: 'hard',
    points: 30,
    question: "Namazda 'Tadil-i Erkan' (rükunları sakince yapmak) hükmü İmam Ebu Yusuf ve İmam Muhammed'e göre nedir?",
    options: ["Sünnet", "Müstehap", "Farz", "Vacip"],
    correctAnswer: "Farz",
    explanation: "İmameyn'e (Ebu Yusuf ve Muhammed) ve diğer üç mezhebe göre tadil-i erkan farzdır. Ebu Hanife'ye göre vaciptir."
  },
  {
    id: 'f_h_3',
    difficulty: 'hard',
    points: 30,
    question: "Cuma namazının şartlarından biri olan 'İzn-i Amm' ne demektir?",
    options: ["Caminin büyük olması", "Halka açık olması", "Devlet başkanının izni", "Hutbe okunması"],
    correctAnswer: "Halka açık olması",
    explanation: "İzn-i Amm, Cuma kılınacak yerin herkese açık olması, girişin engellenmemesi demektir."
  },
  {
    id: 'f_h_4',
    difficulty: 'hard',
    points: 30,
    question: "Hanefi mezhebine göre aşağıdakilerden hangisi abdesti bozmaz?",
    options: ["Kan akması", "Ağız dolusu kusmak", "Karşı cinse dokunmak", "Bayılmak"],
    correctAnswer: "Karşı cinse dokunmak",
    explanation: "Şafii mezhebinin aksine, Hanefi mezhebinde mahrem olmayan karşı cinse dokunmak abdesti bozmaz."
  },
  {
    id: 'f_h_5',
    difficulty: 'hard',
    points: 30,
    question: "Hacda ihramlı iken bir yasağın ihlali (örneğin saç kesmek) durumunda kesilen ceza kurbanına ne denir?",
    options: ["Hedy", "Dem", "Akika", "Bedene"],
    correctAnswer: "Dem",
    explanation: "İhram yasaklarından birinin ihlali durumunda 'Dem' (koyun veya keçi kesmek) gerekir."
  },
  {
    id: 'f_h_6',
    difficulty: 'hard',
    points: 30,
    question: "Bir malın ayıplı çıkması durumunda alıcının alışverişi bozma hakkına ne denir?",
    options: ["İkale", "Muhayyerlik", "Bey'i Fasit", "Murabaha"],
    correctAnswer: "Muhayyerlik",
    explanation: "Alışverişte malın kusurlu çıkması gibi durumlarda vazgeçme hakkına 'Muhayyerlik' denir."
  },
  {
    id: 'f_h_7',
    difficulty: 'hard',
    points: 30,
    question: "Aşağıdakilerden hangisi 'Avret-i Galiza' (Ağır Avret) sayılır?",
    options: ["Diz kapakları", "Göbek", "Ön ve arka uzuvlar", "Uyluk"],
    correctAnswer: "Ön ve arka uzuvlar",
    explanation: "Ön ve arka edep yerlerine Avret-i Galiza (ağır avret), diğer örtülmesi gereken yerlere Avret-i Hafife denir."
  },
  {
    id: 'f_h_8',
    difficulty: 'hard',
    points: 30,
    question: "Süt kardeşliğinin oluşması için Hanefi mezhebine göre ne kadar süt emmek yeterlidir?",
    options: ["Bir damla bile olsa", "5 defa doyasıya", "10 defa", "Bir öğün"],
    correctAnswer: "Bir damla bile olsa",
    explanation: "Hanefi mezhebine göre az veya çok (mideye ulaşan) bir damla süt bile haramlık (süt kardeşliği) oluşturur."
  },
  {
    id: 'f_h_9',
    difficulty: 'hard',
    points: 30,
    question: "Namazda 'Amel-i Kesir' (Çok Hareket) namazı bozar. Bunun temel ölçüsü nedir?",
    options: ["3 adım atmak", "Dışarıdan bakanın namazda olmadığını sanması", "Tek elle 3 hareket", "Konuşmak"],
    correctAnswer: "Dışarıdan bakanın namazda olmadığını sanması",
    explanation: "Amel-i kesir, dışarıdan bakan birinin, o kişinin namaz kılmadığına kanaat getireceği kadar çok hareket etmesidir."
  },
  {
    id: 'f_h_10',
    difficulty: 'hard',
    points: 30,
    question: "Zekatın farz olması için malın üzerinden bir kameri yıl geçmesi şartına ne denir?",
    options: ["Nisap", "Havelan-ı Havl", "Nemâ", "Asli İhtiyaç"],
    correctAnswer: "Havelan-ı Havl",
    explanation: "Zenginlik ölçüsüne ulaştıktan sonra o malın üzerinden bir tam kameri yılın geçmesine Havelan-ı Havl denir."
  },
  {
    id: 'f_h_11',
    difficulty: 'hard',
    points: 30,
    question: "Şafii mezhebine göre aşağıdakilerden hangisi abdesti bozar?",
    options: ["Kan akması", "Kusmak", "Mahrem olmayan kadına tenin değmesi", "Deve eti yemek"],
    correctAnswer: "Mahrem olmayan kadına tenin değmesi",
    explanation: "Şafii mezhebinde karşı cinse (mahrem olmayana) tenin doğrudan teması abdesti bozar."
  },
  {
    id: 'f_h_12',
    difficulty: 'hard',
    points: 30,
    question: "Sehiv secdesinde selam verildikten sonra tekrar oturulduğunda ne okunur?",
    options: ["Sadece Ettehiyyatü", "Sübhaneke", "Ettehiyyatü, Salli-Barik, Rabbena", "Fatiha"],
    correctAnswer: "Ettehiyyatü, Salli-Barik, Rabbena",
    explanation: "Sehiv secdesinden sonraki oturuş son oturuş olduğu için tüm dualar (Ettehiyyatü, Salli-Barik, Rabbena) okunur."
  },
  {
    id: 'f_h_13',
    difficulty: 'hard',
    points: 30,
    question: "Hangi durumlarda 'Kaza Namazı' kılınmaz?",
    options: ["Güneş doğarken (Kerahat vakti)", "İkindi namazından sonra", "Yatsıdan sonra", "Gece yarısı"],
    correctAnswer: "Güneş doğarken (Kerahat vakti)",
    explanation: "Güneş doğarken, batarken ve tam tepedeyken (kerahat vakitleri) hiçbir namaz kılınmaz."
  },
  {
    id: 'f_h_14',
    difficulty: 'hard',
    points: 30,
    question: "Oruç kefareti (60 gün) hangi durumda gerekir?",
    options: ["Bilerek yemek-içmek", "Unutarak yemek", "Hasta olmak", "Yolcu olmak"],
    correctAnswer: "Bilerek yemek-içmek",
    explanation: "Ramazan orucunu mazeretsiz ve bilerek bozan (yiyip-içen veya ilişkiye giren) kişiye kaza ile birlikte kefaret gerekir."
  },
  {
    id: 'f_h_15',
    difficulty: 'hard',
    points: 30,
    question: "Aşağıdakilerden hangisi Hanefi mezhebine göre deniz ürünlerinden helal değildir (Mekruhtur)?",
    options: ["Hamsi", "Levrek", "Midye", "Palamut"],
    correctAnswer: "Midye",
    explanation: "Hanefi mezhebine göre balık suretinde olmayan deniz ürünleri (midye, karides, kalamar vb.) tahrimen mekruhtur."
  },
  {
    id: 'f_h_16',
    difficulty: 'hard',
    points: 30,
    question: "Zekat verilecek gümüşün nisap miktarı kaç gramdır?",
    options: ["80 gr", "200 gr", "561 gr", "1000 gr"],
    correctAnswer: "561 gr",
    explanation: "Gümüşte nisap miktarı 200 dirhem, yani yaklaşık 561 gramdır."
  },
  {
    id: 'f_h_17',
    difficulty: 'hard',
    points: 30,
    question: "Hacda Arafat vakfesinin geçerli olması için en erken ne zaman orada bulunmak gerekir?",
    options: ["Arefe günü sabahı", "Arefe günü öğle (zeval) vaktinden sonra", "Arefe gecesi", "Bayram sabahı"],
    correctAnswer: "Arefe günü öğle (zeval) vaktinden sonra",
    explanation: "Vakfe zamanı Arefe günü zeval vaktinden bayram sabahı imsak vaktine kadardır."
  },
  {
    id: 'f_h_18',
    difficulty: 'hard',
    points: 30,
    question: "Namazda son oturuşta (Kade-i Ahire) oturmak ne kadar süreyle farzdır?",
    options: ["Bir dakika", "Ettehiyyatü okuyacak kadar", "Salli Barik okuyacak kadar", "Selam verene kadar"],
    correctAnswer: "Ettehiyyatü okuyacak kadar",
    explanation: "Son oturuşta Ettehiyyatü duasını okuyacak kadar beklemek namazın rükunlarından bir farzdır."
  },
  {
    id: 'f_h_19',
    difficulty: 'hard',
    points: 30,
    question: "Kuran okurken veya dinlerken secde ayeti geçince yapılan secdenin hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "Tilavet secdesi yapmak Hanefi mezhebine göre vaciptir."
  },
  {
    id: 'f_h_20',
    difficulty: 'hard',
    points: 30,
    question: "Cemaatle namazda, imama rükuda yetişen kişinin o rekatı kılmış sayılmasına ne denir?",
    options: ["Müdrik", "Lahik", "Mesbuk", "İdrak"],
    correctAnswer: "İdrak",
    explanation: "İmama rükuda yetişen ve imamla birlikte rüku yapabilen kişi o rekatı idrak etmiş (yakalamış) sayılır."
  },
  {
    id: 'f_h_21',
    difficulty: 'hard',
    points: 30,
    question: "Hangi namazın kazası sadece o günün kuşluk vaktine kadar yapılabilir?",
    options: ["Yatsı Namazı", "Vitir Namazı", "Sabah Namazının Sünneti", "Teravih Namazı"],
    correctAnswer: "Sabah Namazının Sünneti",
    explanation: "Sabah namazının sünneti, farzıyla birlikte kazaya kalmışsa, o günün öğle vaktinden önce (kuşluk vakti) kaza edilebilir. Başka zaman edilmez."
  },
  {
    id: 'f_h_22',
    difficulty: 'hard',
    points: 30,
    question: "İhramlı iken koku sürünmenin cezası nedir?",
    options: ["Kurban (Dem)", "Sadaka", "Oruç", "Tövbe"],
    correctAnswer: "Kurban (Dem)",
    explanation: "İhramlı iken bir organa tam olarak koku sürmek dem (koyun kesmeyi) gerektirir. Az sürülürse sadaka gerekir."
  },
  {
    id: 'f_h_23',
    difficulty: 'hard',
    points: 30,
    question: "Yemin kefaretinde 10 fakiri doyurma imkanı olmayan kişi ne yapar?",
    options: ["3 gün peş peşe oruç tutar", "Tövbe eder", "Kurban keser", "Sadaka verir"],
    correctAnswer: "3 gün peş peşe oruç tutar",
    explanation: "Maddi imkanı olmayan kişi yemin kefareti olarak 3 gün arka arkaya (ara vermeden) oruç tutar."
  },
  {
    id: 'f_h_24',
    difficulty: 'hard',
    points: 30,
    question: "Hangi durumda 'Teyemmüm' bozulur?",
    options: ["Güneş batınca", "Namaz bitince", "Su bulunup kullanma imkanı doğunca", "Ezanda"],
    correctAnswer: "Su bulunup kullanma imkanı doğunca",
    explanation: "Su bulunduğunda veya suyu kullanmaya engel hal kalktığında teyemmüm bozulur."
  },
  {
    id: 'f_h_25',
    difficulty: 'hard',
    points: 30,
    question: "Ticaret mallarının zekatı hangi değer üzerinden hesaplanır?",
    options: ["Alış fiyatı", "Satış fiyatı", "Maliyet fiyatı", "Devletin belirlediği fiyat"],
    correctAnswer: "Alış fiyatı",
    explanation: "Genel görüşe göre zekat hesaplanırken malın o günkü piyasa değeri veya maliyet/alış değeri esas alınır (İhtilaflı olsa da fetva genelde güncel değerdir, ancak fıkıh kitaplarında maliyet de geçer)."
  },
  {
    id: 'f_h_26',
    difficulty: 'hard',
    points: 30,
    question: "Kadınların özel hallerinde (hayız/nifas) terk ettikleri namaz ve oruçların durumu nedir?",
    options: ["İkisini de kaza ederler", "Namazı kaza eder, orucu etmezler", "Orucu kaza eder, namazı etmezler", "İkisi de affolunur"],
    correctAnswer: "Orucu kaza eder, namazı etmezler",
    explanation: "Hz. Aişe'den gelen rivayetle; kadınlar özel hallerinde tutamadıkları oruçları kaza ederler, ancak kılamadıkları namazları kaza etmezler (namazlar affolunur)."
  },
  {
    id: 'f_h_27',
    difficulty: 'hard',
    points: 30,
    question: "İmama sonradan yetişip, kaçırdığı rekatları imam selam verdikten sonra tamamlayan kişiye ne denir?",
    options: ["Müdrik", "Mesbuk", "Lahik", "Münferit"],
    correctAnswer: "Mesbuk",
    explanation: "İmama namazın başında yetişemeyip sonradan uyan ve imam selam verdikten sonra eksik rekatlarını tamamlayan kişiye Mesbuk denir."
  },
  {
    id: 'f_h_28',
    difficulty: 'hard',
    points: 30,
    question: "Kurban keserken hayvanın hangi damarlarının kesilmesi gerekir?",
    options: ["Sadece nefes borusu", "Yemek ve nefes borusu ile iki şah damarı", "Sadece şah damarları", "Omurilik"],
    correctAnswer: "Yemek ve nefes borusu ile iki şah damarı",
    explanation: "Kurbanın sahih olması için yemek borusu, nefes borusu ve iki şah damarından en az üçünün kesilmesi gerekir."
  },
  {
    id: 'f_h_29',
    difficulty: 'hard',
    points: 30,
    question: "Seferi namazı (kasr-ı salat) hükmü, gidilen yerde kaç günden az kalınacaksa geçerlidir?",
    options: ["3 gün", "10 gün", "15 gün", "40 gün"],
    correctAnswer: "15 gün",
    explanation: "Hanefi mezhebine göre, gidilen yerde 15 günden az kalınacaksa seferilik devam eder. 15 gün ve üzeri niyet edilirse mukim olunur."
  },
  {
    id: 'f_h_30',
    difficulty: 'hard',
    points: 30,
    question: "Aşağıdakilerden hangisi 'Müfsid' (İbadeti bozan) değildir?",
    options: ["Namazda konuşmak", "Oruçlu iken yemek", "Abdestli iken uyumak", "Namazda gülmek"],
    correctAnswer: "Abdestli iken uyumak",
    explanation: "Namazda konuşmak namazı bozar (müfsid), oruçlu yemek orucu bozar. Uyumak abdesti bozar ama 'müfsid' terimi genelde başlanmış bir ibadeti bozmak için kullanılır, abdest bir hazırlıktır."
  },
  {
    id: 'f_h_31',
    difficulty: 'hard',
    points: 30,
    question: "Hangi durumlarda 'İstibra' (İdrar sızıntısının kesilmesini bekleme) yapmak gerekir?",
    options: ["Büyük abdestten sonra", "Küçük abdestten sonra", "Gusülden sonra", "Uykudan sonra"],
    correctAnswer: "Küçük abdestten sonra",
    explanation: "Erkeklerin küçük abdestten sonra idrar yolunda kalan damlaların tamamen temizlenmesi için beklemesine ve temizlemesine İstibra denir."
  },
  {
    id: 'f_h_32',
    difficulty: 'hard',
    points: 30,
    question: "Kefenleme işleminde erkekler için sünnet olan parça sayısı kaçtır?",
    options: ["1", "2", "3", "5"],
    correctAnswer: "3",
    explanation: "Erkekler için sünnet olan kefen 3 parçadır (Kamis, İzar, Lifafe). Kadınlar için 5 parçadır."
  },
  {
    id: 'f_h_33',
    difficulty: 'hard',
    points: 30,
    question: "Zekatı verilmesi gereken hayvanlardan 'Saim' ne demektir?",
    options: ["Ahırda beslenen", "Yılın çoğunu otlakta otlayarak geçiren", "Ticaret için beslenen", "Yük taşıyan"],
    correctAnswer: "Yılın çoğunu otlakta otlayarak geçiren",
    explanation: "Saim hayvanlar, yılın yarısından fazlasını meralarda otlayarak geçiren hayvanlardır ve zekata tabidirler. Besi hayvanlarının (yemle beslenen) zekatı yoktur (ticaret malı değilse)."
  },
  {
    id: 'f_h_34',
    difficulty: 'hard',
    points: 30,
    question: "Bir kimsenin kendi isteğiyle, hiçbir zorlama olmadan İslam'dan çıkmasına ne denir?",
    options: ["Fıs", "Riddet (İrtidad)", "Nifak", "Küfran-ı Nimet"],
    correctAnswer: "Riddet (İrtidad)",
    explanation: "Müslüman birinin dinden dönmesine Riddet veya İrtidad denir, kişiye Mürted denir."
  },
  {
    id: 'f_h_35',
    difficulty: 'hard',
    points: 30,
    question: "Hangi namazda Fatiha'dan sonra 'Zamm-ı Sure' okunmaz?",
    options: ["Sabah namazının farzı", "Cenaze namazı", "Vitir namazı", "Öğle namazının farzının son 2 rekatı"],
    correctAnswer: "Öğle namazının farzının son 2 rekatı",
    explanation: "Farz namazların (3 ve 4 rekatlıların) son iki rekatında sadece Fatiha okunur, zamm-ı sure okunmaz (Sünnetlerde ise hepsinde okunur)."
  },
  {
    id: 'f_h_36',
    difficulty: 'hard',
    points: 30,
    question: "Oruç fidyesi veremeyecek kadar fakir olan kimse ne yapar?",
    options: ["Borç alır", "Allah'tan af diler (Tövbe eder)", "Kaza eder", "Çocuklarına ödetir"],
    correctAnswer: "Allah'tan af diler (Tövbe eder)",
    explanation: "Fidye verecek gücü olmayan fakir kimselerden fidye borcu düşer, Allah'tan af dilerler."
  },
  {
    id: 'f_h_37',
    difficulty: 'hard',
    points: 30,
    question: "Hangi durumda namaz bozulmaz?",
    options: ["Yönünü kıbleden çevirmek", "Namazda kendi işiteceği kadar gülmek", "Amel-i Kalil (Az hareket)", "Bir şey yiyip içmek"],
    correctAnswer: "Amel-i Kalil (Az hareket)",
    explanation: "Namazı bozmayacak kadar az harekete (örneğin kaşınmak, ter silmek) Amel-i Kalil denir, namazı bozmaz."
  },
  {
    id: 'f_h_38',
    difficulty: 'hard',
    points: 30,
    question: "Büyükbaş hayvan (Sığır/Manda) kurbanına en fazla kaç kişi ortak olabilir?",
    options: ["3", "5", "7", "10"],
    correctAnswer: "7",
    explanation: "Bir büyükbaş hayvana en fazla 7 kişi ortak olabilir. Küçükbaş sadece 1 kişi içindir."
  },
  {
    id: 'f_h_39',
    difficulty: 'hard',
    points: 30,
    question: "Haccın farzlarından olan 'Tavaf-ı Ziyaret' ne zaman yapılır?",
    options: ["Arife günü", "Bayram günlerinde", "Hactan dönünce", "İhrama girerken"],
    correctAnswer: "Bayram günlerinde",
    explanation: "Haccın rüknü olan Ziyaret Tavafı (Farz Tavaf), Bayramın 1. gününden itibaren yapılır."
  },
  {
    id: 'f_h_40',
    difficulty: 'hard',
    points: 30,
    question: "Abdestte başın mesh edilme miktarı Hanefi mezhebine göre ne kadardır?",
    options: ["Tamamı", "Dörtte biri", "Bir tel saç kadar", "Yarısı"],
    correctAnswer: "Dörtte biri",
    explanation: "Hanefi mezhebine göre başın en az dörtte birini mesh etmek farzdır. (Şafii'de az bir kısım yeterlidir, Maliki'de tamamıdır)."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - 40 PUANLIK SORULAR (UZMAN)
  // --------------------------------------------------------
  {
    id: 'f_x_1',
    difficulty: 'expert',
    points: 40,
    question: "Namazda 'Amel-i Kesir' (Çok Hareket) namazı bozar. Bunun temel ölçüsü nedir?",
    options: ["3 adım atmak", "Dışarıdan bakanın namazda olmadığını sanması", "Tek elle 3 hareket", "Konuşmak"],
    correctAnswer: "Dışarıdan bakanın namazda olmadığını sanması",
    explanation: "Amel-i kesir, dışarıdan bakan birinin, o kişinin namaz kılmadığına şüphe etmeyecek kadar kanaat getirmesidir."
  },
  {
    id: 'f_x_2',
    difficulty: 'expert',
    points: 40,
    question: "Hanefi fıkhında 'İmameyn' terimi hangi iki müçtehit için kullanılır?",
    options: ["Ebu Hanife ve Şafii", "Muhammed ve Züfer", "Ebu Yusuf ve İmam Muhammed", "Ebu Yusuf ve Züfer"],
    correctAnswer: "Ebu Yusuf ve İmam Muhammed",
    explanation: "İmameyn (İki İmam), Ebu Hanife'nin iki büyük öğrencisi Ebu Yusuf ve İmam Muhammed için kullanılır."
  },
  {
    id: 'f_x_3',
    difficulty: 'expert',
    points: 40,
    question: "İmam namaz kıldırırken abdesti bozulursa, cemaatten birini yerine geçirmesine ne ad verilir?",
    options: ["İstihlaf", "İkame", "İstibdal", "Tevekkül"],
    correctAnswer: "İstihlaf",
    explanation: "İmamın namaz içinde abdestinin bozulması gibi bir zaruret halinde arkasındaki cemaatten birini yerine geçirmesine 'İstihlaf' denir."
  },
  {
    id: 'f_x_4',
    difficulty: 'expert',
    points: 40,
    question: "Süt akrabalığının oluşması için Hanefi mezhebine göre gereken emme miktarı nedir?",
    options: ["Bir damla bile olsa", "5 defa doyasıya", "10 defa", "Bir öğün"],
    correctAnswer: "Bir damla bile olsa",
    explanation: "Hanefi mezhebine göre az veya çok (mideye ulaşan) bir damla süt bile süt kardeşliği (haramlık) oluşturur."
  },
  {
    id: 'f_x_5',
    difficulty: 'expert',
    points: 40,
    question: "Zekatın farz olması için malın üzerinden bir kameri yıl geçmesi şartına ne denir?",
    options: ["Nisap", "Havelan-ı Havl", "Nemâ", "Asli İhtiyaç"],
    correctAnswer: "Havelan-ı Havl",
    explanation: "Havelan-ı Havl, zenginlik ölçüsüne (nisap) ulaştıktan sonra o malın üzerinden bir tam kameri yılın geçmesidir."
  },
  {
    id: 'f_x_6',
    difficulty: 'expert',
    points: 40,
    question: "Bir kimsenin, hakkında açık hüküm bulunmayan bir konuda benzer bir meseledeki hükmü esas alarak hüküm vermesine ne denir?",
    options: ["İcma", "Kıyas", "İstihsan", "Örf"],
    correctAnswer: "Kıyas",
    explanation: "Kıyas, hakkında ayet veya hadis bulunmayan bir meseleyi, ortak illet (sebep) nedeniyle hükmü bilinen meseleye benzetmektir."
  },
  {
    id: 'f_x_7',
    difficulty: 'expert',
    points: 40,
    question: "Cuma namazının sıhhat şartlarından biri olan 'İzn-i Amm' ne demektir?",
    options: ["Caminin herkese açık olması", "Devlet başkanının izni", "Hutbe okunması", "Cemaat sayısı"],
    correctAnswer: "Caminin herkese açık olması",
    explanation: "İzn-i Amm, Cuma kılınacak yerin halka açık olması, herkesin serbestçe girebilmesi demektir."
  },
  {
    id: 'f_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Hanefi mezhebine göre deniz ürünlerinden hangisinin yenmesi helaldir?",
    options: ["Sadece balık suretinde olanlar", "Tüm deniz ürünleri", "Kabuklu deniz ürünleri", "Yılan balığı hariç hepsi"],
    correctAnswer: "Sadece balık suretinde olanlar",
    explanation: "Hanefi mezhebine göre deniz ürünlerinden sadece balık türleri helaldir. Midye, karides gibi balık suretinde olmayanlar tahrimen mekruhtur."
  },
  {
    id: 'f_x_9',
    difficulty: 'expert',
    points: 40,
    question: "Hac'da Arafat vakfesinin zamanı ne zaman başlar?",
    options: ["Arefe sabahı", "Arefe günü zeval vakti (öğle)", "Arefe akşamı", "Bayram sabahı"],
    correctAnswer: "Arefe günü zeval vakti (öğle)",
    explanation: "Arafat vakfesinin rükun olan süresi, Arefe günü öğle vaktinden (zeval) bayram sabahı imsak vaktine kadardır."
  },
  {
    id: 'f_x_10',
    difficulty: 'expert',
    points: 40,
    question: "Mudarebe ortaklığı ne demektir?",
    options: ["İki sermaye ortağı", "Birinden sermaye, diğerinden emek", "Tarımsal ortaklık", "Hayvan bakım ortaklığı"],
    correctAnswer: "Birinden sermaye, diğerinden emek",
    explanation: "Mudarebe, bir tarafın sermaye, diğer tarafın emek koyarak karı paylaşmak üzere kurduğu ortaklıktır."
  },
  {
    id: 'f_x_11',
    difficulty: 'expert',
    points: 40,
    question: "Namazda sehiv secdesi yapılması gereken bir durumda, imam selam verdikten sonra cemaatin durumu ne olur?",
    options: ["İmamla birlikte yaparlar", "Kendi başlarına yaparlar", "Namazları bozulur", "Yapmazlar"],
    correctAnswer: "İmamla birlikte yaparlar",
    explanation: "İmama uyan cemaat, imam sehiv secdesi gerektiren bir hata yaptığında ve secdesini yaptığında ona tabidir."
  },
  {
    id: 'f_x_12',
    difficulty: 'expert',
    points: 40,
    question: "Teyemmüm alırken elleri toprağa vurduktan sonra 'hilalleme' işlemi hangi organ için yapılır?",
    options: ["Kollar", "Yüz", "Parmak araları", "Ayaklar"],
    correctAnswer: "Parmak araları",
    explanation: "Teyemmümde parmak aralarının mesh edilmesi (hilallenmesi) gereklidir."
  },
  {
    id: 'f_x_13',
    difficulty: 'expert',
    points: 40,
    question: "Hac ibadetinde 'Şeytan Taşlama' (Remy-i Cimar) nerede yapılır?",
    options: ["Müzdelife", "Mina", "Arafat", "Safa"],
    correctAnswer: "Mina",
    explanation: "Şeytan taşlama görevi Mina bölgesindeki Cemerat denilen yerlerde yapılır."
  },
  {
    id: 'f_x_14',
    difficulty: 'expert',
    points: 40,
    question: "Vacip olan kurban çeşitlerinden 'Ceza Kurbanı' (Dem) ne zaman gerekir?",
    options: ["Adak adayınca", "Hac yasaklarını ihlal edince", "Zengin olunca", "Çocuk doğunca"],
    correctAnswer: "Hac yasaklarını ihlal edince",
    explanation: "Hac ve Umre ihram yasaklarından birini ihlal eden kişinin kestiği kurbana ceza kurbanı denir."
  },
  {
    id: 'f_x_15',
    difficulty: 'expert',
    points: 40,
    question: "Namazda secde ayeti okuyan imamın, hemen secdeye gidip kalkarak kıraate devam etmesine ne denir?",
    options: ["Rüku", "Tilavet Secdesi", "Sehiv", "Kunut"],
    correctAnswer: "Tilavet Secdesi",
    explanation: "Namaz içinde okunan secde ayetinden dolayı yapılan secdeye namaz içi tilavet secdesi denir."
  },
  {
    id: 'f_x_16',
    difficulty: 'expert',
    points: 40,
    question: "Zekat verilecek mallardan 'Rikaz' ne demektir?",
    options: ["Toprak ürünleri", "Define ve madenler", "Ticaret malları", "Hayvanlar"],
    correctAnswer: "Define ve madenler",
    explanation: "Yeraltından çıkan defineler ve madenlere Rikaz denir ve 1/5 oranında zekata (humus) tabidir."
  },
  {
    id: 'f_x_17',
    difficulty: 'expert',
    points: 40,
    question: "Seferi namazı (kasr-ı salat) hükmü, gidilen yerde kaç günden az kalınacaksa geçerlidir?",
    options: ["3 gün", "15 gün", "10 gün", "40 gün"],
    correctAnswer: "15 gün",
    explanation: "Hanefi mezhebine göre, gidilen yerde 15 günden az kalınacaksa seferilik devam eder."
  },
  {
    id: 'f_x_18',
    difficulty: 'expert',
    points: 40,
    question: "Kurban keserken hayvanın yemek ve nefes borusu ile iki şah damarından en az kaçının kesilmesi gerekir?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    explanation: "İmam-ı Azam'a göre bu dört borudan en az üçünün kesilmesi kurbanın helal olması için şarttır."
  },
  {
    id: 'f_x_19',
    difficulty: 'expert',
    points: 40,
    question: "Abdestte başın mesh edilme miktarı Şafii mezhebine göre ne kadardır?",
    options: ["Tamamı", "Dörtte biri", "Az bir kısmı yeterlidir", "Yarısı"],
    correctAnswer: "Az bir kısmı yeterlidir",
    explanation: "Şafii mezhebinde başın sınırları içinde az bir kısmına ıslak elle dokunmak farzı yerine getirir."
  },
  {
    id: 'f_x_20',
    difficulty: 'expert',
    points: 40,
    question: "Teşrik Tekbirleri (Allahu ekber Allahu ekber...) ne zaman başlar?",
    options: ["Arefe günü sabah namazı", "Bayram sabahı", "Bayram namazından sonra", "Arefe ikindisi"],
    correctAnswer: "Arefe günü sabah namazı",
    explanation: "Teşrik tekbirleri Arefe günü sabah namazından başlayıp, bayramın 4. günü ikindi namazına kadar 23 vakit sürer."
  },
  {
    id: 'f_x_21',
    difficulty: 'expert',
    points: 40,
    question: "Hangi durumda namaz 'Fasit' (Bozulmuş) olur?",
    options: ["Mekruh işleyince", "Şart veya rükun eksik olunca", "Sünneti terk edince", "Esnemekle"],
    correctAnswer: "Şart veya rükun eksik olunca",
    explanation: "Namazın farzlarından (şart veya rükun) biri eksik olursa veya namazı bozan bir durum olursa namaz fasit olur."
  },
  {
    id: 'f_x_22',
    difficulty: 'expert',
    points: 40,
    question: "Oruçlu iken 'İstimna' (Mastürbasyon) yapmanın hükmü nedir?",
    options: ["Orucu bozmaz", "Sadece kaza gerekir", "Kaza ve Kefaret gerekir", "Mekruhtur"],
    correctAnswer: "Sadece kaza gerekir",
    explanation: "İstimna orucu bozar, ancak cinsel ilişki gibi tam bir tatmin sayılmadığı için sadece kaza gerekir, kefaret gerekmez."
  },
  {
    id: 'f_x_23',
    difficulty: 'expert',
    points: 40,
    question: "Cenaze namazında Fatiha suresi hangi niyetle okunur?",
    options: ["Kıraat niyetiyle", "Dua niyetiyle", "Zikir niyetiyle", "Okunmaz"],
    correctAnswer: "Dua niyetiyle",
    explanation: "Hanefi mezhebinde cenaze namazında kıraat yoktur, Fatiha dua niyetiyle okunur."
  },
  {
    id: 'f_x_24',
    difficulty: 'expert',
    points: 40,
    question: "Bir malı veresiye (vadeli) satıp, fiyatı vadeye göre artırmak caiz midir?",
    options: ["Faizdir, haramdır", "Caizdir", "Mekruhtur", "Şüphelidir"],
    correctAnswer: "Caizdir",
    explanation: "Peşin ve vadeli fiyatın baştan belli olması şartıyla, vade farkı koyarak satış yapmak İslam hukukuna göre caizdir."
  },
  {
    id: 'f_x_25',
    difficulty: 'expert',
    points: 40,
    question: "İmama rükuda yetişen kişinin durumu nedir?",
    options: ["Rekatı kaçırmıştır", "Rekatı kılmış sayılır", "Sehiv secdesi yapar", "Namazı bozulur"],
    correctAnswer: "Rekatı kılmış sayılır",
    explanation: "İmam rükudan kalkmadan rükuya varıp en az bir kere 'Sübhanallah' diyecek kadar duran kişi o rekatı yakalamış sayılır."
  },
  {
    id: 'f_x_26',
    difficulty: 'expert',
    points: 40,
    question: "Sadece Cuma günü (başka gün eklemeden) oruç tutmanın hükmü nedir?",
    options: ["Haram", "Mekruh", "Sünnet", "Müstehap"],
    correctAnswer: "Mekruh",
    explanation: "Sadece Cuma veya sadece Cumartesi günü nafile oruç tutmak tenzihen mekruh görülmüştür."
  },
  {
    id: 'f_x_27',
    difficulty: 'expert',
    points: 40,
    question: "Kadının 'Hac' ibadetine gidebilmesi için yanında kimin bulunması şarttır (Seferi mesafesi için)?",
    options: ["Grup arkadaşı", "Rehber", "Mahremi (Eşi veya yakını)", "Devlet görevlisi"],
    correctAnswer: "Mahremi (Eşi veya yakını)",
    explanation: "Hanefi mezhebine göre seferi mesafesindeki yola gidecek kadının yanında eşi veya ebedi evlenemeyeceği bir mahremi bulunmalıdır."
  },
  {
    id: 'f_x_28',
    difficulty: 'expert',
    points: 40,
    question: "Unutarak cünüp sabahlayan ve güneş doğduktan sonra uyanan oruçlunun durumu nedir?",
    options: ["Orucu bozulur", "Orucu geçerlidir", "Kefaret gerekir", "Kaza gerekir"],
    correctAnswer: "Orucu geçerlidir",
    explanation: "Cünüp sabahlamak veya gün içinde ihtilam olmak oruca zarar vermez, hemen gusül abdesti alması gerekir."
  },
  {
    id: 'f_x_29',
    difficulty: 'expert',
    points: 40,
    question: "Tilavet secdesinde eller kaldırılıp tekbir getirilir mi?",
    options: ["Evet, getirilir", "Hayır, eller kaldırılmaz", "Sadece kalkarken", "İsteğe bağlı"],
    correctAnswer: "Hayır, eller kaldırılmaz",
    explanation: "Tilavet secdesine giderken 'Allahu Ekber' denir ancak namazdaki gibi eller kulaklara kaldırılmaz."
  },
  {
    id: 'f_x_30',
    difficulty: 'expert',
    points: 40,
    question: "Cemaatle namazda safların düzgün tutulmasının hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet-i Müekkede", "Müstehap"],
    correctAnswer: "Sünnet-i Müekkede",
    explanation: "Safların sık ve düzgün olması namazın tamamlayıcı sünnetlerindendir (Bazı alimler vacip demiştir)."
  },
  {
    id: 'f_x_31',
    difficulty: 'expert',
    points: 40,
    question: "Şevval ayında tutulan 6 gün orucu peş peşe tutmak şart mıdır?",
    options: ["Evet, şarttır", "Hayır, ayrı ayrı da tutulabilir", "Sadece pazartesi perşembe", "Bayramdan hemen sonra şarttır"],
    correctAnswer: "Hayır, ayrı ayrı da tutulabilir",
    explanation: "Şevval orucu peş peşe tutulabileceği gibi, ay içine yayılarak aralıklı da tutulabilir."
  },
  {
    id: 'f_x_32',
    difficulty: 'expert',
    points: 40,
    question: "Abdest alırken 'Tertip' (Sıraya uymak) hangi mezhepte farzdır?",
    options: ["Hanefi", "Şafii", "Hepsi", "Hiçbiri"],
    correctAnswer: "Şafii",
    explanation: "Şafii mezhebinde abdest organlarını ayetteki sıraya göre yıkamak (tertip) farzdır. Hanefi'de sünnettir."
  },
  {
    id: 'f_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Namazda 'Kavme' (Rükudan kalkınca dik durmak) ve 'Celse' (İki secde arası oturmak) hükmü nedir?",
    options: ["Sünnet", "Müstehap", "Tadil-i Erkandır (Vacip/Farz)", "Nafile"],
    correctAnswer: "Tadil-i Erkandır (Vacip/Farz)",
    explanation: "Rükudan doğrulmak ve iki secde arası tam oturmak Tadil-i Erkan kapsamındadır (Ebu Hanife'ye göre vacip, diğerlerine göre farz)."
  },
  {
    id: 'f_x_34',
    difficulty: 'expert',
    points: 40,
    question: "Hangi durumda 'Sehiv Secdesi' yapmak gerekmez?",
    options: ["Fatiha'yı terk edince", "Zamm-ı sureyi terk edince", "Sübhaneke'yi terk edince", "Vitirde kunutu unutunca"],
    correctAnswer: "Sübhaneke'yi terk edince",
    explanation: "Sübhaneke sünnet olduğu için terkedilmesi sehiv secdesi gerektirmez. Diğer şıklar vaciptir, sehiv gerektirir."
  },
  {
    id: 'f_x_35',
    difficulty: 'expert',
    points: 40,
    question: "Kurban eti Müslüman olmayan komşuya verilebilir mi?",
    options: ["Haramdır", "Mekruhtur", "Caizdir (Verilebilir)", "Sadece derisi verilir"],
    correctAnswer: "Caizdir (Verilebilir)",
    explanation: "Kurban etinden gayrimüslim komşulara ikram etmekte dinen bir sakınca yoktur, caizdir."
  },
  {
    id: 'f_x_36',
    difficulty: 'expert',
    points: 40,
    question: "Camiye girildiğinde kılınan 'Tahiyyetü'l-Mescid' namazının hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet", "Bidat"],
    correctAnswer: "Sünnet",
    explanation: "Mescidin selamlanması anlamına gelen bu namaz, kerahat vakti değilse kılınması sünnet olan bir namazdır."
  },
  {
    id: 'f_x_37',
    difficulty: 'expert',
    points: 40,
    question: "Fıtır sadakası (Fitre) kimler için vaciptir?",
    options: ["Sadece oruç tutanlar", "Nisap miktarı mala sahip olanlar", "Her Müslüman", "Sadece erkekler"],
    correctAnswer: "Nisap miktarı mala sahip olanlar",
    explanation: "Temel ihtiyaçları dışında nisap miktarı mala sahip olan her Müslümanın fitre vermesi vaciptir (Hanefi)."
  },
  {
    id: 'f_x_38',
    difficulty: 'expert',
    points: 40,
    question: "Namazda 'Subhane Rabbiyel Azim' yerine yanlışlıkla 'Subhane Rabbiyel A'la' denirse ne gerekir?",
    options: ["Namaz bozulur", "Sehiv secdesi", "Namazı iade", "Bir şey gerekmez"],
    correctAnswer: "Bir şey gerekmez",
    explanation: "Rüku ve secdedeki tesbihatlar sünnet olduğu için yanlış söylenmesi sehiv secdesi gerektirmez."
  },
  {
    id: 'f_x_39',
    difficulty: 'expert',
    points: 40,
    question: "İhramdan çıkmak için saçların kesilmesine veya kısaltılmasına ne denir?",
    options: ["Halk ve Taksir", "Vakfe", "İhsar", "Tavaf"],
    correctAnswer: "Halk ve Taksir",
    explanation: "Saçların tamamen kazıtılmasına Halk, kısaltılmasına Taksir denir."
  },
  {
    id: 'f_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Cenaze namazının rükunları nelerdir?",
    options: ["Kıyam ve 4 Tekbir", "Kıyam ve Secde", "Tekbir ve Selam", "Niyet ve Fatiha"],
    correctAnswer: "Kıyam ve 4 Tekbir",
    explanation: "Cenaze namazının rükunları (içindeki farzlar) Kıyam (ayakta durmak) ve 4 Tekbirdir."
  } 
    ]
  },
  kuran: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-40) - KURAN KÜLTÜRÜ (10 PUAN)
  // --------------------------------------------------------
  {
    id: 'k_e_1',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'de toplam kaç sure vardır?",
    options: ["99", "110", "114", "120"],
    correctAnswer: "114",
    explanation: "Kuran-ı Kerim, Fatiha ile başlayıp Nas suresi ile biten toplam 114 sureden oluşur."
  },
  {
    id: 'k_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in ilk inen ayetleri hangi surededir?",
    options: ["Fatiha", "Bakara", "Alak", "Yasin"],
    correctAnswer: "Alak",
    explanation: "İlk vahiy, Alak suresinin ilk 5 ayetidir ve 'Oku' (İkra) emriyle başlar."
  },
  {
    id: 'k_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim hangi ayda indirilmeye başlanmıştır?",
    options: ["Recep", "Şaban", "Ramazan", "Muharrem"],
    correctAnswer: "Ramazan",
    explanation: "Kuran-ı Kerim, bin aydan daha hayırlı olan Kadir Gecesi'nin içinde bulunduğu Ramazan ayında inmeye başlamıştır."
  },
  {
    id: 'k_e_4',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim kaç cüzden oluşur?",
    options: ["10", "20", "30", "40"],
    correctAnswer: "30",
    explanation: "Kuran-ı Kerim, her biri 20 sayfadan oluşan 30 cüzdür."
  },
  {
    id: 'k_e_5',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in en uzun suresi hangisidir?",
    options: ["Bakara", "Ali İmran", "Nisa", "Maide"],
    correctAnswer: "Bakara",
    explanation: "Bakara suresi 286 ayet ile Kuran'ın en uzun suresidir."
  },
  {
    id: 'k_e_6',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in en kısa suresi hangisidir?",
    options: ["İhlas", "Nas", "Asr", "Kevser"],
    correctAnswer: "Kevser",
    explanation: "Kevser suresi 3 ayettir ve Kuran'ın en kısa suresidir."
  },
  {
    id: 'k_e_7',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in 'Kalbi' olarak nitelendirilen sure hangisidir?",
    options: ["Mülk", "Yasin", "Rahman", "Fetih"],
    correctAnswer: "Yasin",
    explanation: "Peygamber Efendimiz (s.a.v.) 'Her şeyin bir kalbi vardır, Kuran'ın kalbi de Yasin'dir' buyurmuştur."
  },
  {
    id: 'k_e_8',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in baştan sona okunup bitirilmesine ne denir?",
    options: ["Hatim", "Hafız", "Tefsir", "Meal"],
    correctAnswer: "Hatim",
    explanation: "Kuran'ı Fatiha'dan başlayıp Nas suresine kadar okuyup bitirmeye Hatim denir."
  },
  {
    id: 'k_e_9',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'i ezbere bilen kişiye ne denir?",
    options: ["Hacı", "Hoca", "Hafız", "Müezzin"],
    correctAnswer: "Hafız",
    explanation: "Kuran-ı Kerim'in tamamını ezberleyen kişilere Hafız denir."
  },
  {
    id: 'k_e_10',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim hangi melekle vahdedilmiştir (indirilmiştir)?",
    options: ["Azrail", "Mikail", "İsrafil", "Cebrail"],
    correctAnswer: "Cebrail",
    explanation: "Vahiy meleği Cebrail (a.s), Allah'ın kelamını Peygamberimize iletmiştir."
  },
  {
    id: 'k_e_11',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in ilk suresi (kitabın başı) hangisidir?",
    options: ["Bakara", "Fatiha", "Yasin", "Alak"],
    correctAnswer: "Fatiha",
    explanation: "Mushaf tertibine göre Kuran'ın ilk suresi Fatiha suresidir."
  },
  {
    id: 'k_e_12',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in son suresi hangisidir?",
    options: ["İhlas", "Felak", "Nas", "Fatiha"],
    correctAnswer: "Nas",
    explanation: "Mushaf tertibine göre Kuran'ın 114. ve son suresi Nas suresidir."
  },
  {
    id: 'k_e_13',
    difficulty: 'easy',
    points: 10,
    question: "Besmele çekilmeyen tek sure hangisidir?",
    options: ["Tevbe", "Naml", "Yasin", "Mülk"],
    correctAnswer: "Tevbe",
    explanation: "Tevbe suresinin başında Besmele (Bismillahirrahmanirrahim) bulunmaz."
  },
  {
    id: 'k_e_14',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in indirildiği gece hangisidir?",
    options: ["Miraç Gecesi", "Berat Gecesi", "Kadir Gecesi", "Regaip Gecesi"],
    correctAnswer: "Kadir Gecesi",
    explanation: "Kuran-ı Kerim Ramazan ayı içindeki Kadir Gecesi'nde indirilmeye başlanmıştır."
  },
  {
    id: 'k_e_15',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim kaç yılda tamamlanmıştır?",
    options: ["10", "13", "23", "40"],
    correctAnswer: "23",
    explanation: "Kuran-ı Kerim, 13 yılı Mekke ve 10 yılı Medine dönemi olmak üzere yaklaşık 23 yılda tamamlanmıştır."
  },
  {
    id: 'k_e_16',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in en büyük ayeti olan 'Ayetel Kürsi' hangi surededir?",
    options: ["Fatiha", "Bakara", "Ali İmran", "Yasin"],
    correctAnswer: "Bakara",
    explanation: "Ayetel Kürsi, Bakara suresinin 255. ayetidir."
  },
  {
    id: 'k_e_17',
    difficulty: 'easy',
    points: 10,
    question: "Kuran'ın her cümlesine/ifadesine ne ad verilir?",
    options: ["Sure", "Cüz", "Ayet", "Hizb"],
    correctAnswer: "Ayet",
    explanation: "Kuran'ın surelerini oluşturan her bir cümlesine Ayet denir."
  },
  {
    id: 'k_e_18',
    difficulty: 'easy',
    points: 10,
    question: "Ayetlerden oluşan bölümlere ne ad verilir?",
    options: ["Sure", "Cüz", "Sayfa", "Durak"],
    correctAnswer: "Sure",
    explanation: "Kuran'ın ayetlerden oluşan 114 bölümünün her birine Sure denir."
  },
  {
    id: 'k_e_19',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim hangi dilde indirilmiştir?",
    options: ["Türkçe", "Farsça", "Arapça", "İbranice"],
    correctAnswer: "Arapça",
    explanation: "Kuran-ı Kerim, Peygamberimizin ve o toplumun dili olan Arapça olarak indirilmiştir."
  },
  {
    id: 'k_e_20',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan ayında Kuran'ın karşılıklı okunmasına ne denir?",
    options: ["Mukabele", "Mevlit", "İlahi", "Sohbet"],
    correctAnswer: "Mukabele",
    explanation: "Bir kişinin okuyup diğerlerinin takip etmesi şeklinde yapılan okumaya Mukabele denir. Cebrail (a.s) ile Peygamberimizin sünnetidir."
  },
  {
    id: 'k_e_21',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'de ismi geçen tek kadın kimdir?",
    options: ["Hz. Hatice", "Hz. Aişe", "Hz. Meryem", "Hz. Fatıma"],
    correctAnswer: "Hz. Meryem",
    explanation: "Kuran'da ismi zikredilen tek kadın Hz. İsa'nın annesi Hz. Meryem'dir ve adına sure vardır."
  },
  {
    id: 'k_e_22',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'i kitap haline (iki kapak arasına) getiren halife kimdir?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Yemame savaşında hafızların şehit olması üzerine Hz. Ebubekir döneminde Kuran toplanıp kitap (Mushaf) haline getirilmiştir."
  },
  {
    id: 'k_e_23',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'i çoğaltarak şehirlere gönderen halife kimdir?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
    correctAnswer: "Hz. Osman",
    explanation: "Hz. Osman döneminde Kuran nüshaları çoğaltılarak önemli İslam merkezlerine gönderilmiştir."
  },
  {
    id: 'k_e_24',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in kurallarına uygun, güzelce okunmasını sağlayan ilme ne denir?",
    options: ["Fıkıh", "Hadis", "Tecvid", "Kelam"],
    correctAnswer: "Tecvid",
    explanation: "Kuran harflerinin hakkını vererek, usulüne uygun okuma kurallarına Tecvid denir."
  },
  {
    id: 'k_e_25',
    difficulty: 'easy',
    points: 10,
    question: "'İhlas' suresinin konusu nedir?",
    options: ["Namaz", "Oruç", "Allah'ın birliği (Tevhid)", "Hac"],
    correctAnswer: "Allah'ın birliği (Tevhid)",
    explanation: "İhlas suresi ('Kul hüvallâhü ehad'), Allah'ın birliğini, doğmadığını ve doğurmadığını anlatır."
  },
  {
    id: 'k_e_26',
    difficulty: 'easy',
    points: 10,
    question: "İlk vahiy nerede gelmiştir?",
    options: ["Kabe'de", "Hira Mağarası'nda", "Sevr Mağarası'nda", "Medine'de"],
    correctAnswer: "Hira Mağarası'nda",
    explanation: "İlk vahiy, Mekke yakınlarındaki Nur Dağı'nda bulunan Hira Mağarası'nda gelmiştir."
  },
  {
    id: 'k_e_27',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in kitap haline getirilmiş ismine ne denir?",
    options: ["Furkan", "Mushaf", "Zikir", "Burhan"],
    correctAnswer: "Mushaf",
    explanation: "Kuran'ın iki kapak arasında toplanmış kitap haline Mushaf denir."
  },
  {
    id: 'k_e_28',
    difficulty: 'easy',
    points: 10,
    question: "'Fatiha' kelimesinin anlamı nedir?",
    options: ["Kapanış", "Açılış/Başlangıç", "Dua", "Şifa"],
    correctAnswer: "Açılış/Başlangıç",
    explanation: "Fatiha, 'Açan, Başlangıç' anlamına gelir çünkü Kuran onunla başlar."
  },
  {
    id: 'k_e_29',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'de kaç tane 'Besmele' vardır?",
    options: ["113", "114", "115", "120"],
    correctAnswer: "114",
    explanation: "Tevbe suresinin başında besmele yoktur ancak Naml suresinde iki besmele vardır (başta ve 30. ayette). Toplam 114 tanedir."
  },
  {
    id: 'k_e_30',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'de en çok ismi geçen peygamber kimdir?",
    options: ["Hz. Muhammed", "Hz. İbrahim", "Hz. Musa", "Hz. İsa"],
    correctAnswer: "Hz. Musa",
    explanation: "Kuran-ı Kerim'de mücadelesi en çok anlatılan ve ismi en çok geçen (136 defa) peygamber Hz. Musa'dır."
  },
  {
    id: 'k_e_31',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın (c.c.) güzel isimlerine ne denir?",
    options: ["Esmaü'l Hüsna", "Kelime-i Tevhid", "Sıfat-ı Subutiye", "Zati Sıfatlar"],
    correctAnswer: "Esmaü'l Hüsna",
    explanation: "Allah'ın en güzel isimlerine Esmaü'l Hüsna denir."
  },
  {
    id: 'k_e_32',
    difficulty: 'easy',
    points: 10,
    question: "'Elhamdülillah' ne demektir?",
    options: ["Allah büyüktür", "Allah'a hamd (şükür) olsun", "Allah'tan başka ilah yoktur", "Allah her şeyi bilir"],
    correctAnswer: "Allah'a hamd (şükür) olsun",
    explanation: "Fatiha suresinin başında geçen Elhamdülillah, 'Hamd Allah'a mahsustur' demektir."
  },
  {
    id: 'k_e_33',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in 'üçte birine' denk olduğu hadislerde belirtilen sure hangisidir?",
    options: ["Fatiha", "Yasin", "İhlas", "Mülk"],
    correctAnswer: "İhlas",
    explanation: "Peygamberimiz (s.a.v), İhlas suresini okumanın Kuran'ın üçte birini okumaya denk olduğunu belirtmiştir."
  },
  {
    id: 'k_e_34',
    difficulty: 'easy',
    points: 10,
    question: "Kuran'ın indiriliş amacı nedir?",
    options: ["Sadece ezberlemek", "Mezarlıklarda okumak", "Anlayıp hayatı ona göre yaşamak", "Duvara asmak"],
    correctAnswer: "Anlayıp hayatı ona göre yaşamak",
    explanation: "Kuran'ın asıl indirilme amacı insanlara rehberlik etmek, doğru yolu göstermek ve yaşanmaktır."
  },
  {
    id: 'k_e_35',
    difficulty: 'easy',
    points: 10,
    question: "Bir cüz kaç sayfadır (standart hatlarda)?",
    options: ["10", "20", "30", "40"],
    correctAnswer: "20",
    explanation: "Standart Kuran tertibinde her cüz 20 sayfadan oluşur."
  },
  {
    id: 'k_e_36',
    difficulty: 'easy',
    points: 10,
    question: "'Mümin' ne demektir?",
    options: ["İnanan", "İnkar eden", "Ortak koşan", "Münafık"],
    correctAnswer: "İnanan",
    explanation: "Allah'a ve Peygamberine gönülden inanan kimseye Mümin denir."
  },
  {
    id: 'k_e_37',
    difficulty: 'easy',
    points: 10,
    question: "Kuran okumaya başlarken ne söylenir?",
    options: ["Sadece Besmele", "Euzü Besmele", "Sübhaneke", "Kelime-i Şehadet"],
    correctAnswer: "Euzü Besmele",
    explanation: "Kuran okumaya başlarken 'Euzübillahimineşşeytanirracim Bismillahirrahmanirrahim' (İstiaze ve Besmele) çekilir."
  },
  {
    id: 'k_e_38',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim hangi iki peygamberin kıssasından çokça bahseder?",
    options: ["Musa ve Harun", "Yusuf ve Yakup", "İsa ve Yahya", "Hepsi"],
    correctAnswer: "Hepsi",
    explanation: "Kuran'da birçok peygamberin kıssası anlatılır; Musa-Harun, Yusuf-Yakup, İsa-Yahya bunlardan bazılarıdır."
  },
  {
    id: 'k_e_39',
    difficulty: 'easy',
    points: 10,
    question: "'Şifa Ayetleri' hangi kitaptadır?",
    options: ["Tevrat", "Zebur", "İncil", "Kuran-ı Kerim"],
    correctAnswer: "Kuran-ı Kerim",
    explanation: "Müminler için şifa ve rahmet kaynağı olan ayetler Kuran-ı Kerim'dedir."
  },
  {
    id: 'k_e_40',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in diğer ilahi kitaplardan (Tevrat, İncil, Zebur) en önemli farkı nedir?",
    options: ["Arapça olması", "Son kitap olması ve değişmemiş olması", "Uzun olması", "Kısa olması"],
    correctAnswer: "Son kitap olması ve değişmemiş olması",
    explanation: "Kuran son ilahi kitaptır ve Allah tarafından korunduğu için günümüze kadar değişmeden gelmiştir."
  },
  // --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - KURAN KÜLTÜRÜ (20 PUAN)
  // --------------------------------------------------------
  {
    id: 'k_m_1',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Besmele' ile başlamayan tek sure hangisidir?",
    options: ["Tevbe", "Enfal", "Muhammed", "Yasin"],
    correctAnswer: "Tevbe",
    explanation: "Tevbe suresi, müşriklere ültimatom ve savaş ilanı içerdiği için rahmet ifadesi olan Besmele ile başlamaz."
  },
  {
    id: 'k_m_2',
    difficulty: 'medium',
    points: 20,
    question: "Hangi surenin her ayetinde 'Allah' lafzı geçer?",
    options: ["Mücadele", "Mülk", "Haşr", "Cuma"],
    correctAnswer: "Mücadele",
    explanation: "Mücadele suresinin 22 ayetinin tamamında Allah lafzı geçmektedir."
  },
  {
    id: 'k_m_3',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de iki defa 'Besmele' geçen sure hangisidir?",
    options: ["Naml", "Nahl", "Nur", "Necm"],
    correctAnswer: "Naml",
    explanation: "Naml suresinin hem başında hem de 30. ayetinde (Hz. Süleyman'ın mektubunda) Besmele geçer."
  },
  {
    id: 'k_m_4',
    difficulty: 'medium',
    points: 20,
    question: "'Mekki' surelerin genel özelliği nedir?",
    options: ["İbadet ve ahlak ağırlıklıdır", "Hukuk (Ahkam) ağırlıklıdır", "Uzun surelerdir", "Medine'de inmiştir"],
    correctAnswer: "İbadet ve ahlak ağırlıklıdır",
    explanation: "Mekke döneminde inen sureler genellikle iman, tevhid, ahiret ve ahlak konularını işler."
  },
  {
    id: 'k_m_5',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Ashab-ı Kehf' (Mağara Arkadaşları) kıssası hangi surededir?",
    options: ["Kehf", "Meryem", "Taha", "Yasin"],
    correctAnswer: "Kehf",
    explanation: "İnançlarını korumak için mağaraya sığınan gençlerin kıssası Kehf suresinde anlatılır."
  },
  {
    id: 'k_m_6',
    difficulty: 'medium',
    points: 20,
    question: "Kuran'da 'Ümmü'l Kitap' (Kitabın Anası) olarak isimlendirilen sure hangisidir?",
    options: ["Fatiha", "Bakara", "Yasin", "Rahman"],
    correctAnswer: "Fatiha",
    explanation: "Fatiha suresi, Kuran'ın özeti mahiyetinde olduğu için 'Ümmü'l Kitap' olarak anılır."
  },
  {
    id: 'k_m_7',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de ismi geçen tek sahabi (Peygamberimizin arkadaşı) kimdir?",
    options: ["Hz. Zeyd b. Harise", "Hz. Ebubekir", "Hz. Ömer", "Hz. Ali"],
    correctAnswer: "Hz. Zeyd b. Harise",
    explanation: "Ahzab suresi 37. ayette Hz. Zeyd'in ismi açıkça zikredilmiştir."
  },
  {
    id: 'k_m_8',
    difficulty: 'medium',
    points: 20,
    question: "Ayetel Kürsi, hangi surenin bir ayetidir?",
    options: ["Bakara", "Ali İmran", "Nisa", "Maide"],
    correctAnswer: "Bakara",
    explanation: "Ayetel Kürsi, Bakara suresinin 255. ayetidir ve Allah'ın kürsüsünü (gücünü/hakimiyetini) anlatır."
  },
  {
    id: 'k_m_9',
    difficulty: 'medium',
    points: 20,
    question: "Hangi sureye 'Kuran'ın Gelini' (Arûsü'l-Kuran) denilmiştir?",
    options: ["Rahman", "Yasin", "Vakıa", "Mülk"],
    correctAnswer: "Rahman",
    explanation: "Peygamber Efendimiz (s.a.v), 'Her şeyin bir gelini (süsü) vardır, Kuran'ın gelini de Rahman suresidir' buyurmuştur."
  },
  {
    id: 'k_m_10',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Muavvizeteyn' (İki Sığınma Suresi) olarak bilinen sureler hangileridir?",
    options: ["Felak ve Nas", "İhlas ve Fatiha", "Kafirun ve Nasr", "Asr ve Kevser"],
    correctAnswer: "Felak ve Nas",
    explanation: "Felak ve Nas sureleri, kötülüklerden Allah'a sığınmayı öğrettiği için Muavvizeteyn denir."
  },
  {
    id: 'k_m_11',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'in toplanıp kitap haline getirilmesi (Cem edilmesi) hangi halife döneminde olmuştur?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Yemame Savaşı'nda hafızların şehit olması üzerine Hz. Ömer'in teklifiyle Hz. Ebubekir döneminde Kuran kitaplaştırıldı."
  },
  {
    id: 'k_m_12',
    difficulty: 'medium',
    points: 20,
    question: "Kuran nüshalarının çoğaltılarak (İstinsah) şehirlere dağıtılması hangi halife döneminde yapıldı?",
    options: ["Hz. Osman", "Hz. Ebubekir", "Hz. Ömer", "Hz. Ali"],
    correctAnswer: "Hz. Osman",
    explanation: "Hz. Osman döneminde lehçe farklılıklarını önlemek için Kuran nüshaları çoğaltılıp merkezlere gönderildi."
  },
  {
    id: 'k_m_13',
    difficulty: 'medium',
    points: 20,
    question: "'Ahsenü'l Kasas' (Kıssaların en güzeli) ifadesi Kuran'da hangi kıssa için kullanılır?",
    options: ["Hz. Yusuf", "Hz. Musa", "Hz. İbrahim", "Hz. İsa"],
    correctAnswer: "Hz. Yusuf",
    explanation: "Yusuf suresinde anlatılan Hz. Yusuf'un kıssası, Kuran'da 'kıssaların en güzeli' olarak nitelendirilir."
  },
  {
    id: 'k_m_14',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Zülkarneyn' (İki boynuz/zaman sahibi) kıssası hangi surededir?",
    options: ["Kehf", "Enbiya", "Müminun", "Sad"],
    correctAnswer: "Kehf",
    explanation: "Doğuya ve batıya hükmeden Zülkarneyn a.s.'ın kıssası Kehf suresinde geçer."
  },
  {
    id: 'k_m_15',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de kaç tane 'Secde Ayeti' (okununca secde edilmesi gereken ayet) vardır?",
    options: ["14", "10", "40", "114"],
    correctAnswer: "14",
    explanation: "Kuran-ı Kerim'de okunduğunda veya duyulduğunda tilavet secdesi yapılması gereken 14 ayet vardır."
  },
  {
    id: 'k_m_16',
    difficulty: 'medium',
    points: 20,
    question: "Hangi sure, Peygamber Efendimizin (s.a.v) vefatının yaklaştığını işaret etmiştir?",
    options: ["Nasr", "Kevser", "İhlas", "Fatiha"],
    correctAnswer: "Nasr",
    explanation: "Nasr suresi ('İzâ câe nasrullah...'), İslam'ın zaferini ve insanların fevç fevç dine girdiğini müjdelerken, Peygamberimizin görevinin bittiğine işaret etmiştir."
  },
  {
    id: 'k_m_17',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Ölüden diriyi, diriden ölüyü çıkaran' kudret sahibi kimdir?",
    options: ["Allah (c.c.)", "Hz. İsa", "Hz. Musa", "Cebrail"],
    correctAnswer: "Allah (c.c.)",
    explanation: "Ali İmran suresi 27. ayette 'Ölüden diriyi çıkarırsın, diriden de ölüyü çıkarırsın' buyurularak Allah'ın kudreti anlatılır."
  },
  {
    id: 'k_m_18',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Hâ-Mîm' (Huruf-u Mukatta) ile başlayan kaç sure vardır?",
    options: ["7", "5", "3", "10"],
    correctAnswer: "7",
    explanation: "Mümin, Fussilet, Şura, Zuhruf, Duhan, Casiye ve Ahkaf sureleri 'Hâ-Mîm' ile başlar (Hâ-Mîm ailesi)."
  },
  {
    id: 'k_m_19',
    difficulty: 'medium',
    points: 20,
    question: "Peygamber Efendimizin (s.a.v) 'Beni yaşlandırdı' dediği surelerden biri hangisidir?",
    options: ["Hud", "Yasin", "Mülk", "Kevser"],
    correctAnswer: "Hud",
    explanation: "Peygamberimiz, 'Hud suresi ve kardeşleri (Vakıa, Mürselat vb.) beni ihtiyarlattı' buyurmuştur. (Özellikle 'Emrolunduğun gibi dosdoğru ol' ayeti)."
  },
  {
    id: 'k_m_20',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de Firavun'un cesedinin ibret için korunacağı hangi surededir?",
    options: ["Yunus", "Taha", "Kasas", "Araf"],
    correctAnswer: "Yunus",
    explanation: "Yunus suresi 92. ayette 'Bugün senin bedenini kurtaracağız ki, arkandan gelenlere bir ibret olasın' buyurulmuştur."
  },
  {
    id: 'k_m_21',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Ebter' (Soyu kesik) ifadesine cevap veren sure hangisidir?",
    options: ["Kevser", "İhlas", "Tebbet", "Fil"],
    correctAnswer: "Kevser",
    explanation: "Müşriklerin Peygamberimize 'soyu kesik' demesi üzerine Kevser suresi inmiş, asıl soyu kesik olanların onlar olduğu belirtilmiştir."
  },
  {
    id: 'k_m_22',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de adı geçen 'Lokman Hekim' kimdir?",
    options: ["Salih bir kul / Bilge kişi", "Peygamber", "Melek", "Cin"],
    correctAnswer: "Salih bir kul / Bilge kişi",
    explanation: "Lokman Hekim'in peygamber mi veli mi olduğu tartışmalı olsa da, çoğunlukla hikmet sahibi salih bir kul olduğu kabul edilir."
  },
  {
    id: 'k_m_23',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Cihad' kelimesinin kök anlamı nedir?",
    options: ["Gayret etmek / Çabalamak", "Savaşmak", "Öldürmek", "Hicret etmek"],
    correctAnswer: "Gayret etmek / Çabalamak",
    explanation: "Cihad, sözlükte 'cehd etmek', yani bütün gücünü harcayarak çalışmak, gayret etmek demektir."
  },
  {
    id: 'k_m_24',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Ruhü'l Kudüs' (Kutsal Ruh) ile kastedilen kimdir?",
    options: ["Cebrail (a.s)", "Hz. İsa", "Mikail (a.s)", "Hz. Muhammed (s.a.v)"],
    correctAnswer: "Cebrail (a.s)",
    explanation: "Kuran'da Ruhü'l Kudüs ifadesi Cebrail (a.s) için kullanılır."
  },
  {
    id: 'k_m_25',
    difficulty: 'medium',
    points: 20,
    question: "'Asr' suresinde insanın ziyanda olduğu, ancak kimlerin kurtulduğu belirtilir?",
    options: ["İman edip salih amel işleyenler", "Zengin olanlar", "Çok ibadet edenler", "Hacca gidenler"],
    correctAnswer: "İman edip salih amel işleyenler",
    explanation: "Asr suresinde; iman edenler, salih amel işleyenler, hakkı ve sabrı tavsiye edenlerin ziyanda olmadığı belirtilir."
  },
  {
    id: 'k_m_26',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Hatemü'l Enbiya' (Peygamberlerin Sonuncusu) ifadesi hangi surede geçer?",
    options: ["Ahzab", "Muhammed", "Fetih", "Alak"],
    correctAnswer: "Ahzab",
    explanation: "Ahzab suresi 40. ayette Hz. Muhammed'in (s.a.v) Allah'ın Resulü ve peygamberlerin sonuncusu olduğu belirtilir."
  },
  {
    id: 'k_m_27',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Şeytanın adımlarına uymayın' uyarısı neden yapılır?",
    options: ["O apaçık bir düşmandır", "O çok güçlüdür", "O görünmezdir", "O ateşten yaratılmıştır"],
    correctAnswer: "O apaçık bir düşmandır",
    explanation: "Kuran'da birçok ayette 'Şeytanın adımlarına uymayın, çünkü o sizin için apaçık bir düşmandır' buyurulur."
  },
  {
    id: 'k_m_28',
    difficulty: 'medium',
    points: 20,
    question: "Hangi surede 'Ebu Leheb' ve eşinin helak olacağı bildirilir?",
    options: ["Tebbet", "Fil", "Maun", "Kureyş"],
    correctAnswer: "Tebbet",
    explanation: "Tebbet suresi, Peygamberimizin amcası Ebu Leheb'in ellerinin kuruyacağını ve helak olacağını bildirir."
  },
  {
    id: 'k_m_29',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Oruç' hangi ayetle farz kılınmıştır?",
    options: ["Bakara 183", "Nisa 40", "Maide 5", "Enfal 1"],
    correctAnswer: "Bakara 183",
    explanation: "Bakara suresi 183. ayet: 'Ey iman edenler! Oruç sizden öncekilere farz kılındığı gibi size de farz kılındı...'"
  },
  {
    id: 'k_m_30',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Allah'ın Arslanı' olarak bilinen sahabi kimdir? (Kuran'da dolaylı övülmüştür)",
    options: ["Hz. Ali", "Hz. Hamza", "Hz. Ömer", "Hz. Halid bin Velid"],
    correctAnswer: "Hz. Ali",
    explanation: "Doğrudan lakap geçmese de, ilmi ve cesaretiyle Kuran'ın hizmetinde olan ve 'Haydar-ı Kerrar' bilinen Hz. Ali'dir. (Not: Hz. Hamza da 'Allah'ın Arslanı' olarak bilinir, soru genel kültürdür)."
  },
  {
    id: 'k_m_31',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Mübahele' (Lanetleşme) ayeti kimlerle ilgili inmiştir?",
    options: ["Necran Hristiyanları", "Mekke Müşrikleri", "Medine Yahudileri", "Münafıklar"],
    correctAnswer: "Necran Hristiyanları",
    explanation: "Ali İmran suresi 61. ayet, Hz. İsa hakkında tartışan Necran Hristiyanlarına karşı inmiştir."
  },
  {
    id: 'k_m_32',
    difficulty: 'medium',
    points: 20,
    question: "'Vakıa' suresini her gece okuyanın neyden korunacağı rivayet edilir?",
    options: ["Fakirlik", "Kabir azabı", "Hastalık", "Düşman"],
    correctAnswer: "Fakirlik",
    explanation: "Hadislerde, her gece Vakıa suresini okuyanın fakirlik yüzü görmeyeceği rivayet edilmiştir."
  },
  {
    id: 'k_m_33',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Gıybet' neye benzetilmiştir?",
    options: ["Ölü kardeşinin etini yemeye", "Ateş yemeye", "Zehir içmeye", "Domuz eti yemeye"],
    correctAnswer: "Ölü kardeşinin etini yemeye",
    explanation: "Hucurat suresi 12. ayette gıybet etmek, 'ölmüş kardeşinin etini yemeye' benzetilerek tiksindirici bulunmuştur."
  },
  {
    id: 'k_m_34',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Habil ve Kabil' kıssası hangi surededir?",
    options: ["Maide", "Araf", "Bakara", "Yusuf"],
    correctAnswer: "Maide",
    explanation: "Adem'in iki oğlunun (Habil ve Kabil) kıssası Maide suresinde (27-31) anlatılır."
  },
  {
    id: 'k_m_35',
    difficulty: 'medium',
    points: 20,
    question: "Kuran'da 'Sırat-ı Müstakim' ne demektir?",
    options: ["Dosdoğru yol", "Cennet yolu", "Zorlu yol", "Kısa yol"],
    correctAnswer: "Dosdoğru yol",
    explanation: "Fatiha suresinde geçen Sırat-ı Müstakim, Allah'ın nimet verdiği peygamberlerin ve salihlerin gittiği 'dosdoğru yol' demektir."
  },
  {
    id: 'k_m_36',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Fitne' (kargaşa/küfür) hakkında ne buyurulmuştur?",
    options: ["Adam öldürmekten beterdir", "Affedilmezdir", "Hırsızlıktan kötüdür", "Yalandan kötüdür"],
    correctAnswer: "Adam öldürmekten beterdir",
    explanation: "Bakara suresi 191 ve 217. ayetlerde 'Fitne, adam öldürmekten daha kötüdür/beterdir' buyurulmuştur."
  },
  {
    id: 'k_m_37',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Salat' kelimesi en çok hangi anlamda kullanılır?",
    options: ["Namaz", "Dua", "Rahmet", "Destek"],
    correctAnswer: "Namaz",
    explanation: "Salat kelimesi sözlükte dua anlamına gelse de, Kuran'da terim olarak çoğunlukla 'Namaz' ibadeti için kullanılır."
  },
  {
    id: 'k_m_38',
    difficulty: 'medium',
    points: 20,
    question: "Hangi sure, baştan sona Hz. Yusuf'un hayatını anlatır?",
    options: ["Yusuf", "Kasas", "Taha", "Enbiya"],
    correctAnswer: "Yusuf",
    explanation: "Yusuf suresi, diğer surelerden farklı olarak tek bir konuyu (Hz. Yusuf'un kıssasını) baştan sona, kronolojik bir bütünlükle anlatır."
  },
  {
    id: 'k_m_39',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Mescid-i Haram'dan Mescid-i Aksa'ya' yapılan gece yürüyüşüne ne denir?",
    options: ["İsra", "Miraç", "Hicret", "Sefer"],
    correctAnswer: "İsra",
    explanation: "Gece yürüyüşü anlamına gelen 'İsra', Peygamberimizin Mekke'den Kudüs'e götürülmesidir. Göğe yükselmesi ise 'Miraç'tır."
  },
  {
    id: 'k_m_40',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'de 'Şehit'lerin durumu hakkında ne buyurulur?",
    options: ["Onlar diridirler ama siz fark etmezsiniz", "Onlar ölüdürler", "Onlar uykudadırlar", "Onlar azap çekmezler"],
    correctAnswer: "Onlar diridirler ama siz fark etmezsiniz",
    explanation: "Bakara 154: 'Allah yolunda öldürülenlere ölüler demeyin. Bilakis onlar diridirler, fakat siz farkında değilsiniz.'"
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - KURAN KÜLTÜRÜ (30 PUAN)
  // --------------------------------------------------------
  {
    id: 'k_h_1',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Fussilet' suresinin diğer adı nedir?",
    options: ["Secde", "Ha-Mim Secde", "Mümin", "Duhan"],
    correctAnswer: "Ha-Mim Secde",
    explanation: "Fussilet suresi, 'Ha-Mim' ile başladığı ve içinde secde ayeti bulunduğu için 'Ha-Mim Secde' olarak da bilinir."
  },
  {
    id: 'k_h_2',
    difficulty: 'hard',
    points: 30,
    question: "Hangi sureye 'Kuran'ın Sınamı' (Zirvesi) denilmiştir?",
    options: ["Bakara", "Ali İmran", "Yasin", "Enam"],
    correctAnswer: "Bakara",
    explanation: "Hadislerde Bakara suresinin Kuran'ın 'Senâmı' (devenin hörgücü/zirvesi) olduğu belirtilmiştir."
  },
  {
    id: 'k_h_3',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'in 'Tevkifi' olması ne anlama gelir?",
    options: ["Peygamberin içtihadı olması", "Allah tarafından belirlenmiş olması", "Sahabenin sıralaması", "Kronolojik olması"],
    correctAnswer: "Allah tarafından belirlenmiş olması",
    explanation: "Surelerin ve ayetlerin sıralanışı Cebrail'in bildirmesiyle, yani vahye dayalı (tevkifi) olarak belirlenmiştir."
  },
  {
    id: 'k_h_4',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Mecid' (Şanı Yüce) sıfatıyla nitelenen iki sure hangisidir?",
    options: ["Kaf ve Buruc", "Yasin ve Mülk", "Fatiha ve İhlas", "Fetih ve Nasr"],
    correctAnswer: "Kaf ve Buruc",
    explanation: "Kaf suresinin başında 'Kuran-ı Mecid' ifadesi geçer. Buruc suresinde ise Levh-i Mahfuz için 'Mecid' denir."
  },
  {
    id: 'k_h_5',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Seb'ul Mesani' (Tekrarlanan Yedi) olarak adlandırılan sure hangisidir?",
    options: ["Fatiha", "Bakara", "İhlas", "Kevser"],
    correctAnswer: "Fatiha",
    explanation: "Hicr suresi 87. ayette geçen 'Seb'ul Mesani' ifadesi, namazlarda her rekatta tekrarlanan 7 ayetli Fatiha suresidir."
  },
  {
    id: 'k_h_6',
    difficulty: 'hard',
    points: 30,
    question: "Kuran'da 'Mübâhale Ayeti' (Lanetleşme) hangi surededir?",
    options: ["Ali İmran", "Maide", "Nisa", "Enfal"],
    correctAnswer: "Ali İmran",
    explanation: "Ali İmran suresi 61. ayet (Necranlı Hristiyanlarla ilgili) Mübâhale ayeti olarak bilinir."
  },
  {
    id: 'k_h_7',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Ülü'l Azm' (Azim Sahibi) peygamberler kaç tanedir?",
    options: ["3", "4", "5", "7"],
    correctAnswer: "5",
    explanation: "Ülü'l Azm peygamberler 5 tanedir: Hz. Nuh, Hz. İbrahim, Hz. Musa, Hz. İsa ve Hz. Muhammed (s.a.v)."
  },
  {
    id: 'k_h_8',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'in 'Son İnen Ayeti' (hüküm bildiren) çoğu alime göre hangisidir?",
    options: ["Maide 3 (Dini tamamladım)", "Bakara 281 (Allah'a döndürüleceğiniz gün)", "Nasr 1", "Tevbe 129"],
    correctAnswer: "Bakara 281 (Allah'a döndürüleceğiniz gün)",
    explanation: "Veda Haccı'ndaki Maide 3 'Dinin ikmali' olsa da, mutlak son inen vahyin Bakara 281 olduğu görüşü ağırlıktadır."
  },
  {
    id: 'k_h_9',
    difficulty: 'hard',
    points: 30,
    question: "'Kalem' suresinin diğer adı nedir?",
    options: ["Nun", "İkra", "Müzzemmil", "Müddessir"],
    correctAnswer: "Nun",
    explanation: "Kalem suresi 'Nun' harfiyle başladığı için 'Nun Suresi' olarak da bilinir."
  },
  {
    id: 'k_h_10',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Hızır' (a.s) ile Hz. Musa'nın yolculuğu hangi surededir?",
    options: ["Kehf", "Taha", "Kasas", "Meryem"],
    correctAnswer: "Kehf",
    explanation: "Hz. Musa'nın 'Salih Kul' (Hızır) ile yaptığı hikmetli yolculuk Kehf suresinde (60-82. ayetler) anlatılır."
  },
  {
    id: 'k_h_11',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Talut ve Calut' kıssası hangi surededir?",
    options: ["Bakara", "Ali İmran", "Maide", "Araf"],
    correctAnswer: "Bakara",
    explanation: "İsrailoğulları'nın hükümdarı Talut ve zalim Calut'un (Davud a.s. tarafından öldürülmesi) kıssası Bakara suresindedir."
  },
  {
    id: 'k_h_12',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Şecere-i Mel'une' (Lanetlenmiş Ağaç) olarak bahsedilen ağaç hangisidir?",
    options: ["Zakkum", "Zeytin", "İncir", "Hurma"],
    correctAnswer: "Zakkum",
    explanation: "İsra suresi 60. ayette ve Saffat suresinde cehennemdeki Zakkum ağacından 'Lanetlenmiş Ağaç' olarak bahsedilir."
  },
  {
    id: 'k_h_13',
    difficulty: 'hard',
    points: 30,
    question: "Hangi surenin sonunda 'Tilavet Secdesi' vardır?",
    options: ["Alak", "Kadir", "İnşirah", "Tin"],
    correctAnswer: "Alak",
    explanation: "İlk inen sure olan Alak suresinin son ayeti (19. ayet) secde ayetidir."
  },
  {
    id: 'k_h_14',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Cifir ve Ebced' ilmine işaret ettiği söylenen harflere ne denir?",
    options: ["Huruf-u Mukatta", "Lafz-ı Celal", "Kelime-i Tayyibe", "Müteşabih"],
    correctAnswer: "Huruf-u Mukatta",
    explanation: "Sure başlarındaki kesik harflere (Elif-Lam-Mim vb.) Huruf-u Mukatta denir ve bazı alimler bunlarda ebced sırları olduğunu söyler."
  },
  {
    id: 'k_h_15',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'in 'Resm-i Osmani' hattıyla yazılması ne demektir?",
    options: ["Hz. Osman dönemindeki yazım kuralı", "Osmanlı hattı", "Nesih yazısı", "Kufi yazı"],
    correctAnswer: "Hz. Osman dönemindeki yazım kuralı",
    explanation: "Hz. Osman döneminde çoğaltılan Mushafların imla (yazım) kurallarına 'Resm-i Osmani' veya 'Resm-i Mushaf' denir."
  },
  {
    id: 'k_h_16',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Zihar' (Eşini annesine benzeterek boşama) adeti hangi surede yasaklanmıştır?",
    options: ["Mücadele", "Talak", "Tahrim", "Nisa"],
    correctAnswer: "Mücadele",
    explanation: "Cahiliye adeti olan Zihar, Mücadele suresinin ilk ayetlerinde kesin olarak yasaklanmış ve kefareti belirtilmiştir."
  },
  {
    id: 'k_h_17',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Ashab-ı Uhdud' (Hendek sahipleri) hangi surededir?",
    options: ["Buruc", "Fecr", "Beled", "Tarık"],
    correctAnswer: "Buruc",
    explanation: "Müminleri ateş dolu hendeklere atarak yakan zalimler (Ashab-ı Uhdud), Buruc suresinde anlatılır."
  },
  {
    id: 'k_h_18',
    difficulty: 'hard',
    points: 30,
    question: "'Vahyin Katipleri'nden olup Kuran'ın toplanmasında heyet başkanı olan sahabi kimdir?",
    options: ["Zeyd bin Sabit", "Muaviye", "Ubey bin Kab", "Ali bin Ebi Talib"],
    correctAnswer: "Zeyd bin Sabit",
    explanation: "Hem Hz. Ebubekir hem Hz. Osman döneminde Kuran'ı toplama ve çoğaltma heyetinin başkanı Zeyd bin Sabit'tir."
  },
  {
    id: 'k_h_19',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Mescid-i Dırar' (Zarar Mescidi) olayı hangi surededir?",
    options: ["Tevbe", "Enfal", "Hac", "Nur"],
    correctAnswer: "Tevbe",
    explanation: "Münafıkların müminleri bölmek için yaptığı Mescid-i Dırar'ın yıkılması emri Tevbe suresinde (107-110) geçer."
  },
  {
    id: 'k_h_20',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'İfk Hadisesi' (Hz. Aişe'ye iftira) hangi surededir?",
    options: ["Nur", "Ahzab", "Nisa", "Mümtehine"],
    correctAnswer: "Nur",
    explanation: "Hz. Aişe'nin masumiyetini ilan eden ve iftiracıları cezalandıran ayetler Nur suresindedir."
  },
  {
    id: 'k_h_21',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Ganimetlerin' beşte birinin (Humus) Allah ve Resulüne ait olduğu hangi surededir?",
    options: ["Enfal", "Haşr", "Tevbe", "Fetih"],
    correctAnswer: "Enfal",
    explanation: "Bedir savaşından sonra inen Enfal suresi 41. ayet, ganimetlerin taksimini (Humus kuralını) belirler."
  },
  {
    id: 'k_h_22',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Salat-ı Vusta' (Orta Namaz) ifadesi hangi surededir?",
    options: ["Bakara", "Nisa", "Maide", "İbrahim"],
    correctAnswer: "Bakara",
    explanation: "Bakara suresi 238. ayet: 'Namazlara ve orta namaza (ikindi namazı olduğu görüşü yaygındır) devam edin.'"
  },
  {
    id: 'k_h_23',
    difficulty: 'hard',
    points: 30,
    question: "Hangi surede 'Allah'ın Devesi' (Salih Peygamberin mucizesi) anlatılır?",
    options: ["Şems", "Kamer", "Necm", "Leyl"],
    correctAnswer: "Şems",
    explanation: "Şems suresinde Semud kavminin azgınlığı ve Allah'ın devesini kesmeleri anlatılır (Ayrıca Hud, Araf ve Şuara'da da geçer)."
  },
  {
    id: 'k_h_24',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Tebbet' suresinin diğer adı nedir?",
    options: ["Mesed", "Leheb", "Kureyş", "Fil"],
    correctAnswer: "Mesed",
    explanation: "Surenin son kelimesi olan 'Mesed' (bükülmüş ip/halat) surenin diğer adıdır."
  },
  {
    id: 'k_h_25',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Nâsih ve Mensûh' (Hükmü kaldıran ve kalkan) kavramı hangi ayette geçer?",
    options: ["Bakara 106", "Ali İmran 7", "Nisa 82", "Maide 3"],
    correctAnswer: "Bakara 106",
    explanation: "Bakara 106: 'Biz bir ayetin hükmünü yürürlükten kaldırır veya onu unutturursak, mutlaka daha iyisini veya benzerini getiririz.'"
  },
  {
    id: 'k_h_26',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'in yedi harf (Ahruf-u Seb'a) üzerine inmesi ne demektir?",
    options: ["7 Arap lehçesi/okuyuşu", "7 farklı anlam", "7 kutsal kitap", "7 kıta"],
    correctAnswer: "7 Arap lehçesi/okuyuşu",
    explanation: "Hadislerde geçen 'Kuran yedi harf üzerine inmiştir' ifadesi, Arap kabilelerinin farklı lehçelerine ve okuyuş kolaylığına işaret eder."
  },
  {
    id: 'k_h_27',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Müminlerin anneleri' (Peygamberin eşleri) ifadesi hangi surededir?",
    options: ["Ahzab", "Tahrim", "Nisa", "Mücadele"],
    correctAnswer: "Ahzab",
    explanation: "Ahzab suresi 6. ayet: 'Peygamber, müminlere canlarından daha evladır, eşleri de onların anneleridir.'"
  },
  {
    id: 'k_h_28',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Sidretü'l Münteha' (Sınır Ağacı) hangi surededir?",
    options: ["Necm", "İsra", "Mülk", "Vakıa"],
    correctAnswer: "Necm",
    explanation: "Miraç hadisesinin anlatıldığı Necm suresinde (14. ayet) Sidretü'l Münteha geçer."
  },
  {
    id: 'k_h_29',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Harut ve Marut' adlı meleklerin kıssası hangi surededir?",
    options: ["Bakara", "Araf", "Enam", "Cin"],
    correctAnswer: "Bakara",
    explanation: "Babil'de insanlara büyüyü (imtihan olarak) öğreten iki melek Harut ve Marut, Bakara suresi 102. ayette anlatılır."
  },
  {
    id: 'k_h_30',
    difficulty: 'hard',
    points: 30,
    question: "'İnna lillahi ve inna ileyhi raciun' (İstirca) ayeti hangi surededir?",
    options: ["Bakara", "Ali İmran", "Ankebut", "Lokman"],
    correctAnswer: "Bakara",
    explanation: "Musibet anında söylenen bu ifade Bakara suresi 156. ayettir."
  },
  {
    id: 'k_h_31',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Zülkifl' (a.s) peygamberden hangi surelerde bahsedilir?",
    options: ["Enbiya ve Sad", "Yusuf ve Hud", "Taha ve Meryem", "Bakara ve Ali İmran"],
    correctAnswer: "Enbiya ve Sad",
    explanation: "Sabreden peygamberlerden biri olarak Hz. Zülkifl, Enbiya ve Sad surelerinde zikredilir."
  },
  {
    id: 'k_h_32',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Kıtal' (Savaş) suresi olarak da bilinen sure hangisidir?",
    options: ["Muhammed", "Fetih", "Enfal", "Tevbe"],
    correctAnswer: "Muhammed",
    explanation: "Muhammed suresi, cihad ve savaş hükümlerini içerdiği için 'Kıtal Suresi' olarak da adlandırılır."
  },
  {
    id: 'k_h_33',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Ye'cüc ve Me'cüc' kavminden hangi surelerde bahsedilir?",
    options: ["Kehf ve Enbiya", "Taha ve Yasin", "Bakara ve Ali İmran", "Mülk ve Kıyamet"],
    correctAnswer: "Kehf ve Enbiya",
    explanation: "Kıyamet alameti olan bu kavimden Kehf (Zülkarneyn seddi) ve Enbiya surelerinde bahsedilir."
  },
  {
    id: 'k_h_34',
    difficulty: 'hard',
    points: 30,
    question: "Hangi sureye 'Berae' (İlişkiyi kesme/Ultimatom) adı verilir?",
    options: ["Tevbe", "Kafirun", "Münafikun", "Enfal"],
    correctAnswer: "Tevbe",
    explanation: "Tevbe suresi 'Beraetün minallah' (Allah'tan bir ihtar/ilişki kesme) diye başladığı için Berae suresi denir."
  },
  {
    id: 'k_h_35',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Ruh' hakkında soru soranlara verilen cevap hangi surededir?",
    options: ["İsra", "Kehf", "Taha", "Meryem"],
    correctAnswer: "İsra",
    explanation: "İsra suresi 85. ayet: 'Sana ruhtan soruyorlar. De ki: Ruh, Rabbimin emrindendir. Size ilimden pek az şey verilmiştir.'"
  },
  {
    id: 'k_h_36',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Şeytanın hilelerinin zayıf olduğu' hangi surededir?",
    options: ["Nisa", "Araf", "Hicr", "İsra"],
    correctAnswer: "Nisa",
    explanation: "Nisa suresi 76. ayet: 'Şüphesiz şeytanın hilesi zayıftır.'"
  },
  {
    id: 'k_h_37',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Güneşin ve Ayın bir hesaba göre hareket ettiği' hangi surededir?",
    options: ["Rahman", "Yasin", "Mülk", "Nebe"],
    correctAnswer: "Rahman",
    explanation: "Rahman suresi 5. ayet: 'Güneş ve ay bir hesaba göredir.'"
  },
  {
    id: 'k_h_38',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Hanif' dini (Hz. İbrahim'in dini) kavramı en çok hangi surede vurgulanır?",
    options: ["Ali İmran", "Bakara", "Enam", "Nahl"],
    correctAnswer: "Ali İmran",
    explanation: "Ali İmran suresinde Hz. İbrahim'in ne Yahudi ne Hristiyan olduğu, 'Hanif' bir Müslüman olduğu vurgulanır."
  },
  {
    id: 'k_h_39',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Mescid-i Aksa'nın çevresinin mübarek kılındığı' hangi surededir?",
    options: ["İsra", "Rum", "Ankebut", "Hac"],
    correctAnswer: "İsra",
    explanation: "İsra suresinin 1. ayetinde Mescid-i Aksa ve çevresinin mübarek kılındığı belirtilir."
  },
  {
    id: 'k_h_40',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'de 'Biz emaneti göklere, yere ve dağlara sunduk...' ayeti hangi surededir?",
    options: ["Ahzab", "Haşr", "Hadid", "Cuma"],
    correctAnswer: "Ahzab",
    explanation: "İnsanın sorumluluğunu anlatan bu meşhur emanet ayeti Ahzab suresi 72. ayettir."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - KURAN KÜLTÜRÜ (40 PUAN)
  // --------------------------------------------------------
  {
    id: 'k_x_1',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Mücadile' suresinin diğer adı nedir?",
    options: ["Kadın", "Duyulan", "Zihar", "Münazara"],
    correctAnswer: "Duyulan",
    explanation: "Allah (c.c), kocasından şikayetçi olan kadının sözünü işittiği için sureye 'Mücadile' denmiş, ilk ayetteki 'Kad semiallah' (Allah işitti) ifadesinden dolayı 'Duyulan' (Kad Semia) suresi de denmiştir."
  },
  {
    id: 'k_x_2',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Besmele' ayet sayılır mı?",
    options: ["Sadece Fatiha'da ve Neml'de sayılır", "Her surenin başında sayılır", "Hiçbirinde sayılmaz", "Sadece Fatiha'da sayılır (Şafii)"],
    correctAnswer: "Sadece Fatiha'da ve Neml'de sayılır",
    explanation: "Neml suresi 30. ayetteki Besmele ittifakla ayettir. Fatiha'nın başındaki ise Şafii mezhebine göre ayettir, Hanefi'ye göre surelerin arasını ayıran müstakil bir ayettir."
  },
  {
    id: 'k_x_3',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Garanik Olayı' (Şeytanın ayetlere karıştığı iddiası) hangi sureyle ilişkilendirilir?",
    options: ["Necm", "Hac", "İsra", "Mülk"],
    correctAnswer: "Hac",
    explanation: "Müşriklerin uydurduğu bu olay, Hac suresi 52. ayetin ('Şeytan onun okuduğuna bir şeyler karıştırmak istedi...') tefsirinde tartışılmıştır."
  },
  {
    id: 'k_x_4',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Tevkifi' sıralamaya göre inen son sure hangisidir?",
    options: ["Nasr", "Maide", "Tevbe", "Bakara"],
    correctAnswer: "Nasr",
    explanation: "Tam ve müstakil bir sure olarak en son inen sure Nasr suresidir. (Tevbe ve Maide'nin son inmediği, ayetlerin indiği görüşü hakimdir)."
  },
  {
    id: 'k_x_5',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Sekine' (Huzur ve güven) kelimesi hangi surede en çok geçer?",
    options: ["Fetih", "Tevbe", "Bakara", "Ahzab"],
    correctAnswer: "Fetih",
    explanation: "Fetih suresinde (4, 18 ve 26. ayetlerde) müminlerin kalbine indirilen 'Sekine'den üç defa bahsedilir."
  },
  {
    id: 'k_x_6',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Ülü'l Emr' (Emir sahipleri/Yöneticiler) kavramı hangi surede geçer?",
    options: ["Nisa", "Maide", "Şura", "Enfal"],
    correctAnswer: "Nisa",
    explanation: "Nisa suresi 59. ayet: 'Allah'a, Peygamber'e ve sizden olan Ülü'l Emr'e itaat edin.'"
  },
  {
    id: 'k_x_7',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'İki Denizin Birbirine Karışmaması' (Meracel Bahreyn) mucizesi hangi surelerdedir?",
    options: ["Rahman ve Furkan", "Yasin ve Mülk", "Kehf ve Taha", "Neml ve Fatır"],
    correctAnswer: "Rahman ve Furkan",
    explanation: "Rahman suresi 19-20 ve Furkan suresi 53. ayetlerde iki denizin sularının birbirine karışmadığı anlatılır."
  },
  {
    id: 'k_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Haman' (Firavun'un veziri/mimarı) isminin geçmesi neden tarihi bir mucizedir?",
    options: ["Hiyerogliflerin çözülmesiyle doğrulandığı için", "Tevrat'ta geçmediği için", "Bilinmeyen bir dil olduğu için", "Hiçbiri"],
    correctAnswer: "Hiyerogliflerin çözülmesiyle doğrulandığı için",
    explanation: "Rosetta taşı ile Mısır yazıları çözülünce, 'Haman'ın gerçekten Firavun döneminde 'taş ocakları şefi' olduğu ortaya çıkmıştır. (Tevrat'ta Haman, Babil döneminde geçer, bu bir hatadır)."
  },
  {
    id: 'k_x_9',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'İsrailiyat' (Yahudi kaynaklı bilgiler) en çok hangi surelerin tefsirinde kullanılır?",
    options: ["Yusuf, Kasas, Taha", "Bakara, Ali İmran", "İhlas, Felak", "Yasin, Mülk"],
    correctAnswer: "Yusuf, Kasas, Taha",
    explanation: "İsrailoğulları peygamberlerinin kıssalarının detayları (Kuran'da olmayan kısımlar) tefsirlerde genellikle İsrailiyat kaynaklarından aktarılır."
  },
  {
    id: 'k_x_10',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Kıyamet Günü'nün 50.000 yıl sürdüğü' hangi surede belirtilir?",
    options: ["Mearic", "Hakka", "Kıyamet", "Vakıa"],
    correctAnswer: "Mearic",
    explanation: "Mearic suresi 4. ayet: 'Melekler ve Ruh, miktarı elli bin yıl olan bir günde O'na yükselirler.'"
  },
  {
    id: 'k_x_11',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Sünnetullah' (Allah'ın kanunu/yasası) ifadesi kaç yerde geçer?",
    options: ["8", "3", "1", "20"],
    correctAnswer: "8",
    explanation: "Allah'ın toplumsal ve fiziksel yasalarının değişmeyeceğini ifade eden Sünnetullah kavramı 8 ayette geçer (Örn: Fetih 23, Ahzab 62)."
  },
  {
    id: 'k_x_12',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Ebrehe ve Fil Ordusu'nun helakı hangi surede anlatılır?",
    options: ["Fil", "Kureyş", "Fecr", "Adiyat"],
    correctAnswer: "Fil",
    explanation: "Kabe'yi yıkmaya gelen Ebrehe ordusunun Ebabil kuşlarıyla helak edilişi Fil suresinde anlatılır."
  },
  {
    id: 'k_x_13',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Mele-i A'lâ' (Yüce Topluluk/Melekler Meclisi) ifadesi hangi surede geçer?",
    options: ["Sad ve Saffat", "Mülk", "Cin", "Hicr"],
    correctAnswer: "Sad ve Saffat",
    explanation: "Sad suresi 69 ve Saffat suresi 8. ayette melekler topluluğu (Mele-i A'lâ) geçer."
  },
  {
    id: 'k_x_14',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Mütaşabih' (Manası kapalı/benzeşen) ayetlerin tevilini kimin bileceği hangi surede tartışılır?",
    options: ["Ali İmran", "Bakara", "Nisa", "Maide"],
    correctAnswer: "Ali İmran",
    explanation: "Ali İmran suresi 7. ayette muhkem ve müteşabih ayetlerden bahsedilir ve 'Onların tevilini ancak Allah bilir' (veya Allah ve ilimde derinleşenler) buyurulur."
  },
  {
    id: 'k_x_15',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Usvetun Hasene' (En Güzel Örnek) ifadesi Peygamberimiz dışında kimin için kullanılır?",
    options: ["Hz. İbrahim", "Hz. Musa", "Hz. İsa", "Hz. Yusuf"],
    correctAnswer: "Hz. İbrahim",
    explanation: "Mümtehine suresi 4. ayette: 'İbrahim'de ve onunla beraber olanlarda sizin için güzel bir örnek (usvetun hasene) vardır' buyurulur."
  },
  {
    id: 'k_x_16',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Dabbetü'l Arz' (Kıyamet alameti olan canlı) hangi surede geçer?",
    options: ["Neml", "Duhan", "Casiye", "Zilzal"],
    correctAnswer: "Neml",
    explanation: "Neml suresi 82. ayet: 'Söz başlarına gelince, onlara yerden bir canlı (Dabbe) çıkarırız.'"
  },
  {
    id: 'k_x_17',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Beyt-i Mamur' (Meleklerin Kabesi) üzerine yemin edilen sure hangisidir?",
    options: ["Tur", "Necm", "Zariyat", "Mürselat"],
    correctAnswer: "Tur",
    explanation: "Tur suresi 4. ayet: 'Ve Beyt-i Mamur'a andolsun ki...'"
  },
  {
    id: 'k_x_18',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Hâtemü'l-Enbiyâ' (Peygamberlerin Mühürü) ifadesi hangi surede geçer?",
    options: ["Ahzâb", "Muhammed", "Fetih", "Nûr"],
    correctAnswer: "Ahzâb",
    explanation: "Ahzab suresi 40. ayette Hz. Muhammed'in (s.a.v) peygamberlerin sonuncusu olduğu belirtilir."
  },
  {
    id: 'k_x_19',
    difficulty: 'expert',
    points: 40,
    question: "Hangi surenin başında 'Huruf-u Mukatta' (Kesik Harfler) yoktur?",
    options: ["Furkan", "Yasin", "Meryem", "Taha"],
    correctAnswer: "Furkan",
    explanation: "Yasin, Meryem (Kaf Ha Ya Ayn Sad) ve Taha sureleri mukatta harfleriyle başlar; Furkan suresi 'Tebarekellezi' ile başlar."
  },
  {
    id: 'k_x_20',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'İfk Hadisesi'nde Hz. Aişe'nin suçsuzluğunu kanıtlayan ayetlerin indiği sırada vahiy hali nasıldı?",
    options: ["Peygamberimiz terler içinde kaldı (Ağırlık çöktü)", "Uyku halindeydi", "Cebrail insan suretinde geldi", "Perde arkasından seslendi"],
    correctAnswer: "Peygamberimiz terler içinde kaldı (Ağırlık çöktü)",
    explanation: "Vahyin ağırlığından dolayı soğuk bir kış günü olmasına rağmen Peygamberimizden (s.a.v) inci tanesi gibi terler döküldüğü rivayet edilir."
  },
  {
    id: 'k_x_21',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Münafıkların' özelliklerinin en kapsamlı anlatıldığı ve 'Fadıha' (Rezil eden) olarak da bilinen sure hangisidir?",
    options: ["Tevbe", "Münafikun", "Bakara", "Nisa"],
    correctAnswer: "Tevbe",
    explanation: "Tevbe suresi, münafıkların iç yüzünü deşifre edip onları rezil ettiği için 'Fadıha' ismiyle de anılmıştır."
  },
  {
    id: 'k_x_22',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Hanımının şikayeti üzerine' inen sure hangisidir?",
    options: ["Mücadele", "Mümtehine", "Tahrim", "Talak"],
    correctAnswer: "Mücadele",
    explanation: "Havle bint Sa'lebe'nin kocası tarafından zihar yapılması üzerine Peygamberimize başvurması sonucu Mücadele suresi inmiştir."
  },
  {
    id: 'k_x_23',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Mescid-i Aksa' ismi açıkça hangi surede geçer?",
    options: ["İsra", "Rum", "Ali İmran", "Enbiya"],
    correctAnswer: "İsra",
    explanation: "İsra suresi 1. ayette: '...Mescid-i Haram'dan çevresini mübarek kıldığımız Mescid-i Aksa'ya...' şeklinde geçer."
  },
  {
    id: 'k_x_24',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Şeytanın Adem'e secde etmemesi' olayı kaç surede anlatılır?",
    options: ["7", "1", "3", "12"],
    correctAnswer: "7",
    explanation: "Bakara, Araf, Hicr, İsra, Kehf, Taha ve Sad sureleri olmak üzere 7 surede bu olay anlatılır."
  },
  {
    id: 'k_x_25',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Ashab-ı Ress' (Ress Halkı) hangi surelerde geçer?",
    options: ["Furkan ve Kaf", "Yasin ve Saffat", "Mülk ve Kalem", "Fecr ve Beled"],
    correctAnswer: "Furkan ve Kaf",
    explanation: "Peygamberlerini yalanlayan kavimler arasında sayılan Ashab-ı Ress, Furkan (38) ve Kaf (12) surelerinde zikredilir."
  },
  {
    id: 'k_x_26',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Ebced hesabı' ile 'Beldetün Tayyibetün' (Güzel Belde) ifadesinin İstanbul'un fethine (857/1453) işaret ettiği söylenen sure hangisidir?",
    options: ["Sebe", "Fetih", "Rum", "Nasr"],
    correctAnswer: "Sebe",
    explanation: "Sebe suresi 15. ayette geçen 'Beldetün Tayyibetün' ifadesinin ebced değeri Hicri 857 (Miladi 1453) yılına denk gelir."
  },
  {
    id: 'k_x_27',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Allah'ın indirdiği ile hükmetmeyenler' için Maide suresinde hangi üç sıfat kullanılır?",
    options: ["Kafirler, Zalimler, Fasıklar", "Münafıklar, Müşrikler, Kafirler", "Yalancılar, Nankörler, Asiler", "Cahiller, Sapkınlar, Zalimler"],
    correctAnswer: "Kafirler, Zalimler, Fasıklar",
    explanation: "Maide 44, 45 ve 47. ayetlerde sırasıyla Kafirun, Zalimun ve Fasikun ifadeleri kullanılır."
  },
  {
    id: 'k_x_28',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Hz. Musa ve Hz. Harun'un sihirbazlara karşı galip gelmesi' en detaylı hangi surelerde anlatılır?",
    options: ["Araf, Taha, Şuara", "Bakara, Ali İmran", "Yasin, Mülk", "Yusuf, Hud"],
    correctAnswer: "Araf, Taha, Şuara",
    explanation: "Sihirbazlarla mücadele kıssası en detaylı şekilde Araf, Taha ve Şuara surelerinde yer alır."
  },
  {
    id: 'k_x_29',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Vakfe' (Durak) işaretlerini (Secavendleri) ilk koyan alim kimdir?",
    options: ["Muhammed bin Tayfur es-Secavendi", "İmam Asım", "İbn-i Kesir", "Zeyd bin Sabit"],
    correctAnswer: "Muhammed bin Tayfur es-Secavendi",
    explanation: "Kuran okurken nerede durulup geçileceğini belirleyen işaretleri (Mim, Tı, Cim vb.) sisteme döken alim Secavendi'dir."
  },
  {
    id: 'k_x_30',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'İsrailoğulları'ndan' en çok bahseden sure hangisidir?",
    options: ["Bakara", "Al-i İmran", "Araf", "Taha"],
    correctAnswer: "Bakara",
    explanation: "Kuran'ın en uzun suresi olan Bakara suresi, ismini de aldığı sığır kesme olayı dahil İsrailoğulları tarihinden çokça bahseder."
  },
  {
    id: 'k_x_31',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Allah'ın eli onların ellerinin üzerindedir' (Yedullah) ifadesi hangi olay üzerine inmiştir?",
    options: ["Hudeybiye Antlaşması (Rıdvan Biatı)", "Bedir Savaşı", "Uhud Savaşı", "Veda Haccı"],
    correctAnswer: "Hudeybiye Antlaşması (Rıdvan Biatı)",
    explanation: "Fetih suresi 10. ayet, Hudeybiye'de ağaç altında Peygamberimize biat eden sahabiler için inmiştir."
  },
  {
    id: 'k_x_32',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Zülkifl' (a.s)'ın adı hangi peygamberlerle birlikte anılır?",
    options: ["İsmail ve İdris", "Musa ve Harun", "Yusuf ve Yakup", "İsa ve Yahya"],
    correctAnswer: "İsmail ve İdris",
    explanation: "Enbiya suresi 85. ayette: 'İsmail, İdris ve Zülkifl'i de an. Hepsi de sabredenlerdendi' buyurulur."
  },
  {
    id: 'k_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Müellefe-i Kulûb' (Kalpleri İslam'a ısındırılacaklar) kavramı hangi surede geçer?",
    options: ["Tevbe", "Enfal", "Nur", "Ahzab"],
    correctAnswer: "Tevbe",
    explanation: "Zekatın verileceği sınıfların sayıldığı Tevbe suresi 60. ayette Müellefe-i Kulûb geçer."
  },
  {
    id: 'k_x_34',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Karun'un hazineleriyle birlikte yerin dibine geçirilmesi' hangi surede anlatılır?",
    options: ["Kasas", "Ankebut", "Mümin", "Zuhruf"],
    correctAnswer: "Kasas",
    explanation: "Kasas suresi 76-81. ayetlerde Karun'un şımarıklığı ve hazineleriyle birlikte batırılışı anlatılır."
  },
  {
    id: 'k_x_35',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Kıyamet Günü sura üfleyecek melek' (İsrafil) ismi açıkça geçer mi?",
    options: ["Hayır, sadece 'Çağırıcı' veya 'Sura üflendiğinde' denir", "Evet, geçer", "Sadece 'Melek' olarak geçer", "Cebrail ile birlikte geçer"],
    correctAnswer: "Hayır, sadece 'Çağırıcı' veya 'Sura üflendiğinde' denir",
    explanation: "Kuran'da İsrafil'in ismi açıkça geçmez (Hadislerde geçer). Ayetlerde 'Sura üflendiği gün', 'O gün bir çağırıcı çağırır' şeklinde geçer."
  },
  {
    id: 'k_x_36',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Cahiliye dönemi kadınları gibi açılıp saçılmayın' uyarısı kime yapılmıştır?",
    options: ["Peygamber Hanımlarına (Ahzab Suresi)", "Tüm Mümin Kadınlara", "Mekke Kadınlarına", "Medine Kadınlarına"],
    correctAnswer: "Peygamber Hanımlarına (Ahzab Suresi)",
    explanation: "Ahzab suresi 33. ayette öncelikli hitap Peygamber hanımlarınadır ('Ey Peygamber hanımları...'), ancak hüküm geneldir."
  },
  {
    id: 'k_x_37',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'İncil' için kullanılan 'Tashih edici/Doğrulayıcı' ifade nedir?",
    options: ["Musaddık", "Müheymin", "Furkan", "Hüda"],
    correctAnswer: "Musaddık",
    explanation: "Kuran, kendinden önceki kitapları (Tevrat ve İncil'in aslını) doğrulayıcı (Musaddık) olarak gelmiştir."
  },
  {
    id: 'k_x_38',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Bedir Savaşı'nda meleklerin yardıma gelmesi' hangi surelerde geçer?",
    options: ["Ali İmran ve Enfal", "Tevbe ve Fetih", "Bakara ve Nisa", "Muhammed ve Ahzab"],
    correctAnswer: "Ali İmran ve Enfal",
    explanation: "Ali İmran (123-125) ve Enfal (9-12) surelerinde Bedir'de meleklerin yardımı anlatılır."
  },
  {
    id: 'k_x_39',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Hz. Meryem'in doğumu ve annesinin adağı' hangi surede anlatılır?",
    options: ["Ali İmran", "Meryem", "Nisa", "Enbiya"],
    correctAnswer: "Ali İmran",
    explanation: "İmran'ın karısının (Hanne) 'Karnımdakini sana adadım' demesi ve Meryem'in doğumu Ali İmran suresindedir (Meryem suresinde Hz. İsa'nın doğumu vardır)."
  },
  {
    id: 'k_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de 'Kıble'nin Mescid-i Aksa'dan Mescid-i Haram'a (Kabe) çevrilmesi' hangi surede anlatılır?",
    options: ["Bakara", "Ali İmran", "Hac", "İsra"],
    correctAnswer: "Bakara",
    explanation: "Bakara suresi 144. ayet: 'Yüzünü Mescid-i Haram tarafına çevir' emriyle kıble değişmiştir."
  }
    ]
  },
  hadis: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-40) - HADİS DERYASI (10 PUAN)
  // --------------------------------------------------------
  {
    id: 'h_e_1',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) sözlerine, fiillerine ve onayladığı davranışlara ne denir?",
    options: ["Ayet", "Hadis", "Farz", "Kelam"],
    correctAnswer: "Hadis",
    explanation: "Peygamber Efendimizin sözlü, fiili ve takriri (onayladığı) sünnetlerinin bütününe Hadis denir."
  },
  {
    id: 'h_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Hadis-i Şerife göre 'Ameller (yapılan işler) neye göre değerlendirilir'?",
    options: ["Çokluğuna göre", "Zorluğuna göre", "Niyetlere göre", "Hızına göre"],
    correctAnswer: "Niyetlere göre",
    explanation: "Meşhur hadis: 'Ameller ancak niyetlere göredir. Herkese niyet ettiği şey vardır.'"
  },
  {
    id: 'h_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Temizlik imanın .....' buyurmuştur. Boşluğa ne gelmelidir?",
    options: ["Tamamıdır", "Yarısıdır", "Çeyreğidir", "Başlangıcıdır"],
    correctAnswer: "Yarısıdır",
    explanation: "Hadis-i Şerif: 'Temizlik imanın yarısıdır.'"
  },
  {
    id: 'h_e_4',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Sizin en hayırlınız .....' buyurmuştur. Hadisin devamı nasıldır?",
    options: ["Çok namaz kılandır", "Zengin olandır", "Kuran'ı öğrenen ve öğretendir", "Savaşandır"],
    correctAnswer: "Kuran'ı öğrenen ve öğretendir",
    explanation: "Hadis-i Şerif: 'Sizin en hayırlınız Kuran'ı öğrenen ve öğretendir.'"
  },
  {
    id: 'h_e_5',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Cennet kimlerin ayakları altındadır'?",
    options: ["Babaların", "Annelerin", "Şehitlerin", "Alimlerin"],
    correctAnswer: "Annelerin",
    explanation: "Hadis-i Şerif: 'Cennet annelerin ayakları altındadır.'"
  },
  {
    id: 'h_e_6',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) bir işe başlarken ne söylenmesini tavsiye etmiştir?",
    options: ["Elhamdülillah", "Besmele (Bismillahirrahmanirrahim)", "Allahu Ekber", "Sübhanallah"],
    correctAnswer: "Besmele (Bismillahirrahmanirrahim)",
    explanation: "Hayırla sonuçlanması istenen her meşru işe Besmele ile başlanması Peygamberimizin en önemli sünnetidir."
  },
  {
    id: 'h_e_7',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Kardeşinin yüzüne ..... sadakadır.' Boşluğa ne gelmelidir?",
    options: ["Bakmak", "Tebessüm etmek (Gülümsemek)", "Kızmak", "Bağırmak"],
    correctAnswer: "Tebessüm etmek (Gülümsemek)",
    explanation: "Hadis-i Şerif: 'Din kardeşinin yüzüne tebessüm etmen senin için bir sadakadır.'"
  },
  {
    id: 'h_e_8',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) yemek yerken hangi elimizi kullanmamızı emretmiştir?",
    options: ["Sol el", "Sağ el", "Her iki el", "Fark etmez"],
    correctAnswer: "Sağ el",
    explanation: "Peygamberimiz sağ elle yemeyi ve içmeyi emretmiş, şeytanın sol elle yiyip içtiğini bildirmiştir."
  },
  {
    id: 'h_e_9',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Bizi aldatan .....' buyurmuştur. Hadisin devamı nedir?",
    options: ["Zeki olandır", "Kazanmıştır", "Bizden değildir", "Ticaret yapmıştır"],
    correctAnswer: "Bizden değildir",
    explanation: "Hadis-i Şerif: 'Bizi aldatan bizden değildir.'"
  },
  {
    id: 'h_e_10',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) hapşırınca ne dememizi tavsiye etmiştir?",
    options: ["Çok yaşa", "Elhamdülillah", "Maşallah", "Estağfirullah"],
    correctAnswer: "Elhamdülillah",
    explanation: "Hapşıran kişinin 'Elhamdülillah' demesi, duyanın da 'Yerhamükallah' demesi sünnettir."
  },
  {
    id: 'h_e_11',
    difficulty: 'easy',
    points: 10,
    question: "Hadisleri toplayan en meşhur ve en güvenilir kitabın adı nedir?",
    options: ["Sahih-i Buhari", "Mesnevi", "Risale", "Mektubat"],
    correctAnswer: "Sahih-i Buhari",
    explanation: "İmam Buhari'nin topladığı Sahih-i Buhari, Kuran'dan sonra en güvenilir kitap kabul edilir."
  },
  {
    id: 'h_e_12',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizi gören, ona inanan ve Müslüman olarak ölen kimselere ne denir?",
    options: ["Veli", "Sahabi (Ashab)", "Alim", "Şehit"],
    correctAnswer: "Sahabi (Ashab)",
    explanation: "Peygamber Efendimizle (s.a.v) görüşüp iman eden kutlu nesle Sahabe denir."
  },
  {
    id: 'h_e_13',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Hediyeleşin ki .....' buyurmuştur. Boşluğa ne gelmelidir?",
    options: ["Zengin olun", "Birbirinizi sevebilesiniz", "Borçlanın", "Tanınasınız"],
    correctAnswer: "Birbirinizi sevebilesiniz",
    explanation: "Hadis-i Şerif: 'Hediyeleşin ki, aranızdaki sevgi artsın (muhabbetiniz çoğalsın).'"
  },
  {
    id: 'h_e_14',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Din .....'dır'. Boşluğa ne gelmelidir?",
    options: ["Zorluk", "Nasihat (Samimiyet)", "Korku", "Uyku"],
    correctAnswer: "Nasihat (Samimiyet)",
    explanation: "Hadis-i Şerif: 'Din nasihattir (samimiyettir).'"
  },
  {
    id: 'h_e_15',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) su içerken nasıl içmeyi tavsiye etmiştir?",
    options: ["Ayakta ve tek nefeste", "Oturarak ve üç yudumda", "Yatarak", "Koşarak"],
    correctAnswer: "Oturarak ve üç yudumda",
    explanation: "Suyu oturarak, sağ elle ve üç nefeste içmek sünnettir."
  },
  {
    id: 'h_e_16',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Küçüklerimize merhamet etmeyen, büyüklerimize saygı göstermeyen .....'?",
    options: ["Bizden değildir", "Kötü değildir", "Cahildir", "Güçlüdür"],
    correctAnswer: "Bizden değildir",
    explanation: "Hadis-i Şerif: 'Küçüklerimize merhamet etmeyen, büyüklerimize saygı göstermeyen bizden değildir.'"
  },
  {
    id: 'h_e_17',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) ismi anıldığında ne söyleriz?",
    options: ["Fatiha okuruz", "Salavat getiririz", "Tekbir getiririz", "Tövbe ederiz"],
    correctAnswer: "Salavat getiririz",
    explanation: "Peygamberimizin adı anıldığında 'Allahümme salli ala...' diyerek Salavat getirmek vefa borcudur."
  },
  {
    id: 'h_e_18',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) diş temizliği için ne kullanmayı tavsiye etmiştir?",
    options: ["Misvak", "Kumaş", "Tuz", "Sirke"],
    correctAnswer: "Misvak",
    explanation: "Peygamberimiz 'Ümmetime zor gelmeyeceğini bilseydim her namazda misvak kullanmayı emrederdim' buyurmuştur."
  },
  {
    id: 'h_e_19',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Dua ibadetin .....'dir.",
    options: ["Sonudur", "Yarısıdır", "Özüdür (İliğidir)", "Başlangıcıdır"],
    correctAnswer: "Özüdür (İliğidir)",
    explanation: "Hadis-i Şerif: 'Dua, ibadetin özüdür.'"
  },
  {
    id: 'h_e_20',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) hangi ayakla eve girmeyi tavsiye etmiştir?",
    options: ["Sağ ayak", "Sol ayak", "Çift ayak", "Fark etmez"],
    correctAnswer: "Sağ ayak",
    explanation: "Eve, camiye ve temiz yerlere sağ ayakla girmek; tuvalete sol ayakla girmek sünnettir."
  },
  {
    id: 'h_e_21',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Hiç ölmeyecekmiş gibi ....., yarın ölecekmiş gibi ..... çalışın.'",
    options: ["Dünya için / Ahiret için", "Ahiret için / Dünya için", "Kendin için / Ailen için", "Bugün için / Yarın için"],
    correctAnswer: "Dünya için / Ahiret için",
    explanation: "Meşhur söz: 'Hiç ölmeyecekmiş gibi dünya için, yarın ölecekmiş gibi ahiret için çalışın.'"
  },
  {
    id: 'h_e_22',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Müslüman, elinden ve ..... diğer Müslümanların emin olduğu kimsedir' buyurmuştur.",
    options: ["Cebinden", "Dilinden", "Gözünden", "Ayağından"],
    correctAnswer: "Dilinden",
    explanation: "Hadis-i Şerif: 'Müslüman, elinden ve dilinden diğer Müslümanların zarar görmediği (güvende olduğu) kimsedir.'"
  },
  {
    id: 'h_e_23',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'İki günü birbirine eşit olan .....'?",
    options: ["Kazançtadır", "Ziyandadır", "Rahattadır", "Akıllıdır"],
    correctAnswer: "Ziyandadır",
    explanation: "Hadis-i Şerif: 'İki günü birbirine eşit olan ziyandadır (zarardadır).' Müslüman her gün ilerlemelidir."
  },
  {
    id: 'h_e_24',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) komşusu açken tok yatan hakkında ne buyurmuştur?",
    options: ["Bizden değildir", "İyi yapmıştır", "Tasarrufludur", "Zengindir"],
    correctAnswer: "Bizden değildir",
    explanation: "Hadis-i Şerif: 'Komşusu açken tok yatan bizden değildir (kamil mümin değildir).'"
  },
  {
    id: 'h_e_25',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Kim Allah'a ve ahiret gününe inanıyorsa ya hayır söylesin ya da .....'",
    options: ["Güzel konuşsun", "Sussun", "Bağırsın", "Dua etsin"],
    correctAnswer: "Sussun",
    explanation: "Hadis-i Şerif: 'Allah'a ve ahiret gününe inanan ya hayır söylesin ya da sussun.'"
  },
  {
    id: 'h_e_26',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) yatarken hangi tarafa yatmayı tavsiye etmiştir?",
    options: ["Yüz üstü", "Sırt üstü", "Sağ yanına", "Sol yanına"],
    correctAnswer: "Sağ yanına",
    explanation: "Sağ yanına yatmak, sağ elini yanağının altına koymak sünnettir."
  },
  {
    id: 'h_e_27',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Kolaylaştırınız, .....; müjdeleyiniz, .....'",
    options: ["Zorlaştırmayınız / Nefret ettirmeyiniz", "Acele ediniz / Korkutunuz", "Para isteyiniz / Kaçırınız", "Bekleyiniz / Üzünüz"],
    correctAnswer: "Zorlaştırmayınız / Nefret ettirmeyiniz",
    explanation: "Hadis-i Şerif: 'Kolaylaştırınız, zorlaştırmayınız; müjdeleyiniz, nefret ettirmeyiniz.'"
  },
  {
    id: 'h_e_28',
    difficulty: 'easy',
    points: 10,
    question: "En çok hadis rivayet eden (anlatan) sahabi kimdir?",
    options: ["Hz. Ali", "Ebu Hureyre", "Hz. Ömer", "Hz. Bilal"],
    correctAnswer: "Ebu Hureyre",
    explanation: "Peygamberimizin (s.a.v) duasını alan Ebu Hureyre (r.a), 5000'den fazla hadis rivayet etmiştir."
  },
  {
    id: 'h_e_29',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Allah katında amellerin en sevimlisi ..... olandır' buyurmuştur.",
    options: ["Çok olan", "Pahalı olan", "Az da olsa devamlı", "Gizli olan"],
    correctAnswer: "Az da olsa devamlı",
    explanation: "Hadis-i Şerif: 'Amellerin Allah'a en sevimli geleni, az da olsa devamlı olanıdır.'"
  },
  {
    id: 'h_e_30',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) Cuma günü için hangisini tavsiye etmemiştir?",
    options: ["Gusül abdesti almak", "Güzel koku sürünmek", "Tırnak kesmek", "Oruç tutmak (Sadece Cuma)"],
    correctAnswer: "Oruç tutmak (Sadece Cuma)",
    explanation: "Sadece Cuma günü nafile oruç tutmak mekruh görülmüştür. Diğer şıklar Cuma sünnetlerindendir."
  },
  {
    id: 'h_e_31',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Sebep olan ..... gibidir.'",
    options: ["Yapan", "Bakan", "Kaçan", "Bozan"],
    correctAnswer: "Yapan",
    explanation: "Hadis-i Şerif: 'Bir hayra sebep olan (vesile olan), onu yapan gibidir.'"
  },
  {
    id: 'h_e_32',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Doğruluk iyiliğe, iyilik de ..... götürür' buyurmuştur.",
    options: ["Zenginliğe", "Cennete", "Makam", "Şöhrete"],
    correctAnswer: "Cennete",
    explanation: "Hadis-i Şerif: 'Doğruluktan ayrılmayın. Doğruluk iyiliğe, iyilik de cennete götürür.'"
  },
  {
    id: 'h_e_33',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Namaz dinin .....' buyurmuştur.",
    options: ["Direğidir", "Çatısıdır", "Kapısıdır", "Anahtarıdır"],
    correctAnswer: "Direğidir",
    explanation: "Hadis-i Şerif: 'Namaz dinin direğidir. Kim onu kılarsa dinini ayakta tutmuş olur.'"
  },
  {
    id: 'h_e_34',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'İlim öğrenmek her Müslümana .....'",
    options: ["Sünnettir", "Farzdır", "Mübahtır", "Müstehaptır"],
    correctAnswer: "Farzdır",
    explanation: "Hadis-i Şerif: 'İlim öğrenmek, kadın-erkek her Müslümana farzdır.'"
  },
  {
    id: 'h_e_35',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Veren el, ..... elden üstündür' buyurmuştur.",
    options: ["Alan", "Tutan", "Saklayan", "Bakan"],
    correctAnswer: "Alan",
    explanation: "Hadis-i Şerif: 'Veren el, alan elden üstündür (hayırlıdır).'"
  },
  {
    id: 'h_e_36',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Kıyamet kopuyor olsa bile elinizdeki ..... dikiniz.'",
    options: ["Parayı", "Fidanı", "Bayrağı", "Çadırı"],
    correctAnswer: "Fidanı",
    explanation: "Hadis-i Şerif: 'Kıyametin kopacağını bilseniz bile elinizdeki fidanı dikiniz.'"
  },
  {
    id: 'h_e_37',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'İnsanlara teşekkür etmeyen, Allah'a ..... etmez' buyurmuştur.",
    options: ["Dua", "İbadet", "Şükür", "Tövbe"],
    correctAnswer: "Şükür",
    explanation: "Hadis-i Şerif: 'İnsanlara teşekkür etmeyen, Allah'a şükretmez.'"
  },
  {
    id: 'h_e_38',
    difficulty: 'easy',
    points: 10,
    question: "Hadise göre 'Güçlü kimse güreşte rakibini yenen değil, ..... anında kendine hakim olandır.'",
    options: ["Korku", "Öfke (Kızgınlık)", "Yemek", "Uyku"],
    correctAnswer: "Öfke (Kızgınlık)",
    explanation: "Hadis-i Şerif: 'Gerçek pehlivan (güçlü kimse), öfkelendiği zaman nefsine hakim olandır.'"
  },
  {
    id: 'h_e_39',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Hased (kıskançlık), ateşin ..... yediği gibi iyilikleri yer bitirir' buyurmuştur.",
    options: ["Odunu", "Demiri", "Suyu", "Taşı"],
    correctAnswer: "Odunu",
    explanation: "Hadis-i Şerif: 'Hasetten sakının. Çünkü ateşin odunu yiyip bitirdiği gibi haset de iyilikleri yer bitirir.'"
  },
  {
    id: 'h_e_40',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) hangi ameli 'Dinin zirvesi' olarak tanımlamıştır?",
    options: ["Oruç", "Cihad (Allah yolunda gayret)", "Hac", "Zekat"],
    correctAnswer: "Cihad (Allah yolunda gayret)",
    explanation: "Hadis-i Şerif: 'İşin başı İslam, direği namaz, zirvesi ise cihattır.'"
  },
  // --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - HADİS DERYASI (20 PUAN)
  // --------------------------------------------------------
  {
    id: 'h_m_1',
    difficulty: 'medium',
    points: 20,
    question: "Hem Buhari hem de Müslim'in ittifakla rivayet ettiği hadislere ne denir?",
    options: ["Mütevatir", "Muttafakun Aleyh", "Hasen", "Zayıf"],
    correctAnswer: "Muttafakun Aleyh",
    explanation: "İki büyük hadis alimi Buhari ve Müslim'in ortaklaşa kitaplarına aldığı hadislere 'üzerinde ittifak edilen' anlamında Muttafakun Aleyh denir."
  },
  {
    id: 'h_m_2',
    difficulty: 'medium',
    points: 20,
    question: "Peygamber Efendimizin (s.a.v) dış görünüşünü ve ahlakını anlatan eserlere ne denir?",
    options: ["Hilye", "Siyer", "Megazi", "Tefsir"],
    correctAnswer: "Hilye",
    explanation: "Peygamberimizin fiziki özelliklerini ve güzelliklerini anlatan edebi metinlere ve levhalara Hilye-i Şerif denir."
  },
  {
    id: 'h_m_3',
    difficulty: 'medium',
    points: 20,
    question: "Kütüb-i Sitte (Altı Kitap) içindeki en sahih kabul edilen iki kitaba ne ad verilir?",
    options: ["Sahihayn", "Sünen", "Müsned", "Cami"],
    correctAnswer: "Sahihayn",
    explanation: "Sahih-i Buhari ve Sahih-i Müslim'e, 'İki Sahih' anlamında Sahihayn denir."
  },
  {
    id: 'h_m_4',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Müslümanın Müslüman üzerindeki hakkı' kaç tanedir (Selam almak, hasta ziyareti vb.)?",
    options: ["3", "5 (veya 6)", "10", "40"],
    correctAnswer: "5 (veya 6)",
    explanation: "Meşhur hadiste 5 (bazı rivayetlerde 6) hak sayılır: Selam almak, davete icabet, nasihat isteyene nasihat, hapşırana dua, hasta ziyareti (ve cenazeye katılmak)."
  },
  {
    id: 'h_m_5',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Her ay üç gün oruç tutmak, bütün yılı oruçlu geçirmek gibidir' buyurmuştur. Bu günlere ne denir?",
    options: ["Eyyam-ı Bîz (Aydınlık Günler)", "Aşure Günleri", "Kadir Geceleri", "Bayram Günleri"],
    correctAnswer: "Eyyam-ı Bîz (Aydınlık Günler)",
    explanation: "Hicri ayların 13, 14 ve 15. günlerine (dolunay zamanı) Eyyam-ı Bîz denir ve oruç tutmak sünnettir."
  },
  {
    id: 'h_m_6',
    difficulty: 'medium',
    points: 20,
    question: "Peygamber Efendimizin (s.a.v) sözlerine değil, bizzat yaptığı davranışlara ne denir?",
    options: ["Kavli Sünnet", "Fiili Sünnet", "Takriri Sünnet", "Farz"],
    correctAnswer: "Fiili Sünnet",
    explanation: "Peygamberimizin namaz kılışı, hac yapışı gibi bizzat yaparak gösterdiği sünnetlere Fiili Sünnet denir."
  },
  {
    id: 'h_m_7',
    difficulty: 'medium',
    points: 20,
    question: "Hadis ilmine göre hadisi rivayet eden kişilerin oluşturduğu zincire ne ad verilir?",
    options: ["Senet (İsnad)", "Metin", "Ravi", "Tarih"],
    correctAnswer: "Senet (İsnad)",
    explanation: "Hadisin bize ulaşmasını sağlayan raviler zincirine Senet veya İsnad denir."
  },
  {
    id: 'h_m_8',
    difficulty: 'medium',
    points: 20,
    question: "Hadislerde 'Kıyamet günü ilk hesaba çekilecek amel' hangisidir?",
    options: ["Zekat", "Oruç", "Namaz", "Hac"],
    correctAnswer: "Namaz",
    explanation: "Hadis-i Şerif: 'Kulun kıyamet günü ilk hesaba çekileceği ameli namazıdır. O tamamsa kurtulur.'"
  },
  {
    id: 'h_m_9',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Kim bir hayra vesile olursa .....' buyurmuştur.",
    options: ["Onu yapan gibidir", "Sevabının yarısını alır", "Cennete gider", "Günahları silinir"],
    correctAnswer: "Onu yapan gibidir",
    explanation: "Hadis-i Şerif: 'Hayra vesile olan, hayrı yapan gibidir' (Ed-dâllü alel hayri ke fâilihî)."
  },
  {
    id: 'h_m_10',
    difficulty: 'medium',
    points: 20,
    question: "Peygamber Efendimizin (s.a.v) 'Müekked Sünnet'i ne demektir?",
    options: ["Devamlı yaptığı, nadiren terk ettiği", "Ara sıra yaptığı", "Terk ettiği", "Farz olduğu"],
    correctAnswer: "Devamlı yaptığı, nadiren terk ettiği",
    explanation: "Sabah ve öğle namazının sünnetleri gibi, Peygamberimizin devamlı yaptığı kuvvetli sünnetlere Müekked Sünnet denir."
  },
  {
    id: 'h_m_11',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Gıybet'in tanımı nedir?",
    options: ["Kardeşini hoşlanmayacağı bir şeyle anmak", "Yalan söylemek", "İftira atmak", "Yüzüne karşı konuşmak"],
    correctAnswer: "Kardeşini hoşlanmayacağı bir şeyle anmak",
    explanation: "Sahabe 'Eğer dediğimiz onda varsa?' diye sorunca, Peygamberimiz 'Varsa gıybet, yoksa iftira olur' buyurmuştur."
  },
  {
    id: 'h_m_12',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Misafirine ikram etmeyen .....' buyurmuştur.",
    options: ["Bizden değildir", "Hayır yoktur", "Cimridir", "Zengindir"],
    correctAnswer: "Hayır yoktur",
    explanation: "Hadis-i Şerif: 'Misafirine ikram etmeyende hayır yoktur.'"
  },
  {
    id: 'h_m_13',
    difficulty: 'medium',
    points: 20,
    question: "Hadislerde 'Münafığın alameti' kaç olarak sayılmıştır?",
    options: ["1", "3", "7", "40"],
    correctAnswer: "3",
    explanation: "Hadis-i Şerif: 'Münafığın alameti üçtür: Konuşunca yalan söyler, söz verince sözünde durmaz, emanete hıyanet eder.'"
  },
  {
    id: 'h_m_14',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Dünya müminin ....., kafirin .....' buyurmuştur.",
    options: ["Zindanı / Cennetidir", "Tarlası / Bahçesidir", "Evi / Otelidir", "İmtihanı / Ödülüdür"],
    correctAnswer: "Zindanı / Cennetidir",
    explanation: "Hadis-i Şerif: 'Dünya müminin zindanı, kafirin cennetidir.'"
  },
  {
    id: 'h_m_15',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'İman etmedikçe cennete giremezsiniz, ..... iman etmiş olmazsınız' buyurmuştur.",
    options: ["Birbirinizi sevmedikçe", "Namaz kılmadıkça", "Cihad etmedikçe", "Sadaka vermedikçe"],
    correctAnswer: "Birbirinizi sevmedikçe",
    explanation: "Müslümanlar arası sevgi ve kardeşlik imanın kemale ermesi için şart koşulmuştur."
  },
  {
    id: 'h_m_16',
    difficulty: 'medium',
    points: 20,
    question: "Hadis-i Şerifte 'Kişi ..... ile beraberdir' buyurulmuştur.",
    options: ["Sevdiği", "Eşi", "Arkadaşı", "Düşmanı"],
    correctAnswer: "Sevdiği",
    explanation: "Hadis-i Şerif: 'Kişi (ahirette) sevdiği ile beraberdir.'"
  },
  {
    id: 'h_m_17',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) hangi namazı 'Gözümün nuru' olarak nitelendirmiştir?",
    options: ["Namaz (Genel)", "Teheccüd", "Teravih", "Cuma"],
    correctAnswer: "Namaz (Genel)",
    explanation: "Hadis-i Şerif: 'Bana dünyadan üç şey sevdirildi... Gözümün nuru ise namaz kılındı.'"
  },
  {
    id: 'h_m_18',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Sadaka ..... söndürdüğü gibi hataları (günahları) söndürür (yok eder).'",
    options: ["Suyun ateşi", "Güneşin karı", "Rüzgarın mumu", "Toprağın ateşi"],
    correctAnswer: "Suyun ateşi",
    explanation: "Hadis-i Şerif: 'Su ateşi söndürdüğü gibi, sadaka da günahları yok eder.'"
  },
  {
    id: 'h_m_19',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Sizin en hayırlınız ..... en güzel olandır' buyurmuştur.",
    options: ["Ahlakı", "Yüzü", "Sesi", "Malı"],
    correctAnswer: "Ahlakı",
    explanation: "Hadis-i Şerif: 'Sizin en hayırlınız, ahlakı en güzel olanınızdır.'"
  },
  {
    id: 'h_m_20',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Allah'ın rızası ..... rızasındadır.'",
    options: ["Anne-babanın", "Hocanın", "Amirin", "Arkadaşın"],
    correctAnswer: "Anne-babanın",
    explanation: "Hadis-i Şerif: 'Rabbin rızası anne-babanın rızasında, gazabı da anne-babanın gazabındadır.'"
  },
  {
    id: 'h_m_21',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Yedi sınıf insan vardır ki, Allah onları kendi gölgesinden başka gölge olmayan günde gölgelendirir.' Bunlardan biri hangisidir?",
    options: ["Adaletli yönetici", "Çok uyuyan", "Çok yemek yiyen", "Çok konuşan"],
    correctAnswer: "Adaletli yönetici",
    explanation: "Adaletli devlet başkanı ve neşeyi ibadette bulan genç, bu 7 sınıftan bazılarıdır."
  },
  {
    id: 'h_m_22',
    difficulty: 'medium',
    points: 20,
    question: "Kırk hadis derleme geleneği hangi hadise dayanır?",
    options: ["Kim ümmetim için 40 hadis ezberlerse şefaatçisi olurum", "Her gün 40 hadis okuyun", "Kuran 40 cüzdür", "40 sayısı uğurludur"],
    correctAnswer: "Kim ümmetim için 40 hadis ezberlerse şefaatçisi olurum",
    explanation: "Zayıf da olsa bu hadis-i şerif sebebiyle İslam tarihinde 'Erbain' (Kırk Hadis) geleneği oluşmuştur."
  },
  {
    id: 'h_m_23',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Ümmetimin fesada uğradığı zamanda kim sünnetime sarılırsa ona ..... sevabı vardır' buyurmuştur.",
    options: ["Yüz şehit", "Bir şehit", "Hac", "Umre"],
    correctAnswer: "Yüz şehit",
    explanation: "Ahir zamanda sünneti yaşamanın zorluğu ve kıymeti '100 şehit sevabı' ile anlatılmıştır."
  },
  {
    id: 'h_m_24',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Kim Cuma günü ..... okursa, iki Cuma arası nurla aydınlanır.'",
    options: ["Kehf Suresi", "Yasin Suresi", "Mülk Suresi", "Fetih Suresi"],
    correctAnswer: "Kehf Suresi",
    explanation: "Cuma günü Kehf suresini okumak Peygamberimizin tavsiye ettiği faziletli bir ameldir."
  },
  {
    id: 'h_m_25',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) yemekten sonra nasıl dua etmiştir?",
    options: ["Bizi yediren, içiren ve Müslüman kılan Allah'a hamdolsun", "Bize çok para ver", "Bizi zengin et", "Bize uzun ömür ver"],
    correctAnswer: "Bizi yediren, içiren ve Müslüman kılan Allah'a hamdolsun",
    explanation: "Yemek duası sünnettir ve nimeti veren Allah'a şükür ifadesidir."
  },
  {
    id: 'h_m_26',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) ' ..... imandandır' buyurmuştur.",
    options: ["Haya (Utanma duygusu)", "Gülmek", "Uyumak", "Koşmak"],
    correctAnswer: "Haya (Utanma duygusu)",
    explanation: "Hadis-i Şerif: 'Haya (utanma) imandandır.'"
  },
  {
    id: 'h_m_27',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'İnsanoğlu öldüğü zaman ameli kesilir, ancak üç şey hariç.' Aşağıdakilerden hangisi bunlardan değildir?",
    options: ["Sadaka-i Cariye", "Faydalı İlim", "Hayırlı Evlat", "Biriktirdiği Para"],
    correctAnswer: "Biriktirdiği Para",
    explanation: "Öldükten sonra sevabı devam eden üç şey: Sadaka-i cariye, faydalanılan ilim ve dua eden hayırlı evlattır."
  },
  {
    id: 'h_m_28',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Kim Allah'a ve ahiret gününe inanıyorsa misafirine ..... etsin' buyurmuştur.",
    options: ["İkram", "Hizmet", "Sohbet", "Dua"],
    correctAnswer: "İkram",
    explanation: "Hadis-i Şerif: 'Kim Allah'a ve ahiret gününe inanıyorsa misafirine ikram etsin.'"
  },
  {
    id: 'h_m_29',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) bir topluluğa (meclise) gelince nereye otururdu?",
    options: ["Meclisin (halkanın) bittiği yere", "Baş köşeye", "En öne", "Yüksek bir yere"],
    correctAnswer: "Meclisin (halkanın) bittiği yere",
    explanation: "Peygamberimiz tevazusundan dolayı baş köşeye geçmez, boş bulduğu yere otururdu."
  },
  {
    id: 'h_m_30',
    difficulty: 'medium',
    points: 20,
    question: "Hadis-i Kudsî ne demektir?",
    options: ["Manası Allah'tan, sözleri Peygamberden olan hadisler", "Kuran ayetleri", "Sahabe sözleri", "Zayıf hadisler"],
    correctAnswer: "Manası Allah'tan, sözleri Peygamberden olan hadisler",
    explanation: "Peygamberimizin 'Rabbim şöyle buyurdu' diye Allah'tan naklettiği (Kuran olmayan) sözlere Hadis-i Kudsî denir."
  },
  {
    id: 'h_m_31',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Mümin, bir delikten (yılan deliği) ..... defa ısırılmaz' buyurmuştur.",
    options: ["İki", "Üç", "Beş", "On"],
    correctAnswer: "İki",
    explanation: "Mümin uyanık olmalı, aynı hataya iki kez düşmemelidir."
  },
  {
    id: 'h_m_32',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Mazlumun (haksızlığa uğrayanın) bedduasından sakının, çünkü.....'",
    options: ["Onunla Allah arasında perde yoktur", "O çok güçlüdür", "O haklıdır", "O fakirdir"],
    correctAnswer: "Onunla Allah arasında perde yoktur",
    explanation: "Allah mazlumun duasını/bedduasını mutlaka kabul eder."
  },
  {
    id: 'h_m_33',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Her kim Ramazan orucunu tutar ve sonra ona Şevval ayından ..... gün eklerse, bütün yılı oruçlu geçirmiş gibi olur' buyurmuştur.",
    options: ["Altı", "Üç", "On", "Bir"],
    correctAnswer: "Altı",
    explanation: "Ramazan'dan sonra Şevval ayında 6 gün oruç tutmak sünnettir."
  },
  {
    id: 'h_m_34',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Cennetin anahtarı namaz, namazın anahtarı ise .....'dır.'",
    options: ["Abdest (Temizlik)", "Niyet", "Kıble", "Zaman"],
    correctAnswer: "Abdest (Temizlik)",
    explanation: "Hadis-i Şerif: 'Namazın anahtarı taharet (temizlik/abdest)tir.'"
  },
  {
    id: 'h_m_35',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Zenginlik mal çokluğuyla değil, ..... zenginliğiyledir' buyurmuştur.",
    options: ["Gönül", "Akıl", "Arkadaş", "Bilgi"],
    correctAnswer: "Gönül",
    explanation: "Gerçek zenginlik kanaat etmek ve gönül tokluğudur."
  },
  {
    id: 'h_m_36',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Şeytanın ..... ile (veya ..... vakti) bağladığı üç düğüm, namaz kılınca çözülür.'",
    options: ["Uykudayken / Sabah", "Yemek yerken / Öğle", "Gezerken / Akşam", "Konuşurken / Yatsı"],
    correctAnswer: "Uykudayken / Sabah",
    explanation: "Sabah namazına kalkmakta zorlanmanın sebebi olarak anlatılan hadiste, uyanmak, abdest almak ve namaz kılmakla düğümlerin çözüleceği müjdelenir."
  },
  {
    id: 'h_m_37',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Ümmetimin en şereflileri .....' buyurmuştur.",
    options: ["Kuran'ı taşıyanlardır (Hafızlar)", "Zenginlerdir", "Yöneticilerdir", "Tüccarlardır"],
    correctAnswer: "Kuran'ı taşıyanlardır (Hafızlar)",
    explanation: "Hadis-i Şerif: 'Ümmetimin en şereflileri, Kuran'ı yüklenenler (hamile-i Kuran) ve gece ibadet edenlerdir.'"
  },
  {
    id: 'h_m_38',
    difficulty: 'medium',
    points: 20,
    question: "Hadise göre 'Allah sizin suretlerinize (dış görünüş) ve mallarınıza bakmaz, ancak ..... ve amellerinize bakar.'",
    options: ["Kalplerinize", "Elbiselerinize", "Evlerinize", "Arabalarınıza"],
    correctAnswer: "Kalplerinize",
    explanation: "Hadis-i Şerif: 'Allah kalplerinize ve niyetlerinize bakar.'"
  },
  {
    id: 'h_m_39',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Hiçbir baba, çocuğuna ..... daha üstün bir hediye (miras) bırakmamıştır' buyurmuştur.",
    options: ["Güzel terbiyeden (ahlaktan)", "Çok paradan", "Büyük evden", "Ticaret bilgisinden"],
    correctAnswer: "Güzel terbiyeden (ahlaktan)",
    explanation: "Hadis-i Şerif: 'Baba evladına güzel ahlaktan daha kıymetli bir miras bırakmamıştır.'"
  },
  {
    id: 'h_m_40',
    difficulty: 'medium',
    points: 20,
    question: "Hadis-i Şerifte 'Dua ile kader arasında nasıl bir ilişki' olduğu belirtilmiştir?",
    options: ["Dua kazayı (belayı) geri çevirir", "Kader değişmez, dua faydasızdır", "Dua sadece tesellidir", "Kader duaya göre yazılmaz"],
    correctAnswer: "Dua kazayı (belayı) geri çevirir",
    explanation: "Hadis-i Şerif: 'Kazayı (muallak kaderi) ancak dua geri çevirir, ömrü ancak iyilik uzatır.'"
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - HADİS DERYASI (30 PUAN)
  // --------------------------------------------------------
  {
    id: 'h_h_1',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde, Peygamberimize (s.a.v) ait olmayıp uydurulan sözlere ne denir?",
    options: ["Zayıf", "Mevzu", "Mürsel", "Mevkuf"],
    correctAnswer: "Mevzu",
    explanation: "Mevzu hadis, Peygamberimiz söylemediği halde ona nispet edilen uydurma sözdür."
  },
  {
    id: 'h_h_2',
    difficulty: 'hard',
    points: 30,
    question: "Senedinde sahabi atlanarak, Tabiin'in doğrudan Peygamberimizden (s.a.v) naklettiği hadise ne denir?",
    options: ["Mürsel", "Muttasıl", "Merfu", "Müsned"],
    correctAnswer: "Mürsel",
    explanation: "Senedin sonundaki sahabinin ismi düşürülerek, Tabiin neslinden birinin 'Rasulullah buyurdu ki' dediği hadistir."
  },
  {
    id: 'h_h_3',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimize değil, Sahabilere ait olan söz ve fiillere hadis ilminde ne denir?",
    options: ["Merfu", "Mevkuf", "Maktu", "Kudsi"],
    correctAnswer: "Mevkuf",
    explanation: "Senedi Peygamberimize kadar ulaşmayıp sahabide kalan (sahabi sözü olan) rivayetlere Mevkuf denir."
  },
  {
    id: 'h_h_4',
    difficulty: 'hard',
    points: 30,
    question: "Yalan üzere birleşmeleri aklen mümkün olmayan kalabalık bir topluluğun rivayet ettiği hadise ne denir?",
    options: ["Mütevatir", "Ahad", "Aziz", "Garib"],
    correctAnswer: "Mütevatir",
    explanation: "Nesilden nesile yalan söylemesi imkansız büyük topluluklarca aktarılan, kesin bilgi ifade eden hadislerdir."
  },
  {
    id: 'h_h_5',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde 'Şeyhayn' (İki Şeyh/Üstad) tabiri kimler için kullanılır?",
    options: ["Ebu Hanife ve İmameyn", "Hz. Ebubekir ve Hz. Ömer", "Buhari ve Müslim", "Hasan ve Hüseyin"],
    correctAnswer: "Buhari ve Müslim",
    explanation: "Hadis literatüründe Şeyhayn denince, en sahih iki kitabın müellifi İmam Buhari ve İmam Müslim kastedilir."
  },
  {
    id: 'h_h_6',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ravilerinin güvenilir olup olmadıklarını inceleyen ilim dalına ne denir?",
    options: ["Cerh ve Ta'dil", "Esbab-ı Nüzul", "Garibu'l Hadis", "Fıkhu'l Hadis"],
    correctAnswer: "Cerh ve Ta'dil",
    explanation: "Ravilerin kusurlarını (Cerh) veya adaletini/güvenilirliğini (Ta'dil) inceleyen ilimdir."
  },
  {
    id: 'h_h_7',
    difficulty: 'hard',
    points: 30,
    question: "Konularına göre düzenlenen ve Fıkıh bablarına (Taharet, Namaz vb.) göre sıralanan hadis kitaplarına ne denir?",
    options: ["Sünen", "Müsned", "Mucem", "Erbain"],
    correctAnswer: "Sünen",
    explanation: "Ebu Davud, Tirmizi, Nesai ve İbn Mace'nin eserleri gibi fıkıh konularına göre düzenlenen kitaplara Sünen denir."
  },
  {
    id: 'h_h_8',
    difficulty: 'hard',
    points: 30,
    question: "İmam Malik'in yazdığı, hem hadis hem fıkıh kitabı olan ilk dönem eserin adı nedir?",
    options: ["Muvatta", "Müsned", "Sahih", "Müstedrek"],
    correctAnswer: "Muvatta",
    explanation: "İmam Malik b. Enes'in Muvatta'sı, en eski ve en muteber hadis-fıkıh kaynaklarından biridir."
  },
  {
    id: 'h_h_9',
    difficulty: 'hard',
    points: 30,
    question: "Ravilerin isimlerine (veya Sahabe isimlerine) göre alfabetik düzenlenen hadis kitaplarına ne denir?",
    options: ["Mucem (veya Müsned)", "Sünen", "Cami", "Mustahrec"],
    correctAnswer: "Mucem (veya Müsned)",
    explanation: "Sahabe adlarına göre ise Müsned (Ahmed b. Hanbel gibi), ravilerin adlarına göre alfabetik ise Mucem (Taberani gibi) denir."
  },
  {
    id: 'h_h_10',
    difficulty: 'hard',
    points: 30,
    question: "Abdullah b. Amr b. As'ın (r.a) Peygamberimizden bizzat duyup yazdığı hadis sahifesinin adı nedir?",
    options: ["Sahife-i Sadıka", "Sahife-i Hemmam", "Müsned", "Risale"],
    correctAnswer: "Sahife-i Sadıka",
    explanation: "Peygamberimizin izniyle hadisleri yazan Abdullah b. Amr'ın notlarına Sahife-i Sadıka denir."
  },
  {
    id: 'h_h_11',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde 'Muksirûn' (Çok hadis rivayet edenler) arasında en çok hadis rivayet eden sahabi kimdir?",
    options: ["Hz. Aişe", "Abdullah b. Ömer", "Ebu Hureyre", "Enes b. Malik"],
    correctAnswer: "Ebu Hureyre",
    explanation: "Ebu Hureyre (r.a), 5374 hadis ile en çok hadis rivayet eden (Muksirûn) sahabidir."
  },
  {
    id: 'h_h_12',
    difficulty: 'hard',
    points: 30,
    question: "Meşhur hadis kitabı 'Riyazü's Salihin'in yazarı kimdir?",
    options: ["İmam Nevevi", "İmam Gazali", "İmam Suyuti", "İbn Hacer"],
    correctAnswer: "İmam Nevevi",
    explanation: "İmam Nevevi'nin Riyazü's Salihin eseri, en çok okunan hadis derlemelerinden biridir."
  },
  {
    id: 'h_h_13',
    difficulty: 'hard',
    points: 30,
    question: "Bir hadisin senedinin baş tarafından bir veya birkaç ravinin düşürülerek (doğrudan 'Kale Rasulullah' denerek) rivayet edilmesine ne denir?",
    options: ["Muallak", "Mudal", "Münkatı", "Mürsel"],
    correctAnswer: "Muallak",
    explanation: "Senedin baş tarafı hazfedilmiş (askıda kalmış) hadislere Muallak hadis denir (Buhari'de bölüm başlıklarında çoktur)."
  },
  {
    id: 'h_h_14',
    difficulty: 'hard',
    points: 30,
    question: "Güvenilir (Sika) bir ravinin, kendisinden daha güvenilir bir raviye aykırı olarak rivayet ettiği hadise ne denir?",
    options: ["Şaz", "Münker", "Mahfuz", "Maruf"],
    correctAnswer: "Şaz",
    explanation: "Güvenilir birinin daha güvenilir olana muhalefetine Şaz, o daha güvenilir olanın rivayetine Mahfuz denir."
  },
  {
    id: 'h_h_15',
    difficulty: 'hard',
    points: 30,
    question: "Zayıf bir ravinin, güvenilir (Sika) bir raviye aykırı rivayet ettiği hadise ne denir?",
    options: ["Münker", "Şaz", "Millet", "Metruk"],
    correctAnswer: "Münker",
    explanation: "Zayıf ravinin güvenilir raviye zıt rivayetine Münker, güvenilir olanınkine Maruf denir."
  },
  {
    id: 'h_h_16',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde 'Metin' ne demektir?",
    options: ["Hadisin asıl söz kısmı", "Raviler zinciri", "Kitabın cildi", "Yazarın adı"],
    correctAnswer: "Hadisin asıl söz kısmı",
    explanation: "Sened (raviler zinciri) bittikten sonra başlayan, Peygamberimizin sözünün olduğu kısımdır."
  },
  {
    id: 'h_h_17',
    difficulty: 'hard',
    points: 30,
    question: "Kütüb-i Sitte (Altı Kitap) yazarlarından hangisi bu grubun içinde sayılmaz?",
    options: ["İmam Malik", "İbn Mace", "Tirmizi", "Nesai"],
    correctAnswer: "İmam Malik",
    explanation: "Kütüb-i Sitte: Buhari, Müslim, Ebu Davud, Tirmizi, Nesai ve İbn Mace'dir. İmam Malik'in Muvatta'sı genellikle bu altılıya dahil edilmez."
  },
  {
    id: 'h_h_18',
    difficulty: 'hard',
    points: 30,
    question: "Buhari'nin Sahih'ine yazılan en meşhur şerh (açıklama) kitabı 'Fethu'l Bari' kime aittir?",
    options: ["İbn Hacer el-Askalani", "Ayni", "Kastallani", "Nevevi"],
    correctAnswer: "İbn Hacer el-Askalani",
    explanation: "İbn Hacer'in Fethu'l Bari'si, hadis şerhleri içinde en önemli kaynaklardan biri kabul edilir."
  },
  {
    id: 'h_h_19',
    difficulty: 'hard',
    points: 30,
    question: "Hadislerde geçen 'Müflis' (İflas eden) kimdir?",
    options: ["Kıyamette sevapları hak sahiplerine dağıtılan kişi", "Parası biten", "Ticarette batan", "Borçlu ölen"],
    correctAnswer: "Kıyamette sevapları hak sahiplerine dağıtılan kişi",
    explanation: "Hadise göre gerçek müflis; namazla oruçla gelip, ona buna sövdüğü/hakkını yediği için sevapları alınan ve günah yüklenen kişidir."
  },
  {
    id: 'h_h_20',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Veda Hutbesi'nde' hangi iki şeyi emanet bıraktığını söylemiştir?",
    options: ["Kuran ve Sünnet (Ehl-i Beyt)", "Kuran ve Kabe", "Namaz ve Oruç", "Eshab ve Ensar"],
    correctAnswer: "Kuran ve Sünnet (Ehl-i Beyt)",
    explanation: "Veda hutbesinin farklı rivayetlerinde 'Size iki şey bırakıyorum: Allah'ın Kitabı ve Sünnetim (veya Ehl-i Beytim)' buyurulmuştur."
  },
  {
    id: 'h_h_21',
    difficulty: 'hard',
    points: 30,
    question: "Ahirette Peygamberimizin (s.a.v) müminlere ikram edeceği havuzun adı nedir?",
    options: ["Havz-ı Kevser", "Zemzem", "Selsebil", "Tesnim"],
    correctAnswer: "Havz-ı Kevser",
    explanation: "Kıyamet günü Peygamberimizin başında duracağı ve ümmetine su vereceği havuza Havz-ı Kevser denir."
  },
  {
    id: 'h_h_22',
    difficulty: 'hard',
    points: 30,
    question: "Hadislerde 'Deccal'ın en belirgin fiziksel özelliği nedir?",
    options: ["Tek gözünün kör olması", "Çok uzun boylu olması", "Kanatlı olması", "Boynuzlu olması"],
    correctAnswer: "Tek gözünün kör olması",
    explanation: "Hadislerde Deccal'in bir gözünün (sağ) kör/salkım üzüm gibi olduğu belirtilir."
  },
  {
    id: 'h_h_23',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Şefaatim ümmetimden ..... içindir' buyurmuştur.",
    options: ["Büyük günah işleyenler", "Çok ibadet edenler", "Sahabeler", "Hafızlar"],
    correctAnswer: "Büyük günah işleyenler",
    explanation: "Hadis-i Şerif: 'Şefaatim ümmetimden büyük günah işleyenler (ehl-i kebâir) içindir.'"
  },
  {
    id: 'h_h_24',
    difficulty: 'hard',
    points: 30,
    question: "Hadislerde 'Fitne uykudadır, .....' buyurulmuştur. Devamı nasıldır?",
    options: ["Uyandırana Allah lanet etsin", "Sakın uyandırmayın", "Onu öldürün", "Ondan kaçın"],
    correctAnswer: "Uyandırana Allah lanet etsin",
    explanation: "Müslümanlar arası kargaşayı (fitneyi) körüklemenin kötülüğü bu hadisle anlatılmıştır."
  },
  {
    id: 'h_h_25',
    difficulty: 'hard',
    points: 30,
    question: "Hadislerde 'Cibril Hadisi' olarak bilinen uzun hadiste Cebrail (a.s) hangisini sormamıştır?",
    options: ["Kıyametin ne zaman kopacağını", "İmanın ne olduğunu", "İslamın ne olduğunu", "İhsanın ne olduğunu"],
    correctAnswer: "Kıyametin ne zaman kopacağını",
    explanation: "Cebrail kıyametin 'zamanını' sormuş, Peygamberimiz 'Sorulan sorandan iyi bilmez' demiştir. Diğerlerini (İman, İslam, İhsan) sorup tanımlarını tasdik etmiştir."
  },
  {
    id: 'h_h_26',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde 'Tadlis' ne demektir?",
    options: ["Kusuru gizlemek", "Ravi eklemek", "Hadisi uydurmak", "Metni kısaltmak"],
    correctAnswer: "Kusuru gizlemek",
    explanation: "Ravinin görüşmediği kimseden duymuş gibi veya hadisteki bir kusuru gizleyerek rivayet etmesine Tedlis denir."
  },
  {
    id: 'h_h_27',
    difficulty: 'hard',
    points: 30,
    question: "Hadislerde 'Livau'l Hamd' nedir?",
    options: ["Peygamberimizin sancağı", "Cennet kapısı", "Cehennem kuyusu", "Sırat köprüsü"],
    correctAnswer: "Peygamberimizin sancağı",
    explanation: "Kıyamet günü bütün peygamberlerin ve müminlerin altında toplanacağı Peygamberimize ait 'Hamd Sancağı'dır."
  },
  {
    id: 'h_h_28',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Allah ..... kulunun yüzüne bakmaz' buyurmuştur.",
    options: ["Kibirle elbisesini sürüyen", "Fakir olan", "Cahil olan", "Hasta olan"],
    correctAnswer: "Kibirle elbisesini sürüyen",
    explanation: "Kibir alameti olarak elbisesini yerlerde sürüyerek yürüyen kimseye Allah'ın rahmet nazarıyla bakmayacağı bildirilmiştir."
  },
  {
    id: 'h_h_29',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde 'Hasen' hadisin 'Sahih' hadisten farkı nedir?",
    options: ["Ravisinin hafızasının biraz daha zayıf olması", "Senedinin kopuk olması", "Uydurma olması", "Metninin kısa olması"],
    correctAnswer: "Ravisinin hafızasının biraz daha zayıf olması",
    explanation: "Hasen hadis de makbuldür ancak ravisinin zabt (hafıza) sıfatı Sahih hadis ravisi kadar mükemmel değildir."
  },
  {
    id: 'h_h_30',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Konstantiniyye (İstanbul) mutlaka fetholunacaktır...' hadisinde kimi övmüştür?",
    options: ["Komutanı ve askerini", "Sadece komutanı", "Şehrin halkını", "Şehrin güzelliğini"],
    correctAnswer: "Komutanı ve askerini",
    explanation: "Hadis-i Şerif: 'Onu fetheden komutan ne güzel komutan, o ordu ne güzel ordudur.'"
  },
  {
    id: 'h_h_31',
    difficulty: 'hard',
    points: 30,
    question: "Hadislerde 'Ru'yetullah' (Allah'ı görme) hakkında ne buyurulmuştur?",
    options: ["Müminler cennette Rablerini görecektir", "Kimse Allah'ı göremez", "Sadece Peygamberler görür", "Sadece melekler görür"],
    correctAnswer: "Müminler cennette Rablerini görecektir",
    explanation: "Hadislerde müminlerin cennette Allah'ı 'dolunayı görür gibi' net görecekleri müjdelenmiştir."
  },
  {
    id: 'h_h_32',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Benim vefatım da sizin için .....' buyurmuştur.",
    options: ["Hayırlıdır", "Azaptır", "Ayrılıktır", "Zordur"],
    correctAnswer: "Hayırlıdır",
    explanation: "Hadis-i Şerif: 'Hayatım sizin için hayırlıdır... Vefatım da sizin için hayırlıdır; amelleriniz bana arz edilir, iyiyse şükrederim, kötüyse istiğfar ederim.'"
  },
  {
    id: 'h_h_33',
    difficulty: 'hard',
    points: 30,
    question: "Ahir zamanda Hz. İsa'nın (a.s) ineceği ve kime tabi olacağı rivayet edilir?",
    options: ["Hz. Mehdi'ye (ve İslam şeriatına)", "Kendi şeriatına", "Musa'ya", "Hiç kimseye"],
    correctAnswer: "Hz. Mehdi'ye (ve İslam şeriatına)",
    explanation: "Hadislerde Hz. İsa'nın inip İslam şeriatıyla hükmedeceği ve o zamanki İslam lideri arkasında namaz kılacağı rivayet edilir."
  },
  {
    id: 'h_h_34',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde 'Müdrec' hadis ne demektir?",
    options: ["Ravinin kendi sözünü hadise eklemesi", "Derecesi yüksek hadis", "Kısa hadis", "Zayıf hadis"],
    correctAnswer: "Ravinin kendi sözünü hadise eklemesi",
    explanation: "Sened veya metne, ravinin açıklama yapmak için eklediği (aslında hadisten olmayan) sözlerin karıştığı hadistir."
  },
  {
    id: 'h_h_35',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Kim menfaatine uygun fetva vereni bulmak için alim alim dolaşırsa .....'",
    options: ["Münafıktır (veya dinden çıkar)", "Alim olur", "Akıllıdır", "Zengin olur"],
    correctAnswer: "Münafıktır (veya dinden çıkar)",
    explanation: "İşine geleni aramak (telfik veya heva) dini oyuncak etmektir ve şiddetle yerilmiştir."
  },
  {
    id: 'h_h_36',
    difficulty: 'hard',
    points: 30,
    question: "Hadislerde 'Sırat Köprüsü'nün mahiyeti nasıl tarif edilmiştir?",
    options: ["Kıldan ince kılıçtan keskin", "Geniş bir yol", "Taştan bir köprü", "Görünmez bir yol"],
    correctAnswer: "Kıldan ince kılıçtan keskin",
    explanation: "Mecazi veya hakiki olarak cehennem üzerine kurulan, geçişi amellere bağlı olan çok zorlu bir köprüdür."
  },
  {
    id: 'h_h_37',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Yöneticileriniz hayırlılarınız, zenginleriniz cömertleriniz olduğu zaman .....'",
    options: ["Yerin üstü yerin altından hayırlıdır", "Kıyamet yakındır", "Fakirler çoğalır", "Savaş çıkar"],
    correctAnswer: "Yerin üstü yerin altından hayırlıdır",
    explanation: "Tirmizi hadisi: Tam tersi durumda ise (yöneticiler şerli, zenginler cimri) yerin altı (ölüm) yerin üstünden hayırlıdır."
  },
  {
    id: 'h_h_38',
    difficulty: 'hard',
    points: 30,
    question: "Hadise göre 'İstidrâc' nedir?",
    options: ["Günahkarın nimetinin artması (Tuzak)", "Derece yükselmesi", "Dua istemek", "Tövbe etmek"],
    correctAnswer: "Günahkarın nimetinin artması (Tuzak)",
    explanation: "Allah'ın, isyan eden kula nimet vermeye devam etmesi onu helake yaklaştıran bir tuzaktır (İstidrâc)."
  },
  {
    id: 'h_h_39',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Amel defteri kapandıktan sonra sevap yazdıran ilim' için ne şart koşmuştur?",
    options: ["Faydalanılan ilim olması", "Çok kitap yazılması", "Meşhur olması", "Pahalı olması"],
    correctAnswer: "Faydalanılan ilim olması",
    explanation: "Hadis-i Şerif: 'Sadaka-i cariye, faydalanılan ilim veya dua eden evlat.'"
  },
  {
    id: 'h_h_40',
    difficulty: 'hard',
    points: 30,
    question: "Hadis ilminde 'Tevkifî' olmayan, yani sıralamasını sahabenin yaptığı kabul edilen şey nedir?",
    options: ["Ayetlerin sure içindeki sırası (Tevkifidir)", "Surelerin Mushaf'taki sırası (İçtihadidir)", "Ayetlerin sayısı", "Surelerin isimleri"],
    correctAnswer: "Surelerin Mushaf'taki sırası (İçtihadidir)",
    explanation: "Ayetlerin sure içindeki sırası vahiyledir (tevkifi), ancak surelerin Fatiha'dan Nas'a sıralanışı sahabe içtihadıdır (çoğunluk görüşü)."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - HADİS DERYASI (40 PUAN)
  // --------------------------------------------------------
  {
    id: 'h_x_1',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Müdrec' hadis ne demektir?",
    options: ["Ravinin kendi sözünü hadise eklemesi", "Zayıf hadis", "Kısa hadis", "Ravisi bilinmeyen hadis"],
    correctAnswer: "Ravinin kendi sözünü hadise eklemesi",
    explanation: "Sened veya metne, ravinin açıklama yapmak için eklediği (aslında Peygamberimizin sözü olmayan) kısımların karıştığı hadistir."
  },
  {
    id: 'h_x_2',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Mudal' hadis nedir?",
    options: ["Senedinden peş peşe iki veya daha fazla ravinin düştüğü hadis", "Tek ravinin düştüğü hadis", "Sahabinin atlandığı hadis", "Uydurma hadis"],
    correctAnswer: "Senedinden peş peşe iki veya daha fazla ravinin düştüğü hadis",
    explanation: "Senedin herhangi bir yerinden (sahabi hariç) peş peşe iki veya daha fazla ravinin düşürüldüğü hadise Mudal denir."
  },
  {
    id: 'h_x_3',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Aliyyü'l-İsnad' (Âlî İsnad) ne demektir?",
    options: ["Ravisi az, Peygambere yakın sened", "Ravisi çok olan sened", "Güvenilir sened", "Zayıf sened"],
    correctAnswer: "Ravisi az, Peygambere yakın sened",
    explanation: "Peygamberimiz ile ravi arasındaki şahıs sayısının az olduğu (kısa zincirli) isnada Âlî İsnad denir ve çok kıymetlidir."
  },
  {
    id: 'h_x_4',
    difficulty: 'expert',
    points: 40,
    question: "İmam Buhari'nin 'Sahih'ini tasnif ederken koştuğu en önemli (ve Müslim'den ayıran) şart nedir?",
    options: ["Ravi ile hocasının görüşmüş olduğunun bilinmesi (Lika)", "Çağdaş olmaları", "Aynı şehirde yaşamaları", "Ravinin erkek olması"],
    correctAnswer: "Ravi ile hocasının görüşmüş olduğunun bilinmesi (Lika)",
    explanation: "İmam Müslim çağdaş olmayı yeterli görürken, Buhari ravi ile hocasının en az bir kez görüştüğünün (Lika) sabit olmasını şart koşmuştur."
  },
  {
    id: 'h_x_5',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Tashif' ne demektir?",
    options: ["Kelime veya harflerin yanlış okunması/noktalanması", "Hadis uydurmak", "Senedi kısaltmak", "Metni ezberlemek"],
    correctAnswer: "Kelime veya harflerin yanlış okunması/noktalanması",
    explanation: "Yazılışları benzer olan kelimelerin, noktama veya hareke hatasıyla yanlış okunarak mananın değişmesine Tashif denir."
  },
  {
    id: 'h_x_6',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Garibu'l Hadis' terimi neyi ifade eder?",
    options: ["Hadiste geçen az bilinen/zor kelimeler", "Tek kişinin rivayet ettiği hadis", "Zayıf hadis", "Kudsi hadis"],
    correctAnswer: "Hadiste geçen az bilinen/zor kelimeler",
    explanation: "Garibu'l Hadis, hadis metinlerinde geçen anlaşılması zor, nadir kullanılan kelimeleri inceleyen ilim dalıdır."
  },
  {
    id: 'h_x_7',
    difficulty: 'expert',
    points: 40,
    question: "Hadisçilere göre 'Sika' (Güvenilir) ravi hangi iki özelliğe sahip olmalıdır?",
    options: ["Adalet ve Zabt", "İlim ve Amel", "Soy ve Güzellik", "Zenginlik ve Cömertlik"],
    correctAnswer: "Adalet ve Zabt",
    explanation: "Bir ravinin güvenilir (sika) olması için dindar/dürüst (Adalet) ve hafızasının/dikkatini güçlü (Zabt) olması gerekir."
  },
  {
    id: 'h_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) sözlerini yazmayı yasakladığı ilk döneme ne ad verilir?",
    options: ["Kitabetü'l-Hadis Yasağı", "Tedvin Dönemi", "Tasnif Dönemi", "Hıfz Dönemi"],
    correctAnswer: "Kitabetü'l-Hadis Yasağı",
    explanation: "Kuran ile karışmaması için başlangıçta konulan yazma yasağına denir (Sonradan izin verilmiştir)."
  },
  {
    id: 'h_x_9',
    difficulty: 'expert',
    points: 40,
    question: "Kütüb-i Sitte'ye, İmam Malik'in Muvatta'sı yerine İbn Mace'nin Sünen'ini ekleyerek bugünkü altılıyı oluşturan alim kimdir?",
    options: ["İbnü'l-Kayserani", "İbn Hacer", "Suyuti", "Zehebi"],
    correctAnswer: "İbnü'l-Kayserani",
    explanation: "İlk dönemlerde 6. kitap olarak Muvatta kabul edilirken, Kayserani (ö. 507) ilk kez İbn Mace'yi listeye dahil etmiştir."
  },
  {
    id: 'h_x_10',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Müdelles' hadis ne demektir?",
    options: ["Ravinin görüşmediği kişiden duymuş gibi aktardığı hadis", "Zayıf hadis", "Uydurma hadis", "Meşhur hadis"],
    correctAnswer: "Ravinin görüşmediği kişiden duymuş gibi aktardığı hadis",
    explanation: "Tedlis (kusuru gizleme) yapılarak, aradaki raviyi atlayıp sanki bizzat hocasından duymuş gibi 'an' (den, dan) lafzıyla aktarılan hadistir."
  },
  {
    id: 'h_x_11',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Şahid' ve 'Mutabi' kavramları ne için kullanılır?",
    options: ["Bir hadisi destekleyen başka rivayetler", "Hadis uyduranlar", "Hadis inkar edenler", "Hadis hocaları"],
    correctAnswer: "Bir hadisi destekleyen başka rivayetler",
    explanation: "Tek bir yolla gelen hadisin (Ferd), başka bir ravi veya sahabiden gelen benzer rivayetlerle desteklenip desteklenmediğini (İtibar) araştırmada kullanılır."
  },
  {
    id: 'h_x_12',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Mukillûn' (Az hadis rivayet edenler) arasında sayılan Dört Abdullah'tan (Abadile) biri kim değildir?",
    options: ["Abdullah b. Mesud", "Abdullah b. Ömer", "Abdullah b. Abbas", "Abdullah b. Zübeyr"],
    correctAnswer: "Abdullah b. Mesud",
    explanation: "Abadile (Dört Abdullah): İbn Ömer, İbn Abbas, İbn Zübeyr ve İbn Amr b. As'dır. İbn Mesud (daha kıdemli olduğu için) bu genç gruba dahil edilmez."
  },
  {
    id: 'h_x_13',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) 'Benden bir ayet bile olsa tebliğ ediniz' hadisini rivayet eden sahabi kimdir?",
    options: ["Abdullah b. Amr", "Ebu Hureyre", "Enes b. Malik", "Hz. Ali"],
    correctAnswer: "Abdullah b. Amr",
    explanation: "Bu meşhur hadisi 'Sahife-i Sadıka' sahibi Abdullah b. Amr rivayet etmiştir."
  },
  {
    id: 'h_x_14',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Metruk' hadis ne demektir?",
    options: ["Yalancılıkla itham edilen ravinin tek kaldığı hadis", "Senedi kopuk hadis", "Ravi sayısı az hadis", "Terk edilmiş sünnet"],
    correctAnswer: "Yalancılıkla itham edilen ravinin tek kaldığı hadis",
    explanation: "Hadis uydurmakla değil ama günlük hayatta yalancılıkla suçlanan veya çok hata yapan ravinin rivayetine Metruk denir."
  },
  {
    id: 'h_x_15',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Maqlub' (Kalbedilmiş) hadis nedir?",
    options: ["Sened veya metindeki kelimelerin yer değiştirdiği hadis", "Uydurma hadis", "Gizli hadis", "Zayıf hadis"],
    correctAnswer: "Sened veya metindeki kelimelerin yer değiştirdiği hadis",
    explanation: "Ravi isimlerinin (örn: Ka'b b. Murre yerine Murre b. Ka'b) veya metin cümlelerinin yanlışlıkla yer değiştirdiği hadistir."
  },
  {
    id: 'h_x_16',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde, isnadında bir kopukluk olmayan hadislere genel olarak ne denir?",
    options: ["Muttasıl", "Münkatı", "Muallak", "Mürsel"],
    correctAnswer: "Muttasıl",
    explanation: "Baştan sona kadar her ravinin hadisi bizzat hocasından aldığı, kesintisiz zincire sahip hadise Muttasıl denir."
  },
  {
    id: 'h_x_17',
    difficulty: 'expert',
    points: 40,
    question: "Resmi olarak hadisleri ilk kez tedvin eden (toplayıp yazan) Emevi halifesi kimdir?",
    options: ["Ömer b. Abdülaziz", "Muaviye", "Velid", "Yezid"],
    correctAnswer: "Ömer b. Abdülaziz",
    explanation: "Ömer b. Abdülaziz, valilere emir göndererek alimlerin ölmesiyle hadislerin kaybolmasından korktuğunu ve toplanmasını emretmiştir."
  },
  {
    id: 'h_x_18',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Müstahrec' türü eser ne demektir?",
    options: ["Bir hadis kitabındaki hadislere başka senetler bulmak", "Hadisleri özetlemek", "Hadisleri şerh etmek", "Hadisleri alfabetik dizmek"],
    correctAnswer: "Bir hadis kitabındaki hadislere başka senetler bulmak",
    explanation: "Örneğin Buhari'deki hadisleri, Buhari'nin senedi dışındaki başka (genelde daha âlî) senetlerle rivayet eden eserlere Müstahrec denir."
  },
  {
    id: 'h_x_19',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Zevaid' türü eserlerin amacı nedir?",
    options: ["Bir kitapta bulunup diğerinde bulunmayan hadisleri toplamak", "Zayıf hadisleri toplamak", "Uydurma hadisleri toplamak", "Kısa hadisleri toplamak"],
    correctAnswer: "Bir kitapta bulunup diğerinde bulunmayan hadisleri toplamak",
    explanation: "Örneğin 'Mecmau'z-Zevaid', Kütüb-i Sitte'de olmayıp diğer Müsned ve Mucemlerde olan hadisleri (fazlalıkları/zevaidi) toplar."
  },
  {
    id: 'h_x_20',
    difficulty: 'expert',
    points: 40,
    question: "'Mişkatü'l-Mesabih' adlı eser hangi alanda meşhurdur?",
    options: ["Hadisleri konularına göre derleyen bir ders kitabı", "Ravi biyografisi", "Hadis usulü", "Uydurma hadisler"],
    correctAnswer: "Hadisleri konularına göre derleyen bir ders kitabı",
    explanation: "Tebrizi'nin bu eseri, hadisleri 'Sahih', 'Hasen' ve 'Zayıf' olarak ayırmasıyla meşhurdur ve medreselerde ders kitabı olarak okutulmuştur."
  },
  {
    id: 'h_x_21',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'İcazet' ne demektir?",
    options: ["Hocanın talebesine rivayet izni vermesi", "Hadisi ezberlemek", "Hadisi inkar etmek", "Hadis kitabı yazmak"],
    correctAnswer: "Hocanın talebesine rivayet izni vermesi",
    explanation: "Hocanın, kitabını veya duyduklarını rivayet etmesi için talebesine verdiği yetkiye/diplomaya İcazet denir."
  },
  {
    id: 'h_x_22',
    difficulty: 'expert',
    points: 40,
    question: "İmam Buhari'nin 'el-Edebü'l-Müfred' adlı eseri hangi konudadır?",
    options: ["Ahlak hadisleri", "Fıkıh hadisleri", "Kıyamet hadisleri", "Tefsir hadisleri"],
    correctAnswer: "Ahlak hadisleri",
    explanation: "Sadece ahlak ve edep konularındaki hadisleri topladığı müstakil eseridir."
  },
  {
    id: 'h_x_23',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'An'ane' (Muannen hadis) ne demektir?",
    options: ["'An' (den/dan) edatıyla rivayet edilen hadis", "Kesin duyulan hadis", "Yazılı hadis", "Kısa hadis"],
    correctAnswer: "'An' (den/dan) edatıyla rivayet edilen hadis",
    explanation: "Ravinin 'Haddesenâ' (bize anlattı) yerine 'An fulanin' (falancadan) diyerek aktardığı hadistir. Tedlis ihtimali taşıyabilir."
  },
  {
    id: 'h_x_24',
    difficulty: 'expert',
    points: 40,
    question: "'Cerh' sebebi olan 'Cehalet' (Ravi Cehaleti) ne demektir?",
    options: ["Ravinin kimliğinin veya durumunun bilinmemesi", "Ravinin okuma bilmemesi", "Ravinin cahil olması", "Ravinin günahkar olması"],
    correctAnswer: "Ravinin kimliğinin veya durumunun bilinmemesi",
    explanation: "Ravinin kim olduğunun (Mechulu'l-Ayn) veya güvenilir olup olmadığının (Mechulu'l-Hal) bilinmemesi durumudur."
  },
  {
    id: 'h_x_25',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Müsned' kitapların (Ahmed b. Hanbel gibi) tertip sistemi nasıldır?",
    options: ["Sahabi isimlerine göre", "Konulara göre (Fıkıh)", "Alfabetik (Metin)", "Tarihe göre"],
    correctAnswer: "Sahabi isimlerine göre",
    explanation: "Müsnedlerde hadisler konularına göre değil, rivayet eden sahabinin adına göre (Örn: Ebu Hureyre'nin rivayetleri) sıralanır."
  },
  {
    id: 'h_x_26',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'İllet' (Muallel Hadis) ne demektir?",
    options: ["Dıştan sahih görünen ama gizli kusuru olan hadis", "Zayıf hadis", "Hastalıkla ilgili hadis", "Sebebi bilinen hadis"],
    correctAnswer: "Dıştan sahih görünen ama gizli kusuru olan hadis",
    explanation: "Ancak uzman alimlerin fark edebileceği gizli kusurlara (örneğin senedde kopukluk veya isim karışıklığı) İllet denir."
  },
  {
    id: 'h_x_27',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) 'Men kezebe aleyye...' (Kim bilerek yalan uydurursa...) hadisi hangi tür hadise örnektir?",
    options: ["Mütevatir (Lafzî)", "Ahad", "Garib", "Zayıf"],
    correctAnswer: "Mütevatir (Lafzî)",
    explanation: "Bu hadis, 70'ten fazla sahabi tarafından lafızları aynı veya çok yakın olarak rivayet edildiği için Lafzî Mütevatir örneğidir."
  },
  {
    id: 'h_x_28',
    difficulty: 'expert',
    points: 40,
    question: "Kütüb-i Sitte yazarları arasında 'Ebu Abdurrahman' künyesiyle bilinen, Sünen sahibi alim kimdir?",
    options: ["İmam Nesai", "Ebu Davud", "Tirmizi", "İbn Mace"],
    correctAnswer: "İmam Nesai",
    explanation: "Sünen-i Nesai'nin müellifi Ahmed b. Şuayb'ın künyesi Ebu Abdurrahman'dır."
  },
  {
    id: 'h_x_29',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Aziz' hadis ne demektir?",
    options: ["Her tabakada en az iki ravisi olan hadis", "Tek ravisi olan hadis", "Çok ravisi olan hadis", "Kıymetli hadis"],
    correctAnswer: "Her tabakada en az iki ravisi olan hadis",
    explanation: "Senedin herhangi bir tabakasında ravi sayısı ikiye düşen (ikiden az olmayan) hadise Aziz denir."
  },
  {
    id: 'h_x_30',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Mübhem' ravi ne demektir?",
    options: ["İsmi açıklanmayıp 'bir adam', 'bir kadın' denilen ravi", "Güvenilir olmayan ravi", "Yalancı ravi", "Meşhur ravi"],
    correctAnswer: "İsmi açıklanmayıp 'bir adam', 'bir kadın' denilen ravi",
    explanation: "Hadis metninde veya senedinde ismi zikredilmeyen şahıslara Mübhem denir."
  },
  {
    id: 'h_x_31',
    difficulty: 'expert',
    points: 40,
    question: "'El-Camiu's-Sağir' adlı meşhur hadis derlemesi hangi alime aittir?",
    options: ["Celaleddin es-Suyuti", "İbn Hacer", "Nevevi", "Deylemi"],
    correctAnswer: "Celaleddin es-Suyuti",
    explanation: "Suyuti'nin alfabetik olarak kısa hadisleri derlediği bu eser çok meşhurdur."
  },
  {
    id: 'h_x_32',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Telfik' ne demektir?",
    options: ["Farklı hadisleri birleştirip tek hadis gibi sunmak", "Hadis uydurmak", "Hadisi inkar etmek", "Hadisi şerh etmek"],
    correctAnswer: "Farklı hadisleri birleştirip tek hadis gibi sunmak",
    explanation: "Aynı konudaki farklı rivayetlerin parçalarını birleştirerek tek bir metin (siyak) oluşturmaya Telfik denir (Zühri'nin İfk hadisi gibi)."
  },
  {
    id: 'h_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Ahâd' hadis ne demektir?",
    options: ["Mütevatir derecesine ulaşmayan hadisler", "Tek kişinin rivayeti", "Zayıf hadisler", "Uydurma hadisler"],
    correctAnswer: "Mütevatir derecesine ulaşmayan hadisler",
    explanation: "Mütevatir şartlarını taşımayan (Aziz, Garib, Meşhur) tüm hadislere genel olarak Haber-i Vahid veya Ahâd denir."
  },
  {
    id: 'h_x_34',
    difficulty: 'expert',
    points: 40,
    question: "Hadis metinlerinde geçen 'Eslemtü' (Teslim oldum) ile 'Eşlemtü' (Devemi bıraktım) kelimelerinin karışması neye örnektir?",
    options: ["Tashif (veya Tahrif)", "İdraj", "Kalp", "Müdrec"],
    correctAnswer: "Tashif (veya Tahrif)",
    explanation: "Noktalama hatası yüzünden kelimenin manasının değişmesine Tashif denir."
  },
  {
    id: 'h_x_35',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Vücâde' ne demektir?",
    options: ["Bir hadisi hocadan duymadan kitabında bulup rivayet etmek", "Hocadan dinlemek", "Hocaya okumak", "İcazet almak"],
    correctAnswer: "Bir hadisi hocadan duymadan kitabında bulup rivayet etmek",
    explanation: "Hocayla karşılaşmadan veya icazet almadan, onun kitabını bulup (vecedtü) oradan nakletme yöntemidir."
  },
  {
    id: 'h_x_36',
    difficulty: 'expert',
    points: 40,
    question: "Muvatta'da geçen 'Belağat' (Bana ulaştığına göre...) diye başlayan senedsiz hadislere ne denir?",
    options: ["Belâğât-ı Malik", "Mürsel", "Mudal", "Müsned"],
    correctAnswer: "Belâğât-ı Malik",
    explanation: "İmam Malik'in sened zikretmeden 'Bana ulaştı' diyerek verdiği hadislerdir (Çoğunun senedi başka yerlerde bulunmuştur)."
  },
  {
    id: 'h_x_37',
    difficulty: 'expert',
    points: 40,
    question: "'Mevzuat' (Uydurma Hadisler) konusunda yazılan en meşhur eserlerden 'El-Mevzuat' kime aittir?",
    options: ["İbnü'l-Cevzi", "İbn Teymiye", "Zehebi", "Suyuti"],
    correctAnswer: "İbnü'l-Cevzi",
    explanation: "İbnü'l-Cevzi'nin 'Kitabü'l-Mevzuat'ı, uydurma hadisleri toplayıp ayıkladığı en kapsamlı eserlerdendir."
  },
  {
    id: 'h_x_38',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Tabakat' kitapları neyi inceler?",
    options: ["Ravileri nesil ve dönemlerine göre", "Hadis konularını", "Hadis metinlerini", "Hadis hükümlerini"],
    correctAnswer: "Ravileri nesil ve dönemlerine göre",
    explanation: "İbn Sa'd'ın Tabakat'ı gibi eserler, ravileri Sahabe, Tabiin gibi nesillere (tabakalara) ayırarak inceler."
  },
  {
    id: 'h_x_39',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ilminde 'Muhtelifu'l-Hadis' ne demektir?",
    options: ["Birbirine zıt görünen hadisleri uzlaştırma ilmi", "Hadis ezberleme", "Hadis yazma", "Hadis uydurma"],
    correctAnswer: "Birbirine zıt görünen hadisleri uzlaştırma ilmi",
    explanation: "Görünüşte birbiriyle çelişen hadislerin arasını bulma, tevil etme veya nasih-mensuhunu belirleme ilmidir."
  },
  {
    id: 'h_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Hadis alimlerine göre 'Emiru'l-Müminin fi'l-Hadis' (Hadiste Müminlerin Emiri) unvanı kime verilmiştir?",
    options: ["Şu'be b. Haccac (veya Buhari)", "Ebu Hanife", "İmam Şafii", "İbn Abbas"],
    correctAnswer: "Şu'be b. Haccac (veya Buhari)",
    explanation: "Bu en yüksek unvan, hadis ilminin zirvesi sayılan Şu'be b. Haccac, Süfyan-ı Sevri ve İmam Buhari gibi çok az sayıda alim için kullanılmıştır."
  }
    ]
  },
  ahlak: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-40) - AHLAK VE ADAP (10 PUAN)
  // --------------------------------------------------------
  {
    id: 'a_e_1',
    difficulty: 'easy',
    points: 10,
    question: "İki Müslüman karşılaştığında birbirlerine ilk ne söylemelidir?",
    options: ["Nasılsın?", "Selamün Aleyküm", "Günaydın", "Merhaba"],
    correctAnswer: "Selamün Aleyküm",
    explanation: "Müslümanların karşılaşınca birbirlerine 'Selamün Aleyküm' (Allah'ın selamı üzerine olsun) demesi sünnettir."
  },
  {
    id: 'a_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Anne ve babamıza nasıl davranmalıyız?",
    options: ["Sadece bayramda aramalıyız", "İhtiyaçlarını karşılayıp iyi davranmalıyız", "Sözlerini dinlememeliyiz", "Onlara bağırmalıyız"],
    correctAnswer: "İhtiyaçlarını karşılayıp iyi davranmalıyız",
    explanation: "Dinimiz, anne ve babaya 'Öf' bile dememeyi, onlara daima iyi ve yumuşak davranmayı emreder."
  },
  {
    id: 'a_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) 'Komşusu ..... iken tok yatan bizden değildir' buyurmuştur.",
    options: ["Zengin", "Hasta", "Aç", "Uykulu"],
    correctAnswer: "Aç",
    explanation: "Komşuluk hakkı İslam'da çok önemlidir; komşumuz açken bizim tok yatmamız uygun görülmemiştir."
  },
  {
    id: 'a_e_4',
    difficulty: 'easy',
    points: 10,
    question: "Yemek yerken hangi elle yemek sünnettir?",
    options: ["Sol el", "Sağ el", "Her iki el", "Çatalla"],
    correctAnswer: "Sağ el",
    explanation: "Peygamberimiz (s.a.v) sağ elle yiyip içmeyi emretmiş, sol elle şeytanın yediğini bildirmiştir."
  },
  {
    id: 'a_e_5',
    difficulty: 'easy',
    points: 10,
    question: "Bir iyilik gördüğümüzde karşımızdakine ne demeliyiz?",
    options: ["Teşekkür ederim / Allah razı olsun", "Ne gerek vardı", "Daha çok ver", "Bana ne"],
    correctAnswer: "Teşekkür ederim / Allah razı olsun",
    explanation: "İnsanlara teşekkür etmeyen Allah'a şükretmiş olmaz. İyiliğe karşı teşekkür etmek edeptir."
  },
  {
    id: 'a_e_6',
    difficulty: 'easy',
    points: 10,
    question: "Konuşurken nasıl bir ses tonu kullanmalıyız?",
    options: ["Bağırarak", "Fısıldayarak", "Kaba ve sert", "Nazik ve işitilebilir"],
    correctAnswer: "Nazik ve işitilebilir",
    explanation: "Müslüman, konuşurken bağırmaz, kaba söz söylemez; nazik ve anlaşılır konuşur."
  },
  {
    id: 'a_e_7',
    difficulty: 'easy',
    points: 10,
    question: "Yemeğe başlarken ne söylenir?",
    options: ["Elhamdülillah", "Afiyet olsun", "Bismillahirrahmanirrahim", "Çok şükür"],
    correctAnswer: "Bismillahirrahmanirrahim",
    explanation: "Yemeğe Besmele ile başlamak bereket getirir ve sünnettir."
  },
  {
    id: 'a_e_8',
    difficulty: 'easy',
    points: 10,
    question: "Yemek bittikten sonra ne söylenir?",
    options: ["Elhamdülillah", "Bismillah", "Keşke daha olsa", "Afiyet olsun"],
    correctAnswer: "Elhamdülillah",
    explanation: "Yemekten sonra Allah'a verdiği nimetler için 'Elhamdülillah' diyerek hamd edilir."
  },
  {
    id: 'a_e_9',
    difficulty: 'easy',
    points: 10,
    question: "Hapşıran bir kişi ne demelidir?",
    options: ["Çok şükür", "Elhamdülillah", "Oh be", "Estağfirullah"],
    correctAnswer: "Elhamdülillah",
    explanation: "Hapşıran kişinin 'Elhamdülillah' demesi, duyanın da 'Yerhamükallah' demesi sünnettir."
  },
  {
    id: 'a_e_10',
    difficulty: 'easy',
    points: 10,
    question: "Bir eve girerken ne yapmalıyız?",
    options: ["Kapıyı tekmelemeliyiz", "İzin istemeli ve selam vermeliyiz", "Pencereden girmeliyiz", "Sessizce girmeliyiz"],
    correctAnswer: "İzin istemeli ve selam vermeliyiz",
    explanation: "Başkasının evine (hatta kendi evimize bile) girerken kapıyı çalmak, izin istemek ve selam vermek gerekir."
  },
  {
    id: 'a_e_11',
    difficulty: 'easy',
    points: 10,
    question: "Müslüman, yalan söyler mi?",
    options: ["Bazen söyler", "Zorda kalınca söyler", "Asla söylemez", "Şaka yaparken söyler"],
    correctAnswer: "Asla söylemez",
    explanation: "Doğruluk Müslümanın en temel özelliğidir. Peygamberimiz şaka bile olsa yalanı yasaklamıştır."
  },
  {
    id: 'a_e_12',
    difficulty: 'easy',
    points: 10,
    question: "Esnerken ağzımızı ne ile kapatmalıyız?",
    options: ["Kapatmaya gerek yoktur", "Elimizle (sol elin tersiyle)", "Kağıtla", "Kıyafetimizle"],
    correctAnswer: "Elimizle (sol elin tersiyle)",
    explanation: "Esnemek şeytandandır, bu yüzden esnerken ağzı elle kapatmak edeptendir."
  },
  {
    id: 'a_e_13',
    difficulty: 'easy',
    points: 10,
    question: "Hasta olan bir tanıdığımızı ne yapmalıyız?",
    options: ["Ziyaret etmeliyiz", "Aramamalıyız", "Görmezden gelmeliyiz", "Kızmalıyız"],
    correctAnswer: "Ziyaret etmeliyiz",
    explanation: "Hasta ziyareti, Müslümanın Müslüman üzerindeki haklarından biridir ve çok sevaptır."
  },
  {
    id: 'a_e_14',
    difficulty: 'easy',
    points: 10,
    question: "Bize verilen bir emaneti (eşyayı/sırrı) ne yapmalıyız?",
    options: ["Korumalı ve sahibine geri vermeliyiz", "Kendimizinmiş gibi kullanmalıyız", "Başkasına vermeliyiz", "Kaybetmeliyiz"],
    correctAnswer: "Korumalı ve sahibine geri vermeliyiz",
    explanation: "Müslüman 'Emin' (Güvenilir) kişidir; emanete asla hıyanet etmez, onu korur."
  },
  {
    id: 'a_e_15',
    difficulty: 'easy',
    points: 10,
    question: "Küçüklere ve büyüklere karşı tavrımız nasıl olmalıdır?",
    options: ["Küçüklere sevgi, büyüklere saygı", "Herkese kaba", "Sadece büyüklere saygı", "Küçüklere kızmak"],
    correctAnswer: "Küçüklere sevgi, büyüklere saygı",
    explanation: "Peygamberimiz 'Küçüklerimize merhamet etmeyen, büyüklerimize saygı göstermeyen bizden değildir' buyurmuştur."
  },
  {
    id: 'a_e_16',
    difficulty: 'easy',
    points: 10,
    question: "Bir meclise (topluluğa) girdiğimizde nereye oturmalıyız?",
    options: ["Baş köşeye", "Herkesi kaldırıp yerlerine", "Boş bulduğumuz yere", "Ayakta durmalıyız"],
    correctAnswer: "Boş bulduğumuz yere",
    explanation: "Edebe uygun olan, insanları rahatsız etmeden boş bulunan yere oturmaktır."
  },
  {
    id: 'a_e_17',
    difficulty: 'easy',
    points: 10,
    question: "Camiye girerken hangi ayakla girilir?",
    options: ["Sol ayak", "Sağ ayak", "İkisiyle zıplayarak", "Fark etmez"],
    correctAnswer: "Sağ ayak",
    explanation: "Cami gibi hayırlı ve temiz yerlere sağ ayakla girilir, sol ayakla çıkılır."
  },
  {
    id: 'a_e_18',
    difficulty: 'easy',
    points: 10,
    question: "Tuvalete girerken hangi ayakla girilir?",
    options: ["Sağ ayak", "Sol ayak", "Fark etmez", "Geri geri"],
    correctAnswer: "Sol ayak",
    explanation: "Tuvalet gibi yerlere sol ayakla girilir, sağ ayakla çıkılır."
  },
  {
    id: 'a_e_19',
    difficulty: 'easy',
    points: 10,
    question: "Birisi bize sırrını verirse ne yapmalıyız?",
    options: ["Herkese anlatmalıyız", "Sadece en yakın arkadaşımıza söylemeliyiz", "Sırrı saklamalıyız", "Unutmalıyız"],
    correctAnswer: "Sırrı saklamalıyız",
    explanation: "Sır saklamak güvenin gereğidir. Sırrı yaymak münafıklık alametlerindendir."
  },
  {
    id: 'a_e_20',
    difficulty: 'easy',
    points: 10,
    question: "Müslüman, verdiği sözde durur mu?",
    options: ["Bazen durur", "İşine gelirse durur", "Mutlaka durur", "Unutursa durmaz"],
    correctAnswer: "Mutlaka durur",
    explanation: "Sözünde durmak (Ahde Vefa), Müslümanın en belirgin ahlaki özelliğidir."
  },
  {
    id: 'a_e_21',
    difficulty: 'easy',
    points: 10,
    question: "Yolda insanlara zarar veren bir taş veya çöp görünce ne yapmalıyız?",
    options: ["Üzerine basıp geçmeliyiz", "Yoldan kenara çekmeliyiz", "Görmezden gelmeliyiz", "Başkası alsın diye beklemeliyiz"],
    correctAnswer: "Yoldan kenara çekmeliyiz",
    explanation: "Yoldan eziyet veren şeyi kaldırmak imandandır ve sadaka sevabı kazandırır."
  },
  {
    id: 'a_e_22',
    difficulty: 'easy',
    points: 10,
    question: "Alay etmek ve lakap takmak hakkında dinimiz ne der?",
    options: ["Eğlencelidir, yapılabilir", "Günahtır, yasaktır", "Arkadaş arasında olur", "Sadece düşmana yapılır"],
    correctAnswer: "Günahtır, yasaktır",
    explanation: "Kuran-ı Kerim'de (Hucurat Suresi) alay etmek ve kötü lakap takmak kesinlikle yasaklanmıştır."
  },
  {
    id: 'a_e_23',
    difficulty: 'easy',
    points: 10,
    question: "İsraf etmek (savurganlık) doğru mudur?",
    options: ["Paramız varsa doğrudur", "Hayır, Allah israf edenleri sevmez", "Yemekte doğrudur", "Suda doğrudur"],
    correctAnswer: "Hayır, Allah israf edenleri sevmez",
    explanation: "Yiyip içiniz fakat israf etmeyiniz. Allah müsrifleri sevmez."
  },
  {
    id: 'a_e_24',
    difficulty: 'easy',
    points: 10,
    question: "Tırnaklarımızı ne zaman kesmek sünnettir?",
    options: ["Her gün", "Cuma günü", "Pazartesi günü", "Ayda bir"],
    correctAnswer: "Cuma günü",
    explanation: "Haftada bir temizlenmek ve tırnakları özellikle Cuma günü kesmek sünnettir."
  },
  {
    id: 'a_e_25',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim okunurken nasıl davranmalıyız?",
    options: ["Sessizce dinlemeliyiz", "Konuşmaya devam etmeliyiz", "Müzik dinlemeliyiz", "Uyumalıyız"],
    correctAnswer: "Sessizce dinlemeliyiz",
    explanation: "Kuran okunduğu zaman onu dinlemek ve susmak farzdır (Araf Suresi)."
  },
  {
    id: 'a_e_26',
    difficulty: 'easy',
    points: 10,
    question: "Misafire nasıl davranmalıyız?",
    options: ["Kapıyı açmamalıyız", "Güler yüzle karşılayıp ikram etmeliyiz", "Hemen gitmesini beklemeliyiz", "Kötü davranmalıyız"],
    correctAnswer: "Güler yüzle karşılayıp ikram etmeliyiz",
    explanation: "Misafir Allah'ın misafiridir; ona ikramda bulunmak ve iyi davranmak imanın gereğidir."
  },
  {
    id: 'a_e_27',
    difficulty: 'easy',
    points: 10,
    question: "Arkadaşlarımızla konuşurken ne yapmamalıyız?",
    options: ["Gülümsememeliyiz", "Selamlaşmamalıyız", "Sözünü kesmemeliyiz", "Dinlememeliyiz"],
    correctAnswer: "Sözünü kesmemeliyiz",
    explanation: "Karşımızdakini dinlemek ve sözünü kesmemek güzel bir iletişim adabıdır."
  },
  {
    id: 'a_e_28',
    difficulty: 'easy',
    points: 10,
    question: "Toplu taşıma araçlarında yaşlılara ne yapmalıyız?",
    options: ["Yer vermeliyiz", "Görmezden gelmeliyiz", "Uyuyor numarası yapmalıyız", "Oturmaya devam etmeliyiz"],
    correctAnswer: "Yer vermeliyiz",
    explanation: "Büyüklere saygı gereği, yaşlılara ve ihtiyaç sahiplerine yer vermek güzel bir davranıştır."
  },
  {
    id: 'a_e_29',
    difficulty: 'easy',
    points: 10,
    question: "Hayvanlara nasıl davranmalıyız?",
    options: ["Korkutmalıyız", "Zarar vermeliyiz", "Merhamet etmeli ve eziyet etmemeliyiz", "Taş atmalıyız"],
    correctAnswer: "Merhamet etmeli ve eziyet etmemeliyiz",
    explanation: "İslam, her canlıya merhameti emreder. Hayvanlara eziyet etmek büyük günahtır."
  },
  {
    id: 'a_e_30',
    difficulty: 'easy',
    points: 10,
    question: "Su içerken nelere dikkat etmeliyiz?",
    options: ["Ayakta içmeye", "Besmele çekip, oturarak ve yudum yudum içmeye", "Sol elle içmeye", "Hızlıca bitirmeye"],
    correctAnswer: "Besmele çekip, oturarak ve yudum yudum içmeye",
    explanation: "Suyu oturarak, sağ elle, besmeleyle ve üç nefeste içmek Peygamberimizin sünnetidir."
  },
  {
    id: 'a_e_31',
    difficulty: 'easy',
    points: 10,
    question: "Hatasını anlayan biri ne yapmalıdır?",
    options: ["Özür dilemeli ve hatasını düzeltmeli", "İnkar etmeli", "Başkasına suç atmalı", "Kızmalı"],
    correctAnswer: "Özür dilemeli ve hatasını düzeltmeli",
    explanation: "Hatasını kabul etmek ve özür dilemek erdemdir. Tövbe etmek ise Allah katında yücelmektir."
  },
  {
    id: 'a_e_32',
    difficulty: 'easy',
    points: 10,
    question: "Birine seslenirken nasıl hitap etmeliyiz?",
    options: ["Hey, şişt diye", "Kötü lakapla", "İsmiyle veya güzel bir hitapla", "Bağırarak"],
    correctAnswer: "İsmiyle veya güzel bir hitapla",
    explanation: "İnsanlara güzel isimleriyle veya 'Kardeşim, Arkadaşım' gibi güzel sözlerle hitap etmek sünnettir."
  },
  {
    id: 'a_e_33',
    difficulty: 'easy',
    points: 10,
    question: "Gece yatmadan önce ne yapmak sünnettir?",
    options: ["Çok yemek yemek", "Korku filmi izlemek", "Dua etmek ve dişleri fırçalamak", "Kavga etmek"],
    correctAnswer: "Dua etmek ve dişleri fırçalamak",
    explanation: "Yatmadan önce abdestli olmak, dişleri temizlemek ve dua etmek (Felak-Nas okumak) sünnettir."
  },
  {
    id: 'a_e_34',
    difficulty: 'easy',
    points: 10,
    question: "Kıyafetlerimiz nasıl olmalıdır?",
    options: ["Kirli ve yırtık", "Çok pahalı", "Temiz, düzenli ve örtünmeye uygun", "Sadece siyah"],
    correctAnswer: "Temiz, düzenli ve örtünmeye uygun",
    explanation: "Allah güzeldir, güzeli sever. Müslüman temiz ve tertipli giyinmelidir."
  },
  {
    id: 'a_e_35',
    difficulty: 'easy',
    points: 10,
    question: "Cuma günü camiye gitmeden önce ne yapmalıyız?",
    options: ["Hiçbir şey", "Gusül abdesti alıp temizlenmeliyiz", "Kirli elbiseler giymeliyiz", "Sarımsak yemeliyiz"],
    correctAnswer: "Gusül abdesti alıp temizlenmeliyiz",
    explanation: "Cuma günü yıkanmak (boy abdesti), güzel koku sürünmek ve temiz giyinmek sünnettir."
  },
  {
    id: 'a_e_36',
    difficulty: 'easy',
    points: 10,
    question: "İki kişi fısıldaşarak konuşurken, yanlarındaki üçüncü kişi ne hisseder?",
    options: ["Mutlu olur", "Üzülür ve dışlanmış hisseder", "Umursamaz", "Sevinir"],
    correctAnswer: "Üzülür ve dışlanmış hisseder",
    explanation: "Peygamberimiz, yanındaki üçüncü kişiyi bırakıp iki kişinin fısıldaşmasını (Necva) yasaklamıştır, çünkü bu onu üzer."
  },
  {
    id: 'a_e_37',
    difficulty: 'easy',
    points: 10,
    question: "Öfkelendiğimizde ne yapmalıyız?",
    options: ["Bağırmalıyız", "Eşyaları kırmalıyız", "Sabretmeli ve 'Euzü' çekmeliyiz", "Kavga etmeliyiz"],
    correctAnswer: "Sabretmeli ve 'Euzü' çekmeliyiz",
    explanation: "Öfke şeytandandır. Peygamberimiz öfkelenince susmayı, oturmayı ve Allah'a sığınmayı tavsiye etmiştir."
  },
  {
    id: 'a_e_38',
    difficulty: 'easy',
    points: 10,
    question: "Başkalarının kusurlarını ne yapmalıyız?",
    options: ["Araştırmalıyız", "Herkese anlatmalıyız", "Örtmeliyiz (Gizlemeliyiz)", "Alay etmeliyiz"],
    correctAnswer: "Örtmeliyiz (Gizlemeliyiz)",
    explanation: "Kim dünyada bir kardeşinin ayıbını örterse, Allah da kıyamet günü onun ayıbını örter."
  },
  {
    id: 'a_e_39',
    difficulty: 'easy',
    points: 10,
    question: "Hediyeleşmek neyi artırır?",
    options: ["Düşmanlığı", "Kıskançlığı", "Sevgiyi ve dostluğu", "Parayı"],
    correctAnswer: "Sevgiyi ve dostluğu",
    explanation: "Hadis-i Şerif: 'Hediyeleşin ki, birbirinize olan sevginiz artsın.'"
  },
  {
    id: 'a_e_40',
    difficulty: 'easy',
    points: 10,
    question: "Bir işi yaparken nasıl yapmalıyız?",
    options: ["Yarım yamalak", "Baştan savma", "En güzel ve sağlam şekilde", "İsteksizce"],
    correctAnswer: "En güzel ve sağlam şekilde",
    explanation: "Allah, birinizin yaptığı işi en güzel ve sağlam (itkan) yapmasını sever."
  },
  // --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - AHLAK VE ADAP (20 PUAN)
  // --------------------------------------------------------
  {
    id: 'a_m_1',
    difficulty: 'medium',
    points: 20,
    question: "İslam ahlakında 'Sıla-i Rahim' ne demektir?",
    options: ["Akraba ziyareti ve onlarla ilişkiyi sürdürmek", "Yoksullara yardım etmek", "Komşuları gözetmek", "İlim öğrenmek"],
    correctAnswer: "Akraba ziyareti ve onlarla ilişkiyi sürdürmek",
    explanation: "Akrabalık bağlarını canlı tutmaya, onları ziyaret edip gözetmeye Sıla-i Rahim denir ve farzdır."
  },
  {
    id: 'a_m_2',
    difficulty: 'medium',
    points: 20,
    question: "Dinimizde 'Tecessüs' (başkalarının gizli hallerini araştırmak) hükmü nedir?",
    options: ["Haramdır (Yasaktır)", "Mübahtır", "Sevaptır", "Mekruhtur"],
    correctAnswer: "Haramdır (Yasaktır)",
    explanation: "Hucurat suresinde insanların gizli hallerini, kusurlarını araştırmak (tecessüs) kesin olarak yasaklanmıştır."
  },
  {
    id: 'a_m_3',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Müflis' (İflas eden) olarak kimi tanımlamıştır?",
    options: ["Parası biteni", "Kıyamete kul haklarıyla gelip sevaplarını kaybedeni", "Ticarette batanı", "Borç alanı"],
    correctAnswer: "Kıyamete kul haklarıyla gelip sevaplarını kaybedeni",
    explanation: "Gerçek müflis; namazla oruçla gelip, başkasına sövdüğü veya hakkını yediği için sevapları alınan kişidir."
  },
  {
    id: 'a_m_4',
    difficulty: 'medium',
    points: 20,
    question: "Yürüyen ile oturan karşılaştığında selamı kim vermelidir?",
    options: ["Oturan yürüyene", "Yürüyen oturana", "Yaşı küçük olan", "Fark etmez"],
    correctAnswer: "Yürüyen oturana",
    explanation: "Sünnete göre; yürüyen oturana, binekli olan yayaya, az olan çoğa selam verir."
  },
  {
    id: 'a_m_5',
    difficulty: 'medium',
    points: 20,
    question: "'Hüsn-ü Zan' ne demektir?",
    options: ["İnsanlar hakkında iyi düşünmek", "Kötü düşünmek", "Şüphe etmek", "Araştırmak"],
    correctAnswer: "İnsanlar hakkında iyi düşünmek",
    explanation: "Bir kişi veya olay hakkında, aksi ispatlanana kadar olumlu ve iyi düşünmeye Hüsn-ü Zan denir."
  },
  {
    id: 'a_m_6',
    difficulty: 'medium',
    points: 20,
    question: "İyiliği emredip kötülükten sakındırmaya ne ad verilir?",
    options: ["Emr-i bi'l maruf nehy-i ani'l münker", "Sıla-i Rahim", "Cihad", "Tebliğ"],
    correctAnswer: "Emr-i bi'l maruf nehy-i ani'l münker",
    explanation: "İyiliği emretmek (Maruf) ve kötülükten alıkoymak (Münker), her Müslümanın toplumsal görevidir."
  },
  {
    id: 'a_m_7',
    difficulty: 'medium',
    points: 20,
    question: "Hangi davranış 'Kibir' (Büyüklük taslama) alametidir?",
    options: ["Hakkı inkar etmek ve insanları küçük görmek", "Güzel giyinmek", "Zengin olmak", "Çok konuşmak"],
    correctAnswer: "Hakkı inkar etmek ve insanları küçük görmek",
    explanation: "Hadis-i Şerif: 'Kibir; hakkı kabul etmemek ve insanları hor (küçük) görmektir.'"
  },
  {
    id: 'a_m_8',
    difficulty: 'medium',
    points: 20,
    question: "Yapılan iyiliği başa kakmak (Minnet etmek) neye sebep olur?",
    options: ["Sevabı iptal eder (yok eder)", "Sevabı artırır", "Saygınlık kazandırır", "Mübahtır"],
    correctAnswer: "Sevabı iptal eder (yok eder)",
    explanation: "Bakara suresinde, sadakalarını başa kakarak ve eziyet ederek boşa çıkaranlar uyarılmıştır."
  },
  {
    id: 'a_m_9',
    difficulty: 'medium',
    points: 20,
    question: "Müslümanlar arasında 'Küs kalmak' en fazla ne kadar helaldir?",
    options: ["3 gün", "1 hafta", "1 ay", "Hiç helal değildir"],
    correctAnswer: "3 gün",
    explanation: "Hadis-i Şerif: 'Bir Müslümanın din kardeşine 3 günden fazla küs durması helal değildir.'"
  },
  {
    id: 'a_m_10',
    difficulty: 'medium',
    points: 20,
    question: "Bir meclisten kalkarken okunması tavsiye edilen 'Keffaretü'l Meclis' duası ne içindir?",
    options: ["Konuşulan boş sözlerin affı için", "Yemek şükrü için", "Bereket için", "Gelecek toplantı için"],
    correctAnswer: "Konuşulan boş sözlerin affı için",
    explanation: "Mecliste işlenen hataların bağışlanması için 'Sübhaneke Allahümme ve bihamdik...' duası okunur."
  },
  {
    id: 'a_m_11',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'İşçiye ücretini ne zaman veriniz' buyurmuştur?",
    options: ["Alnının teri kurumadan", "İş bitince ertesi gün", "Ay başında", "İstediği zaman"],
    correctAnswer: "Alnının teri kurumadan",
    explanation: "Emek hakkına saygı gereği, işçinin ücretinin bekletilmeden, teri kurumadan verilmesi emredilmiştir."
  },
  {
    id: 'a_m_12',
    difficulty: 'medium',
    points: 20,
    question: "Haset (Kıskançlık) etmek, insanın amellerine ne yapar?",
    options: ["Ateşin odunu yediği gibi yer bitirir", "Artırır", "Etkilemez", "Güzelleştirir"],
    correctAnswer: "Ateşin odunu yediği gibi yer bitirir",
    explanation: "Haset, başkasındaki nimetin yok olmasını istemektir ve sahibinin sevaplarını yok eder."
  },
  {
    id: 'a_m_13',
    difficulty: 'medium',
    points: 20,
    question: "İslam'da 'İsar' (Diğerkâmlık) ne demektir?",
    options: ["Kendi ihtiyacı varken kardeşini kendine tercih etmek", "Cömertlik", "Zekat vermek", "Borç vermek"],
    correctAnswer: "Kendi ihtiyacı varken kardeşini kendine tercih etmek",
    explanation: "Ahlakın zirvesi olan İsar, kendisi muhtaç olsa bile elindekini kardeşine verebilmektir (Ensar'ın özelliği)."
  },
  {
    id: 'a_m_14',
    difficulty: 'medium',
    points: 20,
    question: "Komşuluk hakları kaça ayrılır?",
    options: ["Üç (Akraba, Müslüman, Gayrimüslim)", "İki (Yakın, Uzak)", "Tek (Herkes eşittir)", "Dört"],
    correctAnswer: "Üç (Akraba, Müslüman, Gayrimüslim)",
    explanation: "Gayrimüslim komşunun 1, Müslüman komşunun 2, Akraba olan Müslüman komşunun 3 hakkı vardır."
  },
  {
    id: 'a_m_15',
    difficulty: 'medium',
    points: 20,
    question: "Bir kimsenin yüzüne karşı övülmesi hakkında Peygamberimizin uyarısı nedir?",
    options: ["Boğazını kesmek gibidir (Tehlikelidir)", "Güzeldir", "Teşviktir", "Sünnettir"],
    correctAnswer: "Boğazını kesmek gibidir (Tehlikelidir)",
    explanation: "Aşırı övgü kişiyi kibre ve riyaya sürükleyebileceği için manevi olarak boynunu kesmek gibi tehlikeli görülmüştür."
  },
  {
    id: 'a_m_16',
    difficulty: 'medium',
    points: 20,
    question: "Yalan söylemenin caiz (izinli) olduğu üç yer neresidir?",
    options: ["Savaşta, Eşlerin arasını düzeltmekte, İki kişiyi barıştırmakta", "Ticarette, Şakada, Masalda", "Zenginlikte, Fakirlikte, Hastalıkta", "Hiçbir yerde"],
    correctAnswer: "Savaşta, Eşlerin arasını düzeltmekte, İki kişiyi barıştırmakta",
    explanation: "Sadece bu üç zaruri durumda, hayır amaçlı olarak gerçeği farklı yansıtmaya (kinayeli konuşmaya) ruhsat verilmiştir."
  },
  {
    id: 'a_m_17',
    difficulty: 'medium',
    points: 20,
    question: "İstişare (Danışma) etmenin hükmü ve faydası nedir?",
    options: ["Sünnettir, pişmanlığı önler", "Farzdır, zengin eder", "Mübahtır, zaman kaybettirir", "Mekruhtur"],
    correctAnswer: "Sünnettir, pişmanlığı önler",
    explanation: "Hadis: 'İstişare eden pişman olmaz.' Bir iş yapmadan önce ehline danışmak peygamber sünnetidir."
  },
  {
    id: 'a_m_18',
    difficulty: 'medium',
    points: 20,
    question: "'Nemime' (Koğuculuk/Laf taşıma) nedir?",
    options: ["İnsanların arasını bozmak için laf taşımak", "Yalan söylemek", "İftira atmak", "Sır saklamak"],
    correctAnswer: "İnsanların arasını bozmak için laf taşımak",
    explanation: "Birinden duyduğu sözü, fitne çıkarmak amacıyla diğerine aktarmaya Nemime denir ve büyük günahtır."
  },
  {
    id: 'a_m_19',
    difficulty: 'medium',
    points: 20,
    question: "Hasta ziyaretinde (Iyâdet) dikkat edilmesi gereken edep nedir?",
    options: ["Ziyareti kısa tutmak ve dua etmek", "Uzun oturmak", "Hastalığını sormak", "Yemek istemek"],
    correctAnswer: "Ziyareti kısa tutmak ve dua etmek",
    explanation: "Hastayı yormamak için ziyareti kısa tutmak ve ona şifa duası etmek sünnettir."
  },
  {
    id: 'a_m_20',
    difficulty: 'medium',
    points: 20,
    question: "Öfkelenen bir kimseye Peygamberimiz ne yapmasını tavsiye etmiştir?",
    options: ["Ayaktaysa otursun, oturuyorsa yatsın", "Bağırsın", "Su içsin", "Dışarı çıksın"],
    correctAnswer: "Ayaktaysa otursun, oturuyorsa yatsın",
    explanation: "Öfke anında pozisyon değiştirmek (oturmak veya yatmak) ve abdest almak öfkeyi sakinleştirir."
  },
  {
    id: 'a_m_21',
    difficulty: 'medium',
    points: 20,
    question: "İslam'da 'Tevazu' (Alçakgönüllülük) sahibine Allah ne yapar?",
    options: ["Derecesini yükseltir", "Fakirleştirir", "Zayıf düşürür", "İmtihan eder"],
    correctAnswer: "Derecesini yükseltir",
    explanation: "Hadis-i Şerif: 'Kim Allah için tevazu gösterirse, Allah onu yükseltir (aziz kılar).'"
  },
  {
    id: 'a_m_22',
    difficulty: 'medium',
    points: 20,
    question: "Borçlu olan ve ödeme zorluğu çeken kişiye nasıl davranılmalıdır?",
    options: ["Mühlet (süre) verilmeli veya borçtan düşülmeli", "Hapse atılmalı", "Herkesin içinde istenmeli", "Faiz eklenmeli"],
    correctAnswer: "Mühlet (süre) verilmeli veya borçtan düşülmeli",
    explanation: "Bakara suresinde, darda kalan borçluya eli genişleyinceye kadar süre verilmesi veya sadaka sayılması tavsiye edilir."
  },
  {
    id: 'a_m_23',
    difficulty: 'medium',
    points: 20,
    question: "Cenaze teşyiinde (cenazeyi uğurlarken) yapılması uygun olmayan nedir?",
    options: ["Yüksek sesle ağlamak/feryat etmek", "Sessizce yürümek", "Tabutu taşımak", "Dua etmek"],
    correctAnswer: "Yüksek sesle ağlamak/feryat etmek",
    explanation: "Ölünün arkasından bağırıp çağırarak, üstünü başını yırtarak ağlamak (Niyah) yasaklanmıştır."
  },
  {
    id: 'a_m_24',
    difficulty: 'medium',
    points: 20,
    question: "İslam'da 'Gıpta' ne demektir ve hükmü nedir?",
    options: ["Başkasındaki nimetin aynısını istemek (Caizdir)", "Kıskanmak (Haramdır)", "Haset etmek", "Çekememek"],
    correctAnswer: "Başkasındaki nimetin aynısını istemek (Caizdir)",
    explanation: "Gıpta, 'Onda var, onda da olsun bende de olsun' demektir ve haset değildir, caizdir."
  },
  {
    id: 'a_m_25',
    difficulty: 'medium',
    points: 20,
    question: "Yemeğin bereketi neresindedir?",
    options: ["Ortasında (bu yüzden kenardan yenir)", "Tabağın dibinde", "Etinde", "Suyunda"],
    correctAnswer: "Ortasında (bu yüzden kenardan yenir)",
    explanation: "Peygamberimiz 'Bereket yemeğin ortasına iner, kenarlarından yiyin' buyurmuştur."
  },
  {
    id: 'a_m_26',
    difficulty: 'medium',
    points: 20,
    question: "Müslüman, şaka yaparken nelere dikkat etmelidir?",
    options: ["Yalan söylememeli ve korkutmamalı", "İstediği gibi yapabilir", "Sadece el şakası yapmalı", "Alay etmeli"],
    correctAnswer: "Yalan söylememeli ve korkutmamalı",
    explanation: "Peygamberimiz şaka yapardı ama sadece doğruyu söylerdi. Korkutucu ve kırıcı şakalar yasaktır."
  },
  {
    id: 'a_m_27',
    difficulty: 'medium',
    points: 20,
    question: "Bir topluluğa 'Su dağıtan' (Saki) kişi ne zaman içer?",
    options: ["En son", "En başta", "Ortada", "Fark etmez"],
    correctAnswer: "En son",
    explanation: "Hadis-i Şerif: 'Kavmin efendisi onlara hizmet edendir, su dağıtan da en son içer.'"
  },
  {
    id: 'a_m_28',
    difficulty: 'medium',
    points: 20,
    question: "Kocanın hanımına, hanımın kocasına bakıp gülümsemesine Allah nasıl karşılık verir?",
    options: ["Allah da onlara rahmetle bakar", "Melekler lanet eder", "Günah yazar", "Bir şey olmaz"],
    correctAnswer: "Allah da onlara rahmetle bakar",
    explanation: "Eşlerin birbirine muhabbetle bakması Allah'ın rızasını ve rahmetini celbeder."
  },
  {
    id: 'a_m_29',
    difficulty: 'medium',
    points: 20,
    question: "Müslümanın 'Mütevazi' olması ne demektir?",
    options: ["Kendini başkalarından üstün görmemesi", "Fakir gibi giyinmesi", "Sessiz olması", "Korkak olması"],
    correctAnswer: "Kendini başkalarından üstün görmemesi",
    explanation: "Tevazu, makam ve mevki ne olursa olsun, insanlara karşı alçakgönüllü olmak ve kibirlenmemektir."
  },
  {
    id: 'a_m_30',
    difficulty: 'medium',
    points: 20,
    question: "Giyim kuşamda erkekler için haram olan iki şey nedir?",
    options: ["İpek ve Altın", "Pamuk ve Gümüş", "Yün ve Deri", "Keten ve Demir"],
    correctAnswer: "İpek ve Altın",
    explanation: "Saf ipek giymek ve altın takmak erkeklere haram, kadınlara helal kılınmıştır."
  },
  {
    id: 'a_m_31',
    difficulty: 'medium',
    points: 20,
    question: "'Ucub' ne demektir ve hükmü nedir?",
    options: ["Kendini beğenmek (Günahtır)", "Tevazu (Sevaptır)", "Cömertlik", "Sabır"],
    correctAnswer: "Kendini beğenmek (Günahtır)",
    explanation: "Ucub, kişinin yaptığı ibadetleri veya özelliklerini beğenip bununla gururlanmasıdır, manevi bir hastalıktır."
  },
  {
    id: 'a_m_32',
    difficulty: 'medium',
    points: 20,
    question: "İhtiyaç fazlası suyu ve otu insanlardan esirgemek ne sayılmıştır?",
    options: ["Büyük günah", "Ticaret", "Tasarruf", "Mübah"],
    correctAnswer: "Büyük günah",
    explanation: "Doğadaki sudan ve ottan (kamu malı sayılan) ihtiyacı olanı men etmek büyük günahlardandır."
  },
  {
    id: 'a_m_33',
    difficulty: 'medium',
    points: 20,
    question: "Sadakayı gizli vermek neden daha efdaldir (üstündür)?",
    options: ["Riya (gösteriş) karışmaz ve alanın onuru kırılmaz", "Daha az verilir", "Kimse istemez", "Vergi düşer"],
    correctAnswer: "Riya (gösteriş) karışmaz ve alanın onuru kırılmaz",
    explanation: "Sağ elin verdiğini sol elin görmemesi, ihlasın korunması ve fakirin rencide olmaması içindir."
  },
  {
    id: 'a_m_34',
    difficulty: 'medium',
    points: 20,
    question: "Bir hata işlediğimizde hemen arkasından ne yapmalıyız?",
    options: ["İyilik yapmalıyız (Onu silsin diye)", "Üzülüp oturmalıyız", "Unutmalıyız", "Başkasına anlatmalıyız"],
    correctAnswer: "İyilik yapmalıyız (Onu silsin diye)",
    explanation: "Peygamberimiz 'Kötülüğün peşinden hemen bir iyilik yap ki onu silsin' buyurmuştur."
  },
  {
    id: 'a_m_35',
    difficulty: 'medium',
    points: 20,
    question: "İlim meclisinde hocaya veya konuşmacıya karşı edep nasıldır?",
    options: ["Dikkatle dinlemek ve sözünü kesmemek", "Soru sormak için bağırmak", "Yanındakiyle konuşmak", "Uyumak"],
    correctAnswer: "Dikkatle dinlemek ve sözünü kesmemek",
    explanation: "İlme ve alime saygı, ilmin bereketini artırır. Sessizce ve dikkatle dinlemek gerekir."
  },
  {
    id: 'a_m_36',
    difficulty: 'medium',
    points: 20,
    question: "Ticarette 'Yemin etmek' hakkında hüküm nedir?",
    options: ["Malı sattırır ama bereketini giderir", "Sünnettir", "Güvendirir", "Kârı artırır"],
    correctAnswer: "Malı sattırır ama bereketini giderir",
    explanation: "Ticarette yalan yere veya doğru bile olsa çok yemin etmek, kazancın bereketini yok eder (Mekruhtur/Haramdır)."
  },
  {
    id: 'a_m_37',
    difficulty: 'medium',
    points: 20,
    question: "Aksıran (hapşıran) kişi 'Elhamdülillah' demezse, duyan kişi ne yapar?",
    options: ["Yerhamükallah demez", "Uyarır", "Kendi der", "Kızar"],
    correctAnswer: "Yerhamükallah demez",
    explanation: "Yerhamükallah (Allah sana rahmet etsin) demek için, hapşıranın önce hamd etmesi şarttır."
  },
  {
    id: 'a_m_38',
    difficulty: 'medium',
    points: 20,
    question: "Müslüman, başkasının evinin içine (pencereden/kapıdan) bakabilir mi?",
    options: ["Hayır, haramdır", "Evet, merak ederse bakar", "İzin almadan bakar", "Tanıdıksa bakar"],
    correctAnswer: "Hayır, haramdır",
    explanation: "İzin almadan başkasının evinin içine bakmak, o eve izinsiz girmek gibi sayılmış ve yasaklanmıştır."
  },
  {
    id: 'a_m_39',
    difficulty: 'medium',
    points: 20,
    question: "Hangi günahlara 'Kul Hakkı' denir?",
    options: ["İnsanlara verilen zararlar", "Namazı terk etmek", "Orucu bozmak", "İçki içmek"],
    correctAnswer: "İnsanlara verilen zararlar",
    explanation: "Allah'ın affetmeyip hak sahibine bıraktığı günahlardır (Hırsızlık, gıybet, iftira, borç takmak vb.)."
  },
  {
    id: 'a_m_40',
    difficulty: 'medium',
    points: 20,
    question: "İstihare namazı ve duası ne için yapılır?",
    options: ["Bir işin hayırlı olup olmadığını anlamak için", "Para kazanmak için", "Hastalık için", "Yağmur için"],
    correctAnswer: "Bir işin hayırlı olup olmadığını anlamak için",
    explanation: "Evlilik, iş gibi kararsız kalınan konularda Allah'tan hayırlısını istemek ve kalbe doğanı (işareti) beklemek için yapılır."
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - AHLAK VE ADAP (30 PUAN)
  // --------------------------------------------------------
  {
    id: 'a_h_1',
    difficulty: 'hard',
    points: 30,
    question: "İslam ahlakında 'Vera' ne demektir?",
    options: ["Şüpheli şeylerden kaçınmak", "Dünyayı tamamen terk etmek", "Çok ibadet etmek", "Sadece farzları yapmak"],
    correctAnswer: "Şüpheli şeylerden kaçınmak",
    explanation: "Vera, harama düşme korkusuyla şüpheli olan şeylerden bile uzak durmak demektir (Takvanın bir üst derecesi)."
  },
  {
    id: 'a_h_2',
    difficulty: 'hard',
    points: 30,
    question: "Yapılan iyiliği veya ibadeti başkaları görsün/duysun diye yapmaya ne denir?",
    options: ["Riya (Gösteriş)", "İhlas", "Ucub", "Kibir"],
    correctAnswer: "Riya (Gösteriş)",
    explanation: "Allah rızası için yapılması gereken ameli, insanlar desinler diye yapmaya Riya denir ve 'Gizli Şirk' kabul edilir."
  },
  {
    id: 'a_h_3',
    difficulty: 'hard',
    points: 30,
    question: "'Tul-i Emel' ne demektir ve ahlaki hükmü nedir?",
    options: ["Hiç ölmeyecekmiş gibi dünyaya bağlanmak (Kötüdür)", "Çok çalışmak (İyidir)", "Uzun ömür dilemek (İyidir)", "Hedef sahibi olmak (İyidir)"],
    correctAnswer: "Hiç ölmeyecekmiş gibi dünyaya bağlanmak (Kötüdür)",
    explanation: "Tul-i Emel, ölümü unutup dünya zevklerine dalmak ve bitmeyen hırslara kapılmak demektir, yerilmiştir."
  },
  {
    id: 'a_h_4',
    difficulty: 'hard',
    points: 30,
    question: "İslam ahlakında 'Hilm' sahibi olmak neyi ifade eder?",
    options: ["Yumuşak huylu ve sabırlı olmak", "Çok bilgili olmak", "Zengin olmak", "Sessiz olmak"],
    correctAnswer: "Yumuşak huylu ve sabırlı olmak",
    explanation: "Hilm, öfke anında kendine hakim olup yumuşak davranabilmek, intikam peşinde koşmamaktır."
  },
  {
    id: 'a_h_5',
    difficulty: 'hard',
    points: 30,
    question: "Bir kimsenin insanları güldürmek için yalan söylemesi hakkında Peygamberimizin uyarısı nedir?",
    options: ["Yazıklar olsun (Veyl olsun)", "Sorun yoktur", "Eğlendiriyorsa sevaptır", "Mekruhtur"],
    correctAnswer: "Yazıklar olsun (Veyl olsun)",
    explanation: "Hadis-i Şerif: 'Milleti güldürmek için yalan söyleyene yazıklar olsun, yazıklar olsun, yazıklar olsun!'"
  },
  {
    id: 'a_h_6',
    difficulty: 'hard',
    points: 30,
    question: "'Sum'a' ne demektir?",
    options: ["Yaptığı iyiliği başkalarına duyurmaya çalışmak", "Kıskançlık", "Cimrilik", "Yalan"],
    correctAnswer: "Yaptığı iyiliği başkalarına duyurmaya çalışmak",
    explanation: "Riyanın bir türü olan Sum'a, yaptığı ameli insanlar duysun ve beni övsünler diye anlatmaktır."
  },
  {
    id: 'a_h_7',
    difficulty: 'hard',
    points: 30,
    question: "İslam ahlakında 'Zühd' ne anlama gelir?",
    options: ["Dünya malına kalben değer vermemek", "Fakir yaşamak", "Hiç çalışmamak", "Dağda yaşamak"],
    correctAnswer: "Dünya malına kalben değer vermemek",
    explanation: "Zühd, dünyayı tamamen terk etmek değil, dünya malı elde olsa bile kalbi ona bağlamamaktır."
  },
  {
    id: 'a_h_8',
    difficulty: 'hard',
    points: 30,
    question: "'Gıybet' etmenin caiz (izinli) olduğu istisnai durumlardan biri hangisidir?",
    options: ["Zulme uğrayanın hakkını aramak için şikayet etmesi", "Canı sıkılınca", "Düşmanıysa", "Şaka yapıyorsa"],
    correctAnswer: "Zulme uğrayanın hakkını aramak için şikayet etmesi",
    explanation: "Haksızlığa uğrayan kişinin, hakkını almak için yetkili mercilere durumu anlatması (şikayet) gıybet sayılmaz."
  },
  {
    id: 'a_h_9',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Müdarâ' yapmayı övmüştür. Müdarâ nedir?",
    options: ["İnsanlarla iyi geçinmek için (dinden taviz vermeden) idare etmek", "İkiyüzlülük yapmak", "Dalkavukluk etmek", "Yalan söylemek"],
    correctAnswer: "İnsanlarla iyi geçinmek için (dinden taviz vermeden) idare etmek",
    explanation: "Müdarâ, şerrinden emin olmak veya kalbini kazanmak için insanlara yumuşak davranmaktır. Dinden taviz verilirse 'Müdâhane' olur (haramdır)."
  },
  {
    id: 'a_h_10',
    difficulty: 'hard',
    points: 30,
    question: "'Su-i Zan'nı (Kötü zan) terk etmenin hükmü nedir?",
    options: ["Vaciptir (Çünkü su-i zan haramdır)", "Sünnettir", "Müstehaptır", "Mübahtır"],
    correctAnswer: "Vaciptir (Çünkü su-i zan haramdır)",
    explanation: "Kuran'da 'Zannın çoğundan kaçının' buyurulmuş, mümin hakkında delilsiz kötü düşünmek haram kılınmıştır."
  },
  {
    id: 'a_h_11',
    difficulty: 'hard',
    points: 30,
    question: "İslam ahlakında 'İffet' kavramı sadece namusla mı ilgilidir?",
    options: ["Hayır, her türlü haramdan (yeme, içme, göz, el) sakınmaktır", "Evet, sadece namustur", "Sadece kadınlar içindir", "Sadece gençler içindir"],
    correctAnswer: "Hayır, her türlü haramdan (yeme, içme, göz, el) sakınmaktır",
    explanation: "İffet; yeme, içme, konuşma ve cinsel arzularda aşırıya kaçmayıp ölçülü olmak ve haramdan sakınmaktır."
  },
  {
    id: 'a_h_12',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'İstişare (danışılan) kişi .....' buyurmuştur.",
    options: ["Emindir (Güvenilirdir)", "Zengindir", "Alimdir", "Yöneticidir"],
    correctAnswer: "Emindir (Güvenilirdir)",
    explanation: "Kendisine danışılan kişi, doğruyu söylemekle yükümlü bir emanetçidir; bile bile yanlış yol gösteremez."
  },
  {
    id: 'a_h_13',
    difficulty: 'hard',
    points: 30,
    question: "Anne-babanın evlat üzerindeki haklarından biri, çocuklarına 'güzel isim' koymaktır. Diğeri nedir?",
    options: ["Güzel terbiye vermek ve evlendirmek", "Zengin etmek", "Araba almak", "Mirastan mahrum etmek"],
    correctAnswer: "Güzel terbiye vermek ve evlendirmek",
    explanation: "Hadislerde babanın görevleri arasında çocuğa güzel isim koymak, Kuran öğretmek ve zamanı gelince evlendirmek sayılır."
  },
  {
    id: 'a_h_14',
    difficulty: 'hard',
    points: 30,
    question: "'Teennî' ile hareket etmek ne demektir?",
    options: ["Acele etmeden, düşünerek ve tedbirli hareket etmek", "Tembellik etmek", "Çok hızlı olmak", "Kararsız kalmak"],
    correctAnswer: "Acele etmeden, düşünerek ve tedbirli hareket etmek",
    explanation: "Hadis: 'Teennî (acele etmemek) Allah'tan, acele ise şeytandandır.'"
  },
  {
    id: 'a_h_15',
    difficulty: 'hard',
    points: 30,
    question: "Kardeşini bir günahından dolayı ayıplayan (kınayan) kimse hakkında hadiste ne buyurulmuştur?",
    options: ["O günahı işlemeden ölmez", "Sevaba girer", "Düzeltmiş olur", "Üstünlük kazanır"],
    correctAnswer: "O günahı işlemeden ölmez",
    explanation: "Büyüklenerek kardeşini kınamak (ayıplamak) o kadar tehlikelidir ki, kınayanın başına gelmeden ölmeyeceği bildirilmiştir."
  },
  {
    id: 'a_h_16',
    difficulty: 'hard',
    points: 30,
    question: "İslam'da 'Sıdk' (Doğruluk) kavramının zıddı (karşıtı) olan 'Kizb' ne demektir?",
    options: ["Yalan söylemek", "Tembellik", "Cimrilik", "Korkaklık"],
    correctAnswer: "Yalan söylemek",
    explanation: "Sıdk (doğruluk) peygamber sıfatıdır; Kizb (yalan) ise münafıklık alametidir."
  },
  {
    id: 'a_h_17',
    difficulty: 'hard',
    points: 30,
    question: "'Tövbe-i Nasuh' ne demektir?",
    options: ["Samimi, halis ve bir daha günaha dönmemek üzere yapılan tövbe", "Dil ile yapılan tövbe", "Sadece Cuma günü yapılan tövbe", "Yaşlanınca yapılan tövbe"],
    correctAnswer: "Samimi, halis ve bir daha günaha dönmemek üzere yapılan tövbe",
    explanation: "Kuran'da emredilen Tövbe-i Nasuh, tam bir pişmanlık ve kararlılıkla yapılan samimi tövbedir."
  },
  {
    id: 'a_h_18',
    difficulty: 'hard',
    points: 30,
    question: "Bir kimsenin 'Ben ondan daha hayırlıyım' demesi (Şeytanın sözü) hangi hastalığın belirtisidir?",
    options: ["Kibir ve Enaniyet", "Özgüven", "Cesaret", "İlim"],
    correctAnswer: "Kibir ve Enaniyet",
    explanation: "Kendini başkasından üstün görmek (Kibir), İblis'i Allah'ın rahmetinden kovan ilk günahtır."
  },
  {
    id: 'a_h_19',
    difficulty: 'hard',
    points: 30,
    question: "İslam ahlakında 'Fütüvvet' neyi ifade eder?",
    options: ["Cömertlik, yiğitlik ve başkasını nefsine tercih etmek", "Gençlik hevesleri", "Savaş sanatı", "Zenginlik"],
    correctAnswer: "Cömertlik, yiğitlik ve başkasını nefsine tercih etmek",
    explanation: "Fütüvvet, tasavvufta ve ahilikte 'elindekini dağıtmak, hatayı affetmek, nefsini aşağıda tutmak' gibi erdemlerdir."
  },
  {
    id: 'a_h_20',
    difficulty: 'hard',
    points: 30,
    question: "Yolculuk adabı açısından, bir grup yola çıktığında ne yapmalıdır?",
    options: ["İçlerinden birini başkan (emir) seçmelidir", "Herkes kafasına göre gitmelidir", "Hiç konuşmamalıdır", "Yarış yapmalıdır"],
    correctAnswer: "İçlerinden birini başkan (emir) seçmelidir",
    explanation: "Peygamberimiz, üç kişi yola çıksa bile birini başkan seçmelerini emrederek düzen ve disipline önem vermiştir."
  },
  {
    id: 'a_h_21',
    difficulty: 'hard',
    points: 30,
    question: "İslam'da 'Gıpta' ile 'Hased' arasındaki temel fark nedir?",
    options: ["Gıpta o nimetin onda kalmasını (ve bende de olmasını) istemektir, Hased yok olmasını istemektir", "Fark yoktur", "Hased iyidir, gıpta kötüdür", "Gıpta sadece parada olur"],
    correctAnswer: "Gıpta o nimetin onda kalmasını (ve bende de olmasını) istemektir, Hased yok olmasını istemektir",
    explanation: "Gıpta, 'onda var, Allah artırsın, bana da versin' demektir (Mümince). Hased, 'onda olmasın, yok olsun' demektir (Münafıkça)."
  },
  {
    id: 'a_h_22',
    difficulty: 'hard',
    points: 30,
    question: "'Taziye' (Başsağlığı) süresi sünnete göre kaç gündür?",
    options: ["3 gün", "7 gün", "40 gün", "1 yıl"],
    correctAnswer: "3 gün",
    explanation: "Cenaze sahibinin hüznünü tazelememek için taziye süresi 3 günle sınırlandırılmıştır (Uzakta olanlar hariç)."
  },
  {
    id: 'a_h_23',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Mümin, ..... gibidir; rüzgar onu eğer ama kırmaz' buyurmuştur.",
    options: ["Taze ekin (Başak)", "Çınar ağacı", "Kaya", "Demir"],
    correctAnswer: "Taze ekin (Başak)",
    explanation: "Mümin, belalar karşısında esnek olur (sabreder, eğilir) ama kökünden kopmaz. Kafir ise sert ağaç gibidir, birden devrilir."
  },
  {
    id: 'a_h_24',
    difficulty: 'hard',
    points: 30,
    question: "Ahlak ilminde 'İfrat ve Tefrit'ten uzak, orta yola ne denir?",
    options: ["İtidal (Vasat)", "İsraf", "Cimrilik", "Taassup"],
    correctAnswer: "İtidal (Vasat)",
    explanation: "Aşırılıklardan (ifrat ve tefrit) uzak durup dengeli olmaya İtidal veya Sırat-ı Müstakim denir."
  },
  {
    id: 'a_h_25',
    difficulty: 'hard',
    points: 30,
    question: "'Rıfk' ile muamele etmek ne demektir?",
    options: ["Nazik, yumuşak ve kolaylaştırıcı olmak", "Sert olmak", "Hızlı olmak", "Adaletli olmak"],
    correctAnswer: "Nazik, yumuşak ve kolaylaştırıcı olmak",
    explanation: "Hadis: 'Allah Refîk'tir (yumuşaktır), rıfkı sever. Sertliğe vermediği şeyi rıfka (yumuşaklığa) verir.'"
  },
  {
    id: 'a_h_26',
    difficulty: 'hard',
    points: 30,
    question: "Ticaret ahlakında 'Pazarlığı kızıştırmak için alıcı gibi görünüp fiyat artırmaya' (Neceş) ne denir?",
    options: ["Haramdır", "Ticari zekadır", "Sünnettir", "Mübahtır"],
    correctAnswer: "Haramdır",
    explanation: "Almayacağı halde fiyatı yükselterek başkasını zarara uğratmak (Neceş) Peygamberimiz tarafından yasaklanmıştır."
  },
  {
    id: 'a_h_27',
    difficulty: 'hard',
    points: 30,
    question: "'Haya' (Utanma) duygusunun kaynağı nedir?",
    options: ["İman", "Korku", "Eğitim", "Gelenek"],
    correctAnswer: "İman",
    explanation: "Hadis-i Şerif: 'Haya imandandır, iman ise cennettedir.'"
  },
  {
    id: 'a_h_28',
    difficulty: 'hard',
    points: 30,
    question: "İbadetlerdeki 'Huşu' neyi ifade eder?",
    options: ["Kalbin ve bedenin saygı ve korku ile Allah'a yönelmesi", "Hızlı kılmak", "Gözleri kapatmak", "Sesli okumak"],
    correctAnswer: "Kalbin ve bedenin saygı ve korku ile Allah'a yönelmesi",
    explanation: "Huşu, bedenin sakin, kalbin ise Allah'ın huzurunda olduğu bilinciyle ürpermesidir."
  },
  {
    id: 'a_h_29',
    difficulty: 'hard',
    points: 30,
    question: "Bir kimsenin 'Kendi ayıbı ile meşgul olması' onu neyden alıkoyar?",
    options: ["Başkalarının ayıplarını araştırmaktan", "İbadet etmekten", "Çalışmaktan", "Uyumaktan"],
    correctAnswer: "Başkalarının ayıplarını araştırmaktan",
    explanation: "Hadis: 'Ne mutlu o kimseye ki, kendi kusuruyla meşgul olması, onu insanların kusurlarını araştırmaktan alıkoyar.'"
  },
  {
    id: 'a_h_30',
    difficulty: 'hard',
    points: 30,
    question: "İslam'da 'Vekar' sahibi olmak ne demektir?",
    options: ["Ağırbaşlı, ciddiyet ve heybet sahibi olmak", "Somurtkan olmak", "Kibirli olmak", "Şakacı olmak"],
    correctAnswer: "Ağırbaşlı, ciddiyet ve heybet sahibi olmak",
    explanation: "Vekar; hafifmeşrep olmamak, saygın ve ağırbaşlı duruş sergilemektir (Kibirden farklıdır)."
  },
  {
    id: 'a_h_31',
    difficulty: 'hard',
    points: 30,
    question: "Komşuluk hakkı ne zaman düşer (biter)?",
    options: ["Ölünce veya taşınınca bile hak devam eder", "Küsünce biter", "Borç verince biter", "Kavga edince biter"],
    correctAnswer: "Ölünce veya taşınınca bile hak devam eder",
    explanation: "İyi komşuluk sadece yaşarken değil, öldükten sonra cenazesine katılmak ve arkasından dua etmekle devam eder."
  },
  {
    id: 'a_h_32',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Allah'ım, fayda vermeyen ..... sana sığınırım' diye dua etmiştir.",
    options: ["İlimden", "Maldan", "Arkadaştan", "Yemekten"],
    correctAnswer: "İlimden",
    explanation: "Amel edilmeyen, insanlara yararı olmayan ve kibre sebep olan ilimden Allah'a sığınılmıştır."
  },
  {
    id: 'a_h_33',
    difficulty: 'hard',
    points: 30,
    question: "'Mürüvvet' ne demektir?",
    options: ["İnsanlık, mertlik ve kişiliğin olgunlaşması", "Zenginlik", "Güzellik", "Gençlik"],
    correctAnswer: "İnsanlık, mertlik ve kişiliğin olgunlaşması",
    explanation: "Mürüvvet, kişinin dine ve örfe uygun davranarak insanlığını ve şahsiyetini korumasıdır."
  },
  {
    id: 'a_h_34',
    difficulty: 'hard',
    points: 30,
    question: "Bir kimsenin sırf 'Allah rızası için' sevdiği kardeşine ne yapması tavsiye edilmiştir?",
    options: ["Gidip onu sevdiğini söylemesi", "Hediye alması", "Ona dua etmesi", "Hepsi"],
    correctAnswer: "Hepsi",
    explanation: "Peygamberimiz 'Biriniz kardeşini (Allah için) seviyorsa, bunu ona bildirsin/söylesin' buyurmuştur."
  },
  {
    id: 'a_h_35',
    difficulty: 'hard',
    points: 30,
    question: "Misafirlik süresi (hakkı) ne kadardır?",
    options: ["3 gün (sonrası sadakadır)", "1 gün", "1 hafta", "Sınırsızdır"],
    correctAnswer: "3 gün (sonrası sadakadır)",
    explanation: "Hadise göre misafirlik hakkı 3 gündür. Bundan fazlası ev sahibinin ikramı (sadakası) sayılır."
  },
  {
    id: 'a_h_36',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Söz (Sohbet) ..... ile açılır, ..... ile kapanır' buyurmuştur.",
    options: ["Selam / Selam", "Besmele / Fatiha", "Şaka / Dua", "Gülümseme / Hediye"],
    correctAnswer: "Selam / Selam",
    explanation: "Bir meclise girerken selam verildiği gibi, çıkarken de oradakilere veda mahiyetinde selam verilir."
  },
  {
    id: 'a_h_37',
    difficulty: 'hard',
    points: 30,
    question: "'Şecaat' ne demektir?",
    options: ["Kalp metaneti ve cesaret (ölçülü olmak)", "Korkaklık", "Saldırganlık", "Kızgınlık"],
    correctAnswer: "Kalp metaneti ve cesaret (ölçülü olmak)",
    explanation: "Şecaat, korkaklık ile atılganlık arasındaki orta yol, yani hak uğruna gerektiğinde korkmadan mücadele etmektir."
  },
  {
    id: 'a_h_38',
    difficulty: 'hard',
    points: 30,
    question: "İbadetlerde ve hayırlı işlerde 'Acele etmek' (Müsâraat) nasıldır?",
    options: ["Övülmüştür (Hayırlıdır)", "Yerilmiştir (Şeytandandır)", "Fark etmez", "Mekruhtur"],
    correctAnswer: "Övülmüştür (Hayırlıdır)",
    explanation: "Dünya işlerinde acele yerilmiş (teenni övülmüş), ancak ahiret işlerinde ve tövbede acele etmek (yarışmak) övülmüştür."
  },
  {
    id: 'a_h_39',
    difficulty: 'hard',
    points: 30,
    question: "'Kalp-i Selîm' ne demektir?",
    options: ["Manevi hastalıklardan (şirk, kin, haset) arınmış temiz kalp", "Sağlıklı kalp", "Cesur kalp", "Yumuşak kalp"],
    correctAnswer: "Manevi hastalıklardan (şirk, kin, haset) arınmış temiz kalp",
    explanation: "Şuara suresinde, Allah'a ancak 'Kalp-i Selim' (tertemiz bir kalp) ile gelenin kurtulacağı bildirilir."
  },
  {
    id: 'a_h_40',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'İnsanların arasını düzelten (Yalancı sayılmaz).....'",
    options: ["Hayır söyler, hayır taşır", "Günah işler", "Suçludur", "Tövbe etmelidir"],
    correctAnswer: "Hayır söyler, hayır taşır",
    explanation: "İki küs kişinin arasını bulmak için (aslında söylenmemiş) güzel sözler aktarmak yalan sayılmaz, hayır sayılır."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - AHLAK VE ADAP (40 PUAN)
  // --------------------------------------------------------
  {
    id: 'a_x_1',
    difficulty: 'expert',
    points: 40,
    question: "İslam ahlakında 'Tezkiye-i Nefs' ne demektir?",
    options: ["Nefsi kötülüklerden arındırıp temizlemek", "Nefsin isteklerini yapmak", "Çok yemek yemek", "Nefsi öldürmek"],
    correctAnswer: "Nefsi kötülüklerden arındırıp temizlemek",
    explanation: "Şems suresinde geçen 'Nefsini tezkiye eden (arındıran) kurtuluşa ermiştir' ayetine dayanır."
  },
  {
    id: 'a_x_2',
    difficulty: 'expert',
    points: 40,
    question: "'Hüsn-ü Hatime' ne demektir?",
    options: ["Güzel son (İmanla ölmek)", "Güzel yazı", "Güzel yüz", "Güzel başlangıç"],
    correctAnswer: "Güzel son (İmanla ölmek)",
    explanation: "Müslümanın en büyük hedefi hayatını güzel bir sonla (imanla) noktalamaktır."
  },
  {
    id: 'a_x_3',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Münafıklığın alameti üçtür' hadisinin devamında 'Oruç tutsa, namaz kılsa ve ..... iddia etse bile' buyurmuştur.",
    options: ["Müslüman olduğunu", "Alim olduğunu", "Zengin olduğunu", "Hacı olduğunu"],
    correctAnswer: "Müslüman olduğunu",
    explanation: "Münafıklık alametlerini taşıyan kişi, zahiren ibadet etse ve Müslümanım dese bile nifak üzerinedir."
  },
  {
    id: 'a_x_4',
    difficulty: 'expert',
    points: 40,
    question: "İslam ahlakında 'İhsan' kavramı nasıl tarif edilmiştir?",
    options: ["Allah'ı görüyormuş gibi ibadet etmek", "Çok sadaka vermek", "İnsanlara iyilik yapmak", "Güzel konuşmak"],
    correctAnswer: "Allah'ı görüyormuş gibi ibadet etmek",
    explanation: "Cibril hadisinde İhsan: 'Allah'ı görüyormuşsun gibi ibadet etmendir. Sen O'nu görmesen de O seni görür.'"
  },
  {
    id: 'a_x_5',
    difficulty: 'expert',
    points: 40,
    question: "'Hilm' sıfatının zıddı (karşıtı) olan ve yerilen özellik nedir?",
    options: ["Sefeh (Akılsızca/Düşüncesizce öfkelenmek)", "Kibir", "Cimrilik", "Yalan"],
    correctAnswer: "Sefeh (Akılsızca/Düşüncesizce öfkelenmek)",
    explanation: "Hilm; yumuşak huyluluk ve akıllıca davranmaktır. Zıddı olan Sefeh ise; hafiflik, acelecilik ve duygusal patlamadır."
  },
  {
    id: 'a_x_6',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'İman iki kısımdır: Yarısı sabır, diğer yarısı .....' buyurmuştur.",
    options: ["Şükürdür", "Namazdır", "Zikirdir", "Cihaddır"],
    correctAnswer: "Şükürdür",
    explanation: "Müminin hayatı sabır (zorluklara) ve şükür (nimetlere) dengesi üzerine kuruludur."
  },
  {
    id: 'a_x_7',
    difficulty: 'expert',
    points: 40,
    question: "'Riyazet' ne demektir?",
    options: ["Nefsi terbiye için az yemek, az uyumak ve ibadet etmek", "Spor yapmak", "Matematik çalışmak", "Bahçe bakımı"],
    correctAnswer: "Nefsi terbiye için az yemek, az uyumak ve ibadet etmek",
    explanation: "Tasavvufta nefsi dizginlemek için yapılan manevi perhize Riyazet denir."
  },
  {
    id: 'a_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Allah'ım! Ürpermeyen kalpten, doymayan nefisten ve ..... sana sığınırım' buyurmuştur.",
    options: ["Kabul olunmayan duadan", "Fakir olmaktan", "Hasta olmaktan", "Yalnız kalmaktan"],
    correctAnswer: "Kabul olunmayan duadan",
    explanation: "Hadis-i Şerif: 'Fayda vermeyen ilimden, ürpermeyen kalpten, doymayan nefisten ve kabul edilmeyen duadan sana sığınırım.'"
  },
  {
    id: 'a_x_9',
    difficulty: 'expert',
    points: 40,
    question: "İslam'da 'Tevbe-i Ye's' (Ümitsizlik Tövbesi) ne zaman geçersizdir?",
    options: ["Can boğaza gelip ölümü kesin görünce (Son nefes)", "Hasta olunca", "Yaşlanınca", "İflas edince"],
    correctAnswer: "Can boğaza gelip ölümü kesin görünce (Son nefes)",
    explanation: "Firavun gibi, azabı veya ölümü kesin gördükten sonra (zorunluluktan) yapılan tövbe (Ye's Tövbesi) kabul edilmez."
  },
  {
    id: 'a_x_10',
    difficulty: 'expert',
    points: 40,
    question: "Ahlak ilminde 'Takva'nın üç mertebesinden en üstünü hangisidir?",
    options: ["Kalbi Allah'tan gafil kılan her şeyden uzak durmak", "Sadece haramlardan kaçmak", "Şüpheli şeylerden kaçmak", "Çok namaz kılmak"],
    correctAnswer: "Kalbi Allah'tan gafil kılan her şeyden uzak durmak",
    explanation: "Takvanın zirvesi; 'Masiva' denilen, Allah dışındaki her şeyi kalpten çıkarmaktır."
  },
  {
    id: 'a_x_11',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Kıyamet günü müminin terazisinde ..... daha ağır basan bir şey yoktur' buyurmuştur.",
    options: ["Güzel ahlaktan", "Çok paradan", "Nafile oruçtan", "Uzun namazdan"],
    correctAnswer: "Güzel ahlaktan",
    explanation: "Hadis-i Şerif: 'Kıyamet günü müminin mizanında güzel ahlaktan daha ağır gelen bir şey yoktur.'"
  },
  {
    id: 'a_x_12',
    difficulty: 'expert',
    points: 40,
    question: "'İstikamet' ne demektir?",
    options: ["Her türlü aşırılıktan uzak, dosdoğru yol üzere olmak", "Hızlı yürümek", "Yön bulmak", "Geleceği düşünmek"],
    correctAnswer: "Her türlü aşırılıktan uzak, dosdoğru yol üzere olmak",
    explanation: "Hud suresindeki 'Emrolunduğun gibi dosdoğru ol' emri istikameti ifade eder. Kerametten üstündür."
  },
  {
    id: 'a_x_13',
    difficulty: 'expert',
    points: 40,
    question: "Bir kimsenin 'Ben Allah'ın sevgili kuluyum, bana azap etmez' diyerek günaha devam etmesine ne denir?",
    options: ["Mekr-i İlahi'den emin olmak (Güvendir/Günahtır)", "Hüsn-ü Zan", "Tevekkül", "Rica"],
    correctAnswer: "Mekr-i İlahi'den emin olmak (Güvendir/Günahtır)",
    explanation: "Allah'ın azabından (mekrinden) emin olmak, en az Allah'tan ümidi kesmek kadar büyük bir günahtır."
  },
  {
    id: 'a_x_14',
    difficulty: 'expert',
    points: 40,
    question: "İslam ahlakında 'Melâmet' neyi ifade eder?",
    options: ["Kınanmaktan korkmamak ve nefsi kınamak", "İnsanları kınamak", "Gösteriş yapmak", "Şikayet etmek"],
    correctAnswer: "Kınanmaktan korkmamak ve nefsi kınamak",
    explanation: "Melâmet; Hak yolunda halkın kınamasına aldırmamak ve kendi nefsini daima kusurlu görüp kınamaktır."
  },
  {
    id: 'a_x_15',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Mümin, .....' buyurmuştur. (Kişilik özelliği)",
    options: ["Ülfet eden (seven) ve ülfet edilendir (sevilendir)", "Korkutandır", "Yalnız yaşayandır", "Sert olandır"],
    correctAnswer: "Ülfet eden (seven) ve ülfet edilendir (sevilendir)",
    explanation: "Hadis-i Şerif: 'Mümin, başkalarıyla iyi geçinen ve kendisiyle iyi geçinilen kimsedir. Geçimsiz kimsede hayır yoktur.'"
  },
  {
    id: 'a_x_16',
    difficulty: 'expert',
    points: 40,
    question: "'Tecdid-i İman' ne demektir?",
    options: ["La ilahe illallah diyerek imanı tazelemek", "Yeni elbise giymek", "Hacca gitmek", "Kuran okumak"],
    correctAnswer: "La ilahe illallah diyerek imanı tazelemek",
    explanation: "Hadis: 'İmanınızı La ilahe illallah ile yenileyiniz (tazeleyiniz).'"
  },
  {
    id: 'a_x_17',
    difficulty: 'expert',
    points: 40,
    question: "İslam'da 'Vera' ve 'Zühd'den sonra gelen en yüksek manevi makam hangisidir?",
    options: ["Rıza (Allah'tan ve kaderden razı olmak)", "Korku", "Ümit", "Sabır"],
    correctAnswer: "Rıza (Allah'tan ve kaderden razı olmak)",
    explanation: "Rıza makamı; gelen bela ve musibetlere dahi itirazsız, gönül hoşluğuyla 'Allah'tandır' diyebilmektir."
  },
  {
    id: 'a_x_18',
    difficulty: 'expert',
    points: 40,
    question: "'Hatm-i Hâcegân' nedir?",
    options: ["Bazı tarikatlarda yapılan toplu zikir meclisi", "Kuran hatmi", "Ticaret anlaşması", "Hoca seçimi"],
    correctAnswer: "Bazı tarikatlarda yapılan toplu zikir meclisi",
    explanation: "Nakşibendi tarikatında, belirli usullerle ve taşlarla yapılan toplu zikir halkasına denir."
  },
  {
    id: 'a_x_19',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'İki haslet vardır ki bir münafıkta birleşmez.' Bunlar nedir?",
    options: ["Güzel ahlak ve dinde derin anlayış (Fıkh)", "Zenginlik ve Güzellik", "Cimrilik ve Yalan", "Korkaklık ve Tembellik"],
    correctAnswer: "Güzel ahlak ve dinde derin anlayış (Fıkh)",
    explanation: "Tirmizi hadisi: 'İki özellik münafıkta toplanmaz: Güzel ahlak (semt-i hasen) ve dinde fıkıh (derin anlayış).'"
  },
  {
    id: 'a_x_20',
    difficulty: 'expert',
    points: 40,
    question: "Ahlak kitaplarında 'Emrâz-ı Kalbiye' (Kalp Hastalıkları) arasında en tehlikeli sayılan 'Hubb-u Câh' ne demektir?",
    options: ["Makam ve şöhret sevgisi", "Mal sevgisi", "Evlat sevgisi", "Uyku sevgisi"],
    correctAnswer: "Makam ve şöhret sevgisi",
    explanation: "Makam, mevki ve şöhret tutkusu (Hubb-u Câh), kalbi ifsad eden ve riyaya sürükleyen en büyük manevi hastalıktır."
  },
  {
    id: 'a_x_21',
    difficulty: 'expert',
    points: 40,
    question: "'Murâkabe' ne demektir?",
    options: ["Allah'ın her an kendisini gördüğünü bilerek iç dünyasını kontrol etmek", "İnsanları gözetlemek", "Yıldızları izlemek", "Kitap okumak"],
    correctAnswer: "Allah'ın her an kendisini gördüğünü bilerek iç dünyasını kontrol etmek",
    explanation: "Tasavvufta murâkabe; kalbi Allah'a bağlayıp, O'nun gözetimi altında olduğunun bilinciyle tefekkür etmektir."
  },
  {
    id: 'a_x_22',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Şeytanın, insanın kurdu' olduğunu belirtip neyi tavsiye etmiştir?",
    options: ["Cemaatten (topluluktan) ayrılmamayı", "Yalnız yaşamayı", "Silah taşımayı", "Çok uyumayı"],
    correctAnswer: "Cemaatten (topluluktan) ayrılmamayı",
    explanation: "Hadis: 'Sürüden ayrılan koyunu kurt kapar. Cemaatten ayrılmayın.' (Birlik ve beraberlik vurgusu)."
  },
  {
    id: 'a_x_23',
    difficulty: 'expert',
    points: 40,
    question: "'Sekinet' ne demektir?",
    options: ["Kalbe inen huzur, güven ve vakar", "Sessizlik", "Uyuşukluk", "Hastalık"],
    correctAnswer: "Kalbe inen huzur, güven ve vakar",
    explanation: "Kuran'da ve hadislerde geçen Sekinet; Allah'ın müminlerin kalbine indirdiği manevi huzur ve sükunettir."
  },
  {
    id: 'a_x_24',
    difficulty: 'expert',
    points: 40,
    question: "İslam'da 'Tevkif' (Vakfetmek) sadece mal ile mi olur?",
    options: ["Hayır, zamanını ve nefsini de Allah yoluna adamak bir vakıftır", "Evet, sadece arsa ve para ile olur", "Sadece cami yaptırmaktır", "Sadece kitap bağışlamaktır"],
    correctAnswer: "Hayır, zamanını ve nefsini de Allah yoluna adamak bir vakıftır",
    explanation: "En büyük vakıf, kişinin ömrünü ve varlığını Allah yoluna adamasıdır (Vakf-ı Hayat / Vakf-ı Nefs)."
  },
  {
    id: 'a_x_25',
    difficulty: 'expert',
    points: 40,
    question: "'İstidraç' gösteren bir kişi ile 'Keramet' gösteren veli arasındaki fark nedir?",
    options: ["İstidraç sahibi şeriata uymaz ve günahkardır", "Fark yoktur", "İstidraç daha üstündür", "Keramet gizli olmaz"],
    correctAnswer: "İstidraç sahibi şeriata uymaz ve günahkardır",
    explanation: "Olağanüstü haller (uçmak, suda yürümek) fasık/kafir birinde görülürse İstidraç (tuzak), mümin/takva sahibinde görülürse Keramettir."
  },
  {
    id: 'a_x_26',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Müminin ferasetinden sakının, çünkü o ..... bakar' buyurmuştur.",
    options: ["Allah'ın nuruyla", "Tecrübesiyle", "Aklıyla", "Gözleriyle"],
    correctAnswer: "Allah'ın nuruyla",
    explanation: "Hadis-i Şerif: 'Müminin ferasetinden (sezgisinden) sakının, çünkü o Allah'ın nuruyla bakar' (İçyüzü hisseder)."
  },
  {
    id: 'a_x_27',
    difficulty: 'expert',
    points: 40,
    question: "İslam ahlakında 'Hamiyet' ne demektir?",
    options: ["Dini ve mukaddes değerleri koruma gayreti/kıskanma", "Sinirlilik", "Korkaklık", "Cimrilik"],
    correctAnswer: "Dini ve mukaddes değerleri koruma gayreti/kıskanma",
    explanation: "Hamiyet-i Diniye; din, vatan, namus gibi değerlere saldırıldığında onları koruma refleksidir."
  },
  {
    id: 'a_x_28',
    difficulty: 'expert',
    points: 40,
    question: "'Fenâfillah' kavramı tasavvufta neyi ifade eder?",
    options: ["Kulun kendi iradesini Allah'ın iradesinde yok etmesi", "Ölmek", "İntihar etmek", "Delirmek"],
    correctAnswer: "Kulun kendi iradesini Allah'ın iradesinde yok etmesi",
    explanation: "Fani olmak; kulun kendi arzu ve isteklerinden sıyrılıp, tamamen Allah'ın emir ve rızasına teslim olmasıdır."
  },
  {
    id: 'a_x_29',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Gerçek yetim, annesi babası olmayan değil; ..... olmayan kimsedir' manasında neyi işaret etmiştir?",
    options: ["İlim ve edebi", "Parası ve pulu", "Evi ve barkı", "Arkadaşı"],
    correctAnswer: "İlim ve edebi",
    explanation: "Hz. Ali'den gelen bir sözde de belirtildiği gibi: 'Gerçek yetim, anasız babasız kalan değil, ilim ve edepten yoksun olandır.'"
  },
  {
    id: 'a_x_30',
    difficulty: 'expert',
    points: 40,
    question: "'Nefs-i Levvame' ne demektir?",
    options: ["Günah işleyince kendini kınayan ve pişman olan nefis", "Kötülüğü emreden nefis", "Huzura ermiş nefis", "İlham alan nefis"],
    correctAnswer: "Günah işleyince kendini kınayan ve pişman olan nefis",
    explanation: "Kıyamet suresinde üzerine yemin edilen Levvame nefis, vicdanın sesiyle kendini sorgulayan nefis mertebesidir."
  },
  {
    id: 'a_x_31',
    difficulty: 'expert',
    points: 40,
    question: "İslam'da 'Tevekkül'ün doğru tanımı nedir?",
    options: ["Sebeplere sarılıp (çalışıp) sonucu Allah'a bırakmak", "Hiç çalışmadan beklemek", "Sadece dua etmek", "Sonucu garanti görmek"],
    correctAnswer: "Sebeplere sarılıp (çalışıp) sonucu Allah'a bırakmak",
    explanation: "Peygamberimizin 'Deveni bağla, sonra tevekkül et' buyurduğu gibi; fiili dua (çalışma) olmadan tevekkül olmaz."
  },
  {
    id: 'a_x_32',
    difficulty: 'expert',
    points: 40,
    question: "'Huşu' ile 'Hudu' arasındaki fark nedir?",
    options: ["Huşu kalpteki saygı/korku, Hudu bedendeki duruştur", "Aynıdır", "Huşu namazda, Hudu oruçtadır", "Hudu kalpte, Huşu bedendedir"],
    correctAnswer: "Huşu kalpteki saygı/korku, Hudu bedendeki duruştur",
    explanation: "Genellikle Huşu kalbin ürpermesi ve saygısı, Hudu ise bu saygının bedene yansıması (sakin duruş) olarak tanımlanır."
  },
  {
    id: 'a_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Allah'ım! Beni miskin olarak yaşat, miskin olarak öldür ve miskinlerle haşret' duasında 'Miskin' ile neyi kastetmiştir?",
    options: ["Tevazu ve mahviyet sahibi olmayı (Gönül fakirliği)", "Dilenci olmayı", "Tembel olmayı", "Muhtaç olmayı"],
    correctAnswer: "Tevazu ve mahviyet sahibi olmayı (Gönül fakirliği)",
    explanation: "Buradaki miskinlik, maddi dilencilik değil; Allah karşısında aczini bilmek, kibirlenmemek ve alçakgönüllü (mahviyet) olmaktır."
  },
  {
    id: 'a_x_34',
    difficulty: 'expert',
    points: 40,
    question: "'Sıddıkiyet' (Sıddık Olmak) makamı kimden sonra gelir?",
    options: ["Peygamberlerden sonra", "Şehitlerden sonra", "Salihlerden sonra", "Alimlerden sonra"],
    correctAnswer: "Peygamberlerden sonra",
    explanation: "Nisa suresi 69. ayetteki sıralamada: 'Nebiler, Sıddıklar, Şehitler ve Salihler' geçer. Hz. Ebubekir bu makamın zirvesidir."
  },
  {
    id: 'a_x_35',
    difficulty: 'expert',
    points: 40,
    question: "İslam'da 'Mürüvvet'in şartlarından biri de 'Malını ..... yerde harcamaktır.'",
    options: ["Hakkı olan (Gereken)", "İstediği", "Gösterişli", "Gizli"],
    correctAnswer: "Hakkı olan (Gereken)",
    explanation: "Mürüvvet sahibi kişi, malını ne israf eder ne de cimrilik yapar; gerektiği yerde cömertçe harcar."
  },
  {
    id: 'a_x_36',
    difficulty: 'expert',
    points: 40,
    question: "'Ucub' (Kendini beğenme) ile 'Riya' (Gösteriş) arasındaki ince fark nedir?",
    options: ["Ucub'da amelini şahsı için beğenir, Riya'da başkası için yapar", "Fark yoktur", "Riya gizlidir, Ucub açıktır", "Ucub sevaptır"],
    correctAnswer: "Ucub'da amelini şahsı için beğenir, Riya'da başkası için yapar",
    explanation: "Ucub; 'Ne güzel kıldım' diye kendi amelini beğenmektir (kendi kendine). Riya; 'Ne güzel kılıyor desinler' diye yapmaktır (başkasına)."
  },
  {
    id: 'a_x_37',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Mümin bir midesiyle yer, kafir ise ..... midesiyle yer' buyurmuştur.",
    options: ["Yedi", "İki", "Üç", "Dört"],
    correctAnswer: "Yedi",
    explanation: "Bu mecazi ifade, müminin yemeğe düşkün olmadığını (kanaatkarlığını), inançsızın ise dünyaya ve yemeğe aşırı hırsını (7 mide) anlatır."
  },
  {
    id: 'a_x_38',
    difficulty: 'expert',
    points: 40,
    question: "İslam ahlakında 'İstiksar' (Çoğaltma yarışı) Tekasür suresinde nasıl anlatılır?",
    options: ["İnsanı oyalayan ve gaflete düşüren bir tutku", "Faydalı bir yarış", "Zenginlik alameti", "İlmi bir hedef"],
    correctAnswer: "İnsanı oyalayan ve gaflete düşüren bir tutku",
    explanation: "Tekasür suresi: 'Çokluk kuruntusu (mal, evlat, makam çoğaltma yarışı) sizi oyaladı, ta ki kabirlere varıncaya kadar.'"
  },
  {
    id: 'a_x_39',
    difficulty: 'expert',
    points: 40,
    question: "'Havf ve Reca' dengesi ne demektir?",
    options: ["Korku ve Ümit arasında olmak", "Sevgi ve Nefret", "Gece ve Gündüz", "Açlık ve Tokluk"],
    correctAnswer: "Korku ve Ümit arasında olmak",
    explanation: "Mümin, ne Allah'ın azabından emin olur ne de rahmetinden ümidini keser; ikisi arasında (beyne'l-havfi ve'r-recâ) yaşar."
  },
  {
    id: 'a_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Allah'ım! Beni göz açıp kapayıncaya kadar bile ..... bırakma' diye dua etmiştir.",
    options: ["Nefsimle baş başa", "Parasız", "Arkadaşsız", "Düşmanla"],
    correctAnswer: "Nefsimle baş başa",
    explanation: "Nefsin hilelerinden Allah'a sığınmanın zirve duasıdır: 'Beni nefsimin eline bir an bile bırakma.'"
  },
    ]
  },
  siyer: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-40) - SİYER-İ NEBİ (10 PUAN)
  // --------------------------------------------------------
  {
    id: 's_e_1',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimiz (s.a.v) hangi şehirde doğmuştur?",
    options: ["Medine", "Mekke", "Taif", "Şam"],
    correctAnswer: "Mekke",
    explanation: "Peygamber Efendimiz 571 yılında Mekke'de dünyaya gelmiştir."
  },
  {
    id: 's_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) babasının adı nedir?",
    options: ["Abdülmuttalib", "Ebu Talib", "Abdullah", "Hamza"],
    correctAnswer: "Abdullah",
    explanation: "Peygamberimizin babası Hz. Abdullah'tır ve Efendimiz doğmadan vefat etmiştir."
  },
  {
    id: 's_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) annesinnin adı nedir?",
    options: ["Hz. Hatice", "Hz. Amine", "Hz. Fatıma", "Hz. Aişe"],
    correctAnswer: "Hz. Amine",
    explanation: "Peygamberimizin annesi Kureyş kabilesinden Hz. Amine'dir."
  },
  {
    id: 's_e_4',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) doğduğunda dedesi ona hangi ismi vermiştir?",
    options: ["Ahmet", "Mustafa", "Muhammed", "Mahmut"],
    correctAnswer: "Muhammed",
    explanation: "Dedesi Abdülmuttalib, 'Yerde ve gökte övülsün' diye ona Muhammed ismini vermiştir."
  },
  {
    id: 's_e_5',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimize (s.a.v) ilk vahiy kaç yaşında gelmiştir?",
    options: ["25", "35", "40", "63"],
    correctAnswer: "40",
    explanation: "Peygamberimiz 610 yılında, 40 yaşındayken Hira mağarasında ilk vahyi almıştır."
  },
  {
    id: 's_e_6',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) süt annesinin adı nedir?",
    options: ["Süveybe", "Halime", "Amine", "Ümmü Eymen"],
    correctAnswer: "Halime",
    explanation: "Peygamberimiz, Sad kabilesinden Halime validemizin yanında 4 yaşına kadar kalmıştır."
  },
  {
    id: 's_e_7',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) annesi vefat edince kimin yanında kalmıştır?",
    options: ["Dedesi Abdülmuttalib", "Amcası Ebu Talib", "Hz. Ebubekir", "Süt annesi"],
    correctAnswer: "Dedesi Abdülmuttalib",
    explanation: "6 yaşında annesini kaybedince, 8 yaşına kadar dedesi Abdülmuttalib'in himayesinde kalmıştır."
  },
  {
    id: 's_e_8',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) dedesi vefat edince hangi amcasının yanında büyümüştür?",
    options: ["Ebu Leheb", "Abbas", "Ebu Talib", "Hamza"],
    correctAnswer: "Ebu Talib",
    explanation: "Dedesi vefat edince onu amcası Ebu Talib yanına almış ve evlenene kadar himaye etmiştir."
  },
  {
    id: 's_e_9',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) ilk eşi kimdir?",
    options: ["Hz. Aişe", "Hz. Hatice", "Hz. Hafsa", "Hz. Sevde"],
    correctAnswer: "Hz. Hatice",
    explanation: "Peygamberimiz 25 yaşındayken ilk evliliğini Hz. Hatice validemizle yapmıştır."
  },
  {
    id: 's_e_10',
    difficulty: 'easy',
    points: 10,
    question: "İlk vahiy hangi mağarada gelmiştir?",
    options: ["Sevr Mağarası", "Hira Mağarası", "Uhud", "Bedir"],
    correctAnswer: "Hira Mağarası",
    explanation: "İlk vahiy Nur Dağı'ndaki Hira mağarasında Cebrail (a.s) aracılığıyla gelmiştir."
  },
  {
    id: 's_e_11',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimize (s.a.v) inen ilk ayet nedir?",
    options: ["Kalk ve uyar", "Yaratan Rabbinin adıyla oku", "Hamd Allah'a mahsustur", "Namaz kıl"],
    correctAnswer: "Yaratan Rabbinin adıyla oku",
    explanation: "Alak suresinin ilk ayeti olan 'İkra' (Oku), inen ilk vahiydir."
  },
  {
    id: 's_e_12',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların Mekke'den Medine'ye göç etmesine ne denir?",
    options: ["Hicret", "Sefer", "İsra", "Fetih"],
    correctAnswer: "Hicret",
    explanation: "622 yılında yapılan bu kutlu yolculuğa Hicret denir ve Hicri takvimin başlangıcıdır."
  },
  {
    id: 's_e_13',
    difficulty: 'easy',
    points: 10,
    question: "Hicret arkadaşı olan sahabi kimdir?",
    options: ["Hz. Ali", "Hz. Ömer", "Hz. Ebubekir", "Hz. Osman"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Peygamberimiz hicret yolculuğuna en yakın dostu Hz. Ebubekir ile çıkmıştır."
  },
  {
    id: 's_e_14',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) hicret ederken müşriklerden saklanmak için hangi mağarada kalmıştır?",
    options: ["Hira Mağarası", "Sevr Mağarası", "Kehf Mağarası", "Kuba"],
    correctAnswer: "Sevr Mağarası",
    explanation: "Hz. Ebubekir ile birlikte 3 gün boyunca Sevr mağarasında saklanmışlardır."
  },
  {
    id: 's_e_15',
    difficulty: 'easy',
    points: 10,
    question: "Mekke'den Medine'ye göç eden Müslümanlara ne denir?",
    options: ["Ensar", "Muhacir", "Sahabi", "Tabiin"],
    correctAnswer: "Muhacir",
    explanation: "Allah rızası için yurtlarını terk edip göç edenlere Muhacir denir."
  },
  {
    id: 's_e_16',
    difficulty: 'easy',
    points: 10,
    question: "Muhacirlere yardım eden Medineli Müslümanlara ne denir?",
    options: ["Ensar", "Muhacir", "Akraba", "Vatandaş"],
    correctAnswer: "Ensar",
    explanation: "Muhacirleri kardeş bilip her şeylerini paylaşan Medinelilere Ensar (Yardımcılar) denir."
  },
  {
    id: 's_e_17',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) soyu hangi kızıyla devam etmiştir?",
    options: ["Hz. Zeynep", "Hz. Rukiye", "Hz. Ümmü Gülsüm", "Hz. Fatıma"],
    correctAnswer: "Hz. Fatıma",
    explanation: "Peygamberimizin soyu, Hz. Ali ile evlenen kızı Hz. Fatıma'nın çocukları (Hasan ve Hüseyin) ile devam etmiştir."
  },
  {
    id: 's_e_18',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların müşriklerle yaptığı ilk büyük savaş hangisidir?",
    options: ["Uhud Savaşı", "Bedir Savaşı", "Hendek Savaşı", "Tebük Seferi"],
    correctAnswer: "Bedir Savaşı",
    explanation: "624 yılında yapılan Bedir savaşı, Müslümanların ilk büyük zaferidir."
  },
  {
    id: 's_e_19',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimiz (s.a.v) kaç yılında vefat etmiştir?",
    options: ["571", "610", "622", "632"],
    correctAnswer: "632",
    explanation: "Peygamberimiz hicretin 11. yılında, Miladi 632'de Medine'de vefat etmiştir."
  },
  {
    id: 's_e_20',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) kabri hangi şehirdedir?",
    options: ["Mekke", "Medine", "Kudüs", "Şam"],
    correctAnswer: "Medine",
    explanation: "Peygamberimizin kabri (Ravza-i Mutahhara), Medine'deki Mescid-i Nebevi'nin içindedir."
  },
  {
    id: 's_e_21',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberliğin geldiği ilk günlerde ona inanan ilk kadın kimdir?",
    options: ["Hz. Aişe", "Hz. Hatice", "Hz. Fatıma", "Hz. Sümeyye"],
    correctAnswer: "Hz. Hatice",
    explanation: "Peygamberimize ilk inanan ve ona destek olan kişi eşi Hz. Hatice'dir."
  },
  {
    id: 's_e_22',
    difficulty: 'easy',
    points: 10,
    question: "Çocuklardan ilk Müslüman olan kimdir?",
    options: ["Hz. Ali", "Hz. Zeyd", "Hz. Hasan", "Hz. Hüseyin"],
    correctAnswer: "Hz. Ali",
    explanation: "Peygamberimizin amcasının oğlu olan Hz. Ali, çocuk yaşta (yaklaşık 10 yaşında) ilk Müslüman olandır."
  },
  {
    id: 's_e_23',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) Medine'ye hicret ettiğinde ilk ne inşa etmiştir?",
    options: ["Ev", "Saray", "Mescid (Cami)", "Kale"],
    correctAnswer: "Mescid (Cami)",
    explanation: "Toplumu bir araya getirmek için ilk iş olarak Mescid-i Nebevi inşa edilmiştir."
  },
  {
    id: 's_e_24',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) lakabı olan 'Muhammedü'l Emin' ne anlama gelir?",
    options: ["Güvenilir Muhammed", "Cömert Muhammed", "Bilgili Muhammed", "Güçlü Muhammed"],
    correctAnswer: "Güvenilir Muhammed",
    explanation: "Müşrikler bile ona yalan söylemediği ve emanete hıyanet etmediği için 'Güvenilir' (Emin) derlerdi."
  },
  {
    id: 's_e_25',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) torunları kimlerdir?",
    options: ["Hasan ve Hüseyin", "Ömer ve Osman", "Ali ve Hamza", "Zeyd ve Bilal"],
    correctAnswer: "Hasan ve Hüseyin",
    explanation: "Hz. Fatıma ve Hz. Ali'nin oğulları olan Hasan ve Hüseyin, Peygamberimizin çok sevdiği torunlarıdır."
  },
  {
    id: 's_e_26',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) amcası olup ona düşmanlık eden kimdir?",
    options: ["Ebu Talib", "Hamza", "Abbas", "Ebu Leheb"],
    correctAnswer: "Ebu Leheb",
    explanation: "Öz amcası olmasına rağmen İslam'ın en büyük düşmanlarından olmuş ve hakkında Tebbet suresi inmiştir."
  },
  {
    id: 's_e_27',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların ilk ezanını kim okumuştur?",
    options: ["Hz. Bilal-i Habeşi", "Hz. Ömer", "Hz. Ebubekir", "Hz. Ali"],
    correctAnswer: "Hz. Bilal-i Habeşi",
    explanation: "Güzel sesiyle bilinen Bilal-i Habeşi, Peygamberimizin emriyle ilk ezanı okumuştur."
  },
  {
    id: 's_e_28',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) vefatından önceki son haccına ne denir?",
    options: ["Umre", "Veda Haccı", "İlk Hac", "Medine Haccı"],
    correctAnswer: "Veda Haccı",
    explanation: "Peygamberimizin 632 yılında yaptığı ve Müslümanlarla vedalaştığı haca Veda Haccı denir."
  },
  {
    id: 's_e_29',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) Veda Haccı'nda okuduğu konuşmaya ne denir?",
    options: ["Cuma Hutbesi", "Bayram Hutbesi", "Veda Hutbesi", "Fetih Hutbesi"],
    correctAnswer: "Veda Hutbesi",
    explanation: "İnsan hakları evrensel beyannamesi niteliğindeki bu tarihi konuşmaya Veda Hutbesi denir."
  },
  {
    id: 's_e_30',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) Medine'de devesinin çöktüğü ve evine misafir olduğu sahabi kimdir?",
    options: ["Hz. Ebubekir", "Eyüp Sultan (Ebu Eyyub el-Ensari)", "Hz. Osman", "Musab bin Umeyr"],
    correctAnswer: "Eyüp Sultan (Ebu Eyyub el-Ensari)",
    explanation: "Peygamberimiz Medine'ye ilk geldiğinde 7 ay boyunca Ebu Eyyub el-Ensari'nin evinde kalmıştır."
  },
  {
    id: 's_e_31',
    difficulty: 'easy',
    points: 10,
    question: "Hangi savaşta Peygamberimizin dişi kırılmış ve yaralanmıştır?",
    options: ["Bedir", "Uhud", "Hendek", "Mute"],
    correctAnswer: "Uhud",
    explanation: "Uhud savaşında müşriklerin attığı taşlarla Peygamberimiz yaralanmış ve dişi kırılmıştır."
  },
  {
    id: 's_e_32',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların kazdığı hendeklerle savunma yaptığı savaş hangisidir?",
    options: ["Bedir", "Uhud", "Hendek", "Hayber"],
    correctAnswer: "Hendek",
    explanation: "Medine'nin etrafına hendekler kazılarak yapılan savunma savaşıdır."
  },
  {
    id: 's_e_33',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) en yakın arkadaşı ve ilk halife kimdir?",
    options: ["Hz. Ömer", "Hz. Osman", "Hz. Ebubekir", "Hz. Ali"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Peygamberimizin 'Mağara arkadaşım' dediği ve vefatından sonra ilk halife seçilen kişi Hz. Ebubekir'dir."
  },
  {
    id: 's_e_34',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) Mekke'yi kaç yılında fethetmiştir?",
    options: ["622", "624", "630", "632"],
    correctAnswer: "630",
    explanation: "Müslümanlar 630 yılında barışçıl bir şekilde Mekke'yi fethetmiş ve Kabe'yi putlardan temizlemiştir."
  },
  {
    id: 's_e_35',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) süt annesi Halime'nin köyünde geçirdiği olay nedir?",
    options: ["Savaş", "Göğsünün yarılması (Şakk-ı Sadr)", "Hicret", "Vahiy gelmesi"],
    correctAnswer: "Göğsünün yarılması (Şakk-ı Sadr)",
    explanation: "Çocukken melekler tarafından göğsünün açılıp kalbinin zemzemle yıkandığı rivayet edilir."
  },
  {
    id: 's_e_36',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) soyu hangi peygambere dayanır?",
    options: ["Hz. Musa", "Hz. İsa", "Hz. İbrahim ve Hz. İsmail", "Hz. Nuh"],
    correctAnswer: "Hz. İbrahim ve Hz. İsmail",
    explanation: "Peygamberimizin soyu, Hz. İbrahim'in oğlu Hz. İsmail'e dayanır."
  },
  {
    id: 's_e_37',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) gençliğinde hangi meslekle uğraşmıştır?",
    options: ["Demircilik", "Ticaret ve Çobanlık", "Marangozluk", "Terzilik"],
    correctAnswer: "Ticaret ve Çobanlık",
    explanation: "Gençliğinde amcasıyla ticarete katılmış ve bir süre koyun gütmüştür."
  },
  {
    id: 's_e_38',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) Hz. Hatice'den olan ve soyunu devam ettiren kızı kimdir?",
    options: ["Zeynep", "Rukiye", "Ümmü Gülsüm", "Fatıma"],
    correctAnswer: "Fatıma",
    explanation: "Peygamberimizin soyu Hz. Fatıma'nın çocukları ile devam etmiştir. Diğer çocukları Peygamberimizden önce veya sonra soy bırakmadan vefat etmiştir."
  },
  {
    id: 's_e_39',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) bir gece Mescid-i Haram'dan Mescid-i Aksa'ya götürülmüştür. Bu olaya ne denir?",
    options: ["Hicret", "İsra", "Miraç", "Vahiy"],
    correctAnswer: "İsra",
    explanation: "Gece yürüyüşü anlamına gelen İsra, Kudüs'e yapılan yolculuktur. Oradan göğe yükselmesi ise Miraç'tır."
  },
  {
    id: 's_e_40',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) insanlara karşı nasıldı?",
    options: ["Sert ve kaba", "Merhametli ve güler yüzlü", "Sinirli", "Kibirli"],
    correctAnswer: "Merhametli ve güler yüzlü",
    explanation: "Peygamberimiz alemlere rahmet olarak gönderilmiş, çok merhametli ve nazik bir insandı."
  },
  // --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - SİYER-İ NEBİ (20 PUAN)
  // --------------------------------------------------------
  {
    id: 's_m_1',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) Hz. Hatice ile evlendiğinde kaç yaşındaydı?",
    options: ["20", "25", "30", "40"],
    correctAnswer: "25",
    explanation: "Peygamberimiz 25, Hz. Hatice ise 40 yaşındayken evlenmişlerdir."
  },
  {
    id: 's_m_2',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberliğin 10. yılına, Hz. Hatice ve Ebu Talib'in vefat ettiği yıla ne ad verilir?",
    options: ["Fil Yılı", "Hüzün Yılı", "Fetih Yılı", "Veda Yılı"],
    correctAnswer: "Hüzün Yılı",
    explanation: "En büyük iki destekçisini kaybettiği bu zor yıla 'Senetü'l Hüzün' (Hüzün Yılı) denmiştir."
  },
  {
    id: 's_m_3',
    difficulty: 'medium',
    points: 20,
    question: "Müslümanların Habeşistan'a hicret etmesinin sebebi neydi?",
    options: ["Ticaret yapmak", "Müşriklerin zulmünden kaçmak", "Tatil yapmak", "Akraba ziyareti"],
    correctAnswer: "Müşriklerin zulmünden kaçmak",
    explanation: "Mekke'de zulüm artınca Peygamberimiz, adil bir kralı olan Habeşistan'a hicret izni vermiştir."
  },
  {
    id: 's_m_4',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) Taif'e gittiğinde taşlanınca sığındığı bağda ona kim üzüm ikram etmiştir?",
    options: ["Addas", "Bahira", "Varaka", "Selman"],
    correctAnswer: "Addas",
    explanation: "Hristiyan köle Addas, Peygamberimize üzüm ikram etmiş ve onunla konuşup Müslüman olmuştur."
  },
  {
    id: 's_m_5',
    difficulty: 'medium',
    points: 20,
    question: "Medineli Müslümanların (Ensar) Peygamberimize Akabe'de biat ederek onu koruyacaklarına söz verdikleri olaya ne denir?",
    options: ["Akabe Biatları", "Rıdvan Biatı", "Hudeybiye", "Veda Hutbesi"],
    correctAnswer: "Akabe Biatları",
    explanation: "Hicretten önce Medinelilerle yapılan Birinci ve İkinci Akabe Biatları İslam'ın dönüm noktasıdır."
  },
  {
    id: 's_m_6',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) Medine'ye hicretinden sonra Müslümanları 'Kardeş' ilan ettiği uygulamaya ne denir?",
    options: ["Muâhât (Kardeşleştirme)", "Suffe", "Biat", "Şura"],
    correctAnswer: "Muâhât (Kardeşleştirme)",
    explanation: "Peygamberimiz her bir Muhaciri bir Ensar ile manevi kardeş (Muâhât) ilan ederek dayanışmayı sağlamıştır."
  },
  {
    id: 's_m_7',
    difficulty: 'medium',
    points: 20,
    question: "Bedir Savaşı'nda Müslümanların sayısı kaçtı?",
    options: ["313", "1000", "3000", "10000"],
    correctAnswer: "313",
    explanation: "Müslümanlar 313 kişi, müşrikler ise yaklaşık 1000 kişiydi. Allah Müslümanlara zafer verdi."
  },
  {
    id: 's_m_8',
    difficulty: 'medium',
    points: 20,
    question: "Uhud Savaşı'nda Peygamberimizin 'Yerinizden ayrılmayın' emrini verdiği okçuların yerleştiği tepenin adı nedir?",
    options: ["Ayneyn Tepesi (Okçular Tepesi)", "Safa Tepesi", "Merve Tepesi", "Nur Dağı"],
    correctAnswer: "Ayneyn Tepesi (Okçular Tepesi)",
    explanation: "Okçuların yerlerini terk etmesi savaşın seyrini değiştirmiş ve Müslümanlar zor durumda kalmıştır."
  },
  {
    id: 's_m_9',
    difficulty: 'medium',
    points: 20,
    question: "Hendek Savaşı'nda 'Şehrin etrafına hendek kazma' fikrini veren sahabi kimdir?",
    options: ["Selman-ı Farisi", "Hz. Ömer", "Halid bin Velid", "Hz. Ali"],
    correctAnswer: "Selman-ı Farisi",
    explanation: "İranlı sahabi Selman-ı Farisi, kendi ülkesindeki savaş taktiğini önermiş ve bu taktik uygulanmıştır."
  },
  {
    id: 's_m_10',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) ile Müşrikler arasında yapılan ve Müslümanların aleyhine gibi görünen ama fethi müjdeleyen antlaşma hangisidir?",
    options: ["Medine Sözleşmesi", "Hudeybiye Barış Antlaşması", "Akabe Biatı", "Hılful Fudul"],
    correctAnswer: "Hudeybiye Barış Antlaşması",
    explanation: "628 yılında yapılan Hudeybiye, zahiren ağır şartlar taşısa da barış ortamı İslam'ın hızla yayılmasını sağlamıştır."
  },
  {
    id: 's_m_11',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) vefatından sonra Hz. Ebu Bekir'in savaştığı sahte peygamber kimdir?",
    options: ["Müseylemetü'l Kezzab", "Ebu Cehil", "Ümeyye bin Halef", "Abdullah bin Übey"],
    correctAnswer: "Müseylemetü'l Kezzab",
    explanation: "Yemame Savaşı'nda Müseylemetü'l Kezzab (Yalancı Müseyleme) öldürülmüştür."
  },
  {
    id: 's_m_12',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) şairi olarak bilinen sahabi kimdir?",
    options: ["Hassan bin Sabit", "Ka'b bin Züheyr", "Zeyd bin Sabit", "Abdullah bin Revaha"],
    correctAnswer: "Hassan bin Sabit",
    explanation: "Hassan bin Sabit, şiirleriyle Peygamberimizi savunmuş ve düşmanları hicvetmiştir."
  },
  {
    id: 's_m_13',
    difficulty: 'medium',
    points: 20,
    question: "Müslümanların Yahudilerle yaptığı ve kalelerini fethettiği savaş hangisidir?",
    options: ["Hayber'in Fethi", "Mute Savaşı", "Tebük Seferi", "Huneyn Savaşı"],
    correctAnswer: "Hayber'in Fethi",
    explanation: "629 yılında Hayber kalesi fethedilerek Şam ticaret yolunun güvenliği sağlanmıştır."
  },
  {
    id: 's_m_14',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) Mescid-i Nebevi'nin yanına kimsesizlerin kalması için ne yaptırmıştır?",
    options: ["Suffe", "Darul Erkam", "Kütüphane", "Hastane"],
    correctAnswer: "Suffe",
    explanation: "Ashab-ı Suffe (Suffe Ehli) burada kalır, Peygamberimizden ilim öğrenirdi."
  },
  {
    id: 's_m_15',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) dadısı ve 'Annemden sonraki annem' dediği hanım kimdir?",
    options: ["Ümmü Eymen", "Halime", "Süveybe", "Fatıma bint Esed"],
    correctAnswer: "Ümmü Eymen",
    explanation: "Habeşli Ümmü Eymen, Peygamberimize çocukluğunda bakmış ve onu hiç yalnız bırakmamıştır."
  },
  {
    id: 's_m_16',
    difficulty: 'medium',
    points: 20,
    question: "Hz. Hamza hangi savaşta şehit olmuştur?",
    options: ["Bedir", "Uhud", "Hendek", "Mute"],
    correctAnswer: "Uhud",
    explanation: "Hz. Hamza, Uhud savaşında Vahşi tarafından şehit edilmiş ve 'Şehitlerin Efendisi' lakabını almıştır."
  },
  {
    id: 's_m_17',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Allah'ın Kılıcı' (Seyfullah) lakabını kime vermiştir?",
    options: ["Hz. Ali", "Halid bin Velid", "Hz. Hamza", "Hz. Ömer"],
    correctAnswer: "Halid bin Velid",
    explanation: "Mute savaşındaki başarısından dolayı Halid bin Velid'e bu unvan verilmiştir."
  },
  {
    id: 's_m_18',
    difficulty: 'medium',
    points: 20,
    question: "İslam tarihinde ilk Cuma namazı nerede kılınmıştır?",
    options: ["Ranuna Vadisi", "Kuba Mescidi", "Mescid-i Nebevi", "Kabe"],
    correctAnswer: "Ranuna Vadisi",
    explanation: "Peygamberimiz hicret sırasında Medine yakınlarındaki Ranuna vadisinde ilk Cuma namazını kıldırmıştır."
  },
  {
    id: 's_m_19',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) eşlerinden hangisi 'Müminlerin Annesi' unvanıyla çok hadis rivayet etmiştir?",
    options: ["Hz. Aişe", "Hz. Ümmü Seleme", "Hz. Zeynep", "Hz. Safiye"],
    correctAnswer: "Hz. Aişe",
    explanation: "Hz. Aişe validemiz, fıkıh ve hadis ilmindeki derinliğiyle en çok fetva veren sahabilerdendir."
  },
  {
    id: 's_m_20',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) gençliğinde hangi erdemliler topluluğuna katılmıştır?",
    options: ["Hılfu'l-Fudûl (Erdemliler İttifakı)", "Darun Nedve", "Kureyş Meclisi", "Eshab-ı Kehf"],
    correctAnswer: "Hılfu'l-Fudûl (Erdemliler İttifakı)",
    explanation: "Zulme uğrayanların hakkını korumak için kurulan bu topluluğa peygamberlikten önce katılmıştır."
  },
  {
    id: 's_m_21',
    difficulty: 'medium',
    points: 20,
    question: "İslam'ın ilk şehitleri kimlerdir?",
    options: ["Yasir ve Sümeyye", "Bilal ve Ammar", "Hamza ve Musab", "Ali ve Zeyd"],
    correctAnswer: "Yasir ve Sümeyye",
    explanation: "Ammar bin Yasir'in annesi Sümeyye ve babası Yasir, Ebu Cehil tarafından şehit edilmişlerdir."
  },
  {
    id: 's_m_22',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) azatlı kölesi ve 'Sevgilisi' (Hibbu Rasulillah) olan sahabi kimdir?",
    options: ["Zeyd bin Harise", "Bilal-i Habeşi", "Selman-ı Farisi", "Süheyb-i Rumi"],
    correctAnswer: "Zeyd bin Harise",
    explanation: "Peygamberimiz Zeyd'i evlatlık edinmiş (sonra kaldırılmıştır) ve onu çok sevmiştir."
  },
  {
    id: 's_m_23',
    difficulty: 'medium',
    points: 20,
    question: "Müslümanların Bizans ordusuyla karşılaştığı ilk savaş hangisidir?",
    options: ["Mute Savaşı", "Tebük Seferi", "Yermük Savaşı", "Bedir Savaşı"],
    correctAnswer: "Mute Savaşı",
    explanation: "629 yılında yapılan Mute Savaşı, Müslümanların Bizans'la ilk ciddi karşılaşmasıdır."
  },
  {
    id: 's_m_24',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) devesinin adı nedir?",
    options: ["Kasva", "Düldül", "Burak", "Kıtmır"],
    correctAnswer: "Kasva",
    explanation: "Hicret yolculuğunda ve birçok seferde bindiği devesinin adı Kasva'dır."
  },
  {
    id: 's_m_25',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) kime 'Cennetteki iki kanatlı şehit' (Cafer-i Tayyar) demiştir?",
    options: ["Cafer bin Ebi Talib", "Musab bin Umeyr", "Abdullah bin Cahş", "Zeyd bin Harise"],
    correctAnswer: "Cafer bin Ebi Talib",
    explanation: "Mute savaşında iki kolunu kaybederek şehit olan Hz. Cafer'e, Allah'ın cennette iki kanat verdiği müjdelenmiştir."
  },
  {
    id: 's_m_26',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) Hz. Fatıma'yı evlendirdiğinde çeyizini kim hazırlamıştır?",
    options: ["Kendisi (Peygamberimiz)", "Hz. Hatice", "Hz. Ali", "Hz. Ebubekir"],
    correctAnswer: "Kendisi (Peygamberimiz)",
    explanation: "Peygamberimiz kızı için sade bir çeyiz (yatak, su kabı, el değirmeni vb.) hazırlamıştır."
  },
  {
    id: 's_m_27',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) Medine'de yaptığı anayasa niteliğindeki belgeye ne denir?",
    options: ["Medine Vesikası (Sözleşmesi)", "Akabe Biatı", "Hüzün Yılı", "Veda Hutbesi"],
    correctAnswer: "Medine Vesikası (Sözleşmesi)",
    explanation: "Müslümanlar, Yahudiler ve Müşrikler arasındaki ilişkileri düzenleyen ilk yazılı anayasadır."
  },
  {
    id: 's_m_28',
    difficulty: 'medium',
    points: 20,
    question: "Mekke'nin Fethi sırasında Peygamberimiz (s.a.v) Kabe'ye girerken ne okuyordu?",
    options: ["Fetih Suresi", "Nasr Suresi", "Hak geldi batıl zail oldu", "Tekbir"],
    correctAnswer: "Hak geldi batıl zail oldu",
    explanation: "Putları devirirken İsra suresi 81. ayeti ('Hak geldi, batıl yok oldu') okuyordu."
  },
  {
    id: 's_m_29',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) Tebük Seferi'ne çıkarken malının tamamını bağışlayan sahabi kimdir?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Hz. Ebubekir malının tamamını getirmiş, 'Çoluk çocuğuna ne bıraktın?' sorusuna 'Allah ve Resulünü' cevabını vermiştir."
  },
  {
    id: 's_m_30',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) İslam'ı tebliğ etmek için civar ülke hükümdarlarına ne göndermiştir?",
    options: ["Davet Mektupları", "Savaş ilanı", "Hediye", "Elçi heyeti"],
    correctAnswer: "Davet Mektupları",
    explanation: "Bizans, İran, Mısır ve Habeşistan hükümdarlarına İslam'a davet mektupları göndermiştir."
  },
  {
    id: 's_m_31',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) 'Reyhanlarım' dediği kişiler kimlerdir?",
    options: ["Hasan ve Hüseyin", "Fatıma ve Zeyneb", "Ali ve Osman", "Ebubekir ve Ömer"],
    correctAnswer: "Hasan ve Hüseyin",
    explanation: "Torunlarını öper koklar ve 'Onlar benim dünyadaki reyhanlarımdır' derdi."
  },
  {
    id: 's_m_32',
    difficulty: 'medium',
    points: 20,
    question: "Uhud Savaşı'nda Peygamberimizi korumak için vücudunu siper eden sahabi kimdir?",
    options: ["Talha bin Ubeydullah", "Hz. Hamza", "Hz. Ömer", "Hz. Osman"],
    correctAnswer: "Talha bin Ubeydullah",
    explanation: "Hz. Talha, Uhud'da Peygamberimize gelen oklara elini ve vücudunu siper etmiş, eli çolak kalmıştır."
  },
  {
    id: 's_m_33',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) son hastalığında namaz kıldırması için kimi vekil tayin etmiştir?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Ali", "Hz. Osman"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Vefatından önceki günlerde cemaate namaz kıldırması için Hz. Ebubekir'i görevlendirmiştir."
  },
  {
    id: 's_m_34',
    difficulty: 'medium',
    points: 20,
    question: "İslam tarihinde inşa edilen ilk mescid (hicret yolunda) hangisidir?",
    options: ["Kuba Mescidi", "Mescid-i Nebevi", "Mescid-i Haram", "Mescid-i Aksa"],
    correctAnswer: "Kuba Mescidi",
    explanation: "Peygamberimiz Medine'ye varmadan önce Kuba köyünde İslam'ın ilk mescidini inşa etmiştir."
  },
  {
    id: 's_m_35',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Mescid-i Dırar'ı (Münafıkların yaptığı mescit) ne yapmıştır?",
    options: ["Yıktırmıştır (Yaktırmıştır)", "İbadete açmıştır", "Tamir ettirmiştir", "Umursamamıştır"],
    correctAnswer: "Yıktırmıştır (Yaktırmıştır)",
    explanation: "Müslümanları bölmek ve tuzak kurmak için yapılan bu mescidi Tevbe suresi inince yıktırmıştır."
  },
  {
    id: 's_m_36',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) vefat ettiği ve kabrinin bulunduğu oda kime aitti?",
    options: ["Hz. Aişe", "Hz. Hafsa", "Hz. Fatıma", "Hz. Ümmü Seleme"],
    correctAnswer: "Hz. Aişe",
    explanation: "Peygamberimiz Hz. Aişe validemizin odasında vefat etmiş ve oraya defnedilmiştir."
  },
  {
    id: 's_m_37',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimizin (s.a.v) müezzini olan ve 'Kıyamet günü boyu en uzun olacaklar' müjdesini alan kimdir?",
    options: ["Bilal-i Habeşi", "Abdullah İbn Ümmü Mektum", "Ebu Mahzure", "Hepsi"],
    correctAnswer: "Hepsi",
    explanation: "Bilal-i Habeşi başta olmak üzere, Peygamberimizin müezzinleri kıyamette özel bir makamda olacaklardır."
  },
  {
    id: 's_m_38',
    difficulty: 'medium',
    points: 20,
    question: "Hz. Hatice'den sonra Peygamberimizin evlendiği ve evi çekip çeviren eşi kimdir?",
    options: ["Hz. Sevde", "Hz. Aişe", "Hz. Hafsa", "Hz. Zeynep"],
    correctAnswer: "Hz. Sevde",
    explanation: "Hz. Hatice'nin vefatından sonra, çocuklara bakmak ve eve yardımcı olmak için yaşlı bir hanım olan Hz. Sevde ile evlenmiştir."
  },
  {
    id: 's_m_39',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) Huneyn savaşından sonra ganimetleri dağıtırken kime daha çok pay vermiştir?",
    options: ["Müellefe-i Kulûb (Kalbi İslam'a ısındırılacaklar)", "Ensar", "Muhacir", "Akrabaları"],
    correctAnswer: "Müellefe-i Kulûb (Kalbi İslam'a ısındırılacaklar)",
    explanation: "Yeni Müslüman olmuş Mekkelilere cömertçe vermiş, Ensar'a ise 'Siz Resulullah ile dönmeye razı değil misiniz?' demiştir."
  },
  {
    id: 's_m_40',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) miraca çıkarken Mescid-i Aksa'da kimlere namaz kıldırmıştır?",
    options: ["Bütün Peygamberlere", "Meleklere", "Sahabelere", "Cinlere"],
    correctAnswer: "Bütün Peygamberlere",
    explanation: "Miraç gecesi Mescid-i Aksa'da bütün peygamberlerin ruhaniyetine imamlık yapmıştır."
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - SİYER-İ NEBİ (30 PUAN)
  // --------------------------------------------------------
  {
    id: 's_h_1',
    difficulty: 'hard',
    points: 30,
    question: "Peygamber Efendimizin (s.a.v) katıldığı askeri seferlere (bizzat komuta ettiği) ne ad verilir?",
    options: ["Seriyye", "Gazve", "Hicret", "Biat"],
    correctAnswer: "Gazve",
    explanation: "Peygamberimizin bizzat ordunun başında bulunduğu savaşlara Gazve, katılmayıp komutan görevlendirdiği seferlere Seriyye denir."
  },
  {
    id: 's_h_2',
    difficulty: 'hard',
    points: 30,
    question: "Peygamber Efendimiz (s.a.v) kaç gazveye katılmıştır?",
    options: ["17", "23", "27", "40"],
    correctAnswer: "27",
    explanation: "Kaynaklarda Peygamberimizin 27 gazveye katıldığı, bunlardan sadece 9 tanesinde fiili çatışma olduğu belirtilir."
  },
  {
    id: 's_h_3',
    difficulty: 'hard',
    points: 30,
    question: "Habeşistan'a hicret eden Müslümanları Necaşi'nin huzurunda savunan ve Cafer-i Tayyar olarak bilinen sahabi kimdir?",
    options: ["Musab bin Umeyr", "Cafer bin Ebi Talib", "Osman bin Maz'un", "Zübeyr bin Avvam"],
    correctAnswer: "Cafer bin Ebi Talib",
    explanation: "Hz. Ali'nin ağabeyi Cafer bin Ebi Talib, Necaşi'nin huzurunda Meryem suresini okuyarak Müslümanları savunmuştur."
  },
  {
    id: 's_h_4',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) 'Havari'm' (Yardımcım) dediği sahabi kimdir?",
    options: ["Zübeyr bin Avvam", "Talha bin Ubeydullah", "Sad bin Ebi Vakkas", "Abdurrahman bin Avf"],
    correctAnswer: "Zübeyr bin Avvam",
    explanation: "Hadis-i Şerif: 'Her peygamberin bir havarisi vardır, benim havarim de Zübeyr'dir.'"
  },
  {
    id: 's_h_5',
    difficulty: 'hard',
    points: 30,
    question: "İlk vahiy geldiğinde Peygamberimizi teselli eden ve 'Keşke kavmin seni yurdundan çıkaracağı zaman genç olsaydım' diyen bilgin kimdir?",
    options: ["Varaka bin Nevfel", "Bahira", "Zeyd bin Amr", "Kuss bin Saide"],
    correctAnswer: "Varaka bin Nevfel",
    explanation: "Hz. Hatice'nin amcasının oğlu olan Varaka, eski kitapları bilen bir Hristiyan alimiydi ve peygamberliği müjdeledi."
  },
  {
    id: 's_h_6',
    difficulty: 'hard',
    points: 30,
    question: "Mekke döneminde Müslümanların gizlice toplandığı ve eğitim gördüğü evin sahibi kimdir?",
    options: ["Ebu Bekir", "Erkam bin Ebi'l Erkam", "Sad bin Ebi Vakkas", "Musab bin Umeyr"],
    correctAnswer: "Erkam bin Ebi'l Erkam",
    explanation: "Safa tepesi eteklerindeki 'Darul Erkam' (Erkam'ın Evi), İslam'ın ilk eğitim merkezi olmuştur."
  },
  {
    id: 's_h_7',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) Taif yolculuğunda yanında olan sahabi kimdir?",
    options: ["Zeyd bin Harise", "Hz. Ebubekir", "Hz. Ali", "Bilal-i Habeşi"],
    correctAnswer: "Zeyd bin Harise",
    explanation: "Taif'te taşlandığında vücudunu Peygamberimize siper eden vefalı dost Zeyd bin Harise'dir."
  },
  {
    id: 's_h_8',
    difficulty: 'hard',
    points: 30,
    question: "Bedir Savaşı'nda müşriklerin lideri olup öldürülen 'Ümmetin Firavunu' lakaplı kişi kimdir?",
    options: ["Ebu Cehil (Amr bin Hişam)", "Ebu Süfyan", "Ümeyye bin Halef", "Utbe bin Rebia"],
    correctAnswer: "Ebu Cehil (Amr bin Hişam)",
    explanation: "İslam düşmanlığında sınır tanımayan Ebu Cehil, Bedir'de öldürülmüştür."
  },
  {
    id: 's_h_9',
    difficulty: 'hard',
    points: 30,
    question: "Medine'ye hicretten önce Peygamberimizin (s.a.v) öğretmen olarak gönderdiği 'Medine Fatihi' lakaplı sahabi kimdir?",
    options: ["Musab bin Umeyr", "Esad bin Zürare", "Zeyd bin Sabit", "Muaz bin Cebel"],
    correctAnswer: "Musab bin Umeyr",
    explanation: "Akabe biatlarından sonra Medine'ye gidip ev ev İslam'ı anlatan genç öğretmen Musab bin Umeyr'dir."
  },
  {
    id: 's_h_10',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) Hz. Hatice'den sonra evlendiği eşi olan Hz. Sevde'den sonraki (üçüncü) eşi kimdir?",
    options: ["Hz. Aişe", "Hz. Hafsa", "Hz. Zeynep", "Hz. Ümmü Seleme"],
    correctAnswer: "Hz. Aişe",
    explanation: "Hicretten sonra Medine'de Hz. Aişe ile evlenmiştir. (Sıralama: Hatice, Sevde, Aişe...)"
  },
  {
    id: 's_h_11',
    difficulty: 'hard',
    points: 30,
    question: "Uhud Savaşı'nda Peygamberimizin şehit olduğu yalanını yayarak orduyu dağıtan olaydan sonra, 'Muhammed ancak bir peygamberdir...' ayeti hangi surede inmiştir?",
    options: ["Ali İmran", "Enfal", "Tevbe", "Fetih"],
    correctAnswer: "Ali İmran",
    explanation: "Ali İmran suresi 144. ayet: 'Muhammed ancak bir peygamberdir. Ondan önce de peygamberler gelip geçmiştir. Şimdi o ölür veya öldürülürse gerisin geriye (eski dininize) mi döneceksiniz?'"
  },
  {
    id: 's_h_12',
    difficulty: 'hard',
    points: 30,
    question: "Hendek Savaşı'nda müşriklerin ittifakını (Ahzab) bozmak için strateji uygulayan ve Müslüman olduğunu gizleyen sahabi kimdir?",
    options: ["Nuaym bin Mesud", "Huzeyfe bin Yeman", "Amr bin As", "Halid bin Velid"],
    correctAnswer: "Nuaym bin Mesud",
    explanation: "Gatafan kabilesinden Nuaym bin Mesud, Yahudilerle Kureyş'in arasını açarak ittifakı bozmuştur."
  },
  {
    id: 's_h_13',
    difficulty: 'hard',
    points: 30,
    question: "Hudeybiye Antlaşması'ndan sonra inen ve 'Sana apaçık bir fetih verdik' ayetiyle başlayan sure hangisidir?",
    options: ["Fetih", "Nasr", "Tevbe", "Muhammed"],
    correctAnswer: "Fetih",
    explanation: "Hudeybiye dönüşünde inen Fetih suresi, bu barışın aslında büyük bir fetih olduğunu müjdelemiştir."
  },
  {
    id: 's_h_14',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) 'Allahım! İslam'ı bu iki Ömer'den (Amr) biriyle aziz kıl' diye dua ettiği iki kişi kimdir?",
    options: ["Ömer bin Hattab ve Ebu Cehil (Amr bin Hişam)", "Ömer bin Hattab ve Amr bin As", "Hz. Hamza ve Hz. Ömer", "Ebu Süfyan ve Ebu Cehil"],
    correctAnswer: "Ömer bin Hattab ve Ebu Cehil (Amr bin Hişam)",
    explanation: "Peygamberimiz, iki güçlü şahsiyetten birinin hidayeti için dua etmiş, dua Hz. Ömer'e nasip olmuştur."
  },
  {
    id: 's_h_15',
    difficulty: 'hard',
    points: 30,
    question: "İfk Hadisesi (Hz. Aişe'ye iftira) hangi sefer dönüşünde meydana gelmiştir?",
    options: ["Beni Mustalik (Müreysi)", "Hayber", "Tebük", "Huneyn"],
    correctAnswer: "Beni Mustalik (Müreysi)",
    explanation: "Hicretin 5. veya 6. yılında yapılan Beni Mustalik gazvesi dönüşünde münafıklar bu iftirayı atmıştır."
  },
  {
    id: 's_h_16',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) vefatından hemen önce hazırlanan ve yola çıkmak üzere olan ordunun genç komutanı kimdi?",
    options: ["Usame bin Zeyd", "Halid bin Velid", "Sad bin Ebi Vakkas", "Hz. Ali"],
    correctAnswer: "Usame bin Zeyd",
    explanation: "18-20 yaşlarındaki Usame bin Zeyd, Peygamberimizin emriyle Bizans sınırına gidecek ordunun komutanıydı."
  },
  {
    id: 's_h_17',
    difficulty: 'hard',
    points: 30,
    question: "Mekke'nin Fethi'nden sonra Kabe'nin anahtarı kime geri verilmiştir (ve kıyamete kadar o ailede kalacaktır)?",
    options: ["Osman bin Talha", "Hz. Ali", "Hz. Abbas", "Hz. Ebubekir"],
    correctAnswer: "Osman bin Talha",
    explanation: "Peygamberimiz 'Emanetleri ehline veriniz' ayeti üzerine anahtarı eski sahibi (henüz yeni Müslüman olan) Osman bin Talha'ya geri vermiştir."
  },
  {
    id: 's_h_18',
    difficulty: 'hard',
    points: 30,
    question: "Huneyn Savaşı'nda Müslümanlar neden ilk başta bozguna uğramıştır?",
    options: ["Sayı çokluğuna güvenip kibirlendikleri için", "Düşmanın az olmasından", "Komutansız kalmaktan", "Gece olduğu için"],
    correctAnswer: "Sayı çokluğuna güvenip kibirlendikleri için",
    explanation: "Tevbe suresinde belirtildiği gibi, 'Çokluğunuz sizi böbürlendirmişti' uyarısı gereği ilk başta zorlanmış, sonra toparlanıp kazanmışlardır."
  },
  {
    id: 's_h_19',
    difficulty: 'hard',
    points: 30,
    question: "Tebük Seferi hangi devlete karşı düzenlenmiştir?",
    options: ["Bizans (Rum)", "Sasani (İran)", "Gassaniler", "Habeşistan"],
    correctAnswer: "Bizans (Rum)",
    explanation: "Bizans'ın büyük bir ordu hazırladığı haberi üzerine yazın en sıcak günlerinde Tebük'e gidilmiş, düşman meydana çıkmamıştır."
  },
  {
    id: 's_h_20',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) 'Mescid-i Dırar'ı yıktırması hangi olaydan sonra olmuştur?",
    options: ["Tebük Seferi dönüşü", "Mekke'nin Fethi", "Uhud Savaşı", "Hicret"],
    correctAnswer: "Tebük Seferi dönüşü",
    explanation: "Münafıkların karargah olarak kullandığı bu mescit, Tebük dönüşü vahiy ile bildirilip yıktırılmıştır."
  },
  {
    id: 's_h_21',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) oğlu İbrahim'in annesi olan eşi kimdir?",
    options: ["Mariya el-Kıbtiyye", "Hz. Hatice", "Hz. Aişe", "Hz. Zeynep"],
    correctAnswer: "Mariya el-Kıbtiyye",
    explanation: "Mısır Mukavkısı'nın hediye olarak gönderdiği Hz. Mariya'dan Peygamberimizin oğlu İbrahim doğmuştur (Küçük yaşta vefat etmiştir)."
  },
  {
    id: 's_h_22',
    difficulty: 'hard',
    points: 30,
    question: "Peygamber Efendimizin (s.a.v) nübüvvet mührü vücudunun neresindeydi?",
    options: ["İki kürek kemiği arasında (Sırtında)", "Sağ omzunda", "Alnında", "Göğsünde"],
    correctAnswer: "İki kürek kemiği arasında (Sırtında)",
    explanation: "Peygamberlik alameti olan Nübüvvet Mührü, sırtında iki kürek kemiği arasındaydı."
  },
  {
    id: 's_h_23',
    difficulty: 'hard',
    points: 30,
    question: "Medine'de Müslümanlara ihanet edip Hendek Savaşı'nda müşriklerle işbirliği yapan Yahudi kabilesi hangisidir?",
    options: ["Beni Kureyza", "Beni Nadir", "Beni Kaynuka", "Hayber Yahudileri"],
    correctAnswer: "Beni Kureyza",
    explanation: "Beni Kureyza, en zor zamanda anlaşmayı bozup Müslümanları arkadan vurmaya kalkışmış ve savaş sonrasında cezalandırılmıştır."
  },
  {
    id: 's_h_24',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) 'Cennetle müjdelenen on sahabi' (Aşere-i Mübeşşere) arasında kim yoktur?",
    options: ["Hz. Hamza", "Said bin Zeyd", "Talha bin Ubeydullah", "Ebu Ubeyde bin Cerrah"],
    correctAnswer: "Hz. Hamza",
    explanation: "Hz. Hamza, şehitlerin efendisi ve cennetlik olmasına rağmen, tek bir hadiste ismi sayılan 'Aşere-i Mübeşşere' listesinde yer almaz (Daha önce şehit olmuştur)."
  },
  {
    id: 's_h_25',
    difficulty: 'hard',
    points: 30,
    question: "Hicretin 9. yılına, Arap kabilelerinin bölük bölük gelip Müslüman olmasından dolayı ne ad verilmiştir?",
    options: ["Senetü'l Vüfûd (Elçiler Yılı)", "Hüzün Yılı", "Fetih Yılı", "Fil Yılı"],
    correctAnswer: "Senetü'l Vüfûd (Elçiler Yılı)",
    explanation: "Mekke'nin fethinden sonra Arap yarımadasındaki kabileler Medine'ye heyetler göndererek İslam'a girmiştir."
  },
  {
    id: 's_h_26',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) süt kardeşi olan ve Taif kuşatmasında esir düşünce Peygamberimizin hırkasını serip oturttuğu hanım kimdir?",
    options: ["Şeyma", "Halime", "Amine", "Ümmü Gülsüm"],
    correctAnswer: "Şeyma",
    explanation: "Süt annesi Halime'nin kızı Şeyma, yıllar sonra esirler arasında tanınmış ve Peygamberimiz ona büyük ikramda bulunmuştur."
  },
  {
    id: 's_h_27',
    difficulty: 'hard',
    points: 30,
    question: "Uhud Savaşı'nda Peygamberimizi öldürdüğünü sanarak 'Muhammed'i öldürdüm' diye bağıran müşrik kimdir?",
    options: ["İbn-i Kamia", "Vahşi", "Ebu Süfyan", "Halid bin Velid"],
    correctAnswer: "İbn-i Kamia",
    explanation: "Müşrik İbn-i Kamia, Musab bin Umeyr'i şehit edince Peygamberimiz sandı ve bu yalanı yaydı."
  },
  {
    id: 's_h_28',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) Hz. Zeyd'den boşanan eşiyle evliliğinin (evlatlık geleneğini kaldırmak için) emredildiği sahabi annemiz kimdir?",
    options: ["Hz. Zeynep binti Cahş", "Hz. Cüveyriye", "Hz. Meymune", "Hz. Safiye"],
    correctAnswer: "Hz. Zeynep binti Cahş",
    explanation: "Ahzab suresinde belirtildiği üzere, evlatlıkların öz çocuk gibi olmadığı hükmü bu evlilikle (Hz. Zeyd'in boşadığı eşiyle) pratik olarak gösterilmiştir."
  },
  {
    id: 's_h_29',
    difficulty: 'hard',
    points: 30,
    question: "Müslümanların ilk 'Deniz Savaşı'nı (veya seferini) hangi halife döneminde kim yapmıştır? (Siyer sonrası dönem ama temeli sahabedir)",
    options: ["Hz. Osman döneminde Muaviye", "Hz. Ömer döneminde Sad", "Hz. Ebubekir döneminde Halid", "Hz. Ali döneminde Ammar"],
    correctAnswer: "Hz. Osman döneminde Muaviye",
    explanation: "İlk deniz seferi Kıbrıs üzerine, Hz. Osman döneminde Şam valisi Muaviye tarafından yapılmıştır (Peygamberimiz Ümmü Haram'a müjdelemişti)."
  },
  {
    id: 's_h_30',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) vefat ettiği hastalığı sırasında imamlığı kime bırakmıştır?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Peygamberimiz hastalığının ağırlaştığı son günlerde 'Ebubekir'e söyleyin namazı kıldırsın' buyurmuştur."
  },
  {
    id: 's_h_31',
    difficulty: 'hard',
    points: 30,
    question: "Hz. Hamza'yı ve Musab bin Umeyr'i şehit edenler sırasıyla kimlerdir?",
    options: ["Vahşi ve İbn-i Kamia", "Ebu Cehil ve Ümeyye", "Vahşi ve Ebu Süfyan", "Halid ve İkrime"],
    correctAnswer: "Vahşi ve İbn-i Kamia",
    explanation: "Hz. Hamza'yı Vahşi mızrakla, Musab bin Umeyr'i İbn-i Kamia kılıçla şehit etmiştir."
  },
  {
    id: 's_h_32',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Her peygamberin bir sırdaşı vardır, benim sırdaşım da .....' buyurmuştur. Bu sahabi kimdir?",
    options: ["Huzeyfe bin Yeman", "Ebu Zer", "Selman-ı Farisi", "Ammar bin Yasir"],
    correctAnswer: "Huzeyfe bin Yeman",
    explanation: "Peygamberimiz münafıkların listesini sadece Huzeyfe bin Yeman'a vermiş, bu yüzden ona 'Sır Sahibi' denmiştir."
  },
  {
    id: 's_h_33',
    difficulty: 'hard',
    points: 30,
    question: "Müslümanların Habeşistan'a ikinci hicretinde başkanlık eden sahabi kimdir?",
    options: ["Cafer bin Ebi Talib", "Osman bin Maz'un", "Musab bin Umeyr", "Hz. Osman"],
    correctAnswer: "Cafer bin Ebi Talib",
    explanation: "İkinci ve daha kalabalık olan kafilenin başında Peygamberimizin amcasının oğlu Cafer (r.a) vardı."
  },
  {
    id: 's_h_34',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimiz (s.a.v) 'Ebu Leheb'in iki eli kurusun' ayeti inince Ebu Leheb'in karısı Ümmü Cemil ne yapmıştır?",
    options: ["Peygamberimize taşla saldırmaya gelmiş ama onu görememiştir", "İman etmiştir", "Şehri terk etmiştir", "Özür dilemiştir"],
    correctAnswer: "Peygamberimize taşla saldırmaya gelmiş ama onu görememiştir",
    explanation: "Eline taş alıp Kabe'ye gelmiş, Hz. Ebubekir'i görmüş ama yanındaki Peygamberimizi Allah ona göstermemiştir."
  },
  {
    id: 's_h_35',
    difficulty: 'hard',
    points: 30,
    question: "Bedir Savaşı'nda esir alınan Peygamberimizin amcası (fidye verip kurtulan sonra Müslüman olan) kimdir?",
    options: ["Hz. Abbas", "Ebu Talib", "Hamza", "Ebu Leheb"],
    correctAnswer: "Hz. Abbas",
    explanation: "Hz. Abbas Bedir'de zorla müşriklerin yanında savaşa çıkarılmış, esir düşmüş, fidye ödeyerek kurtulmuştur."
  },
  {
    id: 's_h_36',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) Medine'de Yahudilerle imzaladığı Medine Vesikası'nı ilk bozan kabile hangisidir?",
    options: ["Beni Kaynuka", "Beni Nadir", "Beni Kureyza", "Hayberliler"],
    correctAnswer: "Beni Kaynuka",
    explanation: "Bedir savaşından sonra Müslüman bir kadına yapılan saldırı ve kuyumcu olayı üzerine Beni Kaynuka anlaşmayı bozmuştur."
  },
  {
    id: 's_h_37',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) 'Eminu'l Ümme' (Bu ümmetin emini/güveniliri) lakabını verdiği sahabi kimdir?",
    options: ["Ebu Ubeyde bin Cerrah", "Hz. Ebubekir", "Hz. Ali", "Abdurrahman bin Avf"],
    correctAnswer: "Ebu Ubeyde bin Cerrah",
    explanation: "Necranlılar güvenilir birini isteyince Peygamberimiz 'Size bu ümmetin emini Ebu Ubeyde'yi göndereceğim' demiştir."
  },
  {
    id: 's_h_38',
    difficulty: 'hard',
    points: 30,
    question: "Hicret sırasında Peygamberimizin izini süren müşrikleri şaşırtmak için Sevr mağarasının çevresinde koyun güden sahabi kimdir?",
    options: ["Amir bin Füheyre", "Abdullah bin Ebu Bekir", "Esma binti Ebu Bekir", "Süraka"],
    correctAnswer: "Amir bin Füheyre",
    explanation: "Hz. Ebubekir'in çobanı Amir bin Füheyre, koyunlarıyla ayak izlerini silerdi."
  },
  {
    id: 's_h_39',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) 'Beni Hûd suresi ve kardeşleri (Vakıa, Mürselat vb.) ihtiyarlattı' sözünü ne zaman söylemiştir?",
    options: ["Saçlarında beyazlar görülünce", "Vefat ederken", "Hicret ederken", "Uhud savaşında"],
    correctAnswer: "Saçlarında beyazlar görülünce",
    explanation: "Hz. Ebubekir'in 'Ya Resulallah, saçların ağardı' demesi üzerine bu cevabı vermiştir."
  },
  {
    id: 's_h_40',
    difficulty: 'hard',
    points: 30,
    question: "Müslümanların 'İlk okçusu' olarak bilinen ve Peygamberimizin 'Anam babam sana feda olsun at!' dediği sahabi kimdir?",
    options: ["Sad bin Ebi Vakkas", "Zübeyr bin Avvam", "Hz. Hamza", "Talha bin Ubeydullah"],
    correctAnswer: "Sad bin Ebi Vakkas",
    explanation: "Sad bin Ebi Vakkas, Uhud savaşında büyük kahramanlık göstermiş ve Peygamberimizin bu duasına mazhar olmuştur."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - SİYER-İ NEBİ (40 PUAN)
  // --------------------------------------------------------
  {
    id: 's_x_1',
    difficulty: 'expert',
    points: 40,
    question: "Peygamber Efendimizin (s.a.v) soyu 21. kuşaktan dedesi olan hangi şahısta Hz. İbrahim'in soyu ile birleşir?",
    options: ["Adnan", "Kahtan", "Fihr", "Kusay"],
    correctAnswer: "Adnan",
    explanation: "Peygamberimizin soy ağacı, 21. kuşak dedesi olan Adnan'a kadar kesin olarak bilinir ve Adnan, Hz. İsmail'in torunlarındandır."
  },
  {
    id: 's_x_2',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) süt annesi Halime'den önce, onu kısa bir süre (3-7 gün) emziren amcası Ebu Leheb'in cariyesi kimdir?",
    options: ["Süveybe", "Ümmü Eymen", "Bereke", "Fatıma bint Esed"],
    correctAnswer: "Süveybe",
    explanation: "Peygamberimizi annesinden sonra ilk emziren, Ebu Leheb'in azatlı cariyesi Süveybe Hanım'dır."
  },
  {
    id: 's_x_3',
    difficulty: 'expert',
    points: 40,
    question: "Habeşistan'a yapılan ikinci hicrette Müslüman kafilesinin başkanı kimdi?",
    options: ["Cafer bin Ebi Talib", "Osman bin Maz'un", "Musab bin Umeyr", "Zübeyr bin Avvam"],
    correctAnswer: "Cafer bin Ebi Talib",
    explanation: "100'e yakın Müslümanın katıldığı ikinci hicrette kafile başkanı Hz. Ali'nin ağabeyi Cafer-i Tayyar'dı."
  },
  {
    id: 's_x_4',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) Taif dönüşü Mekke'ye girerken hangi müşrikin himayesi (emanı) altına girmiştir?",
    options: ["Mut'im bin Adiy", "Ebu Süfyan", "Velid bin Muğire", "Utbe bin Rebia"],
    correctAnswer: "Mut'im bin Adiy",
    explanation: "Mekke'ye girişi engellenince, o sırada henüz müşrik olan ama kabile hamiyeti taşıyan Mut'im bin Adiy onu himayesine almıştır."
  },
  {
    id: 's_x_5',
    difficulty: 'expert',
    points: 40,
    question: "İkinci Akabe Biatı'nda Peygamberimizin yanında bulunan ve henüz Müslüman olmamasına rağmen ona destek veren amcası kimdir?",
    options: ["Hz. Abbas", "Ebu Talib", "Hz. Hamza", "Ebu Leheb"],
    correctAnswer: "Hz. Abbas",
    explanation: "Henüz Müslüman olmamasına rağmen yeğenini korumak için Medinelilerle yapılan görüşmeye katılan amcası Abbas'tır."
  },
  {
    id: 's_x_6',
    difficulty: 'expert',
    points: 40,
    question: "Hicret sırasında Peygamberimiz ve Hz. Ebubekir'e ücret karşılığı yol rehberliği (kılavuzluk) yapan müşrik kimdir?",
    options: ["Abdullah bin Uraykıt", "Süraka bin Malik", "Amir bin Füheyre", "Abdullah bin Ebi Bekir"],
    correctAnswer: "Abdullah bin Uraykıt",
    explanation: "Güvenilir bir yol kılavuzu olan Abdullah bin Uraykıt, onları bilinen yolların dışından Medine'ye götürmüştür."
  },
  {
    id: 's_x_7',
    difficulty: 'expert',
    points: 40,
    question: "Mescid-i Nebevi'nin inşa edildiği arsa (Sehl ve Süheyl adlı yetimlerin arsası) kime aitti (kimin himayesindeydi)?",
    options: ["Es'ad bin Zürare", "Muaz bin Cebel", "Sad bin Ubade", "Ebu Eyyub el-Ensari"],
    correctAnswer: "Es'ad bin Zürare",
    explanation: "Arsa Neccaroğullarından Es'ad bin Zürare'nin himayesindeki iki yetime aitti ve Peygamberimiz bedelini ödeyerek satın aldı."
  },
  {
    id: 's_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Bedir Savaşı'nda Müslümanların sancaktarı (Genel Sancak - Liva) kimdi?",
    options: ["Musab bin Umeyr", "Hz. Ali", "Hz. Hamza", "Sad bin Muaz"],
    correctAnswer: "Musab bin Umeyr",
    explanation: "Bedir ve Uhud savaşlarında İslam ordusunun büyük sancağını Musab bin Umeyr taşımıştır."
  },
  {
    id: 's_x_9',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) Uhud Savaşı'nda giydiği ve darbelerden dolayı yüzüne batan miğferin halkalarını dişleriyle çıkarırken ön dişleri kırılan sahabi kimdir?",
    options: ["Ebu Ubeyde bin Cerrah", "Talha bin Ubeydullah", "Sad bin Ebi Vakkas", "Hz. Ebubekir"],
    correctAnswer: "Ebu Ubeyde bin Cerrah",
    explanation: "Ebu Ubeyde, Peygamberimizin yanağına batan miğfer parçasını dişleriyle çekip çıkarırken kendi dişlerini feda etmiştir."
  },
  {
    id: 's_x_10',
    difficulty: 'expert',
    points: 40,
    question: "Hendek Savaşı'nda müşriklerin reisi Ebu Süfyan'dı. Peki, onlara destek veren Yahudi kabilelerinin (Ahzab) genel kışkırtıcısı kimdi?",
    options: ["Huyey bin Ahtab", "Ka'b bin Eşref", "Selam bin Mişkem", "Abdullah bin Selam"],
    correctAnswer: "Huyey bin Ahtab",
    explanation: "Beni Nadir reisi Huyey bin Ahtab, Mekke'ye giderek müşrikleri kışkırtmış ve Hendek savaşını organize etmiştir."
  },
  {
    id: 's_x_11',
    difficulty: 'expert',
    points: 40,
    question: "Hudeybiye Antlaşması'nı müşrikler adına imzalayan ve sonra Müslüman olan sahabi kimdir?",
    options: ["Süheyl bin Amr", "Ebu Süfyan", "İkrime bin Ebu Cehil", "Halid bin Velid"],
    correctAnswer: "Süheyl bin Amr",
    explanation: "Antlaşma metnindeki 'Bismillahirrahmanirrahim' ve 'Resulullah' ifadelerine itiraz eden Kureyş temsilcisi Süheyl bin Amr'dır."
  },
  {
    id: 's_x_12',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) Bizans İmparatoru Herakleios'a gönderdiği elçi kimdir?",
    options: ["Dıhye-i Kelbi", "Abdullah bin Huzafe", "Hatıb bin Ebi Beltea", "Amr bin Ümeyye"],
    correctAnswer: "Dıhye-i Kelbi",
    explanation: "Cebrail'in (a.s) bazen suretine girdiği, çok yakışıklı bir sahabi olan Dıhye, Bizans'a elçi gitmiştir."
  },
  {
    id: 's_x_13',
    difficulty: 'expert',
    points: 40,
    question: "Hayber'in fethinde, Hz. Ali'nin (r.a) fethetmekte zorlanılan en büyük kaleyi (Kamûs Kalesi) alırken öldürdüğü ünlü Yahudi savaşçı kimdir?",
    options: ["Merhab", "Haris", "Yasir", "Ka'b"],
    correctAnswer: "Merhab",
    explanation: "Hayber'in en güçlü savaşçısı Merhab, Hz. Ali ile girdiği teke tek mücadelede Zülfikar ile öldürülmüştür."
  },
  {
    id: 's_x_14',
    difficulty: 'expert',
    points: 40,
    question: "Mute Savaşı'nda Peygamberimizin tayin ettiği üç komutan sırasıyla şehit olmuştur. Bu sıralama nasıldır?",
    options: ["Zeyd b. Harise - Cafer b. Ebi Talib - Abdullah b. Revaha", "Cafer - Zeyd - Abdullah", "Abdullah - Zeyd - Cafer", "Zeyd - Abdullah - Cafer"],
    correctAnswer: "Zeyd b. Harise - Cafer b. Ebi Talib - Abdullah b. Revaha",
    explanation: "Peygamberimiz sancağı önce Zeyd'e, o şehit olursa Cafer'e, o da şehit olursa Abdullah'a vermelerini emretmiştir."
  },
  {
    id: 's_x_15',
    difficulty: 'expert',
    points: 40,
    question: "Mekke'nin Fethi'nden sonra Peygamberimizin (s.a.v) Kabe'nin içindeki putları temizlerken okuduğu ayet hangisidir?",
    options: ["İsra 81 (Hak geldi batıl zail oldu)", "Enbiya 18", "Sebe 49", "Tevbe 14"],
    correctAnswer: "İsra 81 (Hak geldi batıl zail oldu)",
    explanation: "Asasıyla putlara dokunup devirirken: 'De ki: Hak geldi, batıl yok oldu. Şüphesiz batıl yok olmaya mahkumdur' ayetini okuyordu."
  },
  {
    id: 's_x_16',
    difficulty: 'expert',
    points: 40,
    question: "Tebük Seferi'ne mazeretsiz katılmayan ve haklarında tövbeleri kabul edilene kadar 50 gün boykot uygulanan üç sahabi kimdir?",
    options: ["Ka'b bin Malik, Mürare bin Rabi, Hilal bin Ümeyye", "Ebu Zer, Ebu Derda, Selman", "Hassan, Zeyd, Abdullah", "Sad, Said, Talha"],
    correctAnswer: "Ka'b bin Malik, Mürare bin Rabi, Hilal bin Ümeyye",
    explanation: "Bu üç samimi sahabi, münafıklar gibi yalan söylemeyip suçlarını itiraf etmiş ve çetin bir imtihandan sonra Tevbe suresiyle affedilmişlerdir."
  },
  {
    id: 's_x_17',
    difficulty: 'expert',
    points: 40,
    question: "Veda Haccı'nda Peygamberimizin (s.a.v) Arafat'ta devesinin üzerinde irad ettiği hutbeyi, sesi gür olduğu için insanlara tekrar ederek duyuran (Mübelliğ) sahabi kimdir?",
    options: ["Rabia bin Ümeyye", "Hz. Ali", "Hz. Abbas", "Bilal-i Habeşi"],
    correctAnswer: "Rabia bin Ümeyye",
    explanation: "Gür sesli Rabia bin Ümeyye, Resulullah'ın sözlerini cümle cümle tekrarlayarak on binlerce kişilik kalabalığa duyurmuştur."
  },
  {
    id: 's_x_18',
    difficulty: 'expert',
    points: 40,
    question: "Peygamber Efendimizin (s.a.v) vefatı üzerine, cenazesini yıkayanlar arasında Hz. Ali ile birlikte kimler vardı?",
    options: ["Hz. Abbas ve oğulları (Fadl, Kusem)", "Hz. Ebubekir ve Ömer", "Hz. Osman ve Zübeyr", "Ensar'ın ileri gelenleri"],
    correctAnswer: "Hz. Abbas ve oğulları (Fadl, Kusem)",
    explanation: "Cenaze yıkama işleminde Hz. Ali, amcası Hz. Abbas, Abbas'ın oğulları Fadl ve Kusem, Üsame bin Zeyd ve Şukran (azatlısı) bulunmuştur."
  },
  {
    id: 's_x_19',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) katıldığı 'Gazve' sayısı 27'dir. Bunlardan kaç tanesinde fiili çarpışma (savaş) olmuştur?",
    options: ["9", "12", "15", "27"],
    correctAnswer: "9",
    explanation: "Bedir, Uhud, Hendek, Beni Kureyza, Beni Mustalik, Hayber, Mekke Fethi (kısmi), Huneyn ve Taif olmak üzere 9 gazvede fiili çatışma yaşanmıştır."
  },
  {
    id: 's_x_20',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) en çok sevdiği eşyalarından olan kılıcının adı nedir?",
    options: ["Zülfikar", "Mersed", "Seyfullah", "Battal"],
    correctAnswer: "Zülfikar",
    explanation: "Bedir savaşında ganimet olarak alınan ve sonra Hz. Ali'ye hediye ettiği meşhur kılıcı Zülfikar'dır."
  },
  {
    id: 's_x_21',
    difficulty: 'expert',
    points: 40,
    question: "Peygamber Efendimizin (s.a.v) Medine'ye hicretinden sonra nüfus sayımı yapılmıştır. İlk nüfus sayımında Müslümanların sayısı yaklaşık kaçtı?",
    options: ["1.500", "500", "3.000", "10.000"],
    correctAnswer: "1.500",
    explanation: "Hicretin 1. yılında yapılan sayımda, savaşa katılabilecek erkekler dahil toplam Müslüman sayısı 1.500 civarındaydı."
  },
  {
    id: 's_x_22',
    difficulty: 'expert',
    points: 40,
    question: "Mescid-i Nebevi'de Peygamberimizin hutbe okuduğu 'Hurma Kütüğü'nün, minber yapılınca Peygamberimizden ayrıldığı için inlemesi olayına ne denir?",
    options: ["Hannâne (Üstüvâne-i Hannâne)", "İnşikak-ı Kamer", "İsra", "Mübahale"],
    correctAnswer: "Hannâne (Üstüvâne-i Hannâne)",
    explanation: "Ağlayan kütük mucizesi 'Hannâne' (İnleyen/Ağlayan) direği olarak bilinir ve mütevatir derecesinde bir haberdir."
  },
  {
    id: 's_x_23',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) eşlerinden Hz. Safiye'nin asıl (Yahudi) kabilesi hangisidir?",
    options: ["Beni Nadir (Babası Huyey bin Ahtab)", "Beni Kureyza", "Beni Kaynuka", "Hayberliler"],
    correctAnswer: "Beni Nadir (Babası Huyey bin Ahtab)",
    explanation: "Hz. Safiye, Beni Nadir reisi Huyey bin Ahtab'ın kızıdır. Hayber fethinde esir düşmüş, İslam'ı seçip Ümmü'l Müminin olmuştur."
  },
  {
    id: 's_x_24',
    difficulty: 'expert',
    points: 40,
    question: "Hudeybiye'de 'Rıdvan Biatı' (Ölüm Biatı) hangi sahabinin şehit edildiği haberi üzerine yapılmıştır?",
    options: ["Hz. Osman", "Hz. Ömer", "Hıraş bin Ümeyye", "Hz. Ali"],
    correctAnswer: "Hz. Osman",
    explanation: "Mekke'ye elçi giden Hz. Osman'ın şehit edildiği şayiası üzerine, Peygamberimiz sahabeden 'ölümüne savaşmak' üzere biat almıştır."
  },
  {
    id: 's_x_25',
    difficulty: 'expert',
    points: 40,
    question: "Peygamber Efendimizin (s.a.v) şairi Hassan bin Sabit'e, Cebrail'in (a.s) destek olduğunu bildiren hadis hangi bağlamda söylenmiştir?",
    options: ["Müşrikleri hicvettiği (şiirle eleştirdiği) zaman", "Kuran okurken", "Savaşta kılıç sallarken", "Ezan okurken"],
    correctAnswer: "Müşrikleri hicvettiği (şiirle eleştirdiği) zaman",
    explanation: "Peygamberimiz: 'Onları hicvet! Cebrail seninle beraberdir' buyurarak şiirle yapılan psikolojik savaşı desteklemiştir."
  },
  {
    id: 's_x_26',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) emriyle 'yalancı peygamber' Esved el-Ansi'yi Yemen'de öldüren sahabi (veya tabi) kimdir?",
    options: ["Feyruz ed-Deylemi", "Vahşi", "Halid bin Velid", "İkrime"],
    correctAnswer: "Feyruz ed-Deylemi",
    explanation: "Peygamberimiz vefat etmeden bir gün önce, Esved'in Feyruz tarafından öldürüldüğü haberi vahiy ile gelmiştir."
  },
  {
    id: 's_x_27',
    difficulty: 'expert',
    points: 40,
    question: "Hicretin 8. yılında yapılan ve İslam ordusunun ilk kez 3000 kişi gibi kalabalık bir orduyla (ancak 100.000 kişilik Bizans ordusuna karşı) savaştığı Mute Savaşı'nın sonucu nedir?",
    options: ["Halid bin Velid orduyu taktikle geri çekip kurtarmıştır", "Müslümanlar kesin zafer kazanmıştır", "Müslümanlar tamamen yok olmuştur", "Mekke fethedilmiştir"],
    correctAnswer: "Halid bin Velid orduyu taktikle geri çekip kurtarmıştır",
    explanation: "Üç komutan şehit olunca sancağı alan Halid bin Velid, dahi bir taktikle (Sifne) orduyu imhadan kurtarıp Medine'ye getirmiştir."
  },
  {
    id: 's_x_28',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) 'Beni Kureyza' Yahudilerinin cezalandırılması için hakem tayin ettiği (ve hükmüne Allah'ın da razı olduğu) sahabi kimdir?",
    options: ["Sad bin Muaz", "Sad bin Ebi Vakkas", "Hz. Ömer", "Abdullah bin Revaha"],
    correctAnswer: "Sad bin Muaz",
    explanation: "Hendek'te yaralanan Sad bin Muaz, Tevrat'ın hükmüne göre (savaş suçlularının öldürülmesi) hüküm vermiş ve Peygamberimiz bunu onaylamıştır."
  },
  {
    id: 's_x_29',
    difficulty: 'expert',
    points: 40,
    question: "İfk Hadisesi'nde Hz. Aişe'nin suçsuzluğunu bildiren ayetler (Nur Suresi 11-21) indiğinde, Hz. Ebubekir kime yaptığı maddi yardımı kesmeye yemin etmişti?",
    options: ["Mistah bin Üsâse", "Hassan bin Sabit", "Abdullah bin Übey", "Hamne binti Cahş"],
    correctAnswer: "Mistah bin Üsâse",
    explanation: "Hz. Ebubekir'in akrabası ve yardıma muhtaç olan Mistah, iftiraya karıştığı için yardımı kesmiş, fakat inen ayetle (Nur 22) affetmesi istenmiştir."
  },
  {
    id: 's_x_30',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimiz (s.a.v) 'Mescid-i Haram'da namaz yüz bin namaza denktir' buyurmuştur. Peki, Mescid-i Nebevi'deki namaz kaça denktir?",
    options: ["Bin (1.000)", "Beş yüz (500)", "On bin (10.000)", "Elli bin (50.000)"],
    correctAnswer: "Bin (1.000)",
    explanation: "Hadis: 'Benim şu mescidimde kılınan bir namaz, Mescid-i Haram hariç diğer mescitlerde kılınan bin namazdan hayırlıdır.'"
  },
  {
    id: 's_x_31',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) vefatından sonra 'Resulullah'ın mirası' (Fedek Arazisi) konusunu Hz. Fatıma'ya hadisle açıklayan kimdir?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Ali", "Hz. Abbas"],
    correctAnswer: "Hz. Ebubekir",
    explanation: "Hz. Ebubekir, 'Biz peygamberler miras bırakmayız, bıraktığımız sadakadır' hadisini naklederek arazinin devlet malı olduğunu belirtmiştir."
  },
  {
    id: 's_x_32',
    difficulty: 'expert',
    points: 40,
    question: "İslam tarihinde 'Seriyye' (Peygamberimizin katılmadığı birlik) sayısı yaklaşık kaçtır?",
    options: ["50-60 arası", "10-20 arası", "100 üzeri", "Tam 40"],
    correctAnswer: "50-60 arası",
    explanation: "Vakıdi ve İbn Sa'd gibi siyer kaynakları, 27 gazveye ek olarak 50 ile 60 arasında seriyye gönderildiğini belirtir."
  },
  {
    id: 's_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) Medine'de yaptırdığı ve bizzat çalıştığı Mescid-i Nebevi'nin ilk inşasında kıblesi nereye doğruydu?",
    options: ["Mescid-i Aksa (Kudüs)", "Kabe (Mekke)", "Şam", "Yemen"],
    correctAnswer: "Mescid-i Aksa (Kudüs)",
    explanation: "Hicretten sonra yaklaşık 16-17 ay boyunca namazlar Kudüs'e (Mescid-i Aksa) doğru kılınmış, sonra Kabe'ye çevrilmiştir."
  },
  {
    id: 's_x_34',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) 'Benden sonra peygamber gelseydi ..... olurdu' dediği sahabi kimdir?",
    options: ["Ömer bin Hattab", "Ebubekir", "Ali bin Ebi Talib", "Osman bin Affan"],
    correctAnswer: "Ömer bin Hattab",
    explanation: "Hz. Ömer'in feraseti ve ilhamı (muhaddes oluşu) sebebiyle Peygamberimiz onun hakkında böyle buyurmuştur."
  },
  {
    id: 's_x_35',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) 'Ümmetimin Firavunu' dediği Ebu Cehil'i Bedir'de öldüren iki genç sahabi (Ensar'dan) kimdir?",
    options: ["Muaz bin Amr ve Muavviz bin Afra", "Hasan ve Hüseyin", "Abdullah ve Ubeydullah", "Sad ve Said"],
    correctAnswer: "Muaz bin Amr ve Muavviz bin Afra",
    explanation: "İki genç ensar, 'Ebu Cehil bu mu?' diye sorup, 'Evet' cevabını alınca kartal gibi atılıp onu yaralamış/öldürmüşlerdir."
  },
  {
    id: 's_x_36',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) dedesi Abdülmuttalib'in asıl adı nedir?",
    options: ["Şeybe", "Haşim", "Kusay", "Amr"],
    correctAnswer: "Şeybe",
    explanation: "Doğduğunda saçındaki beyazlıktan dolayı 'Şeybe' (Yaşlı) denmiştir. 'Abdülmuttalib' (Muttalib'in kölesi) lakabı, amcası Muttalib ile Mekke'ye gelirken köle sanılmasıyla kalmıştır."
  },
  {
    id: 's_x_37',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) süt kardeşi olan ve Hz. Hamza'yı şehit eden Vahşi'yi öldüren sahabi kimdir?",
    options: ["Vahşi doğal yolla ölmüştür", "Zübeyr bin Avvam", "Halid bin Velid", "Hz. Ali"],
    correctAnswer: "Vahşi doğal yolla ölmüştür",
    explanation: "Vahşi, Müslüman olduktan sonra Yemame savaşında Müseyleme'yi öldürmüş, daha sonra Humus'ta eceliyle vefat etmiştir."
  },
  {
    id: 's_x_38',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) 'Hilye'sinde (dış görünüşü) saçları nasıldı?",
    options: ["Kulak memesi ile omuzları arasındaydı", "Tamamen kazıtılmıştı", "Çok uzundu", "Kısaydı"],
    correctAnswer: "Kulak memesi ile omuzları arasındaydı",
    explanation: "Şama-il kitaplarında saçlarının bazen kulak yumuşağına (Vefre), bazen omuzlarına (Limme) kadar indiği belirtilir."
  },
  {
    id: 's_x_39',
    difficulty: 'expert',
    points: 40,
    question: "Peygamber Efendimizin (s.a.v) cenaze namazı nasıl kılınmıştır?",
    options: ["İmam olmadan, grup grup içeri girerek", "Hz. Ebubekir kıldırmıştır", "Hz. Ali kıldırmıştır", "Kılınmamıştır"],
    correctAnswer: "İmam olmadan, grup grup içeri girerek",
    explanation: "Peygamberimizin cenaze namazı, imam olmaksızın, sahabenin küçük gruplar halinde odaya girip selam vermesi ve dua etmesiyle kılınmıştır."
  },
  {
    id: 's_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberimizin (s.a.v) 'Benim vefatımdan sonra 30 yıl hilafet, sonra ..... vardır' hadisindeki 30 yıl kime kadar tamamlanır?",
    options: ["Hz. Hasan'ın 6 aylık hilafetiyle", "Hz. Ali ile", "Hz. Muaviye ile", "Ömer bin Abdülaziz ile"],
    correctAnswer: "Hz. Hasan'ın 6 aylık hilafetiyle",
    explanation: "Dört Halife'nin süresi 29.5 yıldır. Hz. Hasan'ın 6 aylık halifeliği ile 30 yıl (Raşid Halifelik) tamamlanmış, sonra saltanat başlamıştır."
  }
    ]
  },
  gunler: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-40) - DİNİ GÜNLER VE İBADETLER (10 PUAN)
  // --------------------------------------------------------
  {
    id: 'g_e_1',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların haftalık bayramı kabul edilen gün hangisidir?",
    options: ["Pazartesi", "Cuma", "Cumartesi", "Pazar"],
    correctAnswer: "Cuma",
    explanation: "Cuma günü Müslümanlar için haftalık toplanma ve bayram günüdür."
  },
  {
    id: 'g_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Kuran-ı Kerim'in indirilmeye başlandığı mübarek gece hangisidir?",
    options: ["Miraç Kandili", "Berat Kandili", "Kadir Gecesi", "Regaip Kandili"],
    correctAnswer: "Kadir Gecesi",
    explanation: "Bin aydan daha hayırlı olan Kadir Gecesi'nde Kuran indirilmeye başlanmıştır."
  },
  {
    id: 'g_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan ayından sonra kutladığımız bayram hangisidir?",
    options: ["Kurban Bayramı", "Ramazan (Şeker) Bayramı", "Cumhuriyet Bayramı", "Zafer Bayramı"],
    correctAnswer: "Ramazan (Şeker) Bayramı",
    explanation: "Bir ay oruç tuttuktan sonra Allah'ın müminlere hediyesi Ramazan Bayramıdır."
  },
  {
    id: 'g_e_4',
    difficulty: 'easy',
    points: 10,
    question: "Kurban kesilen ve Hac ibadetinin yapıldığı bayram hangisidir?",
    options: ["Ramazan Bayramı", "Kurban Bayramı", "Cuma Günü", "Arefe Günü"],
    correctAnswer: "Kurban Bayramı",
    explanation: "Zilhicce ayında kutlanan ve kurban ibadetinin yapıldığı bayram Kurban Bayramıdır."
  },
  {
    id: 'g_e_5',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) dünyaya geldiği gece hangi kandildir?",
    options: ["Mevlid Kandili", "Regaip Kandili", "Miraç Kandili", "Berat Kandili"],
    correctAnswer: "Mevlid Kandili",
    explanation: "Mevlid, 'doğum zamanı' demektir. Peygamberimizin doğumu bu gecede kutlanır."
  },
  {
    id: 'g_e_6',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimizin (s.a.v) göğe yükseldiği ve namazın farz kılındığı gece hangisidir?",
    options: ["Kadir Gecesi", "Miraç Kandili", "Mevlid Kandili", "Berat Kandili"],
    correctAnswer: "Miraç Kandili",
    explanation: "Recep ayının 27. gecesi olan Miraç'ta Peygamberimiz göklere yükseltilmiştir."
  },
  {
    id: 'g_e_7',
    difficulty: 'easy',
    points: 10,
    question: "Bayram namazı yılda kaç defa kılınır?",
    options: ["1", "2", "3", "5"],
    correctAnswer: "2",
    explanation: "Ramazan ve Kurban bayramı sabahlarında olmak üzere yılda iki kez bayram namazı kılınır."
  },
  {
    id: 'g_e_8',
    difficulty: 'easy',
    points: 10,
    question: "Üç Aylar olarak bilinen mübarek aylar hangileridir?",
    options: ["Ocak, Şubat, Mart", "Recep, Şaban, Ramazan", "Muharrem, Safer, Rebiülevvel", "Şevval, Zilkade, Zilhicce"],
    correctAnswer: "Recep, Şaban, Ramazan",
    explanation: "Manevi iklimin yoğunlaştığı üç aylar Recep, Şaban ve Ramazan'dır."
  },
  {
    id: 'g_e_9',
    difficulty: 'easy',
    points: 10,
    question: "Hicri takvimin ilk ayı ve 'Aşure Günü'nün bulunduğu ay hangisidir?",
    options: ["Ramazan", "Muharrem", "Recep", "Şaban"],
    correctAnswer: "Muharrem",
    explanation: "Muharrem ayı Hicri yılbaşıdır ve 10. günü Aşure günüdür."
  },
  {
    id: 'g_e_10',
    difficulty: 'easy',
    points: 10,
    question: "Bayramdan bir önceki güne ne ad verilir?",
    options: ["Arefe", "Kandil", "Cuma", "Terviye"],
    correctAnswer: "Arefe",
    explanation: "Bayramı karşılayan ve hazırlık yapılan bir önceki güne Arefe denir."
  },
  {
    id: 'g_e_11',
    difficulty: 'easy',
    points: 10,
    question: "Cuma namazı hangi vakitte kılınır?",
    options: ["Sabah", "Öğle", "İkindi", "Akşam"],
    correctAnswer: "Öğle",
    explanation: "Cuma namazı, Cuma günü öğle namazı vaktinde cemaatle kılınır."
  },
  {
    id: 'g_e_12',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan ayında oruca başlamadan önce gece yenen yemeğe ne denir?",
    options: ["İftar", "Sahur", "Akşam Yemeği", "Kahvaltı"],
    correctAnswer: "Sahur",
    explanation: "Oruca niyetlenmek için fecir vaktinden önce yenen yemeğe Sahur denir."
  },
  {
    id: 'g_e_13',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan ayında akşam ezanıyla birlikte orucun açılmasına ne denir?",
    options: ["Sahur", "İmsak", "İftar", "Teravih"],
    correctAnswer: "İftar",
    explanation: "Güneş batınca oruç yasaklarının sona erdiği ana İftar denir."
  },
  {
    id: 'g_e_14',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan gecelerinde yatsıdan sonra kılınan özel namaz hangisidir?",
    options: ["Vitir", "Teheccüd", "Teravih", "Kuşluk"],
    correctAnswer: "Teravih",
    explanation: "Sadece Ramazan ayına özel, 20 rekatlık sünnet namaz Teravih namazıdır."
  },
  {
    id: 'g_e_15',
    difficulty: 'easy',
    points: 10,
    question: "Kurban Bayramı kaç gün sürer?",
    options: ["1 gün", "3 gün", "4 gün", "7 gün"],
    correctAnswer: "4 gün",
    explanation: "Kurban Bayramı 4 gün, Ramazan Bayramı ise 3 gün sürer."
  },
  {
    id: 'g_e_16',
    difficulty: 'easy',
    points: 10,
    question: "Regaip Kandili hangi aydadır?",
    options: ["Recep", "Şaban", "Ramazan", "Muharrem"],
    correctAnswer: "Recep",
    explanation: "Üç ayların başlangıcını müjdeleyen Regaip Kandili, Recep ayının ilk Cuma gecesidir."
  },
  {
    id: 'g_e_17',
    difficulty: 'easy',
    points: 10,
    question: "Berat Kandili'nin anlamı nedir?",
    options: ["Doğum günü", "Göğe yükselme", "Kurtuluş ve bağışlanma", "Bayram"],
    correctAnswer: "Kurtuluş ve bağışlanma",
    explanation: "Berat; borçtan, suçtan ve cezadan kurtulmak, temize çıkmak demektir."
  },
  {
    id: 'g_e_18',
    difficulty: 'easy',
    points: 10,
    question: "Hac ibadeti hangi ayda yapılır?",
    options: ["Ramazan", "Zilhicce", "Şevval", "Recep"],
    correctAnswer: "Zilhicce",
    explanation: "Hac ve Kurban ibadetleri Zilhicce ayında yapılır."
  },
  {
    id: 'g_e_19',
    difficulty: 'easy',
    points: 10,
    question: "Arefe günü (Kurban Bayramı'ndan önce) hacıların toplandığı yer neresidir?",
    options: ["Mina", "Müzdelife", "Arafat", "Safa"],
    correctAnswer: "Arafat",
    explanation: "Haccın en önemli farzı olan 'Vakfe', Arefe günü Arafat'ta yapılır."
  },
  {
    id: 'g_e_20',
    difficulty: 'easy',
    points: 10,
    question: "Kurban Bayramı'nda 'Teşrik Tekbirleri' ne zaman başlar?",
    options: ["Bayram sabahı", "Arefe günü sabah namazı", "Bayramdan sonra", "Arefe günü akşamı"],
    correctAnswer: "Arefe günü sabah namazı",
    explanation: "Teşrik tekbirleri Arefe günü sabah namazından başlayıp bayramın 4. günü ikindiye kadar sürer."
  },
  {
    id: 'g_e_21',
    difficulty: 'easy',
    points: 10,
    question: "Fitre (Fıtır Sadakası) hangi ayda verilir?",
    options: ["Muharrem", "Ramazan", "Zilhicce", "Recep"],
    correctAnswer: "Ramazan",
    explanation: "Ramazan ayında, bayram namazına kadar verilmesi vacip olan sadakadır."
  },
  {
    id: 'g_e_22',
    difficulty: 'easy',
    points: 10,
    question: "Oruç tutmanın yasak olduğu günler hangileridir?",
    options: ["Cuma günleri", "Pazartesi günleri", "Bayram günleri", "Kandil geceleri"],
    correctAnswer: "Bayram günleri",
    explanation: "Ramazan Bayramı'nın 1. günü ve Kurban Bayramı'nın 4 günü oruç tutmak haramdır (Allah'ın ikram günleridir)."
  },
  {
    id: 'g_e_23',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) haftanın hangi günlerinde oruç tutmayı tavsiye etmiştir?",
    options: ["Salı ve Çarşamba", "Pazartesi ve Perşembe", "Cumartesi ve Pazar", "Sadece Cuma"],
    correctAnswer: "Pazartesi ve Perşembe",
    explanation: "Amellerin Allah'a arz edildiği Pazartesi ve Perşembe günleri oruçlu olmak sünnettir."
  },
  {
    id: 'g_e_24',
    difficulty: 'easy',
    points: 10,
    question: "Cuma namazından önce imamın merdivenli yerde (minber) yaptığı konuşmaya ne denir?",
    options: ["Vaaz", "Hutbe", "Dua", "Sohbet"],
    correctAnswer: "Hutbe",
    explanation: "Cuma namazının şartlarından biri de Hutbe dinlemektir."
  },
  {
    id: 'g_e_25',
    difficulty: 'easy',
    points: 10,
    question: "İtikaf ne demektir?",
    options: ["Ramazan'ın son 10 günü camiye kapanıp ibadet etmek", "Hacca gitmek", "Kurban kesmek", "Oruç tutmak"],
    correctAnswer: "Ramazan'ın son 10 günü camiye kapanıp ibadet etmek",
    explanation: "Dünya işlerinden uzaklaşıp ibadet niyetiyle mescitte kalmaya İtikaf denir."
  },
  {
    id: 'g_e_26',
    difficulty: 'easy',
    points: 10,
    question: "Aşure günü hangi peygamberin gemisi karaya oturmuştur?",
    options: ["Hz. Musa", "Hz. İsa", "Hz. Nuh", "Hz. İbrahim"],
    correctAnswer: "Hz. Nuh",
    explanation: "Aşure günü birçok peygamberin kurtuluş günüdür, Hz. Nuh'un gemisi de Cudi dağına oturmuştur."
  },
  {
    id: 'g_e_27',
    difficulty: 'easy',
    points: 10,
    question: "Kadir Gecesi'nin zamanı hakkında bilinen en yaygın görüş nedir?",
    options: ["Ramazan'ın ilk gecesi", "Ramazan'ın 15. gecesi", "Ramazan'ın 27. gecesi", "Ramazan'ın son gecesi"],
    correctAnswer: "Ramazan'ın 27. gecesi",
    explanation: "Kesin olmamakla birlikte, Ramazan'ın 27. gecesi olduğu kuvvetli ihtimaldir ve Müslümanlarca ihya edilir."
  },
  {
    id: 'g_e_28',
    difficulty: 'easy',
    points: 10,
    question: "Hangi aylarda savaşmak yasaklanmış ve 'Haram Aylar' denilmiştir?",
    options: ["Ocak, Şubat, Mart, Nisan", "Zilkade, Zilhicce, Muharrem, Recep", "Ramazan, Şaban, Recep", "Yaz ayları"],
    correctAnswer: "Zilkade, Zilhicce, Muharrem, Recep",
    explanation: "Cahiliye döneminden beri saygı duyulan ve savaşın yasak olduğu 4 aydır."
  },
  {
    id: 'g_e_29',
    difficulty: 'easy',
    points: 10,
    question: "Bayram namazında diğer namazlardan farklı olarak ne vardır?",
    options: ["Secde yoktur", "Rüku yoktur", "Fazladan tekbirler vardır", "Dua yoktur"],
    correctAnswer: "Fazladan tekbirler vardır",
    explanation: "Bayram namazlarında her rekatta alınan 'Zevaid Tekbirleri' (Ekstra tekbirler) vardır."
  },
  {
    id: 'g_e_30',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan davulcusu ne zaman çalar?",
    options: ["İftarda", "Teravihde", "Sahurda", "Öğle vaktinde"],
    correctAnswer: "Sahurda",
    explanation: "Geleneksel olarak insanları sahura kaldırmak için davul çalınır."
  },
  {
    id: 'g_e_31',
    difficulty: 'easy',
    points: 10,
    question: "Kurban eti nasıl değerlendirilmelidir?",
    options: ["Hepsini kendimiz yemeliyiz", "Satmalıyız", "Üçe bölüp; fakire, misafire ve ev halkına ayırmalıyız", "Denize atmalıyız"],
    correctAnswer: "Üçe bölüp; fakire, misafire ve ev halkına ayırmalıyız",
    explanation: "Müstehap olan; kurban etinin üçte birini fakirlere, üçte birini misafirlere, üçte birini ev halkına ayırmaktır."
  },
  {
    id: 'g_e_32',
    difficulty: 'easy',
    points: 10,
    question: "Cuma günü hangi sureyi okumak sünnettir?",
    options: ["Fatiha", "İhlas", "Kehf", "Nas"],
    correctAnswer: "Kehf",
    explanation: "Hadislerde Cuma günü Kehf suresini okuyanın nurlanacağı müjdelenmiştir."
  },
  {
    id: 'g_e_33',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan Bayramı'nda ne yapmak sünnettir?",
    options: ["Oruç tutmak", "Tatlı yemek (Hurma vb.) ve namaza gitmek", "Uyumak", "Üzülmek"],
    correctAnswer: "Tatlı yemek (Hurma vb.) ve namaza gitmek",
    explanation: "Bayram sabahı namaza gitmeden önce tatlı bir şey (hurma) yemek sünnettir."
  },
  {
    id: 'g_e_34',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların kullandığı takvime ne ad verilir?",
    options: ["Miladi Takvim", "Hicri Takvim", "Rumi Takvim", "Celali Takvim"],
    correctAnswer: "Hicri Takvim",
    explanation: "Peygamberimizin hicretini (622) başlangıç kabul eden ve Ay yılına göre düzenlenen takvimdir."
  },
  {
    id: 'g_e_35',
    difficulty: 'easy',
    points: 10,
    question: "Hicri takvimde bir yıl kaç gündür?",
    options: ["365", "354 veya 355", "300", "400"],
    correctAnswer: "354 veya 355",
    explanation: "Ay yılı (Kameri yıl), Güneş yılından yaklaşık 10-11 gün daha kısadır."
  },
  {
    id: 'g_e_36',
    difficulty: 'easy',
    points: 10,
    question: "Kurban Bayramı'nda kesilen kurban ne içindir?",
    options: ["Et yemek için", "Allah'a yakınlaşmak ve itaat için", "Gösteriş için", "Spor için"],
    correctAnswer: "Allah'a yakınlaşmak ve itaat için",
    explanation: "Kurban, 'kurbiyet' (yakınlaşma) kökünden gelir; amaç Allah'ın rızasını kazanmaktır."
  },
  {
    id: 'g_e_37',
    difficulty: 'easy',
    points: 10,
    question: "'Şevval Orucu' kaç gündür?",
    options: ["1 gün", "6 gün", "30 gün", "10 gün"],
    correctAnswer: "6 gün",
    explanation: "Ramazan'dan hemen sonra gelen Şevval ayında 6 gün oruç tutmak çok sevaptır."
  },
  {
    id: 'g_e_38',
    difficulty: 'easy',
    points: 10,
    question: "Peygamberimiz (s.a.v) Pazartesi günü oruç tutmasının sebebini nasıl açıklamıştır?",
    options: ["O gün doğdum ve bana vahiy o gün geldi", "O gün tatildir", "O gün hava serindir", "O gün yiyecek yoktu"],
    correctAnswer: "O gün doğdum ve bana vahiy o gün geldi",
    explanation: "Peygamberimiz Pazartesi orucunu, doğumuna ve vahyin başlangıcına bir şükür olarak tutmuştur."
  },
  {
    id: 'g_e_39',
    difficulty: 'easy',
    points: 10,
    question: "Bayram günlerinde küslerin ne yapması gerekir?",
    options: ["Barışması", "Küs kalmaya devam etmesi", "Kavga etmesi", "Kaçması"],
    correctAnswer: "Barışması",
    explanation: "Bayramlar barışma, kucaklaşma ve kardeşlik günleridir; küslükler sona erdirilmelidir."
  },
  {
    id: 'g_e_40',
    difficulty: 'easy',
    points: 10,
    question: "Kandil gecelerinde ne yapılır?",
    options: ["Bol bol uyulur", "Televizyon izlenir", "Dua edilir, Kuran okunur, tövbe edilir", "Oyun oynanır"],
    correctAnswer: "Dua edilir, Kuran okunur, tövbe edilir",
    explanation: "Kandil geceleri manevi fırsat zamanlarıdır; ibadet ve dua ile değerlendirilir."
  },
  // --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - DİNİ GÜNLER VE İBADETLER (20 PUAN)
  // --------------------------------------------------------
  {
    id: 'g_m_1',
    difficulty: 'medium',
    points: 20,
    question: "Bayram namazının hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet", "Nafile"],
    correctAnswer: "Vacip",
    explanation: "Kendisine Cuma namazı farz olan erkeklere bayram namazlarını kılmak vaciptir."
  },
  {
    id: 'g_m_2',
    difficulty: 'medium',
    points: 20,
    question: "Kurban Bayramı'nda 'Teşrik Tekbirleri' ne zaman sona erer?",
    options: ["Bayramın 1. günü akşamı", "Bayramın 3. günü sabahı", "Bayramın 4. günü ikindi namazı", "Arefe günü"],
    correctAnswer: "Bayramın 4. günü ikindi namazı",
    explanation: "Teşrik tekbirleri Arefe sabahı başlar, bayramın 4. günü ikindi namazı dahil edilerek son bulur (Toplam 23 vakit)."
  },
  {
    id: 'g_m_3',
    difficulty: 'medium',
    points: 20,
    question: "Beş vakit namaz hangi mübarek gecede farz kılınmıştır?",
    options: ["Kadir Gecesi", "Miraç Kandili", "Berat Kandili", "Mevlid Kandili"],
    correctAnswer: "Miraç Kandili",
    explanation: "Peygamberimizin göğe yükseldiği Miraç gecesinde 5 vakit namaz hediye edilmiştir."
  },
  {
    id: 'g_m_4',
    difficulty: 'medium',
    points: 20,
    question: "Güneş tutulması esnasında kılınan namaza ne denir?",
    options: ["Küsuf Namazı", "Hüsuf Namazı", "İstiska Namazı", "Hacet Namazı"],
    correctAnswer: "Küsuf Namazı",
    explanation: "Güneş tutulmasında 'Küsuf', Ay tutulmasında 'Hüsuf' namazı kılmak sünnettir."
  },
  {
    id: 'g_m_5',
    difficulty: 'medium',
    points: 20,
    question: "Hicri takvime göre 'Aşure Günü' hangi aydadır?",
    options: ["Ramazan", "Şaban", "Muharrem", "Zilhicce"],
    correctAnswer: "Muharrem",
    explanation: "Muharrem ayının 10. günü Aşure günüdür."
  },
  {
    id: 'g_m_6',
    difficulty: 'medium',
    points: 20,
    question: "Ramazan ayında verilen 'Fitre'nin (Fıtır Sadakası) en son verilme zamanı ne zamandır?",
    options: ["Ramazan'ın ortası", "Bayram Namazından önce", "Bayramın 3. günü", "Kurban Bayramı"],
    correctAnswer: "Bayram Namazından önce",
    explanation: "Fitrenin bayram namazından önce verilmesi vaciptir, sonraya kalırsa normal sadaka olur."
  },
  {
    id: 'g_m_7',
    difficulty: 'medium',
    points: 20,
    question: "Hac ibadeti sırasında 'Şeytan Taşlama' görevi nerede yapılır?",
    options: ["Mina", "Arafat", "Müzdelife", "Safa"],
    correctAnswer: "Mina",
    explanation: "Hacılar bayram günlerinde Mina bölgesindeki Cemerat'ta şeytan taşlarlar."
  },
  {
    id: 'g_m_8',
    difficulty: 'medium',
    points: 20,
    question: "Gece yarısından sonra kılınan ve çok faziletli olan nafile namaz hangisidir?",
    options: ["Kuşluk (Duha)", "Teheccüd", "Evvabin", "Tesbih"],
    correctAnswer: "Teheccüd",
    explanation: "Yatsı namazından sonra uyuyup uyandıktan sonra kılınan namaza Teheccüd denir."
  },
  {
    id: 'g_m_9',
    difficulty: 'medium',
    points: 20,
    question: "Berat Kandili hangi aydadır?",
    options: ["Recep", "Şaban", "Ramazan", "Zilkade"],
    correctAnswer: "Şaban",
    explanation: "Berat Kandili, Şaban ayının 15. gecesidir."
  },
  {
    id: 'g_m_10',
    difficulty: 'medium',
    points: 20,
    question: "Aşure günü oruç tutmanın hükmü ve şekli nasıldır?",
    options: ["Farzdır", "Sünnettir (Tek gün tutulmaz, 9-10 veya 10-11)", "Mekruhtur", "Haramdır"],
    correctAnswer: "Sünnettir (Tek gün tutulmaz, 9-10 veya 10-11)",
    explanation: "Yahudilere benzememek için Aşure gününü tek tutmayıp, bir gün öncesi veya sonrası ile birleştirmek sünnettir."
  },
  {
    id: 'g_m_11',
    difficulty: 'medium',
    points: 20,
    question: "Kurban kesmenin hükmü Hanefi mezhebine göre nedir (zenginler için)?",
    options: ["Farz", "Vacip", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "İmam-ı Azam'a göre nisap miktarı mala sahip olan mukim kimselere kurban kesmek vaciptir."
  },
  {
    id: 'g_m_12',
    difficulty: 'medium',
    points: 20,
    question: "Cuma günü duaların kabul edildiği o özel vakte ne denir?",
    options: ["İcabet Saati (Saat-i İcabe)", "Kerahat Vakti", "İmsak Vakti", "Seher Vakti"],
    correctAnswer: "İcabet Saati (Saat-i İcabe)",
    explanation: "Cuma günü içinde gizlenmiş, duaların reddedilmediği vakte İcabet Saati denir."
  },
  {
    id: 'g_m_13',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) 'Allah'ım, bize Recep ve Şaban'ı mübarek kıl ve bizi ..... ulaştır' diye dua etmiştir.",
    options: ["Bayrama", "Ramazan'a", "Cennete", "Kurban'a"],
    correctAnswer: "Ramazan'a",
    explanation: "Üç aylar girdiğinde Peygamberimizin yaptığı meşhur duadır."
  },
  {
    id: 'g_m_14',
    difficulty: 'medium',
    points: 20,
    question: "Teravih namazını cemaatle kılmayı sürekli hale getiren halife kimdir?",
    options: ["Hz. Ebubekir", "Hz. Ömer", "Hz. Osman", "Hz. Ali"],
    correctAnswer: "Hz. Ömer",
    explanation: "Peygamberimiz farz sanılmasın diye cemaatle kılmayı bırakmıştı, Hz. Ömer döneminde yeniden cemaatle ve 20 rekat olarak düzenlendi."
  },
  {
    id: 'g_m_15',
    difficulty: 'medium',
    points: 20,
    question: "Hac'da Arafat ve Mina arasında gece kalınan (vakfe yapılan) yer neresidir?",
    options: ["Müzdelife", "Safa", "Kabe", "Hira"],
    correctAnswer: "Müzdelife",
    explanation: "Hacılar Arefe günü akşamı Arafat'tan inip Müzdelife'de gecelerler ve taş toplarlar."
  },
  {
    id: 'g_m_16',
    difficulty: 'medium',
    points: 20,
    question: "'Kıble'nin Mescid-i Aksa'dan Kabe'ye çevrilmesi hangi ayda olmuştur?",
    options: ["Ramazan", "Şaban (Berat Gecesi)", "Muharrem", "Recep"],
    correctAnswer: "Şaban (Berat Gecesi)",
    explanation: "Kıble değişimi (Tahvil-i Kıble) hicretin 2. yılında Şaban ayının ortasında (Berat gecesi) gerçekleşmiştir."
  },
  {
    id: 'g_m_17',
    difficulty: 'medium',
    points: 20,
    question: "Ramazan ayında 'Mukabele' okumak ne demektir?",
    options: ["Birinin okuyup diğerlerinin takip etmesi", "Meal okumak", "Ezberden okumak", "Tefsir okumak"],
    correctAnswer: "Birinin okuyup diğerlerinin takip etmesi",
    explanation: "Cebrail (a.s) ile Peygamberimizin Ramazan'da Kuran'ı karşılıklı okumaları sünnetinden gelir."
  },
  {
    id: 'g_m_18',
    difficulty: 'medium',
    points: 20,
    question: "Güneş doğduktan yaklaşık 45 dk sonra (kaba kuşluk) kılınan nafile namaz hangisidir?",
    options: ["İşrak (Kuşluk)", "Teheccüd", "Evvabin", "Hacet"],
    correctAnswer: "İşrak (Kuşluk)",
    explanation: "Güneş doğup kerahet vakti çıktıktan sonra kılınan namaza İşrak veya Kuşluk (Duha) namazı denir."
  },
  {
    id: 'g_m_19',
    difficulty: 'medium',
    points: 20,
    question: "Kuraklık zamanında yağmur yağması için kılınan namaza ne denir?",
    options: ["İstiska Namazı (Yağmur Duası)", "Küsuf", "Hüsuf", "Şükür"],
    correctAnswer: "İstiska Namazı (Yağmur Duası)",
    explanation: "Topluca açık alana çıkıp, elbiseleri ters giyerek yağmur istemek için kılınan namazdır."
  },
  {
    id: 'g_m_20',
    difficulty: 'medium',
    points: 20,
    question: "'Leyle-i Regaip' (Regaip Gecesi) ne anlama gelir?",
    options: ["Arzulanan, bol ihsan edilen gece", "Korkulan gece", "Hüzünlü gece", "Ayrılık gecesi"],
    correctAnswer: "Arzulanan, bol ihsan edilen gece",
    explanation: "Regaip, 'rağbet edilen, bol bağış' demektir; Allah'ın rahmetinin bol olduğu gecedir."
  },
  {
    id: 'g_m_21',
    difficulty: 'medium',
    points: 20,
    question: "Fitre (Fıtır Sadakası) kimlere verilmez?",
    options: ["Fakirlere", "Öğrencilere", "Anne, baba, eş ve çocuklara", "Borçlulara"],
    correctAnswer: "Anne, baba, eş ve çocuklara",
    explanation: "Kişi bakmakla yükümlü olduğu usul (anne-baba) ve füruuna (çocuk-torun) zekat ve fitre veremez."
  },
  {
    id: 'g_m_22',
    difficulty: 'medium',
    points: 20,
    question: "Hicri takvim hangi olayla başlar?",
    options: ["Peygamberimizin Doğumu", "İlk Vahiy", "Mekke'nin Fethi", "Hicret"],
    correctAnswer: "Hicret",
    explanation: "Hz. Ömer döneminde, Peygamberimizin Mekke'den Medine'ye hicreti takvim başlangıcı kabul edilmiştir."
  },
  {
    id: 'g_m_23',
    difficulty: 'medium',
    points: 20,
    question: "Kurban kesim vakti ne zaman başlar?",
    options: ["Arefe günü", "Bayram namazı kılındıktan sonra", "Bayramın 2. günü", "Kurban alınınca"],
    correctAnswer: "Bayram namazı kılındıktan sonra",
    explanation: "Kurban, bayram namazı kılındıktan sonra kesilmeye başlanır (Namaz kılınmayan yerlerde sabah namazı vaktinden sonra)."
  },
  {
    id: 'g_m_24',
    difficulty: 'medium',
    points: 20,
    question: "Akşam namazından sonra kılınan ve 'Tövbe edenlerin namazı' denilen nafile namaz hangisidir?",
    options: ["Evvabin", "Teheccüd", "Duha", "Tesbih"],
    correctAnswer: "Evvabin",
    explanation: "Akşam ile yatsı arasında kılınan 2 ile 6 rekatlık namaza Evvabin denir."
  },
  {
    id: 'g_m_25',
    difficulty: 'medium',
    points: 20,
    question: "'Mevlid-i Nebi' haftası hangi ayda kutlanır?",
    options: ["Ramazan", "Rebiülevvel", "Recep", "Muharrem"],
    correctAnswer: "Rebiülevvel",
    explanation: "Peygamberimiz Rebiülevvel ayının 12. gecesi doğmuştur."
  },
  {
    id: 'g_m_26',
    difficulty: 'medium',
    points: 20,
    question: "Oruç tutamayan yaşlı veya iyileşme umudu olmayan hastaların ödediği bedele ne denir?",
    options: ["Fitre", "Fidye", "Kefaret", "Zekat"],
    correctAnswer: "Fidye",
    explanation: "Oruç tutmaya gücü yetmeyenlerin her gün için bir fakiri doyurmasına Fidye denir."
  },
  {
    id: 'g_m_27',
    difficulty: 'medium',
    points: 20,
    question: "Hac ibadeti ömürde kaç defa farzdır?",
    options: ["Her yıl", "Ömürde bir defa", "5 yılda bir", "İstenildiği kadar"],
    correctAnswer: "Ömürde bir defa",
    explanation: "Şartları tutan Müslümana Hac ibadeti ömründe bir kez farzdır."
  },
  {
    id: 'g_m_28',
    difficulty: 'medium',
    points: 20,
    question: "Hacda Safa ve Merve tepeleri arasında 7 kez gidip gelmeye ne denir?",
    options: ["Tavaf", "Sa'y", "Vakfe", "İhram"],
    correctAnswer: "Sa'y",
    explanation: "Hz. Hacer annemizin su arayışını temsilen yapılan yürüyüşe Sa'y denir."
  },
  {
    id: 'g_m_29',
    difficulty: 'medium',
    points: 20,
    question: "'Haram Aylar'dan biri olan ve tek başına bulunan (diğer üçü peş peşedir) ay hangisidir?",
    options: ["Recep", "Muharrem", "Zilkade", "Zilhicce"],
    correctAnswer: "Recep",
    explanation: "Zilkade, Zilhicce ve Muharrem peş peşe gelir; Recep ayı ise tek başına (Mudar'ın Recep'i) ayrıdır."
  },
  {
    id: 'g_m_30',
    difficulty: 'medium',
    points: 20,
    question: "Kadir Gecesi'nde meleklerin yeryüzüne inmesi hangi surede anlatılır?",
    options: ["Kadir Suresi", "Duhan Suresi", "Bakara Suresi", "Yasin Suresi"],
    correctAnswer: "Kadir Suresi",
    explanation: "Kadir suresinde 'O gece melekler ve Ruh (Cebrail), Rablerinin izniyle her türlü iş için inerler' buyurulur."
  },
  {
    id: 'g_m_31',
    difficulty: 'medium',
    points: 20,
    question: "Kurban Bayramı'ndan bir önceki güne (Arefe'den önceki gün) ne denir?",
    options: ["Terviye Günü", "Nahr Günü", "Teşrik Günü", "Kandil"],
    correctAnswer: "Terviye Günü",
    explanation: "Zilhicce'nin 8. gününe (Arefe'den bir gün önce) Terviye günü denir."
  },
  {
    id: 'g_m_32',
    difficulty: 'medium',
    points: 20,
    question: "Özel bir duası olan ve 'Bütün vücudun günahlardan arınması' için kılınan 4 rekatlık namaz hangisidir?",
    options: ["Tesbih Namazı", "Hacet Namazı", "Şükür Namazı", "Tövbe Namazı"],
    correctAnswer: "Tesbih Namazı",
    explanation: "Her rekatında 75 defa 'Sübhanallahi velhamdülillahi...' tesbihi okunan namazdır."
  },
  {
    id: 'g_m_33',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberimiz (s.a.v) Ramazan ayının son 10 gününde ne yapardı?",
    options: ["İtikafa girerdi", "Sürekli uyurdu", "Yolculuğa çıkardı", "Oruç tutmazdı"],
    correctAnswer: "İtikafa girerdi",
    explanation: "Kadir gecesini aramak ve ibadete yoğunlaşmak için mescitte itikafa girerdi."
  },
  {
    id: 'g_m_34',
    difficulty: 'medium',
    points: 20,
    question: "Cuma suresinde Cuma namazı için ne zaman çağrı yapıldığında (ezan okununca) ne yapılması emredilir?",
    options: ["Alışverişi bırakıp Allah'ın zikrine koşulması", "Eve gidilmesi", "Yemek yenmesi", "Uyunması"],
    correctAnswer: "Alışverişi bırakıp Allah'ın zikrine koşulması",
    explanation: "Cuma suresi 9. ayet: 'Alışverişi bırakın ve Allah'ın zikrine (Cuma namazına) koşun.'"
  },
  {
    id: 'g_m_35',
    difficulty: 'medium',
    points: 20,
    question: "Hangi durumda kurban kesilmez?",
    options: ["Ramazan Bayramı'nda", "Adak olunca", "Akika için", "Hacda"],
    correctAnswer: "Ramazan Bayramı'nda",
    explanation: "Ramazan Bayramı'nda kurban kesme ibadeti yoktur (Sadece Kurban Bayramı'nda vardır)."
  },
  {
    id: 'g_m_36',
    difficulty: 'medium',
    points: 20,
    question: "Yeni doğan çocuk için Allah'a şükür amacıyla kesilen kurbana ne denir?",
    options: ["Akika", "Adak", "Udhiye", "Hedy"],
    correctAnswer: "Akika",
    explanation: "Çocuğun doğumu münasebetiyle kesilen kurbana Akika kurbanı denir."
  },
  {
    id: 'g_m_37',
    difficulty: 'medium',
    points: 20,
    question: "Hicri ayların 13, 14 ve 15. günlerine (dolunay zamanı) ne denir?",
    options: ["Eyyam-ı Bîz (Aydınlık Günler)", "Eyyam-ı Teşrik", "Haram Aylar", "Mübarek Günler"],
    correctAnswer: "Eyyam-ı Bîz (Aydınlık Günler)",
    explanation: "Gecelerin en aydınlık olduğu bu üç günde oruç tutmak sünnettir."
  },
  {
    id: 'g_m_38',
    difficulty: 'medium',
    points: 20,
    question: "Ramazan'da 'İmsak' vaktinin girmesiyle ne başlar?",
    options: ["Sabah namazı vakti ve Oruç", "Yatsı namazı", "Teravih", "İftar"],
    correctAnswer: "Sabah namazı vakti ve Oruç",
    explanation: "İmsak, yeme içmenin kesildiği ve sabah namazı vaktinin girdiği andır."
  },
  {
    id: 'g_m_39',
    difficulty: 'medium',
    points: 20,
    question: "Hangi gece için 'Bin aydan hayırlıdır' ifadesi kullanılır?",
    options: ["Kadir Gecesi", "Miraç Gecesi", "Berat Gecesi", "Regaip Gecesi"],
    correctAnswer: "Kadir Gecesi",
    explanation: "Kadir suresinde açıkça 'Kadir gecesi bin aydan hayırlıdır' buyurulmuştur."
  },
  {
    id: 'g_m_40',
    difficulty: 'medium',
    points: 20,
    question: "Bayram günlerinde oruç tutmanın hükmü nedir?",
    options: ["Haramdır (Tahrimen Mekruh)", "Farzdır", "Sünnettir", "Mübahtır"],
    correctAnswer: "Haramdır (Tahrimen Mekruh)",
    explanation: "Bayramlar Allah'ın ziyafet günleridir, bu günlerde oruç tutmak yasaklanmıştır."
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - DİNİ GÜNLER VE İBADETLER (30 PUAN)
  // --------------------------------------------------------
  {
    id: 'g_h_1',
    difficulty: 'hard',
    points: 30,
    question: "Hac ibadetinde, ihrama girilen sınırlara (noktalara) ne ad verilir?",
    options: ["Mikat", "Harem", "Mina", "Müzdelife"],
    correctAnswer: "Mikat",
    explanation: "Hacı adaylarının ihramsız geçmemeleri gereken 5 sınır noktasına Mikat denir."
  },
  {
    id: 'g_h_2',
    difficulty: 'hard',
    points: 30,
    question: "Kurbanlık hayvanlardan 'Sığır/Manda'nın kurban edilebilmesi için en az kaç yaşını doldurmuş olması gerekir?",
    options: ["1 yaşını", "2 yaşını", "3 yaşını", "5 yaşını"],
    correctAnswer: "2 yaşını",
    explanation: "Sığır cinsinin kurban olabilmesi için 2 yaşını (24 ayını) tam doldurmuş olması şarttır."
  },
  {
    id: 'g_h_3',
    difficulty: 'hard',
    points: 30,
    question: "Ramazan orucunu bilerek ve mazeretsiz bozan kişinin tutması gereken 'Kefaret Orucu' kaç gündür?",
    options: ["30 gün", "40 gün", "60 gün (peş peşe)", "3 gün"],
    correctAnswer: "60 gün (peş peşe)",
    explanation: "Bilerek oruç bozan (yeme, içme, ilişki) kişi 60 gün kefaret + 1 gün kaza olmak üzere oruç tutar."
  },
  {
    id: 'g_h_4',
    difficulty: 'hard',
    points: 30,
    question: "Hac çeşitlerinden 'Temettu Haccı' ne demektir?",
    options: ["Umre ve Haccı ayrı ayrı niyet ve ihramla yapmak", "Sadece Hac yapmak", "Umre ve Haccı tek ihramla yapmak", "Haccı ertelemek"],
    correctAnswer: "Umre ve Haccı ayrı ayrı niyet ve ihramla yapmak",
    explanation: "Hac aylarında önce umre yapıp ihramdan çıktıktan sonra, tekrar hac için ihrama girilerek yapılan hacdır."
  },
  {
    id: 'g_h_5',
    difficulty: 'hard',
    points: 30,
    question: "Zekatın verileceği yerler (sınıflar) Kuran-ı Kerim'de hangi surede belirtilmiştir?",
    options: ["Tevbe Suresi", "Bakara Suresi", "Nur Suresi", "Maide Suresi"],
    correctAnswer: "Tevbe Suresi",
    explanation: "Tevbe suresi 60. ayette zekatın verileceği 8 sınıf (fakirler, miskinler, borçlular vb.) sayılmıştır."
  },
  {
    id: 'g_h_6',
    difficulty: 'hard',
    points: 30,
    question: "Cuma namazının şartlarından 'Vücûb Şartları' (Kime farz olduğu) arasında hangisi yoktur?",
    options: ["Erkek olmak", "Hür olmak", "Mukim olmak", "Abdestli olmak"],
    correctAnswer: "Abdestli olmak",
    explanation: "Abdestli olmak 'Eda' (kılınma) şartıdır, farz olma (vücûb) şartı değildir. (Örn: Abdestsiz birine de Cuma farzdır, abdest alıp kılması gerekir)."
  },
  {
    id: 'g_h_7',
    difficulty: 'hard',
    points: 30,
    question: "Hanefi mezhebine göre 'Vitir Namazı'nın hükmü nedir?",
    options: ["Farz", "Vacip", "Sünnet-i Müekkede", "Nafile"],
    correctAnswer: "Vacip",
    explanation: "İmam-ı Azam'a göre Vitir namazı vaciptir (uygulamada farz gibi bağlayıcıdır), diğer mezheplerde sünnettir."
  },
  {
    id: 'g_h_8',
    difficulty: 'hard',
    points: 30,
    question: "Hacda 'Vakfe'nin yapıldığı ve Haccın rüknü olan gün ve yer neresidir?",
    options: ["Arefe Günü - Arafat", "Bayram Günü - Mina", "Arefe Günü - Müzdelife", "Terviye Günü - Kabe"],
    correctAnswer: "Arefe Günü - Arafat",
    explanation: "Haccın en önemli rüknü, Arefe günü Arafat'ta bir süre durmaktır (Vakfe)."
  },
  {
    id: 'g_h_9',
    difficulty: 'hard',
    points: 30,
    question: "Kurban Bayramı'nda kesilen kurbanın etinden veya derisinden 'Kasap ücreti' verilebilir mi?",
    options: ["Verilebilir", "Verilemez", "Sadece derisi verilir", "Fakir ise verilir"],
    correctAnswer: "Verilemez",
    explanation: "Kurban ibadettir; kasap ücreti kurbanın etinden veya derisinden ödenmez, ayrıca para olarak verilmelidir."
  },
  {
    id: 'g_h_10',
    difficulty: 'hard',
    points: 30,
    question: "Hangi durumlarda 'Sehiv Secdesi' (Yanılma Secdesi) yapmak gerekir?",
    options: ["Farzı terk edince", "Sünneti terk edince", "Vacibi terk edince veya geciktirince", "Namazı bozunca"],
    correctAnswer: "Vacibi terk edince veya geciktirince",
    explanation: "Namazın vaciplerinden biri unutularak terk edilir veya geciktirilirse sehiv secdesi gerekir."
  },
  {
    id: 'g_h_11',
    difficulty: 'hard',
    points: 30,
    question: "Ay tutulması esnasında kılınan namaza ne ad verilir?",
    options: ["Hüsuf Namazı", "Küsuf Namazı", "İstiska", "Evvabin"],
    correctAnswer: "Hüsuf Namazı",
    explanation: "Güneş tutulması 'Küsuf' (Kef harfiyle, Güneş/Şems), Ay tutulması 'Hüsuf' (Ha harfiyle, Ay/Kamer) namazıdır."
  },
  {
    id: 'g_h_12',
    difficulty: 'hard',
    points: 30,
    question: "Ramazan ayında 'Niyet' en geç ne zamana kadar yapılabilir (Nafile ve Ramazan orucu için)?",
    options: ["İmsak vaktine kadar", "Güneş doğana kadar", "Kuşluk vaktine (Öğleden önceye) kadar", "Akşama kadar"],
    correctAnswer: "Kuşluk vaktine (Öğleden önceye) kadar",
    explanation: "Hanefi mezhebine göre Ramazan orucuna, kaba kuşluk vaktine (öğle namazına 1 saat kalana) kadar niyet edilebilir."
  },
  {
    id: 'g_h_13',
    difficulty: 'hard',
    points: 30,
    question: "Zekat mallarından olan 'Altın'ın nisap miktarı (zenginlik sınırı) kaç gramdır?",
    options: ["80.18 gr", "96 gr", "561 gr", "40 gr"],
    correctAnswer: "80.18 gr",
    explanation: "Altının nisabı 20 miskaldir, bu da günümüzde yaklaşık 80.18 gram olarak kabul edilir."
  },
  {
    id: 'g_h_14',
    difficulty: 'hard',
    points: 30,
    question: "Hac'da Kabe'yi tavaf ederken her bir dönüşe (7 dönüşün her birine) ne ad verilir?",
    options: ["Şavt", "Tavaf", "Say", "Rükun"],
    correctAnswer: "Şavt",
    explanation: "Tavaf 7 şavttan oluşur. Kabe'nin etrafındaki her bir tura 'Şavt' denir."
  },
  {
    id: 'g_h_15',
    difficulty: 'hard',
    points: 30,
    question: "Seferi (yolcu) olan kişi 4 rekatlık farz namazları kaç rekat kılar?",
    options: ["2 rekat (Kasr-ı Salat)", "4 rekat (Tam)", "Kılmaz", "3 rekat"],
    correctAnswer: "2 rekat (Kasr-ı Salat)",
    explanation: "Seferilikte 4 rekatlı farzlar 2 rekat olarak kısaltılarak (Kasr) kılınır, bu bir ruhsattır (Hanefi'de vacip derecesinde)."
  },
  {
    id: 'g_h_16',
    difficulty: 'hard',
    points: 30,
    question: "Cenaze namazının rükunları (olmazsa olmazları) nelerdir?",
    options: ["Kıyam ve 4 Tekbir", "Rüku ve Secde", "Kıraat ve Selam", "Abdest ve Niyet"],
    correctAnswer: "Kıyam ve 4 Tekbir",
    explanation: "Cenaze namazında rüku ve secde yoktur; temel rükunları ayakta durmak (kıyam) ve 4 kez tekbir getirmektir."
  },
  {
    id: 'g_h_17',
    difficulty: 'hard',
    points: 30,
    question: "Bayram günlerinde oruç tutmanın hükmü nedir?",
    options: ["Tahrimen (Haram'a yakın) Mekruh", "Tenzihen Mekruh", "Mübah", "Sünnet"],
    correctAnswer: "Tahrimen (Haram'a yakın) Mekruh",
    explanation: "Ramazan Bayramı'nın 1. günü ve Kurban Bayramı'nın 4 günü oruç tutmak yasaktır (Tahrimen mekruh)."
  },
  {
    id: 'g_h_18',
    difficulty: 'hard',
    points: 30,
    question: "Kurban Bayramı'nın diğer adı olan 'Yevmü'n-Nahr' ne demektir?",
    options: ["Kesim Günü (Kan akıtma)", "Barış Günü", "Toplanma Günü", "Veda Günü"],
    correctAnswer: "Kesim Günü (Kan akıtma)",
    explanation: "Nahr, devenin göğsünden kesilmesi/kan akıtılması demektir. Bayramın birinci gününe bu isim verilir."
  },
  {
    id: 'g_h_19',
    difficulty: 'hard',
    points: 30,
    question: "Teravih namazında her 4 rekatta bir dinlenmeye (oturup zikir çekmeye) ne denir?",
    options: ["Tervîha", "Tesbih", "Teşrik", "Tekbir"],
    correctAnswer: "Tervîha",
    explanation: "Teravih kelimesi 'Tervîha'nın çoğuludur, 'rahatlatmak/dinlendirmek' anlamına gelir."
  },
  {
    id: 'g_h_20',
    difficulty: 'hard',
    points: 30,
    question: "Hangi durumda namaz 'Fasit' (Bozulmuş) olur?",
    options: ["Namazda konuşunca", "Esnemekle", "Kaşınmakla", "Gözleri kapatmakla"],
    correctAnswer: "Namazda konuşunca",
    explanation: "Namazda bilerek veya bilmeyerek konuşmak namazı bozar (fasit kılar)."
  },
  {
    id: 'g_h_21',
    difficulty: 'hard',
    points: 30,
    question: "Sadaka-i Fıtır (Fitre) miktarı neye göre belirlenir?",
    options: ["Bir kişinin bir günlük doyumu (gıda ihtiyacı)", "Bir aylık maaş", "Altın fiyatı", "Devlet vergisi"],
    correctAnswer: "Bir kişinin bir günlük doyumu (gıda ihtiyacı)",
    explanation: "Fitre, bir fakirin bir günlük (iki öğün) yiyecek ihtiyacını karşılayacak miktardır."
  },
  {
    id: 'g_h_22',
    difficulty: 'hard',
    points: 30,
    question: "'Adak Kurbanı'nın etinden kimler YİYEMEZ?",
    options: ["Adak sahibi, eşi, çocukları, anne-babası", "Komşular", "Fakirler", "Akrabalar"],
    correctAnswer: "Adak sahibi, eşi, çocukları, anne-babası",
    explanation: "Adak kurbanının etinden, adayan kişi ve bakmakla yükümlü olduğu (usul ve füru) kişiler yiyemez."
  },
  {
    id: 'g_h_23',
    difficulty: 'hard',
    points: 30,
    question: "Şevval ayında tutulan 6 gün orucun hükmü ve fazileti nedir?",
    options: ["Müstehaptır (Sünnet), bütün yılı oruçlu geçirmiş gibi sevap kazandırır", "Farzdır", "Vaciptir", "Mekruhtur"],
    correctAnswer: "Müstehaptır (Sünnet), bütün yılı oruçlu geçirmiş gibi sevap kazandırır",
    explanation: "Ramazan (30 gün) + 6 gün Şevval = 36 gün. Her iyilik 10 katı sayılırsa 360 gün (bir yıl) eder."
  },
  {
    id: 'g_h_24',
    difficulty: 'hard',
    points: 30,
    question: "Cuma namazında 'İç Ezan' ne zaman okunur?",
    options: ["İmam minbere çıktıktan sonra", "İmam gelmeden önce", "Hutbe bittikten sonra", "Namazdan sonra"],
    correctAnswer: "İmam minbere çıktıktan sonra",
    explanation: "İmam hutbe okumak için minbere çıkıp oturduğunda müezzin caminin içinde (ikinci) ezanı okur."
  },
  {
    id: 'g_h_25',
    difficulty: 'hard',
    points: 30,
    question: "Hangi hayvanlar kurban edilmez?",
    options: ["Tavuk, Horoz, Kaz", "Deve", "Sığır", "Koyun"],
    correctAnswer: "Tavuk, Horoz, Kaz",
    explanation: "Kurban sadece 'En'am' suresinde belirtilen hayvanlardan (deve, sığır, koyun, keçi) olur. Kümes hayvanları kurban olmaz."
  },
  {
    id: 'g_h_26',
    difficulty: 'hard',
    points: 30,
    question: "Hac'da 'İhram Yasakları'nı ihlal eden kişinin kestiği cezaya ne denir?",
    options: ["Dem (Kurban)", "Fidye", "Sadaka", "Zekat"],
    correctAnswer: "Dem (Kurban)",
    explanation: "İhram yasaklarını (koku sürünmek, dikişli giymek vb.) ihlal edene ceza olarak küçükbaş kurban (Dem) gerekir."
  },
  {
    id: 'g_h_27',
    difficulty: 'hard',
    points: 30,
    question: "'Teşrik Tekbirleri'nin hükmü nedir?",
    options: ["Vacip", "Farz", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "Kurban bayramı günlerinde farz namazlardan sonra teşrik tekbiri getirmek (kadın-erkek) vaciptir."
  },
  {
    id: 'g_h_28',
    difficulty: 'hard',
    points: 30,
    question: "Kabe'yi ilk gören kişinin yaptığı duanın hükmü nedir?",
    options: ["Müstecaptır (Kabul olunur)", "Mekruhtur", "Sıradandır", "Yasaktır"],
    correctAnswer: "Müstecaptır (Kabul olunur)",
    explanation: "Kabe'yi ilk gördüğü andaki dua, kabul olunan dualardandır."
  },
  {
    id: 'g_h_29',
    difficulty: 'hard',
    points: 30,
    question: "Dini takvimde gün dönümü ne zaman olur?",
    options: ["Akşam ezanıyla (Güneş batınca)", "Gece yarısı 00:00'da", "Sabah ezanıyla", "Öğle vaktinde"],
    correctAnswer: "Akşam ezanıyla (Güneş batınca)",
    explanation: "Hicri takvimde gün, güneşin batmasıyla başlar. Yani Cuma gecesi, Perşembe'yi Cuma'ya bağlayan gecedir."
  },
  {
    id: 'g_h_30',
    difficulty: 'hard',
    points: 30,
    question: "Hangi namazın 'Sünneti' terk edilirse 'Sehiv Secdesi' gerekmez?",
    options: ["İkindi ve Yatsının ilk sünneti", "Sabah namazının sünneti", "Hiçbir sünnet terk edilince sehiv gerekmez", "Öğle sünneti"],
    correctAnswer: "Hiçbir sünnet terk edilince sehiv gerekmez",
    explanation: "Sehiv secdesi vacibin terki/gecikmesi veya farzın gecikmesiyle yapılır. Sünnetin terki sehiv gerektirmez (Sadece sevabı azalır)."
  },
  {
    id: 'g_h_31',
    difficulty: 'hard',
    points: 30,
    question: "Hangi ay 'Allah'ın Ayı' (Şehrullah) olarak nitelendirilmiştir?",
    options: ["Muharrem (veya Recep)", "Ramazan", "Şaban", "Şevval"],
    correctAnswer: "Muharrem (veya Recep)",
    explanation: "Hadislerde Muharrem ayı (bazı rivayetlerde Recep) için 'Şehrullah' ifadesi kullanılmıştır."
  },
  {
    id: 'g_h_32',
    difficulty: 'hard',
    points: 30,
    question: "Kurban keserken okunması şart olan söz nedir?",
    options: ["Bismillahi Allahu Ekber", "Sübhanallah", "Elhamdülillah", "La ilahe illallah"],
    correctAnswer: "Bismillahi Allahu Ekber",
    explanation: "Kurbanı keserken besmele çekmek (Bismillahi Allahu Ekber demek) şarttır, bilerek terk edilirse et yenmez."
  },
  {
    id: 'g_h_33',
    difficulty: 'hard',
    points: 30,
    question: "Umre ile Hac arasındaki en temel fark nedir?",
    options: ["Umre'de Arafat Vakfesi ve Kurban kesme zorunluluğu yoktur", "Umre farzdır", "Hac sünnettir", "Umre sadece Ramazan'da yapılır"],
    correctAnswer: "Umre'de Arafat Vakfesi ve Kurban kesme zorunluluğu yoktur",
    explanation: "Haccın rüknü olan Arafat vakfesi Umre'de yoktur, ayrıca Umre'de kurban kesmek vacip değildir."
  },
  {
    id: 'g_h_34',
    difficulty: 'hard',
    points: 30,
    question: "Ramazan'da 'Fecr-i Sadık' (Tan yerinin ağarması) neyin başlangıcıdır?",
    options: ["Orucun ve Sabah namazının", "Yatsı namazının", "İftarın", "Teravihin"],
    correctAnswer: "Orucun ve Sabah namazının",
    explanation: "İmsak vakti de denilen Fecr-i Sadık ile yeme içme kesilir (oruç başlar) ve sabah namazı vakti girer."
  },
  {
    id: 'g_h_35',
    difficulty: 'hard',
    points: 30,
    question: "Cuma namazında 'Hutbe'nin hükmü nedir?",
    options: ["Namazın geçerlilik şartıdır (Farz)", "Sünnettir", "Vaciptir", "Müstehaptır"],
    correctAnswer: "Namazın geçerlilik şartıdır (Farz)",
    explanation: "Hutbesiz Cuma namazı sahih (geçerli) olmaz. Cuma namazının sıhhat şartlarındandır."
  },
  {
    id: 'g_h_36',
    difficulty: 'hard',
    points: 30,
    question: "Toprak ürünlerinden (tarım) verilen zekat olan 'Öşür'ün oranı nedir?",
    options: ["Sulama masrafsızsa 1/10, masraflıysa 1/20", "Her durumda 1/40", "Her durumda 1/10", "Yarısı"],
    correctAnswer: "Sulama masrafsızsa 1/10, masraflıysa 1/20",
    explanation: "Yağmur suyuyla yetişenden %10 (1/10), emek ve masrafla sulanandan %5 (1/20) öşür verilir."
  },
  {
    id: 'g_h_37',
    difficulty: 'hard',
    points: 30,
    question: "Kurban Bayramı'nın 1. günü, Hac'da Mina'da yapılan 'Akabe Cemresi'ne (Büyük Şeytan) kaç taş atılır?",
    options: ["7 taş", "21 taş", "40 taş", "3 taş"],
    correctAnswer: "7 taş",
    explanation: "Bayramın birinci günü sadece Büyük Şeytan'a (Akabe Cemresi) 7 taş atılır."
  },
  {
    id: 'g_h_38',
    difficulty: 'hard',
    points: 30,
    question: "Zekat verilebilmesi için malın üzerinden ne kadar süre geçmesi gerekir?",
    options: ["Bir kameri yıl (Havelan-ı Havl)", "Bir ay", "6 ay", "Süre gerekmez"],
    correctAnswer: "Bir kameri yıl (Havelan-ı Havl)",
    explanation: "Nisap miktarı mala sahip olduktan sonra üzerinden bir tam kameri yıl geçmesi gerekir."
  },
  {
    id: 'g_h_39',
    difficulty: 'hard',
    points: 30,
    question: "Hangi ibadet 'Mali ve Bedeni' (Hem mal hem bedenle yapılan) bir ibadettir?",
    options: ["Hac", "Namaz", "Oruç", "Zekat"],
    correctAnswer: "Hac",
    explanation: "Namaz ve oruç bedeni, zekat mali, Hac ise hem mali (masraf) hem bedeni (sağlık) bir ibadettir."
  },
  {
    id: 'g_h_40',
    difficulty: 'hard',
    points: 30,
    question: "Cenaze namazında Fatiha suresi hangi niyetle okunur?",
    options: ["Dua niyetiyle", "Kıraat niyetiyle", "Zikir niyetiyle", "Okunmaz"],
    correctAnswer: "Dua niyetiyle",
    explanation: "Hanefi mezhebinde cenaze namazında kıraat (Kuran okumak) yoktur, Fatiha dua niyetiyle okunur."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - DİNİ GÜNLER VE İBADETLER (40 PUAN)
  // --------------------------------------------------------
  {
    id: 'g_x_1',
    difficulty: 'expert',
    points: 40,
    question: "Hac ibadetinde 'Bedene' ne demektir?",
    options: ["Hacda kesilen deve veya sığır cinsi büyükbaş kurban", "Haccın farzları", "Kabe'nin örtüsü", "Şeytan taşlama yeri"],
    correctAnswer: "Hacda kesilen deve veya sığır cinsi büyükbaş kurban",
    explanation: "Bazı büyük ihlallerde (örneğin Arafat vakfesinden sonra, tıraş olmadan cinsel ilişki) ceza olarak 'Bedene' (büyükbaş) kesmek gerekir."
  },
  {
    id: 'g_x_2',
    difficulty: 'expert',
    points: 40,
    question: "Zekatta 'Rikaz' ne demektir ve zekat oranı nedir?",
    options: ["Define/Madenlerdir, oranı 1/5'tir (%20)", "Ticaret malıdır, 1/40", "Toprak ürünüdür, 1/10", "Hayvan sürüsüdür, 1/40"],
    correctAnswer: "Define/Madenlerdir, oranı 1/5'tir (%20)",
    explanation: "Kendiliğinden veya define olarak bulunan yer altı zenginliklerine Rikaz denir ve beşte biri (humus) zekat olarak verilir."
  },
  {
    id: 'g_x_3',
    difficulty: 'expert',
    points: 40,
    question: "Namazda 'Lahik' kime denir?",
    options: ["İmama baştan yetişip, namazın bir kısmında (uyuklama/abdest bozma vb.) imamdan ayrı kalan kişi", "İmama sonradan uyan", "Namazı tek kılan", "İmamın arkasında duran"],
    correctAnswer: "İmama baştan yetişip, namazın bir kısmında (uyuklama/abdest bozma vb.) imamdan ayrı kalan kişi",
    explanation: "Lahik, namaza imamla başlar, arada bir mazeretle kopar, sonra yetişip (imamla kılıyormuş gibi) kıraatsiz tamamlar."
  },
  {
    id: 'g_x_4',
    difficulty: 'expert',
    points: 40,
    question: "Hangi Hac çeşidinde 'Hady' (Şükür Kurbanı) kesmek vacip DEĞİLDİR?",
    options: ["İfrad Haccı", "Kıran Haccı", "Temettu Haccı", "Hepsi"],
    correctAnswer: "İfrad Haccı",
    explanation: "Sadece Hac niyetiyle yapılan (Umresiz) İfrad haccında kurban kesmek vacip değildir. Kıran ve Temettu'da vaciptir."
  },
  {
    id: 'g_x_5',
    difficulty: 'expert',
    points: 40,
    question: "5 tane devesi olan kişinin zekat olarak ne vermesi gerekir?",
    options: ["1 adet koyun/keçi", "1 adet deve", "Hiçbir şey", "Altın"],
    correctAnswer: "1 adet koyun/keçi",
    explanation: "Devenin zekatı 5 deveye ulaşınca başlar ve 5 deve için 1 koyun verilir."
  },
  {
    id: 'g_x_6',
    difficulty: 'expert',
    points: 40,
    question: "Ramazan hilalini tespit etmede 'İhtilaf-ı Metâli' ne demektir?",
    options: ["Ayın doğuş yerlerinin (görülme zamanının) farklı olması", "Hava bulutlu olması", "Hesaplama hatası", "Takvim farkı"],
    correctAnswer: "Ayın doğuş yerlerinin (görülme zamanının) farklı olması",
    explanation: "Dünyanın yuvarlaklığı nedeniyle hilalin bir ülkede görünüp diğerinde görünmemesi durumudur (Mezheplerin buna itibar edip etmediği tartışmalıdır)."
  },
  {
    id: 'g_x_7',
    difficulty: 'expert',
    points: 40,
    question: "Cuma namazından sonra kılınan 'Zühr-ü Âhir' namazı ne demektir?",
    options: ["Son öğle namazı (O günün öğle namazı ihtiyatı)", "İkindi namazı", "Cumanın sünneti", "Nafile namaz"],
    correctAnswer: "Son öğle namazı (O günün öğle namazı ihtiyatı)",
    explanation: "Cuma namazının şartlarının (şehirde tek camide kılınma vb.) gerçekleşmeme ihtimaline karşı kılınan 'Son Öğle Namazı'dır."
  },
  {
    id: 'g_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Tavaf sırasında erkeklerin omuzlarına aldıkları ihram örtüsünün (Rida) sağ ucunu sağ koltuk altından geçirip sol omza atmalarına (sağ omuzu açmaya) ne denir?",
    options: ["Iztıba", "Remel", "Herwele", "Vakfe"],
    correctAnswer: "Iztıba",
    explanation: "Sadece peşinden sa'y yapılacak tavaflarda (Umre ve Kudum tavafı) sağ omuzu açmaya Iztıba denir."
  },
  {
    id: 'g_x_9',
    difficulty: 'expert',
    points: 40,
    question: "Kurbanlık hayvanın 'Mûsırrat' (Sütlü görünsün diye memesi bağlanmış) olması satışını nasıl etkiler?",
    options: ["Haramdır/Aldatmadır (Muhayyerlik doğurur)", "Caizdir", "Mekruhtur", "Fiyatı artırır"],
    correctAnswer: "Haramdır/Aldatmadır (Muhayyerlik doğurur)",
    explanation: "Hayvanın sütü çok görünsün diye memesini bağlayıp bekletmek 'Tasriye'dir ve aldatma olduğu için haramdır, alıcı iade edebilir."
  },
  {
    id: 'g_x_10',
    difficulty: 'expert',
    points: 40,
    question: "Seferilikte 'Vatan-ı Asli' ne demektir?",
    options: ["Kişinin doğduğu veya evlenip yerleştiği, kalıcı yaşadığı yer", "15 günden az kaldığı yer", "Yolculuk yaptığı yer", "İş yeri"],
    correctAnswer: "Kişinin doğduğu veya evlenip yerleştiği, kalıcı yaşadığı yer",
    explanation: "Vatan-ı Asli, kişinin kalıcı ikametgahıdır. Vatan-ı İkame (geçici yerleşme) ve Vatan-ı Sükna (yolculuk hali) ile değişmez."
  },
  {
    id: 'g_x_11',
    difficulty: 'expert',
    points: 40,
    question: "Hac ibadetinde 'Tavaf-ı Kudûm'un hükmü nedir (Afakîler/Dışarıdan gelenler için)?",
    options: ["Sünnet", "Farz", "Vacip", "Müstehap"],
    correctAnswer: "Sünnet",
    explanation: "Mekke dışından gelenlerin (Afakî) Kabe'ye ilk vardıklarında yaptıkları 'Hoşgeldin/Selamlama' tavafı sünnettir."
  },
  {
    id: 'g_x_12',
    difficulty: 'expert',
    points: 40,
    question: "Hangi durumda namazda 'Sehiv Secdesi' yapmak bile namazı kurtarmaz, iade gerekir?",
    options: ["Farzı terk edince", "Vacibi terk edince", "Sünneti terk edince", "Duayı unutunca"],
    correctAnswer: "Farzı terk edince",
    explanation: "Namazın rükunlarından (farzlarından) biri terk edilirse namaz bozulur, sehiv secdesi ile düzelmez, yeniden kılınmalıdır."
  },
  {
    id: 'g_x_13',
    difficulty: 'expert',
    points: 40,
    question: "Şaban ayının 30. gününe (Ramazan mı değil mi şüphesi olan güne) ne denir ve o gün oruç tutulur mu?",
    options: ["Yevm-i Şekk (Şüpheli Gün) / Nafile niyetiyle tutulabilir ama Ramazan diye tutulmaz", "Arefe / Tutulur", "Kandil / Tutulmaz", "Bayram / Haramdır"],
    correctAnswer: "Yevm-i Şekk (Şüpheli Gün) / Nafile niyetiyle tutulabilir ama Ramazan diye tutulmaz",
    explanation: "Hilal görülmediği için Şaban'ın 30'a tamamlandığı gündür. 'Ramazan ise farz, değilse nafile' diye niyet etmek mekruhtur."
  },
  {
    id: 'g_x_14',
    difficulty: 'expert',
    points: 40,
    question: "Koyun ve keçide zekat nisabı (sayısı) 40 ile başlar. 121'e kadar kaç koyun verilir?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "1",
    explanation: "40'tan 120'ye kadar 1 koyun, 121 olunca 2 koyun, 201 olunca 3 koyun verilir."
  },
  {
    id: 'g_x_15',
    difficulty: 'expert',
    points: 40,
    question: "Hacda 'Sa'y' yaparken iki yeşil direk arasında erkeklerin hızlı ve çalımlı yürümesine ne denir?",
    options: ["Herwele", "Remel", "Iztıba", "Vakfe"],
    correctAnswer: "Herwele",
    explanation: "Sa'y sırasında (Merve ve Safa arası düzlükte) canlı yürümeye Herwele denir. (Tavaftaki hızlı yürüyüşe Remel denir)."
  },
  {
    id: 'g_x_16',
    difficulty: 'expert',
    points: 40,
    question: "İmama rükudan kalktıktan sonra (secde veya teşehhüdde) yetişen kişinin durumu nedir?",
    options: ["O rekatı kaçırmıştır, imam selam verince kalkıp tamamlar", "O rekatı kılmış sayılır", "Namazı olmaz", "Bekler"],
    correctAnswer: "O rekatı kaçırmıştır, imam selam verince kalkıp tamamlar",
    explanation: "Rükuya yetişemeyen o rekatı kaçırmış sayılır (Mesbuk olur), imam selam verince kalkıp kaçırdığı rekatları kılar."
  },
  {
    id: 'g_x_17',
    difficulty: 'expert',
    points: 40,
    question: "Kurban kesiminde 'Eyyam-ı Nahr' (Kesim Günleri) hangi günlerdir?",
    options: ["Bayramın 1, 2 ve 3. günleri (İmam Azam'a göre)", "Sadece 1. gün", "4 gün boyunca", "Arefe ve Bayram"],
    correctAnswer: "Bayramın 1, 2 ve 3. günleri (İmam Azam'a göre)",
    explanation: "Hanefi mezhebine göre kurban bayramın 3. günü akşam ezanına kadar kesilebilir. (Şafii'de 4. gün de kesilebilir)."
  },
  {
    id: 'g_x_18',
    difficulty: 'expert',
    points: 40,
    question: "Haccın farzı olan 'Ziyaret Tavafı'nın (İfada Tavafı) vakti ne zaman başlar?",
    options: ["Bayramın 1. günü fecr-i sadık (sabah namazı vakti) ile", "Arefe günü", "Mina'dan dönünce", "İhrama girince"],
    correctAnswer: "Bayramın 1. günü fecr-i sadık (sabah namazı vakti) ile",
    explanation: "Ziyaret tavafı, Arafat vakfesinden sonra, bayramın ilk günü şafak sökmesiyle geçerli olmaya başlar."
  },
  {
    id: 'g_x_19',
    difficulty: 'expert',
    points: 40,
    question: "Namazda 'Ta'dil-i Erkan'ın (hareketleri sakin ve tam yapmanın) hükmü Ebu Yusuf ve İmam Muhammed'e (ve diğer 3 mezhebe) göre nedir?",
    options: ["Farz", "Vacip", "Sünnet", "Müstehap"],
    correctAnswer: "Farz",
    explanation: "İmam-ı Azam 'Vacip' derken, talebeleri (İmameyn) ve diğer mezhepler Ta'dil-i Erkan'ı namazın rüknü (farzı) sayar."
  },
  {
    id: 'g_x_20',
    difficulty: 'expert',
    points: 40,
    question: "Zekatta 'Havaic-i Asliye' (Asli İhtiyaçlar) neleri kapsar ve zekata tabi midir?",
    options: ["Ev, araba, ev eşyası, meslek aletleri (Zekata tabi değildir)", "Ticaret malları (Tabidir)", "Yatırım amaçlı arsalar (Tabidir)", "Banka hesabı (Tabidir)"],
    correctAnswer: "Ev, araba, ev eşyası, meslek aletleri (Zekata tabi değildir)",
    explanation: "Kişinin temel ihtiyaçları (oturulan ev, binek, aletler) zenginlik hesabına (nisaba) katılmaz ve zekatı verilmez."
  },
  {
    id: 'g_x_21',
    difficulty: 'expert',
    points: 40,
    question: "Hacda Müzdelife Vakfesinin hükmü nedir?",
    options: ["Vacip", "Farz", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "Arafat vakfesi farz, Müzdelife vakfesi ise vaciptir (Mazeretsiz terk edilirse ceza/dem gerekir)."
  },
  {
    id: 'g_x_22',
    difficulty: 'expert',
    points: 40,
    question: "Hanefi mezhebine göre 'Tilavet Secdesi'nin hükmü nedir?",
    options: ["Vacip", "Farz", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "Secde ayetini okuyan veya dinleyen her mükellefe tilavet secdesi yapmak vaciptir."
  },
  {
    id: 'g_x_23',
    difficulty: 'expert',
    points: 40,
    question: "Bir kimse 'Benim malım nisaba ulaşınca zekat vereceğim' dese, ancak yıl dolmadan malı helak olsa zekat gerekir mi?",
    options: ["Gerekmez (Çünkü havl/yıl dolmamıştır)", "Gerekir", "Yarısını verir", "Kaza eder"],
    correctAnswer: "Gerekmez (Çünkü havl/yıl dolmamıştır)",
    explanation: "Zekatın farz olması için malın üzerinden 1 yıl (Havelan-ı Havl) geçmesi şarttır. Yıl dolmadan yok olan mala zekat düşmez."
  },
  {
    id: 'g_x_24',
    difficulty: 'expert',
    points: 40,
    question: "Oruçlu iken 'Hacamat' yaptırmanın hükmü nedir (Hanefi'ye göre)?",
    options: ["Orucu bozmaz (Ancak zayıf düşürecekse mekruhtur)", "Orucu bozar", "Kaza gerektirir", "Kefaret gerektirir"],
    correctAnswer: "Orucu bozmaz (Ancak zayıf düşürecekse mekruhtur)",
    explanation: "Kan vermek veya hacamat yaptırmak orucu bozmaz. Vücuda bir şey girmemiş, çıkmıştır."
  },
  {
    id: 'g_x_25',
    difficulty: 'expert',
    points: 40,
    question: "Hacda 'Harem Bölgesinin' bitkilerini koparmanın veya av hayvanlarını avlamanın cezası nedir?",
    options: ["Ceza (Kurban veya bedel) ödenir", "Hac bozulur", "Bir şey gerekmez", "Oruç tutulur"],
    correctAnswer: "Ceza (Kurban veya bedel) ödenir",
    explanation: "Harem sınırları içinde (ihramlı olsun olmasın) canlılara ve bitkilere zarar vermek yasaktır, tazminat gerektirir."
  },
  {
    id: 'g_x_26',
    difficulty: 'expert',
    points: 40,
    question: "Bayram namazında 'Hutbe'nin hükmü ve zamanı nasıldır?",
    options: ["Sünnettir, namazdan sonra okunur", "Farzdır, namazdan önce okunur", "Vaciptir, namazdan sonra", "Şarttır, namazdan önce"],
    correctAnswer: "Sünnettir, namazdan sonra okunur",
    explanation: "Cuma hutbesi farz ve namazdan öncedir. Bayram hutbesi ise sünnet olup namazdan sonra okunur."
  },
  {
    id: 'g_x_27',
    difficulty: 'expert',
    points: 40,
    question: "Seferilikte 'Kısalan namazı' (Kasr) bilerek 4 rekat kılan kişinin durumu nedir?",
    options: ["Namazı geçerlidir ama mekruhtur (son 2 rekat nafile sayılır, sehiv secdesi gerekir)", "Namazı bozulur", "Daha çok sevap alır", "Bir şey gerekmez"],
    correctAnswer: "Namazı geçerlidir ama mekruhtur (son 2 rekat nafile sayılır, sehiv secdesi gerekir)",
    explanation: "İlk oturuşu yaptıysa farzı tamamlamış olur, kalanı nafile olur ama vacibi (selamı) geciktirdiği için sehiv gerekir ve mekruhtur."
  },
  {
    id: 'g_x_28',
    difficulty: 'expert',
    points: 40,
    question: "Ticaret mallarının zekatı hesaplanırken hangi değer esas alınır?",
    options: ["Güncel piyasa değeri (Satış fiyatı)", "Alış fiyatı", "Maliyet fiyatı", "Devletin belirlediği fiyat"],
    correctAnswer: "Güncel piyasa değeri (Satış fiyatı)",
    explanation: "Fukahanın çoğunluğuna göre, zekat ödeme günündeki güncel piyasa değeri üzerinden hesaplanır."
  },
  {
    id: 'g_x_29',
    difficulty: 'expert',
    points: 40,
    question: "Hacda 'Veda Tavafı'nın hükmü nedir (Afakîler için)?",
    options: ["Vacip", "Farz", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "Mekke dışından gelenlerin dönerken yapması gereken son tavaf (Veda Tavafı) vaciptir."
  },
  {
    id: 'g_x_30',
    difficulty: 'expert',
    points: 40,
    question: "Yolculukta (Seferilikte) oruç tutmanın hükmü nedir?",
    options: ["Tutmak veya tutmamak serbesttir (Güç yetiyorsa tutmak efdaldir)", "Tutmak haramdır", "Tutmak farzdır (Kazaya bırakamaz)", "Mekruhtur"],
    correctAnswer: "Tutmak veya tutmamak serbesttir (Güç yetiyorsa tutmak efdaldir)",
    explanation: "Seferilik oruç tutmamak için bir ruhsattır. Ancak zorluk yoksa tutmak daha hayırlıdır (Bakara 184)."
  },
  {
    id: 'g_x_31',
    difficulty: 'expert',
    points: 40,
    question: "Namazda 'İmama Uymaya Niyet' (İktida) en geç ne zaman yapılmalıdır?",
    options: ["İftitah tekbiriyle veya namaz bitmeden önce herhangi bir anda (imama uyma niyeti şarttır)", "Namazdan sonra", "Sadece Fatiha'da", "Rükuda"],
    correctAnswer: "İftitah tekbiriyle veya namaz bitmeden önce herhangi bir anda (imama uyma niyeti şarttır)",
    explanation: "Cemaatle kılınan namazda, imama uyduğuna niyet etmek şarttır. Bu niyet namazın başında veya esnasında yapılabilir (mezheplere göre detaylar değişir ama niyet şarttır)."
  },
  {
    id: 'g_x_32',
    difficulty: 'expert',
    points: 40,
    question: "Sadaka-i Fıtır (Fitre) kimin adına verilmez?",
    options: ["Anne karnındaki bebek", "Küçük çocuk", "Akıl hastası çocuk", "Hizmetçi"],
    correctAnswer: "Anne karnındaki bebek",
    explanation: "Bayram namazından önce doğan bebek için verilir ama anne karnındaki bebek için fitre vacip değildir."
  },
  {
    id: 'g_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Hacda 'Halk' (Saçları kazıtmak) veya 'Taksir' (Kısaltmak) ne zaman yapılır?",
    options: ["Bayramın 1. günü, Akabe cemresine taş atıp kurban kestikten sonra", "Arafat'tan inince", "Tavaftan önce", "İhrama girerken"],
    correctAnswer: "Bayramın 1. günü, Akabe cemresine taş atıp kurban kestikten sonra",
    explanation: "Sıralama (Tertip) Hanefi'de vaciptir: 1. Taş atma, 2. Kurban (varsa), 3. Tıraş."
  },
  {
    id: 'g_x_34',
    difficulty: 'expert',
    points: 40,
    question: "Şafii mezhebine göre 'Kurban Kesmek' hükmü nedir?",
    options: ["Sünnet-i Müekkede", "Vacip", "Farz", "Müstehap"],
    correctAnswer: "Sünnet-i Müekkede",
    explanation: "Hanefilerde vacip olan kurban, Şafii ve diğer mezheplerde kuvvetli sünnettir."
  },
  {
    id: 'g_x_35',
    difficulty: 'expert',
    points: 40,
    question: "Hasta namazını ima ile (baş işaretiyle) dahi kılamayacak duruma gelirse (baygınlık hariç) ne yapar?",
    options: ["Namazı kazaya kalır (Veya düşer tartışması)", "Gözleriyle kılar", "Kalbiyle kılar", "Başkası onun yerine kılar"],
    correctAnswer: "Namazı kazaya kalır (Veya düşer tartışması)",
    explanation: "Hanefi mezhebinde başı ile ima edemeyen kişiden namaz düşer veya iyileşince kaza eder (Göz/Kalp ile ima geçerli değildir)."
  },
  {
    id: 'g_x_36',
    difficulty: 'expert',
    points: 40,
    question: "'Öşür' (Toprak mahsulleri zekatı) verilirken 'Nisap' (Alt sınır) şartı var mıdır?",
    options: ["İmam-ı Azam'a göre yoktur, az-çok her üründen verilir", "Vardır (5 vesk)", "Sadece buğdayda vardır", "Zenginseniz vardır"],
    correctAnswer: "İmam-ı Azam'a göre yoktur, az-çok her üründen verilir",
    explanation: "Ebu Hanife'ye göre 'Toprağın bitirdiği her şeyde zekat vardır', nisap aranmaz. İmameyn'e göre ise nisap (5 vesk/yaklaşık 650 kg) şarttır."
  },
  {
    id: 'g_x_37',
    difficulty: 'expert',
    points: 40,
    question: "Hacda 'Say' ibadetini yapmanın hükmü Hanefi mezhebine göre nedir?",
    options: ["Vacip", "Farz (Rükun)", "Sünnet", "Müstehap"],
    correctAnswer: "Vacip",
    explanation: "Diğer 3 mezhepte Sa'y haccın rüknü (farzı) iken, Hanefi mezhebinde vaciptir (Terk edilirse ceza gerekir ama hac bozulmaz)."
  },
  {
    id: 'g_x_38',
    difficulty: 'expert',
    points: 40,
    question: "Nafile oruca (örneğin Pazartesi orucu) niyetlenip bozan kişinin durumu nedir?",
    options: ["Kaza etmesi vaciptir", "Bir şey gerekmez", "Kefaret gerekir", "Günahkar olur"],
    correctAnswer: "Kaza etmesi vaciptir",
    explanation: "Başlanmış bir ibadeti tamamlamak vaciptir. Nafile bile olsa, bozulursa kaza edilmesi gerekir (Hanefi)."
  },
  {
    id: 'g_x_39',
    difficulty: 'expert',
    points: 40,
    question: "Cuma namazını kaçıran kişi ne kılar?",
    options: ["Öğle namazı", "Cuma kazası", "İkindi namazı", "Nafile"],
    correctAnswer: "Öğle namazı",
    explanation: "Cuma namazının kazası olmaz, kaçıran kişi o günün öğle namazını kılar."
  },
  {
    id: 'g_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Arefe günü sabah namazından, bayramın 4. günü ikindi namazına kadar farz namazlardan sonra alınan tekbirlere ne denir?",
    options: ["Teşrik Tekbirleri", "İftitah Tekbiri", "Zevaid Tekbiri", "Bayram Tekbiri"],
    correctAnswer: "Teşrik Tekbirleri",
    explanation: "Toplam 23 vakit namazın farzından sonra 'Allahu Ekber Allahu Ekber...' demek vaciptir."
  }
    ]
  },
  kavramlar: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-40) - DİNİ KAVRAMLAR (10 PUAN)
  // --------------------------------------------------------
  {
    id: 'kavram_e_1',
    difficulty: 'easy',
    points: 10,
    question: "Alemleri yaratan yüce yaratıcının özel ismi nedir?",
    options: ["Allah", "Peygamber", "Melek", "Halife"],
    correctAnswer: "Allah",
    explanation: "Kainatı yoktan var eden ve idare eden tek yaratıcının özel ismi Allah'tır."
  },
  {
    id: 'kavram_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın emir ve yasaklarını insanlara bildiren elçilere ne denir?",
    options: ["Veli", "Peygamber", "Alim", "Hafız"],
    correctAnswer: "Peygamber",
    explanation: "Allah ile kulları arasında elçilik yapan seçilmiş insanlara Peygamber denir."
  },
  {
    id: 'kavram_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Son ilahi kitap hangisidir?",
    options: ["Tevrat", "Zebur", "İncil", "Kuran-ı Kerim"],
    correctAnswer: "Kuran-ı Kerim",
    explanation: "Hz. Muhammed'e (s.a.v) indirilen ve kıyamete kadar geçerli olan son kitap Kuran-ı Kerim'dir."
  },
  {
    id: 'kavram_e_4',
    difficulty: 'easy',
    points: 10,
    question: "İslam dininin şartı kaçtır?",
    options: ["3", "5", "6", "10"],
    correctAnswer: "5",
    explanation: "İslam'ın şartı beştir: Şehadet etmek, Namaz kılmak, Oruç tutmak, Zekat vermek, Hacca gitmek."
  },
  {
    id: 'kavram_e_5',
    difficulty: 'easy',
    points: 10,
    question: "İmanın şartı kaçtır?",
    options: ["5", "6", "7", "12"],
    correctAnswer: "6",
    explanation: "İmanın şartı altıdır (Allah'a, Meleklerine, Kitaplarına, Peygamberlerine, Ahirete, Kadere inanmak)."
  },
  {
    id: 'kavram_e_6',
    difficulty: 'easy',
    points: 10,
    question: "Namaz vaktinin girdiğini bildirmek için camiden okunan çağrıya ne denir?",
    options: ["Sela", "Ezan", "Kamet", "Tekbir"],
    correctAnswer: "Ezan",
    explanation: "Müslümanları namaza çağırmak için günde 5 vakit okunan sözlere Ezan denir."
  },
  {
    id: 'kavram_e_7',
    difficulty: 'easy',
    points: 10,
    question: "Ezanı okuyan kişiye ne denir?",
    options: ["İmam", "Müezzin", "Hatip", "Vaiz"],
    correctAnswer: "Müezzin",
    explanation: "Ezanı güzel bir sesle okumakla görevli kişiye Müezzin denir."
  },
  {
    id: 'kavram_e_8',
    difficulty: 'easy',
    points: 10,
    question: "Namaz kıldırılan ibadethaneye ne ad verilir?",
    options: ["Okul", "Cami / Mescit", "Tekke", "Türbe"],
    correctAnswer: "Cami / Mescit",
    explanation: "Müslümanların toplu halde ibadet ettikleri yere Cami veya Mescit denir."
  },
  {
    id: 'kavram_e_9',
    difficulty: 'easy',
    points: 10,
    question: "Namaza başlamadan önce su ile yapılan temizliğe ne denir?",
    options: ["Banyo", "Abdest", "Yıkama", "Duş"],
    correctAnswer: "Abdest",
    explanation: "Namazın şartlarından biri olan ve belli organları yıkamak suretiyle yapılan temizliğe Abdest denir."
  },
  {
    id: 'kavram_e_10',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın yapılmasını kesin olarak emrettiği işlere ne denir?",
    options: ["Sünnet", "Farz", "Vacip", "Nafile"],
    correctAnswer: "Farz",
    explanation: "Namaz kılmak, oruç tutmak gibi yapılması kesin emir olan ibadetlere Farz denir."
  },
  {
    id: 'kavram_e_11',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın yasakladığı iş ve davranışlara ne denir?",
    options: ["Helal", "Haram", "Mübah", "Sevap"],
    correctAnswer: "Haram",
    explanation: "İçki içmek, yalan söylemek gibi dinen yasaklanmış işlere Haram denir."
  },
  {
    id: 'kavram_e_12',
    difficulty: 'easy',
    points: 10,
    question: "Dinen yapılması serbest olan (yasak olmayan) şeylere ne denir?",
    options: ["Haram", "Helal", "Mekruh", "Günah"],
    correctAnswer: "Helal",
    explanation: "Allah'ın izin verdiği, yenilip içilmesi veya yapılması serbest olan şeylere Helal denir."
  },
  {
    id: 'kavram_e_13',
    difficulty: 'easy',
    points: 10,
    question: "İyi işler karşılığında Allah'ın vereceği ödüle ne denir?",
    options: ["Günah", "Sevap", "Ceza", "Hata"],
    correctAnswer: "Sevap",
    explanation: "Hayırlı işler yapanların ahirette göreceği karşılığa Sevap denir."
  },
  {
    id: 'kavram_e_14',
    difficulty: 'easy',
    points: 10,
    question: "Dinin emirlerine uymayanların kazandığı cezaya ne denir?",
    options: ["Sevap", "Günah", "İyilik", "Hayır"],
    correctAnswer: "Günah",
    explanation: "Allah'ın yasaklarını çiğneyenlerin işlediği suça Günah denir."
  },
  {
    id: 'kavram_e_15',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların kıblesi olan, Mekke'deki kutsal yapı hangisidir?",
    options: ["Mescid-i Nebevi", "Kabe", "Mescid-i Aksa", "Kudüs"],
    correctAnswer: "Kabe",
    explanation: "Allah'ın evi (Beytullah) kabul edilen ve namazda yöneldiğimiz yapı Kabe'dir."
  },
  {
    id: 'kavram_e_16',
    difficulty: 'easy',
    points: 10,
    question: "Her işe başlarken söylediğimiz 'Bismillahirrahmanirrahim' sözüne ne denir?",
    options: ["Besmele", "Hamdele", "Salevât", "Tekbir"],
    correctAnswer: "Besmele",
    explanation: "Rahman ve Rahim olan Allah'ın adıyla başlamaya Besmele çekmek denir."
  },
  {
    id: 'kavram_e_17',
    difficulty: 'easy',
    points: 10,
    question: "Camide namaz kıldıran kişiye ne denir?",
    options: ["Müezzin", "İmam", "Kayyım", "Muhtar"],
    correctAnswer: "İmam",
    explanation: "Cemaatin önüne geçip namazı kıldıran öndere İmam denir."
  },
  {
    id: 'kavram_e_18',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimize vahiy getiren meleğin adı nedir?",
    options: ["Azrail", "Mikail", "İsrafil", "Cebrail"],
    correctAnswer: "Cebrail",
    explanation: "Allah'tan aldığı vahyi peygamberlere ileten melek Cebrail'dir (a.s)."
  },
  {
    id: 'kavram_e_19',
    difficulty: 'easy',
    points: 10,
    question: "Kıyamet koptuktan sonra insanların yeniden dirilip yaşayacağı sonsuz hayata ne denir?",
    options: ["Dünya", "Ahiret", "Berzah", "Rüya"],
    correctAnswer: "Ahiret",
    explanation: "Dünya hayatından sonraki sonsuz yaşama Ahiret denir."
  },
  {
    id: 'kavram_e_20',
    difficulty: 'easy',
    points: 10,
    question: "İyilik yapan müminlerin gideceği, nimetlerle dolu yere ne denir?",
    options: ["Cehennem", "Cennet", "Araf", "Mahşer"],
    correctAnswer: "Cennet",
    explanation: "Allah'ın mümin kulları için hazırladığı mutluluk yurduna Cennet denir."
  },
  {
    id: 'kavram_e_21',
    difficulty: 'easy',
    points: 10,
    question: "Kafirlerin ve günahkarların cezalandırılacağı yere ne denir?",
    options: ["Cennet", "Cehennem", "Sırat", "Kevser"],
    correctAnswer: "Cehennem",
    explanation: "İnkar edenlerin ve isyankarların gideceği azap yurduna Cehennem denir."
  },
  {
    id: 'kavram_e_22',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan ayında güneş doğmadan önce yenen yemeğe ne denir?",
    options: ["İftar", "Sahur", "Akşam yemeği", "Kahvaltı"],
    correctAnswer: "Sahur",
    explanation: "Oruç tutmak için gece kalkıp yenen yemeğe Sahur denir."
  },
  {
    id: 'kavram_e_23',
    difficulty: 'easy',
    points: 10,
    question: "Ramazan ayında akşam ezanıyla orucun açılmasına ne denir?",
    options: ["Sahur", "İftar", "İmsak", "Niyet"],
    correctAnswer: "İftar",
    explanation: "Günün sonunda orucun bitirilip yemek yenmesine İftar denir."
  },
  {
    id: 'kavram_e_24',
    difficulty: 'easy',
    points: 10,
    question: "Zengin Müslümanların yılda bir kez malının belli bir kısmını fakirlere vermesine ne denir?",
    options: ["Hac", "Zekat", "Oruç", "Namaz"],
    correctAnswer: "Zekat",
    explanation: "İslam'ın 5 şartından biri olan Zekat, mal ile yapılan bir ibadettir."
  },
  {
    id: 'kavram_e_25',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın bir olduğunu kabul edip Hz. Muhammed'in (s.a.v) peygamberliğini tasdik etmeye ne denir?",
    options: ["Kelime-i Şehadet", "Besmele", "Tekbir", "Selam"],
    correctAnswer: "Kelime-i Şehadet",
    explanation: "'Eşhedü en la ilahe illallah ve eşhedü enne Muhammeden abduhu ve resuluh' demektir."
  },
  {
    id: 'kavram_e_26',
    difficulty: 'easy',
    points: 10,
    question: "İlk insan ve ilk peygamber kimdir?",
    options: ["Hz. Muhammed", "Hz. İsa", "Hz. Adem", "Hz. Nuh"],
    correctAnswer: "Hz. Adem",
    explanation: "Allah'ın yarattığı ilk insan ve gönderdiği ilk peygamber Hz. Adem'dir (a.s)."
  },
  {
    id: 'kavram_e_27',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların kutsal kitabının adı nedir?",
    options: ["Tevrat", "İncil", "Zebur", "Kuran-ı Kerim"],
    correctAnswer: "Kuran-ı Kerim",
    explanation: "Son ilahi kitap Kuran-ı Kerim'dir."
  },
  {
    id: 'kavram_e_28',
    difficulty: 'easy',
    points: 10,
    question: "Hz. Musa'ya indirilen kutsal kitap hangisidir?",
    options: ["İncil", "Tevrat", "Zebur", "Kuran"],
    correctAnswer: "Tevrat",
    explanation: "İlahi kitaplardan Tevrat, Hz. Musa'ya (a.s) indirilmiştir."
  },
  {
    id: 'kavram_e_29',
    difficulty: 'easy',
    points: 10,
    question: "Hz. İsa'ya indirilen kutsal kitap hangisidir?",
    options: ["Tevrat", "İncil", "Zebur", "Kuran"],
    correctAnswer: "İncil",
    explanation: "İlahi kitaplardan İncil, Hz. İsa'ya (a.s) indirilmiştir."
  },
  {
    id: 'kavram_e_30',
    difficulty: 'easy',
    points: 10,
    question: "Hz. Davud'a indirilen kutsal kitap hangisidir?",
    options: ["Tevrat", "İncil", "Zebur", "Kuran"],
    correctAnswer: "Zebur",
    explanation: "İlahi kitaplardan Zebur, Hz. Davud'a (a.s) indirilmiştir."
  },
  {
    id: 'kavram_e_31',
    difficulty: 'easy',
    points: 10,
    question: "Namaz kılarken dönülen yöne ne denir?",
    options: ["Kıble", "Doğu", "Batı", "Kuzey"],
    correctAnswer: "Kıble",
    explanation: "Müslümanlar namazda Kabe'nin bulunduğu yön olan Kıble'ye dönerler."
  },
  {
    id: 'kavram_e_32',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın her şeyi önceden bilmesi ve takdir etmesine ne denir?",
    options: ["Kader", "Kaza", "Şans", "Tesadüf"],
    correctAnswer: "Kader",
    explanation: "İmanın şartlarından biri olan Kader, her şeyin Allah'ın bilgisi ve planı dahilinde olmasıdır."
  },
  {
    id: 'kavram_e_33',
    difficulty: 'easy',
    points: 10,
    question: "Günah işleyen birinin pişman olup Allah'tan af dilemesine ne denir?",
    options: ["İsyan", "Tövbe", "İnkar", "Kibir"],
    correctAnswer: "Tövbe",
    explanation: "Hatadan dönüp Allah'a yönelmeye Tövbe (İstiğfar) denir."
  },
  {
    id: 'kavram_e_34',
    difficulty: 'easy',
    points: 10,
    question: "Hac ibadeti sırasında Mekke'deki kutsal Kabe'nin etrafında dönmeye ne denir?",
    options: ["Namaz", "Tavaf", "Oruç", "Zekat"],
    correctAnswer: "Tavaf",
    explanation: "Kabe'nin etrafında 7 kere dönerek yapılan ibadete Tavaf denir."
  },
  {
    id: 'kavram_e_35',
    difficulty: 'easy',
    points: 10,
    question: "Müslümanların birbirine sağlık ve esenlik dilemek için söyledikleri söz nedir?",
    options: ["Selamün Aleyküm", "Hoşçakal", "Güle güle", "Bye bye"],
    correctAnswer: "Selamün Aleyküm",
    explanation: "İslam'ın parolası olan selam, 'Allah'ın selamı üzerine olsun' demektir."
  },
  {
    id: 'kavram_e_36',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın en büyük olduğunu ifade eden 'Allahu Ekber' sözüne ne denir?",
    options: ["Tekbir", "Tehlil", "Tesbih", "Tahmid"],
    correctAnswer: "Tekbir",
    explanation: "Namazda, ezanda ve kurbanda söylenen 'Allahu Ekber' sözüne Tekbir denir."
  },
  {
    id: 'kavram_e_37',
    difficulty: 'easy',
    points: 10,
    question: "Kabe'nin yanında bulunan kutsal suyun adı nedir?",
    options: ["Fırat", "Nil", "Zemzem", "Kevser"],
    correctAnswer: "Zemzem",
    explanation: "Hz. Hacer ve oğlu İsmail'e Allah'ın ikramı olan şifalı suya Zemzem denir."
  },
  {
    id: 'kavram_e_38',
    difficulty: 'easy',
    points: 10,
    question: "Peygamber Efendimizin (s.a.v) söz ve davranışlarına ne denir?",
    options: ["Farz", "Sünnet", "Ayet", "Sure"],
    correctAnswer: "Sünnet",
    explanation: "Peygamberimizin yaptığı ve bize tavsiye ettiği güzel davranışlara Sünnet denir."
  },
  {
    id: 'kavram_e_39',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın varlığına ve birliğine inanmayan kişiye ne denir?",
    options: ["Mümin", "Müslüman", "Kafir (İnkarcı)", "Hafız"],
    correctAnswer: "Kafir (İnkarcı)",
    explanation: "Dini gerçekleri inkar eden ve inanmayan kimseye Kafir denir."
  },
  {
    id: 'kavram_e_40',
    difficulty: 'easy',
    points: 10,
    question: "İnandığı halde inanmıyormuş gibi yapan ikiyüzlü kimseye ne denir?",
    options: ["Münafık", "Müşrik", "Mümin", "Veli"],
    correctAnswer: "Münafık",
    explanation: "İçi başka dışı başka olan, Müslüman görünen ama kalben inanmayan kişiye Münafık denir."
  },
  // --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - DİNİ KAVRAMLAR (20 PUAN)
  // --------------------------------------------------------
  {
    id: 'kavram_m_1',
    difficulty: 'medium',
    points: 20,
    question: "İnsanın sağında ve solunda bulunup, iyilik ve kötülüklerini yazan meleklere ne denir?",
    options: ["Münker ve Nekir", "Kiramen Katibin", "Hafaza Melekleri", "Rıdvan ve Malik"],
    correctAnswer: "Kiramen Katibin",
    explanation: "Kiramen Katibin (Şerefli Yazıcılar), insanın amellerini kaydetmekle görevli meleklerdir."
  },
  {
    id: 'kavram_m_2',
    difficulty: 'medium',
    points: 20,
    question: "Öldükten sonra kabirde insanı sorguya çekecek olan melekler kimlerdir?",
    options: ["Cebrail ve Mikail", "Kiramen Katibin", "Münker ve Nekir", "İsrafil ve Azrail"],
    correctAnswer: "Münker ve Nekir",
    explanation: "Kabirde 'Rabbin kim, Dinin ne?' diye soracak sorgu melekleri Münker ve Nekir'dir."
  },
  {
    id: 'kavram_m_3',
    difficulty: 'medium',
    points: 20,
    question: "Allah'ın (c.c.) birliğine, eşi ve benzeri olmadığına inanmaya ne denir?",
    options: ["Tevhid", "Şirk", "İhlas", "Takva"],
    correctAnswer: "Tevhid",
    explanation: "İslam'ın temeli olan Tevhid, Allah'ı birlemek ve O'ndan başka ilah tanımamaktır."
  },
  {
    id: 'kavram_m_4',
    difficulty: 'medium',
    points: 20,
    question: "Allah'a ortak koşmaya, O'ndan başka varlıklara ilahlık yakıştırmaya ne denir?",
    options: ["Küfür", "Şirk", "Nifak", "Fısk"],
    correctAnswer: "Şirk",
    explanation: "Allah'ın affetmeyeceğini bildirdiği en büyük günah Şirk'tir (Ortak koşmak)."
  },
  {
    id: 'kavram_m_5',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberlerin, Allah'ın izniyle gösterdikleri olağanüstü olaylara ne denir?",
    options: ["Sihir", "Keramet", "Mucize", "İstidraç"],
    correctAnswer: "Mucize",
    explanation: "Peygamberliğini ispat etmek için sadece peygamberlerin gösterdiği olaylara Mucize denir."
  },
  {
    id: 'kavram_m_6',
    difficulty: 'medium',
    points: 20,
    question: "Ölümle başlayıp kıyamete kadar sürecek olan kabir hayatına ne ad verilir?",
    options: ["Mahşer", "Berzah", "Sırat", "Araf"],
    correctAnswer: "Berzah",
    explanation: "Dünya ile ahiret arasındaki bekleme salonu/geçiş alemi olan kabir hayatına Berzah Alemi denir."
  },
  {
    id: 'kavram_m_7',
    difficulty: 'medium',
    points: 20,
    question: "Dört büyük kitap dışında bazı peygamberlere gönderilen küçük kitapçıklara (sayfalar) ne denir?",
    options: ["Suhuf", "Risale", "Mektup", "Ferman"],
    correctAnswer: "Suhuf",
    explanation: "Hz. Adem, Hz. Şit, Hz. İdris ve Hz. İbrahim'e indirilen sayfalara Suhuf denir."
  },
  {
    id: 'kavram_m_8',
    difficulty: 'medium',
    points: 20,
    question: "Su bulunmadığı zaman toprakla yapılan temsili temizliğe ne denir?",
    options: ["Gusül", "Teyemmüm", "Mesh", "İstibra"],
    correctAnswer: "Teyemmüm",
    explanation: "Su yokluğunda veya hastalık durumunda toprakla alınan abdeste Teyemmüm denir."
  },
  {
    id: 'kavram_m_9',
    difficulty: 'medium',
    points: 20,
    question: "Camide imamın namaz kıldırdığı, kıble yönündeki oyuk girintiye ne denir?",
    options: ["Minber", "Kürsü", "Mihrab", "Minare"],
    correctAnswer: "Mihrab",
    explanation: "İmamın namaz kıldırırken durduğu yere Mihrab denir."
  },
  {
    id: 'kavram_m_10',
    difficulty: 'medium',
    points: 20,
    question: "Camide imamın Cuma ve Bayram hutbesini okumak için çıktığı merdivenli yere ne denir?",
    options: ["Mihrab", "Minber", "Mahfil", "Şadırvan"],
    correctAnswer: "Minber",
    explanation: "Hutbe okunan yüksek yere Minber denir."
  },
  {
    id: 'kavram_m_11',
    difficulty: 'medium',
    points: 20,
    question: "Kıyamet günü insanların sevap ve günahlarının tartılacağı manevi teraziye ne denir?",
    options: ["Sırat", "Mizan", "Amel Defteri", "Mahşer"],
    correctAnswer: "Mizan",
    explanation: "Ahirette amellerin tartıldığı adalet terazisine Mizan denir."
  },
  {
    id: 'kavram_m_12',
    difficulty: 'medium',
    points: 20,
    question: "İnsanın Allah'tan korkarak haramlardan sakınmasına ve emirlerine uymasına ne denir?",
    options: ["Takva", "İhlas", "Tevazu", "Sabır"],
    correctAnswer: "Takva",
    explanation: "Allah'ın emirlerine uyup yasaklarından kaçınarak O'nun korumasına girmeye Takva denir."
  },
  {
    id: 'kavram_m_13',
    difficulty: 'medium',
    points: 20,
    question: "Bir kimsenin arkasından hoşlanmayacağı şekilde konuşmaya ne denir?",
    options: ["İftira", "Yalan", "Gıybet", "Haset"],
    correctAnswer: "Gıybet",
    explanation: "Doğru bile olsa, birinin arkasından hoşlanmayacağı şeyi söylemek Gıybettir."
  },
  {
    id: 'kavram_m_14',
    difficulty: 'medium',
    points: 20,
    question: "Yapılan ibadetin sadece Allah rızası için yapılmasına, samimiyete ne denir?",
    options: ["Riya", "İhlas", "Kibir", "Ucub"],
    correctAnswer: "İhlas",
    explanation: "İbadete gösteriş karıştırmadan, sadece Allah için yapmaya İhlas denir."
  },
  {
    id: 'kavram_m_15',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'in 20 sayfadan oluşan her bir bölümüne ne denir?",
    options: ["Sure", "Ayet", "Cüz", "Hizb"],
    correctAnswer: "Cüz",
    explanation: "Kuran 30 cüzden oluşur, her cüz 20 sayfadır."
  },
  {
    id: 'kavram_m_16',
    difficulty: 'medium',
    points: 20,
    question: "Peygamber Efendimizi gören, ona inanan ve Müslüman olarak ölen kişilere ne denir?",
    options: ["Tabiin", "Sahabe (Ashab)", "Veli", "Halife"],
    correctAnswer: "Sahabe (Ashab)",
    explanation: "Peygamberimizin arkadaşlarına Sahabe veya Ashab denir."
  },
  {
    id: 'kavram_m_17',
    difficulty: 'medium',
    points: 20,
    question: "Allah yolunda öldürülen Müslümanlara ne denir?",
    options: ["Gazi", "Şehit", "Alim", "Veli"],
    correctAnswer: "Şehit",
    explanation: "Allah rızası için canını feda edenlere Şehit denir ve cennetle müjdelenmişlerdir."
  },
  {
    id: 'kavram_m_18',
    difficulty: 'medium',
    points: 20,
    question: "Savaşa katılıp sağ dönen Müslümanlara ne denir?",
    options: ["Şehit", "Gazi", "Muhacir", "Ensar"],
    correctAnswer: "Gazi",
    explanation: "Allah yolunda savaşıp sağ dönenlere Gazi denir."
  },
  {
    id: 'kavram_m_19',
    difficulty: 'medium',
    points: 20,
    question: "Kıyamet günü herkesin toplanacağı o büyük meydana ne denir?",
    options: ["Mahşer", "Berzah", "Arafat", "Sırat"],
    correctAnswer: "Mahşer",
    explanation: "Hesap vermek üzere bütün insanların toplanacağı yere Mahşer Meydanı denir."
  },
  {
    id: 'kavram_m_20',
    difficulty: 'medium',
    points: 20,
    question: "Cehennemin üzerine kurulmuş olan ve herkesin geçeceği köprüye ne denir?",
    options: ["Sırat Köprüsü", "Berzah", "Araf", "Kevser"],
    correctAnswer: "Sırat Köprüsü",
    explanation: "Müminlerin geçeceği, kafirlerin ise düşeceği ahiret köprüsüdür."
  },
  {
    id: 'kavram_m_21',
    difficulty: 'medium',
    points: 20,
    question: "Kişinin günahlarından pişman olup Allah'tan af dilemesine ne denir?",
    options: ["Dua", "Tövbe", "Zikir", "Şükür"],
    correctAnswer: "Tövbe",
    explanation: "Hatadan dönmeye ve Allah'a yönelmeye Tövbe denir."
  },
  {
    id: 'kavram_m_22',
    difficulty: 'medium',
    points: 20,
    question: "İnsanın öldükten sonra sevabının yazılmaya devam ettiği (cami, okul, çeşme gibi) hayırlara ne denir?",
    options: ["Sadaka", "Zekat", "Sadaka-i Cariye", "Fitre"],
    correctAnswer: "Sadaka-i Cariye",
    explanation: "Kesintisiz sadaka anlamına gelir; eser durdukça sevabı devam eder."
  },
  {
    id: 'kavram_m_23',
    difficulty: 'medium',
    points: 20,
    question: "Hz. İsa'nın annesi olan, iffeti ve sabrıyla bilinen kadın kimdir?",
    options: ["Hz. Hatice", "Hz. Meryem", "Hz. Asiye", "Hz. Fatıma"],
    correctAnswer: "Hz. Meryem",
    explanation: "Kuran'da adı geçen ve adına sure olan tek kadın Hz. Meryem'dir."
  },
  {
    id: 'kavram_m_24',
    difficulty: 'medium',
    points: 20,
    question: "İslam dininde zenginlik ölçüsü olan miktara ne denir?",
    options: ["Fitre", "Fidye", "Nisap", "Miras"],
    correctAnswer: "Nisap",
    explanation: "Zekat ve kurbanın farz/vacip olması için gereken asgari zenginlik sınırına Nisap denir."
  },
  {
    id: 'kavram_m_25',
    difficulty: 'medium',
    points: 20,
    question: "Peygamber Efendimizin (s.a.v) sözlerine ne denir?",
    options: ["Ayet", "Hadis", "Kelam", "Fıkıh"],
    correctAnswer: "Hadis",
    explanation: "Peygamberimizin sözlü, fiili ve takriri sünnetlerinin yazılı haline Hadis denir."
  },
  {
    id: 'kavram_m_26',
    difficulty: 'medium',
    points: 20,
    question: "İslam'da haram olmamakla birlikte, yapılması hoş görülmeyen davranışlara ne denir?",
    options: ["Mübah", "Farz", "Mekruh", "Sünnet"],
    correctAnswer: "Mekruh",
    explanation: "Kesin yasak olmayan ama yapılmaması daha iyi olan (soğan yiyip camiye gitmek gibi) işlere Mekruh denir."
  },
  {
    id: 'kavram_m_27',
    difficulty: 'medium',
    points: 20,
    question: "Allah'ın emrettiği şeyleri yapmak ve yasaklarından kaçınmak suretiyle yapılan kulluk görevine ne denir?",
    options: ["İbadet", "İtikad", "Ahlak", "Muamelat"],
    correctAnswer: "İbadet",
    explanation: "Namaz, oruç gibi Allah'a saygı ve itaat ifadesi olan davranışlara İbadet denir."
  },
  {
    id: 'kavram_m_28',
    difficulty: 'medium',
    points: 20,
    question: "İhramlı iken giyilen dikişsiz beyaz örtüye ne denir?",
    options: ["Kefen", "İhram (Rida ve İzar)", "Cübbe", "Sarı"],
    correctAnswer: "İhram (Rida ve İzar)",
    explanation: "Hac ve umrede erkeklerin giydiği dikişsiz iki parça örtüye İhram örtüsü denir."
  },
  {
    id: 'kavram_m_29',
    difficulty: 'medium',
    points: 20,
    question: "Kuran-ı Kerim'i baştan sona okuyup bitirmeye ne denir?",
    options: ["Hatim", "Hafızlık", "Tecvid", "Mukabele"],
    correctAnswer: "Hatim",
    explanation: "Fatiha'dan Nas suresine kadar Kuran'ı okuyup bitirmeye Hatim indirmek denir."
  },
  {
    id: 'kavram_m_30',
    difficulty: 'medium',
    points: 20,
    question: "Peygamberlerin 'Günahtan korunmuş' olma sıfatına ne denir?",
    options: ["İsmet", "Emanet", "Fetanet", "Sıdk"],
    correctAnswer: "İsmet",
    explanation: "Peygamberlerin günah işlemekten Allah tarafından korunmuş olmasına İsmet sıfatı denir."
  },
  {
    id: 'kavram_m_31',
    difficulty: 'medium',
    points: 20,
    question: "Kıyamet günü İsrafil (a.s) meleğinin üfleyeceği boruya ne ad verilir?",
    options: ["Sur", "Mizan", "Levh", "Kalem"],
    correctAnswer: "Sur",
    explanation: "Kıyametin kopması ve yeniden diriliş için üflenecek olan boruya Sur denir."
  },
  {
    id: 'kavram_m_32',
    difficulty: 'medium',
    points: 20,
    question: "Kuran'da besmele ile başlamayan tek sure hangisidir?",
    options: ["Tevbe", "Yasin", "Fatiha", "Bakara"],
    correctAnswer: "Tevbe",
    explanation: "Tevbe suresi savaş ilanı ve ültimatom içerdiği için başında Besmele yoktur."
  },
  {
    id: 'kavram_m_33',
    difficulty: 'medium',
    points: 20,
    question: "Allah'ın (c.c.) 99 güzel ismine ne ad verilir?",
    options: ["Esma-i Hüsna", "Kelime-i Tevhid", "Sıfat-ı Zatiye", "Vahiy"],
    correctAnswer: "Esma-i Hüsna",
    explanation: "En güzel isimler (Esma-i Hüsna) Allah'ındır."
  },
  {
    id: 'kavram_m_34',
    difficulty: 'medium',
    points: 20,
    question: "Müslümanların bayramlarda ve önemli günlerde birbirlerini ziyaret etmesine, akrabalık bağını korumasına ne denir?",
    options: ["Sıla-i Rahim", "Sadaka", "Zekat", "Hicret"],
    correctAnswer: "Sıla-i Rahim",
    explanation: "Akraba ve dostları ziyaret etmeye, ilişkiyi kesmemeye Sıla-i Rahim denir."
  },
  {
    id: 'kavram_m_35',
    difficulty: 'medium',
    points: 20,
    question: "'La ilahe illallah Muhammedün Resulullah' sözüne ne denir?",
    options: ["Kelime-i Tevhid", "Kelime-i Şehadet", "Salavat", "Tekbir"],
    correctAnswer: "Kelime-i Tevhid",
    explanation: "Allah'tan başka ilah yoktur, Muhammed O'nun elçisidir anlamına gelen söz Kelime-i Tevhid'dir."
  },
  {
    id: 'kavram_m_36',
    difficulty: 'medium',
    points: 20,
    question: "Hac ibadetinde şeytan taşlanan bölgeye ne ad verilir?",
    options: ["Mina", "Arafat", "Müzdelife", "Safa"],
    correctAnswer: "Mina",
    explanation: "Şeytan taşlama (Cemerat) ve kurban kesimi Mina bölgesinde yapılır."
  },
  {
    id: 'kavram_m_37',
    difficulty: 'medium',
    points: 20,
    question: "Namazda ayakta durmaya ne denir?",
    options: ["Kıyam", "Rüku", "Secde", "Kade"],
    correctAnswer: "Kıyam",
    explanation: "Namazın farzlarından biri olan ayakta durmaya Kıyam denir."
  },
  {
    id: 'kavram_m_38',
    difficulty: 'medium',
    points: 20,
    question: "Namazda elleri dizlere koyup eğilmeye ne denir?",
    options: ["Rüku", "Secde", "Kıyam", "Selam"],
    correctAnswer: "Rüku",
    explanation: "Namazda belini büküp eğilmeye Rüku denir."
  },
  {
    id: 'kavram_m_39',
    difficulty: 'medium',
    points: 20,
    question: "Namazda alnı, burnu, elleri, dizleri ve ayakları yere koymaya ne denir?",
    options: ["Secde", "Rüku", "Kıyam", "Teşehhüd"],
    correctAnswer: "Secde",
    explanation: "Kulun Allah'a en yakın olduğu an olan yere kapanma haline Secde denir."
  },
  {
    id: 'kavram_m_40',
    difficulty: 'medium',
    points: 20,
    question: "Kabe'nin etrafında 7 kere dönmeye ne ad verilir?",
    options: ["Tavaf", "Sa'y", "Vakfe", "Namaz"],
    correctAnswer: "Tavaf",
    explanation: "Kabe'yi sola alarak etrafında 7 şavt dönmeye Tavaf denir."
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - DİNİ KAVRAMLAR (30 PUAN)
  // --------------------------------------------------------
  {
    id: 'kavram_h_1',
    difficulty: 'hard',
    points: 30,
    question: "İslam hukukunda, dinin emir ve yasaklarıyla sorumlu tutulan akıl sağlığı yerinde ve ergenlik çağına girmiş kişiye ne denir?",
    options: ["Mükellef", "Mümin", "Veli", "Hafız"],
    correctAnswer: "Mükellef",
    explanation: "Dini sorumluluk taşıyan, emir ve yasaklara uymakla yükümlü kişiye Mükellef denir."
  },
  {
    id: 'kavram_h_2',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberlere inen vahyin doğruluğunu ispat etmek için Allah'ın izniyle gösterdikleri olağanüstü hallere ne denir?",
    options: ["Keramet", "Mucize", "İstidraç", "Sihir"],
    correctAnswer: "Mucize",
    explanation: "Sadece peygamberlere has olan ve insanların benzerini yapmaktan aciz kaldığı olağanüstü olaylara Mucize denir."
  },
  {
    id: 'kavram_h_3',
    difficulty: 'hard',
    points: 30,
    question: "Allah'ın (c.c.) 'Zati Sıfatları'ndan biri olan ve 'Sonradan yaratılanlara benzememek' anlamına gelen sıfat hangisidir?",
    options: ["Kıyam bi-nefsihi", "Vahdaniyet", "Muhalefetün lil-havadis", "Beka"],
    correctAnswer: "Muhalefetün lil-havadis",
    explanation: "Allah'ın yaratılmış hiçbir varlığa benzememesine Muhalefetün lil-havadis denir."
  },
  {
    id: 'kavram_h_4',
    difficulty: 'hard',
    points: 30,
    question: "Kendisine yeni bir kitap ve şeriat (hukuk düzeni) verilen peygamberlere ne denir?",
    options: ["Nebi", "Resul", "Veli", "Sahabi"],
    correctAnswer: "Resul",
    explanation: "Yeni bir kitapla gelen peygambere Resul, kendinden önceki kitabı tebliğ edene Nebi denir."
  },
  {
    id: 'kavram_h_5',
    difficulty: 'hard',
    points: 30,
    question: "Dini bir meselede, İslam alimlerinin (müçtehitlerin) görüş birliğine varmasına ne denir?",
    options: ["Kıyas", "İcma", "İçtihat", "Sünnet"],
    correctAnswer: "İcma",
    explanation: "Edille-i Şer'iyye'den (Dini delillerden) biri olan İcma, alimlerin bir konuda ittifak etmesidir."
  },
  {
    id: 'kavram_h_6',
    difficulty: 'hard',
    points: 30,
    question: "Hakkında kesin delil (ayet/hadis) bulunmayan bir konuda, alimlerin benzerlik kurarak hüküm vermesine ne denir?",
    options: ["İcma", "Kıyas", "Ayet", "Vahiy"],
    correctAnswer: "Kıyas",
    explanation: "Benzer illetten (sebepten) yola çıkarak hüküm vermeye Kıyas denir (Örn: Şarabın haramlığına kıyasla diğer uyuşturucuların haramlığı)."
  },
  {
    id: 'kavram_h_7',
    difficulty: 'hard',
    points: 30,
    question: "Allah'ın takdir ettiği olayların, zamanı gelince gerçekleşmesine ne denir?",
    options: ["Kader", "Kaza", "Ecel", "Rızık"],
    correctAnswer: "Kaza",
    explanation: "Allah'ın ezelde planladığı şeylerin (Kader), zamanı gelince meydana gelmesine Kaza denir."
  },
  {
    id: 'kavram_h_8',
    difficulty: 'hard',
    points: 30,
    question: "Evlilik akdi sırasında erkeğin kadına vermeyi taahhüt ettiği mal veya paraya ne denir?",
    options: ["Mehir", "Başlık Parası", "Nafaka", "Fitre"],
    correctAnswer: "Mehir",
    explanation: "Kadının evlilikten doğan mali hakkı olan Mehir, dinen zorunludur ve kadının şahsi malıdır."
  },
  {
    id: 'kavram_h_9',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberlerin 'Akıllı ve zeki olma' sıfatına ne denir?",
    options: ["Sıdk", "Emanet", "Fetanet", "İsmet"],
    correctAnswer: "Fetanet",
    explanation: "Peygamberlerin üstün bir zekaya ve kavrayış gücüne sahip olmalarına Fetanet denir."
  },
  {
    id: 'kavram_h_10',
    difficulty: 'hard',
    points: 30,
    question: "İman esaslarını diliyle söyleyip (ikrar), kalbiyle tasdik etmeye (onaylamaya) ne denir?",
    options: ["Tahkiki İman", "Taklidi İman", "İcmali İman", "Tafsilatlı İman"],
    correctAnswer: "Tahkiki İman",
    explanation: "Delilleriyle bilerek, araştırarak ve kalben tam inanarak yapılan imana Tahkiki İman denir."
  },
  {
    id: 'kavram_h_11',
    difficulty: 'hard',
    points: 30,
    question: "İnkar eden veya günahkar kişilerin elinde, isteklerine uygun olarak gerçekleşen olağanüstü hallere (onları kandırmak için) ne denir?",
    options: ["Keramet", "İstidraç", "Mucize", "İkram"],
    correctAnswer: "İstidraç",
    explanation: "Allah'ın, isyankar kuluna nimet vererek onu derece derece helake sürüklemesine İstidraç denir."
  },
  {
    id: 'kavram_h_12',
    difficulty: 'hard',
    points: 30,
    question: "Büyük günah işleyen veya açıktan günah işleyen mümin kimseye ne denir?",
    options: ["Kafir", "Münafık", "Fasık", "Müşrik"],
    correctAnswer: "Fasık",
    explanation: "İnandığı halde Allah'ın emirlerinden çıkan, günah işleyen kimseye Fasık denir."
  },
  {
    id: 'kavram_h_13',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'in inme sebeplerini inceleyen ilim dalına ne denir?",
    options: ["Esbab-ı Nüzul", "Tecvid", "Siyer", "Kelam"],
    correctAnswer: "Esbab-ı Nüzul",
    explanation: "Ayetlerin hangi olay üzerine indiğini araştıran ilme Esbab-ı Nüzul (İniş Sebepleri) denir."
  },
  {
    id: 'kavram_h_14',
    difficulty: 'hard',
    points: 30,
    question: "İslam'ın inanç esaslarını (Amentü) inceleyen ilim dalına ne denir?",
    options: ["Fıkıh", "Kelam (Akaid)", "Hadis", "Tefsir"],
    correctAnswer: "Kelam (Akaid)",
    explanation: "İman esaslarını, Allah'ın sıfatlarını ve nübüvveti konu alan ilme Kelam veya Akaid denir."
  },
  {
    id: 'kavram_h_15',
    difficulty: 'hard',
    points: 30,
    question: "Peygamber Efendimizin (s.a.v) yaşadığı ve en hayırlı kabul edilen o döneme ne ad verilir?",
    options: ["Cahiliye Devri", "Asr-ı Saadet", "Lale Devri", "Fetret Devri"],
    correctAnswer: "Asr-ı Saadet",
    explanation: "Peygamberimizin yaşadığı, insanlığın en mutlu ve huzurlu olduğu döneme Asr-ı Saadet (Mutluluk Çağı) denir."
  },
  {
    id: 'kavram_h_16',
    difficulty: 'hard',
    points: 30,
    question: "Allah'ın (c.c.) emir ve yasaklarını kullarına bildirmesi, haber vermesi olayına ne denir?",
    options: ["İlham", "Vahiy", "Keşif", "Rüya"],
    correctAnswer: "Vahiy",
    explanation: "Allah'ın kelamını Cebrail (a.s) aracılığıyla veya doğrudan peygamberlerine iletmesine Vahiy denir."
  },
  {
    id: 'kavram_h_17',
    difficulty: 'hard',
    points: 30,
    question: "İbadetleri yaparken ve haramlardan kaçınırken gösterilen kararlılık ve dirence ne denir?",
    options: ["Sabır", "Şükür", "Tevbe", "Zikir"],
    correctAnswer: "Sabır",
    explanation: "Dini terim olarak sabır; ibadette, günaha girmemekte ve musibetlere karşı dayanmakta gösterilen dirençtir."
  },
  {
    id: 'kavram_h_18',
    difficulty: 'hard',
    points: 30,
    question: "Ölen kişinin yıkanması, kefenlenmesi ve defnedilmesi işlemlerinin tamamına ne ad verilir?",
    options: ["Teçhiz ve Tekfin", "Taziye", "Telkin", "Mevlit"],
    correctAnswer: "Teçhiz ve Tekfin",
    explanation: "Cenazenin yıkanıp (gasil), kefenlenip (tekfin) hazırlanmasına Teçhiz denir."
  },
  {
    id: 'kavram_h_19',
    difficulty: 'hard',
    points: 30,
    question: "İbadetlerde ve hukukta 'Ruhsat' (İzin/Kolaylık) ne demektir?",
    options: ["Zorluk anında geçici olarak tanınan kolaylık", "Haram işlemek", "İbadeti terk etmek", "Keyfi davranmak"],
    correctAnswer: "Zorluk anında geçici olarak tanınan kolaylık",
    explanation: "Seferilikte namazı kısaltmak veya hastalıkta teyemmüm almak gibi kolaylıklara Ruhsat denir. Asıl hükme Azimet denir."
  },
  {
    id: 'kavram_h_20',
    difficulty: 'hard',
    points: 30,
    question: "Kuran-ı Kerim'deki bazı surelerin başında bulunan (Elif-Lam-Mim gibi) harflere ne denir?",
    options: ["Huruf-u Mukatta", "Tecvid Harfleri", "Şemsi Harfler", "Kameri Harfler"],
    correctAnswer: "Huruf-u Mukatta",
    explanation: "Anlamını sadece Allah'ın bildiği 'Kesik Harfler' anlamına gelen harf gruplarıdır."
  },
  {
    id: 'kavram_h_21',
    difficulty: 'hard',
    points: 30,
    question: "İslam hukukunda 'Müfsid' ne demektir?",
    options: ["Başlanmış bir ibadeti bozan şey", "Haram olan şey", "Mekruh olan şey", "Sünnet olan şey"],
    correctAnswer: "Başlanmış bir ibadeti bozan şey",
    explanation: "Namazda konuşmak veya oruçlu iken yemek gibi ibadeti geçersiz kılan durumlara Müfsid denir."
  },
  {
    id: 'kavram_h_22',
    difficulty: 'hard',
    points: 30,
    question: "Allah'ın (c.c.) zatında, sıfatlarında ve fiillerinde bir ve tek olduğunu kabul etmeye ne denir?",
    options: ["Tevhid", "Tekbir", "Tevekkül", "Tesbih"],
    correctAnswer: "Tevhid",
    explanation: "İslam'ın en temel inancı olan Allah'ı birlemeye Tevhid denir."
  },
  {
    id: 'kavram_h_23',
    difficulty: 'hard',
    points: 30,
    question: "Peygamber Efendimizin (s.a.v) kıyamet günü ümmetinin günahlarının bağışlanması için Allah'a yalvarmasına ne denir?",
    options: ["Şefaat", "Dua", "İstiğfar", "Hutbe"],
    correctAnswer: "Şefaat",
    explanation: "Peygamberlerin ve salih kulların, günahkarların affı için Allah'tan izin alarak aracı olmalarına Şefaat denir."
  },
  {
    id: 'kavram_h_24',
    difficulty: 'hard',
    points: 30,
    question: "Tasavvufta, kişinin kendi arzu ve isteklerini terk edip Allah'ın iradesine tam teslim olmasına ne denir?",
    options: ["Fenafillah", "Bekabillah", "Seyr-i Süluk", "Vuslat"],
    correctAnswer: "Fenafillah",
    explanation: "Allah'ta fani olmak, kulun kendi benliğini Allah'ın varlığında yok etmesi makamıdır."
  },
  {
    id: 'kavram_h_25',
    difficulty: 'hard',
    points: 30,
    question: "Bir kimsenin kendi ihtiyacı olduğu halde, elindekini başkasına vermesine (diğerkâmlık) ne denir?",
    options: ["İsar", "Cömertlik", "Zekat", "İsraf"],
    correctAnswer: "İsar",
    explanation: "Cömertliğin en üst derecesi olan İsar, kendisi muhtaçken kardeşini kendine tercih etmektir."
  },
  {
    id: 'kavram_h_26',
    difficulty: 'hard',
    points: 30,
    question: "Dinen zengin sayılan kişilerin malının üzerinden bir yıl geçmesi şartına ne denir?",
    options: ["Havelan-ı Havl", "Nisap", "Öşür", "Fidye"],
    correctAnswer: "Havelan-ı Havl",
    explanation: "Zekatın farz olması için nisap miktarı malın üzerinden bir kameri yılın geçmesine denir."
  },
  {
    id: 'kavram_h_27',
    difficulty: 'hard',
    points: 30,
    question: "Ahirette müminlerin Allah'ı (c.c.) görmesi olayına ne ad verilir?",
    options: ["Ru'yetullah", "Cemalullah", "Likullah", "Marifetullah"],
    correctAnswer: "Ru'yetullah",
    explanation: "Müminlerin cennette Allah'ı mekandan münezzeh olarak görmelerine Ru'yetullah denir."
  },
  {
    id: 'kavram_h_28',
    difficulty: 'hard',
    points: 30,
    question: "Haram aylarda (Zilkade, Zilhicce, Muharrem, Recep) yapılan savaşlara ne ad verilir?",
    options: ["Ficar Savaşları", "Bedir Savaşı", "Cemel Vakası", "Sıffin Savaşı"],
    correctAnswer: "Ficar Savaşları",
    explanation: "İslam öncesi ve ilk dönemlerde haram aylarda yapılan ve günah (ficar) sayılan savaşlardır."
  },
  {
    id: 'kavram_h_29',
    difficulty: 'hard',
    points: 30,
    question: "İbadetleri ve güzel ahlakı, Allah'ı görüyormuş gibi yapma şuuruna ne denir?",
    options: ["İhsan", "İman", "İslam", "İhlas"],
    correctAnswer: "İhsan",
    explanation: "Cibril hadisinde tarif edildiği üzere: 'Allah'ı görüyormuş gibi ibadet etmendir. Sen O'nu görmesen de O seni görür.'"
  },
  {
    id: 'kavram_h_30',
    difficulty: 'hard',
    points: 30,
    question: "Kuran'ın Allah kelamı olduğunu inkar eden, ayetleri değiştirmeye çalışan sapkınlığa ne denir?",
    options: ["İlhad (Mülhid)", "Fısk", "Nifak", "Bidat"],
    correctAnswer: "İlhad (Mülhid)",
    explanation: "Dinden dönen, ayetleri inkar eden veya manasını saptıran dinsizliğe İlhad, kişiye Mülhid denir."
  },
  {
    id: 'kavram_h_31',
    difficulty: 'hard',
    points: 30,
    question: "Dinde olmayan, sonradan uydurulan ve ibadet gibi yapılan şeylere ne denir?",
    options: ["Bid'at", "Sünnet", "Hurafe", "Örf"],
    correctAnswer: "Bid'at",
    explanation: "Dinin aslına aykırı olarak sonradan eklenen ve sünnet gibi algılanan yeniliklere Bid'at denir ve reddedilmiştir."
  },
  {
    id: 'kavram_h_32',
    difficulty: 'hard',
    points: 30,
    question: "Allah'ın 'Hayy' (Diri) isminin tecellisi olan, her canlıya hayat veren sıfatı hangisidir?",
    options: ["Hayat", "İlim", "Kudret", "İrade"],
    correctAnswer: "Hayat",
    explanation: "Allah'ın Zati sıfatlarından olan Hayat, O'nun ezeli ve ebedi olarak diri olmasıdır."
  },
  {
    id: 'kavram_h_33',
    difficulty: 'hard',
    points: 30,
    question: "Ölmek üzere olan kişinin yanında Kelime-i Tevhid getirmeye ve hatırlatmaya ne denir?",
    options: ["Telkin", "Taziye", "Tekfin", "Teçhiz"],
    correctAnswer: "Telkin",
    explanation: "Son nefesini verirken hastaya 'La ilahe illallah' diyerek hatırlatmada bulunmaya Telkin denir."
  },
  {
    id: 'kavram_h_34',
    difficulty: 'hard',
    points: 30,
    question: "Faiz anlamına gelen ve dinen kesinlikle haram kılınan kavram nedir?",
    options: ["Riba", "Karz", "Bey'", "Hibe"],
    correctAnswer: "Riba",
    explanation: "Borç verilen paranın veya malın, karşılıksız fazlalıkla geri alınmasına Riba (Faiz) denir."
  },
  {
    id: 'kavram_h_35',
    difficulty: 'hard',
    points: 30,
    question: "Peygamberimizin (s.a.v) söz, fiil ve onaylarının bütününe ne ad verilir?",
    options: ["Sünnet", "Farz", "Vacip", "Müstehap"],
    correctAnswer: "Sünnet",
    explanation: "Sünnet; Kavli (sözlü), Fiili (davranış) ve Takriri (onaylama) olmak üzere üçe ayrılır."
  },
  {
    id: 'kavram_h_36',
    difficulty: 'hard',
    points: 30,
    question: "İman esaslarından 'Ahiret Günü'nün diğer bir adı olan ve 'Din Günü / Hesap Günü' anlamına gelen kavram hangisidir?",
    options: ["Yevmü'd-Din", "Yevmü'l-Cuma", "Yevmü'l-Feth", "Yevmü'ş-Şekk"],
    correctAnswer: "Yevmü'd-Din",
    explanation: "Fatiha suresinde geçen 'Maliki Yevmiddin', Din (Hesap/Ceza) gününün sahibi demektir."
  },
  {
    id: 'kavram_h_37',
    difficulty: 'hard',
    points: 30,
    question: "İbadetlerde 'Azimet'in (zor olan asıl hükmün) zıddı olan ve kolaylık ifade eden kavram nedir?",
    options: ["Ruhsat", "Kaza", "Nafile", "Mübah"],
    correctAnswer: "Ruhsat",
    explanation: "Zorluk durumunda Allah'ın kullarına tanıdığı kolaylığa Ruhsat, asıl emre uymaya Azimet denir."
  },
  {
    id: 'kavram_h_38',
    difficulty: 'hard',
    points: 30,
    question: "Hangi ibadet 'Mali ve Bedeni' ibadetlerin birleşimi sayılır?",
    options: ["Hac", "Namaz", "Oruç", "Zekat"],
    correctAnswer: "Hac",
    explanation: "Hac hem para harcamayı (mali) hem de beden sağlığını (bedeni) gerektiren tek farz ibadettir."
  },
  {
    id: 'kavram_h_39',
    difficulty: 'hard',
    points: 30,
    question: "Bir kimsenin İslam dininden çıkmasına, dinden dönmesine ne denir?",
    options: ["İrtidad (Mürted)", "İnkar", "Nifak", "Fısk"],
    correctAnswer: "İrtidad (Mürted)",
    explanation: "Müslümanken dinden dönmeye İrtidad, dönen kişiye Mürted denir."
  },
  {
    id: 'kavram_h_40',
    difficulty: 'hard',
    points: 30,
    question: "Kıyamet alametlerinden olan ve yeryüzüne çıkacak olan canlıya ne denir?",
    options: ["Dabbetü'l Arz", "Deccal", "Ye'cüc Me'cüc", "Mehdi"],
    correctAnswer: "Dabbetü'l Arz",
    explanation: "Kıyamete yakın yerden çıkacak ve insanlarla konuşacak olan canlıya Dabbetü'l Arz denir."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - DİNİ KAVRAMLAR (40 PUAN)
  // --------------------------------------------------------
  {
    id: 'kavram_x_1',
    difficulty: 'expert',
    points: 40,
    question: "Maturidi mezhebine göre, Allah'ın 'Yaratma' sıfatına verilen özel isim nedir?",
    options: ["Tekvin", "Kudret", "İrade", "Kelam"],
    correctAnswer: "Tekvin",
    explanation: "Maturidiler, 'Tekvin'i (yaratma/var etme) Allah'ın ezeli ve müstakil bir sıfatı olarak kabul ederler (Eş'ariler bunu Kudret'e dahil eder)."
  },
  {
    id: 'kavram_x_2',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıh usulünde, hakkında açık nas (ayet/hadis) bulunmayan bir konuda, müçtehidin benzerlikten yola çıkarak değil de, daha kuvvetli bir gerekçeyle genel kuraldan ayrılıp özel hüküm vermesine ne denir?",
    options: ["İstihsan", "Kıyas", "İstishab", "Mesalih-i Mürsele"],
    correctAnswer: "İstihsan",
    explanation: "İstihsan; müçtehidin bir meselede, daha kuvvetli bir delil veya maslahat sebebiyle, benzerlerinde verdiği hükümden vazgeçip farklı (kolaylaştırıcı) hüküm vermesidir."
  },
  {
    id: 'kavram_x_3',
    difficulty: 'expert',
    points: 40,
    question: "Kelam ilminde, insanın fiillerini yaratmada Allah'ın yaratıcı, kulun ise 'kazanıcı' (tercih eden) olmasını ifade eden terim nedir?",
    options: ["Kesb", "Cebr", "Tevfid", "Halk"],
    correctAnswer: "Kesb",
    explanation: "Ehl-i Sünnet'e göre fiili Allah yaratır, kul ise iradesiyle o fiile yönelerek onu 'Kesb' eder (kazanır). Sorumluluk buradadır."
  },
  {
    id: 'kavram_x_4',
    difficulty: 'expert',
    points: 40,
    question: "Tasavvufta, müridin manevi yolculuğunda kalbine gelen ani, geçici neşe veya hüzün hallerine ne denir?",
    options: ["Hal", "Makam", "Vird", "Seyr"],
    correctAnswer: "Hal",
    explanation: "Hal; kulun isteği dışında kalbine gelen geçici manevi duygulardır. Kalıcı olursa 'Makam' adını alır."
  },
  {
    id: 'kavram_x_5',
    difficulty: 'expert',
    points: 40,
    question: "İslam hukukunda, bir şeyin daha önce olduğu hal üzere kalmasına hükmetmeye (mevcut durumun devamını esas almaya) ne denir?",
    options: ["İstishab", "İstislah", "Sedd-i Zerai", "Örf"],
    correctAnswer: "İstishab",
    explanation: "Örneğin; abdestli olduğu bilinen birinin, bozulduğuna dair delil yoksa abdestli sayılması (Yakîn şüphe ile zail olmaz) ilkesi İstishab'dır."
  },
  {
    id: 'kavram_x_6',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'in 'Mucize oluşunu' ve insanların onun benzerini getirmekten aciz kalmasını ifade eden terim nedir?",
    options: ["İ'câzü'l-Kur'an", "Cem'u'l-Kur'an", "Tefsirü'l-Kur'an", "Kıraat"],
    correctAnswer: "İ'câzü'l-Kur'an",
    explanation: "İ'câz; Kuran'ın hem söz hem mana olarak benzerinin yapılamayacağını, beşer sözü olmadığını ifade eder."
  },
  {
    id: 'kavram_x_7',
    difficulty: 'expert',
    points: 40,
    question: "Hanefi fıkhında, aslı (rüknü) sahih olan ama vasfında (şartlarında) eksiklik bulunan (örneğin şahitsiz nikah) akitlere ne denir?",
    options: ["Fasit", "Batıl", "Sahih", "Mekruh"],
    correctAnswer: "Fasit",
    explanation: "Hanefilerde Batıl (kökten geçersiz) ile Fasit (düzeltilebilir eksiklik) ayrımı vardır. Diğer mezheplerde ikisi de aynıdır."
  },
  {
    id: 'kavram_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Kelam ilminde, 'İyi ve Kötü'nün (Hüsün ve Kubuh) akılla mı yoksa sadece vahiy ile mi bilineceği tartışması hangi kavramla ifade edilir?",
    options: ["Hüsün ve Kubuh", "Kaza ve Kader", "Vahiy ve İlham", "Cevher ve Araz"],
    correctAnswer: "Hüsün ve Kubuh",
    explanation: "Maturidiler aklın iyiyi ve kötüyü (kısmen) bulabileceğini, Eş'ariler ise iyilik ve kötülüğün sadece şeriatın (vahyin) bildirmesiyle bilineceğini savunur."
  },
  {
    id: 'kavram_x_9',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıh usulünde, kötülüğe giden yolların kapatılması (haram olana götüren aracın da yasaklanması) ilkesine ne denir?",
    options: ["Sedd-i Zerai", "Mesalih-i Mürsele", "İstihsan", "Kıyas"],
    correctAnswer: "Sedd-i Zerai",
    explanation: "Zerai (vesileler) kapısının kapatılmasıdır. Örneğin, zina haram olduğu için halvet (baş başa kalmak) da yasaktır."
  },
  {
    id: 'kavram_x_10',
    difficulty: 'expert',
    points: 40,
    question: "Tasavvufta, nefsin tezkiyesi ve kalbin tasfiyesi için geçilen manevi eğitim yolculuğuna ne denir?",
    options: ["Seyr-i Sülûk", "Vahdet-i Vücud", "Riyazet", "Mücahede"],
    correctAnswer: "Seyr-i Sülûk",
    explanation: "Bir mürşidin gözetiminde, hakk'a ermek için çıkılan manevi yolculuğa Seyr-i Sülûk denir."
  },
  {
    id: 'kavram_x_11',
    difficulty: 'expert',
    points: 40,
    question: "İbadetlerin miktarının ve şeklinin akılla değil, sadece nasla (vahiy/hadis) belirlenmiş olmasına ne denir?",
    options: ["Tevkîfî", "İçtihadi", "Kıyasi", "Örfi"],
    correctAnswer: "Tevkîfî",
    explanation: "Namazın rekatları gibi, akılla değiştirilemeyen ve Allah tarafından belirlenen sınırlara Tevkîfî denir."
  },
  {
    id: 'kavram_x_12',
    difficulty: 'expert',
    points: 40,
    question: "Peygamber olmayan salih kulların (velilerin) elinde, zor durumda kaldıklarında Allah'ın yardımıyla gerçekleşen olağanüstü duruma (kerametten farklı olarak) ne denir?",
    options: ["Maûnet", "İrhas", "İstidraç", "İhanet"],
    correctAnswer: "Maûnet",
    explanation: "Sıradan müminlerin darda kaldıklarında gördükleri ilahi yardıma Maûnet denir. (İrhas peygamberlik öncesi, Keramet veliler içindir)."
  },
  {
    id: 'kavram_x_13',
    difficulty: 'expert',
    points: 40,
    question: "İslam hukukunun (Şeriatın) korunmasını hedeflediği beş temel esasa (Can, Mal, Akıl, Nesil, Din) ne denir?",
    options: ["Makâsıdü'ş-Şerîa (veya Zarurat-ı Diniyye)", "Edille-i Şeriyye", "Furu-u Fıkıh", "Usul-i Din"],
    correctAnswer: "Makâsıdü'ş-Şerîa (veya Zarurat-ı Diniyye)",
    explanation: "İslam hukukunun nihai amacı bu beş temel değeri korumaktır (Makâsıdü'ş-Şerîa)."
  },
  {
    id: 'kavram_x_14',
    difficulty: 'expert',
    points: 40,
    question: "Kuran'da manası açık olmayan, birden fazla anlama gelebilen veya manasını sadece Allah'ın bildiği ayetlere ne denir?",
    options: ["Müteşabih", "Muhkem", "Müfesser", "Zahir"],
    correctAnswer: "Müteşabih",
    explanation: "Allah'ın eli, yüzü gibi ifadeler veya hurufu mukatta harfleri Müteşabih ayetlerdir. (Manası açık olanlara Muhkem denir)."
  },
  {
    id: 'kavram_x_15',
    difficulty: 'expert',
    points: 40,
    question: "Kelam ilminde 'Allah'ın ahirette müminler tarafından görüleceği' inancına karşı çıkan mezhep hangisidir?",
    options: ["Mutezile", "Ehl-i Sünnet", "Matüridi", "Eşari"],
    correctAnswer: "Mutezile",
    explanation: "Mutezile mezhebi, Allah'ı görmenin (Ru'yetullah) O'na cisim ve yön isnat etmek olacağını iddia ederek inkar eder."
  },
  {
    id: 'kavram_x_16',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıhta, kişinin hukuki işlem yapabilme yeteneğine (haklara sahip olma ve borç altına girebilme) ne denir?",
    options: ["Ehliyet (Vücub ve Eda Ehliyeti)", "Velayet", "Kefalet", "Vekalet"],
    correctAnswer: "Ehliyet (Vücub ve Eda Ehliyeti)",
    explanation: "İnsanın hak sahibi olmasına Vücub ehliyeti, fiilleri bizzat yapabilme yeteneğine Eda ehliyeti denir."
  },
  {
    id: 'kavram_x_17',
    difficulty: 'expert',
    points: 40,
    question: "Tasavvufta 'Kabz' (Daralma/Sıkıntı) halinin zıddı olan ve kalbin ferahlamasını ifade eden terim nedir?",
    options: ["Bast", "Sekr", "Fena", "Heybet"],
    correctAnswer: "Bast",
    explanation: "Kabz manevi tutukluk ve daralma, Bast ise manevi genişleme, neşe ve ferahlama halidir."
  },
  {
    id: 'kavram_x_18',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberlerin, peygamberlikleri bildirilmeden önce (çocukluk/gençlik dönemlerinde) gösterdikleri olağanüstü hallere ne denir?",
    options: ["İrhasat", "Keramet", "Maunet", "İstidraç"],
    correctAnswer: "İrhasat",
    explanation: "Örneğin Hz. İsa'nın beşikte konuşması veya Peygamberimizi bulutun takip etmesi İrhasat (Peygamberliğe hazırlık) mucizesidir."
  },
  {
    id: 'kavram_x_19',
    difficulty: 'expert',
    points: 40,
    question: "Hadis ve Fıkıh usulünde, farklı mezheplerin hükümlerini birleştirerek (kolayına geleni seçerek) ibadet etmeye ne denir ve hükmü nedir?",
    options: ["Telfik (Genelde caiz görülmez)", "Taklit (Caizdir)", "İçtihat (Sevaptır)", "Kıyas (Farzdır)"],
    correctAnswer: "Telfik (Genelde caiz görülmez)",
    explanation: "Telfik; bir ibadeti yaparken, şartlarını farklı mezheplerden toplayıp, hiçbir mezhebe göre sahih olmayan yeni bir yol icat etmektir."
  },
  {
    id: 'kavram_x_20',
    difficulty: 'expert',
    points: 40,
    question: "Allah'ın 'Kıdem' sıfatının anlamı nedir?",
    options: ["Varlığının başlangıcı olmaması (Ezeli olmak)", "Varlığının sonu olmaması", "Sonradan olanlara benzememesi", "Bir olması"],
    correctAnswer: "Varlığının başlangıcı olmaması (Ezeli olmak)",
    explanation: "Kıdem: Ezeli olmak, başlangıcı bulunmamak demektir. (Beka: Ebedi olmak, sonu bulunmamak)."
  },
  {
    id: 'kavram_x_21',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıhta, hakkında belirli bir ceza (had) bulunmayan suçlar için, hakimin takdirine bırakılan cezalandırma yetkisine ne denir?",
    options: ["Ta'zir", "Had", "Kısas", "Diyet"],
    correctAnswer: "Ta'zir",
    explanation: "Kuran ve Sünnet'te cezası sabit olanlara 'Had' (hırsızlık, zina vb.), cezası yöneticiye bırakılanlara 'Ta'zir' denir."
  },
  {
    id: 'kavram_x_22',
    difficulty: 'expert',
    points: 40,
    question: "İman esaslarında 'Mücmel İman' ne demektir?",
    options: ["Peygamberin getirdiği her şeye topluca/kısaca inanmak", "Ayrıntılarıyla inanmak", "Takliden inanmak", "Şüpheyle inanmak"],
    correctAnswer: "Peygamberin getirdiği her şeye topluca/kısaca inanmak",
    explanation: "Detayları bilmese de 'Peygamber ne getirdiyse haktır' diyerek toptan inanmaya İcmali/Mücmel iman denir."
  },
  {
    id: 'kavram_x_23',
    difficulty: 'expert',
    points: 40,
    question: "'Sıla-i Rahim'in (Akraba ziyareti) terk edilmesine fıkıhta ne ad verilir?",
    options: ["Kat'-ı Rahim", "Ukuk", "Fısk", "Nifak"],
    correctAnswer: "Kat'-ı Rahim",
    explanation: "Akrabalık bağlarını koparmaya Kat'-ı Rahim denir ve büyük günahlardandır."
  },
  {
    id: 'kavram_x_24',
    difficulty: 'expert',
    points: 40,
    question: "Tasavvufta 'Vahdet-i Vücud' düşüncesinin en önemli temsilcisi kimdir?",
    options: ["Muhyiddin İbnü'l-Arabi", "İmam Gazali", "Abdülkadir Geylani", "Mevlana"],
    correctAnswer: "Muhyiddin İbnü'l-Arabi",
    explanation: "Varlığın birliği (sadece Allah'ın varlığının hakiki olduğu) düşüncesini sistemleştiren İbnü'l-Arabi'dir."
  },
  {
    id: 'kavram_x_25',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıhta 'Mevat Arazi' ne demektir?",
    options: ["Sahibi olmayan, tarıma elverişsiz, ölü topraklar", "Vakıf arazisi", "Miras arazisi", "Devlet arazisi"],
    correctAnswer: "Sahibi olmayan, tarıma elverişsiz, ölü topraklar",
    explanation: "Kimsenin mülkiyetinde olmayan çöl, bataklık gibi yerlerdir. 'Kim ölü bir toprağı ihya ederse (canlandırırsa) ona aittir' hadisi vardır."
  },
  {
    id: 'kavram_x_26',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberlerin 'Tebliğ' sıfatının yanında, dini hükümleri açıklama görevine ne denir?",
    options: ["Tebyin", "Teşri", "Temsil", "Tezkiye"],
    correctAnswer: "Tebyin",
    explanation: "Kuran'daki kapalı hükümleri açıklama ve izah etme görevine Tebyin (Beyan) denir."
  },
  {
    id: 'kavram_x_27',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıh usulünde 'Amm' (Genel) bir hükmün kapsamını daraltmaya ne denir?",
    options: ["Tahsis", "Nesih", "Te'vil", "Takyid"],
    correctAnswer: "Tahsis",
    explanation: "Genel bir ifadenin (örneğin 'insanlar') kapsamından bazılarını (örneğin 'müminler' diye) ayırmaya Tahsis denir."
  },
  {
    id: 'kavram_x_28',
    difficulty: 'expert',
    points: 40,
    question: "İslam'da yönetici (Halife/İmam) seçimi için yapılan bağlılık sözleşmesine ne denir?",
    options: ["Biat", "Şura", "Ahd", "Misak"],
    correctAnswer: "Biat",
    explanation: "Yöneticiye itaat edeceğine dair el tutuşarak veya sözle yapılan akde Biat denir."
  },
  {
    id: 'kavram_x_29',
    difficulty: 'expert',
    points: 40,
    question: "Müslümanların, gayrimüslim bir ülkede güven içinde yaşamak için o devletten aldıkları izin/güvenceye (vizeye) fıkıhta ne denir?",
    options: ["Eman (Müstemen)", "Zimmet", "Cizye", "Haraç"],
    correctAnswer: "Eman (Müstemen)",
    explanation: "Can ve mal güvenliği anlaşmasına Eman, eman alarak giren kişiye Müstemen denir."
  },
  {
    id: 'kavram_x_30',
    difficulty: 'expert',
    points: 40,
    question: "Allah'ın (c.c.) her şeyi kuşatan sonsuz 'İlmi' ile, olmuş ve olacak her şeyi takdir etmesine (Kader) ne denir?",
    options: ["İlm-i Ezeli", "Levh-i Mahfuz", "Kaza", "Tevekkül"],
    correctAnswer: "İlm-i Ezeli",
    explanation: "Kader, Allah'ın ezeli ilmiyle her şeyi bilip takdir etmesidir."
  },
  {
    id: 'kavram_x_31',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıhta, iki tarafın sermaye ve emek ortaklığına (birinden para, birinden iş) ne denir?",
    options: ["Mudarebe", "Muşarake", "Murabaha", "Vedia"],
    correctAnswer: "Mudarebe",
    explanation: "Emek-Sermaye ortaklığına Mudarebe (Emekçi: Mudarib) denir. (Muşarake sermaye ortaklığıdır)."
  },
  {
    id: 'kavram_x_32',
    difficulty: 'expert',
    points: 40,
    question: "Tasavvufta, nefsin mertebelerinden 'Allah'tan razı olmuş, Allah'ın da ondan razı olduğu' en yüksek nefis mertebesi hangisidir?",
    options: ["Nefs-i Kâmile (Safiye)", "Nefs-i Mutmainne", "Nefs-i Radiye", "Nefs-i Mardiyye"],
    correctAnswer: "Nefs-i Kâmile (Safiye)",
    explanation: "En son ve en saf mertebe Nefs-i Kâmile veya Safiye'dir. (Radiye ve Mardiyye ondan öncedir)."
  },
  {
    id: 'kavram_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Şeriatta, hakkında kesin delil (nas) bulunmayan konularda, 'Toplumun genel kabul ve alışkanlıklarına' dayanarak hüküm vermeye ne denir?",
    options: ["Örf (Adet)", "İcma", "İstihsan", "Mesalih"],
    correctAnswer: "Örf (Adet)",
    explanation: "Nassa aykırı olmayan Örf ve Adetler, İslam hukukunda fer'i bir delil kaynağıdır."
  },
  {
    id: 'kavram_x_34',
    difficulty: 'expert',
    points: 40,
    question: "Kuran-ı Kerim'de, Allah'ın (c.c.) arşa istiva etmesi, eli (yed) veya yüzü (vech) gibi müteşabih ifadeleri, 'manasını Allah'a havale etme' yöntemine ne denir?",
    options: ["Tefviz", "Te'vil", "Teşbih", "Tecsim"],
    correctAnswer: "Tefviz",
    explanation: "Selef alimleri (ilk dönem), bu sıfatları yorumlamadan 'manasını Allah bilir' diyerek havale etmişlerdir (Tefviz). Sonrakiler yorumlamıştır (Te'vil)."
  },
  {
    id: 'kavram_x_35',
    difficulty: 'expert',
    points: 40,
    question: "Peygamberlerin 'Küçük veya büyük günah işlemekten korunmuş olması' (İsmet) sıfatına rağmen yaptıkları çok küçük hatalara (ayak sürçmesi) ne denir?",
    options: ["Zelle", "Günah", "Hata", "Dalalet"],
    correctAnswer: "Zelle",
    explanation: "Peygamberlerin makamına göre bir eksiklik sayılan ama günah olmayan küçük tercih hatalarına Zelle denir (Hz. Adem'in yasak meyveyi yemesi gibi)."
  },
  {
    id: 'kavram_x_36',
    difficulty: 'expert',
    points: 40,
    question: "İbadetlerde (özellikle namazda) 'Hades' ne demektir?",
    options: ["Hükmi kirlilik (Abdestsizlik veya cünüplük)", "Maddi pislik (Necaset)", "Namazı bozmak", "Hata yapmak"],
    correctAnswer: "Hükmi kirlilik (Abdestsizlik veya cünüplük)",
    explanation: "Gözle görülmeyen ama ibadete engel olan kirliliğe Hades (Abdestsizlik: Hades-i Asgar, Cünüplük: Hades-i Ekber) denir."
  },
  {
    id: 'kavram_x_37',
    difficulty: 'expert',
    points: 40,
    question: "Kelam ilminde, Allah'ın varlığının başlangıcı ve sonunun olmamasını ifade eden 'Kıdem ve Beka' sıfatlarına ne ad verilir?",
    options: ["Selbî (Tenzihî) Sıfatlar", "Sübûtî Sıfatlar", "Fiilî Sıfatlar", "Haberi Sıfatlar"],
    correctAnswer: "Selbî (Tenzihî) Sıfatlar",
    explanation: "Allah'ta neyin OLMADIĞINI (sonu yok, başlangıcı yok, ortağı yok) anlatan sıfatlara Selbî sıfatlar denir."
  },
  {
    id: 'kavram_x_38',
    difficulty: 'expert',
    points: 40,
    question: "Fıkıh usulünde, şer'i bir hükmün sebebini (illetini) araştırmaya ve ortaya çıkarmaya ne denir?",
    options: ["Ta'lil (İlletlendirme)", "Taklid", "Telfik", "Tecdid"],
    correctAnswer: "Ta'lil (İlletlendirme)",
    explanation: "Hükmün dayandığı mantıksal sebebi (illeti) bulma işlemine Ta'lil denir (Örn: Şarabın haramlık illeti sarhoşluktur)."
  },
  {
    id: 'kavram_x_39',
    difficulty: 'expert',
    points: 40,
    question: "İslam'da, dinin asıllarını ve hükümlerini her asırda yeniden yorumlayıp canlandıran alime ne denir?",
    options: ["Müceddid", "Müçtehit", "Veli", "Kutub"],
    correctAnswer: "Müceddid",
    explanation: "Hadise göre her yüzyılın başında dini yenileyen (bidatlerden arındıran) bir Müceddid gelir."
  },
  {
    id: 'kavram_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Tasavvufta, kulun her an Allah ile beraber olduğu şuuruna (halk içinde hak ile beraber olmak) ne denir?",
    options: ["Halvet der Encümen", "Huş der Dem", "Nazar ber Kadem", "Sefer der Vatan"],
    correctAnswer: "Halvet der Encümen",
    explanation: "Nakşibendi yolunun prensiplerinden olan Halvet der Encümen; kalabalıklar içindeyken bile kalbin Allah ile baş başa (halvet) olmasıdır."
  }
    ]
  },
  esma: {
    questions: [
  // --------------------------------------------------------
  // 🟢 KOLAY SEVİYE (1-40) - ESMA-İ HÜSNA (10 PUAN)
  // --------------------------------------------------------
  {
    id: 'eh_e_1',
    difficulty: 'easy',
    points: 10,
    question: "'Esma-i Hüsna' ne demektir?",
    options: ["Güzel İsimler (Allah'ın İsimleri)", "Peygamber İsimleri", "Melek İsimleri", "Cennet İsimleri"],
    correctAnswer: "Güzel İsimler (Allah'ın İsimleri)",
    explanation: "Esma 'isimler', Hüsna 'en güzel' demektir. Allah'ın 99 güzel ismini ifade eder."
  },
  {
    id: 'eh_e_2',
    difficulty: 'easy',
    points: 10,
    question: "Meşhur hadise göre Allah'ın (c.c.) kaç güzel ismi vardır?",
    options: ["100", "99", "40", "114"],
    correctAnswer: "99",
    explanation: "Peygamberimiz (s.a.v) 'Allah'ın 99 ismi vardır, kim onları sayar (ve manasını anlarsa) cennete girer' buyurmuştur."
  },
  {
    id: 'eh_e_3',
    difficulty: 'easy',
    points: 10,
    question: "Allah'ın (c.c.) özel ismi (Lafza-i Celal) hangisidir?",
    options: ["Rahman", "Allah", "Kerim", "Rab"],
    correctAnswer: "Allah",
    explanation: "Bütün isimleri ve sıfatları kendinde toplayan en kapsamlı özel isim 'Allah'tır."
  },
  {
    id: 'eh_e_4',
    difficulty: 'easy',
    points: 10,
    question: "'Er-Rahman' isminin anlamı nedir?",
    options: ["Dünyada inanan-inanmayan herkese merhamet eden", "Çok güçlü olan", "Her şeyi bilen", "Yaratan"],
    correctAnswer: "Dünyada inanan-inanmayan herkese merhamet eden",
    explanation: "Rahman, dünyada ayrım yapmadan bütün mahlukata rızık veren ve şefkat gösteren demektir."
  },
  {
    id: 'eh_e_5',
    difficulty: 'easy',
    points: 10,
    question: "'Er-Rahim' isminin anlamı nedir?",
    options: ["Ahirette sadece müminlere merhamet edecek olan", "Çok zengin", "Her şeyi gören", "Hükümdar"],
    correctAnswer: "Ahirette sadece müminlere merhamet edecek olan",
    explanation: "Rahim, ahirette sadece kendine inanan kullarına ekstra merhamet ve lütufta bulunacak olandır."
  },
  {
    id: 'eh_e_6',
    difficulty: 'easy',
    points: 10,
    question: "'El-Halik' isminin anlamı nedir?",
    options: ["Yoktan Yaratan", "Öldüren", "Rızık Veren", "Koruyan"],
    correctAnswer: "Yoktan Yaratan",
    explanation: "Her şeyi yoktan var eden, yaratan anlamına gelir."
  },
  {
    id: 'eh_e_7',
    difficulty: 'easy',
    points: 10,
    question: "'Er-Rezzak' isminin anlamı nedir?",
    options: ["Rızık veren, ihtiyaçları karşılayan", "Can alan", "Hesap soran", "Affeden"],
    correctAnswer: "Rızık veren, ihtiyaçları karşılayan",
    explanation: "Bütün canlıların rızkını (yiyeceğini/ihtiyacını) veren demektir."
  },
  {
    id: 'eh_e_8',
    difficulty: 'easy',
    points: 10,
    question: "'El-Melik' isminin anlamı nedir?",
    options: ["Mülkün gerçek sahibi ve hükümdarı", "Meleklerin lideri", "Haberci", "Yazıcı"],
    correctAnswer: "Mülkün gerçek sahibi ve hükümdarı",
    explanation: "Kainatın tek sahibi, yöneticisi ve sultanı demektir."
  },
  {
    id: 'eh_e_9',
    difficulty: 'easy',
    points: 10,
    question: "'Es-Selam' isminin anlamı nedir?",
    options: ["Esenlik veren, tehlikelerden selamete çıkaran", "Savaşan", "Cezalandıran", "Uyuyan"],
    correctAnswer: "Esenlik veren, tehlikelerden selamete çıkaran",
    explanation: "Kullarını selamete çıkaran, cennette onlara selam veren demektir."
  },
  {
    id: 'eh_e_10',
    difficulty: 'easy',
    points: 10,
    question: "'El-Alim' isminin anlamı nedir?",
    options: ["Her şeyi hakkıyla bilen", "Her şeyi gören", "Her şeyi duyan", "Her şeyi yapan"],
    correctAnswer: "Her şeyi hakkıyla bilen",
    explanation: "Gizli ve açık, geçmiş ve gelecek her şeyi en ince detayına kadar bilen demektir."
  },
  {
    id: 'eh_e_11',
    difficulty: 'easy',
    points: 10,
    question: "'Es-Semi' isminin anlamı nedir?",
    options: ["Her şeyi (fısıltıları bile) işiten", "Gören", "Konuşan", "Bilen"],
    correctAnswer: "Her şeyi (fısıltıları bile) işiten",
    explanation: "Hiçbir ses O'na gizli kalmaz, her duayı ve sesi işitir."
  },
  {
    id: 'eh_e_12',
    difficulty: 'easy',
    points: 10,
    question: "'El-Basir' isminin anlamı nedir?",
    options: ["Her şeyi en iyi gören", "İşiten", "Bilen", "Güçlü"],
    correctAnswer: "Her şeyi en iyi gören",
    explanation: "Karanlık gecede kara taşın üzerindeki kara karıncayı dahi görür."
  },
  {
    id: 'eh_e_13',
    difficulty: 'easy',
    points: 10,
    question: "'El-Gaffar' isminin anlamı nedir?",
    options: ["Günahları çokça bağışlayan", "Kahreden", "Yaratan", "Yükselten"],
    correctAnswer: "Günahları çokça bağışlayan",
    explanation: "Kullarının günahlarını tekrar tekrar affeden, örten demektir."
  },
  {
    id: 'eh_e_14',
    difficulty: 'easy',
    points: 10,
    question: "'El-Fettah' isminin anlamı nedir?",
    options: ["Her türlü hayır kapılarını açan", "Kapayan", "Zorlaştıran", "Uyuyan"],
    correctAnswer: "Her türlü hayır kapılarını açan",
    explanation: "Zorlukları gideren, fetihler nasip eden ve rızık kapılarını açan demektir."
  },
  {
    id: 'eh_e_15',
    difficulty: 'easy',
    points: 10,
    question: "'El-Kerim' isminin anlamı nedir?",
    options: ["Çok cömert, ikramı bol olan", "Cimri", "Fakir", "Muhtaç"],
    correctAnswer: "Çok cömert, ikramı bol olan",
    explanation: "Karşılıksız veren, ikram eden ve çok cömert olan demektir."
  },
  {
    id: 'eh_e_16',
    difficulty: 'easy',
    points: 10,
    question: "'El-Vedud' isminin anlamı nedir?",
    options: ["Kullarını çok seven ve sevilmeye layık olan", "Korkulan", "Uzak durulan", "Bilinmeyen"],
    correctAnswer: "Kullarını çok seven ve sevilmeye layık olan",
    explanation: "İyi kullarını seven ve onların kalbine sevgisini yerleştiren demektir."
  },
  {
    id: 'eh_e_17',
    difficulty: 'easy',
    points: 10,
    question: "'El-Hak' isminin anlamı nedir?",
    options: ["Varlığı hiç değişmeden duran, Gerçek", "Yalan", "Hayal", "Geçici"],
    correctAnswer: "Varlığı hiç değişmeden duran, Gerçek",
    explanation: "Varlığı gerçek olan, hakkı ortaya çıkaran demektir."
  },
  {
    id: 'eh_e_18',
    difficulty: 'easy',
    points: 10,
    question: "'El-Hayy' isminin anlamı nedir?",
    options: ["Diri olan, hayat sahibi", "Ölü", "Uyuyan", "Yorgun"],
    correctAnswer: "Diri olan, hayat sahibi",
    explanation: "Ezeli ve ebedi bir hayata sahip olan, ölmeyen, diri demektir."
  },
  {
    id: 'eh_e_19',
    difficulty: 'easy',
    points: 10,
    question: "'El-Kayyum' isminin anlamı nedir?",
    options: ["Her şeyi ayakta tutan, idare eden", "Uyuyan", "Muhtaç olan", "Yorulan"],
    correctAnswer: "Her şeyi ayakta tutan, idare eden",
    explanation: "Gökleri ve yeri ayakta tutan, varlıkların devamını sağlayan demektir."
  },
  {
    id: 'eh_e_20',
    difficulty: 'easy',
    points: 10,
    question: "'El-Kadir' isminin anlamı nedir?",
    options: ["Her şeye gücü yeten", "Zayıf", "Aciz", "Bilgisiz"],
    correctAnswer: "Her şeye gücü yeten",
    explanation: "İstediğini yapmaya gücü yeten, kudret sahibi demektir."
  },
  {
    id: 'eh_e_21',
    difficulty: 'easy',
    points: 10,
    question: "'El-Mümin' isminin anlamı nedir?",
    options: ["Güven veren, emin kılan", "Korkutan", "İnanmayan", "Şüphe eden"],
    correctAnswer: "Güven veren, emin kılan",
    explanation: "Kullarına güven veren, onları korkulardan emin kılan demektir."
  },
  {
    id: 'eh_e_22',
    difficulty: 'easy',
    points: 10,
    question: "'El-Aziz' isminin anlamı nedir?",
    options: ["İzzet sahibi, her şeye galip gelen", "Zayıf", "Mağlup", "Sıradan"],
    correctAnswer: "İzzet sahibi, her şeye galip gelen",
    explanation: "Çok güçlü, şerefli ve mağlup edilmesi imkansız olan demektir."
  },
  {
    id: 'eh_e_23',
    difficulty: 'easy',
    points: 10,
    question: "'El-Cebbar' isminin anlamı nedir?",
    options: ["Dilediğini zorla yaptırabilen, kırıkları onaran", "Zayıf", "Kırılgan", "Çaresiz"],
    correctAnswer: "Dilediğini zorla yaptırabilen, kırıkları onaran",
    explanation: "Eksikleri tamamlayan ve iradesini her durumda yürüten demektir."
  },
  {
    id: 'eh_e_24',
    difficulty: 'easy',
    points: 10,
    question: "'El-Mütekebbir' isminin anlamı nedir?",
    options: ["Büyüklükte eşi olmayan", "Küçük", "Tevazulu", "Muhtaç"],
    correctAnswer: "Büyüklükte eşi olmayan",
    explanation: "Büyüklük ve ululuk sadece O'na aittir."
  },
  {
    id: 'eh_e_25',
    difficulty: 'easy',
    points: 10,
    question: "'El-Gani' isminin anlamı nedir?",
    options: ["Çok zengin, kimseye muhtaç olmayan", "Fakir", "Borçlu", "İsteyen"],
    correctAnswer: "Çok zengin, kimseye muhtaç olmayan",
    explanation: "Hiçbir şeye ihtiyacı olmayan, gerçek zenginliğin sahibi demektir."
  },
  {
    id: 'eh_e_26',
    difficulty: 'easy',
    points: 10,
    question: "'Eş-Şafi' isminin anlamı nedir?",
    options: ["Şifa veren", "Hasta eden", "Dert veren", "Üzen"],
    correctAnswer: "Şifa veren",
    explanation: "Maddi ve manevi hastalıklara şifa veren O'dur."
  },
  {
    id: 'eh_e_27',
    difficulty: 'easy',
    points: 10,
    question: "'El-Hadi' isminin anlamı nedir?",
    options: ["Hidayet veren, doğru yolu gösteren", "Saptıran", "Yolunu kaybeden", "Unutan"],
    correctAnswer: "Hidayet veren, doğru yolu gösteren",
    explanation: "Kullarına doğru yolu gösteren ve hidayete erdiren demektir."
  },
  {
    id: 'eh_e_28',
    difficulty: 'easy',
    points: 10,
    question: "'En-Nur' isminin anlamı nedir?",
    options: ["Alemleri nurlandıran, aydınlatan", "Karanlık", "Gölge", "Gece"],
    correctAnswer: "Alemleri nurlandıran, aydınlatan",
    explanation: "Göklerin ve yerin nuru O'dur, kalpleri imanla aydınlatır."
  },
  {
    id: 'eh_e_29',
    difficulty: 'easy',
    points: 10,
    question: "'Et-Tevvab' isminin anlamı nedir?",
    options: ["Tövbeleri kabul eden", "Tövbe eden", "Günah işleyen", "Reddeden"],
    correctAnswer: "Tövbeleri kabul eden",
    explanation: "Kulları tövbe ettikçe onları kabul eden ve affeden demektir."
  },
  {
    id: 'eh_e_30',
    difficulty: 'easy',
    points: 10,
    question: "'El-Afuvv' isminin anlamı nedir?",
    options: ["Çokça affeden", "Cezalandıran", "İntikam alan", "Unutmayan"],
    correctAnswer: "Çokça affeden",
    explanation: "Günahları affeden ve silen demektir."
  },
  {
    id: 'eh_e_31',
    difficulty: 'easy',
    points: 10,
    question: "'Es-Sabur' isminin anlamı nedir?",
    options: ["Çok sabırlı, cezayı acele etmeyen", "Aceleci", "Kızgın", "Telaşlı"],
    correctAnswer: "Çok sabırlı, cezayı acele etmeyen",
    explanation: "Günahkarları hemen cezalandırmayıp onlara süre tanıyan demektir."
  },
  {
    id: 'eh_e_32',
    difficulty: 'easy',
    points: 10,
    question: "'El-Evvel' isminin anlamı nedir?",
    options: ["Başlangıcı olmayan, ilk", "Son", "İkinci", "Ortanca"],
    correctAnswer: "Başlangıcı olmayan, ilk",
    explanation: "Her şeyden önce var olan, varlığının başlangıcı olmayandır."
  },
  {
    id: 'eh_e_33',
    difficulty: 'easy',
    points: 10,
    question: "'El-Ahir' isminin anlamı nedir?",
    options: ["Sonu olmayan, her şey yok olduktan sonra kalan", "İlk", "Başlangıç", "Ölümlü"],
    correctAnswer: "Sonu olmayan, her şey yok olduktan sonra kalan",
    explanation: "Varlığının sonu olmayan, ebedi olandır."
  },
  {
    id: 'eh_e_34',
    difficulty: 'easy',
    points: 10,
    question: "'El-Vahid' isminin anlamı nedir?",
    options: ["Bir ve Tek olan", "Çok olan", "İki olan", "Parçalanmış"],
    correctAnswer: "Bir ve Tek olan",
    explanation: "Zatında, sıfatlarında ve işlerinde ortağı olmayan, Tek'tir."
  },
  {
    id: 'eh_e_35',
    difficulty: 'easy',
    points: 10,
    question: "'Es-Samed' isminin anlamı nedir?",
    options: ["Herkesin O'na muhtaç olduğu ama O'nun kimseye muhtaç olmadığı", "Yiyip içen", "Uyuyan", "Doğmuş"],
    correctAnswer: "Herkesin O'na muhtaç olduğu ama O'nun kimseye muhtaç olmadığı",
    explanation: "İhlas suresinde geçer; hiçbir şeye muhtaç olmayan demektir."
  },
  {
    id: 'eh_e_36',
    difficulty: 'easy',
    points: 10,
    question: "'El-Mucib' isminin anlamı nedir?",
    options: ["Dualara cevap veren", "Soru soran", "İsteyen", "Reddeden"],
    correctAnswer: "Dualara cevap veren",
    explanation: "Kullarının dualarını işiten ve onlara karşılık veren demektir."
  },
  {
    id: 'eh_e_37',
    difficulty: 'easy',
    points: 10,
    question: "'El-Hafız' isminin anlamı nedir?",
    options: ["Koruyup gözeten", "Unutan", "Kaybeden", "Terk eden"],
    correctAnswer: "Koruyup gözeten",
    explanation: "Yarattıklarını her türlü tehlikeden koruyan ve amelleri kaydeden demektir."
  },
  {
    id: 'eh_e_38',
    difficulty: 'easy',
    points: 10,
    question: "'El-Adl' isminin anlamı nedir?",
    options: ["Mutlak adalet sahibi", "Zalim", "Haksız", "Kararsız"],
    correctAnswer: "Mutlak adalet sahibi",
    explanation: "Asla zulmetmeyen, her işi adaletli olan demektir."
  },
  {
    id: 'eh_e_39',
    difficulty: 'easy',
    points: 10,
    question: "'El-Latif' isminin anlamı nedir?",
    options: ["Lütuf sahibi, en ince işleri bilen", "Kaba", "Sert", "Bilgisiz"],
    correctAnswer: "Lütuf sahibi, en ince işleri bilen",
    explanation: "Kullarına yumuşaklıkla muamele eden ve gizli incelikleri bilen demektir."
  },
  {
    id: 'eh_e_40',
    difficulty: 'easy',
    points: 10,
    question: "'El-Kuddüs' isminin anlamı nedir?",
    options: ["Her türlü eksiklikten temiz ve pak olan", "Hatalı", "Kirli", "Eksik"],
    correctAnswer: "Her türlü eksiklikten temiz ve pak olan",
    explanation: "Hatadan, gafletten ve her türlü noksanlıktan uzak, tertemiz demektir."
  },
  // --------------------------------------------------------
  // 🟡 ORTA SEVİYE (1-40) - ESMA-İ HÜSNA (20 PUAN)
  // --------------------------------------------------------
  {
    id: 'eh_m_1',
    difficulty: 'medium',
    points: 20,
    question: "'El-Musavvir' isminin anlamı nedir?",
    options: ["Varlıklara şekil ve suret veren", "Rızık veren", "Can alan", "Hesap gören"],
    correctAnswer: "Varlıklara şekil ve suret veren",
    explanation: "Her varlığı ayrı bir surette, en güzel şekilde tasvir eden ve şekillendiren demektir."
  },
  {
    id: 'eh_m_2',
    difficulty: 'medium',
    points: 20,
    question: "'El-Bâri' isminin anlamı nedir?",
    options: ["Örneği olmadan kusursuzca yaratan", "Çok güçlü olan", "Günahları örten", "Zengin eden"],
    correctAnswer: "Örneği olmadan kusursuzca yaratan",
    explanation: "Yarattıklarını düzgün ve ahenkli bir biçimde, örneği olmaksızın var eden demektir."
  },
  {
    id: 'eh_m_3',
    difficulty: 'medium',
    points: 20,
    question: "'El-Kahhar' isminin anlamı nedir?",
    options: ["Her şeye galip gelen ve mutlak hakim olan", "Çok affeden", "Rızık veren", "Yol gösteren"],
    correctAnswer: "Her şeye galip gelen ve mutlak hakim olan",
    explanation: "Düşmanlarını kahreden, her şeye boyun eğdiren ve mutlak galip olan demektir."
  },
  {
    id: 'eh_m_4',
    difficulty: 'medium',
    points: 20,
    question: "'El-Vehhab' isminin anlamı nedir?",
    options: ["Karşılıksız ve çokça bağışlayan/veren", "Hesap soran", "Korkutan", "Gizleyen"],
    correctAnswer: "Karşılıksız ve çokça bağışlayan/veren",
    explanation: "Hibesi (hediyesi) bol olan, karşılık beklemeden nimetlerini bağışlayan demektir."
  },
  {
    id: 'eh_m_5',
    difficulty: 'medium',
    points: 20,
    question: "'El-Bâsit' isminin anlamı nedir?",
    options: ["Rızkı genişleten, ferahlatan", "Rızkı daraltan", "Yaratan", "Öldüren"],
    correctAnswer: "Rızkı genişleten, ferahlatan",
    explanation: "Kullarının rızkını genişleten, ruhlarını ferahlatan ve yayan demektir. (Kabıd isminin zıddıdır)."
  },
  {
    id: 'eh_m_6',
    difficulty: 'medium',
    points: 20,
    question: "'El-Kâbıd' isminin anlamı nedir?",
    options: ["Rızkı daraltan, ruhları kabzeden (alan)", "Rızkı açan", "Şifa veren", "Yücelten"],
    correctAnswer: "Rızkı daraltan, ruhları kabzeden (alan)",
    explanation: "İmtihan gereği dilediğinin rızkını daraltan ve eceli gelenlerin ruhunu alan demektir."
  },
  {
    id: 'eh_m_7',
    difficulty: 'medium',
    points: 20,
    question: "'El-Muizz' isminin anlamı nedir?",
    options: ["İzzet ve şeref veren, yükselten", "Zillete düşüren", "Öldüren", "Rızıklandıran"],
    correctAnswer: "İzzet ve şeref veren, yükselten",
    explanation: "Dilediği kulunu aziz kılan, ona itibar ve şeref bahşeden demektir."
  },
  {
    id: 'eh_m_8',
    difficulty: 'medium',
    points: 20,
    question: "'El-Müzill' isminin anlamı nedir?",
    options: ["Zillete düşüren, hor ve hakir kılan", "Yükselten", "Affeden", "Seven"],
    correctAnswer: "Zillete düşüren, hor ve hakir kılan",
    explanation: "Dilediğini (isyankarları) rezil eden, makamından indirip değersizleştiren demektir."
  },
  {
    id: 'eh_m_9',
    difficulty: 'medium',
    points: 20,
    question: "'El-Habîr' isminin anlamı nedir?",
    options: ["Her şeyin iç yüzünden, gizli taraflarından haberdar olan", "Sadece görüneni bilen", "Güçlü olan", "Yaratan"],
    correctAnswer: "Her şeyin iç yüzünden, gizli taraflarından haberdar olan",
    explanation: "Olayların en gizli yönlerini ve haberlerini bilen demektir."
  },
  {
    id: 'eh_m_10',
    difficulty: 'medium',
    points: 20,
    question: "'El-Halîm' isminin anlamı nedir?",
    options: ["Acele etmeyen, yumuşak davranan, cezayı erteleyen", "Çok sert olan", "Hemen cezalandıran", "Bilmeyen"],
    correctAnswer: "Acele etmeyen, yumuşak davranan, cezayı erteleyen",
    explanation: "Kullarına karşı şefkatli olup, isyanlarına rağmen cezalandırmada acele etmeyen demektir."
  },
  {
    id: 'eh_m_11',
    difficulty: 'medium',
    points: 20,
    question: "'El-Azîm' isminin anlamı nedir?",
    options: ["Pek yüce, büyüklükte benzeri olmayan", "Küçük", "Aciz", "Muhtaç"],
    correctAnswer: "Pek yüce, büyüklükte benzeri olmayan",
    explanation: "Akıl ve hayalin idrak edemeyeceği kadar büyük ve yüce olan demektir."
  },
  {
    id: 'eh_m_12',
    difficulty: 'medium',
    points: 20,
    question: "'El-Şekûr' isminin anlamı nedir?",
    options: ["Az amele çok sevap veren, şükrün karşılığını veren", "Şükreden", "Unutan", "Cezalandıran"],
    correctAnswer: "Az amele çok sevap veren, şükrün karşılığını veren",
    explanation: "Kullarının şükrünü kabul eden ve az iyiliğe kat kat mükafat veren demektir."
  },
  {
    id: 'eh_m_13',
    difficulty: 'medium',
    points: 20,
    question: "'El-Aliyy' isminin anlamı nedir?",
    options: ["Yüceler yücesi, her şeyden üstün", "Alçakgönüllü", "Yakın olan", "Bilen"],
    correctAnswer: "Yüceler yücesi, her şeyden üstün",
    explanation: "Makam ve mertebece en yüksek olan, her şeyin fevkinde olan demektir."
  },
  {
    id: 'eh_m_14',
    difficulty: 'medium',
    points: 20,
    question: "'El-Hafîz' isminin anlamı nedir?",
    options: ["Her şeyi koruyan ve gözeten", "Unutan", "Terk eden", "Yaratan"],
    correctAnswer: "Her şeyi koruyan ve gözeten",
    explanation: "Varlıkları yok olmaktan koruyan, yapılan işleri kaydedip muhafaza eden demektir."
  },
  {
    id: 'eh_m_15',
    difficulty: 'medium',
    points: 20,
    question: "'El-Mukît' isminin anlamı nedir?",
    options: ["Her yaratılmışın rızkını ve gıdasını veren", "Öldüren", "Dirilten", "Bilen"],
    correctAnswer: "Her yaratılmışın rızkını ve gıdasını veren",
    explanation: "Bedenlerin ve ruhların gıdasını yaratan ve ulaştıran demektir."
  },
  {
    id: 'eh_m_16',
    difficulty: 'medium',
    points: 20,
    question: "'El-Hasîb' isminin anlamı nedir?",
    options: ["Herkesin hesabını en iyi gören", "Hesap bilmeyen", "Unutan", "Zayıf"],
    correctAnswer: "Herkesin hesabını en iyi gören",
    explanation: "Kullarının hesabını tutan ve onlara yeten demektir."
  },
  {
    id: 'eh_m_17',
    difficulty: 'medium',
    points: 20,
    question: "'El-Celâl' isminin anlamı nedir?",
    options: ["Azamet ve heybet sahibi", "Güzellik sahibi", "Merhamet sahibi", "İlim sahibi"],
    correctAnswer: "Azamet ve heybet sahibi",
    explanation: "Sonsuz büyüklük, yücelik ve heybet sahibi olan demektir."
  },
  {
    id: 'eh_m_18',
    difficulty: 'medium',
    points: 20,
    question: "'El-Mücîb' isminin anlamı nedir?",
    options: ["Duaları kabul eden ve cevap veren", "Cevap vermeyen", "Duymayan", "Uzak olan"],
    correctAnswer: "Duaları kabul eden ve cevap veren",
    explanation: "Kendine yalvaranların isteklerini işiten ve onlara icabet eden demektir."
  },
  {
    id: 'eh_m_19',
    difficulty: 'medium',
    points: 20,
    question: "'El-Vâsi' isminin anlamı nedir?",
    options: ["İlmi, rahmeti ve kudreti geniş ve kuşatıcı olan", "Dar olan", "Cimri olan", "Sınırlı olan"],
    correctAnswer: "İlmi, rahmeti ve kudreti geniş ve kuşatıcı olan",
    explanation: "Lütfu bol, hazinesi geniş ve her şeyi kuşatan demektir."
  },
  {
    id: 'eh_m_20',
    difficulty: 'medium',
    points: 20,
    question: "'El-Hakîm' isminin anlamı nedir?",
    options: ["Her işi hikmetli ve yerli yerinde olan", "Hüküm vermeyen", "Bilgisiz", "Aceleci"],
    correctAnswer: "Her işi hikmetli ve yerli yerinde olan",
    explanation: "Yaptığı her şeyde bir fayda ve hikmet bulunan, boş iş yapmayan demektir."
  },
  {
    id: 'eh_m_21',
    difficulty: 'medium',
    points: 20,
    question: "'El-Baîs' isminin anlamı nedir?",
    options: ["Ölüleri dirilten ve peygamber gönderen", "Öldüren", "Uyutan", "Rızık veren"],
    correctAnswer: "Ölüleri dirilten ve peygamber gönderen",
    explanation: "Kıyamet günü ölüleri diriltip kabirlerinden çıkaran demektir."
  },
  {
    id: 'eh_m_22',
    difficulty: 'medium',
    points: 20,
    question: "'Eş-Şehîd' isminin anlamı nedir?",
    options: ["Her şeye şahit olan, her yerde hazır bulunan", "Görmeyen", "Uzakta olan", "Bilmeyen"],
    correctAnswer: "Her şeye şahit olan, her yerde hazır bulunan",
    explanation: "Hiçbir şey O'ndan gizli kalmaz, her olayın tanığı ve şahididir."
  },
  {
    id: 'eh_m_23',
    difficulty: 'medium',
    points: 20,
    question: "'El-Vekîl' isminin anlamı nedir?",
    options: ["Kullarının işlerini en iyi şekilde yoluna koyan, güvenilen", "Güvenilmeyen", "Zayıf", "Aciz"],
    correctAnswer: "Kullarının işlerini en iyi şekilde yoluna koyan, güvenilen",
    explanation: "Kendisine güvenip dayananların işini en iyi şekilde idare eden demektir."
  },
  {
    id: 'eh_m_24',
    difficulty: 'medium',
    points: 20,
    question: "'El-Kavî' isminin anlamı nedir?",
    options: ["Çok güçlü, kuvvetli", "Zayıf", "Yorgun", "Hasta"],
    correctAnswer: "Çok güçlü, kuvvetli",
    explanation: "Gücüne güç yetmeyen, yorulmayan ve zayıflamayan demektir."
  },
  {
    id: 'eh_m_25',
    difficulty: 'medium',
    points: 20,
    question: "'El-Metîn' isminin anlamı nedir?",
    options: ["Çok sağlam ve dayanıklı, sarsılmaz", "Kırılgan", "Geçici", "Yumuşak"],
    correctAnswer: "Çok sağlam ve dayanıklı, sarsılmaz",
    explanation: "Kuvveti çok şiddetli olan, hiçbir şeyle sarsılmayan demektir."
  },
  {
    id: 'eh_m_26',
    difficulty: 'medium',
    points: 20,
    question: "'El-Veliyy' isminin anlamı nedir?",
    options: ["Müminlerin dostu ve yardımcısı", "Düşman", "Uzak", "Tanıdık"],
    correctAnswer: "Müminlerin dostu ve yardımcısı",
    explanation: "Sevdiği kullarına yardım eden, onların işlerini üstlenen dost demektir."
  },
  {
    id: 'eh_m_27',
    difficulty: 'medium',
    points: 20,
    question: "'El-Hamîd' isminin anlamı nedir?",
    options: ["Her türlü övgüye layık olan", "Övülmeyen", "Eleştirilen", "Bilinmeyen"],
    correctAnswer: "Her türlü övgüye layık olan",
    explanation: "Bütün varlıkların diliyle övülen ve hamd sadece kendisine mahsus olan demektir."
  },
  {
    id: 'eh_m_28',
    difficulty: 'medium',
    points: 20,
    question: "'El-Muhsî' isminin anlamı nedir?",
    options: ["Her şeyin sayısını bilen ve tek tek sayan", "Unutan", "Karıştıran", "Tahmin eden"],
    correctAnswer: "Her şeyin sayısını bilen ve tek tek sayan",
    explanation: "İlmiyle her şeyi kuşatan, bütün varlıkların adetlerini bilen demektir."
  },
  {
    id: 'eh_m_29',
    difficulty: 'medium',
    points: 20,
    question: "'El-Mübdi' isminin anlamı nedir?",
    options: ["Varlıkları maddesiz ve örneksiz olarak ilk baştan yaratan", "Tekrar eden", "Sonlandıran", "Koruyan"],
    correctAnswer: "Varlıkları maddesiz ve örneksiz olarak ilk baştan yaratan",
    explanation: "Yaratmayı ilk başlatan, yoktan var eden demektir."
  },
  {
    id: 'eh_m_30',
    difficulty: 'medium',
    points: 20,
    question: "'El-Muîd' isminin anlamı nedir?",
    options: ["Yaratılmışları yok ettikten sonra tekrar dirilten", "İlk yaratan", "Rızık veren", "Öldüren"],
    correctAnswer: "Yaratılmışları yok ettikten sonra tekrar dirilten",
    explanation: "Hayatı geri çeviren, öldükten sonra tekrar yaratan demektir."
  },
  {
    id: 'eh_m_31',
    difficulty: 'medium',
    points: 20,
    question: "'El-Muhyî' isminin anlamı nedir?",
    options: ["Can veren, dirilten", "Öldüren", "Uyutan", "Donduran"],
    correctAnswer: "Can veren, dirilten",
    explanation: "Ölüleri dirilten, canlılara hayat veren demektir."
  },
  {
    id: 'eh_m_32',
    difficulty: 'medium',
    points: 20,
    question: "'El-Mümît' isminin anlamı nedir?",
    options: ["Canlıları öldüren, ölümü yaratan", "Dirilten", "Yaşatan", "Besleyen"],
    correctAnswer: "Canlıları öldüren, ölümü yaratan",
    explanation: "Her canlıya ölümü tattıran, ecelleri geldiğinde ruhları alan demektir."
  },
  {
    id: 'eh_m_33',
    difficulty: 'medium',
    points: 20,
    question: "'El-Vâcid' isminin anlamı nedir?",
    options: ["İstediğini bulan, hiçbir şeye muhtaç olmayan", "Kaybeden", "Arayan", "Fakir"],
    correctAnswer: "İstediğini bulan, hiçbir şeye muhtaç olmayan",
    explanation: "Zengin olan, dilediği şeyi dilediği vakitte bulan demektir."
  },
  {
    id: 'eh_m_34',
    difficulty: 'medium',
    points: 20,
    question: "'El-Mucid' isminin anlamı nedir?",
    options: ["Şanı yüce, keremi bol olan", "Küçük", "Cimri", "Zayıf"],
    correctAnswer: "Şanı yüce, keremi bol olan",
    explanation: "Şanı ve şerefi üstün, lütfu geniş olan demektir. (Not: Kuran'da 'Mecid' olarak geçer)."
  },
  {
    id: 'eh_m_35',
    difficulty: 'medium',
    points: 20,
    question: "'El-Mukaddim' isminin anlamı nedir?",
    options: ["Dilediğini öne alan, ileri geçiren", "Geri bırakan", "Duruduran", "Yok eden"],
    correctAnswer: "Dilediğini öne alan, ileri geçiren",
    explanation: "İstediği kulunu veya varlığı, derecesine göre öne alan demektir."
  },
  {
    id: 'eh_m_36',
    difficulty: 'medium',
    points: 20,
    question: "'El-Muahhir' isminin anlamı nedir?",
    options: ["Dilediğini geriye bırakan, erteleyen", "Öne alan", "Hızlandıran", "Başlatan"],
    correctAnswer: "Dilediğini geriye bırakan, erteleyen",
    explanation: "İstediği kulunu veya cezayı sona bırakan, tehir eden demektir."
  },
  {
    id: 'eh_m_37',
    difficulty: 'medium',
    points: 20,
    question: "'El-Berr' isminin anlamı nedir?",
    options: ["İyiliği ve bağışı çok olan", "Kötülük eden", "Cezalandıran", "Uzak duran"],
    correctAnswer: "İyiliği ve bağışı çok olan",
    explanation: "Kullarına karşı çok şefkatli, lütufkar ve iyiliği bol olan demektir."
  },
  {
    id: 'eh_m_38',
    difficulty: 'medium',
    points: 20,
    question: "'El-Müntekim' isminin anlamı nedir?",
    options: ["Suçluları adaletiyle cezalandıran (İntikam alan)", "Affeden", "Görmezden gelen", "Ödül veren"],
    correctAnswer: "Suçluları adaletiyle cezalandıran (İntikam alan)",
    explanation: "Zalimlerden ve günahkarlardan, yaptıklarının karşılığı olarak intikam alan demektir."
  },
  {
    id: 'eh_m_39',
    difficulty: 'medium',
    points: 20,
    question: "'El-Raûf' isminin anlamı nedir?",
    options: ["Çok şefkatli, merhameti bol olan", "Sert olan", "Kızgın olan", "Uzak olan"],
    correctAnswer: "Çok şefkatli, merhameti bol olan",
    explanation: "Kullarına acıyan, çok esirgeyen (Rahim'den daha ince bir şefkat) demektir."
  },
  {
    id: 'eh_m_40',
    difficulty: 'medium',
    points: 20,
    question: "'El-Câmi' isminin anlamı nedir?",
    options: ["İstediğini istediği zaman toplayan", "Dağıtan", "Ayıran", "Bölen"],
    correctAnswer: "İstediğini istediği zaman toplayan",
    explanation: "Kıyamet günü mahlukatı bir araya toplayan, zıtları birleştiren demektir."
  },
  // --------------------------------------------------------
  // 🔴 ZOR SEVİYE (1-40) - ESMA-İ HÜSNA (30 PUAN)
  // --------------------------------------------------------
  {
    id: 'eh_h_1',
    difficulty: 'hard',
    points: 30,
    question: "'El-Muksit' isminin anlamı nedir?",
    options: ["Bütün işlerini denk, birbirine uygun ve yerli yerinde yapan (Adil)", "Zengin eden", "Kısan", "Bölen"],
    correctAnswer: "Bütün işlerini denk, birbirine uygun ve yerli yerinde yapan (Adil)",
    explanation: "Mazlumun hakkını zalimden alan, hükmünde adaletli ve dengeli olan demektir."
  },
  {
    id: 'eh_h_2',
    difficulty: 'hard',
    points: 30,
    question: "'El-Mâni' isminin anlamı nedir?",
    options: ["Dilemediği şeyin gerçekleşmesine izin vermeyen, engelleyen", "Zorlaştıran", "Unutan", "Terk eden"],
    correctAnswer: "Dilemediği şeyin gerçekleşmesine izin vermeyen, engelleyen",
    explanation: "Bir şeyin meydana gelmesini istemezse ona engel olan, koruyucu sebepler yaratan demektir."
  },
  {
    id: 'eh_h_3',
    difficulty: 'hard',
    points: 30,
    question: "'Ed-Dârr' isminin anlamı nedir?",
    options: ["Hikmeti gereği elem ve zarar verici şeyleri yaratan", "Fayda veren", "Seven", "Acıyan"],
    correctAnswer: "Hikmeti gereği elem ve zarar verici şeyleri yaratan",
    explanation: "İmtihan için dilediğine sıkıntı ve zarar veren (Nâfi isminin zıddıdır, birlikte zikredilir)."
  },
  {
    id: 'eh_h_4',
    difficulty: 'hard',
    points: 30,
    question: "'En-Nâfi' isminin anlamı nedir?",
    options: ["Hayır ve fayda veren şeyleri yaratan", "Zarar veren", "Uzaklaştıran", "Gizleyen"],
    correctAnswer: "Hayır ve fayda veren şeyleri yaratan",
    explanation: "Kullarına faydalı olanı yaratan ve onlara ulaştıran demektir."
  },
  {
    id: 'eh_h_5',
    difficulty: 'hard',
    points: 30,
    question: "'El-Bâkî' isminin anlamı nedir?",
    options: ["Varlığının sonu olmayan, ebedi kalan", "Geçici olan", "İlk olan", "Ölümlü olan"],
    correctAnswer: "Varlığının sonu olmayan, ebedi kalan",
    explanation: "Her şey yok olduktan sonra varlığı devam edecek olan tek Zat demektir."
  },
  {
    id: 'eh_h_6',
    difficulty: 'hard',
    points: 30,
    question: "'El-Vâris' isminin anlamı nedir?",
    options: ["Mülkün gerçek sahibi, her şey yok olunca geriye kalan", "Mirasçı", "Miras bırakan", "Bölüştüren"],
    correctAnswer: "Mülkün gerçek sahibi, her şey yok olunca geriye kalan",
    explanation: "Mülklerin geçici sahipleri öldükten sonra mülkün kendisine kaldığı gerçek sahip demektir."
  },
  {
    id: 'eh_h_7',
    difficulty: 'hard',
    points: 30,
    question: "'Er-Reşîd' isminin anlamı nedir?",
    options: ["Bütün işleri isabetli olan, doğru yolu gösteren", "Acele eden", "Yolunu şaşıran", "Kararsız"],
    correctAnswer: "Bütün işleri isabetli olan, doğru yolu gösteren",
    explanation: "Kullarını en doğru yola (irşad) ileten ve işlerinde yanılmayan demektir."
  },
  {
    id: 'eh_h_8',
    difficulty: 'hard',
    points: 30,
    question: "'Malikü'l-Mülk' isminin anlamı nedir?",
    options: ["Mülkün ebedi ve mutlak sahibi", "Zengin bir kral", "Toprak sahibi", "Hazineci"],
    correctAnswer: "Mülkün ebedi ve mutlak sahibi",
    explanation: "Kainatın tek ve gerçek sahibi, dilediği gibi tasarruf eden demektir."
  },
  {
    id: 'eh_h_9',
    difficulty: 'hard',
    points: 30,
    question: "'Zü'l-Celâli ve'l-İkrâm' isminin anlamı nedir?",
    options: ["Hem büyüklük (azamet) hem de kerem (ikram) sahibi", "Sadece korkulan", "Sadece seven", "Uzak durulan"],
    correctAnswer: "Hem büyüklük (azamet) hem de kerem (ikram) sahibi",
    explanation: "Hem celal (azamet/korku) hem de cemal (güzellik/lütuf) sıfatlarını kendinde toplayan demektir."
  },
  {
    id: 'eh_h_10',
    difficulty: 'hard',
    points: 30,
    question: "'El-Bedî' isminin anlamı nedir?",
    options: ["Örneksiz, benzersiz ve harika yaratan", "Taklit eden", "Tekrar eden", "Eski olan"],
    correctAnswer: "Örneksiz, benzersiz ve harika yaratan",
    explanation: "Eserlerini bir örnek model olmadan, eşsiz bir sanatla yaratan demektir."
  },
  {
    id: 'eh_h_11',
    difficulty: 'hard',
    points: 30,
    question: "'El-Bâtın' isminin anlamı nedir?",
    options: ["Mahiyeti gizli olan, akılla idrak edilemeyen", "Görünen", "Maddi olan", "Yok olan"],
    correctAnswer: "Mahiyeti gizli olan, akılla idrak edilemeyen",
    explanation: "Gözle görülmeyen ama varlığı kesin olan, mahiyeti gizli demektir."
  },
  {
    id: 'eh_h_12',
    difficulty: 'hard',
    points: 30,
    question: "'Ez-Zâhir' isminin anlamı nedir?",
    options: ["Varlığı her şeyde açıkça görünen (delilleriyle)", "Gizli olan", "Bilinmeyen", "Uzak olan"],
    correctAnswer: "Varlığı her şeyde açıkça görünen (delilleriyle)",
    explanation: "Yarattığı eserlerle varlığı ve birliği açıkça belli olan demektir."
  },
  {
    id: 'eh_h_13',
    difficulty: 'hard',
    points: 30,
    question: "'El-Hafîd' isminin anlamı nedir?",
    options: ["Kafirleri ve isyankarları alçaltan", "Yükselten", "Koruyan", "Seven"],
    correctAnswer: "Kafirleri ve isyankarları alçaltan",
    explanation: "Kendisine isyan edenleri manen ve madden aşağı düşüren demektir. (Rafi' isminin zıddıdır)."
  },
  {
    id: 'eh_h_14',
    difficulty: 'hard',
    points: 30,
    question: "'Er-Râfi' isminin anlamı nedir?",
    options: ["Dilediğini yükselten, şeref veren", "Alçaltan", "Düşüren", "Gizleyen"],
    correctAnswer: "Dilediğini yükselten, şeref veren",
    explanation: "Mümin kullarının derecesini yükselten demektir."
  },
  {
    id: 'eh_h_15',
    difficulty: 'hard',
    points: 30,
    question: "'El-Vâlî' isminin anlamı nedir?",
    options: ["Kainatı tek başına idare eden", "Vali atayan", "Yardımcı", "Memur"],
    correctAnswer: "Kainatı tek başına idare eden",
    explanation: "Bütün kainatın yöneticisi ve idarecisi demektir."
  },
  {
    id: 'eh_h_16',
    difficulty: 'hard',
    points: 30,
    question: "'El-Müteâlî' isminin anlamı nedir?",
    options: ["Aklın alabileceği her şeyden yüce olan", "Alçak olan", "Benzeri olan", "Yakın olan"],
    correctAnswer: "Aklın alabileceği her şeyden yüce olan",
    explanation: "Yaratılmışların sıfatlarından ve noksanlıklardan sonsuz derecede yüce demektir."
  },
  {
    id: 'eh_h_17',
    difficulty: 'hard',
    points: 30,
    question: "'El-Muğnî' isminin anlamı nedir?",
    options: ["İstediğini zengin eden", "Fakirleştiren", "Muhtaç eden", "Alan"],
    correctAnswer: "İstediğini zengin eden",
    explanation: "Kullarına mal mülk vererek onları zengin kılan demektir."
  },
  {
    id: 'eh_h_18',
    difficulty: 'hard',
    points: 30,
    question: "'El-Muktedir' isminin anlamı nedir?",
    options: ["Kuvvet ve kudret sahipleri üzerinde dilediği gibi tasarruf eden", "Zayıf", "Aciz", "Muhtaç"],
    correctAnswer: "Kuvvet ve kudret sahipleri üzerinde dilediği gibi tasarruf eden",
    explanation: "Gücü her şeye yeten, iktidarlı ve kudretli olan demektir (Kadir isminden daha vurguludur)."
  },
  {
    id: 'eh_h_19',
    difficulty: 'hard',
    points: 30,
    question: "'El-Müheymin' isminin anlamı nedir?",
    options: ["Gözetip koruyan, kainatın bütün işlerini idare eden", "Korkutan", "Bilmeyen", "Unutan"],
    correctAnswer: "Gözetip koruyan, kainatın bütün işlerini idare eden",
    explanation: "Yarattıklarının amellerini, rızıklarını ve ecellerini gözetip kollayan demektir."
  },
  {
    id: 'eh_h_20',
    difficulty: 'hard',
    points: 30,
    question: "'El-Hakem' isminin anlamı nedir?",
    options: ["Hükmeden, hakkı batıldan ayıran", "İzleyen", "Bilen", "Duyan"],
    correctAnswer: "Hükmeden, hakkı batıldan ayıran",
    explanation: "Son hükmü veren, hakemliği reddedilemeyen demektir."
  },
  {
    id: 'eh_h_21',
    difficulty: 'hard',
    points: 30,
    question: "'El-Kebîr' isminin anlamı nedir?",
    options: ["Büyüklüğü sonsuz olan", "Küçük", "Sınırlı", "Aciz"],
    correctAnswer: "Büyüklüğü sonsuz olan",
    explanation: "Büyüklüğünün sınırı ve ölçüsü olmayan, mutlak büyük demektir."
  },
  {
    id: 'eh_h_22',
    difficulty: 'hard',
    points: 30,
    question: "'El-Gafûr' isminin anlamı nedir?",
    options: ["Affı ve mağfireti pek çok olan", "Cezalandıran", "Görmezden gelen", "Unutan"],
    correctAnswer: "Affı ve mağfireti pek çok olan",
    explanation: "Günah ne kadar çok olursa olsun, onları örten ve bağışlayan demektir."
  },
  {
    id: 'eh_h_23',
    difficulty: 'hard',
    points: 30,
    question: "'El-Vâcid' isminin anlamı nedir?",
    options: ["Zengin ve varlıklı olan, istediğini bulan", "Fakir", "Kaybeden", "Arayan"],
    correctAnswer: "Zengin ve varlıklı olan, istediğini bulan",
    explanation: "Kendisi için bir ihtiyaç söz konusu olmayan, her şeye sahip olan demektir."
  },
  {
    id: 'eh_h_24',
    difficulty: 'hard',
    points: 30,
    question: "'El-Mâcid' isminin anlamı nedir?",
    options: ["Kadri ve şanı büyük, keremi bol olan", "Sıradan", "Cimri", "Bilinmeyen"],
    correctAnswer: "Kadri ve şanı büyük, keremi bol olan",
    explanation: "Şanı yüce ve ihsanı bol olan demektir (Mecid ismiyle yakın anlamlıdır)."
  },
  {
    id: 'eh_h_25',
    difficulty: 'hard',
    points: 30,
    question: "'El-Vâhid' ve 'El-Ehad' isimleri arasındaki fark genelde nasıl açıklanır?",
    options: ["Vahid sıfatlarında tek, Ehad zatında tektir", "Fark yoktur", "Vahid çokluk, Ehad teklik demektir", "Ehad önce, Vahid sonradır"],
    correctAnswer: "Vahid sıfatlarında tek, Ehad zatında tektir",
    explanation: "Genellikle Vahid; sıfatlarında ortağı olmayan (Tek), Ehad ise; zatında parçalanmayan (Birlik) anlamında kullanılır."
  },
  {
    id: 'eh_h_26',
    difficulty: 'hard',
    points: 30,
    question: "'Et-Tevvâb' ismi Allah için kullanıldığında ne anlama gelir?",
    options: ["Kullarının tövbesini kabul edip, tövbe nasip eden", "Tövbe eden", "Pişman olan", "Hata yapan"],
    correctAnswer: "Kullarının tövbesini kabul edip, tövbe nasip eden",
    explanation: "Kullarını tövbeye yönelten ve tövbelerini kabul eden demektir."
  },
  {
    id: 'eh_h_27',
    difficulty: 'hard',
    points: 30,
    question: "'El-Afüvv' ismi ile 'El-Gafûr' ismi arasındaki ince fark nedir?",
    options: ["Gafur örter, Afüvv ise günahı tamamen siler (yok eder)", "Afüvv örter, Gafur siler", "İkisi de aynıdır", "Gafur ceza verir"],
    correctAnswer: "Gafur örter, Afüvv ise günahı tamamen siler (yok eder)",
    explanation: "Afüvv; günahı kökünden kazıyıp silen, kiramen katibin defterinden bile yok eden demektir."
  },
  {
    id: 'eh_h_28',
    difficulty: 'hard',
    points: 30,
    question: "'El-Berr' isminin anlamı nedir?",
    options: ["Kullarına karşı iyiliği ve lütfu bol olan", "Toprak sahibi", "Sert olan", "Uzak olan"],
    correctAnswer: "Kullarına karşı iyiliği ve lütfu bol olan",
    explanation: "İyilik eden, vaadinde sadık kalan ve kullarına şefkatli olan demektir."
  },
  {
    id: 'eh_h_29',
    difficulty: 'hard',
    points: 30,
    question: "'El-Câmi' isminin tecellisi en büyük nerede görülecektir?",
    options: ["Mahşer meydanında", "Dünyada", "Kabirde", "Uykuda"],
    correctAnswer: "Mahşer meydanında",
    explanation: "Bütün mahlukatı, kemikleri çürümüş olsa bile bir araya toplamasıyla en büyük tecelli Mahşer'de olacaktır."
  },
  {
    id: 'eh_h_30',
    difficulty: 'hard',
    points: 30,
    question: "'En-Nûr' ismi Allah için kullanıldığında ne ifade eder?",
    options: ["Alemleri aydınlatan, nurun yaratıcısı", "Işık kaynağı (Güneş gibi)", "Yansıyan ışık", "Maddi aydınlık"],
    correctAnswer: "Alemleri aydınlatan, nurun yaratıcısı",
    explanation: "Maddi ve manevi karanlıkları gideren, kalpleri iman nuruyla aydınlatan demektir."
  },
  {
    id: 'eh_h_31',
    difficulty: 'hard',
    points: 30,
    question: "'El-Hâdî' isminin zıddı olan (saptıran anlamında) ve Allah'ın fiili sıfatı olan isim (Kuran'da geçer) hangisidir?",
    options: ["El-Mudill", "El-Mümin", "El-Mütekebbir", "El-Kahhar"],
    correctAnswer: "El-Mudill",
    explanation: "Adaleti gereği, hak edeni saptıran anlamında 'Mudill' ismi kullanılır (Hadi'nin karşılığıdır)."
  },
  {
    id: 'eh_h_32',
    difficulty: 'hard',
    points: 30,
    question: "'Es-Sabûr' ismi bize neyi öğretir?",
    options: ["Günahkarları cezalandırmada acele etmemeyi", "Tembelliği", "Yavaşlığı", "Unutkanlığı"],
    correctAnswer: "Günahkarları cezalandırmada acele etmemeyi",
    explanation: "Allah'ın cezalandırmak için acele etmediğini, kula tövbe fırsatı verdiğini öğretir."
  },
  {
    id: 'eh_h_33',
    difficulty: 'hard',
    points: 30,
    question: "'El-Kuddûs' ismi okunduğunda genellikle hangi isimle beraber zikredilir? (Meleklerin tesbihi)",
    options: ["Es-Subbûh (Subbûhun Kuddûs)", "El-Aziz", "El-Hakim", "Er-Rahman"],
    correctAnswer: "Es-Subbûh (Subbûhun Kuddûs)",
    explanation: "Meleklerin tesbihi olan 'Subbûhun Kuddûsun...' zikrinde beraber geçerler."
  },
  {
    id: 'eh_h_34',
    difficulty: 'hard',
    points: 30,
    question: "'El-Metîn' isminin 'El-Kavî' isminden farkı nedir?",
    options: ["Kavî güç, Metîn ise sarsılmazlık ve dayanıklılık ifade eder", "Metin güçsüz demektir", "Kavi zayıf demektir", "Fark yoktur"],
    correctAnswer: "Kavî güç, Metîn ise sarsılmazlık ve dayanıklılık ifade eder",
    explanation: "Kavî, gücün kemalini; Metîn ise o gücün asla sarsılmayacağını ve yorulmayacağını ifade eder."
  },
  {
    id: 'eh_h_35',
    difficulty: 'hard',
    points: 30,
    question: "'El-Hamîd' ismi neyi ifade eder?",
    options: ["Ancak kendisine hamd edilen (Övülen)", "Hamd eden", "Şükreden", "Dua eden"],
    correctAnswer: "Ancak kendisine hamd edilen (Övülen)",
    explanation: "Bütün övgülerin ve hamdlerin, her durumda sadece O'na ait olduğunu ifade eder."
  },
  {
    id: 'eh_h_36',
    difficulty: 'hard',
    points: 30,
    question: "'El-Muhsî' ismi Allah'ın hangi sıfatıyla yakından ilişkilidir?",
    options: ["İlim (Her şeyin sayısını bilmek)", "Kudret", "İrade", "Hayat"],
    correctAnswer: "İlim (Her şeyin sayısını bilmek)",
    explanation: "Sonsuz ilmiyle her şeyin adedini, nefeslerini bile tek tek bilmesi demektir."
  },
  {
    id: 'eh_h_37',
    difficulty: 'hard',
    points: 30,
    question: "'El-Mübdi' ve 'El-Muîd' isimleri genelde hangi bağlamda beraber zikredilir?",
    options: ["Yaratılışın başlangıcı ve ahirette diriliş", "Gündüz ve gece", "Zenginlik ve fakirlik", "Savaş ve barış"],
    correctAnswer: "Yaratılışın başlangıcı ve ahirette diriliş",
    explanation: "Mübdi; ilk defa yaratan, Muîd; öldükten sonra tekrar yaratan (geri döndüren) demektir."
  },
  {
    id: 'eh_h_38',
    difficulty: 'hard',
    points: 30,
    question: "'El-Vekîl' ismi müminlere hangi duyguyu kazandırır?",
    options: ["Tevekkül ve güven", "Korku", "Şüphe", "Tembellik"],
    correctAnswer: "Tevekkül ve güven",
    explanation: "İşlerini Allah'a havale edip O'na güvenme (tevekkül) duygusunu kazandırır."
  },
  {
    id: 'eh_h_39',
    difficulty: 'hard',
    points: 30,
    question: "'El-Mümît' ismi sadece 'Can almak' mı demektir?",
    options: ["Hayır, aynı zamanda nefisleri ve tutkuları da öldüren (terbiye eden) demektir", "Evet, sadece ölümdür", "Sadece uyutmaktır", "Sadece yok etmektir"],
    correctAnswer: "Hayır, aynı zamanda nefisleri ve tutkuları da öldüren (terbiye eden) demektir",
    explanation: "Manevi anlamda nefsin kötü arzularını öldürmek de bu ismin tecellisiyle istenir."
  },
  {
    id: 'eh_h_40',
    difficulty: 'hard',
    points: 30,
    question: "'Er-Rakîb' isminin anlamı nedir?",
    options: ["Bütün varlıkları her an gözetleyen ve kontrolü altında tutan", "Rakip olan", "Yarışan", "Uzak duran"],
    correctAnswer: "Bütün varlıkları her an gözetleyen ve kontrolü altında tutan",
    explanation: "Hiçbir hareket O'nun gözetiminden kaçamaz, her an murakabe edendir."
  },
  // --------------------------------------------------------
  // 🟣 ÇOK ZOR SEVİYE (1-40) - ESMA-İ HÜSNA (40 PUAN)
  // --------------------------------------------------------
  {
    id: 'eh_x_1',
    difficulty: 'expert',
    points: 40,
    question: "Esma-i Hüsna'da 'İsm-i A'zam' (En Büyük İsim) hakkında alimlerin genel görüşü nedir?",
    options: ["Gizlidir, Allah'ın isimlerinden herhangi biri olabilir", "Kesinlikle 'Rahman' ismidir", "Sadece 'Kadir' ismidir", "Bilinmesi imkansızdır"],
    correctAnswer: "Gizlidir, Allah'ın isimlerinden herhangi biri olabilir",
    explanation: "İsm-i A'zam, duaların kesin kabul edildiği isimdir; ancak kullar bütün isimlere aynı saygıyı göstersin diye gizlenmiştir (Çoğunluk 'Allah', 'Hayy-Kayyum' üzerinde durur)."
  },
  {
    id: 'eh_x_2',
    difficulty: 'expert',
    points: 40,
    question: "Allah'ın 'Celâl' (Azamet/Heybet) ve 'Cemâl' (Güzellik/Lütuf) sıfatlarını dengeleyen ve 'Kemâl' ifade eden ismi hangisidir?",
    options: ["Allah", "Rahman", "Kahhar", "Latif"],
    correctAnswer: "Allah",
    explanation: "Allah ismi, hem Celâl hem Cemâl isimlerinin hepsini kapsayan ve Zat-ı Akdes'i ifade eden en kapsamlı (Lafza-i Celal) isimdir."
  },
  {
    id: 'eh_x_3',
    difficulty: 'expert',
    points: 40,
    question: "'El-Halik', 'El-Bâri' ve 'El-Musavvir' isimleri arasındaki sıralama/fark nasıldır?",
    options: ["Halik: Takdir eden, Bari: Örneksiz yaratan, Musavvir: Şekil veren", "Hepsi aynıdır", "Musavvir önce gelir", "Bari en sondur"],
    correctAnswer: "Halik: Takdir eden, Bari: Örneksiz yaratan, Musavvir: Şekil veren",
    explanation: "Haşr suresinde sıralı geçerler: Halik (planlayan/takdir eden), Bari (yoktan var eden/inşa eden), Musavvir (estetik şekil veren)."
  },
  {
    id: 'eh_x_4',
    difficulty: 'expert',
    points: 40,
    question: "Hadislerde geçen ve 'Çokça ihsan eden, minnet etmeden veren' anlamındaki isim hangisidir? (Bu isimle yapılan duanın kabul olacağı bildirilmiştir)",
    options: ["El-Mannân", "El-Deyyân", "El-Hannân", "El-Sübbûh"],
    correctAnswer: "El-Mannân",
    explanation: "Hz. Peygamber, bir sahabenin 'Ya Mennân' diye dua ettiğini duyunca 'İsm-i A'zam ile dua etti' buyurmuştur."
  },
  {
    id: 'eh_x_5',
    difficulty: 'expert',
    points: 40,
    question: "'El-Kuddûs' ismi, Allah'ı hangi özelliklerden 'Tenzih' (uzak tutmak) etmeyi ifade eder?",
    options: ["Her türlü acizlik, hata, gaflet ve beşeri kusurlardan", "Sadece yemekten", "Sadece uyumaktan", "Sadece ölmekten"],
    correctAnswer: "Her türlü acizlik, hata, gaflet ve beşeri kusurlardan",
    explanation: "Kuddûs; mutlak temizlik, paklık ve noksanlıklardan münezzeh olmak demektir."
  },
  {
    id: 'eh_x_6',
    difficulty: 'expert',
    points: 40,
    question: "'El-Kayyûm' ismi 'El-Hayy' ismiyle birleşince neyi ifade eder?",
    options: ["Zatıyla kaim olan ve her şeyin varlığını ayakta tutan", "Sadece diri olan", "Sadece yaratan", "Sadece rızık veren"],
    correctAnswer: "Zatıyla kaim olan ve her şeyin varlığını ayakta tutan",
    explanation: "Kayyûm; kendi varlığı için kimseye muhtaç olmayan (Kaim bi-nefsihi) ama her şeyin varlığı kendisine muhtaç olandır."
  },
  {
    id: 'eh_x_7',
    difficulty: 'expert',
    points: 40,
    question: "'El-Mü'min' ismi Allah için kullanıldığında, 'Mümin kulları' için kullanılandan farklı olarak ne anlama gelir?",
    options: ["Güven veren, vaadini doğrulayan ve emin kılan", "İman eden", "İbadet eden", "Korkan"],
    correctAnswer: "Güven veren, vaadini doğrulayan ve emin kılan",
    explanation: "Allah için Mü'min; kullarına emniyet veren, peygamberlerini mucizelerle tasdik eden ve vaadinde sadık olan demektir."
  },
  {
    id: 'eh_x_8',
    difficulty: 'expert',
    points: 40,
    question: "Tasavvufta 'Tecelli' (Allah'ın isimlerinin yansıması) kavramına göre, 'El-Hâdî' isminin tecellisi insanda nasıl görünür?",
    options: ["İman, hidayet ve doğru yolu bulma olarak", "Zenginlik olarak", "Güzellik olarak", "Güç olarak"],
    correctAnswer: "İman, hidayet ve doğru yolu bulma olarak",
    explanation: "Kalpteki iman nuru ve istikamet, El-Hâdî isminin bir tecellisidir."
  },
  {
    id: 'eh_x_9',
    difficulty: 'expert',
    points: 40,
    question: "'Es-Samed' ismi hangi surede geçer ve neyi reddeder?",
    options: ["İhlas Suresi / Doğmayı, doğurmayı ve muhtaçlığı reddeder", "Fatiha / Şirki", "Nas / Büyüyü", "Kevser / Cimriliği"],
    correctAnswer: "İhlas Suresi / Doğmayı, doğurmayı ve muhtaçlığı reddeder",
    explanation: "Samed; her şeyin O'na muhtaç olduğu, O'nun ise (yeme, içme, evlat edinme gibi) hiçbir şeye muhtaç olmadığıdır."
  },
  {
    id: 'eh_x_10',
    difficulty: 'expert',
    points: 40,
    question: "'El-Cebbâr' ismi, sadece 'Zorlayan' demek değildir. Diğer önemli anlamı nedir?",
    options: ["Kırıkları onaran, eksikleri tamamlayan", "Yaratan", "Rızık veren", "Bilen"],
    correctAnswer: "Kırıkları onaran, eksikleri tamamlayan",
    explanation: "Cebir (cebire) kemik kırıklarını sarmak demektir. Allah, dertli ve kırık kalpleri onaran, işleri düzelten Cebbâr'dır."
  },
  {
    id: 'eh_x_11',
    difficulty: 'expert',
    points: 40,
    question: "'El-Hâfıd' (Alçaltan) ve 'Er-Râfi' (Yükselten) isimleri neden genelde beraber zikredilir?",
    options: ["Çünkü tasarruf sadece O'na aittir; dilediğini alçaltır, dilediğini yükseltir", "Zıt oldukları için", "Kuran'da yan yana geldikleri için", "Kafiye olduğu için"],
    correctAnswer: "Çünkü tasarruf sadece O'na aittir; dilediğini alçaltır, dilediğini yükseltir",
    explanation: "Allah'ın mutlak iradesini gösterir; birini yükseltirken diğerini alçaltabilir, denge O'nun elindedir."
  },
  {
    id: 'eh_x_12',
    difficulty: 'expert',
    points: 40,
    question: "'El-Vâsi' ismi Allah'ın hangi sıfatlarının genişliğini ifade eder?",
    options: ["İlim, Rahmet, Kudret ve Mülk'ünün sınırsızlığı", "Sadece mekan", "Sadece zaman", "Sadece rızık"],
    correctAnswer: "İlim, Rahmet, Kudret ve Mülk'ünün sınırsızlığı",
    explanation: "El-Vâsi, kuşatıcılık demektir; ilmiyle, rahmetiyle ve mülküyle her şeyi kuşatmıştır, sınırı yoktur."
  },
  {
    id: 'eh_x_13',
    difficulty: 'expert',
    points: 40,
    question: "'El-Vedûd' ile 'Er-Rahîm' arasındaki fark nedir?",
    options: ["Rahim merhamet eder, Vedûd ise muhabbetle sever (Aktif sevgi)", "Fark yoktur", "Vedud affeder, Rahim sever", "Rahim sadece dünyadadır"],
    correctAnswer: "Rahim merhamet eder, Vedûd ise muhabbetle sever (Aktif sevgi)",
    explanation: "Vedûd; sadece acıyan değil, dostluk kuran, seven ve sevgisini gösteren (muhabbet) demektir."
  },
  {
    id: 'eh_x_14',
    difficulty: 'expert',
    points: 40,
    question: "Esma-i Hüsna'dan hangisi 'Zamanın ve mekanın sahibi, her anı yöneten' anlamında hadislerde 'Ed-Dahr' (Zaman) kavramıyla ilişkilendirilmiştir?",
    options: ["Allah (Zira hadiste 'Zamana sövmeyin, Dahr Allah'tır' buyurulmuştur)", "El-Evvel", "El-Ahir", "El-Baki"],
    correctAnswer: "Allah (Zira hadiste 'Zamana sövmeyin, Dahr Allah'tır' buyurulmuştur)",
    explanation: "Zamanın yaratıcısı ve yöneticisi Allah'tır. İşleri evirip çeviren O'dur."
  },
  {
    id: 'eh_x_15',
    difficulty: 'expert',
    points: 40,
    question: "'El-Mübîn' isminin anlamı nedir?",
    options: ["Varlığı aşikar olan, hakkı ve hakikati apaçık ortaya koyan", "Gizli olan", "Bilinmeyen", "Uzak olan"],
    correctAnswer: "Varlığı aşikar olan, hakkı ve hakikati apaçık ortaya koyan",
    explanation: "Nur suresinde geçer; Allah hakkı açıklayan, belirsizlikleri gideren ve varlığı apaçık olandır."
  },
  {
    id: 'eh_x_16',
    difficulty: 'expert',
    points: 40,
    question: "'El-Kâbıd' (Daraltan) ve 'El-Bâsit' (Genişleten) isimleri insanın manevi halinde nasıl tecelli eder?",
    options: ["Kabz (sıkıntı/tutukluk) ve Bast (neşe/ferahlık) halleriyle", "Zenginlik ve fakirlikle", "Hastalık ve sağlıkla", "Hepsi"],
    correctAnswer: "Hepsi",
    explanation: "Maddi rızıkta olduğu gibi, manevi hallerde de kalbin daralması (kabz) ve ferahlaması (bast) bu isimlerin tecellisidir."
  },
  {
    id: 'eh_x_17',
    difficulty: 'expert',
    points: 40,
    question: "'El-Latîf' isminin 'El-Habîr' ismiyle beraber kullanılması neyi ifade eder?",
    options: ["En gizli ve ince işleri bilip, onlara lütufla muamele etmesi", "Sadece bilmesi", "Sadece görmesi", "Güçlü olması"],
    correctAnswer: "En gizli ve ince işleri bilip, onlara lütufla muamele etmesi",
    explanation: "Latîf; incelik, Habîr; gizlilik. Allah en gizli ve ince şeyleri bilir ve kullarına ummadıkları yerden nazikçe lütfeder."
  },
  {
    id: 'eh_x_18',
    difficulty: 'expert',
    points: 40,
    question: "Kuran'da 'Ümmü'l-Esma' (İsimlerin Anası/Temeli) olarak kabul edilen sıfatlar/isimler hangileridir?",
    options: ["Hayy, Alîm, Kadîr, Mürîd (Hayat, İlim, Kudret, İrade)", "Rahman, Rahim", "Evvel, Ahir", "Semi, Basir"],
    correctAnswer: "Hayy, Alîm, Kadîr, Mürîd (Hayat, İlim, Kudret, İrade)",
    explanation: "Diğer bütün isimler bu temel sıfatların (Hayat, İlim, İrade, Kudret) üzerine bina edilir."
  },
  {
    id: 'eh_x_19',
    difficulty: 'expert',
    points: 40,
    question: "'El-Vâlî' ile 'El-Velî' arasındaki fark nedir?",
    options: ["Vâlî; kainatı yöneten hükümdar, Velî; müminlere yardım eden dost", "Fark yoktur", "Velî yönetici, Vâlî dost", "Vâlî cezalandıran"],
    correctAnswer: "Vâlî; kainatı yöneten hükümdar, Velî; müminlere yardım eden dost",
    explanation: "Vâlî idare ve tasarrufu (Valilik), Velî ise yakınlık, dostluk ve yardımı (Velayet) ifade eder."
  },
  {
    id: 'eh_x_20',
    difficulty: 'expert',
    points: 40,
    question: "'El-Afüvv' ismi neden 'El-Gafûr' isminden daha kapsamlı bir rahmet ifade eder?",
    options: ["Gafûr günahı örter, Afüvv ise günahı hiç işlenmemiş gibi siler", "Gafûr siler, Afüvv örter", "Fark yoktur", "Afüvv sadece büyüklere verilir"],
    correctAnswer: "Gafûr günahı örter, Afüvv ise günahı hiç işlenmemiş gibi siler",
    explanation: "Kadir gecesi duasında 'Sen Afüvv'sün' denir. Afüvv, günahın izini ve kaydını tamamen yok etmektir."
  },
  {
    id: 'eh_x_21',
    difficulty: 'expert',
    points: 40,
    question: "'Zü'l-Celâli ve'l-İkrâm' ismi insana nasıl bir kulluk şuuru vermelidir?",
    options: ["Hem Allah'tan korkmak (Celal) hem de O'na ümit beslemek (İkram) - Havf ve Reca", "Sadece korkmak", "Sadece şımarmak", "Umursamamak"],
    correctAnswer: "Hem Allah'tan korkmak (Celal) hem de O'na ümit beslemek (İkram) - Havf ve Reca",
    explanation: "Allah'ın büyüklüğü karşısında titremek (Celal), ama cömertliği karşısında ümitvar olmak (İkram) dengesini sağlar."
  },
  {
    id: 'eh_x_22',
    difficulty: 'expert',
    points: 40,
    question: "'El-Fettâh' ismi manevi anlamda kalplerde nasıl tecelli eder?",
    options: ["Kalp gözünü açarak, hidayet ve marifet kapılarını aralayarak", "Zengin ederek", "Sağlık vererek", "Uyutarak"],
    correctAnswer: "Kalp gözünü açarak, hidayet ve marifet kapılarını aralayarak",
    explanation: "Maddi fetihlerin yanında, asıl 'Feth-i Mübin', kalplerin imana ve hakikate açılmasıdır."
  },
  {
    id: 'eh_x_23',
    difficulty: 'expert',
    points: 40,
    question: "'El-Mütekebbir' ismi kula nispet edildiğinde kötü (kibir), Allah'a nispet edildiğinde neden övgüdür?",
    options: ["Çünkü büyüklük sadece Allah'ın hakkıdır, kulda ise haddini bilmezliktir", "Çünkü Allah güçlüdür", "Çünkü kul zayıftır", "Fark yoktur"],
    correctAnswer: "Çünkü büyüklük sadece Allah'ın hakkıdır, kulda ise haddini bilmezliktir",
    explanation: "Kibrya (Büyüklük) Allah'ın ridasıdır (sıfatıdır). O, büyüklüğünü hak eder; kul ise acizdir, kibirlenmesi yalandır."
  },
  {
    id: 'eh_x_24',
    difficulty: 'expert',
    points: 40,
    question: "'El-Muksit' ile 'El-Adl' arasındaki nüans nedir?",
    options: ["Adl genel adalet, Muksit ise dengeyi sağlayan ve mazlumun hakkını zalimden bizzat alan", "Muksit affeden demektir", "Adl intikam alan demektir", "Fark yoktur"],
    correctAnswer: "Adl genel adalet, Muksit ise dengeyi sağlayan ve mazlumun hakkını zalimden bizzat alan",
    explanation: "Muksit; ifrat ve tefrit arasındaki dengeyi kuran ve hakkı sahibine iade eden aktif adalettir."
  },
  {
    id: 'eh_x_25',
    difficulty: 'expert',
    points: 40,
    question: "'El-Bâis' isminin iki temel tecellisi nedir?",
    options: ["Peygamberler göndermesi ve Ölüleri diriltmesi", "Rızık vermesi ve Öldürmesi", "Yaratması ve Yok etmesi", "Görmesi ve Duyması"],
    correctAnswer: "Peygamberler göndermesi ve Ölüleri diriltmesi",
    explanation: "Bâis; hem gaflet uykusundakileri uyandırmak için elçi gönderen (bi'set) hem de ölüleri diriltendir."
  },
  {
    id: 'eh_x_26',
    difficulty: 'expert',
    points: 40,
    question: "'Eş-Şekûr' ismi Allah için 'Şükreden' değil, ne anlama gelir?",
    options: ["Az amele çok sevap veren ve kullarının şükrünü kabul eden", "Teşekkür bekleyen", "İhtiyaç duyan", "Borçlu olan"],
    correctAnswer: "Az amele çok sevap veren ve kullarının şükrünü kabul eden",
    explanation: "Şekûr; yapılan iyiliği zayi etmeyen, kat kat fazlasıyla karşılık vererek ödüllendiren demektir."
  },
  {
    id: 'eh_x_27',
    difficulty: 'expert',
    points: 40,
    question: "'El-Ganiyy' ve 'El-Muğnî' isimleri arasındaki ilişki nedir?",
    options: ["Ganiyy zatında zengin (muhtaç olmayan), Muğnî ise başkasını zengin edendir", "İkisi de aynıdır", "Muğni zatında zengindir", "Ganiyy fakirleştirir"],
    correctAnswer: "Ganiyy zatında zengin (muhtaç olmayan), Muğnî ise başkasını zengin edendir",
    explanation: "Allah kendisi Ganiyy'dir (ihtiyaçsız), kullarına nimet verip ihtiyaçlarını giderirken Muğnî'dir."
  },
  {
    id: 'eh_x_28',
    difficulty: 'expert',
    points: 40,
    question: "'Er-Rakîb' ile 'El-Hafîz' arasındaki fark nedir?",
    options: ["Rakîb her an gözetleyen (kontrol), Hafîz ise koruyan ve kaydeden (muhafaza)", "Fark yoktur", "Hafiz gözetler, Rakib korur", "Rakib cezalandırır"],
    correctAnswer: "Rakîb her an gözetleyen (kontrol), Hafîz ise koruyan ve kaydeden (muhafaza)",
    explanation: "Rakîb'de murakabe ve kontrol (gözetim) manası, Hafîz'de ise koruma ve kaydetme manası baskındır."
  },
  {
    id: 'eh_x_29',
    difficulty: 'expert',
    points: 40,
    question: "'El-Berr' isminin tecellisi olan 'Birr' (İyilik) kavramı Kuran'da en çok ne ile ilişkilendirilir?",
    options: ["Anne-babaya itaat ve Allah'a tam teslimiyet", "Savaşmak", "Zenginlik", "Uyumak"],
    correctAnswer: "Anne-babaya itaat ve Allah'a tam teslimiyet",
    explanation: "Kuran'da 'Birr'; yüzünü doğuya batıya dönmek değil, iman etmek ve infak etmektir. Anne-babaya iyilik de 'Birr'dir."
  },
  {
    id: 'eh_x_30',
    difficulty: 'expert',
    points: 40,
    question: "'El-Müteâlî' ismi 'El-Aliyy' isminden farklı olarak neyi vurgular?",
    options: ["Sadece yüksek olmayı değil, yaratılmışların özelliklerinden 'münezzeh' (uzak/aşkın) olmayı", "Daha güçlü olmayı", "Mekansal yüksekliği", "Sadece büyüklüğü"],
    correctAnswer: "Sadece yüksek olmayı değil, yaratılmışların özelliklerinden 'münezzeh' (uzak/aşkın) olmayı",
    explanation: "Müteâlî; yaratılmışların akıllarına gelebilecek her türlü sınır, şekil ve noksanlıktan aşkın (transandantal) demektir."
  },
  {
    id: 'eh_x_31',
    difficulty: 'expert',
    points: 40,
    question: "'El-Vâcid' isminin tasavvufi karşılığı olan 'Vecd' ne demektir?",
    options: ["Allah'ı bulmanın verdiği manevi coşku ve heyecan", "Kaybetmek", "Aramak", "Üzülmek"],
    correctAnswer: "Allah'ı bulmanın verdiği manevi coşku ve heyecan",
    explanation: "Vâcid bulan demektir. Tasavvufta Vecd; Hakk'ı bulmanın getirdiği kendinden geçme halidir."
  },
  {
    id: 'eh_x_32',
    difficulty: 'expert',
    points: 40,
    question: "'El-Evvel' ve 'El-Âhir' isimleri zamansal bir başlangıç ve sonu mu ifade eder?",
    options: ["Hayır, O zamandan münezzehtir; Evvel (varlığı her şeyden önce), Âhir (varlığı her şeyden sonra baki)", "Evet, zamanla sınırlıdır", "Sadece Evvel zamansaldır", "Sadece Ahir zamansaldır"],
    correctAnswer: "Hayır, O zamandan münezzehtir; Evvel (varlığı her şeyden önce), Âhir (varlığı her şeyden sonra baki)",
    explanation: "Allah zamanı yaratandır. Evvel ve Âhir, O'nun ezeliyetini (kıdem) ve ebediyetini (beka) anlatır."
  },
  {
    id: 'eh_x_33',
    difficulty: 'expert',
    points: 40,
    question: "Kuran'da 'O'nun benzeri gibi hiçbir şey yoktur' (Şura 11) ayeti, Allah'ın isimlerinin hangi özelliğini vurgular?",
    options: ["Muhalefetün li'l-Havadis (Yaratılmışlara benzememek)", "Kıdem", "Vahdaniyet", "Kudret"],
    correctAnswer: "Muhalefetün li'l-Havadis (Yaratılmışlara benzememek)",
    explanation: "Allah'ın isimleri (görmesi, duyması) insanlarınkine benzemez; O'nun benzeri yoktur."
  },
  {
    id: 'eh_x_34',
    difficulty: 'expert',
    points: 40,
    question: "'El-Azîm' (Yüce) ve 'El-Kebîr' (Büyük) isimleri namazda nerede zikredilir?",
    options: ["Rükuda Azîm, Secdede A'lâ, Tekbirde Ekber (Kebir kökünden)", "Sadece Fatiha'da", "Sadece Selamda", "Sadece Tahiyyat'ta"],
    correctAnswer: "Rükuda Azîm, Secdede A'lâ, Tekbirde Ekber (Kebir kökünden)",
    explanation: "Rükuda 'Subhane Rabbiye'l-Azîm', Secdede 'Subhane Rabbiye'l-A'lâ', Tekbirde 'Allahu Ekber' denir."
  },
  {
    id: 'eh_x_35',
    difficulty: 'expert',
    points: 40,
    question: "'Er-Raûf' ismi 'Er-Rahîm' isminden daha özel bir anlam taşır. Bu nedir?",
    options: ["Rahmetin en ince, en şefkatli ve şiddetten uzak hali (Esirgeyici)", "Daha genel merhamet", "Sadece maddi yardım", "Sadece affetmek"],
    correctAnswer: "Rahmetin en ince, en şefkatli ve şiddetten uzak hali (Esirgeyici)",
    explanation: "Re'fet; rahmetin içindeki incelik ve yumuşaklıktır. Raûf, çok esirgeyici ve nazik demektir."
  },
  {
    id: 'eh_x_36',
    difficulty: 'expert',
    points: 40,
    question: "'El-Müstecâb' bir esma mıdır, yoksa 'El-Mücîb' mi doğrudur?",
    options: ["Esma-i Hüsna 'El-Mücîb'dir (Cevap veren); Müstecab ise kabul olunan (dua) demektir", "İkisi de esmadır", "Müstecab esmadır", "Fark yoktur"],
    correctAnswer: "Esma-i Hüsna 'El-Mücîb'dir (Cevap veren); Müstecab ise kabul olunan (dua) demektir",
    explanation: "Allah Mücîb'dir (cevap verir), kulun duası ise Müstecâb (kabul edilmiş) olur."
  },
  {
    id: 'eh_x_37',
    difficulty: 'expert',
    points: 40,
    question: "'El-Mecîd' (Şanı Yüce) ve 'El-Mâcid' (Keremi Bol) isimleri arasındaki fark nedir?",
    options: ["Mecîd zatının şerefini, Mâcid ise fiillerinin cömertliğini vurgular", "Tam tersidir", "Fark yoktur", "Mecid cimridir"],
    correctAnswer: "Mecîd zatının şerefini, Mâcid ise fiillerinin cömertliğini vurgular",
    explanation: "Mecîd; zatı itibariyle övülmeye layık, Mâcid; ikramı ve lütfu bol olan demektir."
  },
  {
    id: 'eh_x_38',
    difficulty: 'expert',
    points: 40,
    question: "'El-Hâlik' ismi 'yaratmak' demektir. Peki 'yoktan var etmek' manasında daha spesifik olan isim hangisidir?",
    options: ["El-Bâri (veya Mübdi)", "El-Musavvir", "El-Gaffar", "El-Vehhab"],
    correctAnswer: "El-Bâri (veya Mübdi)",
    explanation: "Hâlik genel yaratmadır (takdir). Bâri ise maddesiz ve modelsiz, pürüzsüzce vücuda getirmektir."
  },
  {
    id: 'eh_x_39',
    difficulty: 'expert',
    points: 40,
    question: "'El-Vâris' ismi bize mülkiyet konusunda neyi hatırlatır?",
    options: ["Dünyadaki sahipliğimizin geçici olduğunu, sonunda her şeyin Allah'a kalacağını", "Çok mal biriktirmeyi", "Miras kavgasını", "Tapu almayı"],
    correctAnswer: "Dünyadaki sahipliğimizin geçici olduğunu, sonunda her şeyin Allah'a kalacağını",
    explanation: "İnsanlar ölür, mülkler el değiştirir ama son tahlilde bütün mülk El-Vâris olan Allah'ındır."
  },
  {
    id: 'eh_x_40',
    difficulty: 'expert',
    points: 40,
    question: "Kuran'da 'En Güzel İsimler (Esma-i Hüsna) O'nundur' ayeti hangi surede geçer ve bu sure birçok ismi peş peşe sıralar?",
    options: ["Haşr Suresi (Son 3 ayet)", "İhlas Suresi", "Fatiha Suresi", "Yasin Suresi"],
    correctAnswer: "Haşr Suresi (Son 3 ayet)",
    explanation: "Haşr suresinin sonu (Hüvallahüllezi...), Esma-i Hüsna'nın en yoğun geçtiği ve faziletli yerdir."
  }
    ]
  }
};
