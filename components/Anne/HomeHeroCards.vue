<template>
  <div v-if="product" class="container w-full mx-auto my-5">
    <nuxt-link :to="product.link" rel="prefetch" class="flex flex-row">
      <!-- Data section start  -->
      <div class="flex-1 w-1/2">
        <div class="mx-auto w-108">
          <button
            class="px-6 py-3 text-center text-white rounded-md shadow focus:outline-none bg-primary-500 hover:shadow"
          >
            {{ product.title }}
          </button>

          <div class="py-4">
            <div class="mb-2 text-lg font-bold">{{ product.name }}</div>
            <div
              class="flex justify-between mb-2 text-base prose text-gray-600"
              v-html="product.description"
            ></div>
            <div
              class="flex items-center justify-between text-base text-primary-500"
            >
              <div class="text-2xl font-bold">{{ product.footer }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Data section end -->
      <!-- Image section start  -->
      <div class="w-1/2">
        <img v-lazy="product.img" class="ml-auto h-116 max-w-max" />
      </div>
      <!-- Image section end -->
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

<style scoped></style>
