// Fetches an accurate lead image per destination from Wikipedia PageImages.
// Run: node scripts/fetch-images.mjs

const MAP = {
  vizag: "Visakhapatnam",
  hyderabad: "Charminar",
  jagdalpur: "Chitrak-dhara Falls",
  "south-india": "Meenakshi Temple",
  kerala: "Kerala backwaters",
  kinnaur: "Kalpa, Himachal Pradesh",
  kashmir: "Dal Lake",
  manali: "Manali",
  manikaran: "Manikaran",
  amritsar: "Golden Temple",
  dharamshala: "Dharamshala",
  nainital: "Nainital",
  "silk-route": "Zuluk",
  ladakh: "Pangong Tso",
  spiti: "Spiti Valley",
  houseboat: "Dal Lake",
  tulip: "Indira Gandhi Memorial Tulip Garden",
  kasol: "Kasol",
  chardham: "Kedarnath Temple",
  haridwar: "Har Ki Pauri",
  shillong: "Umiam Lake",
  lava: "Lava, Kalimpong",
  dooars: "Dooars",
  kaziranga: "Kaziranga National Park",
  gangtok: "Gangtok",
  pelling: "Pelling",
  tawang: "Tawang Monastery",
  darjeeling: "Darjeeling Himalayan Railway",
  sittong: "Darjeeling",
  namchi: "Namchi",
  kamakhya: "Kamakhya Temple",
  taj: "Taj Mahal",
  benaras: "Dashashwamedh Ghat",
  ayodhya: "Ram Mandir",
  varanasi: "Varanasi",
  mp: "Khajuraho Group of Monuments",
  purulia: "Ayodhya Hills",
  rajasthan: "Hawa Mahal",
  jaipur: "Hawa Mahal",
  gujarat: "Somnath temple",
  mumbai: "Gateway of India",
  andaman: "Radhanagar Beach",
  goa: "Baga Beach",
  puri: "Jagannath Temple, Puri",
  digha: "Digha",
  sundarban: "Sundarbans",
  daringbari: "Daringbadi",
  nepal: "Phewa Lake",
  bhutan: "Paro Taktsang",
  thailand: "Phi Phi Islands",
  bangladesh: "Cox's Bazar",
};

const titles = [...new Set(Object.values(MAP))];

async function fetchBatch(batch) {
  const url =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1" +
    "&prop=pageimages&piprop=original|thumbnail&pithumbsize=1280&titles=" +
    encodeURIComponent(batch.join("|"));
  const res = await fetch(url, { headers: { "User-Agent": "HowladarSite/1.0" } });
  const json = await res.json();
  const out = {};
  // map redirects back to requested titles
  const redirects = {};
  (json.query?.redirects || []).forEach((r) => (redirects[r.to] = r.from));
  const normalized = {};
  (json.query?.normalized || []).forEach((n) => (normalized[n.to] = n.from));
  for (const page of Object.values(json.query?.pages || {})) {
    const img = page.original?.source || page.thumbnail?.source;
    if (!img) continue;
    let title = page.title;
    if (redirects[title]) title = redirects[title];
    if (normalized[title]) title = normalized[title];
    out[title] = img;
  }
  return out;
}

const resolved = {};
for (let i = 0; i < titles.length; i += 20) {
  Object.assign(resolved, await fetchBatch(titles.slice(i, i + 20)));
}

const result = {};
for (const [key, title] of Object.entries(MAP)) {
  result[key] = resolved[title] || null;
}
console.log(JSON.stringify(result, null, 2));
