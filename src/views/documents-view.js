import { getVisibleDocuments } from '../domain/documents.js';

export function renderDocuments({ currentUser } = {}) {
  const documents = getVisibleDocuments(currentUser);

  return `
    <section class="view">
      <div class="page-heading"><div><p class="eyebrow">Sdílené podklady</p><h1>Dokumenty</h1></div><button class="button button--primary">Nahrát dokument</button></div>
      <article class="panel document-list">
        ${documents.map((document) => `<div class="document-row"><span class="file-icon">${document.fileType}</span><div><b>${document.title}</b><small>${document.details}</small><small>${document.accessLabel}</small></div><button class="button button--ghost">Zobrazit</button></div>`).join('')}
      </article>
    </section>
  `;
}
