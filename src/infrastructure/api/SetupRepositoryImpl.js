import Setup from "../../domain/models/Setup";
import axiosInstance from "./axiosInstance";
import SetupRepository from "../../domain/repositories/SetupRepository";

class SetupRepositoryImpl extends SetupRepository {
    async fetchSetups() {
        const response = await axiosInstance.get("/board/setup");

        if (!response.data || !Array.isArray(response.data)) {
            console.error('Unexpected API response format:', response);
            return [];
        }

        return response.data.map(data => Setup.fromDB(data));
    }

    async fetchBySerialNumber(serialNumber) {
        const response = await axiosInstance.get(`/setups/${serialNumber}`);

        if (!response.data.data) {
            console.error('No data received for serial number:', serialNumber);
            return null;
        }

        return Setup.fromDB(response.data.data);
    }
}

export default SetupRepositoryImpl;