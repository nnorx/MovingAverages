import { ChartPoint } from "../types/chart";
import { getColor } from "../utils/colors";

type Props = {
  cx: number;
  cy: number;
  value: number;
  payload: ChartPoint;
};

export default function CustomDot({ cx, cy, value, payload }: Props) {
  if (value === 0) return null;
  if (payload.visibleDot == false) return null;
  const size = 10;

  return (
    <svg
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      fill={getColor(value)}
      viewBox="0 0 24 24"
    >
      <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" />
    </svg>
  );
}
