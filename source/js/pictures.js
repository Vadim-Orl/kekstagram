/* eslint-disable no-loop-func */
// --------------------------------загрузка

var arrTypes = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
var arrEffects = ['none', 'grayscale', 'sepia', 'invert', 'blur', 'brightness'];
var arrPercent = ['none', '1', '1', '100', '3', '3'];
var arrUnit = ['none', '', '', '%', 'px', ''];

var uploadButtonStart = document.querySelector('.img-upload__start');
var uploadButtonCancel = document.querySelector('.img-upload__cancel');
var uploadBlock = document.querySelector('.img-upload__overlay');
var inputFile = document.querySelector('#upload-file');

var imgPreview = document.querySelector('.img-upload__preview');

var barEffectLevel = document.querySelector('.img-upload__effect-level');
var barPin = document.querySelector('.upload-effect-level-pin');
var barFill = document.querySelector('.upload-effect-level-val');
var barTrack = uploadBlock.querySelector('.img-upload__effect-level');

var listEffectItem = document.querySelectorAll('.effects__item');

var listDataEffect = [];
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var STEP_LEFT = -10;
var STEP_RIGHT = 10;

var UploadEffectLevel = function (effectItem, effectIndex) {
  this.effect = arrEffects[effectIndex];
  this.effectIndex = effectIndex;
  this.barPinPosition = Number(barPin.style.translate.slice(0, -2));
  this.barFillPosition = barFill.offsetWidth;
  this.effectsUnit = arrUnit[effectIndex];
  this.effectsMaxPercent = arrPercent[effectIndex];

  this.changeEffectLevelItem = function () {
    barFill.style.width = `${this.barFillPosition}px`;
    barPin.style.transform = `translateX(${this.barPinPosition}px)`;

    var widthTrack = (barTrack.offsetWidth - 1);
    var saturatePercent = this.effectsMaxPercent - (this.effectsMaxPercent * this.barPinPosition) / (widthTrack - barPin.offsetWidth - 6);

    imgPreview.style.filter = `${this.effect}(${saturatePercent}${this.effectsUnit})`;
  };

  this.changeBarPinPosition = function (num = 0) {
    var widthTrack = (barTrack.offsetWidth - barPin.offsetWidth - 6);
    var tmp = this.barPinPosition + num;

    if ((tmp >= 0) && (tmp <= widthTrack)) {
      this.barPinPosition = tmp;
      this.barFillPosition = tmp;
    }
  };
};

var changeEffectLevel = function (step) {
  var effectImputChecked = document.querySelector('input[name="effect"]:checked');
  var indexInputChecked = (arrTypes.indexOf(effectImputChecked.value));

  if (indexInputChecked === 0) barEffectLevel.classList.toggle('hidden')

  // if ((indexInputChecked > 0) && (step !== 0)) {
  //   console.log('step > 0');

  //   listDataEffect[indexInputChecked].changeBarPinPosition(step);
  //   listDataEffect[indexInputChecked].changeEffectLevelItem(indexInputChecked);
  // }
};

var addClickListener = function (effectItem, index) {
  effectItem.addEventListener('click', () => {
    changeEffectLevel();
  });
}

var doOverlayImgOpen = function () {
  uploadBlock.classList.remove('hidden');
  for (var i = 0; i < listEffectItem.length; i++) {
    listDataEffect[i] = new UploadEffectLevel(listEffectItem[i], i);
    addClickListener(listEffectItem[i]);
  }
};

barPin.addEventListener('keydown', (evt) => {
  if (window.utils.isLeftKeycode(evt)) {
    changeEffectLevel(STEP_LEFT);
  }

  if (window.utils.isRightKeycode(evt)) {
    changeEffectLevel(STEP_RIGHT);
  }
});

barPin.addEventListener('mousedown', (evt) => {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = moveEvt.clientX - startCoordsX;
    startCoordsX = moveEvt.clientX

    changeEffectLevel(shift);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var doOverlayImgClose = function () {
  uploadBlock.classList.add('hidden');
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


// обработка клика вне окна и esc
var clickOutsideChecker = false;

var onOutsideOnLoadDown = function (evt) {
  if (!evt.target.classList.contains('img-upload__overlay')) return;
  clickOutsideChecker = true;
}

var onOutsideOnLoadUp = function (evt) {
  if (clickOutsideChecker && evt.target.classList.contains('img-upload__overlay')) {
    uploadBlock.classList.add('hidden');
  }
}

var onOnLoadEscPress = function (evt) {
  if (window.utils.isEscKeycode(evt)) {
    uploadBlock.classList.add('hidden');
  }
}

uploadBlock.addEventListener('mousedown', onOutsideOnLoadDown)
uploadBlock.addEventListener('mouseup', onOutsideOnLoadUp)

document.addEventListener('keydown', onOnLoadEscPress)
