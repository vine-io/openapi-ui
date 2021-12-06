import type { OpenAPIInfo } from '/#/store';

import { defineStore } from 'pinia';

import { OPEN_API_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';

interface OpenAPIState {
  openAPIInfo: Nullable<OpenAPIInfo>;
}

export const OpenAPIStore = defineStore({
  id: 'openapi',
  state: (): OpenAPIState => ({
    openAPIInfo: Persistent.getLocal(OPEN_API_KEY),
  }),
  getters: {
    getOpenAPI(): Nullable<OpenAPIInfo> {
      return this.openAPIInfo;
    },
  },
  actions: {
    setOpenAPI(info: OpenAPIInfo) {
      this.openAPIInfo = Object.assign({}, this.openAPIInfo, info);
      Persistent.setOpenAPI(OPEN_API_KEY, this.openAPIInfo, true);
    },
    resetOpenAPI() {
      Persistent.removeOpenAPI(OPEN_API_KEY, true);
      this.openAPIInfo = null;
    },
  },
});
