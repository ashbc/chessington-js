import 'chai/register-should';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
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
});
