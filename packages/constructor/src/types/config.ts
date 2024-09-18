import type {N, B, A, S, ULID, O, SelectOptionsItem, ConfigItem, 
    ConfigItemSelect,
    ConfigItemInput,
    ConfigItemTextarea,
} from './base'
import type { Component } from './component'

type PropsConfig = ConfigItem
interface BehaviorConfigItem {
    event: ConfigItemSelect<S>
    // target: ConfigItemInput
    // payload: ConfigItemTextarea & ThisType<Component> // 思考为了hide方法的可以得到component对象，使用this还是使用参数。 2024.06.01+
    fnBody: ConfigItemTextarea
  }
  
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
