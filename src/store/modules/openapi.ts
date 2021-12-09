import type { OpenAPISessions, OpenAPISession, OpenAPI } from '/#/store';

import { defineStore } from 'pinia';

import { API_SESSION_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { store } from '/@/store';

interface OpenAPIState {
  apiSession: Nullable<OpenAPISessions>;
  doc: Nullable<OpenAPI>;
}

export const useOpenAPIStore = defineStore({
  id: 'openapi',
  state: (): OpenAPIState => ({
    apiSession: Persistent.getOpenAPI(API_SESSION_KEY),
    doc: {},
  }),
  getters: {
    getAPISession(): Array<OpenAPISession> {
      return this.apiSession?.store || [];
    },
    getDoc(): Nullable<OpenAPI> {
      return this.doc;
    },
  },
  actions: {
    setAPISession(sessions: OpenAPISessions) {
      this.apiSession = Object.assign({}, this.apiSession, sessions);
      Persistent.setOpenAPI(API_SESSION_KEY, sessions, true);
    },
    pushSession(session: OpenAPISession) {
      if (!this.apiSession) {
        this.apiSession = { store: [] };
      }
      this.apiSession.store.push(session);
      this.setAPISession(this.apiSession);
    },
    removeSession(index: number) {
      if (!this.apiSession) {
        this.apiSession = { store: [] };
        return;
      }
      this.apiSession.store.splice(index, 1);
      this.setAPISession(this.apiSession);
    },
    editSession(index: number, session: OpenAPISession) {
      if (!this.apiSession) {
        this.apiSession = { store: [] };
        return;
      }
      this.apiSession.store[index] = session;
      this.setAPISession(this.apiSession);
    },
    setDoc(doc: OpenAPI) {
      this.doc = doc;
    },
    resetOpenAPI() {
      Persistent.removeOpenAPI(API_SESSION_KEY, true);
      this.apiSession = { store: [] };
      this.doc = {};
    },
  },
});

// Need to be used outside the setup
export function useOpenAPIStoreWithOut() {
  return useOpenAPIStore(store);
}
