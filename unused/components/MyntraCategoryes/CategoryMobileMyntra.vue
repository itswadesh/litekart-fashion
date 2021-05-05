<template>
  <div class="pb-12">
    <div>
      <span
        v-for="(c, ix) in cate"
        :key="ix"
        @click="c.isOpen = !c.isOpen"
        class="relative flex flex-row w-full bg-pink-200 border-b-2 border-white"
      >
        {{ c.isOpen }}
        <h1 class="w-1/2 p-4 my-auto">
          <h3 class="flex flex-row justify-between">
            <span class="text-2xl font-bold">{{ c.name }}</span>
            <chevron-down-icon
              size="1.1x"
              class="my-auto text-gray-500 custom-class"
            ></chevron-down-icon>
          </h3>
          <span class="text-xs">{{ c.text }}</span>
        </h1>
        <img v-lazy="c.img" alt="image" class="object-cover w-1/2 h-32" />
        <Women v-if="c.isOpen" />
      </span>
    </div>
  </div>
</template>

<script>
import Women from './Women/Women'
export default {
  data() {
    return {
      isWomen: false,
      // isOpen: false,
      cate: [
        {
          name: 'Women',
          text: 'Kurta & Suit, Top & Tees...',
          img: '/img/womencat.jpeg',
        },
        {
          name: 'Men',
          text: 'T-Shirts, Shirts, Jeans, Shoe...',
          img: '/img/mencat.jpeg',
        },
        {
          name: 'Kids',
          text: 'Brand, Clothing, Footwear...',
          img: '/img/kidscat.jpeg',
        },
        {
          name: 'Myntra Mall',
          text: 'H&M, Nike, Smashbox, MAx...',
          img: '/img/mallcat.jpeg',
        },
        {
          name: 'Beauty & PersonalCare',
          text: 'Makeup, Fragrence, Grov...',
          img: '/img/beautycat.jpeg',
        },
        {
          name: 'Home & Living',
          text: 'Bedsheet, Blanket, Towel..',
          img: '/img/homecat.jpeg',
        },
        {
          name: 'Gadgets',
          text: 'Head phones, Smart watch...',
          img: '/img/gadgetcat.jpeg',
        },
        {
          name: 'Pluse Size',
          ext: 'Tops, T-Shirts, Kurtas...',
          img: '/img/themecat.jpeg',
        },
        {
          name: 'Theme Stores',
          text: 'Wedding, Party, Sports...',
          img: '/img/faisoncat.jpeg',
        },
      ],
    }
  },
  components: {
    Women,
  },
}
</script>
