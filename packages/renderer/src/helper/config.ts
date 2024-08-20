import { S } from "src/types/base"

let serviceUrl = () => {
    let location = window.location
    let r: S
    switch (location.hostname) {
        case 'heshijade.com':
            r = `${location.protocol}//${location.hostname}:5000` // host包括接口号
            break;
        default:
            // r = 'http://heshijade.com:5000' // host包括接口号
            r = 'http://localhost:5000'
            break;
    }
    return r
}
let popupsComponents = ['Modal']


export {
    serviceUrl,
    popupsComponents,
}