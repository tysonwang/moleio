import normalizeOptions from '../helper/normalizeOptions.js';
import utils from '../utils';
import emitEngine from './emitEngine'
function dispatchRequest(url, data, options) {
  const rq = this.interceptors.request;
  const rp = this.interceptors.response;
  const rqsHandler =  rq['successHandler'];
  const rpsHandler =  rp['successHandler'];
  const rpeHandler =  rq['errorHandler'];
  options = normalizeOptions(url, data, options,this);
  options.then(
    (opt)=>{
      console.log('opt',opt.url)
      return new Promise((res,rej)=>{
        let lockStatus = rq.lockList.includes(opt.url);
        utils.queueIfLock(lockStatus&&rq.p,()=>{
          rq.cancelList.includes(opt.url)&&rej(opt);
          res((rqsHandler&&rqsHandler(opt))||opt);
        })
      })
    },null).then(emitEngine,null).then((result)=>{
      console.log('result',result)
      return new Promise((res,rej)=>{
        let lockStatus = rp.lockList.includes(result.url);
        utils.queueIfLock(lockStatus&&rp.p,()=>{
          // this.interceptors.request.cancelList.length&&rej(opt); 关于响应错误 此处值得继续讨论
           res(rpsHandler&&rpsHandler(result)||result);
        })
      })
    },(result)=>{
      console.log('<>',result);
      return new Promise((res,rej)=>{
        let lockStatus = rp.lockList.includes(result.url);
        utils.queueIfLock(lockStatus&&rp.p,()=>{
          // this.interceptors.request.cancelList.length&&rej(opt); 关于响应错误 此处值得继续讨论
console.log('err-->')

          console.log( (rpeHandler && rpeHandler(result)) || result );
console.log('err>')
           rej((rpeHandler&&rpeHandler(result))||result);
        })
      })
    })
  }
  export default dispatchRequest;