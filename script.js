
const cards = document.getElementById("cards");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const areaFilter = document.getElementById("areaFilter");
const totalCount = document.getElementById("totalCount");

function uniq(arr) {
  return [...new Set(arr)].sort();
}
function fillFilters() {
  uniq(properties.map(p => p.type)).forEach(type => {
    const opt = document.createElement("option");
    opt.value = type; opt.textContent = type;
    typeFilter.appendChild(opt);
  });
  uniq(properties.map(p => p.area)).forEach(area => {
    const opt = document.createElement("option");
    opt.value = area; opt.textContent = area;
    areaFilter.appendChild(opt);
  });
}
function propertyText(p) {
  return [
    p.name, p.type, p.area, p.address, p.phone, p.email, p.price, p.rooms,
    p.amenities.join(" "), p.status
  ].join(" ").toLowerCase();
}
function render() {
  const q = searchInput.value.trim().toLowerCase();
  const type = typeFilter.value;
  const area = areaFilter.value;
  const list = properties.filter(p => {
    return (!q || propertyText(p).includes(q)) &&
           (!type || p.type === type) &&
           (!area || p.area === area);
  });
  totalCount.textContent = list.length;
  cards.innerHTML = list.map(p => `
    <article class="card">
      <div class="card-media"><span class="badge">${p.status}</span></div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="meta">${p.type} • ${p.area}</p>
        <p class="info"><b>Address:</b> ${p.address}</p>
        <p class="info"><b>Rooms:</b> ${p.rooms}</p>
        <p class="info"><b>Price:</b> ${p.price}</p>
        <p class="info"><b>Contact:</b> ${p.phone}${p.email ? " • " + p.email : ""}</p>
        <div class="tags">${p.amenities.map(a => `<span class="tag">${a}</span>`).join("")}</div>
        <div class="card-actions">
          <a class="map" target="_blank" href="${p.maps}">Google Map</a>
          <a class="site" target="_blank" href="${p.website}">More Details</a>
        </div>
      </div>
    </article>
  `).join("");
}
fillFilters();
render();
[searchInput, typeFilter, areaFilter].forEach(el => el.addEventListener("input", render));
