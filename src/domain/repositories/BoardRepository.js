import Board from '../models/Board';


class BoardRepository {
    /**
     * Fetch all boards
     * @returns {Promise<Board[]>}
     */
    async fetchBoards() {
        throw new Error('Method not implemented');
    }

    /**
     * Fetch a single board by serial number
     * @param {string} serialNumber - Board serial number
     * @returns {Promise<Board>}
     */
    async fetchBySerialNumber(serialNumber) {
        throw new Error('Method not implemented');
    }
}

export default BoardRepository;