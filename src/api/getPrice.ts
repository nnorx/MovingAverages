import axios from "axios";

export type PricePoint = [timestamp: number, price: number];

const ts = Math.floor(Date.now() / 1000);

const tsOneYearAgo = ts - 31536000;

// Coingecko updated their free API to only allow querying one year of data, so we combine a cached price history

const getPrice = {
  queryKey: ["getPrice"],
  queryFn: async (): Promise<PricePoint[]> => {
    try {
      const promises = Promise.all([
        axios.get(import.meta.env.BASE_URL + "priceCache.json"),
        axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${tsOneYearAgo}&to=${ts}`
        ),
      ]);

      const [res1, res2] = await promises;
      return [...res1.data.history, ...res2.data.prices.reverse()];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default getPrice;
