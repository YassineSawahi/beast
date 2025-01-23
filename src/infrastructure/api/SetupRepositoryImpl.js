const Setup = require("../../domain/models/Setup");
const axiosInstance = require("./axiosInstance");
const SetupRepository = require("../../domain/repositories/SetupRepository");

class SetupRepositoryImpl extends SetupRepository {
    async fetchSetups() {
        const response = await axiosInstance.get("/setups");
        return response.data.map(data => Setup.fromDB(data));
    }

    async fetchBySerialNumber(serialNumber) {
        const response = await axiosInstance.get(`/setups/${serialNumber}`);
        return Setup.fromDB(response.data);
    }
}

module.exports = SetupRepositoryImpl; 