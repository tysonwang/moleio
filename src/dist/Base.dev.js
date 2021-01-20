"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Base =
/*#__PURE__*/
function () {
  function Base(engine) {
    _classCallCheck(this, Base);

    var resolve = Symbol('resolve');
    var reject = Symbol('reject');

    this.lock = function () {
      var _this = this;

      if (!resolve) {
        this.interceptor.promise = new Promise(function (_resolve, _reject) {
          _this[resolve] = _resolve;
          _this[reject] = _reject;
        });
      }
    };

    this.unlock = function () {
      if (resolve) {
        this[resolve]();
        delete this.interceptor.promise;
        this[reject] = this[resolve] = null;
      }
    };

    this.engine = engine || Base.createXHR();
    this.config = {
      method: 'GET',
      headers: {},
      timeout: 0,
      params: {},
      withCredentials: false,
      fileChunkSize: 2 * 1024 * 1024,
      //2M
      fileType: 'blob',
      //上传文件类型 备用类型  base64 ,buffer ,stream
      contentType: 'application/x-www-form-urlencoded',
      responseType: 'json',
      customHeaders: {}
    };
  }

  _createClass(Base, [{
    key: "error",
    value: function error() {}
  }, {
    key: "middleware",
    value: function middleware(requestInterceptor, responseInterceptor) {
      // 请求与相应的拦截器
      this.requestInterceptor = requestInterceptor;
      this.responseInterceptor = responseInterceptor;
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
  }, {
    key: "lock",
    value: function lock(resolve) {
      this.lock();
    }
  }, {
    key: "unlock",
    value: function unlock() {}
  }], [{
    key: "createXHR",
    value: function createXHR() {
      if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
      } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
          var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
              i,
              len;

          for (i = 0, len = versions.length; i < len; i++) {
            try {
              new ActiveXObject(versions[i]);
              arguments.callee.activeXString = versions[i];
              break;
            } catch (ex) {}
          }
        }

        return new ActiveXObject(arguments.callee.activeXString);
      } else {
        throw new Error("平台不支持ajax请求");
      }
    }
  }]);

  return Base;
}();

exports["default"] = Base;