import Piece from './piece';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesWithKing(board) {
    	const boardLocation = board.findPiece(this);
    	return this.getDiagonal(boardLocation, board);
    }
}
