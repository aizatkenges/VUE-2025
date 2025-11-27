
<template>
  <div class="gallery">
    
    <form class="add-form" @submit.prevent="onSubmit">
      <input
        v-model="newName"
        type="text"
        placeholder="Enter name"
      />
      <button type="submit">Add person</button>
    </form>

    
    <div class="cards">
      <PersonCard
        v-for="person in people"
        :key="person.id"
        :person="person"
        @like="forwardLike"
        @dislike="forwardDislike"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PersonCard from './PersonCard.vue'

const props = defineProps({
  people: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['like', 'dislike', 'add-person'])

const newName = ref('')

const onSubmit = () => {
  const name = newName.value.trim()
  if (!name) return
  emit('add-person', name)
  newName.value = ''
}


const forwardLike = (id) => {
  emit('like', id)
}

const forwardDislike = (id) => {
  emit('dislike', id)
}
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.add-form input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.add-form button {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #3b82f6;
  color: white;
  font-weight: 500;
}

.add-form button:hover {
  background: #2563eb;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
