<template>
  <nuxt-link
    :to="localePath('/checkout/add')"
    class="flex flex-col items-center justify-center w-full h-48 p-2 text-gray-600 align-middle bg-white rounded shadow font-sm"
  >
    <button
      class="w-8 h-8 bg-gray-100 border border-dashed rounded-full focus:outline-none"
    >
      <svg
        class="m-auto transition-all ease-out align-middl transition-medium"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          class="heroicon-ui"
          d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
        />
      </svg>
    </button>
    <div>Add new address</div>
  </nuxt-link>
</template>

<script></script>

<style scoped></style>
