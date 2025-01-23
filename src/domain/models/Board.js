import BoardService from '../services/BoardService';

class Board {
    constructor({
        externalEquipment = null,
        family,
        hostname,
        labels = null,
        location = null,
        name,
        port,
        protocols = null,
        revision,
        serialNumber,
        status,
        connectionStatus = Board.CONNECTION_STATUS.DISCONNECTED
    }) {
        this.externalEquipment = externalEquipment;
        this.family = family;
        this.hostname = hostname;
        this.labels = labels;
        this.location = location;
        this.name = name;
        this.port = port;
        this.protocols = protocols;
        this.revision = revision;
        this.serialNumber = serialNumber;
        this.status = status;
        this.connectionStatus = connectionStatus;

        BoardService.processBoard(this);
    }

    static fromDB(data) {
        const board = new Board({
            externalEquipment: data.external_equipment,
            family: data.family,
            hostname: data.hostname,
            labels: data.labels,
            location: data.location,
            name: data.name,
            port: data.port,
            protocols: data.protocols,
            revision: data.revision,
            serialNumber: data.serial_number,
            status: data.status,
            connectionStatus: data.connection_status
        });

        return board;
    }

    toDB() {
        return {
            external_equipment: this.externalEquipment,
            family: this.family,
            hostname: this.hostname,
            labels: this.labels,
            location: this.location,
            name: this.name,
            port: this.port,
            protocols: this.protocols,
            revision: this.revision,
            serial_number: this.serialNumber,
            status: this.status,
            connection_status: this.connectionStatus
        };
    }

    isValid() {
        return (
            this.family &&
            this.hostname &&
            this.name &&
            this.port &&
            this.revision &&
            this.serialNumber &&
            this.status &&
            this.connectionStatus
        );
    }
}

Board.STATUS = {
    RESERVED: 'RESERVED',
    UNLOCKED: 'UNLOCKED',
};

Board.CONNECTION_STATUS = {
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED'
};

export default Board;
