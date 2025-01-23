class AutoShield {
    constructor({
        family,
        fixtures = null,
        hostname,
        labels = [],
        location = null,
        name,
        port,
        serialNumber,
        status,
        target,
        connectionStatus = AutoShield.CONNECTION_STATUS.DISCONNECTED
    }) {
        this.family = family;
        this.fixtures = fixtures;
        this.hostname = hostname;
        this.labels = labels;
        this.location = location;
        this.name = name;
        this.port = port;
        this.serialNumber = serialNumber;
        this.status = status;
        this.target = target;
        this.connectionStatus = connectionStatus;
    }

    static fromDB(data) {
        return new AutoShield({
            family: data.family,
            fixtures: data.fixtures,
            hostname: data.hostname,
            labels: data.labels,
            location: data.location,
            name: data.name,
            port: data.port,
            serialNumber: data.serial_number,
            status: data.status,
            target: data.target,
            connectionStatus: data.connection_status
        });
    }

    toDB() {
        return {
            family: this.family,
            fixtures: this.fixtures,
            hostname: this.hostname,
            labels: this.labels,
            location: this.location,
            name: this.name,
            port: this.port,
            serial_number: this.serialNumber,
            status: this.status,
            target: this.target,
            connection_status: this.connectionStatus
        };
    }

    isValid() {
        return (
            this.family &&
            this.hostname &&
            this.name &&
            this.port &&
            this.serialNumber &&
            this.status &&
            this.target &&
            this.connectionStatus
        );
    }
}

AutoShield.STATUS = {
    RESERVED: 'RESERVED',
    UNLOCKED: 'UNLOCKED',
};

AutoShield.CONNECTION_STATUS = {
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED'
};

module.exports = AutoShield;