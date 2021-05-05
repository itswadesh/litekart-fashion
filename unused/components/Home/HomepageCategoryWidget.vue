<template>
  <div class="homepage_category_widget_container">
    <div
      class="category_headings flex-display only-mobile"
      :class="{ 'is-fixed-top': showFixed }"
    >
      <div
        id="scrolling_wrapper"
        style="
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
          position: relative;
          margin-bottom: 10px;
          width: 100%;
          z-index: 10;
        "
      >
        <div
          style="
            width: 100%;
            position: relative;
            background-color: rgb(255, 255, 255);
            box-sizing: border-box;
          "
        >
          <div
            style="
              position: absolute;
              bottom: 0px;
              left: 0px;
              right: 0px;
              height: 1px;
              background-color: rgb(225, 225, 225);
            "
          ></div>
          <div class="hc_link_div">
            <nuxt-link class="hc_link" to="/trending">
              <span class="hc_link_span"> TRENDING </span>
            </nuxt-link>
            <span v-if="this.landing_page == 'true'">
              <span
                v-for="c in widgetCategories.full_categories"
                class="hc_link"
                @click="go('/' + c.slug)"
              >
                <span class="hc_link_span">
                  {{ c.name.toUpperCase() }}
                </span>
              </span>
            </span>
            <span v-else-if="landing_page == 'false'">
              <span
                v-for="c in widgetCategories.categories"
                class="hc_link"
                @click="go('/' + c.slug)"
              >
                <span class="hc_link_span">
                  {{ c.name.toUpperCase() }}
                </span>
                <!-- <div style="position: absolute; bottom: 0px; left: 16px; right: 16px; height: 2px; background-color: rgb(172, 20, 90);"></div>-->
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="favorite_categories">
      <ShopByCategoryWidget
        :categories="featuredCategories"
      ></ShopByCategoryWidget>
    </div>
    <div class="category_tabs">
      <div
        class="category_tab"
        v-for="c in widgetCategories.categories"
        :id="c.name"
      >
        <div
          data-qa-id="qa_common_card"
          style="width: 100%; margin-bottom: 8px; background-color: white"
        >
          <div
            v-bind:class="{
              men_header: c.name === 'Men',
              women_header: c.name === 'Women',
              men_header: true,
            }"
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
                type="div"
                style="
                  margin: 0px;
                  vertical-align: middle;
                  display: block;
                  color: rgb(82, 82, 82);
                  font-size: 16px;
                  line-height: 24px;
                  font-weight: normal;
                  white-space: normal;
                "
              >
                {{ c.name }}
              </div>
            </div>
            <div
              style="
                height: 100%;
                display: table-cell;
                box-sizing: border-box;
                vertical-align: middle;
                text-align: right;
              "
            >
              <img v-lazy="c.hc_header_img_url" class="hc_header_image" />
              <!--<img v-if="c.name==='Men'" v-lazy="men_header_image" class="hc_header_image">
                              <img v-else-if="c.name==='Women'" v-lazy="women_header_image" style="width: 165px; height: 56px; display: block; float: right;">
                      -->
            </div>
          </div>
          <div
            class="hw_category_box"
            style="margin-left: 0px; margin-right: 0px; box-sizing: border-box"
          >
            <div v-for="(h, ix) in c.children">
              <div v-if="h.hc_img_url" class="hw_category_single">
                <a
                  class="qa_common_link"
                  href="#"
                  @click="go('/' + h.slug + '?page=1&' + h.custom_filter)"
                >
                  <div
                    style="
                      height: 64px;
                      border-style: solid;
                      border-color: rgb(232, 232, 232);
                      border-width: 0px 1px 1px;
                      box-sizing: border-box;
                      line-height: 64px;
                    "
                  >
                    <div
                      style="
                        padding: 11px 0px 11px 16px;
                        display: inline-block;
                        box-sizing: border-box;
                        width: calc(100% - 56px);
                        vertical-align: middle;
                      "
                    >
                      <span class="qa_common_text" type="p">
                        {{ h.name }}
                      </span>
                    </div>
                    <div
                      style="
                        width: 50px;
                        padding-right: 8px;
                        padding-left: 8px;
                        display: inline-block;
                        box-sizing: border-box;
                        vertical-align: middle;
                      "
                    >
                      <div
                        style="
                          border-radius: 16px;
                          width: 32px;
                          height: 32px;
                          background-color: rgb(245, 245, 245);
                          overflow: hidden;
                        "
                      >
                        <img
                          v-lazy="h.hc_img_url"
                          :alt="h.name"
                          data-qa-id="qa_common_avatar"
                          style="
                            height: 32px;
                            width: 100%;
                            object-fit: cover;
                            vertical-align: top;
                          "
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div v-for="h1 in h.children">
                <div v-if="h1.hc_img_url" class="hw_category_single">
                  <a
                    class="qa_common_link"
                    href="#"
                    @click="go('/' + h1.slug + '?page=1&' + h1.custom_filter)"
                  >
                    <div
                      style="
                        height: 64px;
                        border-style: solid;
                        border-color: rgb(232, 232, 232);
                        border-width: 0px 1px 1px;
                        box-sizing: border-box;
                        line-height: 64px;
                      "
                    >
                      <div
                        style="
                          padding: 11px 0px 11px 16px;
                          display: inline-block;
                          box-sizing: border-box;
                          width: calc(100% - 56px);
                          vertical-align: middle;
                        "
                      >
                        <span class="qa_common_text" type="p">
                          {{ h1.name }}
                        </span>
                      </div>
                      <div
                        style="
                          width: 50px;
                          padding-right: 8px;
                          padding-left: 8px;
                          display: inline-block;
                          box-sizing: border-box;
                          vertical-align: middle;
                        "
                      >
                        <div
                          style="
                            border-radius: 16px;
                            width: 32px;
                            height: 32px;
                            background-color: rgb(245, 245, 245);
                            overflow: hidden;
                          "
                        >
                          <img
                            v-lazy="h1.hc_img_url"
                            :alt="h1.name"
                            data-qa-id="qa_common_avatar"
                            style="
                              height: 32px;
                              width: 100%;
                              object-fit: cover;
                              vertical-align: top;
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CATEGORIES from '~/gql/category/categories.gql'
// import ShopByCategoryWidget from './ShopByCategoryWidget'
export default {
  // components: { ShopByCategoryWidget },
  props: ['categories', 'landing_page'],
  data() {
    return {
      widgetCategories: [],
      featuredCategories: [],
      showFixed: false,
    }
  },
  async mounted() {
    let widget_categories = null
    if (this.landing_page === 'true') {
      var slug = this.$route.path.substr(1)
      widget_categories = (
        await this.$apollo.query({
          query: CATEGORIES,
          variables: { slug },
        })
      ).data.categories
      this.featuredCategories = widget_categories
    } else {
      widget_categories = (
        await this.$apollo.query({
          query: CATEGORIES,
          variables: { featured: true },
        })
      ).data.categories
      this.featuredCategories = widget_categories.data
    }
    this.widgetCategories = widget_categories.data
    window.addEventListener('scroll', this.handleScrollEvent)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScrollEvent)
  },
  methods: {
    scrollToDiv(element_id) {
      var element = document.getElementById(element_id)
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - 100,
      })
    },
    go(url) {
      this.$router.push(url || '/')
    },
    handleScrollEvent(e) {
      var testDiv = document.getElementById('scrolling_wrapper')

      if (window.scrollY > 80) {
        this.showFixed = true
      }

      if (window.scrollY < 10) {
        this.showFixed = false
      }
    },
  },
}
</script>
<style scoped>
.flex-display {
  display: flex !important;
}
.homepage_category_widget_container {
  display: flow-root;
  width: 96%;
  margin: auto auto 10px auto;
}
.category_tab {
  display: flex;
}
.men_header {
  background-color: rgb(185, 229, 233) !important;
}
.women_header {
  background-color: rgb(247, 220, 229) !important;
}
.hc_link {
  border: unset;
  background: unset;
  display: inline-block;
  position: relative;
  padding: 16px 13px 14px;
  cursor: pointer;
  vertical-align: top;
  outline: none;
}
.hc_link:hover {
  text-decoration: underline;
  color: gray !important;
}
.hc_link_span {
  margin: 0px;
  vertical-align: middle;
  display: block;
  color: rgb(128, 128, 128);
  font-size: 12px;
  line-height: 18px;
  white-space: normal;
}
.hc_link_div {
  height: 48px;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
  overflow: auto hidden;
  box-sizing: border-box;
  white-space: nowrap;
}
.hw_category_single {
  float: left;
  padding-left: 0px;
  padding-right: 0px;
  width: 50%;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
}
.qa_common_link {
  background-color: transparent;
  width: 100%;
  padding: 0px;
  border-width: 0px;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  vertical-align: top;
}
.qa_common_text {
  margin: 0px;
  vertical-align: middle;
  display: block;
  color: rgb(82, 82, 82);
  font-size: 14px;
  line-height: 21px;
  white-space: normal;
}
.hc_header_image {
  width: 165px;
  height: 56px;
  display: block;
  float: right;
}
.is-fixed-top {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
}
</style>
