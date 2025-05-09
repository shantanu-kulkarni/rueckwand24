export function getRandomColor(index: number): string {
  const hue = (index * 47) % 360;
  return `hsla(${hue}, 70%, 80%, 0.75)`;
}
