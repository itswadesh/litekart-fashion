<template>
  <div class="relative w-full group">
    <div
      class="absolute top-0 right-0 z-10 w-full -mt-8 text-xs text-red-500 text-grey-darker"
      v-if="err"
    >
      {{ err }}
    </div>
    <div class="floating-form">
      <div class="relative floating-input">
        <input
          class="w-full h-12 p-3 pt-6 pl-2 text-base font-light tracking-wider bg-white border-none rounded shadow ring-1 focus:ring-2 floating-input focus:outline-none"
          :class="
            err
              ? 'focus:ring-red-200 ring-red-500'
              : 'focus:ring-primary-200 ring-primary-500'
          "
          placeholder=" "
          v-bind="$attrs"
          :value="value"
          @input="
            $emit('input', $event.target.value)
            v.$touch()
          "
          :type="type"
          :aria-label="label"
        />
        <span class="highlight"></span>
        <label class="absolute text-base font-light text-gray-500">
          {{ label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    err: { type: String },
    type: { type: String, default: 'text' },
    value: { type: [Number, String] },
    cls: { type: String },
    placeholder: { type: String },
    validate: { type: String },
    v: {
      type: Object,
      required: true,
    },
    err: {
      type: String,
      required: false,
    },
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
