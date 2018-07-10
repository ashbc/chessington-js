import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	const isWhite = this.player === Player.WHITE;
    	let moves = [];
    	moves.push(Square.at(isWhite
    		? boardLocation.row + 1
    		: boardLocation.row - 1, boardLocation.col));
    	if (boardLocation.row === (isWhite ? 1 : 6)) {
    		moves.push(Square.at(isWhite
    			? boardLocation.row + 2
    			: boardLocation.row - 2, boardLocation.col));
    	}
    	return moves;
    }
}
