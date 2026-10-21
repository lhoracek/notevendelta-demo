import test from 'node:test';
import assert from 'node:assert/strict';

import { getVisibleDocuments } from '../src/domain/documents.js';
import { canAccessModule } from '../src/domain/guards.js';

test('active regular member cannot see Rozpočet 2026', () => {
  const documents = getVisibleDocuments({ role: 'clen', status: 'active' });

  assert.equal(documents.some((document) => document.title === 'Rozpočet 2026'), false);
});

test('authorized leadership can see Rozpočet 2026', () => {
  const documents = getVisibleDocuments({ role: 'vedeni', status: 'active' });

  assert.equal(documents.some((document) => document.title === 'Rozpočet 2026'), true);
});

test('active pokladnik can see Rozpočet 2026 and access documents', () => {
  const pokladnik = { role: 'pokladnik', status: 'active' };
  const documents = getVisibleDocuments(pokladnik);

  assert.equal(documents.some((document) => document.title === 'Rozpočet 2026'), true);
  assert.equal(canAccessModule(pokladnik, 'documents'), true);
});
