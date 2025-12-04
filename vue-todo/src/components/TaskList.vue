<template>
  <div class="container">
    <h1>📝 To-Do List</h1>

    <div class="input-area">
<input v-model="newTask" placeholder="Add a new task..." @keyup.enter="addTask" />
      <button @click="addTask">Add</button>
    </div>

    <div class="filters">
      <button
        v-for="btn in filters"
        :key="btn"
        :data-filter="btn"
        :class="{ active: store.filter === btn }"
        @click="store.setFilter(btn)"
      >
        {{ btn.charAt(0).toUpperCase() + btn.slice(1) }}
      </button>
    </div>

    <ul>
      <TaskItem v-for="t in store.filteredTasks" :key="t.id" :task="t" />
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TaskItem from './TaskItem.vue'

const store = useTodoStore()
const newTask = ref('')
const filters = ['all', 'completed', 'pending']

const addTask = () => {
  if (newTask.value.trim()) {
    store.addTask(newTask.value)
    newTask.value = ''
  }
}
</script>

<style scoped>
@import '../style.css';
</style>
