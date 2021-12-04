import { OpenAPIPathDocs } from '/@/api/openapi/openapi';

export class APIContent {
  url?: string;
  method?: string;
  docs?: OpenAPIPathDocs;

  constructor(url?, method?, docs?) {
    this.url = url;
    this.method = method;
    this.docs = docs;
  }
}
