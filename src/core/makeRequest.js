function makeRequest(url, data, options) {
    return new Promise((resolve, reject) => {
      ifLock(this.interceptors.request.p, () => {
        const { engine, interceptors, config } = this;
        options.engine = engine;
        realOptions = normalizeOptions(url, data, options, config);
        interceptors.request.successHandler
        if (interceptors.request.successHandler) {
          let resultOptions = interceptors.request.successHandler && (interceptors.request.successHandler.call() || realOptions) || realOptions;
          if (!isPromise(resultOptions)) {
            resultOptions = Promise.resolve(resultOptions)
          }
          resultOptions.then(o => {
            if (o === realOptions && o.cancel === false) {
              emitEngine(options, interceptors, resolve, reject)
            } else {
              resolve(o);
            }
          }, err => {
            reject(err)
          })
        }
      })
    })
  }

  export default makeRequest;