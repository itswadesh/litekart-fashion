<template>
  <div class="product">
    <div class="image_wrapper">
      <div class="heart_wrapper">
        <wish-button
          :variant="selectedVariant"
          :product="product"
        ></wish-button>
      </div>
      <div
        class="image"
        v-if="product.imgA && product.imgA.length > 0"
        @click.prevent="go('/' + product.slug + '?id=' + product._id)"
      >
        <img v-lazy="`${product.imgA[0].original}`" />
      </div>
      <!-- <div
      class="image"
      v-else-if="product.variants[0].img && product.variants[0].img.length>0"
      v-lazy:background-image="product.variants[0].img[0].medium"
    >
    </div> -->
      <div
        class="image"
        v-else
        v-lazy:background-image="'/450x250-err.svg'"
        @click.prevent="go('/' + product.slug + '?id=' + product._id)"
      ></div>
    </div>
    <!-- <img v-if="product.img.length>0" v-lazy="product.img[0]" :alt="product.name" @click="go('/'+product.slug+'?id='+product._id)" />
      <img v-else v-lazy="product.variants[0].img[0]" :alt="product.name" @click="go('/'+product.slug+'?id='+product._id)" /> -->
    <div class="product__details">
      <!-- <div class="brand_name">
        <span class="brand_text">
          {{product.brand.name}}</span>
      </div>
      <div class="product_name">
        <span
          class="name"
          @click.prevent="go('/'+product.slug+'?id='+product._id)"
        >{{product.name}}</span>
      </div>-->
      <div class="price_box">
        <span class="price">
          <span class="discounted_price" v-if="selectedVariant.offer > 0">{{
            selectedVariant.offer | currency
          }}</span>
          <span class="discounted_price" v-else>{{
            selectedVariant.price | currency
          }}</span>
          <del
            v-if="
              selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price
            "
            >{{ selectedVariant.mrp | currency }}</del
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
// const WishButton = () => import('~/components/WishButton')
// import { IMAGEKIT } from '~/config'
export default {
  components: {
    // WishButton,
  },
  data() {
    return {
      IMAGEKIT,
      selectcart: false,
      selectedVariant: {},
    }
  },
  methods: {
    calculateOffPercent(product_item) {
      let percent =
        ((product_item.variants[0].mrp - product_item.variants[0].price) *
          100) /
        product_item.variants[0].mrp
      return Math.round(percent)
    },
    go(url) {
      this.$router.push(url)
    },
    select(s, ind) {
      this.selectedVariant = s
    },
    afterImageLoaded(component) {},
    zipDeliverable(product) {
      if (!!this.$store.state.settings.enableZips) {
        // return includes(product.zips, this.$store.state.user.zipcode);
      } else {
        return true
      }
    },
  },
  // ['product'],
  props: {
    product: { type: Object },
  },
  created() {
    if (this.product && this.product.variants)
      this.selectedVariant = this.product.variants[0]
  },
}
</script>
<style scoped>
@keyframes zoom {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.image img[lazy='loaded'] {
  animation-name: zoom;
  animation-duration: 0.8s;
}
.image img[lazy='loading'] {
  filter: blur(10px);
}
.product {
  position: relative;
}
.product:hover {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.2);
  transform: scale(1.01);
  transition: all 0.14s ease;
  border-radius: 3px;
}
.product__details {
  padding: 10px;
  text-align: center;
}
.see-other-variants {
  font-size: 12px;
  color: #999;
}
a {
  text-decoration: none;
}
.price {
  color: black;
  font-size: 1.5em;
}
.price .discounted_price {
  color: #d01345;
}
.price del {
  font-size: 0.8em;
}
.name {
  font-size: 1em;
  text-decoration: none;
}
.bestseller-badge {
  position: absolute;
  top: 0px;
  border-radius: 10px;
  background-color: #e936ef;
  color: #fff;
  font-size: 0.7em;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80px;
  text-transform: titlecase;
  font-weight: 600;
  letter-spacing: 0.1em;
  overflow: hidden;
  height: 15px;
  -webkit-transition: all 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition: all 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.48);
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.48);
}
.flex {
  display: flex;
  justify-content: center;
  text-align: center;
  /* font-size: 10px;
	 */
}
.variants {
  display: none;
  /* position: absolute;
	 bottom: -20px;
	 z-index: 10000;
	 */
}
.product-card {
  overflow: hidden;
  border-radius: 10px;
}
.product-card:hover .variants {
  display: inline !important;
}
.variants:hover {
  display: inline !important;
}
.variant-chip {
  height: 30px;
  cursor: pointer;
}
.heart_wrapper {
  position: absolute;
  z-index: 1;
  right: 2px;
  top: 4px;
}
.brand_text {
  font-size: 12px !important;
  text-align: center;
  color: #999 !important;
}
</style>
