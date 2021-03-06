import type { LockInfo, OpenAPIInfo, OpenAPISessions, UserInfo } from '/#/store';
import type { ProjectConfig } from '/#/config';
import type { RouteLocationNormalized } from 'vue-router';

import { createLocalStorage, createOpenAPIStorage, createSessionStorage } from '/@/utils/cache';
import { Memory } from './memory';
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  ROLES_KEY,
  LOCK_INFO_KEY,
  PROJ_CFG_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  MULTIPLE_TABS_KEY,
  API_SESSION_KEY,
  API_SESSION_CACHE_KEY,
} from '/@/enums/cacheEnum';
import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting';
import { toRaw } from 'vue';
import { pick, omit } from 'lodash-es';
import openAPI from '/@/router/routes/modules/openapi';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
  [API_SESSION_KEY]: OpenAPIInfo;
}

type LocalStore = BasicStore;

type SessionStore = BasicStore;

type OpenAPIStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;
type OpenAPIKeys = keyof OpenAPIStore;

const ls = createLocalStorage();
const ss = createSessionStorage();
const os = createOpenAPIStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);
const openAPIMemory = new Memory(DEFAULT_CACHE_TIME);

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  const openapiCache = os.get(API_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
  openAPI && openAPIMemory.resetCache(openapiCache);
}

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, toRaw(value));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && ls.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }

  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && ss.clear();
  }

  static getOpenAPI(key: OpenAPIKeys): OpenAPISessions {
    if (openAPIMemory.get(key)) {
      return openAPIMemory.get(key)?.value;
    }

    const sessions = os.get(key);
    if (!sessions) {
      return { store: [] };
    }

    return Reflect.get(sessions, API_SESSION_KEY).value as OpenAPISessions;
  }

  static setOpenAPI(key: OpenAPIKeys, value: OpenAPISessions, immediate = false): void {
    openAPIMemory.set(key, toRaw(value));
    immediate && os.set(API_SESSION_KEY, openAPIMemory.getCache);
  }

  static removeOpenAPI(key: OpenAPIKeys, immediate = false): void {
    openAPIMemory.remove(key);
    immediate && os.set(API_SESSION_KEY, openAPIMemory.getCache);
  }

  static clearOpenAPI(immediate = false): void {
    openAPIMemory.clear();
    immediate && os.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    openAPIMemory.clear();
    if (immediate) {
      ls.clear();
      ss.clear();
      os.clear();
    }
  }
}

window.addEventListener('beforeunload', function () {
  // TOKEN_KEY ????????????????????????????????????storage???????????????????????????????????????????????????token??????????????????
  // LOCK_INFO_KEY ???????????????????????????????????????????????????
  ls.set(APP_LOCAL_CACHE_KEY, {
    ...omit(localMemory.getCache, LOCK_INFO_KEY),
    ...pick(ls.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
  });
  ss.set(APP_SESSION_CACHE_KEY, {
    ...omit(sessionMemory.getCache, LOCK_INFO_KEY),
    ...pick(ss.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
  });
  os.set(API_SESSION_CACHE_KEY, {
    ...omit(openAPIMemory.getCache, API_SESSION_KEY),
    ...pick(os.get(API_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
  });
});

function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener('storage', storageChange);

initPersistentMemory();
