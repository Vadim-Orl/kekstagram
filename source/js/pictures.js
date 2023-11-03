

(function () {
  var uploadEffect = {
    bar: document.querySelector('.img-upload__effect-level'),
    barPin: document.querySelector('.upload-effect-level-pin'),
    barFill: document.querySelector('.upload-effect-level-val'),
    barTrack: document.querySelector('.img-upload__effect-level'),
  };

  var uploadButtonStart = document.querySelector('.img-upload__start');
  var uploadButtonCancel = document.querySelector('.img-upload__cancel');
  var inputFile = document.querySelector('#upload-file');

  var uploadBlock = document.querySelector('.img-upload__overlay');
  var effectList = document.querySelector('.effects__list');
  var listEffectItem = document.querySelectorAll('.effects__item');

  var imgPreview = document.querySelector('.img-upload__preview');
  var barEffectLevel = document.querySelector('.img-upload__effect-level');

  var listDataEffect = [];

  //-------------------

  var renderFilter = function (index, persent) {
    var mathValue = function () {
      return (window.utils.filterVariants.arrPercent[index]) - (persent * window.utils.filterVariants.arrPercent[index])
    }

    if (index === 0) {
      imgPreview.style.filter = 'none';
      return
    }

    imgPreview.style.filter = `${window.utils.filterVariants.arrEffects[index]}(${mathValue()}${window.utils.filterVariants.arrUnit[index]})`;
  }

  var doOverlayImgOpen = function () {
    uploadBlock.classList.remove('hidden');

    for (var i = 0; i < listEffectItem.length; i++) {
      listDataEffect[i] = new window.BarSlider(uploadEffect, i, renderFilter);
    }

    var resetFilter = function (item) {
      item.setParameters(); // поменять название
    }

    var lastIndexFilter = 0;
    imgPreview.style.filter = 'none';
    barEffectLevel.classList.add('hidden');

    effectList.addEventListener('click', function (evt) {
      var { target } = evt;
      if (target.tagName === 'INPUT') {
        var activInputValue = window.utils.filterVariants.arrTypes.indexOf(target.value)

        if (activInputValue === 0) {
          barEffectLevel.classList.add('hidden');
        } else {
          barEffectLevel.classList.remove('hidden');
        }

        listDataEffect[lastIndexFilter].active = false;
        listDataEffect[activInputValue].active = true;
        resetFilter(listDataEffect[activInputValue])

        lastIndexFilter = activInputValue;
      }
    })
  };

  var doOverlayImgClose = function () {
    uploadBlock.classList.add('hidden');
    inputFile.value = '';

    for (var i = 0; i < listEffectItem.length; i++) {
      listDataEffect[i] = null;
    }
  };

  // временно открытие чтоб не нажимать
  // doOverlayImgOpen();
  var clickOutsideChecker;

  // открытие если изменен файл
  uploadButtonStart.addEventListener('change', () => {
    doOverlayImgOpen();
    clickOutsideChecker = false;
  });

  // закрытие
  uploadButtonCancel.addEventListener('click', () => {
    doOverlayImgClose();
    clickOutsideChecker = false;
  });

  // обработка клика вне окна и esc

  var onOutsideOnLoadDown = function (evt) {
    if (!evt.target.classList.contains('img-upload__overlay')) return;
    clickOutsideChecker = true;
  }

  var onOutsideOnLoadUp = function (evt) {
    if (clickOutsideChecker && evt.target.classList.contains('img-upload__overlay')) {
      doOverlayImgClose();
    }
  }

  var onOnLoadEscPress = function (evt) {
    if (window.utils.isEscKeycode(evt)) {
      doOverlayImgClose();
    }
  }

  uploadBlock.addEventListener('mousedown', onOutsideOnLoadDown)
  uploadBlock.addEventListener('mouseup', onOutsideOnLoadUp)

  document.addEventListener('keydown', onOnLoadEscPress)
}())
