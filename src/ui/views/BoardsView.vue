<template>
    <div class="boards">
    </div>
</template>

<script>
import { useBoardStore } from '@/application/stores/BoardStore';

export default {
    name: 'BoardsView',

    async mounted() {
        const boardStore = useBoardStore();
        await boardStore.fetchBoards();
        console.log('Boards:', boardStore.boards);
    }
};
</script>