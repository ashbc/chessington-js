import Piece from './piece';
import Rook from './rook';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
    	const boardLocation = board.findPiece(this);
    	let moves = this.createSquares(boardLocation, board, [
    		[1,1], [-1,1], [1,-1], [-1,-1],
    		[1,0], [-1,0], [0,1], [0,-1]
    	]);
        if (!this.hasMoved) {
            this.checkCastle(boardLocation, board, moves, 1);
            this.checkCastle(boardLocation, board, moves, -1);
        }
        return moves;
    }

    canBeTakenBy(taker) {
        return false;
    }

    checkCastle(boardLocation, board, moves, side) {
        for(let i = 1; i < GameSettings.BOARD_SIZE; i++) {
            const newLocation = Square.at(
                boardLocation.row,
                boardLocation.col + side * i
            );
            if(!newLocation.isOnBoard()) break;
            
            const occupant = board.getPiece(newLocation);
            if (occupant instanceof Rook && !occupant.hasMoved) {
                moves.push(Square.at(boardLocation.row, boardLocation.col + side * 2));
                break;
            } else if (occupant) {
                break;
            }
        }

    }
}
