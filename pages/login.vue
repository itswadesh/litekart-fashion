<template>
  <div>
    <OtpLogin v-if="settings.otpLogin" :closeButton="false" />
    <LoginEmailUserLogin v-else />
  </div>
</template>

<script>
import OtpLogin from '~/components/Login/Mobile/OtpLogin'
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: 'Login',
    }
  },
  middleware: 'isGuest',
  components: {
    OtpLogin,
  },
  async asyncData({ params, app, store }) {
    const { title, keywords, description } = store.state.settings || {} // err = null
    return { title, keywords, description }
  },
  layout: 'none',
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
  head() {
    return {
      title: 'Login to ' + (this.settings || {}).websiteName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to ' + (this.settings || {}).websiteName,
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content: 'Login to ' + (this.settings || {}).websiteName,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Login to ' + (this.settings || {}).websiteName,
        },
        // Twitter
        {
          name: 'twitter:title',
          content: 'Login to ' + (this.settings || {}).websiteName,
        },
        {
          name: 'twitter:description',
          content: 'Login to ' + (this.settings || {}).websiteName,
        },
      ],
    }
  },
}
</script>
<style scoped>
.frosted {
  backdrop-filter: blur(15px);
  background-color: hsla(0, 0%, 100%, 0.75);
}
</style>
