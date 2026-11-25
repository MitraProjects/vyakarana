/* =============================================================
   व्याकरणाभ्यासः — site engine
   (You normally do not need to edit this file.
    Lesson text lives in /content, practice data in /data.)
   ============================================================= */
(function () {
  "use strict";

  const $ = (sel, el = document) => el.querySelector(sel);
  const main = $("#main");
  const sidebar = $("#sidebar");
  const GANA_NAMES = { 1: "भ्वादिः", 2: "अदादिः", 3: "जुहोत्यादिः", 4: "दिवादिः", 5: "स्वादिः",
    6: "तुदादिः", 7: "रुधादिः", 8: "तनादिः", 9: "क्र्यादिः", 10: "चुरादिः", 0: "आतिदेशिकः" };
  const NUM = "०१२३४५६७८९";
  const dn = (n) => String(n).replace(/\d/g, (d) => NUM[d]);

  // ---------------- storage (per browser) ----------------
  const KEY = "vyakarana-abhyasa-v1";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  let store = load();
  store.best = store.best || {};
  store.done = store.done || {};
  function setBest(key, score, total) {
    const prev = store.best[key];
    if (!prev || score / total > prev[0] / prev[1]) store.best[key] = [score, total];
    save(store);
  }
  function markDone(id) { store.done[id] = true; save(store); renderSidebar(); }

  // ---------------- inline markup ----------------
  // **bold**   {highlight}   ✓ ✗ coloured automatically
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function md(s) {
    if (s == null) return "";
    let h = esc(s);
    h = h.replace(/\[\[g\|(.+?)\]\]/g, '<b class="c-green">$1</b>').replace(/\[\[bl\|(.+?)\]\]/g, '<b class="c-blue">$1</b>');
    h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    h = h.replace(/\{(.+?)\}/g, '<span class="hl">$1</span>');
    h = h.replace(/✓/g, '<span class="yes">✓</span>').replace(/✗/g, '<span class="no">✗</span>');
    return h;
  }

  // ---------------- flatten structure (any depth) ----------------
  // A node is either a lesson { id, num, title } or a group { num, title, children: [...] }.
  const ORDER = [];
  const INFO = {};
  function firstLeaf(n) { return n.children ? firstLeaf(n.children[0]) : n; }
  function walk(nodes, part, pi, path) {
    nodes.forEach((n) => {
      const p2 = path.concat([n]);
      if (n.children) walk(n.children, part, pi, p2);
      else { ORDER.push(n.id); INFO[n.id] = { ...n, part, pi, path: p2 }; }
    });
  }
  SITE.parts.forEach((p, pi) => walk(p.sections, p, pi, []));
  (SITE.extra || []).forEach((e) => { INFO[e.id] = { ...e, extra: true, path: [e] }; });
  const label = (path) => path.map((n) => n.num).filter((x) => x && x !== "★").join(".");

  // ---- progress: ✓ = पाठः marked read + every required set ≥ 70% ; ◐ = started
  const PASS = 0.7;
  const MARKS = false;   // completion marks — turned off until decided
  store.read = store.read || {};
  function setPassed(id, i) { const b = store.best[id + ":" + i]; return !!b && b[0] / b[1] >= PASS; }
  function status(id) {
    const les = LESSONS[id];
    if (!les) return "";
    const sets = les.abhyasa || [];
    const req = sets.map((s, i) => i).filter((i) => !sets[i].optional);
    const read = !!store.read[id];
    const abOK = req.every((i) => setPassed(id, i));
    const started = read || sets.some((s, i) => store.best[id + ":" + i]);
    if (read && abOK) return "done";
    return started ? "part" : "";
  }
  function sectionDone(id) { return MARKS && status(id) === "done"; }
  function mark(id) {
    if (!MARKS) return "";
    const st = status(id);
    return st === "done" ? '<span class="tick">✓</span>' : st === "part" ? '<span class="tick part" title="आरब्धम्">◐</span>' : "";
  }
  function containsId(n, id) { return n.children ? n.children.some((c) => containsId(c, id)) : n.id === id; }

  // open / closed state of expandable topics (remembered in this browser)
  store.open = store.open || {};
  function isOpen(key, hasCurrent, dflt) {
    if (hasCurrent) return true;
    return key in store.open ? store.open[key] : dflt;
  }

  // remember only what the learner opens / closes by hand
  function rememberToggles(root) {
    root.querySelectorAll("details[data-key] > summary").forEach((sm) => sm.addEventListener("click", () => {
      const d = sm.parentElement; store.open[d.dataset.key] = !d.open; save(store);
    }));
  }

  // ---------------- sidebar ----------------
  function navNodes(nodes, current, path, depth) {
    let h = "";
    nodes.forEach((n) => {
      const p2 = path.concat([n]);
      const lab = label(p2);
      if (n.cap) {
        h += `<div class="nav-cap" style="padding-left:${12 + depth * 16}px">${md(n.title)}</div>` + navNodes(n.children, current, p2, depth);
        return;
      }
      if (n.children) {
        const key = "g:" + p2.map((x) => x.num + x.title).join("/");
        const open = isOpen(key, containsId(n, current), false);
        h += `<details class="nav-group" data-key="${esc(key)}" ${open ? "open" : ""}><summary class="nav-item parent" style="padding-left:${12 + depth * 16}px"><span class="num">${lab}</span>${md(n.title)}</summary>`;
        h += navNodes(n.children, current, p2, depth + 1);
        h += `</details>`;
      } else {
        h += `<a class="nav-item ${n.id === current ? "active" : ""}" style="padding-left:${12 + depth * 16}px" href="#/s/${n.id}"><span class="num">${lab}</span>${md(n.title)}${mark(n.id)}</a>`;
      }
    });
    return h;
  }
  function renderSidebar(current) {
    current = current || (location.hash.split("/")[2] || "");
    let h = `<a class="nav-home ${current === "" ? "active" : ""}" href="#/">मुखपृष्ठम्</a>`;
    SITE.parts.forEach((p, pi) => {
      const key = "p:" + pi;
      const open = isOpen(key, p.sections.some((n) => containsId(n, current)), false);
      h += `<details class="nav-partbox" data-key="${key}" ${open ? "open" : ""}><summary class="nav-part">${md(p.title)}</summary>${navNodes(p.sections, current, [], 0)}</details>`;
    });
    h += `<div class="nav-part plain">अन्यत्</div>`;
    (SITE.extra || []).forEach((e) => {
      h += `<a class="nav-item ${e.id === current ? "active" : ""}" href="#/s/${e.id}">${md(e.title)}</a>`;
    });
    sidebar.innerHTML = h;
    rememberToggles(sidebar);
  }

  // ---------------- lesson blocks ----------------
  function renderBlocks(blocks) {
    return (blocks || []).map((b) => {
      if (b.h) return `<h2>${md(b.h)}</h2>`;
      if (b.h3) return `<h3>${md(b.h3)}</h3>`;
      if (b.sub) return `<div class="subhead">${md(b.sub)}</div>`;
      if (b.p) return `<p>${md(b.p)}</p>`;
      if (b.pp) return `<p class="indent">${md(b.pp)}</p>`;
      if (b.note) return `<p class="note">${md(b.note)}</p>`;
      if (b.en) return `<p class="en">${md(b.en)}</p>`;
      if (b.verse) return `<blockquote class="verse">${b.verse.map(md).join("<br>")}</blockquote>`;
      if (b.list) return `<ul>${b.list.map((x) => `<li>${md(x)}</li>`).join("")}</ul>`;
      if (b.olist) return `<ol class="olist">${b.olist.map((x) => `<li>${md(x)}</li>`).join("")}</ol>`;
      if (b.box) return `<div class="box"><div class="box-title">${md(b.box)}</div>${(b.lines || []).map((x) => `<p>${md(x)}</p>`).join("")}</div>`;
      if (b.table) {
        const t = b.table;
        return `<div class="tbl-wrap"><table>${t.head ? `<thead><tr>${t.head.map((c) => `<th>${md(c)}</th>`).join("")}</tr></thead>` : ""}<tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      }
      if (b.html) return b.html;
      return "";
    }).join("\n");
  }

  // ---------------- pages ----------------
  function home() {
    let h = `<section class="hero">
      <h1>व्याकरणाभ्यासः</h1>
      <p class="lead">स्वागतम् ! अत्र पाणिनीय-व्याकरणं क्रमशः पठामः , अभ्यासशालायां च अभ्यासं कुर्मः।</p>
      <p class="muted">प्रत्येकस्मिन् विभागे द्वौ पटलौ स्तः — <b>पाठः</b> ( पठनसामग्री ) , <b>अभ्यासशाला</b> ( अभ्यासः )। क्रमेण पठतु ; किन्तु कमपि विभागं यदा कदा अपि उद्घाटयितुं शक्नोति।</p>
    </section>`;
    function homeNodes(nodes, path) {
      let out = "";
      nodes.forEach((n) => {
        const p2 = path.concat([n]);
        if (n.cap) {
          out += `</div><div class="grp-cap" style="margin-left:${(p2.length - 1) * 14}px">${md(n.title)}</div><div class="sec-grid">` + homeNodes(n.children, p2) + `</div><div class="sec-grid">`;
        } else if (n.children) {
          out += `</div><div class="grp-title" style="margin-left:${(p2.length - 1) * 14}px"><span class="num">${label(p2)}</span>${md(n.title)}</div><div class="sec-grid">` + homeNodes(n.children, p2) + `</div><div class="sec-grid">`;
        } else {
          out += `<a class="sec-card ${sectionDone(n.id) ? "done" : ""}" href="#/s/${n.id}"><span class="num">${label(p2)}</span><span class="t">${md(n.title)}</span>${mark(n.id)}</a>`;
        }
      });
      return out;
    }
    SITE.parts.forEach((p, pi) => {
      const key = "h:" + pi;
      const open = isOpen(key, false, true);
      h += `<details class="part-card" data-key="${key}" ${open ? "open" : ""}><summary><h2>${md(p.title)}</h2>${p.sub ? `<span class="muted">${md(p.sub)}</span>` : ""}</summary><div class="sec-grid">${homeNodes(p.sections, [])}</div></details>`;
    });
    h += `<section class="part-card small"><a href="#/s/glossary">पारिभाषिक-शब्दकोशः</a> · <a href="#/s/credits">कृतज्ञता</a>
      <div class="reset-all"><button class="btn ghost" id="resetAll">सर्वं पुनः आरभताम्</button><span class="muted">( सर्वे ✓ अङ्काः च अपनीयन्ते )</span></div></section>`;
    main.innerHTML = h;
    rememberToggles(main);
    $("#resetAll").onclick = () => {
      if (confirmBox()) { store = { best: {}, done: {}, open: {}, seenWords: {}, read: {} }; save(store); renderSidebar(""); home(); }
    };
  }
  function confirmBox() {
    // simple inline confirm without browser dialogs
    const btn = $("#resetAll");
    if (btn.dataset.armed) return true;
    btn.dataset.armed = "1"; btn.textContent = "निश्चयेन ? पुनः नुदतु";
    setTimeout(() => { if (btn) { delete btn.dataset.armed; btn.textContent = "सर्वं पुनः आरभताम्"; } }, 4000);
    return false;
  }

  function wordsTable(words) {
    return `<div class="tbl-wrap"><table class="words"><thead><tr><th>शब्दः</th><th>अर्थः</th><th>English</th></tr></thead><tbody>${
      words.map((w) => `<tr><td><b>${md(w[0])}</b></td><td>${md(w[1])}</td><td class="en-col">${md(w[2] || "")}</td></tr>`).join("")}</tbody></table></div>`;
  }

  // tab: "shabda" | "patha" | "abhyasa" | null (null = default)
  function sectionPage(id, tab) {
    const info = INFO[id];
    const les = LESSONS[id];
    if (!info || !les) { main.innerHTML = `<p>विभागः न प्राप्तः।</p>`; return; }
    const hasAb = !!(les.abhyasa && les.abhyasa.length);
    const hasW = !!(les.words && les.words.length);
    store.seenWords = store.seenWords || {};
    if (!tab) tab = hasW && !store.seenWords[id] ? "shabda" : "patha";   // first visit opens the शब्दकोशः
    if (tab === "shabda" && !hasW) tab = "patha";
    if (tab === "abhyasa" && !hasAb) tab = "patha";
    if (tab === "shabda") { store.seenWords[id] = true; save(store); }
    const crumbs = info.extra ? "" : `<div class="crumbs">${[info.part.title].concat(info.path.slice(0, -1).map((n) => n.title)).map(md).join(" › ")}</div>`;
    const lab = info.extra ? "" : label(info.path);
    let h = `${crumbs}<h1 class="sec-title">${lab ? `<span class="num">${lab}</span>` : ""}${md(les.title || info.title)}</h1>`;
    if (hasAb || hasW) {
      h += `<div class="tabs">` +
        (hasW ? `<a class="tab ${tab === "shabda" ? "on" : ""}" href="#/s/${id}/shabda">शब्दकोशः</a>` : "") +
        `<a class="tab ${tab === "patha" ? "on" : ""}" href="#/s/${id}/patha">पाठः</a>` +
        (hasAb ? `<a class="tab ${tab === "abhyasa" ? "on" : ""}" href="#/s/${id}/abhyasa">अभ्यासशाला</a>` : "") +
        `</div>`;
    }
    h += `<div id="tabBody"></div>`;
    const i = ORDER.indexOf(id);
    if (i >= 0) {
      const prev = ORDER[i - 1], next = ORDER[i + 1];
      h += `<div class="pager">${prev ? `<a class="btn ghost" href="#/s/${prev}">‹ पूर्वम्</a>` : "<span></span>"}${next ? `<a class="btn" href="#/s/${next}">अग्रे ›</a>` : ""}</div>`;
    }
    main.innerHTML = h;
    const body = $("#tabBody");
    if (tab === "abhyasa") abhyasaList(id, body);
    else if (tab === "shabda") {
      body.innerHTML = `<p class="muted">अस्मिन् विभागे एते पारिभाषिक-शब्दाः आगच्छन्ति। पाठात् पूर्वम् एकवारं पठतु ; पाठानन्तरं पुनः पश्यतु।</p>${wordsTable(les.words)}
        <div class="to-ab"><a class="btn" href="#/s/${id}/patha">पाठं पठतु ›</a></div>`;
    } else {
      body.innerHTML = (hasW ? `<p class="to-words"><a href="#/s/${id}/shabda">शब्दकोशं पश्यतु</a></p>` : "") +
        `<article class="lesson">${renderBlocks(les.blocks)}</article>` +
        (info.extra || !MARKS ? "" : `<div class="read-box"><button class="btn ${store.read[id] ? "read-on" : "ghost"}" id="readBtn">${store.read[id] ? "✓ पठितम्" : "पठितम् इति अङ्कयतु"}</button><span class="muted">${store.read[id] ? "पुनः नुदतु चेत् अङ्कनम् अपगच्छति।" : "पाठं सम्पूर्णं पठित्वा नुदतु।"}</span></div>`) +
        (hasAb ? `<div class="to-ab"><a class="btn" href="#/s/${id}/abhyasa">अभ्यासशालां गच्छतु ›</a></div>` : "");
      const rb = $("#readBtn");
      if (rb) rb.onclick = () => { store.read[id] = !store.read[id]; save(store); renderSidebar(id); sectionPage(id, "patha"); };
      if (les.afterRender) les.afterRender(body, { md, renderBlocks, buildGlossary });
    }
  }

  // main शब्दकोशः page: every section's words, grouped by पाठः, searchable
  function buildGlossary(body) {
    // one tab per part (module); inside, one heading per sub-module with its words
    const parts = [];
    SITE.parts.forEach((p) => {
      const subs = [];
      ORDER.filter((id) => INFO[id].part === p).forEach((id) => {
        const words = (LESSONS[id] && LESSONS[id].words) || [];
        if (words.length) subs.push({ id, words });
      });
      if (subs.length) parts.push({ title: p.title, subs });
    });
    let cur = 0;
    const gbody = body.querySelector("#gbody");
    gbody.insertAdjacentHTML("beforebegin", `<div class="g-tabs" id="gtabs">${parts.map((p, i) => `<button class="g-tab${i ? "" : " on"}" data-i="${i}">${md(p.title)}</button>`).join("")}</div>`);
    const tabs = body.querySelectorAll(".g-tab");
    const head = (id) => `<h3 class="g-sub"><a href="#/s/${id}/shabda">${label(INFO[id].path)} ${md(INFO[id].title)}</a></h3>`;
    const table = (rows, id) => `<div class="tbl-wrap"><table class="words"><thead><tr><th>शब्दः</th><th>अर्थः</th><th>English</th><th>विभागः</th></tr></thead><tbody>${
      rows.map((w) => `<tr><td><b>${md(w[0])}</b></td><td>${md(w[1])}</td><td class="en-col">${md(w[2] || "")}</td><td><a href="#/s/${id}/shabda/${LESSONS[id].words.indexOf(w)}">${label(INFO[id].path)} ${md(INFO[id].title)}</a></td></tr>`).join("")}</tbody></table></div>`;
    function draw(f) {
      f = (f || "").trim().toLowerCase();
      if (!f) {   // tab view
        tabs.forEach((t, i) => t.classList.toggle("on", i === cur));
        let last = null;
        gbody.innerHTML = parts[cur].subs.map((s) => {
          const path = INFO[s.id].path, g = path.length > 1 ? path[0] : null;
          const gh = g && g !== last ? `<h2 class="g-grp">${md((g.num ? g.num + " . " : "") + g.title)}</h2>` : "";
          last = g || last;
          return gh + head(s.id) + table(s.words, s.id);
        }).join("");
        return;
      }
      tabs.forEach((t) => t.classList.remove("on"));   // search view: all modules
      gbody.innerHTML = parts.map((p) => {
        const hits = p.subs.map((s) => ({ id: s.id, rows: s.words.filter((w) => w.join(" ").toLowerCase().includes(f)) })).filter((s) => s.rows.length);
        return hits.length ? `<h2>${md(p.title)}</h2>` + hits.map((s) => head(s.id) + table(s.rows, s.id)).join("") : "";
      }).join("") || `<p class="muted">न प्राप्तम्।</p>`;
    }
    const search = body.querySelector("#gsearch");
    tabs.forEach((t) => t.onclick = () => { cur = +t.dataset.i; search.value = ""; draw(""); });
    search.oninput = (e) => draw(e.target.value);
    draw("");
  }

  // ---------------- abhyasa ----------------
  function abhyasaList(id, body) {
    const les = LESSONS[id];
    let h = `<div class="ab-intro muted">अत्र अभ्यासाः सन्ति। प्रत्येकं अभ्यासं पुनः पुनः कर्तुं शक्नोति — प्रश्नाः प्रतिवारं नूतनक्रमेण आगच्छन्ति।${MARKS ? " यदि प्रत्येकस्मिन् अभ्यासे ७०% अङ्काः प्राप्यन्ते , तर्हि ✓ भवति।" : ""}</div><div class="ab-grid">`;
    les.abhyasa.forEach((set, i) => {
      const best = store.best[id + ":" + i];
      const n = set.gana ? (set.gana.count || 10) : set.items.length;
      h += `<div class="ab-card"><div class="ab-title">${md(set.title)}</div>
        <div class="muted">${dn(n)} प्रश्नाः${MARKS && set.optional ? " · ऐच्छिकम्" : ""}${best ? ` · श्रेष्ठाङ्काः ${dn(best[0])} / ${dn(best[1])}` : ""}${MARKS && setPassed(id, i) ? ' <span class="yes">✓</span>' : ""}</div>
        <button class="btn" data-set="${i}">${best ? "पुनः आरभताम्" : "आरभताम्"}</button></div>`;
    });
    h += `</div>`;
    body.innerHTML = h;
    body.querySelectorAll("button[data-set]").forEach((b) => b.onclick = () => runSet(id, +b.dataset.set, body));
  }

  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function ganaQuestions(cfg) {
    const pool = cfg.pool;
    let rows = (window.ABHYASA || []).filter((r) => pool.includes(r.gnum));
    rows = shuffle(rows).slice(0, cfg.count || 10);
    const opts = pool.map((g) => GANA_NAMES[g]);
    return rows.map((r) => ({
      type: "gana", q: `**${r.d}** → **${r.k}**`, sub: r.artha, options: opts, answer: GANA_NAMES[r.gnum], row: r,
    }));
  }

  function runSet(id, si, body) {
    const set = LESSONS[id].abhyasa[si];
    const qs = set.gana ? ganaQuestions(set.gana) : shuffle(set.items);
    let qi = 0, score = 0;
    const key = id + ":" + si;

    function next() {
      if (qi >= qs.length) return finish();
      const q = qs[qi];
      body.innerHTML = `<div class="quiz">
        <div class="quiz-head"><span class="muted">${md(set.title)}</span><span class="prog">${dn(qi + 1)} / ${dn(qs.length)}</span></div>
        <div class="bar"><span style="width:${(qi / qs.length) * 100}%"></span></div>
        <div id="qbox"></div><div id="fb"></div>
        <div class="quiz-foot"><button class="btn ghost" id="quit">अभ्यासशालां प्रति</button><button class="btn" id="nextQ" hidden>अग्रे ›</button></div>
      </div>`;
      $("#quit").onclick = () => abhyasaList(id, body);
      $("#nextQ").onclick = () => { qi++; next(); };
      renderQ(q, $("#qbox"), (ok, extra) => {
        if (ok) score++;
        const fb = $("#fb");
        fb.className = "fb " + (ok ? "ok" : "bad");
        fb.innerHTML = `<div class="fb-title">${ok ? "साधु !" : "न सम्यक्।"}</div>${extra || ""}${q.explain ? `<div class="fb-ex">${md(q.explain)}</div>` : ""}`;
        $("#nextQ").hidden = false; $("#nextQ").focus();
      });
    }
    function finish() {
      setBest(key, score, qs.length);
      renderSidebar(id);
      const pct = score / qs.length;
      body.innerHTML = `<div class="quiz result">
        <div class="score">${dn(score)} / ${dn(qs.length)}</div>
        <p>${pct === 1 ? "अत्युत्तमम् ! सर्वे उत्तराः सम्यक्। ✓" : !MARKS ? (pct >= 0.5 ? "उत्तमम् ! पुनः प्रयत्नेन पूर्णाङ्कान् प्राप्नोतु।" : "पाठं पुनः पठित्वा पुनः प्रयतताम्।") : pct >= PASS ? "उत्तमम् ! ✓ — पुनः प्रयत्नेन पूर्णाङ्कान् प्राप्नोतु।" : "७०% अङ्काः आवश्यकाः। पाठं पुनः पठित्वा पुनः प्रयतताम्।"}</p>
        <div class="row"><button class="btn" id="again">पुनः आरभताम्</button><button class="btn ghost" id="back">अभ्यासशालां प्रति</button><a class="btn ghost" href="#/s/${id}/patha">पाठं पठतु</a></div>
      </div>`;
      $("#again").onclick = () => runSet(id, si, body);
      $("#back").onclick = () => abhyasaList(id, body);
    }
    next();
  }

  // ---------------- question types ----------------
  function renderQ(q, box, done) {
    const T = q.type;
    if (T === "mcq" || T === "gana") return mcq(q, box, done);
    if (T === "tf") return tf(q, box, done);
    if (T === "split" || T === "order") return seq(q, box, done);
    if (T === "match") return match(q, box, done);
    box.innerHTML = "?";
  }

  function mcq(q, box, done) {
    const correct = q.type === "gana" ? q.answer : q.options[0];
    const opts = q.type === "gana" ? q.options : shuffle(q.options);
    box.innerHTML = `<div class="q">${md(q.q)}</div>${q.sub ? `<div class="q-sub">${md(q.sub)}</div>` : ""}
      ${q.type === "gana" ? `<div class="q-ask">अयं धातुः कस्मिन् गणे अस्ति ?</div>` : ""}
      <div class="opts ${opts.length > 4 ? "grid" : ""}">${opts.map((o, i) => `<button class="opt" data-i="${i}">${md(o)}</button>`).join("")}</div>`;
    box.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
      const pick = opts[+b.dataset.i];
      const ok = pick === correct;
      box.querySelectorAll(".opt").forEach((x) => {
        x.disabled = true;
        if (opts[+x.dataset.i] === correct) x.classList.add("right");
      });
      if (!ok) b.classList.add("wrong");
      let extra = "";
      if (!ok) extra += `<div>उत्तरम् — <b>${md(correct)}</b></div>`;
      if (q.type === "gana") {
        const r = q.row;
        extra += `<div class="fb-ex"><b>${md(r.k)}</b> = ${md(r.split)}<br>${md(r.vis)}<br>मूलविकरणप्रत्ययः — ${md(r.mula)} · ${md(r.gana)}</div>`;
      }
      done(ok, extra);
    });
  }

  function tf(q, box, done) {
    box.innerHTML = `<div class="q">${md(q.q)}</div>
      <div class="opts two"><button class="opt" data-v="1"><span class="yes">✓</span> सत्यम्</button><button class="opt" data-v="0"><span class="no">✗</span> असत्यम्</button></div>`;
    box.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
      const v = b.dataset.v === "1", ok = v === !!q.answer;
      box.querySelectorAll(".opt").forEach((x) => { x.disabled = true; if ((x.dataset.v === "1") === !!q.answer) x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      done(ok, ok ? "" : `<div>उत्तरम् — <b>${q.answer ? "✓ सत्यम्" : "✗ असत्यम्"}</b></div>`);
    });
  }

  // split (pada-vibhaga) and order (sopana-krama): tap pieces into slots
  function seq(q, box, done) {
    const target = q.type === "split" ? q.parts : q.steps;
    const pieces = shuffle(target.concat(q.extra || [])).map((t, i) => ({ t, i, used: false }));
    const slots = [];
    const ask = q.type === "split" ? `पदं विभजत — **${q.word}**` : q.q;
    const hint = q.type === "split" ? (q.hint || "धातुः + विकरणप्रत्ययः + तिङ्-प्रत्ययः") : "सोपानानि क्रमेण नुदतु";
    function draw() {
      box.innerHTML = `<div class="q">${md(ask)}</div><div class="q-sub">${md(hint)}</div>
        <div class="slots ${q.type}">${target.map((_, k) => {
          const s = slots[k];
          return `<button class="slot ${s ? "filled" : ""}" data-k="${k}">${s ? md(s.t) : `<span class="muted">${dn(k + 1)}</span>`}</button>`;
        }).join(q.type === "split" ? '<span class="plus">+</span>' : '<span class="arrow">↓</span>')}</div>
        <div class="chips">${pieces.map((p) => `<button class="chip" data-i="${p.i}" ${p.used ? "disabled" : ""}>${md(p.t)}</button>`).join("")}</div>
        <div class="row"><button class="btn" id="check" ${slots.filter(Boolean).length === target.length ? "" : "disabled"}>परीक्षताम्</button></div>`;
      box.querySelectorAll(".chip").forEach((c) => c.onclick = () => {
        const p = pieces.find((x) => x.i === +c.dataset.i);
        const k = target.findIndex((_, kk) => !slots[kk]);
        if (k < 0) return;
        slots[k] = p; p.used = true; draw();
      });
      box.querySelectorAll(".slot.filled").forEach((s) => s.onclick = () => {
        const k = +s.dataset.k; slots[k].used = false; slots[k] = null; draw();
      });
      $("#check", box).onclick = () => {
        const ok = target.every((t, k) => slots[k] && slots[k].t === t);
        box.querySelectorAll(".slot").forEach((s, k) => { s.disabled = true; s.classList.add(slots[k].t === target[k] ? "right" : "wrong"); });
        box.querySelectorAll(".chip").forEach((c) => c.disabled = true);
        $("#check", box).remove();
        done(ok, ok ? "" : `<div>उत्तरम् — <b>${target.map(md).join(q.type === "split" ? " + " : " → ")}</b></div>`);
      };
    }
    draw();
  }

  function match(q, box, done) {
    const left = shuffle(q.pairs.map((p, i) => ({ t: p[0], i })));
    const right = shuffle(q.pairs.map((p, i) => ({ t: p[1], i })));
    let selL = null, mistakes = 0, matched = 0;
    box.innerHTML = `<div class="q">${md(q.q || "युग्मानि योजयत")}</div><div class="q-sub">वामतः एकं , दक्षिणतः एकं नुदतु।</div>
      <div class="match"><div class="col" id="colL">${left.map((x) => `<button class="mi" data-i="${x.i}">${md(x.t)}</button>`).join("")}</div>
      <div class="col" id="colR">${right.map((x) => `<button class="mi" data-i="${x.i}">${md(x.t)}</button>`).join("")}</div></div>`;
    box.querySelectorAll("#colL .mi").forEach((b) => b.onclick = () => {
      box.querySelectorAll("#colL .mi").forEach((x) => x.classList.remove("sel"));
      b.classList.add("sel"); selL = b;
    });
    box.querySelectorAll("#colR .mi").forEach((b) => b.onclick = () => {
      if (!selL) return;
      if (selL.dataset.i === b.dataset.i) {
        selL.classList.remove("sel"); selL.classList.add("right"); b.classList.add("right");
        selL.disabled = true; b.disabled = true; selL = null; matched++;
        if (matched === q.pairs.length) done(mistakes === 0, mistakes ? `<div>${dn(mistakes)} दोषाः अभवन्।</div>` : "");
      } else {
        mistakes++; b.classList.add("wrong"); setTimeout(() => b.classList.remove("wrong"), 600);
      }
    });
  }

  // ---------------- router ----------------
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    document.body.classList.remove("nav-open");
    if (parts[0] === "s" && parts[1]) {
      renderSidebar(parts[1]);
      sectionPage(parts[1], ["abhyasa", "patha", "shabda"].includes(parts[2]) ? parts[2] : null);
    } else { renderSidebar(""); home(); }
    window.scrollTo(0, 0);
    // #/s/<id>/shabda/<n> — jump to word n in that lesson's शब्दकोशः and highlight it
    if (parts[2] === "shabda" && parts[3] !== undefined) {
      const tr = document.querySelectorAll("table.words tbody tr")[+parts[3]];
      if (tr) { tr.classList.add("w-hit"); tr.scrollIntoView({ block: "center" }); }
    }
  }
  $("#menuBtn").onclick = () => document.body.classList.toggle("nav-open");
  // clicking a link to the page you are already on (e.g. the अभ्यासशाला tab during a quiz) re-opens it
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (a && a.getAttribute("href") === location.hash) { e.preventDefault(); route(); }
  });
  window.addEventListener("hashchange", route);
  route();
})();
