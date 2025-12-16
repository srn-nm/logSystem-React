import { RefreshButton } from "./RefreshButton";
import type { StatusType, MethodType } from "./MetricsDashboard";
import { useState, useMemo } from "react";
import MetricSelector from "./MetricSelector";
import MethodSelector from "./MethodSelector";
import StatusSelector from "./StatusSelector";

interface MetricsHeaderProps {
  metrics: Record<string, any[]>;
  selectedMetric: string;
  selectedStatus: string;
  selectedMethod: string;
  availableLabels: {
    hasStatus: boolean;
    hasMethod: boolean;
    statuses: string[];
    methods: string[];
  };
  loading: boolean;
  onMetricChange: (value: string) => void;
  onStatusChange: (value: StatusType) => void;
  onMethodChange: (value: MethodType) => void;
  onRefresh: () => void;
}

export default function MetricsHeader({metrics, selectedMetric, selectedStatus, selectedMethod, availableLabels, loading, onMetricChange, onStatusChange, onMethodChange, onRefresh}: MetricsHeaderProps) {

  return (
    <div>
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 ml-2">
          Metrics Dashboard
        </h1>
        
        <div className="flex items-center gap-4">
          <RefreshButton onRefresh={onRefresh} loading={loading}tooltipTitle="Refresh Metrics Data"/>

          <MetricSelector metrics={metrics} onMetricChange={onMetricChange} selectedMetric={selectedMetric}/>

          {availableLabels.hasStatus && (
            <StatusSelector selectedStatus={selectedStatus} onStatusChange={onStatusChange} availableLabels={availableLabels}metrics={metrics}/>
          )}

          {availableLabels.hasMethod && (
            <MethodSelector onMethodChange={onMethodChange} selectedMethod={selectedMethod}availableLabels={availableLabels}metrics={metrics}/>
          )}  
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden mb-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Metrics Dashboard
          </h1>
          
          <div className="flex items-center gap-2">
            <RefreshButton onRefresh={onRefresh} loading={loading}tooltipTitle="Refresh Metrics Data"/>
          </div>
        </div>

          <MetricSelector metrics={metrics} onMetricChange={onMetricChange} selectedMetric={selectedMetric}/>

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
            {availableLabels.hasStatus && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <StatusSelector selectedStatus={selectedStatus} onStatusChange={onStatusChange} availableLabels={availableLabels}metrics={metrics}/>
              </div>
            )}

            {availableLabels.hasMethod && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Method</label>
                <MethodSelector onMethodChange={onMethodChange} selectedMethod={selectedMethod}availableLabels={availableLabels}metrics={metrics}/>
              </div>
            )}
          </div>
        
      </div>
    </div>
  );
}