<template>
  <div v-if="product && product.id" class="w-full sm:px-8 md:px-0">
    <!-- go to cart -->
    <nuxt-link :to="localePath('/cart')" v-if="addedToCart">
      <button
        class="flex items-center justify-center w-full p-2 text-center text-white ease-in-out shadow sm:rounded button me-3 bg-secondary-500 focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-secondary-600 focus:outline-none md:px-6 md:p-3"
      >
        Go To Cart
      </button>
    </nuxt-link>
    <!-- add to cart -->
    <button
      v-else-if="product.stock > 0"
      @click="
        addToBag({
          pid: product.pid || product.id,
          qty: 1,
          vid: product.pid || product.id,
          options: selectedOptions,
        })
      "
      class="flex items-center justify-center w-full p-3 text-center text-white ease-in-out border-2 shadow border-primary-500 sm:rounded me-3 bg-primary-500 focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-yellow-600 focus:outline-none md:px-6 md:p-3"
    >
      <!-- loading icon -->
      <div v-if="iconloading" class="flex items-center justify-center">
        <svg
          style="height: 20px; width: 20px"
          class="text-white -ms-1 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <!-- <span v-if="text" class="mx-2">add</span> -->
        <span class="mx-2 text-base font-medium">Adding to Cart</span>
      </div>
      <!-- button text and svg-->
      <div v-else class="flex flex-row">
        <svg
          class="relative w-5 h-5 my-auto me-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          />
        </svg>
        <span>ADD TO CART</span>
      </div>
    </button>

    <button
      v-else
      class="flex items-center justify-center w-full p-2 text-center text-red-500 bg-white border border-red-500 shadow focus:outline-none sm:rounded button me-3 md:px-6 md:p-3"
    >
      No Stock
    </button>
    <!-- <div v-else>Vendor not found. can't proceed checkout</div> -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      addedToCart: false,
      isDisabled: false,
      iconloading: false,
    }
  },
  props: {
    product: Object,
    selectedOptions: { type: Object },
    options: { type: Array },
    userSelectedVariant: { type: Object },
  },
  methods: {
    ...mapActions({ addToCart: 'cart/addToCart' }),
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async addToBag(obj) {
      // if (!this.userSelectedVariant) {
      //   this.$emit('alertToSelectMandatoryOptions')
      //   return
      // } else {
      let msg = 'Product Added To the Cart'
      // console.log(obj)
      try {
        this.isDisabled = true
        this.iconloading = true
        // this.selectedOptions = []
        // if (!this.selectedOptions) {
        //   this.$emit('alertToSelectMandatoryOptions')
        //   return this.setErr(`Please select options`)
        // }
        // for (let o of this.options) {
        //   if (!this.selectedOptions[o.name]) {
        //     this.$emit('alertToSelectMandatoryOptions')
        //     return this.setErr(`Please select ${o.name}`)
        //   }
        // }
        obj.options = this.selectedOptions
        await this.addToCart(obj)
        this.addedToCart = true
        this.toast()
      } catch (e) {
      } finally {
        this.iconloading = false
        this.isDisabled = false
      }
      // }
    },
    toast() {
      this.$toast
        .show(
          `
      <div class="items-center hidden lg:flex w-72">
        <img class="object-cover w-12 h-12" v-lazy="${this.product.img}" alt="" />
        <div class="items-center toasted-text">
          <div class="text-xs text-gray-600">Added to your cart</div>
        </div>
      </div>
      `,
          {
            containerClass: 'sw-toast-container',
            theme: 'outline',
            position: 'top-right',
            singleton: false,
            action: {
              text: 'View Cart',
              onClick: (e, toastObject) => {
                this.$router.push('/cart')
                toastObject.goAway(0)
              },
            },
          }
        )
        .goAway(5000)
    },
  },
}
</script>

<style scoped>
.button {
  height: 53px;
}
</style>
