import { ref, onMounted } from "vue"
import axios from "axios"

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(true)

    const fetching = async () => { 
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${1}`)
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data
        } catch(e) {
            alert(e)
        } finally {
            isPostsLoading.value = false
        }
    }

    onMounted(fetching)
    return {
        posts, 
        totalPages,
        isPostsLoading
    }
}