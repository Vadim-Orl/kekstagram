// --------------------------------загрузка

var arrTypes = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
var arrEffects = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];
var arrPercent = ['none', '1', '1', '100', '3', '3'];
var arrUnit = ['none', '', '', '%', 'px', ''];

var uploadButtonStart = document.querySelector('.img-upload__start');
var uploadButtonCancel = document.querySelector('.img-upload__cancel');
var overlayImg = document.querySelector('.img-upload__overlay');
var inputFile = document.querySelector('#upload-file');

var imgPreview = document.querySelector('.img-upload__preview');

var barPin = document.querySelector('.upload-effect-level-pin');
var barFill = document.querySelector('.upload-effect-level-val');
var bar = document.querySelector('.effect-level');

var listEffectItem = document.querySelectorAll('.effects__item');
var listEffectInput = document.querySelectorAll('input[name="effect"]');

var listDataEffect = [];
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var STEP_LEFT = -10;
var STEP_RIGHT = 10;

var UploadEffectLevel = function (effectItem, effectIndex) {
  this.effect = effectItem;
  this.effectIndex = effectIndex;
  this.barPinPosition = 0;
  this.barFillPosition = barFill.offsetWidth;
  this.effectsUnit = arrUnit[effectIndex];
  this.effectsMaxPercent = arrPercent[effectIndex];

  this.changeEffectLevel = function () {
    barFill.style.width = `${this.barFillPosition}px`;
    barPin.style.transform = `translateX(${this.barPinPosition}px)`;

    var widthTrack = overlayImg.querySelector('.img-upload__effect-level').offsetWidth;
    var saturatePercent = this.effectsMaxPercent - (this.effectsMaxPercent * this.barPinPosition) / (widthTrack - barPin.offsetWidth - 2);

    imgPreview.style.filter = `${arrEffects[effectIndex]}(${saturatePercent}${this.effectsUnit})`;
  };

  this.changeBarPinPosition = function (num) {
    var widthTrack = overlayImg.querySelector('.img-upload__effect-level').offsetWidth - 28;

    var tmp = this.barPinPosition + num;
    if ((tmp <= widthTrack) && (tmp >= 0)) {
      this.barPinPosition = tmp;
      this.barFillPosition += num;
      console.log(`barPinPosition ${this.barPinPosition}`);
    }
  };

  this.changeBarFillPosition = function (num) {
    this.barFillPosition += num;
  };
};

var changeEffectLevel = function (step = 0) {
  imgPreview.style.filter = 'none';
  var itemInstrument = document.querySelector('input[name="effect"]:checked');
  var indexInput = (arrTypes.indexOf(itemInstrument.value));

  if (indexInput > 0) {
    listDataEffect[indexInput].changeBarPinPosition(step);
    listDataEffect[indexInput].changeEffectLevel(indexInput);
  }
};

var doOverlayImgOpen = function () {
  overlayImg.classList.remove('hidden');

  for (var i = 0; i < listEffectItem.length; i++) {
    listDataEffect[i] = new UploadEffectLevel(listEffectItem[i], i);

    listEffectItem[i].addEventListener('click', () => {
      changeEffectLevel();
    });
  }
};

barPin.addEventListener('keydown', (evt) => {
  if (evt.keyCode === LEFT_KEY) {
    changeEffectLevel(STEP_LEFT);
  }

  if (evt.keyCode === RIGHT_KEY) {
    changeEffectLevel(STEP_RIGHT);
  }
});

var doOverlayImgClose = function () {
  overlayImg.classList.add('hidden');
  inputFile.value = '';

  for (var i = 0; i < listEffectItem.length; i++) {
    listDataEffect[i] = null;
  }
};

// временно открытие чтоб не нажимать
doOverlayImgOpen();

// открытие если изменен файл
uploadButtonStart.addEventListener('change', () => {
  doOverlayImgOpen();
});

// закрытие
uploadButtonCancel.addEventListener('click', () => {
  doOverlayImgClose();
});
