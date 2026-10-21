const statusLabels = {
  active: 'Aktivní',
  expired: 'Členství vypršelo',
  pending_approval: 'Čeká na schválení',
  suspended: 'Suspendováno',
};

const roleLabels = {
  administrator: 'Administrátor',
  vedeni: 'Vedení spolku',
  pokladnik: 'Pokladník',
  organizator: 'Organizátor',
  clen: 'Člen',
};

export function renderMembers({ accounts, currentUser, notice }) {
  const canApprove = ['administrator', 'vedeni'].includes(currentUser.role);
  const pending = accounts.filter((account) => account.status === 'pending_approval');
  return `
    <section class="view">
      <div class="page-heading"><div><p class="eyebrow">Evidence</p><h1>Členové</h1></div><span class="count-badge">${accounts.length} účtů</span></div>
      ${notice ? `<div class="confirmation" role="status">${notice}</div>` : ''}
      <article class="panel"><div class="panel__header"><h2>Čekající registrace</h2><span>${pending.length} k vyřízení</span></div>
        ${pending.length ? pending.map((account) => `<div class="member-row"><div><b>${account.label}</b><small>${account.id}@spolek.cz · nový člen</small></div>${canApprove ? `<button class="button button--primary" data-approve-id="${account.id}">Schválit registraci</button>` : '<span class="status status--pending_approval">Čeká na schválení</span>'}</div>`).join('') : '<p>Žádné registrace nečekají na schválení.</p>'}
      </article>
      <article class="panel"><div class="panel__header"><h2>Seznam členů</h2><span>Aktuální stav</span></div>
        <div class="table-wrap"><table><thead><tr><th>Jméno / účet</th><th>Role</th><th>Členství</th></tr></thead><tbody>${accounts.filter((account) => account.status !== 'pending_approval').map((account) => `<tr><td><b>${account.label}</b><small>${account.id}@spolek.cz</small></td><td>${roleLabels[account.role]}</td><td><span class="status status--${account.status}">${statusLabels[account.status]}</span></td></tr>`).join('')}</tbody></table></div>
      </article>
    </section>
  `;
}

export function wireMembersActions(root, onApprove) {
  root.querySelectorAll('[data-approve-id]').forEach((button) => button.addEventListener('click', () => onApprove(button.dataset.approveId)));
}
