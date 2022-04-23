const gameBoard = (() => {
  const NUMBER_OF_SQUARES = 9;
  const board = new Array(NUMBER_OF_SQUARES);

  function _init() {
    clear();
  }

  function _render() {

  }

  function _getRows() {
    const rows = [];

    for (let i = 0; i < NUMBER_OF_SQUARES; i += 3) {
      rows.push(board.slice(i, i + 3));
    }

    return rows;
  }

  function _getColumns() {
    const columns = [];

    for (let i = 0; i < NUMBER_OF_SQUARES / 3; i++) {
      columns.push([board[i], board[i + 3], board[i + 6]]);
    }

    return columns;
  }

  function _getDiagonals() {
    return [
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ];
  }

  function setSquare(index, char) {
    if (index >= 0 && index < NUMBER_OF_SQUARES) {
      board[index] = char;
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

  function has3Consecutive(char) {
    const combinations = [..._getRows(), ..._getColumns(), ..._getDiagonals()]

    for (const combination of combinations) {
      if (combination.filter(occupant => occupant === char).length === 3) {
        return true;
      }
    }

    return false;
  }

  _init();
  return { setSquare, clear, isFull, has3Consecutive };
})();
