import Piece from './piece';
import Square from '../square';
import GameSettings from '../gameSettings'

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	let moves = [];
    	for(let i = 0; i < GameSettings.BOARD_SIZE; i++) {
    		moves = moves.concat([
    			Square.at(i, boardLocation.col),
				Square.at(boardLocation.row, i)
			].filter(x => !x.equals(boardLocation)));
    	}
        return moves;
    }
}
