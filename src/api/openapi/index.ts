/*
获取 openapi.json
 */
import axios from "axios";
import {OpenAPI} from "./openapi";

export function GetOpenAPI(): Promise<OpenAPI> {

    let cfg = {
        // baseURL: "http://127.0.0.1:8080",
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    }

    let instance = axios.create(cfg);

    return instance.get("/api/openapi.json").then(rsp => rsp.data);
}

