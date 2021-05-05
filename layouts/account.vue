<template>
  <div
    class="relative flex flex-col w-full min-h-screen font-sans antialiased text-gray-900 bg-gray-50"
  >
    <Nav class="fixed top-0 z-50 w-full" />
    <div
      class="container flex flex-row justify-between w-full p-4 mx-auto my-3 mt-24 sm:p-2 sm:mt-28 lg:mt-20"
    >
      <LeftUserProfile class="hidden border rounded-sm shadow lg:block" />
      <nuxt class="w-full lg:ps-6 lg:w-3/4" />
    </div>
    <div class="flex-1 mt-12" />
    <Footer class="absolute bottom-0" />
  </div>
</template>

<script>
import { Error } from '~/shared/components'
import { Loading } from '~/shared/components/ui'
import Footer from '~/components/Footer'
import LeftUserProfile from '~/components/User/LeftUserProfile'

import Nav from '~/components/Home/Nav'
import { mapGetters } from 'vuex'
export default {
  components: { Error, Nav, Loading, Footer, LeftUserProfile },
  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },
  created() {
    // if (!this.user.firstName || this.user.firstName == '') {
    //   this.$router.push('/my/profile')
    // }
  },
  head() {
    return this.$nuxtI18nHead()
  },
}
</script>
