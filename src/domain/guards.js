const PROFILE_ONLY_MODULES = Object.freeze(['profile']);

const ROLE_MODULES = Object.freeze({
  administrator: Object.freeze(['dashboard', 'members', 'events', 'finance', 'documents', 'stats', 'profile']),
  vedeni: Object.freeze(['dashboard', 'members', 'events', 'documents', 'stats', 'profile']),
  pokladnik: Object.freeze(['dashboard', 'finance', 'documents', 'stats', 'profile']),
  organizator: Object.freeze(['dashboard', 'events', 'profile']),
  clen: Object.freeze(['dashboard', 'events', 'documents', 'profile']),
});

export function getAllowedModules(user) {
  if (!user || user.status !== 'active') return PROFILE_ONLY_MODULES;
  return ROLE_MODULES[user.role] ?? PROFILE_ONLY_MODULES;
}

export function canAccessModule(user, moduleKey) {
  return getAllowedModules(user).includes(moduleKey);
}
