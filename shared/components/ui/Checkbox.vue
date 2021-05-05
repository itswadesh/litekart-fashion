<template>
  <label
    class="flex items-center cursor-pointer hover:bg-none"
    :for="id || uniqueId"
  >
    <input
      type="checkbox"
      :id="id || uniqueId"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :color="color"
      :checked="checkboxState"
      @click="toggle"
      class="w-4 h-4 border-gray-400 rounded-sm focus:outline-0 focus:ring-0 focus:ring-offset-0"
      :class="{ 'text-primary-500': color == 'primary' }"
    />
    <!-- class="bg-gray-100 border-none rounded-sm text-primary-500 ring-gray-400 ring-1 focus:ring-1 focus:ring-gray-400 focus:ring-offset-0" -->

    <div
      v-if="docColor"
      data-colorhex="black"
      class="w-4 h-4 rounded-full shadow ms-1"
      :style="{ 'background-color': docColor }"
    ></div>
    <div class="text-sm text-gray-800 ms-1">
      <slot />
    </div>
    <div class="text-xs text-gray-500" v-if="count">({{ count }})</div>
    <div class=""></div>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'model',
    event: 'change',
  },
  props: {
    id: {
      type: String,
      required: false,
    },
    model: {
      type: String | Array,
      default: undefined,
    },
    docColor: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    circle: {
      type: Boolean,
      default: false,
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
    },
    value: {
      type: [String, Boolean],
      required: false,
      default: '',
    },
    count: {
      type: [String, Number],
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: Number,
      required: false,
    },
    fontSize: {
      type: Number,
      required: false,
    },
  },
  data: () => ({
    uniqueId: '',
  }),
  computed: {
    checkboxState() {
      // if (this.model === undefined) return this.value;
      if (Array.isArray(this.model))
        return this.model.indexOf(this.value) !== -1
      return this.model && this.value
    },
  },
  methods: {
    toggle() {
      if (this.disabled) return
      let value = this.model || this.value
      if (Array.isArray(value)) {
        const i = value.indexOf(this.value)
        if (i === -1) value.push(this.value)
        else value.splice(i, 1)
      } else {
        value = []
        value.push(this.value)
      }
      this.$emit('change', value)
    },

    genId() {
      if (this.id === undefined || typeof String) {
        this.uniqueId = `m-checkbox--${Math.random()
          .toString(36)
          .substring(2, 10)}`
      } else {
        this.uniqueId = this.id
      }
    },
  },
  watch: {
    checked(v) {
      if (v !== this.checkboxState) this.toggle()
    },
  },
  mounted() {
    this.genId()
    if (this.checked && !this.checkboxState) {
      this.toggle()
    }
  },
}
</script>
