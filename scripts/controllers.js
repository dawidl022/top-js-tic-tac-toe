var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const human = (boardElement) => {
    const moveQueue = [];
    const cellButtons = boardElement.querySelectorAll('button');
    cellButtons.forEach((btn, index) => btn.addEventListener('click', () => moveQueue.push(index)));
    function makeMove() {
        return __awaiter(this, void 0, void 0, function* () {
            while (moveQueue.length === 0) {
                yield new Promise(resolve => setTimeout(resolve, 50));
            }
            return moveQueue.shift();
        });
    }
    return { makeMove };
};
