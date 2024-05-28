import { useState, useEffect, useMemo, useContext } from "react";
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

import CustomDot from "./customDot";
import { ChartPoint, JoinedPoint } from "../types/chart";
import { useQuery } from "@tanstack/react-query";
import getFng from "../api/getFnG";
import getPrice from "../api/getPrice";
import { chartSettingsContext, smaContext } from "../utils/context";

dayjs.extend(utc);

export default function Chart() {
  const { data: dataFng } = useQuery(getFng);
  const { data: dataPrice } = useQuery(getPrice);

  const [joinedData, setJoinedData] = useState<JoinedPoint[]>([]);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const { sma } = useContext(smaContext);
  const { chartSettings } = useContext(chartSettingsContext);

  const formatXAxis = useMemo(
    () => (tick: string) => {
      const date = dayjs(tick, "MM-DD-YYYY");
      return date.format("MMM/DD/YY");
    },
    []
  );

  const formatYAxis = useMemo(
    () => (tick: string) => Math.floor(Number(tick)).toString(),
    []
  );

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
          visibleDot: true,
        });
      });

      if (chartSettings.scaleToFit) {
        const start = chartArr[sma].ma_value;
        for (let i = 0; i < sma; i++) {
          chartArr[i].ma_value = start;
        }
      }

      setChartData(chartArr);
    }
  }, [joinedData, sma, chartSettings.scaleToFit]);

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
          animationDuration={100}
        />
        <Line
          name="moving average"
          dataKey="ma_value"
          yAxisId="left"
          type="monotone"
          stroke="#d9d9d9"
          strokeWidth="1"
          animationDuration={100}
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
          domain={
            chartSettings.scaleToFit
              ? [
                  Math.min(
                    ...chartData
                      .filter((x) => x.ma_value !== 0)
                      .map((obj) => obj.ma_value)
                  ),
                  Math.floor(Math.max(...chartData.map((obj) => obj.ma_value))),
                ]
              : [0, 100]
          }
          tickCount={11}
          tickFormatter={chartSettings.scaleToFit ? formatYAxis : undefined}
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
            backgroundColor: "rgba(136, 132, 216, 0.25)",
            border: "1px solid rgba(204, 204, 204, 0.25)",
            color: "rgba(237, 242, 244, 0.75)",
          }}
          position={{ x: 55, y: 55 }}
          itemStyle={{ color: "#EDF2F4" }}
          cursor={false}
        />
        <Legend verticalAlign="top" height={36} wrapperStyle={{ top: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
