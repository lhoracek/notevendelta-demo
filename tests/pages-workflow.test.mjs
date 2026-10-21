import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflowPath = new URL('../.github/workflows/deploy-pages.yml', import.meta.url);

test('GitHub Pages workflow publishes the verified demo directory', () => {
  const workflow = readFileSync(workflowPath, 'utf8');

  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /path:\s*\.\/$/m);
  assert.match(workflow, /node --test tests\/\*\.test\.mjs/);
});
