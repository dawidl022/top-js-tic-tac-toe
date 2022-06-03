var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var GameState;
(function (GameState) {
    GameState[GameState["ONGOING"] = 0] = "ONGOING";
    GameState["DRAW"] = "It's a draw!";
    GameState["WIN"] = " wins!";
})(GameState || (GameState = {}));
const game = (board, player1, player2, playerToMoveComponent) => {
    let currentPlayer = player1;
    function start() {
        return __awaiter(this, void 0, void 0, function* () {
            playerToMoveComponent.update(currentPlayer);
            while (true) {
                yield _takeTurn();
                yield _checkGameStatus();
                _toggleCurrentPlayer();
            }
        });
    }
    function _takeTurn() {
        return __awaiter(this, void 0, void 0, function* () {
            const move = yield currentPlayer.makeMove(board.getBoardState());
            board.setSquare(move, currentPlayer.getPiece());
        });
    }
    function _checkGameStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const { state, winner } = _gameState();
            if (state != GameState.ONGOING) {
                // wait for board to rerender
                yield new Promise(resolver => setTimeout(resolver, 50));
                alert(`Game over! ${(winner === null || winner === void 0 ? void 0 : winner.getName()) || ''}${state}`);
                winner === null || winner === void 0 ? void 0 : winner.incrementScore();
                board.clear();
                // TODO toggle which player starts next round
            }
        });
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
