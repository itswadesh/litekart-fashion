<template>
  <Dashboard class="" />
</template>
<script>
import Nav from '~/components/Home/Nav'

import LeftUserProfile from '~/components/User/LeftUserProfile'
import Dashboard from '~/components/User/Dashboard/Dashboard.vue'
export default {
  head() {
    return {
      title: 'Dashboard',
    }
  },
  layout: 'account',
  middleware: ['isAuth'],
  components: {
    Nav,

    LeftUserProfile,
    Dashboard,
  },
}
</script>
