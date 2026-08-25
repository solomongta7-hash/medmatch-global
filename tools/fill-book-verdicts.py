# -*- coding: utf-8 -*-
# The verdict half of book.html: buttons, section headings and closing asides.
#
# Keyed by the exact English string rather than by index, because these came
# from the source scan (T("…") literals) and are short enough to retype safely.
# The long asides keep their inline <strong> and <a href>; hrefs are never
# translated, and {wa}/{mail} stay as placeholders.
#
#   python tools/fill-book-verdicts.py

import io, json, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
LANGS = ["es", "fr", "de", "tr"]

T = {
"What we saw": {
 "es": "Lo que hemos visto", "fr": "Ce que nous avons vu",
 "de": "Was wir gesehen haben", "tr": "Gördüklerimiz"},

"Why, specifically": {
 "es": "Por qué, en concreto", "fr": "Pourquoi, précisément",
 "de": "Warum, genau gesagt", "tr": "Tam olarak neden"},

"What to sort first": {
 "es": "Qué resolver primero", "fr": "Ce qu'il faut régler d'abord",
 "de": "Was zuerst zu klären ist", "tr": "Önce nelerin halledilmesi gerekiyor"},

"SELECT A TIME": {
 "es": "ELIJA UNA HORA", "fr": "CHOISISSEZ UN HORAIRE",
 "de": "ZEIT WÄHLEN", "tr": "BİR SAAT SEÇİN"},

"Book anyway — it's still free": {
 "es": "Reservar de todos modos — sigue siendo gratis",
 "fr": "Réserver quand même — c'est toujours gratuit",
 "de": "Trotzdem buchen — es bleibt kostenlos",
 "tr": "Yine de randevu al — hâlâ ücretsiz"},

"Ask a question first": {
 "es": "Antes, hacer una pregunta", "fr": "Poser d'abord une question",
 "de": "Erst eine Frage stellen", "tr": "Önce bir soru sor"},

"See what it really costs": {
 "es": "Ver lo que cuesta de verdad", "fr": "Voir ce que cela coûte vraiment",
 "de": "Sehen, was es wirklich kostet", "tr": "Gerçekte ne kadara mal olduğunu gör"},

"Message us on WhatsApp": {
 "es": "Escríbanos por WhatsApp", "fr": "Écrivez-nous sur WhatsApp",
 "de": "Schreiben Sie uns auf WhatsApp", "tr": "WhatsApp'tan bize yazın"},

"Send your records securely": {
 "es": "Envíe su historial de forma segura", "fr": "Envoyez votre dossier en toute sécurité",
 "de": "Senden Sie Ihre Unterlagen sicher", "tr": "Kayıtlarınızı güvenle gönderin"},

"Email us instead": {
 "es": "Escríbanos por correo", "fr": "Écrivez-nous par e-mail",
 "de": "Schreiben Sie uns stattdessen eine E-Mail", "tr": "Bunun yerine e-posta gönderin"},

"<strong>We meant it about booking anyway.</strong> The list above is what we'd want you to have in hand, not a hurdle. If you'd rather talk it through now, take a slot — we just won't pretend the quote is final until those pieces are in place.": {
 "es": "<strong>Lo de reservar igualmente iba en serio.</strong> La lista de arriba es lo que nos gustaría que tuviera a mano, no un obstáculo. Si prefiere hablarlo ahora, coja una hora: simplemente no vamos a fingir que el presupuesto es definitivo hasta que esas piezas estén en su sitio.",
 "fr": "<strong>Nous le pensions vraiment : réservez quand même.</strong> La liste ci-dessus est ce que nous aimerions vous voir en main, pas un obstacle. Si vous préférez en parler maintenant, prenez un créneau — nous ne ferons simplement pas semblant que le devis est définitif tant que ces éléments ne sont pas réunis.",
 "de": "<strong>Das mit dem Trotzdem-Buchen war ernst gemeint.</strong> Die Liste oben ist das, was Sie idealerweise zur Hand hätten, keine Hürde. Wenn Sie lieber jetzt sprechen möchten, nehmen Sie einen Termin — wir werden nur nicht so tun, als sei der Kostenvoranschlag endgültig, solange diese Punkte offen sind.",
 "tr": "<strong>Yine de randevu alın derken ciddiydik.</strong> Yukarıdaki liste, elinizde olmasını istediğimiz şeyler; bir engel değil. Şimdi konuşmayı tercih ederseniz bir saat seçin — sadece, bu parçalar yerine oturana kadar teklifin kesin olduğunu iddia etmeyeceğiz."},

"Three things worth your time before any call: the <a href=\"/true-cost.html\">true-cost estimate</a> (flights, hotel and the second trip included), <a href=\"/vetting.html\">how we vet a hospital</a>, and the <a href=\"/blog/\">patient guides</a> for your treatment. <strong>No sales sequence, no follow-up you didn't ask for.</strong> When you have a date or a quote in hand, come back and finish this in thirty seconds.": {
 "es": "Tres cosas que merecen su tiempo antes de cualquier llamada: la <a href=\"/true-cost.html\">estimación del coste real</a> (vuelos, hotel y el segundo viaje incluidos), <a href=\"/vetting.html\">cómo evaluamos un hospital</a> y las <a href=\"/blog/\">guías para pacientes</a> de su tratamiento. <strong>Sin secuencia comercial y sin seguimiento que no haya pedido.</strong> Cuando tenga una fecha o un presupuesto en la mano, vuelva y termine esto en treinta segundos.",
 "fr": "Trois choses qui valent votre temps avant tout appel : l'<a href=\"/true-cost.html\">estimation du coût réel</a> (vols, hôtel et second voyage compris), <a href=\"/vetting.html\">comment nous évaluons un hôpital</a>, et les <a href=\"/blog/\">guides patients</a> pour votre traitement. <strong>Aucune séquence commerciale, aucune relance que vous n'avez pas demandée.</strong> Quand vous aurez une date ou un devis en main, revenez et terminez ceci en trente secondes.",
 "de": "Drei Dinge, die Ihre Zeit wert sind, bevor Sie telefonieren: die <a href=\"/true-cost.html\">Echtkosten-Schätzung</a> (Flüge, Hotel und die zweite Reise inklusive), <a href=\"/vetting.html\">wie wir eine Klinik prüfen</a> und die <a href=\"/blog/\">Patientenratgeber</a> zu Ihrer Behandlung. <strong>Keine Verkaufsstrecke, keine Nachfassaktion, um die Sie nicht gebeten haben.</strong> Wenn Sie einen Termin oder einen Kostenvoranschlag in der Hand haben, kommen Sie wieder und erledigen Sie das hier in dreißig Sekunden.",
 "tr": "Herhangi bir görüşmeden önce zamanınıza değecek üç şey: <a href=\"/true-cost.html\">gerçek maliyet tahmini</a> (uçuşlar, otel ve ikinci yolculuk dahil), <a href=\"/vetting.html\">bir hastaneyi nasıl denetlediğimiz</a> ve tedaviniz için <a href=\"/blog/\">hasta rehberleri</a>. <strong>Satış dizisi yok, istemediğiniz hiçbir takip yok.</strong> Elinizde bir tarih ya da teklif olduğunda dönün ve bunu otuz saniyede bitirin."},

"<strong>What happens next.</strong> A patient advisor comes back to you within one business day with exactly which records the surgeon needs — usually a medication list, a recent blood panel, and any imaging. A clinician reviews it. Only then does anyone talk to you about price or dates. If the answer is that you shouldn't travel for this, we will tell you that too.": {
 "es": "<strong>Qué pasa ahora.</strong> Un asesor de pacientes le responde en un día laborable indicándole exactamente qué documentación necesita el cirujano: normalmente la lista de medicación, una analítica reciente y cualquier prueba de imagen. Un clínico la revisa. Solo entonces alguien le habla de precio o de fechas. Si la respuesta es que no debería viajar para esto, también se lo diremos.",
 "fr": "<strong>Ce qui se passe ensuite.</strong> Un conseiller patient revient vers vous sous un jour ouvré en précisant exactement quels documents le chirurgien attend — en général la liste des médicaments, un bilan sanguin récent et vos imageries. Un clinicien les examine. Ce n'est qu'ensuite qu'on vous parle de prix ou de dates. Si la réponse est que vous ne devriez pas voyager pour cela, nous vous le dirons aussi.",
 "de": "<strong>Wie es weitergeht.</strong> Ein Patientenberater meldet sich innerhalb eines Werktags und nennt genau, welche Unterlagen der Chirurg braucht — meist eine Medikamentenliste, ein aktuelles Blutbild und vorhandene Aufnahmen. Ein Arzt sieht sie durch. Erst danach spricht überhaupt jemand mit Ihnen über Preis oder Termine. Wenn die Antwort lautet, dass Sie dafür nicht reisen sollten, sagen wir Ihnen auch das.",
 "tr": "<strong>Bundan sonra ne oluyor.</strong> Bir hasta danışmanı bir iş günü içinde size dönerek cerrahın tam olarak hangi kayıtlara ihtiyaç duyduğunu söyler — genellikle ilaç listesi, güncel bir kan tahlili ve varsa görüntülemeler. Bir hekim bunları inceler. Ancak ondan sonra biri sizinle fiyat ya da tarih konuşur. Cevap bunun için seyahat etmemeniz gerektiğiyse, onu da size söyleriz."},

"We couldn't save your answers just now. Nothing is lost — message us on {wa} or email {mail} and we'll pick it up from there.": {
 "es": "No hemos podido guardar sus respuestas en este momento. No se ha perdido nada: escríbanos por {wa} o al correo {mail} y lo retomamos desde ahí.",
 "fr": "Nous n'avons pas pu enregistrer vos réponses à l'instant. Rien n'est perdu — écrivez-nous sur {wa} ou par e-mail à {mail} et nous reprenons à partir de là.",
 "de": "Wir konnten Ihre Antworten gerade nicht speichern. Es ist nichts verloren — schreiben Sie uns auf {wa} oder per E-Mail an {mail}, und wir machen von dort weiter.",
 "tr": "Cevaplarınızı şu anda kaydedemedik. Hiçbir şey kaybolmadı — {wa} üzerinden yazın ya da {mail} adresine e-posta gönderin, oradan devam edelim."},
}

added_total = 0
for code in LANGS:
    path = os.path.join(ROOT, "js", "lang", "%s.js" % code)
    s = io.open(path, encoding="utf-8").read()
    tail = s.rstrip()
    if not tail.endswith("});"):
        sys.exit("%s.js does not end with the expected registerText block." % code)

    lines = []
    for en, row in T.items():
        key = json.dumps(en, ensure_ascii=False)
        if key + ":" in s:
            continue
        lines.append("%s:%s" % (key, json.dumps(row[code], ensure_ascii=False)))
    if not lines:
        print("%s: already complete" % code)
        continue

    body = tail[:-3].rstrip()
    if not body.endswith(","):
        body += ","
    io.open(path, "w", encoding="utf-8", newline="").write(
        body + "\n" + ",\n".join(lines) + "\n});\n")
    print("%s: added %d verdict strings" % (code, len(lines)))
    added_total += len(lines)

print("Done - %d entries added." % added_total)
