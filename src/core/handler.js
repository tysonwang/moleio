class Handler {
    constructor(status) {
        const _resolve = Symbol('resolve');
        const _reject = Symbol('reject');
        this.use = function (successHandler, errorHandler) {
            this.successHandler = successHandler;
            this.errorHandler = errorHandler;

        }
        this[status ? '_lock' : 'lock'] = () => {
            if (!resolve) {
                this.interceptors.p = new Promise((resolve, reject) => {
                    _resolve = resolve;
                    _reject = reject;
                })
            }
        }
        this[status ? '_unlock' : 'unlock'] = () => {
            if (resolve) {
                _resolve()
                this[status ? '_clear' : 'clear']();
            }
        }
        this[status ? '_clear' : 'clear'] = () => {
            if (reject) {
                reject("cancel");
                _clear();
            }
            interceptor.p = resolve = reject = null;
            reject("cancel");
            _clear();
        }

    }
}
