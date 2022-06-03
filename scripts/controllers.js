var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const controllerUtil = (() => {
    function getFreeCells(boardState) {
        return boardState.reduce((cells, currentCell, index) => {
            if (currentCell === null) {
                cells.push(index);
            }
            return cells;
        }, []);
    }
    function randInt(start, end) {
        const diff = end - start + 1;
        return Math.floor(Math.random() * diff) + start;
    }
    return { getFreeCells, randInt };
})();
const human = (boardElement) => {
    const moveQueue = [];
    const cellButtons = boardElement.querySelectorAll('button');
    cellButtons.forEach((btn, index) => btn.addEventListener('click', () => moveQueue.push(index)));
    function makeMove() {
        return __awaiter(this, void 0, void 0, function* () {
            while (moveQueue.length === 0) {
                yield new Promise(resolve => setTimeout(resolve, 50));
            }
            return moveQueue.shift();
        });
    }
    return { makeMove };
};
const botRandom = () => {
    function makeMove(boardState) {
        return __awaiter(this, void 0, void 0, function* () {
            const freeCells = controllerUtil.getFreeCells(boardState);
            return freeCells[controllerUtil.randInt(0, freeCells.length - 1)];
        });
    }
    return { makeMove };
};
const botMinMax = (piece, opponentPiece) => {
    function _minMax(boardState, strategy) {
        // TypeScript errors present due to boardChecks being included via HTML file
        if (boardChecks.has3Consecutive(boardState, piece)) {
            return 1;
        }
        if (boardChecks.has3Consecutive(boardState, opponentPiece)) {
            return -1;
        }
        if (controllerUtil.getFreeCells(boardState).length === 0) {
            return 0;
        }
        const nextStrategy = strategy === Math.max ? Math.min : Math.max;
        const nextPiece = strategy === Math.max ? piece : opponentPiece;
        return strategy(...controllerUtil.getFreeCells(boardState).map(cellIndex => {
            const boardSimulation = boardState.slice();
            boardSimulation[cellIndex] = nextPiece;
            return _minMax(boardSimulation, nextStrategy);
        }));
    }
    function makeMove(boardState) {
        return __awaiter(this, void 0, void 0, function* () {
            const freeCells = controllerUtil.getFreeCells(boardState);
            if (freeCells.length === 9) {
                // first move is always a corner
                const corners = [0, 2, 6, 8];
                return corners[controllerUtil.randInt(0, corners.length - 1)];
            }
            const scoredCells = freeCells.map(cellIndex => {
                const boardSimulation = boardState.slice();
                boardSimulation[cellIndex] = piece;
                return {
                    cellIndex,
                    score: _minMax(boardSimulation, Math.min),
                };
            });
            scoredCells.sort((a, b) => a.score - b.score);
            scoredCells.reverse();
            return scoredCells[0].cellIndex;
        });
    }
    return { makeMove };
};
