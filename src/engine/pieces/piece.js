import GameSettings from '../gameSettings'
import Square from '../square'

export default class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved = false;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.hasMoved = true;
    }

    getLateral(boardLocation) {
        let moves = [];
        for(let i = 0; i < GameSettings.BOARD_SIZE; i++) {
            moves = moves.concat([
                Square.at(i, boardLocation.col),
                Square.at(boardLocation.row, i)
            ].filter(x => !x.equals(boardLocation)));
        }
        return moves;
    }

    getDiagonal(boardLocation) {
        let moves = [];
        for(let i = 1; i<GameSettings.BOARD_SIZE; i++) {
            const newSquares = [Square.at(boardLocation.row + i, boardLocation.col + i),
                         Square.at(boardLocation.row - i, boardLocation.col + i),
                         Square.at(boardLocation.row + i, boardLocation.col - i),
                         Square.at(boardLocation.row - i, boardLocation.col - i)];
            moves = moves.concat(newSquares.filter(square => square.isOnBoard()));
        }
        return moves;
    }
}
