<template>
  <div class="flex flex-col bg-white sm:p-1">
    <div class="p-3 my-auto text-lg font-medium text-center text-gray-600">
      PRICE DETAILS
    </div>
    <div v-if="cart">
      <div>
        <button
          @click="showOffers = !showOffers"
          class="flex flex-row focus:outline-none"
        >
          <span
            class="flex-shrink-0 text-sm font-medium cursor-pointer ms-3 text-secondary-200 hover:text-secondary-400"
          >
            See Available Offer
          </span>
          <!-- <span class="flex-shrink-0 mx-auto text-white bg-green-700 rounded-full pl">i</span>-->
        </button>
        <div v-if="showOffers">
          <TestCoupons
            :class="showOffers ? 'open' : 'close'"
            @hide="hideOffers"
          />
        </div>
      </div>

      <div
        class="container flex flex-row justify-between flex-shrink-0 p-2 px-3 mx-auto text-base font-light"
      >
        <span>Items Subtotal</span>
        <span>{{ cart.subtotal | currency(settings.currency_symbol) }}</span>
      </div>

      <div
        class="container flex flex-row justify-between flex-shrink-0 p-2 px-3 mx-auto text-base font-light"
      >
        <span>Total Item</span>
        <span>{{ cart.qty }}</span>
      </div>

      <div
        class="container flex flex-row justify-between p-2 px-3 mx-auto text-base font-light"
        v-if="cart.discount && cart.discount.amount > 0"
      >
        <span>Applied Coupon</span>
        <span class="text-primary-500">
          {{ cart.discount.code }}
        </span>
        <button @click="removeCoupon">Remove</button>
      </div>

      <div
        class="container flex flex-row justify-between p-2 px-3 mx-auto text-base font-ligth"
        v-if="cart.discount && cart.discount.amount > 0"
      >
        <span>Your Savings</span>
        <span class="text-accent-900">
          -{{ cart.discount.amount | currency(settings.currency_symbol) }}
        </span>
      </div>

      <div
        class="container flex flex-row justify-between p-2 px-3 mx-auto text-base font-light"
        v-if="cart.shipping"
      >
        <span>Delivery Charge</span>
        <span>{{
          cart.shipping.charge | currency(settings.currency_symbol)
        }}</span>
      </div>

      <div
        class="container flex flex-row justify-between p-2 px-3 mx-auto mb-16 text-base font-semibold text-gray-600 sm:mb-0"
      >
        <span class="text-xl">Total Amount</span>
        <!-- class="text-secondary-400" -->
        <span class="text-xl">
          {{ cart.total | currency(settings.currency_symbol) }}
        </span>
      </div>
      <div class="fixed bottom-0 w-full mt-3 sm:relative sm:px-3">
        <Button
          class="p-3 text-white bg-primary-500 focus:ring-primary-500 sm:my-4"
          :disabled="loading"
          @click="proceed"
        >
          Proceed
        </Button>
        <!-- <button
          :disabled="loading"
          @click="proceed"
          class="flex items-center justify-center w-full p-3 mt-4 sm:mt-0 sm:my-4 
          text-white duration-200 bg-primary-500 
          hover:-translate-y-0.5 transition transform ease-in-out sm:rounded 
          focus:ring-opacity-50 focus:ring focus:ring-offset-2 
          hover:opacity-80 focus:ring-yellow-600 focus:outline-none"
        >
          <div class="w-full font-semibold tracking-widest uppercase">
            Proceed
          </div>
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import TestCoupons from '~/components/Cart/TestCoupons'
import { mapGetters, mapActions } from 'vuex'
import { Button } from '~/shared/components/ui'

// import CART from "~/gql/cart/cart.gql"
export default {
  data() {
    return {
      showOffers: false,
      hide: false,
    }
  },
  components: { TestCoupons, Button },
  props: {
    selectedAddress: { type: String },
    loading: { type: Boolean },
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      settings: 'settings',
    }),
  },
  methods: {
    ...mapActions({ removeCoupon: 'cart/removeCoupon' }),
    proceed() {
      if (!this.selectedAddress) {
        this.$router.push(`/checkout/add`)
        return
      }
      this.$router.push(
        `/checkout/payment-options?address=${this.selectedAddress}`
      )
    },
    hideOffers() {
      // console.log("hide offers")
      this.showOffers = false
    },
  },
}
</script>

<style scoped>
.close {
  /* left: -100%; */
  transition: 0.3s all;
}
.open {
  /* left: 0; */
  transition: 0.3s all;
}
</style>
