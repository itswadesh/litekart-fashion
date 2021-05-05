<template>
  <div class="min-h-screen">
    <div
      class="flex flex-col items-center justify-center h-full max-w-full my-auto"
    >
      <img src="/img/card.png" alt="card" class="w-32 h-20" />
      <span class="mt-4 text-xl text-gray-500"
        >Save your Debit/Credit card</span
      >
      <span class="w-full mt-4 text-center text-gray-400 sm:w-1/2 md:w-1/3">
        It's convenient to pay with saved cards. Your card information will be
        secure, we use 128-bit encryption
      </span>

      <nuxt-link :to="localePath('/my/card/add')">
        <button
          class="p-3 px-8 mt-5 text-sm tracking-widest uppercase bg-white border rounded text-secondary-500 border-secondary-500 focus:outline-none focus:ring-opacity-80 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-secondary-600 lg:rounded"
        >
          Add Card
        </button>
      </nuxt-link>
    </div>
  </div>
</template>
