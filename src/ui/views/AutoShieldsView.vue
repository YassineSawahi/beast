<template>
  <div class="auto-shields">
  </div>
</template>

<script>
import { useAutoShieldStore } from '@/application/stores/AutoShieldStore';

export default {
  name: 'AutoShieldsView',

  async mounted() {
    const autoShieldStore = useAutoShieldStore();
    await autoShieldStore.fetchAutoShields();
    console.log('Auto Shields:', autoShieldStore.autoShields);
  }
};
</script>