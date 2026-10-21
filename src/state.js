import { demoAccounts } from './domain/accounts.js';

export const state = {
  accounts: demoAccounts.map((account) => ({ ...account })),
  session: {
    accountId: null,
  },
};

export function getCurrentUser(currentState = state) {
  return currentState.accounts.find((account) => account.id === currentState.session.accountId) ?? null;
}

export function setCurrentUser(updatedUser, currentState = state) {
  const index = currentState.accounts.findIndex((account) => account.id === updatedUser.id);
  if (index === -1) return;
  currentState.accounts[index] = updatedUser;
}

export function logIn(accountId, currentState = state) {
  currentState.session.accountId = accountId;
}

export function logOut(currentState = state) {
  currentState.session.accountId = null;
}
