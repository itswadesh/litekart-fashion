<template>
  <div class="max-w-full">
    <div class="w-full min-h-screen mx-auto">
      <Megamenu class="hidden w-full xl:flex" />
      <div class="container flex flex-row max-w-full mx-auto xl:mt-5">
        <LeftComponent class="hidden md:block lg:w-1/5 md:w-11/4" />
        <div
          class="sticky flex flex-col w-full h-full shadow bg-gray-50 md:bg-white md:p-0 lg:w-4/5"
        >
          <Heading v-if="isLoading" :title="`...`" back="/" class="lg:hidden" />
          <div v-else-if="category" class="h-10">
            <Heading :title="`Explore ${category.name}`" back="/" />
          </div>
          <div v-else-if="!isLoading" class="w-1/2 h-10">
            Category not found
          </div>
          <div
            class="flex-col-reverse justify-between hidden w-full pl-3 mt-2 md:flex"
          >
            <div class="flex flex-row flex-wrap w-full my-3 mt-4">
              <button
                class="flex-row inline p-1 my-1 text-xs text-gray-600 bg-gray-200 rounded me-1 focus:outline-none hover:bg-gray-300"
                v-for="(c, i) in selectedFilterData"
                :key="i"
              >
                <span v-if="c.model != 'category'" class="flex">
                  {{ c.val }}
                  <svg
                    @click="removeCategory(c, i)"
                    class="w-3 h-3 my-auto text-gray-700 ms-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>

                <span v-else>
                  <span v-if="selectedCategoryName" class="flex">
                    {{ selectedCategoryName }}
                    <svg
                      @click="removeCategory(c, i)"
                      class="my-auto text-gray-800 ms-1 custom-class"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>

            <div
              class="absolute top-0 flex flex-col justify-end float-right w-full my-2 -ms-4 md:flex-row"
            >
              <span
                class="flex-shrink-0 my-auto text-sm font-medium text-gray-600 ms-2 me-2 md:ms-0"
              >
                SORT BY : {{ sortBy }}
              </span>
              <span class="p-1 my-auto">
                <select
                  name=""
                  id=""
                  v-model="sortBy"
                  @change="onSort"
                  class="text-xs border rounded text-primary-600 ring-gray-500 hover:shadow focus:outline-none"
                >
                  <option
                    :value="o.val"
                    v-for="(o, ix) of sortOptions"
                    :key="ix"
                  >
                    {{ o.name }}
                  </option>
                </select>
              </span>
            </div>
          </div>
          <!-- <DiwaliOffer v-if="loading" /> -->
          <!-- gqp -->
          <div v-if="data" class="p-3 md:p-1">
            <div
              class="sticky flex flex-col flex-shrink-0 w-full h-full mt-2 bg-gray-50 md:bg-white md:p-3 nowrap flex-nowrap"
            >
              <div
                class="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4"
                v-infinite-scroll="loadMore"
                :infinite-scroll-distance="3"
                :infinite-scroll-immediate-check="true"
              >
                <product-card-es
                  class="slide-up-item"
                  v-for="(p, ix) in data"
                  :key="ix"
                  :p="p._source"
                />
              </div>
              <div
                v-if="data.length < 1 && !isLoading"
                class="mt-64 text-center"
              >
                No items found. Please modify your search
              </div>
              <!--    -->
              <!-- <Pagination /> -->
            </div>
            <!-- when no producrt available -->

            <div v-if="data && data.count == 0" class>
              <div class="w-full m-5 mx-auto">
                <img
                  v-lazy="'img/noproduct.png'"
                  alt="noproduct"
                  class="object-cover mx-auto height"
                />
              </div>
            </div>
          </div>
          <div>
            <!-- <Pagination
              @change="changePage"
              :count="data && data.count"
              :current="currentPage"
              @next="showNextPage"
            />-->
          </div>
        </div>
        <!-- </span>pagination</span>-->
      </div>
      <!-- <BackToTop /> -->
    </div>
    <!-- <GeoLocation /> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import LeftComponent from '~/components/Listing/LeftComponent'
import Megamenu from '~/components/Home/Megamenu'
import Nav from '~/components/Home/Nav'

import MobileFixedFooter from '~/components/ui/MobileFixedFooter'
import { Heading } from '~/shared/components'
import { infiniteScroll, sort } from '~/shared/mixins'
import PRODUCTS from '~/gql/product/productEs.gql'
import GET_CATEGORY from '~/gql/category/category.gql'
import SORTS from '~/gql/settings/sorts.gql'
import ProductCardEs from '~/components/Listing/ProductCardEs.vue'
export default {
  layout: 'search',
  mixins: [infiniteScroll],
  watch: {
    '$route.query': function () {
      this.getFilteredData()
    },
  },
  data() {
    return {
      isLoading: false,
      category: null,
      filterData: {},
      selectedFilterData: [],
      selectedCategoryName: null,
      type: '',
      sortBy: null,
      categories: null,
      model: PRODUCTS,
      attr: 'productEs',
      sortOptions: null,
    }
  },
  components: {
    Megamenu,
    Nav,

    LeftComponent,

    Heading,
    ProductCardEs,
  },
  async created() {
    this.type = this.$route.query.type || ''
    await this.getSortOptions()
    await this.getFilteredData()
    await this.getCategoryDetails()
  },
  mounted() {
    this.getData() // Creates server rendering issue unless placed here
  },
  // computed: { ...mapGetters({ loading: 'loading' }) },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async getSortOptions() {
      try {
        this.isLoading = true
        this.sortOptions = (
          await this.$apollo.query({
            query: SORTS,
            fetchPolicy: 'no-cache',
          })
        ).data.sorts
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
    getFilteredData() {
      // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz')
      this.filterData = {}
      if (this.$route.query) {
        // console.log(this.$route.query)
        this.selectedFilterData = []
        Object.keys(this.$route.query).forEach((e) => {
          if (e == 'category') {
            this.getCategoryName()
          }
          if (
            e != undefined &&
            e != '' &&
            e != 'sort' &&
            e != 'page' &&
            e != 'search' &&
            e != 'category'
          ) {
            this.filterData[e] = this.$route.query[e].split(',')
            this.filterData[e].forEach((v) => {
              if (e != 'sortBy')
                this.selectedFilterData.push({ model: e, val: v })
              else {
                this.sortBy = this.filterData[e].toString()
              }
            })
          }
          if (e == 'category') {
            this.filterData['category'] = this.$route.query[e]
            this.selectedFilterData.push({
              model: e,
              val: this.$route.query[e],
            })
          }
        })
      }
    },
    async getCategoryDetails() {
      try {
        this.isLoading = true
        this.category = (
          await this.$apollo.query({
            query: CATEGORY,
            variables: { slug: this.$route.params.slug },
            fetchPolicy: 'no-cache',
          })
        ).data.category
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
    async getCategoryName() {
      var slug = this.$route.query['category']
      try {
        this.isLoading = true
        const category = (
          await this.$apollo.query({
            query: GET_CATEGORY,
            variables: { slug: slug },
            fetchPolicy: 'no-cache',
          })
        ).data.category
        this.selectedCategoryName = category.name
        this.getData()
      } catch (e) {
        this.setErr(e)
        // this.$store.commit('setErr', e)
      } finally {
        this.busy(false)
        this.isLoading = false
        // this.$store.commit('busy', false)
        this.meta.busy = false
      }
    },
    onSort() {
      // if (!this.$route.query['sortBy']) {
      this.filterData['sortBy'] = this.sortBy
      var link = this.getUrl()
      link = link.substr(0, link.length - 1)
      this.$router.push(`/c/${this.$route.params.slug}${link}`)
      // }
    },
    removeCategory(c, i) {
      this.selectedFilterData.splice(i, 1)
      if (c.model != 'category') {
        var si = this.filterData[c.model].indexOf(c.val)
        this.filterData[c.model].splice(si, 1)
        if (this.filterData[c.model].length == 0)
          delete this.filterData[c.model]
        var link = this.getUrl(c.model)
        link = link.substr(0, link.length - 1)
      } else {
        delete this.filterData[c.model]
        var link = this.getUrl(c.model)
        link = link.substr(0, link.length - 1)
        this.selectedCategoryName = null
      }
      this.$router.push(`/c/${this.$route.params.slug}${link}`)
    },

    getUrl() {
      var url = '?'
      Object.keys(this.filterData).forEach((e) => {
        if (
          this.filterData[e] &&
          e != 'sort' &&
          this.filterData[e] != undefined
        ) {
          url += `${e}=${this.filterData[e]}&`
        }
      })
      return url
    },
    filter() {
      this.$router.push(
        `/search/${this.$route.params.q || ''}?type=${this.type}`
      )
    },
  },
}
</script>
<style scoped>
.slide-up-move {
  transition: transform 1s;
}
</style>
