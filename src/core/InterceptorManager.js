class InterceptorManager {
    constructor() {
        const _resolve = Symbol('resolve');
        const _reject = Symbol('reject');
        this.use = (successHandler, errorHandler) => {
            this.successHandler = successHandler;  // 请求与响应的正确处理 this.interceptor.request.successHandler
            this.errorHandler = errorHandler; // 响应错误处理
        }
        this.cancelList = [];
        this.lockList = [];
        this.lock = (url)=>{
            this.lockList.push(url);
            if(_resolve){
                this.p = new Promise((resolve,reject)=>{
                    _resolve = resolve;
                    _reject = reject;
                })
            }
        }
        this.unlock =(url)=>{
             if(_resolve&&this.lockList.indexOf(url)>-1){
                 _resolve()
             }
        }
        this.cancel = (url) => {
           this.cancelList.push(url);
        }
        this.clear = (url) => {
            this.p = _resolve = _reject = null;
            this.cancelList = [];
            this.lockList =[];
        }

    }
}
export default InterceptorManager;