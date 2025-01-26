<template>
    <div class="setups">
        <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="width: 100%">
                <DataTable v-model:filters="filters" :value="setupStore.setups" :paginator="true" :rows="10"
                    dataKey="setupName" filterDisplay="row" :loading="loading" :globalFilterFields="filterFields"
                    emptyMessage="NO SETUP FOUND">
                    <template #header>
                        <div class="flex justify-content-between">
                            <span class="text-xl">MCU DISPATCHER - Setups</span>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </span>
                        </div>
                    </template>

                    <Column field="setupName" header="Setup Name" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by name" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="hostname" header="Host Name" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by hostname" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="protocol" header="Protocol" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by protocol" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="connectionStatus" header="Connection Status" :sortable="true" :showFilterMenu="false"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <span
                                :class="['status-text', data.connectionStatus === 'CONNECTED' ? 'connected' : 'disconnected']">
                                {{ data.connectionStatus }}
                            </span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <Dropdown v-model="filterModel.value" @change="filterCallback()"
                                :options="['CONNECTED', 'DISCONNECTED']" placeholder="Select Status"
                                class="p-column-filter" :showClear="true" />
                        </template>
                    </Column>

                    <Column field="status" header="Setup Status" :sortable="true" :showFilterMenu="false"
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

                    <Column field="rs" header="RS Boards" style="min-width: 12rem">
                        <template #body="{ data }">
                            <ul v-if="data.rs?.length" class="board-list">
                                <li v-for="(board, index) in data.rs" :key="index">
                                    <div><strong>Name:</strong> {{ board.name }}</div>
                                    <div><strong>Family:</strong> {{ board.family }}</div>
                                    <div><strong>Serial Number:</strong> {{ board.serialNumber }}</div>
                                    <div><strong>Port:</strong> {{ board.port.replace('/dev/', '') }}</div>
                                    <div><strong>Revision:</strong> {{ board.revision }}</div>
                                </li>
                            </ul>
                            <span v-else>No RS boards</span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search RS boards" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="ts" header="TS Boards" style="min-width: 12rem">
                        <template #body="{ data }">
                            <ul v-if="data.ts?.length" class="board-list">
                                <li v-for="(board, index) in data.ts" :key="index">
                                    <div><strong>Name:</strong> {{ board.name }}</div>
                                    <div><strong>Family:</strong> {{ board.family }}</div>
                                    <div><strong>Serial Number:</strong> {{ board.serialNumber }}</div>
                                    <div><strong>Port:</strong> {{ board.port.replace('/dev/', '') }}</div>
                                    <div><strong>Revision:</strong> {{ board.revision }}</div>
                                </li>
                            </ul>
                            <span v-else>No TS boards</span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search TS boards" class="p-column-filter" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSetupStore } from '@/application/stores/SetupStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

const setupStore = useSetupStore();
const loading = ref(false);

const filterFields = [
    'setupName', 'hostname', 'protocol', 'connectionStatus', 'status',
    'rs', 'ts'
];

const filters = ref({
    global: { value: null, matchMode: 'contains' },
    setupName: { value: null, matchMode: 'contains' },
    hostname: { value: null, matchMode: 'contains' },
    protocol: { value: null, matchMode: 'contains' },
    connectionStatus: { value: null, matchMode: 'equals' },
    status: { value: null, matchMode: 'equals' },
    rs: { value: null, matchMode: 'contains' },
    ts: { value: null, matchMode: 'contains' }
});

onMounted(async () => {
    try {
        loading.value = true;
        await setupStore.fetchSetups();
    } catch (error) {
        console.error('Error loading setups:', error);
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

.board-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.board-list li {
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 4px;
}

.board-list li:last-child {
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