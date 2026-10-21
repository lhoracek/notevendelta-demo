import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const styles = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

test('table cells retain their table-cell display behavior', () => {
  assert.doesNotMatch(styles, /\.member-row div,\s*td\s*\{\s*display:\s*grid/);
  assert.match(styles, /\.member-row div\s*\{\s*display:\s*grid/);
});
