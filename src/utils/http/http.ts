import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {cloneDeep} from "lodash";

export class Http {
    cfg: AxiosRequestConfig

    constructor(cfg: AxiosRequestConfig) {
        this.cfg = cfg
    }

    conn(cfg: AxiosRequestConfig): AxiosInstance {
        return axios.create(cfg);
    }


    request(cfg: AxiosRequestConfig, opts: any): Promise<any> {
        let conf = cloneDeep(cfg);


        return new Promise<any>((resolve, reject) => {
            this.conn(conf)
                .request(conf)
                .then(res => {
                    resolve(res);
                })
                .catch(e => {
                    reject(e);
                });
        })
    }
}