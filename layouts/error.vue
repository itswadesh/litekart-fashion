<template>
  <section class="min-h-screen px-8 py-1">
    <div
      class="pb-4 mx-auto font-bold text-center text-gray-800 border-b-4 border-gray-800 lg:w-1/2"
    >
      <h1 v-if="error.statusCode === 404">404</h1>
      <h1 v-else>Error!</h1>
      <img v-lazy="'/default_images/no-network.png'" alt="" class="w-full mx-auto sm:w-2/3">
      <div class="px-4 py-2 mt-3 text-red-500 bg-red-200 border border-red-300">
        {{ error.message }}
      </div>
    </div>
    <div>
      <nuxt-link
        to="/"
        class="block px-4 py-2 mt-4 text-sm font-thin text-center text-gray-700 rounded"
      >
        {{ settings.websiteName }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    error: { type: Object },
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      ...i18nHead,
      title: `Error Occured - ${this.settings.websiteName}`,
    }
  },
}
</script>

<style scoped lang="css">
h1 {
  @apply text-8xl;
  line-height: 150px;
  font-weight: 700;
  color: #252932;
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px,
    rgba(61, 61, 61, 0.3) 3px 3px;
}
</style>
