import AutoShield from "../../domain/models/AutoShield";
import axiosInstance from "./axiosInstance";
import AutoShieldRepository from "../../domain/repositories/AutoShieldRepository";

class AutoShieldRepositoryImpl extends AutoShieldRepository {
    async fetchAutoShields() {
        const response = await axiosInstance.get("/autoshields");

        if (!response.data || !Array.isArray(response.data.data)) {
            console.error('Unexpected API response format:', response);
            return [];
        }

        return response.data.data.map(data => AutoShield.fromDB(data));
    }

    async fetchBySerialNumber(serialNumber) {
        const response = await axiosInstance.get(`/autoshields/${serialNumber}`);

        if (!response.data.data) {
            console.error('No data received for serial number:', serialNumber);
            return null;
        }

        return AutoShield.fromDB(response.data);
    }
}

export default AutoShieldRepositoryImpl;
