import axios from "axios";

export type FngPoint = {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update?: string;
};

const getFng = {
  queryKey: ["getFnG"],
  queryFn: (): Promise<FngPoint[]> =>
    axios
      .get("https://api.alternative.me/fng/?limit=0&date_format=us")
      .then((res) => res.data.data.reverse()),
};

export default getFng;
