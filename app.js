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
// ---------------------------------------------------------------------------
// CALCULATORS — 11 validated obstetric clinical scoring tools
// All window.* handler functions are defined here so they exist when
// the router calls render() at the bottom of app_core.js.
// ---------------------------------------------------------------------------

// ── shared state (must be defined before any handler) ──────────────────────
const _moewsState = {};

// ── handler functions (global, defined before render) ──────────────────────

window.calcSI = function () {
  const hr  = parseFloat(document.getElementById('si-hr')  && document.getElementById('si-hr').value);
  const sbp = parseFloat(document.getElementById('si-sbp') && document.getElementById('si-sbp').value);
  const res = document.getElementById('si-result');
  if (!res) return;
  if (!hr || !sbp || sbp === 0) { res.style.display = 'none'; return; }
  const si = (hr / sbp).toFixed(2);
  let bg, color, label, action;
  if      (si < 0.9) { bg='#e8f5e9'; color='#2e7d32'; label='Normal'; action='Routine monitoring'; }
  else if (si < 1.0) { bg='#fff8e1'; color='#f57f17'; label='Mildly elevated'; action='Increase monitoring; assess for bleeding'; }
  else if (si < 1.4) { bg='#fff3e0'; color='#e65100'; label='Moderate shock'; action='Senior review · IV access · bloods · consider transfusion'; }
  else               { bg='#ffebee'; color='#b71c1c'; label='Severe haemorrhagic shock'; action='Immediate senior/MET call · Activate massive haemorrhage protocol'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-bottom:8px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">SI = ${si}</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

window.calcMSI = function () {
  const hr  = parseFloat(document.getElementById('msi-hr')  && document.getElementById('msi-hr').value);
  const sbp = parseFloat(document.getElementById('msi-sbp') && document.getElementById('msi-sbp').value);
  const dbp = parseFloat(document.getElementById('msi-dbp') && document.getElementById('msi-dbp').value);
  const res   = document.getElementById('msi-result');
  const mapEl = document.getElementById('msi-map');
  if (!res) return;
  if (!hr || !sbp || !dbp) { res.style.display='none'; if(mapEl) mapEl.style.display='none'; return; }
  const map = dbp + (sbp - dbp) / 3;
  const msi = (hr / map).toFixed(2);
  if (mapEl) { mapEl.style.display='block'; mapEl.textContent = `MAP = ${map.toFixed(1)} mmHg`; }
  let bg, color, label, action;
  if      (msi < 1.4) { bg='#e8f5e9'; color='#2e7d32'; label='Haemodynamically stable'; action='Continue standard monitoring'; }
  else if (msi < 1.7) { bg='#fff8e1'; color='#f57f17'; label='Moderate compromise'; action='Senior obstetrician review · IV access · bloods including cross-match'; }
  else                { bg='#ffebee'; color='#b71c1c'; label='Severe compromise'; action='Immediate MET/senior call · Major haemorrhage protocol'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">MSI = ${msi}</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

const _vteFactors = [
  {id:'vte-prev-vte',p:4},{id:'vte-prev-vte-surg',p:3},{id:'vte-known-thromb-hi',p:3},
  {id:'vte-known-thromb-lo',p:1},{id:'vte-fh',p:1},{id:'vte-ivf',p:1},
  {id:'vte-parity',p:1},{id:'vte-smoker',p:1},{id:'vte-veins',p:1},
  {id:'vte-immobile',p:1},{id:'vte-infection',p:1},{id:'vte-bmi30',p:1},
  {id:'vte-bmi40',p:1},{id:'vte-multip',p:1},{id:'vte-ivh',p:4},
  {id:'vte-pph',p:1},{id:'vte-preeclampsia',p:1},{id:'vte-dehydration',p:1},
  {id:'vte-pn-cs-emer',p:4},{id:'vte-pn-cs-elect',p:2},{id:'vte-pn-midcavity',p:1},
  {id:'vte-pn-prolong',p:1},{id:'vte-pn-pph',p:1},{id:'vte-pn-preterm',p:1},
  {id:'vte-pn-stillbirth',p:1},{id:'vte-pn-infection',p:1},{id:'vte-pn-immobile',p:1},
];

window.calcVTE = function () {
  let score = 0;
  _vteFactors.forEach(f => {
    const el = document.getElementById(f.id);
    if (el && el.checked) score += f.p;
  });
  const res = document.getElementById('vte-result');
  if (!res) return;
  if (score === 0) { res.style.display='none'; return; }
  let bg, color, label, rec;
  if      (score < 3) { bg='#e8f5e9'; color='#2e7d32'; label='Low risk'; rec='Mobilisation · hydration · TED stockings if any minor risk factor'; }
  else if (score === 3){ bg='#fff8e1'; color='#f57f17'; label='Intermediate risk'; rec='Antenatal: LMWH from 28 weeks · Postnatal: LMWH for 10 days'; }
  else                { bg='#ffebee'; color='#b71c1c'; label='High risk'; rec='Antenatal: LMWH from 1st trimester · Postnatal: LMWH for 6 weeks (if ≥4 or CS)'; }
  res.style.cssText = `display:block;padding:18px;border-radius:12px;background:${bg};margin:16px 0;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">Score = ${score}</div>
    <div style="font-weight:700;color:${color};font-size:15px;margin-bottom:6px;">${label}</div>
    <div style="font-size:13px;color:var(--ink-70);line-height:1.6;">${rec}</div>`;
};

window.setMOEWS = function (paramId, scoreVal) {
  _moewsState[paramId] = parseInt(scoreVal);
  document.querySelectorAll(`[data-pid="${paramId}"]`).forEach(btn => {
    const sel = parseInt(btn.dataset.score) === _moewsState[paramId];
    const c   = btn.dataset.color;
    btn.style.background = sel ? c : 'white';
    btn.style.color      = sel ? 'white' : c;
    btn.style.transform  = sel ? 'scale(1.05)' : 'scale(1)';
  });
  const total  = Object.values(_moewsState).reduce((a, b) => a + b, 0);
  const hasRed = Object.values(_moewsState).some(v => v === 3);
  const res = document.getElementById('moews-result');
  if (!res) return;
  let bg, color, label, action;
  if      (total <= 1 && !hasRed) { bg='#e8f5e9'; color='#2e7d32'; label='Low concern'; action='Routine monitoring per local protocol'; }
  else if (total === 2 && !hasRed){ bg='#fff8e1'; color='#f57f17'; label='Borderline'; action='Increase monitoring frequency · Inform midwife in charge'; }
  else if (total <= 4 && !hasRed) { bg='#fff3e0'; color='#e65100'; label='Moderate concern'; action='Senior midwife + junior doctor review within 30 minutes'; }
  else                            { bg='#ffebee'; color='#b71c1c'; label='High concern'; action='Immediate senior obstetrician + anaesthetist · Consider ICU'; }
  res.style.cssText = `display:block;padding:18px;border-radius:12px;background:${bg};margin:16px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">Total = ${total}${hasRed?' ⚠':''}</div>
    <div style="font-weight:700;color:${color};font-size:15px;margin-bottom:6px;">${label}${hasRed?' (red parameter)':''}</div>
    <div style="font-size:13px;color:var(--ink-70);line-height:1.6;">${action}</div>`;
};

window.calcGCS = function () {
  const e = parseInt(document.getElementById('gcs-eye')   ?.value || 0);
  const v = parseInt(document.getElementById('gcs-verbal')?.value || 0);
  const m = parseInt(document.getElementById('gcs-motor') ?.value || 0);
  const res = document.getElementById('gcs-result');
  if (!res) return;
  if (!e || !v || !m) { res.style.display='none'; return; }
  const total = e + v + m;
  let bg, color, label, action;
  if      (total >= 13) { bg='#e8f5e9'; color='#2e7d32'; label='Mild / Minimal impairment'; action='Monitor closely; reassess frequently'; }
  else if (total >= 9)  { bg='#fff8e1'; color='#f57f17'; label='Moderate impairment'; action='Senior review · Consider CT head · Anaesthetic involvement'; }
  else                  { bg='#ffebee'; color='#b71c1c'; label='Severe impairment'; action='Immediate senior/anaesthetic/ICU involvement · Airway at risk'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">GCS = ${total}/15</div>
    <div style="font-size:12px;color:var(--ink-60);margin-bottom:4px;">E${e} V${v} M${m}</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

window.calcQSOFA = function () {
  let score = 0;
  ['qsofa-rr','qsofa-mental','qsofa-sbp'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.checked) score++;
  });
  const res = document.getElementById('qsofa-result');
  if (!res) return;
  let bg, color, label, action;
  if      (score === 0) { bg='#e8f5e9'; color='#2e7d32'; label='Low risk'; action='Routine care; monitor for deterioration'; }
  else if (score === 1) { bg='#fff8e1'; color='#f57f17'; label='Increased risk'; action='Senior review; assess for source of infection; escalate monitoring'; }
  else                  { bg='#ffebee'; color='#b71c1c'; label='High risk — suspect sepsis'; action='Sepsis Six immediately · Blood cultures · IV antibiotics within 1 hour · Senior obstetrician'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">qSOFA = ${score}/3</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

window.calcPUQE = function () {
  const n = parseInt(document.getElementById('puqe-nausea')   ?.value || 0);
  const v = parseInt(document.getElementById('puqe-vomit')    ?.value || 0);
  const r = parseInt(document.getElementById('puqe-retching') ?.value || 0);
  const res = document.getElementById('puqe-result');
  if (!res) return;
  if (!n && !v && !r) { res.style.display='none'; return; }
  const total = n + v + r;
  let bg, color, label, action;
  if      (total <= 6)  { bg='#e8f5e9'; color='#2e7d32'; label='Mild NVP'; action='Dietary advice · Small frequent meals · Ginger · Outpatient management'; }
  else if (total <= 12) { bg='#fff8e1'; color='#f57f17'; label='Moderate NVP'; action='Consider antiemetics (cyclizine, prochlorperazine) · Outpatient or ambulatory care'; }
  else                  { bg='#ffebee'; color='#b71c1c'; label='Severe NVP / Hyperemesis Gravidarum'; action='Admit for IV rehydration · IV antiemetics · Thiamine supplementation · Check U&E and LFTs'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">PUQE = ${total}/15</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

window.calcBishop = function () {
  const fields = ['bishop-dilation','bishop-effacement','bishop-station','bishop-consistency','bishop-position'];
  let score = 0, allFilled = true;
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el || el.value === '') { allFilled = false; return; }
    score += parseInt(el.value);
  });
  const res = document.getElementById('bishop-result');
  if (!res) return;
  if (!allFilled) { res.style.display='none'; return; }
  let bg, color, label, action;
  if      (score >= 8) { bg='#e8f5e9'; color='#2e7d32'; label='Favourable cervix'; action='Proceed with induction using oxytocin (ARM if appropriate) · High chance of successful IOL'; }
  else if (score >= 6) { bg='#fff8e1'; color='#f57f17'; label='Intermediate'; action='Induction reasonable · Consider membrane sweep first · PGE2 or Foley if not fully favourable'; }
  else                 { bg='#ffebee'; color='#b71c1c'; label='Unfavourable cervix'; action='Cervical ripening required · PGE2 gel / pessary or mechanical balloon (Foley catheter) before oxytocin'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">Bishop = ${score}/13</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

window.calcAPGAR = function () {
  const fields = ['apgar-appearance','apgar-pulse','apgar-grimace','apgar-activity','apgar-respiration'];
  let score = 0, allFilled = true;
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el || el.value === '') { allFilled = false; return; }
    score += parseInt(el.value);
  });
  const res = document.getElementById('apgar-result');
  if (!res) return;
  if (!allFilled) { res.style.display='none'; return; }
  let bg, color, label, action;
  if      (score >= 7)  { bg='#e8f5e9'; color='#2e7d32'; label='Normal'; action='Routine newborn care'; }
  else if (score >= 4)  { bg='#fff8e1'; color='#f57f17'; label='Moderate concern'; action='Stimulate · Supplemental oxygen · Reassess at 5 minutes'; }
  else                  { bg='#ffebee'; color='#b71c1c'; label='Severely depressed'; action='Immediate neonatal resuscitation · Positive pressure ventilation · Neonatal team'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">APGAR = ${score}/10</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

window.calcEPDS = function () {
  const ids = ['epds-1','epds-2','epds-3','epds-4','epds-5','epds-6','epds-7','epds-8','epds-9','epds-10'];
  let score = 0, allFilled = true;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el || el.value === '') { allFilled = false; return; }
    score += parseInt(el.value);
  });
  const res = document.getElementById('epds-result');
  if (!res) return;
  if (!allFilled) { res.style.display='none'; return; }
  // Q10 (self-harm) — flag regardless of total
  const q10 = parseInt(document.getElementById('epds-10')?.value || 0);
  let bg, color, label, action;
  if (q10 > 0) {
    bg='#ffebee'; color='#b71c1c';
    label='⚠ Self-harm ideation flagged (Q10)';
    action='Immediate safe assessment regardless of total score · Do not leave alone · Refer to perinatal mental health urgently';
  } else if (score >= 13) {
    bg='#ffebee'; color='#b71c1c'; label='Likely depression';
    action='Refer to perinatal mental health team · Consider antidepressant therapy · Safety assessment';
  } else if (score >= 10) {
    bg='#fff8e1'; color='#f57f17'; label='Possible depression';
    action='Repeat in 2 weeks · Discuss with GP/midwife · Offer psychological support';
  } else {
    bg='#e8f5e9'; color='#2e7d32'; label='Low risk';
    action='Reassure · Routine follow-up · Repeat at next contact';
  }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">EPDS = ${score}/30</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

window.calcWells = function () {
  const ids = ['wells-dvt-sx','wells-alt-dx','wells-hr','wells-immob','wells-prev-dvt',
               'wells-haemo','wells-malig','wells-calf','wells-collat','wells-pe-sx'];
  let score = 0;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.checked) score += parseFloat(el.dataset.score || 0);
  });
  const res = document.getElementById('wells-result');
  if (!res) return;
  let bg, color, label, action;
  if      (score <= 1)  { bg='#e8f5e9'; color='#2e7d32'; label='Low probability'; action='D-dimer (ELISA) · If negative: DVT/PE excluded · If positive: proceed to imaging'; }
  else if (score <= 4)  { bg='#fff8e1'; color='#f57f17'; label='Moderate probability'; action='Compression ultrasound (DVT) / CTPA or V/Q (PE) · Consider interim LMWH whilst awaiting imaging'; }
  else                  { bg='#ffebee'; color='#b71c1c'; label='High probability'; action='Imaging immediately (USS/CTPA/V-Q) · Start therapeutic LMWH now · Senior review'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">Wells = ${score}</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

// ── Route registrations ─────────────────────────────────────────────────────

route('/calculators', () => renderCalculatorHub());
route('/calculators/shock-index',          () => renderShockIndex());
route('/calculators/modified-shock-index', () => renderMSI());
route('/calculators/vte-risk',             () => renderVTERisk());
route('/calculators/moews',                () => renderMOEWS());
route('/calculators/gcs',                  () => renderGCS());
route('/calculators/qsofa',                () => renderQSOFA());
route('/calculators/puqe',                 () => renderPUQE());
route('/calculators/bishop',               () => renderBishop());
route('/calculators/apgar',                () => renderAPGAR());
route('/calculators/epds',                 () => renderEPDS());
route('/calculators/wells',                () => renderWells());

// ── Helper: number input field ──────────────────────────────────────────────
function numInput(id, label, min, max, placeholder, onInput) {
  return `<div style="flex:1;min-width:90px;">
    <label style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:4px;">${label}</label>
    <input id="${id}" type="number" min="${min}" max="${max}" placeholder="${placeholder}"
      style="width:100%;padding:10px 12px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:16px;background:var(--parchment);color:var(--ink);box-sizing:border-box;"
      oninput="${onInput}">
  </div>`;
}

function selectInput(id, label, options, onInput) {
  return `<div style="margin-bottom:12px;">
    <label style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:4px;">${label}</label>
    <select id="${id}" onchange="${onInput}"
      style="width:100%;padding:10px 12px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:14px;background:var(--parchment);color:var(--ink);">
      <option value="">— select —</option>
      ${options.map(o => `<option value="${o.v}">${o.l}</option>`).join('')}
    </select>
  </div>`;
}

function resultBox() {
  return `<div id="{ID}-result" style="display:none;"></div>`;
}

function calcShell(title, eyebrow, body) {
  return `<div class="mono-header" style="padding-top:0;">
    <h1 style="font-size:22px;">${title}</h1>
    <p style="font-size:12.5px;color:var(--ink-40);margin-bottom:4px;">${eyebrow}</p>
  </div>${body}
  <div class="disclaimer-strip">Educational tool only — always apply clinical judgement and verify against current guidelines.</div>`;
}

// ── Hub ─────────────────────────────────────────────────────────────────────
function renderCalculatorHub() {
  const calcs = [
    { hash:'#/calculators/shock-index',          icon:'⚡', title:'Shock Index',            sub:'HR ÷ SBP · threshold ≥ 0.9',              color:'var(--brick)' },
    { hash:'#/calculators/modified-shock-index', icon:'💓', title:'Modified Shock Index',    sub:'HR ÷ MAP · threshold ≥ 1.4',              color:'var(--brick)' },
    { hash:'#/calculators/moews',                icon:'📈', title:'MOEWS',                   sub:'Modified Obstetric Early Warning Score',   color:'var(--gold)'  },
    { hash:'#/calculators/vte-risk',             icon:'🩸', title:'VTE Risk Score',          sub:'RCOG Green-top 37a · antenatal & postnatal',color:'var(--sage)' },
    { hash:'#/calculators/wells',                icon:'🫀', title:'Modified Wells Score',    sub:'DVT / PE pre-test probability',            color:'var(--sage)'  },
    { hash:'#/calculators/gcs',                  icon:'🧠', title:'Glasgow Coma Scale',      sub:'Eye + Verbal + Motor · /15',              color:'var(--brick)' },
    { hash:'#/calculators/qsofa',                icon:'🌡️', title:'qSOFA Score',             sub:'Quick Sepsis-related Organ Failure · /3', color:'var(--brick)' },
    { hash:'#/calculators/puqe',                 icon:'🤢', title:'PUQE Score',              sub:'Hyperemesis / NVP severity · /15',         color:'var(--gold)'  },
    { hash:'#/calculators/bishop',               icon:'🫄', title:'Bishop Score',            sub:'Cervical readiness for IOL · /13',         color:'var(--teal-deep, #1a6b6b)' },
    { hash:'#/calculators/apgar',                icon:'👶', title:'APGAR Score',             sub:'Neonatal status at 1 & 5 min · /10',      color:'var(--teal-deep, #1a6b6b)' },
    { hash:'#/calculators/epds',                 icon:'💙', title:'EPDS',                    sub:'Edinburgh Postnatal Depression Scale · /30',color:'var(--steel, #4a6fa5)' },
    { hash:'#/calculators/alvarado',              icon:'🔬', title:'Alvarado Score',             sub:'Appendicitis probability in pregnancy · /10',color:'var(--gold)' },
    { hash:'#/calculators/sgafgr',                icon:'📏', title:'SGA / FGR Risk',             sub:'RCOG Green-top 31 · booking risk stratification',color:'var(--sage)' },
  ];
  const html = `
    <div class="mono-header" style="padding-top:0;">
      <h1 style="font-size:22px;">Clinical Calculators</h1>
      <p style="font-size:12.5px;color:var(--ink-40);margin-bottom:4px;">11 validated obstetric scoring tools</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;padding:0 16px 32px;">
      ${calcs.map(c => `<a class="tool-card" href="${c.hash}"
        style="border-left:4px solid ${c.color};padding:14px 16px;display:block;text-decoration:none;">
        <div style="font-size:18px;margin-bottom:2px;">${c.icon}</div>
        <div style="font-weight:700;font-size:14px;color:var(--ink);">${c.title}</div>
        <div style="font-size:12px;color:var(--ink-60);margin-top:2px;">${c.sub}</div>
      </a>`).join('')}
    </div>
    <div class="disclaimer-strip">For education and clinical decision-support only. Always verify against current RCOG/NICE guidelines.</div>`;
  shell(html, { title:'Calculators', eyebrow:'Clinical Tools', activeNav:'home' });
}

// ── Shock Index ─────────────────────────────────────────────────────────────
function renderShockIndex() {
  const html = calcShell('Shock Index','HR ÷ Systolic BP — obstetric threshold ≥ 0.9', `
    <div class="mono-section">
      <div class="mono-section-title">Enter values</div>
      <div style="display:flex;gap:12px;margin-bottom:8px;">
        ${numInput('si-hr','Heart Rate (bpm)',20,250,'e.g. 110','calcSI()')}
        ${numInput('si-sbp','Systolic BP (mmHg)',40,300,'e.g. 90','calcSI()')}
      </div>
      <div id="si-result" style="display:none;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Thresholds</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px 10px;text-align:left;">SI</th><th style="padding:8px 10px;text-align:left;">Interpretation</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#2e7d32;font-weight:600;">&lt; 0.9</td><td style="padding:8px 10px;">Normal — routine monitoring</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#f57f17;font-weight:600;">0.9–1.0</td><td style="padding:8px 10px;">Mildly elevated — increase monitoring</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#e65100;font-weight:600;">1.0–1.4</td><td style="padding:8px 10px;">Moderate shock — senior review, IV access</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#b71c1c;font-weight:600;">&gt; 1.4</td><td style="padding:8px 10px;font-weight:600;">Severe shock — MHP activation</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>SI ≥ 0.9 identifies haemodynamic instability before BP drops below classically 'hypotensive' thresholds — especially important in young parturients who compensate until late.</div>
    </div>`);
  shell(html, { title:'Shock Index', eyebrow:'Calculator', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── Modified Shock Index ────────────────────────────────────────────────────
function renderMSI() {
  const html = calcShell('Modified Shock Index','HR ÷ MAP — obstetric threshold ≥ 1.4', `
    <div class="mono-section">
      <div class="mono-section-title">Enter values</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px;">
        ${numInput('msi-hr','Heart Rate (bpm)',20,250,'110','calcMSI()')}
        ${numInput('msi-sbp','Systolic BP (mmHg)',40,300,'100','calcMSI()')}
        ${numInput('msi-dbp','Diastolic BP (mmHg)',20,200,'60','calcMSI()')}
      </div>
      <div id="msi-map" style="font-size:12px;color:var(--ink-60);margin-bottom:8px;display:none;"></div>
      <div id="msi-result" style="display:none;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Thresholds</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px 10px;text-align:left;">MSI</th><th style="padding:8px 10px;text-align:left;">Interpretation</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#2e7d32;font-weight:600;">&lt; 1.4</td><td style="padding:8px 10px;">Stable</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#f57f17;font-weight:600;">1.4–1.7</td><td style="padding:8px 10px;">Moderate compromise — senior review</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px 10px;color:#b71c1c;font-weight:600;">&gt; 1.7</td><td style="padding:8px 10px;font-weight:600;">Severe — immediate escalation</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>MAP = DBP + (SBP−DBP)÷3. MSI uses MAP rather than SBP, providing superior sensitivity for early compensated shock in PPH studies.</div>
    </div>`);
  shell(html, { title:'Modified Shock Index', eyebrow:'Calculator', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── VTE Risk ────────────────────────────────────────────────────────────────
function renderVTERisk() {
  const ant = [
    {id:'vte-prev-vte',        label:'Previous VTE (not single provoked by surgery)', p:4},
    {id:'vte-prev-vte-surg',   label:'Previous VTE — single provoked by surgery', p:3},
    {id:'vte-known-thromb-hi', label:'High-risk thrombophilia (antithrombin def, compound/homozygous)', p:3},
    {id:'vte-known-thromb-lo', label:'Lower-risk thrombophilia (heterozygous FVL, PT G20210A, protein C/S def)', p:1},
    {id:'vte-fh',              label:'Family history of unprovoked/oestrogen-provoked VTE (1st-degree)', p:1},
    {id:'vte-ivf',             label:'IVF / ART pregnancy', p:1},
    {id:'vte-parity',          label:'Parity ≥ 3', p:1},
    {id:'vte-smoker',          label:'Current smoker', p:1},
    {id:'vte-veins',           label:'Gross varicose veins (symptomatic / above knee)', p:1},
    {id:'vte-immobile',        label:'Significant immobility / long-haul travel (> 4 hr)', p:1},
    {id:'vte-infection',       label:'Systemic infection requiring hospital admission', p:1},
    {id:'vte-bmi30',           label:'BMI ≥ 30 kg/m²', p:1},
    {id:'vte-bmi40',           label:'BMI ≥ 40 kg/m² (add to BMI ≥ 30 above)', p:1},
    {id:'vte-multip',          label:'Multiple pregnancy', p:1},
    {id:'vte-ivh',             label:'IVF/ART with OHSS (1st trimester only)', p:4},
    {id:'vte-pph',             label:'Antepartum haemorrhage / placenta praevia', p:1},
    {id:'vte-preeclampsia',    label:'Pre-eclampsia in current pregnancy', p:1},
    {id:'vte-dehydration',     label:'Severe dehydration / hyperemesis', p:1},
  ];
  const pn = [
    {id:'vte-pn-cs-emer',    label:'Emergency Caesarean section', p:4},
    {id:'vte-pn-cs-elect',   label:'Elective Caesarean section', p:2},
    {id:'vte-pn-midcavity',  label:'Mid-cavity or rotational instrumental delivery', p:1},
    {id:'vte-pn-prolong',    label:'Prolonged labour (> 24 hours)', p:1},
    {id:'vte-pn-pph',        label:'Postpartum haemorrhage > 1 L or blood transfusion', p:1},
    {id:'vte-pn-preterm',    label:'Preterm birth (< 37 weeks)', p:1},
    {id:'vte-pn-stillbirth', label:'Stillbirth in this pregnancy', p:1},
    {id:'vte-pn-infection',  label:'Systemic infection requiring IV antibiotics', p:1},
    {id:'vte-pn-immobile',   label:'Significant immobility (≥ 3 days bed rest / long-haul travel)', p:1},
  ];
  const row = f => `<label style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--ink-08);cursor:pointer;">
    <input type="checkbox" id="${f.id}" style="margin-top:2px;width:18px;height:18px;flex-shrink:0;" onchange="calcVTE()">
    <span style="font-size:13px;line-height:1.5;flex:1;">${f.label}</span>
    <span style="font-size:13px;font-weight:700;color:var(--brick);flex-shrink:0;min-width:24px;text-align:right;">+${f.p}</span>
  </label>`;
  const html = calcShell('VTE Risk Score','RCOG Green-top 37a', `
    <div class="mono-section">
      <div class="mono-section-title">Antenatal risk factors</div>
      <div style="padding:0 4px;">${ant.map(row).join('')}</div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Postnatal risk factors</div>
      <div style="padding:0 4px;">${pn.map(row).join('')}</div>
    </div>
    <div id="vte-result" style="display:none;"></div>
    <div class="mono-section">
      <div class="mono-section-title">Decision thresholds (RCOG 37a)</div>
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Timing</th><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Action</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;" rowspan="2"><b>Antenatal</b></td><td style="padding:8px;color:var(--brick);font-weight:600;">≥ 4</td><td style="padding:8px;">LMWH from 1st trimester</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:var(--gold);font-weight:600;">= 3</td><td style="padding:8px;">LMWH from 28 weeks</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;" rowspan="2"><b>Postnatal</b></td><td style="padding:8px;color:var(--brick);font-weight:600;">≥ 3</td><td style="padding:8px;">LMWH for 10 days</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:var(--brick);font-weight:600;">≥ 4 or CS</td><td style="padding:8px;">LMWH for 6 weeks</td></tr>
      </table>
    </div>`);
  shell(html, { title:'VTE Risk', eyebrow:'RCOG Green-top 37a', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── MOEWS ───────────────────────────────────────────────────────────────────
function renderMOEWS() {
  const params = [
    { id:'moews-rr',   label:'Respiratory Rate (breaths/min)',
      cols:[{r:'≤9',s:3,c:'#b71c1c'},{r:'10–11',s:2,c:'#e65100'},{r:'12–14',s:1,c:'#f57f17'},{r:'15–20',s:0,c:'#2e7d32'},{r:'21–25',s:1,c:'#f57f17'},{r:'26–29',s:2,c:'#e65100'},{r:'≥30',s:3,c:'#b71c1c'}]},
    { id:'moews-spo2', label:'SpO₂ (%)',
      cols:[{r:'≤85',s:3,c:'#b71c1c'},{r:'86–90',s:2,c:'#e65100'},{r:'91–93',s:1,c:'#f57f17'},{r:'≥94',s:0,c:'#2e7d32'}]},
    { id:'moews-sbp',  label:'Systolic BP (mmHg)',
      cols:[{r:'≤70',s:3,c:'#b71c1c'},{r:'71–80',s:2,c:'#e65100'},{r:'81–89',s:1,c:'#f57f17'},{r:'90–139',s:0,c:'#2e7d32'},{r:'140–149',s:1,c:'#f57f17'},{r:'150–159',s:2,c:'#e65100'},{r:'≥160',s:3,c:'#b71c1c'}]},
    { id:'moews-hr',   label:'Heart Rate (bpm)',
      cols:[{r:'≤39',s:3,c:'#b71c1c'},{r:'40–50',s:2,c:'#e65100'},{r:'51–60',s:1,c:'#f57f17'},{r:'61–100',s:0,c:'#2e7d32'},{r:'101–110',s:1,c:'#f57f17'},{r:'111–129',s:2,c:'#e65100'},{r:'≥130',s:3,c:'#b71c1c'}]},
    { id:'moews-temp', label:'Temperature (°C)',
      cols:[{r:'≤35.0',s:3,c:'#b71c1c'},{r:'35.1–36.0',s:2,c:'#e65100'},{r:'36.1–37.9',s:0,c:'#2e7d32'},{r:'38.0–38.9',s:2,c:'#e65100'},{r:'≥39.0',s:3,c:'#b71c1c'}]},
    { id:'moews-avpu', label:'Neurological (AVPU)',
      cols:[{r:'U',s:3,c:'#b71c1c'},{r:'P',s:2,c:'#e65100'},{r:'V',s:1,c:'#f57f17'},{r:'A',s:0,c:'#2e7d32'}]},
    { id:'moews-urine',label:'Urine output (mL/hr)',
      cols:[{r:'<10',s:3,c:'#b71c1c'},{r:'10–19',s:2,c:'#e65100'},{r:'20–29',s:1,c:'#f57f17'},{r:'≥30',s:0,c:'#2e7d32'}]},
  ];
  const rows = params.map(p => `
    <div style="padding:12px 0;border-bottom:1px solid var(--ink-08);">
      <div style="font-size:13px;font-weight:600;margin-bottom:8px;">${p.label}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${p.cols.map(c => `<button onclick="setMOEWS('${p.id}',${c.s})"
          data-pid="${p.id}" data-score="${c.s}" data-color="${c.c}"
          style="padding:6px 10px;border:2px solid ${c.c};border-radius:8px;background:white;cursor:pointer;font-size:12px;color:${c.c};font-weight:600;transition:all 0.15s;">
          ${c.r}<br><span style="font-size:10px;opacity:0.8;">${c.s>0?'+':''}${c.s}</span>
        </button>`).join('')}
      </div>
    </div>`).join('');
  const html = calcShell('MOEWS Score','Modified Obstetric Early Warning System', `
    <div class="mono-section">
      <div class="mono-section-title">Select each parameter</div>
      <div style="padding:0 4px;">${rows}</div>
    </div>
    <div id="moews-result" style="display:none;"></div>
    <div class="mono-section">
      <div class="mono-section-title">Trigger thresholds</div>
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Action</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">0–1</td><td style="padding:8px;">Routine obs</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">2</td><td style="padding:8px;">Increase frequency · inform midwife in charge</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#e65100;font-weight:600;">3–4</td><td style="padding:8px;">Senior midwife + junior doctor within 30 min</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">≥5 or any = 3</td><td style="padding:8px;font-weight:600;">Immediate senior obstetrician + anaesthetist</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>Any single red parameter (score = 3) triggers the same response as total ≥ 5. MOEWS augments — but never replaces — clinical judgement.</div>
    </div>`);
  shell(html, { title:'MOEWS', eyebrow:'Obstetric Early Warning', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── GCS ─────────────────────────────────────────────────────────────────────
function renderGCS() {
  const html = calcShell('Glasgow Coma Scale','Eye + Verbal + Motor responses · /15', `
    <div class="mono-section">
      <div class="mono-section-title">Select responses</div>
      ${selectInput('gcs-eye','Eye Opening (E)',
        [{v:4,l:'4 — Spontaneous'},{v:3,l:'3 — To speech'},{v:2,l:'2 — To pain'},{v:1,l:'1 — None'}], 'calcGCS()')}
      ${selectInput('gcs-verbal','Verbal Response (V)',
        [{v:5,l:'5 — Orientated'},{v:4,l:'4 — Confused'},{v:3,l:'3 — Words only'},{v:2,l:'2 — Sounds only'},{v:1,l:'1 — None'}], 'calcGCS()')}
      ${selectInput('gcs-motor','Motor Response (M)',
        [{v:6,l:'6 — Obeys commands'},{v:5,l:'5 — Localises pain'},{v:4,l:'4 — Withdraws'},{v:3,l:'3 — Abnormal flexion'},{v:2,l:'2 — Extension'},{v:1,l:'1 — None'}], 'calcGCS()')}
      <div id="gcs-result" style="display:none;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Interpretation</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">GCS</th><th style="padding:8px;text-align:left;">Severity</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">13–15</td><td style="padding:8px;">Mild / minimal</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">9–12</td><td style="padding:8px;">Moderate</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">≤ 8</td><td style="padding:8px;font-weight:600;">Severe — airway at risk · intubate if GCS ≤ 8</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>In obstetrics, GCS ≤ 8 triggers immediate senior + anaesthetic involvement. A falling GCS in a pre-eclamptic patient warrants urgent CT head and anaesthetic review.</div>
    </div>`);
  shell(html, { title:'GCS', eyebrow:'Glasgow Coma Scale', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── qSOFA ───────────────────────────────────────────────────────────────────
function renderQSOFA() {
  const criteria = [
    {id:'qsofa-rr',     label:'Respiratory rate ≥ 22 breaths/min'},
    {id:'qsofa-mental', label:'Altered mental status (new confusion / GCS < 15)'},
    {id:'qsofa-sbp',    label:'Systolic BP ≤ 100 mmHg'},
  ];
  const checks = criteria.map(c => `
    <label style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--ink-08);cursor:pointer;">
      <input type="checkbox" id="${c.id}" style="width:20px;height:20px;flex-shrink:0;" onchange="calcQSOFA()">
      <span style="font-size:14px;line-height:1.5;">${c.label}</span>
      <span style="margin-left:auto;font-weight:700;color:var(--brick);">+1</span>
    </label>`).join('');
  const html = calcShell('qSOFA Score','Quick Sepsis-related Organ Failure Assessment · /3', `
    <div class="mono-section">
      <div class="mono-section-title">Criteria (tick all that apply)</div>
      <div style="padding:0 4px;">${checks}</div>
      <div id="qsofa-result" style="display:none;margin-top:12px;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Interpretation</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Action</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">0</td><td style="padding:8px;">Routine care</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">1</td><td style="padding:8px;">Escalate monitoring · seek infection source</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">≥ 2</td><td style="padding:8px;font-weight:600;">Sepsis likely — Sepsis Six · IV antibiotics within 1 hour</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>qSOFA ≥ 2 in a pregnant/postpartum woman mandates the Sepsis Six bundle: high-flow O₂, blood cultures, IV antibiotics, IV fluids, lactate, strict fluid balance. Obstetric sepsis carries disproportionate mortality — err on the side of early escalation.</div>
    </div>`);
  shell(html, { title:'qSOFA', eyebrow:'Sepsis Screening', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── PUQE ────────────────────────────────────────────────────────────────────
function renderPUQE() {
  const html = calcShell('PUQE Score','Pregnancy-Unique Quantification of Emesis · /15', `
    <div class="mono-section">
      <div class="mono-section-title">In the last 24 hours…</div>
      ${selectInput('puqe-nausea','How long have you felt nauseated or sick to your stomach?',
        [{v:1,l:'1 — Not at all'},{v:2,l:'2 — 1 hour or less'},{v:3,l:'3 — 2–3 hours'},{v:4,l:'4 — 4–6 hours'},{v:5,l:'5 — More than 6 hours'}], 'calcPUQE()')}
      ${selectInput('puqe-vomit','How many times have you vomited or thrown up?',
        [{v:1,l:'1 — 0 times'},{v:2,l:'2 — 1–2 times'},{v:3,l:'3 — 3–4 times'},{v:4,l:'4 — 5–6 times'},{v:5,l:'5 — 7+ times'}], 'calcPUQE()')}
      ${selectInput('puqe-retching','How many times have you had retching or dry heaves without bringing anything up?',
        [{v:1,l:'1 — 0 times'},{v:2,l:'2 — 1–2 times'},{v:3,l:'3 — 3–4 times'},{v:4,l:'4 — 5–6 times'},{v:5,l:'5 — 7+ times'}], 'calcPUQE()')}
      <div id="puqe-result" style="display:none;margin-top:12px;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Severity classification</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Severity</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">≤ 6</td><td style="padding:8px;">Mild NVP — dietary measures</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">7–12</td><td style="padding:8px;">Moderate — antiemetics; consider ambulatory care</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">≥ 13</td><td style="padding:8px;font-weight:600;">Severe HG — admit · IV rehydration · thiamine</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>PUQE ≥ 13 meets the threshold for hyperemesis gravidarum requiring inpatient care. Always check U&E, LFTs, and urinary ketones. Thiamine 100 mg IV TDS before any glucose-containing fluids to prevent Wernicke's encephalopathy.</div>
    </div>`);
  shell(html, { title:'PUQE', eyebrow:'Hyperemesis Severity', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── Bishop Score ────────────────────────────────────────────────────────────
function renderBishop() {
  const html = calcShell('Bishop Score','Cervical readiness for induction of labour · /13', `
    <div class="mono-section">
      <div class="mono-section-title">Cervical assessment</div>
      ${selectInput('bishop-dilation','Dilation (cm)',
        [{v:0,l:'0 — Closed'},{v:1,l:'1 — 1–2 cm'},{v:2,l:'2 — 3–4 cm'},{v:3,l:'3 — ≥ 5 cm'}], 'calcBishop()')}
      ${selectInput('bishop-effacement','Effacement (%)',
        [{v:0,l:'0 — 0–30%'},{v:1,l:'1 — 40–50%'},{v:2,l:'2 — 60–70%'},{v:3,l:'3 — ≥ 80%'}], 'calcBishop()')}
      ${selectInput('bishop-station','Fetal Station',
        [{v:0,l:'0 — −3'},{v:1,l:'1 — −2'},{v:2,l:'2 — −1 / 0'},{v:3,l:'3 — +1 / +2'}], 'calcBishop()')}
      ${selectInput('bishop-consistency','Cervical Consistency',
        [{v:0,l:'0 — Firm'},{v:1,l:'1 — Medium'},{v:2,l:'2 — Soft'}], 'calcBishop()')}
      ${selectInput('bishop-position','Cervical Position',
        [{v:0,l:'0 — Posterior'},{v:1,l:'1 — Mid'},{v:2,l:'2 — Anterior'}], 'calcBishop()')}
      <div id="bishop-result" style="display:none;margin-top:12px;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Interpretation</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Interpretation</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">&lt; 6</td><td style="padding:8px;">Unfavourable — cervical ripening first (PGE2 / balloon)</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">6–7</td><td style="padding:8px;">Intermediate — consider membrane sweep or PGE2</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">≥ 8</td><td style="padding:8px;">Favourable — proceed with ARM ± oxytocin</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>Bishop score ≥ 8 predicts successful IOL comparable to spontaneous labour onset. A score < 6 indicates need for cervical priming before oxytocin — using PGE2 (Propess/Prostin) or mechanical balloon catheter (Foley).</div>
    </div>`);
  shell(html, { title:'Bishop Score', eyebrow:'Induction of Labour', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── APGAR ───────────────────────────────────────────────────────────────────
function renderAPGAR() {
  const html = calcShell('APGAR Score','Neonatal assessment at 1 and 5 minutes · /10', `
    <div class="mono-section">
      <div class="mono-section-title">Score each component (0–2)</div>
      ${selectInput('apgar-appearance','Appearance (skin colour)',
        [{v:0,l:'0 — Blue/pale all over'},{v:1,l:'1 — Body pink, extremities blue'},{v:2,l:'2 — Completely pink'}], 'calcAPGAR()')}
      ${selectInput('apgar-pulse','Pulse (heart rate)',
        [{v:0,l:'0 — Absent'},{v:1,l:'1 — < 100 bpm'},{v:2,l:'2 — ≥ 100 bpm'}], 'calcAPGAR()')}
      ${selectInput('apgar-grimace','Grimace (reflex irritability)',
        [{v:0,l:'0 — No response'},{v:1,l:'1 — Grimace / weak cry'},{v:2,l:'2 — Cry / cough / sneeze'}], 'calcAPGAR()')}
      ${selectInput('apgar-activity','Activity (muscle tone)',
        [{v:0,l:'0 — Limp'},{v:1,l:'1 — Some flexion'},{v:2,l:'2 — Active flexion'}], 'calcAPGAR()')}
      ${selectInput('apgar-respiration','Respiration',
        [{v:0,l:'0 — Absent'},{v:1,l:'1 — Slow / irregular'},{v:2,l:'2 — Good cry'}], 'calcAPGAR()')}
      <div id="apgar-result" style="display:none;margin-top:12px;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Interpretation</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Action</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">7–10</td><td style="padding:8px;">Normal — routine newborn care</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">4–6</td><td style="padding:8px;">Moderate — stimulate · O₂ · reassess at 5 min</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">0–3</td><td style="padding:8px;font-weight:600;">Severely depressed — immediate resuscitation · PPV · neonatal team</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>Record at 1 minute AND 5 minutes (and 10 minutes if still < 7). Failure to improve by 5 minutes warrants cord blood gas, paediatric review, and consideration of therapeutic hypothermia eligibility (if ≥ 36 weeks).</div>
    </div>`);
  shell(html, { title:'APGAR Score', eyebrow:'Neonatal Assessment', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── EPDS ────────────────────────────────────────────────────────────────────
function renderEPDS() {
  const questions = [
    { id:'epds-1',  q:'I have been able to laugh and see the funny side of things',
      opts:[{v:0,l:'As much as I always could'},{v:1,l:'Not quite so much now'},{v:2,l:'Definitely not so much now'},{v:3,l:'Not at all'}]},
    { id:'epds-2',  q:'I have looked forward with enjoyment to things',
      opts:[{v:0,l:'As much as ever'},{v:1,l:'Rather less than I used to'},{v:2,l:'Definitely less than I used to'},{v:3,l:'Hardly at all'}]},
    { id:'epds-3',  q:'I have blamed myself unnecessarily when things went wrong', reversed:true,
      opts:[{v:3,l:'Yes, most of the time'},{v:2,l:'Yes, some of the time'},{v:1,l:'Not very often'},{v:0,l:'No, never'}]},
    { id:'epds-4',  q:'I have been anxious or worried for no good reason',
      opts:[{v:0,l:'No, not at all'},{v:1,l:'Hardly ever'},{v:2,l:'Yes, sometimes'},{v:3,l:'Yes, very often'}]},
    { id:'epds-5',  q:'I have felt scared or panicky for no very good reason', reversed:true,
      opts:[{v:3,l:'Yes, quite a lot'},{v:2,l:'Yes, sometimes'},{v:1,l:'No, not much'},{v:0,l:'No, not at all'}]},
    { id:'epds-6',  q:'Things have been getting on top of me', reversed:true,
      opts:[{v:3,l:'Yes, most of the time I haven\'t been coping'},{v:2,l:'Yes, sometimes'},{v:1,l:'No, most of the time I have coped'},{v:0,l:'No, I have been coping as well as ever'}]},
    { id:'epds-7',  q:'I have been so unhappy that I have had difficulty sleeping', reversed:true,
      opts:[{v:3,l:'Yes, most of the time'},{v:2,l:'Yes, sometimes'},{v:1,l:'Not very often'},{v:0,l:'No, not at all'}]},
    { id:'epds-8',  q:'I have felt sad or miserable', reversed:true,
      opts:[{v:3,l:'Yes, most of the time'},{v:2,l:'Yes, quite often'},{v:1,l:'Not very often'},{v:0,l:'No, not at all'}]},
    { id:'epds-9',  q:'I have been so unhappy that I have been crying', reversed:true,
      opts:[{v:3,l:'Yes, most of the time'},{v:2,l:'Yes, quite often'},{v:1,l:'Only occasionally'},{v:0,l:'No, never'}]},
    { id:'epds-10', q:'The thought of harming myself has occurred to me ⚠', reversed:true,
      opts:[{v:3,l:'Yes, quite often'},{v:2,l:'Sometimes'},{v:1,l:'Hardly ever'},{v:0,l:'Never'}]},
  ];
  const qRows = questions.map((q, i) => `
    <div style="padding:10px 0;border-bottom:1px solid var(--ink-08);">
      <div style="font-size:13px;font-weight:600;margin-bottom:6px;">${i+1}. ${q.q}</div>
      <select id="${q.id}" onchange="calcEPDS()"
        style="width:100%;padding:8px 10px;border:1.5px solid var(--ink-20);border-radius:8px;font-size:13px;background:var(--parchment);color:var(--ink);">
        <option value="">— select —</option>
        ${q.opts.map(o => `<option value="${o.v}">${o.l}</option>`).join('')}
      </select>
    </div>`).join('');
  const html = calcShell('Edinburgh Postnatal Depression Scale','Self-report · /30 · Administer antenatally and at 6-week postnatal check', `
    <div class="mono-section">
      <div style="background:#fff8e1;padding:10px 12px;border-radius:8px;font-size:12.5px;margin-bottom:12px;">
        ⚠ Q10 asks about self-harm. Any positive response to Q10 requires immediate safeguarding assessment, regardless of total score.
      </div>
      ${qRows}
      <div id="epds-result" style="display:none;margin-top:12px;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Cut-off scores</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Interpretation</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">&lt; 10</td><td style="padding:8px;">Low risk — routine follow-up</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">10–12</td><td style="padding:8px;">Possible depression — repeat in 2 weeks</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">≥ 13</td><td style="padding:8px;font-weight:600;">Likely depression — refer to perinatal mental health</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">Q10 &gt; 0</td><td style="padding:8px;font-weight:600;">Immediate safe assessment regardless of total</td></tr>
      </table>
    </div>`);
  shell(html, { title:'EPDS', eyebrow:'Postnatal Depression Screening', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── Modified Wells (DVT/PE) ──────────────────────────────────────────────────
function renderWells() {
  const criteria = [
    {id:'wells-dvt-sx',   label:'Active cancer (treatment within 6 months, or palliative)',   score:1},
    {id:'wells-alt-dx',   label:'Paralysis, paresis, or recent plaster immobilisation of leg', score:1},
    {id:'wells-hr',       label:'Recently bedridden > 3 days or major surgery within 12 weeks', score:1},
    {id:'wells-immob',    label:'Localised tenderness along deep vein system',                  score:1},
    {id:'wells-prev-dvt', label:'Entire leg swollen',                                           score:1},
    {id:'wells-haemo',    label:'Calf swelling > 3 cm compared to asymptomatic leg',           score:1},
    {id:'wells-malig',    label:'Pitting oedema confined to symptomatic leg',                   score:1},
    {id:'wells-calf',     label:'Collateral superficial veins (non-varicose)',                  score:1},
    {id:'wells-collat',   label:'Previously documented DVT',                                    score:1},
    {id:'wells-pe-sx',    label:'Alternative diagnosis at least as likely as DVT',              score:-2},
  ];
  const checks = criteria.map(c => `
    <label style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--ink-08);cursor:pointer;">
      <input type="checkbox" id="${c.id}" data-score="${c.score}"
        style="margin-top:2px;width:18px;height:18px;flex-shrink:0;" onchange="calcWells()">
      <span style="font-size:13px;line-height:1.5;flex:1;">${c.label}</span>
      <span style="font-size:13px;font-weight:700;color:${c.score < 0 ? 'var(--sage)' : 'var(--brick)'};flex-shrink:0;min-width:32px;text-align:right;">${c.score > 0 ? '+' : ''}${c.score}</span>
    </label>`).join('');
  const html = calcShell('Modified Wells Score','DVT pre-test probability — also applicable to PE assessment', `
    <div class="mono-section">
      <div class="mono-section-title">Clinical features (tick all present)</div>
      <div style="padding:0 4px;">${checks}</div>
      <div id="wells-result" style="display:none;margin-top:12px;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Interpretation (DVT)</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);"><th style="padding:8px;text-align:left;">Score</th><th style="padding:8px;text-align:left;">Probability</th><th style="padding:8px;text-align:left;">Next step</th></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#2e7d32;font-weight:600;">≤ 1</td><td style="padding:8px;">Low</td><td style="padding:8px;">D-dimer · USS only if positive</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#f57f17;font-weight:600;">2–4</td><td style="padding:8px;">Moderate</td><td style="padding:8px;">Compression USS · interim LMWH</td></tr>
        <tr style="border-top:1px solid var(--ink-10);"><td style="padding:8px;color:#b71c1c;font-weight:600;">&gt; 4</td><td style="padding:8px;font-weight:600;">High</td><td style="padding:8px;font-weight:600;">Imaging + therapeutic LMWH now</td></tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>In pregnancy, D-dimer is physiologically elevated and unreliable as a rule-out — imaging is preferred over D-dimer-based pathways. Use compression USS for suspected DVT; V/Q scan preferred over CTPA for suspected PE to minimise fetal radiation and maternal breast dose.</div>
    </div>`);
  shell(html, { title:'Wells Score', eyebrow:'DVT / PE Pre-test Probability', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── Alvarado Score (Modified for Pregnancy) ─────────────────────────────────
route('/calculators/alvarado', () => renderAlvarado());

window.calcAlvarado = function () {
  const fields = [
    {id:'alv-migration',   score:1},
    {id:'alv-anorexia',    score:1},
    {id:'alv-nausea',      score:1},
    {id:'alv-rif-tender',  score:2},
    {id:'alv-rebound',     score:1},
    {id:'alv-temp',        score:1},
    {id:'alv-leuko',       score:2},
    {id:'alv-shift',       score:1},
  ];
  let score = 0;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (el && el.checked) score += f.score;
  });
  const res = document.getElementById('alv-result');
  if (!res) return;
  if (score === 0) { res.style.display = 'none'; return; }
  let bg, color, label, action;
  if      (score <= 4) { bg='#e8f5e9'; color='#2e7d32'; label='Low probability'; action='Discharge with safety-netting · Return if symptoms worsen · Serial bloods if any doubt'; }
  else if (score <= 6) { bg='#fff8e1'; color='#f57f17'; label='Moderate probability'; action='Observe · Repeat examination and bloods · Surgical and obstetric review · USS abdomen/pelvis'; }
  else if (score <= 8) { bg='#fff3e0'; color='#e65100'; label='High probability'; action='Surgical review urgently · MRI preferred over CT in pregnancy · Consider diagnostic laparoscopy'; }
  else                 { bg='#ffebee'; color='#b71c1c'; label='Very high probability'; action='Immediate surgical consultation · Theatre preparation · MRI if feasible but do not delay surgery'; }
  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `<div style="font-size:28px;font-weight:800;color:${color};margin-bottom:4px;">Alvarado = ${score}/10</div>
    <div style="font-weight:700;color:${color};font-size:14px;margin-bottom:4px;">${label}</div>
    <div style="font-size:12.5px;color:var(--ink-60);">${action}</div>`;
};

function renderAlvarado() {
  const criteria = [
    {id:'alv-migration',  label:'Migration of pain to RIF (started periumbilical, moved to right iliac fossa)', score:1},
    {id:'alv-anorexia',   label:'Anorexia or loss of appetite', score:1},
    {id:'alv-nausea',     label:'Nausea or vomiting', score:1},
    {id:'alv-rif-tender', label:'Tenderness in right iliac fossa', score:2},
    {id:'alv-rebound',    label:'Rebound tenderness in RIF', score:1},
    {id:'alv-temp',       label:'Elevated temperature (> 37.3°C)', score:1},
    {id:'alv-leuko',      label:'Leukocytosis (WBC > 10 × 10⁹/L)', score:2},
    {id:'alv-shift',      label:'Left shift (neutrophilia > 75%)', score:1},
  ];
  const checks = criteria.map(c => `
    <label style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--ink-08);cursor:pointer;">
      <input type="checkbox" id="${c.id}" style="margin-top:2px;width:18px;height:18px;flex-shrink:0;" onchange="calcAlvarado()">
      <span style="font-size:13px;line-height:1.5;flex:1;">${c.label}</span>
      <span style="font-size:13px;font-weight:700;color:var(--brick);flex-shrink:0;min-width:28px;text-align:right;">+${c.score}</span>
    </label>`).join('');
  const html = calcShell('Alvarado Score','Acute appendicitis probability in pregnancy · /10', `
    <div class="mono-section">
      <div style="background:#fff8e1;padding:10px 12px;border-radius:8px;font-size:12.5px;margin-bottom:12px;line-height:1.6;">
        ⚠ Appendicitis is the most common non-obstetric surgical emergency in pregnancy. The appendix migrates superiorly and laterally as the uterus grows — RIF tenderness may be atypical, especially after 20 weeks. A high index of suspicion is essential; MRI is the preferred imaging modality.
      </div>
      <div class="mono-section-title">Clinical features (tick all present)</div>
      <div style="padding:0 4px;">${checks}</div>
      <div id="alv-result" style="display:none;margin-top:12px;"></div>
    </div>
    <div class="mono-section">
      <div class="mono-section-title">Score interpretation</div>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr style="background:var(--ink-05);">
          <th style="padding:8px 10px;text-align:left;">Score</th>
          <th style="padding:8px 10px;text-align:left;">Probability</th>
          <th style="padding:8px 10px;text-align:left;">Action</th>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;color:#2e7d32;font-weight:600;">1–4</td>
          <td style="padding:8px 10px;">Low</td>
          <td style="padding:8px 10px;">Discharge with safety-netting</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;color:#f57f17;font-weight:600;">5–6</td>
          <td style="padding:8px 10px;">Moderate</td>
          <td style="padding:8px 10px;">Observe · surgical + obstetric review · USS/MRI</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;color:#e65100;font-weight:600;">7–8</td>
          <td style="padding:8px 10px;">High</td>
          <td style="padding:8px 10px;">Urgent surgical review · MRI · consider laparoscopy</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px 10px;color:#b71c1c;font-weight:600;">9–10</td>
          <td style="padding:8px 10px;font-weight:600;">Very high</td>
          <td style="padding:8px 10px;font-weight:600;">Immediate surgical consultation · theatre preparation</td>
        </tr>
      </table>
    </div>
    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>In pregnancy, CT is avoided where possible given fetal radiation exposure — MRI is first-line imaging if USS is inconclusive. After 20 weeks, the appendix lies above McBurney's point: tenderness may be in the right flank rather than classic RIF. Never delay surgery for imaging if clinical suspicion is high, as perforation risk and maternal-fetal morbidity rise sharply.</div>
    </div>`);
  shell(html, { title:'Alvarado Score', eyebrow:'Appendicitis in Pregnancy', showBack:true, backHash:'#/calculators', activeNav:'home' });
}

// ── SGA / FGR Risk Calculator (RCOG Green-top 31 / SGA Guideline) ──────────
route('/calculators/sgafgr', () => renderSGAFGR());

window.calcSGAFGR = function () {
  const majorFactors = [
    'sgafgr-prev-sga','sgafgr-prev-stillbirth','sgafgr-placenta-prev',
    'sgafgr-cocaine','sgafgr-daily-smoker','sgafgr-chronic-htn',
    'sgafgr-diabetes','sgafgr-renal','sgafgr-antiphospholipid','sgafgr-ivf-donor',
  ];
  const minorFactors = [
    'sgafgr-age','sgafgr-nullip','sgafgr-bmi-low','sgafgr-bmi-high',
    'sgafgr-prev-preeclampsia','sgafgr-interpreg','sgafgr-smoker-light',
    'sgafgr-low-papp','sgafgr-uterine-artery',
  ];
  let major = 0, minor = 0;
  majorFactors.forEach(id => { const el = document.getElementById(id); if (el && el.checked) major++; });
  minorFactors.forEach(id => { const el = document.getElementById(id); if (el && el.checked) minor++; });
  const res = document.getElementById('sgafgr-result');
  if (!res) return;
  if (major === 0 && minor === 0) { res.style.display = 'none'; return; }

  let bg, color, label, surveillance, aspirin;
  if (major >= 1) {
    bg='#ffebee'; color='#b71c1c';
    label='HIGH RISK — serial growth scans + uterine artery Dopplers';
    surveillance='Serial USS growth + umbilical artery Dopplers from 26–28 weeks · 3–4 weekly intervals · Referral to fetal medicine if concern';
    aspirin='Aspirin 75–150 mg from ≤ 16 weeks if ≥ 1 major OR ≥ 3 minor risk factors';
  } else if (minor >= 3) {
    bg='#fff3e0'; color='#e65100';
    label='HIGH RISK (≥ 3 minor factors) — serial growth scans';
    surveillance='Serial USS growth scans from 26–28 weeks · 3–4 weekly · Uterine artery Dopplers at 20–24 weeks';
    aspirin='Aspirin 75–150 mg from ≤ 16 weeks recommended';
  } else if (minor >= 1) {
    bg='#fff8e1'; color='#f57f17';
    label='MODERATE RISK — at least one scan at 36 weeks';
    surveillance='Single growth scan at 36 weeks recommended as minimum · Consider additional scans if new concerns arise';
    aspirin='Aspirin not routinely recommended for minor risk factors alone unless pre-eclampsia risk also high';
  } else {
    bg='#e8f5e9'; color='#2e7d32';
    label='Low risk — routine care';
    surveillance='Standard SFH measurement at each antenatal contact · Refer if SFH plots below 10th centile on customised chart';
    aspirin='Aspirin not indicated';
  }

  res.style.cssText = `display:block;padding:16px;border-radius:10px;background:${bg};margin-top:12px;`;
  res.innerHTML = `
    <div style="font-size:15px;font-weight:800;color:${color};margin-bottom:8px;">${label}</div>
    <div style="margin-bottom:8px;">
      <span style="font-size:12px;color:var(--ink-60);display:block;margin-bottom:2px;">MAJOR risk factors present: <b>${major}</b> · MINOR: <b>${minor}</b></span>
    </div>
    <div style="font-size:12.5px;color:var(--ink-70);margin-bottom:6px;line-height:1.6;"><b>Surveillance:</b> ${surveillance}</div>
    <div style="font-size:12.5px;color:var(--ink-70);line-height:1.6;"><b>Aspirin:</b> ${aspirin}</div>`;
};

function renderSGAFGR() {
  const major = [
    {id:'sgafgr-prev-sga',         label:'Previous baby with SGA (birthweight < 10th centile on customised chart)'},
    {id:'sgafgr-prev-stillbirth',   label:'Previous unexplained stillbirth or placental abruption'},
    {id:'sgafgr-placenta-prev',     label:'Placenta praevia in current pregnancy'},
    {id:'sgafgr-cocaine',           label:'Cocaine or other illicit drug use in this pregnancy'},
    {id:'sgafgr-daily-smoker',      label:'Heavy smoker (≥ 11 cigarettes per day)'},
    {id:'sgafgr-chronic-htn',       label:'Chronic hypertension on antihypertensive medication'},
    {id:'sgafgr-diabetes',          label:'Diabetes mellitus (Type 1 or 2) with vascular disease'},
    {id:'sgafgr-renal',             label:'Renal impairment (eGFR < 60 mL/min or proteinuria)'},
    {id:'sgafgr-antiphospholipid',  label:'Antiphospholipid syndrome'},
    {id:'sgafgr-ivf-donor',         label:'IVF with donor egg'},
  ];
  const minor = [
    {id:'sgafgr-age',               label:'Age ≥ 35 years'},
    {id:'sgafgr-nullip',            label:'Nulliparity'},
    {id:'sgafgr-bmi-low',           label:'BMI < 20 kg/m² at booking'},
    {id:'sgafgr-bmi-high',          label:'BMI ≥ 35 kg/m² at booking'},
    {id:'sgafgr-prev-preeclampsia', label:'Previous pre-eclampsia'},
    {id:'sgafgr-interpreg',         label:'Inter-pregnancy interval > 10 years'},
    {id:'sgafgr-smoker-light',      label:'Light smoker (1–10 cigarettes per day)'},
    {id:'sgafgr-low-papp',          label:'Low PAPP-A on first trimester screen (< 0.4 MoM)'},
    {id:'sgafgr-uterine-artery',    label:'Raised uterine artery Dopplers at 20–24 weeks (bilateral notching or mean PI > 95th centile)'},
  ];
  const mkRow = (f, type) => `
    <label style="display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid var(--ink-08);cursor:pointer;">
      <input type="checkbox" id="${f.id}" style="margin-top:2px;width:18px;height:18px;flex-shrink:0;" onchange="calcSGAFGR()">
      <span style="font-size:13px;line-height:1.5;flex:1;">${f.label}</span>
      <span style="font-size:11px;font-weight:700;padding:2px 6px;border-radius:4px;background:${type==='major'?'#ffebee':'#fff8e1'};color:${type==='major'?'#b71c1c':'#f57f17'};flex-shrink:0;">${type.toUpperCase()}</span>
    </label>`;
  const html = calcShell('SGA / FGR Risk Calculator','RCOG Green-top Guideline 31 · Small-for-Gestational-Age Fetus', `
    <div class="mono-section">
      <div style="background:#e8f5e9;padding:10px 12px;border-radius:8px;font-size:12.5px;margin-bottom:12px;line-height:1.6;">
        <b>How to use:</b> Tick all risk factors present at booking. One major factor OR three or more minor factors = HIGH RISK, requiring serial growth scans and consideration of aspirin from ≤ 16 weeks.
      </div>

      <div class="mono-section-title">Major risk factors</div>
      <div style="padding:0 4px;margin-bottom:16px;">${major.map(f => mkRow(f,'major')).join('')}</div>

      <div class="mono-section-title">Minor risk factors</div>
      <div style="padding:0 4px;">${minor.map(f => mkRow(f,'minor')).join('')}</div>

      <div id="sgafgr-result" style="display:none;margin-top:12px;"></div>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Surveillance protocol (RCOG)</div>
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
        <tr style="background:var(--ink-05);">
          <th style="padding:8px;text-align:left;">Risk level</th>
          <th style="padding:8px;text-align:left;">Trigger</th>
          <th style="padding:8px;text-align:left;">Action</th>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px;color:#2e7d32;font-weight:600;">Low</td>
          <td style="padding:8px;">No risk factors</td>
          <td style="padding:8px;">SFH at every contact · refer if &lt; 10th centile</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px;color:#f57f17;font-weight:600;">Moderate</td>
          <td style="padding:8px;">1–2 minor factors</td>
          <td style="padding:8px;">Growth scan at 36 weeks minimum</td>
        </tr>
        <tr style="border-top:1px solid var(--ink-10);">
          <td style="padding:8px;color:#b71c1c;font-weight:600;">High</td>
          <td style="padding:8px;">≥ 1 major OR ≥ 3 minor</td>
          <td style="padding:8px;">Serial scans from 26–28 wks · Dopplers · Fetal medicine</td>
        </tr>
      </table>
    </div>

    <div class="mono-section">
      <div class="mono-section-title">Aspirin prophylaxis</div>
      <div class="pearl-note"><span class="pin"></span>Aspirin 75–150 mg daily from ≤ 16 weeks is recommended when pre-eclampsia risk is high (which frequently overlaps with SGA risk). The Fetal Medicine Foundation combined first-trimester screen (PAPP-A, uterine artery Dopplers, MAP, PIGF) now provides individualised pre-eclampsia risk — if risk > 1:100, aspirin is indicated per NICE NG25 and FIGO guidelines regardless of this SGA checklist result.</div>
    </div>

    <div class="mono-section">
      <div class="pearl-note"><span class="pin"></span>FGR is defined as EFW or AC below the 3rd centile (severe FGR), or below the 10th centile with abnormal Dopplers or plateauing growth velocity (mild-moderate FGR). Diagnosis requires serial measurements — a single measurement below the 10th centile constitutes SGA, not necessarily FGR. Umbilical artery Dopplers are the primary surveillance tool once SGA is identified.</div>
    </div>`);
  shell(html, { title:'SGA / FGR Risk', eyebrow:'RCOG Green-top 31', showBack:true, backHash:'#/calculators', activeNav:'home' });
}
