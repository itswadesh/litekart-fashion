<template>
  <div
    class="fixed inset-0 z-20 flex flex-col w-2/3 h-full overflow-x-hidden transition"
  >
    <div class="flex justify-end bg-white">
      <div class="flex flex-col justify-center py-10 border-b-2">
        <div class="px-3">
          <img
            v-lazy="'/img/avatar-s-6.0f4533ab.jpg'"
            alt="profile"
            class="w-24 h-24 border rounded-full"
          />
        </div>
        <div
          v-if="user"
          class="flex flex-col justify-start my-auto text-xl font-semibold text-primary-500"
        >
          <span class="py-4">Hello, {{ user && user.firstName }}</span>
          <span class="flex justify-start text-sm font-normal text-gray-400">
            {{ user.email }}
          </span>
        </div>
      </div>
      <button
        aria-label="Open sidebar"
        @click="hideSidebar(null)"
        class="absolute z-10 inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded focus:outline-none"
      >
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 fill-current"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.707 5.293a1 1 0 010 1.414l-12 12a1 1 0
                  01-1.414-1.414l12-12a1 1 0 011.414 0z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.293 5.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414
                  1.414l-12-12a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
    <!-- text bold items -->
    <!-- <div class="flex flex-col bg-white border-b-2">
      <div class="flex flex-col flex-auto mb-2 font-bold justify-items-start">
        
        <ul :key="i" v-for="(m, i) in megamenu" class="justify-between py-3 pl-5">
          <li class="flex" >
            <div @click="hideSidebar(m.slug)" class="w-4/5 cursor-pointer">{{ m.name }}</div>
            <div
              v-if="m.children.length != 0"
              class="flex justify-end w-1/5 mt-3 me-2"
              @click="showChildren(i, m.children)"
            >
              <chevron-right-icon
                size="1x"
                v-if="selectedIndex != i"
                class="text-gray-500 cursor-pointer custom-class"
              ></chevron-right-icon>
              <chevron-down-icon size="1x" v-else class="text-gray-500 custom-class"></chevron-down-icon>
            </div>
          </li>
          <li>
            <CollapsibleDropdown :details="m.children" v-if="selectedIndex == i" />
          </li>
        </ul>
      </div>
    </div> -->

    <div class="text-gray-400 border-b-1"></div>

    <div class="flex flex-col bg-white">
      <h4
        @click="onSelectCategory('dashboard')"
        class="flex flex-row w-full py-4 transition duration-300 ease-in-out transform cursor-pointer hover:text-primary-500 hover:translate-x-1 hover:scale-100"
      >
        <h3
          v-if="selectedCategory == 'dashboard'"
          class="flex flex-row w-full text-primary-500"
        >
          <monitor-icon size="1.2x" class="my-auto me-2"></monitor-icon>
          <span class="font-medium tracking-wider">Dashboard</span>
        </h3>
        <h3 v-else class="flex flex-row">
          <monitor-icon size="1.2x" class="my-auto me-2"></monitor-icon>
          <span class="font-medium tracking-wider">Dashboard</span>
        </h3>
      </h4>
      <ul class="flex flex-col">
        <nuxt-link :to="localePath('/my/orders')">
          <li class="flex flex-row p-3">
            <ShoppingBagIcon class="text-blue-600 me-2" size="1.3x" />
            <span>My Orders</span>
          </li>
        </nuxt-link>
        <nuxt-link :to="localePath('/reviews-and-ratings')">
          <li class="flex flex-row p-3">
            <star-icon size="1.3x" class="text-blue-600 me-2"></star-icon>
            <span>My Reviews & Ratings</span>
          </li>
        </nuxt-link>
        <nuxt-link to="/my/wishlist">
          <li class="flex flex-row p-3">
            <heart-icon size="1.3x" class="text-blue-600 me-2"></heart-icon>
            <span>My Wishlist</span>
          </li>
        </nuxt-link>
        <nuxt-link to="/my/profile">
          <li class="flex flex-row p-3">
            <user-icon size="1.3x" class="text-blue-600 me-2"></user-icon>
            <span>Profile Information</span>
          </li>
        </nuxt-link>
        <nuxt-link to="/manage-adresses">
          <li class="flex flex-row p-3">
            <home-icon size="1.3x" class="text-blue-600 me-2"></home-icon>
            <span>Manage Address</span>
          </li>
        </nuxt-link>
        <li class="flex flex-row p-3">
          <log-out-icon
            size="1.3x"
            class="mb-1 text-blue-600 me-2"
          ></log-out-icon
          >Logout
        </li>
      </ul>
    </div>
    <!-- bottom image -->
    <!-- <div>
      <img src="/img/banner_hamburger_300.jpg" alt="bottomImage" />
    </div> -->
  </div>
</template>

<style scoped>
/* .nav {
  @apply mx-2 tracking-wide  font-medium px-3 py-2 rounded-lg;
} */
.nav:hover {
  @apply bg-gray-100;
}
/* .selected {
  @apply font-semibold text-white bg-black;
} */
.selected:hover {
  @apply bg-gray-500;
}
.blur {
  backdrop-filter: saturate(180%) blur(5px);
}
.nav:hover {
  @apply text-blue-600;
}
.nav {
  font-weight: 600;
  @apply uppercase;
}
</style>

<script>
import MyntraMen from './MyntraMen'
import { mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters({ megamenu: 'megamenu' }),
    user() {
      return this.$store.state.auth.user
    },
  },
  data() {
    return {
      selectedCategory: 'dashboard',
      dashboard: false,
      // sidebar: true,
      isOpen: false,
      isMen: false,
      isSettings: false,
      selectedIndex: null,
      showCollapsible: false,
      collapseData: null,
    }
  },
  mounted() {
    // $nuxt.$on('hide', () => {
    //   this.hideSidebar(null)
    // })
    // console.log(this.megamenu, 'hhhhhh')
  },
  methods: {
    showChildren(i, collapseData) {
      // console.log('Naamn')
      if (this.selectedIndex == i) {
        this.selectedIndex = null
        this.collapseData = null
      } else {
        this.selectedIndex = i
        this.collapseData = collapseData
      }
    },
    // showSidebar(e) {
    //   this.sidebar = true
    // },
    hideSidebar(e) {
      // this.sidebar = false
      if (e) this.$router.push(`/c/${e}`)
      this.$emit('hideSidebar', true)
    },
  },
}
</script>
