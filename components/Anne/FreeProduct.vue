<template>
  <div
    v-if="product"
    class="w-full max-w-sm p-4 overflow-hidden md:w-1/2 lg:w-1/3 xl:w-1/4 lg:mb-4"
  >
    <nuxt-link
      to="/"
      rel="prefetch"
      class="block bg-white rounded-md shadow-md avatar zoom hover:shadow-lg"
    >
      <button
        class="w-full py-3 text-center text-white rounded-t-md bg-primary-500 hover:bg-gray-200 hover:text-primary-500"
      >
        Live Now
      </button>
      <img
        src=""
        class="object-cover object-top min-w-full"
        style="width: 352px; height: 176px"
      />
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold truncate">{{ product.name }}</div>
        <div class="flex justify-between mb-2 text-base text-gray-600 truncate">
          by Ratings
        </div>
        <div class="flex items-center justify-between text-base">
          <div class="text-2xl font-bold">FREE</div>
          <nuxt-link to="" class="download primary"> </nuxt-link>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object },
  },
}
</script>

<style></style>
