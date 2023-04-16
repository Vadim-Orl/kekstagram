// ------------ bigPictures open/close

(function () {
  var bigPictures = document.querySelector('.big-picture');

  // рендер коментария
  var renderComment = function (bigPicture, index, bigPictureTemplate) {
    var pictureElement = bigPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.social__picture').src = bigPicture.comments[index].avatar;
    pictureElement.querySelector('.social__text').textContent = bigPicture.comments[index].message;

    return pictureElement;
  };

  // рендер коментарии к big-picture
  var renderBigPictureComments = function (bigPicture) {
    var bigPictureCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < bigPicture.comments.length; i++) {
      fragment.appendChild(renderComment(bigPicture, i, bigPictureCommentTemplate));
      document.querySelector('.social__comments').appendChild(fragment);
    }
  };

  // Удаления старых коментариев
  var removeLastBigPictureComments = function () {
    var listLastComents = document.querySelector('.social__comments').querySelectorAll('.social__comment');
    for (var i = 0; i < listLastComents.length; i++) {
      document.querySelector('.social__comments').removeChild(listLastComents[i])
    }
  }

  window.newBigPicture = function (itemPictures) {
    if (itemPictures !== undefined) {
      bigPictures.querySelector('.big-picture__img').querySelector('img').src = itemPictures.url;
      bigPictures.querySelector('.likes-count').textContent = itemPictures.likes;
      bigPictures.querySelector('.comments-count').textContent = itemPictures.comments.length;
      bigPictures.querySelector('.likes-count').textContent = itemPictures.likes;
      bigPictures.querySelector('.social__caption').textContent = itemPictures.description;
      removeLastBigPictureComments();
      renderBigPictureComments(itemPictures);
    }
  };
}());
