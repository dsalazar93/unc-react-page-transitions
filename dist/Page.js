"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _modernizr = _interopRequireDefault(require("modernizr"));

var _animations = _interopRequireDefault(require("./assets/animations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var styles = {
  page: {
    backfaceVisibility: 'hidden',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    transform: 'translate3d(0,0,0)',
    transformStyle: 'preserve-3d',
    visibility: 'hidden',
    width: '100%'
  },
  currentPage: {
    visibility: 'visible',
    zIndex: 1
  }
};
var animEndEventNames = {
  WebkitAnimation: 'webkitAnimationEnd',
  OAnimation: 'oAnimationEnd',
  msAnimation: 'MSAnimationEnd',
  animation: 'animationend'
};

var Page =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page(props) {
    var _this2;

    _classCallCheck(this, Page);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Page).call(this, props));
    _this2.page = _react.default.createRef();
    _this2.isCurrentPage = props.isCurrentPage;
    _this2.isPrevPage = props.isPrevPage;
    _this2.loadedPageTriggers = undefined;
    _this2.leavedPageTriggers = undefined;
    _this2.setTimeouts = [];
    _this2.addSetTimeout = _this2.addSetTimeout.bind(_assertThisInitialized(_assertThisInitialized(_this2)));
    _this2.clearSetTimeouts = _this2.clearSetTimeouts.bind(_assertThisInitialized(_assertThisInitialized(_this2)));
    return _this2;
  }
  /**
   * Allows to add a function into the array of settimeout functions
   * that will be executed for instance of page.
   *
   * @param {Function} callback The function that will be executed
   * @param {int}   milliseconds The number of milliseconds to wait before executing the code.
   */


  _createClass(Page, [{
    key: "addSetTimeout",
    value: function addSetTimeout(callback, milliseconds) {
      this.setTimeouts.push(setTimeout(callback, milliseconds));
    }
    /**
     * Clear all settimeout functions for the instance page
     */

  }, {
    key: "clearSetTimeouts",
    value: function clearSetTimeouts() {
      for (var i = this.setTimeouts.length - 1; i >= 0; i -= 1) {
        clearTimeout(this.setTimeouts[i]);
        this.setTimeouts.pop();
      }
    }
    /**
     * componentDidMount method
     *
     * Fired el onAnimatedEnd event and executes the loadedPageTrigger or leavedPageTriggers functions
     * according to the case.
     */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.page.current.addEventListener(animEndEventNames[_modernizr.default.prefixed('animation')], function () {
        _this.props.onAnimationEnd(_this.isCurrentPage, _this.isPrevPage);

        if (_this.isCurrentPage) {
          if (_this.loadedPageTriggers) {
            _this.loadedPageTriggers.forEach(function (trigger) {
              trigger.f(_this);
            });
          } else if (_this.props.loadedPageTriggers) {
            _this.loadedPageTriggers = [];

            _this.props.loadedPageTriggers.forEach(function (trigger) {
              trigger.f(_this);

              if (trigger.r) {
                _this.loadedPageTriggers.push(trigger);
              }
            });
          }
        }

        if (_this.isPrevPage) {
          if (_this.leavedPageTriggers) {
            _this.leavedPageTriggers.forEach(function (trigger) {
              trigger.f(_this);
            });
          } else if (_this.props.leavedPageTriggers) {
            _this.leavedPageTriggers = [];

            _this.props.leavedPageTriggers.forEach(function (trigger) {
              trigger.f(_this);

              if (trigger.r) {
                _this.leavedPageTriggers.push(trigger);
              }
            });
          }
        }
      });
    }
    /**
     * componentWillReceiveProps method
     */

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.isCurrentPage = nextProps.isCurrentPage;
      this.isPrevPage = nextProps.isPrevPage;
    }
    /**
     * Render method
     */

  }, {
    key: "render",
    value: function render() {
      var style = Object.assign({}, styles.page, this.props.style || {});
      var className = (0, _classnames.default)('ptr-page', this.props.className);

      if (this.props.isCurrentPage || this.props.isPrevPage) {
        style = Object.assign(style, styles.currentPage);

        if (this.props.isAnimating && this.props.isCurrentPage) {
          className = (0, _classnames.default)(className, _animations.default.classes[this.props.animcursor].inClass);
        }

        if (this.props.isAnimating && this.props.isPrevPage) {
          className = (0, _classnames.default)(className, _animations.default.classes[this.props.animcursor].outClass);
        }
      }

      return _react.default.createElement("div", {
        ref: this.page,
        className: className,
        style: style
      }, this.props.children);
    }
  }]);

  return Page;
}(_react.default.Component);

Page.propTypes = {
  loadedPageTriggers: _propTypes.default.array,
  leavedPageTriggers: _propTypes.default.array
};
var _default = Page;
exports.default = _default;