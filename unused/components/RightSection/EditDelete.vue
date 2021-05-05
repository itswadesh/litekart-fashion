<template>
  <div class="absolute z-20 -mt-5 bg-white -ms-12">
    <div v-if="addresses">
      <div
        class="w-16 p-2 text-sm rounded shadow cursor-pointer hover:shadow-xl"
      >
        <nuxt-link :to="`/edit-address?id=${id}`">
          <span class="mb-2 hover:text-blue-500">Edit</span>
        </nuxt-link>
      </div>
    </div>
    <div class="w-16 p-2 text-sm rounded shadow cursor-pointer hover:shadow-xl">
      <button @click="deleteAddress(id)" class="hover:text-blue-500">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import ADDRESS from '~/gql/address/addresses.gql'
import DELETEADDRESS from '~/gql/user/deleteAddress.gql'
export default {
  props: {
    id: { type: String },
  },
  //  ['id'],
  data() {
    return {
      addresses: null,
    }
  },
  async created() {
    await this.getAddress()
  },
  methods: {
    async getAddress() {
      try {
        this.addresses = (
          await this.$apollo.query({
            query: ADDRESS,
            variables: { address: this.$route.query.id },
            fetchPolicy: 'no-cache',
          })
        ).data.addresses
        // console.log("manage address 222",this.addresses)
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
    async deleteAddress(id) {
      // console.log('id,,,,,', id)
      try {
        const data = (
          await this.$apollo.mutate({
            mutation: DELETEADDRESS,
            variables: { id: id },
          })
        ).data.deleteAddress
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>
