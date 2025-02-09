import Auth from "../../domain/models/Auth";
import AuthRepository from "../../domain/repositories/AuthRepository";
import axiosInstance from "./axiosInstance";

class AuthRepositoryImpl extends AuthRepository {
    async login(username, password) {
        const response = await axiosInstance.post("/login", {username, password});

        return response.data.token;
    }
}