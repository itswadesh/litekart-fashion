<template>
  <div class="you-may-also-like">
    <div class="">
      <div
        v-infinite-scroll="loadMore"
        :infinite-scroll-distance="3"
        :infinite-scroll-immediate-check="true"
      >
        <!--<ul class="nav you-may-also-like-nav"   ref="nav">
                  <li class="nav-item"
                  v-for="(navItem, index) in nav" :key="index"
                  >
                      <span class="nav-link"
                      :class="{ active : selected_nav == navItem }"
                      @click.prevent="selected_nav = navItem"
                      >
                          {{ navItem.text }}
                      </span>
                  </li>
              </ul>

              <ul class="nav you-may-also-like-nav is-fixed-top d-none" :class="{ 'd-flex' : showFixed }" >
                  <li class="nav-item"
                  v-for="(navItem, index) in nav" :key="index"
                  >
                      <span class="nav-link"
                      :class="{ active : selected_nav == navItem }"
                      @click.prevent="selected_nav = navItem"
                      >
                          {{ navItem.text }}
                      </span>
                  </li>
              </ul>-->

        <!--<div class="category-slider-menu-wrapper only-mobile">
            <ul
              class="nav you-may-also-like-nav is-fixed-top only-mobile"
              :class="{ 'd-flex' : showFixed }"
            >
              <li
                class="cursor-pointer nav-item menu-item"
                v-for="(navItem, index) in featuredCategories"
                :key="index"
              >
                <span
                  class="nav-link"
                  :class="{ active : selected_nav == navItem }"
                  @click.prevent="selected_nav = navItem;flush();getProducts()"
                >
                  <div class="menu-item-text"> {{ navItem.name }}</div>
                </span>
              </li>
            </ul>
          </div>-->
        <div
          class="category-slider-menu-wrapper you-may-also-like-nav"
          :class="{ 'is-fixed-top': true }"
        >
          <div
            id="scrolling_wrapper"
            class="scrolling-wrapper-flexbox category-slider-menu"
          >
            <div
              class="cursor-pointer scroll_card"
              v-for="(navItem, index) in featuredCategories"
              :key="index"
              :class="{ active: selected_nav === navItem }"
              @click.prevent="
                selected_nav = navItem
                flush()
                getProducts()
              "
            >
              <div>
                <img
                  v-lazy="navItem.imgA"
                  alt=""
                  class="menu-item-img img-fluid"
                />
                <div class="menu-item-text category-slider-text">
                  {{ navItem.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="you-may-also-like-products hidden_block"
          :class="{ show_block: true }"
          v-if="selected_nav"
          :id="selected_nav._id"
        >
          <div class="row no-gutters">
            <section v-if="products.length === 0 && !loading" class="products">
              <div class="container">
                {{ $route.params.c }} product not found
              </div>
            </section>

            <section v-else class="products">
              <div class="container">
                <product-card-fashion
                  v-for="p in products"
                  :key="p._id"
                  :product="p"
                ></product-card-fashion>
              </div>
              <div class="container" v-if="loading">
                <!-- Skeleton not required as the products will be loaded from server side -->
                <!-- Skeleton required when the filter is applied -->
                <product-card-skeleton
                  v-for="(p, ix) in skeletonCount"
                  :key="ix + '-1'"
                ></product-card-skeleton>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function scrollTo(element) {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: element.offsetTop - 100,
  })
}

// const ProductCardFashion = () =>
//     import('~/components/Home/ProductCardFashionYMAL'),
//   ProductCardSkeleton = () => import('~/components/Home/ProductCardSkeleton')
export default {
  props: {
    landing_page: { type: Object },
  },
  data() {
    return {
      products: [],
      skeletonCount: 12,
      selectedCategory: {},
      featuredCategories: [],
      showFixed: false,
      selected_nav: null,
      busy: false,
      loading: false,
      end: false,
      skip: 0,
      limit: 20,
      filtered: 0,
      inModal: false,
      wishlist: [],
      api_fetched: false,
    }
  },
  components: {
    // WishButton,
    ProductCardFashion,
    ProductCardSkeleton,
  },
  async created() {
    // this.getCategories();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScrollEvent)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScrollEvent)
  },
  methods: {
    calculateOffPercent(product_item) {
      let percent =
        ((product_item.variants[0].mrp - product_item.variants[0].price) *
          100) /
        product_item.variants[0].mrp
      return Math.round(percent)
    },
    flush() {
      this.skip = 0
      this.filtered = 0
    },
    async getProducts(scrolled, first_time) {
      let vm = this
      if (vm.selected_nav) {
        if (!scrolled) {
          this.products = []
          if (!first_time) {
            scrollTo(document.getElementById('ymal_container'))
          }
        }
        this.busy = true
        try {
          this.loading = true
          const products = await this.$apollo.query({
            query: 'products',
            variables: {
              skip: vm.skip || 0,
              limit: vm.limit,
              where: {
                active: true,
                approved: true,
                $expr: { $gt: [{ $size: '$img' }, 0] },
                'variants.stock': { $gt: 0 },
                'categories.slug': vm.selected_nav.slug,
              },
              sort: '-createdAt',
            },
          })
          this.filtered = products.length + this.skip
          this.products = scrolled ? this.products.concat(products) : products
          this.mergeToWishlist(this.products, this.wishlist)
          if (products.length >= vm.limit) {
            this.skip = this.filtered
            this.end = false
          } else {
            this.end = true
          }
          this.loading = false
          this.busy = false
        } catch (e) {
          this.end = true
          this.loading = false
          this.busy = false
        }
      }
    },
    async mergeToWishlist(products, wishlist) {
      try {
        // Merge wishlist items into products search result
        if (wishlist.length > 0) {
          products.map((p) => {
            for (const w of wishlist) {
              if (
                p._id == w.product._id &&
                p.variants[0]._id == w.variant._id
              ) {
                p.wished = true
              }
            }
          })
        }
      } catch (e) {}
    },
    async getWishlist() {
      let user = (this.$store.state.auth || {}).user || null
      if (user) {
        try {
          let auth = this.$cookies.get('Authorization')
          this.$axios.setToken(auth, 'Bearer')
          this.wishlist = (
            await this.$apollo.query({ query: 'wishlists' })
          ).data.wishlists.data
        } catch (e) {}
      } else {
      }
    },
    async getCategories() {
      this.getWishlist()
      try {
        this.busy = true
        this.loading = true
        let where = { where: { featured: true }, sort: 'position' }
        if (this.landing_page === 'true') {
          var slug = this.$route.path.substr(1)
          where = {
            where: {
              featured: true,
              slug: { $regex: '^' + slug, $options: 'i' },
            },
            sort: 'position',
          }
        }
        const categories = (
          await this.$apollo.query({
            query: 'categories',
            variables: {
              params: where,
            },
          })
        ).data.categories
        this.loading = false
        this.busy = false
        this.featuredCategories = categories
        this.selected_nav = categories[0]
        this.getProducts(false, true)
      } catch (e) {
        this.loading = false
      }
    },
    loadMore() {
      if (this.busy || this.end) return
      this.getProducts(true)
    },
    handleScrollEvent(e) {
      var testDiv = document.getElementById('scrolling_wrapper')
      if (window.scrollY > 700) {
        if (!this.api_fetched) {
          this.getCategories()
          this.api_fetched = true
        }
      }
      if (window.scrollY > 1200) {
        this.showFixed = true
      }

      if (window.scrollY < 1150) {
        this.showFixed = false
      }
    },
  },
}
</script>
<style scoped type="scss">
.category-slider-menu-wrapper {
  text-align: center;
  display: block;
  margin: auto;
  width: 71%;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
@media screen and (max-width: 800px) {
  .category-slider-menu-wrapper {
    width: 100% !important;
  }
}
.discount_container {
  /* float: right; */
  margin: 3px 4px 0 0;
  position: absolute;
  right: 1px;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.scroll_card {
  flex: 0 0 auto;
  margin-right: 3px;
  width: 100px;
  /*
    height: 45px;
*/
  max-height: 125px;
  color: #000000;
  padding: 12px;
}
.scrolling-wrapper-flexbox {
  margin-bottom: 20px;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}
.active {
  border-bottom: 2px solid #000;
  margin-bottom: 10px;
}
.category-slider-menu-wrapper {
  text-align: center;
}
@media only screen and (min-width: 1000px) {
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    height: 6px;
    width: 8px;
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #000;
  }
}
.menu-item-text.category-slider-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
