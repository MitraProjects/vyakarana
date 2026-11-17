# व्याकरणाभ्यासः — धातुगणाः

A Sanskrit vyākaraṇa learning site: पूर्वपीठिका (foundation) and पाठः १ (धातुगणाः),
each section with **पाठः** (reading) and **अभ्यासशाला** (practice) tabs.

No installation, no server code. It runs on GitHub Pages as plain files.

## Put it online (GitHub Pages)

1. On github.com, click **New repository**. Give it a name (for example `vyakarana`), choose **Public**, and click **Create repository**.
2. On the new repository page, click **uploading an existing file**.
3. Unzip the site on your computer, open the folder, select **everything inside it** (index.html, css, js, content, data, README.md) and drag it into the upload box. Click **Commit changes**.
4. Go to **Settings → Pages**. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
5. After a minute or two, the page shows your link: `https://<your-username>.github.io/vyakarana/`

## Where things are

| Folder / file | What it holds |
|---|---|
| `content/structure.js` | Order of parts and sections (the sidebar) |
| `content/f1.js` … `f4.js` | पूर्वपीठिका lessons + practice |
| `content/m1-*.js` | पाठः १ lessons + practice |
| `content/glossary.js` | पारिभाषिक-शब्दकोशः page — built automatically from each section's `words` list |
| `content/credits.js` | कृतज्ञता page — सद्गुरुभ्यो नमः ; add maṅgalācaraṇas where marked |
| `data/abhyasa.js` | The 94 dhātus for the "गणं जानीहि" game |
| `css/style.css`, `js/app.js` | Design and engine — normally no need to touch |

## Editing text (directly on GitHub)

Open a file under `content/`, click the ✏️ pencil icon, change the Sanskrit text inside the quotes, click **Commit changes**. The site updates in a minute.

Markup inside text:
- `**शब्दः**` → bold
- `{अ}` → red highlight
- ✓ and ✗ turn green / red automatically

Section word lists: each lesson has `words: [["शब्दः", "अर्थः", "English"], ...]`. They show in the section's शब्दकोशः tab (opened first on a learner's first visit) and in the main शब्दकोशः page.

Practice items:
- `mcq` — the **first option is the correct answer** (options are shuffled on screen)
- `tf` — `answer: true` or `answer: false`
- `split` — `parts` in the correct order; `extra` are wrong pieces to confuse
- `order` — `steps` in the correct order
- `match` — `pairs` of `[left, right]`
- `gana` — `pool` lists gaṇa numbers (1–10, 0 = आतिदेशिकः) to draw dhātus from

Learners' progress is stored only in their own browser. "सर्वं पुनः आरभताम्" on the home page clears it.
