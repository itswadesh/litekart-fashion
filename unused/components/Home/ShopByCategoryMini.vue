<template>
  <div class="shop_by_category_mini_container">
    <div class="qa_common_card">
      <div style="padding: 16px">
        <div class="qa_common_card_inner">
          <div class="qa_common_card_single" v-for="c in categories">
            <div style="margin-bottom: 8px">
              <a
                class="qa_common_link"
                @click="go('/' + c.slug + '?page=1&' + c.custom_filter)"
              >
                <div class="qa_common_img_box">
                  <div class="qa_common_img_box_inner">
                    <img class="img_size" v-lazy="c.imgA" :alt="c.name" />
                  </div>
                </div>
                <div class="qa_common_text_box">
                  <span class="qa_common_text">
                    <font style="vertical-align: inherit">
                      <font style="vertical-align: inherit">{{ c.name }}</font>
                    </font>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // ['categories'],
  props: {
    categories: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  methods: {
    go(url) {
      this.$router.push(url || '/')
    },
  },
}
</script>
<style scoped>
.qa_common_card {
  width: 100%;
  margin-bottom: 8px;
  background-color: white;
}

.qa_common_img_box {
  width: 64px;
  margin: 0px auto 8px;
}

.qa_common_img_box_inner {
  border-radius: 32px;
  width: 64px;
  height: 64px;
  background-color: #f5f5f5;
  overflow: hidden;
}
.img_size {
  height: 64px;
  width: 100%;
  object-fit: cover;
  vertical-align: top;
}
.qa_common_card_inner {
  margin-left: -2px;
  margin-right: -2px;
  box-sizing: border-box;
}
.qa_common_card_single {
  padding-left: 2px;
  padding-right: 2px;
  width: 25%;
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
.qa_common_text_box {
  height: 40px;
  padding: 4px 0px;
  box-sizing: border-box;
}
.qa_common_text {
  margin: 0px;
  vertical-align: middle;
  display: block;
  color: #525252;
  font-size: 10px;
  line-height: 16px;
  font-weight: normal;
  text-align: center;
  white-space: normal;
}
@media only screen and (min-width: 768px) {
  /* For desktop: */
  .qa_common_img_box {
    width: 128px !important;
  }
  .qa_common_img_box_inner {
    border-radius: 32px;
    width: 128px;
    height: 128px;
    background-color: #f5f5f5;
    overflow: hidden;
  }
  .img_size {
    height: 128px;
    width: 100%;
    object-fit: cover;
    vertical-align: top;
  }
  .qa_common_card_single {
    padding-left: 2px;
    padding-right: 13px;
    width: 14%;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
  }
}
</style>
