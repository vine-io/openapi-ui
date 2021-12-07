/*
获取 openapi.json
 */
import axios from 'axios';
import { OpenAPI } from '/#/store';

export function GetOpenAPI(): Promise<OpenAPI> {
  const cfg = {
    // baseURL: "http://127.0.0.1:8080",
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  };

  const instance = axios.create(cfg);

  return instance.get('/api/openapi.json').then((rsp) => rsp.data);
}
