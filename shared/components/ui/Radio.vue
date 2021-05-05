<template>
  <div>
    <!-- class="w-4 h-4 my-auto bg-gray-100 text-primary-500 focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0" -->
    <input
      type="radio"
      :checked="checked"
      :value="value"
      @change="updateInput"
      class="w-4 h-4 cursor-pointer focus:ring-0 text-primary-500 focus:ring-offset-0"
    />
    <slot class="align-middle" />
    <div class="align-middle" :class="color" />
  </div>
</template>
<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {
      type: [String, Object, Number],
    },
    modelValue: {
      default: '',
    },
    color: {
      default: 'primary',
    },
  },
  computed: {
    checked() {
      return this.modelValue == this.value
    },
  },
  methods: {
    updateInput() {
      this.$emit('change', this.value)
    },
  },
}
</script>
