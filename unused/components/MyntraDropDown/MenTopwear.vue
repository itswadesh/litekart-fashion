<template>
  <div class="pl-5 -mt-3">
    <ul v-for="(mt, ix) in mentop" :key="ix" class="flex flex-col mx-auto">
      <li
        v-ripple="'rgba(0, 200, 200, 0.3)'"
        class="flex flex-row pt-3 pb-3 pl-5 font-normal text-gray-600"
      >
        {{ mt.item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mentop: [
        { item: 'T-Shrt' },
        { item: 'Cosual Shirt' },
        { item: 'Formal Shirts' },
        { item: 'Sweatshirts' },
        { item: 'Jacket' },
        { item: 'Blazers & Coats' },
        { item: 'Suits' },
        { item: 'Rain Jacket' },
      ],
    }
  },
  components: {},
}
</script>
