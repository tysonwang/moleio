"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var utils =
/*#__PURE__*/
function () {
  function utils() {
    _classCallCheck(this, utils);
  }

  _createClass(utils, [{
    key: "callback",
    value: function callback() {
      console.log('hello world');
    }
  }, {
    key: "type",
    value: function type(ob) {
      return Object.prototype.toString.call(ob).slice(8, -1).toLowerCase();
    }
  }, {
    key: "isPromise",
    value: function isPromise(p) {
      return p && p.then;
    }
  }, {
    key: "isFormData",
    value: function isFormData(val) {
      return typeof FormData !== 'undefined' && val instanceof FormData;
    }
  }, {
    key: "encode",
    value: function encode(val) {
      return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    }
  }, {
    key: "merge",
    value: function merge(a, b) {
      for (var key in b) {
        if (!a.hasOwnProperty(key)) {
          a[key] = b[key];
        } else if (this.isObject(b[key], 1) && this.isObject(a[key], 1)) {
          this.merge(a[key], b[key]);
        }
      }

      return a;
    }
  }, {
    key: "onresult",
    value: function onresult(handler, data, type) {
      enqueueIfLocked(responseInterceptor.p, function () {
        if (handler) {
          //如果失败，添加请求信息
          if (type) {
            data.request = options;
          }

          var ret = handler.call(responseInterceptor, data, Promise);
          data = ret === undefined ? data : ret;
        }

        if (!isPromise(data)) {
          data = Promise[type === 0 ? "resolve" : "reject"](data);
        }

        data.then(function (d) {
          resolve(d);
        })["catch"](function (e) {
          reject(e);
        });
      });
    }
  }, {
    key: "formatParams",
    value: function formatParams(data) {
      var str = "";
      var first = true;
      var that = this;

      if (!this.isObject(data)) {
        return data;
      }

      function _encode(sub, path) {
        var encode = that.encode;
        var type = that.type(sub);

        if (type == "array") {
          sub.forEach(function (e, i) {
            if (!that.isObject(e)) i = "";

            _encode(e, path + "%5B".concat(i, "%5D"));
          });
        } else if (type == "object") {
          for (var key in sub) {
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
    }
  }, {
    key: "lockQueue",
    value: function lockQueue(promise, callback) {
      if (promise) {
        promise.then(function () {
          callback();
        });
      } else {
        callback();
      }
    }
  }]);

  return utils;
}();

var _default = utils;
exports["default"] = _default;