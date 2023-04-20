// ------------ bigPictures open/close

(function () {
  var bigPictures = document.querySelector('.big-picture');

  // рендер коментария
  var renderComment = function (bigPicture, index, bigPictureTemplate) {
    var pictureElement = bigPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.social__picture').src = bigPicture.comments[index].avatar;
    pictureElement.querySelector('.social__text').textContent = `${index + 1} ${bigPicture.comments[index].message}`;

    return pictureElement;
  };

  // рендер коментарии к big-picture
  var renderBigPictureComments = function (bigPicture) {
    var doCommentLoaderHide = function (boll) {
      if (boll) {
        document.querySelector('.social__comment-count').classList.add('visually-hidden');
        document.querySelector('.social__comments-loader').classList.add('visually-hidden');
      } else {
        document.querySelector('.social__comment-count').classList.remove('visually-hidden');
        document.querySelector('.social__comments-loader').classList.remove('visually-hidden');
      }
    }

    var bigPictureCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
    var commentsLoaderButton = bigPictures.querySelector('.comments-loader');
    var fragment = document.createDocumentFragment();
    var maxCountComment = 5;
    var countCommentIsFive = Math.ceil((bigPicture.comments.length / maxCountComment));
    console.log("countCommentIsFive - " + countCommentIsFive)
    var startCountCommentsIsFive = 1;
    var i = 0;

    while ((i < bigPicture.comments.length) && (i < maxCountComment)) {
      fragment.appendChild(renderComment(bigPicture, i, bigPictureCommentTemplate));
      document.querySelector('.social__comments').appendChild(fragment);
      i++;
    }

    if (bigPicture.comments.length <= maxCountComment) doCommentLoaderHide(true); else doCommentLoaderHide(false);

    bigPictures.querySelector('.comments-count').textContent = bigPicture.comments.length;
    bigPictures.querySelector('.comments-count--shown').textContent = `${maxCountComment}`;

    commentsLoaderButton.addEventListener('click', function () {
      var nextCommentIsFive = startCountCommentsIsFive + 1;
      var j = startCountCommentsIsFive * maxCountComment;

      while ((j < bigPicture.comments.length) && (j < nextCommentIsFive * maxCountComment)) {
        fragment.appendChild(renderComment(bigPicture, j, bigPictureCommentTemplate));
        document.querySelector('.social__comments').appendChild(fragment);
        j++;
      }
      startCountCommentsIsFive++;
      bigPictures.querySelector('.comments-count--shown').textContent = `${nextCommentIsFive * maxCountComment}`;

      // console.log(`${startCountCommentsIsFive * maxCountComment}`)
      // console.log(`${countCommentIsFive * maxCountComment}`)

      if ((startCountCommentsIsFive * maxCountComment) === (countCommentIsFive * maxCountComment)) doCommentLoaderHide(true)
    });
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

      bigPictures.querySelector('.likes-count').textContent = itemPictures.likes;
      bigPictures.querySelector('.social__caption').textContent = itemPictures.description;
      removeLastBigPictureComments();
      renderBigPictureComments(itemPictures);
    }
  };
}());
