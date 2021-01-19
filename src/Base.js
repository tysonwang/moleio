export default class Base{
    constructor(engine){
        const resolve = Symbol('resolve');
        const reject = Symbol('reject');
        this.engine = engine|| Base.createXHR();
        this.interceptor = {
            response: {
                use(handler, onerror) {
                    this.handler = handler;
                    this.onerror = onerror;
                }
            },
            request: {
                use(handler) {
                    this.handler = handler;
                }
            }
        }
        
        this.config = {
            method:'GET',
            headers:{},
            timeout:0,
            params:{},
            withCredentials:false,
            fileChunkSize:2*1024*1024, //2M
            fileType:'blob', //上传文件类型 备用类型  base64 ,buffer ,stream
            contentType:'application/x-www-form-urlencoded',
            responseType:'json',
            customHeaders:{}
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

    middleware(requestInterceptor,responseInterceptor){
        // 请求与相应的拦截器
        this.requestInterceptor = requestInterceptor;
        this.responseInterceptor = responseInterceptor;
    }
    lockQueue(promise,callback){
       if(promise){
           promise.then(()=>{callback()});
       }else{
           callback()
       }
    }
    lock(resolve){
if(!resolve){
    this. = new Promise()
}
    }
    unlock(){

    }
}
