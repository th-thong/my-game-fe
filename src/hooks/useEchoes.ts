import api from "@/services/api";
import { useState, useTransition } from "react";
import { useEchoSetStore } from "@/store/useEchoSetStore";

import { useEchoStore, type Echo } from "@/store/useEchoStore";

let fetchPromise: Promise<Echo[]> | null = null;

const preloadImages = (items: Echo[]) => {
  items.forEach((item) => {
    const img = new Image();
    img.src = item.IconMiddle;

    if (item.EchoGroups && item.EchoGroups.length > 0) {
      item.EchoGroups.forEach((group) => {
        const groupImg = new Image();
        groupImg.src = group.Icon;
      });
    }
  });
};

export function fetchEchoesAction(forceUpdate = false): Promise<Echo[]> {
  const { echoes, setEchoes } = useEchoStore.getState();

  if (!forceUpdate && echoes.length > 0) {
    return Promise.resolve(echoes);
  }

  if (fetchPromise) return fetchPromise;

  fetchPromise = api
    .post("/data/query", {
      query: `
      query {
        echoes {
          DBId
          Id
          Name
          IconMiddle
          EchoGroups {
            Id
            Name
            Icon
          }
        }
      }
    `,
    })
    .then((res) => {
      const fetchedData: Echo[] = res.data?.data?.echoes || [];

      const uniqueSetsMap = new Map<
        number,
        (typeof fetchedData)[0]["EchoGroups"][0]
      >();

      fetchedData.forEach((echo) => {
        if (echo.EchoGroups && echo.EchoGroups.length > 0) {
          echo.EchoGroups.forEach((group) => {
            if (!uniqueSetsMap.has(group.Id)) {
              uniqueSetsMap.set(group.Id, group);
            }
          });
        }
      });

      const uniqueEchoSets = Array.from(uniqueSetsMap.values());

      useEchoSetStore.getState().setEchoSets(uniqueEchoSets);

      setEchoes(fetchedData);
      preloadImages(fetchedData);

      return fetchedData;
    })
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export function clearEchoesCache() {
  useEchoStore.getState().clearEchoes();
}

export function useEchoesPromise() {
  const [promise, setPromise] = useState(() => fetchEchoesAction());
  const [isPending, startTransition] = useTransition();

  const refetch = () => {
    startTransition(() => {
      setPromise(fetchEchoesAction(true));
    });
  };

  return {
    echoesPromise: promise,
    refetch,
    isUpdating: isPending,
  };
}
