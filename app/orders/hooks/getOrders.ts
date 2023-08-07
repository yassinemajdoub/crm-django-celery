
export default async function getorders() {
    const res = await fetch('http://127.0.0.1:8000/api/orders/',{ cache: 'no-store' });
    const response= await res.json();
    return response
  }