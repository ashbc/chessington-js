import Piece from './piece';
import Square from '../square';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	return this.createSquares(boardLocation, board, [
    		[1,1], [-1,1], [1,-1], [-1,-1],
    		[1,0], [-1,0], [0,1], [0,-1]
    	]);
    }
}
