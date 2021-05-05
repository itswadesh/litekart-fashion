<template>
  <!-- slider menu -->
  <div>
    <button
      @click="showSidebar"
      aria-label="Open Menu"
      class="p-2 bg-gray-100 rounded focus:outline-none"
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 fill-current"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 12a1 1 0 011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM2 6a1 1 0
                011-1h18a1 1 0 110 2H3a1 1 0 01-1-1zM2 18a1 1 0 011-1h18a1 1 0
                110 2H3a1 1 0 01-1-1z"
        />
      </svg>
    </button>

    <div
      v-if="!!sidebar"
      class="fixed inset-0 z-10 text-gray-800 transition-transform transform"
    >
      <div class="z-10 h-full max-w-sm px-6 py-4 bg-white shadow-2xl ms-auto">
        <div class="flex items-center justify-between">
          <div></div>
          <button
            aria-label="Open sidebar"
            @click="hideSidebar"
            class="inline-flex items-center justify-center w-8 h-8 bg-gray-200 rounded focus:outline-none"
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
        <div class="mt-6">
          <div class="text-xl">
            <nuxt-link
              v-for="(l, ix) in links"
              :key="ix"
              @click="hideSidebar"
              :to="l.link"
              title="Link to home page"
              class="flex items-center px-4 py-2 mb-3 rounded hover:bg-gray-100 nuxt-link-exact-active nuxt-link-active"
              >{{ l.text }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      sidebar: false,
      links: [
        { link: '/', text: 'Home' },
        { link: '/login', text: 'Login' },
        { link: '/classes', text: 'Classes' },
        { link: '/byju/contactus', text: 'ContactUs' },
        { link: '/byju/course', text: 'Byju Courses' },
        { link: '/byju/freeclass', text: 'FreeeClasses' },
        { link: '/byju/learninganalysis', text: 'LearningAnalysis' },
        { link: '/byju/math', text: 'Math' },
        { link: '/byju/mathmatics', text: 'MathMatics' },
        { link: '/byju/notification', text: 'Notification' },
        { link: '/byju/parentcontact', text: 'ParentContact' },
        { link: '/byju/parents', text: 'ParentDetails' },
        { link: '/byju/sessiondetail', text: 'SessionDetails' },
        { link: '/byju/verify', text: 'Verify' },
        { link: '/byju/home', text: 'Home' },
      ],
    }
  },
  methods: {
    showSidebar(e) {
      this.sidebar = true
    },
    hideSidebar(e) {
      this.sidebar = false
    },
  },
}
</script>

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
