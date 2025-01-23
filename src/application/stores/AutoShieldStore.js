import { defineStore } from "pinia";
import { AutoShieldRepositoryImpl } from "../../infrastructure/api/AutoShieldRepositoryImpl";

const repository = new AutoShieldRepositoryImpl();

export const useAutoShieldStore = defineStore("autoshield", {
    state: () => ({
        autoShields: [],
        selectedAutoShield: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchAutoShields() {
            this.loading = true;
            this.error = null;
            try {
                this.autoShields = await repository.fetchAutoShields();
            } catch (error) {
                this.error = "Failed to load auto shields.";
                console.error("AutoShield fetch error:", error);
            } finally {
                this.loading = false;
            }
        },

        async fetchAutoShieldBySerialNumber(serialNumber) {
            this.loading = true;
            this.error = null;
            try {
                this.selectedAutoShield = await repository.fetchBySerialNumber(serialNumber);
            } catch (error) {
                this.error = "Failed to load auto shield.";
                console.error("AutoShield fetch by serial number error:", error);
            } finally {
                this.loading = false;
            }
        },
    },
});
