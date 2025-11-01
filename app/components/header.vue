<script setup lang="ts">
const checked = ref(false)
const emit = defineEmits(['themeUpdated'])
watch(checked, (val) => {
  emit('themeUpdated', val ? 'dark' : 'light');
})
</script>

<template>
  <nav class="container">
    <ul>
      <li><h1>ToLLo</h1></li>
    </ul>
    <ul>
      <li>
        <label>
          <input
name="terms" type="checkbox" v-model="checked" role="switch" />
          dark mode
        </label>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss"></style>
