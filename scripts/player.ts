import { Piece } from './gameboard';

export interface Player {
  getPiece(): string;
}

const player = (piece: Piece) => {
  function getPiece() {
    return piece;
  }
  return { getPiece };
};
