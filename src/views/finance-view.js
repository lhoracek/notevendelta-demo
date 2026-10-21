export function renderFinance() {
  return `
    <section class="view">
      <div class="page-heading"><div><p class="eyebrow">Hospodaření</p><h1>Finance</h1></div><span class="status status--active">Bankovní výpis: říjen</span></div>
      <div class="metric-grid"><article class="metric-card"><span>Zůstatek účtu</span><strong>248 560 Kč</strong><small>Aktualizováno dnes</small></article><article class="metric-card"><span>Spárované platby</span><strong>31</strong><small>Za říjen 2026</small></article><article class="metric-card"><span>Čeká na kontrolu</span><strong>7</strong><small>3 850 Kč celkem</small></article></div>
      <article class="panel"><div class="panel__header"><h2>Mock bankovní párování</h2><span>Import výpisu KB-2026-10</span></div><div class="table-wrap"><table><thead><tr><th>Platba</th><th>Variabilní symbol</th><th>Částka</th><th>Stav</th></tr></thead><tbody><tr><td><b>Jan Novák</b><small>Členský příspěvek 2026</small></td><td>20260184</td><td>500 Kč</td><td><span class="status status--active">Spárováno</span></td></tr><tr><td><b>Neznámý plátce</b><small>Platba bez poznámky</small></td><td>—</td><td>500 Kč</td><td><span class="status status--expired">Čeká na přiřazení</span></td></tr><tr><td><b>Klára Svobodová</b><small>Dar na komunitní zahradu</small></td><td>20260032</td><td>1 250 Kč</td><td><span class="status status--active">Spárováno</span></td></tr></tbody></table></div></article>
    </section>
  `;
}
