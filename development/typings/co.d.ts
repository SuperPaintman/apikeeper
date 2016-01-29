declare module "co" {
    /**
     * Returns a promise that resolves a generator, generator function, or any function that returns a generator.
     */
    function co<T>(generatorFunction: Function): Promise<T>;

    module co {
        /**
         * Convert a generator into a regular function that returns a Promise.
         */
        export function wrap<T>(generatorFunction: Function): (...args: any[]) => Promise<T>;
    }

    export = co;
}