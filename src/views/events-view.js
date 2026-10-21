export function renderEvents() {
  return `
    <section class="view">
      <div class="page-heading"><div><p class="eyebrow">Program spolku</p><h1>Akce a účast</h1></div><button class="button button--primary">+ Přidat akci</button></div>
      <div class="event-grid">
        <article class="event-card"><div class="event-date"><b>25</b><span>ŘÍJ</span></div><div><span class="status status--active">Otevřená registrace</span><h2>Podzimní členská schůze</h2><p>18:00 · Komunitní centrum</p><div class="attendance"><span>Účast potvrzena</span><b>42 / 60</b></div><div class="progress"><i style="width:70%"></i></div></div></article>
        <article class="event-card"><div class="event-date"><b>08</b><span>LIS</span></div><div><span class="status status--pending_approval">Plánováno</span><h2>Dobrovolnický den</h2><p>09:00 · Park u řeky</p><div class="attendance"><span>Přihlášeno</span><b>18 / 30</b></div><div class="progress"><i style="width:60%"></i></div></div></article>
        <article class="event-card"><div class="event-date"><b>13</b><span>PRO</span></div><div><span class="status status--active">Otevřená registrace</span><h2>Adventní setkání</h2><p>17:30 · Klubovna spolku</p><div class="attendance"><span>Přihlášeno</span><b>27 / 80</b></div><div class="progress"><i style="width:34%"></i></div></div></article>
      </div>
    </section>
  `;
}
