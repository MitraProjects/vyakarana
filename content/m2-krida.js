// पाठः २ — १.च सन्धि-क्रीडाङ्गणम्
// Five tabs. Uses only the guru's examples. Colours: स्थानी = red, निमित्तम् = green, आदेशः = blue.
// To add an example later, add one entry to EX below (and, for the decoder, to SUTRAS).

(function () {
  // ---------- the guru's examples ----------
  // toks: the letters as split in the lesson; st = स्थानी positions; ni = निमित्तम् positions;
  // ad = { position: आदेशः } ("" removes the token); res = final form
  const EX = [
    { pair: "यदि + अपि", s: "yan", toks: ["यद्", "इ", "+", "अ", "पि"], st: [1], ni: [3], ad: { 1: "य्", 2: "" }, res: "यद्यपि" },
    { pair: "उभौ + अपि", s: "ayadi", toks: ["उभ्", "औ", "+", "अ", "पि"], st: [1], ni: [3], ad: { 1: "आव्", 2: "" }, res: "उभावपि" },
    { pair: "अत्र + आगच्छ", s: "dirgha", toks: ["अत्र्", "अ", "+", "आ", "गच्छ"], st: [1, 3], ni: [1, 3], ad: { 1: "आ", 2: "", 3: "" }, res: "अत्रागच्छ" },
    { pair: "आ + अगच्छत्", s: "dirgha", toks: ["आ", "+", "अ", "गच्छत्"], st: [0, 2], ni: [0, 2], ad: { 0: "आ", 1: "", 2: "" }, res: "आगच्छत्" },
    { pair: "देव + आलयः", s: "dirgha", toks: ["देव्", "अ", "+", "आ", "लयः"], st: [1, 3], ni: [1, 3], ad: { 1: "आ", 2: "", 3: "" }, res: "देवालयः" },
    { pair: "यत् + चलति", s: "scutva", toks: ["य", "त्", "+", "च्", "अलति"], st: [1], ni: [3], ad: { 1: "च्", 2: "" }, res: "यच्चलति" },
    { pair: "यज् + नः", s: "scutva", toks: ["य", "ज्", "+", "न्", "अः"], st: [3], ni: [1], ad: { 3: "ञ्", 2: "" }, res: "यज्ञः" },
  ];
  const SANDHI = {
    yan: { name: "यण्-सन्धिः", sutra: "इको यणचि", st: "इक् ( इ उ ऋ ऌ )", ad: "यण् ( य् व् र् ल् )", ni: "असवर्णः अच् — परः" },
    ayadi: { name: "यान्तवान्तादेश-सन्धिः", sutra: "एचोऽयवायावः", st: "एच् ( ए ओ ऐ औ )", ad: "अय् अव् आय् आव्", ni: "अच् — परः" },
    dirgha: { name: "सवर्णदीर्घ-सन्धिः", sutra: "अकः सवर्णे दीर्घः", st: "पूर्वपरौ ( अक् + सवर्णः अच् )", ad: "एकः दीर्घः", ni: "अक् — पूर्वः ; सवर्णः अच् — परः" },
    scutva: { name: "श्चुत्व-सन्धिः", sutra: "स्तोः श्चुना श्चुः", st: "स्तु ( स् , तवर्गः )", ad: "श्चु ( श् , चवर्गः )", ni: "श्चु — पूर्वः वा परः वा" },
  };
  const SK = ["yan", "ayadi", "dirgha", "scutva"];

  // ---------- sūtra sentences for the decoder ----------
  // role: st = स्थानी , ni = निमित्तम् , ad = आदेशः , sa = संहिता ( विषयसप्तमी )
  const SUTRAS = [
    { name: "यण्-सन्धिः", words: [["इकः", "षष्ठी", "st", "स्थानी"], ["यण्", "प्रथमा", "ad", "आदेशः"], ["असवर्ण-अचि", "सप्तमी", "ni", "परनिमित्तम्"], ["संहितायाम्", "सप्तमी", "sa", "विषयसप्तमी"]] },
    { name: "यान्तवान्तादेश-सन्धिः", words: [["एचः", "षष्ठी", "st", "स्थानी"], ["अयवायावः", "प्रथमा ( बहुवचनम् )", "ad", "आदेशः"], ["अचि", "सप्तमी", "ni", "परनिमित्तम्"], ["संहितायाम्", "सप्तमी", "sa", "विषयसप्तमी"]] },
    { name: "सवर्णदीर्घ-सन्धिः", words: [["अकः", "पञ्चमी", "ni", "पूर्वनिमित्तम्"], ["सवर्णे अचि", "सप्तमी", "ni", "परनिमित्तम्"], ["पूर्वपरयोः", "षष्ठी ( द्विवचनम् )", "st", "स्थानिनौ"], ["एकः दीर्घः", "प्रथमा", "ad", "आदेशः"], ["संहितायाम्", "सप्तमी", "sa", "विषयसप्तमी"]] },
    { name: "श्चुत्व-सन्धिः", words: [["स्तोः", "षष्ठी", "st", "स्थानी"], ["श्चुना", "तृतीया", "ni", "योगः ( निमित्तं पूर्वं वा परं वा )"], ["श्चुः", "प्रथमा", "ad", "आदेशः"], ["संहितायाम्", "सप्तमी", "sa", "विषयसप्तमी"]] },
  ];
  const ROLE = { st: "स्थानी", ni: "निमित्तम्", ad: "आदेशः", sa: "संहिता" };

  // ---------- letter map ----------
  const MAP = {
    "अ": [["सवर्णः अच् परः ( अ , आ )", "आ", "सवर्णदीर्घ-सन्धिः", "अत्र + आगच्छ → अत्रागच्छ"]],
    "आ": [["सवर्णः अच् परः ( अ , आ )", "आ", "सवर्णदीर्घ-सन्धिः", "आ + अगच्छत् → आगच्छत्"]],
    "इ": [["असवर्णः अच् परः", "य्", "यण्-सन्धिः", "यदि + अपि → यद्यपि"], ["सवर्णः अच् परः ( इ , ई )", "ई", "सवर्णदीर्घ-सन्धिः", ""]],
    "ई": [["असवर्णः अच् परः", "य्", "यण्-सन्धिः", ""], ["सवर्णः अच् परः ( इ , ई )", "ई", "सवर्णदीर्घ-सन्धिः", ""]],
    "उ": [["असवर्णः अच् परः", "व्", "यण्-सन्धिः", ""], ["सवर्णः अच् परः ( उ , ऊ )", "ऊ", "सवर्णदीर्घ-सन्धिः", ""]],
    "ऊ": [["असवर्णः अच् परः", "व्", "यण्-सन्धिः", ""], ["सवर्णः अच् परः ( उ , ऊ )", "ऊ", "सवर्णदीर्घ-सन्धिः", ""]],
    "ऋ": [["असवर्णः अच् परः", "र्", "यण्-सन्धिः", ""], ["सवर्णः अच् परः ( ऋ , ॠ )", "ॠ", "सवर्णदीर्घ-सन्धिः", ""]],
    "ॠ": [["असवर्णः अच् परः", "र्", "यण्-सन्धिः", ""], ["सवर्णः अच् परः ( ऋ , ॠ )", "ॠ", "सवर्णदीर्घ-सन्धिः", ""]],
    "ऌ": [["असवर्णः अच् परः", "ल्", "यण्-सन्धिः", ""]],
    "ए": [["अच् परः", "अय्", "यान्तवान्तादेश-सन्धिः", ""]],
    "ऐ": [["अच् परः", "आय्", "यान्तवान्तादेश-सन्धिः", ""]],
    "ओ": [["अच् परः", "अव्", "यान्तवान्तादेश-सन्धिः", ""]],
    "औ": [["अच् परः", "आव्", "यान्तवान्तादेश-सन्धिः", "उभौ + अपि → उभावपि"]],
    "स्": [["श्-कारेण चवर्गेण वा योगः", "श्", "श्चुत्व-सन्धिः", ""]],
    "त्": [["श्-कारेण चवर्गेण वा योगः", "च्", "श्चुत्व-सन्धिः", "यत् + चलति → यच्चलति"]],
    "थ्": [["श्-कारेण चवर्गेण वा योगः", "छ्", "श्चुत्व-सन्धिः", ""]],
    "द्": [["श्-कारेण चवर्गेण वा योगः", "ज्", "श्चुत्व-सन्धिः", ""]],
    "ध्": [["श्-कारेण चवर्गेण वा योगः", "झ्", "श्चुत्व-सन्धिः", ""]],
    "न्": [["श्-कारेण चवर्गेण वा योगः", "ञ्", "श्चुत्व-सन्धिः", "यज् + नः → यज्ञः"]],
  };
  const GRID = [
    ["अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ"],
    ["ए", "ऐ", "ओ", "औ"],
    ["क्", "ख्", "ग्", "घ्", "ङ्"],
    ["च्", "छ्", "ज्", "झ्", "ञ्"],
    ["ट्", "ठ्", "ड्", "ढ्", "ण्"],
    ["त्", "थ्", "द्", "ध्", "न्"],
    ["प्", "फ्", "ब्", "भ्", "म्"],
    ["य्", "र्", "ल्", "व्"],
    ["श्", "ष्", "स्", "ह्"],
  ];

  const TABS = [
    ["chart", "सन्धि-चित्रम्"],
    ["machine", "सन्धि-यन्त्रम्"],
    ["game", "कः सन्धिः ?"],
    ["map", "वर्ण-मानचित्रम्"],
    ["sutra", "सूत्र-विश्लेषणम्"],
  ];

  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const legend = `<div class="kr-legend"><span class="kr-st">स्थानी</span><span class="kr-ni">निमित्तम्</span><span class="kr-ad">आदेशः</span></div>`;

  L("m2-krida", {
    title: "सन्धि-क्रीडाङ्गणम्",
    blocks: [
      { p: "अद्यावत् चत्वारः सन्धयः पठिताः। अत्र तान् दृष्ट्वा , क्रीडित्वा च अवगच्छामः। प्रत्येकस्य सन्धेः विस्तरेण पाठे अधिकानि उदाहरणानि आगमिष्यन्ति।" },
      { html: `<div class="kr-tabs" id="krTabs">${TABS.map(([k, t], i) => `<button class="kr-tab${i ? "" : " on"}" data-k="${k}">${t}</button>`).join("")}</div><div id="krBody" class="kr-body"></div>` },
    ],
    afterRender(body, h) {
      const md = h.md;
      const box = body.querySelector("#krBody");
      const tabs = body.querySelectorAll(".kr-tab");
      tabs.forEach((b) => b.onclick = () => { tabs.forEach((x) => x.classList.remove("on")); b.classList.add("on"); show(b.dataset.k); });
      show("chart");

      function show(k) { ({ chart, machine, game, map, sutra })[k](); }

      // ---------- 1. chart ----------
      function chart() {
        box.innerHTML = legend + `<div class="tbl-wrap"><table class="kr-chart"><thead><tr><th>सन्धिः</th><th>स्थानी</th><th>आदेशः</th><th>निमित्तम्</th><th>उदाहरणम्</th><th>सूत्रम्</th></tr></thead><tbody>` +
          SK.map((k) => {
            const S = SANDHI[k];
            const ex = EX.filter((e) => e.s === k).map((e) => `${e.pair} → <b>${e.res}</b>`).join("<br>");
            return `<tr><td><b>${S.name}</b></td><td class="kr-st">${S.st}</td><td class="kr-ad">${S.ad}</td><td class="kr-ni">${S.ni}</td><td>${ex}</td><td>${S.sutra}</td></tr>`;
          }).join("") + `</tbody></table></div>`;
      }

      // ---------- 2. machine ----------
      function machine() {
        let ei = 0, step = 0;
        const STEPS = ["पदे पृथक् कुर्मः", "स्थानी , निमित्तं च पश्यामः", "आदेशः आगच्छति", "रूपं सिद्धम्"];
        function draw() {
          const e = EX[ei], S = SANDHI[e.s];
          let toks = e.toks.map((t, i) => {
            let cls = "kr-tok";
            if (step >= 1 && e.st.includes(i)) cls += " kr-st-b";
            if (step >= 1 && e.ni.includes(i) && !e.st.includes(i)) cls += " kr-ni-b";
            if (step >= 1 && e.ni.includes(i) && e.st.includes(i)) cls += " kr-both";
            if (t === "+") cls = "kr-plus";
            let txt = t;
            if (step >= 2 && i in e.ad) { if (e.ad[i] === "") return ""; txt = e.ad[i]; cls = "kr-tok kr-ad-b"; }
            return `<span class="${cls}">${txt}</span>`;
          }).join("");
          if (step === 3) toks = `<span class="kr-tok kr-res">${e.res}</span>`;
          const tag = step >= 1 ? `<div class="kr-tags">${e.st.length > 1 ? "स्थानिनौ" : "स्थानी"} : <b class="kr-st">${e.st.map((i) => e.toks[i]).join(" , ")}</b> &nbsp; निमित्तम् : <b class="kr-ni">${e.ni.map((i) => e.toks[i]).join(" , ")}</b>${step >= 2 ? ` &nbsp; आदेशः : <b class="kr-ad">${Object.values(e.ad).filter(Boolean).join(" , ")}</b>` : ""}</div>` : "";
          box.innerHTML = legend +
            `<div class="kr-pick">${EX.map((x, i) => `<button class="kr-chip${i === ei ? " on" : ""}" data-i="${i}">${x.pair}</button>`).join("")}</div>
            <div class="kr-machine"><div class="kr-sname">${S.name} — <span class="muted">${S.sutra}</span></div>
              <div class="kr-dots">${STEPS.map((s, i) => `<span class="${i <= step ? "on" : ""}">${i + 1}</span>`).join("")}</div>
              <div class="kr-stepname">${STEPS[step]}</div>
              <div class="kr-toks">${toks}</div>${tag}
              <div class="row"><button class="btn ghost" id="krPrev" ${step ? "" : "disabled"}>‹ पूर्वम्</button><button class="btn" id="krNext">${step < 3 ? "अग्रे ›" : "पुनः ↻"}</button></div></div>`;
          box.querySelectorAll(".kr-chip").forEach((b) => b.onclick = () => { ei = +b.dataset.i; step = 0; draw(); });
          box.querySelector("#krPrev").onclick = () => { if (step) { step--; draw(); } };
          box.querySelector("#krNext").onclick = () => { step = step < 3 ? step + 1 : 0; draw(); };
        }
        draw();
      }

      // ---------- 3. which sandhi? ----------
      function game() {
        const order = shuffle(EX.map((_, i) => i));
        let qi = 0, score = 0, stage = 0, ok1 = true, ok2 = true, ok3 = true;
        function draw(msg) {
          if (qi >= order.length) {
            box.innerHTML = `<div class="quiz result"><div class="score">${score} / ${order.length}</div><p>${score === order.length ? "अत्युत्तमम् ! ✓" : "पुनः प्रयततां — सन्धि-यन्त्रं पश्यतु।"}</p><div class="row"><button class="btn" id="krAgain">पुनः आरभताम्</button></div></div>`;
            box.querySelector("#krAgain").onclick = game; return;
          }
          const e = EX[order[qi]], S = SANDHI[e.s];
          let ask = "", opts = "";
          if (stage === 0) { ask = "कः सन्धिः ?"; opts = SK.map((k) => `<button class="kr-opt" data-v="${k}">${SANDHI[k].name}</button>`).join(""); }
          if (stage === 1) { ask = e.st.length > 1 ? "स्थानिनौ नुदतु ( द्वौ वर्णौ )" : "स्थानिनं नुदतु"; }
          if (stage === 2) {
            const right = Object.values(e.ad).filter(Boolean)[0];
            const pool = ["य्", "व्", "र्", "ल्", "अय्", "अव्", "आय्", "आव्", "आ", "ई", "ऊ", "च्", "ञ्", "श्"].filter((x) => x !== right);
            ask = "कः आदेशः ?"; opts = shuffle([right].concat(shuffle(pool).slice(0, 3))).map((v) => `<button class="kr-opt" data-v="${v}">${v}</button>`).join("");
          }
          const built = stage === 3 ? `<div class="kr-toks"><span class="kr-tok kr-res">${e.res}</span></div><p>${ok1 && ok2 && ok3 ? "सम्यक् ! ✓" : "उत्तरम् —"} ${S.name} ; ${S.sutra}</p>` : "";
          const toks = e.toks.map((t, i) => t === "+" ? `<span class="kr-plus">+</span>` : `<button class="kr-tok kr-tokbtn${picked.includes(i) ? " kr-st-b" : ""}" data-i="${i}" ${stage === 1 ? "" : "disabled"}>${t}</button>`).join("");
          box.innerHTML = `<div class="kr-game"><div class="muted">${qi + 1} / ${order.length} · अङ्काः ${score}</div>
            <div class="kr-pair">${e.pair}</div>
            ${stage < 3 ? `<div class="kr-toks">${toks}</div><div class="q">${ask}</div><div class="kr-opts">${opts}</div>` : built}
            ${msg ? `<div class="fb ${msg[0]}">${msg[1]}</div>` : ""}
            ${stage === 3 ? `<div class="row"><button class="btn" id="krNextQ">अग्रिमम् ›</button></div>` : ""}</div>`;
          box.querySelectorAll(".kr-opt").forEach((b) => b.onclick = () => {
            if (stage === 0) { ok1 = b.dataset.v === e.s; stage = 1; draw(ok1 ? ["ok", "सम्यक् ! " + S.name] : ["bad", "न — " + S.name]); }
            else if (stage === 2) { const right = Object.values(e.ad).filter(Boolean)[0]; ok3 = b.dataset.v === right; stage = 3; if (ok1 && ok2 && ok3) score++; draw(ok3 ? ["ok", "सम्यक् ! आदेशः " + right] : ["bad", "न — आदेशः " + right]); }
          });
          box.querySelectorAll(".kr-tokbtn").forEach((b) => b.onclick = () => {
            if (stage !== 1) return;
            const i = +b.dataset.i;
            if (!picked.includes(i)) picked.push(i);
            if (picked.length < e.st.length) { draw(); return; }
            ok2 = e.st.every((x) => picked.includes(x)) && picked.length === e.st.length;
            stage = 2; draw(ok2 ? ["ok", "सम्यक् ! स्थानी — " + e.st.map((x) => e.toks[x]).join(" , ")] : ["bad", "न — स्थानी " + e.st.map((x) => e.toks[x]).join(" , ")]);
          });
          const nq = box.querySelector("#krNextQ");
          if (nq) nq.onclick = () => { qi++; stage = 0; ok1 = ok2 = ok3 = true; picked = []; draw(); };
        }
        let picked = [];
        draw();
      }

      // ---------- 4. letter map ----------
      function map() {
        box.innerHTML = `<p class="muted">वर्णं नुदतु — अद्यावत् पठितेषु सन्धिषु सः वर्णः किं भवति इति पश्यतु।</p>
          <div class="kr-grid">${GRID.map((row) => `<div class="kr-grow">${row.map((l) => `<button class="kr-l${MAP[l] ? " has" : ""}" data-l="${l}">${l}</button>`).join("")}</div>`).join("")}</div>
          <div id="krInfo" class="kr-info muted">( रङ्गयुक्ताः वर्णाः सन्धिषु परिवर्तन्ते। )</div>`;
        box.querySelectorAll(".kr-l").forEach((b) => b.onclick = () => {
          box.querySelectorAll(".kr-l").forEach((x) => x.classList.remove("on")); b.classList.add("on");
          const l = b.dataset.l, info = box.querySelector("#krInfo");
          const m = MAP[l];
          info.classList.remove("muted");
          info.innerHTML = m ? m.map(([when, to, name, ex]) => `<div class="kr-rule"><span class="kr-tok kr-st-b">${l}</span> → <span class="kr-tok kr-ad-b">${to}</span> <span>यदि <b class="kr-ni">${when}</b> — ${name}</span>${ex ? `<div class="muted">यथा — ${ex}</div>` : ""}</div>`).join("")
            : `<div class="kr-rule"><b>${l}</b> — अद्यावत् पठितेषु सन्धिषु अस्य परिवर्तनं न दृष्टम्।</div>`;
        });
      }

      // ---------- 5. sūtra decoder + placing game ----------
      function sutra() {
        let si = 0, mode = "dec";
        function draw() {
          const S = SUTRAS[si];
          const pick = `<div class="kr-pick">${SUTRAS.map((x, i) => `<button class="kr-chip${i === si ? " on" : ""}" data-i="${i}">${x.name}</button>`).join("")}</div>
            <div class="kr-pick"><button class="kr-chip${mode === "dec" ? " on" : ""}" data-m="dec">पदं नुदतु — अर्थं पश्यतु</button><button class="kr-chip${mode === "play" ? " on" : ""}" data-m="play">पदानि स्थापयत</button></div>`;
          if (mode === "dec") {
            box.innerHTML = pick + `<div class="kr-legend"><span class="kr-st">स्थानी — षष्ठी</span><span class="kr-ni">निमित्तम् — सप्तमी / पञ्चमी / तृतीया</span><span class="kr-ad">आदेशः — प्रथमा</span><span class="kr-sa">संहिता — विषयसप्तमी</span></div>
              <div class="kr-sut">${S.words.map((w, i) => `<button class="kr-w" data-i="${i}">${w[0]}</button>`).join(" ")}</div><div id="krDec" class="kr-info muted">( पदं नुदतु। )</div>
              <div class="row"><button class="btn ghost" id="krAll">सर्वाणि पदानि रञ्जयतु</button></div>`;
            box.querySelectorAll(".kr-w").forEach((b) => b.onclick = () => {
              const w = S.words[+b.dataset.i];
              b.className = "kr-w kr-" + w[2] + "-b";
              const d = box.querySelector("#krDec"); d.classList.remove("muted");
              d.innerHTML = `<b>${w[0]}</b> — विभक्तिः : <b>${w[1]}</b> ; भागः : <b class="kr-${w[2]}">${w[3]}</b>`;
            });
            box.querySelector("#krAll").onclick = () => box.querySelectorAll(".kr-w").forEach((b) => { b.className = "kr-w kr-" + S.words[+b.dataset.i][2] + "-b"; });
          } else {
            const place = {};
            let sel = null;
            const chips = shuffle(S.words.map((w, i) => i));
            const roles = ["st", "ni", "ad", "sa"];
            function pdraw(checked) {
              box.innerHTML = pick + `<p class="muted">पदं नुदतु , अनन्तरं तस्य भागं नुदतु। ( यदि स्थापितं पदं पुनः नुदति , तर्हि तत् प्रत्यागच्छति। )</p>
                <div class="kr-sut">${chips.filter((i) => !(i in place)).map((i) => `<button class="kr-w${sel === i ? " sel" : ""}" data-i="${i}">${S.words[i][0]}</button>`).join(" ") || '<span class="muted">सर्वाणि पदानि स्थापितानि।</span>'}</div>
                <div class="kr-bins">${roles.map((r) => `<div class="kr-bin" data-r="${r}"><div class="kr-${r}"><b>${ROLE[r]}</b></div>${Object.keys(place).filter((i) => place[i] === r).map((i) => {
                  const ok = S.words[i][2] === r;
                  return `<span class="kr-w ${checked ? (ok ? "kr-ok" : "kr-bad") : ""}" data-back="${i}">${S.words[i][0]}${checked ? (ok ? " ✓" : " ✗") : ""}</span>`;
                }).join("")}</div>`).join("")}</div>
                <div class="row"><button class="btn" id="krCheck" ${Object.keys(place).length === S.words.length ? "" : "disabled"}>परीक्षत</button><button class="btn ghost" id="krReset">पुनः</button></div>
                ${checked ? `<div class="kr-info">${S.words.map((w) => `<div><b>${w[0]}</b> — ${w[1]} — <b class="kr-${w[2]}">${w[3]}</b></div>`).join("")}</div>` : ""}`;
              wire();
              box.querySelectorAll(".kr-sut .kr-w").forEach((b) => b.onclick = () => { sel = +b.dataset.i; pdraw(); });
              box.querySelectorAll(".kr-bin").forEach((b) => b.onclick = (ev) => {
                if (checked) return;
                if (sel !== null) { place[sel] = b.dataset.r; sel = null; pdraw(); return; }
                const back = ev.target.closest("[data-back]");
                if (back) { delete place[back.dataset.back]; pdraw(); }
              });
              box.querySelector("#krCheck").onclick = () => pdraw(true);
              box.querySelector("#krReset").onclick = () => { Object.keys(place).forEach((k) => delete place[k]); sel = null; pdraw(); };
            }
            pdraw();
            return;
          }
          wire();
        }
        function wire() {
          box.querySelectorAll(".kr-chip[data-i]").forEach((b) => b.onclick = () => { si = +b.dataset.i; draw(); });
          box.querySelectorAll(".kr-chip[data-m]").forEach((b) => b.onclick = () => { mode = b.dataset.m; draw(); });
        }
        draw();
      }
    },
  });
})();
