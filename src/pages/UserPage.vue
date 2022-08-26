<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
    />
    <div class = "app__btns">
      <my-button
        @click="showDialog"
      >
        Создать пользователя
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />

    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost"/>
    </my-dialog>
    <PostList 
      :posts="sortedAndSearchPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>
      Загрузка...
    </div>
    <div class="observer" v-intersection="loadMorePosts"></div>
    <!-- <div class="page__wrapper">
      <div 
        v-for="pageNumber in totalPages" 
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber
        }"
        @click="changePage(pageNumber)"
      >
        {{pageNumber}}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
  components: {
    PostForm,
    PostList
},
  data() {
    return {
      posts: [ ],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`)
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch(e) {
        alert(e)
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      console.log('more')
      try {
        this.page++
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`)
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch(e) {
        alert(e)
      }
    },
    // changePage(num) {
    //   this.page = num
    // }
  },
  mounted() {
    this.fetchPosts()

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    // const callback = (entries, observer) => {
    //   if(entries[0].isIntersecting && this.page < this.totalPages)
    //     this.loadMorePosts()
    // };
    // const observer = new IntersectionObserver(callback, options)
    // observer.observe(this.$refs.observer)
  },
  computed: {
    sotredPosts() {
      return [...this.posts].sort((post1,post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchPosts() {
      return this.sotredPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style scoped>

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>