
<template>
  <div
    class="card"
    :class="{ 'card--negative': person.dislikes > person.likes }"
  >
    <div class="info">
      <p class="name">{{ person.name }}</p>
      <p class="stats">
        👍 {{ person.likes }} | 👎 {{ person.dislikes }}
      </p>
    </div>
    <div class="actions">
      <button @click="onLike">Like</button>
      <button @click="onDislike">Dislike</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  person: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'dislike'])

const onLike = () => {
  emit('like', props.person.id)
}

const onDislike = () => {
  emit('dislike', props.person.id)
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.15s, background 0.15s;
}

.card:hover {
  transform: translateY(-1px);
}

.card--negative {
  background: #fee2e2; 
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  margin-bottom: 4px;
}

.stats {
  font-size: 14px;
  color: #4b5563;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.actions button:first-child {
  background: #bbf7d0;
}

.actions button:last-child {
  background: #fecaca;
}
</style>
