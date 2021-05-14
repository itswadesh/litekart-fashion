<template>
  <div v-if="product" class="w-full p-3">
    <nuxt-link
      :to="product.link"
      rel="prefetch"
      class="block p-10 bg-white border-b-8 border-white rounded-md shadow avatar hover:border-primary-500 zoom hover:shadow-md"
    >
      <img v-lazy="product.img" class="h-40 mx-auto" />
      <div class="">
        <div class="my-5 text-2xl font-bold text-center">
          {{ product.name }}
        </div>
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
