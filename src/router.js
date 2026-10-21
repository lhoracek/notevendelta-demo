import { canAccessModule } from './domain/guards.js';
import { renderDashboard } from './views/dashboard-view.js';
import { renderDocuments } from './views/documents-view.js';
import { renderEvents } from './views/events-view.js';
import { renderFinance } from './views/finance-view.js';
import { renderLogin } from './views/login-view.js';
import { renderMembers } from './views/members-view.js';
import { renderProfile } from './views/profile-view.js';
import { renderStats } from './views/stats-view.js';

const routeRenderers = {
  dashboard: renderDashboard,
  documents: renderDocuments,
  events: renderEvents,
  finance: renderFinance,
  login: renderLogin,
  members: renderMembers,
  profile: renderProfile,
  stats: renderStats,
};

export function getLandingRouteForStatus(status) {
  return status === 'active' ? '#/dashboard' : '#/profile';
}

export function getCurrentRoute(hash = typeof window === 'undefined' ? '' : window.location.hash) {
  return hash || '#/login';
}

export function resolveRoute(hash, { currentUser }) {
  const moduleKey = (hash || '#/login').replace(/^#\//, '').split('/')[0] || 'login';

  if (!currentUser) {
    return { moduleKey: 'login', path: '#/login', restricted: moduleKey !== 'login' };
  }

  if (moduleKey === 'login') {
    const path = getLandingRouteForStatus(currentUser.status);
    return { moduleKey: path.slice(2), path, restricted: false };
  }

  if (!routeRenderers[moduleKey] || !canAccessModule(currentUser, moduleKey)) {
    return { moduleKey: 'profile', path: '#/profile', restricted: true };
  }

  return { moduleKey, path: `#/${moduleKey}`, restricted: false };
}

export function renderRoute(hash, viewModel) {
  const route = resolveRoute(hash, viewModel);
  return {
    ...route,
    content: routeRenderers[route.moduleKey](viewModel, route),
  };
}
