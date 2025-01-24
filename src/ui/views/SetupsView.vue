<template>
    <div class="setup">
        
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSetupStore } from '@/application/stores/SetupStore';

const setupStore = useSetupStore();

onMounted(async () => {
    await setupStore.fetchSetups();
    console.log('Setups:', setupStore.setups);
});
</script>