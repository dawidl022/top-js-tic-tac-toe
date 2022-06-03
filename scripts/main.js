(() => {
  const boardElement = document.querySelector('.board');
  const player1Score = document.querySelector('#player1-score');
  const player2Score = document.querySelector('#player2-score');
  if (boardElement == null || player1Score == null || player2Score == null) {
    console.error("Game HTML elements not found.")
    return;
  }

  const menuScreen = document.querySelector('.menu-screen');
  const gameScreen = document.querySelector('.game-screen');
  const player1 = document.querySelector('#player1-name');
  const player2 = document.querySelector('#player2-name');

  function show(element) {
    element.classList.remove('hidden');
  }

  function hide(element) {
    element.classList.add('hidden');
  }

  function showGameScreen() {
    hide(menuScreen);
    show(gameScreen);
  }

  const modal2Player = document.querySelector('#modal-2-players');
  const button2Player = document.querySelector('#button-2-players');
  const form2player = document.querySelector('#player-2-game-form');

  form2player.addEventListener('submit', e => {
    e.preventDefault();
    const player1 = e.target.querySelector('#player1-name-field').value;
    const player2 = e.target.querySelector('#player2-name-field').value;
    hide(modal2Player);
    start2PlayerGame(player1, player2);
  });

  button2Player.addEventListener('click', () => show(modal2Player));

  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.querySelector('.close').addEventListener('click', () => hide(modal));
    modal.addEventListener('click', e => {
      if (e.target !== modal) {
        return;
      }
      hide(modal);
    });
  })

  function start2PlayerGame(player1Name, player2Name) {
    player1Name ||= 'Player 1';
    player2Name ||= 'Player 2';

    showGameScreen();
    game(
      boardElement,
      gameBoard(boardElement, { X: 'player1', O: 'player2' }),
      player('X', player1Name, player1Score, player1),
      player('O', player2Name, player2Score, player2)
    ).start();
  }
})();
