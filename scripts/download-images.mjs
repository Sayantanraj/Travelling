// Downloads each destination photo from Wikimedia Commons into public/tours/
// so the site serves local images (no runtime hotlinking / rate limits).
// Run: node scripts/download-images.mjs
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "tours");

const SRC = {
  vizag: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Araku-valley.jpg",
  hyderabad: "https://upload.wikimedia.org/wikipedia/commons/7/71/Charminar_Hyderabad_1.jpg",
  jagdalpur: "https://upload.wikimedia.org/wikipedia/commons/9/91/Chitrakot_waterfalls.JPG",
  "south-india": "https://upload.wikimedia.org/wikipedia/commons/e/e9/An_aerial_view_of_Madurai_city_from_atop_of_Meenakshi_Amman_temple.jpg",
  kerala: "https://upload.wikimedia.org/wikipedia/commons/e/ee/House_Boat_DSW.jpg",
  kinnaur: "https://upload.wikimedia.org/wikipedia/commons/0/08/Kalpa_%288512894537%29.jpg",
  kashmir: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg",
  houseboat: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg",
  tulip: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Tulip_Garden_india_%28cropped%29.jpg",
  manali: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG",
  manikaran: "https://upload.wikimedia.org/wikipedia/commons/1/14/Gurdwara_at_Manikarn.jpg",
  kasol: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Kasol_mountain_view.jpg",
  amritsar: "https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg",
  dharamshala: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Dharamshala_03_%28Cropped%29.jpg",
  nainital: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Nainital_metro.jpg",
  "silk-route": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Zuluk_at_dawn.jpg",
  ladakh: "https://upload.wikimedia.org/wikipedia/commons/7/75/5_Nubra_valley.jpg",
  spiti: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Spiti_River_Kaza_Himachal_Jun18_D72_7232.jpg",
  chardham: "https://upload.wikimedia.org/wikipedia/commons/5/56/Kedarnath_Temple_in_Rainy_season.jpg",
  haridwar: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Evening_view_of_Har-ki-Pauri%2C_Haridwar.jpg",
  shillong: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Umiam_Lake_-_by_Vikramjit_Kakati.png",
  lava: "https://upload.wikimedia.org/wikipedia/commons/8/88/View_of_Kalimpong%2C_India.jpg",
  dooars: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Tea_garden_in_dooars.jpg",
  kaziranga: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Beauty_of_Kaziranga_National_Park.jpg",
  gangtok: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tsongmo_Lake_or_Changu_Lake_-_East_Sikkim.jpg",
  pelling: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Sunrise_over_Kangchenjunga.jpg",
  tawang: "https://upload.wikimedia.org/wikipedia/commons/9/92/TawangMonastery.jpg",
  darjeeling: "https://upload.wikimedia.org/wikipedia/commons/9/96/DarjeelingTrainFruitshop_%282%29.jpg",
  sittong: "https://upload.wikimedia.org/wikipedia/commons/9/96/DarjeelingTrainFruitshop_%282%29.jpg",
  namchi: "https://upload.wikimedia.org/wikipedia/commons/5/55/Panoramic_view_of_large_statue_of_Guru_Padmasambhava_%28Guru_Rinpoche%29m_Namchi.jpg",
  kamakhya: "https://upload.wikimedia.org/wikipedia/commons/4/48/Kamakhya_Temple_-_DEV_8829.jpg",
  taj: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Taj_Mahal_%28Edited%29.jpeg",
  benaras: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg",
  varanasi: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg",
  ayodhya: "https://upload.wikimedia.org/wikipedia/commons/d/de/Shri_Ram_Janambhoomi_Mandir%2C_Ayodhya_Dham.jpg",
  mp: "https://upload.wikimedia.org/wikipedia/commons/e/e7/1_Khajuraho.jpg",
  purulia: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Telkupi%2C_Purulia.jpg",
  rajasthan: "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
  jaipur: "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
  gujarat: "https://upload.wikimedia.org/wikipedia/commons/1/10/Somanath_mandir_%28cropped%29.jpg",
  mumbai: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg",
  andaman: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Radha_Nagar_beach%2C_Havelock_Island%2C_Andamn%2C_India-_Sun_set_view.jpg",
  goa: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Baga_Beach%2C_Calangute%2C_Goa.jpg",
  puri: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Shri_Jagannath_temple.jpg",
  digha: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Digha_Tourist_Lodge_front_yard_1.jpg",
  sundarban: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Save_the_sundarbans_20.jpg",
  daringbari: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Lover%27s_point%2C_Daringbadi.jpg",
  nepal: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Phewa_lake%2C_Pokhara.jpg",
  bhutan: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Paro_Taktsang%2C_Bhutan_%28edited%29.jpg",
  thailand: "https://upload.wikimedia.org/wikipedia/commons/e/e7/KohPhiPhi.JPG",
  bangladesh: "https://upload.wikimedia.org/wikipedia/commons/8/89/A_dusk_at_Cox%27s_Bazar_sea_beach.jpg",
};

function toThumb(url, w = 1280) {
  const m = url.match(
    /^(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons)\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/
  );
  if (!m) return url;
  return `${m[1]}/thumb/${m[2]}/${m[3]}/${m[4]}/${w}px-${m[4]}`;
}

const UA = "HowladarTravels/1.0 (https://howladartravels.example; amithowladar7@gmail.com)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await mkdir(OUT, { recursive: true });

let ok = 0, fail = 0;
for (const [key, url] of Object.entries(SRC)) {
  const ext = (url.split(".").pop() || "jpg").toLowerCase();
  const fname = `${key}.jpg`; // saved as .jpg; next/image re-encodes regardless
  const thumb = toThumb(url);
  try {
    const res = await fetch(thumb, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(join(OUT, fname), buf);
    console.log(`✓ ${fname}  (${(buf.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (e) {
    console.log(`✗ ${fname}  ${e.message}`);
    fail++;
  }
  await sleep(400); // polite delay to avoid rate limiting
}
console.log(`\nDone: ${ok} ok, ${fail} failed -> public/tours/`);
