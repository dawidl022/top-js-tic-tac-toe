import { SquareClasses } from '../gameboard';
import { Player } from '../player';

export interface PlayerToMoveComponent {
  update(currentPlayer: Player): void;
}

const playerToMove = (
  playerToMoveElement: HTMLElement,
  pieceClasses: SquareClasses
): PlayerToMoveComponent => {
  const playerToMoveName = playerToMoveElement.querySelector(
    '.player-to-move__name'
  );
  const playerToMovePiece = playerToMoveElement.querySelector(
    '.player-to-move__piece'
  );

  if (playerToMoveName == null || playerToMovePiece == null) {
    throw new Error('Could not find necessary player to move elements in DOM');
  }

  const playerToMovePieceBaseClass = playerToMovePiece.className;

  function update(currentPlayer: Player) {
    playerToMoveName!.textContent = currentPlayer.getName();
    playerToMovePiece!.textContent = currentPlayer.getPiece();
    playerToMovePiece!.className = `${playerToMovePieceBaseClass} ${
      pieceClasses[currentPlayer.getPiece()]
    }`;
  }

  return { update };
};
