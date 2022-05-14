export type Piece = 'X' | 'O';

type Cell = Piece | null;

export interface GameBoard {
  setSquare(index: number, piece: Piece): void;
  clear(): void;
  isFull(): boolean;
  has3Consecutive(piece: Piece): boolean;
}

export interface SquareClasses {
  X: string;
  O: string;
}

const gameBoard = (
  boardElement: HTMLElement,
  squareClasses: SquareClasses
): GameBoard => {
  const NUMBER_OF_SQUARES = 9;
  const board = new Array<Cell>(NUMBER_OF_SQUARES);

  function _init() {
    clear();
  }

  function _render() {
    for (let i = 0; i < NUMBER_OF_SQUARES; i++) {
      const squareValue = board[i];
      const squareElement = boardElement.children[i];

      if (squareValue === null) {
        squareElement.textContent = '';
        squareElement.className = '';
        squareElement.removeAttribute('disabled');
      } else {
        squareElement.textContent = squareValue;
        squareElement.className = squareClasses[squareValue];
        squareElement.setAttribute('disabled', 'disabled');
      }
    }
  }

  function _getRows(): Cell[][] {
    const rows = [];

    for (let i = 0; i < NUMBER_OF_SQUARES; i += 3) {
      rows.push(board.slice(i, i + 3));
    }

    return rows;
  }

  function _getColumns(): Cell[][] {
    const columns = [];

    for (let i = 0; i < NUMBER_OF_SQUARES / 3; i++) {
      columns.push([board[i], board[i + 3], board[i + 6]]);
    }

    return columns;
  }

  function _getDiagonals() {
    return [
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];
  }

  function setSquare(index: number, piece: Piece) {
    if (!squareClasses.hasOwnProperty(piece)) {
      throw new TypeError('Invalid square value');
    }

    if (index >= 0 && index < NUMBER_OF_SQUARES) {
      board[index] = piece;
    } else {
      throw new TypeError('Invalid square index');
    }
    _render();
  }

  function clear() {
    board.fill(null);
    _render();
  }

  function isFull() {
    for (const square of board) {
      if (square === null) {
        return false;
      }
    }

    return true;
  }

  function has3Consecutive(piece: Piece) {
    const combinations = [..._getRows(), ..._getColumns(), ..._getDiagonals()];

    for (const combination of combinations) {
      if (combination.filter(occupant => occupant === piece).length === 3) {
        return true;
      }
    }

    return false;
  }

  _init();
  return { setSquare, clear, isFull, has3Consecutive };
};
