import Piece from './piece';
import Square from '../square';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	return [[1,2], [-1,2], [1,-2], [-1,-2], [2,1], [-2,1], [2,-1], [-2,-1]]
    		.map(space => Square.at(boardLocation.row + space[0], boardLocation.col + space[1]))
    		.filter(square => square.isOnBoard());
    }
}
