<template>
  <div>
    <!-- bottom add to cart -->
    <div class="hidden h-12 overflow-hidden md:flex">
      <div class="flex flex-col items-center mx-auto mt-1">
        <button
          @click="
            addToBag({
              pid: product.pid || pid,
              qty: 1,
              vid: product.pid || pid,
              options: [],
              vendor: product.vendor,
            })
          "
          :disabled="isDisabled"
          class="focus:outline-none"
        >
          <!--  loading indicator -->
          <div
            v-if="iconloading"
            class="flex items-center justify-center p-1 px-1 bg-gray-400 rounded"
          >
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
            <span class="mx-2 text-xs">Adding to Cart</span>
          </div>

          <div
            v-if="addedToCart"
            class="w-full px-2 py-1 text-sm text-white uppercase bg-gray-400 rounded md:px-6 md:text-normal focus:outline-none"
          >
            Added To Cart
          </div>
          <div
            v-else
            class="w-full px-2 py-1 text-sm text-white uppercase rounded bg-accent-600 hover:bg-accent-800 md:px-6 md:text-normal focus:outline-none"
          >
            Add To Cart
          </div>
          <!-- <span class="text-xs text-center text-gray-400">
                  </span>Size: XS, S, M, L, XL</span>
                </span> -->
        </button>
      </div>
    </div>
    <!-- mobile addtocart -->
    <div class="h-8 mt-2 overflow-hidden md:hidden">
      <div class="container absolute flex flex-col items-center mx-auto">
        <button
          @click="
            addToBag({
              pid: product.pid || pid,
              qty: 1,
              vid: product.pid || pid,
              options: [],
              vendor: product.vendor,
            })
          "
          :disabled="isDisabled"
          class="focus:outline-none"
        >
          <nuxt-link
            to="/cart"
            v-if="addedToCart"
            class="w-full px-3 py-1 text-sm font-semibold text-white uppercase bg-gray-400 addtext add rounded-2xl focus:outline-none"
          >
            Added
          </nuxt-link>
          <div
            v-else
            class="flex items-center justify-center px-3 py-2 text-white uppercase transition duration-300 ease-in-out transform addtext bg-secondary-500 rounded-2xl focus:outline-none hover:opacity-75 hover:-translate-y-1 hover:scale-100"
          >
            + Add
          </div>
        </button>
        <!-- <span class="mt-1 text-center textsize">
                </span>Size: XS, S, M, L, XL</span>
              </span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      show: false,
      isDisabled: false,
      iconloading: false,
      isActive: true,
      products: null,
      addedToCart: false,
    }
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      settings: 'settings',
    }),
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    ...mapActions({ addToCart: 'cart/addToCart' }),
    async addToBag(obj) {
      let msg = 'Product Added To the Cart'
      this.isDisabled = true
      // console.log(obj)
      try {
        await this.addToCart(obj)
        // if (!!this.notify && obj.qty > 0) this.toast()
        this.iconloading = true
        this.addedToCart = true

        this.success(msg)
      } catch (e) {
      } finally {
        this.iconloading = false
      }
    },
  },
}
</script>

<style></style>
