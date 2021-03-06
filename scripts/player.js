const player = (controller, piece, name, scoreElement, nameElement) => {
    nameElement.textContent = name;
    function getPiece() {
        return piece;
    }
    function incrementScore() {
        var _a;
        scoreElement.textContent = (parseInt((_a = scoreElement.textContent) !== null && _a !== void 0 ? _a : '0') + 1).toString();
    }
    function resetScore() {
        scoreElement.textContent = '0';
    }
    function makeMove(boardState) {
        return controller.makeMove(boardState);
    }
    function getName() {
        return name;
    }
    return { getPiece, getName, incrementScore, resetScore, makeMove };
};
