<template>
  <EditProfile />
</template>
<script>
import EditProfile from '~/components/User/Dashboard/EditProfile'
export default {
  head() {
    return {
      title: 'User Profile',
    }
  },
  layout: 'account',
  middleware: ['isAuth'],
  components: {
    EditProfile,
  },
}
</script>
