var uploadBlock = document.querySelector('.img-upload__overlay');

var uploadEffect = {
  bar: document.querySelector('.img-upload__effect-level'),
  barPin: document.querySelector('.upload-effect-level-pin'),
  barFill: document.querySelector('.upload-effect-level-val'),
  barTrack: uploadBlock.querySelector('.img-upload__effect-level'),
};

(function () {
  var STEP_LEFT = -10;
  var STEP_RIGHT = 10;

  window.BarSlider = class {
    constructor(sliderData, index, collback) {
      this.bar = sliderData.bar;
      this.barPin = sliderData.barPin;
      this.barFill = sliderData.barFill;
      this.barTrack = sliderData.barTrack;
      this.index = index;
      this.collback = collback;
      this.active = false;

      this.barPinPosition = Number(this.barPin.style.translate.slice(0, -2));
      this.barFillPosition = this.barPinPosition;
      this.barFill.style.width = `${this.barFillPosition}px`;
      this.barPinPersent = 0;

      this.setParameters = this.setParameters.bind(this);
      this.setEvents = this.setEvents.bind(this);
      this.setStylePosition = this.setStylePosition.bind(this);

      this.setParameters();
      this.setEvents();
      this.setStylePosition();
    }

    setParameters(num = 0) {
      var barPinStyleLeft = window.getComputedStyle(this.barPin).left.slice(0, -2)
      var widthTrack = (this.barTrack.offsetWidth - this.barPin.offsetWidth - (barPinStyleLeft * 2));
      var tmp = this.barPinPosition + num;
      // console.log(tmp)

      if ((tmp >= 0) && (tmp <= widthTrack)) {
        this.barPinPosition = tmp;
        this.barFillPosition = tmp;
        this.barPinPersent = Math.floor((tmp * 100) / widthTrack) / 100;
        this.setStylePosition();
        this.collback(this.index, this.barPinPersent);
      }
      // console.log(`${this.barPinPersent}`)
    }

    setStylePosition() {
    // console.log(collback)
      this.barFill.style.width = `${this.barFillPosition}px`;
      this.barPin.style.transform = `translateX(${this.barPinPosition}px)`;
    }

    setEvents() {
      this.barPin.addEventListener('mousedown', (evt) => {
        if (!this.active) return;
        evt.preventDefault();

        var startCoordsX = evt.clientX;

        var onMouseMove = (moveEvt) => {
          moveEvt.preventDefault();
          var shift = moveEvt.clientX - startCoordsX;
          startCoordsX = moveEvt.clientX
          this.setParameters(shift);
        };

        var onMouseUp = (upEvt) => {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      this.barPin.addEventListener('keydown', (evt) => {
        if (window.utils.isLeftKeycode(evt)) {
          this.setParameters(STEP_LEFT);
        }

        if (window.utils.isRightKeycode(evt)) {
          this.setParameters(STEP_RIGHT);
        }
      });
    }
  }

  function debounce(func, time = 100) {
    let timer;
    return function (evt) {
      console.log('yes')
      clearTimeout(timer);
      timer = setTimeout(func, time, evt)
    }
  }
}());
