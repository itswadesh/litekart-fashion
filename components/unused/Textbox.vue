<template>
  <div class="group">
    <center>
      <div class="floating-form">
        <div class="floating-label">
          <input
            class="w-full bg-gray-100 border-b rounded floating-input hover:bg-gray-300 focus:outline-none focus:ring-primary-500"
            placeholder=" "
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
            :type="type"
            :aria-label="label"
            :ref="ref"
          />
          <span class="highlight"></span>
          <label>{{ label }}</label>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  props: {
    label: { type: String },
    type: { type: String, default: 'text' },
    value: { type: String },
    ref: { type: String },
  },
}
</script>

<style scoped>
/* .group {
  position: relative;
  margin-bottom: 1.5rem;
}
label {
  pointer-events: none;
  position: absolute;
  left: 10px;
  top: 12px;
  color: rgba(0, 0, 0, 0.36);
  transition: all 0.2s ease;
}
input:focus {
  box-shadow: none;
  background-color: #eff1f4;
  border: none;
  border-bottom: 2px solid #ed54a4;
}
input {
  top: 20px;
  height: 48px;
  line-height: 20px;
  padding: 14px 12px 0;
}
input:focus + label,
input:valid + label {
  font-size: 75%;
  transform: translate3d(0, -10%, 0);
  opacity: 1;
  top: 5px;
} */

/****  floating-Lable style start ****/
.floating-label {
  position: relative;
  margin-bottom: 20px;
}
.floating-input {
  font-size: 14px;
  padding: 4px 4px;
  display: block;
  width: 100%;
  height: 48px;
  padding: 14px 12px 0;
  /* background-color: lightgray; */
  border: none;
}

.floating-input:focus {
  outline: none;
  border-bottom: 2px solid #da1c5f;
}

label {
  color: #999;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 8px;
  top: 13px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.floating-input:focus ~ label,
.floating-input:not(:placeholder-shown) ~ label {
  top: -1px;
  font-size: 14px;
  color: #fb6340;
}

.floating-select:focus ~ label,
.floating-select:not([value='']):valid ~ label {
  top: -18px;
  font-size: 14px;
  color: #fb6340;
}
</style>
