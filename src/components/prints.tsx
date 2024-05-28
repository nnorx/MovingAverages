import Print from "./print";
import { useQuery } from "@tanstack/react-query";
import getFng from "../api/getFnG";

export default function Prints() {
  const { data: dataFng, status } = useQuery(getFng);

  if (status === "pending" || !dataFng) {
    return <div>Loading...</div>;
  }

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
