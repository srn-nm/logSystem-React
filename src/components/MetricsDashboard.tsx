// needs to be completed

import axios from "axios";
import { useState, useEffect } from "react";

interface MetricType {
  labels: Record<string, string>;
  value: number;
}

type Metrics = Record<string, MetricType[]>;

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({});
  const [loading, setLoading] = useState(false);

  async function fetchMetrics() {
    setLoading(true);
    try {
        const res = await axios.get("http://172.16.20.173/metrics", 
            {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    );
    
        const parsedToJSON = parseMetrics(res.data);  // does is need to be parsed to text or what??
        setMetrics(parsedToJSON);
        console.log("fetching data from metrics successful. " + parsedToJSON)
    
    } catch(error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  function parseMetrics(text: string): Metrics {
    const lines = text.split("\n");
    const metrics: Metrics = {};

    for (const line of lines) {
      if (line.startsWith("#") || line.trim() === "") continue;

      const [metricPart, valuePart] = line.split(" ");
      if (!metricPart || !valuePart) continue;

      const match = metricPart.match(/^([^{]+){?(.*)}?$/);
      if (!match) continue;

      const name = match[1];
      const labelsString = match[2];
      const labels: Record<string, string> = {};

      if (labelsString) {
        labelsString.split(",").forEach(pair => {
          const [key, val] = pair.split("=");
          if (key && val) labels[key] = val.replace(/"/g, "");
        });
      }

      if (!metrics[name]) metrics[name] = [];
      metrics[name].push({ labels, value: parseFloat(valuePart) });
    }
    return metrics;
  }

  return (
    <>

    </>
  )
  ;
}

// final json format:
// {
//   "python_gc_objects_collected_total": [
//     { "labels": { "generation": "0" }, "value": 1332970 },
//     { "labels": { "generation": "1" }, "value": 494797 },
//     { "labels": { "generation": "2" }, "value": 940529 }
//   ],
//   "http_requests_total": [
//     { "labels": { "handler": "/api/v1/datas/calc/{id}", "method": "GET", "status": "2xx" }, "value": 5033 },
//     { "labels": { "handler": "/api/v1/datas/calc/{id}", "method": "GET", "status": "5xx" }, "value": 2 }
//   ]
// }