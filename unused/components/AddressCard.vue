<template>
  <div class="p-2 bg-white rounded shadow">
    <div class="flex justify-between w-full">
      <div class="flex-1 ms-2">
        <div class="font-semibold">Kintali Naveesh(Default)</div>
        <div class="py-2 text-xs">
          <div>Girls Hostel Vit university vellore,Tamil Nadu,632014</div>
          <div>Vellore Institute Of Technology</div>
          <div>Vellore 632014</div>
          <div>Tamil Nadu</div>
          <div class="py-2">
            Mobile:
            <span class="font-bold">9944817722</span>
          </div>
        </div>
      </div>
      <div>
        <div class="px-2 py-1 text-xs bg-gray-200 rounded-full">OFFICE</div>
      </div>
    </div>
    <div class="flex w-full border-t border-gray-200">
      <button
        @click="go('/checkout/address')"
        class="w-1/2 py-1 mt-1 tracking-widest text-blue-500 border-r border-gray-200"
      >
        Edit/Change
      </button>
      <button
        @click="go('/checkout/add')"
        class="w-1/2 py-1 mt-1 tracking-widest text-blue-500"
      >
        Add New Address
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  methods: {
    go(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style scoped></style>
