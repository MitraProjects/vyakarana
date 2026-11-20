// आगन्तृ-पञ्जिका — asks the visitor's name once, then records it (with the day) in the site owner's Google Form / Sheet.
// The name is sent at most once per day per device. No password; nothing else is collected.
(function () {
  const FORM = "https://docs.google.com/forms/d/e/1FAIpQLSexRqWs9ULIzUP1mDi463uv4sZsqLxPkKlJWNP0yO5_VV8aAg/formResponse";
  const FIELD = "entry.1753104305";
  const KEY = "vyakarana-visitor-v1";

  let st = {};
  try { st = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { st = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const today = () => new Date().toISOString().slice(0, 10);

  function send(name) {
    try {
      const body = new URLSearchParams(); body.append(FIELD, name);
      fetch(FORM, { method: "POST", mode: "no-cors", body }).catch(() => {});
    } catch (e) {}
    st.sent = today(); save();
  }

  function showName() {
    let el = document.getElementById("visitorName");
    if (!el) {
      el = document.createElement("button");
      el.id = "visitorName"; el.className = "visitor-name"; el.title = "नाम परिवर्तयतु";
      el.onclick = () => ask(true);
      const bar = document.querySelector("header") || document.body;
      bar.appendChild(el);
    }
    el.textContent = "नमः , " + st.name;
  }

  function ask(change) {
    const wrap = document.createElement("div");
    wrap.className = "visitor-wrap";
    wrap.innerHTML = `<div class="visitor-box" role="dialog" aria-modal="true" aria-labelledby="vTitle">
        <div class="visitor-title" id="vTitle">स्वागतम् !</div>
        <label for="vName">भवतः / भवत्याः नाम लिखतु —</label>
        <input id="vName" class="search" maxlength="60" autocomplete="name" value="${change && st.name ? st.name.replace(/"/g, "&quot;") : ""}">
        <div class="visitor-err" id="vErr" hidden>कृपया नाम लिखतु।</div>
        <p class="muted visitor-note">नाम केवलं सञ्चालिकायाः ज्ञानार्थं गृह्यते।</p>
        <div class="row"><button class="btn" id="vGo">प्रविशतु ›</button>${change ? '<button class="btn ghost" id="vCancel">पूर्ववत्</button>' : ""}</div>
      </div>`;
    document.body.appendChild(wrap);
    const inp = wrap.querySelector("#vName"), err = wrap.querySelector("#vErr");
    inp.focus();
    inp.oninput = () => { err.hidden = true; };
    const go = () => {
      const name = inp.value.trim().replace(/\s+/g, " ");
      if (!name) { err.hidden = false; inp.focus(); return; }
      const changed = name !== st.name;
      st.name = name; save();
      if (changed || st.sent !== today()) send(name);
      wrap.remove(); showName();
    };
    wrap.querySelector("#vGo").onclick = go;
    inp.onkeydown = (e) => { if (e.key === "Enter") go(); };
    const c = wrap.querySelector("#vCancel"); if (c) c.onclick = () => wrap.remove();
  }

  if (st.name) {
    showName();
    if (st.sent !== today()) send(st.name);   // a new day's visit is recorded once
  } else {
    ask(false);
  }
})();
