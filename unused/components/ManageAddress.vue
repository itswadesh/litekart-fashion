<template>
  <div
    class="sticky flex flex-col p-5 pl-10 overflow-auto bg-white rounded ms-2 lg:pl-10 lg:ms-4 md:ms-2 width"
  >
    <div>
      <span class="mb-4 text-lg font-semibold">Manage Addresses</span>
      <nuxt-link :to="localePath('/add-address')">
        <span
          class="p-4 font-semibold text-blue-500 border cursor-pointer me-8 h-13"
        >
          + ADD A NEW ADDRESS
        </span>
      </nuxt-link>
    </div>
    <span class="flex justify-center">
      <progress
        v-if="loading"
        class="absolute items-center material-progress-circular"
      />
    </span>

    <div v-if="addresses" class="mt-8">
      <div
        v-for="a in addresses.data"
        :key="a.id"
        class="flex flex-col h-auto p-5 border me-8"
      >
        <div class="flex flex-row justify-between">
          <span
            class="w-12 h-6 pl-1 mb-2 text-sm font-semibold text-gray-700 bg-gray-300"
            >Home</span
          >
          <span>
            <more-vertical-icon
              @mouseenter="isOpen = !isOpen"
              size="1.3x"
              class="text-gray-600 cursor-pointer"
            ></more-vertical-icon>
            <span>
              <!-- <EditDelete class="z-20 opacity-100" v-if="isOpen" :id="a.id" /> -->
            </span>
          </span>
        </div>
        <h3 class="flex flex-row text-sm font-semibold">
          <span class="capitalize me-4">{{ a.firstName }}</span>
          <span>{{ a.phone }}</span>
        </h3>
        <h3 class="mt-2 text-sm">
          <span>{{ a.address }}, {{ a.city }}, {{ a.zip }}</span>
          <span>{{ a.country }}</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import ADDRESS from '~/gql/address/addresses.gql'
// import EditDelete from './EditDelete'
export default {
  components: {},
  data() {
    return {
      isOpen: false,
      addresses: null,
      loading: false,
    }
  },
  async created() {
    this.loading = true
    await this.getAddress()
  },
  methods: {
    async getAddress() {
      try {
        this.addresses = (
          await this.$apollo.query({
            query: ADDRESS,
            fetchPolicy: 'no-cache',
          })
        ).data.addresses
        // console.log("manage address 222",this.addresses)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.width {
  width: 50rem;
}
.width2 {
  width: 45rem;
}
</style>
