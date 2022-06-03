import { BoardState, Piece } from './gameboard';
import { PlayerController } from './player';

const controllerUtil = (() => {
  function getFreeCells(boardState: BoardState): number[] {
    return boardState.reduce((cells, currentCell, index) => {
      if (currentCell === null) {
        cells.push(index);
      }
      return cells;
    }, <Array<number>>[]);
  }

  function randInt(start: number, end: number) {
    const diff = end - start + 1;
    return Math.floor(Math.random() * diff) + start;
  }

  return { getFreeCells, randInt };
})();

const human = (boardElement: HTMLElement): PlayerController => {
  const moveQueue: number[] = [];

  const cellButtons = boardElement.querySelectorAll('button');
  cellButtons.forEach((btn, index) =>
    btn.addEventListener('click', () => moveQueue.push(index))
  );

  async function makeMove() {
    while (moveQueue.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return moveQueue.shift() as number;
  }

  return { makeMove };
};

const botRandom = (): PlayerController => {
  async function makeMove(boardState: BoardState) {
    const freeCells = controllerUtil.getFreeCells(boardState);
    return freeCells[controllerUtil.randInt(0, freeCells.length - 1)];
  }

  return { makeMove };
};

type Strategy = Math['max'] | Math['min'];

type Score = 1 | 0 | -1;

interface MoveEval {
  cellIndex: number;
  score: Score;
}

const botMinMax = (piece: Piece, opponentPiece: Piece): PlayerController => {
  function _minMax(boardState: BoardState, strategy: Strategy): Score {
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

    return strategy(
      ...controllerUtil.getFreeCells(boardState).map(cellIndex => {
        const boardSimulation: BoardState = boardState.slice();
        boardSimulation[cellIndex] = nextPiece;

        return _minMax(boardSimulation, nextStrategy);
      })
    ) as Score;
  }

  async function makeMove(boardState: BoardState) {
    const freeCells = controllerUtil.getFreeCells(boardState);

    if (freeCells.length === 9) {
      // first move is always a corner
      const corners = [0, 2, 6, 8];
      return corners[controllerUtil.randInt(0, corners.length - 1)];
    }

    const scoredCells: MoveEval[] = freeCells.map(cellIndex => {
      const boardSimulation: BoardState = boardState.slice();
      boardSimulation[cellIndex] = piece;

      return {
        cellIndex,
        score: _minMax(boardSimulation, Math.min),
      };
    });

    scoredCells.sort((a, b) => a.score - b.score);
    scoredCells.reverse();

    return scoredCells[0].cellIndex;
  }

  return { makeMove };
};
