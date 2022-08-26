import axios from 'axios'

export const postModule = {
    state: () => ({
        posts: [ ],
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
    }),
    getters: {
        sotredPosts(state) {
            return [...state.posts].sort((post1,post2) => {
              return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
          },
          sortedAndSearchPosts(state, getters) {
            return getters.sotredPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
          }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
              commit('setLoading', true)
              const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`)
              commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit) )
              commit('setPosts', response.data)
            } catch(e) {
              alert(e)
            } finally {
                commit('setLoading', false)
            }
          },
        async loadMorePosts({state, commit}) {
        try {
            commit('setPage', state.page+1)
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`)
            commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / this.limit) )
            commit('setPosts', [...state.posts, ...response.data])
            } catch(e) {
                alert(e)
            }
        }
    },
    namespaced: true
}