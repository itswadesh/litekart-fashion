<template>
  <div class="bg-gray-100">
    <div class="relative flex justify-center w-full">
      <video
        class="object-cover w-full h-116"
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
      <div
        class="absolute w-full py-4 text-3xl font-bold text-center bg-white cursor-pointer top-28 bg-opacity-60"
      >
        Lorem Ipsum Dolor Sit Amet
      </div>

      <nuxt-link
        to="/search"
        class="absolute py-3 text-center text-white rounded shadow-lg top-60 px-9 bg-primary-500 hover:bg-gray-200 hover:text-primary-500"
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

    <div
      class="pb-20 bg-no-repeat margintop"
      style="background-image: url('/img/pink.jpg')"
    >
      <div class="pt-10 pb-8 text-2xl font-bold text-center">How It Works</div>
      <div class="container mx-auto">
        <div class="container flex flex-wrap justify-center mx-auto">
          <HomeHeroCards2
            v-for="(i, ix) in items2"
            :key="ix"
            :product="i"
            class="flex-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeroCards from '~/components/Anne/HomeHeroCards'
import HomeHeroCards2 from '~/components/Anne/HomeHeroCards2'
export default {
  components: {
    HomeHeroCards,
    HomeHeroCards2,
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
      items2: [
        {
          link: '/live-now-section',
          img: '/img/business-grow.jpg',
          name: 'Grow your business with your own live shopping solution',
          description:
            'With AnneBiz you engage with customers virtually and send your products directly through video and chat',
        },
        {
          link: '/live-now-section',
          img: '/img/business-grow.jpg',
          name: 'Grow your business with your own live shopping solution',
          description:
            'With AnneBiz you engage with customers virtually and send your products directly through video and chat',
        },
        {
          link: '/live-now-section',
          img: '/img/business-grow.jpg',
          name: 'Grow your business with your own live shopping solution',
          description:
            'With AnneBiz you engage with customers virtually and send your products directly through video and chat',
        },
        {
          link: '/live-now-section',
          img: '/img/business-grow.jpg',
          name: 'Grow your business with your own live shopping solution',
          description:
            'With AnneBiz you engage with customers virtually and send your products directly through video and chat',
        },
      ],
    }
  },
  methods: {},
  // layout: 'none',
}
</script>

<style scoped>
.margintop {
  margin-top: 700px;
}
</style>
