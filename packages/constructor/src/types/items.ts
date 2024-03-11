import type { Options, S,
    B,
    N,
    A,
} from "./base"

interface ItemsMeta {
    addable: B
    groups: {
        [k: S]: A
    }[]
}
export {
    // ComponentItem,
    // ComponentItemInput,
    // ComponentItemNumber,
    // ComponentItemSelect,
    // ComponentItemSwitch,
    ItemsMeta,
    // ItemsConfig,
}