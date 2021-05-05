<template>
  <div class="relative bg-pink-200">
    <Nav />

    <div
      class="container flex flex-col w-4/5 h-full max-w-full mx-auto mt-10 mb-5 bg-gray-100 rounded shadow md:w-2/3 lg:w-1/3"
    >
      <span class="p-3 py-4 text-center text-gray-500 uppercase"
        >Enter Details</span
      >
      <div class="p-2">
        <div class="p-2 py-5 mx-auto bg-white border rounded-sm">
          <span class="font-medium text-gray-600">Choose an amount*</span>
          <div class="flex flex-row flex-wrap">
            <div
              v-for="p in price"
              :key="p.id"
              class="py-4 mx-auto text-center cursor-pointer"
            >
              <buttom
                class="p-1 px-4 m-1 border border-gray-400 text-gray-400 hover:border-accent-600 rounded hover:text-accent-600 focus:outline-none transition transform bg-white hover:-translate-y-0.5"
                >{{ p.p }}
              </buttom>
            </div>
          </div>
          <span class="text-xs text-gray-400">
            (minimun Rs.1,000 and maximum Rs. 10,000 )
          </span>
        </div>
        <div class="p-2 mt-3 bg-white border rounded-sm">
          <span class="font-medium text-gray-600">Recipent's Details</span>
          <span class="text-sm text-gray-400">Enter atleast one of these</span>
          <div class="p-5 mt-3 rounded">
            <input
              type="text"
              class="w-full my-2 border-none rounded ring-1 ring-gray-400 focus:ring-pink-500 focus:outline-none"
              placeholder="Recipent's Mobile Number"
            />
            <input
              type="text"
              class="w-full my-2 border-none rounded ring-1 ring-gray-400 focus:ring-pink-500 focus:outline-none"
              placeholder="Recipent's Email"
            />
          </div>
        </div>
        <div class="p-2 mt-3 bg-white border rounded-sm">
          <div class="p-5 mt-3 rounded">
            <input
              type="text"
              class="w-full my-2 border-none rounded ring-1 ring-gray-400 focus:ring-pink-500 focus:outline-none"
              placeholder="Recipent's Name*"
            />
            <input
              type="text"
              class="w-full my-2 border-none rounded ring-1 ring-gray-400 focus:ring-pink-500 focus:outline-none"
              placeholder="From"
            />
          </div>
        </div>
        <nuxt-link :to="localePath('/giftcards/preview')" class="mb-4">
          <button
            class="w-full p-3 mt-8 text-white uppercase ease-in-out bg-pink-500 border-none rounded shadow focus:outline-none transition hover:-translate-y-0.5 focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-pink-600"
          >
            show preview
          </button>
        </nuxt-link>
      </div>
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
      price: [
        { p: '1000 ' },
        { p: '2000' },
        { p: '3000' },
        { p: '4000' },
        { p: 'other' },
      ],
    }
  },
  components: {
    Nav,
    Footer,
  },
}
</script>
