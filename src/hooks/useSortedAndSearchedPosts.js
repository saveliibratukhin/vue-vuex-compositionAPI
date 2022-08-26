import { ref, computed } from "vue";

export function useSortedAndSearchedPosts(sotredPosts) {
    const searchQuery = ref('')

    const sortedAndSearchedPosts = computed(() => {
        return sotredPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    return {
        searchQuery, sortedAndSearchedPosts
    }
}