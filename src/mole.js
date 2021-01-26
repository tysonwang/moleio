import utils from './utils';
import adapter from './Adapter';
import Base from './Base';
class Mole {
    constructor(engine) {
        this.engine = adapter(engine) || XMLHttpRequest;
        this.all = (promises) => Promise.all(promises)
        this.race = (promises) => Promise.race(promises)
        ['GET', 'POST', 'PUT', 'DELETE'].forEach(item => {
            Mole.prototype[item] = function ({ url, data, options }) {
                return this.request(url, data, util.merge({ method: item }, options)).then(data => [null, data]).catch(err => [err, null]);
            }
        })
    }
    create(options) {
        new Mole();
    }
    request(url, data, options) {
        const promise = new Promsie((resolve, reject) => {

        })
        return promise;
    }
}

export default Mole;