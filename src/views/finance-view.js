export function renderFinance() {
  return `
    <section class="view">
      <div class="page-heading">
        <div>
          <p class="eyebrow">Hospodaření</p>
          <h1>Finance</h1>
        </div>
        <span class="status status--active">Bankovní výpis: říjen</span>
      </div>

      <div class="metric-grid">
        <article class="metric-card">
          <span>Zůstatek účtu</span>
          <strong>248 560 Kč</strong>
          <small>Aktualizováno dnes</small>
        </article>
        <article class="metric-card">
          <span>Spárované platby</span>
          <strong>31</strong>
          <small>Za říjen 2026</small>
        </article>
        <article class="metric-card">
          <span>Čeká na kontrolu</span>
          <strong>7</strong>
          <small>3 850 Kč celkem</small>
        </article>
      </div>

      <article class="panel">
        <div class="panel__header">
          <div>
            <p class="eyebrow">Bankovní účet</p>
            <h2>Bankovní transakce a párování</h2>
          </div>
          <span>Import výpisu KB-2026-10</span>
        </div>
        <div class="table-wrap">
          <table class="finance-table">
            <thead>
              <tr>
                <th>Plátce a účel</th>
                <th>Variabilní symbol</th>
                <th>Částka</th>
                <th>Stav párování</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Jan Novák</b><small>Členský příspěvek 2026</small></td>
                <td>20260184</td>
                <td class="amount">500 Kč</td>
                <td><span class="status status--active">Spárováno</span></td>
              </tr>
              <tr>
                <td><b>Neznámý plátce</b><small>Platba bez poznámky</small></td>
                <td>—</td>
                <td class="amount">500 Kč</td>
                <td><span class="status status--expired">Čeká na přiřazení</span></td>
              </tr>
              <tr>
                <td><b>Klára Svobodová</b><small>Dar na klubové vybavení</small></td>
                <td>20260032</td>
                <td class="amount">1 250 Kč</td>
                <td><span class="status status--active">Spárováno</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="panel">
        <div class="panel__header">
          <div>
            <p class="eyebrow">Platební brána</p>
            <h2>Poslední platby přes platební bránu</h2>
          </div>
          <span>Mock data · GoPay</span>
        </div>
        <div class="table-wrap">
          <table class="finance-table">
            <thead>
              <tr>
                <th>Člen a účel</th>
                <th>Reference platby</th>
                <th>Čas</th>
                <th>Částka</th>
                <th>Stav</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Petra Svobodová</b><small>Trénink IPSC A</small></td>
                <td>GP-2026-10482</td>
                <td>20. 10. · 18:42</td>
                <td class="amount">400 Kč</td>
                <td><span class="status status--active">Úspěšná</span></td>
              </tr>
              <tr>
                <td><b>Martin Dvořák</b><small>Členský příspěvek</small></td>
                <td>GP-2026-10479</td>
                <td>20. 10. · 16:18</td>
                <td class="amount">500 Kč</td>
                <td><span class="status status--active">Úspěšná</span></td>
              </tr>
              <tr>
                <td><b>Eva Králová</b><small>Trénink IPSC A</small></td>
                <td>GP-2026-10467</td>
                <td>19. 10. · 20:07</td>
                <td class="amount">400 Kč</td>
                <td><span class="status status--pending_approval">Zpracovává se</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </section>
  `;
}
