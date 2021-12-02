export class OpenAPI {
    public openapi?: string
    public info?: OpenAPIInfo
    public ExternalDocs?: OpenAPIExternalDocs
    public servers?: Array<OpenAPIServer>
    public tags?: Array<OpenAPITag>
    public paths?: Map<string, OpenAPIPath>
    public components?: OpenAPIComponents

    constructor() {
    }
}

export class OpenAPIServer {
    public url?: string
    public description?: string
}

export class OpenAPIInfo {
    public title?: string
    public description?: string
    public termsOfService?: string
    public contact?: OpenAPIContact
    public license?: OpenAPILicense
    public version?: string
}

export class OpenAPIContact {
    public name?: string
    public email?: string
}

export class OpenAPILicense {
    public name?: string
    public url?: string
}

export class OpenAPITag {
    public name?: string
    public description?: string
    public externalDocs?: OpenAPIExternalDocs
}

export class OpenAPIExternalDocs {
    public description?: string
    public url?: string
}

export class OpenAPIPath {
    public get?: OpenAPIPathDocs
    public post?: OpenAPIPathDocs
    public put?: OpenAPIPathDocs
    public patch?: OpenAPIPathDocs
    public delete?: OpenAPIPathDocs
}

export class OpenAPIPathDocs {
    public tags?: Array<string>
    public summary?: string
    public description?: string
    public operationId?: string
    public deprecated?: boolean
    public requestBody?: PathRequestBody
    public parameters?: Array<PathParameters>
    public Responses?: Map<string, PathResponse>
    public security?: Array<PathSecurity>
}

export class PathSecurity {
    public basic?: Array<string>
    public apiKeys?: Array<string>
    public bearer?: Array<string>
}

export class PathParameters {
    public in?: string
    public name?: string
    public required?: boolean
    public description?: string
    public allowReserved?: boolean
    public style?: string
    public explode?: string
    public allowEmptyValue?: boolean
    public schema?: Schema
    public Example?: string
}

export class PathRequestBody {
    public description?: string
    public required?: boolean
    public content?: PathRequestBodyContent
}

export class PathRequestBodyContent {
    public applicationJson?: ApplicationContent
    public applicationXml?: ApplicationContent
}

export class ApplicationContent {
    public schema?: Schema
}

// PathResponse is swagger path response
export class PathResponse {
    public description?: string
    public content?: PathRequestBodyContent
}

export class OpenAPIComponents {
    public securitySchemes?: SecuritySchemes
    public schemas?: Map<string, Model>
}

export class SecuritySchemes {
    public basic?: BasicSecurity
    public apiKeys?: APIKeysSecurity
    public bearer?: BearerSecurity
}

// BasicSecurity is swagger Basic Authorization security (https://swagger.io/docs/specification/authentication/basic-authentication/)
export class BasicSecurity {
    // http, apiKey, oauth, openIdConnect
    public type?: string
    public scheme?: string
}

// APIKeysSecurity is swagger API keys Authorization security (https://swagger.io/docs/specification/authentication/api-keys/)
export class APIKeysSecurity {
    public type?: string
    // header
    public in?: string
    public name?: string
}

// BearerSecurity is swagger Bearer Authorization security (https://swagger.io/docs/specification/authentication/bearer-authentication/)
export class BearerSecurity {
    // http
    public type?: string
    public scheme?: string
    // JWT
    public bearerFormat?: string
}

// Model is swagger data models (https://swagger.io/docs/specification/data-models/)
export class Model {
    // string, number, integer, boolean, array, object
    public type?: string
    public properties?: Map<string, Schema>
    public required?: Array<string>
}

export class Schema {
    public type?: string
    public format?: string
    public description?: string
    public example?: string
    public pattern?: string
    public nullable?: string
    public readOnly?: boolean
    public writeOnly?: boolean
    public required?: boolean
    public ref?: string
    public default?: string
    public minLength?: number
    public maxLength?: number
    public multipleOf?: number
    public minimum?: number
    public exclusiveMinimum?: number
    public maximum?: number
    public exclusiveMaximum?: number
    public enum?: Array<string>
    public items?: Schema
    public parameters?: Array<PathParameters>
    public additionalProperties?: Schema
}