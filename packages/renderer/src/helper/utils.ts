// import { DataService } from 'src/app/service/data.service';
// import { HttpClient } from '@angular/common/http';

// let http = new HttpClient()

// let dataService = new DataService(http)

// let req = () => {
    
// }
// let initUtils = () => {

// }
import { req, } from "./req"
import { pool, getComponentInstance as _getComponentInstance } from "./pool"

let getComponentInstance = _getComponentInstance.bind(pool)
export {
    req,
    // 'a': 2,
    getComponentInstance,
    // getComponentInstance: _getComponentInstance.bind(pool),
    // pool.getComponentInstance.bind(pool), // 绑定指定方法的this
}