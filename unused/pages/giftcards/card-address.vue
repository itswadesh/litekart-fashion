<template>
  <div class="flex justify-center bg-pink-200">
    <div
      v-if="addaddress"
      class="w-4/5 p-8 bg-white border shadow-sm md:w-2/3 lg:w-1/3"
    >
      <span
        class="py-3 tracking-wider text-center text-gray-500 uppercase bg-gray-100"
      >
        Billing Address
      </span>
      <form action @submit.prevent="submit">
        <div class="grid grid-cols-1 py-2">
          <!-- v-model="addaddress.firstName" -->
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.firstName"
              placeholder="First Name* "
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.lastName"
              placeholder="Last Name* "
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.email"
              placeholder="Email"
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.phone"
              placeholder="Phone*"
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
        </div>
        <span
          class="py-3 tracking-wider text-center text-gray-500 uppercase bg-gray-100"
        >
          Address Details
        </span>
        <div class="grid grid-cols-1 py-2">
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.city"
              placeholder="City* "
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.state"
              placeholder="State* "
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.country"
              placeholder="Country"
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
          <label class="flex w-full col-span-1 my-3">
            <input
              v-model="addaddress.address"
              placeholder="Address*"
              class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-accent-600"
            />
          </label>
        </div>
        <nuxt-link :to="localePath('/')" class="w-full my-auto mb-0">
          <button
            type="submit"
            class="w-full p-3 mt-4 text-sm font-semibold tracking-widest text-white bg-accent-600 focus:outline-none duration-200 hover:-translate-y-0.5 transition transform ease-in-out rounded focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-accent-600"
          >
            Proceed To Pay
          </button>
        </nuxt-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import SAVE_ADDRESS from '~/gql/address/saveAddress.gql'
export default {
  components: {},
  data() {
    return {
      addaddress: {
        email: null,
        firstName: null,
        lastName: null,
        address: null,
        town: null,
        city: null,
        country: null,
        state: null,
        zip: null,
        phone: null,
      },
    }
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async submit() {
      let msg = 'Address Added'
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: SAVE_ADDRESS,
            variables: this.addaddress,
          })
        ).data.saevAddress
        this.success(msg)
      } catch (e) {
        this.setErr(e.toString())
      } finally {
      }
    },
  },
}
</script>
