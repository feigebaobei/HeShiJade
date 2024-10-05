import axios from 'axios'
// type
import type { A, Oa, N, S } from "src/types/base"
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosPromise,
    AxiosInterceptorManager,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from 'axios'
type Method = 'option' | 'get' | 'post' | 'put' | 'delete'
interface RequestData {
    baseURL?: S
    url: S
    method: Method
    params?: Oa
    data?: Oa

}
interface ResponseData {
    code: N
    message: S
    data: A
}
interface NewAxiosInstance extends AxiosInstance {
    <T = A>(config: AxiosRequestConfig): AxiosPromise<T>
    interceptors: {
        request: AxiosInterceptorManager<InternalAxiosRequestConfig>
        response: AxiosInterceptorManager<AxiosResponse<ResponseData>>
    }
}
type Req = (p: RequestData) => Promise<ResponseData>

let instance: NewAxiosInstance = axios.create({
    timeout: 5000,
    headers: {},
    withCredentials: true,
})
instance.interceptors.request.use((config: A) => {
    return config
}, (error: A) => {
    return Promise.reject(error)
})
instance.interceptors.response.use((res: A) => {
    return res
}, (error: A) => {
    return Promise.reject(error)
})
let req: Req = (p: RequestData) => {
    return instance(p).then((res) => {
        if (res.data.code === 0) {
            return res.data
        } else {
            return Promise.reject(res.data)
        }
    })
}

export {
    req,
    instance,
}
export type {
    Req,
    Method,
    RequestData,
    ResponseData,
}