export function getClassification(value: number) {
  if (value >= 65) return "Extreme Greed";
  if (value >= 55) return "Greed";
  if (value >= 45) return "Neutral";
  if (value >= 35) return "Fear";
  if (value >= 0) return "Extreme Fear";
}
