<script setup lang="ts">
import type { Task } from "~/types/main";

defineProps<{
  openDialog: boolean
  loading: boolean
}>()
const emit = defineEmits<{
  (e: 'addNew', value: Task): void
  (e: 'close'): void
}>()
const showError = ref<boolean>(false)
const task = ref<Task>({
  title: '',
  text: '',
  done: false,
})
const addNew = () => {
  if (task.value.title && task.value.text) {
    emit('addNew', task.value)
  }
  else {
    showError.value = true
  }
}
</script>

<template>
  <dialog :open="openDialog">
    <article>
      <h5>Add new task</h5>
      <form>
        <input
v-model="task.title" placeholder="title" />
        <textarea
v-model="task.text" placeholder="Write about your task..."
/>
        <footer class="rtl grid">
          <button
            type="button"
            :disabled="loading"
            :aria-busy="loading"
            @click.prevent="addNew"
          >
            submit
          </button>
          <button class="secondary" @click.prevent="$emit('close')">
            close
          </button>
        </footer>
      </form>
    </article>
  </dialog>
</template>

<style scoped lang="scss">
.rtl {
  direction: rtl;
}
</style>
