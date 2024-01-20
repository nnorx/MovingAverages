export type FngPoint = {
  value: string;
  ma_value?: number;
  value_classification?: string;
  timestamp: string;
  time_until_update?: string;
  price?: number;
};

export type PricePoint = [timestamp: number, price: number];
