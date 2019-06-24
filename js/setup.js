'use strict';

(function () {
  // show block
  document.querySelector('.setup').classList.remove('hidden');

  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];
  var WIZARD_LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', ' #e848d5', '#e6e848'];

  var similarCharacters = [];

  var getRandElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  for (var i = 0; i < 4; i++) {
    var character = {
      name: getRandElement(WIZARD_NAMES) + '\t' + getRandElement(WIZARD_LAST_NAMES),
      coatColor: getRandElement(COAT_COLORS),
      eyesColor: getRandElement(EYES_COLORS),
    };
    similarCharacters.push(character);
  }

  var similarListElement = document.querySelector('.setup-similar-list');

  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  similarListElement.textContent = '';
  for (var j = 0; j < 4; j++) {
    var currentWizard = similarCharacters[j];
    var element = similarWizardTemplate.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = currentWizard.name;
    element.querySelector('.wizard-coat').style.fill = currentWizard.coatColor;
    element.querySelector('.wizard-eyes').style.fill = currentWizard.eyesColor;

    similarListElement.appendChild(element);
  }

  document.querySelector('.setup-similar').classList.remove('hidden');

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

  // События с волшебником
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = wizard.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  var onWizardCoatClick = function () {
    wizardCoat.style.fill = getRandElement(COAT_COLORS);
  };
  var onWizardEyesClick = function () {
    wizardEyes.style.fill = getRandElement(EYES_COLORS);
  };
  var onFireballClick = function () {
    fireball.style.background = getRandElement(FIREBALL_COLORS);
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);
})();
