import { ref, computed, watch, onMounted } from 'vue'

export function useVideos() {
  const videos = ref([])
  const searchQuery = ref('')
  const totalLikes = ref(0)
  const loading = ref(true)

  // имитация загрузки данных
  onMounted(() => {
    setTimeout(() => {
      videos.value = [
        {
          id: 1,
          title: 'Vue 3 Tutorial for Beginners',
          channel: 'Vue Mastery',
          views: 150000,
          thumbnail: 'https://i.ytimg.com/vi/FXpIoQ_rT_c/hqdefault.jpg'
        },
        {
          id: 2,
          title: 'Composition API Explained',
          channel: 'The Net Ninja',
          views: 98000,
          thumbnail: 'https://i.ytimg.com/vi/bwItFdPt-6M/hqdefault.jpg'
        },
        {
          id: 3,
          title: 'Build a YouTube Clone with Vue',
          channel: 'Traversy Media',
          views: 230000,
          thumbnail: 'https://i.ytimg.com/vi/Zz6eOVaaelI/hqdefault.jpg'
        }
      ]
      loading.value = false
    }, 1000)
  })

  // вычисляемые видео по поиску
  const filteredVideos = computed(() =>
    videos.value.filter(v =>
      v.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )

  // следим за изменениями поиска
  watch(searchQuery, newVal => {
    console.log('Search changed:', newVal)
  })

  function likeVideo() {
    totalLikes.value++
  }

  return {
    videos,
    searchQuery,
    filteredVideos,
    totalLikes,
    likeVideo,
    loading
  }
}
