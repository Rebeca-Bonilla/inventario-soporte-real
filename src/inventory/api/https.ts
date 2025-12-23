export const API_URL = 'http://localhost:3000'

export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(API_URL + url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!res.ok) throw new Error('API error')
  return res.json()
}
