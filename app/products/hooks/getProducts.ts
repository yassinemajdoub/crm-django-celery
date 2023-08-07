export default async function getProducts() {
    const res = await fetch('http://127.0.0.1:8000/api/products/',{ cache: 'no-store' });
    const response= await res.json();
    return response
  }