import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import DataContext from "../contexts/dataContext";
import BarChart from "./MetricsBarChart";
import LoadingTable from "./LoadingTable";
import NoMetricSelected from "./NoMetricSelected";
import NoDataAvailable from "./NoDataAvailable";
import NoFilteredDataFound from "./NoFilteredDataFound";
import MetricsHeader from "./MetricsHeader";
import { parseMetrics } from "../utils/metricParser"

interface MetricType {
  labels: Record<string, string>;
  value: number;
}

export type MethodType = "" | "OPTIONS" | "GET" | "POST" | "PATCH" | "PUT" | "DELETE"; 
export type StatusType = "" | "2xx" | "3xx" | "4xx" | "5xx"; 

type Metrics = Record<string, MetricType[]>;

const HARD_CODED_METRIC_DATA = `# HELP python_gc_objects_collected_total Objects collected during gc
# TYPE python_gc_objects_collected_total counter
python_gc_objects_collected_total{generation="0"} 1.33297e+06
python_gc_objects_collected_total{generation="1"} 494797.0
python_gc_objects_collected_total{generation="2"} 940529.0
# HELP python_gc_objects_uncollectable_total Uncollectable objects found during GC
# TYPE python_gc_objects_uncollectable_total counter
python_gc_objects_uncollectable_total{generation="0"} 0.0
python_gc_objects_uncollectable_total{generation="1"} 0.0
python_gc_objects_uncollectable_total{generation="2"} 0.0
# HELP python_gc_collections_total Number of times this generation was collected
# TYPE python_gc_collections_total counter
python_gc_collections_total{generation="0"} 15289.0
python_gc_collections_total{generation="1"} 1389.0
python_gc_collections_total{generation="2"} 81.0
# HELP python_info Python platform information
# TYPE python_info gauge
python_info{implementation="CPython",major="3",minor="12",patchlevel="8",version="3.12.8"} 1.0
# HELP http_requests_total Total number of requests by method, status and handler.
# TYPE http_requests_total counter
http_requests_total{handler="none",method="OPTIONS",status="2xx"} 3043.0
http_requests_total{handler="/api/v1/authentication/login/users/me",method="GET",status="2xx"} 333.0
http_requests_total{handler="/api/v1/dashboard/{app}",method="GET",status="2xx"} 335.0
http_requests_total{handler="/api/v1/schemas/{id}",method="GET",status="2xx"} 878.0
http_requests_total{handler="/api/v1/reports/schema/{id}",method="GET",status="2xx"} 149.0
http_requests_total{handler="/api/v1/datas/schema/{id}",method="GET",status="2xx"} 574.0
http_requests_total{handler="/api/v1/datas/schema/{id}/list",method="GET",status="2xx"} 728.0
http_requests_total{handler="/api/v1/datas/schema/{id}/ids",method="GET",status="2xx"} 1138.0
http_requests_total{handler="/api/v1/export_pdf/{report_id}",method="POST",status="2xx"} 27.0
http_requests_total{handler="/api/v1/datas/{id}",method="GET",status="2xx"} 142.0
http_requests_total{handler="/api/v1/dashboard",method="GET",status="3xx"} 80.0
http_requests_total{handler="/api/v1/dashboard/",method="GET",status="2xx"} 80.0
http_requests_total{handler="/docs",method="GET",status="2xx"} 21.0
http_requests_total{handler="/api/v1/openapi.json",method="GET",status="2xx"} 19.0
http_requests_total{handler="/api/v1/datas/calc/{id}",method="GET",status="2xx"} 5033.0
http_requests_total{handler="/api/v1/files/meta/{id}",method="GET",status="2xx"} 22.0
http_requests_total{handler="/api/v1/datas/datum/{id}",method="PATCH",status="2xx"} 17.0
http_requests_total{handler="/api/v1/datas/schema/{id}",method="POST",status="2xx"} 55.0
http_requests_total{handler="none",method="GET",status="4xx"} 10.0
http_requests_total{handler="/api/v1/types/currencies",method="GET",status="2xx"} 303.0
http_requests_total{handler="/api/v1/types/{base_type}",method="GET",status="2xx"} 1254.0
http_requests_total{handler="/api/v1/authentication/login/challenge",method="POST",status="2xx"} 29.0
http_requests_total{handler="/api/v1/authentication/login/challenge/{id}/totp",method="GET",status="2xx"} 6.0
http_requests_total{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",method="POST",status="2xx"} 15.0
http_requests_total{handler="/api/v1/authentication/login/access-token",method="POST",status="2xx"} 26.0
http_requests_total{handler="/api/v1/authentication/login/challenge/{id}/mobile",method="POST",status="2xx"} 12.0
http_requests_total{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",method="POST",status="2xx"} 11.0
http_requests_total{handler="/api/v1/reports",method="GET",status="2xx"} 18.0
http_requests_total{handler="/api/v1/reports/{id}",method="GET",status="2xx"} 19.0
http_requests_total{handler="/api/v1/schemas/list",method="GET",status="2xx"} 14.0
http_requests_total{handler="/api/v1/render-report/{schema_id}",method="POST",status="2xx"} 165.0
http_requests_total{handler="/api/v1/datas/{id}",method="GET",status="4xx"} 2.0
http_requests_total{handler="/api/v1/schemas/{id}",method="GET",status="4xx"} 7.0
http_requests_total{handler="/api/v1/reports/schema/{id}",method="GET",status="4xx"} 3.0
http_requests_total{handler="/api/v1/datas/schema/{id}",method="GET",status="4xx"} 7.0
http_requests_total{handler="/api/v1/render-report/{schema_id}",method="POST",status="4xx"} 10.0
http_requests_total{handler="/api/v1/reports/schema/{id}",method="POST",status="2xx"} 2.0
http_requests_total{handler="/api/v1/reports/{id}",method="PUT",status="2xx"} 5.0
http_requests_total{handler="/api/v1/authentication/login/challenge",method="POST",status="5xx"} 3.0
http_requests_total{handler="/metrics",method="GET",status="2xx"} 3.0
http_requests_total{handler="/api/v1/",method="GET",status="2xx"} 1.0
http_requests_total{handler="/api/v1/health",method="GET",status="2xx"} 1.0
http_requests_total{handler="/api/v1/ping",method="GET",status="5xx"} 1.0
http_requests_total{handler="/api/v1/datas/schema/{id}/calc",method="GET",status="5xx"} 2.0
http_requests_total{handler="/api/v1/dashboard/{app}",method="GET",status="4xx"} 1.0
http_requests_total{handler="/api/v1/datas/schema/{id}/calc",method="GET",status="2xx"} 13.0
http_requests_total{handler="/api/v1/authentication/login/challenge",method="POST",status="4xx"} 1.0
http_requests_total{handler="/api/v1/schemas/{id}/ref_keys",method="GET",status="4xx"} 1.0
http_requests_total{handler="/api/v1/schemas/{id}/ref_keys",method="GET",status="2xx"} 1.0
http_requests_total{handler="/api/v1/schemas/{id}/all_keys",method="GET",status="2xx"} 1.0
http_requests_total{handler="/api/v1/datas/{id}",method="DELETE",status="2xx"} 3.0
http_requests_total{handler="none",method="OPTIONS",status="4xx"} 1.0
http_requests_total{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",method="POST",status="4xx"} 1.0
http_requests_total{handler="/api/v1/export_pdf/{report_id}",method="POST",status="4xx"} 4.0
http_requests_total{handler="/api/v1/reports/{id}",method="DELETE",status="2xx"} 1.0
http_requests_total{handler="/api/v1/schemas/",method="GET",status="4xx"} 2.0
http_requests_total{handler="/api/v1/schemas/",method="GET",status="2xx"} 40.0
http_requests_total{handler="/api/v1/authentication/login/users/me",method="GET",status="4xx"} 1.0
http_requests_total{handler="/api/v1/datas/schema/{id}",method="POST",status="4xx"} 2.0
http_requests_total{handler="/api/v1/dashboard/",method="GET",status="4xx"} 1.0
# HELP http_requests_created Total number of requests by method, status and handler.
# TYPE http_requests_created gauge
http_requests_created{handler="none",method="OPTIONS",status="2xx"} 1.7615706676713789e+09
http_requests_created{handler="/api/v1/authentication/login/users/me",method="GET",status="2xx"} 1.7615706682762272e+09
http_requests_created{handler="/api/v1/dashboard/{app}",method="GET",status="2xx"} 1.7615706682797365e+09
http_requests_created{handler="/api/v1/schemas/{id}",method="GET",status="2xx"} 1.7615706718645976e+09
http_requests_created{handler="/api/v1/reports/schema/{id}",method="GET",status="2xx"} 1.7615706720857387e+09
http_requests_created{handler="/api/v1/datas/schema/{id}",method="GET",status="2xx"} 1.761570672694557e+09
http_requests_created{handler="/api/v1/datas/schema/{id}/list",method="GET",status="2xx"} 1.7615706729233396e+09
http_requests_created{handler="/api/v1/datas/schema/{id}/ids",method="GET",status="2xx"} 1.7615706746504095e+09
http_requests_created{handler="/api/v1/export_pdf/{report_id}",method="POST",status="2xx"} 1.7615706931041727e+09
http_requests_created{handler="/api/v1/datas/{id}",method="GET",status="2xx"} 1.7615707106449618e+09
http_requests_created{handler="/api/v1/dashboard",method="GET",status="3xx"} 1.7615716679411702e+09
http_requests_created{handler="/api/v1/dashboard/",method="GET",status="2xx"} 1.7615716681552842e+09
http_requests_created{handler="/docs",method="GET",status="2xx"} 1.761632615709429e+09
http_requests_created{handler="/api/v1/openapi.json",method="GET",status="2xx"} 1.7616326164507253e+09
http_requests_created{handler="/api/v1/datas/calc/{id}",method="GET",status="2xx"} 1.7616348764909415e+09
http_requests_created{handler="/api/v1/files/meta/{id}",method="GET",status="2xx"} 1.761634881618831e+09
http_requests_created{handler="/api/v1/datas/datum/{id}",method="PATCH",status="2xx"} 1.7616349291877217e+09
http_requests_created{handler="/api/v1/datas/schema/{id}",method="POST",status="2xx"} 1.7616353803558328e+09
http_requests_created{handler="none",method="GET",status="4xx"} 1.7616414748778045e+09
http_requests_created{handler="/api/v1/types/currencies",method="GET",status="2xx"} 1.761652089339669e+09
http_requests_created{handler="/api/v1/types/{base_type}",method="GET",status="2xx"} 1.761652089339669e+09
http_requests_created{handler="/api/v1/authentication/login/challenge",method="POST",status="2xx"} 1.7617156153018217e+09
http_requests_created{handler="/api/v1/authentication/login/challenge/{id}/totp",method="GET",status="2xx"} 1.7617156255361042e+09
http_requests_created{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",method="POST",status="2xx"} 1.7617156655990703e+09
http_requests_created{handler="/api/v1/authentication/login/access-token",method="POST",status="2xx"} 1.7617156694839323e+09
http_requests_created{handler="/api/v1/authentication/login/challenge/{id}/mobile",method="POST",status="2xx"} 1.761729395974041e+09
http_requests_created{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",method="POST",status="2xx"} 1.7617294100371432e+09
http_requests_created{handler="/api/v1/reports",method="GET",status="2xx"} 1.7617295022666554e+09
http_requests_created{handler="/api/v1/reports/{id}",method="GET",status="2xx"} 1.7617295081345518e+09
http_requests_created{handler="/api/v1/schemas/list",method="GET",status="2xx"} 1.7617295081345518e+09
http_requests_created{handler="/api/v1/render-report/{schema_id}",method="POST",status="2xx"} 1.7617295125383465e+09
http_requests_created{handler="/api/v1/datas/{id}",method="GET",status="4xx"} 1.7617304537140617e+09
http_requests_created{handler="/api/v1/schemas/{id}",method="GET",status="4xx"} 1.7617304577496834e+09
http_requests_created{handler="/api/v1/reports/schema/{id}",method="GET",status="4xx"} 1.7617304577496834e+09
http_requests_created{handler="/api/v1/datas/schema/{id}",method="GET",status="4xx"} 1.761730457780964e+09
http_requests_created{handler="/api/v1/render-report/{schema_id}",method="POST",status="4xx"} 1.7617346745227804e+09
http_requests_created{handler="/api/v1/reports/schema/{id}",method="POST",status="2xx"} 1.7617397011481934e+09
http_requests_created{handler="/api/v1/reports/{id}",method="PUT",status="2xx"} 1.7617401884109957e+09
http_requests_created{handler="/api/v1/authentication/login/challenge",method="POST",status="5xx"} 1.7619773741302683e+09
http_requests_created{handler="/metrics",method="GET",status="2xx"} 1.761998755504507e+09
http_requests_created{handler="/api/v1/",method="GET",status="2xx"} 1.761998797374084e+09
http_requests_created{handler="/api/v1/health",method="GET",status="2xx"} 1.761998801947058e+09
http_requests_created{handler="/api/v1/ping",method="GET",status="5xx"} 1.7619988123991427e+09
http_requests_created{handler="/api/v1/datas/schema/{id}/calc",method="GET",status="5xx"} 1.7621599567940352e+09
http_requests_created{handler="/api/v1/dashboard/{app}",method="GET",status="4xx"} 1.7621630626973093e+09
http_requests_created{handler="/api/v1/datas/schema/{id}/calc",method="GET",status="2xx"} 1.76216425390145e+09
http_requests_created{handler="/api/v1/authentication/login/challenge",method="POST",status="4xx"} 1.7621769019509907e+09
http_requests_created{handler="/api/v1/schemas/{id}/ref_keys",method="GET",status="4xx"} 1.7622351758737595e+09
http_requests_created{handler="/api/v1/schemas/{id}/ref_keys",method="GET",status="2xx"} 1.762235212313083e+09
http_requests_created{handler="/api/v1/schemas/{id}/all_keys",method="GET",status="2xx"} 1.762235301726929e+09
http_requests_created{handler="/api/v1/datas/{id}",method="DELETE",status="2xx"} 1.7623381522032278e+09
http_requests_created{handler="none",method="OPTIONS",status="4xx"} 1.762338492764559e+09
http_requests_created{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",method="POST",status="4xx"} 1.7623452726799803e+09
http_requests_created{handler="/api/v1/export_pdf/{report_id}",method="POST",status="4xx"} 1.7623460961761525e+09
http_requests_created{handler="/api/v1/reports/{id}",method="DELETE",status="2xx"} 1.7623535637506275e+09
http_requests_created{handler="/api/v1/schemas/",method="GET",status="4xx"} 1.762668464381682e+09
http_requests_created{handler="/api/v1/schemas/",method="GET",status="2xx"} 1.7626686391785734e+09
http_requests_created{handler="/api/v1/authentication/login/users/me",method="GET",status="4xx"} 1.7626829802282858e+09
http_requests_created{handler="/api/v1/datas/schema/{id}",method="POST",status="4xx"} 1.7629415406361313e+09
http_requests_created{handler="/api/v1/dashboard/",method="GET",status="4xx"} 1.7629452660352228e+09
# HELP http_request_size_bytes Content length of incoming requests by handler. Only value of header is respected. Otherwise ignored. No percentile calculated. 
# TYPE http_request_size_bytes summary
http_request_size_bytes_count{handler="none"} 3054.0
http_request_size_bytes_sum{handler="none"} 0.0
http_request_size_bytes_count{handler="/api/v1/authentication/login/users/me"} 334.0
http_request_size_bytes_sum{handler="/api/v1/authentication/login/users/me"} 0.0
http_request_size_bytes_count{handler="/api/v1/dashboard/{app}"} 336.0
http_request_size_bytes_sum{handler="/api/v1/dashboard/{app}"} 0.0
http_request_size_bytes_count{handler="/api/v1/schemas/{id}"} 885.0
http_request_size_bytes_sum{handler="/api/v1/schemas/{id}"} 0.0
http_request_size_bytes_count{handler="/api/v1/reports/schema/{id}"} 154.0
http_request_size_bytes_sum{handler="/api/v1/reports/schema/{id}"} 22630.0
http_request_size_bytes_count{handler="/api/v1/datas/schema/{id}"} 638.0
http_request_size_bytes_sum{handler="/api/v1/datas/schema/{id}"} 13749.0
http_request_size_bytes_count{handler="/api/v1/datas/schema/{id}/list"} 728.0
http_request_size_bytes_sum{handler="/api/v1/datas/schema/{id}/list"} 0.0
http_request_size_bytes_count{handler="/api/v1/datas/schema/{id}/ids"} 1138.0
http_request_size_bytes_sum{handler="/api/v1/datas/schema/{id}/ids"} 0.0
http_request_size_bytes_count{handler="/api/v1/export_pdf/{report_id}"} 31.0
http_request_size_bytes_sum{handler="/api/v1/export_pdf/{report_id}"} 563.0
http_request_size_bytes_count{handler="/api/v1/datas/{id}"} 147.0
http_request_size_bytes_sum{handler="/api/v1/datas/{id}"} 0.0
http_request_size_bytes_count{handler="/api/v1/dashboard"} 80.0
http_request_size_bytes_sum{handler="/api/v1/dashboard"} 0.0
http_request_size_bytes_count{handler="/api/v1/dashboard/"} 81.0
http_request_size_bytes_sum{handler="/api/v1/dashboard/"} 0.0
http_request_size_bytes_count{handler="/docs"} 21.0
http_request_size_bytes_sum{handler="/docs"} 0.0
http_request_size_bytes_count{handler="/api/v1/openapi.json"} 19.0
http_request_size_bytes_sum{handler="/api/v1/openapi.json"} 0.0
http_request_size_bytes_count{handler="/api/v1/datas/calc/{id}"} 5033.0
http_request_size_bytes_sum{handler="/api/v1/datas/calc/{id}"} 0.0
http_request_size_bytes_count{handler="/api/v1/files/meta/{id}"} 22.0
http_request_size_bytes_sum{handler="/api/v1/files/meta/{id}"} 0.0
http_request_size_bytes_count{handler="/api/v1/datas/datum/{id}"} 17.0
http_request_size_bytes_sum{handler="/api/v1/datas/datum/{id}"} 1563.0
http_request_size_bytes_count{handler="/api/v1/types/currencies"} 303.0
http_request_size_bytes_sum{handler="/api/v1/types/currencies"} 0.0
http_request_size_bytes_count{handler="/api/v1/types/{base_type}"} 1254.0
http_request_size_bytes_sum{handler="/api/v1/types/{base_type}"} 0.0
http_request_size_bytes_count{handler="/api/v1/authentication/login/challenge"} 33.0
http_request_size_bytes_sum{handler="/api/v1/authentication/login/challenge"} 2812.0
http_request_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/totp"} 6.0
http_request_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/totp"} 0.0
http_request_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/totp/verify"} 15.0
http_request_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/totp/verify"} 255.0
http_request_size_bytes_count{handler="/api/v1/authentication/login/access-token"} 26.0
http_request_size_bytes_sum{handler="/api/v1/authentication/login/access-token"} 50.0
http_request_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/mobile"} 12.0
http_request_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/mobile"} 495.0
http_request_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify"} 12.0
http_request_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify"} 183.0
http_request_size_bytes_count{handler="/api/v1/reports"} 18.0
http_request_size_bytes_sum{handler="/api/v1/reports"} 0.0
http_request_size_bytes_count{handler="/api/v1/reports/{id}"} 25.0
http_request_size_bytes_sum{handler="/api/v1/reports/{id}"} 60015.0
http_request_size_bytes_count{handler="/api/v1/schemas/list"} 14.0
http_request_size_bytes_sum{handler="/api/v1/schemas/list"} 0.0
http_request_size_bytes_count{handler="/api/v1/render-report/{schema_id}"} 175.0
http_request_size_bytes_sum{handler="/api/v1/render-report/{schema_id}"} 777585.0
http_request_size_bytes_count{handler="/metrics"} 3.0
http_request_size_bytes_sum{handler="/metrics"} 0.0
http_request_size_bytes_count{handler="/api/v1/"} 1.0
http_request_size_bytes_sum{handler="/api/v1/"} 0.0
http_request_size_bytes_count{handler="/api/v1/health"} 1.0
http_request_size_bytes_sum{handler="/api/v1/health"} 0.0
http_request_size_bytes_count{handler="/api/v1/ping"} 1.0
http_request_size_bytes_sum{handler="/api/v1/ping"} 0.0
http_request_size_bytes_count{handler="/api/v1/datas/schema/{id}/calc"} 15.0
http_request_size_bytes_sum{handler="/api/v1/datas/schema/{id}/calc"} 0.0
http_request_size_bytes_count{handler="/api/v1/schemas/{id}/ref_keys"} 2.0
http_request_size_bytes_sum{handler="/api/v1/schemas/{id}/ref_keys"} 0.0
http_request_size_bytes_count{handler="/api/v1/schemas/{id}/all_keys"} 1.0
http_request_size_bytes_sum{handler="/api/v1/schemas/{id}/all_keys"} 0.0
http_request_size_bytes_count{handler="/api/v1/schemas/"} 42.0
http_request_size_bytes_sum{handler="/api/v1/schemas/"} 0.0
# HELP http_request_size_bytes_created Content length of incoming requests by handler. Only value of header is respected. Otherwise ignored. No percentile calculated. 
# TYPE http_request_size_bytes_created gauge
http_request_size_bytes_created{handler="none"} 1.7615706676713789e+09
http_request_size_bytes_created{handler="/api/v1/authentication/login/users/me"} 1.7615706682762272e+09
http_request_size_bytes_created{handler="/api/v1/dashboard/{app}"} 1.7615706682797365e+09
http_request_size_bytes_created{handler="/api/v1/schemas/{id}"} 1.7615706718645976e+09
http_request_size_bytes_created{handler="/api/v1/reports/schema/{id}"} 1.7615706720857387e+09
http_request_size_bytes_created{handler="/api/v1/datas/schema/{id}"} 1.761570672694557e+09
http_request_size_bytes_created{handler="/api/v1/datas/schema/{id}/list"} 1.7615706729233396e+09
http_request_size_bytes_created{handler="/api/v1/datas/schema/{id}/ids"} 1.7615706746504095e+09
http_request_size_bytes_created{handler="/api/v1/export_pdf/{report_id}"} 1.7615706931041727e+09
http_request_size_bytes_created{handler="/api/v1/datas/{id}"} 1.7615707106449618e+09
http_request_size_bytes_created{handler="/api/v1/dashboard"} 1.7615716679411702e+09
http_request_size_bytes_created{handler="/api/v1/dashboard/"} 1.7615716681552842e+09
http_request_size_bytes_created{handler="/docs"} 1.761632615709429e+09
http_request_size_bytes_created{handler="/api/v1/openapi.json"} 1.7616326164507253e+09
http_request_size_bytes_created{handler="/api/v1/datas/calc/{id}"} 1.7616348764909415e+09
http_request_size_bytes_created{handler="/api/v1/files/meta/{id}"} 1.761634881618831e+09
http_request_size_bytes_created{handler="/api/v1/datas/datum/{id}"} 1.7616349291877217e+09
http_request_size_bytes_created{handler="/api/v1/types/currencies"} 1.761652089339669e+09
http_request_size_bytes_created{handler="/api/v1/types/{base_type}"} 1.761652089339669e+09
http_request_size_bytes_created{handler="/api/v1/authentication/login/challenge"} 1.7617156153018217e+09
http_request_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/totp"} 1.7617156255361042e+09
http_request_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/totp/verify"} 1.7617156655990703e+09
http_request_size_bytes_created{handler="/api/v1/authentication/login/access-token"} 1.7617156694839323e+09
http_request_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/mobile"} 1.761729395974041e+09
http_request_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify"} 1.7617294100371432e+09
http_request_size_bytes_created{handler="/api/v1/reports"} 1.7617295022666554e+09
http_request_size_bytes_created{handler="/api/v1/reports/{id}"} 1.7617295081345518e+09
http_request_size_bytes_created{handler="/api/v1/schemas/list"} 1.7617295081345518e+09
http_request_size_bytes_created{handler="/api/v1/render-report/{schema_id}"} 1.7617295125383465e+09
http_request_size_bytes_created{handler="/metrics"} 1.7619987555055056e+09
http_request_size_bytes_created{handler="/api/v1/"} 1.761998797374084e+09
http_request_size_bytes_created{handler="/api/v1/health"} 1.761998801947058e+09
http_request_size_bytes_created{handler="/api/v1/ping"} 1.7619988123991427e+09
http_request_size_bytes_created{handler="/api/v1/datas/schema/{id}/calc"} 1.7621599567940352e+09
http_request_size_bytes_created{handler="/api/v1/schemas/{id}/ref_keys"} 1.7622351758737595e+09
http_request_size_bytes_created{handler="/api/v1/schemas/{id}/all_keys"} 1.762235301726929e+09
http_request_size_bytes_created{handler="/api/v1/schemas/"} 1.762668464381682e+09
# HELP http_response_size_bytes Content length of outgoing responses by handler. Only value of header is respected. Otherwise ignored. No percentile calculated. 
# TYPE http_response_size_bytes summary
http_response_size_bytes_count{handler="none"} 3054.0
http_response_size_bytes_sum{handler="none"} 6328.0
http_response_size_bytes_count{handler="/api/v1/authentication/login/users/me"} 334.0
http_response_size_bytes_sum{handler="/api/v1/authentication/login/users/me"} 90801.0
http_response_size_bytes_count{handler="/api/v1/dashboard/{app}"} 336.0
http_response_size_bytes_sum{handler="/api/v1/dashboard/{app}"} 459165.0
http_response_size_bytes_count{handler="/api/v1/schemas/{id}"} 885.0
http_response_size_bytes_sum{handler="/api/v1/schemas/{id}"} 7.040958e+06
http_response_size_bytes_count{handler="/api/v1/reports/schema/{id}"} 154.0
http_response_size_bytes_sum{handler="/api/v1/reports/schema/{id}"} 39831.0
http_response_size_bytes_count{handler="/api/v1/datas/schema/{id}"} 638.0
http_response_size_bytes_sum{handler="/api/v1/datas/schema/{id}"} 2.22204049e+08
http_response_size_bytes_count{handler="/api/v1/datas/schema/{id}/list"} 728.0
http_response_size_bytes_sum{handler="/api/v1/datas/schema/{id}/list"} 2.7893139e+07
http_response_size_bytes_count{handler="/api/v1/datas/schema/{id}/ids"} 1138.0
http_response_size_bytes_sum{handler="/api/v1/datas/schema/{id}/ids"} 1.087744e+06
http_response_size_bytes_count{handler="/api/v1/export_pdf/{report_id}"} 31.0
http_response_size_bytes_sum{handler="/api/v1/export_pdf/{report_id}"} 256.0
http_response_size_bytes_count{handler="/api/v1/datas/{id}"} 147.0
http_response_size_bytes_sum{handler="/api/v1/datas/{id}"} 1.003554e+06
http_response_size_bytes_count{handler="/api/v1/dashboard"} 80.0
http_response_size_bytes_sum{handler="/api/v1/dashboard"} 0.0
http_response_size_bytes_count{handler="/api/v1/dashboard/"} 81.0
http_response_size_bytes_sum{handler="/api/v1/dashboard/"} 12134.0
http_response_size_bytes_count{handler="/docs"} 21.0
http_response_size_bytes_sum{handler="/docs"} 19761.0
http_response_size_bytes_count{handler="/api/v1/openapi.json"} 19.0
http_response_size_bytes_sum{handler="/api/v1/openapi.json"} 1.395227e+06
http_response_size_bytes_count{handler="/api/v1/datas/calc/{id}"} 5033.0
http_response_size_bytes_sum{handler="/api/v1/datas/calc/{id}"} 3.600494e+06
http_response_size_bytes_count{handler="/api/v1/files/meta/{id}"} 22.0
http_response_size_bytes_sum{handler="/api/v1/files/meta/{id}"} 4516.0
http_response_size_bytes_count{handler="/api/v1/datas/datum/{id}"} 17.0
http_response_size_bytes_sum{handler="/api/v1/datas/datum/{id}"} 8282.0
http_response_size_bytes_count{handler="/api/v1/types/currencies"} 303.0
http_response_size_bytes_sum{handler="/api/v1/types/currencies"} 55146.0
http_response_size_bytes_count{handler="/api/v1/types/{base_type}"} 1254.0
http_response_size_bytes_sum{handler="/api/v1/types/{base_type}"} 488996.0
http_response_size_bytes_count{handler="/api/v1/authentication/login/challenge"} 33.0
http_response_size_bytes_sum{handler="/api/v1/authentication/login/challenge"} 1935.0
http_response_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/totp"} 6.0
http_response_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/totp"} 4542.0
http_response_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/totp/verify"} 15.0
http_response_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/totp/verify"} 585.0
http_response_size_bytes_count{handler="/api/v1/authentication/login/access-token"} 26.0
http_response_size_bytes_sum{handler="/api/v1/authentication/login/access-token"} 19560.0
http_response_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/mobile"} 12.0
http_response_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/mobile"} 1080.0
http_response_size_bytes_count{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify"} 12.0
http_response_size_bytes_sum{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify"} 486.0
http_response_size_bytes_count{handler="/api/v1/reports"} 18.0
http_response_size_bytes_sum{handler="/api/v1/reports"} 1.834605e+06
http_response_size_bytes_count{handler="/api/v1/reports/{id}"} 25.0
http_response_size_bytes_sum{handler="/api/v1/reports/{id}"} 259444.0
http_response_size_bytes_count{handler="/api/v1/schemas/list"} 14.0
http_response_size_bytes_sum{handler="/api/v1/schemas/list"} 161000.0
http_response_size_bytes_count{handler="/api/v1/render-report/{schema_id}"} 175.0
http_response_size_bytes_sum{handler="/api/v1/render-report/{schema_id}"} 5.778169e+06
http_response_size_bytes_count{handler="/metrics"} 3.0
http_response_size_bytes_sum{handler="/metrics"} 165896.0
http_response_size_bytes_count{handler="/api/v1/"} 1.0
http_response_size_bytes_sum{handler="/api/v1/"} 29.0
http_response_size_bytes_count{handler="/api/v1/health"} 1.0
http_response_size_bytes_sum{handler="/api/v1/health"} 15.0
http_response_size_bytes_count{handler="/api/v1/ping"} 1.0
http_response_size_bytes_sum{handler="/api/v1/ping"} 0.0
http_response_size_bytes_count{handler="/api/v1/datas/schema/{id}/calc"} 15.0
http_response_size_bytes_sum{handler="/api/v1/datas/schema/{id}/calc"} 169209.0
http_response_size_bytes_count{handler="/api/v1/schemas/{id}/ref_keys"} 2.0
http_response_size_bytes_sum{handler="/api/v1/schemas/{id}/ref_keys"} 267.0
http_response_size_bytes_count{handler="/api/v1/schemas/{id}/all_keys"} 1.0
http_response_size_bytes_sum{handler="/api/v1/schemas/{id}/all_keys"} 1231.0
http_response_size_bytes_count{handler="/api/v1/schemas/"} 42.0
http_response_size_bytes_sum{handler="/api/v1/schemas/"} 6.670741e+06
# HELP http_response_size_bytes_created Content length of outgoing responses by handler. Only value of header is respected. Otherwise ignored. No percentile calculated. 
# TYPE http_response_size_bytes_created gauge
http_response_size_bytes_created{handler="none"} 1.7615706676713789e+09
http_response_size_bytes_created{handler="/api/v1/authentication/login/users/me"} 1.7615706682762272e+09
http_response_size_bytes_created{handler="/api/v1/dashboard/{app}"} 1.7615706682797365e+09
http_response_size_bytes_created{handler="/api/v1/schemas/{id}"} 1.7615706718645976e+09
http_response_size_bytes_created{handler="/api/v1/reports/schema/{id}"} 1.7615706720857387e+09
http_response_size_bytes_created{handler="/api/v1/datas/schema/{id}"} 1.761570672694557e+09
http_response_size_bytes_created{handler="/api/v1/datas/schema/{id}/list"} 1.7615706729233396e+09
http_response_size_bytes_created{handler="/api/v1/datas/schema/{id}/ids"} 1.7615706746504095e+09
http_response_size_bytes_created{handler="/api/v1/export_pdf/{report_id}"} 1.7615706931041727e+09
http_response_size_bytes_created{handler="/api/v1/datas/{id}"} 1.7615707106449618e+09
http_response_size_bytes_created{handler="/api/v1/dashboard"} 1.7615716679411702e+09
http_response_size_bytes_created{handler="/api/v1/dashboard/"} 1.7615716681552842e+09
http_response_size_bytes_created{handler="/docs"} 1.761632615709429e+09
http_response_size_bytes_created{handler="/api/v1/openapi.json"} 1.7616326164507253e+09
http_response_size_bytes_created{handler="/api/v1/datas/calc/{id}"} 1.7616348764909415e+09
http_response_size_bytes_created{handler="/api/v1/files/meta/{id}"} 1.761634881618831e+09
http_response_size_bytes_created{handler="/api/v1/datas/datum/{id}"} 1.7616349291877217e+09
http_response_size_bytes_created{handler="/api/v1/types/currencies"} 1.761652089339669e+09
http_response_size_bytes_created{handler="/api/v1/types/{base_type}"} 1.761652089339669e+09
http_response_size_bytes_created{handler="/api/v1/authentication/login/challenge"} 1.7617156153018217e+09
http_request_duration_seconds_created{handler="/api/v1/authentication/login/challenge/{id}/mobile",method="POST"} 1.761729395989651e+09
http_request_duration_seconds_created{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",method="POST"} 1.7617294100371432e+09
http_request_duration_seconds_created{handler="/api/v1/reports",method="GET"} 1.7617295022666554e+09
http_request_duration_seconds_created{handler="/api/v1/reports/{id}",method="GET"} 1.7617295081345518e+09
http_request_duration_seconds_created{handler="/api/v1/schemas/list",method="GET"} 1.7617295081345518e+09
http_request_duration_seconds_created{handler="/api/v1/render-report/{schema_id}",method="POST"} 1.7617295125383465e+09
http_request_duration_seconds_created{handler="/api/v1/reports/schema/{id}",method="POST"} 1.7617397011481934e+09
http_request_duration_seconds_created{handler="/api/v1/reports/{id}",method="PUT"} 1.7617401884109957e+09
http_request_duration_seconds_created{handler="/metrics",method="GET"} 1.7619987555055056e+09
http_request_duration_seconds_created{handler="/api/v1/",method="GET"} 1.761998797374084e+09
http_request_duration_seconds_created{handler="/api/v1/health",method="GET"} 1.761998801947058e+09
http_request_duration_seconds_created{handler="/api/v1/ping",method="GET"} 1.7619988123991427e+09
http_request_duration_seconds_created{handler="/api/v1/datas/schema/{id}/calc",method="GET"} 1.7621599567940352e+09
http_request_duration_seconds_created{handler="/api/v1/schemas/{id}/ref_keys",method="GET"} 1.7622351758737595e+09
http_request_duration_seconds_created{handler="/api/v1/schemas/{id}/all_keys",method="GET"} 1.762235301726929e+09
http_request_duration_seconds_created{handler="/api/v1/datas/{id}",method="DELETE"} 1.7623381522032278e+09
http_request_duration_seconds_created{handler="/api/v1/reports/{id}",method="DELETE"} 1.7623535637506275e+09
  http_request_duration_seconds_created{handler="/api/v1/schemas/",method="GET"} 1.762668464381682e+09`;

export default function MetricsDashboard() {
  const context = useContext(DataContext);
  const searchInput = context?.searchInput || "";

  const [metrics, setMetrics] = useState<Metrics>({});
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("");
  const [selectedMethod, setSelectedMethod] = useState<MethodType>("");

  const handleMetricChange = useCallback((value: string) => {
    setSelectedMetric(value);
    setSelectedStatus("");
    setSelectedMethod("");
  }, []);

  const handleStatusChange = useCallback((value: StatusType) => {
    setSelectedStatus(value);
  }, []);

  const handleMethodChange = useCallback((value: MethodType) => {
    setSelectedMethod(value);
  }, []);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));

    try {
      const parsedToJSON = parseMetrics(HARD_CODED_METRIC_DATA);
      setMetrics(parsedToJSON);
      
      if (!selectedMetric) {
        const firstMetric = Object.keys(parsedToJSON)[0];
        if (firstMetric) {
          setSelectedMetric(firstMetric);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }

    // try {
    //   const res = await axios.get("http://172.16.20.173/metrics");
      
    //   const parsedToJSON = parseMetrics(res.data);
    //   setMetrics(parsedToJSON);
    //   if (!selectedMetric) {
    //     const firstMetric = Object.keys(parsedToJSON)[0];
    //     if (firstMetric) {
    //       setSelectedMetric(firstMetric);
    //     }
    //   }
      
    // } catch(error) {
    //   console.error("error fetching data:", error);
    // } finally {
    //   setLoading(false);
    // }
  }, [selectedMetric]);


  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const availableLabels = useMemo(() => {
    if (!selectedMetric || !metrics[selectedMetric]) {
      return { hasStatus: false, hasMethod: false, statuses: [], methods: [] };
    }

    const statuses = [...new Set(
      metrics[selectedMetric]
        .map(metric => metric.labels.status)
        .filter(Boolean)
    )] as StatusType[];

    const methods = [...new Set(
      metrics[selectedMetric]
        .map(metric => metric.labels.method)
        .filter(Boolean)
    )] as MethodType[];

    return {
      hasStatus: statuses.length > 0,
      hasMethod: methods.length > 0,
      statuses,
      methods
    };
  }, [selectedMetric, metrics]);

  const filteredMetricData = useMemo(() => {
    if (!selectedMetric || !metrics[selectedMetric]) {
      return [];
    }
    
    const searchTerm = searchInput.toLowerCase();
    
    return metrics[selectedMetric].filter(metric => {
      if (selectedStatus && metric.labels.status !== selectedStatus) return false;
      
      if (selectedMethod && metric.labels.method !== selectedMethod) return false;
      
      if (searchTerm) {
        const hasMatchingLabel = Object.values(metric.labels).some(value =>
          value.toLowerCase().includes(searchTerm)
        );
        if (!hasMatchingLabel) {
          return false;
        }
      }
      
      return true;
    });
  }, [selectedMetric, metrics, selectedStatus, selectedMethod, searchInput]);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors min-h-screen">
      <div className="p-4 md:p-6 lg:p-7">
        <MetricsHeader metrics={metrics} selectedMetric={selectedMetric} selectedMethod={selectedMethod} selectedStatus={selectedStatus} availableLabels={availableLabels} loading={loading} onMethodChange={handleMethodChange} onMetricChange={handleMetricChange} onStatusChange={handleStatusChange} onRefresh={fetchMetrics}/>

        {loading && <LoadingTable />}

        {!loading && selectedMetric && Object.keys(metrics).length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            {filteredMetricData.length > 0 ? (
              <BarChart 
                metricName={selectedMetric!} 
                metricData={filteredMetricData} 
              />
            ) : (
              <NoFilteredDataFound />
            )}
          </div>
        )}

        {!loading && !selectedMetric && Object.keys(metrics).length > 0 && <NoMetricSelected />}
        
        {!loading && !(Object.keys(metrics).length > 0) && <NoDataAvailable />}
      </div>
    </div>
  );
}