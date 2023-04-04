(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.utils = {
    isEscKeycode(evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isEnterKeycode(evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
  }
}())
