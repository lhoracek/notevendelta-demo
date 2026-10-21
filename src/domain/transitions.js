export function approveRegistration(user) {
  if (user.status !== 'pending_approval') return { ...user };
  return { ...user, status: 'expired' };
}

export function simulateMembershipPayment(user) {
  if (user.status !== 'expired') return { ...user };
  return { ...user, status: 'active' };
}
