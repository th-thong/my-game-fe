import api from "@/services/api";

export interface Element {
  ID: number;
  Icon: string;
  Name: string;
}

export interface WeaponType {
  ID: number;
  Name: string;
  Icon: string;
}

export interface Character {
  DBId: string;
  ID: number;
  Name: string;
  QualityID: number;
  Element: Element;
  RoleHeadIcon: string;
  WeaponType: WeaponType;
}

const CACHE_KEY = "wuwa_characters_cache";
let fetchPromise: Promise<Character[]> | null = null;

const preloadImages = (chars: Character[]) => {
  chars.forEach((char) => {
    const img = new Image();
    img.src = char.RoleHeadIcon;
  });
};

export function fetchCharacters(): Promise<Character[]> {
  if (fetchPromise) return fetchPromise;

  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const parsed = JSON.parse(cachedData);
    fetchPromise = Promise.resolve(parsed);
    return fetchPromise;
  }

  fetchPromise = api
    .post("/data/query", {
      query: `
      query {
        characters {
          DBId
          ID
          Name
          QualityID
          RoleHeadIcon
          Element {
            ID
            Name
            Icon
          }
          WeaponType {
            ID
            Name
            Icon
          }
        }
      }
    `,
    })
    .then((res) => {
      const fetchedData: Character[] = res.data?.data?.characters || [];
      localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedData));
      preloadImages(fetchedData);
      return fetchedData;
    })
    .catch((err) => {
      fetchPromise = null;
      throw err;
    });

  return fetchPromise;
}

export function clearCharactersCache() {
  localStorage.removeItem(CACHE_KEY);
  fetchPromise = null;
}

export function useCharacters() {
  return () => fetchCharacters();
}
