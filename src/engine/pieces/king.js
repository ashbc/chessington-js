import Piece from './piece';
import Rook from './rook';
import Square from '../square';
import GameSettings from '../gameSettings';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMovesWithKing(board) {
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

    simulateMoveTo(board, newSquare) {
        const fromSquare = board.findPiece(this);
        const movedBy = newSquare.col - fromSquare.col;
        if(Math.abs(movedBy) === 2) {
            const side = Math.sign(movedBy);
            const rookLocation = this.findRook(fromSquare, board, side);
            const rook = board.getPiece(rookLocation);

            board.setPiece(
                Square.at(fromSquare.row, fromSquare.col + side),
                    rook);
            board.setPiece(rookLocation, undefined);
        }
        super.simulateMoveTo(board, newSquare);
    }

    findRook(boardLocation, board, side) {
        for(let i = 1; i < GameSettings.BOARD_SIZE; i++) {
            const newLocation = Square.at(
                boardLocation.row,
                boardLocation.col + side * i
            );
            if(!newLocation.isOnBoard()) return;
            
            const occupant = board.getPiece(newLocation);
            if(occupant instanceof Rook
                && occupant.player === this.player
                && !occupant.hasMoved) {
                return newLocation;
            } else if (occupant) {
                return;
            }
        }
    }

    checkCastle(boardLocation, board, moves, side) {
        const rookLocation = this.findRook(boardLocation, board, side);
        if(rookLocation) {
            moves.push(Square.at(boardLocation.row, boardLocation.col + side * 2));
        }
    }

    isKing() {
        return true;
    }
}
