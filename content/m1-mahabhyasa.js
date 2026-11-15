// पाठः १ — महाभ्यासः   (see f1.js for markup help)
// The full table below is built automatically from data/abhyasa.js
L("m1-mahabhyasa", {
  title: "महाभ्यासः",
  blocks: [
    { p: "धातुं क्रियापदं च दृष्ट्वा , धातुः कस्मिन् गणे अस्ति इति अनुमानं क्रियताम्। अभ्यासशालायां ९४ धातूनां महाभ्यासः अस्ति।" },
    { h: "पुनरावृत्ति-प्रश्नाः" },
    { olist: [
      "धातुगणाः कति ? तेषां नामानि कानि ?",
      "क्रियापदे धातुः किं सूचयति ? विकरणप्रत्ययः किम् ? तिङ्-प्रत्ययः किम् ?",
      "प्रत्येकस्य गणस्य मूलविकरणप्रत्ययः कः ?",
      "प्रत्येकस्य गणस्य विकरणप्रत्ययस्य आकृतिः का ? ( लटि प्रथमपुरुषैकवचने )",
      "औपदेशिकधातवः के ? आतिदेशिकधातवः के ?",
      "गुणः कः ? गुणसन्धिः कः ?",
      "भेदः कः ? — अ ) द्वितीय-तृतीयगणयोः   आ ) चतुर्थ-दशमगणयोः   इ ) पञ्चम-अष्टमगणयोः   ई ) प्रथम-षष्ठगणयोः",
      "इत्-संज्ञा का ? सम्प्रसारणं किम् ?",
      "विकरणप्रत्यये कः वर्णः गुणस्य कृते प्रेरयति ? कः वर्णः गुणस्य अवरोधः न भवति ?",
      "केषु गणेषु विकरणप्रत्ययस्य आधारेण गुणः भवति ? केषु न भवति ?",
    ]},
    { h: "परिशिष्टम् — ९४ धातवः" },
    { html: '<input class="search" id="dsearch" placeholder="अन्विष्यताम् — धातुः / क्रियापदम् / गणः">' +
            '<div class="tbl-wrap"><table id="dtable"><thead><tr><th>धातुः</th><th>क्रियापदम्</th><th>विभागः</th><th>विशेषकार्याणि</th><th>मूलविकरणः</th><th>गणः</th><th>अर्थः</th></tr></thead><tbody></tbody></table></div>' },
  ],
  afterRender: function (body, h) {
    const tb = body.querySelector("#dtable tbody");
    const md = h.md;
    function draw(f) {
      f = (f || "").trim();
      tb.innerHTML = window.ABHYASA.filter((r) => !f || [r.d, r.k, r.gana, r.artha].join(" ").includes(f))
        .map((r) => `<tr><td>${md(r.d)}</td><td>${md(r.k)}</td><td>${md(r.split)}</td><td>${md(r.vis)}</td><td>${md(r.mula)}</td><td>${md(r.gana)}</td><td>${md(r.artha)}</td></tr>`).join("");
    }
    draw("");
    body.querySelector("#dsearch").oninput = (e) => draw(e.target.value);
  },
  abhyasa: [
    { title: "गणं जानीहि — १५ प्रश्नाः", gana: { pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], count: 15 } },
    { title: "सम्पूर्णः महाभ्यासः — ९४ धातवः", gana: { pool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0], count: 94 } },
  ],
});
