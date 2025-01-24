<template>
    <div class="auto-shields">
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAutoShieldStore } from '@/application/stores/AutoShieldStore';

const autoShieldStore = useAutoShieldStore();

onMounted(async () => {
    await autoShieldStore.fetchAutoShields();
    console.log('Auto Shields:', autoShieldStore.autoShields);
});
</script>