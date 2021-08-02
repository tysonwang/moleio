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
  console.log('options',options)
  return options.then(
    (opt)=>{
      return new Promise((res,rej)=>{
        let lockStatus = rq.lockList.includes(opt.url);
        utils.queueIfLock(lockStatus&&rq.p,()=>{
          rq.cancelList.includes(opt.url)&&rej(opt);
          res((rqsHandler&&rqsHandler(opt))||opt);
        })
      })
    },null).then(emitEngine,null).then((result)=>{
      return new Promise((res,rej)=>{
        console.log('ccc',result)
        let lockStatus = rp.lockList.includes(result.url);
        utils.queueIfLock(lockStatus&&rp.p,()=>{
          // this.interceptors.request.cancelList.length&&rej(opt); 关于响应错误 此处值得继续讨论
           res(rpsHandler&&rpsHandler(result)||result);
        })
      })
    },(error)=>{
      return new Promise((res,rej)=>{
        console.log('>',error)
        rej(error)
      })
    })
  }
  export default dispatchRequest;