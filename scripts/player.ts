import { Piece } from './gameboard';

export interface Player {
  getPiece(): Piece;
}

const player = (piece: Piece) => {
  function getPiece() {
    return piece;
  }
  return { getPiece };
};
