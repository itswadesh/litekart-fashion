<template>
  <div class>
    <Navbar />
    <SliderBar />

    <div class="flex-no-wrap justify-between w-full bg-gray-300 xl:flex">
      <div class="flex-1 md:flex">
        <div class="relative hidden w-1/5 text-gray-700 bg-gray-300 lg:flex">
          <Menu />
        </div>
        <div class="flex-1 w-full px-2 py-2 mx-auto bg-gray-300 lg:px-4 lg:my-3">
          <Addstory />
          <Feeds />
        </div>
      </div>
      <div class="px-2 pt-2 bg-gray-200 xl:flex-col lg:hidden xl:flex lg:w-1/4 lg:px-10">
        <Upcomingevents />
        <instantgames />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar'
import Menu from '~/components/Menu'
import Addstory from '~/components/Addstory'
import Feeds from '~/components/Feeds'
import Upcomingevents from '~/components/Upcomingevents'
import Instantgames from '~/components/Instantgames'
import {} from 'vue-feather-icons'
export default {
  components: {
    Navbar,
    Menu,
    Addstory,
    Feeds,
    Upcomingevents,
    Instantgames,
  },
}
</script>
<style scoped>
.menu {
  border-top-right-radius: 40px;
}
.ip {
  border-top-left-radius: 100px;
}
</style>
