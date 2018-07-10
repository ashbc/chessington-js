import 'chai/register-should';

export default function assertTake(board, pieceType, piecePosition, piecePlayer, otherType, otherPosition, otherPlayer, successExpected) {
	const piece = new pieceType(piecePlayer);
    const other = new otherType(otherPlayer);
    board.setPiece(piecePosition, piece);
    board.setPiece(otherPosition, other);

    const moves = piece.getAvailableMoves(board);

    if (successExpected) {
    	moves.should.deep.include(otherPosition);
    } else {
    	moves.should.not.deep.include(otherPosition);
    }
}
