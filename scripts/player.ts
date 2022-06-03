import { BoardState, Piece } from './gameboard';

export interface Player {
  getPiece(): Piece;
  incrementScore(): void;
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

  function makeMove(boardState: BoardState) {
    return controller.makeMove(boardState);
  }

  return { getPiece, incrementScore, makeMove };
};
