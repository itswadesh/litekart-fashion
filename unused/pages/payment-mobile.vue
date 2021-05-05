<template>
  <div class="relative">
    <div>
      <CheckoutHeader selected="payment" />
      <div
        class="flex items-center justify-between p-3 m-auto shadow lg:py-2 lg:px-0 lg:shadow-none lg:w-1/2"
      >
        <nuxt-link
          :to="localePath('/checkout/address')"
          class="flex items-center"
        >
          <svg class="mb-1" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
            />
          </svg>
          <div class="text-xl font-bold text-gray-700">Payment</div>
        </nuxt-link>
        <div class="text-xs text-gray-600">Step 3 of 3</div>
      </div>
      <br />
      <div class="p-2 m-auto text-sm text-gray-700 lg:px-0 lg:w-1/2">
        <div class="mb-6 text-lg text-center">
          Select your prefered payment method
        </div>
        <ApolloQuery
          :query="require('~/gql/payment/paymentMethods.gql')"
          :variables="{ active: true }"
          :update="
            (data) => {
              paymentMethod = data.paymentMethods.data[0].value
              return data.paymentMethods
            }
          "
        >
          <template v-slot="{ result: { error, data }, isLoading }">
            <div v-if="isLoading">Loading...</div>
            <ErrComponent v-else-if="error" :error="error" />
            <div v-else-if="data && data.data.length > 0">
              <div v-for="p in data.data" :key="p.id">
                <div
                  v-if="
                    paymentMethod == 'Stripe' &&
                    p.name == 'Stripe' &&
                    loadedStripe &&
                    p.key &&
                    p.key != null
                  "
                  class="px-6 py-4 my-2 rounded shadow-lg"
                >
                  <client-only placeholder="Loading...">
                    <Card
                      class="stripe-card input"
                      id="card"
                      :class="{ complete }"
                      :stripe="p.key"
                      @change="complete = $event.complete"
                    />
                  </client-only>
                </div>

                <label
                  class="flex justify-between w-full px-6 py-4 my-2 bg-white rounded shadow-lg cursor-pointer"
                >
                  <div class="flex-1">
                    <h2 class="text-xl font-black">{{ p.name }}</h2>
                    <div
                      v-if="p.name != 'COD' && (!p.key || p.key == '')"
                      class="text-center text-accent-900"
                    >
                      {{ p.name }} Publishable key is invalid
                    </div>
                    <span v-else>
                      {{ p.text }}
                    </span>
                  </div>
                  <div class="flex items-center">
                    <img v-lazy="p.img" :alt="p.name" class="w-16 h-12 mx-4" />
                    <Radio
                      :value="p.value"
                      v-model="paymentMethod"
                      :color="p.color"
                    />
                  </div>
                </label>
              </div>
            </div>
          </template>
        </ApolloQuery>

        <div
          v-if="
            paymentMethod == 'Stripe' &&
            loadedStripe &&
            settings.stripePublishableKey
          "
          class="px-6 py-4 my-2 rounded shadow-lg"
        >
          <client-only placeholder="Loading...">
            <Card
              class="stripe-card input"
              id="card"
              :class="{ complete }"
              :stripe="settings.stripePublishableKey"
              @change="complete = $event.complete"
            />
          </client-only>
        </div>
        <!-- <label
        v-if="
          settings.stripePublishableKey &&
          settings.stripePublishableKey != '' &&
          settings.enableStripe
        "
        class="flex justify-between px-6 py-4 my-2 bg-white rounded shadow-lg"
      >
        <div class="flex-1">
          <h2 class="text-xl font-black">Stripe</h2>
          </span>
            Pay full amount with Stripe
         </span>
        </div>
        <div class="flex items-center">
          <img v-lazy="`/stripe.png`" alt="Wallet" class="w-16 h-12 mx-4" />
          <Radio value="Stripe" v-model="paymentMethod" color="blue" />
        </div>
      </label> -->
        <!-- <label
        v-if="
          settings.RAZORPAY_KEY_ID &&
          settings.RAZORPAY_KEY_ID != '' &&
          settings.enableRazorpay
        "
        class="flex justify-between px-6 py-4 my-2 bg-white rounded shadow-lg"
      >
        <div class="flex-1">
          <h2 class="text-xl font-black">Digital</h2>
          </span>
            Pay full amount with online / UPI / Wallets / Credit Cards / Debit
            Cards
         </span>
        </div>
        <div class="flex items-center">
          <img v-lazy="`/wallet.png`" alt="Wallet" class="w-16 h-12 mx-4" />
          <Radio value="Online" v-model="paymentMethod" color="blue" />
        </div>
      </label> -->
        <!-- <label
        class="flex justify-between px-6 py-4 my-2 bg-white rounded shadow-lg"
      >
        <div class="flex-1">
          <h2 class="text-xl font-black">COD</h2>
          </span>Pay Cash after your item arrives</span>
        </div>
        <div class="flex items-center">
          <img v-lazy="`/cod.png`" alt="Wallet" class="w-16 h-12 mx-4" />
          <Radio value="COD" v-model="paymentMethod" />
        </div>
      </label> -->
      </div>

      <div
        class="p-2 m-auto mb-32 text-sm text-gray-700 lg:px-0 lg:w-1/2 lg:mb-2"
      >
        <div>DELIVER TO</div>
        <div class="flex justify-between w-full bg-white rounded shadow">
          <div class="flex-1 p-2" v-if="address">
            <div class="font-semibold">
              {{ address.firstName }} {{ address.lastName }}
            </div>
            <div class="py-2 text-xs">
              <div>{{ address.address }}</div>
              <div>{{ address.city }}</div>
              <div>{{ address.state }}</div>
              <div>{{ address.zip }}</div>
              <div class="pt-2">
                Mobile:
                <span class="font-bold">{{ address.phone }}</span>
              </div>
              <div class="pt-2">
                <nuxt-link
                  :to="localePath('/checkout/address')"
                  class="font-semibold text-blue-700"
                  >Change Address</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="fixed bottom-0 w-full p-2 m-auto font-bold bg-white shadow-md lg:shadow-none lg:w-1/2 lg:relative"
      >
        <div class="flex items-center p-3">
          <div class="flex-1 text-center">
            <div>{{ cart.total | currency(settings.currency_symbol) }}</div>
            <div>
              <nuxt-link :to="localePath('/cart')" class="text-accent-900"
                >view details</nuxt-link
              >
            </div>
          </div>
          <form
            novalidate
            autocomplete="off"
            @submit.stop.prevent="submit()"
            class="flex-1 p-1"
          >
            <Submit class="w-full bg-yellow-600">
              <span v-if="paymentMethod == 'COD'">Place Order</span>
              <span v-else-if="razorpayReady && loadedStripe">Pay Now</span>
            </Submit>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Radio, Submit } from '~/shared/components/ui'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader')
import CAPTURE_PAY from '~/gql/pay/capturePay.gql'
import RAZORPAY from '~/gql/pay/razorpay.gql'
import STRIPE_MUTATION from '~/gql/pay/stripe.gql'
import ADDRESS from '~/gql/address/address.gql'
import VALIDATE_CART from '~/gql/cart/validateCart.gql'
import { Card, createToken, CardNumber } from 'vue-stripe-elements-plus'
// import { STRIPE_PUBLISHABLE_KEY } from '~/shared/config'

export default {
  middleware: ['isAuth'],
  middleware({ store, redirect }) {
    if (store.state.cart.qty < 1) return redirect('/cart')
  },
  components: { CheckoutHeader, Radio, Submit, Card },
  data() {
    return {
      error: null,
      address: {},
      paymentMethod: 'COD',
      razorpayReady: false,
      stripeReady: false,
      loadedStripe: false,
      complete: false,
      // stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
    }
  },
  // mounted() {
  //   if (window && window.Stripe) this.stripeReady = true
  // },
  async created() {
    try {
      this.clearErr()
      // this.$store.commit('clearErr')
      const id = this.$route.query.address
      if (!id) this.$router.push('/checkout/address')
      this.address = (
        await this.$apollo.query({ query: ADDRESS, variables: { id } })
      ).data.address
      let razorpayScript = document.createElement('script')
      razorpayScript.setAttribute(
        'src',
        'https://checkout.razorpay.com/v1/checkout.js'
      )
      document.head.appendChild(razorpayScript)
      this.razorpayReady = true

      if (process.browser) {
        let domElement = document.createElement('script')
        domElement.setAttribute('src', 'https://js.stripe.com/v3/')
        domElement.onload = () => {
          this.loadedStripe = true
        }
        document.body.appendChild(domElement)
      }
      // let stripeScript = document.createElement('script')
      // stripeScript.setAttribute('src', 'https://js.stripe.com/v3/')
      // document.head.appendChild(stripeScript)
      // this.stripeReady = true
    } catch (e) {
      this.setErr(e)
      // this.$store.commit('setErr', e)
    } finally {
      this.busy(false)
      // this.$store.commit('busy', false)
    }
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    ...mapActions({
      applyDiscount: 'cart/applyDiscount',
      checkout: 'cart/checkout',
    }),
    async submit() {
      if (this.address) {
        delete this.address.__typename
        if (this.address.coords) delete this.address.coords.__typename
        delete this.address.createdAt
        delete this.address.updatedAt
      }
      if (!this.address) this.$router.push('/checkout/address')
      this.clearErr()
      // this.$store.commit('clearErr')
      const location = this.$cookies.get('geo')
      if (this.paymentMethod == 'COD') {
        try {
          this.clearErr()
          // this.$store.commit('clearErr')
          await this.checkout({
            paymentMethod: 'COD',
            address: this.$route.query.address,
            location,
          })
        } catch (e) {
          this.$store.commit('info', e)
        } finally {
          return
        }
      } else if (this.paymentMethod == 'Stripe') {
        try {
          const { token } = await createToken()
          if (!token) return this.$store.commit('setErr', 'Invalid card number')
          let capture = (
            await this.$apollo.mutate({
              mutation: STRIPE_MUTATION,
              variables: { address: this.address, token: token.id, location },
            })
          ).data.stripe
          this.$router.push(`/success?id=${capture.id}`)
        } catch (e) {
          this.setErr(e)
          // this.$store.commit('setErr', e)
          // console.log('Stripe error... ', e)
        } finally {
        }
        return
      }
      const vm = this
      let rp = {}
      try {
        // this.address.zip = +this.address.zip
        vm.$store.commit('clearErr')
        const vc = (await this.$apollo.query({ query: VALIDATE_CART })).data
          .validateCart
        rp = (
          await this.$apollo.mutate({
            mutation: RAZORPAY,
            variables: { address: this.address, location },
          })
        ).data.razorpay

        var options = {
          key: vm.settings.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          name: vm.settings.WEBSITE_NAME,
          description: 'Payment for Shopping',
          image: vm.settings.logo,
          amount: rp.amount,
          order_id: rp.id,
          handler: async function (response) {
            try {
              vm.$store.commit('clearErr')
              const capture = (
                await vm.$apollo.mutate({
                  mutation: CAPTURE_PAY,
                  variables: {
                    id: response.razorpay_payment_id,
                    oid: response.razorpay_order_id,
                  },
                })
              ).data.capturePay
              vm.$store.commit('cart/clear')
              vm.$router.push(`/success?id=${capture.id}`)
            } catch (e) {
              vm.$store.commit('setErr', e)
              vm.$router.push(`/failure`)
            } finally {
              vm.$store.commit('busy', false)
            }
          },
          prefill: {
            name: `${this.user && this.user.firstName} ${
              this.user && this.user.lastName
            }`,
            phone: this.user && this.user.phone,
            email: (this.user && this.user.email) || 'hi@litekart.in',
            contact: this.user && this.user.phone,
          },
          notes: {
            address: 'note value',
          },
          theme: {
            color: '#F37254',
          },
        }
        var rzp1 = new Razorpay(options)
        rzp1.open()
      } catch (e) {
        vm.$store.commit('setErr', e)
      } finally {
        vm.$store.commit('busy', false)
      }
    },
  },
  head() {
    return {
      title: 'Payment',
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      cart: 'cart/cart',
      settings: 'settings',
    }),
    disable() {
      if (this.paymentMethod === 'Stripe')
        return !this.complete || this.errors.any()
      else return this.errors.any()
    },
  },
  layout: 'none',
}
</script>
