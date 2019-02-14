var game = document.getElementById('game');
var cells = game.getElementsByClassName('cell');
var player = 'x';
var dataCells = [];
var stepCount = 0;
var message = document.getElementById('message');
var btnRestart = document.getElementById('restart');
win = {x: 0, '0': 0, draw: 0};
var winIndex = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
];


for (var i = 0; i < cells.length; i++) {
  go(cells[i]);
}

function go(cell) {
  cell.addEventListener('click', start);
  
  function start() {
    if (!cell.innerHTML) {
      var id = cell.getAttribute('data-id');
      cell.innerHTML = player;
      dataCells[id] = player;
      stepCount++;
      if (checkWin()) {
        message.innerHTML = 'Выиграл: ' + player;
        win[player]++;
        stepCount = 0;
//        paused = true;
      } else {
        changePlayer();
      }
      if (stepCount >= 9) {
        win.draw++;
        stepCount = 0;
        message.innerHTML = 'Ничья';
      }
      updateStatistics();
    }
  }
}

function changePlayer() {
  if (player === 'x') {
    player = '0';
  } else {
    player = 'x';
  }
  
  message.innerHTML = 'Ходит: ' + player;
}

function checkWin() {
  for (var i = 0; i < winIndex.length; i++) {
    var id = winIndex[i];
    var check = dataCells[id[0]] &&
      dataCells[id[0]] == dataCells[id[1]] && 
      dataCells[id[1]] == dataCells[id[2]];
    if (check) {
      return true;
    }
  }
  return false;
}

btnRestart.addEventListener('click', restart);

function restart() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
  }
  changePlayer();
  dataCells = [];
}

function updateStatistics() {
  win_x.innerHTML = win.x; 
  win_0.innerHTML = win['0']; 
  win_draw.innerHTML = win.draw; 
}
