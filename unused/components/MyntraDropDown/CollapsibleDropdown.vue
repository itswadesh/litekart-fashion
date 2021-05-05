<template>
  <div>
    <ul class="my-2 ms-4" v-for="(d, i) in details" :key="i">
      <li class="flex">
        <div
          @click="hideSidebar(d.slug)"
          class="w-4/5 font-normal cursor-pointer"
        >
          {{ d.name }}
        </div>
        <div
          class="flex justify-end w-1/5 me-2"
          v-if="d.children.length != 0"
          @click="showChildren(i)"
        >
          <chevron-right-icon
            size="1x"
            v-if="selectedIndex != i"
            class="text-gray-500 cursor-pointer custom-class"
          ></chevron-right-icon>
          <chevron-down-icon
            size="1x"
            v-else
            class="text-gray-500 cursor-pointer custom-class"
          ></chevron-down-icon>
        </div>
      </li>
      <li>
        <CollapsibleDropdown :details="d.children" v-if="selectedIndex == i" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleDropdown',
  components: {},
  data() {
    return {
      selectedIndex: null,
    }
  },
  methods: {
    hideSidebar(val) {
      this.$router.push(`/c/${val}`)
      $nuxt.$emit('hide')
    },
    showChildren(i) {
      // console.log('Naamn')
      if (this.selectedIndex == i) {
        this.selectedIndex = null
        // this.collapseData = null
      } else {
        this.selectedIndex = i
        // this.collapseData = collapseData
      }
    },
  },
  props: {
    details: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style scoped></style>
