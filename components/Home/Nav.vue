<template>
  <header class="fixed z-20 w-full shadow-lg frosted">
    <nav class="container flex flex-wrap items-center justify-between mx-auto">
      <div
        class="flex flex-wrap items-center flex-shrink-0 order-1 text-orange"
      >
        <nuxt-link to="/">
          <img class="h-6 mx-2" v-lazy="`${settings.logo}`" alt="Home" />
        </nuxt-link>
      </div>
      <div class="order-4 w-full md:w-1/2 md:order-3">
        <Search class="" />
      </div>
      <div class="order-3 py-3 ml-10 mr-3 md:order-4 headings">
        <div v-if="geo" class="flex text-sm md:hidden">
          <div v-if="errorStr">
            Sorry, but the following error occurred: {{ errorStr }}
          </div>
          <div v-if="gettingLocation">
            <i>Getting your location...</i>
          </div>
          <nuxt-link
            to="/change-location"
            class="flex items-center pl-2 rounded"
          >
            {{ geo.city }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </nuxt-link>
        </div>
        <div class="items-center justify-between flex-shrink-0 hidden md:flex">
          <nuxt-link
            class="flex flex-col items-center mx-4"
            :to="!user ? '/login' : '/my'"
          >
            <img src="/img/user.png" alt="" class="w-5 h-5" />
            <span class="text-xs font-bold">Profile</span>
          </nuxt-link>
          <nuxt-link class="flex flex-col items-center mx-3" to="/wishlist">
            <img src="/img/favourite.png" alt="" class="w-5 h-5" />
            <span class="text-xs font-bold">Favourite</span>
          </nuxt-link>
          <nuxt-link
            class="relative flex flex-col items-center mx-3"
            to="/cart"
          >
            <img src="/img/cart.png" alt="" class="w-5 h-5" />
            <div class="flex text-xs font-bold">
              <span class="text-xs font-bold">Cart</span>
              <div
                class="absolute flex items-center justify-center px-1 font-bold text-center rounded-full primary desktop-badge"
                style="padding-top: 2px"
                v-if="cart.qty > 0"
              >
                {{ cart.qty }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { Error, Search } from '~/shared/components'
import { location } from '~/shared/mixins'

export default {
  components: {
    Search,
  },

  data() {
    return {
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
  mixins: [location],
  async mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        let scrolled = window.scrollY
        this.cls = scrolled > 147 ? 'fix-search' : ''
      })
    }
    try {
      // this.geo = this.$cookies.get('geo')
      // if (!this.geo && process.client) {
      //   this.$router.push('/change-location')
      // }
    } catch (e) {
      this.errorStr = e
    } finally {
      this.gettingLocation = false
    }
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
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
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
  background-color: white;
  padding: 10px;
  z-index: 100;
  margin: 0px;
}
</style>
