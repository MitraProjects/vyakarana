// ============================================================
//  STRUCTURE OF THE SITE  —  order of parts and sections
//  Each "id" must match a lesson file entry:  L("id", {...})
// ============================================================
window.LESSONS = {};
function L(id, data) { window.LESSONS[id] = data; }

window.SITE = {
  title: "व्याकरणाभ्यासः",
  parts: [
    {
      title: "पूर्वपीठिका",
      sub: "आधारभूतविषयाः",
      sections: [
        { id: "f1", num: "१", title: "व्याकरणपरिचयः" },
        { id: "f2", num: "२", title: "धातुः प्रातिपदिकं च" },
        { id: "f3", num: "३", title: "प्रत्ययः" },
        { id: "f4", num: "४", title: "दश धातुगणाः" },
      ],
    },
    {
      title: "पाठः १ — धातुगणाः",
      sub: "",
      sections: [
        { id: "m1-intro", num: "०", title: "परिचयः" },
        { id: "m1-bhvadi", num: "१", title: "भ्वादिगणः" },
        { id: "m1-adadi", num: "२", title: "अदादिगणः" },
        { id: "m1-juhotyadi", num: "३", title: "जुहोत्यादिगणः" },
        { id: "m1-divadi", num: "४", title: "दिवादिगणः" },
        { id: "m1-svadi", num: "५", title: "स्वादिगणः" },
        { id: "m1-tudadi", num: "६", title: "तुदादिगणः" },
        { id: "m1-guna", num: "★", title: "गुणः", children: [
          { id: "m1-guna-ka", num: "क", title: "स्थलद्वयम्" },
          { id: "m1-guna-kha", num: "ख", title: "भ्वादिः वा तुदादिः वा ?" },
        ]},
        { id: "m1-rudhadi", num: "७", title: "रुधादिगणः" },
        { id: "m1-tanadi", num: "८", title: "तनादिगणः" },
        { id: "m1-kryadi", num: "९", title: "क्र्यादिगणः" },
        { id: "m1-curadi", num: "१०", title: "चुरादिगणः" },
        { id: "m1-paribhasha", num: "★", title: "पारिभाषिकपदानि" },
        { id: "m1-mahabhyasa", num: "★", title: "महाभ्यासः" },
      ],
    },
  ],
  extra: [
    { id: "glossary", title: "पारिभाषिक-शब्दकोशः" },
    { id: "credits", title: "कृतज्ञता" },
  ],
};
