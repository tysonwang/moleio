class Handler {
    constructor(status) {
        const resolve = Symbol('resolve');
        const reject = Symbol('reject');
        this.use = function (successHandler, errorHandler) {
            this.successHandler = successHandler;  // 请求与响应的正确处理
            !status ? this.errorHandler = errorHandler : null; // 响应错误处理
        }
        if (status) {
            this.lock =  (url)=>{
                if (!resolve) {
                    this.p = new Promise((_resolve, _reject) => {
                        resolve = _resolve;
                        reject = _reject;
                    })
                }
            }
            this.unlock = (url)=>{
                if(resolve){
                    resolve();
                    this.clear()
                }
            }
            this.cancel = (url)=>{
                if (reject) {
                    reject("cancel");
                    _clear();
                }
            }
            this.clear = (url)=>{
                if (reject) {
                    reject("cancel");
                    _clear();
                }
            }
        }
    }
}
