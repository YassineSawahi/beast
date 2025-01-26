<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
</script>

<template>
  <main>
    <div class="flex flex-col items-center gap-6 p-42" style="padding-top: 104px;">
      <img src="/ST_logo_2020.svg.png" alt="ST Logo" class="w-64 h-auto" style="padding-bottom: 24px" />

      <div class="flex flex-col gap-4" style="display: flex; flex-direction: column; gap: 1rem;">
        <Button @click="navigate('/boards')" severity="secondary" raised class="w-48"
          style="width: 350px; font-size: 20px; font-weight: bold;">
          Boards
        </Button>

        <Button @click="navigate('/auto-shields')" severity="secondary" raised class="w-48"
          style="width: 350px; font-size: 20px; font-weight: bold;">
          Autoshields
        </Button>

        <Button @click="navigate('/setups')" severity="secondary" raised class="w-48"
          style="width: 350px; font-size: 20px; font-weight: bold;">
          Setups
        </Button>
      </div>
    </div>

  </main>
</template>
