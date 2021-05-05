<template>
  <div class="z-50 ms-2">
    <div class="flex items-center justify-center triangle"></div>
    <div
      class="absolute z-10 float-right w-56 py-2 mx-auto text-sm font-normal bg-white rounded shadow-xl -ms-24"
    >
      <div
        class="flex w-56 px-4 py-1 text-gray-800 bg-white border-b hover:bg-gray-100"
      >
        <!-- to login  -->
        <span v-if="!user" class="flex">
          <nuxt-link to="/login">
            <a href class="font-semibold me-6">{{ options1 }}</a>
          </nuxt-link>

          <!-- to  register  -->
          <nuxt-link to="/register-page">
            <a href class="font-semibold text-blue-600 ms-20">{{ options2 }}</a>
          </nuxt-link>
        </span>

        <span
          class="flex justify-center text-center text-primary-500 font-semibol"
          v-else
          >Hi,&nbsp;{{ user && user.firstName }}</span
        >
      </div>
      <div class="divide-y divide-gray-300">
        <nuxt-link to="/my/profile">
          <a
            href="#"
            class="flex w-56 px-4 py-3 text-gray-800 bg-white hover:bg-gray-100"
          >
            <UserIcon class="text-sm text-blue-500 me-2" size="1.2x" />
            {{ options3 }}
          </a>
        </nuxt-link>
        <!-- <a href="#" class="flex w-56 px-4 py-3 text-gray-800 bg-white hover:bg-gray-100">
          <img src="/img/plus.png" alt="plus" class="h-5 mt-1 me-2" />
          {{ options4 }}
          Plus Zone
        </a>-->
        <nuxt-link to="/my/orders">
          <a
            href="#"
            class="flex w-56 px-4 py-3 text-gray-800 bg-white border-t border-b hover:bg-gray-100"
          >
            <ShoppingBagIcon class="text-sm text-blue-500 me-2" size="1.2x" />
            {{ options5 }}
          </a>
        </nuxt-link>
        <nuxt-link to="/my/wishlist">
          <a
            v-if="wishlists"
            href="#"
            class="flex justify-between w-56 px-4 py-3 text-gray-800 bg-white border-b hover:bg-gray-100"
          >
            <span class="flex flex-row">
              <HeartIcon class="text-sm text-blue-500 me-2" size="1.2x" />
              {{ options6 }}
            </span>
            <span class="w-6 text-center text-gray-700 bg-gray-200 rounded-lg">
              {{ wishlists.count }}
            </span>
          </a>
        </nuxt-link>

        <nuxt-link to="/my/coupons">
          <a
            href="#"
            class="flex w-56 px-4 py-3 text-gray-800 bg-white hover:bg-gray-100"
          >
            <CreditCardIcon class="text-sm text-blue-500 me-2" size="1.2x" />
            {{ options7 }}
          </a>
        </nuxt-link>
        <a
          href="#"
          class="flex w-56 px-4 py-3 text-gray-800 bg-white hover:bg-gray-100"
        >
          <GiftIcon class="text-sm text-blue-500 me-2" size="1.2x" />
          {{ options8 }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import WISHLIST from '~/gql/wishlist/wishlists.gql'

export default {
  components: {},
  data() {
    return {
      wishlists: null,
      options1: 'LOGIN',
      options2: 'SignUp',
      options3: 'My Profile',
      // options4:'Flipart',
      options5: 'Order',
      options6: 'Wishlist',
      options7: 'Reward',
      options8: 'Gift Card',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  async created() {
    await this.getWishlist()
  },
  methods: {
    async getWishlist(id) {
      // console.log('getting wishlist', this.getWishlist)
      try {
        this.wishlists = (
          await this.$apollo.query({
            query: WISHLIST,
            fetchPolicy: 'no-cache',
          })
        ).data.wishlists
        //
        // console.log('wishlist......', this.wishlists)
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>

<style scoped>
.triangle {
  /* background-color: red; */
  width: 0;
  height: 0;
  border-right: 11px solid transparent;
  border-left: 11px solid transparent;
  border-bottom: 11px solid #fff;
  position: relative;
  /* position: center; */
  /* position: absolute; */
  margin-left: 26px;

  margin: auto;
}
</style>
