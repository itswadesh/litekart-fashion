<template>
  <div
    class="container relative flex flex-wrap w-full min-w-full overflow-hidden bg-white shadow z-2"
  >
    <div
      v-if="categories"
      class="flex flex-col justify-around w-full mb-3 text-sm font-semibold ms-10 me-10 sm:flex md:flex-row sm:flex-col lg:inline-flex lg:flex-grow lg:w-auto lg:h-auto bg-white-400"
    >
      <div
        v-for="c in categories.data"
        :key="c.id"
        class="mt-2 ms-2 hover:text-blue-600 lg:inline-flex lg:w-auto"
      >
        <nuxt-link :to="localePath(`/c/${c.slug}`)" class="flex flex-row">
          <a class="my-auto" href="#">{{ c.name }}</a>
          <chevron-down-icon
            size="1x"
            class="inline-block my-auto text-gray-500 custom-class"
          ></chevron-down-icon>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-class {
  margin-top: 6px;
}
</style>

<script>
import CATEGORIES from '~/gql/category/categories.gql'
// featured:
export default {
  components: {},
  data() {
    return {
      categories: null,
    }
  },
  async created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      try {
        this.categories = (
          await this.$apollo.query({
            query: CATEGORIES,
            variables: { megamenu: true },
            fetchPolicy: 'no-cache',
          })
        ).data.categories
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
