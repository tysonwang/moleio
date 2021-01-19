import utils from './utils';
import engine from './env';
import Base from './Base';
class Mole extends Base {
    
    constructor(engine) {
        super(engine);
    }
    error(){

    }
    lock(){
        this.lockStatus = new Promise((_resolve,_reject)=>{

        })
    }
    unlock(){}
    request(options) {
        const engine = new this.engine();
        return new Promise(resolve,reject=>{
           return resolve(data);
        })
    }
}

['GET', 'POST', 'PUT', 'DELETE'].forEach(item => {
    Manis.prototype[item] = function ({ url, data, params, options }) {
        return this.request(options).then(data => [null, data]).catch(err => [err, null]);
    }
})
export default Manis