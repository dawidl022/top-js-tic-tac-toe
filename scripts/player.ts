import { Piece } from './gameboard';

export interface Player {
  getPiece(): Piece;
  incrementScore(): void;
}

const player = (
  piece: Piece,
  name: string,
  scoreElement: HTMLElement,
  nameElement: HTMLElement
) => {
  nameElement.textContent = name;

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
