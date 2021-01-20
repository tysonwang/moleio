import utils from './utils';
import engine from './env';
import Base from './Base';
class Mole extends Base {
    
    constructor(engine) {
        super(engine);
    }
    
    request(options) {
        const engine = new this.engine();
        return new Promise(resolve,reject=>{
           return resolve(data);
        })
    }
}

['GET', 'POST', 'PUT', 'DELETE'].forEach(item => {
    Mole.prototype[item] = function ({ url, data, params, options }) {
        return this.request(options).then(data => [null, data]).catch(err => [err, null]);
    }
})
export default Mole