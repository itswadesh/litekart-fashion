<template>
  <!--category mini widget-->
  <div class="category_slider" v-if="categories.length > 0" id="favorite">
    <div class="shop_by_category_slider">
      <div class="container">
        <div
          style="
            padding-left: 16px;
            height: 56px;
            overflow: hidden;
            width: 100%;
            box-sizing: border-box;
            display: table;
            position: relative;
          "
        >
          <div
            style="
              position: absolute;
              bottom: 0px;
              left: 0px;
              right: 0px;
              height: 1px;
              background-color: rgb(232, 232, 232);
            "
          ></div>
          <div style="display: table-cell; vertical-align: middle">
            <div
              data-qa-id="qa_common_text"
              style="
                color: rgb(82, 82, 82);
                margin: 0px;
                vertical-align: middle;
                display: block;
                font-size: 16px;
                line-height: 24px;
                font-weight: bold;
                white-space: normal;
              "
            >
              Favorite Category
            </div>
          </div>
        </div>
        <div class="shop_widget_container">
          <shop-by-category-mini
            :categories="categories"
          ></shop-by-category-mini>
        </div>
      </div>
    </div>
  </div>
  <!--end of mini widget-->
</template>
<script>
// const ShopByCategoryMini = () => import('~/components/Home/ShopByCategoryMini')
export default {
  components: {
    // ShopByCategoryMini,
  },
  props: {
    categories: { type: Object },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    go(url) {
      this.$router.push(url || '/')
    },
  },
}
</script>
<style scoped></style>
