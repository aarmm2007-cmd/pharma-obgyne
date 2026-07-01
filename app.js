// ============================================================================
// OB-GYN Pharmacology — app logic
// Vanilla JS, hash-based routing, single-file render functions.
// ============================================================================

const D = window.OBGYN_DATA;
const root = document.getElementById('app');

// ---------------------------------------------------------------------------
// Icons (inline SVG, stroke-based, consistent weight)
// ---------------------------------------------------------------------------
const ICON = {
  back: `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v9.5a1 1 0 001 1h12a1 1 0 001-1V10"/></svg>`,
  pill: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-45 12 12)"/><line x1="12" y1="6.5" x2="12" y2="17.5" transform="rotate(-45 12 12)"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  cards: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="14" height="12" rx="2"/><path d="M7 6V4a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-2"/></svg>`,
  quiz: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 115 .5c0 1.5-2.5 2-2.5 3.5"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>`,
  algo: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M6 8.5V12a4 4 0 004 4M18 8.5V12a4 4 0 01-4 4"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
  warn: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 16.5h.01"/><path d="M10.3 3.9L2.5 18a1.5 1.5 0 001.3 2.2h16.4a1.5 1.5 0 001.3-2.2L13.7 3.9a1.5 1.5 0 00-2.6 0z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6.5L4 18a2 2 0 001.8 3h12.4a2 2 0 001.8-3l-5-9.5V2"/><path d="M9 2h6M7 14h10"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-9.5-9C.7 8.4 2 4.5 5.8 4a4.5 4.5 0 016.2 1.5A4.5 4.5 0 0118.2 4c3.8.5 5.1 4.4 3.3 8-2.5 4.5-9.5 9-9.5 9z"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M7 5H4a1 1 0 00-1 1v1a4 4 0 004 4M17 5h3a1 1 0 011 1v1a4 4 0 01-4 4"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0115.4-6.3L21 8M21 3v5h-5M21 12a9 9 0 01-15.4 6.3L3 16M3 21v-5h5"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  stopwatch: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6M12 2v3"/></svg>`,
};

function tierColors(tierKey){
  switch(tierKey){
    case 'first-line': return {bg:'var(--teal)', tint:'var(--teal-tint)', text:'var(--teal-deep)'};
    case 'essential': return {bg:'var(--teal)', tint:'var(--teal-tint)', text:'var(--teal-deep)'};
    case 'alternative': return {bg:'var(--steel)', tint:'var(--steel-tint)', text:'var(--steel)'};
    case 'second-line': return {bg:'var(--amber)', tint:'var(--amber-tint)', text:'#6B4A1E'};
    case 'caution': return {bg:'var(--amber)', tint:'var(--amber-tint)', text:'#6B4A1E'};
    case 'contraindicated': return {bg:'var(--brick)', tint:'var(--brick-tint)', text:'var(--brick)'};
    default: return {bg:'var(--ink-40)', tint:'var(--parchment-deep)', text:'var(--ink-60)'};
  }
}

function teratogenRiskColors(risk){
  // Chapter 11's risk strings ("CONTRAINDICATED", "HIGH", "HIGH — T1 only", etc.)
  // don't match the standard tier keys, so map them here instead.
  if (risk.indexOf('CONTRAINDICATED') !== -1) return tierColors('contraindicated');
  if (risk.indexOf('HIGH') !== -1) return tierColors('second-line');
  return tierColors('caution');
}

function escapeHtml(str){
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------
const routes = {};
function route(path, fn){ routes[path] = fn; }
function navigate(hash){ window.location.hash = hash; }
function currentRoute(){
  const hash = window.location.hash.slice(1) || '/';
  const [path, query] = hash.split('?');
  const params = {};
  if (query) query.split('&').forEach(p => { const [k,v] = p.split('='); params[k] = decodeURIComponent(v||''); });
  return { path, params };
}

function render(){
  const { path, params } = currentRoute();
  const seg = path.split('/').filter(Boolean);
  const base = '/' + (seg[0] || '');
  const handler = routes[base] || routes['/'];
  window.scrollTo(0,0);
  handler(seg, params);
}
window.addEventListener('hashchange', render);

// ---------------------------------------------------------------------------
// Shared chrome: topbar + bottom nav
// ---------------------------------------------------------------------------
function shell(innerHtml, opts={}){
  const { title, eyebrow, showBack=false, backHash='#/', activeNav='home', noTopbar=false } = opts;
  const topbar = noTopbar ? '' : `
    <div class="topbar">
      ${showBack ? `<button class="back-btn" onclick="navigate('${backHash}')">${ICON.back}</button>` : ''}
      <div style="flex:1;min-width:0;">
        ${eyebrow ? `<div class="topbar-eyebrow">${eyebrow}</div>` : ''}
        ${title ? `<div class="topbar-title">${title}</div>` : ''}
      </div>
    </div>`;
  const nav = `
    <div class="bottomnav">
      ${navBtn('home','Home','#/',activeNav)}
      ${navBtn('book','Chapters','#/chapters',activeNav)}
      ${navBtn('pill','Drugs','#/drugs',activeNav)}
      ${navBtn('cards','Cards','#/flashcards',activeNav)}
      ${navBtn('quiz','Quiz','#/quiz',activeNav)}
    </div>`;
  root.innerHTML = `${topbar}<div class="view ${noTopbar?'':''} fade-in">${innerHtml}</div>${nav}`;
}
function navBtn(key, label, hash, active){
  return `<button class="navbtn ${active===key?'active':''}" onclick="navigate('${hash}')">${ICON[key]}<span>${label}</span></button>`;
}

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------
route('/', () => {
  const fullChapters = D.CHAPTERS.filter(c => c.status === 'full');
  const condDrugsCount = D.CONDITIONS_CH3.reduce((s,c)=>s+c.drugs.length,0) + D.CONDITIONS_CH5.reduce((s,c)=>s+c.drugs.length,0);
  const totalDrugs = D.DRUGS.length + condDrugsCount;

  const html = `
    <div class="hero">
      <div class="hero-eyebrow"><span class="dot"></span>FIRST EDITION · 2026 · CLINICAL COMPANION</div>
      <h1>${D.BOOK_META.title}</h1>
      <p class="lede">${D.BOOK_META.subtitle} — a bedside-ready companion built from the full textbook, for the moment of hesitation before you prescribe.</p>
      <div class="author-line">By <b>${D.BOOK_META.author}</b>, ${D.BOOK_META.authorCreds}</div>
      <div class="guideline-row">
        ${D.BOOK_META.guidelines.map(g => `<span class="guideline-chip">${g}</span>`).join('')}
      </div>
    </div>

    <div class="stat-row">
      <div class="stat-card"><span class="num">12</span><span class="lbl">Chapters</span></div>
      <div class="stat-card"><span class="num">${totalDrugs}</span><span class="lbl">Drug monographs</span></div>
      <div class="stat-card"><span class="num">${D.QUIZ_BANK.length}</span><span class="lbl">SBA questions</span></div>
    </div>

    <div class="section-label">Study tools</div>
    <div class="tool-grid">
      <a class="tool-card" href="#/drugs">
        <div class="icon" style="background:var(--teal-tint)">${ICON.pill.replace('<svg','<svg style="stroke:var(--teal-deep)"')}</div>
        <div class="ttl">Drug database</div>
        <div class="sub">Full monographs: dosing, safety, interactions, pearls.</div>
      </a>
      <a class="tool-card" href="#/flashcards">
        <div class="icon" style="background:var(--amber-tint)">${ICON.cards.replace('<svg','<svg style="stroke:#6B4A1E"')}</div>
        <div class="ttl">Flashcards</div>
        <div class="sub">${D.FLASHCARDS.length} cards built from exam pearls.</div>
      </a>
      <a class="tool-card" href="#/quiz">
        <div class="icon" style="background:var(--steel-tint)">${ICON.quiz.replace('<svg','<svg style="stroke:var(--steel)"')}</div>
        <div class="ttl">SBA quiz bank</div>
        <div class="sub">MRCOG-style questions with full explanations.</div>
      </a>
      <a class="tool-card" href="#/algorithms">
        <div class="icon" style="background:var(--brick-tint)">${ICON.algo.replace('<svg','<svg style="stroke:var(--brick)"')}</div>
        <div class="ttl">Clinical algorithms</div>
        <div class="sub">Bedside decision pathways, guideline-mapped.</div>
      </a>
      <a class="tool-card" href="#/calculators">
        <div class="icon" style="background:var(--steel-tint)">🧮</div>
        <div class="ttl">Calculators</div>
        <div class="sub">Shock Index, MSI, VTE risk, MOEWS scoring.</div>
      </a>
    </div>

    <div class="section-label">Chapters <a class="see-all" href="#/chapters">See all 12 →</a></div>
    <div class="chapter-list-mini">
      ${D.CHAPTERS.slice(0,5).map(c => chapterRow(c)).join('')}
    </div>

    <div class="disclaimer-strip">Educational use only. Not medical advice.<br/>Always verify dosing against the current BNF, SPC, and local protocols before prescribing.</div>
  `;
  shell(html, { activeNav: 'home', noTopbar: true });
});

function chapterRow(c){
  const isFull = c.status === 'full';
  return `
    <a class="chapter-row" href="#/chapters/${c.slug}">
      <span class="chapter-num">${String(c.id).padStart(2,'0')}</span>
      <span style="flex:1;min-width:0;">
        <span class="ttl">${c.title}</span>
        <span class="sub">${c.blurb}</span>
      </span>
      ${isFull ? (c.drugCount ? `<span class="badge-full">${c.drugCount} drugs</span>` : `<span class="badge-full">guide</span>`) : `<span class="badge-soon">outline</span>`}
      ${ICON.chevronRight.replace('<svg','<svg class="chev"')}
    </a>`;
}

// ---------------------------------------------------------------------------
// CHAPTERS LIST
// ---------------------------------------------------------------------------
route('/chapters', (seg) => {
  if (seg[1]) return renderChapterDetail(seg[1]);
  const html = `
    <div class="section-label" style="margin-top:4px;">All 12 chapters</div>
    <div class="chapter-list-mini">${D.CHAPTERS.map(c => chapterRow(c)).join('')}</div>
  `;
  shell(html, { title: 'Chapters', eyebrow: D.BOOK_META.title, activeNav: 'book' });
});

function renderChapterDetail(slug){
  const c = D.CHAPTERS.find(ch => ch.slug === slug);
  if (!c){ navigate('#/chapters'); return; }
  if (c.status !== 'full'){
    const html = `
      <div class="outline-state">
        ${ICON.book.replace('<svg','<svg style="stroke:var(--ink-40)"')}
        <h3>Chapter ${c.id} is mapped, not yet built</h3>
        <p>${c.title} exists in full in the source textbook. Tell me which chapter to populate next.</p>
      </div>`;
    shell(html, { title: `Ch ${c.id}`, eyebrow: 'Coming next', showBack: true, backHash: '#/chapters', activeNav: 'book' });
    return;
  }

  // Conceptual chapter (1) has no drug array — dedicated render path
  if (c.id === 1){
    return renderChapter1();
  }

  // Chapter 11 (teratogens) uses its own TERATOGEN_DATA shape — dedicated render path
  if (c.id === 11){
    return renderChapter11();
  }

  // Condition-based chapters (3, 5) use a different layout: condition cards, not full monographs
  if (c.id === 3 || c.id === 5){
    return renderConditionChapter(c);
  }

  const drugs = D.DRUGS.filter(d => d.chapter === c.id);
  const algos = D.ALGORITHMS.filter(a => a.chapter === c.id);
  const scenarios = D.SCENARIOS.filter(s => s.chapter === c.id);
  const chapterIntros = {
    2: "Hypertensive disorders remain the leading cause of maternal morbidity and mortality worldwide — choosing the right agent protects two patients at once.",
    4: "From restarting ovulation to the final luteal-support tablet — these drugs drive every step of assisted conception, and OHSS is the complication you must never miss.",
    6: "Every chronic condition in this chapter forces the same question: what happens to this disease, and to this drug, when the body it lives in starts building a placenta? Seven specialties, twenty drugs, one recurring theme — untreated maternal disease is very often the bigger risk.",
    7: "Affecting roughly half of women over 50, urinary symptoms are among the most under-reported in medicine — ask directly, and have a clear pharmacological plan ready for when patients finally do.",
    8: "Four very different problems, one shared lesson: fibroids and pregnancy loss both hinge on hormonal timing, menopause care hinges on route of administration, and gynae-oncology hinges on dosing precision — same principle, different unit of measurement each time.",
    9: "These are the cases that stay with you. When a pregnant woman's lungs, kidneys, or circulation begin to fail, the usual luxury of watching and waiting disappears — every decision below is made against a clock that isn't on your side, and maternal survival always comes first.",
    10: "From the first contraction to the last suture, this chapter follows pain relief and anaesthesia through the whole arc of labour and delivery — and a recurring theme worth noticing: the safest choice is rarely the most potent one, it's the one matched precisely to what this specific moment actually needs.",
    12: "From the everyday reflex of amoxicillin to the absolute contraindication of ribavirin — many of these drugs carry a risk that depends entirely on gestational age, which is exactly why the trimester-contraindication rules below deserve their own page.",
  };
  const extraIntro = chapterIntros[c.id] ? ` ${chapterIntros[c.id]}` : '';
  const html = `
    <p style="font-size:13.5px;color:var(--ink-60);line-height:1.6;margin:4px 0 22px;">${c.blurb}.${extraIntro}</p>

    ${c.id === 4 ? `
    <a class="tool-card" style="margin-bottom:24px;border-color:var(--brick);" href="#/ohss">
      <div class="icon" style="background:var(--brick-tint)">${ICON.warn.replace('<svg','<svg style="stroke:var(--brick)"')}</div>
      <div class="ttl">OHSS — recognition &amp; management</div>
      <div class="sub">Grading, emergency algorithm, critical safety rules</div>
    </a>` : ''}

    ${c.id === 12 ? `
    <a class="tool-card" style="margin-bottom:24px;border-color:var(--brick);" href="#/trimester-contraindications">
      <div class="icon" style="background:var(--brick-tint)">${ICON.warn.replace('<svg','<svg style="stroke:var(--brick)"')}</div>
      <div class="ttl">Trimester contraindications — cross-reference</div>
      <div class="sub">Tetracyclines, sulfonamides, nitrofurantoin &amp; more — by gestational window</div>
    </a>` : ''}

    <div class="section-label">Drugs in this chapter</div>
    <div style="margin-bottom:24px;">
      ${(c.id === 12 || c.id === 6 || c.id === 8 || c.id === 9 || c.id === 10) ? drugCardsByClass(drugs, c.id) : drugs.map(d => drugCard(d)).join('')}
    </div>

    ${algos.length ? `
    <div class="section-label">Clinical algorithm</div>
    <a class="tool-card" style="margin-bottom:24px;" href="#/algorithms/${algos[0].id}">
      <div class="icon" style="background:var(--brick-tint)">${ICON.algo.replace('<svg','<svg style="stroke:var(--brick)"')}</div>
      <div class="ttl">${algos[0].title}</div>
      <div class="sub">${algos[0].subtitle}</div>
    </a>` : ''}

    ${scenarios.length ? `
    <div class="section-label">OSCE scenarios <span class="see-all">${scenarios.length} cases</span></div>
    <a class="tool-card" style="margin-bottom:24px;" href="#/scenarios/${c.slug}">
      <div class="icon" style="background:var(--steel-tint)">${ICON.heart.replace('<svg','<svg style="stroke:var(--steel)"')}</div>
      <div class="ttl">Worked clinical scenarios</div>
      <div class="sub">5 cases with full clinical reasoning</div>
    </a>` : ''}

    <div class="section-label">Test yourself</div>
    <a class="btn-primary" style="margin-bottom:8px;" href="#/quiz?chapter=${c.id}">Quiz on this chapter</a>
    <a class="btn-secondary" href="#/flashcards?chapter=${c.id}">Flashcards on this chapter</a>
  `;
  shell(html, { title: c.title, eyebrow: `Chapter ${c.id}`, showBack: true, backHash: '#/chapters', activeNav: 'book' });
}

function renderChapter1(){
  const ch1 = D.CHAPTER1_DATA;
  const scenario = D.SCENARIOS.find(s => s.chapter === 1);

  const html = `
    <p style="font-size:13.5px;color:var(--ink-60);line-height:1.6;margin:4px 0 20px;">${ch1.intro}</p>

    <div class="mono-section" style="margin-top:0;">
      <div class="mono-section-title">${ICON.flask.replace('<svg','<svg class="ico"')} Pharmacokinetic alterations in gestation</div>
      <p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;margin-bottom:12px;">${ch1.pkAlterations.headline}</p>
      ${ch1.pkAlterations.sections.map(s => `
        <div style="margin-bottom:12px;">
          <div style="font-weight:700;font-size:13px;color:var(--ink-90);margin-bottom:3px;">${s.title}</div>
          <p style="font-size:13px;color:var(--ink-60);line-height:1.6;margin:0;">${s.body}</p>
        </div>
      `).join('')}
      <p style="font-size:11.5px;font-weight:700;color:var(--ink-60);text-transform:uppercase;letter-spacing:0.04em;margin:16px 0 8px;">Golden rules</p>
      <ul class="fact-list">${ch1.pkAlterations.rules.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.heart.replace('<svg','<svg class="ico"')} Placental transfer dynamics</div>
      <p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;margin-bottom:12px;">${ch1.placentalTransfer.headline}</p>
      ${ch1.placentalTransfer.points.map(p => `
        <div style="margin-bottom:12px;">
          <div style="font-weight:700;font-size:13px;color:var(--ink-90);margin-bottom:3px;">${p.title}</div>
          <p style="font-size:13px;color:var(--ink-60);line-height:1.6;margin:0;">${p.body}</p>
        </div>
      `).join('')}
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.check.replace('<svg','<svg class="ico"')} The UK Medical Eligibility Criteria (UKMEC)</div>
      <p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;margin-bottom:12px;">${ch1.ukmec.headline}</p>
      ${dataTable(ch1.ukmec.table)}
      <p style="font-size:11.5px;font-weight:700;color:var(--ink-60);text-transform:uppercase;letter-spacing:0.04em;margin:16px 0 8px;">Applying UKMEC in practice</p>
      <ul class="fact-list">${ch1.ukmec.practicePoints.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>

    ${scenario ? `
    <div class="section-label">Worked clinical example</div>
    <div class="scenario-card" style="margin-bottom:24px;">
      <div class="scenario-title">${scenario.title}</div>
      <div class="scenario-presentation">${scenario.presentation}</div>
      <div class="scenario-reasoning-title">Clinical reasoning</div>
      <ul class="fact-list">${scenario.reasoning.map(r => `<li>${r}</li>`).join('')}</ul>
      <div class="scenario-keypoint"><b>Key learning point:</b> ${scenario.keyPoint}</div>
    </div>` : ''}

    <div class="mono-section">
      <div class="mono-section-title">${ICON.sparkle.replace('<svg','<svg class="ico"')} Key takeaways</div>
      <ul class="fact-list">${ch1.keyTakeaways.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.pill.replace('<svg','<svg class="ico"')} Lactation safety</div>
      <p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;margin-bottom:12px;">${ch1.lactationSafety.headline}</p>
      <ul class="fact-list">${ch1.lactationSafety.points.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>

    <div class="section-label">Test yourself</div>
    <a class="tool-card" style="margin-bottom:12px;" href="#/quiz?chapter=1">
      <div class="icon" style="background:var(--teal-tint)">${ICON.quiz.replace('<svg','<svg style="stroke:var(--teal-deep)"')}</div>
      <div class="ttl">Quiz on this chapter</div>
      <div class="sub">5 SBA questions</div>
    </a>
    <a class="tool-card" style="margin-bottom:24px;" href="#/flashcards?chapter=1">
      <div class="icon" style="background:var(--steel-tint)">${ICON.cards.replace('<svg','<svg style="stroke:var(--steel)"')}</div>
      <div class="ttl">Flashcards on this chapter</div>
      <div class="sub">13 cards — PK changes, UKMEC, key takeaways</div>
    </a>

    <div class="mono-section">
      <div class="mono-section-title">References</div>
      <ul class="fact-list" style="font-size:12px;">${ch1.references.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <div class="disclaimer-strip">From "${D.BOOK_META.title}" by ${D.BOOK_META.author}. Educational use only — verify against current BNF/SPC/RCOG guidance before prescribing.</div>
  `;
  shell(html, { title: 'Chapter 1', eyebrow: 'Prescribing Principles in Pregnancy & Lactation', showBack: true, backHash: '#/chapters', activeNav: 'book' });
}

route('/teratogen', (seg) => renderTeratogenDetail(seg[1]));

function renderChapter11(){
  const t = D.TERATOGEN_DATA;

  const html = `
    <p style="font-size:13.5px;color:var(--ink-60);line-height:1.6;margin:4px 0 20px;">${t.intro}</p>

    <div class="mono-section" style="margin-top:0;">
      <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--brick)"')} Risk classification — all 12 drugs</div>
      ${dataTable(t.riskTable)}
    </div>

    <div class="section-label">Teratogen profiles</div>
    <div style="margin-bottom:24px;">
      ${t.drugs.map(d => {
        const c = teratogenRiskColors(d.risk);
        return `
        <a class="drug-card" href="#/teratogen/${d.id}">
          <span class="spine" style="background:${c.bg}"></span>
          <span class="body">
            <span class="row1">
              <span class="name">${d.number}. ${d.name}</span>
              <span class="tier-badge" style="background:${c.tint};color:${c.text}">${d.risk}</span>
            </span>
            <span class="class">${d.drugClass}</span>
            <span class="oneliner">${d.trimester}</span>
          </span>
        </a>`;
      }).join('')}
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.heart.replace('<svg','<svg class="ico"')} Fetal effects by organ system — master summary</div>
      ${dataTable(t.organSystemSummary)}
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.algo.replace('<svg','<svg class="ico"')} Safe prescribing decision framework</div>
      <div class="algo-steps">
        ${t.decisionFramework.map(s => `
          <div class="algo-step">
            <span class="algo-step-dot" style="color:var(--steel)"></span>
            <div class="algo-step-content">
              <div class="algo-step-label">${s.step}</div>
              <div style="font-size:13px;color:var(--ink-60);line-height:1.6;margin-top:3px;">${s.detail}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section-label">Test yourself</div>
    <a class="tool-card" style="margin-bottom:12px;" href="#/quiz?chapter=11">
      <div class="icon" style="background:var(--teal-tint)">${ICON.quiz.replace('<svg','<svg style="stroke:var(--teal-deep)"')}</div>
      <div class="ttl">Quiz on this chapter</div>
      <div class="sub">6 SBA questions</div>
    </a>
    <a class="tool-card" style="margin-bottom:24px;" href="#/flashcards?chapter=11">
      <div class="icon" style="background:var(--steel-tint)">${ICON.cards.replace('<svg','<svg style="stroke:var(--steel)"')}</div>
      <div class="ttl">Flashcards on this chapter</div>
      <div class="sub">48 cards — risk level, trimester window, fetal effects</div>
    </a>

    <div class="mono-section">
      <div class="mono-section-title">References</div>
      <ul class="fact-list" style="font-size:12px;">${t.references.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <div class="disclaimer-strip">From "${D.BOOK_META.title}" by ${D.BOOK_META.author}. Educational use only — verify against current BNF/SPC/UKTIS guidance before prescribing.</div>
  `;
  shell(html, { title: 'Chapter 11', eyebrow: 'Teratogenic Drugs in Obstetrics & Gynaecology', showBack: true, backHash: '#/chapters', activeNav: 'book' });
}

function renderTeratogenDetail(id){
  const d = D.TERATOGEN_DATA.drugs.find(x => x.id === id);
  if (!d){ navigate('#/chapters/teratogenic-drugs'); return; }
  const c = teratogenRiskColors(d.risk);

  const html = `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
      <span class="tier-badge" style="background:${c.tint};color:${c.text}">${d.risk}</span>
    </div>
    <h1 style="font-size:22px;margin:0 0 4px;">${d.number}. ${d.name}</h1>
    <p style="font-size:13px;color:var(--ink-40);margin:0 0 16px;">${d.drugClass}</p>

    <div class="mono-section" style="margin-top:0;">
      <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--brick)"')} Highest-risk window</div>
      <p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;">${d.trimester}</p>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.flask.replace('<svg','<svg class="ico"')} Mechanism of fetal harm</div>
      <p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;">${d.mechanism}</p>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.heart.replace('<svg','<svg class="ico"')} Fetal effects</div>
      ${d.fetalEffects.map(fe => `
        <div style="margin-bottom:12px;">
          <div style="font-weight:700;font-size:13px;color:var(--ink-90);margin-bottom:3px;">${fe.effect}</div>
          <p style="font-size:13px;color:var(--ink-60);line-height:1.6;margin:0;">${fe.detail}</p>
        </div>
      `).join('')}
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--brick)"')} Warning signs</div>
      <ul class="fact-list">${d.warningSigns.split(' • ').map(w => `<li>${w}</li>`).join('')}</ul>
    </div>

    <div class="quickref-card" style="margin:18px 0;">
      <div class="qr-header"><span>Status &amp; Management</span><span style="font-size:11px;opacity:0.7;">${d.name}</span></div>
      <div class="qr-row"><span class="k">UK Status</span><span class="v">${d.ukStatus}</span></div>
      <div class="qr-row"><span class="k">FDA Category</span><span class="v">${d.fdaStatus}</span></div>
      <div class="qr-row"><span class="k">Alternatives</span><span class="v">${d.alternatives}</span></div>
      <div class="qr-row"><span class="k">If Exposed</span><span class="v">${d.ifExposed}</span></div>
      ${d.crossRef ? `<div class="qr-row"><span class="k">Cross-reference</span><span class="v">${d.crossRef}</span></div>` : ''}
    </div>

    <div class="disclaimer-strip">From "${D.BOOK_META.title}" by ${D.BOOK_META.author}. Educational use only — verify against current BNF/SPC/UKTIS guidance before prescribing.</div>
  `;
  shell(html, { title: d.name, eyebrow: 'Chapter 11 · Teratogenic Drugs', showBack: true, backHash: '#/chapters/teratogenic-drugs', activeNav: 'book' });
}

function renderConditionChapter(c){
  const conditions = c.id === 3 ? D.CONDITIONS_CH3 : D.CONDITIONS_CH5;
  const extraIntro = c.id === 5 ? `
    <div class="mono-section" style="margin-top:0;">
      <div class="mono-section-title">The UKMEC framework</div>
      <p style="font-size:13px;color:var(--ink-60);line-height:1.6;margin-bottom:10px;">Every contraceptive prescribing decision in the UK runs through this classification — adapted from the WHO MEC framework.</p>
      ${dataTable(D.UKMEC_TABLE)}
    </div>` : '';
  const html = `
    <p style="font-size:13.5px;color:var(--ink-60);line-height:1.6;margin:4px 0 20px;">${c.blurb}.</p>
    ${extraIntro}
    <div class="section-label" style="margin-top:${c.id===5?'4':'0'}px;">Conditions in this chapter</div>
    <div class="chapter-list-mini" style="margin-bottom:24px;">
      ${conditions.map(cond => `
        <a class="chapter-row" href="#/condition/${cond.id}">
          <span style="flex:1;min-width:0;">
            <span class="ttl">${cond.title}</span>
            <span class="sub">${cond.drugs.length} drug${cond.drugs.length===1?'':'s'} · ${cond.prevalence}</span>
          </span>
          ${ICON.chevronRight.replace('<svg','<svg class="chev"')}
        </a>`).join('')}
    </div>

    ${D.SCENARIOS.filter(s => s.chapter === c.id).length ? `
    <div class="section-label">OSCE scenarios <span class="see-all">${D.SCENARIOS.filter(s => s.chapter === c.id).length} cases</span></div>
    <a class="tool-card" style="margin-bottom:24px;" href="#/scenarios/${c.slug}">
      <div class="icon" style="background:var(--steel-tint)">${ICON.heart.replace('<svg','<svg style="stroke:var(--steel)"')}</div>
      <div class="ttl">Worked clinical scenarios</div>
      <div class="sub">${D.SCENARIOS.filter(s => s.chapter === c.id).length} cases with full clinical reasoning</div>
    </a>` : ''}

    <div class="section-label">Test yourself</div>
    <a class="btn-primary" style="margin-bottom:8px;" href="#/quiz?chapter=${c.id}">Quiz on this chapter</a>
    <a class="btn-secondary" href="#/flashcards?chapter=${c.id}">Flashcards on this chapter</a>
  `;
  shell(html, { title: c.title, eyebrow: `Chapter ${c.id}`, showBack: true, backHash: '#/chapters', activeNav: 'book' });
}

route('/condition', (seg) => renderConditionDetail(seg[1]));

function renderConditionDetail(id){
  const all = [...D.CONDITIONS_CH3, ...D.CONDITIONS_CH5];
  const cond = all.find(c => c.id === id);
  if (!cond){ navigate('#/chapters'); return; }
  const chapterMeta = D.CHAPTERS.find(c => c.id === cond.chapter);

  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:24px;">${cond.title}</h1>
      <p style="font-size:12.5px;color:var(--ink-40);margin-bottom:10px;">${cond.prevalence}</p>
    </div>

    <div class="why-matters">
      <span class="quote-mark">"</span>
      <div class="body-text" style="font-size:13.5px;">${cond.intro}</div>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.pill.replace('<svg','<svg class="ico"')} Drug options</div>
      ${cond.drugs.map(d => conditionDrugCard(d)).join('')}
    </div>

    ${cond.algorithm ? `
    <div class="mono-section">
      <div class="mono-section-title">${ICON.algo.replace('<svg','<svg class="ico"')} Stepwise approach</div>
      <ol class="steps-list">
        ${cond.algorithm.map(s => `<li><b>${s.step}:</b> ${s.treatment}<br/><span style="color:var(--ink-40);font-size:11.5px;">${s.note}</span></li>`).join('')}
      </ol>
    </div>` : ''}

    ${cond.quickGuide ? `
    <div class="mono-section">
      <div class="mono-section-title">Quick guide</div>
      ${dataTable(cond.quickGuide)}
    </div>` : ''}

    <div class="disclaimer-strip">From "${D.BOOK_META.title}" by ${D.BOOK_META.author}. Educational use only — verify against current BNF/SPC/FSRH guidance before prescribing.</div>
  `;
  shell(html, { title: cond.title, eyebrow: `Chapter ${chapterMeta.id} · ${chapterMeta.title}`, showBack: true, backHash: `#/chapters/${chapterMeta.slug}`, activeNav: 'book' });
}

function conditionDrugCard(d){
  const c = tierColors(d.tier.key);
  const cardId = 'cd-' + Math.random().toString(36).slice(2,9);
  return `
    <div style="background:#fff;border:1px solid var(--paper-line);border-radius:var(--radius);margin-bottom:12px;overflow:hidden;">
      <div style="border-left:4px solid ${c.bg};padding:14px 16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:4px;">
          <span style="font-weight:700;font-size:14.5px;color:var(--ink);">${d.name}</span>
          <span class="tier-badge" style="background:${c.tint};color:${c.text}">${d.tier.label}</span>
        </div>
        <div style="font-size:11.5px;color:var(--ink-40);margin-bottom:8px;">${d.brand}</div>
        <div style="font-size:12.5px;color:var(--ink-soft);margin-bottom:8px;"><b>Mechanism:</b> ${d.mechanism}</div>
        <div class="dose-block" style="margin:8px 0;">
          <div class="dose-line" style="border-bottom:none;"><span class="k">Dosing</span></div>
          <div style="font-size:12px;font-family:var(--font-mono);line-height:1.5;padding-top:0;">${d.dose}</div>
        </div>
        ${d.warning ? `<div class="interaction-row" style="border-bottom:none;padding:8px 0 0;"><span class="flag warn">${ICON.warn}</span><div class="content"><div class="action" style="color:var(--brick);">${d.warning}</div></div></div>` : ''}
        <ul class="fact-list" style="margin-top:10px;">${d.points.map(p => `<li>${p}</li>`).join('')}</ul>
      </div>
    </div>`;
}

function drugCard(d){
  const c = tierColors(d.tier.key);
  const noteAddsInfo = d.tierNote && d.tierNote.trim().toLowerCase() !== d.tier.label.trim().toLowerCase();
  return `
    <a class="drug-card" href="#/drug/${d.id}">
      <span class="spine" style="background:${c.bg}"></span>
      <span class="body">
        <span class="row1">
          <span class="name">${d.name}</span>
          <span class="tier-badge" style="background:${c.tint};color:${c.text}">${d.tier.label}</span>
        </span>
        <span class="class">${d.drugClass}</span>
        <span class="oneliner">${d.oneLiner}</span>
        ${noteAddsInfo ? `<span style="display:block;font-size:11px;color:var(--ink-40);font-style:italic;margin-top:2px;">${d.tierNote}</span>` : ''}
      </span>
    </a>`;
}

function drugCardsByClass(drugs, chapterId){
  // Groups drugs into labelled sections instead of one flat list — used for
  // chapters with enough drugs (and enough sub-specialty variety) that a
  // single undifferentiated list would be hard to scan.
  const GROUPS_BY_CHAPTER = {
    12: [
      { label: "Antibiotics", ids: ["amoxicillin","ampicillin","ceftriaxone","clindamycin","metronidazole-antibiotic","azithromycin","nitrofurantoin","gentamicin","doxycycline","tmp-smx","cefazolin","erythromycin","cephalexin","vancomycin"] },
      { label: "Antifungals", ids: ["fluconazole","clotrimazole","miconazole","nystatin","amphotericin-b"] },
      { label: "Antiprotozoals", ids: ["metronidazole-antiprotozoal","pyrimethamine","spiramycin","chloroquine","quinine","hydroxychloroquine"] },
      { label: "Antivirals", ids: ["acyclovir","tenofovir-df","dolutegravir","ribavirin","valacyclovir","oseltamivir","zidovudine","efavirenz","ganciclovir-valganciclovir"] },
    ],
    6: [
      { label: "Thromboembolic Disease & Anticoagulation", ids: ["enoxaparin","ufh","warfarin-ch6"] },
      { label: "Cardiac Disorders & Arrhythmias", ids: ["atenolol","digoxin","adenosine"] },
      { label: "Neurological Disorders: Epilepsy & Migraine", ids: ["lamotrigine","levetiracetam","valproate-ch6","sumatriptan"] },
      { label: "Endocrine Disorders: Thyroid Disease", ids: ["ptu","carbimazole-ch6","levothyroxine"] },
      { label: "Respiratory Disorders: Chronic Asthma", ids: ["salbutamol","ics-asthma"] },
      { label: "Psychiatric Disorders", ids: ["sertraline","paroxetine-ch6"] },
      { label: "Autoimmune & Connective Tissue Disorders", ids: ["hydroxychloroquine-ch6","azathioprine","methotrexate-ch6"] },
    ],
    8: [
      { label: "Fibroids & Endometriosis", ids: ["leuprorelin","relugolix-combination"] },
      { label: "Early Pregnancy Loss, Induction & Cervical Priming", ids: ["mifepristone","misoprostol-ch8"] },
      { label: "Menopause & HRT", ids: ["oestradiol-hrt","micronized-progesterone"] },
      { label: "Gynaecological Oncology", ids: ["cisplatin","carboplatin","paclitaxel","olaparib"] },
    ],
    9: [
      { label: "Pre-eclampsia Prophylaxis", ids: ["aspirin-pe-prophylaxis"] },
      { label: "Respiratory Failure & Critical Airway", ids: ["aminophylline","ketamine-organ-failure"] },
      { label: "Renal & Electrolyte Emergencies", ids: ["furosemide-organ-failure","calcium-gluconate"] },
      { label: "Shock & Cardiovascular Support", ids: ["norepinephrine","dobutamine","alteplase","bromocriptine-ppcm"] },
      { label: "Endocrine Emergencies", ids: ["hydrocortisone-organ-failure"] },
      { label: "Preterm Birth & Postpartum Haemorrhage", ids: ["antenatal-corticosteroids","tocolytics","pph-uterotonics"] },
    ],
    10: [
      { label: "Systemic Analgesics in Labour", ids: ["paracetamol-labour","pethidine","diamorphine-labour","remifentanil-pca","entonox"] },
      { label: "Neuraxial Analgesia & Anaesthesia", ids: ["bupivacaine-epidural","ropivacaine","levobupivacaine","lidocaine-obstetric","fentanyl-epidural"] },
      { label: "IV Fluids in Obstetrics", ids: ["hartmanns-solution","normal-saline-obstetric","dextrose-5-obstetric"] },
      { label: "Vasopressors in Obstetric Anaesthesia", ids: ["phenylephrine-spinal","ephedrine-obstetric"] },
      { label: "General Anaesthesia & Emergencies", ids: ["succinylcholine","rocuronium","sugammadex","propofol-obstetric-ga","dantrolene-mh"] },
      { label: "Post-Caesarean Analgesia", ids: ["post-caesarean-analgesia"] },
    ],
  };
  const groups = GROUPS_BY_CHAPTER[chapterId] || GROUPS_BY_CHAPTER[12];
  const byId = Object.fromEntries(drugs.map(d => [d.id, d]));
  return groups.map(g => {
    const groupDrugs = g.ids.map(id => byId[id]).filter(Boolean);
    if (!groupDrugs.length) return '';
    return `
      <div class="section-label" style="margin-top:18px;">${g.label} <span class="see-all">${groupDrugs.length}</span></div>
      ${groupDrugs.map(d => drugCard(d)).join('')}
    `;
  }).join('');
}

// ---------------------------------------------------------------------------
// DRUG DATABASE (list + search + filter)
// ---------------------------------------------------------------------------
let drugSearchTerm = '';
let drugFilterTier = 'all';

route('/drugs', () => renderDrugList());
route('/drug', (seg) => renderDrugDetail(seg[1]));

function renderDrugList(){
  const tiers = ['all', ...new Set(D.DRUGS.map(d => d.tier.key))];
  const filtered = D.DRUGS.filter(d => {
    const matchesTier = drugFilterTier === 'all' || d.tier.key === drugFilterTier;
    const matchesSearch = !drugSearchTerm || d.name.toLowerCase().includes(drugSearchTerm.toLowerCase()) || d.drugClass.toLowerCase().includes(drugSearchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const html = `
    <div class="search-bar">
      ${ICON.search}
      <input id="drug-search" type="text" placeholder="Search drugs, class…" value="${escapeHtml(drugSearchTerm)}" oninput="onDrugSearch(this.value)" />
    </div>
    <div class="chip-row">
      ${tiers.map(t => {
        const label = t === 'all' ? 'All' : (Object.values(D.TIER).find(tt => tt.key === t)?.label || t);
        return `<button class="filter-chip ${drugFilterTier===t?'active':''}" onclick="setDrugFilter('${t}')">${label}</button>`;
      }).join('')}
    </div>
    <p style="font-size:11.5px;color:var(--ink-60);margin:0 0 14px;">${filtered.length} of ${D.DRUGS.length} drug${D.DRUGS.length===1?'':'s'} · ${D.CHAPTERS.filter(c=>c.status==='full').length} of ${D.CHAPTERS.length} chapters fully populated</p>
    ${filtered.length ? filtered.map(d => drugCard(d)).join('') : emptySearchState()}
  `;
  shell(html, { title: 'Drug Database', eyebrow: `${D.DRUGS.length} monographs`, activeNav: 'pill' });
}
function emptySearchState(){
  return `<div class="outline-state">${ICON.search.replace('<svg','<svg style="stroke:var(--ink-40)"')}<h3>No matches</h3><p>Try a different search term or filter.</p></div>`;
}
window.onDrugSearch = (val) => { drugSearchTerm = val; renderDrugListPreserveFocus(); };
window.setDrugFilter = (t) => { drugFilterTier = t; renderDrugList(); };
function renderDrugListPreserveFocus(){
  renderDrugList();
  const input = document.getElementById('drug-search');
  if (input){ input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
}

// ---------------------------------------------------------------------------
// DRUG MONOGRAPH DETAIL
// ---------------------------------------------------------------------------
function renderDrugDetail(id){
  const d = D.DRUGS.find(x => x.id === id);
  if (!d){ navigate('#/drugs'); return; }
  const c = tierColors(d.tier.key);

  const html = `
    <div class="mono-header">
      <div class="mono-eyebrow">
        <span class="tier-badge" style="background:${c.tint};color:${c.text}">${d.tier.label}</span>
        <span class="class-tag">${d.drugClass}</span>
      </div>
      ${d.tierNote ? `<div style="font-size:11.5px;color:var(--ink-40);margin:2px 0 0;font-style:italic;">${d.tierNote}</div>` : ''}
      <h1>${d.name}</h1>
      <div class="generic">${d.genericName}</div>
      <div class="mono-oneliner">${d.oneLiner}</div>
      <div class="route-pills">${d.routes.map(r => `<span class="route-pill">${r}</span>`).join('')}</div>
      <div class="brand-line">UK: <b>${d.brandUK}</b> &nbsp;·&nbsp; Global: <b>${d.brandGlobal}</b></div>
    </div>

    ${d.whyMatters ? `
    <div class="why-matters">
      <span class="quote-mark">"</span>
      <blockquote>${d.whyMatters}</blockquote>
      <div class="body-text">${d.whyMattersBody}</div>
    </div>` : ''}

    <div class="mono-section">
      <div class="mono-section-title">${ICON.flask.replace('<svg','<svg class="ico"')} How it works</div>
      <p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;">${d.mechanism.summary}</p>
      ${d.mechanism.points.length ? `<ul class="fact-list">${d.mechanism.points.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
    </div>

    ${d.pk && d.pk.table ? `
    <div class="mono-section">
      <div class="mono-section-title">Pharmacokinetics</div>
      <p style="font-size:13px;color:var(--ink-60);line-height:1.6;margin-bottom:10px;">${d.pk.narrative}</p>
      ${dataTable(d.pk.table)}
      ${d.pk.pd ? `<p style="font-size:13px;color:var(--ink-soft);line-height:1.6;margin-top:10px;"><b>What the drug does to the body:</b> ${d.pk.pd}</p>` : ''}
    </div>` : (d.pk && d.pk.narrative ? `<div class="mono-section"><div class="mono-section-title">Pharmacokinetics</div><p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;">${d.pk.narrative}</p></div>` : '')}

    <div class="mono-section">
      <div class="mono-section-title">${ICON.check.replace('<svg','<svg class="ico"')} When to use it</div>
      <ul class="fact-list">${d.indications.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Dosing &amp; administration</div>
      ${d.dosing.oral ? doseBlock(d.dosing.oral) : ''}
      ${d.dosing.acute ? acuteDoseBlock(d.dosing.acute) : ''}
    </div>

    ${d.toxicityTable ? `
    <div class="mono-section">
      <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--brick)"')} Toxicity hierarchy — high yield</div>
      <div class="toxicity-table-wrap">${dataTable(d.toxicityTable)}</div>
      <p class="tox-note">${d.toxicityTable.note}</p>
    </div>` : ''}

    <div class="mono-section">
      <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--amber)"')} Side effects</div>
      ${d.sideEffects.common.length ? `<p style="font-size:11.5px;font-weight:700;color:var(--ink-60);text-transform:uppercase;letter-spacing:0.04em;margin:10px 0 8px;">Common</p><ul class="fact-list warn">${d.sideEffects.common.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
      ${d.sideEffects.severe.length ? `<p style="font-size:11.5px;font-weight:700;color:var(--brick);text-transform:uppercase;letter-spacing:0.04em;margin:16px 0 8px;">Rare but severe</p><ul class="fact-list danger">${d.sideEffects.severe.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
      ${d.contraindications.length ? `<p style="font-size:11.5px;font-weight:700;color:var(--brick);text-transform:uppercase;letter-spacing:0.04em;margin:16px 0 8px;">Absolute contraindications</p><ul class="fact-list danger">${d.contraindications.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
    </div>

    ${(d.fetalMaternal.onFetus || d.fetalMaternal.ofPregnancyOnDrug) ? `
    <div class="mono-section">
      <div class="mono-section-title">${ICON.heart.replace('<svg','<svg class="ico"')} Fetal–maternal dynamics</div>
      ${d.fetalMaternal.onFetus ? `<p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;margin-bottom:10px;"><b>Effect on pregnancy &amp; fetus:</b> ${d.fetalMaternal.onFetus}</p>` : ''}
      ${d.fetalMaternal.ofPregnancyOnDrug ? `<p style="font-size:13.5px;color:var(--ink-soft);line-height:1.6;"><b>Effect of pregnancy on the drug:</b> ${d.fetalMaternal.ofPregnancyOnDrug}</p>` : ''}
    </div>` : ''}

    ${d.interactions.length ? `
    <div class="mono-section">
      <div class="mono-section-title">Drug interactions</div>
      <div>${d.interactions.map(i => interactionRow(i)).join('')}</div>
    </div>` : ''}

    ${d.pearls.length ? `
    <div class="mono-section">
      <div class="mono-section-title">${ICON.sparkle.replace('<svg','<svg class="ico"')} Exam pearls</div>
      <div class="pearl-stack">${d.pearls.map(p => `<div class="pearl-note"><span class="pin"></span>${p}</div>`).join('')}</div>
    </div>` : ''}

    ${quickRefCard(d)}

    <div class="disclaimer-strip">From "${D.BOOK_META.title}" by ${D.BOOK_META.author}. Educational use only — verify against current BNF/SPC before prescribing.</div>
  `;
  shell(html, { title: d.name, eyebrow: `Chapter ${d.chapter}`, showBack: true, backHash: '#/drugs', activeNav: 'pill' });
}

function dataTable(t){
  return `<div class="data-table-scroll"><table class="data-table"><thead><tr>${t.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function doseBlock(o){
  return `<div class="dose-block">
    <div class="dose-label">${o.label}</div>
    <div class="dose-line"><span class="k">Initial</span><span class="v">${o.initial}</span></div>
    ${o.titration ? `<div class="dose-line"><span class="k">Titration</span><span class="v">${o.titration}</span></div>` : ''}
    ${o.max ? `<div class="dose-line"><span class="k">Maximum</span><span class="v">${o.max}</span></div>` : ''}
  </div>`;
}
function acuteDoseBlock(a){
  return `<div class="mono-section-title" style="font-size:13.5px;margin:16px 0 6px;">${a.label}</div>
    <ol class="steps-list">${a.steps.map(s => `<li>${s}</li>`).join('')}</ol>`;
}

function interactionRow(i){
  return `<div class="interaction-row">
    <span class="flag ${i.warning?'warn':'ok'}">${i.warning ? ICON.warn : ICON.check}</span>
    <div class="content">
      <div class="drug-name">${i.drug}</div>
      <div class="effect">${i.effect}</div>
      <div class="action">→ ${i.action}</div>
    </div>
  </div>`;
}

function quickRefCard(d){
  const entries = Object.entries(d.quickRef || {});
  if (!entries.length) return '';
  return `<div class="quickref-card">
    <div class="qr-header"><span>Quick Reference</span><span style="font-size:11px;opacity:0.7;">${d.name}</span></div>
    ${entries.map(([k,v]) => `<div class="qr-row"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('')}
  </div>`;
}

// ---------------------------------------------------------------------------
// OHSS (Ovarian Hyperstimulation Syndrome) — dedicated view, Chapter 4
// ---------------------------------------------------------------------------
route('/ohss', () => renderOHSS());

function renderOHSS(){
  const o = D.OHSS_DATA;
  const gradeTier = { Mild: 'first-line', Moderate: 'caution', Severe: 'second-line', Critical: 'contraindicated' };

  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:24px;">Ovarian Hyperstimulation Syndrome</h1>
      <p style="font-size:12.5px;color:var(--ink-40);margin-bottom:10px;">The complication every fertility prescriber must recognise early</p>
    </div>

    <div class="why-matters">
      <span class="quote-mark">"</span>
      <div class="body-text" style="font-size:13.5px;">${o.intro}</div>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--brick)"')} Grading &amp; management</div>
      ${dataTable(o.grading)}
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.algo.replace('<svg','<svg class="ico"')} Emergency algorithm by severity</div>
      <div class="algo-steps">
        ${o.algorithm.map(s => {
          const c = tierColors(gradeTier[s.step] || 'caution');
          return `<div class="algo-step">
            <span class="algo-step-dot" style="color:${c.bg}"></span>
            <div class="algo-step-content">
              <div class="algo-step-label">${s.step}</div>
              <div class="algo-step-drug">${s.treatment}</div>
              <div style="font-size:12px;color:var(--ink-60);margin-top:3px;line-height:1.5;">${s.note}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--brick)"')} Critical safety rules</div>
      <ul class="fact-list danger">${o.criticalRules.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.check.replace('<svg','<svg class="ico"')} Prevention strategies</div>
      <ul class="fact-list">${o.prevention.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">${ICON.pill.replace('<svg','<svg class="ico"')} Pregnancy transition — what to stop, what to continue</div>
      ${dataTable(o.transitionStop)}
      <div class="pearl-note" style="margin-top:14px;">
        <span class="pin"></span>
        <b>Continue:</b> ${o.transitionContinue}
      </div>
    </div>

    <div class="disclaimer-strip">From "${D.BOOK_META.title}" by ${D.BOOK_META.author}. Educational use only — verify against current BNF/SPC/RCOG guidance before prescribing.</div>
  `;
  shell(html, { title: 'OHSS', eyebrow: 'Chapter 4 · Fertility Pharmacology', showBack: true, backHash: '#/chapters/fertility', activeNav: 'book' });
}

// ---------------------------------------------------------------------------
// Trimester Contraindications — dedicated view, Chapter 12
// ---------------------------------------------------------------------------
route('/trimester-contraindications', () => renderTrimesterContraindications());

function renderTrimesterContraindications(){
  const t = D.TRIMESTER_CONTRAINDICATIONS_DATA;

  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:22px;">Trimester Contraindications</h1>
      <p style="font-size:12.5px;color:var(--ink-40);margin-bottom:10px;">A cross-reference of gestational-age-dependent antimicrobial risks</p>
    </div>

    <div class="why-matters">
      <span class="quote-mark">"</span>
      <div class="body-text" style="font-size:13.5px;">${t.intro}</div>
    </div>

    ${t.classes.map(cls => `
      <div class="mono-section">
        <div class="mono-section-title">${ICON.warn.replace('<svg','<svg class="ico" style="stroke:var(--brick)"')} ${cls.className}</div>
        <div class="tier-badge" style="background:var(--brick-tint);color:var(--brick);display:inline-block;margin-bottom:10px;">${cls.window}</div>
        <p style="font-size:13px;color:var(--ink-70);line-height:1.6;margin:0 0 10px;">${cls.mechanism}</p>
        <p style="font-size:12.5px;color:var(--ink-60);margin:0 0 8px;"><b>Drugs:</b> ${cls.drugs.join(', ')}</p>
        <div class="pearl-note">
          <span class="pin"></span>
          <b>Alternative:</b> ${cls.alternative}
        </div>
      </div>
    `).join('')}

    <div class="mono-section">
      <div class="mono-section-title">${ICON.check.replace('<svg','<svg class="ico"')} Golden rules</div>
      <ul class="fact-list">${t.goldenRules.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <div class="disclaimer-strip">From "${D.BOOK_META.title}" by ${D.BOOK_META.author}. Educational use only — verify against current BNF/SPC/UKTIS guidance before prescribing.</div>
  `;
  shell(html, { title: 'Trimester Contraindications', eyebrow: 'Chapter 12 · Antimicrobial Pharmacology', showBack: true, backHash: '#/chapters/antimicrobials', activeNav: 'book' });
}

// ---------------------------------------------------------------------------
// ALGORITHMS
// ---------------------------------------------------------------------------
route('/algorithms', (seg) => {
  if (seg[1]) return renderAlgorithmDetail(seg[1]);
  const html = `
    <div class="section-label">Clinical decision pathways</div>
    ${D.ALGORITHMS.map(a => `
      <a class="tool-card" style="margin-bottom:12px;" href="#/algorithms/${a.id}">
        <div class="icon" style="background:var(--brick-tint)">${ICON.algo.replace('<svg','<svg style="stroke:var(--brick)"')}</div>
        <div class="ttl">${a.title}</div>
        <div class="sub">${a.subtitle}</div>
      </a>`).join('')}
  `;
  shell(html, { title: 'Algorithms', eyebrow: 'Bedside pathways', activeNav: 'book' });
});

function renderAlgorithmDetail(id){
  const a = D.ALGORITHMS.find(x => x.id === id);
  if (!a){ navigate('#/algorithms'); return; }
  const html = `
    <p style="font-size:13px;color:var(--ink-60);margin:4px 0 22px;">${a.subtitle}</p>
    ${a.branches.map(b => `
      <div class="algo-branch">
        <div class="algo-condition">${b.condition}</div>
        <div class="algo-steps">
          ${b.steps.map(s => {
            const c = tierColors(s.tier);
            return `<div class="algo-step">
              <span class="algo-step-dot" style="color:${c.bg}"></span>
              <div class="algo-step-content">
                <div class="algo-step-label">${s.label}</div>
                <div class="algo-step-drug">${s.drug}</div>
                ${s.warning ? `<div class="algo-step-warning">${ICON.warn} ${s.warning}</div>` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    `).join('')}
    <div class="disclaimer-strip">Pathway adapted from "${D.BOOK_META.title}" — always confirm against current NICE/RCOG guidance.</div>
  `;
  shell(html, { title: a.title, eyebrow: 'Algorithm', showBack: true, backHash: '#/algorithms', activeNav: 'book' });
}

// ---------------------------------------------------------------------------
// SCENARIOS
// ---------------------------------------------------------------------------
route('/scenarios', (seg) => {
  const chapterSlug = seg[1];
  const chapter = D.CHAPTERS.find(c => c.slug === chapterSlug);
  const scenarios = chapter ? D.SCENARIOS.filter(s => s.chapter === chapter.id) : D.SCENARIOS;
  const html = `
    <p style="font-size:13px;color:var(--ink-60);margin:4px 0 20px;">Worked clinical reasoning, written the way you'd think through it on the ward.</p>
    ${scenarios.map(s => `
      <div class="scenario-card">
        <div class="scenario-title">${s.title}</div>
        <div class="scenario-presentation">${s.presentation}</div>
        <div class="scenario-reasoning-title">Clinical reasoning</div>
        <ul class="fact-list">${s.reasoning.map(r => `<li>${r}</li>`).join('')}</ul>
        <div class="scenario-keypoint"><b>Key learning point:</b> ${s.keyPoint}</div>
      </div>
    `).join('')}
  `;
  shell(html, { title: 'OSCE Scenarios', eyebrow: chapter ? chapter.title : 'All scenarios', showBack: true, backHash: chapter ? `#/chapters/${chapter.slug}` : '#/chapters', activeNav: 'book' });
});

// ---------------------------------------------------------------------------
// FLASHCARDS
// ---------------------------------------------------------------------------
let flashState = { deck: [], index: 0, showBack: false, known: 0, again: 0 };

route('/flashcards', (seg, params) => {
  const chapterFilter = params.chapter ? parseInt(params.chapter) : null;
  const deck = chapterFilter ? D.FLASHCARDS.filter(f => f.chapter === chapterFilter) : D.FLASHCARDS;
  flashState = { deck: shuffle([...deck]), index: 0, showBack: false, known: 0, again: 0 };
  renderFlashcards();
});

function shuffle(arr){
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderFlashcards(){
  const { deck, index, showBack, known, again } = flashState;
  if (!deck.length){
    shell(`<div class="outline-state">${ICON.cards.replace('<svg','<svg style="stroke:var(--ink-40)"')}<h3>No cards yet</h3><p>This chapter's flashcards haven't been generated yet.</p></div>`,
      { title: 'Flashcards', showBack: true, backHash: '#/chapters', activeNav: 'cards' });
    return;
  }
  if (index >= deck.length){
    const html = `
      <div class="flash-done">
        ${ICON.trophy.replace('<svg','<svg class="big-icon"')}
        <h2>Deck complete</h2>
        <p>${known} known · ${again} need review, out of ${deck.length} cards.</p>
        <button class="btn-primary" onclick="restartFlashcards()">${ICON.refresh} Study again</button>
      </div>`;
    shell(html, { title: 'Flashcards', showBack: true, backHash: '#/chapters', activeNav: 'cards' });
    return;
  }
  const card = deck[index];
  const pct = Math.round((index / deck.length) * 100);
  const html = `
    <div class="flash-progress">
      <span class="flash-progress-text">${index+1} / ${deck.length}</span>
      <div class="flash-progress-bar"><div class="flash-progress-fill" style="width:${pct}%"></div></div>
      <span class="flash-progress-text">${known} ✓</span>
    </div>
    <div class="flashcard-stage">
      <div class="flashcard ${showBack?'is-back':''}" onclick="flipCard()">
        <span class="face-label">${showBack?'Answer':'Question'}</span>
        <span class="chip-context">Ch ${card.chapter}</span>
        <span class="content">${showBack ? card.back : card.front}</span>
        <span class="tap-hint">Tap to ${showBack?'flip back':'reveal'}</span>
      </div>
      <div class="flash-controls">
        <button class="flash-btn again" onclick="answerCard(false)">${ICON.x} Again</button>
        <button class="flash-btn got-it" onclick="answerCard(true)">${ICON.check} Got it</button>
      </div>
    </div>
  `;
  shell(html, { title: 'Flashcards', eyebrow: `${deck.length - index} remaining`, showBack: true, backHash: '#/chapters', activeNav: 'cards' });
}
window.flipCard = () => { flashState.showBack = !flashState.showBack; renderFlashcards(); };
window.answerCard = (known) => {
  if (known) flashState.known++; else flashState.again++;
  flashState.index++; flashState.showBack = false;
  renderFlashcards();
};
window.restartFlashcards = () => { navigate('#/flashcards'); };

// ---------------------------------------------------------------------------
// QUIZ PROGRESS (persisted to localStorage)
// ---------------------------------------------------------------------------
const QUIZ_PROGRESS_KEY = 'obgyn_quiz_progress_v1';
const QUIZ_PREFS_KEY = 'obgyn_quiz_prefs_v1';

function loadQuizProgress(){
  try {
    const raw = window.localStorage.getItem(QUIZ_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch(e){ return {}; }
}
function saveQuizProgress(progress){
  try { window.localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress)); } catch(e){}
}
function recordQuizAnswer(questionId, correct){
  const progress = loadQuizProgress();
  progress[questionId] = { correct, ts: Date.now() };
  saveQuizProgress(progress);
}
function getQuizStats(){
  const progress = loadQuizProgress();
  const ids = Object.keys(progress);
  const attempted = ids.length;
  const correct = ids.filter(id => progress[id].correct).length;
  return { attempted, correct };
}
function getQuizStatsForChapters(chapterIds){
  const progress = loadQuizProgress();
  const relevantQs = D.QUIZ_BANK.filter(q => chapterIds.includes(q.chapter));
  const relevantIds = new Set(relevantQs.map(q => q.id));
  const attemptedIds = Object.keys(progress).filter(id => relevantIds.has(id));
  const correct = attemptedIds.filter(id => progress[id].correct).length;
  return { total: relevantQs.length, attempted: attemptedIds.length, correct };
}
function loadQuizPrefs(){
  try {
    const raw = window.localStorage.getItem(QUIZ_PREFS_KEY);
    return raw ? JSON.parse(raw) : { timerMode: 'untimed', countdownSecs: 60 };
  } catch(e){ return { timerMode: 'untimed', countdownSecs: 60 }; }
}
function saveQuizPrefs(prefs){
  try { window.localStorage.setItem(QUIZ_PREFS_KEY, JSON.stringify(prefs)); } catch(e){}
}
window.resetQuizProgress = () => {
  if (!confirm('Clear all saved quiz progress? This cannot be undone.')) return;
  try { window.localStorage.removeItem(QUIZ_PROGRESS_KEY); } catch(e){}
  renderQuizSetup();
};

// ---------------------------------------------------------------------------
// QUIZ
// ---------------------------------------------------------------------------
let quizState = { deck: [], index: 0, selected: null, answered: false, correctCount: 0, timerMode: 'untimed', countdownSecs: 60, elapsedSecs: 0, timerHandle: null, expired: false };
let quizSetupState = { selectedChapters: [] }; // empty = all chapters

route('/quiz', (seg, params) => {
  if (params.chapter){
    // Direct deep-link from a chapter page — skip setup, start immediately with untimed mode.
    const chapterFilter = parseInt(params.chapter);
    startQuiz([chapterFilter], loadQuizPrefs());
    return;
  }
  renderQuizSetup();
});

function renderQuizSetup(){
  const prefs = loadQuizPrefs();
  const sel = quizSetupState.selectedChapters;
  const chaptersWithQuizzes = D.CHAPTERS.filter(c => D.QUIZ_BANK.some(q => q.chapter === c.id));
  const activeChapterIds = sel.length ? sel : chaptersWithQuizzes.map(c => c.id);
  const stats = getQuizStatsForChapters(activeChapterIds);
  const overall = getQuizStats();

  const html = `
    <div class="progress-stat-row">
      <div class="progress-stat"><span class="stat-num">${overall.attempted}</span><span class="stat-lbl">Answered</span></div>
      <div class="progress-stat"><span class="stat-num">${overall.attempted ? Math.round(overall.correct/overall.attempted*100) : 0}%</span><span class="stat-lbl">All-time score</span></div>
      <div class="progress-stat"><span class="stat-num">${D.QUIZ_BANK.length}</span><span class="stat-lbl">Total questions</span></div>
    </div>

    <div class="setup-section-label">Choose chapters</div>
    <div class="chapter-chip-grid">
      <span class="chapter-chip ${sel.length===0?'active':''}" onclick="toggleSetupChapter(null)">All chapters</span>
      ${chaptersWithQuizzes.map(c => {
        const count = D.QUIZ_BANK.filter(q => q.chapter === c.id).length;
        return `<span class="chapter-chip ${sel.includes(c.id)?'active':''}" onclick="toggleSetupChapter(${c.id})">Ch ${c.id}<span class="chip-count">${count}</span></span>`;
      }).join('')}
    </div>

    <div class="setup-section-label">Timer</div>
    <div class="timer-mode-row">
      <div class="timer-mode-btn ${prefs.timerMode==='untimed'?'active':''}" onclick="setSetupTimerMode('untimed')">Untimed</div>
      <div class="timer-mode-btn ${prefs.timerMode==='stopwatch'?'active':''}" onclick="setSetupTimerMode('stopwatch')">${ICON.stopwatch.replace('<svg','<svg class="mode-icon" width="18" height="18"')}Stopwatch</div>
      <div class="timer-mode-btn ${prefs.timerMode==='countdown'?'active':''}" onclick="setSetupTimerMode('countdown')">${ICON.clock.replace('<svg','<svg class="mode-icon" width="18" height="18"')}Countdown</div>
    </div>
    ${prefs.timerMode === 'countdown' ? `
      <div class="countdown-secs-row">
        ${[30,60,90,120].map(s => `<div class="countdown-secs-btn ${prefs.countdownSecs===s?'active':''}" onclick="setSetupCountdownSecs(${s})">${s}s</div>`).join('')}
      </div>
    ` : ''}

    <div class="setup-section-label">This selection</div>
    <div class="progress-stat-row">
      <div class="progress-stat"><span class="stat-num">${stats.total}</span><span class="stat-lbl">Questions</span></div>
      <div class="progress-stat"><span class="stat-num">${stats.attempted}</span><span class="stat-lbl">Already done</span></div>
      <div class="progress-stat"><span class="stat-num">${stats.attempted ? Math.round(stats.correct/stats.attempted*100) : 0}%</span><span class="stat-lbl">Score so far</span></div>
    </div>

    <button class="btn-primary" style="margin-top:8px;" onclick="startQuizFromSetup()">${ICON.quiz} Start quiz${stats.total ? ` (${stats.total} questions)` : ''}</button>
    ${overall.attempted ? `<span class="reset-progress-link" onclick="resetQuizProgress()">Clear all saved progress</span>` : ''}
  `;
  shell(html, { title: 'SBA Quiz', eyebrow: 'Set up your session', showBack: true, backHash: '#/', activeNav: 'quiz' });
}
window.toggleSetupChapter = (chapterId) => {
  if (chapterId === null){ quizSetupState.selectedChapters = []; renderQuizSetup(); return; }
  const sel = quizSetupState.selectedChapters;
  const idx = sel.indexOf(chapterId);
  if (idx >= 0) sel.splice(idx, 1); else sel.push(chapterId);
  renderQuizSetup();
};
window.setSetupTimerMode = (mode) => {
  const prefs = loadQuizPrefs();
  prefs.timerMode = mode;
  saveQuizPrefs(prefs);
  renderQuizSetup();
};
window.setSetupCountdownSecs = (secs) => {
  const prefs = loadQuizPrefs();
  prefs.countdownSecs = secs;
  saveQuizPrefs(prefs);
  renderQuizSetup();
};
window.startQuizFromSetup = () => {
  const chaptersWithQuizzes = D.CHAPTERS.filter(c => D.QUIZ_BANK.some(q => q.chapter === c.id));
  const ids = quizSetupState.selectedChapters.length ? quizSetupState.selectedChapters : chaptersWithQuizzes.map(c => c.id);
  startQuiz(ids, loadQuizPrefs());
};

function startQuiz(chapterIds, prefs){
  const deck = D.QUIZ_BANK.filter(q => chapterIds.includes(q.chapter));
  if (quizState.timerHandle) clearInterval(quizState.timerHandle);
  quizState = {
    deck: shuffle([...deck]), index: 0, selected: null, answered: false, correctCount: 0,
    timerMode: prefs.timerMode, countdownSecs: prefs.countdownSecs, elapsedSecs: prefs.timerMode === 'countdown' ? prefs.countdownSecs : 0,
    timerHandle: null, expired: false,
  };
  renderQuiz();
  startQuizTimer();
}
function startQuizTimer(){
  if (quizState.timerMode === 'untimed') return;
  if (quizState.timerHandle) clearInterval(quizState.timerHandle);
  quizState.timerHandle = setInterval(() => {
    if (quizState.answered) return;
    if (quizState.timerMode === 'stopwatch'){
      quizState.elapsedSecs++;
    } else if (quizState.timerMode === 'countdown'){
      quizState.elapsedSecs--;
      if (quizState.elapsedSecs <= 0){
        quizState.elapsedSecs = 0;
        quizState.expired = true;
        quizState.answered = true;
        recordQuizAnswer(quizState.deck[quizState.index].id, false);
      }
    }
    renderQuiz();
  }, 1000);
}
function fmtTime(secs){
  const m = Math.floor(secs/60), s = secs%60;
  return `${m}:${String(s).padStart(2,'0')}`;
}

function renderQuiz(){
  const { deck, index, selected, answered, correctCount, timerMode, elapsedSecs, expired } = quizState;
  if (!deck.length){
    shell(`<div class="outline-state">${ICON.quiz.replace('<svg','<svg style="stroke:var(--ink-40)"')}<h3>No questions yet</h3><p>Try a different chapter selection.</p></div>`,
      { title: 'Quiz', showBack: true, backHash: '#/quiz', activeNav: 'quiz' });
    return;
  }
  if (index >= deck.length){
    if (quizState.timerHandle) clearInterval(quizState.timerHandle);
    const pct = Math.round((correctCount / deck.length) * 100);
    const html = `
      <div class="quiz-results">
        <div class="quiz-score-ring"><span>${pct}%</span></div>
        <h2>${correctCount} of ${deck.length} correct</h2>
        ${timerMode === 'stopwatch' ? `<p style="margin-bottom:4px;">Total time: ${fmtTime(elapsedSecs)}</p>` : ''}
        <p>${pct >= 80 ? 'Strong performance — ready for the real thing.' : pct >= 50 ? 'Solid base. Review the misses and go again.' : 'Worth another pass through these monographs first.'}</p>
        <button class="btn-primary" onclick="restartQuiz()">${ICON.refresh} New quiz setup</button>
      </div>`;
    shell(html, { title: 'Quiz', showBack: true, backHash: '#/quiz', activeNav: 'quiz' });
    return;
  }
  const q = deck[index];
  const letters = ['A','B','C','D','E'];
  const timerBadge = timerMode === 'stopwatch'
    ? `<span class="quiz-timer-badge">${ICON.stopwatch.replace('<svg','<svg width="13" height="13"')}${fmtTime(elapsedSecs)}</span>`
    : timerMode === 'countdown'
    ? `<span class="quiz-timer-badge ${elapsedSecs<=10?'urgent':''}">${ICON.clock.replace('<svg','<svg width="13" height="13"')}${fmtTime(elapsedSecs)}</span>`
    : '';
  const html = `
    <div class="quiz-header-row">
      <div class="quiz-progress" style="margin-bottom:0;">Question ${index+1} of ${deck.length} · Chapter ${q.chapter}</div>
      ${timerBadge}
    </div>
    <div class="quiz-stem">${q.stem}</div>
    <div>
      ${q.options.map((opt, i) => {
        let cls = '';
        if (answered){
          cls = 'disabled';
          if (i === q.correct) cls += ' correct';
          else if (i === selected) cls += ' incorrect';
        } else if (i === selected) cls = 'selected';
        return `<div class="quiz-option ${cls}" onclick="${answered?'':`selectOption(${i})`}">
          <span class="letter">${letters[i]}</span><span>${opt}</span>
        </div>`;
      }).join('')}
    </div>
    ${answered ? `
      <div class="quiz-explanation">
        <div class="eyebrow">${expired ? 'Time expired' : selected === q.correct ? 'Correct' : 'Explanation'}</div>
        ${q.explanation}
      </div>
      <button class="quiz-next-btn" onclick="nextQuestion()">${index+1 < deck.length ? 'Next question' : 'See results'}</button>
    ` : `
      <button class="quiz-next-btn" style="opacity:${selected===null?0.4:1}" ${selected===null?'disabled':''} onclick="submitAnswer()">Submit answer</button>
    `}
  `;
  shell(html, { title: 'SBA Quiz', eyebrow: `Score: ${correctCount}/${index}`, showBack: true, backHash: '#/quiz', activeNav: 'quiz' });
}
window.selectOption = (i) => { quizState.selected = i; renderQuiz(); };
window.submitAnswer = () => {
  if (quizState.selected === null) return;
  quizState.answered = true;
  const q = quizState.deck[quizState.index];
  const isCorrect = quizState.selected === q.correct;
  if (isCorrect) quizState.correctCount++;
  recordQuizAnswer(q.id, isCorrect);
  renderQuiz();
};
window.nextQuestion = () => {
  quizState.index++; quizState.selected = null; quizState.answered = false; quizState.expired = false;
  if (quizState.timerMode === 'countdown') quizState.elapsedSecs = quizState.countdownSecs;
  renderQuiz();
  startQuizTimer();
};
window.restartQuiz = () => { if (quizState.timerHandle) clearInterval(quizState.timerHandle); navigate('#/quiz'); };

// ---------------------------------------------------------------------------
// Expose navigate globally for inline handlers
// ---------------------------------------------------------------------------
window.navigate = navigate;

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
render();

// ---------------------------------------------------------------------------
// CALCULATORS — Shock Index, Modified Shock Index, VTE Risk, MOEWS
// ---------------------------------------------------------------------------

route('/calculators', () => renderCalculatorHub());

function renderCalculatorHub(){
  const calcs = [
    { hash:'#/calculators/shock-index', icon:'⚡', title:'Shock Index', sub:'HR ÷ SBP · threshold 0.9', color:'var(--brick)' },
    { hash:'#/calculators/modified-shock-index', icon:'💓', title:'Modified Shock Index', sub:'HR ÷ MAP · threshold 1.4 in obstetrics', color:'var(--brick)' },
    { hash:'#/calculators/vte-risk', icon:'🩸', title:'VTE Risk Score', sub:'RCOG Green-top 37a · antenatal & postnatal', color:'var(--sage)' },
    { hash:'#/calculators/moews', icon:'📈', title:'MOEWS Score', sub:'Modified Obstetric Early Warning System', color:'var(--gold)' },
  ];
  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:22px;">Clinical Calculators</h1>
      <p style="font-size:12.5px;color:var(--ink-40);margin-bottom:4px;">Validated obstetric scoring tools for bedside use</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;padding:0 16px 32px;">
      ${calcs.map(c => `
        <a class="tool-card" href="${c.hash}" style="border-left:4px solid ${c.color};padding:16px;display:block;text-decoration:none;">
          <div style="font-size:20px;margin-bottom:4px;">${c.icon}</div>
          <div style="font-weight:700;font-size:15px;color:var(--ink);">${c.title}</div>
          <div style="font-size:12px;color:var(--ink-60);margin-top:2px;">${c.sub}</div>
        </a>`).join('')}
    </div>
    <div class="disclaimer-strip">These calculators are for educational and clinical decision-support only. Always verify against current RCOG/NICE guidelines and clinical judgement.</div>
  `;
  shell(html, { title:'Calculators', eyebrow:'Clinical Tools', activeNav:'home' });
}

// --- Shock Index ---
route('/calculators/shock-index', () => renderShockIndex());

function renderShockIndex(){
  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:22px;">Shock Index</h1>
      <p style="font-size:12.5px;color:var(--ink-40);">HR ÷ Systolic BP — obstetric threshold ≥ 0.9</p>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Enter values</div>
      <div style="display:flex;gap:12px;margin-bottom:16px;">
        <div style="flex:1;">
          <label style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:4px;">Heart Rate (bpm)</label>
          <input id="si-hr" type="number" min="20" max="250" placeholder="e.g. 110"
            style="width:100%;padding:10px 12px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:16px;background:var(--parchment);color:var(--ink);"
            oninput="calcSI()">
        </div>
        <div style="flex:1;">
          <label style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:4px;">Systolic BP (mmHg)</label>
          <input id="si-sbp" type="number" min="40" max="300" placeholder="e.g. 90"
            style="width:100%;padding:10px 12px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:16px;background:var(--parchment);color:var(--ink);"
            oninput="calcSI()">
        </div>
      </div>
      <div id="si-result" style="display:none;padding:16px;border-radius:10px;margin-bottom:8px;"></div>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Interpretation thresholds</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);">
          <th style="padding:8px 10px;text-align:left;font-weight:600;">SI</th>
          <th style="padding:8px 10px;text-align:left;font-weight:600;">Interpretation</th>
          <th style="padding:8px 10px;text-align:left;font-weight:600;">Action</th>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;font-weight:600;color:var(--sage);">&lt; 0.9</td>
          <td style="padding:8px 10px;">Normal</td>
          <td style="padding:8px 10px;">Routine monitoring</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;font-weight:600;color:var(--gold);">0.9 – 1.0</td>
          <td style="padding:8px 10px;">Mildly elevated</td>
          <td style="padding:8px 10px;">Increase monitoring frequency; assess for bleeding</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;font-weight:600;color:var(--brick);">1.0 – 1.4</td>
          <td style="padding:8px 10px;">Moderate shock</td>
          <td style="padding:8px 10px;">Senior review; IV access; bloods; consider transfusion</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;font-weight:600;color:var(--brick);">&gt; 1.4</td>
          <td style="padding:8px 10px;font-weight:600;">Severe haemorrhagic shock</td>
          <td style="padding:8px 10px;font-weight:600;">Immediate senior/MET call; massive haemorrhage protocol</td>
        </tr>
      </table>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Clinical pearl</div>
      <div class="pearl-note"><span class="pin"></span>SI ≥ 0.9 in obstetric haemorrhage predicts need for blood transfusion with greater sensitivity than conventional vital signs alone. SI can identify haemodynamic instability before BP drops into the classically 'hypotensive' range — important because young parturients can compensate until late.</div>
    </div>

    <div class="disclaimer-strip">Educational tool only — always apply clinical judgement and local major haemorrhage protocols.</div>
  `;
  shell(html, { title:'Shock Index', eyebrow:'Clinical Calculator', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

window.calcSI = function(){
  const hr = parseFloat(document.getElementById('si-hr').value);
  const sbp = parseFloat(document.getElementById('si-sbp').value);
  const res = document.getElementById('si-result');
  if (!hr || !sbp || sbp === 0) { res.style.display='none'; return; }
  const si = (hr/sbp).toFixed(2);
  let bg, color, label, action;
  if (si < 0.9)       { bg='#e8f5e9'; color='#2e7d32'; label='Normal'; action='Routine monitoring'; }
  else if (si < 1.0)  { bg='#fff8e1'; color='#f57f17'; label='Mildly elevated — increase monitoring'; action='Assess for occult bleeding; increase obs frequency'; }
  else if (si < 1.4)  { bg='#fff3e0'; color='#e65100'; label='Moderate shock'; action='Senior review · IV access · bloods · consider transfusion'; }
  else                { bg='#ffebee'; color='#b71c1c'; label='Severe haemorrhagic shock'; action='Immediate senior/MET call · Activate massive haemorrhage protocol'; }
  res.style.display='block';
  res.style.background=bg;
  res.innerHTML=`
    <div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">SI = ${si}</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>
  `;
};

// --- Modified Shock Index ---
route('/calculators/modified-shock-index', () => renderMSI());

function renderMSI(){
  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:22px;">Modified Shock Index</h1>
      <p style="font-size:12.5px;color:var(--ink-40);">HR ÷ Mean Arterial Pressure — obstetric threshold ≥ 1.4</p>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Enter values</div>
      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;">
        <div style="flex:1;min-width:90px;">
          <label style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:4px;">Heart Rate (bpm)</label>
          <input id="msi-hr" type="number" min="20" max="250" placeholder="110"
            style="width:100%;padding:10px 12px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:16px;background:var(--parchment);color:var(--ink);"
            oninput="calcMSI()">
        </div>
        <div style="flex:1;min-width:90px;">
          <label style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:4px;">Systolic BP (mmHg)</label>
          <input id="msi-sbp" type="number" min="40" max="300" placeholder="100"
            style="width:100%;padding:10px 12px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:16px;background:var(--parchment);color:var(--ink);"
            oninput="calcMSI()">
        </div>
        <div style="flex:1;min-width:90px;">
          <label style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:4px;">Diastolic BP (mmHg)</label>
          <input id="msi-dbp" type="number" min="20" max="200" placeholder="60"
            style="width:100%;padding:10px 12px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:16px;background:var(--parchment);color:var(--ink);"
            oninput="calcMSI()">
        </div>
      </div>
      <div id="msi-map" style="font-size:12px;color:var(--ink-60);margin-bottom:8px;display:none;"></div>
      <div id="msi-result" style="display:none;padding:16px;border-radius:10px;"></div>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Thresholds</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px 10px;text-align:left;">MSI</th><th style="padding:8px 10px;text-align:left;">Interpretation</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:var(--sage);font-weight:600;">&lt; 1.4</td><td style="padding:8px 10px;">Haemodynamically stable</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:var(--gold);font-weight:600;">1.4 – 1.7</td><td style="padding:8px 10px;">Moderate compromise — senior review</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:var(--brick);font-weight:600;">&gt; 1.7</td><td style="padding:8px 10px;">Severe — immediate senior/MET activation</td></tr>
      </table>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Why MAP instead of SBP?</div>
      <div class="pearl-note"><span class="pin"></span>MAP reflects organ perfusion pressure more accurately than SBP alone (MAP = DBP + ⅓ pulse pressure). The MSI ≥ 1.4 threshold has shown superior predictive value for severe maternal morbidity in postpartum haemorrhage compared to the standard SI, particularly in detecting early compensated shock.</div>
    </div>

    <div class="disclaimer-strip">Educational tool only. MAP = DBP + (SBP−DBP)/3.</div>
  `;
  shell(html, { title:'Modified Shock Index', eyebrow:'Clinical Calculator', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

window.calcMSI = function(){
  const hr = parseFloat(document.getElementById('msi-hr').value);
  const sbp = parseFloat(document.getElementById('msi-sbp').value);
  const dbp = parseFloat(document.getElementById('msi-dbp').value);
  const res = document.getElementById('msi-result');
  const mapEl = document.getElementById('msi-map');
  if (!hr || !sbp || !dbp) { res.style.display='none'; mapEl.style.display='none'; return; }
  const map = dbp + (sbp - dbp) / 3;
  const msi = (hr / map).toFixed(2);
  mapEl.style.display='block';
  mapEl.textContent = `MAP = ${map.toFixed(1)} mmHg`;
  let bg, color, label, action;
  if (msi < 1.4)      { bg='#e8f5e9'; color='#2e7d32'; label='Haemodynamically stable'; action='Continue standard monitoring'; }
  else if (msi < 1.7) { bg='#fff8e1'; color='#f57f17'; label='Moderate haemodynamic compromise'; action='Senior obstetrician review · IV access · bloods including cross-match'; }
  else                { bg='#ffebee'; color='#b71c1c'; label='Severe compromise'; action='Immediate MET/senior call · Activate major haemorrhage protocol'; }
  res.style.display='block';
  res.style.background=bg;
  res.innerHTML=`
    <div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">MSI = ${msi}</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>
  `;
};

// --- VTE Risk Score (RCOG Green-top 37a) ---
route('/calculators/vte-risk', () => renderVTERisk());

function renderVTERisk(){
  const antenatalFactors = [
    { id:'vte-prev-vte', label:'Previous VTE (not single provoked by surgery)', points:4 },
    { id:'vte-prev-vte-surg', label:'Previous VTE — single provoked by surgery', points:3 },
    { id:'vte-known-thromb', label:'Known thrombophilia (high-risk: antithrombin deficiency, compound/homozygous)', points:3 },
    { id:'vte-known-thromb-low', label:'Known thrombophilia (lower-risk: heterozygous FVL, PT G20210A, protein C/S deficiency)', points:1 },
    { id:'vte-fh', label:'Family history of unprovoked or oestrogen-provoked VTE in 1st-degree relative', points:1 },
    { id:'vte-ivf', label:'IVF / ART pregnancy', points:1 },
    { id:'vte-parity', label:'Parity ≥ 3', points:1 },
    { id:'vte-smoker', label:'Current smoker', points:1 },
    { id:'vte-veins', label:'Gross varicose veins (symptomatic/above knee)', points:1 },
    { id:'vte-immobile', label:'Significant immobility / long-haul travel (> 4 hr)', points:1 },
    { id:'vte-infection', label:'Systemic infection requiring hospital admission', points:1 },
    { id:'vte-bmi30', label:'BMI ≥ 30 kg/m²', points:1 },
    { id:'vte-bmi40', label:'BMI ≥ 40 kg/m² (add to BMI ≥ 30 above)', points:1 },
    { id:'vte-multip', label:'Multiple pregnancy', points:1 },
    { id:'vte-ivh', label:'IVF/ART with ovarian hyperstimulation (1st trimester only)', points:4 },
    { id:'vte-pph', label:'Antepartum haemorrhage or placenta praevia (current pregnancy)', points:1 },
    { id:'vte-preeclampsia', label:'Pre-eclampsia in current pregnancy', points:1 },
    { id:'vte-dehydration', label:'Severe dehydration / hyperemesis gravidarum', points:1 },
  ];
  const postnatalFactors = [
    { id:'vte-pn-cs-emer', label:'Emergency Caesarean section', points:4 },
    { id:'vte-pn-cs-elect', label:'Elective Caesarean section', points:2 },
    { id:'vte-pn-midcavity', label:'Mid-cavity or rotational instrumental delivery', points:1 },
    { id:'vte-pn-prolong-labour', label:'Prolonged labour (> 24 hours)', points:1 },
    { id:'vte-pn-pph', label:'Postpartum haemorrhage > 1 litre or blood transfusion', points:1 },
    { id:'vte-pn-preterm', label:'Preterm birth (< 37 weeks) in this pregnancy', points:1 },
    { id:'vte-pn-stillbirth', label:'Stillbirth in this pregnancy', points:1 },
    { id:'vte-pn-infection', label:'Systemic infection requiring IV antibiotics', points:1 },
    { id:'vte-pn-immobile', label:'Significant immobility (bed rest ≥ 3 days, long-haul travel)', points:1 },
  ];
  const fxRows = (factors) => factors.map(f => `
    <label style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--ink-08);cursor:pointer;">
      <input type="checkbox" id="${f.id}" style="margin-top:2px;width:18px;height:18px;flex-shrink:0;" onchange="calcVTE()">
      <span style="font-size:13px;line-height:1.5;flex:1;">${f.label}</span>
      <span style="font-size:13px;font-weight:700;color:var(--brick);flex-shrink:0;min-width:24px;text-align:right;">+${f.points}</span>
    </label>`).join('');
  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:22px;">VTE Risk Score</h1>
      <p style="font-size:12.5px;color:var(--ink-40);">RCOG Green-top 37a · Antenatal &amp; Postnatal</p>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Antenatal risk factors</div>
      <div style="padding:0 4px;">${fxRows(antenatalFactors)}</div>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Postnatal risk factors</div>
      <div style="padding:0 4px;">${fxRows(postnatalFactors)}</div>
    </div>

    <div id="vte-result" style="margin:16px;padding:18px;border-radius:12px;display:none;"></div>

    <div class="mono-section">
      <div class="mono-section-title">RCOG 37a decision thresholds</div>
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
        <tr style="background:var(--ink-05);">
          <th style="padding:8px 10px;text-align:left;">Timing</th>
          <th style="padding:8px 10px;text-align:left;">Score</th>
          <th style="padding:8px 10px;text-align:left;">Recommendation</th>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;" rowspan="2"><b>Antenatal</b></td>
          <td style="padding:8px 10px;color:var(--brick);font-weight:600;">≥ 4</td>
          <td style="padding:8px 10px;">LMWH from first trimester</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;color:var(--gold);font-weight:600;">= 3</td>
          <td style="padding:8px 10px;">LMWH from 28 weeks</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;" rowspan="2"><b>Postnatal</b></td>
          <td style="padding:8px 10px;color:var(--brick);font-weight:600;">≥ 3</td>
          <td style="padding:8px 10px;">LMWH for 10 days</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;color:var(--brick);font-weight:600;">≥ 4 (or CS)</td>
          <td style="padding:8px 10px;">LMWH for 6 weeks</td>
        </tr>
      </table>
    </div>

    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>All women should receive hydration advice and early mobilisation. TED stockings are additive but not a substitute for LMWH when pharmacological prophylaxis is indicated. Withhold LMWH 12 h before epidural/spinal for prophylactic dose; 24 h for therapeutic dose.</div>
    </div>

    <div class="disclaimer-strip">Based on RCOG Green-top Guideline 37a (2015, updated 2023). Always cross-check with the full guideline and local protocol.</div>
  `;
  shell(html, { title:'VTE Risk Score', eyebrow:'RCOG Green-top 37a', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

window.calcVTE = function(){
  let score = 0;
  document.querySelectorAll('#vte-result ~ * input[type=checkbox], .mono-section input[type=checkbox]').forEach(cb => {
    if(cb.checked) score += parseInt(cb.dataset.points || 0);
  });
  // Re-read directly from all checkboxes with point values
  score = 0;
  document.querySelectorAll('input[type=checkbox]').forEach(cb => {
    if(!cb.checked) return;
    const id = cb.id;
    const allFactors = [
      {id:'vte-prev-vte',points:4},{id:'vte-prev-vte-surg',points:3},{id:'vte-known-thromb',points:3},
      {id:'vte-known-thromb-low',points:1},{id:'vte-fh',points:1},{id:'vte-ivf',points:1},
      {id:'vte-parity',points:1},{id:'vte-smoker',points:1},{id:'vte-veins',points:1},
      {id:'vte-immobile',points:1},{id:'vte-infection',points:1},{id:'vte-bmi30',points:1},
      {id:'vte-bmi40',points:1},{id:'vte-multip',points:1},{id:'vte-ivh',points:4},
      {id:'vte-pph',points:1},{id:'vte-preeclampsia',points:1},{id:'vte-dehydration',points:1},
      {id:'vte-pn-cs-emer',points:4},{id:'vte-pn-cs-elect',points:2},{id:'vte-pn-midcavity',points:1},
      {id:'vte-pn-prolong-labour',points:1},{id:'vte-pn-pph',points:1},{id:'vte-pn-preterm',points:1},
      {id:'vte-pn-stillbirth',points:1},{id:'vte-pn-infection',points:1},{id:'vte-pn-immobile',points:1},
    ];
    const f = allFactors.find(x=>x.id===id);
    if(f) score += f.points;
  });

  const res = document.getElementById('vte-result');
  let bg, color, label, rec;
  if(score === 0)      { res.style.display='none'; return; }
  else if(score < 3)   { bg='#e8f5e9'; color='#2e7d32'; label='Low risk'; rec='Mobilisation · hydration · TED stockings if any minor risk factor'; }
  else if(score === 3) { bg='#fff8e1'; color='#f57f17'; label='Intermediate risk'; rec='Antenatal: LMWH from 28 weeks · Postnatal: LMWH for 10 days'; }
  else                 { bg='#ffebee'; color='#b71c1c'; label='High risk'; rec='Antenatal: LMWH from 1st trimester · Postnatal: LMWH for 6 weeks if score ≥ 4 or CS'; }
  res.style.display='block';
  res.style.background=bg;
  res.innerHTML=`
    <div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">Score = ${score}</div>
    <div style="font-weight:700;color:${color};font-size:15px;margin-bottom:6px;">${label}</div>
    <div style="font-size:13px;color:var(--ink-70);line-height:1.6;">${rec}</div>
  `;
};

// --- MOEWS ---
route('/calculators/moews', () => renderMOEWS());

function renderMOEWS(){
  const params = [
    {
      id:'moews-rr', label:'Respiratory Rate (breaths/min)',
      cols:[
        {range:'≤ 9',score:3,color:'#b71c1c'},{range:'10–11',score:2,color:'#e65100'},{range:'12–14',score:1,color:'#f57f17'},
        {range:'15–20',score:0,color:'#2e7d32'},{range:'21–25',score:1,color:'#f57f17'},{range:'26–29',score:2,color:'#e65100'},
        {range:'≥ 30',score:3,color:'#b71c1c'},
      ]
    },
    {
      id:'moews-spo2', label:'SpO₂ (%)',
      cols:[
        {range:'≤ 85',score:3,color:'#b71c1c'},{range:'86–90',score:2,color:'#e65100'},{range:'91–93',score:1,color:'#f57f17'},
        {range:'≥ 94',score:0,color:'#2e7d32'},{range:'',score:null},{range:'',score:null},{range:'',score:null},
      ]
    },
    {
      id:'moews-sbp', label:'Systolic BP (mmHg)',
      cols:[
        {range:'≤ 70',score:3,color:'#b71c1c'},{range:'71–80',score:2,color:'#e65100'},{range:'81–89',score:1,color:'#f57f17'},
        {range:'90–139',score:0,color:'#2e7d32'},{range:'140–149',score:1,color:'#f57f17'},{range:'150–159',score:2,color:'#e65100'},
        {range:'≥ 160',score:3,color:'#b71c1c'},
      ]
    },
    {
      id:'moews-hr', label:'Heart Rate (bpm)',
      cols:[
        {range:'≤ 39',score:3,color:'#b71c1c'},{range:'40–50',score:2,color:'#e65100'},{range:'51–60',score:1,color:'#f57f17'},
        {range:'61–100',score:0,color:'#2e7d32'},{range:'101–110',score:1,color:'#f57f17'},{range:'111–129',score:2,color:'#e65100'},
        {range:'≥ 130',score:3,color:'#b71c1c'},
      ]
    },
    {
      id:'moews-temp', label:'Temperature (°C)',
      cols:[
        {range:'≤ 35.0',score:3,color:'#b71c1c'},{range:'35.1–36.0',score:2,color:'#e65100'},{range:'',score:null},
        {range:'36.1–37.9',score:0,color:'#2e7d32'},{range:'',score:null},{range:'38.0–38.9',score:2,color:'#e65100'},
        {range:'≥ 39.0',score:3,color:'#b71c1c'},
      ]
    },
    {
      id:'moews-avpu', label:'Neurological (AVPU)',
      cols:[
        {range:'U',score:3,color:'#b71c1c'},{range:'P',score:2,color:'#e65100'},{range:'V',score:1,color:'#f57f17'},
        {range:'A',score:0,color:'#2e7d32'},{range:'',score:null},{range:'',score:null},{range:'',score:null},
      ]
    },
    {
      id:'moews-urine', label:'Urine output (mL/hr)',
      cols:[
        {range:'< 10',score:3,color:'#b71c1c'},{range:'10–19',score:2,color:'#e65100'},{range:'20–29',score:1,color:'#f57f17'},
        {range:'≥ 30',score:0,color:'#2e7d32'},{range:'',score:null},{range:'',score:null},{range:'',score:null},
      ]
    },
  ];

  const scoreColors = ['#2e7d32','#f57f17','#e65100','#b71c1c'];
  const scoreLabels = ['Normal','Borderline','Moderate','Extreme'];

  const paramRows = params.map(p => `
    <div class="mono-section" style="margin-bottom:0;padding-bottom:0;">
      <div style="font-size:13px;font-weight:600;margin-bottom:8px;">${p.label}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:4px;">
        ${p.cols.filter(c=>c.score!==null && c.range).map(c => `
          <button onclick="setMOEWS('${p.id}', ${c.score})"
            id="${p.id}-${c.score}-${c.range.replace(/[^a-z0-9]/gi,'')}"
            style="padding:6px 10px;border:2px solid ${c.color};border-radius:8px;background:white;cursor:pointer;font-size:12px;color:${c.color};font-weight:600;transition:all 0.15s;"
            data-pid="${p.id}" data-score="${c.score}">
            ${c.range} <span style="opacity:0.7;">(${c.score>0?'+':''}${c.score})</span>
          </button>`).join('')}
      </div>
    </div>`).join('<div style="border-bottom:1px solid var(--ink-08);margin:8px 16px;"></div>');

  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:22px;">MOEWS Score</h1>
      <p style="font-size:12.5px;color:var(--ink-40);">Modified Obstetric Early Warning System</p>
    </div>

    <div style="padding:8px 16px 0;">
      <p style="font-size:12.5px;color:var(--ink-60);line-height:1.6;">Tap the range that matches your patient. The total score updates automatically.</p>
    </div>

    ${paramRows}

    <div id="moews-result" style="margin:16px;padding:18px;border-radius:12px;display:none;"></div>

    <div class="mono-section">
      <div class="mono-section-title">Trigger thresholds</div>
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
        <tr style="background:var(--ink-05);">
          <th style="padding:8px 10px;text-align:left;">Score</th>
          <th style="padding:8px 10px;text-align:left;">Action</th>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#2e7d32;font-weight:600;">0–1</td><td style="padding:8px 10px;">Routine obs as per local protocol</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#f57f17;font-weight:600;">2</td><td style="padding:8px 10px;">Increase monitoring frequency · inform midwife in charge</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#e65100;font-weight:600;">3–4</td><td style="padding:8px 10px;">Urgent senior midwife + junior doctor review within 30 min</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#b71c1c;font-weight:600;">≥ 5 or any single parameter = 3</td><td style="padding:8px 10px;font-weight:600;">Immediate senior obstetrician + anaesthetist · Consider ICU</td></tr>
      </table>
    </div>

    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>A single red score (any parameter = 3) triggers the same escalation as a total score ≥ 5, regardless of the total. MOEWS is most sensitive when used with clinical gestalt — it augments, not replaces, clinical judgement. Document score and escalation action in the maternity notes.</div>
    </div>

    <div class="disclaimer-strip">MOEWS parameters and thresholds vary between trusts. Confirm against your local maternity early warning tool before clinical use.</div>
  `;
  shell(html, { title:'MOEWS', eyebrow:'Obstetric Early Warning', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// Store MOEWS selections
const moewsState = {};
window.setMOEWS = function(paramId, score){
  moewsState[paramId] = parseInt(score);
  // Update button styles
  document.querySelectorAll(`[data-pid="${paramId}"]`).forEach(btn => {
    const btnScore = parseInt(btn.dataset.score);
    const isSelected = btnScore === moewsState[paramId];
    const c = btn.style.borderColor;
    btn.style.background = isSelected ? c : 'white';
    btn.style.color = isSelected ? 'white' : c;
    btn.style.transform = isSelected ? 'scale(1.05)' : 'scale(1)';
  });
  // Calculate total
  const total = Object.values(moewsState).reduce((a,b) => a+b, 0);
  const hasRed = Object.values(moewsState).some(v => v === 3);
  const res = document.getElementById('moews-result');
  let bg, color, label, action;
  if(total <= 1 && !hasRed)      { bg='#e8f5e9'; color='#2e7d32'; label='Low concern'; action='Routine monitoring per local protocol'; }
  else if(total === 2 && !hasRed){ bg='#fff8e1'; color='#f57f17'; label='Borderline'; action='Increase monitoring frequency · Inform midwife in charge'; }
  else if(total <= 4 && !hasRed) { bg='#fff3e0'; color='#e65100'; label='Moderate concern'; action='Senior midwife + junior doctor review within 30 minutes'; }
  else                           { bg='#ffebee'; color='#b71c1c'; label='High concern'; action='Immediate senior obstetrician + anaesthetist · Consider ICU · Document escalation'; }
  res.style.display='block';
  res.style.background=bg;
  res.innerHTML=`
    <div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">Total = ${total}${hasRed ? ' ⚠' : ''}</div>
    <div style="font-weight:700;color:${color};font-size:15px;margin-bottom:6px;">${label}${hasRed ? ' (red parameter)' : ''}</div>
    <div style="font-size:13px;color:var(--ink-70);line-height:1.6;">${action}</div>
  `;
};

