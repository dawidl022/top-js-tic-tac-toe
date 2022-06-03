import { PlayerController } from './player';

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
    return moveQueue.shift();
  }

  return { makeMove };
};
