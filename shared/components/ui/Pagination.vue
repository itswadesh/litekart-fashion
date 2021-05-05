<template>
  <div class="flex flex-row w-full" v-if="count > 1">
    <div
      class="justify-start flex-1 w-full py-5 text-xs text-center text-gray-600 list-none lg:text-sm"
    >
      <div
        class="float-left w-full mr-2 text-base font-normal text-gray-600 cursor-pointer lg:w-auto"
      >
        Page {{ current }} of {{ count }}
      </div>
      <div class="flex flex-row justify-center w-full lg:w-auto">
        <button
          v-if="current > 1"
          class="items-center hidden p-2 font-semibold bg-white border border-gray-400 rounded shadow focus:outline-none lg:inline-flex lg:mx-5 hover:bg-gray-100 text-primary lg:py-2 lg:px-4"
          @click="$emit('change', current - 1)"
          rel="prev"
        >
          <svg
            class="w-5 h-5 me-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            /></svg
          >&nbsp;
          <span>Previous</span>
        </button>
        <button
          class="w-8 h-8 mx-2 my-auto rounded hover:bg-gray-200 focus:outline-none"
          :class="{
            'bg-black font-medium focus:outline-none hover:bg-gray-200 text-white tracking-wide rounded-sm':
              current == i,
          }"
          v-for="i in pages"
          :key="i"
          @click="$emit('change', i)"
        >
          {{ i }}
        </button>
        <!-- inline-flex -->
        <button
          class="items-center hidden px-4 py-2 font-semibold bg-white border border-gray-400 rounded shadow lg:mx-5 focus:outline-none lg:inline-flex hover:bg-gray-100 text-primary"
          @click="$emit('change', current + 1)"
          v-if="current < count"
          rel="next"
        >
          <span>Next</span>
          &nbsp;
          <svg
            class="w-5 h-5 me-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pages() {
      let count = this.count > 10 ? 10 : this.count
      return parseInt(count)
    },
  },
  props: {
    count: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  methods: {},
}
</script>
