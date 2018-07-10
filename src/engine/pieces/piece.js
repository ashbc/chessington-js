import GameSettings from '../gameSettings'
import Square from '../square'

export default class Piece {
    constructor(player) {
        this.player = player;
        this.hasMoved = false;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.hasMoved = true;
    }

    getLateral(boardLocation, board) {
        let moves = [];

        [[1, 0], [-1, 0], [0, 1], [0, -1]]
        .map(x => this.checkDirection(boardLocation, board, ...x))
        .forEach(x => moves = moves.concat(x));

        return moves;
       
    }

    checkDirection(boardLocation, board, rowOffset, colOffset) {
        const moves = [];
        for(let i = 1; i < GameSettings.BOARD_SIZE; i++) {
            const newLocation = Square.at(
                boardLocation.row + rowOffset * i,
                boardLocation.col + colOffset * i
            );

            if(!newLocation.isOnBoard()) break;
            const occupant = board.getPiece(newLocation);
            if(!occupant) {
                moves.push(newLocation);
            } else if(this.player !== occupant.player) {
                moves.push(newLocation);
                break;
            } else {
                break;
            }
        }
        return moves;
    }

    getDiagonal(boardLocation) {
        let moves = [];
        for(let i = 1; i<GameSettings.BOARD_SIZE; i++) {
            moves = moves.concat(this.createSquares(boardLocation, 
                [[i, i], [-i, i], [i, -i], [-i, -i]]));
        }
        return moves;
    }

    createSquares(boardLocation, offsets) {
        return offsets
            .map(space => Square.at(boardLocation.row + space[0], boardLocation.col + space[1]))
            .filter(square => square.isOnBoard());
    }
}
