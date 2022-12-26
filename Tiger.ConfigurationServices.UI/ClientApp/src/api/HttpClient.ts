import { parseJson } from './JsonHelper';

const startsWithSlash = RegExp.prototype.test.bind(/^\//);
const CACHE: { [key: string]: object } = {};
const isObject = (obj: {}) => /\sObject\]$/.test(Object.prototype.toString.apply(obj));

const encodeValue = (name: string, value: {}): string => {
    if (Array.isArray(value)) {
        return value.map(x => encodeValue(name, x)).join('&');
    } else {
        return encodeURIComponent(name) + '=' + encodeURIComponent(String(value || ''));
    }
};

const formEncode = (obj: string | { [key: string]: {} }, prefix?: string): string => {
    if (typeof obj === 'string') {
        return obj;
    }

    return Object.keys(obj)
        .map(k => (isObject(obj[k]) ? formEncode(obj[k], k + '.') : encodeValue(k, obj[k])))
        .filter(Boolean)
        .join('&');
};

export class HttpClient {
    public apiVersion = 1;
    public apiPrefix = null;

    /**
     * Executes a form post to the given `path` and expects a JSON result of type `T`
     */
    public postToJson = <T>(path: string, body?: string | {}, options?: RequestInit) => this.post(path, body, options).then(x => parseJson<T>(x));

    /**
     * Executes a form post to the given `path`
     */
    public post = (path: string, body?: string | {}, options?: RequestInit) =>
        this.request(path, {
            method: 'post',
            body: body && formEncode(body),
            ...options,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...(options && options.headers)
            }
        });

    /**
     * Executes a JSON post to the given `path` and expects a JSON result of type `T`
     */
    public postJsonToJson = <T>(path: string, body: {}, options?: RequestInit) =>
        this.postToJson<T>(path, typeof body === 'string' ? body : JSON.stringify(body), {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(options && options.headers)
            }
        });

    public getJson<T>(requestPath: string, options?: RequestInit) {
        let path = requestPath + (requestPath.indexOf('?') > -1 ? '&' : '?') + '_=' + Math.random();

        return this.request(path, options).then(x => parseJson<T>(x));
    }

    public getCachedJson = <T>(path: string, options?: RequestInit) => {
        let promise = CACHE[path] as Promise<T>;
        if (!promise) {
            promise = CACHE[path] = this.getJson<T>(path, options);
        }
        return promise;
    };

    public normalizePath = (path: string) => (startsWithSlash(path) ? path : `/api/${this.apiVersion}/${path}`);

    public request = (path: string, options?: RequestInit) => {
        return fetch(this.normalizePath(path), {
            ...options,
            credentials: 'same-origin',
            headers: {
                ...(options && options.headers),
                'X-Requested-With': 'fetch'
            }
        }).then(response => {
            return response;
        });
    };
}

export const client = new HttpClient();
