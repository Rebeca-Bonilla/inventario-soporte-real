const API_URL = 'http://localhost:3000'

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, options)
  return res.json()
}
