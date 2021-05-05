<template>
  <ul v-if="show">
    <li
      v-for="(d, index) in details"
      class="relative pl-2 font-medium text-purple-600 cursor-pointer"
      :key="index"
    >
      <div
        v-ripple="'rgba(255, 0, 255, 0.3)'"
        class="relative flex w-full py-2 font-medium"
      >
        <div class="w-3/4" @click="showCategory">
          {{ d.name }}
        </div>
        <div
          class="flex justify-end w-1/4 text-right"
          @click="showData(index)"
          v-if="d.children.length != 0"
        >
          <chevron-right-icon
            v-if="showDataIndex != index"
            size="1x"
            class="inline text-gray-500 me-2 custom-class"
          ></chevron-right-icon>
          <chevron-down-icon
            v-else
            size="1x"
            class="inline text-gray-500 me-2 custom-class"
          ></chevron-down-icon>
        </div>
      </div>

      <div class="pl-6" v-if="d.children.length != 0">
        <ShowSubMenu :details="d.children" :show="showDataIndex === index" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ShowSubMenu',
  components: {},
  data() {
    return {
      showDataIndex: null,
    }
  },
  methods: {
    showCategory() {
      $nuxt.$emit('removeSidebar')
      // this.$emit('removeSidebar')
      // this.$router.push('/category')
    },
    showData(i) {
      // console.log(this.showDataIndex === 0)
      if (this.showDataIndex != null) {
        this.showDataIndex = null
      } else {
        this.showDataIndex = i
      }
      // console.log(this.showDataIndex)
    },
  },
  mounted() {
    // console.log(this.show)
  },
  props: {
    details: {
      type: Array,
      default: [],
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style></style>
