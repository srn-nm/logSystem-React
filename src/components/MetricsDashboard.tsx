import { useState, useEffect, useContext } from "react";
import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataContext from "../contexts/dataContext";

interface MetricType {
  labels: Record<string, string>;
  value: number;
}

type Metrics = Record<string, MetricType[]>;

const hardCodedMetricData = `# HELP python_gc_objects_collected_total Objects collected during gc
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
http_response_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/totp"} 1.7617156255361042e+09
http_response_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/totp/verify"} 1.7617156655990703e+09
http_response_size_bytes_created{handler="/api/v1/authentication/login/access-token"} 1.7617156694839323e+09
http_response_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/mobile"} 1.761729395989651e+09
http_response_size_bytes_created{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify"} 1.7617294100371432e+09
http_response_size_bytes_created{handler="/api/v1/reports"} 1.7617295022666554e+09
http_response_size_bytes_created{handler="/api/v1/reports/{id}"} 1.7617295081345518e+09
http_response_size_bytes_created{handler="/api/v1/schemas/list"} 1.7617295081345518e+09
http_response_size_bytes_created{handler="/api/v1/render-report/{schema_id}"} 1.7617295125383465e+09
http_response_size_bytes_created{handler="/metrics"} 1.7619987555055056e+09
http_response_size_bytes_created{handler="/api/v1/"} 1.761998797374084e+09
http_response_size_bytes_created{handler="/api/v1/health"} 1.761998801947058e+09
http_response_size_bytes_created{handler="/api/v1/ping"} 1.7619988123991427e+09
http_response_size_bytes_created{handler="/api/v1/datas/schema/{id}/calc"} 1.7621599567940352e+09
http_response_size_bytes_created{handler="/api/v1/schemas/{id}/ref_keys"} 1.7622351758737595e+09
http_response_size_bytes_created{handler="/api/v1/schemas/{id}/all_keys"} 1.762235301726929e+09
http_response_size_bytes_created{handler="/api/v1/schemas/"} 1.762668464381682e+09
# HELP http_request_duration_highr_seconds Latency with many buckets but no API specific labels. Made for more accurate percentile calculations. 
# TYPE http_request_duration_highr_seconds histogram
http_request_duration_highr_seconds_bucket{le="0.01"} 4115.0
http_request_duration_highr_seconds_bucket{le="0.025"} 4705.0
http_request_duration_highr_seconds_bucket{le="0.05"} 4745.0
http_request_duration_highr_seconds_bucket{le="0.075"} 4765.0
http_request_duration_highr_seconds_bucket{le="0.1"} 5074.0
http_request_duration_highr_seconds_bucket{le="0.25"} 7712.0
http_request_duration_highr_seconds_bucket{le="0.5"} 8602.0
http_request_duration_highr_seconds_bucket{le="0.75"} 9011.0
http_request_duration_highr_seconds_bucket{le="1.0"} 9238.0
http_request_duration_highr_seconds_bucket{le="1.5"} 9518.0
http_request_duration_highr_seconds_bucket{le="2.0"} 9855.0
http_request_duration_highr_seconds_bucket{le="2.5"} 10229.0
http_request_duration_highr_seconds_bucket{le="3.0"} 10649.0
http_request_duration_highr_seconds_bucket{le="3.5"} 10945.0
http_request_duration_highr_seconds_bucket{le="4.0"} 11225.0
http_request_duration_highr_seconds_bucket{le="4.5"} 11470.0
http_request_duration_highr_seconds_bucket{le="5.0"} 11858.0
http_request_duration_highr_seconds_bucket{le="7.5"} 12681.0
http_request_duration_highr_seconds_bucket{le="10.0"} 13257.0
http_request_duration_highr_seconds_bucket{le="30.0"} 14674.0
http_request_duration_highr_seconds_bucket{le="60.0"} 14677.0
http_request_duration_highr_seconds_bucket{le="+Inf"} 14677.0
http_request_duration_highr_seconds_count 14677.0
http_request_duration_highr_seconds_sum 38054.054275706876
# HELP http_request_duration_highr_seconds_created Latency with many buckets but no API specific labels. Made for more accurate percentile calculations. 
# TYPE http_request_duration_highr_seconds_created gauge
http_request_duration_highr_seconds_created 1.7615706614910269e+09
# HELP http_request_duration_seconds Latency with only few buckets by handler. Made to be only used if aggregation by handler is important. 
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{handler="none",le="0.1",method="OPTIONS"} 3038.0
http_request_duration_seconds_bucket{handler="none",le="0.5",method="OPTIONS"} 3044.0
http_request_duration_seconds_bucket{handler="none",le="1.0",method="OPTIONS"} 3044.0
http_request_duration_seconds_bucket{handler="none",le="+Inf",method="OPTIONS"} 3044.0
http_request_duration_seconds_count{handler="none",method="OPTIONS"} 3044.0
http_request_duration_seconds_sum{handler="none",method="OPTIONS"} 18.357255610870197
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/users/me",le="0.1",method="GET"} 111.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/users/me",le="0.5",method="GET"} 317.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/users/me",le="1.0",method="GET"} 321.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/users/me",le="+Inf",method="GET"} 334.0
http_request_duration_seconds_count{handler="/api/v1/authentication/login/users/me",method="GET"} 334.0
http_request_duration_seconds_sum{handler="/api/v1/authentication/login/users/me",method="GET"} 158.43151080259122
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/{app}",le="0.1",method="GET"} 33.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/{app}",le="0.5",method="GET"} 326.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/{app}",le="1.0",method="GET"} 329.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/{app}",le="+Inf",method="GET"} 336.0
http_request_duration_seconds_count{handler="/api/v1/dashboard/{app}",method="GET"} 336.0
http_request_duration_seconds_sum{handler="/api/v1/dashboard/{app}",method="GET"} 65.15500349667855
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}",le="0.1",method="GET"} 55.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}",le="0.5",method="GET"} 729.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}",le="1.0",method="GET"} 796.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}",le="+Inf",method="GET"} 885.0
http_request_duration_seconds_count{handler="/api/v1/schemas/{id}",method="GET"} 885.0
http_request_duration_seconds_sum{handler="/api/v1/schemas/{id}",method="GET"} 668.5780531924684
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="0.1",method="GET"} 3.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="0.5",method="GET"} 134.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="1.0",method="GET"} 147.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="+Inf",method="GET"} 152.0
http_request_duration_seconds_count{handler="/api/v1/reports/schema/{id}",method="GET"} 152.0
http_request_duration_seconds_sum{handler="/api/v1/reports/schema/{id}",method="GET"} 66.70350640383549
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="0.1",method="GET"} 6.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="0.5",method="GET"} 294.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="1.0",method="GET"} 393.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="+Inf",method="GET"} 581.0
http_request_duration_seconds_count{handler="/api/v1/datas/schema/{id}",method="GET"} 581.0
http_request_duration_seconds_sum{handler="/api/v1/datas/schema/{id}",method="GET"} 825.3289549013134
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/list",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/list",le="0.5",method="GET"} 528.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/list",le="1.0",method="GET"} 653.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/list",le="+Inf",method="GET"} 728.0
http_request_duration_seconds_count{handler="/api/v1/datas/schema/{id}/list",method="GET"} 728.0
http_request_duration_seconds_sum{handler="/api/v1/datas/schema/{id}/list",method="GET"} 348.0598121974617
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/ids",le="0.1",method="GET"} 27.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/ids",le="0.5",method="GET"} 1036.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/ids",le="1.0",method="GET"} 1119.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/ids",le="+Inf",method="GET"} 1138.0
http_request_duration_seconds_count{handler="/api/v1/datas/schema/{id}/ids",method="GET"} 1138.0
http_request_duration_seconds_sum{handler="/api/v1/datas/schema/{id}/ids",method="GET"} 282.32195689855143
http_request_duration_seconds_bucket{handler="/api/v1/export_pdf/{report_id}",le="0.1",method="POST"} 4.0
http_request_duration_seconds_bucket{handler="/api/v1/export_pdf/{report_id}",le="0.5",method="POST"} 4.0
http_request_duration_seconds_bucket{handler="/api/v1/export_pdf/{report_id}",le="1.0",method="POST"} 11.0
http_request_duration_seconds_bucket{handler="/api/v1/export_pdf/{report_id}",le="+Inf",method="POST"} 31.0
http_request_duration_seconds_count{handler="/api/v1/export_pdf/{report_id}",method="POST"} 31.0
http_request_duration_seconds_sum{handler="/api/v1/export_pdf/{report_id}",method="POST"} 36.31063939910382
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="0.1",method="GET"} 71.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="0.5",method="GET"} 142.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="1.0",method="GET"} 143.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="+Inf",method="GET"} 144.0
http_request_duration_seconds_count{handler="/api/v1/datas/{id}",method="GET"} 144.0
http_request_duration_seconds_sum{handler="/api/v1/datas/{id}",method="GET"} 19.399003299418837
http_request_duration_seconds_bucket{handler="/api/v1/dashboard",le="0.1",method="GET"} 80.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard",le="0.5",method="GET"} 80.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard",le="1.0",method="GET"} 80.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard",le="+Inf",method="GET"} 80.0
http_request_duration_seconds_count{handler="/api/v1/dashboard",method="GET"} 80.0
http_request_duration_seconds_sum{handler="/api/v1/dashboard",method="GET"} 0.12069129734300077
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/",le="0.1",method="GET"} 28.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/",le="0.5",method="GET"} 77.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/",le="1.0",method="GET"} 77.0
http_request_duration_seconds_bucket{handler="/api/v1/dashboard/",le="+Inf",method="GET"} 81.0
http_request_duration_seconds_count{handler="/api/v1/dashboard/",method="GET"} 81.0
http_request_duration_seconds_sum{handler="/api/v1/dashboard/",method="GET"} 53.3758850004524
http_request_duration_seconds_bucket{handler="/docs",le="0.1",method="GET"} 21.0
http_request_duration_seconds_bucket{handler="/docs",le="0.5",method="GET"} 21.0
http_request_duration_seconds_bucket{handler="/docs",le="1.0",method="GET"} 21.0
http_request_duration_seconds_bucket{handler="/docs",le="+Inf",method="GET"} 21.0
http_request_duration_seconds_count{handler="/docs",method="GET"} 21.0
http_request_duration_seconds_sum{handler="/docs",method="GET"} 0.021257100393995643
http_request_duration_seconds_bucket{handler="/api/v1/openapi.json",le="0.1",method="GET"} 18.0
http_request_duration_seconds_bucket{handler="/api/v1/openapi.json",le="0.5",method="GET"} 19.0
http_request_duration_seconds_bucket{handler="/api/v1/openapi.json",le="1.0",method="GET"} 19.0
http_request_duration_seconds_bucket{handler="/api/v1/openapi.json",le="+Inf",method="GET"} 19.0
http_request_duration_seconds_count{handler="/api/v1/openapi.json",method="GET"} 19.0
http_request_duration_seconds_sum{handler="/api/v1/openapi.json",method="GET"} 0.20380419958382845
http_request_duration_seconds_bucket{handler="/api/v1/datas/calc/{id}",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/calc/{id}",le="0.5",method="GET"} 58.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/calc/{id}",le="1.0",method="GET"} 146.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/calc/{id}",le="+Inf",method="GET"} 5033.0
http_request_duration_seconds_count{handler="/api/v1/datas/calc/{id}",method="GET"} 5033.0
http_request_duration_seconds_sum{handler="/api/v1/datas/calc/{id}",method="GET"} 34688.00846860348
http_request_duration_seconds_bucket{handler="/api/v1/files/meta/{id}",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/files/meta/{id}",le="0.5",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/files/meta/{id}",le="1.0",method="GET"} 3.0
http_request_duration_seconds_bucket{handler="/api/v1/files/meta/{id}",le="+Inf",method="GET"} 22.0
http_request_duration_seconds_count{handler="/api/v1/files/meta/{id}",method="GET"} 22.0
http_request_duration_seconds_sum{handler="/api/v1/files/meta/{id}",method="GET"} 61.756595900515094
http_request_duration_seconds_bucket{handler="/api/v1/datas/datum/{id}",le="0.1",method="PATCH"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/datum/{id}",le="0.5",method="PATCH"} 17.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/datum/{id}",le="1.0",method="PATCH"} 17.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/datum/{id}",le="+Inf",method="PATCH"} 17.0
http_request_duration_seconds_count{handler="/api/v1/datas/datum/{id}",method="PATCH"} 17.0
http_request_duration_seconds_sum{handler="/api/v1/datas/datum/{id}",method="PATCH"} 4.05313289957121
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="0.1",method="POST"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="0.5",method="POST"} 51.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="1.0",method="POST"} 56.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}",le="+Inf",method="POST"} 57.0
http_request_duration_seconds_count{handler="/api/v1/datas/schema/{id}",method="POST"} 57.0
http_request_duration_seconds_sum{handler="/api/v1/datas/schema/{id}",method="POST"} 18.475270399358124
http_request_duration_seconds_bucket{handler="none",le="0.1",method="GET"} 10.0
http_request_duration_seconds_bucket{handler="none",le="0.5",method="GET"} 10.0
http_request_duration_seconds_bucket{handler="none",le="1.0",method="GET"} 10.0
http_request_duration_seconds_bucket{handler="none",le="+Inf",method="GET"} 10.0
http_request_duration_seconds_count{handler="none",method="GET"} 10.0
http_request_duration_seconds_sum{handler="none",method="GET"} 0.02670620009303093
http_request_duration_seconds_bucket{handler="/api/v1/types/currencies",le="0.1",method="GET"} 303.0
http_request_duration_seconds_bucket{handler="/api/v1/types/currencies",le="0.5",method="GET"} 303.0
http_request_duration_seconds_bucket{handler="/api/v1/types/currencies",le="1.0",method="GET"} 303.0
http_request_duration_seconds_bucket{handler="/api/v1/types/currencies",le="+Inf",method="GET"} 303.0
http_request_duration_seconds_count{handler="/api/v1/types/currencies",method="GET"} 303.0
http_request_duration_seconds_sum{handler="/api/v1/types/currencies",method="GET"} 1.4759755008853972
http_request_duration_seconds_bucket{handler="/api/v1/types/{base_type}",le="0.1",method="GET"} 1254.0
http_request_duration_seconds_bucket{handler="/api/v1/types/{base_type}",le="0.5",method="GET"} 1254.0
http_request_duration_seconds_bucket{handler="/api/v1/types/{base_type}",le="1.0",method="GET"} 1254.0
http_request_duration_seconds_bucket{handler="/api/v1/types/{base_type}",le="+Inf",method="GET"} 1254.0
http_request_duration_seconds_count{handler="/api/v1/types/{base_type}",method="GET"} 1254.0
http_request_duration_seconds_sum{handler="/api/v1/types/{base_type}",method="GET"} 6.725766905816272
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge",le="0.1",method="POST"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge",le="0.5",method="POST"} 12.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge",le="1.0",method="POST"} 16.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge",le="+Inf",method="POST"} 33.0
http_request_duration_seconds_count{handler="/api/v1/authentication/login/challenge",method="POST"} 33.0
http_request_duration_seconds_sum{handler="/api/v1/authentication/login/challenge",method="POST"} 300.4773721995298
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp",le="0.5",method="GET"} 3.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp",le="1.0",method="GET"} 3.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp",le="+Inf",method="GET"} 6.0
http_request_duration_seconds_count{handler="/api/v1/authentication/login/challenge/{id}/totp",method="GET"} 6.0
http_request_duration_seconds_sum{handler="/api/v1/authentication/login/challenge/{id}/totp",method="GET"} 8.962154100183398
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",le="0.1",method="POST"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",le="0.5",method="POST"} 7.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",le="1.0",method="POST"} 7.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",le="+Inf",method="POST"} 15.0
http_request_duration_seconds_count{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",method="POST"} 15.0
http_request_duration_seconds_sum{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",method="POST"} 20.964261600514874
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/access-token",le="0.1",method="POST"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/access-token",le="0.5",method="POST"} 16.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/access-token",le="1.0",method="POST"} 16.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/access-token",le="+Inf",method="POST"} 26.0
http_request_duration_seconds_count{handler="/api/v1/authentication/login/access-token",method="POST"} 26.0
http_request_duration_seconds_sum{handler="/api/v1/authentication/login/access-token",method="POST"} 46.86558849946596
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile",le="0.1",method="POST"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile",le="0.5",method="POST"} 2.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile",le="1.0",method="POST"} 8.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile",le="+Inf",method="POST"} 12.0
http_request_duration_seconds_count{handler="/api/v1/authentication/login/challenge/{id}/mobile",method="POST"} 12.0
http_request_duration_seconds_sum{handler="/api/v1/authentication/login/challenge/{id}/mobile",method="POST"} 31.121689800173044
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",le="0.1",method="POST"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",le="0.5",method="POST"} 9.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",le="1.0",method="POST"} 9.0
http_request_duration_seconds_bucket{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",le="+Inf",method="POST"} 12.0
http_request_duration_seconds_count{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",method="POST"} 12.0
http_request_duration_seconds_sum{handler="/api/v1/authentication/login/challenge/{id}/mobile/verify",method="POST"} 9.410030600382015
http_request_duration_seconds_bucket{handler="/api/v1/reports",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/reports",le="0.5",method="GET"} 14.0
http_request_duration_seconds_bucket{handler="/api/v1/reports",le="1.0",method="GET"} 18.0
http_request_duration_seconds_bucket{handler="/api/v1/reports",le="+Inf",method="GET"} 18.0
http_request_duration_seconds_count{handler="/api/v1/reports",method="GET"} 18.0
http_request_duration_seconds_sum{handler="/api/v1/reports",method="GET"} 6.732858599862084
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="0.5",method="GET"} 17.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="1.0",method="GET"} 19.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="+Inf",method="GET"} 19.0
http_request_duration_seconds_count{handler="/api/v1/reports/{id}",method="GET"} 19.0
http_request_duration_seconds_sum{handler="/api/v1/reports/{id}",method="GET"} 4.125110899796709
http_request_duration_seconds_bucket{handler="/api/v1/schemas/list",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/list",le="0.5",method="GET"} 8.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/list",le="1.0",method="GET"} 13.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/list",le="+Inf",method="GET"} 14.0
http_request_duration_seconds_count{handler="/api/v1/schemas/list",method="GET"} 14.0
http_request_duration_seconds_sum{handler="/api/v1/schemas/list",method="GET"} 6.79956949967891
http_request_duration_seconds_bucket{handler="/api/v1/render-report/{schema_id}",le="0.1",method="POST"} 3.0
http_request_duration_seconds_bucket{handler="/api/v1/render-report/{schema_id}",le="0.5",method="POST"} 33.0
http_request_duration_seconds_bucket{handler="/api/v1/render-report/{schema_id}",le="1.0",method="POST"} 135.0
http_request_duration_seconds_bucket{handler="/api/v1/render-report/{schema_id}",le="+Inf",method="POST"} 175.0
http_request_duration_seconds_count{handler="/api/v1/render-report/{schema_id}",method="POST"} 175.0
http_request_duration_seconds_sum{handler="/api/v1/render-report/{schema_id}",method="POST"} 170.70267429598607
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="0.1",method="POST"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="0.5",method="POST"} 2.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="1.0",method="POST"} 2.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/schema/{id}",le="+Inf",method="POST"} 2.0
http_request_duration_seconds_count{handler="/api/v1/reports/schema/{id}",method="POST"} 2.0
http_request_duration_seconds_sum{handler="/api/v1/reports/schema/{id}",method="POST"} 0.541155599988997
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="0.1",method="PUT"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="0.5",method="PUT"} 4.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="1.0",method="PUT"} 5.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="+Inf",method="PUT"} 5.0
http_request_duration_seconds_count{handler="/api/v1/reports/{id}",method="PUT"} 5.0
http_request_duration_seconds_sum{handler="/api/v1/reports/{id}",method="PUT"} 1.7451405997853726
http_request_duration_seconds_bucket{handler="/metrics",le="0.1",method="GET"} 3.0
http_request_duration_seconds_bucket{handler="/metrics",le="0.5",method="GET"} 3.0
http_request_duration_seconds_bucket{handler="/metrics",le="1.0",method="GET"} 3.0
http_request_duration_seconds_bucket{handler="/metrics",le="+Inf",method="GET"} 3.0
http_request_duration_seconds_count{handler="/metrics",method="GET"} 3.0
http_request_duration_seconds_sum{handler="/metrics",method="GET"} 0.039745100075379014
http_request_duration_seconds_bucket{handler="/api/v1/",le="0.1",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/",le="0.5",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/",le="1.0",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/",le="+Inf",method="GET"} 1.0
http_request_duration_seconds_count{handler="/api/v1/",method="GET"} 1.0
http_request_duration_seconds_sum{handler="/api/v1/",method="GET"} 0.0021467998158186674
http_request_duration_seconds_bucket{handler="/api/v1/health",le="0.1",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/health",le="0.5",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/health",le="1.0",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/health",le="+Inf",method="GET"} 1.0
http_request_duration_seconds_count{handler="/api/v1/health",method="GET"} 1.0
http_request_duration_seconds_sum{handler="/api/v1/health",method="GET"} 0.002825200092047453
http_request_duration_seconds_bucket{handler="/api/v1/ping",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/ping",le="0.5",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/ping",le="1.0",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/ping",le="+Inf",method="GET"} 1.0
http_request_duration_seconds_count{handler="/api/v1/ping",method="GET"} 1.0
http_request_duration_seconds_sum{handler="/api/v1/ping",method="GET"} 6.092311999993399
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/calc",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/calc",le="0.5",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/calc",le="1.0",method="GET"} 2.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/schema/{id}/calc",le="+Inf",method="GET"} 15.0
http_request_duration_seconds_count{handler="/api/v1/datas/schema/{id}/calc",method="GET"} 15.0
http_request_duration_seconds_sum{handler="/api/v1/datas/schema/{id}/calc",method="GET"} 37.34155060094781
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/ref_keys",le="0.1",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/ref_keys",le="0.5",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/ref_keys",le="1.0",method="GET"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/ref_keys",le="+Inf",method="GET"} 2.0
http_request_duration_seconds_count{handler="/api/v1/schemas/{id}/ref_keys",method="GET"} 2.0
http_request_duration_seconds_sum{handler="/api/v1/schemas/{id}/ref_keys",method="GET"} 19.682951600058004
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/all_keys",le="0.1",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/all_keys",le="0.5",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/all_keys",le="1.0",method="GET"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/{id}/all_keys",le="+Inf",method="GET"} 1.0
http_request_duration_seconds_count{handler="/api/v1/schemas/{id}/all_keys",method="GET"} 1.0
http_request_duration_seconds_sum{handler="/api/v1/schemas/{id}/all_keys",method="GET"} 2.532461700029671
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="0.1",method="DELETE"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="0.5",method="DELETE"} 3.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="1.0",method="DELETE"} 3.0
http_request_duration_seconds_bucket{handler="/api/v1/datas/{id}",le="+Inf",method="DELETE"} 3.0
http_request_duration_seconds_count{handler="/api/v1/datas/{id}",method="DELETE"} 3.0
http_request_duration_seconds_sum{handler="/api/v1/datas/{id}",method="DELETE"} 1.2842116998508573
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="0.1",method="DELETE"} 0.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="0.5",method="DELETE"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="1.0",method="DELETE"} 1.0
http_request_duration_seconds_bucket{handler="/api/v1/reports/{id}",le="+Inf",method="DELETE"} 1.0
http_request_duration_seconds_count{handler="/api/v1/reports/{id}",method="DELETE"} 1.0
http_request_duration_seconds_sum{handler="/api/v1/reports/{id}",method="DELETE"} 0.16969359992071986
http_request_duration_seconds_bucket{handler="/api/v1/schemas/",le="0.1",method="GET"} 2.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/",le="0.5",method="GET"} 21.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/",le="1.0",method="GET"} 33.0
http_request_duration_seconds_bucket{handler="/api/v1/schemas/",le="+Inf",method="GET"} 42.0
http_request_duration_seconds_count{handler="/api/v1/schemas/",method="GET"} 42.0
http_request_duration_seconds_sum{handler="/api/v1/schemas/",method="GET"} 55.569520900957286
# HELP http_request_duration_seconds_created Latency with only few buckets by handler. Made to be only used if aggregation by handler is important. 
# TYPE http_request_duration_seconds_created gauge
http_request_duration_seconds_created{handler="none",method="OPTIONS"} 1.7615706676713789e+09
http_request_duration_seconds_created{handler="/api/v1/authentication/login/users/me",method="GET"} 1.7615706682762272e+09
http_request_duration_seconds_created{handler="/api/v1/dashboard/{app}",method="GET"} 1.7615706682797365e+09
http_request_duration_seconds_created{handler="/api/v1/schemas/{id}",method="GET"} 1.7615706718645976e+09
http_request_duration_seconds_created{handler="/api/v1/reports/schema/{id}",method="GET"} 1.7615706720857387e+09
http_request_duration_seconds_created{handler="/api/v1/datas/schema/{id}",method="GET"} 1.761570672694557e+09
http_request_duration_seconds_created{handler="/api/v1/datas/schema/{id}/list",method="GET"} 1.7615706729233396e+09
http_request_duration_seconds_created{handler="/api/v1/datas/schema/{id}/ids",method="GET"} 1.7615706746504095e+09
http_request_duration_seconds_created{handler="/api/v1/export_pdf/{report_id}",method="POST"} 1.7615706931041727e+09
http_request_duration_seconds_created{handler="/api/v1/datas/{id}",method="GET"} 1.7615707106449618e+09
http_request_duration_seconds_created{handler="/api/v1/dashboard",method="GET"} 1.7615716679411702e+09
http_request_duration_seconds_created{handler="/api/v1/dashboard/",method="GET"} 1.7615716681552842e+09
http_request_duration_seconds_created{handler="/docs",method="GET"} 1.761632615709429e+09
http_request_duration_seconds_created{handler="/api/v1/openapi.json",method="GET"} 1.7616326164507253e+09
http_request_duration_seconds_created{handler="/api/v1/datas/calc/{id}",method="GET"} 1.7616348764909415e+09
http_request_duration_seconds_created{handler="/api/v1/files/meta/{id}",method="GET"} 1.761634881618831e+09
http_request_duration_seconds_created{handler="/api/v1/datas/datum/{id}",method="PATCH"} 1.7616349291877217e+09
http_request_duration_seconds_created{handler="/api/v1/datas/schema/{id}",method="POST"} 1.7616353803558328e+09
http_request_duration_seconds_created{handler="none",method="GET"} 1.7616414748778045e+09
http_request_duration_seconds_created{handler="/api/v1/types/currencies",method="GET"} 1.761652089339669e+09
http_request_duration_seconds_created{handler="/api/v1/types/{base_type}",method="GET"} 1.761652089339669e+09
http_request_duration_seconds_created{handler="/api/v1/authentication/login/challenge",method="POST"} 1.7617156153018217e+09
http_request_duration_seconds_created{handler="/api/v1/authentication/login/challenge/{id}/totp",method="GET"} 1.7617156255361042e+09
http_request_duration_seconds_created{handler="/api/v1/authentication/login/challenge/{id}/totp/verify",method="POST"} 1.7617156655990703e+09
http_request_duration_seconds_created{handler="/api/v1/authentication/login/access-token",method="POST"} 1.7617156694839323e+09
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
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");


  async function fetchMetrics() {
    setLoading(true);
    try {
      // using hardcoded data for testing
      const parsedToJSON = parseMetrics(hardCodedMetricData);
      setMetrics(parsedToJSON);
      
      // selecting metric when reloaded
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

    // setLoading(true);
    // try {
    //   const res = await axios.get("http://172.16.20.173/metrics", {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
      
    //   const parsedToJSON = parseMetrics(res.data);
    //   setMetrics(parsedToJSON);
    //   console.log("fetching data from metrics successful", parsedToJSON);
      
    // } catch(error) {
    //   console.error("Error fetching data:", error);
    // } finally {
    //   setLoading(false);
    // }
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

    const distinctStatus = [...new Set(
    Object.values(metrics).flatMap(metricArray =>
      metricArray.flatMap(metric =>
        Object.entries(metric.labels)
          .filter(([key]) => key === "status")
          .map(([, value]) => value)
      )
    )
    )].filter(Boolean);
    console.log("distinct status: " + distinctStatus)

    const distinctMethods = [...new Set(
      Object.values(metrics).flatMap(metricArray =>
        metricArray.flatMap(metric =>
          Object.entries(metric.labels)
            .filter(([key]) => key === "method")
            .map(([, value]) => value)
        )
      )
    )].filter(Boolean);
  
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

  // function to generate label for a metric entry
  function getMetricLabel(metric: MetricType, metricName: string): string {

    const labels = Object.entries(metric.labels);
    // .filter(([value]) => value.toLowerCase().includes(searchInput.toLowerCase()));
  
    if (labels.length > 0) {
      return labels.map(([key, value]) => `${key}: ${value}`).join(" | ");
    }
    
    return "Unlabeled";
  }

  const filteredMetrics = Object.entries(metrics) //.filter(value => value.includes(selectedStatus) && value.includes(selectedMethod));

  // bar Chart  
  function BarChart({ metricName, metricData }: { metricName: string; metricData: MetricType[] }) {

    const totalSum = metricData.reduce((sum, metric) => sum + metric.value, 0);
    const sortedData = [...metricData].sort((a, b) => b.value - a.value);

    return (
      <div className="horizontal-bar-chart p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {metricName}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total: {totalSum.toLocaleString()} &nbsp;|&nbsp; Items: {sortedData.length} &nbsp;|&nbsp;  Average: {totalSum > 0 ? (totalSum / sortedData.length).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
          </div>
        </div>
        
        <div className="space-y-2 max-h-140 overflow-y-auto">
          {sortedData.map((metric, index) => {
            const percentage = totalSum > 0 ? (metric.value / totalSum) * 100 : 0;
            
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {getMetricLabel(metric, metricName)}
                  </div>
                </div>
                <div className="flex-2 w-full max-w-2xl">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden relative">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-between px-3 text-white text-sm font-medium"
                      style={{ width: `${percentage}%` }}
                    >
                      <span>{percentage.toFixed(1)}%&nbsp;&nbsp;&nbsp;</span>
                      <span>{metric.value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary statistics */}
        {/* <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-600 dark:text-gray-400">Total Sum</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{totalSum.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 dark:text-gray-400">Items Count</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">{sortedData.length}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 dark:text-gray-400">Average</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {totalSum > 0 ? (totalSum / sortedData.length).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
              </div>
            </div>
            
          </div>
        </div> */}
      </div>
    );
  }

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
            <Tooltip title="Refresh Metrics">
              <IconButton 
                onClick={fetchMetrics} 
                disabled={loading}
                size="small"
                sx={{ 
                  color: "#e5e7eb",
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            {/*Metric Selector*/}
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Metric...</option>
              {Object.keys(metrics).map(metricName => (
                <option key={metricName} value={metricName}>
                  {metricName}
                </option>
              ))}
            </select>  

            {/*Status Selector*/}
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status...</option>
              {distinctStatus.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>      

            {/*Method Selector*/}
            <select 
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Method...</option>
              {distinctMethods.map(method => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>  

          </div>
        </div>

        {loading && (
          <div className="text-center py-8 text-gray-600 dark:text-gray-400">
            Loading metrics...
          </div>
        )}

        {!loading && filteredMetrics.length > 0 && (
          <>
            {selectedMetric && metrics[selectedMetric] && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <BarChart 
                  metricName={selectedMetric} 
                  metricData={metrics[selectedMetric]} 
                />
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

        {!loading && filteredMetrics.length === 0 && searchInput && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No metrics found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No metrics match your search: "{searchInput}"
            </p>
          </div>
        )}

        {!loading && Object.keys(metrics).length === 0 && !searchInput && (
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
