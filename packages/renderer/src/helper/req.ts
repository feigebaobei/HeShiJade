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



class UniqueReq {
    map: Map<S, Promise<A>>
    instance: A
    constructor(options: Oa) {
        this.map = new Map()
        this.instance = options['instance']
    }
    static getType(o: A) {
        return Object.prototype.toString.call(o).slice(8, -1) // 返回构造函数的名字 大写开头
    }
    static serializeObj(obj: Oa, uniqueKeys: S[]) {
        let s = ''
        let arr = Array.from(Object.keys(obj)).filter(k => uniqueKeys.includes(k))
        arr.sort((a, b) => (Number(a > b)))
        arr.forEach((k) => {
            switch (UniqueReq.getType(obj[k])) {
                case 'Object':
                    s += UniqueReq.serializeObj(obj[k], uniqueKeys)
                    break;
                default:
                    s += String(obj[k])
                    break;
            }
        })
        return s
    }
    req(params: AxiosRequestConfig, uniqueKeys: S[] = ['url', 'method', 'params', 'data']): Promise<A> {
        if (uniqueKeys.length) {
            let key = UniqueReq.serializeObj(params, uniqueKeys)
            if (this.map.has(key)) {
                return this.map.get(key)!
            } else {
                let p = this.instance(params).then((res: A) => {
                    this.map.delete(key)
                    return res
                }).catch((error: A) => {
                    this.map.delete(key)
                    return Promise.reject(error)
                })
                this.map.set(key, p)
                return p
            }
        } else {
            return this.instance(params)
        }
    }
    create() {}
}
let create = (options: Oa) => {
    let uniqueReq = new UniqueReq(options)
    return uniqueReq.req
}




export {
    // instance: 
    UniqueReq,
    create,
    instance,
    req,
}