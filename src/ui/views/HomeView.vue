<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
</script>

<template>
  <main>
    <div class="flex flex-col items-center gap-6 p-42">
      <img src="/ST_logo_2020.svg.png" alt="ST Logo" class="w-64 h-auto" />

      <div class="flex flex-col gap-4" style="display: flex; flex-direction: column; gap: 1rem;">
        <Button @click="navigate('/boards')" severity="success" raised class="w-48"
          style="width: 350px; font-size: 20px; font-weight: bold;">
          Boards
        </Button>

        <Button @click="navigate('/auto-shields')" severity="success" raised class="w-48"
          style="width: 350px; font-size: 20px; font-weight: bold;">
          Auto Shields
        </Button>

        <Button @click="navigate('/setups')" severity="success" raised class="w-48"
          style="width: 350px; font-size: 20px; font-weight: bold;">
          Setups
        </Button>
      </div>
    </div>

  </main>
</template>
