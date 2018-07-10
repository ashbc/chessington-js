import Piece from './piece';
import Square from '../square';
import GameSettings from '../gameSettings'

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	const moves = [];
    	for(let row = 0; row < GameSettings.BOARD_SIZE; row++) {
    		if(row !== boardLocation.row) {
    			moves.push(Square.at(row, boardLocation.col));
    		}
    	}
    	for(let col = 0; col < GameSettings.BOARD_SIZE; col++) {
    		if(col !== boardLocation.col) {
    			moves.push(Square.at(boardLocation.row, col));
    		}
    	}
        return moves;
    }
}
