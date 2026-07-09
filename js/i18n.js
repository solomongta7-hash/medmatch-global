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
  /* ── Stage 2: section intros, How-It-Works steps, testimonials ── */
  var T2 = {
    tr: {
      "treat.lede": "Adımızı, Türkiye'nin uzmanlarının gerçekten dünyaya öncülük ettiği dört işlemle kazandık — ziyaret ettiğimiz, denetlediğimiz ve sürekli izlediğimiz kliniklerde. Ortak hastane grubumuz Acıbadem aracılığıyla artık estetik cerrahi, göz cerrahisi, kilo verme işlemleri ve üst düzey check-up'ları da resmi hastane fiyatlarıyla düzenliyoruz.",
      "partners.lede": "Ziyaret ettiğimiz, denetlediğimiz ve sürekli izlediğimiz az sayıda ortakla çalışıyoruz — Antalya'da özel bir diş kliniği ve İstanbul'da Türkiye'nin en büyük hastane gruplarından biri; üçüncüsü yakında katılıyor. Tedaviniz ne olursa olsun uzmanınız bu çevreden gelir ve tüm belgeleri ödeme yapmadan önce sizinle paylaşılır.",
      "pricing.lede": "Tahmininizi aşağıda oluşturun — ülkenizdeki ortalama özel ödeme fiyatlarıyla dürüstçe karşılaştırılır. Diş ve diz tahminleri otel, VIP transfer ve kişisel bakım koordinatörünüzü içerir; Acıbadem tedavileri, yalnızca belirtildiğinde otel dahil olmak üzere resmi sabit hastane fiyatını gösterir.",
      "packages.lede": "Tedaviniz için doğrudan kliniğe ödeme yaparsınız — tıbbi fiyatlara asla ek yapmıyoruz. Otelinizi seçin, tüm dökümü görün ve daha uçak bileti almadan toplamınızı bilin.",
      "stories.lede": "Antalya'da birlikte çalıştığımız ortak klinik Perla Dental Clinics'ten gerçek sonuçlar. Videolar kliniğin resmi YouTube kanalında yayınlanmaktadır.",
      "faq.lede": "Yurt dışında ameliyat olmayı seçmek ciddi bir karardır ve rahatsız edici sorular dahil net yanıtları hak edersiniz. Bunlar ABD ve Kanada'daki hastalardan en çok duyduğumuz sorular. Sizinki burada yoksa bize yazın — bir satış temsilcisi değil, bir bakım koordinatörü bir gün içinde yanıtlar.",
      "inv.lede": "Neyi düşündüğünüzü bize anlatın. 48 saat içinde özel bir değerlendirme ve sabit, her şey dahil bir teklif alırsınız — ücretsiz, yükümlülük yok ve bilgileriniz asla paylaşılmaz.",
      "ps1h": "Danışma", "ps1b": "Evden özel bir görüntülü görüşme. Kayıtlarınız ve görüntüleriniz, herhangi bir öneri yapılmadan önce Çevre'den en az üç cerrah tarafından incelenir.",
      "ps2h": "Sabit Teklif", "ps2b": "Her şey dahil tek sabit teklif alırsınız — ameliyat, hastane, suit, transferler, ev sahibi. Kabul ettiğiniz fiyat ödediğiniz fiyattır. İmzalıdır ve nihaidir.",
      "ps3h": "Varış", "ps3b": "İstanbul'da uçağın kapısında karşılanırsınız. Boğaz'da beş yıldızlı bir otele özel transfer. Ev sahibiniz — akıcı, ölçülü, ulaşılabilir — bu andan itibaren yanınızdadır.",
      "ps4h": "İşlem", "ps4b": "İngilizce konuşan klinik ekibiyle JCI akreditasyonlu bir hastanede tedavi. Ev sahibiniz hastanede kalır; aileniz her aşamada bilgilendirilir.",
      "ps5h": "Dönüş", "ps5b": "Ayrılıştan önce uçuşa uygunluk kontrolleri, ardından cerrahınızla planlı görüntülü kontroller ve ABD veya Kanada'daki doktorlarınızla koordinasyon — bize ihtiyacınız olduğu sürece.",
      "v1q": "Manhattan'da kaplamalar için bana 31.000 dolar teklif edilmişti. MedMatch aynı işi — açıkçası daha iyisini — bunun beşte birine, Boğaz'da bir haftayla ayarladı. Ülkemdeki diş hekimim nerede yaptırdığımı sordu.", "v1cap": "New York — Diş Estetiği",
      "v2q": "Kimsenin söylemediği şey, yabancı bir hastanede yalnız olma korkusudur. Asla yalnız olmadım. Ayşe her sabah kapımın önündeydi. Dizim mükemmel; bakım evdekinden daha iyiydi.", "v2cap": "Dallas — Total Diz Protezi",
      "v3q": "Saç ekimimden iki yıl sonra cerrah hâlâ mesajlarımı bizzat yanıtlıyor. Bunu Vancouver'da — hangi fiyata olursa olsun — bulmayı deneyin. Bunu yapmanın tek yolu bu.", "v3cap": "Vancouver — Safir FUE"
    },
    de: {
      "treat.lede": "Wir haben uns mit den vier Eingriffen einen Namen gemacht, bei denen die Spezialisten der Türkei wirklich weltweit führend sind – in Kliniken, die wir besucht, geprüft und laufend überwachen. Über unsere Partnerklinikgruppe Acıbadem organisieren wir jetzt auch plastische Chirurgie, Augenchirurgie, Eingriffe zur Gewichtsreduktion und Vorsorge-Check-ups zu offiziellen Klinikpreisen.",
      "partners.lede": "Wir arbeiten mit wenigen Partnern, die wir besucht, geprüft und laufend überwacht haben – einer spezialisierten Zahnklinik in Antalya und einer der größten Klinikgruppen der Türkei in Istanbul, mit einer dritten in Kürze. Was auch immer Ihre Behandlung ist, Ihr Spezialist stammt aus diesem Kreis, und seine vollständigen Qualifikationen werden Ihnen vor der Zahlung mitgeteilt.",
      "pricing.lede": "Erstellen Sie unten Ihre Schätzung – ehrlich verglichen mit durchschnittlichen Selbstzahlerpreisen zu Hause. Schätzungen für Zähne und Knie umfassen Hotel, VIP-Transfers und Ihre persönliche Betreuungskoordinatorin; Acıbadem-Behandlungen zeigen den offiziellen Festpreis der Klinik, Hotel nur wo angegeben.",
      "packages.lede": "Sie zahlen die Behandlung direkt an die Klinik – wir schlagen niemals etwas auf medizinische Preise auf. Wählen Sie Ihr Hotel, sehen Sie die vollständige Aufschlüsselung und kennen Sie Ihre Gesamtsumme, bevor Sie einen Flug buchen.",
      "stories.lede": "Echte Ergebnisse von Perla Dental Clinics – der Partnerklinik, mit der wir in Antalya zusammenarbeiten. Die Videos werden auf dem offiziellen YouTube-Kanal der Klinik veröffentlicht.",
      "faq.lede": "Eine Operation im Ausland zu wählen ist eine ernste Entscheidung, und Sie verdienen klare Antworten – auch auf die unbequemen Fragen. Diese hören wir am häufigsten von Patienten in den USA und Kanada. Ist Ihre nicht dabei, schreiben Sie uns – eine Betreuungskoordinatorin, kein Verkäufer, antwortet innerhalb eines Tages.",
      "inv.lede": "Sagen Sie uns, was Sie in Betracht ziehen. Innerhalb von 48 Stunden erhalten Sie eine private Einschätzung und ein festes All-inclusive-Angebot – kostenlos, unverbindlich, und Ihre Daten werden niemals weitergegeben.",
      "ps1h": "Die Beratung", "ps1b": "Eine private Videosprechstunde von zu Hause. Ihre Unterlagen und Bilder werden von mindestens drei Chirurgen aus dem Kreis geprüft, bevor eine Empfehlung ausgesprochen wird.",
      "ps2h": "Das Festangebot", "ps2b": "Sie erhalten ein festes All-inclusive-Angebot – Operation, Klinik, Suite, Transfers, Betreuer. Der Preis, den Sie annehmen, ist der Preis, den Sie zahlen. Er ist unterzeichnet und endgültig.",
      "ps3h": "Die Ankunft", "ps3b": "Empfang an der Flugzeugtür in Istanbul. Privater Transfer zu einem Fünf-Sterne-Hotel am Bosporus. Ihr Betreuer – gewandt, diskret, erreichbar – ist ab diesem Moment bei Ihnen.",
      "ps4h": "Der Eingriff", "ps4b": "Behandlung in einer JCI-akkreditierten Klinik mit einem englischsprachigen Team. Ihr Betreuer bleibt in der Klinik; Ihre Familie wird in jeder Phase informiert.",
      "ps5h": "Die Rückkehr", "ps5b": "Flugtauglichkeitsprüfung vor der Abreise, dann geplante Video-Nachsorge mit Ihrem Chirurgen und Abstimmung mit Ihren Ärzten in den USA oder Kanada – so lange Sie uns brauchen.",
      "v1q": "In Manhattan wurden mir 31.000 $ für Veneers genannt. MedMatch organisierte dieselbe Arbeit – ehrlich gesagt, feinere Arbeit – für ein Fünftel davon, mit einer Woche am Bosporus. Mein Zahnarzt zu Hause fragte, wo ich es hatte machen lassen.", "v1cap": "New York — Dentale Ästhetik",
      "v2q": "Worüber niemand spricht, ist die Angst, allein in einem fremden Krankenhaus zu sein. Ich war es nie. Ayşe stand jeden Morgen vor meiner Tür. Mein Knie ist perfekt; die Betreuung war besser als zu Hause.", "v2cap": "Dallas — Totale Knieprothese",
      "v3q": "Zwei Jahre nach meiner Haartransplantation beantwortet der Chirurg meine Nachrichten noch immer selbst. Versuchen Sie das mal in Vancouver – zu welchem Preis auch immer. Nur so würde ich es je tun.", "v3cap": "Vancouver — Saphir-FUE"
    },
    fr: {
      "treat.lede": "Nous avons bâti notre réputation sur les quatre interventions où les spécialistes de la Turquie sont véritablement les meilleurs au monde — dans des cliniques que nous avons visitées, vérifiées et surveillons en continu. Grâce à notre groupe hospitalier partenaire Acıbadem, nous organisons désormais aussi la chirurgie esthétique, la chirurgie oculaire, les interventions d'amaigrissement et les bilans de santé, aux tarifs officiels de l'hôpital.",
      "partners.lede": "Nous travaillons avec un petit nombre de partenaires que nous avons visités, vérifiés et surveillons en continu — une clinique dentaire dédiée à Antalya et l'un des plus grands groupes hospitaliers de Turquie à Istanbul, un troisième arrivant bientôt. Quel que soit votre traitement, votre spécialiste vient de ce cercle, et ses qualifications complètes vous sont communiquées avant tout paiement.",
      "pricing.lede": "Établissez votre estimation ci-dessous — comparée honnêtement aux tarifs privés moyens de votre pays. Les estimations dentaires et du genou incluent l'hôtel, les transferts VIP et votre coordinatrice de soins ; les traitements Acıbadem affichent le prix fixe officiel de l'hôpital, hôtel inclus uniquement lorsque indiqué.",
      "packages.lede": "Vous payez la clinique directement pour votre traitement — nous ne majorons jamais les prix médicaux. Choisissez votre hôtel, consultez le détail complet et connaissez votre total avant même de réserver un vol.",
      "stories.lede": "De vrais résultats de Perla Dental Clinics — la clinique partenaire avec laquelle nous travaillons à Antalya. Les vidéos sont publiées sur la chaîne YouTube officielle de la clinique.",
      "faq.lede": "Choisir une opération à l'étranger est une décision sérieuse, et vous méritez des réponses franches — y compris aux questions inconfortables. Ce sont celles que nous entendons le plus de la part des patients aux États-Unis et au Canada. Si la vôtre n'y figure pas, écrivez-nous — une coordinatrice de soins, pas un commercial, vous répondra sous un jour.",
      "inv.lede": "Dites-nous ce que vous envisagez. Sous 48 heures, vous recevrez une évaluation privée et un devis fixe tout compris — gratuit, sans engagement, et vos données ne sont jamais partagées.",
      "ps1h": "La consultation", "ps1b": "Une consultation vidéo privée depuis chez vous. Vos dossiers et images sont examinés par au moins trois chirurgiens du Cercle avant toute recommandation.",
      "ps2h": "Le devis fixe", "ps2b": "Vous recevez un devis fixe tout compris — chirurgie, hôpital, suite, transferts, hôte. Le prix que vous acceptez est celui que vous payez. Il est signé, et il est définitif.",
      "ps3h": "L'arrivée", "ps3b": "Accueil à la porte de l'avion à Istanbul. Transfert privé vers un hôtel cinq étoiles sur le Bosphore. Votre hôte — à l'aise, discret, disponible — est à vos côtés dès cet instant.",
      "ps4h": "L'intervention", "ps4b": "Traitement dans un hôpital accrédité JCI avec une équipe anglophone. Votre hôte reste à l'hôpital ; votre famille reçoit des nouvelles à chaque étape.",
      "ps5h": "Le retour", "ps5b": "Contrôles d'aptitude au vol avant le départ, puis suivis vidéo programmés avec votre chirurgien et coordination avec vos médecins aux États-Unis ou au Canada — aussi longtemps que vous avez besoin de nous.",
      "v1q": "On m'a annoncé 31 000 $ pour des facettes à Manhattan. MedMatch a organisé le même travail — franchement, un travail plus fin — pour un cinquième de ce prix, avec une semaine sur le Bosphore. Mon dentiste chez moi m'a demandé où je l'avais fait faire.", "v1cap": "New York — Esthétique dentaire",
      "v2q": "Ce dont personne ne parle, c'est la peur d'être seul dans un hôpital étranger. Je ne l'ai jamais été. Ayşe était devant ma porte chaque matin. Mon genou est parfait ; les soins étaient meilleurs qu'à la maison.", "v2cap": "Dallas — Prothèse totale du genou",
      "v3q": "Deux ans après ma greffe de cheveux, le chirurgien répond encore lui-même à mes messages. Essayez d'obtenir cela à Vancouver — à n'importe quel prix. C'est la seule façon dont je le referais.", "v3cap": "Vancouver — FUE Saphir"
    },
    ru: {
      "treat.lede": "Мы завоевали имя на четырёх процедурах, в которых специалисты Турции действительно ведущие в мире — в клиниках, которые мы посетили, проверили и постоянно контролируем. Через нашу партнёрскую больничную группу Acıbadem мы теперь также организуем пластическую хирургию, офтальмологию, процедуры для снижения веса и чек-апы по официальным ценам больницы.",
      "partners.lede": "Мы работаем с небольшим числом партнёров, которых посетили, проверили и постоянно контролируем — специализированной стоматологической клиникой в Анталье и одной из крупнейших больничных групп Турции в Стамбуле; третья присоединится скоро. Каким бы ни было ваше лечение, ваш специалист из этого круга, и его полная квалификация предоставляется вам до оплаты.",
      "pricing.lede": "Составьте свою оценку ниже — честно сравнённую со средними ценами частной оплаты у вас дома. Оценки по стоматологии и колену включают отель, VIP-трансферы и вашего личного координатора; лечение в Acıbadem показывает официальную фиксированную цену больницы, отель включён только там, где указано.",
      "packages.lede": "Вы платите за лечение напрямую клинике — мы никогда не наценяем медицинские цены. Выберите отель, посмотрите полную разбивку и узнайте итог ещё до того, как купите билет.",
      "stories.lede": "Реальные результаты из Perla Dental Clinics — партнёрской клиники, с которой мы работаем в Анталье. Видео публикуются на официальном YouTube-канале клиники.",
      "faq.lede": "Выбор операции за рубежом — серьёзное решение, и вы заслуживаете прямых ответов, в том числе на неудобные вопросы. Эти мы чаще всего слышим от пациентов из США и Канады. Если вашего здесь нет, напишите нам — координатор по уходу, а не продавец, ответит в течение дня.",
      "inv.lede": "Расскажите, что вы рассматриваете. В течение 48 часов вы получите частную оценку и фиксированное предложение «всё включено» — бесплатно, без обязательств, и ваши данные никогда не передаются.",
      "ps1h": "Консультация", "ps1b": "Частная видеоконсультация из дома. Ваши записи и снимки изучают не менее трёх хирургов из Круга, прежде чем дать какую-либо рекомендацию.",
      "ps2h": "Фиксированное предложение", "ps2b": "Вы получаете одно фиксированное предложение «всё включено» — операция, больница, люкс, трансферы, сопровождающий. Цена, которую вы принимаете, — это цена, которую вы платите. Оно подписано и окончательно.",
      "ps3h": "Прибытие", "ps3b": "Встреча у двери самолёта в Стамбуле. Частный трансфер в пятизвёздочный отель на Босфоре. Ваш сопровождающий — свободно говорящий, деликатный, на связи — рядом с вами с этого момента.",
      "ps4h": "Процедура", "ps4b": "Лечение в аккредитованной JCI больнице с англоговорящей клинической командой. Ваш сопровождающий остаётся в больнице; ваша семья получает обновления на каждом этапе.",
      "ps5h": "Возвращение", "ps5b": "Проверка готовности к полёту перед вылетом, затем плановые видеонаблюдения с вашим хирургом и координация с вашими врачами в США или Канаде — столько, сколько мы вам нужны.",
      "v1q": "В Манхэттене мне назвали 31 000 $ за виниры. MedMatch организовал ту же работу — честно, более тонкую — за пятую часть этой суммы, с неделей на Босфоре. Мой стоматолог дома спросил, где я это сделала.", "v1cap": "Нью-Йорк — Эстетическая стоматология",
      "v2q": "О чём никто не говорит — это страх остаться одному в чужой больнице. Я никогда не был один. Айше была у моей двери каждое утро. Моё колено идеально; уход был лучше, чем дома.", "v2cap": "Даллас — Тотальное протезирование колена",
      "v3q": "Через два года после пересадки волос хирург всё ещё сам отвечает на мои сообщения. Попробуйте получить такое в Ванкувере — за любые деньги. Только так я бы это и сделал.", "v3cap": "Ванкувер — Сапфировая FUE"
    },
    zh: {
      "treat.lede": "我们凭借四项土耳其专家真正领先世界的手术树立了口碑——都在我们亲自走访、审核并持续监督的诊所进行。通过合作医院集团 Acıbadem，我们如今还以官方医院价格安排整形外科、眼科手术、减重项目和高端体检。",
      "partners.lede": "我们只与少数经我们走访、审核并持续监督的伙伴合作——安塔利亚一家专属牙科诊所，以及伊斯坦布尔土耳其最大的医院集团之一，第三家即将加入。无论您接受何种治疗，您的专家都来自这个圈子，其完整资历会在您付款前与您分享。",
      "pricing.lede": "在下方建立您的估价——与您本国的平均自费价格诚实对比。牙科和膝关节的估价包含酒店、VIP 接送和您的专属护理协调员；Acıbadem 项目显示官方固定的医院价格，仅在注明处含酒店。",
      "packages.lede": "您直接向诊所支付治疗费用——我们绝不在医疗价格上加价。选择您的酒店，查看完整明细，在预订机票之前就知道您的总额。",
      "stories.lede": "来自 Perla Dental Clinics 的真实效果——我们在安塔利亚合作的伙伴诊所。视频发布于该诊所的官方 YouTube 频道。",
      "faq.lede": "选择出国手术是一个严肃的决定，您理应得到坦率的回答——包括那些令人不安的问题。这些是我们从美国和加拿大患者那里最常听到的问题。若这里没有您的问题，请联系我们——将由护理协调员而非销售人员，在一天之内回复。",
      "inv.lede": "告诉我们您正在考虑什么。48 小时内，您将收到一份私人评估和一份固定的全包报价——免费、无义务，且您的信息绝不外泄。",
      "ps1h": "咨询", "ps1b": "在家进行的一对一视频咨询。在做出任何建议之前，您的病历和影像至少由圈内三位外科医生审阅。",
      "ps2h": "固定报价", "ps2b": "您将收到一份固定的全包报价——手术、医院、套房、接送、专属陪同。您接受的价格就是您支付的价格。它已签署，且为最终版本。",
      "ps3h": "抵达", "ps3b": "在伊斯坦布尔于舱门迎接。专车接送至博斯普鲁斯海峡畔的五星级酒店。您的陪同——语言流利、谨慎、随时待命——从这一刻起与您同行。",
      "ps4h": "手术", "ps4b": "在通过 JCI 认证的医院、由讲英语的临床团队进行治疗。您的陪同留在医院；您的家人在每个阶段都收到进展通报。",
      "ps5h": "归程", "ps5b": "离境前进行适飞检查，随后与您的医生进行预约视频随访，并与您在美国或加拿大的医生协调——只要您需要我们。",
      "v1q": "在曼哈顿，贴面报价 31,000 美元。MedMatch 安排了同样的——老实说，更精细的——工作，价格只有五分之一，还在博斯普鲁斯海峡度过一周。我家乡的牙医问我是在哪里做的。", "v1cap": "纽约 — 牙齿美学",
      "v2q": "没有人告诉你的，是独自身处异国医院的恐惧。我从未孤单。Ayşe 每天早晨都在我门外。我的膝盖很完美；护理比在家还好。", "v2cap": "达拉斯 — 全膝关节置换",
      "v3q": "植发两年后，医生仍亲自回复我的消息。在温哥华试试看——无论出多少钱。这是我唯一愿意选择的方式。", "v3cap": "温哥华 — 蓝宝石 FUE"
    },
    fa: {
      "treat.lede": "نام خود را با چهار روشی ساختیم که متخصصان ترکیه واقعاً در جهان پیشتاز هستند — در کلینیک‌هایی که بازدید، بررسی و به‌طور مداوم پایش کرده‌ایم. از طریق گروه بیمارستانی همکارمان آجی‌بادم، اکنون جراحی زیبایی، جراحی چشم، روش‌های کاهش وزن و چکاپ‌های تخصصی را نیز با قیمت‌های رسمی بیمارستان ترتیب می‌دهیم.",
      "partners.lede": "با شمار اندکی از شرکا کار می‌کنیم که بازدید، بررسی و به‌طور مداوم پایش کرده‌ایم — یک کلینیک تخصصی دندان‌پزشکی در آنتالیا و یکی از بزرگ‌ترین گروه‌های بیمارستانی ترکیه در استانبول، و سومی به‌زودی می‌پیوندد. درمان شما هرچه باشد، متخصص شما از همین حلقه است و مدارک کامل او پیش از پرداخت با شما در میان گذاشته می‌شود.",
      "pricing.lede": "برآورد خود را در پایین بسازید — به‌صورت صادقانه با میانگین قیمت‌های پرداخت خصوصی در کشورتان مقایسه می‌شود. برآوردهای دندان و زانو شامل هتل، ترانسفر ویژه و هماهنگ‌کننده شخصی شماست؛ درمان‌های آجی‌بادم قیمت ثابت رسمی بیمارستان را نشان می‌دهند، هتل تنها در جایی که ذکر شده.",
      "packages.lede": "هزینه درمان را مستقیماً به کلینیک می‌پردازید — ما هرگز روی قیمت‌های پزشکی سود نمی‌گذاریم. هتل خود را انتخاب کنید، جزئیات کامل را ببینید و پیش از رزرو پرواز، مجموع هزینه را بدانید.",
      "stories.lede": "نتایج واقعی از Perla Dental Clinics — کلینیک همکاری که در آنتالیا با آن کار می‌کنیم. ویدیوها در کانال رسمی یوتیوب کلینیک منتشر می‌شوند.",
      "faq.lede": "انتخاب جراحی در خارج تصمیمی جدی است و شما سزاوار پاسخ‌های صریح هستید — از جمله به پرسش‌های ناخوشایند. این‌ها پرسش‌هایی است که بیشتر از بیماران آمریکا و کانادا می‌شنویم. اگر پرسش شما اینجا نیست، برایمان پیام بفرستید — یک هماهنگ‌کننده مراقبت، نه یک فروشنده، ظرف یک روز پاسخ می‌دهد.",
      "inv.lede": "به ما بگویید چه چیزی را در نظر دارید. ظرف ۴۸ ساعت یک ارزیابی خصوصی و یک پیشنهاد ثابت همه‌شمول دریافت می‌کنید — رایگان، بدون تعهد، و اطلاعات شما هرگز به اشتراک گذاشته نمی‌شود.",
      "ps1h": "مشاوره", "ps1b": "یک مشاوره ویدیویی خصوصی از خانه. پرونده و تصاویر شما پیش از هر توصیه‌ای دست‌کم توسط سه جراح از حلقه بررسی می‌شود.",
      "ps2h": "پیشنهاد ثابت", "ps2b": "یک پیشنهاد ثابت همه‌شمول دریافت می‌کنید — عمل، بیمارستان، سوئیت، ترانسفر، میزبان. قیمتی که می‌پذیرید همان است که می‌پردازید. امضا شده و نهایی است.",
      "ps3h": "ورود", "ps3b": "در استانبول کنار درِ هواپیما استقبال می‌شوید. ترانسفر خصوصی به هتلی پنج‌ستاره در کنار بسفر. میزبان شما — مسلط، مبادی آداب، در دسترس — از این لحظه در کنار شماست.",
      "ps4h": "عمل", "ps4b": "درمان در بیمارستانی دارای اعتبار JCI با تیم بالینی انگلیسی‌زبان. میزبان شما در بیمارستان می‌ماند؛ خانواده‌تان در هر مرحله به‌روز می‌شود.",
      "ps5h": "بازگشت", "ps5b": "بررسی آمادگی پرواز پیش از حرکت، سپس پیگیری‌های ویدیویی برنامه‌ریزی‌شده با جراح‌تان و هماهنگی با پزشکان شما در آمریکا یا کانادا — تا هر زمان که به ما نیاز دارید.",
      "v1q": "در منهتن برای لمینت به من ۳۱٬۰۰۰ دلار پیشنهاد شد. مدمچ همان کار را — راستش، ظریف‌تر — با یک‌پنجم آن مبلغ و یک هفته کنار بسفر ترتیب داد. دندان‌پزشکم در وطنم پرسید کجا انجامش داده‌ام.", "v1cap": "نیویورک — زیبایی دندان",
      "v2q": "چیزی که هیچ‌کس به شما نمی‌گوید، ترس از تنها بودن در بیمارستانی بیگانه است. من هرگز تنها نبودم. آیشه هر روز صبح پشت درِ من بود. زانویم عالی است؛ مراقبت از خانه بهتر بود.", "v2cap": "دالاس — تعویض کامل زانو",
      "v3q": "دو سال پس از کاشت مویم، جراح هنوز خودش به پیام‌هایم پاسخ می‌دهد. این را در ونکوور — به هر قیمتی — پیدا کنید. تنها راهی که حاضرم انجامش دهم همین است.", "v3cap": "ونکوور — FUE یاقوتی"
    },
    hi: {
      "treat.lede": "हमने अपना नाम उन चार प्रक्रियाओं से बनाया जिनमें तुर्की के विशेषज्ञ वास्तव में दुनिया में अग्रणी हैं — उन क्लीनिकों में जिन्हें हमने देखा, परखा और लगातार निगरानी में रखा है। अपने साझेदार अस्पताल समूह Acıbadem के माध्यम से, हम अब आधिकारिक अस्पताल मूल्यों पर प्लास्टिक सर्जरी, नेत्र सर्जरी, वज़न-घटाने की प्रक्रियाएँ और एग्ज़ीक्यूटिव चेक-अप भी व्यवस्थित करते हैं।",
      "partners.lede": "हम कुछ ही साझेदारों के साथ काम करते हैं जिन्हें हमने देखा, परखा और लगातार निगरानी में रखा है — अंताल्या में एक समर्पित डेंटल क्लिनिक और इस्तांबुल में तुर्की के सबसे बड़े अस्पताल समूहों में से एक, तीसरा जल्द जुड़ रहा है। आपका उपचार कुछ भी हो, आपका विशेषज्ञ इसी दायरे से आता है, और उसकी पूरी योग्यता आपके भुगतान से पहले आपके साथ साझा की जाती है।",
      "pricing.lede": "नीचे अपना अनुमान बनाएं — आपके देश की औसत निजी-भुगतान कीमतों से ईमानदारी से तुलना की गई। डेंटल और घुटने के अनुमान में होटल, VIP ट्रांसफर और आपका निजी केयर कोऑर्डिनेटर शामिल है; Acıbadem उपचार आधिकारिक निश्चित अस्पताल मूल्य दिखाते हैं, होटल केवल वहीं शामिल जहाँ बताया गया है।",
      "packages.lede": "आप अपने उपचार के लिए सीधे क्लिनिक को भुगतान करते हैं — हम चिकित्सा कीमतों पर कभी मार्कअप नहीं करते। अपना होटल चुनें, पूरा विवरण देखें, और उड़ान बुक करने से पहले ही अपना कुल जान लें।",
      "stories.lede": "Perla Dental Clinics से असली परिणाम — वह साझेदार क्लिनिक जिसके साथ हम अंताल्या में काम करते हैं। वीडियो क्लिनिक के आधिकारिक YouTube चैनल पर प्रकाशित हैं।",
      "faq.lede": "विदेश में सर्जरी चुनना एक गंभीर निर्णय है, और आप सीधे उत्तर के हकदार हैं — असहज प्रश्नों के भी। ये वे प्रश्न हैं जो हम अमेरिका और कनाडा के मरीज़ों से सबसे अधिक सुनते हैं। यदि आपका यहाँ नहीं है, तो हमें संदेश करें — एक केयर कोऑर्डिनेटर, कोई सेल्समैन नहीं, एक दिन के भीतर उत्तर देगा।",
      "inv.lede": "हमें बताएं कि आप क्या विचार कर रहे हैं। 48 घंटों के भीतर आपको एक निजी मूल्यांकन और एक निश्चित, सर्व-समावेशी कोटेशन मिलेगा — मुफ़्त, बिना बाध्यता, और आपकी जानकारी कभी साझा नहीं की जाती।",
      "ps1h": "परामर्श", "ps1b": "घर से एक निजी वीडियो परामर्श। कोई भी सिफ़ारिश करने से पहले आपके रिकॉर्ड और छवियों की समीक्षा सर्कल के कम से कम तीन सर्जन करते हैं।",
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
      "t2.title": "Diş Kaplama ve İmplantları", "t2.desc": "5–7 günde eksiksiz bir gülüş tasarımı; ülkenizdeki diş hekiminizin kullandığı aynı premium markalarla — E-max, zirkonya, Straumann. Bir dişe dokunulmadan önce yeni gülüşünüzün dijital ön izlemesini onaylarsınız.", "t2.unit": "gülüş tasarımı", "t2.save": "ABD'DE $15,000–$30,000",
      "t3.title": "Diz Cerrahisi ve Protezi", "t3.desc": "Aynı ABD üretimi implantlar — Zimmer Biomet, Smith+Nephew — yüksek hacimli ortopedi ekiplerince yerleştirilir; eve dönmeden önce iyileşme otelinizde günlük fizyoterapi ile.", "t3.save": "ABD'DE $30,000–$50,000",
      "t4.title": "Saç Ekimi", "t4.desc": "İstanbul dünyanın saç ekimi başkentidir. İşleminiz bir teknisyen değil, cerrah tarafından yapılır — doğal saç çizgisi tasarımı ve yazılı büyüme garantisiyle.", "t4.unit": "her şey dahil paket", "t4.save": "ABD'DE $12,000–$20,000",
      "t5.title": "Dördün Ötesinde — Acıbadem ile", "t5.desc": "Estetik cerrahi, iLASIK ve SMILE göz cerrahisi, mide balonu ve tüpü, üst düzey check-up'lar ve ileri görüntüleme — Türkiye'nin en büyük hastane gruplarından biri olan Acıbadem'de, doğrudan hastaneye ödenen resmi fiyatlarla.", "t5.unit": "hastane fiyat listesi", "t5.save": "60+ İŞLEM, YAZILI FİYATLI", "t5.includes": "Otel yalnızca belirtildiğinde dahildir — bize ödediğiniz tek şey sabit 300 $ ücretidir.", "t5.cta": "Tüm Fiyat Listesini Gör"
    },
    de: {
      "t.from": "ab", "t.calc": "Meinen Preis berechnen", "t.allinc": "All-inclusive",
      "t.includes": "Festpreis inklusive Operation, Klinik, Hotel, Transfers und Nachsorge.",
      "t1.title": "Nasenkorrektur (Rhinoplastik)", "t1.desc": "Die Nasenchirurgen der Türkei zählen zu den erfahrensten überhaupt – viele führen in einem Jahr mehr Rhinoplastiken durch als ein typischer US-Chirurg in einem Jahrzehnt. Ultraschall- und Erhaltungstechniken sind Standard.", "t1.save": "IN DEN USA $8,000–$15,000",
      "t2.title": "Zahnveneers & Implantate", "t2.desc": "Ein komplettes Smile-Makeover in 5–7 Tagen, mit denselben Premiummarken wie Ihr Zahnarzt zu Hause – E-max, Zirkon, Straumann. Sie genehmigen eine digitale Vorschau Ihres neuen Lächelns, bevor ein Zahn berührt wird.", "t2.unit": "Smile-Makeover", "t2.save": "IN DEN USA $15,000–$30,000",
      "t3.title": "Kniechirurgie & Prothese", "t3.desc": "Dieselben in den USA gefertigten Implantate – Zimmer Biomet, Smith+Nephew – eingesetzt von erfahrenen Orthopädie-Teams, mit täglicher Physiotherapie in Ihrem Genesungshotel, bevor Sie heimfliegen.", "t3.save": "IN DEN USA $30,000–$50,000",
      "t4.title": "Haartransplantation", "t4.desc": "Istanbul ist die Welthauptstadt der Haartransplantation. Ihr Eingriff wird vom Chirurgen durchgeführt – nicht von einem Techniker – mit natürlichem Haaransatz-Design und schriftlicher Wachstumsgarantie.", "t4.unit": "All-inclusive-Paket", "t4.save": "IN DEN USA $12,000–$20,000",
      "t5.title": "Über die vier hinaus – mit Acıbadem", "t5.desc": "Plastische Chirurgie, iLASIK- & SMILE-Augenchirurgie, Magenballon und -schlauch, Vorsorge-Check-ups und moderne Bildgebung – bei Acıbadem, einer der größten Klinikgruppen der Türkei, zu offiziellen, direkt an die Klinik gezahlten Preisen.", "t5.unit": "Klinik-Preisliste", "t5.save": "60+ EINGRIFFE, SCHRIFTLICH BEPREIST", "t5.includes": "Hotel nur wo angegeben inklusive – unsere feste Gebühr von 300 $ ist das Einzige, was Sie uns zahlen.", "t5.cta": "Vollständige Preisliste ansehen"
    },
    fr: {
      "t.from": "à partir de", "t.calc": "Calculer mon prix", "t.allinc": "tout compris",
      "t.includes": "Prix fixe incluant chirurgie, hôpital, hôtel, transferts et suivi.",
      "t1.title": "Rhinoplastie", "t1.desc": "Les chirurgiens du nez de Turquie comptent parmi les plus expérimentés au monde — beaucoup réalisent plus de rhinoplasties en un an qu'un chirurgien américain typique en une décennie. Les techniques ultrasoniques et de préservation sont la norme.", "t1.save": "AUX É.-U. $8,000–$15,000",
      "t2.title": "Facettes & implants dentaires", "t2.desc": "Une transformation complète du sourire en 5 à 7 jours, avec les mêmes marques premium que votre dentiste chez vous — E-max, zircone, Straumann. Vous validez un aperçu numérique de votre nouveau sourire avant qu'on ne touche une dent.", "t2.unit": "transformation du sourire", "t2.save": "AUX É.-U. $15,000–$30,000",
      "t3.title": "Chirurgie & prothèse du genou", "t3.desc": "Les mêmes implants fabriqués aux États-Unis — Zimmer Biomet, Smith+Nephew — posés par des équipes orthopédiques à fort volume, avec kinésithérapie quotidienne à votre hôtel de convalescence avant votre retour.", "t3.save": "AUX É.-U. $30,000–$50,000",
      "t4.title": "Greffe de cheveux", "t4.desc": "Istanbul est la capitale mondiale de la restauration capillaire. Votre intervention est réalisée par le chirurgien — pas un technicien — avec un dessin naturel de la ligne frontale et une garantie de repousse écrite.", "t4.unit": "forfait tout compris", "t4.save": "AUX É.-U. $12,000–$20,000",
      "t5.title": "Au-delà des quatre — avec Acıbadem", "t5.desc": "Chirurgie esthétique, chirurgie oculaire iLASIK & SMILE, ballon et sleeve gastriques, bilans de santé et imagerie avancée — réalisés chez Acıbadem, l'un des plus grands groupes hospitaliers de Turquie, aux tarifs officiels payés directement à l'hôpital.", "t5.unit": "grille tarifaire de l'hôpital", "t5.save": "60+ INTERVENTIONS, TARIFS ÉCRITS", "t5.includes": "Hôtel inclus uniquement lorsque indiqué — nos frais fixes de 300 $ sont la seule chose que vous nous payez.", "t5.cta": "Voir toute la grille tarifaire"
    },
    ru: {
      "t.from": "от", "t.calc": "Рассчитать мою цену", "t.allinc": "всё включено",
      "t.includes": "Фиксированная цена включает операцию, больницу, отель, трансферы и уход.",
      "t1.title": "Ринопластика", "t1.desc": "Ринохирурги Турции — одни из самых опытных в мире: многие делают больше ринопластик за год, чем типичный американский хирург за десятилетие. Ультразвуковые и сберегающие техники — стандарт.", "t1.save": "В США $8,000–$15,000",
      "t2.title": "Виниры и импланты", "t2.desc": "Полное преображение улыбки за 5–7 дней с теми же премиум-брендами, что и у вашего стоматолога дома — E-max, цирконий, Straumann. Вы утверждаете цифровой предпросмотр новой улыбки, прежде чем коснутся хоть одного зуба.", "t2.unit": "преображение улыбки", "t2.save": "В США $15,000–$30,000",
      "t3.title": "Хирургия и протезирование колена", "t3.desc": "Те же импланты производства США — Zimmer Biomet, Smith+Nephew — устанавливают опытные ортопедические команды, с ежедневной физиотерапией в вашем отеле восстановления перед вылетом домой.", "t3.save": "В США $30,000–$50,000",
      "t4.title": "Пересадка волос", "t4.desc": "Стамбул — мировая столица восстановления волос. Вашу процедуру выполняет хирург, а не техник — с естественным дизайном линии роста и письменной гарантией роста.", "t4.unit": "пакет «всё включено»", "t4.save": "В США $12,000–$20,000",
      "t5.title": "За пределами четырёх — с Acıbadem", "t5.desc": "Пластическая хирургия, лазерная коррекция iLASIK и SMILE, желудочный баллон и рукавная резекция, чек-апы и современная диагностика — в Acıbadem, одной из крупнейших больничных групп Турции, по официальным ценам, оплачиваемым напрямую больнице.", "t5.unit": "прайс-лист больницы", "t5.save": "60+ ПРОЦЕДУР, ЦЕНЫ ПИСЬМЕННО", "t5.includes": "Отель включён только там, где указано — наш фиксированный сбор $300 — единственное, что вы платите нам.", "t5.cta": "Смотреть полный прайс-лист"
    },
    zh: {
      "t.from": "低至", "t.calc": "计算我的价格", "t.allinc": "全包",
      "t.includes": "固定价格包含手术、医院、酒店、接送和术后护理。",
      "t1.title": "鼻整形", "t1.desc": "土耳其的鼻整形医生是全球最有经验的之一——许多人一年完成的鼻整形手术，比美国普通医生十年还多。超声骨刀与保留式技术为标准配置。", "t1.save": "美国 $8,000–$15,000",
      "t2.title": "牙齿贴面与种植", "t2.desc": "5–7 天内完成一次彻底的微笑改造，采用与您本地牙医相同的高端品牌——E-max、氧化锆、Straumann。在动第一颗牙之前，您先审核新笑容的数字预览。", "t2.unit": "微笑改造", "t2.save": "美国 $15,000–$30,000",
      "t3.title": "膝关节手术与置换", "t3.desc": "同样的美国制造植入物——Zimmer Biomet、Smith+Nephew——由高手术量的骨科团队植入，回国前在您的康复酒店每日理疗。", "t3.save": "美国 $30,000–$50,000",
      "t4.title": "植发", "t4.desc": "伊斯坦布尔是世界植发之都。您的手术由医生亲自完成——而非技师——采用自然发际线设计并附书面生长保证。", "t4.unit": "全包套餐", "t4.save": "美国 $12,000–$20,000",
      "t5.title": "四项之外 — 携手 Acıbadem", "t5.desc": "整形外科、iLASIK 与 SMILE 眼科手术、胃球囊与胃缩小、高端体检与先进影像——在土耳其最大的医院集团之一 Acıbadem 完成，以直接支付给医院的官方价格。", "t5.unit": "医院价目表", "t5.save": "60+ 项目，明码标价", "t5.includes": "仅在注明处含酒店——您付给我们的只有固定的 300 美元费用。", "t5.cta": "查看完整价目表"
    },
    fa: {
      "t.from": "از", "t.calc": "محاسبه قیمت من", "t.allinc": "همه‌شمول",
      "t.includes": "قیمت ثابت شامل عمل، بیمارستان، هتل، ترانسفر و مراقبت است.",
      "t1.title": "جراحی بینی (رینوپلاستی)", "t1.desc": "جراحان بینی ترکیه از باتجربه‌ترین‌های جهان‌اند — بسیاری در یک سال بیش از یک جراح معمولی آمریکایی در یک دهه، رینوپلاستی انجام می‌دهند. تکنیک‌های اولتراسونیک و حفظ‌کننده استاندارد هستند.", "t1.save": "در آمریکا $8,000–$15,000",
      "t2.title": "لمینت و ایمپلنت دندان", "t2.desc": "طراحی کامل لبخند در ۵ تا ۷ روز، با همان برندهای برتری که دندان‌پزشک شما در وطن استفاده می‌کند — E-max، زیرکونیا، اشترومن. پیش از آنکه به دندانی دست بخورد، پیش‌نمایش دیجیتال لبخند جدیدتان را تأیید می‌کنید.", "t2.unit": "طراحی لبخند", "t2.save": "در آمریکا $15,000–$30,000",
      "t3.title": "جراحی و تعویض زانو", "t3.desc": "همان ایمپلنت‌های ساخت آمریکا — Zimmer Biomet، Smith+Nephew — توسط تیم‌های پرحجم ارتوپدی کار گذاشته می‌شوند، با فیزیوتراپی روزانه در هتل نقاهت شما پیش از بازگشت به خانه.", "t3.save": "در آمریکا $30,000–$50,000",
      "t4.title": "کاشت مو", "t4.desc": "استانبول پایتخت کاشت موی جهان است. عمل شما توسط جراح انجام می‌شود — نه یک تکنسین — با طراحی طبیعی خط مو و ضمانت کتبی رشد.", "t4.unit": "بسته همه‌شمول", "t4.save": "در آمریکا $12,000–$20,000",
      "t5.title": "فراتر از چهار — با آجی‌بادم", "t5.desc": "جراحی زیبایی، جراحی چشم iLASIK و SMILE، بالون و اسلیو معده، چکاپ‌های تخصصی و تصویربرداری پیشرفته — در آجی‌بادم، یکی از بزرگ‌ترین گروه‌های بیمارستانی ترکیه، با قیمت‌های رسمی که مستقیماً به بیمارستان پرداخت می‌شود.", "t5.unit": "فهرست قیمت بیمارستان", "t5.save": "بیش از ۶۰ روش، با قیمت مکتوب", "t5.includes": "هتل تنها در جایی که ذکر شده شامل است — تنها چیزی که به ما می‌پردازید هزینه ثابت ۳۰۰ دلاری است.", "t5.cta": "مشاهده فهرست کامل قیمت"
    },
    hi: {
      "t.from": "से", "t.calc": "मेरी कीमत जानें", "t.allinc": "सर्व-समावेशी",
      "t.includes": "निश्चित मूल्य में सर्जरी, अस्पताल, होटल, ट्रांसफर और देखभाल शामिल।",
      "t1.title": "राइनोप्लास्टी (नाक की सर्जरी)", "t1.desc": "तुर्की के नाक सर्जन दुनिया के सबसे अनुभवी सर्जनों में से हैं — कई एक वर्ष में उतनी राइनोप्लास्टी करते हैं जितनी एक सामान्य अमेरिकी सर्जन एक दशक में। अल्ट्रासोनिक और संरक्षण तकनीकें मानक हैं।", "t1.save": "अमेरिका में $8,000–$15,000",
      "t2.title": "डेंटल विनियर और इम्प्लांट", "t2.desc": "5–7 दिनों में पूर्ण स्माइल मेकओवर, उन्हीं प्रीमियम ब्रांडों से जो आपके घर का डेंटिस्ट उपयोग करता है — E-max, ज़िरकोनिया, Straumann। किसी दाँत को छूने से पहले आप अपनी नई मुस्कान का डिजिटल पूर्वावलोकन स्वीकृत करते हैं।", "t2.unit": "स्माइल मेकओवर", "t2.save": "अमेरिका में $15,000–$30,000",
      "t3.title": "घुटने की सर्जरी और प्रत्यारोपण", "t3.desc": "वही अमेरिका-निर्मित इम्प्लांट — Zimmer Biomet, Smith+Nephew — उच्च-मात्रा वाली ऑर्थोपेडिक टीमों द्वारा लगाए जाते हैं, घर लौटने से पहले आपके रिकवरी होटल में दैनिक फिज़ियोथेरेपी के साथ।", "t3.save": "अमेरिका में $30,000–$50,000",
      "t4.title": "हेयर ट्रांसप्लांट", "t4.desc": "इस्तांबुल दुनिया की हेयर-रेस्टोरेशन राजधानी है। आपकी प्रक्रिया किसी तकनीशियन द्वारा नहीं, बल्कि सर्जन द्वारा की जाती है — प्राकृतिक हेयरलाइन डिज़ाइन और लिखित ग्रोथ गारंटी के साथ।", "t4.unit": "सर्व-समावेशी पैकेज", "t4.save": "अमेरिका में $12,000–$20,000",
      "t5.title": "इन चार से आगे — Acıbadem के साथ", "t5.desc": "प्लास्टिक सर्जरी, iLASIK और SMILE नेत्र सर्जरी, गैस्ट्रिक स्लीव और बैलून, एग्ज़ीक्यूटिव चेक-अप और उन्नत इमेजिंग — तुर्की के सबसे बड़े अस्पताल समूहों में से एक Acıbadem में, सीधे अस्पताल को भुगतान की जाने वाली आधिकारिक कीमतों पर।", "t5.unit": "अस्पताल मूल्य सूची", "t5.save": "60+ प्रक्रियाएँ, लिखित मूल्य", "t5.includes": "होटल केवल वहीं शामिल जहाँ बताया गया है — हमें आप केवल निश्चित $300 शुल्क चुकाते हैं।", "t5.cta": "पूरी मूल्य सूची देखें"
    }
  };
  Object.keys(T3).forEach(function (l) {
    if (!T[l]) T[l] = {};
    Object.keys(T3[l]).forEach(function (k) { T[l][k] = T3[l][k]; });
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
