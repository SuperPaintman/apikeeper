interface CallbackSet {
    (error: any, response: any): void;
}

interface CallbackGet {
    (error: any, value: any): void;
}

interface CallbackMget {
    (error: any, value: any[]): void;
}

interface CallbackDel {
    (error: any, count: number): void;
}

interface CallbackTTL {
    (error: any, changed: boolean): void;
}

interface CallbackKeys {
    (error: any, keys: string[]): void;
}

interface CallbackError {
    (error: any, response: any): void;
}

interface Opts {
    forceString?: boolean;
    objectValueSize?: number;
    arrayValueSize?: number;
    stdTTL?: number;
    checkperiod?: number;
    useClones?: boolean;
}

interface Stats {
    /** global key count */
    keys: number;
    /** global hit count */
    hits: number;
    /** global miss count */
    misses: number;
    /** global key size count */
    ksize: number;
    /** global value size count */
    vsize: number;
}

interface oReturn<T> {
    t: number;
    v: any;
}

declare class NodeCache {
    constructor(opts?: Opts);

    /**
     * Set a cached key and change the stats
     * @param  {String}          key     - Cache key
     * @param  {Any}             value   - A element to cache. If the option `option.forceString` is `true` the module trys to translate it to a serialized JSON
     * @param  {Number|String}   [ttl]   - The time to live in seconds.
     * @param  {Function}        [cb]    - Callback function
     * 
     * @return {boolean}
     */
    set(key: string, value: any, ttl?: (string|number), cb?: CallbackSet): boolean;

    /**
     * Get a cached key and change the stats
     * @param  {String}      key            - Cache key
     * @param  {Function}    [callback]     - Callback function
     * 
     * @return {any}
     */
    get(key: string, callback?: CallbackGet): any; /** @todo change return */
    /**
     * Get multiple cached keys at once and change the stats
     * @param  {String[]}     keys           - An array of keys
     * @param  {Function}     [callback]     - Callback function
     * 
     * @return {any[]}
     */
    mget(keys: string[], callback?: CallbackMget): any[]; /** @todo change return */

    /**
     * Remove keys
     * @param  {String|String[]}   keys         - Cache key to delete or a array of cache keys
     * @param  {Function}          [callback]   - Callback function
     * 
     * @return {number}
     */
    del(keys: (string | string[]), callback?: CallbackDel): number;

    /**
     * Reset or redefine the ttl of a key. If `ttl` is not passed or set to 0 it's similar to `.del()`
     * @param  {String }      key          - cache key to reset the ttl value
     * @param  {Number}       [ttl]        - The time to live in seconds
     * @param  {Function}     [callback]   - Callback function
     * 
     * @return {boolean}
     */
    ttl(key: string, ttl?: number, callback?: CallbackTTL): boolean;

    /**
     * List all keys within this cache
     * @param  {Function} [callback]         - Callback function
     * 
     * @return {string[]}
     */
    keys(callback?: CallbackKeys): string[];

    /**
     * Get the stats
     * 
     * @return {Stats}
     */
    getStats(): Stats;

    /**
     * Flush the hole data and reset the stats
     */
    flushAll(): void;

    /**
     * This will clear the interval timeout which is set on checkperiod option.
     */
    close(): void;

    /**
     * Stop the checkdata period. Only needed to abort the script in testing mode.
     */
    private _killCheckPeriod(): void;

    /**
     * Internal method the check the value. If it's not valid any moe delete it
     */
    private _check(key: string, data: any): boolean;

    /**
     * Internal method to wrap a value in an object with some metadata
     */
    private _wrap(value: any, ttl: number, asClone: boolean): any;
    /**
     * Internal method to extract get the value out of the wrapped value
     */
    private _unwrap(value: any, asClone: boolean): any;

    /**
     * Internal method the calculate the key length
     */
    private _getKeyLength(key: string): number;
    /**
     * Internal method to calculate the value length
     */
    private _getValLength(value: any): number;

    /**
     * Internal method to handle an error message
     */
    private _error(type, data: Object, cb?: CallbackError): any;
}

declare module 'node-cache' {
    export = NodeCache;
}