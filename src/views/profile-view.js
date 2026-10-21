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

export function renderProfile({ currentUser, notice }, { restricted = false } = {}) {
  const { status } = currentUser;

  if (status === 'pending_approval') {
    return `
      <section class="view profile-view">
        <article class="panel limited-message"><h1>Registrace čeká na schválení</h1><p>Vaše registrace čeká na schválení vedením spolku.</p>${restricted ? '<p class="restricted-notice" role="status">Požadovaná sekce není pro vaši roli nebo oprávnění dostupná.</p>' : ''}</article>
      </section>
    `;
  }

  if (status === 'suspended') {
    return `
      <section class="view profile-view">
        <article class="panel limited-message"><h1>Účet byl suspendován</h1><p>Váš účet byl suspendován z důvodu neuhrazených závazků vůči spolku.</p></article>
      </section>
    `;
  }

  const limitedMessage = status === 'expired'
    ? 'Vaše členství vypršelo. Obnovte jej simulovanou platbou.'
    : 'Váš účet je aktivní a máte přístup k dostupným modulům.';

  return `
    <section class="view profile-view">
      <div class="page-heading"><div><p class="eyebrow">Můj účet</p><h1>Profil člena</h1></div><span class="status status--${status}">${statusLabels[status]}</span></div>
      ${notice ? `<div class="confirmation" role="status">${notice}</div>` : ''}
      ${restricted ? '<div class="confirmation" role="status">Požadovaná sekce není pro vaši roli nebo oprávnění dostupná.</div>' : ''}
      <article class="panel profile-card">
        <div class="avatar">${currentUser.label.slice(0, 1)}</div>
        <div><h2>${currentUser.label}</h2><p>Role: ${roleLabels[currentUser.role]}</p><p>Stav členství: <b>${statusLabels[status]}</b></p></div>
      </article>
      <article class="panel limited-message"><h2>Informace o členství</h2><p>${limitedMessage}</p>
        ${status === 'expired' ? '<button class="button button--primary" id="simulate-payment">Simulovat úspěšnou platbu</button>' : ''}
      </article>
    </section>
  `;
}

export function wireProfileActions(root, onPayment) {
  root.querySelector('#simulate-payment')?.addEventListener('click', onPayment);
}
