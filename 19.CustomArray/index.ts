export { }

declare global {
    interface Array<T> {
        /**
         * 
         * @param predicate A function that accepts one parameter. The all method calls the predicate function one time for each element in the array
         * @returns returns true if all elements match the given predicate
         */
        all(predicate: (elem: T) => boolean): boolean;
        /**
         * @param predicate A function that accepts one parameter. The any method calls the predicate function one time for each element in the array
         * @returns true if sequence has at least one element
         */
        any(predicate: (elem: T) => boolean): boolean;
        /**
         * 
         * @param keySelector function that creates index for each element
         * @returns Returns a Map containing the elements from the given sequence indexed by the key returned from keySelector function applied to each elemen
         */
        associateBy<R>(keySelector: (param: T) => R): Map<R, T>;
        /**
         * @returns average value in the array if all element's type is number else returns null 
         */
        average(): number | null;
        /**
         * @param size the number of elements to take in each list, must be positive and can be greater than the number of elements in this array.
         * @returns Splits this array into a array of array each not exceeding the given size.
         */
        chunked(size: number): T[][];
        /**
         * 
         * @param selector A function that accepts up to three arguments. Return distinct keys 
         * @returns array of distinct
         */
        distinctBy(selector: (elem: T) => any): T[];
        /**
         * 
         * @param predicate A function that accepts one parameter. The filterOwn method calls the predicate function one time for each element in the array
         * @returns Returns an array containing only elements matching the given predicate 
         */
        filterOwn(predicate: (elem: T) => boolean): T[];
        /**
       * 
       * @param predicate function that takes the index of an element and the element itself and returns the result of predicate evaluation on the element
       * @returns Returns an array containing only elements matching the given predicate 
       */
        filterIndexed(predicate: (index: number, elem: T) => boolean): T[];
        /**
      * 
      * @param predicate A function that accepts one parameter. The filterNot method calls the predicate function one time for each element in the array
      * @returns Returns an array containing only elements that not matching the given predicate 
      */
        filterNot(predicate: (elem: T) => boolean): T[];
        /**
         * 
         * @param predicate A function that accepts one parameter. The find method calls the predicate function one time for each element in the array
         * @returns A first element of array that matches the given predicate or null if no matching element
         */
        find(predicate: (elem: T) => boolean): T | null;
        /**
        * 
        * @param predicate A function that accepts one parameter. The findLast method calls the predicate function one time for each element in the array
        * @returns A last element of array that matches the given predicate or null if no matching element
        */
        findLast(predicate: (elem: T) => boolean): T | null;
        /**
         * 
         * @param initial Initial value for the accumulator
         * @param operation A function that takes current accumulator value and an element, and calculates the next accumulator value
         * @returns An accumulated value. If array is empty returns the initial value
         */
        fold<R>(initial: R, operation: (acc: R, elem: T) => R): R;
        /**
         * 
         * @param selector A function for searching largest value
         * @returns Returns the first element yielding the largest value of the given function or null if there are no elements.
         */
        maxBy(selector: (elem: T) => number): T | null;
        /**
         * 
         * @param selector A function for searching minimum value
         * @returns Returns the first element yielding the largest value of the given function or null if there are no elements.
         */
        minBy(selector: (elem: T) => number): T | null;
        /**
         * 
         * @param selector A function that accepts one parameter. Used for searching elements
         * @returns A count of elements from array that matches the given selector or 0 if no matching element
         */
        countBy(selector: (elem: T) => boolean): number;
        /**
         * 
         * @param selector A function that accepts element of array. a groupBy use this for each element of array
         * @returns returns a map where each group key is associated with a list of corresponding elements
         */
        groupBy<K>(selector: (elem: T) => K): Map<K, T[]>;
        /**
         * 
         * @param selector A function that accepts element of array. a groupBy use this for each element of array
         * @param valueTransform Transforms original value
         * @returns A map with key create from selector, value selected elements
         */
        groupByTransformer<K, V>(selector: (elem: T) => K, valueTransform: (elem: T) => V): Map<K, V[] | T[]>;
    }
}

Object.defineProperties(Array.prototype, {
    all: {
        value: function <T>(this: T[], predicate: (elem: T) => boolean): boolean {
            if(this.length < 1){ 
                return false; 
            }
            for(const elem of this){ 
                if (!predicate(elem)){ 
                    return false; 
                }
            }
            return true; 
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    any: {
        value: function <T>(this: T[], predicate: (elem: T) => boolean): boolean {
            if(this.length < 1){ 
                return false; 
            }
            for(const elem of this){ 
                if (predicate(elem)){ 
                    return true; 
                }
            }
            return false; 
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    associateBy: {
        value: function <T, R>(this: T[], keySelector: (param: T) => R): Map<R, T> {
            const map = new Map<R, T>();
            for (let value of this) {
                map.set(keySelector(value), value);
            }
            return map;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    average: {
        value: function <T>(this: T[]): number | null {
            let total = 0;
            for (let elem of this) {
                if (typeof elem !== 'number') {
                    return null;
                } else {
                    total += elem;
                }
            }
            return total / this.length;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    chunked: {
        value: function <T>(this: T[], size: number): T[][] {
            let chunks: T[][] = [];
            for (let i = 0; i < this.length; i += size) {
                chunks.push(this.slice(i, i + size));
            }
            return chunks;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    distinctBy: {
        value: function <T>(this: T[], selector: (elem: T) => any): T[] {
            const map = new Map<any, T>();
            for (let elem of this) {
                if (!map.get(selector(elem))) {
                    map.set(selector(elem), elem);
                }
            }
            return Array.from(map.values());
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    filterOwn: {
        value: function <T>(this: T[], predicate: (elem: T) => boolean): T[] {
            const filtered: T[] = [];
            for (let elem of this) {
                if (predicate(elem)) {
                    filtered.push(elem);
                }
            }
            return filtered;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    filterIndexed: {
        value: function <T>(this: T[], predicate: (index: number, elem: T) => boolean): T[] {
            const filtered: T[] = [];
            for (let i = 0; i < this.length; i++) {
                if (predicate(i, this[i])) {
                    filtered.push(this[i]);
                }
            }
            return filtered;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    filterNot: {
        value: function <T>(this: T[], predicate: (elem: T) => boolean): T[] {
            const filtered: T[] = [];
            for (let elem of this) {
                if (!predicate(elem)) {
                    filtered.push(elem);
                }
            }
            return filtered;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    find: {
        value: function <T>(this: T[], predicate: (elem: T) => boolean): T | null {
            for (let elem of this) {
                if (predicate(elem)) {
                    return elem;
                }
            }
            return null;
        },
        enumerable: true,
    }
});


Object.defineProperties(Array.prototype, {
    findLast: {
        value: function <T>(this: T[], predicate: (elem: T) => boolean): T | null {
            let matchingElem = null;
            for (let elem of this) {
                if (predicate(elem)) {
                    matchingElem = elem;
                }
            }
            return matchingElem;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    fold: {
        value: function <T, R>(this: T[], initial: R, operation: (acc: R, elem: T) => R): R {
            for (let elem of this) {
                initial = operation(initial, elem);
            }
            return initial;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    maxBy: {
        value: function <T>(this: T[], selector: (elem: T) => number): T | null {
            let curLarge = -Infinity;
            let curLargeElem = null;
            for (let elem of this) {
                if (curLarge < selector(elem)) {
                    curLargeElem = elem;
                    curLarge = selector(elem);
                }
            }
            return curLargeElem;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    minBy: {
        value: function <T>(this: T[], selector: (elem: T) => number): T | null {
            let curMin = Infinity;
            let curMinElem = null;
            for (let elem of this) {
                if (curMin > selector(elem)) {
                    curMinElem = elem;
                    curMin = selector(elem);
                }
            }
            return curMinElem;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    countBy: {
        value: function <T>(this: T[], selector: (elem: T) => boolean): number {
            let counts = 0;
            for (let elem of this) {
                if (selector(elem)) {
                    counts++;
                }
            }
            return counts;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    groupBy: {
        value: function <T, K>(this: T[], selector: (elem: T) => K): Map<K, T[]> {
            const map = new Map<K, T[]>();
            for (let elem of this) {
                let empty: T[] = [];
                if (map.get(selector(elem))) {
                    empty = map.get(selector(elem)) || [];
                    empty.push(elem);
                    map.set(selector(elem), empty);
                } else {
                    empty.push(elem);
                    map.set(selector(elem), empty);
                }
            }
            return map;
        },
        enumerable: true,
    }
});

Object.defineProperties(Array.prototype, {
    groupByTransformer: {
        value: function <T, K, V>(this: T[], selector: (elem: T) => K, valueTransform: (elem: T) => V): Map<K, V[]> {
            const map = new Map<K, V[]>();
            for (let elem of this) {
                let empty: V[] = [];
                if (map.get(selector(elem))) {
                    empty = map.get(selector(elem)) || [];
                    empty.push(valueTransform(elem));
                    map.set(selector(elem), empty);
                } else {
                    empty.push(valueTransform(elem))
                    map.set(selector(elem), empty);
                }
            }
            return map;
        },
        enumerable: true,
    }
});

