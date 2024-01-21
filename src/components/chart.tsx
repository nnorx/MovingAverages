import axios from "axios";
import { useState, useEffect, useMemo, useCallback, useContext } from "react";
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

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { smaContext } from "../App";
import CustomDot from "./customDot";
import { FngPoint, PricePoint } from "../types/apiResonse";
import { ChartPoint, JoinedPoint } from "../types/chart";

dayjs.extend(utc);

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
  const [dataFng, setDataFng] = useState<FngPoint[]>([]);
  const [dataPrice, setDataPrice] = useState<PricePoint[]>([]);
  const [joinedData, setJoinedData] = useState<JoinedPoint[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const { sma } = useContext(smaContext);

  const formatXAxis = useMemo(
    () => (tick: string) => {
      const date = dayjs(tick, "MM-DD-YYYY");
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
      const map1 = new Map(
        dataFng.map((item) => [
          dayjs(item.timestamp).utc().startOf("day").unix() * 1000,
          item,
        ])
      );
      const map2 = new Map(dataPrice.map((item) => [item[0], item]));

      const keys = new Set([...map1.keys(), ...map2.keys()]);

      const joinedData: JoinedPoint[] = Array.from(keys, (key) => {
        if (map1.has(key) && map2.has(key)) {
          return {
            timestamp: key,
            fng: map1.get(key)?.value,
            price: map2.get(key)?.[1],
          };
        }
      }).filter(Boolean) as JoinedPoint[];

      setJoinedData(joinedData);
    }
  }, [dataFng, dataPrice]);

  useEffect(() => {
    if (joinedData && joinedData.length > 0) {
      const chartArr: ChartPoint[] = [];

      joinedData.forEach((point, idx) => {
        if (idx < sma) {
          chartArr.push({
            timestamp: dayjs(point.timestamp)
              .add(1, "day")
              .format("MM-DD-YYYY"),
            price: +point.price.toFixed(0),
            ma_value: 0,
            visibleDot: false,
          });
          return;
        }

        const movingAverage = +(
          joinedData.slice(idx - sma, idx).reduce((acc, cur) => {
            return acc + parseInt(cur.fng);
          }, 0) / sma
        ).toFixed(2);

        chartArr.push({
          timestamp: dayjs(point.timestamp).add(1, "day").format("MM-DD-YYYY"),
          price: +point.price.toFixed(0),
          ma_value: movingAverage,
          visibleDot: idx % 5 === 0,
        });
      });

      setChartData(chartArr);
    }
  }, [joinedData, sma]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 8, right: -42, left: -24, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="15 15" strokeOpacity=".15" />
        <Line
          name="price (log scale)"
          dataKey="price"
          yAxisId="right"
          type="monotone"
          stroke="#8884d8"
          strokeWidth="1"
          dot={false}
          activeDot={{
            fill: "transparent",
            stroke: "#36cfc9",
            strokeWidth: 2,
            r: 5,
          }}
        />
        <Line
          name="moving average"
          dataKey="ma_value"
          yAxisId="left"
          type="monotone"
          stroke="#d9d9d9"
          strokeWidth="1"
          dot={
            <CustomDot
              cx={0}
              cy={0}
              value={0}
              payload={{
                timestamp: "",
                price: 0,
                ma_value: 0,
                visibleDot: false,
              }}
            />
          }
          activeDot={{
            fill: "transparent",
            stroke: "#36cfc9",
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
