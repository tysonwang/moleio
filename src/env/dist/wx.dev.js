"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = wx;

function wx(request, responseCallback) {
  var con = {
    method: request.method,
    url: request.url,
    dataType: request.dataType || undefined,
    header: request.headers,
    data: request.body || {},
    responseType: request.responseType || 'text',
    success: function success(res) {
      responseCallback({
        statusCode: res.statusCode,
        responseText: res.data,
        headers: res.header,
        statusMessage: res.errMsg
      });
    },
    fail: function fail(res) {
      responseCallback({
        statusCode: res.statusCode || 0,
        statusMessage: res.errMsg
      });
    }
  };
  wx.request(con);
}
/**
 * 
 * let resolve,reject;
let a = {
    c:null,
    m(promise,callback){
    if(promise){
        promise.then(()=>{
            callback()
        })
    }else{
        callback()
    }
    },
    show(s){
        this.m(this.c,()=>{
            console.log(s);
        })
    },
    lock(){
        this.c = new Promise((_resolve,_rejcet)=>{
            resolve = _resolve;
            reject = _rejcet;
        })
    },
    unlock(){
        resolve()
        this.c = null;
    }
}

a.show(1);
//加锁
a.lock();
a.show(2);
a.show(3)
//解锁机制
a.unlock()
 */