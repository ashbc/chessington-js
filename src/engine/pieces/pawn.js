import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.hasMovedTwoSpaces = false;
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	const direction = this.player === Player.WHITE ? 1 : -1;
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

        const leftPiece = board.getPiece(Square.at(boardLocation.row, boardLocation.col-1));
        const rightPiece = board.getPiece(Square.at(boardLocation.row, boardLocation.col+1));

        if(leftPiece && leftPiece.hasMovedTwoSpaces && board.lastPieceMoved === leftPiece) {
            moves.push(Square.at(boardLocation.row + direction, boardLocation.col - 1));
        }

        if(rightPiece && rightPiece.hasMovedTwoSpaces && board.lastPieceMoved === rightPiece) {
            moves.push(Square.at(boardLocation.row + direction, boardLocation.col + 1));
        }

    	return moves;
    }

    moveTo(board, newSquare) {
        const fromSquare = board.findPiece(this);
        super.moveTo(board, newSquare);
        this.hasMovedTwoSpaces = (Math.abs(newSquare.row - fromSquare.row) === 2);
    }
}
