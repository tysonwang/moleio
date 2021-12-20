# moleio
Promise based HTTP client for the browser ,wx,my,and node.js
## 功能描述
类似于 axios 库，提供除浏览器端 ajax 请求外，该库提供了 node 端,微信小程序，uniapp,taro,支付宝小程序，飞书的异步请求的支持
## 使用方式
```js
const mole = require('moleio');
mole.uploadConfig((config)=>{return config})  // 上传的配置
mole.interceptors.request.use(()=>{}) // 请求的配置
mole.interceptors.response.use((success)=>{},(err)=>{}) // 响应的配置
// 使用默认实例
mole.request(url,[data,[options]]);
mole.get({url,data,[options]});
mole.post({url,data,[options]});
mole.put({url,data,[options]});
mole.delete({url,data,[options]});
mole.cancel(url|| conf)   // 根据条件取消请求
mole.lock(url|| conf)   // 根据条件临时锁定请求
mole.unlock(url|| conf)   // 根据条件解锁请求
mole.start();  // 开启请求
mole.stop();   // 停止请求
conf = {
        ignore:(url)=>{
                return true||false
        },
        match:(url)=>{
               return []
        }
}

mole.race()
mole.all()
mole.spread()
mole.settled() 
```
```js
// 创建实例的两种方式
const mole = new mole(engine); // 创建新的实例 默认不传入参数为浏览器端使用，传入 node,wx,my,taro ...可更换请求环境
const mole = mole.create(engine); // 创建新的实例对象 默认不传入参数为浏览器端使用，传入 node,wx,my,taro ...可更换请求环境
```
## 返回值类型
```js
// 成功
response = {
        header,
        data,
        status,
        config
}
// err
error = {
        header,
        msg,
        status,
        config
}
```

```js
// 当满足某种状态下 结束所有后续的请求 ，比如接口授权过期401状态，当某一个接口401后，后续的请求自动作废

```
