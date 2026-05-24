import { MEMBERS_DATA } from '../../data/members';

export const getMockIdentity = () => {
  const isLoggedOut = localStorage.getItem('mock_logged_out') === 'true';
  if (isLoggedOut) return { name: "AUTHORIZATION REQUIRED", role: "NONE" };
  const memberId = localStorage.getItem('mock_member_id');
  if (!memberId) return { name: "AUTHORIZATION REQUIRED", role: "NONE" };
  const extras = JSON.parse(sessionStorage.getItem('mock_extra_members') || '[]');
  const all = [...MEMBERS_DATA, ...extras];
  const member = all.find(m => m.id === memberId);
  if (!member) return { name: "AUTHORIZATION REQUIRED", role: "NONE" };
  return { name: member.name, role: member.role, title: member.title, token: "mock-token" };
};

export const mockLogin = (memberId = '0', newMemberData = null) => {
  let name = 'Unknown';
  if (newMemberData) {
    const session = JSON.parse(sessionStorage.getItem('mock_extra_members') || '[]');
    session.push(newMemberData);
    sessionStorage.setItem('mock_extra_members', JSON.stringify(session));
    name = newMemberData.name;
  } else {
    const extras = JSON.parse(sessionStorage.getItem('mock_extra_members') || '[]');
    const member = [...MEMBERS_DATA, ...extras].find(m => m.id === memberId) || MEMBERS_DATA[0];
    name = member.name;
  }
  localStorage.removeItem('mock_logged_out');
  localStorage.setItem('mock_member_id', memberId);
  sessionStorage.setItem('pending_notification', `Uplink established. Identified as ${name}.`);
  window.location.reload();
};

export const mockLogout = () => {
  localStorage.setItem('mock_logged_out', 'true');
  localStorage.removeItem('mock_member_id');
  sessionStorage.setItem('pending_notification', 'Connection terminated. Rest well, user.');
  window.location.reload();
};