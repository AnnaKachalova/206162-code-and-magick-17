'use strict';
var setup = document.querySelector('.setup');
var holder = setup.querySelector('.upload');

var onMouseDownHolder = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };
  var dragged = false;

  var onMouseMoveHolder = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };
    setup.style.top = setup.offsetTop - shift.y + 'px';
    setup.style.left = setup.offsetLeft - shift.x + 'px';
  };

  var onMouseUpHolder = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMoveHolder);
    document.removeEventListener('mouseup', onMouseUpHolder);

    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        holder.removeEventListener('click', onClickPreventDefault);
      };
      holder.addEventListener('click', onClickPreventDefault);
    }
  };
  document.addEventListener('mousemove', onMouseMoveHolder);
  document.addEventListener('mouseup', onMouseUpHolder);
};

holder.addEventListener('mousedown', onMouseDownHolder);
