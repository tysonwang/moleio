"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _env = _interopRequireDefault(require("./env"));

var _Base2 = _interopRequireDefault(require("./Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Mole =
/*#__PURE__*/
function (_Base) {
  _inherits(Mole, _Base);

  function Mole(engine) {
    _classCallCheck(this, Mole);

    return _possibleConstructorReturn(this, _getPrototypeOf(Mole).call(this, engine));
  }

  _createClass(Mole, [{
    key: "error",
    value: function error() {}
  }, {
    key: "lock",
    value: function lock() {
      this.lockStatus = new Promise(function (_resolve, _reject) {});
    }
  }, {
    key: "unlock",
    value: function unlock() {}
  }, {
    key: "request",
    value: function request(options) {
      var engine = new this.engine();
      return new Promise(resolve, function (reject) {
        return resolve(data);
      });
    }
  }]);

  return Mole;
}(_Base2["default"]);

['GET', 'POST', 'PUT', 'DELETE'].forEach(function (item) {
  Manis.prototype[item] = function (_ref) {
    var url = _ref.url,
        data = _ref.data,
        params = _ref.params,
        options = _ref.options;
    return this.request(options).then(function (data) {
      return [null, data];
    })["catch"](function (err) {
      return [err, null];
    });
  };
});
var _default = Manis;
exports["default"] = _default;