<template>
  <div class="bg-gray-100 padbtm">
    <div class="relative flex justify-center w-full">
      <video
        class="object-cover w-full h-96"
        :src="'https://res.cloudinary.com/itswadesh/video/upload/v1620190766/Anne/video.mp4'"
        autoplay
        loop
        muted
      />
      <!-- <div>
        <iframe
          src="https://player.vimeo.com/video/545331344?title=0&byline=0&portrait=0&speed=0&badge=0&loop=1&autoplay=1&muted=1&player_id=0&app_id=58479/embed"
          width="100%"
          frameborder="0"
          class="object-cover w-full h-64"
        />
      </div> -->
      <nuxt-link
        to="/search"
        class="absolute top-0 py-3 mt-40 text-center text-white rounded shadow-lg px-9 bg-primary-500 hover:bg-gray-200 hover:text-primary-500"
      >
        Enter Site
      </nuxt-link>
    </div>
    <div class="container mx-auto">
      <div
        class="container absolute flex flex-wrap justify-center w-full mx-auto -mt-28"
      >
        <HomeHeroCards
          v-for="(i, ix) in items"
          :key="ix"
          :product="i"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeroCards from '~/components/Anne/HomeHeroCards'
export default {
  components: {
    HomeHeroCards,
  },
  data() {
    return {
      items: [
        {
          link: '/live-now-section',
          title: 'Live Now',
          img:
            'https://uploads-ssl.webflow.com/5f463e394b7db10f86f8d4c2/60080da30f55e02ee2088816_hero-seller-p-1080.jpeg',
          name: 'Enjoy tech-enabled Live Shopping e-Commerce brands.',
          description: `<ul><li>Seamless Checkout</li>
<li>In-video purchase</li>
<li>Brand-owned experience control</li>
<li>Manu of Live Vendors to choose from.</li>
<li>Take control of your live sales events.</li>
<li>Grow your customer base every time you go live.</li>
<li>With Anne.Biz, live stream shopping platform, you own your</li>
<li>audience and brand.</li></ul>`,
          footer: 'Stand Out, Sell & Buy Live.',
        },
        {
          link: '/stored-videos',
          title: 'Stored Videos',
          img:
            'https://uploads-ssl.webflow.com/5f463e394b7db10f86f8d4c2/5fd39695789dd07037307b1a_custom-channel.png',
          name: `“Anne.Biz travels the globe in search of the world’s most amazing
products. Products that are innovative, unique, effective and easy to
use. Products that really matter and can make a positive impact in
your life. “`,
          description: 'description11',
          footer: '',
        },
        {
          link: '/',
          title: 'Prime Streaming',
          img:
            'https://uploads-ssl.webflow.com/5f463e394b7db10f86f8d4c2/5f467d145d62da14f9eefb15_product-2.png',
          name: `ENJOY UNPARALEL LIVE SHOPPING EXPERIENCE!
Unlock engagement, awareness with tech-enabled Live Shopping eCommerce brands.`,
          description: `<ul><li>Schedule Streaming</li>
<li>Seamless Checkout</li>
<li>In-video purchase</li>
<li>Brand-owned experience control</li>
<li>One to one pre-scheduled Streaming.</li>
<li>Manu of Live Vendors to choose from.</li>
<li>Stored Videos</li>
<li>Brand-owned experience control</li></ul>`,
          footer: `Live | Publish | Lucky Draw | Schedule`,
        },
      ],
    }
  },
  methods: {},
  // layout: 'none',
}
</script>

<style scoped>
.padbtm {
  padding-bottom: 1000px;
}
</style>
