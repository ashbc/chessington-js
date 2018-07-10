import Piece from './piece';
import Square from '../square';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	const moves = [];
    	for(let row = 0; row < 8; row++) {
    		if(row !== boardLocation.row) {
    			moves.push(Square.at(row, boardLocation.col));
    		}
    	}
    	for(let col = 0; col < 8; col++) {
    		if(col !== boardLocation.col) {
    			moves.push(Square.at(boardLocation.row, col));
    		}
    	}
        return moves;
    }
}
