"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _modernizr = _interopRequireDefault(require("modernizr"));

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

var styles = {
  perspective: {
    height: '100%',
    perspective: '1200px',
    position: 'relative',
    width: '100%'
  }
};
var animations = {
  max: 67
};

var PageTransitions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PageTransitions, _React$Component);

  function PageTransitions(props) {
    var _this;

    _classCallCheck(this, PageTransitions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PageTransitions).call(this, props));
    _this.state = {
      currentPage: 0,
      prevPage: undefined,
      isAnimating: false
    }; // Without state

    _this.animcursor = 0;
    _this.endCurrPage = false;
    _this.endPrevPage = false;
    _this.support = _modernizr.default.cssanimations; // Bindings

    _this.nextPage = _this.nextPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.animcursorCheck = _this.animcursorCheck.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onAnimationEnd = _this.onAnimationEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * Return the next cursor of the animation
   *
   * @return {int} Cursor of the animation
   * @see ./assets/animations.js
   */


  _createClass(PageTransitions, [{
    key: "animcursorCheck",
    value: function animcursorCheck() {
      if (this.animcursor > animations.max - 1) {
        this.animcursor = 0;
      } else if (this.animcursor < 0) {
        this.animcursor = animations.max;
      }

      this.animcursor += 1;
      return this.animcursor;
    }
    /**
     * Fired function when the page css animation is ended.
     * This function is passed to the <Page/> component.
     *
     * @param  {boolean} endCurrPage Indicates if the current page was the one
     *                               that ended the animation.
     * @param  {boolean} endPrevPage Indicate if the previous page was the one
     *                               that ended the animation.
     */

  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(endCurrPage, endPrevPage) {
      var animEnd = false;

      if (endCurrPage) {
        this.endCurrPage = endCurrPage;

        if (this.endPrevPage) {
          animEnd = true;
        }
      }

      if (endPrevPage) {
        this.endPrevPage = endPrevPage;

        if (this.endCurrPage) {
          animEnd = true;
        }
      }

      if (animEnd) {
        this.endCurrPage = false;
        this.endPrevPage = false;
        this.setState({
          isAnimating: false
        });
      }
    }
    /**
     * Fires the transition of pages.
     * @param  {Object} opts This object contains 2 params:
     *                       (animation) => cursor for animation according animations.js file.
     *                       (page) => index of the next page to show
     *
     * @return {string}      Id of the next page.
     */

  }, {
    key: "nextPage",
    value: function nextPage() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var opts = {};

      if (typeof options === 'number') {
        opts.page = options;
      } else if (typeof options === 'string') {
        opts.page = parseInt(options.split('-')[2], 10);
      } else if (_typeof(options) === 'object' && typeof options.page === 'string') {
        opts.page = parseInt(options.page.split('-')[2], 10);
      }

      if (this.state.isAnimating || opts.page === this.state.currentPage) {
        return "".concat(this.props.idPrefix, "-").concat(this.state.currentPage);
      }

      if (opts.animation) {
        this.animcursor = opts.animation;
      } else if (this.props.defaultAnimation) {
        this.animcursor = this.props.defaultAnimation;
      } else {
        this.animcursorCheck();
      }

      var nextPage = opts.page || (this.state.currentPage + 1 < this.props.children.length ? this.state.currentPage + 1 : 0);
      this.setState({
        isAnimating: true,
        prevPage: this.state.currentPage,
        currentPage: nextPage
      });
      return "".concat(this.props.idPrefix, "-").concat(nextPage);
    }
    /**
     * Render function
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
      return _react.default.createElement("div", {
        className: "ptr-perspective",
        style: styles.perspective
      }, children.map(function (child, idx) {
        var cloneElement = _react.default.cloneElement(child, {
          key: "".concat(_this2.props.idPrefix, "-").concat(idx),
          id: "".concat(_this2.props.idPrefix, "-").concat(idx),
          animcursor: _this2.animcursor,
          isCurrentPage: idx === _this2.state.currentPage,
          isPrevPage: _this2.state.isAnimating && idx === _this2.state.prevPage,
          isAnimating: _this2.state.isAnimating,
          onAnimationEnd: _this2.onAnimationEnd
        });

        return cloneElement;
      }));
    }
  }]);

  return PageTransitions;
}(_react.default.Component);

PageTransitions.defaultProps = {
  idPrefix: 'pt-page'
};
var _default = PageTransitions;
exports.default = _default;