<template>
  <div class="flex flex-col w-full p-2 overflow-auto md:p-5">
    <!-- edit address part  -->
    <div v-if="address">
      <form action @submit.prevent="submit" class="p-1 md:p-4">
        <!-- forms -->
        <div
          class="grid grid-cols-1 gap-2 text-sm text-primary-500 md:gap-4 md:grid-cols-2"
        >
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model="address.firstName"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2 capitalize">First Name</span>
          </label>
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model="address.lastName"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2 capitalize">Last Name</span>
          </label>
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model="address.phone"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2">Mobile number</span>
          </label>
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model.number="address.zip"
              @keyup="getLocationFromZip(address.zip)"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2">PinCode</span>
          </label>
          <label class="flex flex-col-reverse col-span-2">
            <textarea
              placeholder=" "
              v-model="address.address"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2">Address (Area and Street)</span>
          </label>
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model="address.city"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2 capitalize">City/District/Town</span>
          </label>
          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model="address.state"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2 capitalize">State</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model="address.country"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2 capitalize">Country</span>
          </label>

          <label class="flex flex-col-reverse col-span-2 md:col-span-1">
            <input
              placeholder=" "
              v-model="address.email"
              class="h-10 px-3 text-gray-500 border-0 rounded ring-1 ring-gray-300 focus:outline-none hover:shadow focus:ring-2 focus:ring-primary-500"
            />
            <span class="my-2">Email</span>
          </label>
        </div>
        <div class="w-full mt-8">
          <div
            class="flex flex-col justify-between w-full my-auto mb-0 md:flex-row"
          >
            <div class="w-full my-auto md:w-1/2">
              <!-- <label class="flex flex-row">
                <input
                  type="checkbox"
                  class="my-auto border-0 rounded-sm me-3 bg-gray-50 text-primary-500 ring-primary-500 ring-1 focus:ring-1 focus:ring-primary-500 focus:ring-offset-0"
                />
                <span class="text-gray-500"
                  >Make this as a default address</span
                >
              </label> -->
            </div>
            <button
              type="submit"
              class="w-full p-3 mt-4 text-sm font-semibold tracking-widest text-white bg-secondary-500 md:w-1/3 md:mt-0 focus:outline-none duration-200 hover:-translate-y-0.5 transition transform ease-in-out rounded focus:ring-opacity-50 hover:opacity-80 focus:ring focus:ring-offset-2 focus:ring-secondary-500 lg:rounded"
            >
              ADD ADDRESS
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SAVE_ADDRESS from '~/gql/address/saveAddress.gql'
import GET_LOCATION_FROM_ZIP from '~/gql/location/getLocationFromZip.gql'
import Textarea from '~/shared/components/ui/Textarea.vue'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      address: {
        id: 'new',
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
  created() {
    this.address.email = this.user.email
    this.address.phone = this.user.phone
    this.address.firstName = this.user.firstName
    this.address.lastName = this.user.lastName
    this.address.address = this.user.address
    this.address.town = this.user.town
    this.address.city = this.user.city
    this.address.country = this.user.country
    this.address.zip = this.user.zip
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user
    },
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async getLocationFromZip(zip) {
      try {
        const locationData = (
          await this.$apollo.mutate({
            mutation: GET_LOCATION_FROM_ZIP,
            variables: { zip },
          })
        ).data.getLocationFromZip
        if (!this.address.city) this.address.city = locationData.city
        if (!this.address.state) this.address.state = locationData.state
        if (!this.address.country) this.address.country = locationData.country
      } catch (e) {
      } finally {
      }
    },
    async submit() {
      this.address.phone = this.address.phone.replace(/^0+/, '')
      if (!this.address.address) return this.setErr('Please enter address')
      let msg = 'Address Added'
      try {
        this.address = (
          await this.$apollo.mutate({
            mutation: SAVE_ADDRESS,
            variables: this.address,
          })
        ).data.address
        this.success(msg)
        this.$router.push(
          `/checkout/payment-options?address=${this.address.id}`
        )
      } catch (e) {
        this.setErr(e)
      } finally {
      }
    },
  },
}
</script>
