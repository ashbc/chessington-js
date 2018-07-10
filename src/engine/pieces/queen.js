import Piece from './piece';
import GameSettings from '../gameSettings'
import Square from '../square';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
      	const boardLocation = board.findPiece(this);
    	return this.getDiagonal(boardLocation, board).concat(this.getLateral(boardLocation, board));
    }
}
