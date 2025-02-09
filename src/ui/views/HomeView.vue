<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
</script>

<template>
  <main class="home-container">
    <div class="content">
      <img src="/ST_logo_2020.svg.png" alt="ST Logo" class="logo" />

      <div class="buttons">
        <Button @click="navigate('/boards')" severity="secondary" raised class="button">
          Boards
        </Button>

        <Button @click="navigate('/auto-shields')" severity="secondary" raised class="button">
          Autoshields
        </Button>

        <Button @click="navigate('/setups')" severity="secondary" raised class="button">
          Setups
        </Button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  width: 350px;
  height: auto;
  padding-bottom: 24px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button {
  width: 350px;
  font-size: 20px;
  font-weight: bold;
}
</style>