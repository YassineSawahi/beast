<template>
  <div class="boards-container">
    <div class="boards">
      <div class="table-wrapper">
        <DataTable v-model:filters="filters" :value="boardStore.boards" :paginator="true" :rows="10"
          dataKey="serial_number" filterDisplay="row" :loading="loading" :globalFilterFields="filterFields"
          emptyMessage="NO BOARD FOUND">
          <template #header>
            <div class="flex justify-content-between">
              <div style="display: flex; gap: 16px; align-items: center">
                <Button icon="pi pi-arrow-left" severity="secondary" @click="router.go(-1)" />
                <span class="text-xl" style="font-weight: bold; font-size: 24px">MCU DISPATCHER - Boards</span>
              </div>
              <span class="p-input-icon-left">
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </span>
            </div>
          </template>

          <Column field="name" header="Board name" :sortable="true" style="min-width: 17rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Search by board" class="p-column-filter" />
            </template>
          </Column>

          <Column field="family" header="Board family" :sortable="true" style="min-width: 17rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Search by family" class="p-column-filter" />
            </template>
          </Column>

          <Column field="serialNumber" header="Serial Number" :sortable="true" style="min-width: 17rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Search by serial" class="p-column-filter" />
            </template>
          </Column>

          <Column field="hostname" header="Host Name" :sortable="true" style="min-width: 17rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Search by hostname" class="p-column-filter" />
            </template>
          </Column>

          <Column field="location" header="Location" :sortable="true" style="min-width: 17rem">
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Search by location" class="p-column-filter" />
            </template>
          </Column>

          <Column field="connectionStatus" header="Connection Status" :sortable="true" :showFilterMenu="false"
            style="min-width: 17rem">
            <template #body="{ data }">
              <span :class="['status-text', data.connectionStatus === 'CONNECTED' ? 'connected' : 'disconnected']">
                {{ data.connectionStatus }}
              </span>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown v-model="filterModel.value" @change="filterCallback()"
                :options="['CONNECTED', 'DISCONNECTED']" placeholder="Select Status"
                class="p-column-filter" :showClear="true" />
            </template>
          </Column>

          <Column field="port" header="Port" :sortable="true" style="min-width: 17rem">
            <template #body="{ data }">
              {{ data.port.replace('/dev/', '') }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Search by port" class="p-column-filter" />
            </template>
          </Column>

          <Column field="status" header="Board Status" :sortable="true" :showFilterMenu="false"
            style="min-width: 17rem">
            <template #body="{ data }">
              <span :class="['status-text', data.status === 'UNLOCKED' ? 'unlocked' : 'locked']">
                {{ data.status }}
              </span>
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown v-model="filterModel.value" @change="filterCallback()"
                :options="['LOCKED', 'UNLOCKED']" placeholder="Select Status" class="p-column-filter"
                :showClear="true" />
            </template>
          </Column>

          <Column field="external_equipement_str" header="External Equipment" style="min-width: 17rem">
            <template #body="{ data }">
              <ul v-if="isValidExternalEquipment(data.externalEquipment)" class="equipment-list">
                <li v-for="(eq, index) in data.externalEquipment" :key="index">
                  <div><strong>Name:</strong> {{ eq?.name }}</div>
                  <div><strong>Type:</strong> {{ eq?.type }}</div>
                  <div><strong>Fixtures:</strong> {{ eq?.fixtures.join(", ") }}</div>
                  <div><strong>Serial Number:</strong> {{ eq?.serialNumber }}</div>
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
import { ref, onMounted } from 'vue';
import { useBoardStore } from '@/application/stores/BoardStore';
//import LoadingScreen from '@/components/LoadingScreen.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const boardStore = useBoardStore();

const filterFields = [
  'name', 'family', 'serial_number', 'external_equipement_str',
  'labels', 'hostname', 'location', 'port', 'status', 'connection_status'
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
  external_equipement_str: { value: null, matchMode: 'contains' }
});

const isValidExternalEquipment = (equipment) => {
  return Array.isArray(equipment) && equipment.length > 0;
};

onMounted(async () => {
    try {
        await boardStore.fetchBoards();
    } catch (error) {
        console.error('Error loading boards:', error);
    } finally {
        console.log(boardStore.boards)
    }
});
</script>

<style scoped>
.boards-container {
  height: 100vh; /* Ensure the container takes full viewport height */
  display: flex;
  justify-content: flex-start; /* Align items to the top */
  align-items: flex-start; /* Align items to the top */
  background-color: #ffffff; /* Set to your desired background color */
  padding-top: 20px; /* Optional: Add some padding to the top */
}

.boards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.table-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
  min-height: 400px; /* Set a minimum height to ensure consistent layout */
}

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