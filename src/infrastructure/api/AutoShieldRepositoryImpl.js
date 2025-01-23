const AutoShield = require("../../domain/models/AutoShield");
const axiosInstance = require("./axiosInstance");
const AutoShieldRepository = require("../../domain/repositories/AutoShieldRepository");

class AutoShieldRepositoryImpl extends AutoShieldRepository {
    async fetchAutoShields() {
        const response = await axiosInstance.get("/autoshields");
        return response.data.map(data => AutoShield.fromDB(data));
    }

    async fetchBySerialNumber(serialNumber) {
        const response = await axiosInstance.get(`/autoshields/${serialNumber}`);
        return AutoShield.fromDB(response.data);
    }
}

module.exports = AutoShieldRepositoryImpl;
