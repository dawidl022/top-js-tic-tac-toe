import { Player } from './player';
import { GameBoard } from './gameboard';
import { PlayerToMoveComponent } from './components/PlayerToMove';

enum GameState {
  ONGOING,
  DRAW = "It's a draw!",
  WIN = ' wins!',
}

const game = (
  board: GameBoard,
  player1: Player,
  player2: Player,
  playerToMoveComponent: PlayerToMoveComponent
) => {
  let currentPlayer = player1;

  async function start() {
    playerToMoveComponent.update(currentPlayer);

    while (true) {
      await _takeTurn();
      await _checkGameStatus();
      _toggleCurrentPlayer();
    }
  }

  async function _takeTurn() {
    const move = await currentPlayer.makeMove(board.getBoardState());
    board.setSquare(move, currentPlayer.getPiece());
  }

  async function _checkGameStatus() {
    const { state, winner } = _gameState();
    if (state != GameState.ONGOING) {
      // wait for board to rerender
      await new Promise(resolver => setTimeout(resolver, 50));
      alert(`Game over! ${winner?.getName() || ''}${state}`);
      winner?.incrementScore();
      board.clear();
      // TODO toggle which player starts next round
    }
  }

  function _toggleCurrentPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playerToMoveComponent.update(currentPlayer);
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
