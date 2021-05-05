<template>
  <div>
    <div
      class="px-10 py-10 bg-pink-600 md:bg-gradient-to-r from-pink-700 via-pink-400 to-yellow-100"
    >
      <div class="container flex flex-row justify-between mx-auto">
        <div class="flex flex-col text-sm text-white">
          <span class="pb-6 text-lg font-medium">QUESTION</span>
          <span class="pb-2 cursor-pointer">Track Order</span>
          <span class="pb-2 cursor-pointer">Return</span>
          <span class="pb-2 cursor-pointer">Pay on Delivery</span>
          <span class="pb-2 cursor-pointer">Help</span>
        </div>
        <div class="flex flex-col text-sm text-white">
          <span class="flex-shrink-0 pb-6 text-lg font-medium lg:pt-0">
            INSIDESTORE
          </span>
          <span class="flex flex-shrink-0 pb-2 cursor-pointer">
            All Men's Fashion
          </span>
          <span class="flex flex-shrink-0 pb-2 cursor-pointer">
            All Women's Fashion
          </span>
          <span class="flex flex-shrink-0 pb-2 cursor-pointer">
            Gift cards and Vouchers
          </span>
          <span class="pb-2 cursor-pointer">Home Ready</span>
        </div>
        <div class="flex flex-col text-sm text-white">
          <span class="pb-6 text-lg font-medium">BUSINESS</span>
          <span class="pb-2 cursor-pointer">Sell on Store</span>
          <span class="pb-2 cursor-pointer">Affiliation Program</span>
          <span class="pb-2 cursor-pointer">Advertise on store</span>
          <span class="pb-2 cursor-pointer">Marketing</span>
        </div>
        <div class="flex flex-col text-sm text-white">
          <span class="pb-6 text-lg font-medium lg:pt-0">POLICY INFO</span>
          <span class="pb-2 cursor-pointer">Privacy Policy</span>
          <span class="pb-2 cursor-pointer">Terms and Conditions</span>
          <span class="pb-2 cursor-pointer">Disclamer</span>
          <span class="pb-2 cursor-pointer">Security Policy and more</span>
        </div>
        <div class="flex flex-col mx-3 my-auto">
          <img
            v-lazy="settings.logoMobile"
            alt="logo"
            class="object-contain mx-auto w-28 h-28"
          />
          <span class="pb-4 mx-auto text-sm text-center">Follow us:</span>
          <h1 class="flex flex-row justify-around w-2/3 mx-auto">
            <span class="cursor-pointer hover:shadow-lg">
              <facebook-icon
                size="1.2x"
                class="text-gray-700 custom-class"
              ></facebook-icon>
            </span>
            <span class="cursor-pointer hover:shadow-lg">
              <linkedin-icon
                size="1.2x"
                class="text-gray-700 custom-class"
              ></linkedin-icon>
            </span>
            <span class="cursor-pointer hover:shadow-lg">
              <twitter-icon
                size="1.2x"
                class="text-gray-700 custom-class"
              ></twitter-icon>
            </span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    settings() {
      return this.$store.state.settings || {}
    },
  },
}
</script>
