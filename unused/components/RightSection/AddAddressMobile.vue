<template>
  <div v-if="addaddress" class="w-full p-8">
    <span class="py-3 text-lg tracking-wider text-gray-500 uppercase">
      Contact Details
    </span>
    <form action @submit.prevent="submit">
      <div class="grid grid-cols-1 py-2">
        <!-- v-model="addaddress.firstName" -->
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.firstName"
            placeholder="First Name* "
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.lastName"
            placeholder="Last Name* "
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.email"
            placeholder="Email"
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.phone"
            placeholder="Phone*"
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
      </div>
      <span class="py-3 text-lg tracking-wider text-gray-500 uppercase">
        Address Details
      </span>
      <div class="grid grid-cols-1 py-2">
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.city"
            placeholder="City* "
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.state"
            placeholder="State* "
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.country"
            placeholder="Country"
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
        <label class="flex w-full col-span-1 my-3">
          <input
            v-model="addaddress.address"
            placeholder="Address*"
            class="w-full h-12 px-3 text-gray-400 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-yellow-600"
          />
        </label>
      </div>
      <div class="flex flex-col justify-between w-full my-auto mb-0">
        <div class="w-full my-auto md:w-1/2">
          <label class="flex flex-row">
            <Checkbox />
            <!-- <input
              type="checkbox"
              class="my-auto border-0 rounded-sm me-3 bg-gray-50 text-primary-500 ring-yellow-600 ring-1 focus:ring-1 focus:ring-yellow-600 focus:ring-offset-0"
            /> -->
            <span class="text-gray-500">Make this as a default address</span>
          </label>
        </div>
        <button
          type="submit"
          class="w-full p-3 mt-4 text-sm font-semibold tracking-widest text-white bg-secondary-500 md:w-1/2 md:mt-0 focus:outline-none duration-200 hover:-translate-y-0.5 transition transform ease-in-out rounded focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-blue-500 lg:rounded"
        >
          ADD ADDRESS
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { Checkbox } from '~/shared/components/ui'
import { mapMutations } from 'vuex'
import ADDADDRESS from '~/gql/user/addAddress.gql'
export default {
  components: { Checkbox },
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
            mutation: ADDADDRESS,
            variables: this.addaddress,
          })
        ).data.addaddress
        // console.log('address added', this.addAddress)
        this.success(msg)
      } catch (e) {
        this.setErr(e.toString())
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
