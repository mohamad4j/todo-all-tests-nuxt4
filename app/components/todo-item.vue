<script setup lang="ts">
import type { Task } from "~/types/main";
import { ref } from "vue";
const loading = ref(false);
const props = defineProps<{
  task: Task;
}>();
const emit = defineEmits<{
  (e: 'updateItem', value: Partial<Task>): void
  (e: 'removeItem', value: Partial<Task>): void
}>()
const updateDone = (event: Event) => {
  const el = event.target as HTMLInputElement
  emit('updateItem', { id: props.task.id, done: el.checked })
};
const removeItem = () => {
  loading.value = true;
  emit('removeItem', { id: props.task.id })
};
</script>

<template>
  <article class="card" :class="{ 'card--done': task.done, 'card--loading': loading }">
    <h5>{{ task.title }}</h5>
    <p>{{ task.text }}</p>
    <div class="grid">
      <label>
        <input
          type="checkbox"
          name="english"
          :checked="task.done"
          @change="updateDone"
        >
        Done
      </label>
      <span class="remove" @click="removeItem">X</span>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  margin-bottom: 0;
  position: relative;
  &--done {
    border: 2px solid green;
    h5,
    p {
      text-decoration: line-through;
    }
  }
  &--loading {
    opacity: 0.5;
    pointer-events: none;
  }
  .remove {
    color: red;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
}
</style>
