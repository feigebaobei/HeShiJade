import type { Options, S,
    //  A, ULID, B, N, 
    // Options, 
    B,
    N,
    } from "./base"

type ComponentItem = ComponentItemEmpty | ComponentItemInput | ComponentItemNumber | ComponentItemSelect | ComponentItemSwitch 
// interface ComponentItem {
//     category: '',
//     key: S
//     label: S
//     value?: S
// }

interface ComponentItemEmpty {
    category: '',
    key: S
    label: S
    value: S
}
interface ComponentItemInput {
    category: 'input',
    key: S
    label: S
    value: S
}
interface ComponentItemNumber {
    category: 'number',
    key: S
    label: S
    value: N
}
interface ComponentItemSelect {
    category: 'select',
    key: S
    label: S
    value: S | N | B
    options: Options<S, S | N | B>[]
}

interface ComponentItemSwitch {
    category: 'switch',
    key: S
    label: S
    checked: B
    // value: B
}

export {
    ComponentItem,
    ComponentItemInput,
    ComponentItemNumber,
    ComponentItemSelect,
    ComponentItemSwitch,
}