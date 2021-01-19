# manisio
Promise based HTTP client for the browser and node.js
## 功能描述
类似于axios库，提供除浏览器端ajax请求外，该库提供了node端,微信小程序，阿里小程序的支持，尤其是在文件上传上方面提供了 丰富的配置，入上传base64,file,blob,buffer等的支持,并提供进度
## 使用方式
const mole = require('moleio');
const imguploader = require('imgUploader')
mole.middle(requestInterceptor,responseInterceptor).use(imgUploader); // 全局拦截
const [data,err] = mole.request(options); 
const moleio = new mole(); //默认不传入参数为浏览器端使用，传入 node,wx,my,taro ...可更换请求环境
const [data,arr] = mole.get({url,params,data,options});
const [data,arr] = mole.post({url,params,data,options});
const [data,arr] = mole.put({url,params,data,options});


<!-- 关于options的配置 -->

<!-- options  -->
`
{method: "GET",
 baseURL: "",
 responseType:'',
 customHeaders:{},
 timeout: 0,
 fileChunkSize:'' // 分包大小
 fileType:'',     // 上传文件类型
 requestInterceptor:'',
 responseInterceptor:'',
 }
`