<template>
  <div
    class="relative flex flex-col w-full font-sans antialiased text-gray-900 bg-gray-50"
  >
    <div class="min-h-screen">
      <Nav class="fixed top-0 z-50 w-full" @showLogin="showLogin" />
      <Nuxt class="w-full mt-24 xl:mt-16" />
      <div class="flex-1" />
    </div>
    <BackToTopDark class="mb-3" />
    <BrownFooter class="bottom-0 hidden mt-16 sm:block" />
    <OtpLogin v-if="showLoginModal" @showLogin="showLogin" />
  </div>
</template>

<script>
import OtpLogin from '~/components/Login/Mobile/OtpLogin'
import Nav from '~/components/Home/Nav'
import Megamenu from '~/components/Home/Megamenu'
import { BackToTopDark } from '~/shared/components/ui'
import BrownFooter from '~/components/Home/BrownFooter'
import Footer from '~/components/Footer'

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
  components: { OtpLogin, BackToTopDark, Nav, Megamenu, BrownFooter, Footer },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>
