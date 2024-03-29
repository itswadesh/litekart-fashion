<template>
  <div>
    <Megamenu class="hidden w-full xl:flex" />
    <MobileFilters
      class="flex-none"
      :facets="facets"
      :fl="fl"
      v-if="showMobileFilter"
      @hide="showMobileFilter = false"
    />
    <div v-else class="container flex mx-auto mt-16 xl:mt-6">
      <DesktopFilters
        class="flex-none hidden max-w-xs lg:block"
        :facets="facets"
        :fl="fl"
        @clearAllFilters="clearAllFilters"
      />
      <div class="relative w-full px-4">
        <HeaderBody
          :category="{}"
          :count="productCount"
          :fl="fl"
          @removed="facetRemoved"
          @showFilters="showMobileFilter = true"
        />
        <NoProduct v-if="(!products || !products.length) && !loading" />
        <div v-else class="-mt-16 sm:mt-0">
          <div class="flex flex-wrap justify-between" v-if="loading">
            <ProductSkeleton v-for="(p, ix) in 10" :key="ix + '-1'" />
          </div>
          <div
            v-else-if="products && products.length > 0"
            class="sticky flex flex-col flex-shrink-0 w-full h-full mt-2 md:p-3 nowrap flex-nowrap"
          >
            <div
              class="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            >
              <ProductCardEs
                class="slide-up-item"
                v-for="(p, ix) in products"
                :key="ix"
                :product="p._source"
                :pid="p._id"
              />
              <!-- <infinite-loading @infinite="loadMore($route.query.page)"></infinite-loading> -->
            </div>
          </div>
          <!-- <div class="pagination_box">
            <v-pagination
              v-if="noOfPages>1"
              v-model="currentPage"
              @change="changePage(currentPage)"
              :page-count="noOfPages"
              :disabled="loading"
              :classes="bootstrapPaginationClasses"
              :labels="paginationAnchorTexts"
            ></v-pagination>
          </div>-->
        </div>
        <Pagination
          :count="noOfPages"
          :current="parseInt($route.query.page || 1)"
          @change="changePage"
        />
      </div>
    </div>
    <!-- <RightSideBar /> -->
  </div>
</template>
<script>
import Pagination from '~/shared/components/ui/Pagination'
import c from '~/mixins/c.js'
import ProductCardEs from '~/components/Listing/ProductCardEs.vue'
import Megamenu from '~/components/Home/Megamenu'
export default {
  head() {
    return {
      title: 'Search Product',
    }
  },
  mixins: [c],
  async asyncData({ params, query, $axios }) {
    let products = [],
      facets = [],
      fl = {},
      err = null,
      productCount = 0
    try {
      const q = params.q || null,
        qry = { ...query }
      if (q) qry.q = q
      const result = await $axios.$get('/api/products/es', {
        params: { ...qry },
      })
      products = result.data
      productCount = result.count
      facets = result.facets.all_aggs
      Object.keys(qry).map(function (k, i) {
        if (qry[k] && !Array.isArray(qry[k]) && qry[k] != null && qry[k] != '')
          qry[k] = qry[k].split(',')
      })
      fl = qry // For selected filters
      return { products, productCount, facets, fl, err: null }
    } catch (e) {
      if (e && e.response && e.response.data) {
        err = e.response.data
      } else if (e && e.response) {
        err = e.response
      } else {
        err = e
      }
      // console.log('err...', `${err}`)
      return { products, productCount, facets: [], fl: {}, err }
    }
  },
  components: { Pagination, ProductCardEs, Megamenu },
  methods: {
    async getData(query) {
      try {
        this.loading = true
        const products = await this.$axios.$get('/api/products/es', {
          params: { ...query },
        })
        this.productCount = products.count
        this.products = products.data
        this.facets = products.facets.all_aggs
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style>
.pagination {
  list-style-type: none !important;
  display: flex !important;
  padding-left: 0 !important;
  list-style: none !important;
  border-radius: 0.25rem !important;
}
.page-link {
  position: relative !important;
  display: block !important;
  padding: 0.5rem 0.75rem !important;
  margin-left: -1px !important;
  line-height: 1.25 !important;
  color: #007bff !important;
  background-color: #fff !important;
  border: 1px solid #dee2e6 !important;
}
.page-item.disabled .page-link {
  color: #6c757d !important;
  pointer-events: none !important;
  cursor: auto !important;
  background-color: #fff !important;
  border-color: #dee2e6 !important;
  height: 34px !important;
}
.page-item:first-child .page-link {
  margin-left: 0 !important;
  border-top-left-radius: 0.25rem !important;
  border-bottom-left-radius: 0.25rem !important;
}
.page-item.active .page-link {
  z-index: 1 !important;
  color: #fff !important;
  background-color: #007bff !important;
  border-color: #007bff !important;
}
</style>
