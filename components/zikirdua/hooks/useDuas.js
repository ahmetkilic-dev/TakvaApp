import { useState, useEffect, useCallback } from 'react';

// Dua listesi
const duas = [
  { id: "d1", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", turkish: "Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver ve bizi cehennem azabından koru.", explanation: "Bu dua Hz. Adem'in tövbe duasıdır; kısa, etkili ve günlük kullanıma çok uygundur." },
  { id: "d2", arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", turkish: "Rabbim! Gönlümü genişlet ve işlerimi bana kolaylaştır.", explanation: "Bu dua Hz. Musa'nın duasıdır; kısa, anlamlı ve günlük kullanıma çok uygundur." },
  { id: "d3", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", turkish: "Allah'ım! Senden dünya ve ahirette af ve afiyet dilerim.", explanation: "Bu dua Peygamberimizin (s.a.v.) sıkça okuduğu dualardandır; kapsamlı ve etkilidir." },
  { id: "d4", arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا", turkish: "Rabbimiz! Unuttuysak veya hata yaptıysak bizi hesaba çekme.", explanation: "Bu dua unutkanlık ve hatalar için okunur; günlük hayatta çok faydalıdır." },
  { id: "d5", arabic: "اللَّهُمَّ بَارِكْ لِي فِيمَا رَزَقْتَنِي", turkish: "Allah'ım! Bana verdiğin rızıkta bereket ver.", explanation: "Bu dua rızık ve bereket için okunur; günlük kullanıma uygundur." },
  { id: "d6", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ النَّارِ", turkish: "Allah'ım! Cehennem azabından sana sığınırım.", explanation: "Cehennem azabından korunmak için okunan önemli bir duadır." },
  { id: "d7", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ", turkish: "Allah'ım! Senden cenneti dilerim.", explanation: "Cennet için edilen kısa ve öz bir duadır." },
  { id: "d8", arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا", turkish: "Rabbimiz! Günahlarımızı bağışla.", explanation: "Günahların bağışlanması için okunan önemli bir duadır." },
  { id: "d9", arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ", turkish: "Allah'ım! Sen benim Rabbimsin, senden başka ilah yoktur.", explanation: "Tevhid duası; Allah'ın birliğini ikrar eden önemli bir duadır." },
  { id: "d10", arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ", turkish: "Rabbim! Beni namazı dosdoğru kılanlardan eyle.", explanation: "Namazın düzenli kılınması için okunan bir duadır." },
  { id: "d11", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى", turkish: "Allah'ım! Senden hidayet ve takva dilerim.", explanation: "Doğru yolu bulmak ve takvalı olmak için okunan duadır." },
  { id: "d12", arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا", turkish: "Rabbimiz! Bize hidayet verdikten sonra kalplerimizi saptırma.", explanation: "Hidayet üzere sabit kalmak için okunan önemli bir duadır." },
  { id: "d13", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعِلْمَ النَّافِعَ", turkish: "Allah'ım! Senden faydalı ilim dilerim.", explanation: "Faydalı ilim öğrenmek için okunan bir duadır." },
  { id: "d14", arabic: "رَبِّ زِدْنِي عِلْمًا", turkish: "Rabbim! İlmimi artır.", explanation: "İlim artırmak için okunan kısa ve etkili bir duadır." },
  { id: "d15", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ صِحَّةً فِي الْعِبَادَةِ", turkish: "Allah'ım! Senden ibadet için sağlık dilerim.", explanation: "İbadet edebilmek için sağlık istenen bir duadır." },
  { id: "d16", arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ", turkish: "Rabbimiz! Bize eşlerimizden ve çocuklarımızdan göz aydınlığı ver.", explanation: "Aile huzuru için okunan önemli bir duadır." },
  { id: "d17", arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي صِبَاحِنَا", turkish: "Allah'ım! Sabahımızda bize bereket ver.", explanation: "Sabah bereketi için okunan bir duadır." },
  { id: "d18", arabic: "رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ", turkish: "Rabbim! Bana yardım et, bana karşı yardım etme.", explanation: "Allah'tan yardım istenen önemli bir duadır." },
  { id: "d19", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْفَوْزَ عِنْدَ اللِّقَاءِ", turkish: "Allah'ım! Senden kavuşma anında başarı dilerim.", explanation: "Ahirette başarı için okunan bir duadır." },
  { id: "d20", arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ", turkish: "Rabbimiz! Bizden kabul buyur, şüphesiz sen işitensin, bilensin.", explanation: "İbadetlerin kabulü için okunan önemli bir duadır." },
  { id: "d21", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ", turkish: "Allah'ım! Senden rızanı ve cenneti dilerim.", explanation: "Allah'ın rızası ve cennet için okunan bir duadır." },
  { id: "d22", arabic: "رَبِّ اجْعَلْنِي شَاكِرًا لِنِعْمَتِكَ", turkish: "Rabbim! Beni nimetine şükredenlerden eyle.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d23", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفَقْرِ", turkish: "Allah'ım! Fakirlikten sana sığınırım.", explanation: "Fakirlikten korunmak için okunan bir duadır." },
  { id: "d24", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا", turkish: "Rabbimiz! Bizi kafirler için bir fitne kılma.", explanation: "Fitneye düşmemek için okunan önemli bir duadır." },
  { id: "d25", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", turkish: "Allah'ım! Senden dünya ve ahirette afiyet dilerim.", explanation: "Afiyet için okunan kapsamlı bir duadır." },
  { id: "d26", arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ", turkish: "Rabbim! Beni doğru bir girişle girdir.", explanation: "Doğru yola girmek için okunan bir duadır." },
  { id: "d27", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْحُسْنَى", turkish: "Allah'ım! Senden en güzelini dilerim.", explanation: "En güzel şeyler için okunan bir duadır." },
  { id: "d28", arabic: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا", turkish: "Rabbimiz! İnandık, bizi bağışla.", explanation: "İman sonrası bağışlanma için okunan bir duadır." },
  { id: "d29", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيَقِينَ", turkish: "Allah'ım! Senden yakîn dilerim.", explanation: "Kesin bilgi ve inanç için okunan bir duadır." },
  { id: "d30", arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ", turkish: "Rabbim! Bana nimetine şükretmeyi nasip et.", explanation: "Şükür etmeyi öğrenmek için okunan bir duadır." },
  { id: "d31", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي", turkish: "Allah'ım! Nefsimin şerrinden sana sığınırım.", explanation: "Nefsin şerrinden korunmak için okunan önemli bir duadır." },
  { id: "d32", arabic: "رَبَّنَا لَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ", turkish: "Rabbimiz! Bize gücümüzün yetmediği şeyi yükleme.", explanation: "Güç yetiremeyeceğimiz şeylerden korunmak için okunan bir duadır." },
  { id: "d33", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", turkish: "Allah'ım! Senden af ve afiyet dilerim.", explanation: "Af ve afiyet için okunan kısa bir duadır." },
  { id: "d34", arabic: "رَبِّ ارْحَمْنَا كَمَا رَبَّيَانَا صِغَارًا", turkish: "Rabbim! Bize küçükken bizi yetiştirdiğin gibi merhamet et.", explanation: "Merhamet için okunan önemli bir duadır." },
  { id: "d35", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْخَيْرَ كُلَّهُ", turkish: "Allah'ım! Senden her türlü hayır dilerim.", explanation: "Tüm hayırlar için okunan kapsamlı bir duadır." },
  { id: "d36", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", turkish: "Rabbimiz! Bize dünyada iyilik ver.", explanation: "Dünya hayrı için okunan bir duadır." },
  { id: "d37", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْبَرَكَةَ", turkish: "Allah'ım! Senden bereket dilerim.", explanation: "Bereket için okunan kısa bir duadır." },
  { id: "d38", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُتَوَكِّلِينَ", turkish: "Rabbim! Beni tevekkül edenlerden eyle.", explanation: "Tevekkül için okunan önemli bir duadır." },
  { id: "d39", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ", turkish: "Allah'ım! Tembellikten sana sığınırım.", explanation: "Tembellikten korunmak için okunan bir duadır." },
  { id: "d40", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ", turkish: "Rabbimiz! Bizi zalimler topluluğu ile beraber kılma.", explanation: "Zalimlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d41", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الصَّبْرَ", turkish: "Allah'ım! Senden sabır dilerim.", explanation: "Sabır için okunan önemli bir duadır." },
  { id: "d42", arabic: "رَبِّ أَعْطِنِي حُكْمًا", turkish: "Rabbim! Bana hikmet ver.", explanation: "Hikmet için okunan bir duadır." },
  { id: "d43", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْقُوَّةَ", turkish: "Allah'ım! Senden güç dilerim.", explanation: "Güç için okunan bir duadır." },
  { id: "d44", arabic: "رَبَّنَا لَا تُؤَاخِذْنَا بِمَا فَعَلَ السُّفَهَاءُ", turkish: "Rabbimiz! Cahillerin yaptıklarından dolayı bizi hesaba çekme.", explanation: "Cahillerin yaptıklarından korunmak için okunan bir duadır." },
  { id: "d45", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ", turkish: "Allah'ım! Kederden sana sığınırım.", explanation: "Kederden korunmak için okunan bir duadır." },
  { id: "d46", arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ", turkish: "Rabbim! Bana verdiğin nimetlere şükretmeyi nasip et.", explanation: "Nimetlere şükür için okunan önemli bir duadır." },
  { id: "d47", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ", turkish: "Allah'ım! Senden azim dilerim.", explanation: "Kararlılık için okunan bir duadır." },
  { id: "d48", arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا", turkish: "Rabbimiz! Kalplerimizi saptırma.", explanation: "Kalplerin sapmaması için okunan önemli bir duadır." },
  { id: "d49", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْوَفَاءَ", turkish: "Allah'ım! Senden vefa dilerim.", explanation: "Vefa için okunan bir duadır." },
  { id: "d50", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُخْلِصِينَ", turkish: "Rabbim! Beni ihlaslılardan eyle.", explanation: "İhlas için okunan önemli bir duadır." },
  { id: "d51", arabic: "اللَّهُمَّ إِنِّi أَعُوذُ بِكَ مِنَ الْحُزْنِ", turkish: "Allah'ım! Üzüntüden sana sığınırım.", explanation: "Üzüntüden korunmak için okunan bir duadır." },
  { id: "d52", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْكَافِرِينَ", turkish: "Rabbimiz! Bizi kafirler topluluğu ile beraber kılma.", explanation: "Kafirlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d53", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَاقِبَةَ", turkish: "Allah'ım! Senden güzel sonuç dilerim.", explanation: "Güzel sonuç için okunan bir duadır." },
  { id: "d54", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ", turkish: "Rabbim! Seni zikretmemde bana yardım et.", explanation: "Zikir için okunan önemli bir duadır." },
  { id: "d55", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْفَهْمَ", turkish: "Allah'ım! Senden anlayış dilerim.", explanation: "Anlayış için okunan bir duadır." },
  { id: "d56", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً", turkish: "Rabbimiz! Bizi fitneye düşürme.", explanation: "Fitneden korunmak için okunan önemli bir duadır." },
  { id: "d57", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ", turkish: "Allah'ım! Acizlikten sana sığınırım.", explanation: "Acizlikten korunmak için okunan bir duadır." },
  { id: "d58", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُقِيمِينَ الصَّلَاةِ", turkish: "Rabbim! Beni namazı dosdoğru kılanlardan eyle.", explanation: "Namazın düzenli kılınması için okunan önemli bir duadır." },
  { id: "d59", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ عَلَى الرُّشْدِ", turkish: "Allah'ım! Senden doğru yolda kararlılık dilerim.", explanation: "Doğru yolda kararlılık için okunan bir duadır." },
  { id: "d60", arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا", turkish: "Rabbimiz! Unuttuysak bizi hesaba çekme.", explanation: "Unutkanlık için okunan bir duadır." },
  { id: "d61", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ", turkish: "Allah'ım! Senden afiyet dilerim.", explanation: "Afiyet için okunan kısa bir duadır." },
  { id: "d62", arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ", turkish: "Rabbim! Beni doğru bir girişle girdir ve doğru bir çıkışla çıkar.", explanation: "Doğru giriş ve çıkış için okunan önemli bir duadır." },
  { id: "d63", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبُخْلِ", turkish: "Allah'ım! Cimrilikten sana sığınırım.", explanation: "Cimrilikten korunmak için okunan bir duadır." },
  { id: "d64", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ", turkish: "Rabbimiz! Bizi fasıklar topluluğu ile beraber kılma.", explanation: "Fasıklardan uzak durmak için okunan önemli bir duadır." },
  { id: "d65", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ", turkish: "Allah'ım! Senden af dilerim.", explanation: "Af için okunan kısa bir duadır." },
  { id: "d66", arabic: "رَبِّ اجْعَلْنِي شَاكِرًا", turkish: "Rabbim! Beni şükredenlerden eyle.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d67", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ", turkish: "Allah'ım! Küfürden sana sığınırım.", explanation: "Küfürden korunmak için okunan önemli bir duadır." },
  { id: "d68", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ", turkish: "Rabbimiz! Bizi zalimler topluluğu ile beraber kılma.", explanation: "Zalimlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d69", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى", turkish: "Allah'ım! Senden hidayet dilerim.", explanation: "Hidayet için okunan önemli bir duadır." },
  { id: "d70", arabic: "رَبِّ أَعِنِّي عَلَى شُكْرِكَ", turkish: "Rabbim! Şükründe bana yardım et.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d71", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّقَاءِ", turkish: "Allah'ım! Bedbahtlıktan sana sığınırım.", explanation: "Bedbahtlıktan korunmak için okunan bir duadır." },
  { id: "d72", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْكَافِرِينَ", turkish: "Rabbimiz! Bizi kafirler topluluğu ile beraber kılma.", explanation: "Kafirlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d73", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ", turkish: "Allah'ım! Senden azim dilerim.", explanation: "Kararlılık için okunan bir duadır." },
  { id: "d74", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُتَّقِينَ", turkish: "Rabbim! Beni takvalılardan eyle.", explanation: "Takva için okunan önemli bir duadır." },
  { id: "d75", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْغَفْلَةِ", turkish: "Allah'ım! Gafletten sana sığınırım.", explanation: "Gafletten korunmak için okunan bir duadır." },
  { id: "d76", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا", turkish: "Rabbimiz! Bizi kafirler için bir fitne kılma.", explanation: "Fitneye düşmemek için okunan önemli bir duadır." },
  { id: "d77", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدِّينِ", turkish: "Allah'ım! Senden dinde afiyet dilerim.", explanation: "Dinde afiyet için okunan bir duadır." },
  { id: "d78", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ", turkish: "Rabbim! Seni zikretmemde ve şükretmemde bana yardım et.", explanation: "Zikir ve şükür için okunan önemli bir duadır." },
  { id: "d79", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفِتْنَةِ", turkish: "Allah'ım! Fitneden sana sığınırım.", explanation: "Fitneden korunmak için okunan önemli bir duadır." },
  { id: "d80", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ", turkish: "Rabbimiz! Bizi fasıklar topluluğu ile beraber kılma.", explanation: "Fasıklardan uzak durmak için okunan önemli bir duadır." },
  { id: "d81", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", turkish: "Allah'ım! Senden dünya ve ahirette af ve afiyet dilerim.", explanation: "Af ve afiyet için okunan kapsamlı bir duadır." },
  { id: "d82", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُخْلِصِينَ", turkish: "Rabbim! Beni ihlaslılardan eyle.", explanation: "İhlas için okunan önemli bir duadır." },
  { id: "d83", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ", turkish: "Allah'ım! Keder ve üzüntüden sana sığınırım.", explanation: "Keder ve üzüntüden korunmak için okunan bir duadır." },
  { id: "d84", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ", turkish: "Rabbimiz! Bizi zalimler topluluğu ile beraber kılma.", explanation: "Zalimlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d85", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ عَلَى الرُّشْدِ", turkish: "Allah'ım! Senden doğru yolda kararlılık dilerim.", explanation: "Doğru yolda kararlılık için okunan bir duadır." },
  { id: "d86", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ", turkish: "Rabbim! Seni zikretmemde bana yardım et.", explanation: "Zikir için okunan önemli bir duadır." },
  { id: "d87", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ", turkish: "Allah'ım! Acizlik ve tembellikten sana sığınırım.", explanation: "Acizlik ve tembellikten korunmak için okunan bir duadır." },
  { id: "d88", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً", turkish: "Rabbimiz! Bizi fitneye düşürme.", explanation: "Fitneden korunmak için okunan önemli bir duadır." },
  { id: "d89", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ", turkish: "Allah'ım! Senden af dilerim.", explanation: "Af için okunan kısa bir duadır." },
  { id: "d90", arabic: "رَبِّ اجْعَلْنِي شَاكِرًا لِنِعْمَتِكَ", turkish: "Rabbim! Beni nimetine şükredenlerden eyle.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d91", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفُسُوقِ", turkish: "Allah'ım! Küfür ve fısktan sana sığınırım.", explanation: "Küfür ve fısktan korunmak için okunan önemli bir duadır." },
  { id: "d92", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْكَافِرِينَ", turkish: "Rabbimiz! Bizi kafirler topluluğu ile beraber kılma.", explanation: "Kafirlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d93", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى", turkish: "Allah'ım! Senden hidayet ve takva dilerim.", explanation: "Hidayet ve takva için okunan önemli bir duadır." },
  { id: "d94", arabic: "رَبِّ أَعِنِّي عَلَى شُكْرِكَ", turkish: "Rabbim! Şükründe bana yardım et.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d95", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّقَاءِ", turkish: "Allah'ım! Bedbahtlıktan sana sığınırım.", explanation: "Bedbahtlıktan korunmak için okunan bir duadır." },
  { id: "d96", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ", turkish: "Rabbimiz! Bizi fasıklar topluluğu ile beraber kılma.", explanation: "Fasıklardan uzak durmak için okunan önemli bir duadır." },
  { id: "d97", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ", turkish: "Allah'ım! Senden azim dilerim.", explanation: "Kararlılık için okunan bir duadır." },
  { id: "d98", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُتَّقِينَ", turkish: "Rabbim! Beni takvalılardan eyle.", explanation: "Takva için okunan önemli bir duadır." },
  { id: "d99", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْغَفْلَةِ", turkish: "Allah'ım! Gafletten sana sığınırım.", explanation: "Gafletten korunmak için okunan bir duadır." },
  { id: "d100", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا", turkish: "Rabbimiz! Bizi kafirler için bir fitne kılma.", explanation: "Fitneye düşmemek için okunan önemli bir duadır." },
  { id: "d101", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدِّينِ", turkish: "Allah'ım! Senden dinde afiyet dilerim.", explanation: "Dinde afiyet için okunan bir duadır." },
  { id: "d102", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ", turkish: "Rabbim! Seni zikretmemde ve şükretmemde bana yardım et.", explanation: "Zikir ve şükür için okunan önemli bir duadır." },
  { id: "d103", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفِتْنَةِ", turkish: "Allah'ım! Fitneden sana sığınırım.", explanation: "Fitneden korunmak için okunan önemli bir duadır." },
  { id: "d104", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ", turkish: "Rabbimiz! Bizi fasıklar topluluğu ile beraber kılma.", explanation: "Fasıklardan uzak durmak için okunan önemli bir duadır." },
  { id: "d105", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", turkish: "Allah'ım! Senden dünya ve ahirette af ve afiyet dilerim.", explanation: "Af ve afiyet için okunan kapsamlı bir duadır." },
  { id: "d106", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُخْلِصِينَ", turkish: "Rabbim! Beni ihlaslılardan eyle.", explanation: "İhlas için okunan önemli bir duadır." },
  { id: "d107", arabic: "اللَّهُمَّ إِنِّi أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ", turkish: "Allah'ım! Keder ve üzüntüden sana sığınırım.", explanation: "Keder ve üzüntüden korunmak için okunan bir duadır." },
  { id: "d108", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ", turkish: "Rabbimiz! Bizi zalimler topluluğu ile beraber kılma.", explanation: "Zalimlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d109", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ عَلَى الرُّشْدِ", turkish: "Allah'ım! Senden doğru yolda kararlılık dilerim.", explanation: "Doğru yolda kararlılık için okunan bir duadır." },
  { id: "d110", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ", turkish: "Rabbim! Seni zikretmemde bana yardım et.", explanation: "Zikir için okunan önemli bir duadır." },
  { id: "d111", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ", turkish: "Allah'ım! Acizlik ve tembellikten sana sığınırım.", explanation: "Acizlik ve tembellikten korunmak için okunan bir duadır." },
  { id: "d112", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً", turkish: "Rabbimiz! Bizi fitneye düşürme.", explanation: "Fitneden korunmak için okunan önemli bir duadır." },
  { id: "d113", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ", turkish: "Allah'ım! Senden af dilerim.", explanation: "Af için okunan kısa bir duadır." },
  { id: "d114", arabic: "رَبِّ اجْعَلْنِي شَاكِرًا لِنِعْمَتِكَ", turkish: "Rabbim! Beni nimetine şükredenlerden eyle.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d115", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفُسُوقِ", turkish: "Allah'ım! Küfür ve fısktan sana sığınırım.", explanation: "Küfür ve fısktan korunmak için okunan önemli bir duadır." },
  { id: "d116", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْكَافِرِينَ", turkish: "Rabbimiz! Bizi kafirler topluluğu ile beraber kılma.", explanation: "Kafirlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d117", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى", turkish: "Allah'ım! Senden hidayet ve takva dilerim.", explanation: "Hidayet ve takva için okunan önemli bir duadır." },
  { id: "d118", arabic: "رَبِّ أَعِنِّي عَلَى شُكْرِكَ", turkish: "Rabbim! Şükründe bana yardım et.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d119", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّقَاءِ", turkish: "Allah'ım! Bedbahtlıktan sana sığınırım.", explanation: "Bedbahtlıktan korunmak için okunan bir duadır." },
  { id: "d120", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ", turkish: "Rabbimiz! Bizi fasıklar topluluğu ile beraber kılma.", explanation: "Fasıklardan uzak durmak için okunan önemli bir duadır." },
  { id: "d121", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ", turkish: "Allah'ım! Senden azim dilerim.", explanation: "Kararlılık için okunan bir duadır." },
  { id: "d122", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُتَّقِينَ", turkish: "Rabbim! Beni takvalılardan eyle.", explanation: "Takva için okunan önemli bir duadır." },
  { id: "d123", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْغَفْلَةِ", turkish: "Allah'ım! Gafletten sana sığınırım.", explanation: "Gafletten korunmak için okunan bir duadır." },
  { id: "d124", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا", turkish: "Rabbimiz! Bizi kafirler için bir fitne kılma.", explanation: "Fitneye düşmemek için okunan önemli bir duadır." },
  { id: "d125", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدِّينِ", turkish: "Allah'ım! Senden dinde afiyet dilerim.", explanation: "Dinde afiyet için okunan bir duadır." },
  { id: "d126", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ", turkish: "Rabbim! Seni zikretmemde ve şükretmemde bana yardım et.", explanation: "Zikir ve şükür için okunan önemli bir duadır." },
  { id: "d127", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْفِتْنَةِ", turkish: "Allah'ım! Fitneden sana sığınırım.", explanation: "Fitneden korunmak için okunan önemli bir duadır." },
  { id: "d128", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ", turkish: "Rabbimiz! Bizi fasıklar topluluğu ile beraber kılma.", explanation: "Fasıklardan uzak durmak için okunan önemli bir duadır." },
  { id: "d129", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", turkish: "Allah'ım! Senden dünya ve ahirette af ve afiyet dilerim.", explanation: "Af ve afiyet için okunan kapsamlı bir duadır." },
  { id: "d130", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُخْلِصِينَ", turkish: "Rabbim! Beni ihlaslılardan eyle.", explanation: "İhlas için okunan önemli bir duadır." },
  { id: "d131", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحُزْنِ", turkish: "Allah'ım! Keder ve üzüntüden sana sığınırım.", explanation: "Keder ve üzüntüden korunmak için okunan bir duadır." },
  { id: "d132", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ", turkish: "Rabbimiz! Bizi zalimler topluluğu ile beraber kılma.", explanation: "Zalimlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d133", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ عَلَى الرُّشْدِ", turkish: "Allah'ım! Senden doğru yolda kararlılık dilerim.", explanation: "Doğru yolda kararlılık için okunan bir duadır." },
  { id: "d134", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ", turkish: "Rabbim! Seni zikretmemde bana yardım et.", explanation: "Zikir için okunan önemli bir duadır." },
  { id: "d135", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ", turkish: "Allah'ım! Acizlik ve tembellikten sana sığınırım.", explanation: "Acizlik ve tembellikten korunmak için okunan bir duadır." },
  { id: "d136", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً", turkish: "Rabbimiz! Bizi fitneye düşürme.", explanation: "Fitneden korunmak için okunan önemli bir duadır." },
  { id: "d137", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ", turkish: "Allah'ım! Senden af dilerim.", explanation: "Af için okunan kısa bir duadır." },
  { id: "d138", arabic: "رَبِّ اجْعَلْنِي شَاكِرًا لِنِعْمَتِكَ", turkish: "Rabbim! Beni nimetine şükredenlerden eyle.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d139", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفُسُوقِ", turkish: "Allah'ım! Küfür ve fısktan sana sığınırım.", explanation: "Küfür ve fısktan korunmak için okunan önemli bir duadır." },
  { id: "d140", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْكَافِرِينَ", turkish: "Rabbimiz! Bizi kafirler topluluğu ile beraber kılma.", explanation: "Kafirlerden uzak durmak için okunan önemli bir duadır." },
  { id: "d141", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى", turkish: "Allah'ım! Senden hidayet ve takva dilerim.", explanation: "Hidayet ve takva için okunan önemli bir duadır." },
  { id: "d142", arabic: "رَبِّ أَعِنِّي عَلَى شُكْرِكَ", turkish: "Rabbim! Şükründe bana yardım et.", explanation: "Şükür için okunan önemli bir duadır." },
  { id: "d143", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّقَاءِ", turkish: "Allah'ım! Bedbahtlıktan sana sığınırım.", explanation: "Bedbahtlıktan korunmak için okunan bir duadır." },
  { id: "d144", arabic: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الْفَاسِقِينَ", turkish: "Rabbimiz! Bizi fasıklar topluluğu ile beraber kılma.", explanation: "Fasıklardan uzak durmak için okunan önemli bir duadır." },
  { id: "d145", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَزِيمَةَ", turkish: "Allah'ım! Senden azim dilerim.", explanation: "Kararlılık için okunan bir duadır." },
  { id: "d146", arabic: "رَبِّ اجْعَلْنِي مِنَ الْمُتَّقِينَ", turkish: "Rabbim! Beni takvalılardan eyle.", explanation: "Takva için okunan önemli bir duadır." },
  { id: "d147", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْغَفْلَةِ", turkish: "Allah'ım! Gafletten sana sığınırım.", explanation: "Gafletten korunmak için okunan bir duadır." },
  { id: "d148", arabic: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا", turkish: "Rabbimiz! Bizi kafirler için bir fitne kılma.", explanation: "Fitneye düşmemek için okunan önemli bir duadır." },
  { id: "d149", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدِّينِ", turkish: "Allah'ım! Senden dinde afiyet dilerim.", explanation: "Dinde afiyet için okunan bir duadır." },
  { id: "d150", arabic: "رَبِّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ", turkish: "Rabbim! Seni zikretmemde ve şükretmemde bana yardım et.", explanation: "Zikir ve şükür için okunan önemli bir duadır." },
];

/**
 * Dua hook'u
 * Hardcoded duaları kullanır, rastgele dua getirme fonksiyonu sağlar
 * Production-ready, optimize edilmiş
 */
export const useDuas = () => {
  const [currentDua, setCurrentDua] = useState(null);
  const [usedIndices, setUsedIndices] = useState(new Set());

  // İlk duayı seç
  useEffect(() => {
    if (duas.length > 0 && !currentDua) {
      const randomIndex = Math.floor(Math.random() * duas.length);
      setCurrentDua(duas[randomIndex]);
      setUsedIndices(new Set([randomIndex]));
    }
  }, []);

  // Yeni rastgele dua getir
  const getRandomDua = useCallback(() => {
    if (duas.length === 0) {
      return;
    }

    // Eğer tüm dualar kullanıldıysa, kullanılanları sıfırla
    if (usedIndices.size >= duas.length) {
      setUsedIndices(new Set());
    }

    // Kullanılmayan bir index seç (tekrarı önlemek için)
    let randomIndex;
    let attempts = 0;
    do {
      randomIndex = Math.floor(Math.random() * duas.length);
      attempts++;
      if (attempts > 100) {
        // Çok deneme yapıldıysa, tüm listeyi sıfırla
        setUsedIndices(new Set());
        break;
      }
    } while (usedIndices.has(randomIndex));

    setCurrentDua(duas[randomIndex]);
    setUsedIndices(prev => new Set([...prev, randomIndex]));
  }, [usedIndices]);

  return {
    currentDua,
    loading: false,
    error: null,
    getRandomDua,
    totalDuas: duas.length,
  };
};
