const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:2026/api'

export const toAssignmentProxyUrl = url => {
  if (!url || !url.trim()) return ''
  return `${API}/assignments/proxy?url=${encodeURIComponent(url.trim())}`
}
