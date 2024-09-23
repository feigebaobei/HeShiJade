import type {N, B, A, S, O, ConfigItem, 
    ConfigItemSelect,
    ConfigItemTextarea,
} from './base'

type PropsConfig = ConfigItem
// interface BehaviorConfigItem {
    // event: ConfigItemSelect<S>
    // fnBody: ConfigItemTextarea
//   }

// rename
type BehaviorConfigItem2 = ConfigItemSelect<S> | ConfigItemTextarea
type BehaviorConfigItem = BehaviorConfigItem2[]
// or
// interface BehaviorConfigItem extends Array<ConfigItemSelect<S> | ConfigItemTextarea> {
//     0: ConfigItemSelect<S>
//     1: ConfigItemTextarea
// }
  
interface BehaviorConfig {
    addable: B
    groups: BehaviorConfigItem[]
}
interface ItemsConfig {
    addable: B
    groups: ConfigItem[]
}
interface SlotsConfig {
    addable: B
    groups: ConfigItem[]
}

interface PropsConfigItem {
    [k: S]: ConfigItem
}

export type {
    PropsConfig,
    BehaviorConfig,
    // BehaviorConfigGroupsItem,
    BehaviorConfigItem,
    ItemsConfig,
    SlotsConfig,
    PropsConfigItem,
}
