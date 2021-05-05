<template>
  <div class="sticky inset-0 flex flex-col flex-shrink-0 h-full width">
    <div
      v-if="user"
      class="flex flex-row h-20 p-3 my-auto mb-4 bg-white rounded shadow cursor-pointer"
    >
      <img v-lazy="'/img/profile-pic.svg'" alt="pp" />
      <span class="my-auto">
        <h1 class="my-auto text-sm ms-4 font-semibld">Hello,</h1>
        <h1 class="my-auto text-lg font-semibold capitalize ms-4">
          {{ user.firstName }} {{ user.lastName }}
        </h1>
      </span>
    </div>
    <nuxt-link :to="localePath('/my/orders')">
      <div
        class="flex flex-row justify-between p-3 pl-6 bg-white border-b rounded shadow cursor-pointer h-14"
      >
        <span class="flex flex-row">
          <ShoppingBagIcon class="text-blue-600 me-4" size="1.5x" />
          <span class="text-lg text-gray-600 hover:text-blue-500"
            >MY ORDERS</span
          >
        </span>
        <chevron-right-icon
          size="1.5x"
          class="text-gray-600 custom-class"
        ></chevron-right-icon>
      </div>
    </nuxt-link>
    <!-- account setting -->
    <div class="pt-2 pb-4 bg-white border-b rounded">
      <span class="flex flex-row p-3 pl-6 rounded cursor-pointer h-14">
        <UserIcon class="text-blue-600 me-4" size="1.5x" />
        <span class="text-lg text-gray-600">ACCOUNT SETTING</span>
      </span>

      <span class="flex flex-col text-sm">
        <nuxt-link :to="localePath('/my/profile')">
          <span
            class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
          >
            Profile Information
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/manage-adresses')">
          <span
            class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
          >
            Manage Addresses
          </span>
        </nuxt-link>
        <span
          class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
        >
          PAN Card Information
        </span>
      </span>
    </div>
    <!-- payments -->

    <div class="pt-2 pb-4 bg-white border-b rounded">
      <span class="flex flex-row p-3 pl-6 rounded cursor-pointer h-14">
        <dollar-sign-icon
          size="1.5x"
          class="text-blue-600 me-4 custom-class"
        ></dollar-sign-icon>
        <span class="text-lg text-gray-600">PAYMNETS</span>
      </span>
      <span class="flex flex-col text-sm">
        <span
          class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
        >
          Gift Cards
        </span>
        <!-- <span
          class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
        >
          Saved Cards
        </span>-->
      </span>
    </div>
    <!-- my chats -->

    <div
      class="flex flex-row justify-between p-3 pl-6 bg-white border-b rounded shadow cursor-pointer h-14"
    >
      <span class="flex flex-row">
        <message-square-icon
          size="1.5x"
          class="text-blue-600 me-4 custom-class"
        ></message-square-icon>
        <span class="text-lg text-gray-600">MY CHATS</span>
      </span>

      <chevron-right-icon
        size="1.5x"
        class="text-gray-600 custom-class"
      ></chevron-right-icon>
    </div>
    <!-- my stuff -->
    <div class="pt-2 pb-4 bg-white border-b rounded">
      <span class="flex flex-row p-3 pl-6 rounded h-14">
        <grid-icon
          size="1.5x"
          class="text-blue-600 me-4 custom-class"
        ></grid-icon>
        <span class="text-lg text-gray-600">MY STUFF</span>
      </span>
      <span class="flex flex-col text-sm">
        <nuxt-link :to="localePath('/my/coupons')">
          <span
            class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
          >
            My Coupons
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/reviews-and-ratings')">
          <span
            class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
          >
            My Review & Ratings
          </span>
        </nuxt-link>
        <span
          class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
        >
          All Notifications
        </span>
        <nuxt-link :to="localePath('/my/wishlist')">
          <span
            class="w-full p-2 pl-16 cursor-pointer hover:text-blue-500 hover:bg-blue-100"
          >
            My Wishlist
          </span>
        </nuxt-link>
      </span>
    </div>

    <!-- log out  -->
    <button
      @click="logout"
      type="button"
      class="flex flex-row p-3 pl-6 bg-white border-b rounded shadow cursor-pointer h-14 hover:text-blue-500 focus:outline-none"
    >
      <log-out-icon size="1.5x" class="text-blue-600 me-4"></log-out-icon>
      <span class="text-lg text-gray-600 hover:text-blue-500">LOG OUT</span>
    </button>
    <!-- frequnlty visits -->
    <div
      class="flex flex-col h-20 p-3 pl-4 my-auto mt-4 mb-4 text-sm bg-white rounded shadow"
    >
      <h1 class="my-auto">Frequenty Visited:</h1>
      <h1 class="text-xs text-gray-600 cursor-pointer">
        Change Password Track Order Help Center
      </h1>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SIGNOUT from '~/gql/user/signOut.gql'
// import ME from '~/gql/user/me.gql'

export default {
  components: {},
  data() {
    return {
      signOut: {
        email: '',
        password: '',
      },
      // profile: {
      //   firstName: '',
      //   lastName: '',
      // },
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user
    },
  },
  // async created() {
  //   await this.getMe()
  // },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async logout() {
      let msg = 'successfully logged out'
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: SIGNOUT,
          })
        ).data.signOut
        this.success(msg)
        this.$store.dispatch('fetch')
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
    // async getMe() {
    //   try {
    //     this.profile = (
    //       await this.$apollo.query({
    //         query: ME,
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.me
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //   }
    // },
  },
}
</script>

<style scoped>
.width {
  width: 20rem;
}
</style>
