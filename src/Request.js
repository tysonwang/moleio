import util from './utils'
export default class Request {
    constructor(that){
      let engine = new that.engine;
      let contentTypeLowerCase = contentType.toLowerCase();
      let promise = new Promise((resolve,reject)=>{

      })
      return promise;
    }

    enqueueIfLocked(promise, callback) {
        if (promise) {
            promise.then(() => {
                callback()
            })
        } else {
            callback()
        }
    }
}