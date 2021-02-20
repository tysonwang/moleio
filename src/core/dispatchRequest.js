import normalizeOptions from '../helper/normalizeOptions.js';

function dispatchRequest(url, data, options) {
  console.log(url)
  console.log(this)
  console.log(data)
  realOptions = normalizeOptions(url, data, options);
  realOptions.engine = this.engine;
  utils.merge(options, this.config);
  options = Promise.resolve(realOptions);
  options.then(
    (opt)=>{
      return new Promise((res,rej)=>{
        let lockStatus = this.interceptors.request.lockList.includes(opt.url);
        queueIfLock(lockStatus&&this.interceptors.request.p,()=>{
          this.interceptors.request.cancelList.includes(opt.url)&&rej(opt);
          res(this.interceptors.request['successHandler'](opt)||opt);
        })
      })
    },null).then(emitEngine,null).then((result)=>{
      return new Promise((res,rej)=>{
        let lockStatus = this.interceptors.response.lockList.includes(opt.url);
        queueIfLock(lockStatus&&this.interceptors.response.p,()=>{
          // this.interceptors.request.cancelList.length&&rej(opt); 关于响应错误 此处值得继续讨论
           res(this.interceptors.response['successHandler'](result)||result);
        })
      })
    },this.interceptors.response['errorHandler'])
  }
  export default dispatchRequest;