'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadScript = require('load-script');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new widget by requesting and using the SoundCloud Widget API.
 *
 * @param {String} id - reference to iframe element for widget
 * @param {Function} cb
 */

var createWidget = function createWidget(id, cb) {
  if (window.SC) {
    // the API was alread loaded, return widget asynchronously
    setTimeout(function () {
      try {
        cb(window.SC.Widget(id));
      } catch (error) {
        console.log(error);
      }
    }, 0);
  } else {
    // load the API, it's namespaced as `window.SC`
    (0, _loadScript2.default)('https://w.soundcloud.com/player/api.js', function (err) {
      try {
        if (err) throw new Error('Failed to load Soundcloud API: ' + err.message);

        if (!window.SC) throw new Error('Soundcloud namespace is not available after API loaded');

        return cb(window.SC.Widget(id)); // eslint-disable-line new-cap
      } catch (error) {
        console.log(error);
      }
    });
  }
};

/**
 * Expose `createWidget`
 */

/**
 * Module dependencies
 */

exports.default = createWidget;