<template>
  <div class="pb-16 bg-gray-50">
    <Nav />

    <!-- <CategoryComponent class="hidden md:flex" /> -->
    <span class="bg-gray-200">
      <!-- <LeftSection /> -->
      <!-- <MobileFixedFooter class="md:hidden" /> -->
    </span>
  </div>
</template>

<script>
import Nav from '~/components/Home/Nav'

// import LeftSection from '~/components/User/Dashboard/LeftSection'
// import CategoryComponent from '~/components/Home/CategoryComponent'

export default {
  components: { Nav, LeftSection },
}
</script>
