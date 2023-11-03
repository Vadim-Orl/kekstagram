(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEYCODE = 37;
  var RIGHT_KEYCODE = 39;

utils = {
    isEscKeycode(evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isEnterKeycode(evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isLeftKeycode(evt) {
      return evt.keyCode === LEFT_KEYCODE;
    },
    isRightKeycode(evt) {
      return evt.keyCode === RIGHT_KEYCODE;
    },

    filterVariants: {
      arrTypes: ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'],
      arrEffects: ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'],
      arrPercent: ['none', '1', '1', '100', '3', '3'],
      arrUnit: ['none', '', '', '%', 'px', ''],
    },
  }
}())
