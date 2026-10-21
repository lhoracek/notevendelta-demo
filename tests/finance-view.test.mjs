import test from 'node:test';
import assert from 'node:assert/strict';

import { renderFinance } from '../src/views/finance-view.js';

test('finance view separates bank matching and payment gateway transactions', () => {
  const markup = renderFinance();

  assert.match(markup, /<h2>Bankovní transakce a párování<\/h2>/);
  assert.match(markup, /<h2>Poslední platby přes platební bránu<\/h2>/);
  assert.match(markup, /class="finance-table"/);
  assert.match(markup, /Platební brána/);
  assert.match(markup, /Reference platby/);
  assert.match(markup, /Úspěšná/);
});
