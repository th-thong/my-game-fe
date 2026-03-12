import api from "@/services/api";

export interface Weapon {
  DBId: string;
  ID: number;
  Name: string;
  Icon: string;
  Type: number;
  QualityID: number;
  TypeName: string;
  TypeIcon: string;
}

const WEAPON_CACHE_KEY = "wuwa_weapons_cache";
let fetchPromise: Promise<Weapon[]> | null = null;

const preloadImages = (items: Weapon[]) => {
  items.forEach((item) => {
    const img = new Image();
    img.src = item.Icon;
  });
};

export function fetchWeapons(): Promise<Weapon[]> {
  if (fetchPromise) return fetchPromise;

  const cachedData = localStorage.getItem(WEAPON_CACHE_KEY);
  if (cachedData) {
    const parsed = JSON.parse(cachedData);
    fetchPromise = Promise.resolve(parsed);
    return fetchPromise;
  }

  fetchPromise = api
    .post("/data/query", {
      query: `
      query {
        weapons {
          DBId
          ID
          Name
          Icon
          Type
          QualityID
          TypeName
          TypeIcon
        }
      }
    `,
    })
    .then((res) => {
      const fetchedData: Weapon[] = res.data?.data?.weapons || [];
      localStorage.setItem(WEAPON_CACHE_KEY, JSON.stringify(fetchedData));
      preloadImages(fetchedData);
      return fetchedData;
    })
    .catch((err) => {
      fetchPromise = null;
      throw err;
    });

  return fetchPromise;
}

export function clearWeaponsCache() {
  localStorage.removeItem(WEAPON_CACHE_KEY);
  fetchPromise = null;
}

export function useWeapons() {
  return () => fetchWeapons();
}
