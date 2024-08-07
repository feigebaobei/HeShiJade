import type {N, B, A, S, ULID, O, SelectOptionsItem, ConfigItem, 
    ConfigItemSelect,
    ConfigItemInput,
    ConfigItemTextarea,
} from './base'
import type { Component } from './component'

type PropsConfig = ConfigItem
// interface BehaviorConfigGroupsItem {
//     // event: ConfigItem,
//     event: ConfigItemSelect
//     target: ConfigItem
//     payload: ConfigItem
// }
interface BehaviorConfigItem {
    // event: ConfigItem
    // target: ConfigItem
    // payload: ConfigItem
    // event: ConfigItemSelect
    // event: Record<ConfigItemSelect>
    // event: {
    //     category: 'select'
    //     value: S
    //     options: SelectOptionsItem[]
    //     label: S
    //     key: S
    // }
    event: ConfigItemSelect<S>
    target: ConfigItemInput
    payload: ConfigItemTextarea & ThisType<Component> // 思考为了hide方法的可以得到component对象，使用this还是使用参数。 2024.06.01+
  }
  
interface BehaviorConfig {
    addable: B
    // groups: BehaviorConfigGroupsItem[]
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
