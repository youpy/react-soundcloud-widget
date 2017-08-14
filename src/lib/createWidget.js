/**
 * Module dependencies
 */

import load from 'load-script';

/**
 * Create a new widget by requesting and using the SoundCloud Widget API.
 *
 * @param {Object} el - reference to iframe element for widget
 * @param {Function} cb
 */

const createWidget = (el, cb) => {
  if (window.SC) {
    // the API was alread loaded, return widget asynchronously
    setTimeout(() => { try {
      cb(window.SC.Widget(el))
    } catch (error) {
      console.log(error)
    }}, 0);
  } else {
    // load the API, it's namespaced as `window.SC`
    load('https://w.soundcloud.com/player/api.js', (err) => {
      try {
        if (err) throw new Error(`Failed to load Soundcloud API: ${err.message}`)

        if (!window.SC) throw new Error(`Soundcloud namespace is not available after API loaded`)

        return cb(window.SC.Widget(el)); // eslint-disable-line new-cap
      } catch (error) {
        console.log(error)
      }
    });
  }
};

/**
 * Expose `createWidget`
 */

export default createWidget;
