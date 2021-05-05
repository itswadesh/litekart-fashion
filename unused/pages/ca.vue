<template>
  <div class="pb-16 bg-gray-50">
    <!-- <CategoryComponent class="hidden md:flex" /> -->
    <Megamenu class="hidden lg:flex" />
    <div class="flex flex-row mt-2">
      <LeftComponent class="hidden md:block" />
      <!-- <SingleView class="w-full md:hidden" /> -->
      <RightComponent class="hidden md:flex" />
    </div>
    <BackToTop />
  </div>
</template>
<script>
import PRODUCTS from '~/gql/product/products.gql'
import CATEGORY from '~/gql/category/category.gql'
import c from '~/mixins/c.js'
import { TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from '~/shared/config'
export default {
  mixins: [c],
  async asyncData({ route, params, app }) {
    let client = app.apolloProvider.defaultClient
    // Created and asyncdata both called twice
    let products = [],
      category = {},
      err = null
    try {
      const search = route.path.substr(1)
      // const search = path.substr(1) || null;
      if (search)
        // Asyncdata called twice. Hence to prevent 2nd call
        category = (
          await client.query({
            query: CATEGORY,
            variables: { slug: params.slug },
          })
        ).data.category
    } catch (e) {
      if (e && e.response && e.response.data) {
        err = e.response.data
      } else if (e && e.response) {
        err = e.response
      } else {
        err = e
      }
      // console.log('err...', `${err}`)
    }
    return { products, category }
  },
  async created() {
    // Created and asyncdata both called twice
    this.getWishlist() // Must be here for wish button to properly show the status
    // let c = this.$route.path.substr(1);
    // if (!c || c == "undefined" || c == "null") return;
    // this.getData();
    // this.getFeatures();
    // this.getAllData();
  },
  mounted() {},
  // computed: {
  //   noOfPages() {
  //     console.log(
  //       "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  //       this.products.length,
  //       this.count
  //     );
  //     let l = 1;
  //     if (!this.products.length || this.products.length == 0) l = 1;
  //     else l = this.products.length || 1;
  //     return Math.ceil(this.count / this.pageSize) || 0;
  //   }
  // },
  methods: {
    async getData() {
      // if (process.server) return; // This will stop trigger the call twice.  But triggers the client and server render mismatch error. Does not work at production
      if (this.meta.busy || this.meta.end) return
      let q = this.$route.query || {}
      q.categories = this.$route.path.substr(1)
      try {
        this.meta.busy = true
        this.loading = true
        if (!q.sort) q.sort = null //"-createdAt"; // Sort order for category page is `Whats New`
        q.page = this.page
        // if (search === "") search = null;
        let result = (
          await this.$apollo.$query({
            query: PRODUCTS,
            variables: {
              params: q,
            },
          })
        ).data.products

        this.loading = false
        this.meta.busy = false
        let data = result.data
        this.count = result.count
        this.loadmoreSpin = false
        if (data) {
          this.mergeToWishlist(data, this.wishlist)
          this.noOfPages = Math.ceil(result.count / result.pageSize)
          this.meta.filtered =
            parseInt(data.length) +
            (parseInt(this.page || 1) - 1) * result.pageSize
          this.products = data
          // this.products = this.$route.query.page
          //   ? this.products.concat(data)
          //   : data;
          if (data.length >= result.pageSize) {
            this.meta.end = false
          } else {
            // When 8 records requested but received < 8 means we reached end of query
            this.meta.end = true
          }
          this.currentPage = parseInt(this.page)
          //if(!process.server){
          /*  console.log('custom scroll here'+localStorage['scrolled']);

            if(localStorage['pageScroll']){
              if(localStorage['scrolled']==1){
                let currentScroll=localStorage['pageScroll'];
              console.log('custom scroll'+currentScroll);
              window.scroll({
                  behavior: 'smooth',
                  left: 0,
                  top: (parseInt(currentScroll))
                });
                //localStorage.removeItem('pageScroll');
                //localStorage['scrolled']=0;
              }
            }else{
                console.log('custom scroll 1');

                this.scrollTo();
                localStorage['scrolled']=0;
            }*/
          //  }
        }
        this.scrollTo()
        this.loading = false
      } catch (e) {
        this.loading = false
      } finally {
        this.loading = false
      }
      // this.getApplicableFeatures(q)
      this.saveLastVisit()
    },
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host
    return {
      title:
        (this.category && this.category.metaTitle) ||
        (this.category && 'Category: ' + this.category.name) ||
        'Category: ' + this.$route.path.substr(1),
      meta: [
        {
          hid: 'og:description',
          name: 'Description',
          property: 'og:description',
          content:
            (this.category && this.category.metaDescription) || DESCRIPTION,
        },
        {
          hid: 'keywords',
          name: 'Keywords',
          property: 'keywords',
          content: (this.category && this.category.metaKeywords) || KEYWORDS,
        },
        {
          hid: 'og:title',
          name: 'og_title',
          property: 'og:title',
          content:
            (this.category && this.category.metaTitle) ||
            (this.category && 'Category: ' + this.category.name) ||
            'Category: ' + this.$route.path.substr(1),
        },
        // Google+ / Schema.org
        {
          name: 'og_url',
          property: 'og:url',
          content: host + '/' + this.$route.path.substr(1) || '',
        },
        {
          property: 'og:image',
          content:
            host +
            ((this.category &&
              this.category.imgA &&
              this.category.imgA.original) ||
              sharingLogo),
        },
        {
          property: 'og:image:width',
          content: '600',
        },
        {
          property: 'og:image:height',
          content: '600',
        },
        // Twitter
        {
          name: 'twitter:title',
          content:
            (this.category && this.category.metaTitle) ||
            (this.category && 'Category: ' + this.category.name) ||
            'Category: ' + this.$route.path.substr(1),
        },
        {
          name: 'twitter:description',
          content:
            (this.category && this.category.metaDescription) || DESCRIPTION,
        },
      ],
    }
  },
}
</script>

<style scoped></style>
