class Setup {
    constructor({
        hostname,
        labels = null,
        protocol,
        rs = [],
        setupName,
        ts = [],
        status,
        connectionStatus = Setup.CONNECTION_STATUS.DISCONNECTED
    }) {
        this.hostname = hostname;
        this.labels = labels;
        this.protocol = protocol;
        this.rs = rs.map(r => ({
            family: r.family,
            hostname: r.hostname,
            name: r.name,
            port: r.port,
            revision: r.revision,
            serialNumber: r.serialNumber
        }));
        this.setupName = setupName;
        this.ts = ts.map(t => ({
            family: t.family,
            hostname: t.hostname,
            name: t.name,
            port: t.port,
            revision: t.revision,
            serialNumber: t.serialNumber
        }));
        this.status = status;
        this.connectionStatus = connectionStatus;
    }

    static fromDB(data) {
        return new Setup({
            hostname: data.hostname,
            labels: data.labels,
            protocol: data.protocol,
            rs: data.rs?.map(r => ({
                family: r.family,
                hostname: r.hostname,
                name: r.name,
                port: r.port,
                revision: r.revision,
                serialNumber: r.serial_number
            })) || [],
            setupName: data.setup_name,
            ts: data.ts?.map(t => ({
                family: t.family,
                hostname: t.hostname,
                name: t.name,
                port: t.port,
                revision: t.revision,
                serialNumber: t.serial_number
            })) || [],
            status: data.status,
            connectionStatus: data.connection_status
        });
    }

    toDB() {
        return {
            hostname: this.hostname,
            labels: this.labels,
            protocol: this.protocol,
            rs: this.rs.map(r => ({
                family: r.family,
                hostname: r.hostname,
                name: r.name,
                port: r.port,
                revision: r.revision,
                serial_number: r.serialNumber
            })),
            setup_name: this.setupName,
            ts: this.ts.map(t => ({
                family: t.family,
                hostname: t.hostname,
                name: t.name,
                port: t.port,
                revision: t.revision,
                serial_number: t.serialNumber
            })),
            status: this.status,
            connection_status: this.connectionStatus
        };
    }

    isValid() {
        return (
            this.hostname &&
            this.protocol &&
            this.setupName &&
            this.status &&
            this.connectionStatus &&
            this.rs.every(r =>
                r.family &&
                r.hostname &&
                r.name &&
                r.port &&
                r.revision &&
                r.serialNumber
            ) &&
            this.ts.every(t =>
                t.family &&
                t.hostname &&
                t.name &&
                t.port &&
                t.revision &&
                t.serialNumber
            )
        );
    }
}

Setup.STATUS = {
    LOCKED: 'LOCKED',
    UNLOCKED: 'UNLOCKED',
};

Setup.CONNECTION_STATUS = {
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED'
};

export default Setup;
