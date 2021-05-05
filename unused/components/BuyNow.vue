<template>
  <div class="grid visible w-full mt-2 ms-0 md:ms-16 md:mt-6 md:w-11/12">
    <div class="flex flex-col w-full p-3 mt-4 bg-white shadow">
      <div v-if="addresses && addresses.count > 0">
        <div
          v-for="(a, id) in addresses && addresses.data"
          :key="id"
          class="flex flex-row justify-between p-1 pt-4 mt-2 border-b rounded hover:bg-blue-100"
        >
          <div class="flex flex-row">
            <span class="flex flex-col">
              <label class="pr-3 material-radio">
                <input
                  type="radio"
                  id="address"
                  name="group"
                  :value="a"
                  v-model="selectedAddress"
                />
                <span class="text-sm font-semibold">
                  {{ a.firstName }} {{ a.lastName }} :{{ a.phone }}
                  <span class="text-sm font-normal ms-10">
                    {{ a.address }} {{ a.city }},{{ a.state }},{{ a.zip }}
                  </span>

                  <span
                    class="text-sm font-semibold text-accent-900"
                    v-if="!a.address && !a.city && !a.state && !a.zip"
                  >
                    <span v-if="!a.address">Address</span>
                    <span v-if="!a.city">,City</span>
                    <span v-if="!a.state">,State</span>
                    <span v-if="!a.zip">,Zip Code</span> is not present.
                  </span>
                </span>
              </label>
              <!-- <span v-if="a.id == selectedAddress.id" class="mt-3 mb-2 ms-10">
              <button
                class="w-auto h-12 p-3 pl-16 pr-16 font-semibold text-white bg-yellow-500 rounded shadow"
              >
                DELIVER HERE
              </button>
            </span> -->
            </span>
          </div>
          <div class="pr-4">
            <nuxt-link
              :to="
                localePath(
                  `/checkout/edit-address?id=${a.id}&prev=/checkout/address`
                )
              "
            >
              <button
                v-ripple="'rgba(255, 255, 255, 0.5)'"
                class="my-auto font-semibold text-blue-600 focus:outline-none"
              >
                Edit
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div v-else>
        <button>Add</button>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-between p-3 mt-2 bg-white md:pt-2 md:flex-row"
    >
      <span v-if="profile" class="pt-2 text-md">
        Payment Method:
        <label class="material-radio">
          <input
            type="radio"
            value="COD"
            v-model="paymentMethod"
            name="group"
          />
          <span>Cash On Delivery</span>
        </label>
        <label class="material-radio">
          <input
            type="radio"
            name="group"
            v-model="paymentMethod"
            value="Online Payment"
          />
          <span>Online Payment</span>
        </label>
      </span>
      <nuxt-link
        :to="localePath('/')"
        class="duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-95"
      >
        <button
          @click="checkOut"
          v-ripple="'rgba(255, 255, 255, 0.5)'"
          class="items-center w-48 h-10 mx-auto mt-2 text-lg font-semibold text-white bg-yellow-600 rounded shadow-lg md:mt-0 md:mx-0 focus:outline-none"
        >
          Check Out
        </button>
      </nuxt-link>
    </div>
    <div
      class="flex flex-col justify-between p-3 mt-2 bg-white md:pt-2 md:flex-row"
    >
      <span v-if="profile" class="pt-2 text-sm">
        Order confirmation email will be sent to
      </span>
      <nuxt-link
        :to="localePath('/payment-method')"
        class="duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-95"
      >
        <button
          @click="checkOut"
          v-ripple="'rgba(255, 255, 255, 0.5)'"
          class="items-center w-48 h-10 mx-auto mt-2 text-lg font-semibold text-white bg-yellow-600 rounded shadow-lg md:mt-0 md:mx-0 focus:outline-none"
        >
          Continue
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import CheckoutSkeleton from '~/components/AllSkeletons/CheckoutSkeleton'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ADDRESS from '~/gql/address/addresses.gql'
import CHECKOUT from '~/gql/cart/checkout.gql'

export default {
  mounted() {
    // console.log(this.user)
  },
  data() {
    return {
      loadingChek: false,
      loading: false,
      selectedAddress: [],
      paymentMethod: null,
      select: false,
      addresses: null,
      profile: {
        email: '',
      },
    }
  },
  components: {
    CheckoutSkeleton,
  },
  async created() {
    // await this.getMe()
    // await this.getCart()
    await this.getAddress()
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    ...mapGetters({
      settings: 'settings',
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
    }),
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addToCart' }),
    ...mapMutaions({ setErr: 'setErr' }),
    async addToBag(obj) {
      try {
        this.loading = true
        await this.addToCart(obj)
        // if (!!this.notify && obj.qty > 0) this.toast()
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async checkOut() {
      // console.log('addredd added', this.checkout)
      // console.log(this.selectedAddress[0], this.paymentMethod)
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: CHECKOUT,
            variables: {
              address: {
                address: {
                  address: this.selectedAddress[0].address,
                  ciry: this.selectedAddress[0].city,
                  country: this.selectedAddress[0].country,
                  state: this.selectedAddress[0].state,
                },
              },

              paymentMethod: this.paymentMethod,
            },
          })
        ).data.checkout
        // console.log('address reciewved', this.checkout)
      } catch (e) {
        this.setErr(e.toString())
        // console.log(e)
      } finally {
      }
    },
    // get address
    async getAddress() {
      try {
        this.addresses = (
          await this.$apollo.query({
            query: ADDRESS,
            fetchPolicy: 'no-cache',
          })
        ).data.addresses
        // console.log('manage address 222', this.addresses)
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>

<style scoped>
.pl {
  margin-top: 5px;
  padding-left: 5px;
  height: 14px;
  width: 14px;
}
.buttons {
  height: 1.75rem;
  width: 1.75rem;
}
.count {
  height: 1.75rem;
  width: 2.5rem;
}
</style>
