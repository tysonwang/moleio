
const utils = {
    toString(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    },
    isObject(val) {
        return val && typeof val === 'object';
    },
    isPlainObject(obj) {
        return this.toString(obj) === 'object';
    },
    deepCopy(source) {
        if (typeof source != "object") {
            return source;
        }
        var newObj = source.constructor === Array ? [] : {};
        for (var i in source) {
            newObj[i] = deepCopy(source[i]);
        }
        return newObj;
    },
    type(ob) {
        return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase()
    },
    isPromise(p) {
        return p && p.then;
    },
    isFormData(val) {
        return (typeof FormData !== 'undefined') && (val instanceof FormData);
    },
    encode(val) {
        return encodeURIComponent(val)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+')
            .replace(/%5B/gi, '[')
            .replace(/%5D/gi, ']');
    },
    merge(a, b) {
        for (let key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
                this.merge(a[key], b[key])
            }
        }
        return a;
    },

    onresult(handler, data, type) {
        enqueueIfLocked(responseInterceptor.p, function () {
            if (handler) {
                //如果失败，添加请求信息
                if (type) {
                    data.request = options;
                }
                let ret = handler.call(responseInterceptor, data, Promise)
                data = ret === undefined ? data : ret;
            }
            if (!isPromise(data)) {
                data = Promise[type === 0 ? "resolve" : "reject"](data)
            }
            data.then(d => {
                resolve(d)
            }).catch((e) => {
                reject(e)
            })
        })
    },

    formatParams(data) {
        let str = "";
        let first = true;
        let that = this;
        if (!this.isObject(data)) {
            return data;
        }

        function _encode(sub, path) {
            let encode = that.encode;
            let type = that.type(sub);
            if (type == "array") {
                sub.forEach(function (e, i) {
                    if (!that.isObject(e)) i = "";
                    _encode(e, path + `%5B${i}%5D`);
                });

            } else if (type == "object") {
                for (let key in sub) {
                    if (path) {
                        _encode(sub[key], path + "%5B" + encode(key) + "%5D");
                    } else {
                        _encode(sub[key], encode(key));
                    }
                }
            } else {
                if (!first) {
                    str += "&";
                }
                first = false;
                str += path + "=" + encode(sub);
            }
        }

        _encode(data, "");
        return str;
    },
    queueIfLock(promise, callback) {
        if (promise) {
            promise.then(() => { callback() });
        } else {
            callback()
        }
    },
    merge(a, b) {
        for (let key in b) {
            if (!a.hasOwnProperty(key)) {
                a[key] = b[key];
            } else if (this.isPlainObject(b[key]) && this.isPlainObject(a[key])) {
                this.merge(a[key], b[key])
            }
        }
        return a;
    },
}
export default utils;
