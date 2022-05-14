game(
  gameBoard(document.querySelector(".board"), {X: 'player1', O: 'player2'}),
  player('X'),
  player('O')
).start();
