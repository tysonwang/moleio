export default class Base{
    constructor(engine){
        const resolve = Symbol('resolve');
        const reject = Symbol('reject');
        this.lock= function (){
            if(!resolve){
                this.interceptor.promise = new Promise((_resolve,_reject)=>{
                    this[resolve] = _resolve;
                    this[reject] = _reject; 
                }) 
            }
        }
        this.unlock= function (){
            if(resolve){
                this[resolve]();
                delete this.interceptor.promise;
                this[reject] = this[resolve] = null;
                
            } 
        } 
        this.engine = engine|| Base.createXHR();
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

    error(){
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
      this.lock();
      }
    
    unlock(){

    }
}
