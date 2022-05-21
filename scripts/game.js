var GameState;
(function (GameState) {
    GameState[GameState["ONGOING"] = 0] = "ONGOING";
    GameState["DRAW"] = "It's a draw!";
    GameState["WIN"] = " wins!";
})(GameState || (GameState = {}));
const game = (boardElement, board, player1, player2) => {
    let currentPlayer = player1;
    function start() {
        const cellButtons = boardElement.querySelectorAll('button');
        cellButtons.forEach((btn, index) => btn.addEventListener('click', () => {
            _takeTurn(index);
            _checkGameStatus();
            _toggleCurrentPlayer();
        }));
    }
    function _takeTurn(index) {
        board.setSquare(index, currentPlayer.getPiece());
    }
    function _checkGameStatus() {
        const { state, winner } = _gameState();
        if (state != GameState.ONGOING) {
            alert(`Game over! ${(winner === null || winner === void 0 ? void 0 : winner.getPiece()) || ''}${state}`);
            winner === null || winner === void 0 ? void 0 : winner.incrementScore();
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
