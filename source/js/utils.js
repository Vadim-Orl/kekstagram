(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_KEYCODE = 37;
  var RIGHT_KEYCODE = 39;

  window.utils = {
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
  }
}())
