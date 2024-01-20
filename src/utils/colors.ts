export function getColor(value: number) {
  if (value >= 65) return "#389e0d";
  if (value >= 55) return "#bae637";
  if (value >= 45) return "#ffc53d";
  if (value >= 35) return "#ff7a45";
  if (value > 0) return "#cf1322";
  return "rgba(0, 0, 0, 0)";
}
