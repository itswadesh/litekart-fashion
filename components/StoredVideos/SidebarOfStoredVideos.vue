<template>
  <section class="hidden md:block bg-gray-200 w-80 text-gray-800">
    <div class="py-4">
      <div v-for="(i, ix) in items" :key="ix" class="flex flex-col m-6">
        <button
          @click="$router.push('#')"
          class="focus:outline-none font-medium flex justify-start ml-2 text-left hover:text-primary-500"
        >
          {{ i.catagories }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { catagories: 'All Products' },
        { catagories: 'Newly Launched' },
        { catagories: 'Most Popular' },
        { catagories: 'Top Picks' },
        { catagories: 'Household' },
        { catagories: 'Diy Tools' },
        { catagories: 'Lifestyle & Accesories' },
      ],
    }
  },
}
</script>
<style></style>
