import Piece from './piece';
import GameSettings from '../gameSettings'
import Square from '../square';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
      	const boardLocation = board.findPiece(this);
      	let moves = [];
    	for(let i = 0; i < GameSettings.BOARD_SIZE; i++) {
    		moves = moves.concat([
    			// lateral
    			Square.at(i, boardLocation.col),
    			Square.at(boardLocation.row, i),

    			// diagonal
    			Square.at(boardLocation.row + i, boardLocation.col + i),
    			Square.at(boardLocation.row - i, boardLocation.col + i),
    			Square.at(boardLocation.row + i, boardLocation.col - i),
    			Square.at(boardLocation.row - i, boardLocation.col - i),
    		].filter(x => x.isOnBoard() && !x.equals(boardLocation)));
    	}

    	return moves;
    }
}
