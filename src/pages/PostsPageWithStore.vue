<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class = "app__btns">
      <my-button
        @click="showDialog"
      >
        Создать пользователя
      </my-button>
      <my-select
        :modelValue="selectedSort"
        @update:modelValue="setSelectedSort"
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
    <div class="observer" v-intersection="loadMorePosts"></div> -->
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'

export default {
  components: {
    PostForm,
    PostList
},
  data() {
    return {
        dialogVisible: false
    }
  },
  methods: {
    ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
    })
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
        posts: state => state.post.posts,
        isPostsLoading: state => state.post.isPostsLoading,
        selectedSort: state => state.post.selectedSort,
        sortOptions: state => state.post.sortOptions,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
        sotredPosts: 'post/sortedPosts',
        sortedAndSearchPosts: 'post/sortedAndSearchPosts'
    })
  },
  watch: {

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