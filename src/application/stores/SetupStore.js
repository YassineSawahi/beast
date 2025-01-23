import { defineStore } from "pinia";
import SetupRepositoryImpl from "../../infrastructure/api/SetupRepositoryImpl";

const repository = new SetupRepositoryImpl();

export const useSetupStore = defineStore("setup", {
    state: () => ({
        setups: [],
        selectedSetup: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchSetups() {
            this.loading = true;
            this.error = null;
            try {
                this.setups = await repository.fetchSetups();
            } catch (error) {
                this.error = "Failed to load setups.";
                console.error("Setup fetch error:", error);
            } finally {
                this.loading = false;
            }
        },

        async fetchSetupBySerialNumber(serialNumber) {
            this.loading = true;
            this.error = null;
            try {
                this.selectedSetup = await repository.fetchBySerialNumber(serialNumber);
            } catch (error) {
                this.error = "Failed to load setup.";
                console.error("Setup fetch by serial number error:", error);
            } finally {
                this.loading = false;
            }
        },
    },
}); 