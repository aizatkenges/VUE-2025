<template>
  <div class="app">
    <h1>Mini YouTube Dashboard 🎥</h1>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search videos..."
    />

    <p v-if="loading">Loading videos…</p>
    <p v-else-if="filteredVideos.length === 0">No videos found.</p>
    <p v-else>Found {{ filteredVideos.length }} videos</p>

    <div class="videos">
      <VideoCard
        v-for="video in filteredVideos"
        :key="video.id"
        :title="video.title"
        :channel="video.channel"
        :views="video.views"
        :thumbnail="video.thumbnail"
        @liked="likeVideo"
      />
    </div>

    <h3>Total Likes: {{ totalLikes }}</h3>
  </div>
</template>

<script setup>
import VideoCard from './components/VideoCard.vue'
import { useVideos } from './composables/useVideos.js'

const { filteredVideos, searchQuery, likeVideo, totalLikes, loading } = useVideos()
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.videos {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
input {
  padding: 6px;
  margin-bottom: 12px;
}
</style>
