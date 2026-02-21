const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api';
const getToken = () => localStorage.getItem('token');
const headers = (isJson = true) => {
  const h: Record<string, string> = {};
  const token = getToken();
  if (token) h['Authorization'] = `Bearer ${token}`;
  if (isJson) h['Content-Type'] = 'application/json';
  return h;
};
const handleRes = async (r: Response) => {
  if (!r.ok) { const e = await r.json().catch(() => ({ message: 'Erro' })); throw new Error(e.message || 'Erro'); }
  return r.json();
};
export const api = {
  register: (d: any) => fetch(`${API_URL}/auth/register`, { method: 'POST', headers: headers(), body: JSON.stringify(d) }).then(handleRes),
  login: (email: string, password: string) => fetch(`${API_URL}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify({ email, password }) }).then(handleRes),
  deleteAccount: () => fetch(`${API_URL}/auth/delete-account`, { method: 'DELETE', headers: headers() }).then(handleRes),
  forgotPassword: (email: string) => fetch(`${API_URL}/auth/forgot-password`, { method: 'POST', headers: headers(), body: JSON.stringify({ email }) }).then(handleRes),
  resetPassword: (token: string, password: string) => fetch(`${API_URL}/auth/reset-password`, { method: 'POST', headers: headers(), body: JSON.stringify({ token, password }) }).then(handleRes),
  getProfiles: (params?: any) => { const q = params ? '?' + new URLSearchParams(params).toString() : ''; return fetch(`${API_URL}/users/profiles${q}`, { headers: headers() }).then(handleRes); },
  getUser: (id: string) => fetch(`${API_URL}/users/${id}`, { headers: headers() }).then(handleRes),
  updateUser: (id: string, d: any) => fetch(`${API_URL}/users/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(d) }).then(handleRes),
  updateLocation: (lat: number, lng: number) => fetch(`${API_URL}/users/location`, { method: 'PUT', headers: headers(), body: JSON.stringify({ latitude: lat, longitude: lng }) }).then(handleRes),
  getNearby: (maxDist: number) => fetch(`${API_URL}/users/nearby?maxDistance=${maxDist}`, { headers: headers() }).then(handleRes),
  swipe: (targetId: string, dir: string) => fetch(`${API_URL}/swipes`, { method: 'POST', headers: headers(), body: JSON.stringify({ targetId, direction: dir }) }).then(handleRes),
  getMatches: () => fetch(`${API_URL}/matches`, { headers: headers() }).then(handleRes),
  rewind: () => fetch(`${API_URL}/swipes/rewind`, { headers: headers() }).then(handleRes),
  getMessages: (matchId: string) => fetch(`${API_URL}/messages/${matchId}`, { headers: headers() }).then(handleRes),
  sendMessage: (matchId: string, content: string) => fetch(`${API_URL}/messages`, { method: 'POST', headers: headers(), body: JSON.stringify({ matchId, content }) }).then(handleRes),
  deleteMessage: (id: string) => fetch(`${API_URL}/messages/${id}`, { method: 'DELETE', headers: headers() }).then(handleRes),
  uploadPhoto: (fd: FormData) => fetch(`${API_URL}/photos/upload`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd }).then(handleRes),
  deletePhoto: (id: string) => fetch(`${API_URL}/photos/${id}`, { method: 'DELETE', headers: headers() }).then(handleRes),
  searchChurches: (q: string) => fetch(`${API_URL}/churches/search?q=${q}`, { headers: headers() }).then(handleRes),
  addChurch: (d: any) => fetch(`${API_URL}/churches/manual`, { method: 'POST', headers: headers(), body: JSON.stringify(d) }).then(handleRes),
  reportUser: (d: any) => fetch(`${API_URL}/moderation/report`, { method: 'POST', headers: headers(), body: JSON.stringify(d) }).then(handleRes),
  submitVerification: (fd: FormData) => fetch(`${API_URL}/verification/submit`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd }).then(handleRes),
  getEvents: () => fetch(`${API_URL}/events`, { headers: headers() }).then(handleRes),
  createEvent: (d: any) => fetch(`${API_URL}/events`, { method: 'POST', headers: headers(), body: JSON.stringify(d) }).then(handleRes),
  joinEvent: (id: string) => fetch(`${API_URL}/events/${id}/join`, { method: 'POST', headers: headers() }).then(handleRes),
  getStories: () => fetch(`${API_URL}/stories`, { headers: headers() }).then(handleRes),
  postStory: (fd: FormData) => fetch(`${API_URL}/stories`, { method: 'POST', headers: { Authorization: `Bearer ${getToken()}` }, body: fd }).then(handleRes),
  getStats: () => fetch(`${API_URL}/users/stats`, { headers: headers() }).then(handleRes),
  registerPush: (sub: any) => fetch(`${API_URL}/notifications/register`, { method: 'POST', headers: headers(), body: JSON.stringify(sub) }).then(handleRes),
  createCheckout: (priceId: string) => fetch(`${API_URL}/payments/create-checkout`, { method: 'POST', headers: headers(), body: JSON.stringify({ priceId }) }).then(handleRes),
  getPortal: () => fetch(`${API_URL}/payments/portal`, { method: 'POST', headers: headers() }).then(handleRes),
  admin: {
    login: (u: string, p: string) => fetch(`${API_URL}/admin/login`, { method: 'POST', headers: headers(), body: JSON.stringify({ username: u, password: p }) }).then(handleRes),
    getReports: () => fetch(`${API_URL}/admin/reports`, { headers: headers() }).then(handleRes),
    resolveReport: (id: string, action: string) => fetch(`${API_URL}/admin/reports/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify({ action }) }).then(handleRes),
    getUsers: () => fetch(`${API_URL}/admin/users`, { headers: headers() }).then(handleRes),
    banUser: (id: string) => fetch(`${API_URL}/admin/users/${id}/ban`, { method: 'PUT', headers: headers() }).then(handleRes),
    deleteUser: (id: string) => fetch(`${API_URL}/admin/users/${id}`, { method: 'DELETE', headers: headers() }).then(handleRes),
  }
};
export default api;
