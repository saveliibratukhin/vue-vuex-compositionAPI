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
      <PostForm/>
    </my-dialog>
    <PostList 
      :posts="sortedAndSearchedPosts"
      v-if="!isPostsLoading"
    />
    <div v-else>
      Загрузка...
    </div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import {usePosts} from '@/hooks/usePosts'
import {useSortedPosts} from '@/hooks/useSortedPosts'
import {useSortedAndSearchedPosts} from '@/hooks/useSortedAndSearchedPosts'

export default {
  components: {
    PostForm,
    PostList
},
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ],
    }
  },
  setup(props) {
    const {posts, totalPages, isPostsLoading} = usePosts(10)
    const {selectedSort, sortedPosts} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
        posts, 
        totalPages, 
        isPostsLoading,
        selectedSort,
        sortedPosts,
        searchQuery,
        sortedAndSearchedPosts
    }
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