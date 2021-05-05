<template>
  <li class="block text-sm font-semibold list-none">
    <button
      class="flex border-l-2 border-transparent hover:border-indigo-600 items-center justify-between w-full py-1.5 px-2 cursor-pointer focus:outline-none"
      @click="toggleShow"
    >
      {{ title }}
      <ChevronDownIcon
        v-if="submenu"
        width="20"
        height="20"
        :class="{ 'rotate-90': showMenu }"
        class="pt-1 bg-transparent me-5"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </ChevronDownIcon>
    </button>
    <ul
      class="overflow-hidden font-normal ms-4"
      v-if="submenu"
      :class="this.class"
    >
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons'
export default {
  props: ['title', 'link', 'height', 'submenu'],
  components: { ChevronDownIcon },
  data() {
    return {
      showMenu: false,
    }
  },
  created() {
    if (this.$route.hash.replace('#', '') == this.link) {
      this.showMenu = true
    }
  },
  methods: {
    toggleShow(t) {
      this.$emit('hideSidebar')
      this.$router.push(`${this.$router.currentRoute.path}`)
      this.showMenu = !this.showMenu
      if (!this.submenu) this.$router.push(this.link)
    },
  },
  computed: {
    class() {
      return this.showMenu ? this.height : 'h-0'
    },
  },
}
</script>

<style scoped>
.dropdown-menu {
  transition: 300ms;
  color: white;
}
svg.rotate-90 {
  transform: rotate(-90deg);
}
button:hover {
  @apply bg-indigo-500;
  @apply bg-opacity-20;
}
</style>
