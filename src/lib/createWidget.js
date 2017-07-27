/**
 * Module dependencies
 */

import load from 'load-script';

/**
 * Create a new widget by requesting and using the SoundCloud Widget API.
 *
 * @param {String} id - reference to iframe element for widget
 * @param {Function} cb
 */

const createWidget = (id, cb) => {
  if (window.SC) {
    // the API was alread loaded, return widget asynchronously
    setTimeout(() => cb(window.SC.Widget(id)), 0);
  } else {
    // load the API, it's namespaced as `window.SC`
    load('https://w.soundcloud.com/player/api.js', (err) => {
      if (err) {
        console.warn(`Failed to load Soundcloud API: ${err.message}`)
        return
      }
      if (!window.SC) {
        console.warn('Soundcloud namespace is not available after API loaded')
        return
      }
      return cb(window.SC.Widget(id)); // eslint-disable-line new-cap
    });
  }
};

/**
 * Expose `createWidget`
 */

export default createWidget;
