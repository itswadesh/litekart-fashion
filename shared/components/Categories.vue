<template>
  <div
    class="sticky top-0 z-10 flex w-full mb-2 overflow-x-auto text-gray-600 border-t shadow-lg bg-gray-50"
    v-if="categories"
  >
    <nuxt-link
      :to="localePath(`/c/${c.slug}`)"
      v-for="c in categories.data"
      :key="c.id"
      class="category-item"
    >
      <!-- <i :class="`fa fa-${c.icon}`" /> -->
      <img v-lazy="c.img" class="w-8 h-8 rounded-full" />
      <span class="text-xs">{{ c.name }}</span>
    </nuxt-link>
  </div>
</template>

<script>
import CATEGORIES from '~/gql/category/categories.gql'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      categories: null,
    }
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
  },
  async mounted() {
    try {
      this.clearErr()
      this.categories = (
        await this.$apollo.query({
          query: CATEGORIES,
        })
      ).data.categories
    } catch (e) {
      this.setErr(e)
    } finally {
      this.busy(false)
    }
  },
}
</script>

<style scoped></style>
