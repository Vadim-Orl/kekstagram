


// (function () {
var URL = 'http://localhost:3001/server';

//   window.upload = function (data, onSuccess) {
//     var xhr = new XMLHttpRequest();
//     console.log(xhr.readyState)

//     xhr.addEventListener('load', function () {
//       onSuccess(xhr.response);
//     })

//     xhr.open('POST', URL);
//     xhr.send(data);
//   }

// }());

var xhr = new XMLHttpRequest();
xhr.addEventListener('load', (evt) => {
  console.log(JSON.parse(xhr.responseText));
})

xhr.open('GET', URL, true);
xhr.send();

console.log('data')
