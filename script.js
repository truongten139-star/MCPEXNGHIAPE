async function fetchAddons() {
  try {
    const res = await fetch('/addons.json', {cache: "no-store"});
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

function createCard(a) {
  const d = document.createElement('div');
  d.className = 'card';
  d.innerHTML = `
    <img src="${a.img || '/assets/fallback.png'}" alt="${a.title || ''}" />
    <h3>${a.title || 'No title'}</h3>
    <p>${a.description || ''}</p>
    <a class="btn" href="${a.url || '#'}" target="_blank" rel="noreferrer">Tải về</a>
  `;
  return d;
}

document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('list');
  const addons = await fetchAddons();
  if (!addons.length) {
    list.innerHTML = '<p>Chưa có addon nào.</p>';
    return;
  }
  addons.forEach(a => list.appendChild(createCard(a)));
});