const Board = require("../../domain/models/Board");
const axiosInstance = require("./axiosInstance");
const BoardRepository = require("../../domain/repositories/BoardRepository");

class BoardRepositoryImpl extends BoardRepository {
    async fetchBoards() {
        const response = await axiosInstance.get("/boards");
        return response.data.map(data => Board.fromDB(data));
    }

    async fetchBySerialNumber(serialNumber) {
        const response = await axiosInstance.get(`/boards/${serialNumber}`);
        return Board.fromDB(response.data);
    }
}

module.exports = BoardRepositoryImpl; 