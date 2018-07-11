import Piece from './piece';
import Player from '../player';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.hasMovedTwoSpaces = false;
        this.direction = this.player === Player.WHITE ? 1 : -1;
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	const direction = this.direction;
    	let moves = [];

        const squareAhead = Square.at(boardLocation.row + direction, boardLocation.col);
        const squareTwoAhead = Square.at(boardLocation.row + 2 * direction, boardLocation.col);

        if (squareAhead.isOnBoard() && !board.getPiece(squareAhead)) {
            moves.push(squareAhead);
            if (!this.hasMoved && squareTwoAhead.isOnBoard() && !board.getPiece(squareTwoAhead)) {
                moves.push(squareTwoAhead);
            }
        }

        moves = moves.concat(this.createSquares(boardLocation, board, [
            [direction, 1],
            [direction, -1]
        ]).filter(square => !!board.getPiece(square)));

        this.checkEnPassant(boardLocation, board, moves, 1);
        this.checkEnPassant(boardLocation, board, moves, -1);

    	return moves;
    }

    moveTo(board, newSquare) {
        const fromSquare = board.findPiece(this);
        if(fromSquare.col !== newSquare.col && !board.getPiece(newSquare)) {
            board.setPiece(Square.at(newSquare.row - this.direction, newSquare.col), undefined);
        }
        super.moveTo(board, newSquare);
        this.hasMovedTwoSpaces = (Math.abs(newSquare.row - fromSquare.row) === 2);
    }

    checkEnPassant(boardLocation, board, moves, side) {
        const piece = board.getPiece(Square.at(boardLocation.row, boardLocation.col+side));
        if(piece && piece.hasMovedTwoSpaces && board.lastPieceMoved === piece) {
            moves.push(Square.at(boardLocation.row + this.direction, boardLocation.col+side));
        }
    }

    canBePromoted(board) {
        const boardLocation = board.findPiece(this);
        if(this.player === Player.WHITE) {
            return boardLocation.row === GameSettings.BOARD_SIZE - 1;
        } else {
            return boardLocation.row === 0;
        }
    }
}
