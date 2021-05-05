<template>
  <div class="flex flex-col w-full bg-white">
    <SingleViewSkeleton v-if="loading" />
    <div v-if="products">
      <div v-for="p in products.data" :key="p.id">
        <div class="flex flex-row justify-between pl-2">
          <nuxt-link :to="`/${p.slug}?id=${p.id}`" class="flex flex-row">
            <span class="w-40 h-40 mx-auto mb-4">
              <img
                v-lazy="p.img"
                alt="mobile image"
                class="object-contain w-40 h-40 p-4 mx-auto mb-4"
              />
            </span>

            <span class="flex flex-col w-full p-2 pt-3 mx-auto">
              <h2 class="text-lg font-semibold hover:text-blue-500">
                {{ p.name }}
              </h2>
              <span class="flex flex-row">
                <span
                  class="w-10 h-5 pl-2 text-xs text-white bg-green-600 rounded me-2 bold"
                >
                  {{ product.rating.avg }}
                  <b class="text-xm">*</b>
                </span>
                <span class="mb-3 text-sm text-gray-600">
                  ({{ product.rating.count }})
                </span>
                <!-- <img src="/img/assured.png" alt="assured" class="h-4 mt-1 ms-2 w-22" /> -->
              </span>
              <span>
                <h6 class="flex flex-row -mt-2 text-sm">
                  <strike>
                    {{ p.price | currency(settings.currency_symbol) }}
                  </strike>
                  <span class="text-green-500 ms-2"
                    >{{ product.price.off }} off</span
                  >
                </h6>
              </span>
              <span>
                <span class="text-xs">
                  Upto
                  <b>
                    {{
                      product.price.extra | currency(settings.currency_symbol)
                    }}
                  </b>
                  Off on Exchange
                </span>
              </span>
            </span>
          </nuxt-link>
          <!--add to wishlist -->
          <button
            @click="toggleWishlist(p.id)"
            class="w-8 h-8 p-1 m-1 bg-white rounded-full focus:outline-none"
          >
            <heart-icon
              size="1.4x"
              class="text-gray-500 fill-current"
            ></heart-icon>
          </button>
        </div>
        <div class="grid grid-cols-3 gap-1 p-3 -mt-6 text-xs text-gray-600">
          <span
            v-for="(f, ix) in product.features"
            :key="ix"
            class="col-span-3 p-1 border"
          >
            {{ f }}
          </span>
        </div>
        <div class="w-full mt-1 mb-6 border-b"></div>
      </div>
      <div v-if="products.count == 0" class>
        <div class="w-full m-5 mx-auto">
          <img
            src="img/noproduct.png"
            alt="noproduct"
            class="object-contain mx-auto height"
          />
        </div>
      </div>
      <div>
        <Pagination
          @change="changePage"
          :count="products.count"
          :current="currentPage"
          @next="showNextPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Pagination from '~/shared/components/ui/Pagination'
import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
import PRODUCTS from '~/gql/product/products.gql'
import SingleViewSkeleton from '~/components/AllSkeletons/SingleViewSkeleton'
export default {
  computed: {
    ...mapGetters({
      settings: 'settings',
    }),
  },
  data() {
    return {
      loading: false,
      products: null,
      currentPage: 1,
      product: {
        name: 'Samsung Galaxy F41 (Fusion Blue, 128GB)',
        rating: { avg: '4.3', count: '4.31,09,253', review: '14,126' },
        price: { rs: '16,499', off: '15%', before: '19,999', extra: '14,500' },
        features: [
          '6 GB RAM | 64 GB Strorage',
          '16.94 cm(6.6 inch) Full HD+ Display',
          '600mAh',
          '64MP + 13MP + 2MP + 2MP',
          '20MP Front',
        ],
      },
    }
  },
  components: {
    SingleViewSkeleton,
    HeartIcon,
    Pagination,
  },
  async created() {
    this.getProducts()
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    changePage(val) {
      this.currentPage = val
      this.getProducts()
    },
    showNextPage() {
      this.currentPage++
      this.getProducts()
    },
    async getProducts() {
      this.loading = true
      try {
        this.products = (
          await this.$apollo.query({
            query: PRODUCTS,
            variables: {
              category: this.$route.query.id,
              page: this.currentPage,
            },
            fetchPolicy: 'no-cache',
          })
        ).data.products
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
    async toggleWishlist(id) {
      // console.log(id)
      let msg = 'Product Added To the Wishlist'
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: TOGGLE,
            variables: {
              product: id,
              variant: id,
            },
            fetchPolicy: 'no-cache',
          })
        ).data.toggleWishlist
        this.success(msg)
        // console.log('add to wishlist', this.toggleWishlist)
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
