class AutoShieldService {
    static updateShieldLocation(shield) {
        const hostname = shield.hostname;

        if (/tuncxd400[1-4]\.tue\.st\.com/.test(hostname)) {
            shield.location = "ACTIA";
        }
        else if (hostname.startsWith('lmecxd')) {
            shield.location = "LME";
        }
        else {
            shield.location = null;
        }

        return shield;
    }

    static processShield(shield) {
        this.updateShieldLocation(shield);
        return shield;
    }

    static processShields(shields) {
        return shields.map(shield => this.processShield(shield));
    }
}

export default AutoShieldService;