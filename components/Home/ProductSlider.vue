<template>
  <div class="h-auto sm:mb-2">
    <div class="h-auto">
      <div class="focus:outline-none">
        <div class="flex justify-center border-b">
          <span
            class="pb-2 mt-2 text-xl text-center sm:text-2xl lg:text-3xl md:-mt-4 border-b2 text-accent-600 border-accent-600 md:ms-6"
          >
            {{ heading }}
          </span>
        </div>
        <div class="conatiner focus:outline-none">
          <!-- v-if="loading" -->
          <!-- <ProductSliderSkeleton /> -->
          <VueSlickCarousel v-bind="settings" v-if="details && details.length">
            <template #prevArrow="arrowOption">
              <div
                class="invisible text-primary-500 custom-arrow custom-arrow1 md:visible"
              >
                {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
              </div>
            </template>
            <div
              v-for="product in details"
              :key="product.id"
              class="flex flex-col mb-6 justify-items-center focus:outline-none"
            >
              <ProductSliderCards
                bgColor="white"
                :product="product"
                class="m-1 sm:m-2 focus:outline-none"
              />
            </div>
            <template #nextArrow="arrowOption">
              <div
                class="invisible custom-arrow text-primary-500 custom-arrow2 md:visible"
              >
                {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}
              </div>
            </template>
          </VueSlickCarousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductSliderCards from '~/components/Home/ProductSliderCards'
import ProductSliderSkeleton from '~/components/AllSkeletons/ProductSliderSkeleton'
// import PRODUCTS from '~/gql/product/products.gql'
import TOGGLE from '~/gql/wishlist/toggleWishlist.gql'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isWishlist: false,
      products: null,
      loading: false,

      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1536,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
            },
          },
          // {
          //   breakpoint: 400,
          //   settings: {
          //     centerMode: true,
          //     centerPadding: '90px',
          //     centerMargin: '5px',
          //     slidesToScroll: 1,
          //     focusOnSelect: true,
          //     infinite: false,
          //     slidesToShow: 1,
          //   },
          // },
        ],
      },
    }
  },

  components: {
    ProductSliderSkeleton,
    ProductSliderCards,
  },
  // async created() {
  //   this.getProducts()
  // },
  props: {
    details: {
      type: Array,
      default: null,
    },
    heading: {
      type: String,
      default: null,
    },
  },
  methods: {
    ...mapMutations({ success: 'success' }),
    // async getProducts() {
    //   this.loading = true
    //   try {
    //     this.products = (
    //       await this.$apollo.query({
    //         query: PRODUCTS,
    //         variables: {
    //           new: true,
    //         },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.products
    //   } catch (e) {
    //     console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
    async toggleWishlist(id) {
      ;(this.isDisabled = true), (this.isWishlist = true)
      let msg = 'Product Added To the Wishlist'
      // console.log(id)
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
        this.isDisabled = true
        this.toggleWishlist = true
      }
    },
  },
}
</script>

<style scoped>
.border-b2 {
  border-bottom: 3px solid;
}
.custom-arrow {
  margin-right: 7px;
  height: 80px;
  width: 46px;
  padding: 6px;
  padding-top: 23px;
  box-shadow: 10px;
}
.slick-prev:before,
.slick-next:before {
  font-size: 40px;
  line-height: 1;
  opacity: 1;
  box-shadow: 10px;
  -webkit-font-smoothing: antialiased;
}
.slick-prev {
  margin-left: -25px;
  z-index: 1;
  left: 0;
  box-shadow: 10px;
}
</style>
