import Piece from './piece';
import Square from '../square';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesWithKing(board) {
    	const boardLocation = board.findPiece(this);
    	return this.createSquares(boardLocation, board,
    		[[1,2], [-1,2], [1,-2], [-1,-2], [2,1], [-2,1], [2,-1], [-2,-1]]);
    }
}
