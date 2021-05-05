<template>
  <div class="container pb-16 mx-auto mt-20">
    <!-- <InternshalaModal /> -->
    <button class="material-button">Button</button>
    <button class="material-button-text">Text Button</button>
    <label class="material-checkbox">
      <input type="checkbox" />
      <span>Checkbox</span>
    </label>
    <!-- Radio -->
    <label class="material-radio">
      <input type="radio" name="group" />
      <span>Radio Option 1</span>
    </label>
    <br />
    <br />
    <label class="material-radio">
      <input type="radio" name="group" />
      <span>Radio Option 2</span>
    </label>

    <progress class="material-progress-circular" />
    <progress id="file" value="32" max="100">32%</progress>
    <label class="material-textbox-outlined">
      <input placeholder=" " />
      <span>Textfield</span>
    </label>
  </div>
</template>

<script>
import Nav from '~/components/Home/Nav'
export default {
  layout: 'none',
  components: { Nav },
}
</script>
