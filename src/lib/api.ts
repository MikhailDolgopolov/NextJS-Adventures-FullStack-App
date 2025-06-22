export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api/${path}`);
  if (!res.ok) throw new Error(`API GET /${path} failed: ${res.status}`);
  return res.json();
}

export async function post<T, U>(path: string, body: T): Promise<U> {
  const res = await fetch(`/api/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API POST /${path} failed: ${res.status}`);
  return res.json();
}
export async function put<T, U>(path: string, body: T): Promise<U> {
  const res = await fetch(`/api/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API PUT /${path} failed: ${res.status}`);
  return res.json();
}