import Dictionary from "typescript-collections/dist/lib/Dictionary";

export class CollectionUtil {

    public static contains2(array: any[], object: any): boolean {
        for (let i: number = 0; i < array.length; i++) {
            if (array[i] === object) {
                return true;
            }
        }

        return false;
    }

    public static last(array: any[]): any {
        return array[array.length - 1];
    }

    /**
     * Iterates through a dictionary and calls iterationFunction.
     * If iterationFunction returns true the key gets stored.
     * all stored key will finally be removed from the dictionary.
     * @param dict
     * @param iterationFunction
     */
    public static removeDictElementIfTrue<S, T, V>(thisPointer: S, dict: Dictionary<T, V>,
                                                   iterationFunction: (thisPointer: S, key: T, value: V) => boolean): void {
        let toDeleteEntries: T[] = [];
        dict.forEach(function (key: T, value: V): void {
            let shallDelete: boolean = iterationFunction(thisPointer, key, value);
            if (shallDelete) {
                toDeleteEntries.push(key);
            }
        });

        for (let i: number = 0; i < toDeleteEntries.length; i++) {
            dict.remove(toDeleteEntries[i]);
        }
    }

    public static getLastElement<T>(array: T[]): T {
        return array[array.length - 1];
    }

    public static binarySearch<T>(array: T[],
                                  element: T,
                                  cmp: (elem1: T, elem2: T) => number,
                                  startIndex: number = 0,
                                  endIndex: number = array.length - 1): number {
        let mid: number = 1;
        while (startIndex < endIndex) {
            mid = Math.floor((startIndex + endIndex) / 2);
            let c: number = cmp(array[mid], element);
            if (c === 0) {
                return mid;
            }
            if (c < 0) {
                startIndex = mid + 1;
            }
            if (0 < c) {
                endIndex = mid;
            }
        }

        return -mid;
    }
}
