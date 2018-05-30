"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createWidget2 = require("./lib/createWidget");

var _createWidget3 = _interopRequireDefault(_createWidget2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Module dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Create a new `SoundCloud` component.
 *
 * This is essentially a glorified wrapper over the existing
 * HTML5 widget from SoundCloud. Programmatic control not included.
 *
 * NOTE: Changing `props.url` will cause the component to load it.
 * Unfortunately, SoundCloud adds an entry to `window.history` every time
 * a new url is loaded, so changing `props.url` __will__ break the back button.
 */

var SoundCloud = function (_React$Component) {
  _inherits(SoundCloud, _React$Component);

  /**
   * @param {Object} props
   */

  function SoundCloud(props) {
    _classCallCheck(this, SoundCloud);

    var _this = _possibleConstructorReturn(this, (SoundCloud.__proto__ || Object.getPrototypeOf(SoundCloud)).call(this, props));

    _this._setupWidget = function (widget) {
      _this._internalWidget = widget;
      _this._bindEvents();
    };

    _this._reloadWidget = function () {
      _this._internalWidget.load(_this.props.url, _this.props.opts);
    };

    _this._internalWidget = null;
    return _this;
  }

  _createClass(SoundCloud, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._createWidget();
    }

    /**
     * @param {Object} nextProps
     * @returns {Boolean}
     */

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.url !== this.props.url;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._reloadWidget();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unbindEvents();
    }

    /**
     * Called on the initial render, this uses the rendered iframe
     * as a base for creating a new `_internalWidget`.
     */

  }, {
    key: "_createWidget",
    value: function _createWidget() {
      var _this2 = this;

      try {
        (0, _createWidget3.default)(this.iframeEl, function (widget) {
          if (widget) {
            _this2._setupWidget(widget);
            _this2._reloadWidget();
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    /**
     * Integrate a newly created `widget` with the rest of the component.
     *
     * @param {Object} Widget
     */

    /**
     * This is the only way to manipulate the embedded iframe, it's essentially
     * refreshed and reloaded.
     *
     * NOTE: SoundCloud adds an entry to `window.history` after reloading. This is
     * __really__ annoying, but unavoidable at the moment, so basically every
     * time the url changes it breaks the back button. Super bummer.
     */

  }, {
    key: "_bindEvents",


    /**
     * Listen for events coming from `widget`, and pass them up the
     * chain to the parent component if needed.
     */

    value: function _bindEvents() {
      this._internalWidget.bind(window.SC.Widget.Events.PLAY, this.props.onPlay);
      this._internalWidget.bind(window.SC.Widget.Events.PAUSE, this.props.onPause);
      this._internalWidget.bind(window.SC.Widget.Events.FINISH, this.props.onEnd);
    }

    /**
     * Remove all event bindings.
     */

  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      if (this._internalWidget) {
        this._internalWidget.unbind(window.SC.Widget.Events.PLAY);
        this._internalWidget.unbind(window.SC.Widget.Events.PAUSE);
        this._internalWidget.unbind(window.SC.Widget.Events.FINISH);
      }
    }

    /**
     * @returns {Object}
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement("iframe", _extends({
        id: this.props.id,
        ref: function ref(el) {
          _this3.iframeEl = el;
        },
        width: "100%",
        height: this.props.height || (this.props.opts.visual ? "450" : "166"),
        scrolling: "no",
        frameBorder: "no",
        src: "https://w.soundcloud.com/player/?url="
      }, this.props.opts.auto_play ? { allow: "autoplay" } : {}));
    }
  }]);

  return SoundCloud;
}(_react2.default.Component);

SoundCloud.propTypes = {
  // url to play. It's kept in sync, changing it will
  // cause the widget to refresh and play the new url.
  url: _propTypes2.default.string.isRequired,

  // custom ID for widget iframe element
  id: _propTypes2.default.string,

  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  // widget parameters for appearance and auto play.
  opts: _propTypes2.default.objectOf(_propTypes2.default.bool),

  // event subscriptions
  onPlay: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onEnd: _propTypes2.default.func
};

SoundCloud.defaultProps = {
  id: "react-sc-widget",
  opts: {},
  onPlay: function onPlay() {},
  onPause: function onPause() {},
  onEnd: function onEnd() {}
};

/**
 * Expose `SoundCloud` component
 */

exports.default = SoundCloud;