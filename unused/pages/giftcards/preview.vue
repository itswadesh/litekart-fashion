<template>
  <div class="relative bg-pink-200">
    <div
      class="container flex flex-col w-4/5 h-full max-w-full mx-auto mt-10 mb-5 bg-yellow-200 rounded shadow md:w-2/3 lg:w-1/3"
    >
      <div class="text-center text-gray-400">
        <span
          style="text-shadow: 2px 2px 5px red"
          class="p-6 font-mono text-2xl italic text-gray-500"
        >
          Pranjal
        </span>
        <span
          style="text-shadow: 2px 2px 5px orange"
          class="p-5 font-mono text-sm uppercase"
        >
          wish you a great year ahead
        </span>
        <span class="p-5 font-mono text-xs">from SHIVAM GIRI</span>
      </div>
      <div class="p-6">
        <img v-lazy="'/img/giftcards/hbd.png'" alt="card" />
        <span class="my-2">rs. <b class="text-accent-600">1,000</b></span>
        <span class="text-xs text-gray-500"
          >Expiry Date : 1 Year from Today</span
        >
      </div>
      <div class="p-3 py-5 bg-white">
        <nuxt-link :to="localePath('/giftcards/address')">
          <button
            class="w-full p-3 mt-4 text-white uppercase ease-in-out bg-pink-500 border-none rounded shadow focus:outline-none transition hover:-translate-y-0.5 focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-pink-600"
          >
            pay 1000
          </button>
        </nuxt-link>
      </div>
    </div>

    <!-- <Footer class="bottom-0 hidden sm:flex" /> -->
  </div>
</template>
<script>
import Nav from '~/components/Home/Nav'

import Footer from '~/components/Footer'
export default {
  data() {
    return {}
  },
  components: {
    Nav,
    Footer,
  },
}
</script>
