<template>
  <div class="relative bg-pink-200">
    <div
      class="container flex flex-col w-4/5 h-full max-w-full mx-auto mt-10 mb-5 bg-white rounded md:w-2/3 lg:w-1/3"
    >
      <span class="p-3 py-4 text-center text-gray-500 uppercase">
        design gift card
      </span>
      <div class="flex flex-row flex-wrap p-2 py-3 text-center bg-pink-300">
        <div v-for="o in Occasions" :key="o.id" class="my-2 cursor-pointer">
          <buttom
            class="p-1 px-4 m-1 border border-gray-400 hover:border-accent-600 rounded-3xl hover:text-accent-600 focus:outline-none transition transform bg-white hover:-translate-y-0.5"
            >{{ o.o }}
          </buttom>
        </div>
      </div>
      <div class="p-2">
        <div v-for="g in giftcards" :key="g.id">
          <img v-lazy="g.g" alt="cards" />
          <div class="p-2 text-center text-gray-500">
            <h3 class="uppercase text-normal">{{ g.main }}</h3>
            <span class="text-sm">{{ g.small }}</span>
          </div>
        </div>
      </div>
      <span class="text-center text-gray-500">Wish you all the best</span>
      <nuxt-link :to="localePath('/giftcards/buy')" class="p-2 px-3 mb-3">
        <button
          class="w-full p-3 mt-8 text-white uppercase ease-in-out bg-pink-500 border-none rounded shadow focus:outline-none transition hover:-translate-y-0.5 focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-pink-600"
        >
          next
        </button>
      </nuxt-link>
    </div>
    <!-- <div class="flex justify-center w-full "> -->
    <!-- <Footer class="bottom-0 hidden sm:flex" /> -->
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
        // {g:'/img/giftcards/paa.png',main:'Send birthdat wishes', small:'Wish your loved one by sending gift cards'},
        // {g:'/img/giftcards/wedding.png',main:'Send birthdat wishes', small:'Wish your loved one by sending gift cards'},
        // {g:'/img/giftcards/maa.webp',main:'Send birthdat wishes', small:'Wish your loved one by sending gift cards'},
        // {g:'/img/giftcards/special.webp',main:'Send birthdat wishes', small:'Wish your loved one by sending gift cards'},
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
