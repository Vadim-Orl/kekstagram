const MAX_CHAR_HASHTAG_AMOUNT = 20;
const MAX_HASHTAG_AMOUNT = 2;

const HASHTAG_VALID_FERST_CHAR = /^#/;

// поставить константу в нижнюю форму
const HASHTAG_VALID_OTHER_CHAR = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

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

formUpload.onsubmit = function () {
  return false
}
hashtagsInput.addEventListener('input', onHashtagInputValid)
hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());
