import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FngPoint } from "../types/apiResonse";
import Print from "./print";

const CACHE_EXPIRATION = 15 * 60 * 1000;

export default function Prints() {
  const [dataFng, setDataFng] = useState<FngPoint[]>([]);

  const fetchFNG = useCallback(async () => {
    const requestURL = `https://api.alternative.me/fng/?limit=0&date_format=us`;
    const match = await caches.match(requestURL);
    if ("caches" in window) {
      if (match) {
        const res = await match.json();

        // Check if cache has expired
        const now = Date.now();
        if (now - res.timestamp < CACHE_EXPIRATION) {
          setDataFng(res.data.reverse());
          return;
        }
      }
    }

    const res = await axios.get(requestURL);

    const dataToCache = {
      timestamp: Date.now(),
      data: res.data.data,
    };

    const cache = await caches.open("fng");
    cache.put(requestURL, new Response(JSON.stringify(dataToCache)));

    setDataFng(res.data.data.reverse());
  }, []);

  useEffect(() => {
    fetchFNG();
  }, [fetchFNG]);

  return (
    <>
      <Print sma={7} data={dataFng} />
      <Print sma={14} data={dataFng} />
      <Print sma={30} data={dataFng} />
      <Print sma={90} data={dataFng} />
      <Print sma={180} data={dataFng} />
      <Print sma={365} data={dataFng} />
    </>
  );
}
