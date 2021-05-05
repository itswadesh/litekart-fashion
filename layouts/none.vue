<template>
  <div
    class="flex flex-col w-full min-h-screen font-sans antialiased text-gray-900 bg-gray-50"
  >
    <Nuxt />
    <div class="flex-1" />
  </div>
</template>
<script>
import BrownFooter from '~/components/Home/BrownFooter'

export default {
  components: {
    BrownFooter,
  },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>
