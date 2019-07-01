'use strict';

(function () {
  // show block
  document.querySelector('.setup').classList.remove('hidden');

  // События с окном
  var setup = document.querySelector('.setup');
  var buttonOpen = document.querySelector('.setup-open');
  var buttonClose = setup.querySelector('.setup-close');
  var icon = document.querySelector('.setup-open-icon');
  var input = setup.querySelector('.setup-user-name');

  var setupStartCoords = {
    x: setup.offsetLeft,
    y: setup.offsetTop,
  };

  // Сбрасываем координаты
  var resetCoords = function () {
    setup.style.top = setupStartCoords.y + 'px';
    setup.style.left = setupStartCoords.x + 'px';
  };
  var openPopup = function () {
    setup.classList.remove('hidden');
  };
  var closePopup = function () {
    setup.classList.add('hidden');
    resetCoords();
  };

  // События открытия/закрытия popup окна
  // input
  var focusOnInput = false;
  input.addEventListener('focus', function () {
    focusOnInput = true;
  });

  input.addEventListener('blur', function () {
    focusOnInput = false;
  });

  document.addEventListener('keydown', function (evt) {
    if (!focusOnInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  });

  buttonOpen.addEventListener('click', function () {
    openPopup();
  });
  icon.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  buttonClose.addEventListener('click', function () {
    closePopup();
  });
  buttonClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
})();
