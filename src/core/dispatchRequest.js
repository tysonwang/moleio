import normalizeOptions from '../helper/normalizeOptions.js';
import utils from '../utils';
import emitEngine from './emitEngine'
function dispatchRequest(url, data, options) {
  const rq = this.interceptors.request;
  const rp = this.interceptors.response;
  const rqsHandler = rq['successHandler'];
  const rpsHandler = rp['successHandler'];
  const rpeHandler = rq['errorHandler'];
  options = normalizeOptions(url, data, options, this);
  return options.then(
    (opt) => {
      return new Promise((res, rej) => {
        let lockStatus = rq.lockList.includes(opt.url);
        utils.queueIfLock(lockStatus && rq.p, () => {
          !this.stopStatus && (rq.cancelList.includes(opt.url) && rej(opt)); // 不发送自动进入cancel流程
          !this.stopStatus && (res(((rqsHandler && rqsHandler(opt))) || opt));
        })
      })
    }, null).then(emitEngine, null).then((result) => {
      return new Promise((res, rej) => {
        let lockStatus = rp.lockList.includes(result.url);
        utils.queueIfLock(lockStatus && rp.p, () => {
          res((rpsHandler && rpsHandler(result)) || result);
        })
      })
    }, (error) => {
      return new Promise((res, rej) => {
        !this.stopStatus && rej(error)
      })
    })
}
export default dispatchRequest;