"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var uploadBlock = document.querySelector('.img-upload__overlay');
var uploadEffect = {
  bar: document.querySelector('.img-upload__effect-level'),
  barPin: document.querySelector('.upload-effect-level-pin'),
  barFill: document.querySelector('.upload-effect-level-val'),
  barTrack: uploadBlock.querySelector('.img-upload__effect-level')
};
(function () {
  var STEP_LEFT = -10;
  var STEP_RIGHT = 10;
  window.BarSlider = /*#__PURE__*/function () {
    function _class(sliderData, index, collback) {
      _classCallCheck(this, _class);
      this.bar = sliderData.bar;
      this.barPin = sliderData.barPin;
      this.barFill = sliderData.barFill;
      this.barTrack = sliderData.barTrack;
      this.index = index;
      this.collback = collback;
      this.active = false;
      this.barPinPosition = Number(this.barPin.style.translate.slice(0, -2));
      this.barFillPosition = this.barPinPosition;
      this.barFill.style.width = "".concat(this.barFillPosition, "px");
      this.barPinPersent = 0;
      this.setParameters = this.setParameters.bind(this);
      this.setEvents = this.setEvents.bind(this);
      this.setStylePosition = this.setStylePosition.bind(this);
      this.setParameters();
      this.setEvents();
      this.setStylePosition();
    }
    _createClass(_class, [{
      key: "setParameters",
      value: function setParameters() {
        var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var barPinStyleLeft = window.getComputedStyle(this.barPin).left.slice(0, -2);
        var widthTrack = this.barTrack.offsetWidth - this.barPin.offsetWidth - barPinStyleLeft * 2;
        var tmp = this.barPinPosition + num;
        // console.log(tmp)

        if (tmp >= 0 && tmp <= widthTrack) {
          this.barPinPosition = tmp;
          this.barFillPosition = tmp;
          this.barPinPersent = Math.floor(tmp * 100 / widthTrack) / 100;
          this.setStylePosition();
          this.collback(this.index, this.barPinPersent);
        }
        // console.log(`${this.barPinPersent}`)
      }
    }, {
      key: "setStylePosition",
      value: function setStylePosition() {
        // console.log(collback)
        this.barFill.style.width = "".concat(this.barFillPosition, "px");
        this.barPin.style.transform = "translateX(".concat(this.barPinPosition, "px)");
      }
    }, {
      key: "setEvents",
      value: function setEvents() {
        var _this = this;
        this.barPin.addEventListener('mousedown', function (evt) {
          if (!_this.active) return;
          evt.preventDefault();
          var startCoordsX = evt.clientX;
          var onMouseMove = function onMouseMove(moveEvt) {
            moveEvt.preventDefault();
            var shift = moveEvt.clientX - startCoordsX;
            startCoordsX = moveEvt.clientX;
            _this.setParameters(shift);
          };
          var onMouseUp = function onMouseUp(upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
        this.barPin.addEventListener('keydown', function (evt) {
          if (window.utils.isLeftKeycode(evt)) {
            _this.setParameters(STEP_LEFT);
          }
          if (window.utils.isRightKeycode(evt)) {
            _this.setParameters(STEP_RIGHT);
          }
        });
      }
    }]);
    return _class;
  }();
  function debounce(func) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var timer;
    return function (evt) {
      console.log('yes');
      clearTimeout(timer);
      timer = setTimeout(func, time, evt);
    };
  }
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLXNsaWRlci5qcyIsIm5hbWVzIjpbInVwbG9hZEJsb2NrIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidXBsb2FkRWZmZWN0IiwiYmFyIiwiYmFyUGluIiwiYmFyRmlsbCIsImJhclRyYWNrIiwiU1RFUF9MRUZUIiwiU1RFUF9SSUdIVCIsIndpbmRvdyIsIkJhclNsaWRlciIsIl9jbGFzcyIsInNsaWRlckRhdGEiLCJpbmRleCIsImNvbGxiYWNrIiwiX2NsYXNzQ2FsbENoZWNrIiwiYWN0aXZlIiwiYmFyUGluUG9zaXRpb24iLCJOdW1iZXIiLCJzdHlsZSIsInRyYW5zbGF0ZSIsInNsaWNlIiwiYmFyRmlsbFBvc2l0aW9uIiwid2lkdGgiLCJjb25jYXQiLCJiYXJQaW5QZXJzZW50Iiwic2V0UGFyYW1ldGVycyIsImJpbmQiLCJzZXRFdmVudHMiLCJzZXRTdHlsZVBvc2l0aW9uIiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJudW0iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJiYXJQaW5TdHlsZUxlZnQiLCJnZXRDb21wdXRlZFN0eWxlIiwibGVmdCIsIndpZHRoVHJhY2siLCJvZmZzZXRXaWR0aCIsInRtcCIsIk1hdGgiLCJmbG9vciIsInRyYW5zZm9ybSIsIl90aGlzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsInByZXZlbnREZWZhdWx0Iiwic3RhcnRDb29yZHNYIiwiY2xpZW50WCIsIm9uTW91c2VNb3ZlIiwibW92ZUV2dCIsInNoaWZ0Iiwib25Nb3VzZVVwIiwidXBFdnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidXRpbHMiLCJpc0xlZnRLZXljb2RlIiwiaXNSaWdodEtleWNvZGUiLCJkZWJvdW5jZSIsImZ1bmMiLCJ0aW1lIiwidGltZXIiLCJjb25zb2xlIiwibG9nIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCJdLCJzb3VyY2VzIjpbImJhci1zbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHVwbG9hZEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmltZy11cGxvYWRfX292ZXJsYXknKTtcblxudmFyIHVwbG9hZEVmZmVjdCA9IHtcbiAgYmFyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1nLXVwbG9hZF9fZWZmZWN0LWxldmVsJyksXG4gIGJhclBpbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVwbG9hZC1lZmZlY3QtbGV2ZWwtcGluJyksXG4gIGJhckZpbGw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cGxvYWQtZWZmZWN0LWxldmVsLXZhbCcpLFxuICBiYXJUcmFjazogdXBsb2FkQmxvY2sucXVlcnlTZWxlY3RvcignLmltZy11cGxvYWRfX2VmZmVjdC1sZXZlbCcpLFxufTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIFNURVBfTEVGVCA9IC0xMDtcbiAgdmFyIFNURVBfUklHSFQgPSAxMDtcblxuICB3aW5kb3cuQmFyU2xpZGVyID0gY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlckRhdGEsIGluZGV4LCBjb2xsYmFjaykge1xuICAgICAgdGhpcy5iYXIgPSBzbGlkZXJEYXRhLmJhcjtcbiAgICAgIHRoaXMuYmFyUGluID0gc2xpZGVyRGF0YS5iYXJQaW47XG4gICAgICB0aGlzLmJhckZpbGwgPSBzbGlkZXJEYXRhLmJhckZpbGw7XG4gICAgICB0aGlzLmJhclRyYWNrID0gc2xpZGVyRGF0YS5iYXJUcmFjaztcbiAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgIHRoaXMuY29sbGJhY2sgPSBjb2xsYmFjaztcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMuYmFyUGluUG9zaXRpb24gPSBOdW1iZXIodGhpcy5iYXJQaW4uc3R5bGUudHJhbnNsYXRlLnNsaWNlKDAsIC0yKSk7XG4gICAgICB0aGlzLmJhckZpbGxQb3NpdGlvbiA9IHRoaXMuYmFyUGluUG9zaXRpb247XG4gICAgICB0aGlzLmJhckZpbGwuc3R5bGUud2lkdGggPSBgJHt0aGlzLmJhckZpbGxQb3NpdGlvbn1weGA7XG4gICAgICB0aGlzLmJhclBpblBlcnNlbnQgPSAwO1xuXG4gICAgICB0aGlzLnNldFBhcmFtZXRlcnMgPSB0aGlzLnNldFBhcmFtZXRlcnMuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc2V0RXZlbnRzID0gdGhpcy5zZXRFdmVudHMuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuc2V0U3R5bGVQb3NpdGlvbiA9IHRoaXMuc2V0U3R5bGVQb3NpdGlvbi5iaW5kKHRoaXMpO1xuXG4gICAgICB0aGlzLnNldFBhcmFtZXRlcnMoKTtcbiAgICAgIHRoaXMuc2V0RXZlbnRzKCk7XG4gICAgICB0aGlzLnNldFN0eWxlUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBzZXRQYXJhbWV0ZXJzKG51bSA9IDApIHtcbiAgICAgIHZhciBiYXJQaW5TdHlsZUxlZnQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmJhclBpbikubGVmdC5zbGljZSgwLCAtMilcbiAgICAgIHZhciB3aWR0aFRyYWNrID0gKHRoaXMuYmFyVHJhY2sub2Zmc2V0V2lkdGggLSB0aGlzLmJhclBpbi5vZmZzZXRXaWR0aCAtIChiYXJQaW5TdHlsZUxlZnQgKiAyKSk7XG4gICAgICB2YXIgdG1wID0gdGhpcy5iYXJQaW5Qb3NpdGlvbiArIG51bTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRtcClcblxuICAgICAgaWYgKCh0bXAgPj0gMCkgJiYgKHRtcCA8PSB3aWR0aFRyYWNrKSkge1xuICAgICAgICB0aGlzLmJhclBpblBvc2l0aW9uID0gdG1wO1xuICAgICAgICB0aGlzLmJhckZpbGxQb3NpdGlvbiA9IHRtcDtcbiAgICAgICAgdGhpcy5iYXJQaW5QZXJzZW50ID0gTWF0aC5mbG9vcigodG1wICogMTAwKSAvIHdpZHRoVHJhY2spIC8gMTAwO1xuICAgICAgICB0aGlzLnNldFN0eWxlUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5jb2xsYmFjayh0aGlzLmluZGV4LCB0aGlzLmJhclBpblBlcnNlbnQpO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5iYXJQaW5QZXJzZW50fWApXG4gICAgfVxuXG4gICAgc2V0U3R5bGVQb3NpdGlvbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhjb2xsYmFjaylcbiAgICAgIHRoaXMuYmFyRmlsbC5zdHlsZS53aWR0aCA9IGAke3RoaXMuYmFyRmlsbFBvc2l0aW9ufXB4YDtcbiAgICAgIHRoaXMuYmFyUGluLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7dGhpcy5iYXJQaW5Qb3NpdGlvbn1weClgO1xuICAgIH1cblxuICAgIHNldEV2ZW50cygpIHtcbiAgICAgIHRoaXMuYmFyUGluLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChldnQpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkgcmV0dXJuO1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgc3RhcnRDb29yZHNYID0gZXZ0LmNsaWVudFg7XG5cbiAgICAgICAgdmFyIG9uTW91c2VNb3ZlID0gKG1vdmVFdnQpID0+IHtcbiAgICAgICAgICBtb3ZlRXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdmFyIHNoaWZ0ID0gbW92ZUV2dC5jbGllbnRYIC0gc3RhcnRDb29yZHNYO1xuICAgICAgICAgIHN0YXJ0Q29vcmRzWCA9IG1vdmVFdnQuY2xpZW50WFxuICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVycyhzaGlmdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9uTW91c2VVcCA9ICh1cEV2dCkgPT4ge1xuICAgICAgICAgIHVwRXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Nb3VzZU1vdmUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmJhclBpbi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2dCkgPT4ge1xuICAgICAgICBpZiAod2luZG93LnV0aWxzLmlzTGVmdEtleWNvZGUoZXZ0KSkge1xuICAgICAgICAgIHRoaXMuc2V0UGFyYW1ldGVycyhTVEVQX0xFRlQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy51dGlscy5pc1JpZ2h0S2V5Y29kZShldnQpKSB7XG4gICAgICAgICAgdGhpcy5zZXRQYXJhbWV0ZXJzKFNURVBfUklHSFQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB0aW1lID0gMTAwKSB7XG4gICAgbGV0IHRpbWVyO1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBjb25zb2xlLmxvZygneWVzJylcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuYywgdGltZSwgZXZ0KVxuICAgIH1cbiAgfVxufSgpKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFJQSxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0FBRWhFLElBQUlDLFlBQVksR0FBRztFQUNqQkMsR0FBRyxFQUFFSCxRQUFRLENBQUNDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztFQUN4REcsTUFBTSxFQUFFSixRQUFRLENBQUNDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztFQUMxREksT0FBTyxFQUFFTCxRQUFRLENBQUNDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztFQUMzREssUUFBUSxFQUFFUCxXQUFXLENBQUNFLGFBQWEsQ0FBQywyQkFBMkI7QUFDakUsQ0FBQztBQUVBLGFBQVk7RUFDWCxJQUFJTSxTQUFTLEdBQUcsQ0FBQyxFQUFFO0VBQ25CLElBQUlDLFVBQVUsR0FBRyxFQUFFO0VBRW5CQyxNQUFNLENBQUNDLFNBQVM7SUFDZCxTQUFBQyxPQUFZQyxVQUFVLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFO01BQUFDLGVBQUEsT0FBQUosTUFBQTtNQUN2QyxJQUFJLENBQUNSLEdBQUcsR0FBR1MsVUFBVSxDQUFDVCxHQUFHO01BQ3pCLElBQUksQ0FBQ0MsTUFBTSxHQUFHUSxVQUFVLENBQUNSLE1BQU07TUFDL0IsSUFBSSxDQUFDQyxPQUFPLEdBQUdPLFVBQVUsQ0FBQ1AsT0FBTztNQUNqQyxJQUFJLENBQUNDLFFBQVEsR0FBR00sVUFBVSxDQUFDTixRQUFRO01BQ25DLElBQUksQ0FBQ08sS0FBSyxHQUFHQSxLQUFLO01BQ2xCLElBQUksQ0FBQ0MsUUFBUSxHQUFHQSxRQUFRO01BQ3hCLElBQUksQ0FBQ0UsTUFBTSxHQUFHLEtBQUs7TUFFbkIsSUFBSSxDQUFDQyxjQUFjLEdBQUdDLE1BQU0sQ0FBQyxJQUFJLENBQUNkLE1BQU0sQ0FBQ2UsS0FBSyxDQUFDQyxTQUFTLENBQUNDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN0RSxJQUFJLENBQUNDLGVBQWUsR0FBRyxJQUFJLENBQUNMLGNBQWM7TUFDMUMsSUFBSSxDQUFDWixPQUFPLENBQUNjLEtBQUssQ0FBQ0ksS0FBSyxNQUFBQyxNQUFBLENBQU0sSUFBSSxDQUFDRixlQUFlLE9BQUk7TUFDdEQsSUFBSSxDQUFDRyxhQUFhLEdBQUcsQ0FBQztNQUV0QixJQUFJLENBQUNDLGFBQWEsR0FBRyxJQUFJLENBQUNBLGFBQWEsQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztNQUNsRCxJQUFJLENBQUNDLFNBQVMsR0FBRyxJQUFJLENBQUNBLFNBQVMsQ0FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztNQUMxQyxJQUFJLENBQUNFLGdCQUFnQixHQUFHLElBQUksQ0FBQ0EsZ0JBQWdCLENBQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7TUFFeEQsSUFBSSxDQUFDRCxhQUFhLEVBQUU7TUFDcEIsSUFBSSxDQUFDRSxTQUFTLEVBQUU7TUFDaEIsSUFBSSxDQUFDQyxnQkFBZ0IsRUFBRTtJQUN6QjtJQUFDQyxZQUFBLENBQUFuQixNQUFBO01BQUFvQixHQUFBO01BQUFDLEtBQUEsRUFFRCxTQUFBTixjQUFBLEVBQXVCO1FBQUEsSUFBVE8sR0FBRyxHQUFBQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBRSxTQUFBLEdBQUFGLFNBQUEsTUFBRyxDQUFDO1FBQ25CLElBQUlHLGVBQWUsR0FBRzVCLE1BQU0sQ0FBQzZCLGdCQUFnQixDQUFDLElBQUksQ0FBQ2xDLE1BQU0sQ0FBQyxDQUFDbUMsSUFBSSxDQUFDbEIsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RSxJQUFJbUIsVUFBVSxHQUFJLElBQUksQ0FBQ2xDLFFBQVEsQ0FBQ21DLFdBQVcsR0FBRyxJQUFJLENBQUNyQyxNQUFNLENBQUNxQyxXQUFXLEdBQUlKLGVBQWUsR0FBRyxDQUFHO1FBQzlGLElBQUlLLEdBQUcsR0FBRyxJQUFJLENBQUN6QixjQUFjLEdBQUdnQixHQUFHO1FBQ25DOztRQUVBLElBQUtTLEdBQUcsSUFBSSxDQUFDLElBQU1BLEdBQUcsSUFBSUYsVUFBVyxFQUFFO1VBQ3JDLElBQUksQ0FBQ3ZCLGNBQWMsR0FBR3lCLEdBQUc7VUFDekIsSUFBSSxDQUFDcEIsZUFBZSxHQUFHb0IsR0FBRztVQUMxQixJQUFJLENBQUNqQixhQUFhLEdBQUdrQixJQUFJLENBQUNDLEtBQUssQ0FBRUYsR0FBRyxHQUFHLEdBQUcsR0FBSUYsVUFBVSxDQUFDLEdBQUcsR0FBRztVQUMvRCxJQUFJLENBQUNYLGdCQUFnQixFQUFFO1VBQ3ZCLElBQUksQ0FBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQ0QsS0FBSyxFQUFFLElBQUksQ0FBQ1ksYUFBYSxDQUFDO1FBQy9DO1FBQ0E7TUFDRjtJQUFDO01BQUFNLEdBQUE7TUFBQUMsS0FBQSxFQUVELFNBQUFILGlCQUFBLEVBQW1CO1FBQ25CO1FBQ0UsSUFBSSxDQUFDeEIsT0FBTyxDQUFDYyxLQUFLLENBQUNJLEtBQUssTUFBQUMsTUFBQSxDQUFNLElBQUksQ0FBQ0YsZUFBZSxPQUFJO1FBQ3RELElBQUksQ0FBQ2xCLE1BQU0sQ0FBQ2UsS0FBSyxDQUFDMEIsU0FBUyxpQkFBQXJCLE1BQUEsQ0FBaUIsSUFBSSxDQUFDUCxjQUFjLFFBQUs7TUFDdEU7SUFBQztNQUFBYyxHQUFBO01BQUFDLEtBQUEsRUFFRCxTQUFBSixVQUFBLEVBQVk7UUFBQSxJQUFBa0IsS0FBQTtRQUNWLElBQUksQ0FBQzFDLE1BQU0sQ0FBQzJDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFDQyxHQUFHLEVBQUs7VUFDakQsSUFBSSxDQUFDRixLQUFJLENBQUM5QixNQUFNLEVBQUU7VUFDbEJnQyxHQUFHLENBQUNDLGNBQWMsRUFBRTtVQUVwQixJQUFJQyxZQUFZLEdBQUdGLEdBQUcsQ0FBQ0csT0FBTztVQUU5QixJQUFJQyxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBSUMsT0FBTyxFQUFLO1lBQzdCQSxPQUFPLENBQUNKLGNBQWMsRUFBRTtZQUN4QixJQUFJSyxLQUFLLEdBQUdELE9BQU8sQ0FBQ0YsT0FBTyxHQUFHRCxZQUFZO1lBQzFDQSxZQUFZLEdBQUdHLE9BQU8sQ0FBQ0YsT0FBTztZQUM5QkwsS0FBSSxDQUFDcEIsYUFBYSxDQUFDNEIsS0FBSyxDQUFDO1VBQzNCLENBQUM7VUFFRCxJQUFJQyxTQUFTLEdBQUcsU0FBWkEsU0FBU0EsQ0FBSUMsS0FBSyxFQUFLO1lBQ3pCQSxLQUFLLENBQUNQLGNBQWMsRUFBRTtZQUV0QmpELFFBQVEsQ0FBQ3lELG1CQUFtQixDQUFDLFdBQVcsRUFBRUwsV0FBVyxDQUFDO1lBQ3REcEQsUUFBUSxDQUFDeUQsbUJBQW1CLENBQUMsU0FBUyxFQUFFRixTQUFTLENBQUM7VUFDcEQsQ0FBQztVQUVEdkQsUUFBUSxDQUFDK0MsZ0JBQWdCLENBQUMsV0FBVyxFQUFFSyxXQUFXLENBQUM7VUFDbkRwRCxRQUFRLENBQUMrQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUVRLFNBQVMsQ0FBQztRQUNqRCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUNuRCxNQUFNLENBQUMyQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQ0MsR0FBRyxFQUFLO1VBQy9DLElBQUl2QyxNQUFNLENBQUNpRCxLQUFLLENBQUNDLGFBQWEsQ0FBQ1gsR0FBRyxDQUFDLEVBQUU7WUFDbkNGLEtBQUksQ0FBQ3BCLGFBQWEsQ0FBQ25CLFNBQVMsQ0FBQztVQUMvQjtVQUVBLElBQUlFLE1BQU0sQ0FBQ2lELEtBQUssQ0FBQ0UsY0FBYyxDQUFDWixHQUFHLENBQUMsRUFBRTtZQUNwQ0YsS0FBSSxDQUFDcEIsYUFBYSxDQUFDbEIsVUFBVSxDQUFDO1VBQ2hDO1FBQ0YsQ0FBQyxDQUFDO01BQ0o7SUFBQztJQUFBLE9BQUFHLE1BQUE7RUFBQSxHQUNGO0VBRUQsU0FBU2tELFFBQVFBLENBQUNDLElBQUksRUFBYztJQUFBLElBQVpDLElBQUksR0FBQTdCLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLEdBQUc7SUFDaEMsSUFBSThCLEtBQUs7SUFDVCxPQUFPLFVBQVVoQixHQUFHLEVBQUU7TUFDcEJpQixPQUFPLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7TUFDbEJDLFlBQVksQ0FBQ0gsS0FBSyxDQUFDO01BQ25CQSxLQUFLLEdBQUdJLFVBQVUsQ0FBQ04sSUFBSSxFQUFFQyxJQUFJLEVBQUVmLEdBQUcsQ0FBQztJQUNyQyxDQUFDO0VBQ0g7QUFDRixDQUFDLEdBQUUifQ==