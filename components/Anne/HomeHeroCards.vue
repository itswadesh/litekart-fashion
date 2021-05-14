<template>
  <div v-if="product" class="container w-full mx-auto my-5">
    <nuxt-link
      :to="product.link"
      rel="prefetch"
      class="flex flex-col-reverse lg:flex-row"
    >
      <!-- Data section start  -->
      <div
        class="flex-1 order-1 mt-5 lg:w-1/2 lg:mt-0"
        :class="ix % 2 == 0 ? 'order-2' : ''"
      >
        <div class="mx-4 lg:mx-auto lg:w-108">
          <button
            class="px-6 py-3 text-center text-white rounded-md shadow focus:outline-none bg-primary-500 hover:shadow"
          >
            {{ product.title }}
          </button>

          <div class="my-8">
            <div class="text-lg font-bold">{{ product.name }}</div>
            <div
              class="flex my-5 text-sm text-gray-600 lg:text-base"
              v-html="product.description"
            ></div>
            <div class="text-lg font-bold lg:text-2xl text-primary-500">
              {{ product.footer }}
            </div>
          </div>
        </div>
      </div>
      <!-- Data section end -->
      <!-- Image section start  -->
      <div
        class="order-2 lg:w-1/2"
        :class="ix % 2 == 0 ? 'order-1 ml-0 max-w-max' : ''"
      >
        <img v-lazy="product.img" class="ml-auto h-96 lg:h-116 max-w-max" />
      </div>
      <!-- Image section end -->
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object },
    ix: { type: Number },
  },
}
</script>

<style scoped></style>
