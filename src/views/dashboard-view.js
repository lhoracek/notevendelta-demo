export function renderDashboard({ currentUser }) {
  return `
    <section class="view">
      <div class="page-heading">
        <div><p class="eyebrow">Přehled</p><h1>Dobré ráno, ${currentUser.label}</h1></div>
        <span class="status status--active">Členství aktivní</span>
      </div>
      <div class="metric-grid">
        <article class="metric-card"><span>Aktivní členové</span><strong>184</strong><small>+12 tento měsíc</small></article>
        <article class="metric-card"><span>Nadcházející akce</span><strong>3</strong><small>Nejbližší za 4 dny</small></article>
        <article class="metric-card"><span>Nezpracované platby</span><strong>7</strong><small>Čekají na spárování</small></article>
      </div>
      <article class="panel">
        <div class="panel__header"><h2>Co je nového</h2><span>Říjen 2026</span></div>
        <ul class="activity-list"><li><b>Podzimní členská schůze</b><span>Registrace otevřena</span></li><li><b>Nové členské přihlášky</b><span>2 žádosti čekají na zpracování</span></li><li><b>Výroční zpráva</b><span>Dokument je připraven ke čtení</span></li></ul>
      </article>
    </section>
  `;
}
