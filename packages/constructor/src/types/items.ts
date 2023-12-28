import type { Options, S,
    //  A, ULID, B, N, SelectOptionsItem 
    N,
    } from "./base"

interface ComponentItem {
    category: 'input' | 'select' | 'switch' | '',
    label: S
    key: S
    value: S | N
    options?: Options<S, S|N>[]
}

export {
    ComponentItem,
}