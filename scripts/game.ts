import { Player } from './player';
import { GameBoard } from './gameboard';

enum GameState {
  ONGOING,
  DRAW = "It's a draw!",
  WIN = ' wins!',
}

const game = (
  boardElement: HTMLElement,
  board: GameBoard,
  player1: Player,
  player2: Player
) => {
  let currentPlayer = player1;

  function start() {
    const cellButtons = boardElement.querySelectorAll('button');

    cellButtons.forEach((btn, index) =>
      btn.addEventListener('click', () => {
        _takeTurn(index);
        _checkGameStatus();
        _toggleCurrentPlayer();
      })
    );
  }

  function _takeTurn(index: number) {
    board.setSquare(index, currentPlayer.getPiece());
  }

  function _checkGameStatus() {
    const { state, winner } = _gameState();
    if (state != GameState.ONGOING) {
      alert(`Game over! ${winner?.getPiece() || ''}${state}`);
      winner?.incrementScore();
      board.clear();
    }
  }

  function _toggleCurrentPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function _gameState() {
    const players = [player1, player2];

    for (const player of players) {
      if (board.has3Consecutive(player.getPiece())) {
        return { state: GameState.WIN, winner: player };
      }
    }

    if (board.isFull()) {
      return { state: GameState.DRAW, winner: null };
    }

    return { state: GameState.ONGOING, winner: null };
  }

  return { start };
};
