import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { smaContext } from "../App";

type dataPoint = {
  value: string;
  ma_value?: number;
  value_classification?: string;
  timestamp: string;
  time_until_update?: string;
  price?: number;
};

type pricePoint = [timestamp: number, price: number];

type chartPoint = {
  timestamp: string;
  price: number;
  ma_value: number;
};

const CACHE_EXPIRATION = 15 * 60 * 1000;

function getLastFifteenMinuteInterval() {
  const date = new Date();
  const minutes = date.getMinutes();
  const remainder = minutes % 15;
  date.setMinutes(minutes - remainder);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}

export default function Chart() {
  const [dataFng, setDataFng] = useState<dataPoint[]>([]);
  const [dataPrice, setDataPrice] = useState<pricePoint[]>([]);
  const [points, setPoints] = useState<chartPoint[]>([]);
  const { sma } = useContext(smaContext);

  const formatXAxis = useMemo(
    () => (tick: string) => {
      const date = moment(tick, "MM-DD-YYYY");
      return date.format("MMM/DD/YY");
    },
    []
  );

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

  const fetchPrices = useCallback(async () => {
    const ts = getLastFifteenMinuteInterval();
    const requestURL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1517443200&to=${ts}`;

    if ("caches" in window) {
      const match = await caches.match(requestURL);
      if (match) {
        const res = await match.json();

        const now = Date.now();
        if (now - res.timestamp < CACHE_EXPIRATION) {
          setDataPrice(res.prices);
          return;
        }
      }
    }

    const res = await axios.get(requestURL);

    const dataToCache = {
      timestamp: Date.now(),
      prices: res.data.prices,
    };

    const cache = await caches.open("fng");
    cache.put(requestURL, new Response(JSON.stringify(dataToCache)));

    setDataPrice(res.data.prices);
  }, []);

  useEffect(() => {
    fetchFNG();
    fetchPrices();
  }, [fetchFNG, fetchPrices]);

  useEffect(() => {
    if (dataFng && dataFng.length > 0 && dataPrice && dataPrice.length > 0) {
      const chartArr: chartPoint[] = [];

      dataFng.forEach((point, idx) => {
        if (idx < sma) {
          chartArr.push({
            timestamp: point.timestamp,
            price: +dataPrice[idx][1].toFixed(0),
            ma_value: 0,
          });
          return;
        }

        const movingAverage = +(
          dataFng.slice(idx - sma, idx).reduce((acc, cur) => {
            return acc + parseInt(cur.value);
          }, 0) / sma
        ).toFixed(2);

        chartArr.push({
          timestamp: point.timestamp,
          price: +dataPrice[idx][1].toFixed(0),
          ma_value: movingAverage,
        });
      });

      setPoints(chartArr);
    }
  }, [sma, dataFng, dataPrice]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={points}
        margin={{ top: 8, right: -42, left: -24, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="15 15" strokeOpacity=".15" />
        <Line
          name="price (log scale)"
          dataKey="price"
          yAxisId="right"
          type="monotone"
          stroke="#8884d8"
          strokeWidth="2"
          dot={false}
          activeDot={{
            fill: "transparent",
            stroke: "yellow",
            strokeWidth: 2,
            r: 5,
          }}
        />
        <Line
          name="moving average"
          dataKey="ma_value"
          yAxisId="left"
          type="monotone"
          stroke="#BBE5ED"
          strokeWidth="2"
          dot={false}
          activeDot={{
            fill: "transparent",
            stroke: "yellow",
            strokeWidth: 2,
            r: 5,
          }}
        />

        <XAxis
          dataKey="timestamp"
          tickLine={true}
          tickFormatter={formatXAxis}
          minTickGap={30}
          interval="preserveEnd"
          dx={-8}
          tickSize={11}
          stroke={"#EDF2F4"}
        />
        <YAxis
          dataKey="ma_value"
          yAxisId="left"
          domain={[0, 100]}
          tickCount={11}
          stroke={"#EDF2F4"}
        />
        <YAxis
          dataKey="price"
          scale="log"
          domain={["auto", "auto"]}
          axisLine={false}
          yAxisId="right"
          orientation="right"
          tickCount={0}
          stroke={"#EDF2F4"}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(136, 132, 216, 0.3)",
            color: "#fff",
          }}
          position={{ x: 60, y: 60 }}
          itemStyle={{ color: "#EDF2F4" }}
          cursor={false}
        />
        <Legend verticalAlign="top" height={36} wrapperStyle={{ top: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
