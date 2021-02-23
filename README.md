# moleio

Promise based HTTP client for the browser ,wx,my,and node.js

## 功能描述

类似于 axios 库，提供除浏览器端 ajax 请求外，该库提供了 node 端,微信小程序，uniapp,taro,支付宝小程序的支持，尤其是在文件上传上方面提供了丰富的配置，支持上传 base64,file,blob,buffer 等的支持,并提供进度与分片上传支持  
提供可配置化的加锁解锁与取消机制
## 使用方式

```js
const mole = require('moleio');

mole.uploadConfig((config)=>{return config})  // 上传的配置


mole.interceptors.request.use(()=>{}) // 请求的配置
mole.interceptors.response.use((success)=>{},(err)=>{}) // 响应的配置
// 使用默认实例
mole.request(url,[data,[options]]);

mole.request('asdfasdf',{asdf:asdfas})


mole.get({url,data,options});
mole.post({url,data,options});
mole.put({url,data,options});


mole.request(abidu,con)


mole.cancel(url|| conf)   // 根据条件取消请求

mole.lock(url||conf)
mole.unlock(url|| conf)   // 根据条件锁定请求

mole.unlock(url|| conf)   // 根据条件解锁请求

conf = {
        ignore:(url)=>{
                return boolean
        },
        match:(url)=>{
               return [url]
        }
}

mole.race()
mole.all()
mole.spread()
mole.settled() 

...
// 创建实例的两种方式
// const mole = new mole(engine); // 创建新的实例 默认不传入参数为浏览器端使用，传入 node,wx,my,taro ...可更换请求环境
const mole = mole.create(engine); // 创建新的实例对象 默认不传入参数为浏览器端使用，传入 node,wx,my,taro ...可更换请求环境
```
## 返回值类型

```js
response:
// 成功
{
        header,
        data,
        status,
        config
}
// err
{
        header,
        msg,
        status,
        config
}

```

```js
该库核心使用了promise.then 的数据穿透与延迟触发resolve  reject 

```

