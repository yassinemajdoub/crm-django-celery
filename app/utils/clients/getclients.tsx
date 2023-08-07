
export async function getClients() {
    const res = await fetch('http://127.0.0.1:8000/api/clients/',{ cache: 'no-store' });
    return res.json();
  }