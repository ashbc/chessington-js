import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesWithKing(board) {
    	const boardLocation = board.findPiece(this);
        return this.getLateral(boardLocation, board);
    }
}
