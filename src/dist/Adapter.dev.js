"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Adapter =
/*#__PURE__*/
function () {
  function Adapter(env) {
    _classCallCheck(this, Adapter);

    this.engine = engine || XMLHttpRequest;
  }

  _createClass(Adapter, [{
    key: "open",
    value: function open(options) {
      env();
    }
  }, {
    key: "loadData",
    value: function loadData() {}
  }, {
    key: "send",
    value: function send(options) {}
  }]);

  return Adapter;
}(); // 该适配器实现非浏览器端的接口封装


exports["default"] = Adapter;