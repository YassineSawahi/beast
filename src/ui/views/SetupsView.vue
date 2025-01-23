<template>
    <div class="setup">
    </div>
</template>

<script>
import { useSetupStore } from '@/application/stores/SetupStore';

export default {
    name: 'SetupView',

    async mounted() {
        const setupStore = useSetupStore();
        await setupStore.fetchSetups();
        console.log('Setups:', setupStore.setups);
    }
};
</script>