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

export function renderLogin({ accounts }) {
  return `
    <section class="login-view">
      <div class="hero-copy">
        <p class="eyebrow">Členský portál</p>
        <h1>Vítejte v platformě spolku</h1>
        <p>Pro demonstraci vyberte jednu z připravených rolí. Každá ukazuje vlastní oprávnění i stav členství.</p>
      </div>
      <div class="account-picker" aria-label="Výběr ukázkového účtu">
        ${accounts.map((account) => `
          <button class="account-card" data-account-id="${account.id}">
            <span class="account-card__name">${account.label}</span>
            <span class="account-card__meta">${roleLabels[account.role]} · <span class="status status--${account.status}">${statusLabels[account.status]}</span></span>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

export function wireLoginActions(root, onLogin) {
  root.querySelectorAll('[data-account-id]').forEach((button) => {
    button.addEventListener('click', () => onLogin(button.dataset.accountId));
  });
}
