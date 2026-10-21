import test from 'node:test';
import assert from 'node:assert/strict';

import { getLandingRouteForStatus, renderRoute, resolveRoute } from '../src/router.js';
import { renderApp } from '../src/main.js';
import { state } from '../src/state.js';
import { renderProfile } from '../src/views/profile-view.js';

test('expired account lands on profile', () => {
  assert.equal(getLandingRouteForStatus('expired'), '#/profile');
});

test('active account lands on dashboard', () => {
  assert.equal(getLandingRouteForStatus('active'), '#/dashboard');
});

test('restricted route is resolved to profile', () => {
  const result = resolveRoute('#/finance', {
    currentUser: { role: 'clen', status: 'active' },
  });

  assert.deepEqual(result, {
    moduleKey: 'profile',
    path: '#/profile',
    restricted: true,
  });
});

test('active user redirected from a restricted section sees the permission reason on profile', () => {
  const result = renderRoute('#/finance', {
    currentUser: { label: 'Aktivní člen', role: 'clen', status: 'active' },
  });

  assert.match(result.content, /Požadovaná sekce není pro vaši roli nebo oprávnění dostupná\./);
});

test('pending approval profile renders only approval waiting content', () => {
  const content = renderProfile({
    currentUser: { label: 'Čekající člen', role: 'clen', status: 'pending_approval' },
  });

  assert.match(content, /Vaše registrace čeká na schválení vedením spolku\./);
  assert.doesNotMatch(content, /Profil člena|Čekající člen|Role:|Stav členství:|Simulovat úspěšnou platbu/);
});

test('restricted direct route for pending approval renders unavailable-section notice in limited view', () => {
  const result = renderRoute('#/dashboard', {
    currentUser: { label: 'Čekající člen', role: 'clen', status: 'pending_approval' },
  });

  assert.equal(result.restricted, true);
  assert.match(result.content, /Požadovaná sekce není pro vaši roli nebo oprávnění dostupná\./);
  assert.doesNotMatch(result.content, /Profil člena|Čekající člen|Role:|Stav členství:|Simulovat úspěšnou platbu/);
});

test('suspended profile renders only suspension information', () => {
  const content = renderProfile({
    currentUser: { label: 'Suspendovaný člen', role: 'clen', status: 'suspended' },
  });

  assert.match(content, /Váš účet byl suspendován z důvodu neuhrazených závazků vůči spolku\./);
  assert.doesNotMatch(content, /Profil člena|Suspendovaný člen|Role:|Stav členství:|Simulovat úspěšnou platbu/);
});

test('suspended account navigating directly to a restricted route sees only suspension information', () => {
  const root = {
    innerHTML: '',
    querySelector: () => null,
  };
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;
  const originalAccountId = state.session.accountId;

  globalThis.document = { getElementById: () => root };
  globalThis.window = {
    location: { hash: '#/events' },
    history: { replaceState: () => {} },
  };
  state.session.accountId = 'clen_suspended';

  try {
    renderApp();
  } finally {
    state.session.accountId = originalAccountId;
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
  }

  assert.match(root.innerHTML, /DEMO MODE \/ MOCK DATA/);
  assert.match(root.innerHTML, /Účet byl suspendován/);
  assert.match(root.innerHTML, /Váš účet byl suspendován z důvodu neuhrazených závazků vůči spolku\./);
  assert.doesNotMatch(root.innerHTML, /Požadovaná sekce není pro vaši roli nebo oprávnění dostupná\.|Suspendovaný člen|Člen|sidebar-nav|Hlavní navigace|Odhlásit|Simulovat úspěšnou platbu/);
});
