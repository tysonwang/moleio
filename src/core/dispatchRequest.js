function dispatchRequest(url, data, options) {
  realOptions = normalizeOptions(url, data, options, this.config);
  options = Promise.resolve(realOptions);
  options.then(
    (opt)=>{
      return new Promise((res,rej)=>{
        let lockStatus = this.interceptors.request.lockList.includes(opt.url);
        queueIfLock(lockStatus&&this.interceptors.request.p,()=>{
          this.interceptors.request.cancelList.includes(opt.url)&&rej(opt);
          res(this.interceptors.request['successHandler'](opt,config)||opt);
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
// 测试 demo
//  let _res,_rej;
// let config= Promise.resolve(123);
// let lock = Promise.resolve(234324)
// let s = config.then(function(res){
//  return new Promise((resolve,reject)=>{
//     ifLock(lock,function(){
//   return resolve(123);
//   })
//   })
// },function(res){
//   return res;
// }).then(function(res){
//   console.log('res',res)
//   return res
// },function(res){
//   console.log('res',res)
// })
// function ifLock(p,fn){
//   if(p){
//     p.then(()=>{
//       fn()
//     })
//   }else{
//     fn()
//   }
// }

  export default dispatchRequest;