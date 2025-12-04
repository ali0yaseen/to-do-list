<template>
  <li :class="{ completed: task.completed }">
    <div class="task-info">
     <input
  type="checkbox"
  :checked="task.completed"
  @change="toggle(task.id)"
/>

      <span class="text">{{ task.text }}</span>
    </div>
    <div class="actions">
      <span class="edit" @click="edit(task.id)">✏️</span>
      <span class="delete" @click="remove(task.id)">🗑️</span>
    </div>
  </li>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'
const store = useTodoStore()
const props = defineProps(['task'])

const toggle = (id) => store.toggleTask(id)
const remove = (id) => store.deleteTask(id)
const edit = (id) => {
  const newText = prompt('Edit task:', props.task.text)
  if (newText !== null && newText.trim() !== '') {
    store.editTask(id, newText)
  }
}
</script>

<style scoped>
li {
  background-color: #f8f9fa;
  margin-bottom: 8px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
  transition: 0.2s;
}
li:hover {
  background-color: #e9f3ff;
}
.task-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.text {
  color: #111827;
  font-size: 15px;
}
.completed .text {
  text-decoration: line-through;
  color: gray;
}
.actions span {
  margin-left: 8px;
  cursor: pointer;
  font-size: 18px;
}
.edit:hover {
  color: #2563eb;
}
.delete {
  color: #dc3545;
}
.delete:hover {
  transform: scale(1.2);
}
</style>
