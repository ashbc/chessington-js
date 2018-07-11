import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();

        this.lastPieceMoved = undefined;
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }

    findPiece(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    // movePiece(fromSquare, toSquare) {
    //     const movingPiece = this.getPiece(fromSquare);
    //     if(!movingPiece || movingPiece.player !== this.currentPlayer) {
    //         throw new Error('movePiece called with an invalid move');
    //     }
    //     this.setPiece(toSquare, movingPiece);
    //     this.setPiece(fromSquare, undefined);

    // }

    promotePiece(square, pieceClass) {
        const player = this.getPiece(square).player;
        this.setPiece(square, new pieceClass(player));
    }

    isCheck(player) {
        return this.board.some(row => 
            row.some(piece =>
                piece.player !== player
                && piece.getAvailableMovesWithKing(this).some(square =>
                    this.getPiece(square) && this.getPiece(square).isKing()
                )
            )
        );
    }
}
