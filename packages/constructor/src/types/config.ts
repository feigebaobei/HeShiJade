import type {N, B, A, S, O, ConfigItem, 
    ConfigItemSelect,
    ConfigItemTextarea,
} from './base'

type PropsConfig = ConfigItem
// interface BehaviorConfigGroup {
    // event: ConfigItemSelect<S>
    // fnBody: ConfigItemTextarea
//   }

// rename
type BehaviorConfigItem = ConfigItemSelect<S> | ConfigItemTextarea
type BehaviorConfigGroup = BehaviorConfigItem[]
// or
// interface BehaviorConfigGroup extends Array<ConfigItemSelect<S> | ConfigItemTextarea> {
//     0: ConfigItemSelect<S>
//     1: ConfigItemTextarea
// }
  
interface BehaviorConfig {
    addable: B
    groups: BehaviorConfigGroup[]
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
    BehaviorConfigGroup,
    ItemsConfig,
    SlotsConfig,
    PropsConfigItem,
}
