const NUMBER_OF_SQUARES = 9;
const boardChecks = (() => {
    function _getRows(board) {
        const rows = [];
        for (let i = 0; i < NUMBER_OF_SQUARES; i += 3) {
            rows.push(board.slice(i, i + 3));
        }
        return rows;
    }
    function _getColumns(board) {
        const columns = [];
        for (let i = 0; i < NUMBER_OF_SQUARES / 3; i++) {
            columns.push([board[i], board[i + 3], board[i + 6]]);
        }
        return columns;
    }
    function _getDiagonals(board) {
        return [
            [board[0], board[4], board[8]],
            [board[2], board[4], board[6]],
        ];
    }
    function has3Consecutive(board, piece) {
        const combinations = [
            ..._getRows(board),
            ..._getColumns(board),
            ..._getDiagonals(board),
        ];
        for (const combination of combinations) {
            if (combination.filter(occupant => occupant === piece).length === 3) {
                return true;
            }
        }
        return false;
    }
    return { has3Consecutive };
})();
const gameBoard = (boardElement, squareClasses) => {
    const board = new Array(NUMBER_OF_SQUARES);
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
            }
            else {
                squareElement.textContent = squareValue;
                squareElement.className = squareClasses[squareValue];
                squareElement.setAttribute('disabled', 'disabled');
            }
        }
    }
    function setSquare(index, piece) {
        if (!squareClasses.hasOwnProperty(piece)) {
            throw new TypeError('Invalid square value');
        }
        if (index >= 0 && index < NUMBER_OF_SQUARES) {
            board[index] = piece;
        }
        else {
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
    function has3Consecutive(piece) {
        return boardChecks.has3Consecutive(board, piece);
    }
    function getBoardState() {
        return board.slice();
    }
    _init();
    return { setSquare, clear, isFull, has3Consecutive, getBoardState };
};
