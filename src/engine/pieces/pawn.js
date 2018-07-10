import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	const direction = this.player === Player.WHITE ? 1 : -1;
    	let moves = [];

        const squareAhead = Square.at(boardLocation.row + direction, boardLocation.col);
        const squareTwoAhead = Square.at(boardLocation.row + 2 * direction, boardLocation.col);

        if (!board.getPiece(squareAhead)) {
            moves.push(squareAhead);
            if (!this.hasMoved && !board.getPiece(squareTwoAhead)) {
                moves.push(squareTwoAhead);
            }
        }

    	return moves;
    }
}
