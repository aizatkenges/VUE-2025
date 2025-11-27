<template>
  <div>
    <h2>Most Disliked</h2>

    <PersonCard
      v-for="p in filtered"
      :key="p.id"
      :person="p"
      @like="handleLike"
      @dislike="handleDislike"
    />
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import PersonCard from '../components/PersonCard.vue'

const people = inject('people')
const handleLike = inject('handleLike')
const handleDislike = inject('handleDislike')

const filtered = computed(() =>
  people.value.filter(p => p.dislikes > p.likes)
)
</script>
