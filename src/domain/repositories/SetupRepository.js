import Setup from '../models/Setup';

class SetupRepository {
    /**
     * Fetch all setups
     * @returns {Promise<Setup[]>}
     */
    async fetchSetups() {
        throw new Error('Method not implemented');
    }

    /**
     * Fetch a single setup by serial number
     * @param {string} serialNumber - Setup serial number
     * @returns {Promise<Setup>}
     */
    async fetchBySerialNumber(serialNumber) {
        throw new Error('Method not implemented');
    }
}

export default SetupRepository; 