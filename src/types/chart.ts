export type ChartPoint = {
  timestamp: string;
  price: number;
  ma_value: number;
};

export type JoinedPoint = {
  timestamp: number;
  fng: string;
  price: number;
};
