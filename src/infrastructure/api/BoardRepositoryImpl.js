import Board from "../../domain/models/Board";
import axiosInstance from "./axiosInstance";
import BoardRepository from "../../domain/repositories/BoardRepository";

class BoardRepositoryImpl extends BoardRepository {
    async fetchBoards() {
        const response = await axiosInstance.get("/boards");

        if (!response.data || !Array.isArray(response.data.data)) {
            console.error('Unexpected API response format:', response);
            return [];
        }

        return response.data.data.map(data => Board.fromDB(data));
    }

    async fetchBySerialNumber(serialNumber) {
        const response = await axiosInstance.get(`/boards/${serialNumber}`);

        if (!response.data.data) {
            console.error('No data received for serial number:', serialNumber);
            return null;
        }

        return Board.fromDB(response.data.data);
    }
}

export default BoardRepositoryImpl; 