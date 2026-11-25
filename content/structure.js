// ============================================================
//  STRUCTURE OF THE SITE
//  Groups can be nested: { num, title, children: [ ... ] }  —  order of parts and sections
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
        { id: "m1-guna", num: "७", title: "गुणः", children: [
          { id: "m1-guna-ka", num: "क", title: "स्थलद्वयम्" },
          { id: "m1-guna-kha", num: "ख", title: "भ्वादिः वा तुदादिः वा ?" },
        ]},
        { id: "m1-rudhadi", num: "८", title: "रुधादिगणः" },
        { id: "m1-tanadi", num: "९", title: "तनादिगणः" },
        { id: "m1-kryadi", num: "१०", title: "क्र्यादिगणः" },
        { id: "m1-curadi", num: "११", title: "चुरादिगणः" },
        { id: "m1-paribhasha", num: "१२", title: "पारिभाषिकपदानि" },
        { id: "m1-mahabhyasa", num: "१३", title: "महाभ्यासः" },
      ],
    },
    {
      title: "पाठः २ — अस्माकं मूल-यन्त्राणि",
      sub: "",
      sections: [
        { id: "m2-intro", num: "०", title: "परिचयः" },
        { num: "१", title: "माहेश्वराणि सूत्राणि", children: [
          { cap: true, title: "पाठः", children: [
            { num: "क", title: "पूर्वज्ञानम् — वर्णाः", children: [
              { id: "m2-1k1", num: "१", title: "अक्षराणि" },
              { id: "m2-1k2", num: "२", title: "स्वराणां भेदाः" },
              { id: "m2-1k3", num: "३", title: "व्यञ्जनानि" },
              { id: "m2-1k4", num: "४", title: "उच्चारणस्थानानि" },
            ]},
            { id: "m2-1kh", num: "ख", title: "माहेश्वराणि सूत्राणि" },
            { id: "m2-1g", num: "ग", title: "प्रत्याहाराः" },
            { num: "घ", title: "प्रत्याहाराणाम् उपयोगः", children: [
              { id: "m2-1gh1", num: "१", title: "यण्-सन्धिः" },
              { id: "m2-1gh2", num: "२", title: "यान्तवान्तादेश-सन्धिः" },
              { id: "m2-1gh3", num: "३", title: "सवर्णदीर्घ-सन्धिः" },
              { id: "m2-1gh4", num: "४", title: "श्चुत्व-सन्धिः" },
            ]},
            { id: "m2-1ng", num: "ङ", title: "महाभ्यासः" },
          ]},
          { cap: true, title: "परिशिष्टानि", children: [
            { id: "m2-krida", num: "च", title: "सन्धि-क्रीडाङ्गणम्" },
            { id: "m2-uttarani", num: "छ", title: "उत्तराणि" },
          ]},
        ]},
        { num: "२", title: "पाणिनीयं सूत्रं कथं पठनीयम्", children: [
          { cap: true, title: "पाठः", children: [
            { id: "m2-2k", num: "क", title: "कार्याणि" },
            { id: "m2-2kh", num: "ख", title: "सूत्रेषु विभक्तीनाम् अर्थाः" },
            { id: "m2-2g", num: "ग", title: "निमित्तम्" },
            { id: "m2-2gh", num: "घ", title: "व्याख्यानस्य आकृतिः" },
            { id: "m2-2ng", num: "ङ", title: "उदाहरणम् — यण् सन्धिः" },
            { id: "m2-2c", num: "च", title: "पाणिनीय-सूत्राणि षड्विधानि" },
            { id: "m2-2ch", num: "छ", title: "महाभ्यासः" },
          ]},
          { cap: true, title: "परिशिष्टानि", children: [
            { id: "m2-2uttarani", num: "ज", title: "उत्तराणि" },
          ]},
        ]},
        { num: "३", title: "इत्संज्ञा-प्रकरणम्", children: [
          { cap: true, title: "पाठः", children: [
            { id: "m2-3k", num: "क", title: "उपदेशः , अनुबन्धः , इत्" },
            { id: "m2-3kh", num: "ख", title: "चत्वारि सूत्राणि" },
            { id: "m2-3g", num: "ग", title: "त्रीणि सूत्राणि" },
            { id: "m2-3gh", num: "घ", title: "इत्-लोप-विधिः , अनुवृत्ति-क्रमः" },
            { id: "m2-3ng", num: "ङ", title: "अभ्यासः" },
            { id: "m2-3c", num: "च", title: "अनुबन्ध-वर्णाः किमर्थम् ?" },
            { id: "m2-3ch", num: "छ", title: "प्रत्याहार-सिद्धिः" },
          ]},
          { cap: true, title: "परिशिष्टानि", children: [
            { id: "m2-3j", num: "ज", title: "इत्संज्ञा-चित्रम्" },
            { id: "m2-3jh", num: "झ", title: "इत्संज्ञाप्रकरणम् अभ्यासः च — सुब्रह्मण्यः" },
            { id: "m2-3uttarani", num: "ञ", title: "उत्तराणि" },
          ]},
        ]},
      ],
    },
  ],
  extra: [
    { id: "glossary", title: "पारिभाषिक-शब्दकोशः" },
    { id: "credits", title: "कृतज्ञता" },
  ],
};
