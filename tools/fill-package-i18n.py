# -*- coding: utf-8 -*-
# Translate the package catalogue into es / fr / de / tr.
#
# The catalogue was the last English hole in the site: ~105 sentences that
# scripts build at runtime, so they have no element to hang a hash on and go
# into registerText(), keyed by the English sentence itself.
#
# Data strings are matched BY INDEX against tools/_package-strings.json rather
# than retyped here, because they contain em-dashes and en-dashes that are easy
# to typo into a key that never matches. Regenerate that file first:
#
#   node tools/collect-package-strings.mjs --json
#   python tools/fill-package-i18n.py
#
# Proper nouns stay English on purpose: Straumann, Nobel Biocare, Ivoclar,
# E-max, All-on-4/6, DHI, FUE, MedMatch.

import io, json, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
LANGS = ["es", "fr", "de", "tr"]

# ── data-file strings, index-aligned to tools/_package-strings.json ────────
ES = [
 "1–2 días, una sola visita",
 "12 implantes — 6 por maxilar, ambos maxilares",
 "2 visitas, con 8–10 semanas de diferencia",
 "20 carillas Ivoclar E-max",
 "20 coronas premium de circonio",
 "3–4 días por visita",
 "TAC 3D y evaluación ósea",
 "TAC 3D y evaluación ósea completa",
 "TAC 3D y radiografía panorámica",
 "TAC 3D y simulación del tratamiento",
 "4 implantes premium — un maxilar",
 "5–6 días por visita",
 "5–7 días, una sola visita",
 "6 implantes premium — un maxilar",
 "6–7 días por visita",
 "Un juego completo de coronas premium de circonio: resistencia y estética para renovar toda la sonrisa.",
 "Una arcada fija completa sobre cuatro implantes: un maxilar totalmente restaurado, superior o inferior.",
 "Implantes dentales All-on-4 — un maxilar",
 "Implantes dentales All-on-6 — un maxilar",
 "Cuerpo",
 "Pecho",
 "Coronas",
 "Revisión dental y limpieza",
 "Previsualización del diseño digital de sonrisa",
 "Carillas E-max — juego de 20",
 "Cirugía ocular — hospital oftalmológico asociado",
 "Hospital de cirugía ocular — Estambul",
 "Rostro",
 "Relleno y lipofilling",
 "Puente definitivo de circonio en la 2.ª visita",
 "Puentes definitivos de circonio en la 2.ª visita",
 "Dientes provisionales fijos la misma semana",
 "Implantes de boca completa — ambos maxilares",
 "Renovación completa de la sonrisa (hasta 20 dientes)",
 "Hospital de trasplante capilar — Estambul",
 "Trasplante capilar — campus hospitalario",
 "Trasplante capilar — centro médico",
 "Chequeo médico",
 "Diseño de sonrisa Hollywood",
 "Hotel y traslados VIP cubiertos por la clínica",
 "Implantes",
 "Blanqueamiento láser en clínica: varios tonos más claro en una sola sesión.",
 "Sesión de blanqueamiento láser en clínica",
 "Lifting",
 "Liposucción",
 "Un diente ausente, restaurado de forma permanente: implante de titanio, pilar y corona de circonio.",
 "Grupo hospitalario asociado",
 "Tarifa de atención y coordinación al paciente",
 "Testimonio de paciente — próximamente",
 "El complemento perfecto para unas vacaciones",
 "El hospital cotiza los precios en euros (€) y se pagan directamente al hospital. Las noches de hotel solo se incluyen cuando se indica. Su atención y coordinación con MedMatch es una tarifa fija de atención y coordinación al paciente.",
 "Blanqueamiento dental profesional",
 "Radiología e imagen",
 "Segunda red hospitalaria",
 "Color ajustado por un ceramista maestro",
 "Clínica dental de referencia",
 "Implante dental unitario",
 "Seis implantes en un maxilar para la máxima estabilidad: el estándar de oro en la restauración de arcada completa.",
 "Diseño de sonrisa",
 "Implante Straumann o Nobel Biocare",
 "Campus quirúrgico y de chequeos — Estambul",
 "Kit de mantenimiento para casa",
 "Dientes provisionales mientras trabaja el laboratorio",
 "La transformación completa: coronas o carillas en toda la sonrisa visible, diseñadas para su rostro.",
 "Doce implantes en ambos maxilares: toda la boca restaurada sobre la base de arcada completa más estable que existe, con hotel y traslados cubiertos por la clínica.",
 "Porcelana E-max ultrafina, estratificada a mano: la carilla de aspecto más natural que existe.",
 "Carillas",
 "Pérdida de peso",
 "Blanqueamiento",
 "Blanqueamiento de los dientes restantes",
 "Radiografías y kit de cuidados posteriores incluidos",
 "Radiografías y análisis de la mordida incluidos",
 "Radiografías y sesión de prueba incluidas",
 "Corona de circonio incluida",
 "Coronas de circonio — juego completo",
]

FR = [
 "1–2 jours, une seule visite",
 "12 implants — 6 par mâchoire, les deux mâchoires",
 "2 visites, à 8–10 semaines d’intervalle",
 "20 facettes Ivoclar E-max",
 "20 couronnes premium en zircone",
 "3–4 jours par visite",
 "Scanner 3D et évaluation osseuse",
 "Scanner 3D et évaluation osseuse complète",
 "Scanner 3D et radiographie panoramique",
 "Scanner 3D et simulation du traitement",
 "4 implants premium — une mâchoire",
 "5–6 jours par visite",
 "5–7 jours, une seule visite",
 "6 implants premium — une mâchoire",
 "6–7 jours par visite",
 "Un jeu complet de couronnes premium en zircone — solidité et esthétique pour renouveler tout le sourire.",
 "Une arcade fixe complète sur quatre implants — une mâchoire entièrement restaurée, supérieure ou inférieure.",
 "Implants dentaires All-on-4 — une mâchoire",
 "Implants dentaires All-on-6 — une mâchoire",
 "Corps",
 "Poitrine",
 "Couronnes",
 "Bilan dentaire et détartrage",
 "Aperçu du design numérique du sourire",
 "Facettes E-max — lot de 20",
 "Chirurgie oculaire — hôpital ophtalmologique partenaire",
 "Hôpital de chirurgie oculaire — Istanbul",
 "Visage",
 "Comblement et lipofilling",
 "Bridge définitif en zircone à la 2e visite",
 "Bridges définitifs en zircone à la 2e visite",
 "Dents provisoires fixes la même semaine",
 "Implants bouche complète — les deux mâchoires",
 "Transformation complète du sourire (jusqu’à 20 dents)",
 "Hôpital de greffe de cheveux — Istanbul",
 "Greffe de cheveux — campus hospitalier",
 "Greffe de cheveux — centre médical",
 "Bilan de santé",
 "Transformation Hollywood Smile",
 "Hôtel et transferts VIP pris en charge par la clinique",
 "Implants",
 "Blanchiment au laser en clinique — plusieurs teintes plus clair en une seule séance.",
 "Séance de blanchiment au laser en clinique",
 "Lifting",
 "Liposuccion",
 "Une dent manquante, restaurée définitivement — implant en titane, pilier et couronne en zircone.",
 "Groupe hospitalier partenaire",
 "Frais de suivi et de coordination patient",
 "Témoignage de patient — bientôt disponible",
 "Le complément parfait à des vacances",
 "Les prix sont indiqués en euros (€) par l’hôpital et réglés directement à l’hôpital. Les nuits d’hôtel ne sont incluses que lorsque cela est précisé. Votre suivi et votre coordination avec MedMatch font l’objet de frais fixes de suivi et de coordination patient.",
 "Blanchiment dentaire professionnel",
 "Radiologie et imagerie",
 "Deuxième réseau hospitalier",
 "Teinte ajustée par un maître céramiste",
 "Partenaire dentaire de référence",
 "Implant dentaire unitaire",
 "Six implants dans une mâchoire pour une stabilité maximale — la référence en matière de restauration d’arcade complète.",
 "Transformation du sourire",
 "Implant Straumann ou Nobel Biocare",
 "Campus chirurgical et de bilans — Istanbul",
 "Kit d’entretien à emporter",
 "Dents provisoires pendant le travail du laboratoire",
 "La transformation complète — couronnes ou facettes sur tout le sourire visible, dessinées pour votre visage.",
 "Douze implants sur les deux mâchoires — toute votre bouche restaurée sur la base d’arcade complète la plus stable qui soit, hôtel et transferts pris en charge par la clinique.",
 "Porcelaine E-max ultrafine, stratifiée à la main — la facette la plus naturelle qui soit.",
 "Facettes",
 "Perte de poids",
 "Blanchiment",
 "Blanchiment des dents restantes",
 "Radiographies et kit de soins post-traitement inclus",
 "Radiographies et analyse de l’occlusion incluses",
 "Radiographies et séance d’essayage incluses",
 "Couronne en zircone incluse",
 "Couronnes en zircone — jeu complet",
]

DE = [
 "1–2 Tage, ein einziger Besuch",
 "12 Implantate — 6 pro Kiefer, beide Kiefer",
 "2 Besuche im Abstand von 8–10 Wochen",
 "20 Ivoclar E-max Veneers",
 "20 Premium-Zirkonkronen",
 "3–4 Tage pro Besuch",
 "3D-CT und Knochenbeurteilung",
 "3D-CT und vollständige Knochenbeurteilung",
 "3D-CT und Panoramaröntgen",
 "3D-CT und Behandlungssimulation",
 "4 Premium-Implantate — ein Kiefer",
 "5–6 Tage pro Besuch",
 "5–7 Tage, ein einziger Besuch",
 "6 Premium-Implantate — ein Kiefer",
 "6–7 Tage pro Besuch",
 "Ein kompletter Satz Premium-Zirkonkronen — Stabilität und Ästhetik für ein rundum erneuertes Lächeln.",
 "Ein komplett festsitzender Bogen auf vier Implantaten — ein Kiefer vollständig versorgt, oben oder unten.",
 "All-on-4 Zahnimplantate — ein Kiefer",
 "All-on-6 Zahnimplantate — ein Kiefer",
 "Körper",
 "Brust",
 "Kronen",
 "Zahnkontrolle und Reinigung",
 "Digitale Smile-Design-Vorschau",
 "E-max Veneers — 20er-Set",
 "Augenchirurgie — Partner-Augenklinik",
 "Augenklinik — Istanbul",
 "Gesicht",
 "Filler und Lipofilling",
 "Endgültige Zirkonbrücke beim 2. Besuch",
 "Endgültige Zirkonbrücken beim 2. Besuch",
 "Feste Provisorien in derselben Woche",
 "Implantate für den ganzen Mund — beide Kiefer",
 "Komplette Lächelerneuerung (bis zu 20 Zähne)",
 "Klinik für Haartransplantation — Istanbul",
 "Haartransplantation — Klinikcampus",
 "Haartransplantation — medizinisches Zentrum",
 "Gesundheits-Check-up",
 "Hollywood-Smile-Makeover",
 "Hotel und VIP-Transfers von der Klinik übernommen",
 "Implantate",
 "Laser-Bleaching in der Klinik — mehrere Nuancen heller in einer einzigen Sitzung.",
 "Laser-Bleaching-Sitzung in der Klinik",
 "Lifting",
 "Fettabsaugung",
 "Ein fehlender Zahn, dauerhaft ersetzt — Titanimplantat, Abutment und Zirkonkrone.",
 "Partner-Klinikgruppe",
 "Gebühr für Patientenbetreuung und Koordination",
 "Patientengeschichte — folgt in Kürze",
 "Die perfekte Ergänzung zum Urlaub",
 "Die Preise werden vom Krankenhaus in Euro (€) angegeben und direkt an das Krankenhaus gezahlt. Hotelnächte sind nur dort enthalten, wo dies angegeben ist. Ihre Betreuung und Koordination mit MedMatch erfolgt zu einer pauschalen Gebühr für Patientenbetreuung und Koordination.",
 "Professionelle Zahnaufhellung",
 "Radiologie und Bildgebung",
 "Zweites Kliniknetzwerk",
 "Farbe vom Meisterkeramiker angepasst",
 "Zahnärztlicher Hauptpartner",
 "Einzelzahnimplantat",
 "Sechs Implantate in einem Kiefer für maximale Stabilität — der Goldstandard für die Versorgung des ganzen Bogens.",
 "Smile Makeover",
 "Straumann- oder Nobel-Biocare-Implantat",
 "Chirurgie- und Check-up-Campus — Istanbul",
 "Pflegeset für zu Hause",
 "Provisorien, während das Labor arbeitet",
 "Die komplette Verwandlung — Kronen oder Veneers über Ihr sichtbares Lächeln, auf Ihr Gesicht abgestimmt.",
 "Zwölf Implantate in beiden Kiefern — Ihr ganzer Mund auf dem stabilsten Fundament für den vollen Bogen versorgt, Hotel und Transfers übernimmt die Klinik.",
 "Hauchdünnes, von Hand geschichtetes E-max-Porzellan — das natürlichste Veneer, das es gibt.",
 "Veneers",
 "Gewichtsabnahme",
 "Aufhellung",
 "Aufhellung der übrigen Zähne",
 "Röntgenaufnahmen und Nachsorge-Set inklusive",
 "Röntgenaufnahmen und Bissanalyse inklusive",
 "Röntgenaufnahmen und Einprobe inklusive",
 "Zirkonkrone inklusive",
 "Zirkonkronen — komplettes Set",
]

TR = [
 "1–2 gün, tek seferde",
 "12 implant — çene başına 6, iki çene",
 "2 ziyaret, arasında 8–10 hafta",
 "20 adet Ivoclar E-max lamina",
 "20 adet premium zirkonyum kron",
 "ziyaret başına 3–4 gün",
 "3D tomografi ve kemik değerlendirmesi",
 "3D tomografi ve tam kemik değerlendirmesi",
 "3D tomografi ve panoramik röntgen",
 "3D tomografi ve tedavi simülasyonu",
 "4 premium implant — tek çene",
 "ziyaret başına 5–6 gün",
 "5–7 gün, tek seferde",
 "6 premium implant — tek çene",
 "ziyaret başına 6–7 gün",
 "Tam takım premium zirkonyum kron — gülüşünüzü baştan yenileyen dayanıklılık ve estetik.",
 "Dört implant üzerine tam sabit çene — üst veya alt, bir çene bütünüyle yenilenir.",
 "All-on-4 diş implantı — tek çene",
 "All-on-6 diş implantı — tek çene",
 "Vücut",
 "Göğüs",
 "Kronlar",
 "Diş kontrolü ve temizliği",
 "Dijital gülüş tasarımı önizlemesi",
 "E-max lamina — 20’li set",
 "Göz cerrahisi — partner göz hastanesi",
 "Göz cerrahisi hastanesi — İstanbul",
 "Yüz",
 "Dolgu ve yağ enjeksiyonu",
 "2. ziyarette kalıcı zirkonyum köprü",
 "2. ziyarette kalıcı zirkonyum köprüler",
 "Aynı hafta sabit geçici dişler",
 "Tam ağız implant — iki çene",
 "Tam gülüş yenileme (20 dişe kadar)",
 "Saç ekimi hastanesi — İstanbul",
 "Saç ekimi — hastane kampüsü",
 "Saç ekimi — tıp merkezi",
 "Sağlık kontrolü",
 "Hollywood gülüşü tasarımı",
 "Otel ve VIP transferler klinik tarafından karşılanır",
 "İmplantlar",
 "Klinikte lazerle beyazlatma — tek seansta birkaç ton açılır.",
 "Klinikte lazerle beyazlatma seansı",
 "Germe",
 "Liposuction",
 "Eksik bir diş, kalıcı olarak tamamlanır — titanyum implant, abutment ve zirkonyum kron.",
 "Partner hastane grubu",
 "Hasta bakım ve koordinasyon ücreti",
 "Hasta hikâyesi — çok yakında",
 "Tatile eklemek için ideal",
 "Fiyatlar hastane tarafından euro (€) olarak verilir ve doğrudan hastaneye ödenir. Otel konaklaması yalnızca belirtilen yerlerde dahildir. MedMatch ile bakım ve koordinasyonunuz sabit bir hasta bakım ve koordinasyon ücretidir.",
 "Profesyonel diş beyazlatma",
 "Radyoloji ve görüntüleme",
 "İkinci hastane ağı",
 "Usta seramik teknisyeni tarafından renk uyumu",
 "Öne çıkan diş kliniği partneri",
 "Tek diş implantı",
 "Maksimum stabilite için tek çenede altı implant — tam çene restorasyonunda altın standart.",
 "Gülüş tasarımı",
 "Straumann veya Nobel Biocare implant",
 "Cerrahi ve check-up kampüsleri — İstanbul",
 "Eve götürülen bakım seti",
 "Laboratuvar çalışırken geçici dişler",
 "Eksiksiz dönüşüm — görünen gülüşünüz boyunca kron veya lamina, yüzünüze göre tasarlanır.",
 "İki çenede on iki implant — ağzınızın tamamı, var olan en sağlam tam çene temeli üzerine yenilenir; otel ve transferler klinik tarafından karşılanır.",
 "Ultra ince, elde katmanlanmış E-max porselen — yapılabilecek en doğal görünümlü lamina.",
 "Laminalar",
 "Kilo verme",
 "Beyazlatma",
 "Kalan dişlerin beyazlatılması",
 "Röntgenler ve bakım seti dahil",
 "Röntgenler ve kapanış analizi dahil",
 "Röntgenler ve prova seansı dahil",
 "Zirkonyum kron dahil",
 "Zirkonyum kronlar — tam takım",
]

# ── strings built inside js/packages.js ───────────────────────────────────
# {placeholders} survive translation and are filled afterwards, so each
# language can put the number where it belongs.
CODE = {
 "Hello MedMatch Global! I'm interested in the \"{pkg}\" package. Could you send me my free treatment plan?": {
   "es": "¡Hola MedMatch Global! Me interesa el paquete «{pkg}». ¿Podrían enviarme mi plan de tratamiento gratuito?",
   "fr": "Bonjour MedMatch Global ! Le forfait « {pkg} » m’intéresse. Pourriez-vous m’envoyer mon plan de traitement gratuit ?",
   "de": "Hallo MedMatch Global! Ich interessiere mich für das Paket „{pkg}“. Könnten Sie mir meinen kostenlosen Behandlungsplan schicken?",
   "tr": "Merhaba MedMatch Global! \"{pkg}\" paketiyle ilgileniyorum. Ücretsiz tedavi planımı gönderebilir misiniz?"},
 "100% Transparent Pricing — your treatment is paid directly to the clinic, never marked up. Our care and coordination is a flat {fee} for your whole journey.": {
   "es": "Precios 100 % transparentes: su tratamiento se paga directamente a la clínica, sin recargo alguno. Nuestra atención y coordinación es una tarifa fija de {fee} para todo su viaje.",
   "fr": "Tarifs 100 % transparents — votre traitement est réglé directement à la clinique, sans aucune majoration. Notre suivi et notre coordination coûtent un forfait de {fee} pour tout votre parcours.",
   "de": "100 % transparente Preise — Ihre Behandlung zahlen Sie direkt an die Klinik, ohne jeden Aufschlag. Unsere Betreuung und Koordination kostet pauschal {fee} für Ihre gesamte Reise.",
   "tr": "%100 şeffaf fiyat — tedavinizi doğrudan kliniğe ödersiniz, üzerine hiçbir şey eklenmez. Bakım ve koordinasyonumuz, yolculuğunuzun tamamı için sabit {fee}."},
 "Hotel, {n} nights with breakfast": {
   "es": "Hotel, {n} noches con desayuno", "fr": "Hôtel, {n} nuits avec petit-déjeuner",
   "de": "Hotel, {n} Nächte mit Frühstück", "tr": "Otel, kahvaltı dahil {n} gece"},
 "FREE": {"es": "GRATIS", "fr": "OFFERT", "de": "GRATIS", "tr": "ÜCRETSİZ"},
 "covered by the clinic": {
   "es": "cubierto por la clínica", "fr": "pris en charge par la clinique",
   "de": "von der Klinik übernommen", "tr": "klinik tarafından karşılanır"},
 "Hotel choice": {"es": "Elección de hotel", "fr": "Choix de l’hôtel", "de": "Hotelauswahl", "tr": "Otel seçimi"},
 "Hotel": {"es": "Hotel", "fr": "Hôtel", "de": "Hotel", "tr": "Otel"},
 "{n} nights, breakfast included": {
   "es": "{n} noches, desayuno incluido", "fr": "{n} nuits, petit-déjeuner inclus",
   "de": "{n} Nächte, Frühstück inklusive", "tr": "{n} gece, kahvaltı dahil"},
 "VIP Transfers": {"es": "Traslados VIP", "fr": "Transferts VIP", "de": "VIP-Transfers", "tr": "VIP transferler"},
 "airport ↔ hotel ↔ clinic, all appointments": {
   "es": "aeropuerto ↔ hotel ↔ clínica, todas las citas",
   "fr": "aéroport ↔ hôtel ↔ clinique, tous les rendez-vous",
   "de": "Flughafen ↔ Hotel ↔ Klinik, alle Termine",
   "tr": "havalimanı ↔ otel ↔ klinik, tüm randevular"},
 "Online Consultation &amp; Treatment Plan": {
   "es": "Consulta online y plan de tratamiento", "fr": "Consultation en ligne et plan de traitement",
   "de": "Online-Beratung und Behandlungsplan", "tr": "Online konsültasyon ve tedavi planı"},
 "Treatment — paid directly to your doctor at the clinic": {
   "es": "Tratamiento: se paga directamente a su médico en la clínica",
   "fr": "Traitement — réglé directement à votre médecin à la clinique",
   "de": "Behandlung — direkt an Ihren Arzt in der Klinik gezahlt",
   "tr": "Tedavi — klinikte doğrudan doktorunuza ödenir"},
 "On request": {"es": "A consultar", "fr": "Sur demande", "de": "Auf Anfrage", "tr": "Talep üzerine"},
 "Hotel ({n} nights, breakfast)": {
   "es": "Hotel ({n} noches, desayuno)", "fr": "Hôtel ({n} nuits, petit-déjeuner)",
   "de": "Hotel ({n} Nächte, Frühstück)", "tr": "Otel ({n} gece, kahvaltı)"},
 "Hotel ({star}★, {n} nights)": {
   "es": "Hotel ({star}★, {n} noches)", "fr": "Hôtel ({star}★, {n} nuits)",
   "de": "Hotel ({star}★, {n} Nächte)", "tr": "Otel ({star}★, {n} gece)"},
 "VIP airport &amp; clinic transfers": {
   "es": "Traslados VIP al aeropuerto y a la clínica", "fr": "Transferts VIP aéroport et clinique",
   "de": "VIP-Transfers zu Flughafen und Klinik", "tr": "VIP havalimanı ve klinik transferleri"},
 "Online consultation &amp; treatment plan": {
   "es": "Consulta online y plan de tratamiento", "fr": "Consultation en ligne et plan de traitement",
   "de": "Online-Beratung und Behandlungsplan", "tr": "Online konsültasyon ve tedavi planı"},
 "Estimated total, all in": {
   "es": "Total estimado, todo incluido", "fr": "Total estimé, tout compris",
   "de": "Geschätzter Gesamtpreis, alles inklusive", "tr": "Tahmini toplam, her şey dahil"},
 "from {total}": {"es": "desde {total}", "fr": "à partir de {total}", "de": "ab {total}", "tr": "başlangıç fiyatı {total}"},
 "Price on request": {"es": "Precio a consultar", "fr": "Prix sur demande", "de": "Preis auf Anfrage", "tr": "Fiyat talep üzerine"},
 "{days} in {city}": {"es": "{days} en {city}", "fr": "{days} à {city}", "de": "{days} in {city}", "tr": "{city}’da {days}"},
 "hotel, transfers": {"es": "hotel, traslados", "fr": "hôtel, transferts", "de": "Hotel, Transfers", "tr": "otel, transferler"},
 "{star}★ hotel, transfers": {
   "es": "hotel {star}★, traslados", "fr": "hôtel {star}★, transferts",
   "de": "{star}★-Hotel, Transfers", "tr": "{star}★ otel, transferler"},
 "&amp; fee included": {"es": "y tarifa incluidos", "fr": "et frais inclus", "de": "und Gebühr inklusive", "tr": "ve ücret dahil"},
 "See what’s included, itemized": {
   "es": "Ver lo que incluye, desglosado", "fr": "Voir le détail de ce qui est inclus",
   "de": "Alles Enthaltene im Detail ansehen", "tr": "Nelerin dahil olduğunu kalem kalem görün"},
 "Total estimated cost": {
   "es": "Coste total estimado", "fr": "Coût total estimé",
   "de": "Geschätzte Gesamtkosten", "tr": "Tahmini toplam maliyet"},
 "Get My Free Treatment Plan": {
   "es": "Quiero mi plan de tratamiento gratuito", "fr": "Obtenir mon plan de traitement gratuit",
   "de": "Kostenlosen Behandlungsplan erhalten", "tr": "Ücretsiz tedavi planımı al"},
 "WhatsApp Us": {
   "es": "Escríbanos por WhatsApp", "fr": "Écrivez-nous sur WhatsApp",
   "de": "Schreiben Sie uns auf WhatsApp", "tr": "WhatsApp’tan yazın"},
 "Final treatment price is confirmed by your doctor after your free consultation and X-ray review.": {
   "es": "Su médico confirma el precio final del tratamiento tras la consulta gratuita y la revisión de las radiografías.",
   "fr": "Le prix final du traitement est confirmé par votre médecin après votre consultation gratuite et l’examen de vos radiographies.",
   "de": "Den endgültigen Behandlungspreis bestätigt Ihr Arzt nach der kostenlosen Beratung und der Auswertung Ihrer Röntgenbilder.",
   "tr": "Nihai tedavi fiyatı, ücretsiz konsültasyon ve röntgen incelemesinden sonra doktorunuz tarafından onaylanır."},
 "See all {n} dental packages &amp; prices →": {
   "es": "Ver los {n} paquetes dentales y precios →", "fr": "Voir les {n} forfaits dentaires et leurs prix →",
   "de": "Alle {n} Zahnpakete und Preise ansehen →", "tr": "{n} diş paketinin tamamını ve fiyatları görün →"},
}

# ── build ─────────────────────────────────────────────────────────────────
src = os.path.join(ROOT, "tools", "_package-strings.json")
if not os.path.exists(src):
    sys.exit("Run `node tools/collect-package-strings.mjs --json` first.")

english = json.load(io.open(src, encoding="utf-8"))
tables = {"es": ES, "fr": FR, "de": DE, "tr": TR}

for code, arr in tables.items():
    if len(arr) != len(english):
        sys.exit("%s has %d translations for %d English strings. The data file "
                 "changed - re-run the collector and fix the list." % (code, len(arr), len(english)))

merged = {}
for i, en in enumerate(english):
    merged[en] = {c: tables[c][i] for c in LANGS}
for en, row in CODE.items():
    merged[en] = row

io.open(os.path.join(ROOT, "tools", "package-i18n.json"), "w", encoding="utf-8").write(
    json.dumps(merged, ensure_ascii=False, indent=1))

# Append into each dictionary's registerText table, which is the last object
# in the file. Skips anything already present so re-running is safe.
added_total = 0
for code in LANGS:
    path = os.path.join(ROOT, "js", "lang", "%s.js" % code)
    s = io.open(path, encoding="utf-8").read()
    tail = s.rstrip()
    if not tail.endswith("});"):
        sys.exit("%s.js does not end with the expected registerText block." % code)

    lines = []
    for en, row in merged.items():
        key = json.dumps(en, ensure_ascii=False)
        if key + ":" in s:
            continue
        lines.append("%s:%s" % (key, json.dumps(row[code], ensure_ascii=False)))
    if not lines:
        print("%s: already complete" % code)
        continue

    body = tail[:-3].rstrip()          # drop the closing "});"
    if not body.endswith(","):
        body += ","
    s = body + "\n" + ",\n".join(lines) + "\n});\n"
    io.open(path, "w", encoding="utf-8", newline="").write(s)
    print("%s: added %d package strings" % (code, len(lines)))
    added_total += len(lines)

print("Done - %d entries added across %d languages." % (added_total, len(LANGS)))
