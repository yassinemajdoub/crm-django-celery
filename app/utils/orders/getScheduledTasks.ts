

export async function getScheduledTask() {
    const res = await fetch('http://127.0.0.1:8000/api/scheduled-tasks/',{ cache: 'no-store' });
    return res.json();
  }