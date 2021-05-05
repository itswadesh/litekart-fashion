<template>
  <div class="flex flex-row w-full mx-auto shadow-sm lg:w-2/3 lg:ms-44">
    <div class="w-full bg-white rounded shadow-sm">
      <v-select
        label="name"
        placeholder="Search for toys"
        :filterable="false"
        :options="options"
        @search="onSearch"
        :value="q"
        @input="setSelected"
      >
        <template slot="no-options"> type to search products.. </template>
        <template slot="option" slot-scope="option" class="p-4">
          <nuxt-link
            :to="`/${option._source.slug}?id=${option.id}`"
            class="flex my-auto cursor-pointer hover:bg-gray-200 hover:text-primary-500"
          >
            <img
              v-lazy="option._source.img"
              alt=""
              class="object-contain w-12 h-12 p-1 rounded me-3"
            />
            <span class="my-auto"> {{ option._source.name }}</span>
          </nuxt-link>
        </template>
        <!-- <template slot="selected-option" slot-scope="option">
            <div class="">
              <img v-lazy="option._source.img" alt="" class="object-contain w-12 mx-2 rounded"/> 
              <span class="p-4 my-auto text-sm"> {{ option._source.name }}</span>
            </div>
    </template> -->
      </v-select>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  data() {
    return {
      options: [],
      q: null,
      products: null,
    }
  },
  components: {
    vSelect,
  },
  async created() {
    // console.log(this.value)
  },
  methods: {
    setSelected(value) {
      const slug = value._source.slug
      const id = value._id
      this.$router.push(`/${slug}?id=${id}`)
    },
    async onSearch(search, loading) {
      if (search.length) {
        loading(true)
        await this.search(loading, search, this)
        loading(false)
      }
    },
    search: async (loading, search, vm) => {
      vm.options = (
        await vm.$axios.$get(`/api/products/autocomplete?q=${escape(search)}`)
      ).data
    },
  },
}
</script>
