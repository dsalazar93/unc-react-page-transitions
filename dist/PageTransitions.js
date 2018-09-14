"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _modernizr = _interopRequireDefault(require("modernizr"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./assets/animations.css");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  perspective: {
    height: '100%',
    perspective: '1200px',
    position: 'relative',
    width: '100%'
  }
};

var PageTransitions =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PageTransitions, _React$PureComponent);

  function PageTransitions(props) {
    var _this;

    _classCallCheck(this, PageTransitions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PageTransitions).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "animcursorCheck", function () {
      if (_this.animcursor >= 67) {
        _this.animcursor = 0;
      } else if (_this.animcursor < 0) {
        _this.animcursor = 67;
      }

      _this.animcursor += 1;
      return _this.animcursor;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onAnimationEnd", function (endCurrPage, endPrevPage) {
      var animEnd = false;

      if (endCurrPage) {
        _this.endCurrPage = endCurrPage;

        if (_this.endPrevPage) {
          animEnd = true;
        }
      }

      if (endPrevPage) {
        _this.endPrevPage = endPrevPage;

        if (_this.endCurrPage) {
          animEnd = true;
        }
      }

      if (animEnd) {
        _this.endCurrPage = false;
        _this.endPrevPage = false;

        _this.setState({
          isAnimating: false,
          prevPage: undefined
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "nextPage", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var opts = {};

      if (Number(options)) {
        opts.page = Number(options);
      } else if (_typeof(options) === 'object' && Number(options.page)) {
        opts = options;
        opts.page = Number(opts.page);
      } else {
        opts.page = undefined;
      }

      if (_this.state.isAnimating || opts.page === _this.state.currentPage) {
        return _this.state.currentPage;
      }

      _this.animcursor = opts.animation || _this.props.defaultNextPageAnimation || _this.animcursorCheck();
      var nextPage = opts.page;

      if (opts.page === undefined) {
        if (_this.state.currentPage + 1 < _this.props.children.length) {
          nextPage = _this.state.currentPage + 1;
        } else {
          nextPage = 0;
        }
      }

      _this.setState({
        isAnimating: true,
        currentPage: nextPage,
        prevPage: _this.state.currentPage
      });

      return nextPage;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "backPage", function (animation) {
      if (_this.state.isAnimating) {
        return _this.state.currentPage;
      }

      _this.animcursor = animation || _this.props.defaultBackPageAnimation || _this.animcursorCheck();
      var nextPage = _this.state.currentPage - 1 >= 0 ? _this.state.currentPage - 1 : _this.props.children.length - 1;

      _this.setState({
        isAnimating: true,
        currentPage: nextPage,
        prevPage: _this.state.currentPage
      });

      return nextPage;
    });

    _this.state = {
      currentPage: _this.props.currentPage || 0,
      prevPage: undefined,
      isAnimating: false
    }; // Without state

    _this.animcursor = 0;
    _this.endCurrPage = false;
    _this.endPrevPage = false;
    _this.support = _modernizr.default.cssanimations;
    return _this;
  }
  /**
   * Return the next cursor of the animation
   *
   * @return {int} Cursor of the animation
   * @see ./assets/animations.js
   */


  _createClass(PageTransitions, [{
    key: "render",

    /**
     * Render method.
     */
    value: function render() {
      var _this2 = this;

      var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
      return _react.default.createElement("div", {
        className: "pt-perspective",
        style: styles.perspective
      }, children.map(function (child, idx) {
        return _react.default.cloneElement(child, {
          key: "".concat(_this2.props.idPrefix, "-").concat(idx),
          id: "".concat(_this2.props.idPrefix, "-").concat(idx),
          idx: idx,
          className: (0, _classnames.default)(_this2.props.idPrefix, child.props.className),
          isCurrentPage: idx === _this2.state.currentPage,
          isPrevPage: idx === _this2.state.prevPage,
          onAnimationEnd: _this2.onAnimationEnd,
          animcursor: (idx === _this2.state.currentPage || idx === _this2.state.prevPage) && _this2.animcursor
        });
      }));
    }
  }]);

  return PageTransitions;
}(_react.default.PureComponent);

PageTransitions.defaultProps = {
  idPrefix: 'pt-page'
};
var _default = PageTransitions;
exports.default = _default;