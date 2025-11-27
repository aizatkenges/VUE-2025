<template>
  <div>
    <h2>All Students</h2>

    <PersonCard
      v-for="p in people"
      :key="p.id"
      :person="p"
      @like="handleLike"
      @dislike="handleDislike"
    />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import PersonCard from '../components/PersonCard.vue'

const people = inject('people')
const handleLike = inject('handleLike')
const handleDislike = inject('handleDislike')
</script>
