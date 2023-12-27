import type { S,
    //  A, ULID, B, N, SelectOptionsItem 
    } from "./base"
    interface ComponentItem {
        type: 'input' | 'select' | 'switch',
        label: S
        key: S
        value: S
    }

export {
    ComponentItem,
}