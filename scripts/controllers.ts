import { BoardState } from './gameboard';
import { Player, PlayerController } from './player';

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
  function _randInt(start: number, end: number) {
    const diff = end - start + 1;
    return Math.floor(Math.random() * diff) + start;
  }

  async function makeMove(boardState: BoardState) {
    const freeCells = boardState.reduce((cells, currentCell, index) => {
      if (currentCell === null) {
        cells.push(index);
      }
      return cells;
    }, <Array<number>>[]);
    return freeCells[_randInt(0, freeCells.length - 1)];
  }

  return { makeMove };
};
