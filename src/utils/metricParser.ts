interface MetricType {
  labels: Record<string, string>;
  value: number;
}

type Metrics = Record<string, MetricType[]>;

export function titleCase(str: string): string {
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

export function parseMetrics(text: string): Metrics {
  const lines = text.split("\n");
  const metrics: Metrics = {};

  for (const line of lines) {
    if (line.startsWith("#") || line.trim() === "" || line.includes("python")) {
      continue;
    }

    const [metricPart, valuePart] = line.split(" ");
    if (!metricPart || !valuePart) continue;

    const match = metricPart.match(/^([^{]+){?(.*?)}?$/);
    if (!match) continue;

    let name = match[1].replaceAll("_", " ");
    name = titleCase(name);
    const labelsString = match[2];
    const labels: Record<string, string> = {};

    if (labelsString) {
      labelsString.split(",").forEach(pair => {
        const [key, val] = pair.split("=");
        if (key && val) {
          labels[key] = val.replace(/"/g, ""); 
        }
      });
    }

    if (!metrics[name]) metrics[name] = [];
    metrics[name].push({ labels, value: parseFloat(valuePart) });
  }
  
  return metrics;
}