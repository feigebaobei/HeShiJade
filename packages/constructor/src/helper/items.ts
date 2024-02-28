// import type { ComponentPropsMetaRaw } from 'src/types/props'
import { B, Options, S, N } from 'src/types/base';
import type { ComponentItem } from 'src/types/items';

// todo 移入types目录
interface ComponentItemsSetter {
    addable: B
    optionMap?: {
        [k: S]: Options<S, S>[]
    }
    groupTemplate: ComponentItem
    showCondition?: B // 显隐
    checkRules?: CheckExp // 校验
}
interface CheckExp {
    value: S // 对应form中的key
    operator: Options<S, S>
    threshold: N | S
}
interface Operator {
    [k: S]: N
}

let Form: ComponentItemsSetter = {
    addable: true,
    optionMap: { // 模板中项为select时的选项。
        category: [ // 当category为select时使用
          { label: 'input', value: 'input', },
          { label: 'select', value: 'select', },
          { label: 'switch', value: 'switch', },
        ],
    },
    groupTemplate: {
        category: '',
        key: '',
        label: '',
        value: '',
        // showCondition: '',
    },
}
export {
    // Button,
    // Input,
    // Select,
    // Modal,
    Form,
}