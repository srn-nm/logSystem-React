import { useState, useEffect, useContext } from "react";
import DataContext from "../contexts/dataContext";
import axios from "axios";
import { RefreshButton } from "./RefreshButton";
import BarChart from "./MetricsBarChart";

interface MetricType {
  labels: Record<string, string>;
  value: number;
}

type Metrics = Record<string, MetricType[]>;

export default function MetricsDashboard() {
  const context = useContext(DataContext);
  const searchInput = context?.searchInput || "";
  type StatusType = "" | "2xx" | "3xx" | "4xx" | "5xx"; 
  type MethodType = "" | "OPTIONS" | "GET" | "POST" | "PATCH" | "PUT" | "DELETE"; 

  const [metrics, setMetrics] = useState<Metrics>({});
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("");
  const [selectedMethod, setSelectedMethod] = useState<MethodType>("");

  async function fetchMetrics() {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));

    // try {
    //   // using hardcoded data for testing
    //   const parsedToJSON = parseMetrics(hardCodedMetricData);
    //   setMetrics(parsedToJSON);
      
    //   // selecting metric when reloaded
    //   if (!selectedMetric) {
    //     const firstMetric = Object.keys(parsedToJSON)[0];
    //     if (firstMetric) {
    //       setSelectedMetric(firstMetric);
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // } finally {
    //   setLoading(false);
    // }

    try {
      const res = await axios.get("http://172.16.20.173/metrics");
      
      const parsedToJSON = parseMetrics(res.data);
      setMetrics(parsedToJSON);
      if (!selectedMetric) {
        const firstMetric = Object.keys(parsedToJSON)[0];
        if (firstMetric) {
          setSelectedMetric(firstMetric);
        }
      }
      
    } catch(error) {
      console.error("error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetrics();
  }, []);
  
  function titleCase(str: string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
  }

  function parseMetrics(text: string): Metrics {
    const lines = text.split("\n");
    const metrics: Metrics = {};

    for (const line of lines) {
      if (line.startsWith("#") || line.trim() === "" || line.includes("python")) continue;

      const [metricPart, valuePart] = line.split(" ");
      if (!metricPart || !valuePart) continue;

      const match = metricPart.match(/^([^{]+){?(.*?)}?$/);

      if (!match) continue;

      let name = match[1].replaceAll("_"," ");
      name = titleCase(name);
      const labelsString = match[2];
      
      labelsString.charAt(match[2].length + 1) == ""
      const labels: Record<string, string> = {};

      if (labelsString) {
        labelsString.split(",").forEach(pair => {
          const [key, val] = pair.split("=");
          if (key && val) labels[key] = val
        });
      }

      if (!metrics[name]) metrics[name] = [];
      metrics[name].push({ labels, value: parseFloat(valuePart) });
    }
    return metrics;
  }

  // getting available labels for the selected metric
  const getAvailableLabels = () => {
    if (!selectedMetric || !metrics[selectedMetric]) {
        return { hasStatus: false, hasMethod: false, statuses: [], methods: [] };
      }

      const statuses = [...new Set(
        metrics[selectedMetric]
          .map(metric => metric.labels.status)
          .filter(Boolean)
      )];

      const methods = [...new Set(
        metrics[selectedMetric]
          .map(metric => metric.labels.method)
          .filter(Boolean)
      )];

      return {
        hasStatus: statuses.length > 0,
        hasMethod: methods.length > 0,
        statuses,
        methods
      };
  };

  const availableLabels = getAvailableLabels();

  // to filter the selected metric data based on status and method and searchinput
  const getFilteredMetricData = (): MetricType[] => {

    if (!selectedMetric || !metrics[selectedMetric]) {
      return [];
    }
    return metrics[selectedMetric].filter(metric => {

      if (selectedStatus && metric.labels.status !== selectedStatus) return false;
      if (selectedMethod && metric.labels.method !== selectedMethod) return false;
      if (searchInput) {
        const hasMatchingLabel = Object.values(metric.labels).some(value =>
          value.toLowerCase().includes(searchInput.toLowerCase())
        );
        if (!hasMatchingLabel) return false;
      }
      return true;
    });
  };

  const filteredMetricData = getFilteredMetricData();

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors min-h-screen">
      <div className="p-7">
        {/*Header*/}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 ml-2">
              Metrics Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">

            {/*Refresh Button*/}
            <RefreshButton 
              onRefresh={fetchMetrics} 
              loading={loading}
              tooltipTitle="Refresh Metrics Data"
            />

            {/*Metric Selector*/}
            <select 
              value={selectedMetric}
              onChange={(e) => {
                setSelectedMetric(e.target.value);
                setSelectedStatus("");
                setSelectedMethod("");
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Select Metric...</option>
              {Object.keys(metrics).map(metricName => (
                <option key={metricName} value={metricName}>
                  {metricName}
                </option>
              ))}
            </select>  

            {/*Status Selector*/}
            {availableLabels.hasStatus && (
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as StatusType)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">All Statuses</option>
                {availableLabels.statuses.map(status => (
                  <option key={status} value={status}>
                    {status.replaceAll("\"","")}
                  </option>
                ))}
              </select>
            )}

            {/*Method Selector*/}
            {availableLabels.hasMethod && (
              <select 
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value as MethodType)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">All Methods</option>
                {availableLabels.methods.map(method => (
                  <option key={method} value={method}>
                    {method.replaceAll("\"","")}
                  </option>
                ))}
              </select>
            )}  
          </div>
        </div>

        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-165">
              <div className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  <div className="flex items-center justify-center h-150">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                </h3>
              </div>
          </div>
        )}

        {!loading && Object.keys(metrics).length > 0 && (
          <>
            {selectedMetric && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                {filteredMetricData.length > 0 ? (
                  <BarChart 
                    metricName={selectedMetric} 
                    metricData={filteredMetricData} 
                  />
                ) : (
                  <div className="p-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No data found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No metrics match your current filters and search.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!selectedMetric && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Select a metric to view its chart
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose from the dropdown menu above
                </p>
              </div>
            )}
          </>
        )}

        {!loading && Object.keys(metrics).length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No metrics data available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try refreshing the metrics or check your data source
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// final json format:
// {
//   "http_requests_total": [
//     { "labels": { "handler": "/api/v1/datas/calc/{id}", "method": "GET", "status": "2xx" }, "value": 5033 },
//     { "labels": { "handler": "/api/v1/datas/calc/{id}", "method": "GET", "status": "5xx" }, "value": 2 }
//   ]
// }