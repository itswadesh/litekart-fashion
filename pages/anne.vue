<template>
  <div>
    <div class="relative flex justify-center w-full overflow-hidden rlative">
      <video
        class="object-cover w-full h-96"
        :src="'https://res.cloudinary.com/itswadesh/video/upload/v1620190766/Anne/video.mp4'"
        autoplay
        loop
        muted
      />
      <!-- <div>
        <iframe
          src="https://player.vimeo.com/video/545331344?title=0&byline=0&portrait=0&speed=0&badge=0&loop=1&autoplay=1&muted=1&player_id=0&app_id=58479/embed"
          width="100%"
          frameborder="0"
          class="object-cover w-full h-64"
        />
      </div> -->
      <button
        class="absolute top-0 py-3 mt-40 text-center text-white px-9 bg-primary-500 hover:bg-gray-200 hover:text-primary-500"
      >
        Enter Site
      </button>
    </div>
    <div class="absolute flex flex-wrap justify-center w-full -mt-20">
      <FreeProduct v-for="(i, ix) in items" :key="ix" :product="i" />
    </div>
  </div>
</template>

<script>
import FreeProduct from '~/components/Anne/FreeProduct'
export default {
  components: {
    FreeProduct,
  },
  data() {
    return {
      items: [
        {
          name: 'xxx',
          description: 'description',
        },
        {
          name: 'xxx11',
          description: 'description11',
        },
        {
          name: 'xx222x',
          description: 'description222',
        },
      ],
    }
  },
  methods: {},
  layout: 'none',
}
</script>

<style></style>
