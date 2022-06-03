import { BoardState, Piece } from './gameboard';

export interface Player {
  getPiece(): Piece;
  incrementScore(): void;
  resetScore(): void;
  getName(): string;
  makeMove(boardState: BoardState): Promise<number>;
}

export interface PlayerController {
  makeMove(boardState: BoardState): Promise<number>;
}

const player = (
  controller: PlayerController,
  piece: Piece,
  name: string,
  scoreElement: HTMLElement,
  nameElement: HTMLElement
): Player => {
  nameElement.textContent = name;

  function getPiece() {
    return piece;
  }

  function incrementScore() {
    scoreElement.textContent = (
      parseInt(scoreElement.textContent ?? '0') + 1
    ).toString();
  }

  function resetScore() {
    scoreElement.textContent = '0';
  }

  function makeMove(boardState: BoardState) {
    return controller.makeMove(boardState);
  }

  function getName() {
    return name;
  }

  return { getPiece, getName, incrementScore, resetScore, makeMove };
};
