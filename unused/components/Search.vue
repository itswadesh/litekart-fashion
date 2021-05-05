<template>
  <form
    novalidate
    autocomplete="off"
    @submit.stop.prevent="submit(search)"
    class="w-full z-1"
  >
    <div class="relative flex flex-row flex-1 sm:mx-2 md:mx-10 lg:px-20 height">
      <input
        type="text"
        :placeholder="$t('Search for products, brands and more')"
        class="w-full pl-4 border-0 rounded-sm placeholder focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-yellow-600"
        v-model="search"
      />
      <span class="my-auto -ms-8">
        <!-- search icon -->
        <svg
          class="w-5 h-5 text-sm text-gray-500 custom-class"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
    </div>
  </form>
</template>

<script>
import { typingTimeout } from '~/shared/config'
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    submit(q) {
      this.$router.push(`/search/${q}`)
    },
  },
  watch: {
    search: {
      immediate: false,
      handler(value, oldValue) {
        // if (value.length < 4) return;
        if (!oldValue) return // Do not trigger on page load
        clearTimeout(this.typingTimer)
        let vm = this
        this.typingTimer = setTimeout(function () {
          if (!value || value == 'undefined') value = '' // When clear button clicked
          vm.searchString = value
          vm.$router.push(`/search/${value}`)
        }, typingTimeout)
      },
    },
    '$route.params.q': {
      immediate: true,
      handler(value) {
        let pathName = null
        if (this.$route.name) pathName = this.$route.name.substr(0, 8)
        if (pathName === 'category') return
        if (!value || value == 'undefined') value = ''
        if (value == '') return
        if (this.search == '') this.search = value
      },
    },
  },
}
</script>

<style scoped>
.placeholder {
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 22px;
  color: #c4c4c4;
}
img {
  margin-right: 1rem;
}
</style>
