# moleio
Promise based HTTP client for the browser ,wx,my,and node.js
## 功能描述
类似于axios库，提供除浏览器端ajax请求外，该库提供了node端,微信小程序，uniapp,taro,支付宝小程序的支持，尤其是在文件上传上方面提供了丰富的配置，支持上传base64,file,blob,buffer等的支持,并提供进度与分片上传支持
## 使用方式
```js
const mole = require('moleio');
const imgUploader = require('imgUploader')
mole.middle(requestInterceptor,responseInterceptor).use(imgUploader); // 全局拦截
const [data,err] = mole.request(options); 
const moleio = new mole(); //默认不传入参数为浏览器端使用，传入 node,wx,my,taro ...可更换请求环境
const [data,arr] = mole.get({url,data,options});
const [data,arr] = mole.post({url,data,options});
const [data,arr] = mole.put({url,data,options});
```
公用方法
import MoleIO from 'mole-io';
MoleIO.mole.request().then()
mole.get()
mole.create();
 //   this.engine.open()
        //   this.engine.abort()
        //   this.engine.getAllResponseHeaders();
        //   getResponseHeader()
        //   XMLHttpRequest.overrideMimeType()
        //   setRequestHeader()
        //   this.engine.timeout = '';
        //   XMLHttpRequest.send()
        //   this.engine.ontimeout = function(){
        //   };
        //   this.engine.send()
// 888888888888888888
// import Mole from 'mole-io';
// Mole.request()
// Mole.get()
// Mole.create('wx');

asdf.get()
asdf.use()
asdf.lock() //全部锁 asdf.request.lock() 请求锁
asdf.unlock(); //全部解锁 asdf.response.unlock()
asdf.unlock();
asdf.cancel()// 全部取消  asdf.request.cancel() 取消 asdf.response.cancel()
asdf.use(res, ree).plugin(); // 增强插件
asdf.plugin(); //增强插件
asdf.race()
asdf.all()
asdf.spread()
asdf.config.asdf // 默认实例 newasdf.config

import asdf from 'asdf';
let newasdf = asdf.create(options);
asdf.request(url, data, options)

new asdf('wx');

```js
// <!-- 关于options的配置 -->

// <!-- options  -->
const options = {method: "GET",
 baseURL: "",
 responseType:'',
 customHeaders:{},
 timeout: 0,
 fileChunkSize:'' // 分包大小
 fileType:'',     // 上传文件类型
 requestInterceptor:'',
 responseInterceptor:'',
 }
```