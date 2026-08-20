/* ═══════════════════════════════════════════════════════════════
   MEDMATCH GLOBAL — lightweight language switcher
   Translates elements carrying a data-i18n="key" attribute.
   English is the source in the HTML (default); other languages are
   swapped in from the dictionary below. Choice is saved per visitor.
   Persian (fa) switches the page to right-to-left.

   COVERAGE (phase 1): navigation, hero intro, partner cards, footer.
   The animated hero headline and long body copy stay in English for
   now — extend the dictionary here to translate more.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  var RTL = { fa: 1 };

  var T = {
    tr: {
      "nav.why": "Neden Biz", "nav.treatments": "Tedaviler", "nav.partners": "Ortaklarımız",
      "nav.pricing": "Fiyatlar", "nav.packages": "Paketler", "nav.advisor": "Danışman Merkezi",
      "nav.faq": "SSS", "nav.howitworks": "Nasıl Çalışır", "nav.cta": "Ücretsiz Teklif Al",
      "nav.book": "Görüşme Planlayın",
      "nav.standard": "Standartlarımız", "nav.journal": "Blog", "nav.truecost": "Gerçek Maliyet",
      "std.more": "MedMatch Standardının tamamını okuyun →",
      "hero.eyebrow": "ABD VE KANADA'DAN HASTALAR İÇİN · İSTANBUL VE ANTALYA, TÜRKİYE",
      "hero.sub": "Sizi board sertifikalı bir cerrahla eşleştirir, tek sabit ve her şey dahil fiyatı yazılı veririz ve ilk görüşmeden tam iyileşmeye kadar yanınızda kalırız.",
      "hero.cta1": "Fiyatımı Gör", "hero.cta2": "WhatsApp'tan Sorun",
      "partner.dental1.type": "DİŞ KLİNİĞİ — ANTALYA",
      "partner.dental2.type": "DİŞ KLİNİĞİ — ANTALYA · İSTANBUL · DİDİM",
      "partner.dental2.desc": "Yirmi yılı aşkın deneyime sahip ödüllü gülüş stüdyosu — tam dijital iş akışıyla kaplama, kuron ve implant. Ücretsiz danışmanızda gerçek hasta sonuçlarını bizden isteyin.",
      "partner.dental2.link": "Tanıştırılmayı isteyin →",
      "partner.dental1.desc": "Özel diş sağlığı ortağımız — tam ağız implantları, kaplamalar ve gülüş tasarımları; bizzat yerinde denetlediğimiz board sertifikalı bir ekip tarafından uygulanır.",
      "partner.dental1.link": "Diş paketleri ve fiyatları →",
      "partner.hospital.type": "HASTANE GRUBU — İSTANBUL",
      "partner.hospital.desc": "Türkiye'nin en büyük özel sağlık gruplarından biri — estetik cerrahi, göz cerrahisi, saç ekimi, obezite işlemleri, check-up ve görüntüleme; hepsi yoğun bakımın yerinde bulunduğu tam donanımlı hastanelerde.",
      "partner.hospital.link": "İşlemler ve danışman erişimi →",
      "partner.network.type": "HASTANE GRUBU — YAKINDA",
      "partner.network.desc": "Türkiye'nin en büyük hastane ağlarından biri — 13 şehirde 25'ten fazla hastane. Resmi ortak fiyat listemizi şu anda hazırlıyoruz.",
      "partner.network.link": "Neler bekleyebilirsiniz →",
      "footer.treatments": "Tedaviler", "footer.academy": "Akademi", "footer.concierge": "Concierge",
      "footer.desc": "ABD ve Kanada'daki hastaları Türkiye'nin en seçkin cerrahlarıyla özel olarak buluşturuyoruz — yirmi yılı aşkın sağlık turizmi deneyimiyle."
    },
    de: {
      "nav.why": "Warum Wir", "nav.treatments": "Behandlungen", "nav.partners": "Unsere Partner",
      "nav.pricing": "Preise", "nav.packages": "Pakete", "nav.advisor": "Berater-Hub",
      "nav.faq": "FAQ", "nav.howitworks": "Ablauf", "nav.cta": "Kostenloses Angebot",
      "nav.book": "Termin buchen",
      "nav.standard": "Der Standard", "nav.journal": "Journal", "nav.truecost": "Echte Kosten",
      "std.more": "Den vollständigen MedMatch-Standard lesen →",
      "hero.eyebrow": "FÜR PATIENTEN AUS DEN USA UND KANADA · ISTANBUL UND ANTALYA, TÜRKEI",
      "hero.sub": "Wir vermitteln Ihnen einen zertifizierten Chirurgen, halten einen festen Komplettpreis schriftlich fest und bleiben vom ersten Anruf bis zur vollständigen Genesung an Ihrer Seite.",
      "hero.cta1": "Meinen Preis sehen", "hero.cta2": "Per WhatsApp fragen",
      "partner.dental1.type": "ZAHNKLINIK — ANTALYA",
      "partner.dental2.type": "ZAHNKLINIK — ANTALYA · ISTANBUL · DIDIM",
      "partner.dental2.desc": "Preisgekröntes Smile-Studio mit über zwanzig Jahren Erfahrung – Veneers, Kronen und Implantate im volldigitalen Workflow. Fragen Sie uns in Ihrer kostenlosen Beratung nach echten Patientenergebnissen.",
      "partner.dental2.link": "Vorstellung anfragen →",
      "partner.dental1.desc": "Unser dedizierter Zahnpartner – Implantate für den ganzen Kiefer, Veneers und Smile-Makeovers, durchgeführt von einem board-zertifizierten Team, das wir persönlich vor Ort geprüft haben.",
      "partner.dental1.link": "Zahnpakete & Preise →",
      "partner.hospital.type": "KLINIKGRUPPE — ISTANBUL",
      "partner.hospital.desc": "Eine der größten privaten Klinikgruppen der Türkei – plastische Chirurgie, Augenchirurgie, Haartransplantation, Adipositas-Eingriffe, Check-ups und Bildgebung, alles in Vollkliniken mit Intensivstation vor Ort.",
      "partner.hospital.link": "Eingriffe & Berater-Zugang →",
      "partner.network.type": "KLINIKGRUPPE — DEMNÄCHST",
      "partner.network.desc": "Eines der größten Kliniknetze der Türkei – mehr als 25 Kliniken in 13 Städten. Wir finalisieren gerade unsere offizielle Partner-Preisliste.",
      "partner.network.link": "Was Sie erwartet →",
      "footer.treatments": "Behandlungen", "footer.academy": "Die Akademie", "footer.concierge": "Concierge",
      "footer.desc": "Wir vermitteln Patienten aus den USA und Kanada privat an die renommiertesten Chirurgen der Türkei – auf Basis von über zwanzig Jahren Erfahrung im Gesundheitstourismus."
    },
    fr: {
      "nav.why": "Pourquoi Nous", "nav.treatments": "Traitements", "nav.partners": "Nos Partenaires",
      "nav.pricing": "Tarifs", "nav.packages": "Forfaits", "nav.advisor": "Espace Conseiller",
      "nav.faq": "FAQ", "nav.howitworks": "Comment ça marche", "nav.cta": "Devis Gratuit",
      "nav.book": "Réserver un appel",
      "nav.standard": "Notre Standard", "nav.journal": "Journal", "nav.truecost": "Coût réel",
      "std.more": "Lire le Standard MedMatch complet →",
      "hero.eyebrow": "POUR LES PATIENTS DES ÉTATS-UNIS ET DU CANADA · ISTANBUL ET ANTALYA, TÜRKİYE",
      "hero.sub": "Nous vous mettons en relation avec un chirurgien certifié, fixons par écrit un prix unique tout compris, et restons à vos côtés du premier appel jusqu'à la guérison complète.",
      "hero.cta1": "Voir mon prix", "hero.cta2": "Demander sur WhatsApp",
      "partner.dental1.type": "CLINIQUE DENTAIRE — ANTALYA",
      "partner.dental2.type": "CLINIQUE DENTAIRE — ANTALYA · ISTANBUL · DIDIM",
      "partner.dental2.desc": "Studio du sourire primé, fort de plus de vingt ans d'expérience — facettes, couronnes et implants en flux 100 % numérique. Demandez-nous de vrais résultats de patients lors de votre consultation gratuite.",
      "partner.dental2.link": "Demander une présentation →",
      "partner.dental1.desc": "Notre partenaire dentaire dédié — implants complets, facettes et transformations du sourire, réalisés par une équipe certifiée que nous avons personnellement auditée sur place.",
      "partner.dental1.link": "Forfaits & tarifs dentaires →",
      "partner.hospital.type": "GROUPE HOSPITALIER — ISTANBUL",
      "partner.hospital.desc": "L'un des plus grands groupes de santé privés de Turquie — chirurgie esthétique, chirurgie oculaire, greffe de cheveux, chirurgie de l'obésité, bilans de santé et imagerie, le tout dans des hôpitaux complets avec soins intensifs sur place.",
      "partner.hospital.link": "Interventions & accès conseiller →",
      "partner.network.type": "GROUPE HOSPITALIER — BIENTÔT",
      "partner.network.desc": "L'un des plus grands réseaux hospitaliers de Turquie — plus de 25 hôpitaux dans 13 villes. Nous finalisons actuellement notre liste de tarifs partenaire officielle.",
      "partner.network.link": "À quoi s'attendre →",
      "footer.treatments": "Traitements", "footer.academy": "L'Académie", "footer.concierge": "Conciergerie",
      "footer.desc": "Nous mettons en relation, en toute confidentialité, les patients des États-Unis et du Canada avec les chirurgiens les plus éminents de Turquie — fort de plus de vingt ans d'expérience en tourisme médical."
    },
    ru: {
      "nav.why": "Почему мы", "nav.treatments": "Лечение", "nav.partners": "Наши партнёры",
      "nav.pricing": "Цены", "nav.packages": "Пакеты", "nav.advisor": "Кабинет консультанта",
      "nav.faq": "Вопросы", "nav.howitworks": "Как это работает", "nav.cta": "Бесплатная оценка",
      "nav.book": "Записаться на звонок",
      "nav.standard": "Наш стандарт", "nav.journal": "Журнал", "nav.truecost": "Реальная стоимость",
      "std.more": "Читать полный стандарт MedMatch →",
      "hero.eyebrow": "ДЛЯ ПАЦИЕНТОВ ИЗ США И КАНАДЫ · СТАМБУЛ И АНТАЛЬЯ, ТУРЦИЯ",
      "hero.sub": "Мы подбираем вам сертифицированного хирурга, фиксируем единую цену «всё включено» в письменном виде и остаёмся рядом от первого звонка до полного восстановления.",
      "hero.cta1": "Узнать мою цену", "hero.cta2": "Спросить в WhatsApp",
      "partner.dental1.type": "СТОМАТОЛОГИЯ — АНТАЛЬЯ",
      "partner.dental2.type": "СТОМАТОЛОГИЯ — АНТАЛЬЯ · СТАМБУЛ · ДИДИМ",
      "partner.dental2.desc": "Титулованная студия улыбки с более чем двадцатилетним опытом — виниры, коронки и импланты по полностью цифровому протоколу. Запросите реальные результаты пациентов на бесплатной консультации.",
      "partner.dental2.link": "Запросить знакомство →",
      "partner.dental1.desc": "Наш профильный стоматологический партнёр — импланты всей челюсти, виниры и преображение улыбки, которые выполняет сертифицированная команда, лично проверенная нами в клинике.",
      "partner.dental1.link": "Стоматологические пакеты и цены →",
      "partner.hospital.type": "СЕТЬ КЛИНИК — СТАМБУЛ",
      "partner.hospital.desc": "Одна из крупнейших частных медицинских групп Турции — пластическая хирургия, офтальмология, пересадка волос, бариатрия, чек-апы и диагностика — всё в полноценных больницах с отделением интенсивной терапии.",
      "partner.hospital.link": "Процедуры и доступ через консультанта →",
      "partner.network.type": "СЕТЬ КЛИНИК — СКОРО",
      "partner.network.desc": "Одна из крупнейших больничных сетей Турции — более 25 больниц в 13 городах. Сейчас мы готовим официальный партнёрский прайс-лист.",
      "partner.network.link": "Чего ожидать →",
      "footer.treatments": "Лечение", "footer.academy": "Академия", "footer.concierge": "Консьерж",
      "footer.desc": "Мы конфиденциально подбираем пациентам из США и Канады самых выдающихся хирургов Турции — на основе более чем двадцатилетнего опыта в медицинском туризме."
    },
    zh: {
      "nav.why": "为何选择我们", "nav.treatments": "诊疗项目", "nav.partners": "合作伙伴",
      "nav.pricing": "价格", "nav.packages": "套餐", "nav.advisor": "顾问中心",
      "nav.faq": "常见问题", "nav.howitworks": "服务流程", "nav.cta": "获取免费报价",
      "nav.book": "预约通话",
      "nav.standard": "审核标准", "nav.journal": "博客", "nav.truecost": "真实费用",
      "std.more": "阅读完整的 MedMatch 标准 →",
      "hero.eyebrow": "面向美国和加拿大患者 · 土耳其伊斯坦布尔与安塔利亚",
      "hero.sub": "我们为您匹配具备资质的外科医生，以书面形式锁定一口价全包费用，并从第一通电话陪伴您直到完全康复。",
      "hero.cta1": "查看我的价格", "hero.cta2": "用 WhatsApp 咨询",
      "partner.dental1.type": "牙科诊所 — 安塔利亚",
      "partner.dental2.type": "牙科诊所 — 安塔利亚 · 伊斯坦布尔 · 迪迪姆",
      "partner.dental2.desc": "屡获殊荣的微笑设计工作室，拥有二十余年经验——贴面、牙冠与种植全数字化流程。免费咨询时可向我们索取真实患者案例。",
      "partner.dental2.link": "申请引荐 →",
      "partner.dental1.desc": "我们专属的牙科合作伙伴 — 全口种植、贴面与微笑改造，由我们亲赴现场考察的持证专家团队完成。",
      "partner.dental1.link": "牙科套餐与价格 →",
      "partner.hospital.type": "医院集团 — 伊斯坦布尔",
      "partner.hospital.desc": "土耳其最大的私立医疗集团之一 — 整形外科、眼科手术、植发、减重手术、高端体检与影像检查，全部在配备重症监护的综合医院内完成。",
      "partner.hospital.link": "项目与顾问通道 →",
      "partner.network.type": "医院集团 — 即将上线",
      "partner.network.desc": "土耳其最大的医院网络之一 — 覆盖 13 座城市、超过 25 家医院。我们正在敲定官方合作价目表。",
      "partner.network.link": "了解详情 →",
      "footer.treatments": "诊疗项目", "footer.academy": "学院", "footer.concierge": "礼宾服务",
      "footer.desc": "我们以私密方式，为来自美国和加拿大的患者匹配土耳其最杰出的外科医生 — 依托二十多年的健康旅游经验。"
    },
    fa: {
      "nav.why": "چرا ما", "nav.treatments": "درمان‌ها", "nav.partners": "شرکای ما",
      "nav.pricing": "قیمت‌ها", "nav.packages": "بسته‌ها", "nav.advisor": "مرکز مشاوران",
      "nav.faq": "پرسش‌های متداول", "nav.howitworks": "نحوه کار", "nav.cta": "دریافت پیشنهاد رایگان",
      "nav.book": "رزرو تماس",
      "nav.standard": "استاندارد ما", "nav.journal": "مجله", "nav.truecost": "هزینه واقعی",
      "std.more": "مطالعه استاندارد کامل MedMatch →",
      "hero.eyebrow": "برای بیماران از آمریکا و کانادا · استانبول و آنتالیا، ترکیه",
      "hero.sub": "شما را با جراحی دارای بورد تخصصی هماهنگ می‌کنیم، یک قیمت ثابت و همه‌شمول را کتبی ثبت می‌کنیم و از نخستین تماس تا بهبود کامل کنارتان می‌مانیم.",
      "hero.cta1": "قیمت من را ببینید", "hero.cta2": "در واتساپ بپرسید",
      "partner.dental1.type": "کلینیک دندان‌پزشکی — آنتالیا",
      "partner.dental2.type": "کلینیک دندان‌پزشکی — آنتالیا · استانبول · دیدیم",
      "partner.dental2.desc": "استودیوی لبخند برنده جایزه با بیش از بیست سال تجربه — لمینت، روکش و ایمپلنت با فرایند کاملاً دیجیتال. در مشاوره رایگان، نتایج واقعی بیماران را از ما بخواهید.",
      "partner.dental2.link": "درخواست معرفی →",
      "partner.dental1.desc": "شریک تخصصی دندان‌پزشکی ما — ایمپلنت کامل فک، لمینت و طراحی لبخند، توسط تیمی دارای بورد تخصصی که شخصاً در محل بررسی کرده‌ایم.",
      "partner.dental1.link": "بسته‌ها و قیمت‌های دندان‌پزشکی →",
      "partner.hospital.type": "گروه بیمارستانی — استانبول",
      "partner.hospital.desc": "یکی از بزرگ‌ترین گروه‌های درمانی خصوصی ترکیه — جراحی زیبایی، جراحی چشم، کاشت مو، جراحی چاقی، چکاپ و تصویربرداری، همه در بیمارستان‌های کامل با بخش مراقبت‌های ویژه.",
      "partner.hospital.link": "روش‌ها و دسترسی از طریق مشاور →",
      "partner.network.type": "گروه بیمارستانی — به‌زودی",
      "partner.network.desc": "یکی از بزرگ‌ترین شبکه‌های بیمارستانی ترکیه — بیش از ۲۵ بیمارستان در ۱۳ شهر. در حال نهایی‌سازی فهرست قیمت رسمی همکاری هستیم.",
      "partner.network.link": "چه انتظاری داشته باشید →",
      "footer.treatments": "درمان‌ها", "footer.academy": "آکادمی", "footer.concierge": "کنسیرژ",
      "footer.desc": "ما بیماران آمریکا و کانادا را به‌صورت خصوصی با برجسته‌ترین جراحان ترکیه مرتبط می‌کنیم — بر پایه بیش از بیست سال تجربه در گردشگری سلامت."
    },
    hi: {
      "nav.why": "हम क्यों", "nav.treatments": "उपचार", "nav.partners": "हमारे साझेदार",
      "nav.pricing": "मूल्य", "nav.packages": "पैकेज", "nav.advisor": "सलाहकार हब",
      "nav.faq": "सामान्य प्रश्न", "nav.howitworks": "यह कैसे काम करता है", "nav.cta": "मुफ़्त कोटेशन पाएं",
      "nav.book": "कॉल बुक करें",
      "nav.standard": "हमारा मानक", "nav.journal": "जर्नल", "nav.truecost": "वास्तविक लागत",
      "std.more": "पूरा MedMatch मानक पढ़ें →",
      "hero.eyebrow": "अमेरिका और कनाडा के मरीज़ों के लिए · इस्तांबुल और अंताल्या, तुर्किये",
      "hero.sub": "हम आपको एक बोर्ड-प्रमाणित सर्जन से मिलाते हैं, एक निश्चित सर्व-समावेशी कीमत लिखित में तय करते हैं, और पहली कॉल से पूर्ण स्वस्थ होने तक आपके साथ रहते हैं।",
      "hero.cta1": "मेरी कीमत देखें", "hero.cta2": "WhatsApp पर पूछें",
      "partner.dental1.type": "डेंटल क्लिनिक — अंताल्या",
      "partner.dental2.type": "डेंटल क्लिनिक — अंताल्या · इस्तांबुल · दिदिम",
      "partner.dental2.desc": "बीस से अधिक वर्षों के अनुभव वाला पुरस्कार-विजेता स्माइल स्टूडियो — पूरी तरह डिजिटल वर्कफ़्लो पर विनियर, क्राउन और इम्प्लांट। अपनी मुफ़्त परामर्श में हमसे असली मरीज़ों के परिणाम माँगें।",
      "partner.dental2.link": "परिचय का अनुरोध करें →",
      "partner.dental1.desc": "हमारा समर्पित डेंटल साझेदार — फुल-माउथ इम्प्लांट, विनियर और स्माइल मेकओवर, एक बोर्ड-प्रमाणित टीम द्वारा जिसे हमने स्वयं क्लिनिक में परखा है।",
      "partner.dental1.link": "डेंटल पैकेज और मूल्य →",
      "partner.hospital.type": "अस्पताल समूह — इस्तांबुल",
      "partner.hospital.desc": "तुर्की के सबसे बड़े निजी स्वास्थ्य समूहों में से एक — प्लास्टिक सर्जरी, नेत्र सर्जरी, हेयर ट्रांसप्लांट, मोटापा शल्यक्रिया, चेक-अप और इमेजिंग, सभी गहन चिकित्सा सुविधा वाले पूर्ण अस्पतालों में।",
      "partner.hospital.link": "प्रक्रियाएँ और सलाहकार एक्सेस →",
      "partner.network.type": "अस्पताल समूह — जल्द आ रहा है",
      "partner.network.desc": "तुर्की के सबसे बड़े अस्पताल नेटवर्क में से एक — 13 शहरों में 25 से अधिक अस्पताल। हम अभी अपनी आधिकारिक साझेदार मूल्य सूची तैयार कर रहे हैं।",
      "partner.network.link": "क्या अपेक्षा करें →",
      "footer.treatments": "उपचार", "footer.academy": "अकादमी", "footer.concierge": "कंसीयज",
      "footer.desc": "हम अमेरिका और कनाडा के मरीज़ों को तुर्की के सबसे प्रतिष्ठित सर्जनों से निजी तौर पर जोड़ते हैं — बीस वर्षों से अधिक के स्वास्थ्य पर्यटन अनुभव पर आधारित।"
    }
  };

  /* ── Stage 1: Why-Us pillars, stats, interludes, all section headings ── */
  var T1 = {
    tr: {
      "std.eyebrow": "HASTALARIN BİZE GÜVENME NEDENİ", "std.heading": "Güvenliğiniz tüm iş modelimizdir.",
      "std.lede": "Yurt dışında ameliyat olmaktan çekiniyor musunuz? Dikkatli olmalısınız — zaten tam bu yüzden, hiçbir ödeme yapmadan önce cerrahınızla tanışır ve yazılı sabit fiyatınızı elinize alırsınız. İşte size garanti ettiklerimiz ve kendinizin doğrulayabilecekleri.",
      "std.p1h": "Kanıtlı, seçilmiş cerrahlar", "std.p1b": "Başvuran kliniklerin 10'da 1'inden azını kabul ediyoruz. Her cerrah board sertifikalıdır ve yalnızca JCI akreditasyonlu hastanelerde çalışır — önde gelen Amerikan hastanelerinin standardıyla aynı. Herhangi bir cerrahın belgelerini ve vaka geçmişini isteyin: ödeme yapmadan önce size gönderiyoruz.",
      "std.p2h": "Ödeme yapmadan cerrahınızla tanışın", "std.p2b": "Para el değiştirmeden önce gerçek cerrahınızla — bir satış temsilcisiyle değil — özel bir görüntülü görüşme. Bir şey ters gelirse ayrılırsınız. Depozito yok, baskı yok.",
      "std.p3h": "Yazılı, tek sabit fiyat", "std.p3b": "Ameliyat, hastane, otel, transferler, bakım — uçuş rezervasyonundan önce onaylanan her şey dahil tek teklif. Kabul ettiğiniz fiyat, ödediğiniz fiyattır. Asla sürpriz fatura yok.",
      "std.p4h": "Okyanusu aşan bakım", "std.p4b": "Eve döndükten sonra cerrahınızla planlı görüntülü kontroller, yerel doktorunuzla koordinasyon ve nadir bir düzeltme gerektiğinde yazılı bir plan.",
      "num.1": "ABD ve Kanada'dan hasta", "num.2": "Bizi tavsiye eder", "num.3": "JCI akreditasyonlu ortak hastane", "num.4": "Hasta başına ortalama tasarruf",
      "il.1": "“İyileşme bir hastane koridorundan çok —<br>Turkuaz Kıyı'yı andırmalı.”", "il.2": "“Burada bir vaka numarası değilsiniz.<br>Bir misafirsiniz.”", "il.3": "“Akdeniz üç bin yıldır<br>gezginleri iyileştiriyor.”",
      "treat.eyebrow": "TEDAVİLER VE FİYATLAR", "treat.heading": "Dört imza tedavi.<br><em>Ve arkalarında tam bir hastane.</em>",
      "partners.eyebrow": "ORTAKLARIMIZ", "partners.heading": "Emin ellerdesiniz.",
      "faculty.eyebrow": "DİŞ HEKİMLİĞİ KADROSU", "faculty.lede": "Her biri board sertifikalı, bizzat görüşülmüş ve gelmeden önce vakanızı inceliyor.",
      "pricing.eyebrow": "FİYATLAR", "pricing.heading": "Kuruşuna kadar şeffaf.",
      "packages.eyebrow": "DİŞ PAKETLERİ — ANTALYA", "packages.heading": "Her kuruş, kalem kalem.",
      "passage.eyebrow": "NASIL ÇALIŞIR", "passage.heading": "Kapınızdan çıkıp geri dönüşe.",
      "voices.eyebrow": "HASTA HİKÂYELERİ", "voices.heading": "Hasta olarak geldiler.<br>Savunucu olarak döndüler.",
      "stories.eyebrow": "GERÇEK HASTA HİKÂYELERİ", "stories.heading": "Onlardan dinleyin.",
      "faq.eyebrow": "DÜRÜST YANITLAR", "faq.heading": "Her akıllı hastanın sorduğu sorular.",
      "inv.eyebrow": "BAŞLAYIN", "inv.heading": "Ücretsiz teklifinizi alın."
    },
    de: {
      "std.eyebrow": "WARUM PATIENTEN UNS VERTRAUEN", "std.heading": "Ihre Sicherheit ist unser ganzes Geschäftsmodell.",
      "std.lede": "Angst vor einer Operation im Ausland? Vorsicht ist richtig — genau deshalb lernen Sie Ihren Chirurgen kennen und halten einen festen schriftlichen Preis in der Hand, bevor Sie irgendetwas bezahlen. Das garantieren wir Ihnen, und das können Sie selbst überprüfen.",
      "std.p1h": "Geprüfte Chirurgen – mit Nachweis", "std.p1b": "Wir nehmen weniger als 1 von 10 Kliniken an, die sich bewerben. Jeder Chirurg ist zertifiziert und operiert ausschließlich in JCI-akkreditierten Kliniken – demselben Standard führender amerikanischer Kliniken. Fragen Sie nach Qualifikationen und Fallhistorie eines Chirurgen: Wir senden sie, bevor Sie etwas bezahlen.",
      "std.p2h": "Lernen Sie Ihren Chirurgen kennen, bevor Sie zahlen", "std.p2b": "Eine private Videosprechstunde mit Ihrem tatsächlichen Chirurgen – nicht mit einem Verkäufer – bevor Geld fließt. Wenn sich etwas nicht richtig anfühlt, gehen Sie. Keine Anzahlung, kein Druck.",
      "std.p3h": "Ein Festpreis, schriftlich", "std.p3b": "Operation, Klinik, Hotel, Transfers, Nachsorge – ein Komplettangebot, bestätigt, bevor Sie Flüge buchen. Der Preis, den Sie annehmen, ist der Preis, den Sie zahlen. Niemals Überraschungsrechnungen.",
      "std.p4h": "Nachsorge über den Ozean hinweg", "std.p4b": "Geplante Video-Nachsorge mit Ihrem Chirurgen nach Ihrer Rückkehr, Abstimmung mit Ihrem Arzt vor Ort und ein schriftlicher Plan für den seltenen Fall einer nötigen Korrektur.",
      "num.1": "Patienten aus den USA und Kanada", "num.2": "Würden uns weiterempfehlen", "num.3": "JCI-akkreditierte Partnerkliniken", "num.4": "Durchschnittliche Ersparnis pro Patient",
      "il.1": "„Genesung sollte sich weniger wie ein Klinikflur anfühlen –<br>und mehr wie die Türkisküste.“", "il.2": "„Sie sind hier keine Fallnummer.<br>Sie sind ein Gast.“", "il.3": "„Das Mittelmeer heilt Reisende<br>seit dreitausend Jahren.“",
      "treat.eyebrow": "BEHANDLUNGEN & PREISE", "treat.heading": "Vier Kernbehandlungen.<br><em>Und eine ganze Klinik dahinter.</em>",
      "partners.eyebrow": "UNSERE PARTNER", "partners.heading": "In diesen Händen sind Sie.",
      "faculty.eyebrow": "DAS ZAHNÄRZTE-TEAM", "faculty.lede": "Jeder zertifiziert, persönlich ausgewählt und prüft Ihren Fall, bevor Sie reisen.",
      "pricing.eyebrow": "PREISE", "pricing.heading": "Bis auf den Cent transparent.",
      "packages.eyebrow": "ZAHNPAKETE — ANTALYA", "packages.heading": "Jeder Euro, aufgeschlüsselt.",
      "passage.eyebrow": "SO FUNKTIONIERT ES", "passage.heading": "Von Ihrer Tür und wieder zurück.",
      "voices.eyebrow": "PATIENTENGESCHICHTEN", "voices.heading": "Sie kamen als Patienten.<br>Sie kehrten als Fürsprecher zurück.",
      "stories.eyebrow": "ECHTE PATIENTENGESCHICHTEN", "stories.heading": "Hören Sie es von ihnen.",
      "faq.eyebrow": "EHRLICHE ANTWORTEN", "faq.heading": "Die Fragen, die jeder kluge Patient stellt.",
      "inv.eyebrow": "LOSLEGEN", "inv.heading": "Ihr kostenloses Angebot."
    },
    fr: {
      "std.eyebrow": "POURQUOI LES PATIENTS NOUS FONT CONFIANCE", "std.heading": "Votre sécurité est tout notre modèle.",
      "std.lede": "L'idée d'une opération à l'étranger vous fait peur ? La prudence est justifiée — c'est précisément pour cela que vous rencontrez votre chirurgien et disposez d'un prix fixe écrit avant de payer quoi que ce soit. Voici ce que nous garantissons, et ce que vous pouvez vérifier vous-même.",
      "std.p1h": "Chirurgiens vérifiés — avec preuves", "std.p1b": "Nous acceptons moins d'une clinique sur 10 qui postulent. Chaque chirurgien est certifié et n'opère que dans des hôpitaux accrédités JCI — la même norme que les grands hôpitaux américains. Demandez les qualifications et l'historique de cas de tout chirurgien : nous vous les envoyons avant tout paiement.",
      "std.p2h": "Rencontrez votre chirurgien avant de payer", "std.p2b": "Une consultation vidéo privée avec votre véritable chirurgien — pas un commercial — avant tout échange d'argent. Si quelque chose vous gêne, vous partez. Aucun acompte, aucune pression.",
      "std.p3h": "Un prix fixe, par écrit", "std.p3b": "Chirurgie, hôpital, hôtel, transferts, suivi — un devis tout compris confirmé avant de réserver vos vols. Le prix que vous acceptez est celui que vous payez. Jamais de facture surprise.",
      "std.p4h": "Un suivi qui traverse l'océan", "std.p4b": "Des suivis vidéo programmés avec votre chirurgien après votre retour, une coordination avec votre médecin local et un plan écrit pour le rare cas où une correction serait nécessaire.",
      "num.1": "Patients des États-Unis et du Canada", "num.2": "Nous recommanderaient", "num.3": "Hôpitaux partenaires accrédités JCI", "num.4": "Économie moyenne par patient",
      "il.1": "« La convalescence devrait ressembler moins à un couloir d'hôpital —<br>et davantage à la Côte turquoise. »", "il.2": "« Ici, vous n'êtes pas un numéro de dossier.<br>Vous êtes un invité. »", "il.3": "« La Méditerranée soigne les voyageurs<br>depuis trois mille ans. »",
      "treat.eyebrow": "TRAITEMENTS & TARIFS", "treat.heading": "Quatre traitements phares.<br><em>Et tout un hôpital derrière.</em>",
      "partners.eyebrow": "NOS PARTENAIRES", "partners.heading": "Entre de bonnes mains.",
      "faculty.eyebrow": "L'ÉQUIPE DENTAIRE", "faculty.lede": "Chacun certifié, sélectionné en personne, et examine votre cas avant votre départ.",
      "pricing.eyebrow": "TARIFS", "pricing.heading": "Transparent au centime près.",
      "packages.eyebrow": "FORFAITS DENTAIRES — ANTALYA", "packages.heading": "Chaque euro, détaillé.",
      "passage.eyebrow": "COMMENT ÇA MARCHE", "passage.heading": "De votre porte, et retour.",
      "voices.eyebrow": "TÉMOIGNAGES DE PATIENTS", "voices.heading": "Ils sont arrivés patients.<br>Ils sont repartis ambassadeurs.",
      "stories.eyebrow": "VRAIS TÉMOIGNAGES", "stories.heading": "Écoutez-les.",
      "faq.eyebrow": "RÉPONSES HONNÊTES", "faq.heading": "Les questions que tout patient avisé se pose.",
      "inv.eyebrow": "COMMENCER", "inv.heading": "Obtenez votre devis gratuit."
    },
    ru: {
      "std.eyebrow": "ПОЧЕМУ ПАЦИЕНТЫ НАМ ДОВЕРЯЮТ", "std.heading": "Ваша безопасность — вся наша бизнес-модель.",
      "std.lede": "Страшно оперироваться за границей? Осторожность оправданна — именно поэтому вы знакомитесь с хирургом и получаете фиксированную цену на бумаге до того, как что-либо оплатите. Вот что мы гарантируем и что вы можете проверить сами.",
      "std.p1h": "Проверенные хирурги — с доказательствами", "std.p1b": "Мы принимаем менее 1 из 10 клиник, подающих заявку. Каждый хирург сертифицирован и оперирует только в клиниках с аккредитацией JCI — тот же стандарт, что и у ведущих американских больниц. Запросите квалификацию и историю случаев любого хирурга: мы пришлём их до того, как вы что-либо оплатите.",
      "std.p2h": "Познакомьтесь с хирургом до оплаты", "std.p2b": "Частная видеоконсультация с вашим настоящим хирургом — не с менеджером по продажам — до того, как деньги перейдут из рук в руки. Если что-то не так, вы уходите. Без депозита, без давления.",
      "std.p3h": "Одна фиксированная цена, письменно", "std.p3b": "Операция, больница, отель, трансферы, уход — одно всё включающее предложение, подтверждённое до бронирования билетов. Цена, которую вы принимаете, — это цена, которую вы платите. Никаких неожиданных счетов.",
      "std.p4h": "Уход, что пересекает океан", "std.p4b": "Запланированные видеоконтроли с хирургом после возвращения домой, координация с вашим местным врачом и письменный план на редкий случай, если что-то потребует коррекции.",
      "num.1": "Пациентов из США и Канады", "num.2": "Рекомендовали бы нас", "num.3": "Партнёрских клиник с аккредитацией JCI", "num.4": "Средняя экономия на пациента",
      "il.1": "«Восстановление должно напоминать не больничный коридор —<br>а Бирюзовое побережье.»", "il.2": "«Здесь вы не номер в карте.<br>Вы — гость.»", "il.3": "«Средиземное море исцеляет путников<br>уже три тысячи лет.»",
      "treat.eyebrow": "ЛЕЧЕНИЕ И ЦЕНЫ", "treat.heading": "Четыре ключевых направления.<br><em>И целая больница за ними.</em>",
      "partners.eyebrow": "НАШИ ПАРТНЁРЫ", "partners.heading": "Вы в надёжных руках.",
      "faculty.eyebrow": "СТОМАТОЛОГИЧЕСКАЯ КОМАНДА", "faculty.lede": "Каждый сертифицирован, лично отобран и изучает ваш случай до поездки.",
      "pricing.eyebrow": "ЦЕНЫ", "pricing.heading": "Прозрачно до копейки.",
      "packages.eyebrow": "СТОМАТОЛОГИЧЕСКИЕ ПАКЕТЫ — АНТАЛЬЯ", "packages.heading": "Каждый доллар — по пунктам.",
      "passage.eyebrow": "КАК ЭТО РАБОТАЕТ", "passage.heading": "От вашей двери и обратно.",
      "voices.eyebrow": "ИСТОРИИ ПАЦИЕНТОВ", "voices.heading": "Они приехали пациентами.<br>Вернулись сторонниками.",
      "stories.eyebrow": "РЕАЛЬНЫЕ ИСТОРИИ ПАЦИЕНТОВ", "stories.heading": "Услышьте от них самих.",
      "faq.eyebrow": "ЧЕСТНЫЕ ОТВЕТЫ", "faq.heading": "Вопросы, которые задаёт каждый разумный пациент.",
      "inv.eyebrow": "НАЧАТЬ", "inv.heading": "Получите бесплатную оценку."
    },
    zh: {
      "std.eyebrow": "患者为何信任我们", "std.heading": "您的安全，就是我们的整个商业模式。",
      "std.lede": "担心出国手术？谨慎是应该的——正因如此，在您付款之前，您会先见到主刀医生，并拿到一份书面固定报价。以下是我们的承诺，以及您可以自行核实的内容。",
      "std.p1h": "经过筛选的外科医生——有据可查", "std.p1b": "在申请的诊所中，我们接受的不到十分之一。每位外科医生均具备资质，且只在通过 JCI 认证的医院手术——与美国顶尖医院相同的标准。索取任何一位医生的资历与病例记录：我们会在您付款之前发送给您。",
      "std.p2h": "付款前先与您的医生见面", "std.p2b": "在任何款项交付之前，与您真正的主刀医生——而非销售人员——进行一对一视频咨询。若有任何不妥，您可随时离开。无需押金，绝无压力。",
      "std.p3h": "一个固定价格，白纸黑字", "std.p3b": "手术、医院、酒店、接送、术后护理——在您预订机票之前确认的一体化报价。您接受的价格，就是您支付的价格。绝无意外账单。",
      "std.p4h": "跨越大洋的术后关怀", "std.p4b": "回国后与您的医生进行预约视频随访，与您的当地医生协调，并为极少数需要修整的情况提供书面方案。",
      "num.1": "来自美国和加拿大的患者", "num.2": "愿意推荐我们", "num.3": "JCI 认证的合作医院", "num.4": "每位患者平均节省",
      "il.1": "“康复不该像医院走廊——<br>而更像绿松石海岸。”", "il.2": "“在这里，您不是一个病例编号。<br>您是一位贵宾。”", "il.3": "“地中海治愈旅人，<br>已有三千年。”",
      "treat.eyebrow": "诊疗项目与价格", "treat.heading": "四项招牌诊疗。<br><em>背后是一整所医院。</em>",
      "partners.eyebrow": "合作伙伴", "partners.heading": "值得托付的双手。",
      "faculty.eyebrow": "牙科团队", "faculty.lede": "每位均具备资质、经亲自面谈，并在您出发前审阅您的病例。",
      "pricing.eyebrow": "价格", "pricing.heading": "透明到每一分。",
      "packages.eyebrow": "牙科套餐 — 安塔利亚", "packages.heading": "每一分钱，逐项列明。",
      "passage.eyebrow": "服务流程", "passage.heading": "从您家门口，再回到家门口。",
      "voices.eyebrow": "患者故事", "voices.heading": "他们以患者身份到来。<br>以拥护者身份归去。",
      "stories.eyebrow": "真实患者故事", "stories.heading": "听他们亲口讲述。",
      "faq.eyebrow": "诚实的解答", "faq.heading": "每位明智患者都会问的问题。",
      "inv.eyebrow": "开始", "inv.heading": "获取您的免费报价。"
    },
    fa: {
      "std.eyebrow": "چرا بیماران به ما اعتماد می‌کنند", "std.heading": "ایمنی شما، تمام مدل کاری ماست.",
      "std.lede": "از جراحی در خارج از کشور می‌ترسید؟ احتیاط درست است — دقیقاً به همین دلیل پیش از پرداخت هر مبلغی، جراح خود را می‌بینید و یک قیمت ثابت کتبی در دست دارید. این چیزی است که تضمین می‌کنیم و آنچه خودتان می‌توانید بررسی کنید.",
      "std.p1h": "جراحان تأییدشده — با مدرک", "std.p1b": "از هر ۱۰ کلینیک متقاضی، کمتر از ۱ مورد را می‌پذیریم. هر جراح دارای بورد تخصصی است و تنها در بیمارستان‌های دارای اعتبار JCI عمل می‌کند — همان استانداردی که بیمارستان‌های برتر آمریکا دارند. مدارک و سوابق پرونده هر جراح را بخواهید: پیش از هر پرداختی برایتان می‌فرستیم.",
      "std.p2h": "پیش از پرداخت با جراح‌تان دیدار کنید", "std.p2b": "یک مشاوره ویدیویی خصوصی با جراح واقعی شما — نه یک فروشنده — پیش از هر جابه‌جایی پول. اگر چیزی درست به نظر نرسید، کنار می‌کشید. بدون بیعانه، بدون فشار.",
      "std.p3h": "یک قیمت ثابت، کتبی", "std.p3b": "عمل، بیمارستان، هتل، ترانسفر، مراقبت پس از عمل — یک پیشنهاد همه‌شمول که پیش از رزرو پرواز تأیید می‌شود. قیمتی که می‌پذیرید همان است که می‌پردازید. هرگز صورتحساب غیرمنتظره‌ای در کار نیست.",
      "std.p4h": "مراقبتی که از اقیانوس می‌گذرد", "std.p4b": "پیگیری‌های ویدیویی برنامه‌ریزی‌شده با جراح‌تان پس از بازگشت به خانه، هماهنگی با پزشک محلی شما، و برنامه‌ای کتبی برای مورد نادری که نیاز به اصلاح داشته باشد.",
      "num.1": "بیمار از آمریکا و کانادا", "num.2": "ما را توصیه می‌کنند", "num.3": "بیمارستان همکار دارای اعتبار JCI", "num.4": "میانگین صرفه‌جویی هر بیمار",
      "il.1": "«بهبودی باید کمتر شبیه راهروی بیمارستان باشد —<br>و بیشتر شبیه ساحل فیروزه‌ای.»", "il.2": "«اینجا شما یک شماره پرونده نیستید.<br>شما یک مهمان هستید.»", "il.3": "«مدیترانه سه هزار سال است<br>مسافران را شفا می‌دهد.»",
      "treat.eyebrow": "درمان‌ها و قیمت‌ها", "treat.heading": "چهار درمان شاخص.<br><em>و یک بیمارستان کامل پشت آن‌ها.</em>",
      "partners.eyebrow": "شرکای ما", "partners.heading": "در دستانی مطمئن.",
      "faculty.eyebrow": "تیم دندان‌پزشکی", "faculty.lede": "هر یک دارای بورد تخصصی، منتخب شخصی، و بررسی‌کننده پرونده شما پیش از سفر.",
      "pricing.eyebrow": "قیمت‌ها", "pricing.heading": "شفاف تا آخرین ریال.",
      "packages.eyebrow": "بسته‌های دندان‌پزشکی — آنتالیا", "packages.heading": "هر ریال، مورد به مورد.",
      "passage.eyebrow": "چگونه کار می‌کند", "passage.heading": "از درِ خانه‌تان، و بازگشت.",
      "voices.eyebrow": "روایت بیماران", "voices.heading": "به‌عنوان بیمار آمدند.<br>به‌عنوان مدافع بازگشتند.",
      "stories.eyebrow": "روایت‌های واقعی بیماران", "stories.heading": "از زبان خودشان بشنوید.",
      "faq.eyebrow": "پاسخ‌های صادقانه", "faq.heading": "پرسش‌هایی که هر بیمار هوشمند می‌پرسد.",
      "inv.eyebrow": "شروع کنید", "inv.heading": "پیشنهاد رایگان خود را بگیرید."
    },
    hi: {
      "std.eyebrow": "मरीज़ हम पर भरोसा क्यों करते हैं", "std.heading": "आपकी सुरक्षा ही हमारा पूरा व्यवसाय मॉडल है।",
      "std.lede": "विदेश में सर्जरी से डर लगता है? सतर्क रहना सही है — इसीलिए तो आप कुछ भी चुकाने से पहले अपने सर्जन से मिलते हैं और एक लिखित निश्चित कीमत हाथ में रखते हैं। यह रही हमारी गारंटी, और वह सब जो आप खुद जाँच सकते हैं।",
      "std.p1h": "प्रमाण सहित परखे गए सर्जन", "std.p1b": "आवेदन करने वाले क्लीनिकों में से हम 10 में से 1 से भी कम स्वीकार करते हैं। हर सर्जन बोर्ड-प्रमाणित है और केवल JCI-मान्यता प्राप्त अस्पतालों में ही ऑपरेट करता है — वही मानक जो अग्रणी अमेरिकी अस्पताल रखते हैं। किसी भी सर्जन की योग्यता और केस इतिहास माँगें: हम इन्हें आपके भुगतान से पहले भेजते हैं।",
      "std.p2h": "भुगतान से पहले अपने सर्जन से मिलें", "std.p2b": "कोई भी पैसा हाथ बदलने से पहले आपके वास्तविक सर्जन के साथ — किसी सेल्समैन के साथ नहीं — एक निजी वीडियो परामर्श। यदि कुछ ठीक न लगे, तो आप चले जाते हैं। कोई जमा राशि नहीं, कोई दबाव नहीं।",
      "std.p3h": "एक निश्चित मूल्य, लिखित में", "std.p3b": "सर्जरी, अस्पताल, होटल, ट्रांसफर, देखभाल — उड़ान बुक करने से पहले पुष्ट एक सर्व-समावेशी कोटेशन। जो मूल्य आप स्वीकार करते हैं, वही आप चुकाते हैं। कभी कोई चौंकाने वाला बिल नहीं।",
      "std.p4h": "महासागर पार करती देखभाल", "std.p4b": "घर लौटने के बाद आपके सर्जन के साथ निर्धारित वीडियो फ़ॉलो-अप, आपके स्थानीय डॉक्टर के साथ समन्वय, और उस दुर्लभ स्थिति के लिए एक लिखित योजना जब कुछ ठीक करने की ज़रूरत हो।",
      "num.1": "अमेरिका और कनाडा के मरीज़", "num.2": "हमारी अनुशंसा करेंगे", "num.3": "JCI-मान्यता प्राप्त साझेदार अस्पताल", "num.4": "प्रति मरीज़ औसत बचत",
      "il.1": "“रिकवरी अस्पताल के गलियारे जैसी कम —<br>और फ़िरोज़ा तट जैसी अधिक लगनी चाहिए।”", "il.2": "“यहाँ आप कोई केस नंबर नहीं हैं।<br>आप एक अतिथि हैं।”", "il.3": "“भूमध्य सागर यात्रियों को<br>तीन हज़ार वर्षों से चंगा कर रहा है।”",
      "treat.eyebrow": "उपचार और मूल्य", "treat.heading": "चार प्रमुख उपचार।<br><em>और उनके पीछे एक पूरा अस्पताल।</em>",
      "partners.eyebrow": "हमारे साझेदार", "partners.heading": "जिन हाथों में आप हैं।",
      "faculty.eyebrow": "डेंटल टीम", "faculty.lede": "प्रत्येक बोर्ड-प्रमाणित, व्यक्तिगत रूप से चयनित, और आपकी यात्रा से पहले आपके केस की समीक्षा करते हुए।",
      "pricing.eyebrow": "मूल्य", "pricing.heading": "हर पैसे तक पारदर्शी।",
      "packages.eyebrow": "डेंटल पैकेज — अंताल्या", "packages.heading": "हर पैसा, मद-दर-मद।",
      "passage.eyebrow": "यह कैसे काम करता है", "passage.heading": "आपके द्वार से, और वापस।",
      "voices.eyebrow": "मरीज़ों की कहानियाँ", "voices.heading": "वे मरीज़ बनकर आए।<br>समर्थक बनकर लौटे।",
      "stories.eyebrow": "असली मरीज़ कहानियाँ", "stories.heading": "उन्हीं से सुनिए।",
      "faq.eyebrow": "ईमानदार उत्तर", "faq.heading": "हर समझदार मरीज़ के सवाल।",
      "inv.eyebrow": "शुरू करें", "inv.heading": "अपना मुफ़्त कोटेशन पाएं।"
    }
  };
  // This merge was missing, so all 38 Stage 1 keys — the Why-Us pillars, every
  // section heading and the stat labels — silently stayed English in all seven
  // languages no matter what the visitor picked.
  Object.keys(T1).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T1[l]).forEach(function (k) { T[l][k] = T1[l][k]; });
  });

  /* ── Stage 2: section intros, How-It-Works steps, testimonials ── */
  var T2 = {
    tr: {
      "treat.lede": "Türkiye'nin uzmanlarının gerçekten dünyaya öncülük ettiği dört işlem. İstanbul'daki hastane grubumuz aracılığıyla estetik cerrahi, göz cerrahisi, kilo verme ve check-up işlemlerini de resmi hastane fiyatlarıyla düzenliyoruz.",
      "partners.lede": "Üç ortak; hepsi bizzat ziyaret edilip denetlendi. Her birini adıyla öğrenirsiniz — belgeleri, adresi, vaka sonuçları — tedavi planınızın içinde; ve ödeme yapmadan önce doktorunuzla görüntülü tanışırsınız.",
      "pricing.lede": "Tahmininizi oluşturun; ülkenizdeki özel ödeme fiyatlarıyla dürüstçe karşılaştırılır. Diş ve diz otel, transfer ve koordinatörünüzü içerir; hastane tedavileri resmi sabit fiyatı gösterir.",
      "packages.lede": "Tedaviniz için doğrudan kliniğe ödeme yaparsınız — tıbbi fiyatlara asla ek yapmıyoruz. Otelinizi seçin, tüm dökümü görün ve daha uçak bileti almadan toplamınızı bilin.",
      "stories.lede": "İlk MedMatch hasta hikayelerimiz şu anda çekiliyor — gerçek hastalar, gerçek sonuçlar. Bu arada WhatsApp'tan yazın; ortak kliniklerimizden gerçek öncesi-sonrası vakaları sizinle özel olarak paylaşalım.",
      "faq.lede": "Rahatsız edici olanlar dahil. Sorunuz burada yoksa bize yazın — bir satışçı değil, bir bakım koordinatörü bir gün içinde yanıtlar.",
      "inv.lede": "Neyi düşündüğünüzü bize anlatın. 48 saat içinde özel bir değerlendirme ve sabit, her şey dahil bir teklif alırsınız — ücretsiz, yükümlülük yok ve bilgileriniz asla satılmaz.",
      "ps1h": "Danışma", "ps1b": "Evden özel bir görüntülü görüşme. Herhangi bir öneri yapılmadan önce kayıtlarınız en az üç cerrah tarafından incelenir.",
      "ps2h": "Sabit Teklif", "ps2b": "Her şey dahil tek sabit teklif alırsınız — ameliyat, hastane, suit, transferler, ev sahibi. Kabul ettiğiniz fiyat ödediğiniz fiyattır. İmzalıdır ve nihaidir.",
      "ps3h": "Varış", "ps3b": "İstanbul'da uçağın kapısında karşılanırsınız. Boğaz'da beş yıldızlı bir otele özel transfer. Ev sahibiniz — akıcı, ölçülü, ulaşılabilir — bu andan itibaren yanınızdadır.",
      "ps4h": "İşlem", "ps4b": "İngilizce konuşan klinik ekibiyle JCI akreditasyonlu bir hastanede tedavi. Ev sahibiniz hastanede kalır; aileniz her aşamada bilgilendirilir.",
      "ps5h": "Dönüş", "ps5b": "Ayrılıştan önce uçuşa uygunluk kontrolleri, ardından cerrahınızla planlı görüntülü kontroller ve ABD veya Kanada'daki doktorlarınızla koordinasyon — bize ihtiyacınız olduğu sürece.",
      "v1q": "Manhattan'da kaplamalar için bana 31.000 dolar teklif edilmişti. MedMatch aynı işi — açıkçası daha iyisini — bunun beşte birine, Boğaz'da bir haftayla ayarladı. Ülkemdeki diş hekimim nerede yaptırdığımı sordu.", "v1cap": "New York — Diş Estetiği",
      "v2q": "Kimsenin söylemediği şey, yabancı bir hastanede yalnız olma korkusudur. Asla yalnız olmadım. Ayşe her sabah kapımın önündeydi. Dizim mükemmel; bakım evdekinden daha iyiydi.", "v2cap": "Dallas — Total Diz Protezi",
      "v3q": "Saç ekimimden iki yıl sonra cerrah hâlâ mesajlarımı bizzat yanıtlıyor. Bunu Vancouver'da — hangi fiyata olursa olsun — bulmayı deneyin. Bunu yapmanın tek yolu bu.", "v3cap": "Vancouver — Safir FUE"
    },
    de: {
      "treat.lede": "Die vier Eingriffe, bei denen Türkiyes Spezialisten wirklich weltweit führend sind. Über unsere Krankenhausgruppe in Istanbul organisieren wir außerdem plastische Chirurgie, Augenchirurgie, Gewichtsabnahme und Check-ups zu offiziellen Klinikpreisen.",
      "partners.lede": "Drei Partner, alle persönlich besucht und geprüft. Sie erhalten jeden namentlich — Qualifikationen, Adresse, Fallergebnisse — in Ihrem Behandlungsplan, und Sie lernen Ihren Arzt per Video kennen, bevor Sie zahlen.",
      "pricing.lede": "Erstellen Sie Ihre Schätzung, ehrlich verglichen mit Selbstzahlerpreisen zu Hause. Zahn und Knie enthalten Hotel, Transfers und Ihren Koordinator; Klinikbehandlungen zeigen den offiziellen Festpreis.",
      "packages.lede": "Sie zahlen die Behandlung direkt an die Klinik – wir schlagen niemals etwas auf medizinische Preise auf. Wählen Sie Ihr Hotel, sehen Sie die vollständige Aufschlüsselung und kennen Sie Ihre Gesamtsumme, bevor Sie einen Flug buchen.",
      "stories.lede": "Unsere ersten MedMatch-Patientengeschichten werden gerade gefilmt – echte Patienten, echte Ergebnisse. Schreiben Sie uns in der Zwischenzeit auf WhatsApp; wir teilen private Vorher-Nachher-Fälle unserer Partnerkliniken.",
      "faq.lede": "Auch die unangenehmen. Fehlt Ihre Frage, schreiben Sie uns — ein Betreuungskoordinator, kein Verkäufer, antwortet innerhalb eines Tages.",
      "inv.lede": "Sagen Sie uns, was Sie in Betracht ziehen. Innerhalb von 48 Stunden erhalten Sie eine private Einschätzung und ein festes All-inclusive-Angebot – kostenlos, unverbindlich, und Ihre Daten werden niemals verkauft.",
      "ps1h": "Die Beratung", "ps1b": "Eine private Videosprechstunde von zu Hause. Ihre Unterlagen werden von mindestens drei Chirurgen geprüft, bevor eine Empfehlung ausgesprochen wird.",
      "ps2h": "Das Festangebot", "ps2b": "Sie erhalten ein festes All-inclusive-Angebot – Operation, Klinik, Suite, Transfers, Betreuer. Der Preis, den Sie annehmen, ist der Preis, den Sie zahlen. Er ist unterzeichnet und endgültig.",
      "ps3h": "Die Ankunft", "ps3b": "Empfang an der Flugzeugtür in Istanbul. Privater Transfer zu einem Fünf-Sterne-Hotel am Bosporus. Ihr Betreuer – gewandt, diskret, erreichbar – ist ab diesem Moment bei Ihnen.",
      "ps4h": "Der Eingriff", "ps4b": "Behandlung in einer JCI-akkreditierten Klinik mit einem englischsprachigen Team. Ihr Betreuer bleibt in der Klinik; Ihre Familie wird in jeder Phase informiert.",
      "ps5h": "Die Rückkehr", "ps5b": "Flugtauglichkeitsprüfung vor der Abreise, dann geplante Video-Nachsorge mit Ihrem Chirurgen und Abstimmung mit Ihren Ärzten in den USA oder Kanada – so lange Sie uns brauchen.",
      "v1q": "In Manhattan wurden mir 31.000 $ für Veneers genannt. MedMatch organisierte dieselbe Arbeit – ehrlich gesagt, feinere Arbeit – für ein Fünftel davon, mit einer Woche am Bosporus. Mein Zahnarzt zu Hause fragte, wo ich es hatte machen lassen.", "v1cap": "New York — Dentale Ästhetik",
      "v2q": "Worüber niemand spricht, ist die Angst, allein in einem fremden Krankenhaus zu sein. Ich war es nie. Ayşe stand jeden Morgen vor meiner Tür. Mein Knie ist perfekt; die Betreuung war besser als zu Hause.", "v2cap": "Dallas — Totale Knieprothese",
      "v3q": "Zwei Jahre nach meiner Haartransplantation beantwortet der Chirurg meine Nachrichten noch immer selbst. Versuchen Sie das mal in Vancouver – zu welchem Preis auch immer. Nur so würde ich es je tun.", "v3cap": "Vancouver — Saphir-FUE"
    },
    fr: {
      "treat.lede": "Les quatre interventions où les spécialistes turcs sont véritablement les meilleurs au monde. Via notre groupe hospitalier d'Istanbul, nous organisons aussi chirurgie plastique, chirurgie oculaire, perte de poids et bilans de santé aux tarifs officiels de l'hôpital.",
      "partners.lede": "Trois partenaires, tous visités et vérifiés en personne. Vous recevez chacun d'eux nommément — diplômes, adresse, résultats de cas — dans votre plan de traitement, et vous rencontrez votre médecin en vidéo avant de payer.",
      "pricing.lede": "Établissez votre estimation, comparée honnêtement aux tarifs privés de votre pays. Dentaire et genou incluent hôtel, transferts et votre coordinateur ; les traitements hospitaliers affichent le prix fixe officiel.",
      "packages.lede": "Vous payez la clinique directement pour votre traitement — nous ne majorons jamais les prix médicaux. Choisissez votre hôtel, consultez le détail complet et connaissez votre total avant même de réserver un vol.",
      "stories.lede": "Nos premières histoires de patients MedMatch sont en cours de tournage — de vrais patients, de vrais résultats. En attendant, écrivez-nous sur WhatsApp : nous partagerons en privé de vrais cas avant-après de nos cliniques partenaires.",
      "faq.lede": "Y compris les questions gênantes. Si la vôtre n'y figure pas, écrivez-nous — un coordinateur de soins, pas un commercial, répond sous un jour.",
      "inv.lede": "Dites-nous ce que vous envisagez. Sous 48 heures, vous recevrez une évaluation privée et un devis fixe tout compris — gratuit, sans engagement, et vos données ne sont jamais vendues.",
      "ps1h": "La consultation", "ps1b": "Une consultation vidéo privée depuis chez vous. Votre dossier est examiné par au moins trois chirurgiens avant toute recommandation.",
      "ps2h": "Le devis fixe", "ps2b": "Vous recevez un devis fixe tout compris — chirurgie, hôpital, suite, transferts, hôte. Le prix que vous acceptez est celui que vous payez. Il est signé, et il est définitif.",
      "ps3h": "L'arrivée", "ps3b": "Accueil à la porte de l'avion à Istanbul. Transfert privé vers un hôtel cinq étoiles sur le Bosphore. Votre hôte — à l'aise, discret, disponible — est à vos côtés dès cet instant.",
      "ps4h": "L'intervention", "ps4b": "Traitement dans un hôpital accrédité JCI avec une équipe anglophone. Votre hôte reste à l'hôpital ; votre famille reçoit des nouvelles à chaque étape.",
      "ps5h": "Le retour", "ps5b": "Contrôles d'aptitude au vol avant le départ, puis suivis vidéo programmés avec votre chirurgien et coordination avec vos médecins aux États-Unis ou au Canada — aussi longtemps que vous avez besoin de nous.",
      "v1q": "On m'a annoncé 31 000 $ pour des facettes à Manhattan. MedMatch a organisé le même travail — franchement, un travail plus fin — pour un cinquième de ce prix, avec une semaine sur le Bosphore. Mon dentiste chez moi m'a demandé où je l'avais fait faire.", "v1cap": "New York — Esthétique dentaire",
      "v2q": "Ce dont personne ne parle, c'est la peur d'être seul dans un hôpital étranger. Je ne l'ai jamais été. Ayşe était devant ma porte chaque matin. Mon genou est parfait ; les soins étaient meilleurs qu'à la maison.", "v2cap": "Dallas — Prothèse totale du genou",
      "v3q": "Deux ans après ma greffe de cheveux, le chirurgien répond encore lui-même à mes messages. Essayez d'obtenir cela à Vancouver — à n'importe quel prix. C'est la seule façon dont je le referais.", "v3cap": "Vancouver — FUE Saphir"
    },
    ru: {
      "treat.lede": "Четыре процедуры, в которых специалисты Турции действительно лидируют в мире. Через нашу больничную группу в Стамбуле мы также организуем пластическую хирургию, офтальмологию, снижение веса и чек-апы по официальным больничным ценам.",
      "partners.lede": "Три партнёра, каждый лично посещён и проверен. Вы получаете каждого поимённо — дипломы, адрес, результаты случаев — в вашем плане лечения, и знакомитесь с врачом по видео до оплаты.",
      "pricing.lede": "Составьте оценку — честно сравненную с ценами платной медицины у вас дома. Стоматология и колено включают отель, трансферы и координатора; больничные процедуры показывают официальную фиксированную цену.",
      "packages.lede": "Вы платите за лечение напрямую клинике — мы никогда не наценяем медицинские цены. Выберите отель, посмотрите полную разбивку и узнайте итог ещё до того, как купите билет.",
      "stories.lede": "Наши первые истории пациентов MedMatch снимаются прямо сейчас — реальные пациенты, реальные результаты. А пока напишите нам в WhatsApp — мы приватно поделимся реальными случаями «до и после» из наших партнёрских клиник.",
      "faq.lede": "В том числе неудобные. Если вашего вопроса здесь нет — напишите нам: ответит координатор по уходу, а не продавец, в течение дня.",
      "inv.lede": "Расскажите, что вы рассматриваете. В течение 48 часов вы получите частную оценку и фиксированное предложение «всё включено» — бесплатно, без обязательств, и ваши данные никогда не продаются.",
      "ps1h": "Консультация", "ps1b": "Частная видеоконсультация из дома. Ваши документы изучают не менее трёх хирургов, прежде чем будет дана какая-либо рекомендация.",
      "ps2h": "Фиксированное предложение", "ps2b": "Вы получаете одно фиксированное предложение «всё включено» — операция, больница, люкс, трансферы, сопровождающий. Цена, которую вы принимаете, — это цена, которую вы платите. Оно подписано и окончательно.",
      "ps3h": "Прибытие", "ps3b": "Встреча у двери самолёта в Стамбуле. Частный трансфер в пятизвёздочный отель на Босфоре. Ваш сопровождающий — свободно говорящий, деликатный, на связи — рядом с вами с этого момента.",
      "ps4h": "Процедура", "ps4b": "Лечение в аккредитованной JCI больнице с англоговорящей клинической командой. Ваш сопровождающий остаётся в больнице; ваша семья получает обновления на каждом этапе.",
      "ps5h": "Возвращение", "ps5b": "Проверка готовности к полёту перед вылетом, затем плановые видеонаблюдения с вашим хирургом и координация с вашими врачами в США или Канаде — столько, сколько мы вам нужны.",
      "v1q": "В Манхэттене мне назвали 31 000 $ за виниры. MedMatch организовал ту же работу — честно, более тонкую — за пятую часть этой суммы, с неделей на Босфоре. Мой стоматолог дома спросил, где я это сделала.", "v1cap": "Нью-Йорк — Эстетическая стоматология",
      "v2q": "О чём никто не говорит — это страх остаться одному в чужой больнице. Я никогда не был один. Айше была у моей двери каждое утро. Моё колено идеально; уход был лучше, чем дома.", "v2cap": "Даллас — Тотальное протезирование колена",
      "v3q": "Через два года после пересадки волос хирург всё ещё сам отвечает на мои сообщения. Попробуйте получить такое в Ванкувере — за любые деньги. Только так я бы это и сделал.", "v3cap": "Ванкувер — Сапфировая FUE"
    },
    zh: {
      "treat.lede": "土耳其专家真正领先世界的四项手术。通过我们在伊斯坦布尔的医院集团，我们还可按医院官方价格安排整形外科、眼科手术、减重和健康体检。",
      "partners.lede": "三家合作伙伴，全部由我们亲自走访与审核。您会在治疗方案中收到每一家的具体名称——资质、地址、案例结果——并在付款前通过视频与您的医生见面。",
      "pricing.lede": "建立您的估价，与您本国的自费价格诚实对比。牙科与膝关节含酒店、接送和您的专属协调员；医院治疗显示官方固定价格。",
      "packages.lede": "您直接向诊所支付治疗费用——我们绝不在医疗价格上加价。选择您的酒店，查看完整明细，在预订机票之前就知道您的总额。",
      "stories.lede": "首批 MedMatch 患者故事正在拍摄中——真实患者，真实效果。在此期间，欢迎通过 WhatsApp 联系我们，我们将私下分享合作诊所的真实前后对比案例。",
      "faq.lede": "包括那些不好开口的问题。如果这里没有您的疑问，请给我们留言——回复您的是护理协调员，不是销售，一天之内答复。",
      "inv.lede": "告诉我们您正在考虑什么。48 小时内，您将收到一份私人评估和一份固定的全包报价——免费、无义务，且您的信息绝不出售。",
      "ps1h": "咨询", "ps1b": "在家进行的一对一视频咨询。在提出任何建议之前，您的病历将由至少三位外科医生审阅。",
      "ps2h": "固定报价", "ps2b": "您将收到一份固定的全包报价——手术、医院、套房、接送、专属陪同。您接受的价格就是您支付的价格。它已签署，且为最终版本。",
      "ps3h": "抵达", "ps3b": "在伊斯坦布尔于舱门迎接。专车接送至博斯普鲁斯海峡畔的五星级酒店。您的陪同——语言流利、谨慎、随时待命——从这一刻起与您同行。",
      "ps4h": "手术", "ps4b": "在通过 JCI 认证的医院、由讲英语的临床团队进行治疗。您的陪同留在医院；您的家人在每个阶段都收到进展通报。",
      "ps5h": "归程", "ps5b": "离境前进行适飞检查，随后与您的医生进行预约视频随访，并与您在美国或加拿大的医生协调——只要您需要我们。",
      "v1q": "在曼哈顿，贴面报价 31,000 美元。MedMatch 安排了同样的——老实说，更精细的——工作，价格只有五分之一，还在博斯普鲁斯海峡度过一周。我家乡的牙医问我是在哪里做的。", "v1cap": "纽约 — 牙齿美学",
      "v2q": "没有人告诉你的，是独自身处异国医院的恐惧。我从未孤单。Ayşe 每天早晨都在我门外。我的膝盖很完美；护理比在家还好。", "v2cap": "达拉斯 — 全膝关节置换",
      "v3q": "植发两年后，医生仍亲自回复我的消息。在温哥华试试看——无论出多少钱。这是我唯一愿意选择的方式。", "v3cap": "温哥华 — 蓝宝石 FUE"
    },
    fa: {
      "treat.lede": "چهار روشی که متخصصان ترکیه واقعاً در آن پیشروی جهان هستند. از طریق گروه بیمارستانی ما در استانبول، جراحی زیبایی، جراحی چشم، کاهش وزن و چکاپ را نیز با قیمت رسمی بیمارستان ترتیب می‌دهیم.",
      "partners.lede": "سه شریک، همگی حضوری بازدید و ارزیابی شده‌اند. هر کدام را با نام دریافت می‌کنید — مدارک، نشانی، نتایج پرونده‌ها — درون برنامه درمانی‌تان، و پیش از پرداخت، پزشک خود را در ویدیو می‌بینید.",
      "pricing.lede": "برآورد خود را بسازید؛ صادقانه با قیمت‌های پرداخت خصوصی در کشورتان مقایسه می‌شود. دندان و زانو شامل هتل، ترانسفر و هماهنگ‌کننده شماست؛ درمان‌های بیمارستانی قیمت ثابت رسمی را نشان می‌دهند.",
      "packages.lede": "هزینه درمان را مستقیماً به کلینیک می‌پردازید — ما هرگز روی قیمت‌های پزشکی سود نمی‌گذاریم. هتل خود را انتخاب کنید، جزئیات کامل را ببینید و پیش از رزرو پرواز، مجموع هزینه را بدانید.",
      "stories.lede": "نخستین داستان‌های بیماران مدمچ در حال فیلم‌برداری است — بیماران واقعی، نتایج واقعی. در این میان در واتساپ برای ما بنویسید تا نمونه‌های واقعی قبل و بعد از کلینیک‌های همکارمان را به‌صورت خصوصی با شما به اشتراک بگذاریم.",
      "faq.lede": "از جمله پرسش‌های ناخوشایند. اگر پرسش شما اینجا نیست، برای ما بنویسید — یک هماهنگ‌کننده مراقبت، نه یک فروشنده، ظرف یک روز پاسخ می‌دهد.",
      "inv.lede": "به ما بگویید چه چیزی را در نظر دارید. ظرف ۴۸ ساعت یک ارزیابی خصوصی و یک پیشنهاد ثابت همه‌شمول دریافت می‌کنید — رایگان، بدون تعهد، و اطلاعات شما هرگز فروخته نمی‌شود.",
      "ps1h": "مشاوره", "ps1b": "یک مشاوره ویدیویی خصوصی از خانه. پیش از هر توصیه‌ای، پرونده شما دست‌کم توسط سه جراح بررسی می‌شود.",
      "ps2h": "پیشنهاد ثابت", "ps2b": "یک پیشنهاد ثابت همه‌شمول دریافت می‌کنید — عمل، بیمارستان، سوئیت، ترانسفر، میزبان. قیمتی که می‌پذیرید همان است که می‌پردازید. امضا شده و نهایی است.",
      "ps3h": "ورود", "ps3b": "در استانبول کنار درِ هواپیما استقبال می‌شوید. ترانسفر خصوصی به هتلی پنج‌ستاره در کنار بسفر. میزبان شما — مسلط، مبادی آداب، در دسترس — از این لحظه در کنار شماست.",
      "ps4h": "عمل", "ps4b": "درمان در بیمارستانی دارای اعتبار JCI با تیم بالینی انگلیسی‌زبان. میزبان شما در بیمارستان می‌ماند؛ خانواده‌تان در هر مرحله به‌روز می‌شود.",
      "ps5h": "بازگشت", "ps5b": "بررسی آمادگی پرواز پیش از حرکت، سپس پیگیری‌های ویدیویی برنامه‌ریزی‌شده با جراح‌تان و هماهنگی با پزشکان شما در آمریکا یا کانادا — تا هر زمان که به ما نیاز دارید.",
      "v1q": "در منهتن برای لمینت به من ۳۱٬۰۰۰ دلار پیشنهاد شد. مدمچ همان کار را — راستش، ظریف‌تر — با یک‌پنجم آن مبلغ و یک هفته کنار بسفر ترتیب داد. دندان‌پزشکم در وطنم پرسید کجا انجامش داده‌ام.", "v1cap": "نیویورک — زیبایی دندان",
      "v2q": "چیزی که هیچ‌کس به شما نمی‌گوید، ترس از تنها بودن در بیمارستانی بیگانه است. من هرگز تنها نبودم. آیشه هر روز صبح پشت درِ من بود. زانویم عالی است؛ مراقبت از خانه بهتر بود.", "v2cap": "دالاس — تعویض کامل زانو",
      "v3q": "دو سال پس از کاشت مویم، جراح هنوز خودش به پیام‌هایم پاسخ می‌دهد. این را در ونکوور — به هر قیمتی — پیدا کنید. تنها راهی که حاضرم انجامش دهم همین است.", "v3cap": "ونکوور — FUE یاقوتی"
    },
    hi: {
      "treat.lede": "वे चार प्रक्रियाएँ जिनमें तुर्की के विशेषज्ञ वास्तव में दुनिया में सबसे आगे हैं। इस्तांबुल स्थित हमारे अस्पताल समूह के ज़रिए हम प्लास्टिक सर्जरी, नेत्र शल्य, वज़न घटाना और चेक-अप भी अस्पताल की आधिकारिक कीमतों पर कराते हैं।",
      "partners.lede": "तीन साझेदार, सभी व्यक्तिगत रूप से देखे और परखे गए। हर एक आपको नाम सहित मिलता है — योग्यताएँ, पता, केस परिणाम — आपकी उपचार योजना में, और भुगतान से पहले आप अपने डॉक्टर से वीडियो पर मिलते हैं।",
      "pricing.lede": "अपना अनुमान बनाएं, जो आपके देश की निजी-भुगतान कीमतों से ईमानदारी से तुलना करता है। दाँत और घुटने में होटल, ट्रांसफर और आपका कोऑर्डिनेटर शामिल है; अस्पताल उपचार आधिकारिक निश्चित कीमत दिखाते हैं।",
      "packages.lede": "आप अपने उपचार के लिए सीधे क्लिनिक को भुगतान करते हैं — हम चिकित्सा कीमतों पर कभी मार्कअप नहीं करते। अपना होटल चुनें, पूरा विवरण देखें, और उड़ान बुक करने से पहले ही अपना कुल जान लें।",
      "stories.lede": "हमारी पहली MedMatch मरीज़ कहानियाँ अभी फ़िल्माई जा रही हैं — असली मरीज़, असली परिणाम। तब तक हमें WhatsApp पर संदेश करें — हम अपने साझेदार क्लीनिकों के असली पहले-बाद के केस निजी रूप से साझा करेंगे।",
      "faq.lede": "असहज सवाल भी शामिल। अगर आपका सवाल यहाँ नहीं है, हमें लिखें — एक केयर कोऑर्डिनेटर, कोई सेल्समैन नहीं, एक दिन में जवाब देता है।",
      "inv.lede": "हमें बताएं कि आप क्या विचार कर रहे हैं। 48 घंटों के भीतर आपको एक निजी मूल्यांकन और एक निश्चित, सर्व-समावेशी कोटेशन मिलेगा — मुफ़्त, बिना बाध्यता, और आपकी जानकारी कभी बेची नहीं जाती।",
      "ps1h": "परामर्श", "ps1b": "घर से एक निजी वीडियो परामर्श। कोई भी सिफ़ारिश देने से पहले आपके रिकॉर्ड कम से कम तीन सर्जन देखते हैं।",
      "ps2h": "निश्चित कोटेशन", "ps2b": "आपको एक निश्चित, सर्व-समावेशी कोटेशन मिलता है — सर्जरी, अस्पताल, सुइट, ट्रांसफर, मेज़बान। जो मूल्य आप स्वीकार करते हैं, वही आप चुकाते हैं। यह हस्ताक्षरित है, और अंतिम है।",
      "ps3h": "आगमन", "ps3b": "इस्तांबुल में विमान के द्वार पर स्वागत। बॉस्फोरस पर एक पाँच-सितारा होटल तक निजी ट्रांसफर। आपका मेज़बान — कुशल, विवेकी, सदा उपलब्ध — इसी क्षण से आपके साथ है।",
      "ps4h": "प्रक्रिया", "ps4b": "अंग्रेज़ी बोलने वाली क्लिनिकल टीम के साथ JCI-मान्यता प्राप्त अस्पताल में उपचार। आपका मेज़बान अस्पताल में रहता है; आपके परिवार को हर चरण पर जानकारी मिलती है।",
      "ps5h": "वापसी", "ps5b": "प्रस्थान से पहले उड़ान-योग्यता जाँच, फिर आपके सर्जन के साथ निर्धारित वीडियो फ़ॉलो-अप और अमेरिका या कनाडा में आपके चिकित्सकों के साथ समन्वय — जब तक आपको हमारी ज़रूरत हो।",
      "v1q": "मैनहट्टन में विनियर के लिए मुझे 31,000 डॉलर बताए गए। MedMatch ने वही काम — सच कहूँ तो, बेहतर काम — उसके पाँचवें हिस्से में करवाया, बॉस्फोरस पर एक सप्ताह के साथ। मेरे घर के डेंटिस्ट ने पूछा कि मैंने यह कहाँ करवाया।", "v1cap": "न्यूयॉर्क — डेंटल सौंदर्य",
      "v2q": "जिस बात के बारे में कोई नहीं बताता, वह है किसी विदेशी अस्पताल में अकेले होने का डर। मैं कभी अकेला नहीं था। Ayşe हर सुबह मेरे दरवाज़े पर होती थीं। मेरा घुटना बिल्कुल ठीक है; देखभाल घर से बेहतर थी।", "v2cap": "डलास — संपूर्ण घुटना प्रत्यारोपण",
      "v3q": "मेरे हेयर ट्रांसप्लांट के दो साल बाद भी सर्जन स्वयं मेरे संदेशों का उत्तर देते हैं। वैंकूवर में यह पाकर दिखाइए — किसी भी कीमत पर। बस इसी तरह मैं इसे कभी करवाऊँगा।", "v3cap": "वैंकूवर — सैफ़ायर FUE"
    }
  };
  Object.keys(T2).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T2[l]).forEach(function (k) { T[l][k] = T2[l][k]; });
  });

  /* ── Stage 3: the five treatment panels ── */
  var T3 = {
    tr: {
      "t.from": "başlangıç", "t.calc": "Fiyatımı Hesapla", "t.allinc": "her şey dahil",
      "t.includes": "Sabit fiyata ameliyat, hastane, otel, transferler ve bakım dahildir.",
      "t1.title": "Burun Estetiği (Rinoplasti)", "t1.desc": "Türkiye'nin burun cerrahları dünyanın en deneyimlileri arasındadır — çoğu, tipik bir ABD'li cerrahın on yılda yaptığından daha fazla rinoplastiyi bir yılda gerçekleştirir. Ultrasonik ve koruyucu teknikler standarttır.", "t1.save": "ABD'DE $8,000–$15,000",
      "t2.title": "Tam Çene İmplant ve Kaplama", "t2.desc": "Dört veya altı implant üzerine sabit bir tam çene, tek seferde. Uçak bileti tek diş de yaptırsanız tüm çene de aynı tutar — bu yüzden tam çene vakalarını alıyor, tek çürük dişi olanlara işi kendi ülkesinde yaptırmasını söylüyoruz.", "t2.unit": "tam çene, çene başına", "t2.save": "ABD'DE $24,000–$30,000",
      "t3.title": "Diz Cerrahisi ve Protezi", "t3.desc": "Aynı ABD üretimi implantlar — Zimmer Biomet, Smith+Nephew — yüksek hacimli ortopedi ekiplerince yerleştirilir; eve dönmeden önce iyileşme otelinizde günlük fizyoterapi ile.", "t3.save": "ABD'DE $30,000–$50,000",
      "t4.title": "Saç Ekimi", "t4.desc": "İstanbul dünyanın saç ekimi başkentidir. İşleminiz bir teknisyen değil, cerrah tarafından yapılır — doğal saç çizgisi tasarımı ve yazılı büyüme garantisiyle.", "t4.unit": "her şey dahil paket", "t4.save": "ABD'DE $12,000–$20,000",
      "t5.title": "Dördün Ötesinde — tam donanımlı hastane", "t5.desc": "Estetik cerrahi, iLASIK ve SMILE göz cerrahisi, mide balonu ve tüpü, üst düzey check-up'lar ve ileri görüntüleme — Türkiye'nin en büyük hastane gruplarından biri olan ortak hastane grubumuzda, doğrudan hastaneye ödenen resmi fiyatlarla.", "t5.unit": "hastane fiyat listesi", "t5.save": "60+ İŞLEM, YAZILI FİYATLI", "t5.includes": "Otel yalnızca belirtildiğinde dahildir — bakım ve koordinasyonunuz sabit 300 $'dır.", "t5.cta": "Tüm Fiyat Listesini Gör"
    },
    de: {
      "t.from": "ab", "t.calc": "Meinen Preis berechnen", "t.allinc": "All-inclusive",
      "t.includes": "Festpreis inklusive Operation, Klinik, Hotel, Transfers und Nachsorge.",
      "t1.title": "Nasenkorrektur (Rhinoplastik)", "t1.desc": "Die Nasenchirurgen der Türkei zählen zu den erfahrensten überhaupt – viele führen in einem Jahr mehr Rhinoplastiken durch als ein typischer US-Chirurg in einem Jahrzehnt. Ultraschall- und Erhaltungstechniken sind Standard.", "t1.save": "IN DEN USA $8,000–$15,000",
      "t2.title": "Kompletter Kiefer & Veneers", "t2.desc": "Ein kompletter Kiefer fester Zähne auf vier oder sechs Implantaten, in einer einzigen Reise. Der Flug kostet gleich viel, ob Sie einen Zahn oder einen ganzen Kiefer versorgen lassen — deshalb übernehmen wir Komplettversorgungen und raten bei einem einzelnen Zahn zur Behandlung zu Hause.", "t2.unit": "pro Kiefer, komplett", "t2.save": "IN DEN USA $24,000–$30,000",
      "t3.title": "Kniechirurgie & Prothese", "t3.desc": "Dieselben in den USA gefertigten Implantate – Zimmer Biomet, Smith+Nephew – eingesetzt von erfahrenen Orthopädie-Teams, mit täglicher Physiotherapie in Ihrem Genesungshotel, bevor Sie heimfliegen.", "t3.save": "IN DEN USA $30,000–$50,000",
      "t4.title": "Haartransplantation", "t4.desc": "Istanbul ist die Welthauptstadt der Haartransplantation. Ihr Eingriff wird vom Chirurgen durchgeführt – nicht von einem Techniker – mit natürlichem Haaransatz-Design und schriftlicher Wachstumsgarantie.", "t4.unit": "All-inclusive-Paket", "t4.save": "IN DEN USA $12,000–$20,000",
      "t5.title": "Über die vier hinaus – volle Klinikversorgung", "t5.desc": "Plastische Chirurgie, iLASIK- & SMILE-Augenchirurgie, Magenballon und -schlauch, Vorsorge-Check-ups und moderne Bildgebung – bei unserer Partnerklinikgruppe, einer der größten der Türkei, zu offiziellen, direkt an die Klinik gezahlten Preisen.", "t5.unit": "Klinik-Preisliste", "t5.save": "60+ EINGRIFFE, SCHRIFTLICH BEPREIST", "t5.includes": "Hotel nur wo angegeben inklusive – Ihre Betreuung und Koordination kostet pauschal 300 $.", "t5.cta": "Vollständige Preisliste ansehen"
    },
    fr: {
      "t.from": "à partir de", "t.calc": "Calculer mon prix", "t.allinc": "tout compris",
      "t.includes": "Prix fixe incluant chirurgie, hôpital, hôtel, transferts et suivi.",
      "t1.title": "Rhinoplastie", "t1.desc": "Les chirurgiens du nez de Turquie comptent parmi les plus expérimentés au monde — beaucoup réalisent plus de rhinoplasties en un an qu'un chirurgien américain typique en une décennie. Les techniques ultrasoniques et de préservation sont la norme.", "t1.save": "AUX É.-U. $8,000–$15,000",
      "t2.title": "Arcade complète & facettes", "t2.desc": "Une arcade complète de dents fixes sur quatre ou six implants, en un seul voyage. Le vol coûte le même prix que vous fassiez soigner une dent ou toute une mâchoire — c'est pourquoi nous prenons les cas complets et conseillons de faire soigner une dent isolée près de chez soi.", "t2.unit": "arcade complète, par mâchoire", "t2.save": "AUX É.-U. $24,000–$30,000",
      "t3.title": "Chirurgie & prothèse du genou", "t3.desc": "Les mêmes implants fabriqués aux États-Unis — Zimmer Biomet, Smith+Nephew — posés par des équipes orthopédiques à fort volume, avec kinésithérapie quotidienne à votre hôtel de convalescence avant votre retour.", "t3.save": "AUX É.-U. $30,000–$50,000",
      "t4.title": "Greffe de cheveux", "t4.desc": "Istanbul est la capitale mondiale de la restauration capillaire. Votre intervention est réalisée par le chirurgien — pas un technicien — avec un dessin naturel de la ligne frontale et une garantie de repousse écrite.", "t4.unit": "forfait tout compris", "t4.save": "AUX É.-U. $12,000–$20,000",
      "t5.title": "Au-delà des quatre — un hôpital complet", "t5.desc": "Chirurgie esthétique, chirurgie oculaire iLASIK & SMILE, ballon et sleeve gastriques, bilans de santé et imagerie avancée — réalisés chez notre groupe hospitalier partenaire, l'un des plus grands de Turquie, aux tarifs officiels payés directement à l'hôpital.", "t5.unit": "grille tarifaire de l'hôpital", "t5.save": "60+ INTERVENTIONS, TARIFS ÉCRITS", "t5.includes": "Hôtel inclus uniquement lorsque indiqué — vos soins et votre coordination sont à 300 $ forfaitaires.", "t5.cta": "Voir toute la grille tarifaire"
    },
    ru: {
      "t.from": "от", "t.calc": "Рассчитать мою цену", "t.allinc": "всё включено",
      "t.includes": "Фиксированная цена включает операцию, больницу, отель, трансферы и уход.",
      "t1.title": "Ринопластика", "t1.desc": "Ринохирурги Турции — одни из самых опытных в мире: многие делают больше ринопластик за год, чем типичный американский хирург за десятилетие. Ультразвуковые и сберегающие техники — стандарт.", "t1.save": "В США $8,000–$15,000",
      "t2.title": "Полная челюсть и виниры", "t2.desc": "Полная челюсть несъёмных зубов на четырёх или шести имплантах за одну поездку. Перелёт стоит одинаково, лечите вы один зуб или всю челюсть, — поэтому мы берём полные случаи, а при одном больном зубе советуем лечиться дома.", "t2.unit": "полная челюсть", "t2.save": "В США $24,000–$30,000",
      "t3.title": "Хирургия и протезирование колена", "t3.desc": "Те же импланты производства США — Zimmer Biomet, Smith+Nephew — устанавливают опытные ортопедические команды, с ежедневной физиотерапией в вашем отеле восстановления перед вылетом домой.", "t3.save": "В США $30,000–$50,000",
      "t4.title": "Пересадка волос", "t4.desc": "Стамбул — мировая столица восстановления волос. Вашу процедуру выполняет хирург, а не техник — с естественным дизайном линии роста и письменной гарантией роста.", "t4.unit": "пакет «всё включено»", "t4.save": "В США $12,000–$20,000",
      "t5.title": "За пределами четырёх — полноценная больница", "t5.desc": "Пластическая хирургия, лазерная коррекция iLASIK и SMILE, желудочный баллон и рукавная резекция, чек-апы и современная диагностика — в нашей партнёрской больничной группе, одной из крупнейших в Турции, по официальным ценам, оплачиваемым напрямую больнице.", "t5.unit": "прайс-лист больницы", "t5.save": "60+ ПРОЦЕДУР, ЦЕНЫ ПИСЬМЕННО", "t5.includes": "Отель включён только там, где указано — уход и координация стоят фиксированные $300.", "t5.cta": "Смотреть полный прайс-лист"
    },
    zh: {
      "t.from": "低至", "t.calc": "计算我的价格", "t.allinc": "全包",
      "t.includes": "固定价格包含手术、医院、酒店、接送和术后护理。",
      "t1.title": "鼻整形", "t1.desc": "土耳其的鼻整形医生是全球最有经验的之一——许多人一年完成的鼻整形手术，比美国普通医生十年还多。超声骨刀与保留式技术为标准配置。", "t1.save": "美国 $8,000–$15,000",
      "t2.title": "全口修复与贴面", "t2.desc": "四颗或六颗种植体支撑的半口固定牙，一次行程完成。无论修复一颗牙还是半口，机票钱都一样——所以我们只接半口、全口病例，单颗坏牙我们会建议您在本地处理。", "t2.unit": "半口（单侧）", "t2.save": "美国 $24,000–$30,000",
      "t3.title": "膝关节手术与置换", "t3.desc": "同样的美国制造植入物——Zimmer Biomet、Smith+Nephew——由高手术量的骨科团队植入，回国前在您的康复酒店每日理疗。", "t3.save": "美国 $30,000–$50,000",
      "t4.title": "植发", "t4.desc": "伊斯坦布尔是世界植发之都。您的手术由医生亲自完成——而非技师——采用自然发际线设计并附书面生长保证。", "t4.unit": "全包套餐", "t4.save": "美国 $12,000–$20,000",
      "t5.title": "四项之外 — 综合医院保障", "t5.desc": "整形外科、iLASIK 与 SMILE 眼科手术、胃球囊与胃缩小、高端体检与先进影像——在我们的合作医院集团（土耳其最大之一）完成，以直接支付给医院的官方价格。", "t5.unit": "医院价目表", "t5.save": "60+ 项目，明码标价", "t5.includes": "仅在注明处含酒店——您的关怀与协调服务为固定 300 美元。", "t5.cta": "查看完整价目表"
    },
    fa: {
      "t.from": "از", "t.calc": "محاسبه قیمت من", "t.allinc": "همه‌شمول",
      "t.includes": "قیمت ثابت شامل عمل، بیمارستان، هتل، ترانسفر و مراقبت است.",
      "t1.title": "جراحی بینی (رینوپلاستی)", "t1.desc": "جراحان بینی ترکیه از باتجربه‌ترین‌های جهان‌اند — بسیاری در یک سال بیش از یک جراح معمولی آمریکایی در یک دهه، رینوپلاستی انجام می‌دهند. تکنیک‌های اولتراسونیک و حفظ‌کننده استاندارد هستند.", "t1.save": "در آمریکا $8,000–$15,000",
      "t2.title": "فک کامل و لمینت", "t2.desc": "یک فک کامل دندان ثابت روی چهار یا شش ایمپلنت، در یک سفر. هزینه پرواز چه یک دندان درست کنید چه یک فک کامل یکسان است — به همین دلیل کارهای فک کامل را می‌پذیریم و به کسی که تنها یک دندان خراب دارد می‌گوییم در کشور خودش درمان کند.", "t2.unit": "یک فک کامل", "t2.save": "در آمریکا $24,000–$30,000",
      "t3.title": "جراحی و تعویض زانو", "t3.desc": "همان ایمپلنت‌های ساخت آمریکا — Zimmer Biomet، Smith+Nephew — توسط تیم‌های پرحجم ارتوپدی کار گذاشته می‌شوند، با فیزیوتراپی روزانه در هتل نقاهت شما پیش از بازگشت به خانه.", "t3.save": "در آمریکا $30,000–$50,000",
      "t4.title": "کاشت مو", "t4.desc": "استانبول پایتخت کاشت موی جهان است. عمل شما توسط جراح انجام می‌شود — نه یک تکنسین — با طراحی طبیعی خط مو و ضمانت کتبی رشد.", "t4.unit": "بسته همه‌شمول", "t4.save": "در آمریکا $12,000–$20,000",
      "t5.title": "فراتر از چهار — بیمارستان کامل", "t5.desc": "جراحی زیبایی، جراحی چشم iLASIK و SMILE، بالون و اسلیو معده، چکاپ‌های تخصصی و تصویربرداری پیشرفته — در گروه بیمارستانی همکار ما، یکی از بزرگ‌ترین‌های ترکیه، با قیمت‌های رسمی که مستقیماً به بیمارستان پرداخت می‌شود.", "t5.unit": "فهرست قیمت بیمارستان", "t5.save": "بیش از ۶۰ روش، با قیمت مکتوب", "t5.includes": "هتل تنها در جایی که ذکر شده شامل است — مراقبت و هماهنگی شما هزینه ثابت ۳۰۰ دلاری دارد.", "t5.cta": "مشاهده فهرست کامل قیمت"
    },
    hi: {
      "t.from": "से", "t.calc": "मेरी कीमत जानें", "t.allinc": "सर्व-समावेशी",
      "t.includes": "निश्चित मूल्य में सर्जरी, अस्पताल, होटल, ट्रांसफर और देखभाल शामिल।",
      "t1.title": "राइनोप्लास्टी (नाक की सर्जरी)", "t1.desc": "तुर्की के नाक सर्जन दुनिया के सबसे अनुभवी सर्जनों में से हैं — कई एक वर्ष में उतनी राइनोप्लास्टी करते हैं जितनी एक सामान्य अमेरिकी सर्जन एक दशक में। अल्ट्रासोनिक और संरक्षण तकनीकें मानक हैं।", "t1.save": "अमेरिका में $8,000–$15,000",
      "t2.title": "पूर्ण जबड़ा और विनियर", "t2.desc": "चार या छह इम्प्लांट पर स्थिर दांतों का पूरा जबड़ा, एक ही यात्रा में। उड़ान का खर्च वही रहता है, चाहे आप एक दांत ठीक कराएं या पूरा जबड़ा — इसीलिए हम पूरे जबड़े के केस लेते हैं, और एक खराब दांत वालों को घर पर ही इलाज कराने को कहते हैं।", "t2.unit": "प्रति जबड़ा, पूरा", "t2.save": "अमेरिका में $24,000–$30,000",
      "t3.title": "घुटने की सर्जरी और प्रत्यारोपण", "t3.desc": "वही अमेरिका-निर्मित इम्प्लांट — Zimmer Biomet, Smith+Nephew — उच्च-मात्रा वाली ऑर्थोपेडिक टीमों द्वारा लगाए जाते हैं, घर लौटने से पहले आपके रिकवरी होटल में दैनिक फिज़ियोथेरेपी के साथ।", "t3.save": "अमेरिका में $30,000–$50,000",
      "t4.title": "हेयर ट्रांसप्लांट", "t4.desc": "इस्तांबुल दुनिया की हेयर-रेस्टोरेशन राजधानी है। आपकी प्रक्रिया किसी तकनीशियन द्वारा नहीं, बल्कि सर्जन द्वारा की जाती है — प्राकृतिक हेयरलाइन डिज़ाइन और लिखित ग्रोथ गारंटी के साथ।", "t4.unit": "सर्व-समावेशी पैकेज", "t4.save": "अमेरिका में $12,000–$20,000",
      "t5.title": "इन चार से आगे — पूर्ण अस्पताल देखभाल", "t5.desc": "प्लास्टिक सर्जरी, iLASIK और SMILE नेत्र सर्जरी, गैस्ट्रिक स्लीव और बैलून, एग्ज़ीक्यूटिव चेक-अप और उन्नत इमेजिंग — हमारे साझेदार अस्पताल समूह में, जो तुर्की के सबसे बड़े समूहों में से एक है, सीधे अस्पताल को भुगतान की जाने वाली आधिकारिक कीमतों पर।", "t5.unit": "अस्पताल मूल्य सूची", "t5.save": "60+ प्रक्रियाएँ, लिखित मूल्य", "t5.includes": "होटल केवल वहीं शामिल जहाँ बताया गया है — आपकी देखभाल एवं समन्वय का निश्चित शुल्क $300 है।", "t5.cta": "पूरी मूल्य सूची देखें"
    }
  };
  Object.keys(T3).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T3[l]).forEach(function (k) { T[l][k] = T3[l][k]; });
  });

  /* ── Stage 4: partner-clinic dental faculty — fields, titles, bios ── */
  var T4 = {
    tr: {
      "fld.oral": "AĞIZ CERRAHİSİ", "fld.aesth": "ESTETİK DİŞ HEKİMLİĞİ", "fld.general": "GENEL DİŞ HEKİMLİĞİ", "fld.ortho": "ORTODONTİ",
      "ti.oral": "Çene ve Ağız Cerrahı — İstanbul", "ti.aesth": "Estetik Diş Hekimi — İstanbul", "ti.general": "Genel Diş Hekimi — İstanbul", "ti.ortho": "Ortodontist — Antalya",
      "d1.bio": "Tam ark restorasyonlarından ileri çene cerrahisine kadar Çevre içindeki karmaşık cerrahi ve implant vakalarına öncülük eder.",
      "d2.bio": "Gülüş tasarımı ve porselen sanatı — doğal bir Kuzey Amerika gülüşü için elle renk uyumu yapılan kaplama ve kronlar.",
      "d3.bio": "Beş ila yedi günde tamamlanan tam gülüş tasarımları; dijital planlamayı titiz klinik işçilikle birleştirir.",
      "d4.bio": "Minimal invaziv estetik diş hekimliği — altındaki gülüşü dönüştürürken sağlıklı mineyi korur.",
      "d5.bio": "İlk klinik değerlendirmeniz ve süregelen bakımınız — her tedavi planının sağlıklı temellerden başlamasını sağlar.",
      "d6.bio": "25 yılı aşkın gülüş hizalama deneyimi — şeffaf plaklardan karmaşık kapanış düzeltmelerine, yetişkin ve çocuklar için kişiye özel ortodonti planları."
    },
    de: {
      "fld.oral": "MUNDCHIRURGIE", "fld.aesth": "ÄSTHETISCHE ZAHNMEDIZIN", "fld.general": "ALLGEMEINE ZAHNMEDIZIN", "fld.ortho": "KIEFERORTHOPÄDIE",
      "ti.oral": "Kiefer- & Mundchirurg — Istanbul", "ti.aesth": "Ästhetische Zahnärztin — Istanbul", "ti.general": "Allgemeinzahnärztin — Istanbul", "ti.ortho": "Kieferorthopäde — Antalya",
      "d1.bio": "Leitet komplexe chirurgische und Implantatfälle im Kreis, von Full-Arch-Restaurationen bis zur anspruchsvollen Kieferchirurgie.",
      "d2.bio": "Smile-Design und Porzellankunst — Veneers und Kronen von Hand farblich abgestimmt für ein natürliches nordamerikanisches Lächeln.",
      "d3.bio": "Komplette Smile-Makeovers in fünf bis sieben Tagen, digitale Planung kombiniert mit sorgfältiger Feinarbeit am Stuhl.",
      "d4.bio": "Minimalinvasive ästhetische Zahnmedizin — bewahrt gesunden Schmelz und verwandelt zugleich das Lächeln darunter.",
      "d5.bio": "Ihre erste klinische Untersuchung und fortlaufende Betreuung — damit jeder Behandlungsplan auf gesunder Grundlage beginnt.",
      "d6.bio": "Über 25 Jahre Erfahrung im Ausrichten von Lächeln — individuelle kieferorthopädische Pläne für Erwachsene und Kinder, von Alignern bis zur komplexen Bisskorrektur."
    },
    fr: {
      "fld.oral": "CHIRURGIE ORALE", "fld.aesth": "DENTISTERIE ESTHÉTIQUE", "fld.general": "DENTISTERIE GÉNÉRALE", "fld.ortho": "ORTHODONTIE",
      "ti.oral": "Chirurgien maxillo-facial & oral — Istanbul", "ti.aesth": "Dentiste esthétique — Istanbul", "ti.general": "Dentiste généraliste — Istanbul", "ti.ortho": "Orthodontiste — Antalya",
      "d1.bio": "Dirige les cas chirurgicaux et implantaires complexes au sein du Cercle, des restaurations d'arcade complète à la chirurgie maxillaire avancée.",
      "d2.bio": "Conception du sourire et art de la porcelaine — facettes et couronnes assorties à la main pour un sourire nord-américain naturel.",
      "d3.bio": "Transformations complètes du sourire en cinq à sept jours, alliant planification numérique et finition minutieuse au fauteuil.",
      "d4.bio": "Dentisterie esthétique peu invasive — préservant l'émail sain tout en transformant le sourire en dessous.",
      "d5.bio": "Votre premier bilan clinique et le suivi continu — pour que chaque plan de traitement parte de bases saines.",
      "d6.bio": "Plus de 25 ans à aligner les sourires — plans orthodontiques personnalisés pour adultes et enfants, des gouttières transparentes aux corrections d'occlusion complexes."
    },
    ru: {
      "fld.oral": "ОРАЛЬНАЯ ХИРУРГИЯ", "fld.aesth": "ЭСТЕТИЧЕСКАЯ СТОМАТОЛОГИЯ", "fld.general": "ОБЩАЯ СТОМАТОЛОГИЯ", "fld.ortho": "ОРТОДОНТИЯ",
      "ti.oral": "Челюстно-лицевой и оральный хирург — Стамбул", "ti.aesth": "Эстетический стоматолог — Стамбул", "ti.general": "Стоматолог общей практики — Стамбул", "ti.ortho": "Ортодонт — Анталья",
      "d1.bio": "Ведёт сложные хирургические и имплантологические случаи в Круге — от полной реставрации зубного ряда до сложной челюстной хирургии.",
      "d2.bio": "Дизайн улыбки и искусство фарфора — виниры и коронки, подобранные по цвету вручную для естественной североамериканской улыбки.",
      "d3.bio": "Полное преображение улыбки за пять–семь дней: цифровое планирование в сочетании с тщательной ручной отделкой.",
      "d4.bio": "Малоинвазивная эстетическая стоматология — сохраняет здоровую эмаль, преображая улыбку под ней.",
      "d5.bio": "Ваш первый клинический осмотр и последующий уход — каждый план лечения начинается со здоровой основы.",
      "d6.bio": "Более 25 лет выравнивания улыбок — индивидуальные ортодонтические планы для взрослых и детей, от прозрачных элайнеров до сложной коррекции прикуса."
    },
    zh: {
      "fld.oral": "口腔外科", "fld.aesth": "美学牙科", "fld.general": "全科牙科", "fld.ortho": "口腔正畸",
      "ti.oral": "颌面与口腔外科医生 — 伊斯坦布尔", "ti.aesth": "美学牙医 — 伊斯坦布尔", "ti.general": "全科牙医 — 伊斯坦布尔", "ti.ortho": "正畸医生 — 安塔利亚",
      "d1.bio": "在圈内主理复杂的外科与种植病例，从全牙弓修复到高难度颌骨手术。",
      "d2.bio": "微笑设计与瓷艺——手工比色的贴面与牙冠，成就自然的北美式笑容。",
      "d3.bio": "五到七天完成完整的微笑改造，将数字化规划与精细的椅旁修整相结合。",
      "d4.bio": "微创美容牙科——在改变笑容的同时保留健康的牙釉质。",
      "d5.bio": "您的首次临床评估与持续护理——确保每一份治疗方案都从健康的基础开始。",
      "d6.bio": "逾 25 年矫正笑容经验——为成人与儿童量身定制的正畸方案，从隐形矫治到复杂咬合矫正。"
    },
    fa: {
      "fld.oral": "جراحی دهان", "fld.aesth": "دندان‌پزشکی زیبایی", "fld.general": "دندان‌پزشکی عمومی", "fld.ortho": "ارتودنسی",
      "ti.oral": "جراح فک و دهان — استانبول", "ti.aesth": "دندان‌پزشک زیبایی — استانبول", "ti.general": "دندان‌پزشک عمومی — استانبول", "ti.ortho": "ارتودنتیست — آنتالیا",
      "d1.bio": "هدایت پرونده‌های پیچیده جراحی و ایمپلنت در حلقه، از بازسازی کامل قوس دندانی تا جراحی پیشرفته فک.",
      "d2.bio": "طراحی لبخند و هنر پرسلن — لمینت و روکش‌هایی که برای لبخندی طبیعی و آمریکایی، دستی هم‌رنگ می‌شوند.",
      "d3.bio": "طراحی کامل لبخند در پنج تا هفت روز، با ترکیب برنامه‌ریزی دیجیتال و پرداخت دقیق کنار صندلی.",
      "d4.bio": "دندان‌پزشکی زیبایی کم‌تهاجمی — حفظ مینای سالم در حین دگرگون‌سازی لبخند زیر آن.",
      "d5.bio": "نخستین ارزیابی بالینی و مراقبت مستمر شما — تضمین می‌کند هر طرح درمان از پایه‌ای سالم آغاز شود.",
      "d6.bio": "بیش از ۲۵ سال هم‌تراز کردن لبخندها — طرح‌های ارتودنسی شخصی برای بزرگسالان و کودکان، از الاینرهای شفاف تا اصلاح پیچیده انسداد."
    },
    hi: {
      "fld.oral": "ओरल सर्जरी", "fld.aesth": "एस्थेटिक डेंटिस्ट्री", "fld.general": "सामान्य डेंटिस्ट्री", "fld.ortho": "ऑर्थोडॉन्टिक्स",
      "ti.oral": "मैक्सिलोफेशियल और ओरल सर्जन — इस्तांबुल", "ti.aesth": "एस्थेटिक डेंटिस्ट — इस्तांबुल", "ti.general": "सामान्य डेंटिस्ट — इस्तांबुल", "ti.ortho": "ऑर्थोडॉन्टिस्ट — अंताल्या",
      "d1.bio": "सर्कल के भीतर जटिल शल्य और इम्प्लांट मामलों का नेतृत्व — फुल-आर्च रेस्टोरेशन से लेकर उन्नत जबड़े की सर्जरी तक।",
      "d2.bio": "स्माइल डिज़ाइन और पोर्सिलेन कला — एक स्वाभाविक उत्तर-अमेरिकी मुस्कान के लिए हाथ से शेड-मैच किए विनियर और क्राउन।",
      "d3.bio": "पाँच से सात दिनों में पूर्ण स्माइल मेकओवर, डिजिटल योजना को सूक्ष्म चेयरसाइड फिनिशिंग के साथ जोड़ते हुए।",
      "d4.bio": "न्यूनतम-आक्रामक कॉस्मेटिक डेंटिस्ट्री — नीचे की मुस्कान बदलते हुए स्वस्थ इनेमल को सुरक्षित रखना।",
      "d5.bio": "आपका पहला क्लिनिकल मूल्यांकन और निरंतर देखभाल — यह सुनिश्चित करते हुए कि हर उपचार योजना स्वस्थ नींव से शुरू हो।",
      "d6.bio": "25 वर्षों से अधिक मुस्कान संरेखण — वयस्कों और बच्चों के लिए वैयक्तिक ऑर्थोडॉन्टिक योजनाएँ, क्लियर अलाइनर से लेकर जटिल बाइट सुधार तक।"
    }
  };
  Object.keys(T4).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T4[l]).forEach(function (k) { T[l][k] = T4[l][k]; });
  });

  /* ── Stage 5: FAQ questions, invitation form, footer links ── */
  var T5 = {
    tr: {
      "q1": "Türkiye'de ameliyat olmak gerçekten güvenli mi?", "q2": "Cerrahım kim olacak — ve ödeme yapmadan önce onunla konuşabilir miyim?", "q3": "Sabit fiyata tam olarak neler dahil?", "q4": "Eve döndükten sonra bir komplikasyon olursa ne olur?", "q5": "Türkiye'de ne kadar kalmam gerekiyor?", "q6": "Vizeye ihtiyacım var mı?", "q7": "Eşimi veya bir arkadaşımı getirebilir miyim?", "q8": "Nasıl ve ne zaman ödeme yaparım?", "q9": "Neden 300 $'lık bir koordinasyon ücreti var?",
      "inv.p1": "48 saat içinde yanıt", "inv.p2": "Uzman cerrahlarca incelenir", "inv.p3": "Sabit teklif — sürpriz yok",
      "f.name": "Ad Soyad", "f.email": "E-posta", "f.phone": "Telefon / WhatsApp", "f.treatment": "İlgilendiğiniz tedavi", "f.msg": "Bilmemiz gereken bir şey var mı?", "f.submit": "Ücretsiz Teklifimi Al — Yükümlülük Yok", "f.micro": "Ücretsiz · 48 saat içinde yanıt · Asla satılmaz — yalnızca seçtiğiniz hastaneyle paylaşılır", "f.success": "Teşekkürler. Talebiniz alındı —<br>48 saat içinde yanıtımızı bekleyin. <em>— MedMatch Global</em>",
      "ft.acb": "Ortak Hastane — Fiyat Listesi", "ft.mp": "İkinci Hastane Grubu — Yakında", "ft.advisor": "Danışman Merkezi — Katılın", "ft.rights": "© 2026 MedMatch Global. Tüm hakları saklıdır.", "ft.disc": "Tahminler bilgilendirme amaçlıdır ve tıbbi tavsiye niteliği taşımaz.", "ft.sub": "MEDİKAL SEYAHAT AKADEMİSİ", "ft.wa": "WhatsApp'tan yazın"
    },
    de: {
      "q1": "Ist eine Operation in der Türkei wirklich sicher?", "q2": "Wer wird mein Chirurg sein – und kann ich vor der Zahlung mit ihm sprechen?", "q3": "Was genau ist im Festpreis enthalten?", "q4": "Was passiert bei einer Komplikation nach meinem Heimflug?", "q5": "Wie lange muss ich in der Türkei bleiben?", "q6": "Brauche ich ein Visum?", "q7": "Darf ich meinen Partner oder eine Freundin mitbringen?", "q8": "Wie und wann zahle ich?", "q9": "Warum gibt es eine Koordinationsgebühr von 300 $?",
      "inv.p1": "Antwort binnen 48 Stunden", "inv.p2": "Von Fachchirurgen geprüft", "inv.p3": "Festpreis – keine Überraschungen",
      "f.name": "Vollständiger Name", "f.email": "E-Mail", "f.phone": "Telefon / WhatsApp", "f.treatment": "Gewünschte Behandlung", "f.msg": "Sollten wir etwas wissen?", "f.submit": "Kostenloses Angebot anfordern – unverbindlich", "f.micro": "Kostenlos · Antwort binnen 48 Stunden · Nie verkauft — nur an das von Ihnen gewählte Krankenhaus weitergegeben", "f.success": "Danke. Ihre Anfrage ist eingegangen –<br>Sie erhalten unsere Antwort binnen 48 Stunden. <em>— MedMatch Global</em>",
      "ft.acb": "Partnerklinik — Preisliste", "ft.mp": "Zweite Klinikgruppe — Demnächst", "ft.advisor": "Berater-Hub — Mitmachen", "ft.rights": "© 2026 MedMatch Global. Alle Rechte vorbehalten.", "ft.disc": "Schätzungen dienen der Information und stellen keine medizinische Beratung dar.", "ft.sub": "DIE AKADEMIE FÜR MEDIZINREISEN", "ft.wa": "Schreiben Sie uns auf WhatsApp"
    },
    fr: {
      "q1": "Est-il vraiment sûr de se faire opérer en Turquie ?", "q2": "Qui sera mon chirurgien — et puis-je lui parler avant de payer ?", "q3": "Qu'inclut exactement le prix fixe ?", "q4": "Que se passe-t-il en cas de complication après mon retour ?", "q5": "Combien de temps dois-je rester en Turquie ?", "q6": "Ai-je besoin d'un visa ?", "q7": "Puis-je venir avec mon partenaire ou un ami ?", "q8": "Comment et quand dois-je payer ?", "q9": "Pourquoi des frais de coordination de 300 $ ?",
      "inv.p1": "Réponse sous 48 heures", "inv.p2": "Examiné par des chirurgiens spécialistes", "inv.p3": "Devis fixe — sans surprise",
      "f.name": "Nom complet", "f.email": "E-mail", "f.phone": "Téléphone / WhatsApp", "f.treatment": "Traitement souhaité", "f.msg": "Quelque chose à nous signaler ?", "f.submit": "Obtenir mon devis gratuit — sans engagement", "f.micro": "Gratuit · Réponse sous 48 heures · Jamais vendues — transmises uniquement à l'hôpital que vous choisissez", "f.success": "Merci. Votre demande a bien été reçue —<br>attendez notre réponse sous 48 heures. <em>— MedMatch Global</em>",
      "ft.acb": "Hôpital partenaire — Tarifs", "ft.mp": "Deuxième groupe hospitalier — Bientôt", "ft.advisor": "Espace Conseiller — Rejoignez-nous", "ft.rights": "© 2026 MedMatch Global. Tous droits réservés.", "ft.disc": "Les estimations sont indicatives et ne constituent pas un avis médical.", "ft.sub": "L'ACADÉMIE DU TOURISME MÉDICAL", "ft.wa": "Écrivez-nous sur WhatsApp"
    },
    ru: {
      "q1": "Действительно ли безопасно оперироваться в Турции?", "q2": "Кто будет моим хирургом — и могу ли я поговорить с ним до оплаты?", "q3": "Что именно входит в фиксированную цену?", "q4": "Что если возникнет осложнение после возвращения домой?", "q5": "Как долго мне нужно оставаться в Турции?", "q6": "Нужна ли мне виза?", "q7": "Могу ли я приехать с партнёром или другом?", "q8": "Как и когда я плачу?", "q9": "Почему есть сбор за координацию $300?",
      "inv.p1": "Ответ в течение 48 часов", "inv.p2": "Проверено хирургами-специалистами", "inv.p3": "Фиксированное предложение — без сюрпризов",
      "f.name": "Полное имя", "f.email": "Эл. почта", "f.phone": "Телефон / WhatsApp", "f.treatment": "Интересующее лечение", "f.msg": "Что нам следует знать?", "f.submit": "Получить бесплатную оценку — без обязательств", "f.micro": "Бесплатно · Ответ в течение 48 часов · Никогда не продаются — передаются только выбранной вами больнице", "f.success": "Спасибо. Ваш запрос получен —<br>ожидайте наш ответ в течение 48 часов. <em>— MedMatch Global</em>",
      "ft.acb": "Партнёрская больница — прайс", "ft.mp": "Вторая больничная группа — скоро", "ft.advisor": "Кабинет консультанта — Присоединяйтесь", "ft.rights": "© 2026 MedMatch Global. Все права защищены.", "ft.disc": "Оценки носят информационный характер и не являются медицинской консультацией.", "ft.sub": "АКАДЕМИЯ МЕДИЦИНСКОГО ТУРИЗМА", "ft.wa": "Напишите нам в WhatsApp"
    },
    zh: {
      "q1": "在土耳其做手术真的安全吗？", "q2": "我的主刀医生是谁——付款前我能与他沟通吗？", "q3": "固定价格究竟包含什么？", "q4": "如果回国后出现并发症怎么办？", "q5": "我需要在土耳其停留多久？", "q6": "我需要签证吗？", "q7": "我可以带伴侣或朋友吗？", "q8": "我如何以及何时付款？", "q9": "为什么有 300 美元的协调费？",
      "inv.p1": "48 小时内回复", "inv.p2": "由专科外科医生审核", "inv.p3": "固定报价——绝无意外",
      "f.name": "全名", "f.email": "电子邮箱", "f.phone": "电话 / WhatsApp", "f.treatment": "感兴趣的诊疗", "f.msg": "还有什么需要我们了解的吗？", "f.submit": "获取免费报价 — 无义务", "f.micro": "免费 · 48 小时内回复 · 绝不出售 — 仅提供给您选择的医院", "f.success": "谢谢。我们已收到您的请求 —<br>请等待我们在 48 小时内回复。<em>— MedMatch Global</em>",
      "ft.acb": "合作医院价目表", "ft.mp": "第二家医院集团 — 即将上线", "ft.advisor": "顾问中心 — 加入我们", "ft.rights": "© 2026 MedMatch Global. 保留所有权利。", "ft.disc": "估价仅供参考，不构成医疗建议。", "ft.sub": "医疗旅行学院", "ft.wa": "通过 WhatsApp 联系我们"
    },
    fa: {
      "q1": "آیا جراحی در ترکیه واقعاً امن است؟", "q2": "جراح من چه کسی خواهد بود — و آیا پیش از پرداخت می‌توانم با او صحبت کنم؟", "q3": "قیمت ثابت دقیقاً شامل چه چیزهایی است؟", "q4": "اگر پس از بازگشت به خانه عارضه‌ای پیش بیاید چه می‌شود؟", "q5": "چه مدت باید در ترکیه بمانم؟", "q6": "آیا به ویزا نیاز دارم؟", "q7": "آیا می‌توانم همسر یا دوستم را همراه بیاورم؟", "q8": "چگونه و چه زمانی پرداخت می‌کنم؟", "q9": "چرا هزینه هماهنگی ۳۰۰ دلاری وجود دارد؟",
      "inv.p1": "پاسخ ظرف ۴۸ ساعت", "inv.p2": "بررسی‌شده توسط جراحان متخصص", "inv.p3": "پیشنهاد ثابت — بدون غافلگیری",
      "f.name": "نام کامل", "f.email": "ایمیل", "f.phone": "تلفن / واتساپ", "f.treatment": "درمان موردنظر", "f.msg": "چیزی هست که باید بدانیم؟", "f.submit": "دریافت پیشنهاد رایگان — بدون تعهد", "f.micro": "رایگان · پاسخ ظرف ۴۸ ساعت · هرگز فروخته نمی‌شود — تنها با بیمارستان منتخب شما در میان گذاشته می‌شود", "f.success": "سپاسگزاریم. درخواست شما دریافت شد —<br>ظرف ۴۸ ساعت منتظر پاسخ ما باشید. <em>— MedMatch Global</em>",
      "ft.acb": "فهرست قیمت بیمارستان همکار", "ft.mp": "گروه بیمارستانی دوم — به‌زودی", "ft.advisor": "مرکز مشاوران — بپیوندید", "ft.rights": "© ۲۰۲۶ MedMatch Global. همه حقوق محفوظ است.", "ft.disc": "برآوردها جنبه اطلاع‌رسانی دارند و توصیه پزشکی محسوب نمی‌شوند.", "ft.sub": "آکادمی گردشگری سلامت", "ft.wa": "در واتساپ برای ما بنویسید"
    },
    hi: {
      "q1": "क्या तुर्की में सर्जरी कराना वास्तव में सुरक्षित है?", "q2": "मेरा सर्जन कौन होगा — और क्या मैं भुगतान से पहले उससे बात कर सकता हूँ?", "q3": "निश्चित मूल्य में वास्तव में क्या शामिल है?", "q4": "घर लौटने के बाद कोई जटिलता हो तो क्या होगा?", "q5": "मुझे तुर्की में कितने दिन रुकना होगा?", "q6": "क्या मुझे वीज़ा चाहिए?", "q7": "क्या मैं अपने साथी या मित्र को ला सकता हूँ?", "q8": "मैं कैसे और कब भुगतान करूँ?", "q9": "$300 समन्वय शुल्क क्यों है?",
      "inv.p1": "48 घंटों में उत्तर", "inv.p2": "विशेषज्ञ सर्जनों द्वारा समीक्षित", "inv.p3": "निश्चित कोटेशन — कोई आश्चर्य नहीं",
      "f.name": "पूरा नाम", "f.email": "ईमेल", "f.phone": "फ़ोन / WhatsApp", "f.treatment": "रुचि का उपचार", "f.msg": "क्या हमें कुछ जानना चाहिए?", "f.submit": "मेरा मुफ़्त कोटेशन पाएं — बिना बाध्यता", "f.micro": "मुफ़्त · 48 घंटों में उत्तर · कभी बेची नहीं जाती — केवल आपके चुने अस्पताल के साथ साझा", "f.success": "धन्यवाद। आपका अनुरोध प्राप्त हुआ —<br>48 घंटों में हमारे उत्तर की प्रतीक्षा करें। <em>— MedMatch Global</em>",
      "ft.acb": "साझेदार अस्पताल — मूल्य सूची", "ft.mp": "दूसरा अस्पताल समूह — जल्द ही", "ft.advisor": "सलाहकार हब — हमसे जुड़ें", "ft.rights": "© 2026 MedMatch Global. सर्वाधिकार सुरक्षित।", "ft.disc": "अनुमान सूचनात्मक हैं और चिकित्सा सलाह नहीं हैं।", "ft.sub": "मेडिकल ट्रैवल अकादमी", "ft.wa": "WhatsApp पर हमें लिखें"
    }
  };
  Object.keys(T5).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T5[l]).forEach(function (k) { T[l][k] = T5[l][k]; });
  });

  /* ── Stage 6: the nine FAQ answers ── */
  var T6 = {
    tr: {
      "a1": "Türkiye, ABD dışındaki en büyük JCI akreditasyonlu hastane gruplarından birine sahip, dünyanın en köklü medikal seyahat destinasyonlarından biridir. Ancak güvenlik hiçbir zaman ülkeyle ilgili değildir — cerrah ve hastaneyle ilgilidir. Kontrol ettiğimiz kısım budur: yalnızca JCI akreditasyonlu hastanelerdeki board sertifikalı cerrahlarla çalışırız, ödeme yapmadan önce cerrahınızla görüntülü görüşürsünüz ve bir koordinatör her adımda yanınızda kalır.",
      "a2": "Evet, her zaman. Kayıtlarınızı inceledikten sonra cerrahınızı belirler; belgelerini, deneyimini ve vaka fotoğraflarını paylaşırız. Ardından onunla — bir satış temsilcisiyle değil — ücretsiz bir görüntülü görüşme yaparsınız. Tamamen rahat değilseniz devam etmezsiniz ve size hiçbir maliyeti olmaz.",
      "a3": "Yazılı teklifiniz her şeyi listeler: ameliyat ve cerrah ücreti, hastane ve anestezi, ameliyat öncesi testler, ilaçlar, oteliniz, tüm havaalanı ve klinik transferleri, kişisel bakım koordinatörünüz ve takip bakımı. Uçuşlar ayrı fiyatlandırılır; böylece puanlarınızı kullanabilir veya kendi fırsatınızı bulabilirsiniz — rezervasyonda memnuniyetle yardımcı oluruz.",
      "a4": "Türkiye'den ayrılmadan önce cerrahınız uçuşa uygun olduğunuzu onaylar. Eve döndükten sonra planlı görüntülü kontrolleriniz ve cerrahi ekibinize doğrudan bir hattınız olur. Yazılı bakım planınız, tıbben bir revizyon gerekirse tam olarak neyin kapsandığını belirtir — ve iyileşmeniz boyunca yerel doktorunuzla koordinasyon sağlarız.",
      "a5": "İşleme bağlıdır: saç ekimi genellikle 2–4 gün, diş tedavisi 5–7 gün, burun estetiği 7–8 gün ve diz cerrahisi fizyoterapi dahil 10–14 gün gerektirir. Kişisel planınız, herhangi bir rezervasyon yapmadan önce size kesin tarihleri verir.",
      "a6": "Çoğu ABD ve Kanada pasaportu sahibi şu anda kısa süreli konaklamalar için vizesiz Türkiye'ye girebilir. Pasaportunuz için güncel gereklilikleri teyit eder ve tüm evrak işlerini seyahat planınızın bir parçası olarak hallederiz — bu, yolculuğun en basit kısımlarından biridir.",
      "a7": "Lütfen getirin — hastalarımızın çoğu biriyle seyahat eder. Otel odanız iki kişiliktir ve refakatçi paketleri onların transfer ve konaklamasını kapsar. Birçok refakatçi, siz iyileşirken haftayı Turkuaz Kıyı'da bir tatil gibi geçirir.",
      "a8": "Asla her şeyi peşin değil. Cerrahınızla görüntülü görüşene ve yazılı sabit bir teklifi kabul edene kadar hiçbir şey ödemezsiniz. Bir rezervasyon ödemesi tarihlerinizi güvence altına alır ve bakiye klinikte — kart veya havale ile — ödenir. Tedaviden önce planınız değişirse rezervasyon ödemeniz yeni tarihlere aktarılabilir.",
      "a9": "Çünkü çoğu medikal seyahat ajansının \"paket fiyatlarına\" gizlediği kârların yerini alır. Tedaviniz için doğrudan kliniğe ödeme yaparsınız; tıbbi fiyatlara asla dokunmaz veya onları şişirmeyiz. Sabit Hasta Bakımı ve Koordinasyon Ücretiniz şunları kapsar:",
      "l1": "✦ Ücretsiz danışma ve kişiye özel tedavi planı", "l2": "✦ Vakanız için doğru doktorla eşleştirme", "l3": "✦ Tüm randevu planlaması, otel ve VIP transfer rezervasyonu", "l4": "✦ Seyahatiniz sırasında İngilizce konuşan kişisel host ve tercüman", "l5": "✦ 7/24 WhatsApp desteği ve eve döndükten sonra takip bakımı"
    },
    de: {
      "a1": "Die Türkei ist eines der etabliertesten Ziele für Medizinreisen weltweit, mit einer der größten Gruppen JCI-akkreditierter Kliniken außerhalb der USA. Doch Sicherheit hängt nie vom Land ab – sondern vom Chirurgen und von der Klinik. Genau das steuern wir: Wir arbeiten nur mit zertifizierten Chirurgen in JCI-akkreditierten Kliniken, Sie treffen Ihren Chirurgen per Video, bevor Sie etwas zahlen, und eine Koordinatorin begleitet Sie bei jedem Schritt.",
      "a2": "Ja, immer. Sobald wir Ihre Unterlagen geprüft haben, nennen wir Ihren Chirurgen und teilen seine Qualifikationen, Erfahrung und Fallfotos. Sie haben dann eine kostenlose Videosprechstunde mit ihm – nicht mit einem Verkäufer. Wenn Sie sich nicht völlig wohlfühlen, fahren Sie nicht fort, und es kostet Sie nichts.",
      "a3": "Ihr schriftliches Angebot listet alles auf: Operation und Chirurgenhonorar, Klinik und Narkose, Voruntersuchungen, Medikamente, Ihr Hotel, alle Flughafen- und Klinik-Transfers, Ihre persönliche Betreuungskoordinatorin und die Nachsorge. Flüge werden separat angeboten, damit Sie Punkte nutzen oder Ihr eigenes Angebot finden können – wir helfen Ihnen gern bei der Buchung.",
      "a4": "Bevor Sie die Türkei verlassen, bestätigt Ihr Chirurg Ihre Flugtauglichkeit. Zu Hause haben Sie geplante Video-Nachsorge und eine direkte Leitung zu Ihrem Chirurgenteam. Ihr schriftlicher Nachsorgeplan legt genau fest, was abgedeckt ist, falls je eine Korrektur medizinisch nötig wird – und wir stimmen uns während Ihrer Genesung mit Ihrem Arzt vor Ort ab.",
      "a5": "Es hängt vom Eingriff ab: Haartransplantationen brauchen meist 2–4 Tage, Zahnbehandlungen 5–7 Tage, Nasenkorrekturen 7–8 Tage und Kniechirurgie 10–14 Tage inklusive Physiotherapie. Ihr persönlicher Plan nennt Ihnen die genauen Termine, bevor Sie etwas buchen.",
      "a6": "Die meisten US- und kanadischen Passinhaber können derzeit für kurze Aufenthalte ohne Visum in die Türkei einreisen. Wir bestätigen die aktuellen Anforderungen für Ihren Pass und erledigen alle Formalitäten im Rahmen Ihres Reiseplans – das ist einer der einfachsten Teile der Reise.",
      "a7": "Sehr gern – die meisten unserer Patienten reisen zu zweit. Ihr Hotelzimmer ist für zwei Personen, und Begleitpakete decken deren Transfers und Aufenthalt ab. Viele Begleitpersonen verbringen die Woche als Urlaub an der Türkisküste, während Sie sich erholen.",
      "a8": "Niemals alles im Voraus. Sie zahlen nichts, bis Sie Ihren Chirurgen per Video getroffen und ein schriftliches Festangebot angenommen haben. Eine Buchungszahlung sichert Ihre Termine, der Restbetrag wird in der Klinik gezahlt – per Karte oder Überweisung. Ändert sich Ihr Plan vor der Behandlung, ist Ihre Buchungszahlung auf neue Termine übertragbar.",
      "a9": "Weil sie die versteckten Aufschläge ersetzt, die die meisten Medizinreise-Agenturen in \"Paketpreise\" einbauen. Sie zahlen die Behandlung direkt an die Klinik; wir berühren oder erhöhen medizinische Preise nie. Ihre feste Patientenbetreuungs- und Koordinationsgebühr umfasst:",
      "l1": "✦ Kostenlose Beratung und einen persönlichen Behandlungsplan", "l2": "✦ Die Vermittlung des richtigen Arztes für Ihren Fall", "l3": "✦ Alle Terminplanung, Hotel- und VIP-Transfer-Buchung", "l4": "✦ Einen persönlichen englischsprachigen Betreuer & Übersetzer während Ihrer Reise", "l5": "✦ 24/7-WhatsApp-Support und Nachsorge, sobald Sie zu Hause sind"
    },
    fr: {
      "a1": "La Turquie est l'une des destinations de tourisme médical les plus établies au monde, avec l'un des plus grands groupes d'hôpitaux accrédités JCI hors des États-Unis. Mais la sécurité ne dépend jamais d'un pays — elle dépend du chirurgien et de l'hôpital. C'est ce que nous maîtrisons : nous ne travaillons qu'avec des chirurgiens certifiés dans des hôpitaux accrédités JCI, vous rencontrez votre chirurgien en vidéo avant tout paiement, et une coordinatrice vous accompagne à chaque étape.",
      "a2": "Oui, toujours. Après examen de votre dossier, nous nommons votre chirurgien et partageons ses qualifications, son expérience et des photos de cas. Vous avez ensuite une consultation vidéo gratuite avec lui — pas avec un commercial. Si vous n'êtes pas parfaitement à l'aise, vous ne poursuivez pas, et cela ne vous coûte rien.",
      "a3": "Votre devis écrit détaille tout : la chirurgie et les honoraires du chirurgien, l'hôpital et l'anesthésie, les examens préopératoires, les médicaments, votre hôtel, tous les transferts aéroport et clinique, votre coordinatrice de soins et le suivi. Les vols sont chiffrés séparément afin d'utiliser vos points ou trouver votre propre offre — nous vous aidons volontiers à réserver.",
      "a4": "Avant de quitter la Turquie, votre chirurgien confirme votre aptitude à voler. De retour chez vous, vous bénéficiez de suivis vidéo programmés et d'une ligne directe avec votre équipe chirurgicale. Votre plan de suivi écrit précise exactement ce qui est couvert si une révision devient un jour médicalement nécessaire — et nous coordonnons avec votre médecin local tout au long de votre convalescence.",
      "a5": "Cela dépend de l'intervention : les greffes de cheveux nécessitent généralement 2 à 4 jours, les soins dentaires 5 à 7 jours, la rhinoplastie 7 à 8 jours, et la chirurgie du genou 10 à 14 jours avec kinésithérapie. Votre plan personnel vous donne les dates exactes avant toute réservation.",
      "a6": "La plupart des titulaires d'un passeport américain ou canadien peuvent actuellement entrer en Turquie sans visa pour de courts séjours. Nous confirmons les exigences en vigueur pour votre passeport et gérons toute la paperasse dans le cadre de votre plan de voyage — c'est l'une des parties les plus simples du parcours.",
      "a7": "Bien sûr — la plupart de nos patients voyagent accompagnés. Votre chambre d'hôtel accueille deux personnes, et les forfaits accompagnant couvrent leurs transferts et leur séjour. Beaucoup d'accompagnants vivent la semaine comme des vacances sur la Côte turquoise pendant votre convalescence.",
      "a8": "Jamais tout d'avance. Vous ne payez rien tant que vous n'avez pas rencontré votre chirurgien en vidéo et accepté un devis fixe écrit. Un acompte de réservation garantit vos dates, et le solde est réglé à la clinique — par carte ou virement. Si votre plan change avant le traitement, votre acompte est transférable à de nouvelles dates.",
      "a9": "Parce qu'ils remplacent les majorations cachées que la plupart des agences de tourisme médical intègrent dans leurs \"prix forfaitaires\". Vous payez la clinique directement ; nous ne touchons ni ne gonflons jamais les prix médicaux. Vos frais fixes de soins et de coordination couvrent :",
      "l1": "✦ Une consultation gratuite et un plan de traitement personnalisé", "l2": "✦ La mise en relation avec le bon médecin pour votre cas", "l3": "✦ Toute la planification des rendez-vous, l'hôtel et les transferts VIP", "l4": "✦ Un hôte et traducteur personnel anglophone pendant votre séjour", "l5": "✦ Un support WhatsApp 24/7 et un suivi une fois rentré chez vous"
    },
    ru: {
      "a1": "Турция — одно из самых зрелых направлений медицинского туризма в мире, с одной из крупнейших групп клиник с аккредитацией JCI за пределами США. Но безопасность никогда не зависит от страны — она зависит от хирурга и клиники. Именно это мы контролируем: мы работаем только с сертифицированными хирургами в клиниках с аккредитацией JCI, вы встречаетесь с хирургом по видео до оплаты, а координатор сопровождает вас на каждом шаге.",
      "a2": "Да, всегда. Изучив ваши записи, мы называем вашего хирурга и предоставляем его квалификацию, опыт и фото случаев. Затем у вас бесплатная видеоконсультация с ним — не с менеджером по продажам. Если вы не полностью уверены, вы не продолжаете, и это ничего вам не стоит.",
      "a3": "Ваше письменное предложение перечисляет всё: операцию и гонорар хирурга, больницу и анестезию, предоперационные анализы, лекарства, отель, все трансферы из аэропорта и клиники, вашего личного координатора и последующий уход. Перелёты рассчитываются отдельно, чтобы вы могли использовать мили или найти своё предложение — мы рады помочь с бронированием.",
      "a4": "Перед отъездом из Турции хирург подтверждает вашу готовность к полёту. Дома у вас плановые видеонаблюдения и прямая связь с хирургической командой. Ваш письменный план ухода точно определяет, что покрывается, если когда-либо потребуется медицинская коррекция — и мы координируем действия с вашим местным врачом на протяжении восстановления.",
      "a5": "Это зависит от процедуры: пересадка волос обычно требует 2–4 дня, стоматология 5–7 дней, ринопластика 7–8 дней, а операция на колене 10–14 дней с физиотерапией. Ваш личный план даёт точные даты до любого бронирования.",
      "a6": "Большинство владельцев паспортов США и Канады сейчас могут въезжать в Турцию без визы на короткий срок. Мы уточняем актуальные требования для вашего паспорта и берём на себя все документы в рамках вашего плана поездки — это одна из самых простых частей путешествия.",
      "a7": "Конечно — большинство наших пациентов путешествуют не одни. В вашем номере размещаются двое, а пакеты для сопровождающих покрывают их трансферы и проживание. Многие сопровождающие проводят неделю как отпуск на Бирюзовом побережье, пока вы восстанавливаетесь.",
      "a8": "Никогда не всё сразу. Вы ничего не платите, пока не встретитесь с хирургом по видео и не примете письменное фиксированное предложение. Бронирующий платёж закрепляет ваши даты, а остаток оплачивается в клинике — картой или переводом. Если ваш план изменится до лечения, бронирующий платёж переносится на новые даты.",
      "a9": "Потому что он заменяет скрытые наценки, которые большинство агентств медтуризма закладывают в «пакетные цены». Вы платите за лечение напрямую клинике; мы никогда не трогаем и не завышаем медицинские цены. Ваш фиксированный сбор за уход и координацию включает:",
      "l1": "✦ Бесплатную консультацию и персональный план лечения", "l2": "✦ Подбор правильного врача для вашего случая", "l3": "✦ Всё планирование приёмов, бронь отеля и VIP-трансферов", "l4": "✦ Личного англоговорящего сопровождающего и переводчика в поездке", "l5": "✦ Поддержку в WhatsApp 24/7 и последующий уход после возвращения домой"
    },
    zh: {
      "a1": "土耳其是全球最成熟的医疗旅行目的地之一，拥有美国以外最大的 JCI 认证医院群之一。但安全从来不取决于国家——而取决于医生和医院。这正是我们所把控的：我们只与 JCI 认证医院中具备资质的外科医生合作，您在付款前通过视频与主刀医生见面，协调员则在每一步陪伴您。",
      "a2": "是的，始终如此。审阅您的病历后，我们会告知您的主刀医生，并提供其资历、经验与病例照片。随后您可与他进行免费视频咨询——而非与销售人员。如果您并不完全放心，则无需继续，且分文不取。",
      "a3": "您的书面报价列明一切：手术与医生费用、医院与麻醉、术前检查、药物、酒店、所有机场与诊所接送、您的专属护理协调员以及术后随访。机票单独报价，以便您使用积分或自行寻找优惠——我们乐意协助您预订。",
      "a4": "在您离开土耳其之前，主刀医生会确认您适合飞行。回国后，您将获得预约视频随访以及与手术团队的直接联系。您的书面术后方案明确列出：若日后在医学上确有必要进行修整，涵盖哪些内容——并且在您整个康复期间，我们会与您的当地医生保持协调。",
      "a5": "视手术而定：植发通常需要 2–4 天，牙科 5–7 天，鼻整形 7–8 天，膝关节手术含理疗需 10–14 天。您的个人方案会在您预订任何行程之前给出确切日期。",
      "a6": "目前，大多数美国和加拿大护照持有者可免签短期入境土耳其。我们会确认适用于您护照的最新要求，并将所有文书作为您旅行方案的一部分办妥——这是整个旅程中最简单的环节之一。",
      "a7": "当然可以——我们大多数患者都有人陪同。您的酒店房间可入住两人，陪同套餐涵盖其接送与住宿。许多陪同者在您康复期间，把这一周当作绿松石海岸的假期。",
      "a8": "绝不会全额预付。在您通过视频见到主刀医生并接受书面固定报价之前，您无需支付任何费用。预订款用以锁定您的日期，余款在诊所支付——刷卡或转账均可。若治疗前您的计划有变，预订款可转至新的日期。",
      "a9": "因为它取代了大多数医疗旅行中介在\"套餐价\"中暗藏的加价。您直接向诊所支付治疗费用；我们绝不触碰或抬高医疗价格。您固定的患者关怀与协调费涵盖：",
      "l1": "✦ 免费咨询与个性化治疗方案", "l2": "✦ 为您的病例匹配合适的医生", "l3": "✦ 所有预约安排、酒店与 VIP 接送预订", "l4": "✦ 旅途中一位讲英语的专属陪同与翻译", "l5": "✦ 全天候 WhatsApp 支持与回国后的术后随访"
    },
    fa: {
      "a1": "ترکیه یکی از باسابقه‌ترین مقاصد گردشگری درمانی جهان است، با یکی از بزرگ‌ترین گروه‌های بیمارستانی دارای اعتبار JCI در خارج از آمریکا. اما امنیت هرگز به کشور بستگی ندارد — به جراح و بیمارستان بستگی دارد. این همان چیزی است که ما کنترل می‌کنیم: تنها با جراحان دارای بورد در بیمارستان‌های دارای اعتبار JCI کار می‌کنیم، پیش از هر پرداختی جراح‌تان را در ویدیو می‌بینید و یک هماهنگ‌کننده در هر گام کنار شماست.",
      "a2": "بله، همیشه. پس از بررسی پرونده‌تان، جراح شما را معرفی می‌کنیم و مدارک، تجربه و عکس‌های پرونده‌های او را در اختیارتان می‌گذاریم. سپس یک مشاوره ویدیویی رایگان با او دارید — نه با یک فروشنده. اگر کاملاً راحت نباشید، ادامه نمی‌دهید و هیچ هزینه‌ای برایتان ندارد.",
      "a3": "پیشنهاد کتبی شما همه چیز را فهرست می‌کند: عمل و حق‌الزحمه جراح، بیمارستان و بیهوشی، آزمایش‌های پیش از عمل، داروها، هتل شما، تمام ترانسفرهای فرودگاه و کلینیک، هماهنگ‌کننده شخصی شما و مراقبت پیگیرانه. پروازها جداگانه قیمت‌گذاری می‌شوند تا بتوانید از امتیازها استفاده کنید یا پیشنهاد خودتان را بیابید — با کمال میل در رزرو کمک‌تان می‌کنیم.",
      "a4": "پیش از ترک ترکیه، جراح‌تان آمادگی شما برای پرواز را تأیید می‌کند. پس از بازگشت به خانه، پیگیری‌های ویدیویی برنامه‌ریزی‌شده و خط ارتباط مستقیم با تیم جراحی خود دارید. برنامه مراقبت کتبی شما دقیقاً مشخص می‌کند در صورت نیاز پزشکی به اصلاح، چه چیزی پوشش داده می‌شود — و در سراسر دوران نقاهت با پزشک محلی شما هماهنگ می‌شویم.",
      "a5": "به نوع عمل بستگی دارد: کاشت مو معمولاً ۲ تا ۴ روز، درمان دندان ۵ تا ۷ روز، جراحی بینی ۷ تا ۸ روز و جراحی زانو با فیزیوتراپی ۱۰ تا ۱۴ روز نیاز دارد. برنامه شخصی شما پیش از هر رزروی تاریخ‌های دقیق را به شما می‌دهد.",
      "a6": "در حال حاضر بیشتر دارندگان گذرنامه آمریکا و کانادا می‌توانند برای اقامت کوتاه بدون ویزا وارد ترکیه شوند. الزامات جاری برای گذرنامه شما را تأیید می‌کنیم و همه کارهای اداری را به‌عنوان بخشی از برنامه سفرتان انجام می‌دهیم — این یکی از ساده‌ترین بخش‌های سفر است.",
      "a7": "حتماً بیاورید — بیشتر بیماران ما با کسی سفر می‌کنند. اتاق هتل شما دو نفره است و بسته‌های همراه، ترانسفر و اقامت آن‌ها را پوشش می‌دهد. بسیاری از همراهان در حالی که شما بهبود می‌یابید، آن هفته را مانند تعطیلاتی در ساحل فیروزه‌ای می‌گذرانند.",
      "a8": "هرگز همه‌چیز از پیش نیست. تا زمانی که جراح‌تان را در ویدیو ندیده و پیشنهاد ثابت کتبی را نپذیرفته‌اید، چیزی نمی‌پردازید. یک پرداخت رزرو تاریخ‌های شما را تضمین می‌کند و مابقی در کلینیک — با کارت یا حواله — پرداخت می‌شود. اگر پیش از درمان برنامه‌تان تغییر کند، پرداخت رزرو شما به تاریخ‌های جدید منتقل می‌شود.",
      "a9": "چون جای افزایش‌های پنهانی را می‌گیرد که بیشتر آژانس‌های گردشگری درمانی در \"قیمت‌های بسته‌ای\" می‌گنجانند. هزینه درمان را مستقیماً به کلینیک می‌پردازید؛ ما هرگز قیمت‌های پزشکی را دست‌کاری یا متورم نمی‌کنیم. هزینه ثابت مراقبت و هماهنگی بیمار شما شامل این موارد است:",
      "l1": "✦ مشاوره رایگان و یک طرح درمان شخصی", "l2": "✦ تطبیق شما با پزشک مناسب برای پرونده‌تان", "l3": "✦ تمام برنامه‌ریزی نوبت‌ها، رزرو هتل و ترانسفر ویژه", "l4": "✦ یک میزبان و مترجم شخصی انگلیسی‌زبان در طول سفر شما", "l5": "✦ پشتیبانی ۲۴/۷ واتساپ و پیگیری پس از بازگشت به خانه"
    },
    hi: {
      "a1": "तुर्की दुनिया के सबसे स्थापित मेडिकल-यात्रा गंतव्यों में से एक है, जहाँ अमेरिका के बाहर JCI-मान्यता प्राप्त अस्पतालों के सबसे बड़े समूहों में से एक है। लेकिन सुरक्षा कभी देश पर निर्भर नहीं करती — यह सर्जन और अस्पताल पर निर्भर करती है। यही वह भाग है जिसे हम नियंत्रित करते हैं: हम केवल JCI-मान्यता प्राप्त अस्पतालों के बोर्ड-प्रमाणित सर्जनों के साथ काम करते हैं, आप भुगतान से पहले अपने सर्जन से वीडियो पर मिलते हैं, और एक कोऑर्डिनेटर हर कदम पर आपके साथ रहता है।",
      "a2": "हाँ, हमेशा। आपके रिकॉर्ड की समीक्षा के बाद, हम आपके सर्जन का नाम बताते हैं और उनकी योग्यता, अनुभव व केस फ़ोटो साझा करते हैं। फिर आप उनके साथ — किसी सेल्समैन के साथ नहीं — एक मुफ़्त वीडियो परामर्श करते हैं। यदि आप पूरी तरह सहज नहीं हैं, तो आप आगे नहीं बढ़ते, और इसका आपको कोई खर्च नहीं।",
      "a3": "आपका लिखित कोटेशन सब कुछ सूचीबद्ध करता है: सर्जरी और सर्जन शुल्क, अस्पताल व एनेस्थीसिया, ऑपरेशन-पूर्व जाँच, दवाएँ, आपका होटल, सभी हवाई अड्डा और क्लिनिक ट्रांसफर, आपका निजी केयर कोऑर्डिनेटर, और फ़ॉलो-अप देखभाल। उड़ानों की कीमत अलग से दी जाती है ताकि आप पॉइंट्स का उपयोग कर सकें या अपना सौदा पा सकें — हम बुकिंग में सहायता को तत्पर हैं।",
      "a4": "तुर्की छोड़ने से पहले, आपका सर्जन पुष्टि करता है कि आप उड़ान योग्य हैं। घर लौटने के बाद, आपके पास निर्धारित वीडियो फ़ॉलो-अप और अपनी सर्जिकल टीम से सीधी लाइन होती है। आपकी लिखित आफ्टरकेयर योजना ठीक-ठीक बताती है कि यदि कभी चिकित्सकीय रूप से रिवीज़न आवश्यक हो तो क्या शामिल है — और आपकी पूरी रिकवरी के दौरान हम आपके स्थानीय डॉक्टर के साथ समन्वय करते हैं।",
      "a5": "यह प्रक्रिया पर निर्भर करता है: हेयर ट्रांसप्लांट में आम तौर पर 2–4 दिन, डेंटल कार्य 5–7 दिन, राइनोप्लास्टी 7–8 दिन, और घुटने की सर्जरी फिज़ियोथेरेपी सहित 10–14 दिन लगते हैं। आपकी व्यक्तिगत योजना कुछ भी बुक करने से पहले आपको सटीक तिथियाँ देती है।",
      "a6": "अधिकांश अमेरिकी और कनाडाई पासपोर्ट धारक फ़िलहाल छोटे प्रवास के लिए बिना वीज़ा तुर्की में प्रवेश कर सकते हैं। हम आपके पासपोर्ट के लिए वर्तमान आवश्यकताओं की पुष्टि करते हैं और सभी कागज़ी कार्रवाई आपकी यात्रा योजना के हिस्से के रूप में संभालते हैं — यह यात्रा के सबसे सरल भागों में से एक है।",
      "a7": "अवश्य लाएँ — हमारे अधिकांश मरीज़ किसी के साथ यात्रा करते हैं। आपका होटल कमरा दो लोगों के लिए है, और साथी पैकेज उनके ट्रांसफर और ठहराव को कवर करते हैं। कई साथी, जब आप स्वस्थ होते हैं, उस सप्ताह को फ़िरोज़ा तट पर छुट्टी की तरह बिताते हैं।",
      "a8": "कभी भी सब कुछ अग्रिम नहीं। जब तक आप अपने सर्जन से वीडियो पर नहीं मिल लेते और एक लिखित निश्चित कोटेशन स्वीकार नहीं कर लेते, आप कुछ भी भुगतान नहीं करते। एक बुकिंग भुगतान आपकी तिथियाँ सुरक्षित करता है, और शेष राशि क्लिनिक में — कार्ड या ट्रांसफर से — चुकाई जाती है। यदि उपचार से पहले आपकी योजना बदलती है, तो आपका बुकिंग भुगतान नई तिथियों में स्थानांतरित किया जा सकता है।",
      "a9": "क्योंकि यह उन छिपे मार्कअप की जगह लेता है जिन्हें अधिकांश मेडिकल-यात्रा एजेंसियाँ \"पैकेज कीमतों\" में जोड़ती हैं। आप अपने उपचार के लिए सीधे क्लिनिक को भुगतान करते हैं; हम चिकित्सा कीमतों को कभी नहीं छूते या नहीं बढ़ाते। आपका निश्चित रोगी देखभाल एवं समन्वय शुल्क इसमें शामिल है:",
      "l1": "✦ मुफ़्त परामर्श और एक व्यक्तिगत उपचार योजना", "l2": "✦ आपके केस के लिए सही डॉक्टर से मिलान", "l3": "✦ सभी अपॉइंटमेंट नियोजन, होटल और VIP ट्रांसफर बुकिंग", "l4": "✦ आपकी यात्रा के दौरान एक निजी अंग्रेज़ी बोलने वाला मेज़बान व अनुवादक", "l5": "✦ 24/7 WhatsApp सहायता और घर लौटने पर फ़ॉलो-अप देखभाल"
    }
  };
  Object.keys(T6).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T6[l]).forEach(function (k) { T[l][k] = T6[l][k]; });
  });

  /* ── Stage 7: treatment chooser, hero proof numbers, jump bar ── */
  var T7 = {
    tr: {
      "ch.q": "Neye ihtiyacınız var?", "ch.hint": "Birini seçin. Fiyatı yaklaşık on saniyede alın.",
      "ch.dental": "Diş", "ch.dental.sub": "Tam çene, All-on-4, kaplama seti",
      "ch.nose": "Burun", "ch.nose.sub": "Burun estetiği, revizyon",
      "ch.hair": "Saç", "ch.hair.sub": "Saç ekimi, Safir FUE",
      "ch.knee": "Diz", "ch.knee.sub": "Protez, artroskopi",
      "ch.other": "Başka bir şey — göz, estetik cerrahi, kilo verme, check-up →",
      "ch.unsure": "Emin değil misiniz? Sorununuzu anlatın, sizi yönlendirelim →",
      "hp.1": "hastaya rehberlik", "hp.2": "JCI hastanesi", "hp.3": "ABD fiyatlarının altında", "hp.4": "içinde teklifiniz",
      "j.start": "Buradan başlayın", "j.trust": "Neden Biz", "j.treat": "Tedaviler",
      "j.price": "Fiyatlar", "j.how": "Nasıl Çalışır", "j.reviews": "Yorumlar", "j.faq": "SSS"
    },
    de: {
      "ch.q": "Was brauchen Sie?", "ch.hint": "Tippen Sie auf eine Option — den Preis erhalten Sie in etwa zehn Sekunden.",
      "ch.dental": "Zähne", "ch.dental.sub": "Kompletter Kiefer, All-on-4, Veneer-Sets",
      "ch.nose": "Nase", "ch.nose.sub": "Nasenkorrektur, Revision",
      "ch.hair": "Haare", "ch.hair.sub": "Haartransplantation, Sapphire FUE",
      "ch.knee": "Knie", "ch.knee.sub": "Endoprothese, Arthroskopie",
      "ch.other": "Etwas anderes — Augen, plastische Chirurgie, Gewichtsabnahme, Check-ups →",
      "ch.unsure": "Noch unsicher? Sagen Sie uns, worum es geht — wir beraten Sie →",
      "hp.1": "betreute Patienten", "hp.2": "JCI-Kliniken", "hp.3": "unter US-Preisen", "hp.4": "bis zu Ihrem Angebot",
      "j.start": "Hier starten", "j.trust": "Warum wir", "j.treat": "Behandlungen",
      "j.price": "Preise", "j.how": "Ablauf", "j.reviews": "Bewertungen", "j.faq": "FAQ"
    },
    fr: {
      "ch.q": "De quoi avez-vous besoin ?", "ch.hint": "Touchez une option — vous aurez le prix en une dizaine de secondes.",
      "ch.dental": "Dents", "ch.dental.sub": "Arcade complète, All-on-4, jeux de facettes",
      "ch.nose": "Nez", "ch.nose.sub": "Rhinoplastie, révision",
      "ch.hair": "Cheveux", "ch.hair.sub": "Greffe, Sapphire FUE",
      "ch.knee": "Genou", "ch.knee.sub": "Prothèse, arthroscopie",
      "ch.other": "Autre chose — yeux, chirurgie plastique, perte de poids, bilans →",
      "ch.unsure": "Vous hésitez ? Dites-nous ce qui ne va pas, on vous conseille →",
      "hp.1": "patients accompagnés", "hp.2": "hôpitaux JCI", "hp.3": "sous les prix américains", "hp.4": "pour votre devis",
      "j.start": "Commencer ici", "j.trust": "Pourquoi nous", "j.treat": "Traitements",
      "j.price": "Tarifs", "j.how": "Comment ça marche", "j.reviews": "Avis", "j.faq": "FAQ"
    },
    ru: {
      "ch.q": "Что вам нужно?", "ch.hint": "Выберите одно — цену получите примерно за десять секунд.",
      "ch.dental": "Зубы", "ch.dental.sub": "Полная челюсть, All-on-4, наборы виниров",
      "ch.nose": "Нос", "ch.nose.sub": "Ринопластика, ревизия",
      "ch.hair": "Волосы", "ch.hair.sub": "Пересадка, Sapphire FUE",
      "ch.knee": "Колено", "ch.knee.sub": "Эндопротезирование, артроскопия",
      "ch.other": "Другое — глаза, пластическая хирургия, снижение веса, чек-апы →",
      "ch.unsure": "Ещё не решили? Расскажите о проблеме — мы подскажем →",
      "hp.1": "пациентов сопровождено", "hp.2": "клиник с JCI", "hp.3": "ниже цен в США", "hp.4": "до вашего предложения",
      "j.start": "Начните здесь", "j.trust": "Почему мы", "j.treat": "Лечение",
      "j.price": "Цены", "j.how": "Как это работает", "j.reviews": "Отзывы", "j.faq": "Вопросы"
    },
    zh: {
      "ch.q": "您需要什么？", "ch.hint": "点击一项，约十秒即可获得价格。",
      "ch.dental": "牙齿", "ch.dental.sub": "半口全口种植、All-on-4、全瓷贴面",
      "ch.nose": "鼻子", "ch.nose.sub": "鼻整形、修复手术",
      "ch.hair": "头发", "ch.hair.sub": "植发、蓝宝石 FUE",
      "ch.knee": "膝盖", "ch.knee.sub": "关节置换、关节镜",
      "ch.other": "其他项目 — 眼科、整形外科、减重、健康体检 →",
      "ch.unsure": "还不确定？告诉我们您的情况，我们来建议 →",
      "hp.1": "位患者已获协助", "hp.2": "家 JCI 医院", "hp.3": "低于美国价格", "hp.4": "内送出报价",
      "j.start": "从这里开始", "j.trust": "为何选择我们", "j.treat": "治疗项目",
      "j.price": "价格", "j.how": "服务流程", "j.reviews": "患者评价", "j.faq": "常见问题"
    },
    fa: {
      "ch.q": "به چه چیزی نیاز دارید؟", "ch.hint": "یکی را انتخاب کنید — قیمت را در حدود ده ثانیه دریافت می‌کنید.",
      "ch.dental": "دندان", "ch.dental.sub": "فک کامل، All-on-4، ست لمینت",
      "ch.nose": "بینی", "ch.nose.sub": "جراحی بینی، ترمیمی",
      "ch.hair": "مو", "ch.hair.sub": "کاشت مو، سفایر FUE",
      "ch.knee": "زانو", "ch.knee.sub": "تعویض مفصل، آرتروسکوپی",
      "ch.other": "چیز دیگری — چشم، جراحی زیبایی، کاهش وزن، چکاپ →",
      "ch.unsure": "هنوز مطمئن نیستید؟ مشکل‌تان را بگویید تا راهنمایی کنیم →",
      "hp.1": "بیمار همراهی‌شده", "hp.2": "بیمارستان JCI", "hp.3": "کمتر از قیمت آمریکا", "hp.4": "تا دریافت پیشنهاد",
      "j.start": "از اینجا شروع کنید", "j.trust": "چرا ما", "j.treat": "درمان‌ها",
      "j.price": "قیمت‌ها", "j.how": "روند کار", "j.reviews": "نظرات", "j.faq": "پرسش‌ها"
    },
    hi: {
      "ch.q": "आपको क्या चाहिए?", "ch.hint": "एक चुनें — कीमत लगभग दस सेकंड में मिल जाएगी।",
      "ch.dental": "दाँत", "ch.dental.sub": "पूरा जबड़ा, All-on-4, विनियर सेट",
      "ch.nose": "नाक", "ch.nose.sub": "राइनोप्लास्टी, रिवीज़न",
      "ch.hair": "बाल", "ch.hair.sub": "ट्रांसप्लांट, सैफ़ायर FUE",
      "ch.knee": "घुटना", "ch.knee.sub": "रिप्लेसमेंट, आर्थ्रोस्कोपी",
      "ch.other": "कुछ और — आँखें, प्लास्टिक सर्जरी, वज़न घटाना, चेक-अप →",
      "ch.unsure": "अभी तय नहीं? हमें बताएं क्या दिक्कत है, हम सलाह देंगे →",
      "hp.1": "मरीज़ों का मार्गदर्शन", "hp.2": "JCI अस्पताल", "hp.3": "अमेरिकी कीमतों से कम", "hp.4": "में आपका कोटेशन",
      "j.start": "यहाँ से शुरू करें", "j.trust": "हम क्यों", "j.treat": "उपचार",
      "j.price": "कीमतें", "j.how": "यह कैसे काम करता है", "j.reviews": "समीक्षाएँ", "j.faq": "सामान्य प्रश्न"
    }
  };
  Object.keys(T7).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T7[l]).forEach(function (k) { T[l][k] = T7[l][k]; });
  });

  /* ── T8 — Spanish and Portuguese ───────────────────────────────
     Added as one complete block rather than spread across T…T7,
     because these are new languages rather than new keys: the merge
     loops all do `if (!T[l]) T[l] = {}`, so a whole language can be
     introduced in a single object.

     Neutral Latin American Spanish (usted, no vosotros) and Brazilian
     Portuguese (você) — the Americas are the audience, not Spain or
     Portugal. Country name is localised the way every other language
     on this site does it (Türkei, Turquie, Турция): Turquía / Turquia.

     Anything not listed here falls back to the English in the HTML,
     which is what apply() does when a key is missing.               */

  var T8 = {
    es: {
      "nav.why": "Por Qué Nosotros", "nav.treatments": "Tratamientos", "nav.partners": "Nuestros Socios",
      "nav.pricing": "Precios", "nav.packages": "Paquetes", "nav.advisor": "Centro de Asesores",
      "nav.faq": "Preguntas", "nav.howitworks": "Cómo Funciona", "nav.cta": "Solicitar Presupuesto Gratis",
      "nav.book": "Agendar una Llamada", "nav.standard": "El Estándar", "nav.journal": "Blog",
      "nav.truecost": "Costo Real",
      "hero.eyebrow": "PARA PACIENTES DE EE. UU. Y CANADÁ · ESTAMBUL Y ANTALYA, TURQUÍA",
      "hero.sub": "Lo emparejamos con un cirujano certificado por su junta de especialidad, le entregamos un único precio fijo con todo incluido por escrito, y lo acompañamos desde la primera llamada hasta su recuperación completa.",
      "hero.cta1": "Ver Mi Precio", "hero.cta2": "Preguntar por WhatsApp",
      "hp.1": "pacientes guiados", "hp.2": "hospitales JCI",
      "hp.3": "por debajo de los precios de EE. UU.", "hp.4": "para su presupuesto",
      "ch.q": "¿Qué necesita?", "ch.hint": "Toque una opción. Verá el precio en unos diez segundos.",
      "ch.dental": "Dientes", "ch.dental.sub": "Arcada completa, All-on-4, juegos de carillas",
      "ch.nose": "Nariz", "ch.nose.sub": "Rinoplastia, revisión",
      "ch.hair": "Cabello", "ch.hair.sub": "Trasplante, FUE de zafiro",
      "ch.knee": "Rodilla", "ch.knee.sub": "Prótesis, artroscopia",
      "ch.other": "Otra cosa: ojos, cirugía plástica, pérdida de peso, chequeos →",
      "ch.unsure": "¿Aún no está seguro? Cuéntenos qué le ocurre y lo asesoramos →",
      "j.start": "Empiece aquí", "j.trust": "Por qué confiar", "j.treat": "Tratamientos",
      "j.price": "Precios", "j.how": "Cómo funciona", "j.reviews": "Opiniones", "j.faq": "Preguntas",
      "std.eyebrow": "POR QUÉ LOS PACIENTES CONFÍAN EN NOSOTROS",
      "std.heading": "Su seguridad es todo nuestro modelo de negocio.",
      "std.lede": "¿Le da miedo operarse en el extranjero? Debería ser cauteloso, y por eso mismo usted conoce a su cirujano y tiene un precio fijo por escrito antes de pagar nada. Esto es lo que garantizamos, y lo que usted mismo puede verificar.",
      "std.p1h": "Cirujanos verificados, con pruebas",
      "std.p1b": "Aceptamos a menos de 1 de cada 10 clínicas que se postulan. Cada cirujano está certificado por su junta de especialidad y opera únicamente en hospitales acreditados por la JCI, el mismo estándar que cumplen los principales hospitales estadounidenses. Pida las credenciales y el historial de casos de cualquier cirujano: se los enviamos antes de que pague nada.",
      "std.p2h": "Conozca a su cirujano antes de pagar",
      "std.p2b": "Una videoconsulta privada con su cirujano real, no con un vendedor, antes de que cambie de manos un solo dólar. Si algo no le convence, se retira. Sin depósito y sin presión.",
      "std.p3h": "Un precio fijo, por escrito",
      "std.p3b": "Cirugía, hospital, hotel, traslados y cuidados posteriores en un único presupuesto con todo incluido, confirmado antes de que reserve vuelos. El precio que acepta es el precio que paga. Nunca hay facturas sorpresa.",
      "std.p4h": "Cuidados posteriores que cruzan el océano",
      "std.p4b": "Videoconsultas de seguimiento programadas con su cirujano cuando ya esté en casa, coordinación con su médico local y un plan por escrito para el caso poco frecuente en que algo necesite corregirse.",
      "std.more": "Lea el Estándar MedMatch completo →",
      "num.1": "Pacientes de EE. UU. y Canadá", "num.2": "Nos recomendarían",
      "num.3": "Hospitales asociados acreditados por la JCI", "num.4": "Ahorro promedio por paciente",
      "treat.eyebrow": "TRATAMIENTOS Y PRECIOS",
      "treat.heading": "Cuatro tratamientos insignia.<br><em>Y un hospital completo detrás.</em>",
      "treat.lede": "Los cuatro procedimientos en los que los especialistas de Turquía lideran de verdad el mundo. A través de nuestro grupo hospitalario de Estambul también organizamos cirugía plástica, cirugía ocular, pérdida de peso y chequeos a precios oficiales de hospital.",
      "t.from": "desde", "t.allinc": "todo incluido", "t.calc": "Calcular Mi Precio",
      "t.includes": "El precio fijo incluye cirugía, hospital, hotel, traslados y cuidados posteriores.",
      "t1.title": "Rinoplastia", "t1.save": "FRENTE A $8,000–$15,000 EN EE. UU.",
      "t1.desc": "Los cirujanos de nariz de Turquía están entre los más experimentados del mundo; muchos realizan más rinoplastias en un año que un cirujano estadounidense típico en una década. Las técnicas ultrasónicas y de preservación son el estándar.",
      "t2.title": "Arcada completa y carillas", "t2.save": "FRENTE A $24,000–$30,000 EN EE. UU.",
      "t2.unit": "arcada completa, por maxilar",
      "t2.desc": "Una arcada completa de dientes fijos sobre cuatro o seis implantes, en un solo viaje. El vuelo cuesta lo mismo si arregla un diente o una mandíbula entera: por eso aceptamos casos completos y decimos a quien tiene una sola muela que se la trate en casa.",
      "t3.title": "Cirugía y Prótesis de Rodilla", "t3.save": "FRENTE A $30,000–$50,000 EN EE. UU.",
      "t3.desc": "Las mismas prótesis fabricadas en EE. UU., Zimmer Biomet y Smith+Nephew, colocadas por equipos ortopédicos de alto volumen, con fisioterapia diaria en su hotel de recuperación antes de volar a casa.",
      "t4.title": "Trasplante Capilar", "t4.save": "FRENTE A $12,000–$20,000 EN EE. UU.",
      "t4.unit": "paquete con todo incluido",
      "t4.desc": "Estambul es la capital mundial de la restauración capilar. Su procedimiento lo realiza el cirujano, no un técnico, con diseño natural de la línea del cabello y una garantía de crecimiento por escrito.",
      "t5.title": "Más allá de los cuatro: atención hospitalaria completa",
      "t5.save": "MÁS DE 60 PROCEDIMIENTOS, CON PRECIO POR ESCRITO",
      "t5.unit": "lista de precios del hospital", "t5.cta": "Ver la Lista de Precios Completa",
      "t5.desc": "Cirugía plástica, cirugía ocular iLASIK y SMILE, manga gástrica y balón gástrico, chequeos ejecutivos e imagenología avanzada, realizados en nuestro grupo hospitalario asociado, uno de los mayores de Turquía, a precios oficiales pagados directamente al hospital.",
      "t5.includes": "El hotel se incluye solo donde se indica; su atención y coordinación es una tarifa fija de $300.",
      "pricing.eyebrow": "PRECIOS", "pricing.heading": "Transparente hasta el último centavo.",
      "pricing.lede": "Construya su estimación, comparada honestamente con los precios privados de su país. Los tratamientos dentales y de rodilla incluyen hotel, traslados y su coordinador; los tratamientos hospitalarios muestran el precio fijo oficial.",
      "packages.eyebrow": "PAQUETES DENTALES, ANTALYA", "packages.heading": "Cada dólar, desglosado.",
      "packages.lede": "Usted paga el tratamiento directamente a la clínica; nunca aumentamos los precios médicos. Elija su hotel, vea el desglose completo y conozca su total antes de reservar un vuelo.",
      "partners.eyebrow": "NUESTROS SOCIOS", "partners.heading": "Las manos en las que está.",
      "partners.lede": "Cuatro socios, todos visitados y verificados en persona. Recibe cada uno con su nombre, credenciales, dirección y resultados de casos dentro de su plan de tratamiento, y conoce a su médico por video antes de pagar.",
      "partner.dental1.type": "CLÍNICA DENTAL, ANTALYA",
      "partner.dental1.desc": "Nuestro socio dental dedicado: implantes de boca completa, carillas y diseños de sonrisa, realizados por un equipo certificado que hemos verificado personalmente en la clínica.",
      "partner.dental1.link": "Paquetes dentales y precios →",
      "partner.dental2.type": "CLÍNICA DENTAL, ANTALYA · ESTAMBUL · DIDIM",
      "partner.dental2.desc": "Un estudio de sonrisa premiado con más de veinte años de experiencia en carillas, coronas e implantes sobre un flujo de trabajo totalmente digital. Pídanos resultados reales de pacientes durante su consulta gratuita.",
      "partner.dental2.link": "Solicite una presentación →",
      "partner.hospital.type": "GRUPO HOSPITALARIO, ESTAMBUL",
      "partner.hospital.desc": "Uno de los mayores grupos privados de salud de Turquía: cirugía plástica, cirugía ocular, trasplante capilar, procedimientos bariátricos, chequeos ejecutivos e imagenología, todo dentro de hospitales completos con cuidados intensivos en el mismo sitio.",
      "partner.hospital.link": "Procedimientos y acceso de asesores →",
      "passage.eyebrow": "CÓMO FUNCIONA", "passage.heading": "Desde su puerta, y de vuelta.",
      "ps1h": "La Consulta",
      "ps1b": "Una videoconsulta privada desde casa. Sus registros son revisados por no menos de tres cirujanos antes de emitir cualquier recomendación.",
      "ps2h": "El Precio Fijo",
      "ps2b": "Recibe un único presupuesto fijo con todo incluido: cirugía, hospital, suite, traslados y anfitrión. El precio que acepta es el precio que paga. Va firmado y es definitivo.",
      "ps3h": "La Llegada",
      "ps3b": "Lo reciben en la puerta del avión en Estambul. Traslado privado a un hotel de cinco estrellas sobre el Bósforo. Su anfitrión, con dominio del idioma, discreto y disponible, lo acompaña desde ese momento.",
      "ps4h": "El Procedimiento",
      "ps4b": "Tratamiento en un hospital acreditado por la JCI con un equipo clínico que habla inglés. Su anfitrión permanece en el hospital; su familia recibe novedades en cada etapa.",
      "ps5h": "El Regreso",
      "ps5b": "Controles de aptitud para volar antes de la salida, y después videoconsultas de seguimiento programadas con su cirujano y coordinación con sus médicos en EE. UU. o Canadá, durante todo el tiempo que nos necesite.",
      "il.3": "“El Mediterráneo lleva tres mil años<br>curando viajeros.”",
      "voices.eyebrow": "HISTORIAS DE PACIENTES",
      "voices.heading": "Llegaron como pacientes.<br>Volvieron como defensores.",
      "v1cap": "Nueva York, Estética Dental",
      "v1q": "Me presupuestaron $31,000 por carillas en Manhattan. MedMatch organizó el mismo trabajo, siendo honesta, un trabajo mejor, por una quinta parte, con una semana en el Bósforo. Mi dentista en casa me preguntó dónde me lo había hecho.",
      "v2cap": "Dallas, Prótesis Total de Rodilla",
      "v2q": "Lo que nadie le cuenta es el miedo a estar solo en un hospital extranjero. Nunca lo estuve. Ayşe estaba frente a mi puerta cada mañana. Mi rodilla está perfecta; la atención fue mejor que en casa.",
      "v3cap": "Vancouver, FUE de Zafiro",
      "v3q": "Dos años después de mi trasplante capilar, el cirujano todavía responde mis mensajes él mismo. Intente conseguir eso en Vancouver, a cualquier precio. Es la única forma en que lo haría.",
      "faq.eyebrow": "RESPUESTAS HONESTAS", "faq.heading": "Las preguntas que hace todo paciente inteligente.",
      "faq.lede": "Incluidas las incómodas. Si la suya no está aquí, escríbanos: responde un coordinador de atención, no un vendedor, en menos de un día.",
      "q1": "¿Es realmente seguro operarse en Turquía?",
      "a1": "Turquía es uno de los destinos de turismo médico más consolidados del mundo, con uno de los mayores grupos de hospitales acreditados por la JCI fuera de Estados Unidos. Pero la seguridad nunca depende de un país: depende del cirujano y del hospital. Esa es la parte que controlamos. Trabajamos únicamente con cirujanos certificados por su junta de especialidad en hospitales acreditados por la JCI, usted conoce a su cirujano por video antes de pagar nada, y un coordinador lo acompaña en cada paso.",
      "q2": "¿Quién será mi cirujano y puedo hablar con él antes de pagar?",
      "a2": "Sí, siempre. Una vez revisados sus registros, nombramos a su cirujano y compartimos sus credenciales, experiencia y fotografías de casos. Después tiene una videoconsulta gratuita con él, no con un vendedor. Si no se siente completamente cómodo, no continúa, y no le cuesta nada.",
      "q3": "¿Qué incluye exactamente el precio fijo?",
      "a3": "Su presupuesto por escrito detalla todo: la cirugía y los honorarios del cirujano, hospital y anestesia, pruebas preoperatorias, medicamentos, su hotel, todos los traslados al aeropuerto y a la clínica, su coordinador personal de atención y el seguimiento posterior. Los vuelos se presupuestan aparte para que pueda usar sus puntos o encontrar su propia oferta; con gusto le ayudamos a reservarlos.",
      "q4": "¿Qué pasa si hay una complicación después de volver a casa?",
      "a4": "Antes de que salga de Turquía, su cirujano confirma que está en condiciones de volar. Ya en casa, tiene videoconsultas de seguimiento programadas y una línea directa con su equipo quirúrgico. Su plan de cuidados por escrito establece exactamente qué queda cubierto si alguna vez fuera médicamente necesaria una corrección, y coordinamos con su médico local durante toda su recuperación.",
      "q5": "¿Cuánto tiempo necesito quedarme en Turquía?",
      "a5": "Depende del procedimiento: los trasplantes capilares suelen requerir de 2 a 4 días, el trabajo dental de 5 a 7 días, la rinoplastia de 7 a 8 días y la cirugía de rodilla de 10 a 14 días incluyendo fisioterapia. Su plan personal le da fechas exactas antes de que reserve nada.",
      "q6": "¿Necesito visa?",
      "a6": "La mayoría de los titulares de pasaporte de EE. UU. y Canadá pueden entrar actualmente a Turquía sin visa para estancias cortas. Confirmamos los requisitos vigentes para su pasaporte y gestionamos cualquier trámite como parte de su plan de viaje; es una de las partes más sencillas del proceso.",
      "q7": "¿Puedo llevar a mi pareja o a un amigo?",
      "a7": "Por favor hágalo; la mayoría de nuestros pacientes viajan acompañados. Su habitación de hotel acomoda a dos personas, y los paquetes para acompañantes cubren sus traslados y su estancia. Muchos acompañantes viven esa semana como unas vacaciones en la Costa Turquesa mientras usted se recupera.",
      "q8": "¿Cómo y cuándo pago?",
      "a8": "Nunca todo por adelantado. No paga nada hasta haber conocido a su cirujano por video y haber aceptado un presupuesto fijo por escrito. Un pago de reserva asegura sus fechas, y el saldo se paga en la clínica, con tarjeta o transferencia. Si su plan cambia antes del tratamiento, su pago de reserva es transferible a nuevas fechas.",
      "q9": "¿Por qué hay una tarifa de coordinación de $300?",
      "a9": "Porque sustituye los sobreprecios ocultos que la mayoría de las agencias de turismo médico incorporan a sus “precios de paquete”. Usted paga el tratamiento directamente a la clínica; nosotros nunca tocamos ni inflamos los precios médicos. Su Tarifa fija de Atención y Coordinación del Paciente cubre:",
      "l1": "✦ Consulta gratuita y un plan de tratamiento personalizado",
      "l2": "✦ Emparejarlo con el médico adecuado para su caso",
      "l3": "✦ Toda la agenda de citas y la reserva de hotel y traslados VIP",
      "l4": "✦ Un anfitrión y traductor personal de habla inglesa durante su viaje",
      "l5": "✦ Soporte por WhatsApp 24/7 y seguimiento posterior una vez en casa",
      "inv.eyebrow": "EMPECEMOS", "inv.heading": "Obtenga su presupuesto gratuito.",
      "inv.lede": "Cuéntenos qué está considerando. En 48 horas recibirá una evaluación privada y un presupuesto fijo con todo incluido: gratis, sin compromiso, y sus datos nunca se venden.",
      "inv.p1": "Respuesta en 48 horas", "inv.p2": "Revisado por cirujanos especialistas",
      "inv.p3": "Precio fijo, sin sorpresas",
      "f.name": "Nombre completo", "f.email": "Correo electrónico", "f.phone": "Teléfono / WhatsApp",
      "f.treatment": "Tratamiento de interés", "f.msg": "¿Algo que debamos saber?",
      "f.submit": "Solicitar Mi Presupuesto Gratis, Sin Compromiso",
      "f.micro": "Gratis · Respuesta en 48 horas · Nunca se venden, solo se comparten con el hospital que usted elija",
      "f.success": "Gracias. Hemos recibido su solicitud.<br>Espere nuestra respuesta en 48 horas. <em>— MedMatch Global</em>",
      "footer.treatments": "Tratamientos", "footer.academy": "La Academia", "footer.concierge": "Concierge",
      "footer.desc": "Conectamos de forma privada a pacientes de Estados Unidos y Canadá con los cirujanos más distinguidos de Turquía, sobre más de veinte años de experiencia en turismo de salud.",
      "ft.acb": "Hospital asociado, lista de precios", "ft.advisor": "Centro de Asesores, únase",
      "ft.wa": "Escríbanos por WhatsApp", "ft.sub": "LA ACADEMIA DEL VIAJE MÉDICO",
      "ft.disc": "Las estimaciones son informativas y no constituyen asesoramiento médico.",
      "ft.rights": "© 2026 MedMatch Global. Todos los derechos reservados."
    },

    pt: {
      "nav.why": "Por Que Nós", "nav.treatments": "Tratamentos", "nav.partners": "Nossos Parceiros",
      "nav.pricing": "Preços", "nav.packages": "Pacotes", "nav.advisor": "Central de Consultores",
      "nav.faq": "Perguntas", "nav.howitworks": "Como Funciona", "nav.cta": "Pedir Orçamento Grátis",
      "nav.book": "Agendar uma Conversa", "nav.standard": "O Padrão", "nav.journal": "Blog",
      "nav.truecost": "Custo Real",
      "hero.eyebrow": "PARA PACIENTES DOS EUA E DO CANADÁ · ISTAMBUL E ANTALYA, TURQUIA",
      "hero.sub": "Conectamos você a um cirurgião com título de especialista, colocamos um único preço fixo com tudo incluído por escrito e ficamos ao seu lado da primeira conversa até a recuperação completa.",
      "hero.cta1": "Ver Meu Preço", "hero.cta2": "Perguntar no WhatsApp",
      "hp.1": "pacientes acompanhados", "hp.2": "hospitais JCI",
      "hp.3": "abaixo dos preços dos EUA", "hp.4": "até seu orçamento",
      "ch.q": "Do que você precisa?", "ch.hint": "Toque em uma opção. Você vê o preço em uns dez segundos.",
      "ch.dental": "Dentes", "ch.dental.sub": "Arcada completa, All-on-4, conjuntos de lentes",
      "ch.nose": "Nariz", "ch.nose.sub": "Rinoplastia, revisão",
      "ch.hair": "Cabelo", "ch.hair.sub": "Transplante, FUE de safira",
      "ch.knee": "Joelho", "ch.knee.sub": "Prótese, artroscopia",
      "ch.other": "Outra coisa: olhos, cirurgia plástica, emagrecimento, check-ups →",
      "ch.unsure": "Ainda não tem certeza? Conte o que está acontecendo e nós orientamos →",
      "j.start": "Comece aqui", "j.trust": "Por que confiar", "j.treat": "Tratamentos",
      "j.price": "Preços", "j.how": "Como funciona", "j.reviews": "Depoimentos", "j.faq": "Perguntas",
      "std.eyebrow": "POR QUE OS PACIENTES CONFIAM EM NÓS",
      "std.heading": "Sua segurança é todo o nosso modelo de negócio.",
      "std.lede": "Com medo de operar no exterior? Você deve mesmo ter cautela — e é exatamente por isso que você conhece seu cirurgião e tem um preço fixo por escrito antes de pagar qualquer coisa. Aqui está o que garantimos, e o que você mesmo pode conferir.",
      "std.p1h": "Cirurgiões verificados, com comprovação",
      "std.p1b": "Aceitamos menos de 1 a cada 10 clínicas que se candidatam. Todo cirurgião tem título de especialista e opera apenas em hospitais acreditados pela JCI, o mesmo padrão dos principais hospitais americanos. Peça as credenciais e o histórico de casos de qualquer cirurgião: enviamos antes de você pagar qualquer coisa.",
      "std.p2h": "Conheça seu cirurgião antes de pagar",
      "std.p2b": "Uma videoconsulta particular com o seu cirurgião de verdade, não com um vendedor, antes de qualquer dinheiro mudar de mãos. Se algo não parecer certo, você desiste. Sem depósito e sem pressão.",
      "std.p3h": "Um preço fixo, por escrito",
      "std.p3b": "Cirurgia, hospital, hotel, transfers e acompanhamento pós-operatório em um único orçamento com tudo incluído, confirmado antes de você comprar as passagens. O preço que você aceita é o preço que você paga. Nunca há faturas surpresa.",
      "std.p4h": "Acompanhamento que atravessa o oceano",
      "std.p4b": "Videoconsultas de retorno agendadas com seu cirurgião depois que você estiver em casa, coordenação com seu médico local e um plano por escrito para o caso raro de algo precisar de correção.",
      "std.more": "Leia o Padrão MedMatch completo →",
      "num.1": "Pacientes dos EUA e do Canadá", "num.2": "Nos recomendariam",
      "num.3": "Hospitais parceiros acreditados pela JCI", "num.4": "Economia média por paciente",
      "treat.eyebrow": "TRATAMENTOS E PREÇOS",
      "treat.heading": "Quatro tratamentos principais.<br><em>E um hospital inteiro por trás.</em>",
      "treat.lede": "Os quatro procedimentos em que os especialistas da Turquia realmente lideram o mundo. Pelo nosso grupo hospitalar em Istambul também organizamos cirurgia plástica, cirurgia ocular, emagrecimento e check-ups a preços oficiais de hospital.",
      "t.from": "a partir de", "t.allinc": "tudo incluído", "t.calc": "Calcular Meu Preço",
      "t.includes": "O preço fixo inclui cirurgia, hospital, hotel, transfers e acompanhamento.",
      "t1.title": "Rinoplastia", "t1.save": "CONTRA $8,000–$15,000 NOS EUA",
      "t1.desc": "Os cirurgiões de nariz da Turquia estão entre os mais experientes do mundo; muitos fazem mais rinoplastias em um ano do que um cirurgião americano típico faz em uma década. Técnicas ultrassônicas e de preservação são padrão.",
      "t2.title": "Arcada completa e lentes", "t2.save": "CONTRA $24,000–$30,000 NOS EUA",
      "t2.unit": "arcada completa, por maxilar",
      "t2.desc": "Uma arcada completa de dentes fixos sobre quatro ou seis implantes, numa única viagem. O voo custa o mesmo, quer trate um dente ou uma arcada inteira — por isso aceitamos casos completos e dizemos a quem tem um único dente estragado para tratá-lo em casa.",
      "t3.title": "Cirurgia e Prótese de Joelho", "t3.save": "CONTRA $30,000–$50,000 NOS EUA",
      "t3.desc": "As mesmas próteses fabricadas nos EUA, Zimmer Biomet e Smith+Nephew, colocadas por equipes ortopédicas de alto volume, com fisioterapia diária no seu hotel de recuperação antes de voltar para casa.",
      "t4.title": "Transplante Capilar", "t4.save": "CONTRA $12,000–$20,000 NOS EUA",
      "t4.unit": "pacote com tudo incluído",
      "t4.desc": "Istambul é a capital mundial da restauração capilar. Seu procedimento é feito pelo cirurgião, não por um técnico, com desenho natural da linha do cabelo e garantia de crescimento por escrito.",
      "t5.title": "Além dos quatro: atendimento hospitalar completo",
      "t5.save": "MAIS DE 60 PROCEDIMENTOS, COM PREÇO POR ESCRITO",
      "t5.unit": "tabela de preços do hospital", "t5.cta": "Ver a Tabela de Preços Completa",
      "t5.desc": "Cirurgia plástica, cirurgia ocular iLASIK e SMILE, sleeve e balão gástrico, check-ups executivos e exames de imagem avançados, realizados no nosso grupo hospitalar parceiro, um dos maiores da Turquia, a preços oficiais pagos diretamente ao hospital.",
      "t5.includes": "Hotel incluído apenas onde indicado; seu atendimento e coordenação é uma taxa fixa de $300.",
      "pricing.eyebrow": "PREÇOS", "pricing.heading": "Transparente até o último centavo.",
      "pricing.lede": "Monte sua estimativa, comparada honestamente com os preços particulares do seu país. Tratamentos dentários e de joelho incluem hotel, transfers e seu coordenador; os tratamentos hospitalares mostram o preço fixo oficial.",
      "packages.eyebrow": "PACOTES ODONTOLÓGICOS, ANTALYA", "packages.heading": "Cada dólar, item por item.",
      "packages.lede": "Você paga o tratamento diretamente à clínica; nunca aplicamos margem sobre preços médicos. Escolha seu hotel, veja o detalhamento completo e saiba seu total antes de comprar uma passagem.",
      "partners.eyebrow": "NOSSOS PARCEIROS", "partners.heading": "As mãos em que você está.",
      "partners.lede": "Quatro parceiros, todos visitados e verificados pessoalmente. Você recebe cada um com nome, credenciais, endereço e resultados de casos dentro do seu plano de tratamento, e conhece seu médico por vídeo antes de pagar.",
      "partner.dental1.type": "CLÍNICA ODONTOLÓGICA, ANTALYA",
      "partner.dental1.desc": "Nosso parceiro odontológico dedicado: implantes de boca inteira, lentes de contato dental e harmonização do sorriso, feitos por uma equipe com título de especialista que verificamos pessoalmente na clínica.",
      "partner.dental1.link": "Pacotes odontológicos e preços →",
      "partner.dental2.type": "CLÍNICA ODONTOLÓGICA, ANTALYA · ISTAMBUL · DIDIM",
      "partner.dental2.desc": "Um estúdio de sorriso premiado, com mais de vinte anos de experiência em lentes, coroas e implantes num fluxo totalmente digital. Peça resultados reais de pacientes durante sua consulta gratuita.",
      "partner.dental2.link": "Solicite uma apresentação →",
      "partner.hospital.type": "GRUPO HOSPITALAR, ISTAMBUL",
      "partner.hospital.desc": "Um dos maiores grupos privados de saúde da Turquia: cirurgia plástica, cirurgia ocular, transplante capilar, procedimentos bariátricos, check-ups executivos e exames de imagem, tudo dentro de hospitais completos com UTI no local.",
      "partner.hospital.link": "Procedimentos e acesso de consultores →",
      "passage.eyebrow": "COMO FUNCIONA", "passage.heading": "Da sua porta, e de volta.",
      "ps1h": "A Consulta",
      "ps1b": "Uma videoconsulta particular de casa. Seus exames são analisados por no mínimo três cirurgiões antes de qualquer recomendação.",
      "ps2h": "O Preço Fixo",
      "ps2b": "Você recebe um único orçamento fixo com tudo incluído: cirurgia, hospital, suíte, transfers e anfitrião. O preço que você aceita é o preço que você paga. É assinado e é definitivo.",
      "ps3h": "A Chegada",
      "ps3b": "Recebido na porta da aeronave em Istambul. Transfer particular para um hotel cinco estrelas no Bósforo. Seu anfitrião, fluente, discreto e disponível, fica com você a partir desse momento.",
      "ps4h": "O Procedimento",
      "ps4b": "Tratamento em um hospital acreditado pela JCI com equipe clínica que fala inglês. Seu anfitrião permanece no hospital; sua família recebe notícias em cada etapa.",
      "ps5h": "O Retorno",
      "ps5b": "Avaliação de aptidão para voar antes do embarque e, depois, videoconsultas de retorno agendadas com seu cirurgião e coordenação com seus médicos nos EUA ou no Canadá, pelo tempo que você precisar.",
      "il.3": "“O Mediterrâneo cura viajantes<br>há três mil anos.”",
      "voices.eyebrow": "HISTÓRIAS DE PACIENTES",
      "voices.heading": "Chegaram como pacientes.<br>Voltaram como defensores.",
      "v1cap": "Nova York, Estética Dental",
      "v1q": "Me orçaram $31,000 por lentes em Manhattan. A MedMatch organizou o mesmo trabalho — honestamente, um trabalho melhor — por um quinto disso, com uma semana no Bósforo. Meu dentista aqui perguntou onde eu tinha feito.",
      "v2cap": "Dallas, Prótese Total de Joelho",
      "v2q": "A parte que ninguém conta é o medo de estar sozinho num hospital estrangeiro. Eu nunca estive. A Ayşe estava na minha porta toda manhã. Meu joelho está perfeito; o cuidado foi melhor do que em casa.",
      "v3cap": "Vancouver, FUE de Safira",
      "v3q": "Dois anos depois do meu transplante capilar, o cirurgião ainda responde minhas mensagens pessoalmente. Tente conseguir isso em Vancouver, por qualquer preço. É a única forma como eu faria.",
      "faq.eyebrow": "RESPOSTAS HONESTAS", "faq.heading": "As perguntas que todo paciente atento faz.",
      "faq.lede": "Inclusive as incômodas. Se a sua não estiver aqui, escreva para nós: quem responde é um coordenador de atendimento, não um vendedor, em menos de um dia.",
      "q1": "É realmente seguro operar na Turquia?",
      "a1": "A Turquia é um dos destinos de turismo médico mais consolidados do mundo, com um dos maiores grupos de hospitais acreditados pela JCI fora dos Estados Unidos. Mas segurança nunca é uma questão de país: é do cirurgião e do hospital. Essa é a parte que controlamos. Trabalhamos apenas com cirurgiões com título de especialista em hospitais acreditados pela JCI, você conhece seu cirurgião por vídeo antes de pagar qualquer coisa, e um coordenador fica com você em cada etapa.",
      "q2": "Quem será meu cirurgião, e posso falar com ele antes de pagar?",
      "a2": "Sim, sempre. Depois de analisar seus exames, nomeamos seu cirurgião e enviamos credenciais, experiência e fotos de casos. Em seguida você tem uma videoconsulta gratuita com ele, não com um vendedor. Se não se sentir completamente à vontade, você não segue em frente, e não custa nada.",
      "q3": "O que exatamente está incluído no preço fixo?",
      "a3": "Seu orçamento por escrito lista tudo: a cirurgia e os honorários do cirurgião, hospital e anestesia, exames pré-operatórios, medicamentos, seu hotel, todos os transfers do aeroporto e da clínica, seu coordenador pessoal de atendimento e o acompanhamento posterior. As passagens são orçadas à parte para que você possa usar suas milhas ou achar sua própria oferta; ficamos felizes em ajudar na reserva.",
      "q4": "O que acontece se houver uma complicação depois que eu voltar para casa?",
      "a4": "Antes de você deixar a Turquia, seu cirurgião confirma que está apto a voar. Já em casa, você tem videoconsultas de retorno agendadas e uma linha direta com sua equipe cirúrgica. Seu plano de acompanhamento por escrito define exatamente o que fica coberto caso uma correção venha a ser clinicamente necessária, e coordenamos com seu médico local durante toda a recuperação.",
      "q5": "Quanto tempo preciso ficar na Turquia?",
      "a5": "Depende do procedimento: transplantes capilares costumam exigir de 2 a 4 dias, tratamento dentário de 5 a 7 dias, rinoplastia de 7 a 8 dias e cirurgia de joelho de 10 a 14 dias incluindo fisioterapia. Seu plano pessoal traz as datas exatas antes de você reservar qualquer coisa.",
      "q6": "Preciso de visto?",
      "a6": "A maioria dos portadores de passaporte dos EUA e do Canadá pode entrar na Turquia sem visto para estadias curtas. Confirmamos as exigências vigentes para o seu passaporte e cuidamos de qualquer papelada como parte do seu plano de viagem; é uma das partes mais simples do processo.",
      "q7": "Posso levar meu parceiro ou um amigo?",
      "a7": "Por favor, leve — a maioria dos nossos pacientes viaja acompanhada. Seu quarto de hotel acomoda duas pessoas, e os pacotes para acompanhante cobrem os transfers e a estadia dele. Muitos acompanhantes tratam a semana como férias na Costa Turquesa enquanto você se recupera.",
      "q8": "Como e quando eu pago?",
      "a8": "Nunca tudo adiantado. Você não paga nada até conhecer seu cirurgião por vídeo e aceitar um orçamento fixo por escrito. Um pagamento de reserva garante suas datas, e o saldo é pago na clínica, por cartão ou transferência. Se seu plano mudar antes do tratamento, o pagamento de reserva é transferível para novas datas.",
      "q9": "Por que existe uma taxa de coordenação de $300?",
      "a9": "Porque ela substitui as margens escondidas que a maioria das agências de turismo médico embute nos “preços de pacote”. Você paga o tratamento diretamente à clínica; nós nunca tocamos nem inflacionamos preços médicos. Sua Taxa fixa de Atendimento e Coordenação do Paciente cobre:",
      "l1": "✦ Consulta gratuita e um plano de tratamento personalizado",
      "l2": "✦ Conectar você ao médico certo para o seu caso",
      "l3": "✦ Toda a agenda de consultas e a reserva de hotel e transfer VIP",
      "l4": "✦ Um anfitrião e tradutor pessoal que fala inglês durante sua viagem",
      "l5": "✦ Suporte no WhatsApp 24/7 e acompanhamento depois que você chegar em casa",
      "inv.eyebrow": "COMECE AQUI", "inv.heading": "Peça seu orçamento gratuito.",
      "inv.lede": "Conte o que você está considerando. Em 48 horas você recebe uma avaliação particular e um orçamento fixo com tudo incluído: grátis, sem compromisso, e seus dados nunca são vendidos.",
      "inv.p1": "Resposta em 48 horas", "inv.p2": "Analisado por cirurgiões especialistas",
      "inv.p3": "Preço fixo, sem surpresas",
      "f.name": "Nome completo", "f.email": "E-mail", "f.phone": "Telefone / WhatsApp",
      "f.treatment": "Tratamento de interesse", "f.msg": "Algo que devemos saber?",
      "f.submit": "Pedir Meu Orçamento Grátis, Sem Compromisso",
      "f.micro": "Grátis · Resposta em 48 horas · Nunca vendidos, compartilhados apenas com o hospital que você escolher",
      "f.success": "Obrigado. Recebemos sua solicitação.<br>Aguarde nossa resposta em 48 horas. <em>— MedMatch Global</em>",
      "footer.treatments": "Tratamentos", "footer.academy": "A Academia", "footer.concierge": "Concierge",
      "footer.desc": "Conectamos de forma particular pacientes dos Estados Unidos e do Canadá aos cirurgiões mais respeitados da Turquia, com mais de vinte anos de experiência em turismo de saúde.",
      "ft.acb": "Hospital parceiro, tabela de preços", "ft.advisor": "Central de Consultores, participe",
      "ft.wa": "Fale conosco no WhatsApp", "ft.sub": "A ACADEMIA DA VIAGEM MÉDICA",
      "ft.disc": "As estimativas são informativas e não constituem orientação médica.",
      "ft.rights": "© 2026 MedMatch Global. Todos os direitos reservados."
    }
  };
  Object.keys(T8).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T8[l]).forEach(function (k) { T[l][k] = T8[l][k]; });
  });

  /* ── T9 — the Answers section ──────────────────────────────────
     One key, nine languages. Only index.html carries data-i18n, so
     this covers the burger menu and the footer; /answers/ itself is
     English-only for now, like every other standalone page.         */
  var T9 = {
    tr: { "nav.answers": "Yanıtlar" },
    de: { "nav.answers": "Antworten" },
    fr: { "nav.answers": "Réponses" },
    ru: { "nav.answers": "Ответы" },
    zh: { "nav.answers": "问答" },
    fa: { "nav.answers": "پاسخ‌ها" },
    hi: { "nav.answers": "उत्तर" },
    es: { "nav.answers": "Respuestas" },
    pt: { "nav.answers": "Respostas" }
  };
  Object.keys(T9).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T9[l]).forEach(function (k) { T[l][k] = T9[l][k]; });
  });

  /* ── T10 — the photo preview tool ──────────────────────────────
     Same shape as T9. preview.html itself is English-only, like every
     other standalone page; this covers index.html's nav, burger menu
     and footer.                                                     */
  var T10 = {
    tr: { "nav.preview": "Sonucu Gör" },
    de: { "nav.preview": "Ergebnis ansehen" },
    fr: { "nav.preview": "Voir un résultat" },
    ru: { "nav.preview": "Посмотреть результат" },
    zh: { "nav.preview": "查看效果" },
    fa: { "nav.preview": "دیدن نتیجه" },
    hi: { "nav.preview": "परिणाम देखें" },
    es: { "nav.preview": "Ver un resultado" },
    pt: { "nav.preview": "Ver um resultado" }
  };
  Object.keys(T10).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T10[l]).forEach(function (k) { T[l][k] = T10[l][k]; });
  });

  var nodes = null;
  function collect() {
    if (!nodes) {
      nodes = [];
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        nodes.push({ el: el, key: el.getAttribute("data-i18n"), orig: el.innerHTML });
      });
    }
    return nodes;
  }

  function apply(lang) {
    var dict = T[lang];
    collect().forEach(function (n) {
      var v = dict && dict[n.key];
      n.el.innerHTML = (lang === "en" || v == null) ? n.orig : v;
    });
    var root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", RTL[lang] ? "rtl" : "ltr");
    try { localStorage.setItem("mm_lang", lang); } catch (e) {}
    document.querySelectorAll("#langSelect").forEach(function (s) { s.value = lang; });
  }

  var saved = "en";
  try { saved = localStorage.getItem("mm_lang") || "en"; } catch (e) {}
  if (saved !== "en") apply(saved);           // leave the English DOM (and its animation) untouched by default
  else { var s = document.getElementById("langSelect"); if (s) s.value = "en"; }

  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "langSelect") apply(e.target.value);
  });
})();
