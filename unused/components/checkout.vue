<template>
  <div class="pb-16 bg-gray-200">
    <Nav />

    <BuyNow />
    <div class="w-full mt-10 mb-6 border-b-2"></div>

    <Footer class="hidden sm:flex" />
  </div>
</template>
<script>
export default {
  middleware: ['isAuth'],
  head() {
    return {
      title: 'Checkout with the products in your cart',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'After this checkout process we will ship the item and it should be delivered within 7 working days',
        },
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content:
            'After this checkout process we will ship the item and it should be delivered within 7 working days',
        },

        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Checkout with the products in your cart',
        },
        // Twitter
        {
          name: 'twitter:title',
          content: 'Checkout with the products in your cart',
        },
        {
          name: 'twitter:description',
          content:
            'After this checkout process we will ship the item and it should be delivered within 7 working days',
        },
      ],
    }
  },
}
</script>

<script>
import Nav from '~/components/Home/Nav'

import MobileFixedFooter from '~/components/ui/MobileFixedFooter'
// import BuyNow from '~/components/Cart/BuyNow'
import Footer from '~/components/ui/Footer'

export default {
  components: {
    Nav,

    // BuyNow,
    Footer,
  },
}
</script>
