<template>
  <div
    class="container relative flex flex-col p-1 mt-4 bg-white rounded shadow md:shadow-sm md:border md:p-2"
  >
    <div class="w-full">
      <div class="flex flex-row w-full">
        <div class="flex flex-row w-full overflow-hidden">
          <nuxt-link
            :to="localePath(`/${item.slug}?id=${item.pid}`)"
            class="w-1/3 md:w-1/4"
          >
            <img
              v-lazy="item.img"
              alt="mobile"
              class="object-contain w-full h-40 mx-auto overflow-hidden md:border"
            />
          </nuxt-link>
          <div class="relative flex flex-col w-2/3 ms-3 md:w-3/4">
            <div
              class="flex flex-row justify-between text-gray-500 hover:text-secondary-500"
            >
              <nuxt-link
                :to="localePath(`/${item.slug}?id=${item.pid}`)"
                class="text-base font-light truncate"
              >
                {{ item.name }}
              </nuxt-link>
            </div>
            <div
              class="my-3 text-sm font-light leading-3 capitalize text-start text-primary-500"
            >
              {{ (item.brand && item.brand.name) || '--' }}
            </div>
            <div>
              <span class="my-3 text-md text-secondary-200 md:text-base">
                {{ item.price | currency(settings.currency_symbol) }}
              </span>
            </div>

            <div
              class="flex flex-col my-3 text-xs text-gray-400 md:text-sm md:font-sm"
            >
              <div v-for="(o, ix, iix) in JSON.parse(item.options)" :key="iix">
                <!-- {{ ix }}={{ o }} -->
              </div>
            </div>
            <!-- qty button  -->
            <div class="absolute bottom-0 flex flex-row justify-between w-full">
              <div class="flex flex-row w-full text-xs text-gray-400">
                <div class="flex flex-row me-4">
                  <span class="my-auto text-sm font-thin text-gray-400 me-2">
                    Qty :
                  </span>
                  <div class="flex flex-row">
                    <button
                      @click="
                        addToBag({
                          pid: item.pid,
                          vid: item.vid,
                          qty: -1,
                          options: item.options,
                          vendor: item.vendor && item.vendor.id,
                        })
                      "
                      class="w-10 h-10 my-auto text-xl font-semibold text-gray-700 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-300 paddings buttons focus:outline-none"
                    >
                      <!-- minus icon  -->
                      <svg
                        class="w-4 h-4 mx-auto text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div class="my-auto count text-md focus:outline-none">
                      <img
                        v-lazy="'/loading.svg'"
                        v-if="loading"
                        class="mx-auto my-auto"
                      />
                      <div
                        v-else
                        class="container flex justify-center mx-auto my-auto mt-1"
                      >
                        <span class="text-sm text-gray-600">{{
                          item.qty
                        }}</span>
                      </div>
                    </div>
                    <button
                      @click="
                        addToBag({
                          pid: item.pid,
                          vid: item.vid,
                          qty: 1,
                          options: item.options,
                          vendor: item.vendor && item.vendor.id,
                        })
                      "
                      class="w-10 h-10 my-auto text-xl font-semibold text-gray-700 border rounded-full border-secondary-500 bg-secondary-500 hover:bg-blue-500 paddings buttons focus:outline-none"
                    >
                      <!-- plus icon  -->
                      <svg
                        class="w-4 h-4 mx-auto text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- wishlist icon  -->
                <div class="my-auto">
                  <WishButton
                    :pid="item.pid"
                    class="hidden w-8 h-8 my-auto font-semibold text-center rounded hover:bg-pink-200 bg-accent-100 md:flex px-auto focus:outline-none"
                  />
                  <!-- <button
                    @click="toggleWishlist(item.pid)"
                    :disabled="isDisabled"
                    class="hidden my-auto font-semibold text-center rounded-sm icons bg-accent-100 md:flex px-auto hover:opacity-75 focus:outline-none"
                  >
                    <svg
                      class="w-4 h-4 mx-auto text-accent-900"
                      :class="{
                        'text-accent-900 fill-current ': isWishlist == true,
                      }"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button> -->
                </div>
              </div>
              <!-- {{ item.options }}=={{ item.vendor.id }} -->
              <!-- remove icon -->
              <div class="flex flex-row">
                <WishButton
                  :pid="item.pid"
                  class="w-8 h-8 my-auto font-semibold text-center rounded md:hidden hover:bg-red-200 bg-accent-100 px-auto focus:outline-none"
                />
                <button
                  @click="
                    addToBag({
                      pid: item.pid,
                      vid: item.vid,
                      qty: -10000,
                      options: item.options,
                      vendor: item.vendor && item.vendor.id,
                    })
                  "
                  class="flex justify-center w-8 h-8 m-1 font-semibold text-gray-600 bg-gray-200 rounded icons focus:outline-none hover:bg-gray-300 focus:outline-noe"
                >
                  <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
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
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    item: { type: Object },
  },
  data() {
    return {
      isDisabled: false,
      loading: false,
      isActive: false,
      isAdded: false,
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
    }),
  },

  methods: {
    ...mapActions({ addToCart: 'cart/addToCart' }),
    ...mapMutations({ success: 'success' }),
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
    // async toggleWishlist(id) {
    //   // console.log('toggle', id)
    //   ;(this.isDisabled = true), (this.isWishlist = true)
    //   let msg = 'Product Added To the Wishlist'
    //   try {
    //     const data = (
    //       await this.$apollo.mutate({
    //         mutation: TOGGLE,
    //         variables: {
    //           product: id,
    //           variant: id,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.toggleWishlist
    //     this.success(msg)
    //     // console.log('add to wishlist', this.toggleWishlist)
    //   } catch (e) {
    //     // this.$router.push('/login')
    //     // this.setErr(e.toString())
    //     // console.log(e)
    //   } finally {
    //     ;(this.isDisabled = true), (this.isWishlist = true)
    //   }
    // },
    //  async getCart(){
    //     try{
    //       this.cart=(
    //         await this.$apollo.query({
    //           query:CART,
    //           fetchPolicy:'no-cache',
    //         })
    //       ).data.cart
    //       console.log("add to  cartt",this.cart)
    //     }catch(e){
    //       console.log(e)
    //     }finally{
    //     }
    //   },
    //  // delete / remove method
    //   async deleteCart(id){
    //      this.loading =true
    //      let msg="Product Removed from the Cart"
    //     console.log("id.............", id)
    //     try{
    //       const data=(
    //         await this.$apollo.mutate({
    //           mutation:DELETECART,
    //           variables:{pid:id,
    //                     vid:id,
    //                     qty:-1
    //                 },
    //         })
    //       ).data.deleteCart
    //         this.success(msg)
    //         await this.getCart()
    //         console.log("delete cart", this.deleteCart)
    //     }catch(e){
    //       console.log(e)
    //     }finally{
    //       this.loading=false
    //     }
    //   },
    //   // add / increse method
    //   async addToCart(id){
    //      this.loading =true
    //     let msg="Product incresed by one in the Cart"
    //     try{
    //       const data=(
    //         await this.$apollo.mutate({
    //           mutation: ADDTOCART,
    //           variables:{pid:id,
    //                     vid:id,
    //                     qty:1
    //                     },
    //         })
    //       ).data.addToCart
    //       this.success(msg)
    //       await this.getCart()
    //       console.log("add to cartssss", this.addToCart)
    //     }catch(e){
    //       console.log(e)
    //     }finally{ this.loading=false}
    // }
  },
}
</script>

<style scoped>
.icons {
  padding: 7px;
}
.padding {
  padding: 1px;
}
.paddings {
  padding: 2px;
}
.buttons {
  height: 1.6rem;
  width: 1.6rem;
}
.count {
  height: 1.75rem;
  width: 2.2rem;
}
</style>
