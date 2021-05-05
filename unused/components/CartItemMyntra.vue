<template>
  <div class="flex justify-between pt-5 pb-5 border-b border-gray-300">
    <div class="w-1/2 lg:w-1/3">
      <div>
        <img
          class="w-64 lg:rounded xs:rounded-b-none"
          v-lazy="item.img"
          alt=""
        />
        <!-- <div class="p-2 text-black bg-gray-300 rounded rounded-t-none lg:hidden xs:visible">Arrives 19 Sep</div> -->
      </div>
    </div>
    <div class="right-0 lg:w-4/5 xs:9/12">
      <div class="pl-4 font-hairline">
        <span class="mb-2 text-black">
          <nuxt-link :to="localePath(`/${item.slug}?id=${item._id}`)">{{
            item.name | truncate(30)
          }}</nuxt-link>
        </span>
        <div class="flex">
          <span class="mb-2 text-gray-500">
            <span>Size:</span>
            {{ item.size }}
          </span>
          <span
            class="inline-block w-2 h-2 m-2 bg-gray-300 rounded-full"
          ></span>
          <span style="color: rgb(237, 113, 0)" v-if="item.stock < 5"
            >{{ item.stock }} left</span
          >
        </div>
        <span class="relative mb-2">
          <span class="mb-2 text-2xl font-bold text-black">{{
            item.price | currency
          }}</span>
          <span
            class="text-xs text-gray-400 line-through ms-2 lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price) > 0"
            >{{ item.mrp | currency }}</span
          >
          <span
            class="text-xs text-green-400 ms-2 lg:text-sm"
            v-if="calculateOffPercent(item.mrp, item.price) > 0"
            >{{ calculateOffPercent(item.mrp, item.price) }}% off</span
          >
        </span>
        <div class="justify-between text-sm">
          <div class="flex flex-wrap">
            <div class="w-full my-2 lg:w-3/5">
              <CartButtonss
                :product="{ _id: item._id }"
                :variant="{ _id: item._id }"
              />
            </div>
            <div class="w-full my-2 text-right lg:w-2/5">
              <div class="flex text-xs">
                <button
                  class="p-1 rounded me-1 focus:outline-none primary"
                  @click="saveForLater(item)"
                >
                  MOVE TO WISHLIST
                </button>
                <button
                  class="px-3 py-2 rounded ms-3 muted"
                  @click="
                    checkAndAddToCart({
                      pid: item._id,
                      vid: item._id,
                      qty: -10000,
                      options: [],
                      vendor: item.vendor,
                    })
                  "
                  :disabled="loading"
                >
                  <img
                    v-lazy="'/loading.svg'"
                    class="w-3 h-3 rotateOutDownLeft"
                    v-if="loading"
                    alt=""
                  />
                  <i class="fa fa-trash" v-else></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// const CartButtonss = () => import('./CartButtonss')

export default {
  props: {
    item: { type: Object },
  },
  data() {
    return {
      loading: false,
    }
  },
  // components: { CartButtonss },
  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
    }),
    async saveForLater(item) {
      this.checkAndAddToCart({
        pid: item._id,
        vid: item._id,
        qty: -100000,
        options: [],
        vendor: item.vendor,
      })
      if (!(this.$store.state.auth || {}).user) {
        this.$router.push('/account/login?return=checkout')
        return
      } else {
        this.saveToWishlist(item)
      }
    },
    async saveToWishlist(item) {
      this.loading = true
      try {
        let data = await this.$axios.$post('api/wishlists/add', item)
        this.$store.commit('success', 'Added to your wishlist')
        this.loading = false
      } catch (err) {
        this.loading = false
        this.$store.commit('setErr', err, { root: true })
      }
    },
    async checkAndAddToCart(item) {
      try {
        this.loading = true
        await this.addToCart(item)
        this.loading = false
      } catch (e) {
        // console.log("err...", e.toString());
      }
    },
    calculateOffPercent(mrp, price) {
      let percent = ((mrp - price) * 100) / mrp
      return Math.round(percent)
    },
  },
}
</script>

<style></style>
