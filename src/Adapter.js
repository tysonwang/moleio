export default class Adapter {
    constructor(env) {
        this.engine = engine || XMLHttpRequest;
    }
    open(options) {
       env()
    }
    loadData() {

    }
    send(options){

    }
}
// 该适配器实现非浏览器端的接口封装