var uploadBlock = document.querySelector('.img-upload__overlay');

var uploadEffect = {
  bar: document.querySelector('.img-upload__effect-level'),
  barPin: document.querySelector('.upload-effect-level-pin'),
  barFill: document.querySelector('.upload-effect-level-val'),
  barTrack: uploadBlock.querySelector('.img-upload__effect-level'),
};

(function () {
  window.BarSlider = class {
    constructor(sliderData, collback) {
      this.bar = sliderData.bar;
      this.barPin = sliderData.barPin;
      this.barFill = sliderData.barFill;
      this.barTrack = sliderData.barTrack;
      this.collback = collback;

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
        this.barPinPersent = Math.floor((tmp * 100) / widthTrack);
        this.setStylePosition();
      }
      console.log(`${this.barPinPersent}`)
    }

    setStylePosition() {
    // console.log(collback)
      this.collback()
      this.barFill.style.width = `${this.barFillPosition}px`;
      this.barPin.style.transform = `translateX(${this.barPinPosition}px)`;
    }

    setEvents() {
      this.barPin.addEventListener('mousedown', (evt) => {
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
}())

var col2= function () {
  console.log('coll')
}

var coll = function () {
  console.log('coll2')
}

var barEffect = new window.BarSlider(uploadEffect, col2);
console.log(barEffect);
