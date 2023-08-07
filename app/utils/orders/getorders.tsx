
export async function getOrders() {
    const res = await fetch('http://127.0.0.1:8000/api/orders/',{ cache: 'no-store' });
    return res.json();
  }