'use strict';

(function() {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.util = {
    isEscEvent: function(evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function(evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomNum: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    getRandomElement: function(arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },
  };
})();
