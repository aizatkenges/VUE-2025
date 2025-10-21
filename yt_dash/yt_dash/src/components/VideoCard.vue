<template>
  <div class="video-card">
    <img :src="thumbnail" alt="thumbnail" class="thumb" />
    <h3>{{ title }}</h3>
    <p>{{ channel }}</p>
    <small>{{ views.toLocaleString() }} views</small>
    <button @click="$emit('liked')">❤ Like</button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  channel: String,
  views: Number,
  thumbnail: String
})

defineEmits(['liked'])
</script>

<style scoped>
.video-card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 12px;
  width: 250px;
  text-align: center;
}
.thumb {
  width: 100%;
  border-radius: 8px;
}
button {
  margin-top: 10px;
  cursor: pointer;
}
</style>
