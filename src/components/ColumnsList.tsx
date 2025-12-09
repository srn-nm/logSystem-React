export interface ColumnsList {
  id: number | null;
  api_key: string | null;
  ip_address: string;
  path: string;
  method: string;
  status_code: number;
  request_body?: Record<string, any> | any[] | null;
  response_body?: Record<string, any> | any[] | null;
  query_params?: Record<string, any> | null;
  path_params?: Record<string, any> | null;
  process_time: number;
  created_at: Date;
}