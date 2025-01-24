<template>
    <div class="boards">
        <!-- <div v-if="loading">
            <LoadingScreen />
        </div> -->
        <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="width: 100%">
                <DataTable :value="processedBoards" :paginator="true" :rows="10" dataKey="serialNumber"
                    :filters="filters" filterDisplay="row" :loading="loading" emptyMessage="NO BOARD FOUND">
                    <template #header>
                        <span class="text-xl">MCU DISPATCHER - Boards</span>
                    </template>

                    <Column field="name" header="Board name" :sortable="true" :filter="true"
                        filterPlaceholder="Search by name" filterField="name" style="min-width: 12rem" />

                    <Column field="family" header="Board family" :sortable="true" :filter="true"
                        filterPlaceholder="Search by family" style="min-width: 12rem" />

                    <Column field="serialNumber" header="Serial Number" :sortable="true" :filter="true"
                        filterPlaceholder="Search by serial" style="min-width: 12rem" />

                    <Column field="hostname" header="Host Name" :sortable="true" :filter="true"
                        filterPlaceholder="Search by hostname" style="min-width: 12rem" />

                    <Column field="location" header="Location" :sortable="true" :filter="true"
                        filterPlaceholder="Search by location" style="min-width: 12rem" />

                    <Column field="connectionStatus" header="Connection Status" :sortable="true" :filter="true"
                        filterElement="dropdown" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span
                                :class="['status-text', data.connectionStatus === 'CONNECTED' ? 'connected' : 'disconnected']">
                                {{ data.connectionStatus }}
                            </span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="['CONNECTED', 'DISCONNECTED']"
                                placeholder="Select Status" class="p-column-filter" :showClear="true" />
                        </template>
                    </Column>

                    <Column field="port" header="Port" :sortable="true" :filter="true"
                        filterPlaceholder="Search by port" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.port.replace('/dev/', '') }}
                        </template>
                    </Column>

                    <Column field="status" header="Board Status" :sortable="true" :filter="true"
                        filterElement="dropdown" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="['status-text', data.status === 'UNLOCKED' ? 'unlocked' : 'locked']">
                                {{ data.status }}
                            </span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="['RESERVED', 'UNLOCKED']"
                                placeholder="Select Status" class="p-column-filter" :showClear="true" />
                        </template>
                    </Column>

                    <Column field="externalEquipment" header="External Equipment" :filter="true"
                        filterPlaceholder="Search equipment" style="min-width: 12rem">
                        <template #body="{ data }">
                            <ul v-if="isValidExternalEquipment(data.externalEquipment)" class="equipment-list">
                                <li v-for="(eq, index) in data.externalEquipment" :key="index">
                                    <div><strong>Name:</strong> {{ eq.name }}</div>
                                    <div><strong>Type:</strong> {{ eq.type }}</div>
                                    <div><strong>Fixtures:</strong> {{ eq.fixtures.join(', ') }}</div>
                                    <div><strong>Serial Number:</strong> {{ eq.serialNumber }}</div>
                                </li>
                            </ul>
                            <span v-else>No equipment</span>
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
//import LoadingScreen from '@/components/LoadingScreen.vue';

const boardStore = useBoardStore();
const loading = ref(false);

const filters = ref({
    name: { value: null, matchMode: 'contains' },
    family: { value: null, matchMode: 'contains' },
    serialNumber: { value: null, matchMode: 'contains' },
    hostname: { value: null, matchMode: 'contains' },
    location: { value: null, matchMode: 'contains' },
    connectionStatus: { value: null, matchMode: 'equals' },
    port: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'equals' },
    externalEquipment: { value: null, matchMode: 'contains' }
});

const processedBoards = computed(() => {
    if (!boardStore.boards) return [];
    return boardStore.boards;
});

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

:deep(.p-dropdown) {
    width: 100%;
}

:deep(.p-datatable-header) {
    padding: 1rem;
}
</style>