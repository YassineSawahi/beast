import { defineStore } from "pinia";
import BoardRepositoryImpl from "../../infrastructure/api/BoardRepositoryImpl";

const repository = new BoardRepositoryImpl();

export const useBoardStore = defineStore("board", {
    state: () => ({
        boards: [],
        selectedBoard: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchBoards() {
            this.loading = true;
            this.error = null;
            try {
                this.boards = await repository.fetchBoards();
            } catch (error) {
                this.error = "Failed to load boards.";
                console.error("Board fetch error:", error);
            } finally {
                this.loading = false;
            }
        },

        async fetchBoardBySerialNumber(serialNumber) {
            this.loading = true;
            this.error = null;
            try {
                this.selectedBoard = await repository.fetchBySerialNumber(serialNumber);
            } catch (error) {
                this.error = "Failed to load board.";
                console.error("Board fetch by serial number error:", error);
            } finally {
                this.loading = false;
            }
        },
    },
}); 