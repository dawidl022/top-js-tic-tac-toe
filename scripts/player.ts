import { Piece } from './gameboard';

export interface Player {
  getPiece(): Piece;
  incrementScore(): void;
}

const player = (piece: Piece, scoreElement: HTMLElement) => {
  function getPiece() {
    return piece;
  }

  function incrementScore() {
    scoreElement.textContent = (
      parseInt(scoreElement.textContent ?? '0') + 1
    ).toString();
  }

  return { getPiece, incrementScore };
};
