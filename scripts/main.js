(() => {
  const boardElement = document.querySelector('.board');
  if (boardElement == null) {
    return;
  }

  game(
    boardElement,
    gameBoard(boardElement, { X: 'player1', O: 'player2' }),
    player('X'),
    player('O')
  ).start();
})();
