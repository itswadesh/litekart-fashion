<template>
  <nav class="flex flex-col pt-6 font-bold lg:py-10">
    <div class="flex items-center justify-between w-full">
      <div class="w-1/2 my-auto md:w-1/4">
        <h1 class="ml-4 -mt-6 text-xl cursor-pointer">
          <span class="text-5xl item-center" style="color: orange">F</span
          >ashion Store
        </h1>
      </div>
      <div class="items-center hidden w-1/2 lg:flex">
        <div class="flex flex-row justify-between w-full">
          <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
            >New</span
          >
          <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
            >Catalogue</span
          >
          <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
            >Payment</span
          >
          <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
            >Shipping</span
          >
          <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
            >Blog</span
          >
          <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
            >Wishlist</span
          >
          <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
            >Contact</span
          >
        </div>
      </div>
      <div class="w-1/2 md:w-1/4">
        <div class="flex items-center justify-end mr-4">
          <span class="cursor-pointer" href="#"
            ><img src="/img/user.svg" alt=""
          /></span>
          <span class="mx-12 cursor-pointer" href="#"
            ><img src="/img/search.svg" alt=""
          /></span>
          <span class="cursor-pointer" href="#"
            ><img src="/img/shopping-bag.svg" alt=""
          /></span>
        </div>
      </div>
    </div>
    <div class="flex items-center w-full px-3 pb-2 mt-2 sm:px-10 lg:hidden">
      <div class="flex flex-row justify-between w-full p-2 bg-gray-100">
        <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
          >New</span
        >
        <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
          >Catalogue</span
        >
        <span class="text-sm cursor-pointer hover:text-yellow-600" href="#"
          >Payment</span
        >
        <span
          class="text-sm cursor-pointer sm:hidden hover:text-yellow-600"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
        </span>
        <span
          class="hidden text-sm cursor-pointer sm:flex hover:text-yellow-600"
          href="#"
          >Shipping</span
        >
        <span
          class="hidden text-sm cursor-pointer sm:flex hover:text-yellow-600"
          href="#"
          >Blog</span
        >
        <span
          class="hidden text-sm cursor-pointer sm:flex hover:text-yellow-600"
          href="#"
          >Wishlist</span
        >
        <span
          class="hidden text-sm cursor-pointer sm:flex hover:text-yellow-600"
          href="#"
          >Contact</span
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      serach: false,
    }
  },
}
</script>

<style></style>
