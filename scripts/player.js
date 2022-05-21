const player = (piece, scoreElement) => {
    function getPiece() {
        return piece;
    }
    function incrementScore() {
        var _a;
        scoreElement.textContent = (parseInt((_a = scoreElement.textContent) !== null && _a !== void 0 ? _a : '0') + 1).toString();
    }
    return { getPiece, incrementScore };
};
