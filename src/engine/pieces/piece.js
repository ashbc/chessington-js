import GameSettings from '../gameSettings';
import Square from '../square';
import Player from '../player';

export default class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved = false;
    }

    getAvailableMoves(board) {
        return this.getAvailableMovesWithKing(board)
                   .filter(square => {
                        const piece = board.getPiece(square);
                        return !piece || !piece.isKing();
                   })
                   .filter(square => {return !this.causesCheck(board, square)});
    }

    causesCheck(board, square) {
        return false;
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);

        this.simulateMoveTo(board, newSquare);

        this.hasMoved = true;
        board.currentPlayer = (board.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        board.lastPieceMoved = this;
    }

    simulateMoveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.setPiece(newSquare, this);
        board.setPiece(currentSquare, undefined);
    }

    getLateral(boardLocation, board) {
        let moves = [];

        [[1, 0], [-1, 0], [0, 1], [0, -1]]
        .map(x => this.checkDirection(boardLocation, board, ...x))
        .forEach(x => moves = moves.concat(x));

        return moves;
    }

    checkDirection(boardLocation, board, rowOffset, colOffset) {
        const moves = [];
        for(let i = 1; i < GameSettings.BOARD_SIZE; i++) {
            const newLocation = Square.at(
                boardLocation.row + rowOffset * i,
                boardLocation.col + colOffset * i
            );

            if(!newLocation.isOnBoard()) break;
            const occupant = board.getPiece(newLocation);
            if(!occupant) {
                moves.push(newLocation);
            } else if(occupant.canBeTakenBy(this)) {
                moves.push(newLocation);
                break;
            } else {
                break;
            }
        }
        return moves;
    }

    getDiagonal(boardLocation, board) {
        let moves = [];

        [[1, 1], [-1, 1], [1, -1], [-1, -1]]
        .map(x => this.checkDirection(boardLocation, board, ...x))
        .forEach(x => moves = moves.concat(x));

        return moves;
    }

    createSquares(boardLocation, board, offsets) {
        return offsets
            .map(space => Square.at(boardLocation.row + space[0], boardLocation.col + space[1]))
            .filter(square => square.isOnBoard())
            .filter(square => 
                !board.getPiece(square)
                || board.getPiece(square).canBeTakenBy(this));
    }

    canBeTakenBy(taker) {
        return taker.player !== this.player;
    }

    canBePromoted(board) {
        return false;
    }

    isKing() {
        return false;
    }

}
