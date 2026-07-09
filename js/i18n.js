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
      if (lang === "en" || v == null) n.el.innerHTML = n.orig;
      else n.el.textContent = v;
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
