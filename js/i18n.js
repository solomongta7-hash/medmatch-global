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
      "hero.eyebrow": "ABD VE KANADA'DAN HASTALAR İÇİN · İSTANBUL VE ANTALYA, TÜRKİYE",
      "hero.sub": "Sizi uluslararası akreditasyona sahip hastanelerdeki board sertifikalı cerrahlarla buluşturur, gerisini biz hallederiz. Tek sabit fiyat; ameliyatınızı, otelinizi, transferlerinizi ve bakımınızı kapsar. Kişisel bakım koordinatörünüz ilk görüşmeden tam iyileşmeye kadar yanınızdadır.",
      "hero.cta1": "Ücretsiz Teklif Al", "hero.cta2": "Tedavileri ve Fiyatları Gör",
      "partner.perla.type": "DİŞ KLİNİĞİ — ANTALYA",
      "partner.perla.desc": "Özel diş sağlığı ortağımız — tam ağız implantları, kaplamalar ve gülüş tasarımları, aşağıda göreceğiniz altı uzman tarafından uygulanır.",
      "partner.perla.link": "Diş paketleri ve fiyatları →",
      "partner.acibadem.type": "HASTANE GRUBU — İSTANBUL",
      "partner.acibadem.desc": "Türkiye'nin en büyük özel sağlık gruplarından biri — estetik cerrahi, göz cerrahisi, saç ekimi, obezite işlemleri, check-up ve görüntüleme; hepsi yoğun bakımın yerinde bulunduğu tam donanımlı hastanelerde.",
      "partner.acibadem.link": "Tüm Acıbadem fiyat listesi →",
      "partner.mp.type": "HASTANE GRUBU — YAKINDA",
      "partner.mp.desc": "Türkiye'nin en büyük hastane ağlarından biri — 13 şehirde 25'ten fazla hastane. Resmi ortak fiyat listemizi şu anda hazırlıyoruz.",
      "partner.mp.link": "Neler bekleyebilirsiniz →",
      "footer.treatments": "Tedaviler", "footer.academy": "Akademi", "footer.concierge": "Concierge",
      "footer.desc": "ABD ve Kanada'daki hastaları Türkiye'nin en seçkin cerrahlarıyla özel olarak buluşturuyoruz — yirmi yılı aşkın sağlık turizmi deneyimiyle."
    },
    de: {
      "nav.why": "Warum Wir", "nav.treatments": "Behandlungen", "nav.partners": "Unsere Partner",
      "nav.pricing": "Preise", "nav.packages": "Pakete", "nav.advisor": "Berater-Hub",
      "nav.faq": "FAQ", "nav.howitworks": "Ablauf", "nav.cta": "Kostenloses Angebot",
      "hero.eyebrow": "FÜR PATIENTEN AUS DEN USA UND KANADA · ISTANBUL UND ANTALYA, TÜRKEI",
      "hero.sub": "Wir vermitteln Ihnen zertifizierte Chirurgen an international akkreditierten Kliniken – um alles Weitere kümmern wir uns. Ein Festpreis deckt Eingriff, Hotel, Transfers und Nachsorge. Eine persönliche Betreuungskoordinatorin ist vom ersten Anruf bis zur vollständigen Genesung an Ihrer Seite.",
      "hero.cta1": "Kostenloses Angebot", "hero.cta2": "Behandlungen & Preise ansehen",
      "partner.perla.type": "ZAHNKLINIK — ANTALYA",
      "partner.perla.desc": "Unser dedizierter Zahnpartner – Implantate für den ganzen Kiefer, Veneers und Smile-Makeovers, durchgeführt von den sechs Spezialisten unten.",
      "partner.perla.link": "Zahnpakete & Preise →",
      "partner.acibadem.type": "KLINIKGRUPPE — ISTANBUL",
      "partner.acibadem.desc": "Eine der größten privaten Klinikgruppen der Türkei – plastische Chirurgie, Augenchirurgie, Haartransplantation, Adipositas-Eingriffe, Check-ups und Bildgebung, alles in Vollkliniken mit Intensivstation vor Ort.",
      "partner.acibadem.link": "Vollständige Acıbadem-Preisliste →",
      "partner.mp.type": "KLINIKGRUPPE — DEMNÄCHST",
      "partner.mp.desc": "Eines der größten Kliniknetze der Türkei – mehr als 25 Kliniken in 13 Städten. Wir finalisieren gerade unsere offizielle Partner-Preisliste.",
      "partner.mp.link": "Was Sie erwartet →",
      "footer.treatments": "Behandlungen", "footer.academy": "Die Akademie", "footer.concierge": "Concierge",
      "footer.desc": "Wir vermitteln Patienten aus den USA und Kanada privat an die renommiertesten Chirurgen der Türkei – auf Basis von über zwanzig Jahren Erfahrung im Gesundheitstourismus."
    },
    fr: {
      "nav.why": "Pourquoi Nous", "nav.treatments": "Traitements", "nav.partners": "Nos Partenaires",
      "nav.pricing": "Tarifs", "nav.packages": "Forfaits", "nav.advisor": "Espace Conseiller",
      "nav.faq": "FAQ", "nav.howitworks": "Comment ça marche", "nav.cta": "Devis Gratuit",
      "hero.eyebrow": "POUR LES PATIENTS DES ÉTATS-UNIS ET DU CANADA · ISTANBUL ET ANTALYA, TÜRKİYE",
      "hero.sub": "Nous vous mettons en relation avec des chirurgiens certifiés dans des hôpitaux accrédités à l'international — et nous nous occupons du reste. Un prix fixe couvre votre intervention, l'hôtel, les transferts et le suivi. Une coordinatrice de soins personnelle reste à vos côtés du premier appel jusqu'à votre pleine guérison.",
      "hero.cta1": "Devis Gratuit", "hero.cta2": "Voir Traitements & Tarifs",
      "partner.perla.type": "CLINIQUE DENTAIRE — ANTALYA",
      "partner.perla.desc": "Notre partenaire dentaire dédié — implants complets, facettes et transformations du sourire, réalisés par les six spécialistes ci-dessous.",
      "partner.perla.link": "Forfaits & tarifs dentaires →",
      "partner.acibadem.type": "GROUPE HOSPITALIER — ISTANBUL",
      "partner.acibadem.desc": "L'un des plus grands groupes de santé privés de Turquie — chirurgie esthétique, chirurgie oculaire, greffe de cheveux, chirurgie de l'obésité, bilans de santé et imagerie, le tout dans des hôpitaux complets avec soins intensifs sur place.",
      "partner.acibadem.link": "Liste complète des tarifs Acıbadem →",
      "partner.mp.type": "GROUPE HOSPITALIER — BIENTÔT",
      "partner.mp.desc": "L'un des plus grands réseaux hospitaliers de Turquie — plus de 25 hôpitaux dans 13 villes. Nous finalisons actuellement notre liste de tarifs partenaire officielle.",
      "partner.mp.link": "À quoi s'attendre →",
      "footer.treatments": "Traitements", "footer.academy": "L'Académie", "footer.concierge": "Conciergerie",
      "footer.desc": "Nous mettons en relation, en toute confidentialité, les patients des États-Unis et du Canada avec les chirurgiens les plus éminents de Turquie — fort de plus de vingt ans d'expérience en tourisme médical."
    },
    ru: {
      "nav.why": "Почему мы", "nav.treatments": "Лечение", "nav.partners": "Наши партнёры",
      "nav.pricing": "Цены", "nav.packages": "Пакеты", "nav.advisor": "Кабинет консультанта",
      "nav.faq": "Вопросы", "nav.howitworks": "Как это работает", "nav.cta": "Бесплатная оценка",
      "hero.eyebrow": "ДЛЯ ПАЦИЕНТОВ ИЗ США И КАНАДЫ · СТАМБУЛ И АНТАЛЬЯ, ТУРЦИЯ",
      "hero.sub": "Мы подбираем вам сертифицированных хирургов в клиниках с международной аккредитацией — и берём на себя всё остальное. Одна фиксированная цена включает операцию, отель, трансферы и последующий уход. Персональный координатор рядом с вами от первого звонка до полного выздоровления.",
      "hero.cta1": "Бесплатная оценка", "hero.cta2": "Лечение и цены",
      "partner.perla.type": "СТОМАТОЛОГИЯ — АНТАЛЬЯ",
      "partner.perla.desc": "Наш профильный стоматологический партнёр — импланты всей челюсти, виниры и преображение улыбки, которые выполняют шесть специалистов ниже.",
      "partner.perla.link": "Стоматологические пакеты и цены →",
      "partner.acibadem.type": "СЕТЬ КЛИНИК — СТАМБУЛ",
      "partner.acibadem.desc": "Одна из крупнейших частных медицинских групп Турции — пластическая хирургия, офтальмология, пересадка волос, бариатрия, чек-апы и диагностика — всё в полноценных больницах с отделением интенсивной терапии.",
      "partner.acibadem.link": "Полный прайс Acıbadem →",
      "partner.mp.type": "СЕТЬ КЛИНИК — СКОРО",
      "partner.mp.desc": "Одна из крупнейших больничных сетей Турции — более 25 больниц в 13 городах. Сейчас мы готовим официальный партнёрский прайс-лист.",
      "partner.mp.link": "Чего ожидать →",
      "footer.treatments": "Лечение", "footer.academy": "Академия", "footer.concierge": "Консьерж",
      "footer.desc": "Мы конфиденциально подбираем пациентам из США и Канады самых выдающихся хирургов Турции — на основе более чем двадцатилетнего опыта в медицинском туризме."
    },
    zh: {
      "nav.why": "为何选择我们", "nav.treatments": "诊疗项目", "nav.partners": "合作伙伴",
      "nav.pricing": "价格", "nav.packages": "套餐", "nav.advisor": "顾问中心",
      "nav.faq": "常见问题", "nav.howitworks": "服务流程", "nav.cta": "获取免费报价",
      "hero.eyebrow": "面向美国和加拿大患者 · 土耳其伊斯坦布尔与安塔利亚",
      "hero.sub": "我们为您匹配国际认证医院中具备资质的外科医生，其余一切由我们安排。一个固定价格涵盖手术、酒店、接送与术后护理。专属护理协调员从您首次来电到完全康复始终陪伴左右。",
      "hero.cta1": "获取免费报价", "hero.cta2": "查看项目与价格",
      "partner.perla.type": "牙科诊所 — 安塔利亚",
      "partner.perla.desc": "我们专属的牙科合作伙伴 — 全口种植、贴面与微笑改造，由下方六位专家亲自完成。",
      "partner.perla.link": "牙科套餐与价格 →",
      "partner.acibadem.type": "医院集团 — 伊斯坦布尔",
      "partner.acibadem.desc": "土耳其最大的私立医疗集团之一 — 整形外科、眼科手术、植发、减重手术、高端体检与影像检查，全部在配备重症监护的综合医院内完成。",
      "partner.acibadem.link": "查看 Acıbadem 完整价目表 →",
      "partner.mp.type": "医院集团 — 即将上线",
      "partner.mp.desc": "土耳其最大的医院网络之一 — 覆盖 13 座城市、超过 25 家医院。我们正在敲定官方合作价目表。",
      "partner.mp.link": "了解详情 →",
      "footer.treatments": "诊疗项目", "footer.academy": "学院", "footer.concierge": "礼宾服务",
      "footer.desc": "我们以私密方式，为来自美国和加拿大的患者匹配土耳其最杰出的外科医生 — 依托二十多年的健康旅游经验。"
    },
    fa: {
      "nav.why": "چرا ما", "nav.treatments": "درمان‌ها", "nav.partners": "شرکای ما",
      "nav.pricing": "قیمت‌ها", "nav.packages": "بسته‌ها", "nav.advisor": "مرکز مشاوران",
      "nav.faq": "پرسش‌های متداول", "nav.howitworks": "نحوه کار", "nav.cta": "دریافت پیشنهاد رایگان",
      "hero.eyebrow": "برای بیماران از آمریکا و کانادا · استانبول و آنتالیا، ترکیه",
      "hero.sub": "ما شما را با جراحان دارای بورد تخصصی در بیمارستان‌های دارای اعتبار بین‌المللی مرتبط می‌کنیم — و باقی امور را خودمان انجام می‌دهیم. یک قیمت ثابت شامل عمل، هتل، ترانسفر و مراقبت‌های پس از عمل است. یک هماهنگ‌کننده شخصی از نخستین تماس تا بهبودی کامل در کنار شماست.",
      "hero.cta1": "دریافت پیشنهاد رایگان", "hero.cta2": "مشاهده درمان‌ها و قیمت‌ها",
      "partner.perla.type": "کلینیک دندان‌پزشکی — آنتالیا",
      "partner.perla.desc": "شریک تخصصی دندان‌پزشکی ما — ایمپلنت کامل فک، لمینت و طراحی لبخند، توسط شش متخصصی که در ادامه می‌بینید انجام می‌شود.",
      "partner.perla.link": "بسته‌ها و قیمت‌های دندان‌پزشکی →",
      "partner.acibadem.type": "گروه بیمارستانی — استانبول",
      "partner.acibadem.desc": "یکی از بزرگ‌ترین گروه‌های درمانی خصوصی ترکیه — جراحی زیبایی، جراحی چشم، کاشت مو، جراحی چاقی، چکاپ و تصویربرداری، همه در بیمارستان‌های کامل با بخش مراقبت‌های ویژه.",
      "partner.acibadem.link": "فهرست کامل قیمت‌های آجی‌بادم →",
      "partner.mp.type": "گروه بیمارستانی — به‌زودی",
      "partner.mp.desc": "یکی از بزرگ‌ترین شبکه‌های بیمارستانی ترکیه — بیش از ۲۵ بیمارستان در ۱۳ شهر. در حال نهایی‌سازی فهرست قیمت رسمی همکاری هستیم.",
      "partner.mp.link": "چه انتظاری داشته باشید →",
      "footer.treatments": "درمان‌ها", "footer.academy": "آکادمی", "footer.concierge": "کنسیرژ",
      "footer.desc": "ما بیماران آمریکا و کانادا را به‌صورت خصوصی با برجسته‌ترین جراحان ترکیه مرتبط می‌کنیم — بر پایه بیش از بیست سال تجربه در گردشگری سلامت."
    },
    hi: {
      "nav.why": "हम क्यों", "nav.treatments": "उपचार", "nav.partners": "हमारे साझेदार",
      "nav.pricing": "मूल्य", "nav.packages": "पैकेज", "nav.advisor": "सलाहकार हब",
      "nav.faq": "सामान्य प्रश्न", "nav.howitworks": "यह कैसे काम करता है", "nav.cta": "मुफ़्त कोटेशन पाएं",
      "hero.eyebrow": "अमेरिका और कनाडा के मरीज़ों के लिए · इस्तांबुल और अंताल्या, तुर्किये",
      "hero.sub": "हम आपको अंतरराष्ट्रीय स्तर पर मान्यता प्राप्त अस्पतालों के बोर्ड-प्रमाणित सर्जनों से जोड़ते हैं — और बाकी सब कुछ हम संभालते हैं। एक निश्चित मूल्य में आपकी सर्जरी, होटल, ट्रांसफर और देखभाल शामिल है। एक निजी केयर कोऑर्डिनेटर आपकी पहली कॉल से लेकर पूर्ण रिकवरी तक आपके साथ रहता है।",
      "hero.cta1": "मुफ़्त कोटेशन पाएं", "hero.cta2": "उपचार और मूल्य देखें",
      "partner.perla.type": "डेंटल क्लिनिक — अंताल्या",
      "partner.perla.desc": "हमारा समर्पित डेंटल साझेदार — फुल-माउथ इम्प्लांट, विनियर और स्माइल मेकओवर, नीचे दिखाए गए छह विशेषज्ञों द्वारा।",
      "partner.perla.link": "डेंटल पैकेज और मूल्य →",
      "partner.acibadem.type": "अस्पताल समूह — इस्तांबुल",
      "partner.acibadem.desc": "तुर्की के सबसे बड़े निजी स्वास्थ्य समूहों में से एक — प्लास्टिक सर्जरी, नेत्र सर्जरी, हेयर ट्रांसप्लांट, मोटापा शल्यक्रिया, चेक-अप और इमेजिंग, सभी गहन चिकित्सा सुविधा वाले पूर्ण अस्पतालों में।",
      "partner.acibadem.link": "पूरी Acıbadem मूल्य सूची →",
      "partner.mp.type": "अस्पताल समूह — जल्द आ रहा है",
      "partner.mp.desc": "तुर्की के सबसे बड़े अस्पताल नेटवर्क में से एक — 13 शहरों में 25 से अधिक अस्पताल। हम अभी अपनी आधिकारिक साझेदार मूल्य सूची तैयार कर रहे हैं।",
      "partner.mp.link": "क्या अपेक्षा करें →",
      "footer.treatments": "उपचार", "footer.academy": "अकादमी", "footer.concierge": "कंसीयज",
      "footer.desc": "हम अमेरिका और कनाडा के मरीज़ों को तुर्की के सबसे प्रतिष्ठित सर्जनों से निजी तौर पर जोड़ते हैं — बीस वर्षों से अधिक के स्वास्थ्य पर्यटन अनुभव पर आधारित।"
    }
  };

  /* ── Stage 1: Why-Us pillars, stats, interludes, all section headings ── */
  var T1 = {
    tr: {
      "std.eyebrow": "HASTALARIN BİZE GÜVENME NEDENİ", "std.heading": "Güvenliğiniz tüm iş modelimizdir.",
      "std.lede": "Medikal seyahat, hiçbir şey şansa bırakılmadığında işe yarar. Kurucu ekibimiz sağlık turizminde yirmi yılı aşkın deneyime ve on yıllık uygulamalı diş hekimliği uzmanlığına sahiptir — risklerin nerede saklandığını biliyoruz, çünkü kariyerimizi onları ortadan kaldırmaya adadık. İşte sizi her adımda nasıl koruduğumuz — ve karar vermeden önce kendinizin nasıl doğrulayabileceği.",
      "std.p1h": "Kanıtlı, seçilmiş cerrahlar", "std.p1b": "Başvuran kliniklerin 10'da 1'inden azını kabul ediyoruz. Her cerrah board sertifikalıdır ve yalnızca JCI akreditasyonlu hastanelerde çalışır — önde gelen Amerikan hastanelerinin standardıyla aynı. Herhangi bir cerrahın belgelerini ve vaka geçmişini isteyin: ödeme yapmadan önce size gönderiyoruz.",
      "std.p2h": "Ödeme yapmadan cerrahınızla tanışın", "std.p2b": "Para el değiştirmeden önce gerçek cerrahınızla — bir satış temsilcisiyle değil — özel bir görüntülü görüşme. Bir şey ters gelirse ayrılırsınız. Depozito yok, baskı yok.",
      "std.p3h": "Yazılı, tek sabit fiyat", "std.p3b": "Ameliyat, hastane, otel, transferler, bakım — uçuş rezervasyonundan önce onaylanan her şey dahil tek teklif. Kabul ettiğiniz fiyat, ödediğiniz fiyattır. Asla sürpriz fatura yok.",
      "std.p4h": "Okyanusu aşan bakım", "std.p4b": "Eve döndükten sonra cerrahınızla planlı görüntülü kontroller, yerel doktorunuzla koordinasyon ve nadir bir düzeltme gerektiğinde yazılı bir plan.",
      "num.1": "ABD ve Kanada'dan hasta", "num.2": "Bizi tavsiye eder", "num.3": "JCI akreditasyonlu ortak hastane", "num.4": "Hasta başına ortalama tasarruf",
      "il.1": "“İyileşme bir hastane koridorundan çok —<br>Turkuaz Kıyı'yı andırmalı.”", "il.2": "“Burada bir vaka numarası değilsiniz.<br>Bir misafirsiniz.”", "il.3": "“Akdeniz üç bin yıldır<br>gezginleri iyileştiriyor.”",
      "treat.eyebrow": "TEDAVİLER VE FİYATLAR", "treat.heading": "Dört imza tedavi.<br><em>Ve arkalarında tam bir hastane.</em>",
      "partners.eyebrow": "ORTAKLARIMIZ", "partners.heading": "Emin ellerdesiniz.",
      "faculty.eyebrow": "DİŞ HEKİMLİĞİ KADROSU — PERLA DENTAL CLINICS", "faculty.lede": "Her biri board sertifikalı, bizzat görüşülmüş ve gelmeden önce vakanızı inceliyor.",
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
      "std.lede": "Medizinreisen funktionieren nur, wenn nichts dem Zufall überlassen wird. Unser Gründungsteam bringt über zwanzig Jahre Erfahrung im Gesundheitstourismus und ein Jahrzehnt praktische zahnmedizinische Expertise mit – wir wissen, wo die Risiken lauern, weil wir unsere Laufbahn darauf verwendet haben, sie zu beseitigen. So schützen wir Sie bei jedem Schritt – und das können Sie selbst überprüfen, bevor Sie sich zu etwas verpflichten.",
      "std.p1h": "Geprüfte Chirurgen – mit Nachweis", "std.p1b": "Wir nehmen weniger als 1 von 10 Kliniken an, die sich bewerben. Jeder Chirurg ist zertifiziert und operiert ausschließlich in JCI-akkreditierten Kliniken – demselben Standard führender amerikanischer Kliniken. Fragen Sie nach Qualifikationen und Fallhistorie eines Chirurgen: Wir senden sie, bevor Sie etwas bezahlen.",
      "std.p2h": "Lernen Sie Ihren Chirurgen kennen, bevor Sie zahlen", "std.p2b": "Eine private Videosprechstunde mit Ihrem tatsächlichen Chirurgen – nicht mit einem Verkäufer – bevor Geld fließt. Wenn sich etwas nicht richtig anfühlt, gehen Sie. Keine Anzahlung, kein Druck.",
      "std.p3h": "Ein Festpreis, schriftlich", "std.p3b": "Operation, Klinik, Hotel, Transfers, Nachsorge – ein Komplettangebot, bestätigt, bevor Sie Flüge buchen. Der Preis, den Sie annehmen, ist der Preis, den Sie zahlen. Niemals Überraschungsrechnungen.",
      "std.p4h": "Nachsorge über den Ozean hinweg", "std.p4b": "Geplante Video-Nachsorge mit Ihrem Chirurgen nach Ihrer Rückkehr, Abstimmung mit Ihrem Arzt vor Ort und ein schriftlicher Plan für den seltenen Fall einer nötigen Korrektur.",
      "num.1": "Patienten aus den USA und Kanada", "num.2": "Würden uns weiterempfehlen", "num.3": "JCI-akkreditierte Partnerkliniken", "num.4": "Durchschnittliche Ersparnis pro Patient",
      "il.1": "„Genesung sollte sich weniger wie ein Klinikflur anfühlen –<br>und mehr wie die Türkisküste.“", "il.2": "„Sie sind hier keine Fallnummer.<br>Sie sind ein Gast.“", "il.3": "„Das Mittelmeer heilt Reisende<br>seit dreitausend Jahren.“",
      "treat.eyebrow": "BEHANDLUNGEN & PREISE", "treat.heading": "Vier Kernbehandlungen.<br><em>Und eine ganze Klinik dahinter.</em>",
      "partners.eyebrow": "UNSERE PARTNER", "partners.heading": "In diesen Händen sind Sie.",
      "faculty.eyebrow": "DAS ZAHNÄRZTE-TEAM — PERLA DENTAL CLINICS", "faculty.lede": "Jeder zertifiziert, persönlich ausgewählt und prüft Ihren Fall, bevor Sie reisen.",
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
      "std.lede": "Le tourisme médical ne fonctionne que lorsque rien n'est laissé au hasard. Notre équipe fondatrice cumule plus de vingt ans dans le tourisme de santé et une décennie d'expertise dentaire concrète — nous savons où se cachent les risques, car nous avons passé notre carrière à les éliminer. Voici exactement comment nous vous protégeons à chaque étape — et ce que vous pouvez vérifier vous-même avant de vous engager.",
      "std.p1h": "Chirurgiens vérifiés — avec preuves", "std.p1b": "Nous acceptons moins d'une clinique sur 10 qui postulent. Chaque chirurgien est certifié et n'opère que dans des hôpitaux accrédités JCI — la même norme que les grands hôpitaux américains. Demandez les qualifications et l'historique de cas de tout chirurgien : nous vous les envoyons avant tout paiement.",
      "std.p2h": "Rencontrez votre chirurgien avant de payer", "std.p2b": "Une consultation vidéo privée avec votre véritable chirurgien — pas un commercial — avant tout échange d'argent. Si quelque chose vous gêne, vous partez. Aucun acompte, aucune pression.",
      "std.p3h": "Un prix fixe, par écrit", "std.p3b": "Chirurgie, hôpital, hôtel, transferts, suivi — un devis tout compris confirmé avant de réserver vos vols. Le prix que vous acceptez est celui que vous payez. Jamais de facture surprise.",
      "std.p4h": "Un suivi qui traverse l'océan", "std.p4b": "Des suivis vidéo programmés avec votre chirurgien après votre retour, une coordination avec votre médecin local et un plan écrit pour le rare cas où une correction serait nécessaire.",
      "num.1": "Patients des États-Unis et du Canada", "num.2": "Nous recommanderaient", "num.3": "Hôpitaux partenaires accrédités JCI", "num.4": "Économie moyenne par patient",
      "il.1": "« La convalescence devrait ressembler moins à un couloir d'hôpital —<br>et davantage à la Côte turquoise. »", "il.2": "« Ici, vous n'êtes pas un numéro de dossier.<br>Vous êtes un invité. »", "il.3": "« La Méditerranée soigne les voyageurs<br>depuis trois mille ans. »",
      "treat.eyebrow": "TRAITEMENTS & TARIFS", "treat.heading": "Quatre traitements phares.<br><em>Et tout un hôpital derrière.</em>",
      "partners.eyebrow": "NOS PARTENAIRES", "partners.heading": "Entre de bonnes mains.",
      "faculty.eyebrow": "L'ÉQUIPE DENTAIRE — PERLA DENTAL CLINICS", "faculty.lede": "Chacun certifié, sélectionné en personne, et examine votre cas avant votre départ.",
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
      "std.lede": "Медицинские поездки работают только тогда, когда ничто не оставлено на волю случая. Наша команда-основатель имеет более двадцати лет в медицинском туризме и десятилетие практической стоматологии — мы знаем, где скрываются риски, потому что всю карьеру их устраняли. Вот как именно мы защищаем вас на каждом шаге — и что вы можете проверить сами, прежде чем на что-либо решиться.",
      "std.p1h": "Проверенные хирурги — с доказательствами", "std.p1b": "Мы принимаем менее 1 из 10 клиник, подающих заявку. Каждый хирург сертифицирован и оперирует только в клиниках с аккредитацией JCI — тот же стандарт, что и у ведущих американских больниц. Запросите квалификацию и историю случаев любого хирурга: мы пришлём их до того, как вы что-либо оплатите.",
      "std.p2h": "Познакомьтесь с хирургом до оплаты", "std.p2b": "Частная видеоконсультация с вашим настоящим хирургом — не с менеджером по продажам — до того, как деньги перейдут из рук в руки. Если что-то не так, вы уходите. Без депозита, без давления.",
      "std.p3h": "Одна фиксированная цена, письменно", "std.p3b": "Операция, больница, отель, трансферы, уход — одно всё включающее предложение, подтверждённое до бронирования билетов. Цена, которую вы принимаете, — это цена, которую вы платите. Никаких неожиданных счетов.",
      "std.p4h": "Уход, что пересекает океан", "std.p4b": "Запланированные видеоконтроли с хирургом после возвращения домой, координация с вашим местным врачом и письменный план на редкий случай, если что-то потребует коррекции.",
      "num.1": "Пациентов из США и Канады", "num.2": "Рекомендовали бы нас", "num.3": "Партнёрских клиник с аккредитацией JCI", "num.4": "Средняя экономия на пациента",
      "il.1": "«Восстановление должно напоминать не больничный коридор —<br>а Бирюзовое побережье.»", "il.2": "«Здесь вы не номер в карте.<br>Вы — гость.»", "il.3": "«Средиземное море исцеляет путников<br>уже три тысячи лет.»",
      "treat.eyebrow": "ЛЕЧЕНИЕ И ЦЕНЫ", "treat.heading": "Четыре ключевых направления.<br><em>И целая больница за ними.</em>",
      "partners.eyebrow": "НАШИ ПАРТНЁРЫ", "partners.heading": "Вы в надёжных руках.",
      "faculty.eyebrow": "СТОМАТОЛОГИЧЕСКАЯ КОМАНДА — PERLA DENTAL CLINICS", "faculty.lede": "Каждый сертифицирован, лично отобран и изучает ваш случай до поездки.",
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
      "std.lede": "只有当一切都不留给偶然，医疗旅行才行得通。我们的创始团队拥有二十多年的健康旅游经验和十年的一线牙科专业积累——我们知道风险藏在哪里，因为我们的职业生涯都在消除它们。以下正是我们在每一步如何保护您——以及在您做出任何决定之前，您可以自行核实的内容。",
      "std.p1h": "经过筛选的外科医生——有据可查", "std.p1b": "在申请的诊所中，我们接受的不到十分之一。每位外科医生均具备资质，且只在通过 JCI 认证的医院手术——与美国顶尖医院相同的标准。索取任何一位医生的资历与病例记录：我们会在您付款之前发送给您。",
      "std.p2h": "付款前先与您的医生见面", "std.p2b": "在任何款项交付之前，与您真正的主刀医生——而非销售人员——进行一对一视频咨询。若有任何不妥，您可随时离开。无需押金，绝无压力。",
      "std.p3h": "一个固定价格，白纸黑字", "std.p3b": "手术、医院、酒店、接送、术后护理——在您预订机票之前确认的一体化报价。您接受的价格，就是您支付的价格。绝无意外账单。",
      "std.p4h": "跨越大洋的术后关怀", "std.p4b": "回国后与您的医生进行预约视频随访，与您的当地医生协调，并为极少数需要修整的情况提供书面方案。",
      "num.1": "来自美国和加拿大的患者", "num.2": "愿意推荐我们", "num.3": "JCI 认证的合作医院", "num.4": "每位患者平均节省",
      "il.1": "“康复不该像医院走廊——<br>而更像绿松石海岸。”", "il.2": "“在这里，您不是一个病例编号。<br>您是一位贵宾。”", "il.3": "“地中海治愈旅人，<br>已有三千年。”",
      "treat.eyebrow": "诊疗项目与价格", "treat.heading": "四项招牌诊疗。<br><em>背后是一整所医院。</em>",
      "partners.eyebrow": "合作伙伴", "partners.heading": "值得托付的双手。",
      "faculty.eyebrow": "牙科团队 — PERLA DENTAL CLINICS", "faculty.lede": "每位均具备资质、经亲自面谈，并在您出发前审阅您的病例。",
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
      "std.lede": "سفر درمانی تنها زمانی جواب می‌دهد که هیچ چیز به شانس واگذار نشود. تیم بنیان‌گذار ما بیش از بیست سال تجربه در گردشگری سلامت و یک دهه تخصص عملی دندان‌پزشکی دارد — می‌دانیم خطرها کجا پنهان‌اند، چون تمام حرفه‌مان را صرف حذف آن‌ها کرده‌ایم. این دقیقاً همان شیوه‌ای است که در هر گام از شما محافظت می‌کنیم — و آنچه می‌توانید پیش از هر تعهدی خودتان راستی‌آزمایی کنید.",
      "std.p1h": "جراحان تأییدشده — با مدرک", "std.p1b": "از هر ۱۰ کلینیک متقاضی، کمتر از ۱ مورد را می‌پذیریم. هر جراح دارای بورد تخصصی است و تنها در بیمارستان‌های دارای اعتبار JCI عمل می‌کند — همان استانداردی که بیمارستان‌های برتر آمریکا دارند. مدارک و سوابق پرونده هر جراح را بخواهید: پیش از هر پرداختی برایتان می‌فرستیم.",
      "std.p2h": "پیش از پرداخت با جراح‌تان دیدار کنید", "std.p2b": "یک مشاوره ویدیویی خصوصی با جراح واقعی شما — نه یک فروشنده — پیش از هر جابه‌جایی پول. اگر چیزی درست به نظر نرسید، کنار می‌کشید. بدون بیعانه، بدون فشار.",
      "std.p3h": "یک قیمت ثابت، کتبی", "std.p3b": "عمل، بیمارستان، هتل، ترانسفر، مراقبت پس از عمل — یک پیشنهاد همه‌شمول که پیش از رزرو پرواز تأیید می‌شود. قیمتی که می‌پذیرید همان است که می‌پردازید. هرگز صورتحساب غیرمنتظره‌ای در کار نیست.",
      "std.p4h": "مراقبتی که از اقیانوس می‌گذرد", "std.p4b": "پیگیری‌های ویدیویی برنامه‌ریزی‌شده با جراح‌تان پس از بازگشت به خانه، هماهنگی با پزشک محلی شما، و برنامه‌ای کتبی برای مورد نادری که نیاز به اصلاح داشته باشد.",
      "num.1": "بیمار از آمریکا و کانادا", "num.2": "ما را توصیه می‌کنند", "num.3": "بیمارستان همکار دارای اعتبار JCI", "num.4": "میانگین صرفه‌جویی هر بیمار",
      "il.1": "«بهبودی باید کمتر شبیه راهروی بیمارستان باشد —<br>و بیشتر شبیه ساحل فیروزه‌ای.»", "il.2": "«اینجا شما یک شماره پرونده نیستید.<br>شما یک مهمان هستید.»", "il.3": "«مدیترانه سه هزار سال است<br>مسافران را شفا می‌دهد.»",
      "treat.eyebrow": "درمان‌ها و قیمت‌ها", "treat.heading": "چهار درمان شاخص.<br><em>و یک بیمارستان کامل پشت آن‌ها.</em>",
      "partners.eyebrow": "شرکای ما", "partners.heading": "در دستانی مطمئن.",
      "faculty.eyebrow": "تیم دندان‌پزشکی — PERLA DENTAL CLINICS", "faculty.lede": "هر یک دارای بورد تخصصی، منتخب شخصی، و بررسی‌کننده پرونده شما پیش از سفر.",
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
      "std.lede": "मेडिकल यात्रा तभी काम करती है जब कुछ भी संयोग पर न छोड़ा जाए। हमारी संस्थापक टीम के पास स्वास्थ्य पर्यटन में बीस वर्षों से अधिक और व्यावहारिक दंत चिकित्सा में एक दशक का अनुभव है — हम जानते हैं कि जोखिम कहाँ छिपते हैं, क्योंकि हमने अपना करियर उन्हें दूर करने में बिताया है। यहाँ ठीक वही है कि हम हर कदम पर आपकी रक्षा कैसे करते हैं — और किसी भी बात के लिए प्रतिबद्ध होने से पहले आप स्वयं क्या सत्यापित कर सकते हैं।",
      "std.p1h": "प्रमाण सहित परखे गए सर्जन", "std.p1b": "आवेदन करने वाले क्लीनिकों में से हम 10 में से 1 से भी कम स्वीकार करते हैं। हर सर्जन बोर्ड-प्रमाणित है और केवल JCI-मान्यता प्राप्त अस्पतालों में ही ऑपरेट करता है — वही मानक जो अग्रणी अमेरिकी अस्पताल रखते हैं। किसी भी सर्जन की योग्यता और केस इतिहास माँगें: हम इन्हें आपके भुगतान से पहले भेजते हैं।",
      "std.p2h": "भुगतान से पहले अपने सर्जन से मिलें", "std.p2b": "कोई भी पैसा हाथ बदलने से पहले आपके वास्तविक सर्जन के साथ — किसी सेल्समैन के साथ नहीं — एक निजी वीडियो परामर्श। यदि कुछ ठीक न लगे, तो आप चले जाते हैं। कोई जमा राशि नहीं, कोई दबाव नहीं।",
      "std.p3h": "एक निश्चित मूल्य, लिखित में", "std.p3b": "सर्जरी, अस्पताल, होटल, ट्रांसफर, देखभाल — उड़ान बुक करने से पहले पुष्ट एक सर्व-समावेशी कोटेशन। जो मूल्य आप स्वीकार करते हैं, वही आप चुकाते हैं। कभी कोई चौंकाने वाला बिल नहीं।",
      "std.p4h": "महासागर पार करती देखभाल", "std.p4b": "घर लौटने के बाद आपके सर्जन के साथ निर्धारित वीडियो फ़ॉलो-अप, आपके स्थानीय डॉक्टर के साथ समन्वय, और उस दुर्लभ स्थिति के लिए एक लिखित योजना जब कुछ ठीक करने की ज़रूरत हो।",
      "num.1": "अमेरिका और कनाडा के मरीज़", "num.2": "हमारी अनुशंसा करेंगे", "num.3": "JCI-मान्यता प्राप्त साझेदार अस्पताल", "num.4": "प्रति मरीज़ औसत बचत",
      "il.1": "“रिकवरी अस्पताल के गलियारे जैसी कम —<br>और फ़िरोज़ा तट जैसी अधिक लगनी चाहिए।”", "il.2": "“यहाँ आप कोई केस नंबर नहीं हैं।<br>आप एक अतिथि हैं।”", "il.3": "“भूमध्य सागर यात्रियों को<br>तीन हज़ार वर्षों से चंगा कर रहा है।”",
      "treat.eyebrow": "उपचार और मूल्य", "treat.heading": "चार प्रमुख उपचार।<br><em>और उनके पीछे एक पूरा अस्पताल।</em>",
      "partners.eyebrow": "हमारे साझेदार", "partners.heading": "जिन हाथों में आप हैं।",
      "faculty.eyebrow": "डेंटल टीम — PERLA DENTAL CLINICS", "faculty.lede": "प्रत्येक बोर्ड-प्रमाणित, व्यक्तिगत रूप से चयनित, और आपकी यात्रा से पहले आपके केस की समीक्षा करते हुए।",
      "pricing.eyebrow": "मूल्य", "pricing.heading": "हर पैसे तक पारदर्शी।",
      "packages.eyebrow": "डेंटल पैकेज — अंताल्या", "packages.heading": "हर पैसा, मद-दर-मद।",
      "passage.eyebrow": "यह कैसे काम करता है", "passage.heading": "आपके द्वार से, और वापस।",
      "voices.eyebrow": "मरीज़ों की कहानियाँ", "voices.heading": "वे मरीज़ बनकर आए।<br>समर्थक बनकर लौटे।",
      "stories.eyebrow": "असली मरीज़ कहानियाँ", "stories.heading": "उन्हीं से सुनिए।",
      "faq.eyebrow": "ईमानदार उत्तर", "faq.heading": "हर समझदार मरीज़ के सवाल।",
      "inv.eyebrow": "शुरू करें", "inv.heading": "अपना मुफ़्त कोटेशन पाएं।"
    }
  };
  Object.keys(T1).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T1[l]).forEach(function (k) { T[l][k] = T1[l][k]; });
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
