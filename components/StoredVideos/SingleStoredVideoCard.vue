<template>
  <section>
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
      <div
        v-for="(i, ix) in items"
        :key="ix"
        class="bg-white rounded-md p-2 md:p-4 hover:shadow shadow-md w-full"
      >
        <img :src="i.img" alt="" class="h-60 w-full object-cover object-top" />
        <div class="p-4">
          <h4 class="font-medium">{{ i.title }}</h4>
          <h6 class="mt-2 text-sm text-gray-600">{{ i.description }}</h6>
        </div>
      </div>
    </div>
    <div class="my-10 justify-center flex">
      <button class="font-medium hover:text-primary-500">Load More</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          img: '/img/mencat.jpeg',
          title: `Lorem Ipsom Dolar`,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
        },
        {
          img: '/img/womencat.jpeg',
          title: `Lorem Ipsom Dolar`,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
        },
        {
          img: '/img/themecat.jpeg',
          title: `Lorem Ipsom Dolar`,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
        },
        {
          img: '/img/mencat.jpeg',
          title: `Lorem Ipsom Dolar`,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
        },
        {
          img: '/img/womencat.jpeg',
          title: `Lorem Ipsom Dolar`,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
        },
        {
          img: '/img/themecat.jpeg',
          title: `Lorem Ipsom Dolar`,
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. `,
        },
      ],
    }
  },
}
</script>

<style></style>
