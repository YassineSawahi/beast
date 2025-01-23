import AutoShield from "../../domain/models/AutoShield";
import axiosInstance from "./axiosInstance";
import AutoShieldRepository from "../../domain/repositories/AutoShieldRepository";

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

export default AutoShieldRepositoryImpl;
