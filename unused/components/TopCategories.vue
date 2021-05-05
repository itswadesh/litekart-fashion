<template>
  <div class="flex w-screen overflow-x-auto bg-white shadow-md">
    <div
      @click="getSelectedcategory(c)"
      class="w-1/12 mx-2 cursor-pointer"
      :key="i"
      v-for="(c, i) in categories"
    >
      <img class="object-contain w-48 h-24 mx-2 mt-4" v-lazy="c.img" />
      <!-- <span class="font-semibold text-center text-md">{{ c.name }}</span>-->
    </div>
  </div>
</template>

<script>
import CATEGORiES from '~/gql/category/categories.gql'
export default {
  data() {
    return {
      categories: null,
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    getSelectedcategory(c) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })

      $nuxt.$emit('showCatagory', c)

      // window.scrollTo(0, -30)
    },
    async getCategories() {
      this.loading = true
      $nuxt.$emit('selectedCategory')
      try {
        this.categories = (
          await this.$apollo.query({
            query: CATEGORiES,

            fetchPolicy: 'no-cache',
          })
        ).data.categories.data

        // console.log(this.categories)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
