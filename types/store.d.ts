import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { RoleInfo } from '/@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  homePath?: string;
  roles: RoleInfo[];
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

// openapi information
export interface OpenAPISessions {
  store: Array<OpenAPISession>;
}

export interface OpenAPISession {
  request: Request;
  response: Response;
  docs: OpenAPIPathDocs;
}

export interface Request {
  method: string;
  path: string;
  url: string;
  parameters: Array<KVD>;
  authorization?: Bearer | Basic;
  headers: Array<KVD>;
  body: Array<KVD>;
  cookies?: Cookies;
}

export interface KVD {
  in: string;
  required: boolean;
  selected: boolean;
  keys: string;
  value: string;
  doc?: string;
  edited: string[];
}

export interface Bearer {
  token?: string;
}

export interface Basic {
  username?: string;
  password?: string;
}

export interface Cookies {}

export interface Response {
  body?: string;
  headers?: Array<KVD>;
  cookies?: Cookies;
}

export interface OpenAPI {
  openapi?: string;
  info?: OpenAPIInfo;
  ExternalDocs?: OpenAPIExternalDocs;
  servers?: Array<OpenAPIServer>;
  tags?: Array<OpenAPITag>;
  paths?: Map<string, OpenAPIPath>;
  components?: OpenAPIComponents;
}

export interface OpenAPIServer {
  url?: string;
  description?: string;
}

export interface OpenAPIInfo {
  title?: string;
  description?: string;
  termsOfService?: string;
  contact?: OpenAPIContact;
  license?: OpenAPILicense;
  version?: string;
}

export interface OpenAPIContact {
  name?: string;
  email?: string;
}

export interface OpenAPILicense {
  name?: string;
  url?: string;
}

export interface OpenAPITag {
  name?: string;
  description?: string;
  externalDocs?: OpenAPIExternalDocs;
}

export interface OpenAPIExternalDocs {
  description?: string;
  url?: string;
}

export interface OpenAPIPath {
  get?: OpenAPIPathDocs;
  post?: OpenAPIPathDocs;
  put?: OpenAPIPathDocs;
  patch?: OpenAPIPathDocs;
  delete?: OpenAPIPathDocs;
}

export interface OpenAPIPathDocs {
  tags?: Array<string>;
  summary?: string;
  description?: string;
  operationId?: string;
  deprecated?: boolean;
  requestBody?: PathRequestBody;
  parameters?: Array<PathParameters>;
  Responses?: Map<string, PathResponse>;
  security?: Array<PathSecurity>;
}

export interface PathSecurity {
  basic?: Array<string>;
  apiKeys?: Array<string>;
  bearer?: Array<string>;
}

export interface PathParameters {
  in?: string;
  name?: string;
  required?: boolean;
  description?: string;
  allowReserved?: boolean;
  style?: string;
  explode?: string;
  allowEmptyValue?: boolean;
  schema?: Schema;
  Example?: string;
}

export interface PathRequestBody {
  description?: string;
  required?: boolean;
  content?: PathRequestBodyContent;
}

export interface PathRequestBodyContent {
  applicationJson?: ApplicationContent;
  applicationXml?: ApplicationContent;
}

export interface ApplicationContent {
  schema?: Schema;
}

// PathResponse is swagger path response
export interface PathResponse {
  description?: string;
  content?: PathRequestBodyContent;
}

export interface OpenAPIComponents {
  securitySchemes?: SecuritySchemes;
  schemas?: Map<string, Model>;
}

export interface SecuritySchemes {
  basic?: BasicSecurity;
  apiKeys?: APIKeysSecurity;
  bearer?: BearerSecurity;
}

// BasicSecurity is swagger Basic Authorization security (https://swagger.io/docs/specification/authentication/basic-authentication/)
export interface BasicSecurity {
  // http, apiKey, oauth, openIdConnect
  type?: string;
  scheme?: string;
}

// APIKeysSecurity is swagger API keys Authorization security (https://swagger.io/docs/specification/authentication/api-keys/)
export interface APIKeysSecurity {
  type?: string;
  // header
  in?: string;
  name?: string;
}

// BearerSecurity is swagger Bearer Authorization security (https://swagger.io/docs/specification/authentication/bearer-authentication/)
export interface BearerSecurity {
  // http
  type?: string;
  scheme?: string;
  // JWT
  bearerFormat?: string;
}

// Model is swagger data models (https://swagger.io/docs/specification/data-models/)
export interface Model {
  // string, number, integer, boolean, array, object
  type?: string;
  properties?: Map<string, Schema>;
  required?: Array<string>;
}

export interface Schema {
  type?: string;
  format?: string;
  description?: string;
  example?: string;
  pattern?: string;
  nullable?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  required?: boolean;
  ref?: string;
  default?: string;
  minLength?: number;
  maxLength?: number;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  enum?: Array<string>;
  items?: Schema;
  parameters?: Array<PathParameters>;
  additionalProperties?: Schema;
}
