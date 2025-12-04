import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    filter: 'all'
  }),
  actions: {
    save() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    addTask(text) {
      if (text.trim()) {
        this.tasks.push({ id: Date.now(), text, completed: false })
        this.save()
      }
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
        this.save()
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.save()
    },
    editTask(id, newText) {
      const task = this.tasks.find(t => t.id === id)
      if (task && newText.trim()) {
        task.text = newText
        this.save()
      }
    },
    setFilter(filter) {
      this.filter = filter
    }
  },
  getters: {
    filteredTasks(state) {
      if (state.filter === 'completed') return state.tasks.filter(t => t.completed)
      if (state.filter === 'pending') return state.tasks.filter(t => !t.completed)
      return state.tasks
    }
  }
})
