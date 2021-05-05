<template>
  <div class="z-20 flex flex-col w-full h-auto bg-primary-500">
    <div class="flex flex-row justify-between p-1 m-2 conatiner">
      <div class="flex flex-row">
        <div class="hambargar menu">
          <button
            @click="sidebar = !sidebar"
            aria-label="Open Menu"
            class="overflow-x-hidden overflow-y-hidden transition ease-in-out focus:outline-none duration-1500"
          >
            <svg
              class="w-6 h-6 my-auto mt-1 text-white me-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <LeftUserProfile
            :class="sidebar ? 'openSideBar' : 'closeSideBar'"
            @hideSidebar="sidebar = false"
          />
        </div>
        <nuxt-link :to="localePath('/')" class="my-auto">
          <img v-lazy="settings.logo" alt="" class="object-contain h-8" />
        </nuxt-link>
      </div>
      <div class="flex items-center me-1">
        <nuxt-link :to="localePath('cart')">
          <div class="relative">
            <!-- cart icon  -->
            <svg
              class="relative w-6 h-6 mt-2 text-white me-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              />
            </svg>
            <div
              v-if="cart"
              class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-3 text-xs text-center text-white rounded-full me-5 bg-secondary-500"
            >
              {{ cart.qty }}
            </div>
          </div>
        </nuxt-link>
        <nuxt-link :to="localePath('login')" v-if="!user" class="text-white">
          Login
        </nuxt-link>
        <nuxt-link :to="localePath('/my')" v-else class="text-white">
          {{ user.firstName }}
        </nuxt-link>
      </div>
    </div>
    <div class="w-full px-2 pb-2">
      <Search />
    </div>
  </div>
</template>

<script>
import { typingTimeout } from '~/shared/config'
import LeftUserProfile from '~/components/User/LeftUserProfile'
import Search from '~/components/Search'
export default {
  components: {
    LeftUserProfile,
    Search,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      search: '',
      isOpen: false,
      sidebar: false,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
    user() {
      return (this.$store.state.auth || {}).user
    },
    cart() {
      return this.$store.state.cart
    },
  },
  // async created() {
  //   await this.getCart()
  // },
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
    '$route.query.q': {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Searchwidth {
  width: 100%;
}
.h-7 {
  height: 1.9rem;
}
.margin {
  margin-top: 9px;
}
.w-full2 {
  margin-right: 30px;
  /* width: 100%; */
}
.ml {
  margin-left: 11px;
}
.closeSideBar {
  left: -100%;
  transition: 0.3s all;
}
.openSideBar {
  left: 0;
  transition: 0.3s all;
}
</style>
