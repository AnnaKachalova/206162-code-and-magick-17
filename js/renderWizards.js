(function () {
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
  var wizards = [];
  var colorCoat;
  var colorEyes;
  var setup = document.querySelector('.setup');

  // Показываем блок похожих волшебников
  var setupSimilar = setup.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  var similarListElement = setupSimilar.querySelector('.setup-similar-list');

  var similarWizardTemplate = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  var renderSimilarWizards = function (wizards) {
    similarListElement.textContent = '';
    wizards.forEach(function (wizard, i) {
      var element = similarWizardTemplate.cloneNode(true);

      element.querySelector('.setup-similar-label').textContent = wizard.name;
      element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

      similarListElement.appendChild(element);
    });
  };
  var successHalder = function (data) {
    wizards = data;
    updateWizards();
  };

  // Окно ошибки загрузки
  var showErrorMessage = function (message) {
    var errorWrapper = document.createElement('div');
    errorWrapper.classList.add('error_wrapper');
    errorWrapper.textContent = message;
    document.querySelector('body').appendChild(errorWrapper);
  };
  window.backend.load(successHalder, showErrorMessage);

  // События с волшебником
  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = wizard.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  // Функция определнения рейтинга
  var getRating = function (currentWizard) {
    var rating = 0;

    if (currentWizard.colorCoat === colorCoat) {
      rating += 2;
    }
    if (currentWizard.colorEyes === colorEyes) {
      rating += 1;
    }
    return rating;
  };

  var updateWizards = function () {
    var widardsSorted = wizards
      .slice()
      .sort(function (a, b) {
        var ratingDiff = getRating(b) - getRating(a);
        if (ratingDiff === 0) {
          ratingDiff = wizards.indexOf(a) - wizards.indexOf(b);
        }
        return ratingDiff;
      })
      .splice(0, 4);
    renderSimilarWizards(widardsSorted);
  };
  var lastTimeout;

  // Функция устранения дребезга
  var removeDebounce = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateWizards();
    }, 500);
  };

  // Функция смены цвета мантии
  var onWizardCoatClick = function () {
    var randColor = window.util.getRandomElement(COAT_COLORS);
    wizardCoat.style.fill = randColor;
    colorCoat = randColor;
    removeDebounce();
  };
  // Функция смены цвета глаз
  var onWizardEyesClick = function () {
    var randColor = window.util.getRandomElement(EYES_COLORS);
    wizardEyes.style.fill = randColor;
    colorEyes = randColor;
    removeDebounce();
  };

  var onFireballClick = function () {
    fireball.style.background = window.util.getRandomElement(FIREBALL_COLORS);
  };

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);

  // Работа с отправкой формы
  var form = setup.querySelector('.setup-wizard-form');
  var showSetup = function () {
    setup.classList.add('hidden');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), showSetup, showErrorMessage);
    evt.preventDefault();
  });
})();
