import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import King from '../../src/engine/pieces/king';
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
    });
});
