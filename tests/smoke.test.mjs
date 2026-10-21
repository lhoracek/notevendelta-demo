import test from 'node:test';
import assert from 'node:assert/strict';

import { appVersion } from '../src/main.js';

test('demo app exports non-empty version marker', () => {
  assert.equal(typeof appVersion, 'string');
  assert.ok(appVersion.length > 0);
});
