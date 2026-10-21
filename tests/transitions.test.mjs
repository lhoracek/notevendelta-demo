import test from 'node:test';
import assert from 'node:assert/strict';
import { approveRegistration, simulateMembershipPayment } from '../src/domain/transitions.js';

test('approveRegistration changes pending_approval to expired', () => {
  const updated = approveRegistration({ status: 'pending_approval' });

  assert.equal(updated.status, 'expired');
});

test('simulateMembershipPayment changes expired to active', () => {
  const updated = simulateMembershipPayment({ status: 'expired' });

  assert.equal(updated.status, 'active');
});

test('approveRegistration leaves non-pending statuses unchanged', () => {
  for (const status of ['active', 'expired', 'suspended']) {
    const updated = approveRegistration({ status });

    assert.equal(updated.status, status);
  }
});

test('simulateMembershipPayment keeps active unchanged', () => {
  const updated = simulateMembershipPayment({ status: 'active' });

  assert.equal(updated.status, 'active');
});

test('simulateMembershipPayment leaves non-expired statuses unchanged', () => {
  for (const status of ['pending_approval', 'suspended']) {
    const updated = simulateMembershipPayment({ status });

    assert.equal(updated.status, status);
  }
});

test('transitions do not mutate the input user', () => {
  const pendingUser = { id: 'clen_pending', status: 'pending_approval' };
  const expiredUser = { id: 'clen_expired', status: 'expired' };

  approveRegistration(pendingUser);
  simulateMembershipPayment(expiredUser);

  assert.deepEqual(pendingUser, { id: 'clen_pending', status: 'pending_approval' });
  assert.deepEqual(expiredUser, { id: 'clen_expired', status: 'expired' });
});
