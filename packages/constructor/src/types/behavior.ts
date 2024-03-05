import type { Options, S,
    //  A, ULID, B, N, 
    // Options, 
    B,
    N,
    } from "./base"
type Type = 'select' | 'input' | 'textarea'

interface BehaviorMeta {
    addable: B
    // groups: BehaviorItem[]
    groups: {
        event: S
        target: S
        payload: S
    }[]
}
interface BehaviorItem {
    event: {
        type: Type,
        options: Options<S, S>[],
        value: S,
        label: '事件',
    },
    target: {
        type: Type,
        value: S,
    },
    payload: {
        type: Type,
        value: S,
    },
}

type BehaviorItemKey = 'event' | 'target' | 'payload' // keyof typeof BehaviorItem

export {
    BehaviorItem,
    BehaviorMeta,
    BehaviorItemKey,
}