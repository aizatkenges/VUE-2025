<template>
  <div class="app">

    <h1>People Gallery</h1>

    <nav class="nav">
      <router-link to="/all">All Students</router-link>
      <router-link to="/liked">Most Liked</router-link>
      <router-link to="/disliked">Most Disliked</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const people = ref([
  { id: 1, name: 'Alice', likes: 0, dislikes: 0 },
  { id: 2, name: 'Bob', likes: 0, dislikes: 0 },
  { id: 3, name: 'Charlie', likes: 0, dislikes: 0 }
])

const nextId = ref(4)

const handleLike = (id) => {
  const p = people.value.find(p => p.id === id)
  if (p) p.likes++
}

const handleDislike = (id) => {
  const p = people.value.find(p => p.id === id)
  if (p) p.dislikes++
}

provide('people', people)
provide('handleLike', handleLike)
provide('handleDislike', handleDislike)

</script>

<style scoped>
.nav {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.nav a {
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  background: #eee;
}

.nav a.router-link-active {
  background: #3b82f6;
  color: white;
}
</style>
