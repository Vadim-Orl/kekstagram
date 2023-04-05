// хэш-теги необязательны;
// один и тот же хэш-тег не может быть использован дважды;
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить
// к закрытию формы редактирования изображения.

const HASHTAG_VALID_FERST_CHAR = /^#/;
const HASHTAG_VALID_OTHER_CHAR = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
// const HASHTAG_VALID_MAX_CHAR = /{1,19}$/;

const MAX_CHAR_HASHTAG_AMOUNT = 20;
const MAX_HASHTAG_AMOUNT = 2;

var formUpload = document.querySelector('.img-upload__form');
var hashtagsInput = formUpload.querySelector('.text__hashtags');

var onHashtagInputValid = function (evt) {
  evt.stopPropagation();

  var arrHastags = hashtagsInput.value.toLowerCase().split(' ').filter((tag) => tag !== '');
  var uniqueHashTagArray = new Set(arrHastags);

  if (arrHastags.length > MAX_HASHTAG_AMOUNT) {
    hashtagsInput.setCustomValidity(`Хэш-тегов не должно быть больше чем ${MAX_HASHTAG_AMOUNT}`);
  } else {
    hashtagsInput.setCustomValidity('');
  }

  arrHastags.forEach((hashtag) => {
    if (!HASHTAG_VALID_FERST_CHAR.test(hashtag)) {
      hashtagsInput.setCustomValidity(
        'Хэш-тег должен начинается с символа # (решётка)',
      );
    } else if (hashtag.length > 19) {
      hashtagsInput.setCustomValidity(
        `Максимальное количество символов ${MAX_CHAR_HASHTAG_AMOUNT}`,
      )
    } else if (!HASHTAG_VALID_OTHER_CHAR.test(hashtag)) {
      hashtagsInput.setCustomValidity(
        `Хэш-тег должен состоять из букв и чисел и не может содержать пробелы,
        спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`,
      )
    } else if (arrHastags.length !== uniqueHashTagArray.size) {
      hashtagsInput.setCustomValidity('Хэш-теги не должны повторяться');
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });

  if (hashtagsInput.validity.customError) {
    hashtagsInput.style.outlineColor = 'red';
  } else {
    hashtagsInput.style.outlineColor = '';
  }

  hashtagsInput.reportValidity();
}



// test close

var overlayImg = document.querySelector('.img-upload__overlay');

var onOutsideOnLoadClick = function (evt) {
  console.log('close')
  var { target } = evt;
  if (target.querySelector('.img-upload__wrapper')) {
    overlayImg.classList.add('hidden');
    console.log('close wrapper')
  }
}

var onOnLoadEscPress = function (evt) {
  if (window.utils.isEscKeycode(evt)) {
    overlayImg.classList.add('hidden');
    console.log('close wrapper')
  }
}


overlayImg.addEventListener('click', onOutsideOnLoadClick)
document.addEventListener('keydown', onOnLoadEscPress)
formUpload.onsubmit = function () {
  return false
}
hashtagsInput.addEventListener('input', onHashtagInputValid)
hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());
