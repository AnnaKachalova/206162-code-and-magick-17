'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var renderRect = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  // render shadow
  renderRect(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');

  // render cloud
  renderRect(ctx, 100, 10, '#fff');
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // find the maximum element
  var maxValue = times[0];
  for (var j = 0 + 1; j <= times.length - 1; j++) {
    if (times[j] > maxValue) {
      maxValue = times[j];
    }
  }

  // render histogram
  var HEIGHT_HISTOGRAM = 150;
  var WIDTH_COLUMN = 40;
  var DISTANCE = 50;
  var COLOR_YOUR_PLAYER = 'rgba(255, 0, 0, 1)';
  var PADDING_TOP_COLUMNS = 125;
  var PADDING_TOP_TEXT_NAMES = PADDING_TOP_COLUMNS + HEIGHT_HISTOGRAM - 10;
  var leftColumn = 150;

  for (var i = 0; i < names.length; i++) {
    var time = Math.floor(times[i]);
    var saturation = Math.random() * (1 - 0) + 0;
    var COLOR_ANOTHER_PLAYERS = 'rgba(0, 0, 255,' + saturation + ')';

    // find the percentage for the number
    var percent = Math.floor((time * 100) / Math.floor(maxValue));

    // find the height of the column
    var heightColumn = (HEIGHT_HISTOGRAM * percent) / 100;
    var currentPadding = PADDING_TOP_COLUMNS + (PADDING_TOP_COLUMNS - heightColumn);

    // render column
    ctx.fillStyle = names[i] === 'Вы' ? COLOR_YOUR_PLAYER : COLOR_ANOTHER_PLAYERS;
    ctx.fillRect(leftColumn, currentPadding, WIDTH_COLUMN, heightColumn);

    // render text time
    ctx.fillStyle = '#000';
    ctx.fillText(time, leftColumn, currentPadding - 10);

    // render text name
    ctx.fillText(names[i], leftColumn, PADDING_TOP_TEXT_NAMES);

    leftColumn += WIDTH_COLUMN + DISTANCE;
  }
};
