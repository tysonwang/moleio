class Handler {
    constructor() {
        const resolve = Symbol('resolve');
        const reject = Symbol('reject');
        this.use = (successHandler, errorHandler) => {
            this.successHandler = successHandler;
            this.errorHandler = errorHandler;
        }
        this.lock = () => {
            if (!resolve) {
                this.interceptors.p = new Promsie((_resolve, _reject) => {
                    resolve = _resolve;
                    reject = _reject;
                })
            }
        }
        this.unlock = () => {
            if (resolve) {
                resolve();
                this.clear();
            }
        }
        this.clear = () => {
            if (reject) {
                reject('cancel')
                this.interceptors.p = resolve = reject = null;
            }
        }
        this.cancel = () => {
            if (resolve) {
                this.interceptors.p = resolve = reject = null;
            }
        }
    }
}

export default Handler;