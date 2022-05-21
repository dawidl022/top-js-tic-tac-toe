(() => {
  const boardElement = document.querySelector('.board');
  const player1Score = document.querySelector('#player1-score');
  const player2Score = document.querySelector('#player2-score');
  if (boardElement == null || player1Score == null || player2Score == null) {
    console.error("Game HTML elements not found.")
    return;
  }

  game(
    boardElement,
    gameBoard(boardElement, { X: 'player1', O: 'player2' }),
    player('X', player1Score),
    player('O', player2Score)
  ).start();
})();
