import utils from './utils';
import engine from './env';
import Base from './Base';
import Request from './Request';
class Mole extends Base {
    constructor(engine) {
        super(engine);
        this.request = new Request(this);
        ['GET', 'POST', 'PUT', 'DELETE'].forEach(item => {
            Mole.prototype[item] = function ({ url, data, params, options }) {
                return this.request(url,data,util.merge({method:item},options)).then(data => [null, data]).catch(err => [err, null]);
            }
        })
       this.all=(promises)=>Promise.all(promises)
       this.race = (promises)=>Promise.race(promises)
    }
}
export default Mole