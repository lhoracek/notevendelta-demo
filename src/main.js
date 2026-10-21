import { getAllowedModules } from './domain/guards.js';
import { approveRegistration, simulateMembershipPayment } from './domain/transitions.js';
import { getCurrentRoute, getLandingRouteForStatus, renderRoute } from './router.js';
import { getCurrentUser, logIn, logOut, setCurrentUser, state } from './state.js';
import { wireLoginActions } from './views/login-view.js';
import { wireMembersActions } from './views/members-view.js';
import { wireProfileActions } from './views/profile-view.js';

export const appVersion = 'demo-v1';

const moduleLabels = {
  dashboard: 'Přehled',
  members: 'Členové',
  events: 'Akce',
  finance: 'Finance',
  documents: 'Dokumenty',
  stats: 'Statistiky',
  profile: 'Můj profil',
};

let notice = '';

function renderNavigation(currentUser, route) {
  return `<nav class="sidebar-nav" aria-label="Hlavní navigace">${getAllowedModules(currentUser).map((moduleKey) => `<a href="#/${moduleKey}" class="${route.moduleKey === moduleKey ? 'is-active' : ''}">${moduleLabels[moduleKey]}</a>`).join('')}</nav>`;
}

function wireActions(root, route) {
  if (route.moduleKey === 'login') {
    wireLoginActions(root, (accountId) => {
      logIn(accountId);
      window.location.hash = getLandingRouteForStatus(getCurrentUser().status);
    });
  }
  if (route.moduleKey === 'profile') {
    wireProfileActions(root, () => {
      const user = getCurrentUser();
      setCurrentUser(simulateMembershipPayment(user));
      notice = 'Platba byla úspěšně simulována. Členství je nyní aktivní.';
      window.location.hash = '#/dashboard';
      renderApp();
    });
  }
  if (route.moduleKey === 'members') {
    wireMembersActions(root, (accountId) => {
      const account = state.accounts.find((candidate) => candidate.id === accountId);
      if (!account || !['administrator', 'vedeni'].includes(getCurrentUser().role)) return;
      setCurrentUser(approveRegistration(account));
      notice = `Registrace účtu ${account.label} byla schválena. Členství nyní čeká na úhradu.`;
      renderApp();
    });
  }
  root.querySelector('[data-logout]')?.addEventListener('click', () => {
    logOut();
    notice = '';
    window.location.hash = '#/login';
    renderApp();
  });
}

export function renderApp() {
  if (typeof document === 'undefined') return;
  const root = document.getElementById('app');
  if (!root) return;
  const currentUser = getCurrentUser();
  const viewModel = { ...state, currentUser, notice };
  const route = renderRoute(getCurrentRoute(), viewModel);
  if (window.location.hash !== route.path) window.history.replaceState(null, '', route.path);
  const isSuspended = currentUser?.status === 'suspended';

  root.innerHTML = `
    <div class="demo-banner">DEMO MODE / MOCK DATA <span>· Veškerá data a akce jsou pouze ukázkové</span></div>
    ${isSuspended ? `<main class="restricted-shell">${route.content}</main>` : currentUser ? `<div class="app-shell"><aside class="sidebar"><a class="brand" href="#/dashboard">spolek<span>demo</span></a>${renderNavigation(currentUser, route)}<div class="sidebar__footer"><b>${currentUser.label}</b><small>${currentUser.role}</small><button class="logout" data-logout>Odhlásit</button></div></aside><main class="main-content">${route.content}</main></div>` : `<main class="login-shell">${route.content}</main>`}
  `;
  wireActions(root, route);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('hashchange', renderApp);
  renderApp();
}
