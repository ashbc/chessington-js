import Piece from './piece';
import Player from '../player';
import Square from '../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	return [Square.at(this.player === Player.WHITE
    		? boardLocation.row + 1
    		: boardLocation.row - 1, boardLocation.col)];
    }
}
