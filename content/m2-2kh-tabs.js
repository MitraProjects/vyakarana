// २.ख — विभक्ति-wise tabs inside the पाठः tab (blocks unchanged, only grouped)
(function(){
 const X=LESSONS["m2-2kh"], bl=X.blocks;
 const cut=[["षष्ठी",5],["प्रथमा",15],["सप्तमी",33],["पञ्चमी",41],["तृतीया",68],["सारांशः",76],["अभ्यासः",83],[null,bl.length]];
 X.tabs=cut.slice(0,-1).map((c,i)=>({t:c[0],blocks:bl.slice(c[1],cut[i+1][1])}));
 X.blocks=bl.slice(0,5);
 X.afterRender=function(body,h){
  const art=body.querySelector("article.lesson");
  art.insertAdjacentHTML("beforeend",`<div class="g-tabs pdf-tabs">${X.tabs.map((t,i)=>`<button class="g-tab${i?"":" on"}" data-i="${i}">${h.md(t.t)}</button>`).join("")}</div><div id="pdfTab"></div>`);
  const box=art.querySelector("#pdfTab");
  const show=(i)=>{box.innerHTML=h.renderBlocks(X.tabs[i].blocks)+(i<X.tabs.length-1?`<div style="text-align:right;margin:16px 0"><button class="btn nxt">अग्रे — ${X.tabs[i+1].t} ›</button></div>`:"");
   art.querySelectorAll(".pdf-tabs .g-tab").forEach(b=>b.classList.toggle("on",+b.dataset.i===i));
   const n=box.querySelector(".nxt"); if(n) n.onclick=()=>{show(i+1);art.querySelector(".pdf-tabs").scrollIntoView();};};
  art.querySelectorAll(".pdf-tabs .g-tab").forEach(b=>b.onclick=()=>show(+b.dataset.i));
  show(0);
 };
})();
