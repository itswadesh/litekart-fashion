<template>
  <div class="w-full">
    <!-- $event.target.composing = false -->
    <label class="absolute text-base font-light text-gray-500">
      {{ label }}
    </label>
    <input
      class="w-full h-10 text-base font-light text-gray-500 border-0 rounded disabled:bg-gray-200 disabled:opacity-50 ps-4 ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-1 focus:ring-primary-500"
      :class="[
        right ? 'text-right' : 'text-left',
        err ? 'border-2 border-red-500 bg-red-100' : '',
      ]"
      v-bind="$attrs"
      :value="value"
      :placeholder="placeholder"
      @input="
        $emit('input', $event.target.value)
        v ? v.$touch() : ''
      "
      @keyup="$emit('keyup', $event.target.value)"
      :type="type"
      :aria-label="label"
    />
    <span class="highlight"></span>
    <div v-if="err" class="items-center block text-xs text-red-500">
      <span>{{ err }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorPosition: { type: String, default: 'left' },
    label: { type: String },
    type: { type: String, default: 'text' },
    value: { type: [Number, String] },
    cls: { type: String },
    placeholder: { type: String },
    validate: { type: String },
    v: { type: Object },
    err: { type: String },
    right: { type: Boolean },
    disabled: { type: Boolean },
  },
}
</script>

<style scoped>
.floating-input {
  font-size: 0.875rem;
}
.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -2px;
  color: #b26e12;
}

label {
  pointer-events: none;
  left: 8px;
  top: 11px;
  transition: 0.2s ease all;
}
</style>
