import type { Options, S,
    //  A, ULID, B, N, 
    A,
    // Options, 
    B,
    N,
} from "./base"
    
interface SlotsMeta {
    addable: B
    groups: {
        [k: S]: A
    }[]
}

export {
    SlotsMeta, 
}