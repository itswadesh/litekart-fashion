<template>
  <div class="bg-gray-100">
    <div class="relative justify-center w-full">
      <video
        class="object-cover w-full h-96 lg:h-116"
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
      <!-- <div
        class="absolute w-full py-4 text-3xl font-bold text-center bg-white cursor-pointer top-40 bg-opacity-60"
      >
        Lorem Ipsum Dolor Sit Amet
      </div> -->
      <!-- 
      <nuxt-link
        to="/search"
        class="absolute py-3 text-center text-white rounded shadow-lg top-60 px-9 bg-primary-500 hover:bg-gray-200 hover:text-primary-500"
      >
        Enter Site
      </nuxt-link> -->

      <div
        class="w-full text-center lg:bg-white lg:absolute lg:bg-opacity-60 top-56 h-60"
      >
        <div class="mx-4 lg:mx-auto lg:w-2/3">
          <h1 class="pt-8 text-2xl font-bold lg:text-4xl">
            Lorem Ipsum Heading Test
          </h1>
          <p class="mt-2 text-sm lg:mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nemo
            fugit qui dolores blanditiis eos eveniet .
          </p>
          <div class="mt-10">
            <nuxt-link
              to="/search"
              class="py-3 text-center text-white rounded shadow-lg focus:outline-none px-9 bg-primary-500 hover:bg-gray-200 hover:text-primary-500"
            >
              Enter Site
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto my-10 lg:my-20 lg:container">
      <HomeHeroCards v-for="(i, ix) in items" :key="ix" :product="i" class="" />
    </div>

    <div
      class="pb-20 mt-10 bg-no-repeat lg:mt-20"
      style="background-image: url('/img/pink.jpg')"
    >
      <div class="py-5 text-3xl font-bold text-center lg:py-10 lg:text-4xl">
        How It Works
      </div>
      <div class="container mx-auto">
        <div class="container flex flex-wrap justify-center px-3 mx-auto">
          <HowItWorks
            v-for="(i, ix) in items2"
            :key="ix"
            :product="i"
            class="flex items-stretch w-full md:w-1/2 xl:w-1/3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeroCards from '~/components/Anne/HomeHeroCards'
import HowItWorks from '~/components/Anne/HowItWorks'
export default {
  components: {
    HomeHeroCards,
    HowItWorks,
  },
  data() {
    return {
      items: [
        {
          link: '/live-now-section',
          title: 'Live Now',
          img: '/home/live-now-image.png',
          name: 'Enjoy tech-enabled Live Shopping e-Commerce brands.',
          description: `<ul><li class="flex items-start py-1 "><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Seamless Checkout</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>In-video purchase</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Brand-owned experience control</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Manu of Live Vendors to choose from.</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Take control of your live sales events.</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Grow your customer base every time you go live.</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>With Anne.Biz, live stream shopping platform, you own your</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>audience and brand.</li></ul>`,
          footer: 'Stand Out, Sell & Buy Live.',
        },
        {
          link: '/stored-videos',
          title: 'Stored Videos',
          img: '/home/stored-videos-image.png',
          name: `“Anne.Biz travels the globe in search of the world’s most amazing
products. Products that are innovative, unique, effective and easy to
use. Products that really matter and can make a positive impact in
your life. “`,
          description: 'description',
          footer: '',
        },
        {
          link: '/',
          title: 'Prime Streaming',
          img: '/home/prime-streaming-image.png',
          name: `ENJOY UNPARALEL LIVE SHOPPING EXPERIENCE!
Unlock engagement, awareness with tech-enabled Live Shopping eCommerce brands.`,
          description: `<ul><li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Schedule Streaming</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Seamless Checkout</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>In-video purchase</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Brand-owned experience control</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>One to one pre-scheduled Streaming.</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Manu of Live Vendors to choose from.</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Stored Videos</li>
<li class="flex items-start py-1"><div class="w-2 h-2 lg:w-3 lg:h-3 mt-1.5 mr-2 rounded-full bg-primary-500"></div>Brand-owned experience control</li></ul>`,
          footer: `Live | Publish | Lucky Draw | Schedule`,
        },
      ],
      items2: [
        {
          link: '/live-now-section',
          img: '/home/image-01-of-how-it-works.png',
          name: 'Grow your business with your own live shopping solution',
          description:
            'With AnneBiz you engage with customers virtually and send your products directly through video and chat.',
        },
        {
          link: '/live-now-section',
          img: '/home/image-02-of-how-it-works.png',
          name:
            'Find out how we can help you reach more customers in just 5 minutes: Own the live sales experience ',
          description:
            'Once you have signed up for your account you will be able to publish live or recorded product showcases to your personal landing page or website.',
        },
        {
          link: '/live-now-section',
          img: '/home/image-03-of-how-it-works.png',
          name: 'Maximize reach for your live sales event',
          description:
            'Your live videos can also appear simultaniously on social media channels, For example Facebook, You Tube, Instagram and more. This will help you to grow your outreach and customer base each time you publish content.',
        },
        {
          link: '/live-now-section',
          img: '/home/image-04-of-how-it-works.png',
          name: 'Easily create engaging experience.',
          description:
            'People can now watch your videos and ofcourse purchase products, ask questions, and participete in lucky draws and much more.',
        },
        {
          link: '/live-now-section',
          img: '/home/image-05-of-how-it-works.png',
          name: 'Get more customers',
          description:
            'Everytime when viewers interact with your content, they will leave there contact details, growing your customer base over time.',
        },
        {
          link: '/live-now-section',
          img: '/home/image-06-of-how-it-works.png',
          name: 'Not additionl equipment needed',
          description: `You don't need any equipment other than your mobile phone, or a computer with a webcam. Of course, if you want you can also use professional studio equipment and create your own live shopping TV station.`,
        },
        {
          link: '/live-now-section',
          img: '/home/image-06-of-how-it-works.png',
          name: 'E-commerce platform included',
          description: `Use our build in checkout flow and start receiving orders, or integrate with your existing e-commerce platform.`,
        },
        {
          link: '/live-now-section',
          img: '/home/image-06-of-how-it-works.png',
          name: 'Start increasing e-commerce conversion',
          description: `Try with a free DEMO and take your live sales events to the next level.`,
        },
      ],
    }
  },
  methods: {},
  // layout: 'none',
}
</script>

<style scoped></style>
