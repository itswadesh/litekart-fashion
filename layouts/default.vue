<template>
  <div
    class="relative flex flex-col w-full font-sans antialiased text-gray-900 bg-gray-50"
  >
    <div class="min-h-screen">
      <Nav class="fixed top-0 z-50 w-full" @showLogin="showLogin" />
      <Nuxt class="w-full mt-24 lg:mt-16" />
      <div class="flex-1" />
    </div>
    <BrownFooter class="hidden sm:block" />
    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />
  </div>
</template>
<script>
import OtpLogin from '~/components/Login/Mobile/OtpLogin'
import Nav from '~/components/Home/Nav'
import BrownFooter from '~/components/Home/BrownFooter'
export default {
  data() {
    return {
      showLoginModal: false,
    }
  },
  methods: {
    showLogin(e) {
      this.showLoginModal = e
    },
  },
  components: { Nav, OtpLogin, BrownFooter },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>
