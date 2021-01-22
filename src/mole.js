import utils from './utils';
import engine from './env';
import Base from './Base';
class Mole extends Base {
    constructor(engine) {
        const launch = Symbol('launch');
        const getResult = Symbol('getResult');
        
        this[getResult] = (handler, data, type) => {
            this.lockQueue(this.interceptor.p, function () {
                if (handler) {
                    //如果失败，添加请求信息
                    if (type) {
                        data.request = options;
                    }
                    let ret = handler.call(responseInterceptor, data, Promise)
                    data = ret === undefined ? data : ret;
                }
                if (!isPromise(data)) {
                    data = Promise[type === 0 ? "resolve" : "reject"](data)
                }
                data.then(d => {
                    resolve(d)
                }).catch((e) => {
                    reject(e)
                })
            })
        }

        this[launch] = function (options) {
            const data = options.body;
            const url = options.url.trim();
            const baseUrl = options.baseUrl || "";
            if (!url && document & !baseUrl) url = location.href;
            if (url.indexOf("http") !== 0) {
                let isAbsolute = url[0] === "/";
                if (!baseUrl && isBrowser) {
                    let arr = location.pathname.split("/");
                    arr.pop();
                    baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"))
                }
                if (baseUrl[baseUrl.length - 1] !== "/") {
                    baseUrl += "/"
                }
                url = baseUrl + (isAbsolute ? url.substr(1) : url)
                if (isBrowser) {
                    let t = document.createElement("a");
                    t.href = url;
                    url = t.href;
                }
            }
            let responseType = utils.trim(options.responseType || "")
            let needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
            let dataType = utils.type(data);
            let params = options.params || {};

        }

        function makeRequest(options) {

            if (needQuery && dataType === "object") {
                params = utils.merge(data, params)
            }
            // encode params to String
            params = utils.formatParams(params);

            // save url params
            let _params = [];
            if (params) {
                _params.push(params);
            }
            // Add data to url params when the method is "GET" (data is String)
            if (needQuery && data && dataType === "string") {
                _params.push(data);
            }

            // make the final url
            if (_params.length > 0) {
                url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
            }

            engine.open(options.method, url);

            // try catch for ie >=9
            try {
                engine.withCredentials = !!options.withCredentials;
                engine.timeout = options.timeout || 0;
                if (responseType !== "stream") {
                    engine.responseType = responseType
                }
            } catch (e) {
            }

            let customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];

            // default content type
            let _contentType = "application/x-www-form-urlencoded";
            // If the request data is json object, transforming it  to json string,
            // and set request content-type to "json". In browser,  the data will
            // be sent as RequestBody instead of FormData
            if (utils.trim((customContentType || "").toLowerCase()) === _contentType) {
                data = utils.formatParams(data);
            } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                _contentType = 'application/json;charset=utf-8'
                data = JSON.stringify(data);
            }
            //If user doesn't set content-type, set default.
            if (!(customContentType || needQuery)) {
                options.headers[contentType] = _contentType;
            }

            for (let k in options.headers) {
                if (k === contentType && utils.isFormData(data)) {
                    // Delete the content-type, Let the browser set it
                    delete options.headers[k];
                } else {
                    try {
                        // In browser environment, some header fields are readonly,
                        // write will cause the exception .
                        engine.setRequestHeader(k, options.headers[k])
                    } catch (e) {
                    }
                }
            }

            function onresult(handler, data, type) {
                enqueueIfLocked(responseInterceptor.p, function () {
                    if (handler) {
                        //如果失败，添加请求信息
                        if (type) {
                            data.request = options;
                        }
                        let ret = handler.call(responseInterceptor, data, Promise)
                        data = ret === undefined ? data : ret;
                    }
                    if (!isPromise(data)) {
                        data = Promise[type === 0 ? "resolve" : "reject"](data)
                    }
                    data.then(d => {
                        resolve(d)
                    }).catch((e) => {
                        reject(e)
                    })
                })
            }


            function onerror(e) {
                e.engine = engine;
                onresult(responseInterceptor.onerror, e, -1)
            }

            function Err(msg, status) {
                this.message = msg
                this.status = status;
            }

            engine.onload = () => {
                try {
                    // The xhr of IE9 has not response field
                    let response = engine.response || engine.responseText;
                    if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                        // Some third engine implementation may transform the response text to json object automatically,
                        // so we should test the type of response before transforming it
                        && !utils.isObject(response)) {
                        response = JSON.parse(response);
                    }

                    let headers = engine.responseHeaders;
                    // In browser
                    if (!headers) {
                        headers = {};
                        let items = (engine.getAllResponseHeaders() || "").split("\r\n");
                        items.pop();
                        items.forEach((e) => {
                            if (!e) return;
                            let key = e.split(":")[0]
                            headers[key] = engine.getResponseHeader(key)
                        })
                    }
                    let status = engine.status
                    let statusText = engine.statusText
                    let data = { data: response, headers, status, statusText };
                    // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                    utils.merge(data, engine._response)
                    if ((status >= 200 && status < 300) || status === 304) {
                        data.engine = engine;
                        data.request = options;
                        onresult(responseInterceptor.handler, data, 0)
                    } else {
                        let e = new Err(statusText, status);
                        e.response = data
                        onerror(e)
                    }
                } catch (e) {
                    onerror(new Err(e.msg, engine.status))
                }
            }

            engine.onerror = (e) => {
                onerror(new Err(e.msg || "Network Error", 0))
            }

            engine.ontimeout = () => {
                onerror(new Err(`timeout [ ${engine.timeout}ms ]`, 1))
            }
            engine._options = options;
            setTimeout(() => {
                engine.send(needQuery ? null : data)
            }, 0)
        }

        super(engine);
    }
    

    asdfasdf(){

        this[consasdf]
    }
    request(url,data,options) {
        const engine = new this.engine();
        let contentType = "Content-Type";
        let contentTypeLowerCase = contentType.toLowerCase();
        let interceptors = this.interceptors;
        let requestInterceptor = interceptors.request;
        let responseInterceptor = interceptors.response;
        let requestInterceptorHandler = requestInterceptor.handler;
         promise =  new Promise((resolve,reject)=>{
            if(utils.type(url)==='object'){
                options = url;
                url = options.url;
            }
            options = options || {};
            options.headers = options.headers || {};

            function makeRequest(options){
                data = options.body;
                url = options.url.trim();
                let baseUrl = utils.trim(options.baseUrl || "");
                if (!url && isBrowser && !baseUrl) url = location.href;
                if (url.indexOf("http") !== 0) {
                    let isAbsolute = url[0] === "/";
                    if (!baseUrl && isBrowser) {
                        let arr = location.pathname.split("/");
                        arr.pop();
                        baseUrl = location.protocol + "//" + location.host + (isAbsolute ? "" : arr.join("/"))
                    }
                    if (baseUrl[baseUrl.length - 1] !== "/") {
                        baseUrl += "/"
                    }
                    url = baseUrl + (isAbsolute ? url.substr(1) : url)
                    if (isBrowser) {
                        let t = document.createElement("a");
                        t.href = url;
                        url = t.href;
                    }
                }
                let responseType = utils.trim(options.responseType || "")
                let needQuery = ["GET", "HEAD", "DELETE", "OPTION"].indexOf(options.method) !== -1;
                let dataType = utils.type(data);
                let params = options.params || {};

                // merge url params when the method is "GET" (data is object)
                if (needQuery && dataType === "object") {
                    params = utils.merge(data, params)
                }
                // encode params to String
                params = utils.formatParams(params);

                // save url params
                let _params = [];
                if (params) {
                    _params.push(params);
                }
                // Add data to url params when the method is "GET" (data is String)
                if (needQuery && data && dataType === "string") {
                    _params.push(data);
                }

                // make the final url
                if (_params.length > 0) {
                    url += (url.indexOf("?") === -1 ? "?" : "&") + _params.join("&");
                }
                engine.open(options.method, url);
                try {
                    engine.withCredentials = !!options.withCredentials;
                    engine.timeout = options.timeout || 0;
                    if (responseType !== "stream") {
                        engine.responseType = responseType
                    }
                } catch (e) {
                }

                let customContentType = options.headers[contentType] || options.headers[contentTypeLowerCase];
                if (utils.trim((customContentType || "").toLowerCase()) === 'application/x-www-form-urlencoded') {
                    data = utils.formatParams(data);
                } else if (!utils.isFormData(data) && ["object", "array"].indexOf(utils.type(data)) !== -1) {
                    _contentType = 'application/json;charset=utf-8'
                    data = JSON.stringify(data);
                }

                if (!(customContentType || needQuery)) {
                    options.headers[contentType] = 'application/x-www-form-urlencoded';
                }

                for (let k in options.headers) {
                    if (k === contentType && utils.isFormData(data)) {
                        // Delete the content-type, Let the browser set it
                        delete options.headers[k];
                    } else {
                        try {
                            engine.setRequestHeader(k, options.headers[k])
                        } catch (e) {
                        }
                    }
                }



                this(handler, data, type) {
                    this.lockEnqueue(responseInterceptor.p, function () {
                        if (handler) {
                            //如果失败，添加请求信息
                            if (type) {
                                data.request = options;
                            }
                            let ret = handler.call(responseInterceptor, data, Promise)
                            data = ret === undefined ? data : ret;
                        }
                        if (!isPromise(data)) {
                            data = Promise[type === 0 ? "resolve" : "reject"](data)
                        }
                        data.then(d => {
                            resolve(d)
                        }).catch((e) => {
                            reject(e)
                        })
                    })
                }

                function onerror(e) {
                    e.engine = engine;
                    onresult(responseInterceptor.onerror, e, -1)
                }

                function Err(msg, status) {
                    this.message = msg
                    this.status = status;
                }


                engine.onload = () => {
                    try {
                        // The xhr of IE9 has not response field
                        let response = engine.response || engine.responseText;
                        if (response && options.parseJson && (engine.getResponseHeader(contentType) || "").indexOf("json") !== -1
                            // Some third engine implementation may transform the response text to json object automatically,
                            // so we should test the type of response before transforming it
                            && !utils.isObject(response)) {
                            response = JSON.parse(response);
                        }

                        let headers = engine.responseHeaders;
                        // In browser
                        if (!headers) {
                            headers = {};
                            let items = (engine.getAllResponseHeaders() || "").split("\r\n");
                            items.pop();
                            items.forEach((e) => {
                                if (!e) return;
                                let key = e.split(":")[0]
                                headers[key] = engine.getResponseHeader(key)
                            })
                        }
                        let status = engine.status
                        let statusText = engine.statusText
                        let data = {data: response, headers, status, statusText};
                        // The _response filed of engine is set in  adapter which be called in engine-wrapper.js
                        utils.merge(data, engine._response)
                        if ((status >= 200 && status < 300) || status === 304) {
                            data.engine = engine;
                            data.request = options;
                            onresult(responseInterceptor.handler, data, 0)
                        } else {
                            let e = new Err(statusText, status);
                            e.response = data
                            onerror(e)
                        }
                    } catch (e) {
                        onerror(new Err(e.msg, engine.status))
                    }
                }
                engine.onerror = (e) => {
                    onerror(new Err(e.msg || "Network Error", 0))
                }
                engine.ontimeout = () => {
                    onerror(new Err(`timeout [ ${engine.timeout}ms ]`, 1))
                }
                engine._options = options;
                setTimeout(() => {
                    engine.send(needQuery ? null : data)
                }, 0)
            }

            this.lockEnqueue(requestInterceptor.p, () => {
                utils.merge(options, JSON.parse(JSON.stringify(this.config)));
                let headers = options.headers;
                headers[contentType] = headers[contentType] || headers[contentTypeLowerCase] || "";
                delete headers[contentTypeLowerCase]
                options.body = data || options.body;
                url = utils.trim(url || "");
                options.method = options.method.toUpperCase();
                options.url = url;
                let ret = options;
                if (requestInterceptorHandler) {
                    ret = requestInterceptorHandler.call(requestInterceptor, options, Promise) || options;
                }
                if (!isPromise(ret)) {
                    ret = Promise.resolve(ret)
                }
                ret.then((d) => {
                    //if options continue
                    if (d === options) {
                        makeRequest(d)
                    } else {
                        resolve(d)
                    }
                }, (err) => {
                    reject(err)
                })
            })
        
        
        
        
        })

 promise.engine = engine;
        return promise;
    }


    all(promises) {
        return Promise.all(promises)
    }

    race() {
        return Promise.race(promises)
    }
}

['GET', 'POST', 'PUT', 'DELETE'].forEach(item => {
    Mole.prototype[item] = function ({ url, data, params, options }) {
        return this.request(options).then(data => [null, data]).catch(err => [err, null]);
    }
})
export default Mole