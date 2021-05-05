<template>
  <div class="relative pb-8 bg-gray-50 md:bg-white lg:bg-gray-50">
    <Nav />

    <div class="container flex flex-row max-w-full p-4 mx-auto sm:p-8">
      <LeftUserProfile
        class="hidden w-1/4 bg-white border rounded-sm shadow lg:block"
      />
      <SavedCards class="w-full -mt-4 lg:pl-8 lg:w-3/4" />
    </div>

    <div class="flex justify-center w-full">
      <Footer class="absolute bottom-0 hidden sm:flex" />
    </div>
  </div>
</template>
<script>
import Nav from '~/components/Home/Nav'

import LeftUserProfile from '~/components/User/LeftUserProfile'
import SavedCards from '~/components/User/Dashboard/SavedCards'
import Footer from '~/components/Footer'
export default {
  middleware: ['isAuth'],
  components: {
    Nav,
    Footer,

    LeftUserProfile,
    SavedCards,
  },
}
</script>
