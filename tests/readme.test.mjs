import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const content = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('README includes test accounts and run command', () => {
  assert.ok(content.includes('python3 -m http.server 4173'));
  assert.ok(content.includes('node --test tests/*.test.mjs'));
  assert.ok(content.includes('clen_expired'));
  assert.ok(content.includes('clen_suspended'));
});

test('README explicitly disclaims real payments and identifies mock data', () => {
  assert.match(content, /mock data/i);
  assert.match(content, /není napojené na reálnou platební bránu ani banku/i);
});
