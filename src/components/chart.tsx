import { useState, useEffect, useContext } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";
import { smaContext } from "../App";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import moment from "moment";

type dataPoint = {
  value: string;
  ma_value?: number;
  value_classification?: string;
  timestamp: string;
  time_until_update?: string;
  price?: number;
};

export default function Chart() {
  const [dataFng, setDataFng] = useState<dataPoint[]>([]);
  const [dataPrice, setDataPrice] = useState<any[]>([]);

  const [key, setKey] = useState<any>(null);

  const { sma } = useContext(smaContext);
  const { height, width } = useWindowDimensions();
  const [points, setPoints] = useState<dataPoint[]>([]);

  const formatXAxis = (tick: string) => {
    let date = moment(tick, "MM-DD-YYYY");
    return date.format("MMM/DD/YY");
  };

  const calcHeight = (height: number, width: number) => {
    if (width > 599) {
      return height - 64;
    } else {
      return height - 56;
    }
  };

  async function fetchFNG() {
    let res = await axios.get(
      `https://api.alternative.me/fng/?limit=0&date_format=us`
    );
    setDataFng(res.data.data.reverse());
  }

  async function fetchPrices() {
    let res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1517443200&to=1656028800`
    );
    setDataPrice(res.data.prices);
  }

  useEffect(() => {
    fetchFNG();
    fetchPrices();
  }, []);

  useEffect(() => {
    if (dataFng.length > 0 && dataPrice.length > 0) {
      var dataArr: Array<dataPoint> = [...dataFng];

      // Calculate moving averages
      for (let i = sma - 1; i < dataArr.length; i++) {
        let sum: number = 0;
        for (let q = 0; q < sma; q++) {
          sum = sum + parseInt(dataArr[i - q].value);
        }
        dataArr[i].ma_value = Math.floor(sum / sma);
      }

      // Clear stale ma_values
      for (let i = 0; i < sma; i++) {
        dataArr[i].ma_value = 0;
      }

      var dataArr2 = [...dataPrice];
      console.log(dataArr2);
      for (let i = 0; i < dataArr.length - 2; i++) {
        console.log(i);
        dataArr[i].price = Math.trunc(dataArr2[i][1]);
      }
      setPoints(dataArr);
    }
  }, [sma, dataFng, dataPrice]);

  return (
    <div>
      <LineChart
        data={points}
        margin={{ top: 12, right: -45, left: -24, bottom: 3 }}
        width={width}
        height={calcHeight(height, width)}
      >
        <CartesianGrid strokeDasharray="5 10" strokeOpacity=".14" />
        <Line
          name="price"
          dataKey="price"
          yAxisId="right"
          type="monotone"
          stroke="#8884d8"
          strokeWidth="3"
          dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 0.5 }}
          activeDot={{
            fill: "#2e4355",
            stroke: "#DADFF7",
            strokeWidth: 5,
            r: 1,
          }}
        />
        <Line
          name="moving average"
          dataKey="ma_value"
          yAxisId="left"
          type="monotone"
          stroke="#BBE5ED"
          strokeWidth="4"
          dot={{ fill: "#2e4355", stroke: "#BBE5ED", strokeWidth: 2, r: 0.5 }}
          activeDot={{
            fill: "#2e4355",
            stroke: "#DADFF7",
            strokeWidth: 5,
            r: 1,
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
          axisLine={false}
          yAxisId="right"
          orientation="right"
          tickCount={0}
          stroke={"#EDF2F4"}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
          itemStyle={{ color: "#EDF2F4" }}
          cursor={false}
        />
        <Legend verticalAlign="top" height={36} />
      </LineChart>
    </div>
  );
}
