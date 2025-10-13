<template>
  <div class="app">
    <h1>✨ Task Manager</h1>

    <!-- Форма добавления задачи -->
    <div class="task-form">
      <input v-model="newTaskText" placeholder="Enter task..." />
      <select v-model="newTaskCategory">
        <option disabled value="">Select category</option>
        <option>Work</option>
        <option>Study</option>
        <option>Personal</option>
      </select>
      <select v-model="newTaskPriority">
        <option disabled value="">Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button class="add-btn" @click="addTask">＋ Add</button>
    </div>

    <!-- Фильтры -->
    <div class="filters">
      <label>
        <input type="checkbox" v-model="showIncompleteOnly" />
        Show incomplete only
      </label>

      <select v-model="selectedCategory">
        <option value="">All categories</option>
        <option>Work</option>
        <option>Study</option>
        <option>Personal</option>
      </select>

      <select v-model="selectedPriority">
        <option value="">All priorities</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>

    <!-- Список задач -->
    <div v-if="filteredTasks.length > 0" class="task-list">
      <div v-for="task in filteredTasks" :key="task.id"
           class="task-card"
           :class="{ completed: task.completed }">
        <div class="task-info">
          <span class="task-text">{{ task.text }}</span>
          <span class="badge">{{ task.category }}</span>
          <span class="priority" :class="task.priority.toLowerCase()">
            {{ task.priority }}
          </span>
        </div>
        <div class="task-actions">
          <button class="done-btn" @click="toggleComplete(task)">✔</button>
          <button class="delete-btn" @click="deleteTask(task.id)">✖</button>
        </div>
      </div>
      <p class="counter">Incomplete tasks: {{ incompleteCount }}</p>
    </div>
    <p v-else class="empty">No tasks yet 📝</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const tasks = ref([]);

const newTaskText = ref("");
const newTaskCategory = ref("");
const newTaskPriority = ref("");
const showIncompleteOnly = ref(false);
const selectedCategory = ref("");
const selectedPriority = ref("");

const addTask = () => {
  if (!newTaskText.value) return;
  tasks.value.push({
    id: Date.now(),
    text: newTaskText.value,
    category: newTaskCategory.value || "General",
    priority: newTaskPriority.value || "Medium",
    completed: false,
  });
  newTaskText.value = "";
  newTaskCategory.value = "";
  newTaskPriority.value = "";
};

const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id);
};

const toggleComplete = (task) => {
  task.completed = !task.completed;
};

const incompleteCount = computed(() =>
  tasks.value.filter((t) => !t.completed).length
);

const filteredTasks = computed(() => {
  return tasks.value.filter((t) => {
    const incompleteOk = showIncompleteOnly.value ? !t.completed : true;
    const categoryOk = selectedCategory.value
      ? t.category === selectedCategory.value
      : true;
    const priorityOk = selectedPriority.value
      ? t.priority === selectedPriority.value
      : true;
    return incompleteOk && categoryOk && priorityOk;
  });
});
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 1em;
}
.add-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
}
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 1em;
  align-items: center;
}
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.task-card {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.task-card.completed {
  text-decoration: line-through;
  color: gray;
  background: #eee;
}
.task-info {
  display: flex;
  gap: 8px;
  align-items: center;
}
.badge {
  background: #2196F3;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8em;
}
.priority {
  font-size: 0.8em;
  font-weight: bold;
}
.priority.high {
  color: red;
}
.priority.medium {
  color: orange;
}
.priority.low {
  color: green;
}
.task-actions button {
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  margin-left: 5px;
}
.done-btn {
  color: green;
}
.delete-btn {
  color: red;
}
.counter {
  margin-top: 10px;
  font-weight: bold;
}
.empty {
  text-align: center;
  color: #888;
}
</style>
