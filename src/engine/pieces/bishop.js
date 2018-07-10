import Piece from './piece';
import GameSettings from '../gameSettings'
import Square from '../square'

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	let moves = [];
    	for(let i = 1; i<GameSettings.BOARD_SIZE; i++) {
    		const newSquares = [Square.at(boardLocation.row + i, boardLocation.col + i),
    		             Square.at(boardLocation.row - i, boardLocation.col + i),
    		             Square.at(boardLocation.row + i, boardLocation.col - i),
    		             Square.at(boardLocation.row - i, boardLocation.col - i)];
    		moves = moves.concat(newSquares.filter(square => square.isOnBoard()));
    	}
        return moves;
    }
}
