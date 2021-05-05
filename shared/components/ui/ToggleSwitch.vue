<template>
  <!-- Toggle Button -->
  <label :for="uniqueId" class="flex items-center mt-1 cursor-pointer">
    <!-- toggle -->
    <div class="relative">
      <input
        :id="uniqueId"
        v-bind="$attrs"
        @input="onInput"
        :checked="value"
        type="checkbox"
        :name="name || uniqueId"
        :disabled="disabled"
        :required="required"
        class="hidden"
      />
      <!-- line -->
      <div
        class="bg-gray-400 rounded-full shadow-inner toggle__line"
        :class="{
          'h-4 w-7': size == 'xs',
          'h-8 w-14': size == 'md',
        }"
      ></div>
      <!-- dot -->
      <div
        class="absolute inset-y-0 left-0 bg-white rounded-full shadow toggle__dot"
        :class="{
          'h-3 w-3': size == 'xs',
          'h-7 w-7': size == 'md',
        }"
      ></div>
    </div>
    <slot />
    <!-- <div
      class="slider round"
      :class="value == true ? `slider-${color}` : ''"
    ></div> -->
  </label>
</template>

<script>
export default {
  props: {
    id: {
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
    value: {
      type: [String, Boolean],
      required: false,
      default: false,
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
    small: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      default: 'md',
      required: false,
    },
    fontSize: {
      type: Number,
      required: false,
    },
  },
  data: () => ({
    checked: false,
    uniqueId: '',
  }),
  methods: {
    onInput(event) {
      this.$emit('input', event.target.checked)
    },
    genId() {
      if (this.id === undefined || typeof String) {
        this.uniqueId = `toggle--${Math.random().toString(36).substring(2, 10)}`
      } else {
        this.uniqueId = this.id
      }
    },
  },
  mounted() {
    this.genId()
  },
}
</script>

<style scoped>
.toggle__dot {
  top: 0.13em;
  left: 0.13em;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .toggle__dot {
  transform: translateX(85%);
}
input:checked ~ .toggle__line {
  @apply bg-accent-500;
}

/* .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider-green {
  background-color: green;
}

input:checked + .slider-blue {
  background-color: blue;
}

input:checked + .slider-red {
  background-color: red;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} */
</style>
