// type
import type { A, N, S, B, ULID, } from "src/types/base"

// type isDoubleDirection
interface KvMapPrototype<T, G> {
    get: (k: T) => G
    set: (k: T, v: G) => void
    delete: (k: T) => B
}
interface KvMap<T, G> extends KvMapPrototype<T, G> {
    _map: Map<T, G>
}

let kvMapPrototype: KvMapPrototype<A, A> = Object.create({}, {
    // get() {}
    // set() {}
    get: {
        writable: false,
        enumerable: true,
        configurable: true,
        value: function <T, G>(key: T) {
            return this._map.get(key) as G
        }
    },
    set: {
        writable: false,
        enumerable: true,
        configurable: true,
        value: function <T, G>(k: T, v: G) {
            this._map.set(k, v)
            if (this.isDoubleDirection) {
                this._map.set(k, v)
                this._map.set(v, k)
            } else {
                this._map.set(k, v)
            }
        }
    },
    delete: {
        writable: false,
        enumerable: true,
        configurable: true,
        value: function <T>(k: T) {
            let v = this.get(k)
            if (this.isDoubleDirection) {
                this._map.delete(v)
                this._map.delete(k)
            } else {
                this._map.delete(k)
            }
        }

    }
})
let createKvMap = <T, G>(isDoubleDirection: B = true): KvMap<T, G> => {
    return Object.create(kvMapPrototype, {
        _map: {
            writable: true,
            value: new Map<T, G>(),
        },
        isDoubleDirection: {
            writable: false,
            value: isDoubleDirection,
        },
    })
}
// class KvMap<T, G> {
//     private _map: Map<T, G> | Map<G, T>
//     public isDoubleDirection: B
//     constructor(isDoubleDirection: B) {
//         this._map = new Map()
//         this.isDoubleDirection = isDoubleDirection
//     }
//     get(k: T & G) {
//         // if (this.isDoubleDirection) {}
//         return this._map.get(k)
//     }
//     set(k: T, v: G) {
//         if (this.isDoubleDirection) {
//             this._map.set(k, v)
//             this._map.set(v, k)
//         } else {
//             this._map.set(k, v)
//         }
//     }
//     delete(k) {
//         let v = this.get(k)
//         if (this.isDoubleDirection) {
//             this._map.delete(k)
//             this._map.delete(v)
//         } else {
//             this._map.delete(k)
//         }
//     }
// }
export {
    createKvMap,
    KvMap,
}
// export type {
//     // KvMap,
// }