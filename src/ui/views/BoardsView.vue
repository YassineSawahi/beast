<template>
    <div class="boards">
        <!-- <div v-if="loading">
            <LoadingScreen />
        </div> -->
        <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="width: 100%">
                <DataTable :value="processedBoards" :paginator="true" :rows="10" dataKey="serial_number"
                    :filters="filters" filterDisplay="row" :loading="loading" :globalFilterFields="filterFields"
                    emptyMessage="NO BOARD FOUND">
                    <template #header>
                        <span class="text-xl">MCU DISPATCHER - Boards</span>
                    </template>

                    <Column field="name" header="Board name" :sortable="true" :filter="true" style="min-width: 12rem">
                        <template #filter>
                            <InputText type="text" v-model="filters.name.value" class="p-column-filter"
                                placeholder="Search by board" />
                        </template>
                    </Column>

                    <Column field="family" header="Board family" :sortable="true" :filter="true"
                        style="min-width: 12rem">
                        <template #filter>
                            <InputText type="text" v-model="filters.family.value" class="p-column-filter"
                                placeholder="Search by family" />
                        </template>
                    </Column>

                    <Column field="serial_number" header="Serial Number" :sortable="true" :filter="true"
                        style="min-width: 12rem">
                        <template #filter>
                            <InputText type="text" v-model="filters.serial_number.value" class="p-column-filter"
                                placeholder="Search by serial" />
                        </template>
                    </Column>

                    <Column field="hostname" header="Host Name" :sortable="true" :filter="true" style="min-width: 12rem"
                        filterField="hostname">
                        <template #filter>
                            <InputText type="text" v-model="filters.hostname.value" class="p-column-filter"
                                placeholder="Search by hostname" />
                        </template>
                    </Column>

                    <Column field="location" header="Location" :sortable="true" :filter="true" style="min-width: 12rem"
                        filterField="location">
                        <template #filter>
                            <InputText type="text" v-model="filters.location.value" class="p-column-filter"
                                placeholder="Search by location" />
                        </template>
                    </Column>

                    <Column field="connection_status" header="Connection Status" :sortable="true" :filter="true"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <span
                                :class="['status-text', data.connection_status === 'CONNECTED' ? 'connected' : 'disconnected']">
                                {{ data.connection_status }}
                            </span>
                        </template>
                        <template #filter>
                            <Dropdown v-model="filters.connection_status.value" :options="['CONNECTED', 'DISCONNECTED']"
                                placeholder="Select Status" class="p-column-filter" :showClear="true" />
                        </template>
                    </Column>

                    <Column field="port" header="Port" :sortable="true" :filter="true"
                        filterPlaceholder="Search by port" style="min-width: 12rem" filterField="port"
                        @filter-apply-click="onFilterChange">
                        <template #body="{ data }">
                            {{ data.port.replace('/dev/', '') }}
                        </template>
                    </Column>

                    <Column field="status" header="Board Status" :sortable="true" :filter="true" filterField="status"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="['status-text', data.status === 'UNLOCKED' ? 'unlocked' : 'locked']">
                                {{ data.status }}
                            </span>
                        </template>
                        <template #filter>
                            <Dropdown v-model="filters.status.value" :options="['RESERVED', 'UNLOCKED']"
                                placeholder="Select Status" class="p-column-filter" :showClear="true"
                                @change="onFilterChange($event, 'status')" />
                        </template>
                    </Column>

                    <Column field="external_equipement_str" header="External Equipment" :filter="true"
                        filterPlaceholder="Search equipment" style="min-width: 12rem"
                        filterField="external_equipement_str" @filter-apply-click="onFilterChange">
                        <template #body="{ data }">
                            <ul v-if="isValidExternalEquipment(data.external_equipement)" class="equipment-list">
                                <li v-for="(eq, index) in data.external_equipement" :key="index">
                                    <div><strong>Name:</strong> {{ eq.name }}</div>
                                    <div><strong>Type:</strong> {{ eq.type }}</div>
                                    <div><strong>Fixtures:</strong> {{ eq.fixtures.join(', ') }}</div>
                                    <div><strong>Serial Number:</strong> {{ eq.serial_number }}</div>
                                </li>
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
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
//import LoadingScreen from '@/components/LoadingScreen.vue';

const boardStore = useBoardStore();
const loading = ref(false);

const filterFields = [
    'name', 'family', 'serial_number', 'external_equipement_str',
    'labels', 'hostname', 'location', 'port', 'status', 'connection_status'
];

const filters = ref({
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
    connection_status: { value: null, matchMode: 'equals' },
});

const processedBoards = computed(() => {
    if (!boardStore.boards) return [];
    return boardStore.boards.map(board => ({
        ...board,
        external_equipement_str: processExternalEquipment(board.external_equipement)
    }));
});

function processExternalEquipment(equipment) {
    if (!equipment) return '';
    if (typeof equipment === 'object' && equipment?.length > 0) {
        return equipment.map(eq =>
            `Name: ${eq.name}, Type: ${eq.type}, Fixtures: ${eq.fixtures?.join(', ')}, Serial Number: ${eq.serial_number}`
        ).join('; ');
    }
    return String(equipment);
}

const isValidExternalEquipment = (equipment) => {
    return Array.isArray(equipment) && equipment.length > 0;
};

onMounted(async () => {
    try {
        loading.value = true;
        await boardStore.fetchBoards();
    } catch (error) {
        console.error('Error loading boards:', error);
    } finally {
        loading.value = false;
    }
});
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

.equipment-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.equipment-list li {
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 4px;
}

.equipment-list li:last-child {
    margin-bottom: 0;
}

:deep(.p-column-filter) {
    width: 100%;
    padding: 0.5rem;
}

:deep(.p-inputtext) {
    width: 100%;
}

:deep(.p-dropdown) {
    width: 100%;
}

:deep(.p-datatable-header) {
    padding: 1rem;
}
</style>