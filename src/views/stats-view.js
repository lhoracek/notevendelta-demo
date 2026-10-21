export function renderStats() {
  return `
    <section class="view">
      <div class="page-heading"><div><p class="eyebrow">Přehled výkonu</p><h1>Statistiky</h1></div><span class="count-badge">Rok 2026</span></div>
      <div class="metric-grid"><article class="metric-card"><span>Růst členské základny</span><strong>+18 %</strong><small>Oproti minulému roku</small></article><article class="metric-card"><span>Průměrná účast</span><strong>68 %</strong><small>Na letošních akcích</small></article><article class="metric-card"><span>Vybrané příspěvky</span><strong>92 500 Kč</strong><small>93 % ročního plánu</small></article></div>
      <article class="panel"><div class="panel__header"><h2>Vývoj účasti na akcích</h2><span>Posledních 6 měsíců</span></div><div class="chart" aria-label="Sloupcový graf návštěvnosti"><div style="height:44%"><span>Duben</span></div><div style="height:62%"><span>Květen</span></div><div style="height:51%"><span>Červen</span></div><div style="height:80%"><span>Červenec</span></div><div style="height:66%"><span>Srpen</span></div><div style="height:92%"><span>Září</span></div></div></article>
    </section>
  `;
}
