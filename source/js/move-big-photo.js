(function () {
  var bigPictures = document.querySelector('.big-picture');
  var picturesTable = document.querySelector('.pictures');
  var pictureClose = document.querySelector('.big-picture__cancel');
  var clickOutsideChecker;;

  var openBigPicture = function (evt) {
    clickOutsideChecker = false;
    evt.stopPropagation();
    var { target } = evt;

    if (target.closest('.picture')) {
      window.newBigPicture(window.renderListPicturesBlock[target.closest('.picture').name]);
      bigPictures.classList.remove('hidden');
      document.querySelector('.social__comment-count').classList.add('visually-hidden');
      document.querySelector('.social__comments-loader').classList.add('visually-hidden');
      document.addEventListener('mousedown', onOutsideOnLoadDown);
      document.addEventListener('mouseup', onOutsideOnLoadUp);
      document.addEventListener('keydown', onPictureEscPress);
    }
  };

  var closeBigPicture = function () {
    bigPictures.classList.add('hidden');
    document.removeEventListener('keydown', onPictureEscPress);
    document.removeEventListener('mousedown', onOutsideOnLoadDown);
    document.removeEventListener('mouseup', onOutsideOnLoadUp);
  };

  var onPictureEscPress = function (evt) {
    if (window.utils.isEscKeycode(evt)) {
      closeBigPicture()
    }
  }

  var onOutsideOnLoadDown = function (evt) {
    if (!evt.target.classList.contains('big-picture')) return;
    clickOutsideChecker = true;
  }

  var onOutsideOnLoadUp = function (evt) {
    if (clickOutsideChecker && evt.target.classList.contains('big-picture')) {
      closeBigPicture()
    }
  }

  picturesTable.addEventListener('click', openBigPicture);
  pictureClose.addEventListener('click', closeBigPicture);
}());
