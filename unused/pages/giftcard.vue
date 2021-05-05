<template>
  <div class="relative bg-pink-200">
    <div
      class="container flex flex-col w-4/5 h-full max-w-full mx-auto mt-10 mb-5 bg-white rounded md:w-2/3 lg:w-1/3"
    >
      <VueSlickCarousel v-bind="settings" class="p-2">
        <div v-for="g in giftcards" :key="g.id">
          <img v-lazy="g.g" alt="cards" />
          <div class="p-2 text-center text-gray-500">
            <h3 class="uppercase text-normal">{{ g.main }}</h3>
            <span class="text-sm">{{ g.small }}</span>
          </div>
        </div>
      </VueSlickCarousel>
      <nuxt-link :to="localePath('/giftcards/personalise')" class="p-2 px-3">
        <button
          class="w-full p-3 mt-8 text-white uppercase ease-in-out bg-pink-500 border-none rounded shadow focus:outline-none transition hover:-translate-y-0.5 focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-pink-600"
        >
          SEnd gift card
        </button>
      </nuxt-link>
      <div class="p-2 mt-4 text-center">
        <span class="text-sm text-gray-400">
          --------------- Brows Gift By Occasions ---------------
        </span>
        <div class="flex flex-row flex-wrap">
          <div v-for="o in Occasions" :key="o.id" class="mt-3">
            <button
              class="p-1 px-4 m-1 border border-gray-400 rounded-3xl hover:bg-accent-600 hover:text-white focus:outline-none transition transform bg-white hover:-translate-y-0.5"
            >
              {{ o.o }}
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <h2 class="text-lg text-center text-gray-500">
          Recieved A gift Cards?
        </h2>
        <form action="">
          <div class="p-5 mt-3 border rounded">
            <input
              type="text"
              class="w-full my-2 border-none rounded ring-1 ring-gray-400 focus:ring-pink-500 focus:outline-none"
              placeholder="Card Number"
            />
            <input
              type="password"
              class="w-full my-2 border-none rounded ring-1 ring-gray-400 focus:ring-pink-500 focus:outline-none"
              placeholder="PIN"
            />
          </div>
          <div class="flex items-center justify-center">
            <button
              class="p-3 font-medium text-gray-500 uppercase focus:outline-none transform hover:-translate-y-0.5 border-none hover:text-gray-600"
            >
              check balance
            </button>
          </div>
        </form>
        <div class="flex justify-center">
          <button
            class="p-3 text-sm text-gray-400 uppercase focus:outline-none transform hover:-translate-y-0.5 border-none hover:text-gray-600"
          >
            Manage Gift Cards
          </button>
        </div>
      </div>

      <div class="p-5 pb-5 bg-gray-200">
        <span class="mt-4 text-center text-gray-600 text-normal">
          Gift Cards for all Occasions
        </span>
        <div v-for="d in description" :key="d.id">
          <span class="p-2 text-xs text-gray-500">{{ d.d }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-center w-full "> -->
    <Footer class="bottom-0 hidden sm:flex" />
    <!-- </div> -->
  </div>
</template>
<script>
import Nav from '~/components/Home/Nav'
import Footer from '~/components/Footer'
export default {
  data() {
    return {
      giftcards: [
        {
          g: '/img/giftcards/hbd.png',
          main: 'Send birthdat wishes',
          small: 'Wish your loved one by sending gift cards',
        },
        {
          g: '/img/giftcards/paa.png',
          main: 'Send birthdat wishes',
          small: 'Wish your loved one by sending gift cards',
        },
        {
          g: '/img/giftcards/wedding.png',
          main: 'Send birthdat wishes',
          small: 'Wish your loved one by sending gift cards',
        },
        {
          g: '/img/giftcards/maa.webp',
          main: 'Send birthdat wishes',
          small: 'Wish your loved one by sending gift cards',
        },
        {
          g: '/img/giftcards/special.webp',
          main: 'Send birthdat wishes',
          small: 'Wish your loved one by sending gift cards',
        },
      ],
      Occasions: [
        { o: 'Wedding ' },
        { o: 'Birthday' },
        { o: 'Aniversary' },
        { o: 'Welcome' },
        { o: 'Seasional Greeting' },
        { o: 'Best Wishes' },
        { o: 'Congrates' },
        { o: 'Fairewell' },
        { o: 'ThankYou' },
        { o: 'My Idol' },
        { o: 'Good Luck' },
        { o: 'Best Mom' },
        { o: 'Best Dad' },
        { o: 'Best Parent' },
        { o: 'Best Freind' },
        { o: 'Best Child' },
        { o: 'Engagement' },
        { o: 'Best Spouse' },
      ],
      description: [
        {
          d:
            'Are you still confused about what to gift your friend this birthday? Do you have a lot of things in mind but not able to single out one option? Maybe, then this is the best time to avail the Myntra gift card. Yes, you heard it right! Myntra is bringing this opportunity to you to buy a specially personalised gift card for your near and dear ones. These cards are a part of the constant endeavours from the Myntra world to bring a smile to your friends’ and family’s faces. Not only a birthday, but you can opt for a gift card for a plenty of other occasions, tailor-made to suit your requirements.',
        },
        {
          d:
            'Are you still confused about what to gift your friend this birthday? Do you have a lot of things in mind but not able to single out one option? Maybe, then this is the best time to avail the Myntra gift card. Yes, you heard it right! Myntra is bringing this opportunity to you to buy a specially personalised gift card for your near and dear ones. These cards are a part of the constant endeavours from the Myntra world to bring a smile to your friends’ and family’s faces. Not only a birthday, but you can opt for a gift card for a plenty of other occasions, tailor-made to suit your requirements.',
        },
        {
          d:
            'Are you still confused about what to gift your friend this birthday? Do you have a lot of things in mind but not able to single out one option? Maybe, then this is the best time to avail the Myntra gift card. Yes, you heard it right! Myntra is bringing this opportunity to you to buy a specially personalised gift card for your near and dear ones. These cards are a part of the constant endeavours from the Myntra world to bring a smile to your friends’ and family’s faces. Not only a birthday, but you can opt for a gift card for a plenty of other occasions, tailor-made to suit your requirements.',
        },
      ],
      settings: {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: 'linear',
      },
    }
  },
  components: {
    Nav,
    Footer,
  },
}
</script>
