import axios from 'axios'
import type {AxiosRequestConfig, AxiosResponse} from 'axios'
import { A, Oa, S } from 'src/types/base'


let instance = axios.create({
    timeout: 5000
})
instance.interceptors.request.use((config) => {
    return config
})

let getType = (o: A) => Object.prototype.toString.call(o).slice(8, -1) // 返回构造函数的名字 大写开头

let map = new Map()
let serializeObj = (obj: Oa, uniqueKeys: S[]) => {
    let s = ''
    let arr = Array.from(Object.keys(obj)).filter(k => uniqueKeys.includes(k))
    arr.sort((a, b) => (Number(a > b)))
    arr.forEach((k) => {
        switch (getType(obj[k])) {
            case 'Object':
                s += serializeObj(obj[k], uniqueKeys)
                break;
            default:
                s += String(obj[k])
                break;
        }
    })
    return s
}

let req = (params: AxiosRequestConfig, uniqueKeys: S[] = ['url', 'method', 'params', 'data']): Promise<AxiosResponse<any, any>> => {
    if (uniqueKeys.length) {
        let key = serializeObj(params, uniqueKeys)
        if (map.has(key)) {
            return map.get(key)
        } else {
            let p = instance(params).then((res) => {
                map.delete(key)
                return res
            }).catch((error) => {
                map.delete(key)
                return Promise.reject(error)
            })
            map.set(key, p)
            return p
        }
    } else {
        return instance(params)
    }
}



export {
    // instance: 
    instance,
    req,
}