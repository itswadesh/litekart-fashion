<template>
  <div class="w-full lg:pr-0 lg:w-2/3 lg:ms-44">
    <div
      v-if="isFocused"
      @click="onUnfocused"
      class="fixed inset-0 w-screen h-screen lg:z-50"
    ></div>
    <div class="z-50 flex flex-col justify-center w-full">
      <div class="flex flex-wrap">
        <form
          novalidate
          autocomplete="off"
          @submit.stop.prevent="submit"
          class="flex flex-row w-full"
        >
          <!-- tablet and desktop input -->
          <input
            v-on:keyup.enter="$event.target.blur()"
            @focus="onFocused()"
            @input="getData()"
            :placeholder="
              (settings && settings.searchbar_text) ||
              'Search for products, brands...'
            "
            @keyup="onSelectValue($event)"
            v-model="selectedVal"
            class="relative hidden w-full p-2 pl-4 font-light truncate rounded shadow sm:flex text-normal placeholder focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-yellow-600"
          />
          <!-- mobile view input -->
          <input
            @focus="onFocusedMobile()"
            :placeholder="
              (settings && settings.searchbar_text) ||
              'Search for products, brands...'
            "
            class="relative w-full p-2 pl-4 font-light truncate rounded shadow sm:hidden text-normal placeholder focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-yellow-600"
          />
          <div class="flex justify-end h-full">
            <!-- search icon -->
            <svg
              style="margin-top: 10px"
              class="absolute flex justify-end w-5 h-5 my-auto text-sm text-gray-500 me-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>
        <div
          v-if="isFocused"
          style="z-index: 9999"
          class="w-full mt-1 overflow-auto bg-white border-gray-400 rounded shadow"
        >
          <div
            :class="{ 'bg-gray-300': selectedIndex == i }"
            v-for="(v, i) in products"
            :key="i"
            @click="onselect(v)"
            class="flex items-center w-full text-sm font-thin text-gray-400 border-b cursor-pointer hover:bg-gray-100"
          >
            <img
              v-lazy="v._source.img"
              :key="v._id"
              alt=""
              class="object-contain w-12 h-10 mx-2"
            />
            <span class="p-3">{{ v._source.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
      selectedVal: null,
      isFocused: false,
      product: null,
      selectedIndex: -1,
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
  methods: {
    submit() {
      this.onUnfocused()
      if (this.product)
        this.$router.push(
          `/${this.product._source.slug}?id=${this.product._id}`
        )
      else this.$router.push(`/search/${this.selectedVal}`)
    },
    async onselect(val) {
      // console.log(val)
      this.fillValue(val)
      this.onUnfocused()

      this.$router.push(`/${this.product._source.slug}?id=${this.product._id}`)
      // console.log(this.selectedVal)
    },
    async fillValue(val) {
      this.product = val
      this.selectedVal = this.product._source.name
    },
    async onSelectValue(e) {
      // console.log(e);
      if (this.isFocused) {
        if (e.key == 'ArrowDown') {
          if (this.selectedIndex < this.products.length) {
            this.selectedIndex++
            this.fillValue(this.products[this.selectedIndex])
          } else {
            this.selectedIndex = 0
          }
        } else if (e.key == 'ArrowUp') {
          if (this.selectedIndex >= 0) {
            this.selectedIndex--
            this.fillValue(this.products[this.selectedIndex])
          }
        } else if (e.key == 'Escape') {
          this.isFocused = false
          this.selectedIndex = -1
        } else {
          this.selectedIndex = -1
          // this.selectedVal=null
          this.product = null
        }
      }
    },
    async getData() {
      if (this.selectedVal == null || this.selectedVal == '') return
      try {
        const result = await this.$axios.$get('/api/products/autocomplete', {
          params: { q: this.selectedVal },
        })
        // console.log(result)
        this.products = result.data
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
    onFocusedMobile() {
      this.$router.push('/search-suggestions')
    },
    onFocused() {
      //
      this.isFocused = true
      this.getData()
    },
    onUnfocused() {
      this.isFocused = false
      this.selectedIndex = -1
      console.log(this.isFocused, this.selectedIndex)
      return
    },
  },
}
</script>
