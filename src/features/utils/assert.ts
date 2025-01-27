export function assert(key: any): asserts key is true {

    if (!key) {
        throw new Error(`Property is null or undefined.`);
    }

}