<template>
  <div v-if="banners" class="grid gap-2 m-2 lg:grid-cols-3 md:grid-cols-2">
    <div v-for="b in banners.data" :key="b.id" class="cursor-pointer">
      <img v-lazy="b.img" alt="frid1" class="object-contain w-full h-auto" />
    </div>
  </div>
</template>

<script>
import BANNERS from '~/gql/banner/banners.gql'
export default {
  data() {
    return {
      banners: null,
    }
  },
  async created() {
    this.getBanners()
  },
  methods: {
    async getBanners() {
      try {
        this.banners = (
          await this.$apollo.query({
            query: BANNERS,
            variables: {
              type: 'banner',
            },
            fetchPolicy: 'no-cache',
          })
        ).data.banners
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
