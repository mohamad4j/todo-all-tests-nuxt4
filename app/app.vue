<template>
  <main :data-theme="themeColor">
    <Header @theme-updated="themeUpdated" />
    <div class="container wrapper">
      <div>
        <button @click="openDialog = true">+ Add new</button>
      </div>
      <LazyTodoList
        v-if="showData"
        :list="todoList"
        @update-item="itemUpdated"
        @remove-item="removeItem"
      />
      <TodoForm
        :open-dialog="openDialog"
        :loading="loading"
        @close="openDialog = false"
        @add-new="addNew"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useApi } from "./composables/api.js";
import Header from "./components/header.vue";
import type {Task, TaskUpdate, Theme, TaskInsert, TaskRemove} from "./types/main";
import { onMounted } from "vue";

const themeColor = ref<Theme>('light');
const openDialog = ref<boolean>(false)
const showData = ref<boolean>(false)
const loading = ref<boolean>(false)
const todoList = ref<Task[]>([])
useHead({
  link: [
    {
      type: "text/css",
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css",
    },
  ],
})
const api = useApi()
const themeUpdated = (val: Theme) => {
  themeColor.value = val
};
const itemUpdated = async (el: TaskUpdate) => {
  if (el.done !== undefined && el.id !== undefined) {
    const taskIndex = todoList.value.findIndex((item) => {
      return el.id === item.id
    });
    const task = todoList.value[taskIndex]
    if (task) {
      task.done = el.done ?? false
    }
    try {
      await api
        .from("todos")
        .update({ done: el.done })
        .eq("id", el.id)
        .select();
    }
 catch (err) {
      console.log(err)
    } finally {
      showData.value = true
    }
  }
}
const getList = async () => {
  try {
    const { data, error } = await api.from('todos').select('*');
    if (data) {
      todoList.value = data.sort((a, b) => {
        return a?.id - b?.id
      });
    }
  } catch (err) {
    console.log(err)
  }
  finally {
    showData.value = true
  }
}
const addNew = async (task: TaskInsert) => {
  try {
    loading.value = true

    const { data, error } = await api
      .from('todos')
      .insert([{ ...task }])
      .select()
    if (data) {
      todoList.value.push(data[0])
      openDialog.value = false
    }
  }
  catch (err) {
    console.log(err)
  }
  finally {
    loading.value = false
  }
}
const removeItem = async (el: TaskRemove) => {
  try {
    loading.value = true
    const { data, error } = await api
        .from("todos")
        .delete()
        .eq("id", el.id)
        .select();
    if (data) {
      const taskIndex = todoList.value.findIndex((item) => {
        return el.id === item.id
      })
      todoList.value.splice(taskIndex, 1)
    }
  }
  catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getList();
})
</script>

<style lang="scss">
body {
  max-width: 100%;
  overflow: hidden;
}
main {
  min-height: 1000px;
  width: 100%;
  background-color: var(--pico-background-color);
  color: var(--pico-color);
}
.wrapper {
  margin: 20px auto;
}
</style>
