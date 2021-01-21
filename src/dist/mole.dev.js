"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _env = _interopRequireDefault(require("./env"));

var _Base2 = _interopRequireDefault(require("./Base"));

var _Request = _interopRequireDefault(require("./Request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Mole =
/*#__PURE__*/
function (_Base) {
  _inherits(Mole, _Base);

  function Mole(engine) {
    var _this;

    _classCallCheck(this, Mole);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mole).call(this, engine));
    _this.request = new _Request["default"](_assertThisInitialized(_this));
    ['GET', 'POST', 'PUT', 'DELETE'].forEach(function (item) {
      Mole.prototype[item] = function (_ref) {
        var url = _ref.url,
            data = _ref.data,
            params = _ref.params,
            options = _ref.options;
        return this.request(url, data, util.merge({
          method: item
        }, options)).then(function (data) {
          return [null, data];
        })["catch"](function (err) {
          return [err, null];
        });
      };
    });

    _this.all = function (promises) {
      return Promise.all(promises);
    };

    _this.race = function (promises) {
      return Promise.race(promises);
    };

    return _this;
  }

  return Mole;
}(_Base2["default"]);

var _default = Mole;
exports["default"] = _default;