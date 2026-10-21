import test from 'node:test';
import assert from 'node:assert/strict';

import { canAccessModule, getAllowedModules } from '../src/domain/guards.js';
import { demoAccounts } from '../src/domain/accounts.js';

test('demo accounts contain exactly required 8 account ids', () => {
  assert.deepEqual(
    demoAccounts.map((account) => account.id),
    [
      'administrator',
      'vedeni',
      'pokladnik',
      'organizator',
      'clen_active',
      'clen_pending',
      'clen_expired',
      'clen_suspended',
    ],
  );
});

test('pending_approval sees only profile', () => {
  assert.equal(canAccessModule({ status: 'pending_approval', role: 'clen' }, 'dashboard'), false);
  assert.deepEqual(getAllowedModules({ status: 'pending_approval', role: 'clen' }), ['profile']);
});

test('expired sees only profile', () => {
  assert.equal(canAccessModule({ status: 'expired', role: 'clen' }, 'members'), false);
  assert.deepEqual(getAllowedModules({ status: 'expired', role: 'clen' }), ['profile']);
});

test('suspended sees only profile', () => {
  assert.equal(canAccessModule({ status: 'suspended', role: 'organizator' }, 'events'), false);
  assert.deepEqual(getAllowedModules({ status: 'suspended', role: 'organizator' }), ['profile']);
});

test('active user can access modules by role', () => {
  assert.deepEqual(getAllowedModules({ status: 'active', role: 'pokladnik' }), [
    'dashboard',
    'finance',
    'documents',
    'stats',
    'profile',
  ]);
  assert.equal(canAccessModule({ status: 'active', role: 'pokladnik' }, 'finance'), true);
  assert.equal(canAccessModule({ status: 'active', role: 'pokladnik' }, 'documents'), true);
  assert.equal(canAccessModule({ status: 'active', role: 'pokladnik' }, 'events'), false);
});

test('active role modules are immutable and cannot be mutated at runtime', () => {
  const modules = getAllowedModules({ status: 'active', role: 'organizator' });

  assert.equal(Object.isFrozen(modules), true);
  assert.throws(() => modules.push('finance'), TypeError);
  assert.deepEqual(getAllowedModules({ status: 'active', role: 'organizator' }), [
    'dashboard',
    'events',
    'profile',
  ]);
});

test('unknown status is denied by default and sees only profile', () => {
  assert.deepEqual(getAllowedModules({ status: 'trial', role: 'administrator' }), ['profile']);
  assert.equal(canAccessModule({ status: 'trial', role: 'administrator' }, 'dashboard'), false);
});
