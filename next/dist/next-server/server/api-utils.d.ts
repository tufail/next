/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from '../lib/utils';
import { Params } from './router';
export declare type NextApiRequestCookies = {
    [key: string]: string;
};
export declare type NextApiRequestQuery = {
    [key: string]: string | string[];
};
export declare type __ApiPreviewProps = {
    previewModeId: string;
    previewModeEncryptionKey: string;
    previewModeSigningKey: string;
};
export declare function apiResolver(req: IncomingMessage, res: ServerResponse, params: any, resolverModule: any, apiContext: __ApiPreviewProps, onError?: ({ err }: {
    err: any;
}) => Promise<void>): Promise<void>;
/**
 * Parse incoming message like `json` or `urlencoded`
 * @param req request object
 */
export declare function parseBody(req: NextApiRequest, limit: string | number): Promise<any>;
/**
 * Parsing query arguments from request `url` string
 * @param url of request
 * @returns Object with key name of query argument and its value
 */
export declare function getQueryParser({ url }: IncomingMessage): () => NextApiRequestQuery;
/**
 * Parse cookies from `req` header
 * @param req request object
 */
export declare function getCookieParser(req: IncomingMessage): () => NextApiRequestCookies;
/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */
export declare function sendStatusCode(res: NextApiResponse, statusCode: number): NextApiResponse<any>;
/**
 * Send `any` body to response
 * @param res response object
 * @param body of response
 */
export declare function sendData(res: NextApiResponse, body: any): void;
/**
 * Send `JSON` object
 * @param res response object
 * @param jsonBody of data
 */
export declare function sendJson(res: NextApiResponse, jsonBody: any): void;
export declare const SYMBOL_PREVIEW_DATA: unique symbol;
export declare function tryGetPreviewData(req: IncomingMessage, res: ServerResponse, options: __ApiPreviewProps): object | string | false;
/**
 * Custom error class
 */
export declare class ApiError extends Error {
    readonly statusCode: number;
    constructor(statusCode: number, message: string);
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */
export declare function sendError(res: NextApiResponse, statusCode: number, message: string): void;
interface LazyProps {
    req: NextApiRequest;
    params?: Params | boolean;
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */
export declare function setLazyProp<T>({ req, params }: LazyProps, prop: string, getter: () => T): void;
export {};
