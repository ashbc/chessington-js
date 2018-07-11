import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import King from '../../src/engine/pieces/king';
import Rook from '../../src/engine/pieces/rook';
import Queen from '../../src/engine/pieces/queen';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';

describe('Board', () => {

    describe('pawns', () => {

        let board;
        beforeEach(() => { // Common code executed before each test.
            board = new Board();
        });

        it('can be added to the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(0, 0);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.getPiece(square).should.equal(pawn); // Object equality: same object reference
        });

        it('can be found on the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(6, 4);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.findPiece(pawn).should.eql(square); // Object equivalence: different objects, same data
        });

    });

    describe('check', () => {
        let board;
        beforeEach(() => { // Common code executed before each test.
            board = new Board();
        });

        it('is recognised', () => {
            const king = new King(Player.WHITE);
            const queen = new Queen(Player.BLACK);

            board.setPiece(Square.at(3, 3), king);
            board.setPiece(Square.at(3, 4), queen);

            board.isCheck(Player.WHITE).should.be.true;
        });

        it('is not incorrectly stated', () => {
            const king = new King(Player.WHITE);
            const queen = new Queen(Player.BLACK);

            board.setPiece(Square.at(3, 3), king);
            board.setPiece(Square.at(4, 5), queen);

            board.isCheck(Player.WHITE).should.be.false;
        });

        describe('moving into check', () => {
            it('king cannot move to a threatened square', () => {
                const king = new King(Player.WHITE);
                const rook = new Rook(Player.BLACK);

                board.setPiece(Square.at(0, 0), king);
                board.setPiece(Square.at(7, 1), rook);

                const moves = king.getAvailableMoves(board);

                moves.should.not.deep.include(Square.at(1, 1));
                moves.should.not.deep.include(Square.at(0, 1));
            });
            
            it('pieces cannot stop blocking the king', () => {
                const king = new King(Player.WHITE);
                const rook = new Rook(Player.BLACK);
                const pawn = new Pawn(Player.WHITE);

                board.setPiece(Square.at(1, 0), king);
                board.setPiece(Square.at(1, 2), pawn);
                board.setPiece(Square.at(1, 5), rook);

                const moves = pawn.getAvailableMoves(board);
                moves.should.not.deep.include(Square.at(2, 2));
            });
        });

        describe('leaving check', () => {
            it('players cannot remain in check', () => {
                const king = new King(Player.WHITE);
                const rook = new Rook(Player.BLACK);
                const pawn = new Pawn(Player.WHITE);

                board.setPiece(Square.at(0, 0), king);
                board.setPiece(Square.at(0, 1), rook);
                board.setPiece(Square.at(5, 7), pawn);

                const moves = pawn.getAvailableMoves(board);

                moves.should.be.empty;
            });

            it('players can leave check by blocking', () => {
                const king = new King(Player.WHITE);
                const rook = new Rook(Player.BLACK);
                const queen = new Queen(Player.WHITE);

                board.setPiece(Square.at(0, 0), king);
                board.setPiece(Square.at(0, 5), rook);
                board.setPiece(Square.at(2, 2), queen);

                const moves = queen.getAvailableMoves(board);

                moves.should.deep.include(Square.at(0, 2));
            });

            it('players can leave check by moving the king', () => {
                const king = new King(Player.WHITE);
                const rook = new Rook(Player.BLACK);
                board.setPiece(Square.at(0, 0), king);
                board.setPiece(Square.at(0, 1), rook);

                const moves = king.getAvailableMoves(board);

                moves.should.deep.include(Square.at(1, 0));
            });

            it('players can leave check by taking', () => {
                const king = new King(Player.WHITE);
                const rook = new Rook(Player.BLACK);
                board.setPiece(Square.at(0, 0), king);
                board.setPiece(Square.at(0, 1), rook);

                const moves = king.getAvailableMoves(board);

                moves.should.deep.include(Square.at(0, 1));
            });
        });
    });
});
