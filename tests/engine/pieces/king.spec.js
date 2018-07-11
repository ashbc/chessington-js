import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import Knight from '../../../src/engine/pieces/knight';
import assertTake from '../assert_take';

describe('King', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.deep.have.members(expectedMoves);
    });

    it('can take opposing pieces laterally', () => {
        assertTake(board, King, Square.at(4,4), Player.WHITE,
                          Pawn, Square.at(4,5), Player.BLACK, true);

    });

    it('cannot take friendly pieces laterally', () => {
        assertTake(board, King, Square.at(4,4), Player.WHITE,
                          Pawn, Square.at(4,5), Player.WHITE, false);
    });


    it('can take opposing pieces diagonally', () => {
        assertTake(board, King, Square.at(4,4), Player.WHITE,
                          Pawn, Square.at(5,5), Player.BLACK, true);
    });

    it('cannot take friendly pieces diagonally', () => {
        assertTake(board, King, Square.at(4,4), Player.WHITE,
                          Pawn, Square.at(5,5), Player.WHITE, false);
    });

    it('cannot take king laterally', () => {
        assertTake(board, King, Square.at(4,4), Player.WHITE,
                          King, Square.at(4,5), Player.BLACK, false);
    });

    it('cannot take king diagonally', () => {
        assertTake(board, King, Square.at(4,4), Player.WHITE,
                          King, Square.at(5,5), Player.BLACK, false);
    });

    it('can castle on left side', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);

        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0, 2));

    });

    it('moves rook when castling on left side', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);

        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);

        king.moveTo(board, Square.at(0, 2));

        should.not.exist(board.getPiece(Square.at(0, 0)));
        board.findPiece(rook).should.deep.equal(Square.at(0, 3));
    });


    it('can castle on right side', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);

        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 7), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0, 6));
    });

    it('moves rook when castling on right side', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);

        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 7), rook);

        king.moveTo(board, Square.at(0, 6));

        should.not.exist(board.getPiece(Square.at(0, 7)));
        board.findPiece(rook).should.deep.equal(Square.at(0, 5));
    });


    it('cannot castle if king has moved', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);

        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);

        king.hasMoved = true;

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 2));
    });

    it('cannot castle if rook has moved', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);

        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);

        rook.hasMoved = true;

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 2));
    });

    it('cannot castle if pieces in way', () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        const knight = new Knight(Player.WHITE);

        board.setPiece(Square.at(0, 4), king);
        board.setPiece(Square.at(0, 0), rook);
        board.setPiece(Square.at(0, 1), knight);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 2));
    });
});
