<template>
  <div
    class="w-full px-2 my-2 text-white rounded-lg ticket lg:w-1/3"
    :class="color"
  >
    <div class="flex items-center mt-2 mb-2 ms-8">
      <div class="w-2/3">
        <h2 class="text-4xl font-bold">{{ code }}</h2>
        <span class="mb-4 -mt-2 leading-tight text-gray-400">{{ text }}</span>
      </div>
      <div class="w-1/3 mx-4 text-center">
        <nuxt-link :to="localePath('cart')">
          <button
            @click="applyOffer(code)"
            class="px-6 text-xl text-gray-400 rounded-lg bg-secondary-400 hover:text-white"
          >
            Apply
          </button>
        </nuxt-link>
      </div>
    </div>
    <div class="py-1 text-xs text-center bg-black opacity-25">
      <span class="text-white opacity-100">{{ terms }}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
export default {
  props: {
    color: String,
    code: String,
    text: String,
    terms: String,
  },
  methods: {
    ...mapActions({ applyCoupon: 'cart/applyCoupon' }),
    applyOffer(code) {
      this.applyCoupon({ code })
    },
  },
}
</script>

<style scoped>
.red {
  background-color: lightcoral;
}
.gray {
  background-color: gray;
}
.cyan {
  background-color: darkcyan;
}
.orange {
  background-color: darkorange;
}
.violet {
  background-color: blueviolet;
}
.ticket {
  position: relative;
  border: 2px solid white;
  color: white;
  text-transform: uppercase;
  display: inline-block;
  padding: 1em 0em;
}
.ticket:before,
.ticket:after {
  content: '';
  position: absolute;
  top: 1.9em;
  top: calc(1.9em - 1px);
  height: 1.2em;
  width: 0.6em;
  border: 2px solid white;
}
.ticket:before {
  left: -2px;
  border-radius: 0 1em 1em 0;
  border-left-color: black;
}
.ticket:after {
  right: -2px;
  border-radius: 1em 0 0 1em;
  border-right-color: black;
}
</style>
