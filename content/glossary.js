// पारिभाषिक-शब्दकोशः — built automatically from the "words" list of every section.
// To add a word, add it to that section's  words: [ ["शब्दः", "अर्थः", "English"], ... ]
L("glossary", {
  title: "पारिभाषिक-शब्दकोशः",
  blocks: [ { html: '<input class="search" id="gsearch" placeholder="अन्विष्यताम् — शब्दः / अर्थः / English"><div id="gbody"></div>' } ],
  afterRender: function (body, h) { h.buildGlossary(body); },
});
