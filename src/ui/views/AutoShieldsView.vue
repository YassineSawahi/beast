<template>
    <div class="auto-shields">
        <div style="display: flex; flex-direction: column; gap: 20px">
            <div style="width: 100%">
                <DataTable v-model:filters="filters" :value="autoShieldStore.autoShields" :paginator="true" :rows="10"
                    dataKey="serialNumber" filterDisplay="row" :loading="loading" :globalFilterFields="filterFields"
                    emptyMessage="NO SHIELD FOUND">
                    <template #header>
                        <div class="flex justify-content-between">
                            <span class="text-xl">MCU DISPATCHER - Auto Shields</span>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                            </span>
                        </div>
                    </template>

                    <Column field="name" header="Shield name" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by shield" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="family" header="Shield family" :sortable="true" style="min-width: 12rem">
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

                    <Column field="port" header="Port" :sortable="true" style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.port.replace('/dev/', '') }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by port" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="status" header="Shield Status" :sortable="true" :showFilterMenu="false"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="['status-text', data.status === 'UNLOCKED' ? 'UNLOCKED' : 'LOCKED']">
                                {{ data.status }}
                            </span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <Dropdown v-model="filterModel.value" @change="filterCallback()"
                                :options="['LOCKED', 'UNLOCKED']" placeholder="Select Status" class="p-column-filter"
                                :showClear="true" />
                        </template>
                    </Column>

                    <Column field="target" header="Target" :sortable="true" style="min-width: 12rem">
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search by target" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="fixtures" header="Fixtures" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span>{{ data.fixtures?.join(', ') || 'No fixtures' }}</span>
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                                placeholder="Search fixtures" class="p-column-filter" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAutoShieldStore } from '@/application/stores/AutoShieldStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';

const autoShieldStore = useAutoShieldStore();
const loading = ref(false);

const filterFields = [
    'name', 'family', 'serialNumber', 'hostname', 'location',
    'connectionStatus', 'port', 'status', 'target', 'fixtures'
];

const filters = ref({
    global: { value: null, matchMode: 'contains' },
    name: { value: null, matchMode: 'contains' },
    family: { value: null, matchMode: 'contains' },
    serialNumber: { value: null, matchMode: 'contains' },
    hostname: { value: null, matchMode: 'contains' },
    location: { value: null, matchMode: 'contains' },
    connectionStatus: { value: null, matchMode: 'equals' },
    port: { value: null, matchMode: 'contains' },
    status: { value: null, matchMode: 'equals' },
    target: { value: null, matchMode: 'contains' },
    fixtures: { value: null, matchMode: 'contains' }
});

onMounted(async () => {
    try {
        loading.value = true;
        await autoShieldStore.fetchAutoShields();
    } catch (error) {
        console.error('Error loading auto shields:', error);
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