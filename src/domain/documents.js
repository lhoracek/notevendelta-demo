export const demoDocuments = Object.freeze([
  Object.freeze({
    title: 'Výroční zpráva 2025',
    fileType: 'PDF',
    details: 'Zveřejněno 12. 10. 2026 · 2,4 MB',
    visibility: 'all_members',
    permittedRoles: Object.freeze(['administrator', 'vedeni', 'pokladnik', 'organizator', 'clen']),
    accessLabel: 'Přístup: všichni členové',
  }),
  Object.freeze({
    title: 'Zápis z členské schůze',
    fileType: 'DOC',
    details: 'Aktualizováno 8. 10. 2026 · 840 KB',
    visibility: 'all_members',
    permittedRoles: Object.freeze(['administrator', 'vedeni', 'pokladnik', 'organizator', 'clen']),
    accessLabel: 'Přístup: všichni členové',
  }),
  Object.freeze({
    title: 'Rozpočet 2026',
    fileType: 'XLS',
    details: 'Aktualizováno 1. 10. 2026 · 126 KB',
    visibility: 'finance',
    permittedRoles: Object.freeze(['administrator', 'pokladnik', 'vedeni']),
    accessLabel: 'Přístup: administrátor, pokladník a vedení',
  }),
]);

export function getVisibleDocuments(currentUser) {
  if (!currentUser?.role) return [];

  return demoDocuments.filter((document) => document.permittedRoles.includes(currentUser.role));
}
