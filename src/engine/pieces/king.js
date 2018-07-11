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
        const didCastle = Math.abs(movedBy) === 2;
        let castleRookLocation;
        let castleRook;
        let castleRookNewLocation;
        if(didCastle) {
            const side = Math.sign(movedBy);
            castleRookLocation = this.findRook(fromSquare, board, side);
            castleRookNewLocation = Square.at(fromSquare.row, fromSquare.col + side);
            castleRook = board.getPiece(castleRookLocation);

            board.setPiece(castleRookNewLocation, castleRook);
            board.setPiece(castleRookLocation, undefined);
        }
        const undoData = super.simulateMoveTo(board, newSquare);

        if(didCastle) {
            undoData.push({
                square: castleRookLocation,
                piece: castleRook
            });
            undoData.push({
                square: castleRookNewLocation,
                piece: undefined
            });
        }

        return undoData;
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
