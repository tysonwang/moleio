"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Request =
/*#__PURE__*/
function () {
  function Request(that) {
    _classCallCheck(this, Request);

    var engine = new that.engine();
    var contentTypeLowerCase = contentType.toLowerCase();
    var promise = new Promise(function (resolve, reject) {});
    return promise;
  }

  _createClass(Request, [{
    key: "enqueueIfLocked",
    value: function enqueueIfLocked(promise, callback) {
      if (promise) {
        promise.then(function () {
          callback();
        });
      } else {
        callback();
      }
    }
  }]);

  return Request;
}();

exports["default"] = Request;