<template>
  <button
    v-bind="$attrs"
    :size="size"
    class="w-full p-3 text-lg font-bold rounded m-3 my-4 text-white duration-200 hover:-translate-y-0.5 transition transform ease-in-out focus:ring-opacity-50 hover:opacity-8 focus:ring focus:ring-offset-2 hover:opacity-80 focus:ring-yellow-600 focus:outline-none"
    :class="{
      'bg-primary-500 ': color == 'primary',
      'bg-secondary-500': color == 'secondary',
    }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String },
    size: { type: String, default: 'text' },
    color: { type: String, default: 'none' },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    },
  },
}
</script>
