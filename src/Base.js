export default class Base {
    constructor(engine) {
        const resolve = Symbol('resolve');
        const reject = Symbol('reject');
        this.lock = function (interceptor) {
            if (!resolve) {
                this[interceptor]['p'] = new Promise((_resolve, _reject) => {
                    this[resolve] = _resolve;
                    this[reject] = _reject;
                })
            }
        }
        this.unlock = function (interceptor) {
            if (resolve) {
                this[resolve]();
                delete this[interceptor][p];
                this[reject] = this[resolve] = null;

            }
        }

        this.lockEnqueue = (promise, callback)=>{
            if (promise) {
                promise.then(() => {
                    callback()
                })
            } else {
                callback()
            }
        }

        this.engine = engine || Base.createXHR();
        this.config = {
            method: 'GET',
            headers: {},
            timeout: 0,
            params: {},
            baseUrl: "",
            withCredentials: false,
            parseJson:true,
            fileChunkSize: 2 * 1024 * 1024, //2M
            fileType: 'blob', //上传文件类型 备用类型  base64 ,buffer ,stream
            responseType: 'json',
            customHeaders: {}
        }
    }

    static createXHR() {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"],
                    i, len;
                for (i = 0, len = versions.length; i < len; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {

                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("平台不支持ajax请求");
        }
    }
    middleware(requestInterceptor, responseInterceptor) {
        // 请求与相应的拦截器
        this.requestInterceptor = requestInterceptor;
        this.responseInterceptor = responseInterceptor;
    }
    requestInterceptor(request) {
        return request;

    }
    responseInterceptor(response, err) {
        return response;
    }
}
