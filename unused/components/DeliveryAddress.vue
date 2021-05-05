<template>
  <div class="w-full text-sm text-gray-400 bg-white lg:mt-0">
    <!-- <h3 class="mb-4 text-xl font-medium text-gray-600">Delivery Address:</h3> -->
    <div v-if="addresses && addresses.count > 0">
      <div v-for="(a, id) in addresses && addresses.data" :key="id">
        <div>
          </span><b> Name: </b>{{ a.firstName }} {{ a.lastName }}</span>
          <span class="w-2/3 my-1"><b>Address: </b> {{ a.address }},</span>
          </span>{{ a.city }}, {{ a.state }}, {{ a.country }}</span>
          <span class="my-1"><b> Pin: </b>{{ a.zip }}</span>
          </span>{{ a.phone }}</span>
          <span class="my-1">{{ a.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ADDRESS from '~/gql/address/addresses.gql'
export default {
  // props:['firstname','lastname', 'address', 'phone', 'city', 'email', 'state', 'country', 'zip'],
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
      // console.log("address block")
      try {
        this.addresses = (
          await this.$apollo.query({
            query: ADDRESS,
            fetchPolicy: 'no-cache',
          })
        ).data.addresses
        // console.log("show address")
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },

  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
}
</script>
