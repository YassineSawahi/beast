class BoardService {
    static updateBoardLocation(board) {
        const hostname = board.hostname;

        if (/tuncxd400[1-4]\.tue\.st\.com/.test(hostname)) {
            board.location = "ACTIA";
        }

        else if (hostname.startsWith('lmecxd')) {
            board.location = "LME";
        }

        else {
            board.location = null;
        }

        return board;
    }

    static processBoard(board) {
        this.updateBoardLocation(board);
        return board;
    }

    static processBoards(boards) {
        return boards.map(board => this.processBoard(board));
    }
}

export default BoardService;
