<template>
    <div class="boards">
        <!-- <div v-if="loading">
            <LoadingScreen />
        </div> -->
        <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="width: 100%">
                <DataTable v-model:filters="filters" :value="processedBoards" :paginator="true" :rows="10"
                    dataKey="serial_number" filterDisplay="row" :loading="loading" :globalFilterFields="filterFields"
                    emptyMessage="NO BOARD FOUND">
                    <template #header>
                        <div class="flex justify-content-between">
                            <span class="text-xl">MCU DISPATCHER - Boards</span>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </span>
                        </div>
                    </template>

                    <Column field="name" header="Board name" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by board" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="family" header="Board family" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by family" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="serialNumber" header="Serial Number" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by serial" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="hostname" header="Host Name" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by hostname" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="location" header="Location" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by location" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="connection_status" header="Connection Status" :sortable="true"
                        :showFilterMenu="false" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span
                                :class="['status-text', data.connection_status === 'CONNECTED' ? 'connected' : 'disconnected']">
                                {{ data.connection_status }}
                            </span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <Dropdown v-model="filterModel.value" @change="filterCallback()"
                                :options="['CONNECTED', 'DISCONNECTED']" placeholder="Select Status"
                                class="p-column-filter" :showClear="true" />
                        </template>
                    </Column>

                    <Column field="port" header="Port" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.port.replace('/dev/', '') }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by port" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="status" header="Board Status" :sortable="true" :showFilterMenu="false"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="['status-text', data.status === 'UNLOCKED' ? 'unlocked' : 'locked']">
                                {{ data.status }}
                            </span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <Dropdown v-model="filterModel.value" @change="filterCallback()"
                                :options="['RESERVED', 'UNLOCKED']" placeholder="Select Status" class="p-column-filter"
                                :showClear="true" />
                        </template>
                    </Column>

                    <Column field="external_equipement_str" header="External Equipment" style="min-width: 12rem">
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
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search equipment" class="p-column-filter" />
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
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    family: { value: null, matchMode: 'contains' },
    serial_number: { value: null, matchMode: 'contains' },
    hostname: { value: null, matchMode: 'contains' },
    location: { value: null, matchMode: 'contains' },
    connection_status: { value: null, matchMode: 'contains' },
    port: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'contains' },
    external_equipement_str: { value: null, matchMode: 'contains' }
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
}

:deep(.p-input-icon-left) {
    width: 300px;
}

:deep(.p-input-icon-left > i) {
    left: 0.75rem;
    color: #6c757d;
}

:deep(.p-input-icon-left > .p-inputtext) {
    padding-left: 2.5rem;
}

:deep(.flex.justify-content-between) {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>