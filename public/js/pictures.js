"use strict";
11

var maxRandomComments = 4;
var maxRandomLickes = 255;
var minRandomLickes = 15;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCKRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var fragment = document.createDocumentFragment();
var PhotoBlockInit = function PhotoBlockInit(index) {
  this.url = "photos/".concat(index + 1, ".jpg");
  this.likes = Math.floor(Math.random() * maxRandomLickes) + minRandomLickes;
  this.comments = randomComments();
  this.desckription = DESCKRIPTION[Math.floor(Math.random() * DESCKRIPTION.length)];
  function randomComments() {
    var comment = [];
    var commentsAmount = Math.floor(Math.random() * maxRandomComments) + 1;
    for (var i = 0; i < commentsAmount; i++) {
      var tmp = examinationRandomComment(comment);
      comment[i] = COMMENTS[tmp];
    }
    return comment;
  }
  function examinationRandomComment(comment) {
    var commentRandom = Math.floor(Math.random() * COMMENTS.length);
    for (var i = 0; i <= comment.length; i++) {
      while (comment.includes(COMMENTS[commentRandom])) {
        commentRandom = Math.floor(Math.random() * COMMENTS.length);
      }
    }
    return commentRandom;
  }
};
var doNewPhotoList = function doNewPhotoList() {
  var photoAmount = 25;
  var photosBlock = [];
  for (var i = 0; i < photoAmount; i++) {
    photosBlock[i] = new PhotoBlockInit(i);
  }
  return photosBlock;
};
var listPicturesBlock = doNewPhotoList();
function initPhoto() {
  for (var i = 0; i < listPicturesBlock.length; i++) {
    fragment.appendChild(renderPictures(listPicturesBlock[i], i));
  }
  document.querySelector('.pictures').appendChild(fragment);
}
var renderPictures = function renderPictures(picture, index) {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.name = index;
  return pictureElement;
};
initPhoto();

// ------------ bigPictures open/close
var bigPictures = document.querySelector('.big-picture');
var picturesTable = document.querySelector('.pictures');
var openBigPicture = function openBigPicture() {
  bigPictures.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comments-loader').classList.add('visually-hidden');
};
var closeBigPicture = function closeBigPicture() {
  bigPictures.classList.add('hidden');
};
picturesTable.addEventListener('click', function (evt) {
  var target = evt.target;
  while (target !== this) {
    if (target.classList.contains('picture')) {
      newBigPictures(listPicturesBlock[target.name]);
      openBigPicture();
    }
    target = target.parentNode;
  }
});
document.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);

// коментарии к каждому

var renderComment = function renderComment(bigPicture, index, bigPictureTemplate) {
  var pictureElement = bigPictureTemplate.cloneNode(true);
  var randomAvatar = Math.floor(Math.random() * 6) + 1;
  pictureElement.querySelector('.social__picture').src = "img/avatar-".concat(randomAvatar, ".svg");
  pictureElement.querySelector('.social__text').textContent = bigPicture.comments[index];
  return pictureElement;
};
var renderBigPictureComments = function renderBigPictureComments(bigPicture) {
  var bigPictureCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
  for (var i = 0; i < bigPicture.comments.length; i++) {
    fragment.appendChild(renderComment(bigPicture, i, bigPictureCommentTemplate));
    document.querySelector('.social__comments').appendChild(fragment);
  }
};
var newBigPictures = function newBigPictures(itemPictures) {
  if (itemPictures !== undefined) {
    bigPictures.querySelector('.big-picture__img').querySelector('img').src = itemPictures.url;
    bigPictures.querySelector('.likes-count').textContent = itemPictures.likes;
    bigPictures.querySelector('.comments-count').textContent = itemPictures.comments.length;
    bigPictures.querySelector('.likes-count').textContent = itemPictures.likes;
    bigPictures.querySelector('.social__caption').textContent = itemPictures.desckription;
    renderBigPictureComments(itemPictures);
  }
};

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
var UploadEffectLevel = function UploadEffectLevel(effectItem, effectIndex) {
  this.effect = effectItem;
  this.effectIndex = effectIndex;
  this.barPinPosition = 0;
  this.barFillPosition = barFill.offsetWidth;
  this.effectsUnit = arrUnit[effectIndex];
  this.effectsMaxPercent = arrPercent[effectIndex];
  this.changeEffectLevel = function () {
    barFill.style.width = "".concat(this.barFillPosition, "px");
    barPin.style.transform = "translateX(".concat(this.barPinPosition, "px)");
    var widthTrack = overlayImg.querySelector('.img-upload__effect-level').offsetWidth;
    var saturatePercent = this.effectsMaxPercent - this.effectsMaxPercent * this.barPinPosition / (widthTrack - barPin.offsetWidth - 2);
    imgPreview.style.filter = "".concat(arrEffects[effectIndex], "(").concat(saturatePercent).concat(this.effectsUnit, ")");
  };
  this.changeBarPinPosition = function (num) {
    var widthTrack = overlayImg.querySelector('.img-upload__effect-level').offsetWidth - 28;
    var tmp = this.barPinPosition + num;
    if (tmp <= widthTrack && tmp >= 0) {
      this.barPinPosition = tmp;
      this.barFillPosition += num;
      console.log("barPinPosition ".concat(this.barPinPosition));
    }
  };
  this.changeBarFillPosition = function (num) {
    this.barFillPosition += num;
  };
};
var changeEffectLevel = function changeEffectLevel() {
  var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  imgPreview.style.filter = 'none';
  var itemInstrument = document.querySelector('input[name="effect"]:checked');
  var indexInput = arrTypes.indexOf(itemInstrument.value);
  if (indexInput > 0) {
    listDataEffect[indexInput].changeBarPinPosition(step);
    listDataEffect[indexInput].changeEffectLevel(indexInput);
  }
};
var doOverlayImgOpen = function doOverlayImgOpen() {
  overlayImg.classList.remove('hidden');
  for (var i = 0; i < listEffectItem.length; i++) {
    listDataEffect[i] = new UploadEffectLevel(listEffectItem[i], i);
    listEffectItem[i].addEventListener('click', function () {
      changeEffectLevel();
    });
  }
};
barPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === LEFT_KEY) {
    changeEffectLevel(STEP_LEFT);
  }
  if (evt.keyCode === RIGHT_KEY) {
    changeEffectLevel(STEP_RIGHT);
  }
});
var doOverlayImgClose = function doOverlayImgClose() {
  overlayImg.classList.add('hidden');
  inputFile.value = '';
  for (var i = 0; i < listEffectItem.length; i++) {
    listDataEffect[i] = null;
  }
};

// временно открытие чтоб не нажимать
// doOverlayImgOpen();

// открытие если изменен файл
uploadButtonStart.addEventListener('change', function () {
  doOverlayImgOpen();
});

// закрытие
uploadButtonCancel.addEventListener('click', function () {
  doOverlayImgClose();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGljdHVyZXMuanMiLCJuYW1lcyI6WyJtYXhSYW5kb21Db21tZW50cyIsIm1heFJhbmRvbUxpY2tlcyIsIm1pblJhbmRvbUxpY2tlcyIsIkNPTU1FTlRTIiwiREVTQ0tSSVBUSU9OIiwiZnJhZ21lbnQiLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJQaG90b0Jsb2NrSW5pdCIsImluZGV4IiwidXJsIiwiY29uY2F0IiwibGlrZXMiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb21tZW50cyIsInJhbmRvbUNvbW1lbnRzIiwiZGVzY2tyaXB0aW9uIiwibGVuZ3RoIiwiY29tbWVudCIsImNvbW1lbnRzQW1vdW50IiwiaSIsInRtcCIsImV4YW1pbmF0aW9uUmFuZG9tQ29tbWVudCIsImNvbW1lbnRSYW5kb20iLCJpbmNsdWRlcyIsImRvTmV3UGhvdG9MaXN0IiwicGhvdG9BbW91bnQiLCJwaG90b3NCbG9jayIsImxpc3RQaWN0dXJlc0Jsb2NrIiwiaW5pdFBob3RvIiwiYXBwZW5kQ2hpbGQiLCJyZW5kZXJQaWN0dXJlcyIsInF1ZXJ5U2VsZWN0b3IiLCJwaWN0dXJlIiwicGljdHVyZVRlbXBsYXRlIiwiY29udGVudCIsInBpY3R1cmVFbGVtZW50IiwiY2xvbmVOb2RlIiwic3JjIiwidGV4dENvbnRlbnQiLCJuYW1lIiwiYmlnUGljdHVyZXMiLCJwaWN0dXJlc1RhYmxlIiwib3BlbkJpZ1BpY3R1cmUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJjbG9zZUJpZ1BpY3R1cmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwidGFyZ2V0IiwiY29udGFpbnMiLCJuZXdCaWdQaWN0dXJlcyIsInBhcmVudE5vZGUiLCJyZW5kZXJDb21tZW50IiwiYmlnUGljdHVyZSIsImJpZ1BpY3R1cmVUZW1wbGF0ZSIsInJhbmRvbUF2YXRhciIsInJlbmRlckJpZ1BpY3R1cmVDb21tZW50cyIsImJpZ1BpY3R1cmVDb21tZW50VGVtcGxhdGUiLCJpdGVtUGljdHVyZXMiLCJ1bmRlZmluZWQiLCJhcnJUeXBlcyIsImFyckVmZmVjdHMiLCJhcnJQZXJjZW50IiwiYXJyVW5pdCIsInVwbG9hZEJ1dHRvblN0YXJ0IiwidXBsb2FkQnV0dG9uQ2FuY2VsIiwib3ZlcmxheUltZyIsImlucHV0RmlsZSIsImltZ1ByZXZpZXciLCJiYXJQaW4iLCJiYXJGaWxsIiwiYmFyIiwibGlzdEVmZmVjdEl0ZW0iLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdEVmZmVjdElucHV0IiwibGlzdERhdGFFZmZlY3QiLCJMRUZUX0tFWSIsIlJJR0hUX0tFWSIsIlNURVBfTEVGVCIsIlNURVBfUklHSFQiLCJVcGxvYWRFZmZlY3RMZXZlbCIsImVmZmVjdEl0ZW0iLCJlZmZlY3RJbmRleCIsImVmZmVjdCIsImJhclBpblBvc2l0aW9uIiwiYmFyRmlsbFBvc2l0aW9uIiwib2Zmc2V0V2lkdGgiLCJlZmZlY3RzVW5pdCIsImVmZmVjdHNNYXhQZXJjZW50IiwiY2hhbmdlRWZmZWN0TGV2ZWwiLCJzdHlsZSIsIndpZHRoIiwidHJhbnNmb3JtIiwid2lkdGhUcmFjayIsInNhdHVyYXRlUGVyY2VudCIsImZpbHRlciIsImNoYW5nZUJhclBpblBvc2l0aW9uIiwibnVtIiwiY29uc29sZSIsImxvZyIsImNoYW5nZUJhckZpbGxQb3NpdGlvbiIsInN0ZXAiLCJhcmd1bWVudHMiLCJpdGVtSW5zdHJ1bWVudCIsImluZGV4SW5wdXQiLCJpbmRleE9mIiwidmFsdWUiLCJkb092ZXJsYXlJbWdPcGVuIiwia2V5Q29kZSIsImRvT3ZlcmxheUltZ0Nsb3NlIl0sInNvdXJjZXMiOlsicGljdHVyZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1heFJhbmRvbUNvbW1lbnRzID0gNDtcbnZhciBtYXhSYW5kb21MaWNrZXMgPSAyNTU7XG52YXIgbWluUmFuZG9tTGlja2VzID0gMTU7XG5cbnZhciBDT01NRU5UUyA9IFsn0JLRgdGRINC+0YLQu9C40YfQvdC+IScsICfQkiDRhtC10LvQvtC8INCy0YHRkSDQvdC10L/Qu9C+0YXQvi4g0J3QviDQvdC1INCy0YHRkS4nLFxuICAn0JrQvtCz0LTQsCDQstGLINC00LXQu9Cw0LXRgtC1INGE0L7RgtC+0LPRgNCw0YTQuNGOLCDRhdC+0YDQvtGI0L4g0LHRiyDRg9Cx0LjRgNCw0YLRjCDQv9Cw0LvQtdGGINC40Lcg0LrQsNC00YDQsC4g0JIg0LrQvtC90YbQtSDQutC+0L3RhtC+0LIg0Y3RgtC+INC/0YDQvtGB0YLQviDQvdC10L/RgNC+0YTQtdGB0YHQuNC+0L3QsNC70YzQvdC+LicsXG4gICfQnNC+0Y8g0LHQsNCx0YPRiNC60LAg0YHQu9GD0YfQsNC50L3QviDRh9C40YXQvdGD0LvQsCDRgSDRhNC+0YLQvtCw0L/Qv9Cw0YDQsNGC0L7QvCDQsiDRgNGD0LrQsNGFINC4INGDINC90LXRkSDQv9C+0LvRg9GH0LjQu9Cw0YHRjCDRhNC+0YLQvtCz0YDQsNGE0LjRjyDQu9GD0YfRiNC1LicsXG4gICfQryDQv9C+0YHQutC+0LvRjNC30L3Rg9C70YHRjyDQvdCwINCx0LDQvdCw0L3QvtCy0L7QuSDQutC+0LbRg9GA0LUg0Lgg0YPRgNC+0L3QuNC7INGE0L7RgtC+0LDQv9C/0LDRgNCw0YIg0L3QsCDQutC+0YLQsCDQuCDRgyDQvNC10L3RjyDQv9C+0LvRg9GH0LjQu9Cw0YHRjCDRhNC+0YLQvtCz0YDQsNGE0LjRjyDQu9GD0YfRiNC1LicsXG4gICfQm9C40YbQsCDRgyDQu9GO0LTQtdC5INC90LAg0YTQvtGC0LrQtSDQv9C10YDQtdC60L7RiNC10L3Riywg0LrQsNC6INCx0YPQtNGC0L4g0LjRhSDQuNC30LHQuNCy0LDRjtGCLiDQmtCw0Log0LzQvtC20L3QviDQsdGL0LvQviDQv9C+0LnQvNCw0YLRjCDRgtCw0LrQvtC5INC90LXRg9C00LDRh9C90YvQuSDQvNC+0LzQtdC90YI/ISddO1xuXG52YXIgREVTQ0tSSVBUSU9OID0gWyfQotC10YHRgtC40Lwg0L3QvtCy0YPRjiDQutCw0LzQtdGA0YMhJywgJ9CX0LDRgtGD0YHQuNC70Lgg0YEg0LTRgNGD0LfRjNGP0LzQuCDQvdCwINC80L7RgNC1JyxcbiAgJ9Ca0LDQuiDQttC1INC60YDRg9GC0L4g0YLRg9GCINC60L7RgNC80Y/RgicsICfQntGC0LTRi9GF0LDQtdC8Li4uJyxcbiAgJ9Cm0LXQvdC40YLQtSDQutCw0LbQtNC+0LUg0LzQs9C90L7QstC10L3RjNC1LiDQptC10L3QuNGC0LUg0YLQtdGFLCDQutGC0L4g0YDRj9C00L7QvCDRgSDQstCw0LzQuCDQuCDQvtGC0LPQvtC90Y/QudGC0LUg0LLRgdC1INGB0L7QvNC90LXQvdGM0Y8uINCd0LUg0L7QsdC40LbQsNC50YLQtSDQstGB0LXRhSDRgdC70L7QstCw0LzQuC4uLi4uLicsICfQktC+0YIg0Y3RgtC+INGC0LDRh9C60LAhJ107XG5cbnZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxudmFyIFBob3RvQmxvY2tJbml0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIHRoaXMudXJsID0gYHBob3Rvcy8ke2luZGV4ICsgMX0uanBnYDtcbiAgdGhpcy5saWtlcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFJhbmRvbUxpY2tlcykgKyBtaW5SYW5kb21MaWNrZXM7XG4gIHRoaXMuY29tbWVudHMgPSByYW5kb21Db21tZW50cygpO1xuICB0aGlzLmRlc2NrcmlwdGlvbiA9IERFU0NLUklQVElPTltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBERVNDS1JJUFRJT04ubGVuZ3RoKV07XG5cbiAgZnVuY3Rpb24gcmFuZG9tQ29tbWVudHMoKSB7XG4gICAgdmFyIGNvbW1lbnQgPSBbXTtcbiAgICB2YXIgY29tbWVudHNBbW91bnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhSYW5kb21Db21tZW50cykgKyAxO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21tZW50c0Ftb3VudDsgaSsrKSB7XG4gICAgICB2YXIgdG1wID0gZXhhbWluYXRpb25SYW5kb21Db21tZW50KGNvbW1lbnQpO1xuICAgICAgY29tbWVudFtpXSA9IENPTU1FTlRTW3RtcF07XG4gICAgfVxuICAgIHJldHVybiBjb21tZW50O1xuICB9XG5cbiAgZnVuY3Rpb24gZXhhbWluYXRpb25SYW5kb21Db21tZW50KGNvbW1lbnQpIHtcbiAgICB2YXIgY29tbWVudFJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIENPTU1FTlRTLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBjb21tZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB3aGlsZSAoY29tbWVudC5pbmNsdWRlcyhDT01NRU5UU1tjb21tZW50UmFuZG9tXSkpIHtcbiAgICAgICAgY29tbWVudFJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIENPTU1FTlRTLmxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21tZW50UmFuZG9tO1xuICB9XG59O1xuXG52YXIgZG9OZXdQaG90b0xpc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwaG90b0Ftb3VudCA9IDI1O1xuICB2YXIgcGhvdG9zQmxvY2sgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBob3RvQW1vdW50OyBpKyspIHtcbiAgICBwaG90b3NCbG9ja1tpXSA9IG5ldyBQaG90b0Jsb2NrSW5pdChpKTtcbiAgfVxuXG4gIHJldHVybiBwaG90b3NCbG9jaztcbn07XG5cbnZhciBsaXN0UGljdHVyZXNCbG9jayA9IGRvTmV3UGhvdG9MaXN0KCk7XG5cbmZ1bmN0aW9uIGluaXRQaG90bygpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0UGljdHVyZXNCbG9jay5sZW5ndGg7IGkrKykge1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJlbmRlclBpY3R1cmVzKGxpc3RQaWN0dXJlc0Jsb2NrW2ldLCBpKSk7XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGljdHVyZXMnKS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG59XG5cbnZhciByZW5kZXJQaWN0dXJlcyA9IGZ1bmN0aW9uIChwaWN0dXJlLCBpbmRleCkge1xuICB2YXIgcGljdHVyZVRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BpY3R1cmUnKS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlJyk7XG4gIHZhciBwaWN0dXJlRWxlbWVudCA9IHBpY3R1cmVUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgcGljdHVyZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nJykuc3JjID0gcGljdHVyZS51cmw7XG4gIHBpY3R1cmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlX19jb21tZW50cycpLnRleHRDb250ZW50ID0gcGljdHVyZS5jb21tZW50cy5sZW5ndGg7XG4gIHBpY3R1cmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5waWN0dXJlX19saWtlcycpLnRleHRDb250ZW50ID0gcGljdHVyZS5saWtlcztcbiAgcGljdHVyZUVsZW1lbnQubmFtZSA9IGluZGV4O1xuICByZXR1cm4gcGljdHVyZUVsZW1lbnQ7XG59O1xuXG5pbml0UGhvdG8oKTtcblxuLy8gLS0tLS0tLS0tLS0tIGJpZ1BpY3R1cmVzIG9wZW4vY2xvc2VcbnZhciBiaWdQaWN0dXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctcGljdHVyZScpO1xudmFyIHBpY3R1cmVzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGljdHVyZXMnKTtcblxudmFyIG9wZW5CaWdQaWN0dXJlID0gZnVuY3Rpb24gKCkge1xuICBiaWdQaWN0dXJlcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fY29tbWVudC1jb3VudCcpLmNsYXNzTGlzdC5hZGQoJ3Zpc3VhbGx5LWhpZGRlbicpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50cy1sb2FkZXInKS5jbGFzc0xpc3QuYWRkKCd2aXN1YWxseS1oaWRkZW4nKTtcbn07XG5cbnZhciBjbG9zZUJpZ1BpY3R1cmUgPSBmdW5jdGlvbiAoKSB7XG4gIGJpZ1BpY3R1cmVzLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxucGljdHVyZXNUYWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldnQpIHtcbiAgdmFyIHsgdGFyZ2V0IH0gPSBldnQ7XG5cbiAgd2hpbGUgKHRhcmdldCAhPT0gdGhpcykge1xuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwaWN0dXJlJykpIHtcbiAgICAgIG5ld0JpZ1BpY3R1cmVzKGxpc3RQaWN0dXJlc0Jsb2NrW3RhcmdldC5uYW1lXSk7XG4gICAgICBvcGVuQmlnUGljdHVyZSgpO1xuICAgIH1cbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfVxufSk7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iaWctcGljdHVyZV9fY2FuY2VsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUJpZ1BpY3R1cmUpO1xuXG4vLyDQutC+0LzQtdC90YLQsNGA0LjQuCDQuiDQutCw0LbQtNC+0LzRg1xuXG52YXIgcmVuZGVyQ29tbWVudCA9IGZ1bmN0aW9uIChiaWdQaWN0dXJlLCBpbmRleCwgYmlnUGljdHVyZVRlbXBsYXRlKSB7XG4gIHZhciBwaWN0dXJlRWxlbWVudCA9IGJpZ1BpY3R1cmVUZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgdmFyIHJhbmRvbUF2YXRhciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcbiAgcGljdHVyZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fcGljdHVyZScpLnNyYyA9IGBpbWcvYXZhdGFyLSR7cmFuZG9tQXZhdGFyfS5zdmdgO1xuICBwaWN0dXJlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX190ZXh0JykudGV4dENvbnRlbnQgPSBiaWdQaWN0dXJlLmNvbW1lbnRzW2luZGV4XTtcblxuICByZXR1cm4gcGljdHVyZUVsZW1lbnQ7XG59O1xuXG52YXIgcmVuZGVyQmlnUGljdHVyZUNvbW1lbnRzID0gZnVuY3Rpb24gKGJpZ1BpY3R1cmUpIHtcbiAgdmFyIGJpZ1BpY3R1cmVDb21tZW50VGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc29jaWFsX19jb21tZW50JykuY29udGVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50Jyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaWdQaWN0dXJlLmNvbW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQocmVuZGVyQ29tbWVudChiaWdQaWN0dXJlLCBpLCBiaWdQaWN0dXJlQ29tbWVudFRlbXBsYXRlKSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fY29tbWVudHMnKS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gIH1cbn07XG5cbnZhciBuZXdCaWdQaWN0dXJlcyA9IGZ1bmN0aW9uIChpdGVtUGljdHVyZXMpIHtcbiAgaWYgKGl0ZW1QaWN0dXJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYmlnUGljdHVyZXMucXVlcnlTZWxlY3RvcignLmJpZy1waWN0dXJlX19pbWcnKS5xdWVyeVNlbGVjdG9yKCdpbWcnKS5zcmMgPSBpdGVtUGljdHVyZXMudXJsO1xuICAgIGJpZ1BpY3R1cmVzLnF1ZXJ5U2VsZWN0b3IoJy5saWtlcy1jb3VudCcpLnRleHRDb250ZW50ID0gaXRlbVBpY3R1cmVzLmxpa2VzO1xuICAgIGJpZ1BpY3R1cmVzLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpLnRleHRDb250ZW50ID0gaXRlbVBpY3R1cmVzLmNvbW1lbnRzLmxlbmd0aDtcbiAgICBiaWdQaWN0dXJlcy5xdWVyeVNlbGVjdG9yKCcubGlrZXMtY291bnQnKS50ZXh0Q29udGVudCA9IGl0ZW1QaWN0dXJlcy5saWtlcztcbiAgICBiaWdQaWN0dXJlcy5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jYXB0aW9uJykudGV4dENvbnRlbnQgPSBpdGVtUGljdHVyZXMuZGVzY2tyaXB0aW9uO1xuXG4gICAgcmVuZGVyQmlnUGljdHVyZUNvbW1lbnRzKGl0ZW1QaWN0dXJlcyk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t0LfQsNCz0YDRg9C30LrQsFxuXG52YXIgYXJyVHlwZXMgPSBbJ25vbmUnLCAnY2hyb21lJywgJ3NlcGlhJywgJ21hcnZpbicsICdwaG9ib3MnLCAnaGVhdCddO1xudmFyIGFyckVmZmVjdHMgPSBbJ25vbmUnLCAnZ3JheXNjYWxlJywgJ3NlcGlhJywgJ2ludmVydCcsICdibHVyJywgJ2JyaWdodG5lc3MnXTtcbnZhciBhcnJQZXJjZW50ID0gWydub25lJywgJzEnLCAnMScsICcxMDAnLCAnMycsICczJ107XG52YXIgYXJyVW5pdCA9IFsnbm9uZScsICcnLCAnJywgJyUnLCAncHgnLCAnJ107XG5cbnZhciB1cGxvYWRCdXR0b25TdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWctdXBsb2FkX19zdGFydCcpO1xudmFyIHVwbG9hZEJ1dHRvbkNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbWctdXBsb2FkX19jYW5jZWwnKTtcbnZhciBvdmVybGF5SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZy11cGxvYWRfX292ZXJsYXknKTtcbnZhciBpbnB1dEZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkLWZpbGUnKTtcblxudmFyIGltZ1ByZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nLXVwbG9hZF9fcHJldmlldycpO1xuXG52YXIgYmFyUGluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVwbG9hZC1lZmZlY3QtbGV2ZWwtcGluJyk7XG52YXIgYmFyRmlsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cGxvYWQtZWZmZWN0LWxldmVsLXZhbCcpO1xudmFyIGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZmZlY3QtbGV2ZWwnKTtcblxudmFyIGxpc3RFZmZlY3RJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVmZmVjdHNfX2l0ZW0nKTtcbnZhciBsaXN0RWZmZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwiZWZmZWN0XCJdJyk7XG5cbnZhciBsaXN0RGF0YUVmZmVjdCA9IFtdO1xudmFyIExFRlRfS0VZID0gMzc7XG52YXIgUklHSFRfS0VZID0gMzk7XG52YXIgU1RFUF9MRUZUID0gLTEwO1xudmFyIFNURVBfUklHSFQgPSAxMDtcblxudmFyIFVwbG9hZEVmZmVjdExldmVsID0gZnVuY3Rpb24gKGVmZmVjdEl0ZW0sIGVmZmVjdEluZGV4KSB7XG4gIHRoaXMuZWZmZWN0ID0gZWZmZWN0SXRlbTtcbiAgdGhpcy5lZmZlY3RJbmRleCA9IGVmZmVjdEluZGV4O1xuICB0aGlzLmJhclBpblBvc2l0aW9uID0gMDtcbiAgdGhpcy5iYXJGaWxsUG9zaXRpb24gPSBiYXJGaWxsLm9mZnNldFdpZHRoO1xuICB0aGlzLmVmZmVjdHNVbml0ID0gYXJyVW5pdFtlZmZlY3RJbmRleF07XG4gIHRoaXMuZWZmZWN0c01heFBlcmNlbnQgPSBhcnJQZXJjZW50W2VmZmVjdEluZGV4XTtcblxuICB0aGlzLmNoYW5nZUVmZmVjdExldmVsID0gZnVuY3Rpb24gKCkge1xuICAgIGJhckZpbGwuc3R5bGUud2lkdGggPSBgJHt0aGlzLmJhckZpbGxQb3NpdGlvbn1weGA7XG4gICAgYmFyUGluLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dGhpcy5iYXJQaW5Qb3NpdGlvbn1weClgO1xuXG4gICAgdmFyIHdpZHRoVHJhY2sgPSBvdmVybGF5SW1nLnF1ZXJ5U2VsZWN0b3IoJy5pbWctdXBsb2FkX19lZmZlY3QtbGV2ZWwnKS5vZmZzZXRXaWR0aDtcbiAgICB2YXIgc2F0dXJhdGVQZXJjZW50ID0gdGhpcy5lZmZlY3RzTWF4UGVyY2VudCAtICh0aGlzLmVmZmVjdHNNYXhQZXJjZW50ICogdGhpcy5iYXJQaW5Qb3NpdGlvbikgLyAod2lkdGhUcmFjayAtIGJhclBpbi5vZmZzZXRXaWR0aCAtIDIpO1xuXG4gICAgaW1nUHJldmlldy5zdHlsZS5maWx0ZXIgPSBgJHthcnJFZmZlY3RzW2VmZmVjdEluZGV4XX0oJHtzYXR1cmF0ZVBlcmNlbnR9JHt0aGlzLmVmZmVjdHNVbml0fSlgO1xuICB9O1xuXG4gIHRoaXMuY2hhbmdlQmFyUGluUG9zaXRpb24gPSBmdW5jdGlvbiAobnVtKSB7XG4gICAgdmFyIHdpZHRoVHJhY2sgPSBvdmVybGF5SW1nLnF1ZXJ5U2VsZWN0b3IoJy5pbWctdXBsb2FkX19lZmZlY3QtbGV2ZWwnKS5vZmZzZXRXaWR0aCAtIDI4O1xuXG4gICAgdmFyIHRtcCA9IHRoaXMuYmFyUGluUG9zaXRpb24gKyBudW07XG4gICAgaWYgKCh0bXAgPD0gd2lkdGhUcmFjaykgJiYgKHRtcCA+PSAwKSkge1xuICAgICAgdGhpcy5iYXJQaW5Qb3NpdGlvbiA9IHRtcDtcbiAgICAgIHRoaXMuYmFyRmlsbFBvc2l0aW9uICs9IG51bTtcbiAgICAgIGNvbnNvbGUubG9nKGBiYXJQaW5Qb3NpdGlvbiAke3RoaXMuYmFyUGluUG9zaXRpb259YCk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY2hhbmdlQmFyRmlsbFBvc2l0aW9uID0gZnVuY3Rpb24gKG51bSkge1xuICAgIHRoaXMuYmFyRmlsbFBvc2l0aW9uICs9IG51bTtcbiAgfTtcbn07XG5cbnZhciBjaGFuZ2VFZmZlY3RMZXZlbCA9IGZ1bmN0aW9uIChzdGVwID0gMCkge1xuICBpbWdQcmV2aWV3LnN0eWxlLmZpbHRlciA9ICdub25lJztcbiAgdmFyIGl0ZW1JbnN0cnVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImVmZmVjdFwiXTpjaGVja2VkJyk7XG4gIHZhciBpbmRleElucHV0ID0gKGFyclR5cGVzLmluZGV4T2YoaXRlbUluc3RydW1lbnQudmFsdWUpKTtcblxuICBpZiAoaW5kZXhJbnB1dCA+IDApIHtcbiAgICBsaXN0RGF0YUVmZmVjdFtpbmRleElucHV0XS5jaGFuZ2VCYXJQaW5Qb3NpdGlvbihzdGVwKTtcbiAgICBsaXN0RGF0YUVmZmVjdFtpbmRleElucHV0XS5jaGFuZ2VFZmZlY3RMZXZlbChpbmRleElucHV0KTtcbiAgfVxufTtcblxudmFyIGRvT3ZlcmxheUltZ09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIG92ZXJsYXlJbWcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0RWZmZWN0SXRlbS5sZW5ndGg7IGkrKykge1xuICAgIGxpc3REYXRhRWZmZWN0W2ldID0gbmV3IFVwbG9hZEVmZmVjdExldmVsKGxpc3RFZmZlY3RJdGVtW2ldLCBpKTtcblxuICAgIGxpc3RFZmZlY3RJdGVtW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY2hhbmdlRWZmZWN0TGV2ZWwoKTtcbiAgICB9KTtcbiAgfVxufTtcblxuYmFyUGluLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZ0KSA9PiB7XG4gIGlmIChldnQua2V5Q29kZSA9PT0gTEVGVF9LRVkpIHtcbiAgICBjaGFuZ2VFZmZlY3RMZXZlbChTVEVQX0xFRlQpO1xuICB9XG5cbiAgaWYgKGV2dC5rZXlDb2RlID09PSBSSUdIVF9LRVkpIHtcbiAgICBjaGFuZ2VFZmZlY3RMZXZlbChTVEVQX1JJR0hUKTtcbiAgfVxufSk7XG5cbnZhciBkb092ZXJsYXlJbWdDbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgb3ZlcmxheUltZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgaW5wdXRGaWxlLnZhbHVlID0gJyc7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0RWZmZWN0SXRlbS5sZW5ndGg7IGkrKykge1xuICAgIGxpc3REYXRhRWZmZWN0W2ldID0gbnVsbDtcbiAgfVxufTtcblxuLy8g0LLRgNC10LzQtdC90L3QviDQvtGC0LrRgNGL0YLQuNC1INGH0YLQvtCxINC90LUg0L3QsNC20LjQvNCw0YLRjFxuLy8gZG9PdmVybGF5SW1nT3BlbigpO1xuXG4vLyDQvtGC0LrRgNGL0YLQuNC1INC10YHQu9C4INC40LfQvNC10L3QtdC9INGE0LDQudC7XG51cGxvYWRCdXR0b25TdGFydC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gIGRvT3ZlcmxheUltZ09wZW4oKTtcbn0pO1xuXG4vLyDQt9Cw0LrRgNGL0YLQuNC1XG51cGxvYWRCdXR0b25DYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGRvT3ZlcmxheUltZ0Nsb3NlKCk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxpQkFBaUIsR0FBRyxDQUFDO0FBQ3pCLElBQUlDLGVBQWUsR0FBRyxHQUFHO0FBQ3pCLElBQUlDLGVBQWUsR0FBRyxFQUFFO0FBRXhCLElBQUlDLFFBQVEsR0FBRyxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsRUFDL0QsNkdBQTZHLEVBQzdHLDJGQUEyRixFQUMzRix3R0FBd0csRUFDeEcsMEdBQTBHLENBQUM7QUFFN0csSUFBSUMsWUFBWSxHQUFHLENBQUMsc0JBQXNCLEVBQUUsNkJBQTZCLEVBQ3ZFLHlCQUF5QixFQUFFLGFBQWEsRUFDeEMsZ0hBQWdILEVBQUUsZ0JBQWdCLENBQUM7QUFFckksSUFBSUMsUUFBUSxHQUFHQyxRQUFRLENBQUNDLHNCQUFzQixFQUFFO0FBRWhELElBQUlDLGNBQWMsR0FBRyxTQUFqQkEsY0FBY0EsQ0FBYUMsS0FBSyxFQUFFO0VBQ3BDLElBQUksQ0FBQ0MsR0FBRyxhQUFBQyxNQUFBLENBQWFGLEtBQUssR0FBRyxDQUFDLFNBQU07RUFDcEMsSUFBSSxDQUFDRyxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFH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