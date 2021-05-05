<template>
  <header
    class="fixed z-20 w-full bg-white shadow-lg lg:block blur"
    :class="{
      'opacity-75': !sidebar,
      block: $route.name != 'search',
      hidden: $route.name == 'search',
    }"
  >
    <nav
      class="container flex flex-wrap items-center justify-between py-3 mx-auto xl:py-0"
      v-if="$router.name != 'search'"
    >
      <div
        class="flex flex-wrap items-center flex-shrink-0 order-1 text-orange"
      >
        <button
          @click="sidebar = !sidebar"
          aria-label="Open Menu"
          class="mx-4 overflow-x-hidden overflow-y-hidden transition ease-in-out lg:hidden focus:outline-none duration-1500"
        >
          <AlignJustifyIcon size="1.2x" class=""></AlignJustifyIcon>
        </button>
        <button
          v-if="sidebar"
          @click="sidebar = false"
          class="fixed top-0 bottom-0 left-0 right-0 w-full min-h-screen bg-black opacity-50"
        ></button>
        <SlideDropDown
          :class="sidebar ? 'openSideBar' : 'closeSideBar'"
          @hideSidebar="sidebar = false"
        />
        <nuxt-link to="/" class="flex items-center font-bold">
          <div class="flex flex-row items-center justify-center">
            <img src="/logo.svg" alt="" class="h-8" />
          </div>
        </nuxt-link>
      </div>
      <div
        class="flex-1 order-4 hidden px-2 lg:block md:w-1/2 md:mb-0 md:pr-2 md:ms-6 md:order-3"
      >
        <Search class="pb-4 md:pb-0" />
      </div>
      <div
        class="flex justify-end order-last px-2 mt-2 lg:hidden md:w-1/2 md:mb-0 md:pr-6"
      >
        <SearchIcon @click="$router.push('/search')" class="pb-2 md:pb-0" />
      </div>
      <div class="order-3 py-3 ms-10 me-3 md:order-4 headings">
        <div
          class="items-center justify-between flex-shrink-0 hidden text-sm font-bold leading-loose tracking-wider md:flex"
        >
          <nuxt-link
            class="relative flex flex-col items-center mx-4"
            to="/cart"
          >
            <div
              class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -m-2 text-white rounded-full bg-accent-900"
            >
              {{ cart.qty }}
            </div>
            <ShoppingCartIcon class="h-5" />
            <div>Cart</div>
          </nuxt-link>
          <nuxt-link class="flex flex-col items-center mx-3" to="/quiz">
            <HeartIcon class="h-5 center" />
            <div class="text-xs font-bold headings">MCQs</div>
          </nuxt-link>
          <nuxt-link class="flex flex-col items-center mx-3" to="/videos">
            <VideoIcon class="h-5 center" />
            <div class="text-xs font-bold headings">Videos</div>
          </nuxt-link>
          <nuxt-link
            v-if="user"
            class="relative flex flex-col items-center mx-3"
            to="/Author/quizes"
          >
            <UserIcon class="h-5 ms-1" />
            <div>{{ user.firstName }}</div>
          </nuxt-link>
          <nuxt-link
            v-else
            class="relative flex flex-col items-center mx-3"
            to="/login"
          >
            <UserIcon class="h-5 ms-1" />
            <div>Login</div>
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},

  data() {
    return {
      sidebar: false,
      cls: '',
      errorStr: null,
      geo: null,
      gettingLocation: false,
    }
  },
  methods: {
    submit(q) {
      this.$router.push(`/search/${q}`)
    },
  },
  // mixins: [location],
  async mounted() {
    // console.log(this.$route.name)
    $nuxt.$on('removeSidebar', () => {
      // console.log('helooooooooooooooo')
      this.sidebar = false
    })
    if (process.client) {
      window.addEventListener('scroll', () => {
        let scrolled = window.scrollY
        this.cls = scrolled > 147 ? 'fix-search' : ''
      })
    }
    // try {
    //   this.geo = this.$cookies.get('geo')
    //   if (!this.geo && process.client) {
    //     this.$router.push('/change-location')
    //   }
    // } catch (e) {
    //   this.errorStr = e
    // } finally {
    //   this.gettingLocation = false
    // }
  },

  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null
    },
    cart() {
      return this.$store.state.cart || {}
    },
    ...mapGetters({
      showCart: 'cart/showCart',
      settings: 'settings',
    }),
  },
  methods: {
    closeSidebar() {
      this.sidebar = false
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {})
    },
    go(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style scoped>
.closeSideBar {
  left: -100%;
  transition: all 0.3s;
}
.openSideBar {
  left: 0;
  transition: all 0.3s;
}
.blur {
  backdrop-filter: saturate(180%) blur(5px);
}
.desktop-badge {
  font-size: 8px;
  right: -6px;
  top: -6px;
  height: 15px;
  width: 14px;
  border-radius: 50%;
  display: inline-block;
}
.desktop-badge .number {
  margin-top: 1.5px;
  margin-left: -1px;
}

.fix-search {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(223, 20, 20);
  padding: 10px;
  z-index: 100;
  margin: 0px;
}
</style>
