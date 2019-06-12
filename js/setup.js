'use strict';
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

var similarCharacters = [];

var getRandElement = function(arr) {
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
