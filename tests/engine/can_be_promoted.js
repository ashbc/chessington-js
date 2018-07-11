import 'chai/register-should';

export default function canBePromoted(board, pieceType, piecePlayer, piecePosition, successExpected) {
	const piece = new pieceType(piecePlayer);
    board.setPiece(piecePosition, piece);

    const canPromote = piece.canBePromoted(board);

    canPromote.should.equal(successExpected);
}
