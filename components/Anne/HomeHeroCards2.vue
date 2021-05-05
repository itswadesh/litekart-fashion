<template>
  <div v-if="product" class="w-full p-3 overflow-hidden md:w-1/3">
    <nuxt-link
      :to="product.link"
      rel="prefetch"
      class="block p-10 bg-white border-b-8 border-white rounded-md shadow avatar hover:border-primary-500 zoom hover:shadow-md"
    >
      <img
        v-lazy="product.img"
        class="object-cover object-top w-full h-40 md:h-60"
      />
      <div class="px-6 pb-4">
        <div class="mb-2 text-lg font-bold text-center">{{ product.name }}</div>
        <div
          class="mb-2 text-center text-gray-600"
          v-html="product.description"
        ></div>
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

<style scoped></style>
