import 'chai/register-should';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import assertTake from '../assert_take';

describe('Pawn', () => {

    let board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {
        
        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });


        it('can take opposing pieces diagonally', () => {
            assertTake(board, Pawn, Square.at(4,4), Player.WHITE,
                          Pawn, Square.at(5, 5), Player.BLACK, true);
        });

        it('cannot take friendly pieces diagonally', () => {
            assertTake(board, Pawn, Square.at(4,4), Player.WHITE,
                          Pawn, Square.at(5, 5), Player.WHITE, false);
        });
        
        it('cannot take king diagonally', () => {
            assertTake(board, Pawn, Square.at(4,4), Player.WHITE,
                              King, Square.at(5, 5), Player.BLACK, false);
        });

        it('can en-passant', () => {
            const pawn1 = new Pawn(Player.WHITE);
            const pawn2 = new Pawn(Player.BLACK);

            board.currentPlayer = Player.BLACK;

            board.setPiece(Square.at(4, 0), pawn1);
            board.setPiece(Square.at(6, 1), pawn2);

            pawn2.moveTo(board, Square.at(4, 1));
            console.log(board.findPiece(pawn2));

            pawn1.getAvailableMoves(board).should.deep.include(Square.at(5, 1));
        });

        it('take with en-passant', () => {
            const pawn1 = new Pawn(Player.WHITE);
            const pawn2 = new Pawn(Player.BLACK);

            board.setPiece(Square.at(4, 0), pawn1);
            board.setPiece(Square.at(6, 1), pawn2);

            board.currentPlayer = Player.BLACK;

            pawn2.moveTo(board, Square.at(4, 1));
            pawn1.moveTo(board, Square.at(5, 1));
            should.not.exist(board.getPiece(Square.at(4, 1)));
        });

        it('cannot wait before en-passant', () => {
            const pawn1 = new Pawn(Player.WHITE);
            const pawn2 = new Pawn(Player.BLACK);
            const pawn3 = new Pawn(Player.WHITE);
            const pawn4 = new Pawn(Player.BLACK);

            board.setPiece(Square.at(4, 0), pawn1);
            board.setPiece(Square.at(6, 1), pawn2);
            board.setPiece(Square.at(1, 6), pawn3);
            board.setPiece(Square.at(6, 6), pawn4);

            board.currentPlayer = Player.BLACK;

            pawn2.moveTo(board, Square.at(4, 1));
            pawn3.moveTo(board, Square.at(2, 6));
            pawn4.moveTo(board, Square.at(5, 6));
            
            const moves = pawn1.getAvailableMoves(board)
            moves.should.not.deep.include(Square.at(5, 1));

        });
    });

    describe('black pawns', () => {

        let board;
        beforeEach(() => board = new Board(Player.BLACK));    
        
        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });


        it('can take opposing pieces diagonally', () => {
            assertTake(board, Pawn, Square.at(4,4), Player.BLACK,
                          Pawn, Square.at(3, 5), Player.WHITE, true);
        });

        it('cannot take friendly pieces diagonally', () => {
            assertTake(board, Pawn, Square.at(4,4), Player.BLACK,
                          Pawn, Square.at(3, 5), Player.BLACK, false);
        });

        it('cannot take king', () => {
            assertTake(board, Pawn, Square.at(4,4), Player.BLACK,
                          King, Square.at(3, 5), Player.WHITE, false);
        });

        it('can en-passant', () => {
            const pawn1 = new Pawn(Player.BLACK);
            const pawn2 = new Pawn(Player.WHITE);

            board.currentPlayer = Player.WHITE;

            board.setPiece(Square.at(3, 0), pawn1);
            board.setPiece(Square.at(1, 1), pawn2);

            pawn2.moveTo(board, Square.at(3, 1));

            pawn1.getAvailableMoves(board).should.deep.include(Square.at(2, 1));
        });

        it('take with en-passant', () => {
            const pawn1 = new Pawn(Player.BLACK);
            const pawn2 = new Pawn(Player.WHITE);

            board.currentPlayer = Player.WHITE;

            board.setPiece(Square.at(3, 0), pawn1);
            board.setPiece(Square.at(1, 1), pawn2);


            pawn2.moveTo(board, Square.at(3, 1));

            should.exist(board.getPiece(Square.at(3, 1)));
            pawn1.moveTo(board, Square.at(2, 1));
            should.not.exist(board.getPiece(Square.at(3, 1)));
        });

        it('cannot wait before en-passant', () => {
            const pawn1 = new Pawn(Player.BLACK);
            const pawn2 = new Pawn(Player.WHITE);
            const pawn3 = new Pawn(Player.BLACK);
            const pawn4 = new Pawn(Player.WHITE);

            board.currentPlayer = Player.WHITE;

            board.setPiece(Square.at(3, 0), pawn1);
            board.setPiece(Square.at(1, 1), pawn2);
            board.setPiece(Square.at(6, 6), pawn3);
            board.setPiece(Square.at(1, 6), pawn4);

            pawn2.moveTo(board, Square.at(3, 1));
            pawn3.moveTo(board, Square.at(5, 6));
            pawn4.moveTo(board, Square.at(2, 6));

            const moves = pawn1.getAvailableMoves(board);
            moves.should.not.deep.include(Square.at(2, 1));
        });
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });

});
