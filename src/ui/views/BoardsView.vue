<template>
    <div class="boards">
        <!-- <div v-if="loading">
            <LoadingScreen />
        </div> -->
        <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="width: 100%">
                <DataTable :value="boards" :paginator="true" :rows="10" dataKey="serial_number" :filters="filters"
                    filterDisplay="row" :loading="loading"
                    :globalFilterFields="['name', 'family', 'serial_number', 'external_equipement_str', 'labels', 'hostname', 'location', 'port', 'status', 'connection_status']"
                    emptyMessage="NO BOARD FOUND" @filter="onFilter">
                    <template #header>
                        <span style="color: black; font-weight: bold; font-size: 18px">MCU DISPATCHER - Boards</span>
                    </template>

                    <Column field="name" header="Board name" :filter="true" filterPlaceholder="Search by board"
                        style="min-width: 12rem" filterField="name" />
                    <Column field="family" header="Board family" filterField="family" style="min-width: 12rem"
                        :filter="true" filterPlaceholder="Search by family" />
                    <Column field="serial_number" header="Serial Number" style="min-width: 12rem" :filter="true"
                        filterPlaceholder="Search by Serial number" />
                    <Column field="hostname" header="Host Name" style="min-width: 12rem" :filter="true"
                        filterPlaceholder="Search by Host Name" />
                    <Column field="location" header="Location" style="min-width: 12rem" :filter="true"
                        filterPlaceholder="Search by Location" />
                    <Column field="connection_status" header="Connection Status" style="min-width: 12rem" :filter="true"
                        filterPlaceholder="Search by Connection Status">
                        <template #body="{ data }">
                            <span
                                :class="['status-text', data.connection_status === 'Connected' ? 'connected' : 'disconnected']">
                                {{ data.connection_status }}
                            </span>
                        </template>
                    </Column>
                    <Column field="port" header="Port" style="min-width: 12rem" :filter="true"
                        filterPlaceholder="Search by Port">
                        <template #body="{ data }">
                            {{ data.port.replace('/dev/', '') }}
                        </template>
                    </Column>
                    <Column field="status" header="Board Status" style="min-width: 12rem" :filter="true"
                        filterPlaceholder="Search by Board Status">
                        <template #body="{ data }">
                            <span :class="['status-text', data.status === 'UNLOCKED' ? 'unlocked' : 'locked']">
                                {{ data.status }}
                            </span>
                        </template>
                    </Column>
                    <Column field="external_equipement_str" header="External Equipment" style="min-width: 12rem"
                        :filter="true" filterPlaceholder="Search by External Equipment">
                        <template #body="{ data }">
                            <ul v-if="isValidExternalEquipment(data.external_equipement)">
                                <li><strong>Name:</strong> {{ data.external_equipement[0].name }}</li>
                                <li><strong>Type:</strong> {{ data.external_equipement[0].type }}</li>
                                <li><strong>Fixtures:</strong> {{ data.external_equipement[0].fixtures.join(', ') }}
                                </li>
                                <li><strong>Serial Number:</strong> {{ data.external_equipement[0].serial_number }}</li>
                            </ul>
                            <span v-else>{{ data.external_equipement }}</span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useBoardStore } from '@/application/stores/BoardStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
//import LoadingScreen from '@/components/LoadingScreen.vue';

const boardStore = useBoardStore();
const loading = ref(false);

onMounted(async () => {
    await boardStore.fetchBoards();
    loading.value = false;
});

const filters = ref({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    family: { value: null, matchMode: 'contains' },
    revision: { value: null, matchMode: 'contains' },
    serial_number: { value: null, matchMode: 'contains' },
    external_equipement_str: { value: null, matchMode: 'contains' },
    labels: { value: null, matchMode: 'contains' },
    hostname: { value: null, matchMode: 'contains' },
    location: { value: null, matchMode: 'contains' },
    port: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'contains' },
    connection_status: { value: null, matchMode: 'contains' },
});

const boards = computed(() => {
    return boardStore.boards.map(board => {
        const processedBoard = { ...board };
        console.log("Booooard: ", board);

        if (typeof board.external_equipement === 'object' && board.external_equipement.length > 0) {
            processedBoard.external_equipement_str = board.external_equipement.map(eq =>
                `Name: ${eq.name}, Type: ${eq.type}, Fixtures: ${eq.fixtures.join(', ')}, Serial Number: ${eq.serial_number}`
            ).join('; ');
        } else {
            processedBoard.external_equipement_str = board.external_equipement;
        }

        return processedBoard;
    });
});

const isValidExternalEquipment = (equipment) => {
    return typeof equipment === 'object' && equipment.length > 0;
};

const onFilter = (event) => {
    filters.value = event.filters;
};
</script>

<style scoped>
.status-text {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: bold;
}

.connected {
    background-color: #c8e6c9;
    color: #256029;
}

.disconnected {
    background-color: #ffcdd2;
    color: #c63737;
}

.unlocked {
    background-color: #c8e6c9;
    color: #256029;
}

.locked {
    background-color: #ffcdd2;
    color: #c63737;
}
</style>