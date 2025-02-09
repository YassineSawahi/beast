import AutoShield from '../models/AutoShield';

class AutoShieldRepository {
    /**
     * Fetch all auto shields
     * @returns {Promise<AutoShield[]>}
     */
    async fetchAutoShields() {
        throw new Error('Method not implemented');
    }

    /**
     * Fetch a single auto shield by serial number
     * @param {string} serialNumber
     * @returns {Promise<AutoShield>}
     */
    async fetchBySerialNumber(serialNumber) {
        throw new Error('Method not implemented');
    }
}

export default AutoShieldRepository;