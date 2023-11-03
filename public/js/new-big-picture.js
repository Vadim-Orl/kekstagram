"use strict";

// ------------ bigPictures open/close

(function () {
  var bigPictures = document.querySelector('.big-picture');

  // рендер коментария
  var renderComment = function renderComment(bigPicture, index, bigPictureTemplate) {
    var pictureElement = bigPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.social__picture').src = bigPicture.comments[index].avatar;
    pictureElement.querySelector('.social__text').textContent = "".concat(index + 1, " ").concat(bigPicture.comments[index].message);
    return pictureElement;
  };

  // рендер коментарии к big-picture
  var renderBigPictureComments = function renderBigPictureComments(bigPicture) {
    var doCommentLoaderHide = function doCommentLoaderHide(boll) {
      if (boll) {
        document.querySelector('.social__comment-count').classList.add('visually-hidden');
        document.querySelector('.social__comments-loader').classList.add('visually-hidden');
      } else {
        document.querySelector('.social__comment-count').classList.remove('visually-hidden');
        document.querySelector('.social__comments-loader').classList.remove('visually-hidden');
      }
    };
    var bigPictureCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
    var commentsLoaderButton = bigPictures.querySelector('.comments-loader');
    var fragment = document.createDocumentFragment();
    var maxCountComment = 5;
    var countCommentIsFive = Math.ceil(bigPicture.comments.length / maxCountComment);
    console.log('countCommentIsFive - ' + countCommentIsFive);
    var startCountCommentsIsFive = 1;
    var i = 0;
    while (i < bigPicture.comments.length && i < maxCountComment) {
      fragment.appendChild(renderComment(bigPicture, i, bigPictureCommentTemplate));
      document.querySelector('.social__comments').appendChild(fragment);
      i++;
    }
    if (bigPicture.comments.length <= maxCountComment) doCommentLoaderHide(true);else doCommentLoaderHide(false);
    bigPictures.querySelector('.comments-count').textContent = bigPicture.comments.length;
    bigPictures.querySelector('.comments-count--shown').textContent = "".concat(maxCountComment);
    commentsLoaderButton.addEventListener('click', function () {
      var nextCommentIsFive = startCountCommentsIsFive + 1;
      var j = startCountCommentsIsFive * maxCountComment;
      while (j < bigPicture.comments.length && j < nextCommentIsFive * maxCountComment) {
        fragment.appendChild(renderComment(bigPicture, j, bigPictureCommentTemplate));
        document.querySelector('.social__comments').appendChild(fragment);
        j++;
      }
      startCountCommentsIsFive++;
      bigPictures.querySelector('.comments-count--shown').textContent = "".concat(nextCommentIsFive * maxCountComment);

      // console.log(`${startCountCommentsIsFive * maxCountComment}`)
      // console.log(`${countCommentIsFive * maxCountComment}`)

      if (startCountCommentsIsFive * maxCountComment === countCommentIsFive * maxCountComment) doCommentLoaderHide(true);
    });
  };

  // Удаления старых коментариев
  var removeLastBigPictureComments = function removeLastBigPictureComments() {
    var listLastComents = document.querySelector('.social__comments').querySelectorAll('.social__comment');
    for (var i = 0; i < listLastComents.length; i++) {
      document.querySelector('.social__comments').removeChild(listLastComents[i]);
    }
  };
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
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWJpZy1waWN0dXJlLmpzIiwibmFtZXMiOlsiYmlnUGljdHVyZXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJyZW5kZXJDb21tZW50IiwiYmlnUGljdHVyZSIsImluZGV4IiwiYmlnUGljdHVyZVRlbXBsYXRlIiwicGljdHVyZUVsZW1lbnQiLCJjbG9uZU5vZGUiLCJzcmMiLCJjb21tZW50cyIsImF2YXRhciIsInRleHRDb250ZW50IiwiY29uY2F0IiwibWVzc2FnZSIsInJlbmRlckJpZ1BpY3R1cmVDb21tZW50cyIsImRvQ29tbWVudExvYWRlckhpZGUiLCJib2xsIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiYmlnUGljdHVyZUNvbW1lbnRUZW1wbGF0ZSIsImNvbnRlbnQiLCJjb21tZW50c0xvYWRlckJ1dHRvbiIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIm1heENvdW50Q29tbWVudCIsImNvdW50Q29tbWVudElzRml2ZSIsIk1hdGgiLCJjZWlsIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsInN0YXJ0Q291bnRDb21tZW50c0lzRml2ZSIsImkiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJuZXh0Q29tbWVudElzRml2ZSIsImoiLCJyZW1vdmVMYXN0QmlnUGljdHVyZUNvbW1lbnRzIiwibGlzdExhc3RDb21lbnRzIiwicXVlcnlTZWxlY3RvckFsbCIsInJlbW92ZUNoaWxkIiwid2luZG93IiwibmV3QmlnUGljdHVyZSIsIml0ZW1QaWN0dXJlcyIsInVuZGVmaW5lZCIsInVybCIsImxpa2VzIiwiZGVzY3JpcHRpb24iXSwic291cmNlcyI6WyJuZXctYmlnLXBpY3R1cmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tIGJpZ1BpY3R1cmVzIG9wZW4vY2xvc2VcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGJpZ1BpY3R1cmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJpZy1waWN0dXJlJyk7XG5cbiAgLy8g0YDQtdC90LTQtdGAINC60L7QvNC10L3RgtCw0YDQuNGPXG4gIHZhciByZW5kZXJDb21tZW50ID0gZnVuY3Rpb24gKGJpZ1BpY3R1cmUsIGluZGV4LCBiaWdQaWN0dXJlVGVtcGxhdGUpIHtcbiAgICB2YXIgcGljdHVyZUVsZW1lbnQgPSBiaWdQaWN0dXJlVGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuICAgIHBpY3R1cmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWxfX3BpY3R1cmUnKS5zcmMgPSBiaWdQaWN0dXJlLmNvbW1lbnRzW2luZGV4XS5hdmF0YXI7XG4gICAgcGljdHVyZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fdGV4dCcpLnRleHRDb250ZW50ID0gYCR7aW5kZXggKyAxfSAke2JpZ1BpY3R1cmUuY29tbWVudHNbaW5kZXhdLm1lc3NhZ2V9YDtcblxuICAgIHJldHVybiBwaWN0dXJlRWxlbWVudDtcbiAgfTtcblxuICAvLyDRgNC10L3QtNC10YAg0LrQvtC80LXQvdGC0LDRgNC40Lgg0LogYmlnLXBpY3R1cmVcbiAgdmFyIHJlbmRlckJpZ1BpY3R1cmVDb21tZW50cyA9IGZ1bmN0aW9uIChiaWdQaWN0dXJlKSB7XG4gICAgdmFyIGRvQ29tbWVudExvYWRlckhpZGUgPSBmdW5jdGlvbiAoYm9sbCkge1xuICAgICAgaWYgKGJvbGwpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fY29tbWVudC1jb3VudCcpLmNsYXNzTGlzdC5hZGQoJ3Zpc3VhbGx5LWhpZGRlbicpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50cy1sb2FkZXInKS5jbGFzc0xpc3QuYWRkKCd2aXN1YWxseS1oaWRkZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWxfX2NvbW1lbnQtY291bnQnKS5jbGFzc0xpc3QucmVtb3ZlKCd2aXN1YWxseS1oaWRkZW4nKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fY29tbWVudHMtbG9hZGVyJykuY2xhc3NMaXN0LnJlbW92ZSgndmlzdWFsbHktaGlkZGVuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGJpZ1BpY3R1cmVDb21tZW50VGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc29jaWFsX19jb21tZW50JykuY29udGVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50Jyk7XG4gICAgdmFyIGNvbW1lbnRzTG9hZGVyQnV0dG9uID0gYmlnUGljdHVyZXMucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWxvYWRlcicpO1xuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB2YXIgbWF4Q291bnRDb21tZW50ID0gNTtcbiAgICB2YXIgY291bnRDb21tZW50SXNGaXZlID0gTWF0aC5jZWlsKChiaWdQaWN0dXJlLmNvbW1lbnRzLmxlbmd0aCAvIG1heENvdW50Q29tbWVudCkpO1xuICAgIGNvbnNvbGUubG9nKCdjb3VudENvbW1lbnRJc0ZpdmUgLSAnICsgY291bnRDb21tZW50SXNGaXZlKVxuICAgIHZhciBzdGFydENvdW50Q29tbWVudHNJc0ZpdmUgPSAxO1xuICAgIHZhciBpID0gMDtcblxuICAgIHdoaWxlICgoaSA8IGJpZ1BpY3R1cmUuY29tbWVudHMubGVuZ3RoKSAmJiAoaSA8IG1heENvdW50Q29tbWVudCkpIHtcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJlbmRlckNvbW1lbnQoYmlnUGljdHVyZSwgaSwgYmlnUGljdHVyZUNvbW1lbnRUZW1wbGF0ZSkpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fY29tbWVudHMnKS5hcHBlbmRDaGlsZChmcmFnbWVudCk7XG4gICAgICBpKys7XG4gICAgfVxuXG4gICAgaWYgKGJpZ1BpY3R1cmUuY29tbWVudHMubGVuZ3RoIDw9IG1heENvdW50Q29tbWVudCkgZG9Db21tZW50TG9hZGVySGlkZSh0cnVlKTsgZWxzZSBkb0NvbW1lbnRMb2FkZXJIaWRlKGZhbHNlKTtcblxuICAgIGJpZ1BpY3R1cmVzLnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb3VudCcpLnRleHRDb250ZW50ID0gYmlnUGljdHVyZS5jb21tZW50cy5sZW5ndGg7XG4gICAgYmlnUGljdHVyZXMucXVlcnlTZWxlY3RvcignLmNvbW1lbnRzLWNvdW50LS1zaG93bicpLnRleHRDb250ZW50ID0gYCR7bWF4Q291bnRDb21tZW50fWA7XG5cbiAgICBjb21tZW50c0xvYWRlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBuZXh0Q29tbWVudElzRml2ZSA9IHN0YXJ0Q291bnRDb21tZW50c0lzRml2ZSArIDE7XG4gICAgICB2YXIgaiA9IHN0YXJ0Q291bnRDb21tZW50c0lzRml2ZSAqIG1heENvdW50Q29tbWVudDtcblxuICAgICAgd2hpbGUgKChqIDwgYmlnUGljdHVyZS5jb21tZW50cy5sZW5ndGgpICYmIChqIDwgbmV4dENvbW1lbnRJc0ZpdmUgKiBtYXhDb3VudENvbW1lbnQpKSB7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJlbmRlckNvbW1lbnQoYmlnUGljdHVyZSwgaiwgYmlnUGljdHVyZUNvbW1lbnRUZW1wbGF0ZSkpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29jaWFsX19jb21tZW50cycpLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgICAgc3RhcnRDb3VudENvbW1lbnRzSXNGaXZlKys7XG4gICAgICBiaWdQaWN0dXJlcy5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY291bnQtLXNob3duJykudGV4dENvbnRlbnQgPSBgJHtuZXh0Q29tbWVudElzRml2ZSAqIG1heENvdW50Q29tbWVudH1gO1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhgJHtzdGFydENvdW50Q29tbWVudHNJc0ZpdmUgKiBtYXhDb3VudENvbW1lbnR9YClcbiAgICAgIC8vIGNvbnNvbGUubG9nKGAke2NvdW50Q29tbWVudElzRml2ZSAqIG1heENvdW50Q29tbWVudH1gKVxuXG4gICAgICBpZiAoKHN0YXJ0Q291bnRDb21tZW50c0lzRml2ZSAqIG1heENvdW50Q29tbWVudCkgPT09IChjb3VudENvbW1lbnRJc0ZpdmUgKiBtYXhDb3VudENvbW1lbnQpKSBkb0NvbW1lbnRMb2FkZXJIaWRlKHRydWUpXG4gICAgfSk7XG4gIH07XG5cbiAgLy8g0KPQtNCw0LvQtdC90LjRjyDRgdGC0LDRgNGL0YUg0LrQvtC80LXQvdGC0LDRgNC40LXQslxuICB2YXIgcmVtb3ZlTGFzdEJpZ1BpY3R1cmVDb21tZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGlzdExhc3RDb21lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fY29tbWVudHMnKS5xdWVyeVNlbGVjdG9yQWxsKCcuc29jaWFsX19jb21tZW50Jyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0TGFzdENvbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb2NpYWxfX2NvbW1lbnRzJykucmVtb3ZlQ2hpbGQobGlzdExhc3RDb21lbnRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5uZXdCaWdQaWN0dXJlID0gZnVuY3Rpb24gKGl0ZW1QaWN0dXJlcykge1xuICAgIGlmIChpdGVtUGljdHVyZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYmlnUGljdHVyZXMucXVlcnlTZWxlY3RvcignLmJpZy1waWN0dXJlX19pbWcnKS5xdWVyeVNlbGVjdG9yKCdpbWcnKS5zcmMgPSBpdGVtUGljdHVyZXMudXJsO1xuICAgICAgYmlnUGljdHVyZXMucXVlcnlTZWxlY3RvcignLmxpa2VzLWNvdW50JykudGV4dENvbnRlbnQgPSBpdGVtUGljdHVyZXMubGlrZXM7XG5cbiAgICAgIGJpZ1BpY3R1cmVzLnF1ZXJ5U2VsZWN0b3IoJy5saWtlcy1jb3VudCcpLnRleHRDb250ZW50ID0gaXRlbVBpY3R1cmVzLmxpa2VzO1xuICAgICAgYmlnUGljdHVyZXMucXVlcnlTZWxlY3RvcignLnNvY2lhbF9fY2FwdGlvbicpLnRleHRDb250ZW50ID0gaXRlbVBpY3R1cmVzLmRlc2NyaXB0aW9uO1xuICAgICAgcmVtb3ZlTGFzdEJpZ1BpY3R1cmVDb21tZW50cygpO1xuICAgICAgcmVuZGVyQmlnUGljdHVyZUNvbW1lbnRzKGl0ZW1QaWN0dXJlcyk7XG4gICAgfVxuICB9O1xufSgpKTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQyxhQUFZO0VBQ1gsSUFBSUEsV0FBVyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7O0VBRXhEO0VBQ0EsSUFBSUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFhQSxDQUFhQyxVQUFVLEVBQUVDLEtBQUssRUFBRUMsa0JBQWtCLEVBQUU7SUFDbkUsSUFBSUMsY0FBYyxHQUFHRCxrQkFBa0IsQ0FBQ0UsU0FBUyxDQUFDLElBQUksQ0FBQztJQUN2REQsY0FBYyxDQUFDTCxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQ08sR0FBRyxHQUFHTCxVQUFVLENBQUNNLFFBQVEsQ0FBQ0wsS0FBSyxDQUFDLENBQUNNLE1BQU07SUFDeEZKLGNBQWMsQ0FBQ0wsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDVSxXQUFXLE1BQUFDLE1BQUEsQ0FBTVIsS0FBSyxHQUFHLENBQUMsT0FBQVEsTUFBQSxDQUFJVCxVQUFVLENBQUNNLFFBQVEsQ0FBQ0wsS0FBSyxDQUFDLENBQUNTLE9BQU8sQ0FBRTtJQUVoSCxPQUFPUCxjQUFjO0VBQ3ZCLENBQUM7O0VBRUQ7RUFDQSxJQUFJUSx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQXdCQSxDQUFhWCxVQUFVLEVBQUU7SUFDbkQsSUFBSVksbUJB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