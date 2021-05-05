<template>
  <div class="z-30 bg-white opacity-100">
    <footer
      class="fixed inset-x-0 bottom-0 text-sm text-gray-800 bg-white border-t border-blue-500 rounded shadow"
    >
      <div class="flex flex-row mx-auto justify-evenly">
        <nuxt-link :to="localePath('/')" class="p-3">
          <span>
            <home-icon
              size="1.5x"
              class="mx-auto text-blue-500 custom-class"
            ></home-icon
            >Home
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/myntra-category')" class="p-3">
          <span>
            <grid-icon
              size="1.5x"
              class="mx-auto text-blue-500 custom-class"
            ></grid-icon
            >Category
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/c')" class="p-3">
          <span>
            <trending-up-icon
              size="1.5x"
              class="mx-auto text-blue-500 custom-class"
            ></trending-up-icon
            >Trending
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/explore')" class="p-3">
          <span>
            <command-icon
              size="1.5x"
              class="mx-auto text-blue-500 custom-class"
            ></command-icon
            >Explore
          </span>
        </nuxt-link>
        <nuxt-link :to="localePath('/my/profile')" class="p-3">
          <span>
            <user-icon
              size="1.5x"
              class="mx-auto text-blue-500 custom-class"
            ></user-icon
            >User
          </span>
        </nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>
