<script setup lang="ts">
import type { Task } from "~/types/main";

const props = defineProps<{
  list: Task[];
}>();

defineEmits(["updateItem", "removeItem"]);
</script>

<template>
  <transition-group
      name="fade"
      tag="div"
      class="todo-list"
  >
    <TodoItem
        v-for="task in props.list"
        :key="task.id"
        :task="task"
        @update-item="$emit('updateItem', $event)"
        @remove-item="$emit('removeItem', $event)"
    />
  </transition-group>
</template>

<style scoped lang="scss">
.todo-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 24px;

  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
