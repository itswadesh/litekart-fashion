<template>
  <div class="mt-1 h-44 md:mt-4 md:h-64 lg:mt-6 lg:h-80">
    <p class="flex justify-center">
      <img src="/loading.svg" v-if="loading" class="absolute z-10 justify-center block m-3" />
    </p>
    <VueSlickCarousel v-bind="settings" v-if="banners" class="relative h-44 md:h-64 lg:h-80">
      <template #prevArrow="arrowOption">
        <div
          class="invisible custom-arrow custom-arrow1 sm:visible hover:shadow-xl"
        >{{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}</div>
      </template>

      <div v-for="b in banners" :key="b.id" class="overflow-hidden focus:outline-none">
        <nuxt-link :to="b.link">
          <span class="focus:outline-none">
            <img
              v-lazy="`/slider/${b.img}`"
              class="object-cover w-full p-1 overflow-hidden h-44 md:object-cover lg:p-3 md:p-2 md:h-64 lg:h-80 rounded-2xl focus:outline-none"
            />
          </span>
        </nuxt-link>
      </div>
      <!-- v-if="loading" -->

      <template #nextArrow="arrowOption">
        <div
          class="invisible custom-arrow custom-arrow2 sm:visible hover:shadow-xl"
        >{{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }}</div>
      </template>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  data() {
    return {
      settings: {
        centerMode: true,
        centerPadding: '150px',
        centerMargin: '20px',
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
             centerPadding: '110px',
             centerMargin: '20px',
             slidesToScroll: 1,
             focusOnSelect: true,
             infinite: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
             centerPadding: '70px',
             centerMargin: '15px',
             slidesToScroll: 1,
             focusOnSelect: true,
             infinite: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
             centerPadding: '20px',
             centerMargin: '10px',
             slidesToScroll: 1,
             focusOnSelect: true,
             infinite: true,
            },
          },
        ],
      },
      banners: [{id:1,link:'/',img:'1.jpg'},{id:2,link:'/',img:'2.jpg'},{id:3,link:'/',img:'3.jpg'},{id:4,link:'/',img:'4.jpg'}],
      skeleton: false,
      loading: false,
    }
  },
  components: { VueSlickCarousel },
  async created() {
  },
  methods: {
   
  },
}
</script>
<style scoped>
.h-20 {
  /* padding-left: 10px; */
  /* height: 22rem; */
}
.custom-arrow {
  height: 80px;
  width: 46px;
  padding: 7px;
  padding-top: 23px;
  /* background: black; */
  z-index: 1;
}
.custom-arrow2[data-v-f2d6c0b2] {
  margin-right: 25px;
}
.custom-arrow1[data-v-f2d6c0b2] {
  margin-left: 25px;
}
.slick-prev {
  left: 20px;
}
.slick-next {
  right: 30px;
}

.slick-prev:before,
.slick-next:before {
  /* font-famiy: "slick"; */
  font-size: 40px;
  line-height: 1;
  opacity: 1;
  color: white;
  -webkit-font-smoothing: antialiased;
}
</style>
