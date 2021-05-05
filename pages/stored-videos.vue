<template>
  <section class="px-20 py-5">
    <div>
      <video
        class="object-cover w-full h-96"
        :src="'https://res.cloudinary.com/itswadesh/video/upload/v1620190766/Anne/video.mp4'"
        autoplay
        loop
        muted
      />
    </div>
    <div class="my-20">
      <div class="flex flex-wrap justify-start w-full my-5">
        <FreeProduct
          v-for="(i, ix) in items"
          :key="ix"
          :product="i"
          class="mr-4"
        />
      </div>
      <div class="flex flex-wrap justify-start w-full my-5">
        <FreeProduct
          v-for="(i, ix) in items"
          :key="ix"
          :product="i"
          class="mr-4"
        />
      </div>
    </div>
  </section>
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
}
</script>

<style></style>
