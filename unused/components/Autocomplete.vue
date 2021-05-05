<template>
  <div class="flex flex-row w-full mx-auto shadow-sm lg:w-2/3 lg:ms-44">
    <div class="w-full bg-white rounded shadow-sm">
      <input
        type="text"
        :placeholder="$t('Search for products, brands and more')"
        class="w-full pl-4 border-0 rounded-sm placeholder focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-yellow-600"
        v-model="q"
        @keyup="search(q)"
      />
      <div class="hidden lg:block">
        <nuxt-link
          v-for="(p, ix) in products"
          :key="ix"
          class="flex text-xs font-thin bg-white border-t hover:bg-gray-100"
          :to="`/${p._source.slug}`"
        >
          <img
            v-lazy="p._source.img"
            :key="p._id"
            alt=""
            class="object-contain w-12 mx-2"
          />
          <span class="p-4 my-auto text-sm"> {{ p._source.name }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      q: null,
      products: null,
    }
  },
  async created() {
    // console.log(this.value)
  },
  methods: {
    async search(q) {
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz', q)
      try {
        const result = await this.$axios.$get('/api/products/autocomplete', {
          params: { q },
        })
        this.products = result.data
      } catch (e) {
      } finally {
      }
    },
  },
}
</script>
