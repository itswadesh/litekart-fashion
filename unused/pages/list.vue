<template>
  <div>
    <CheckoutHeader />
    <div class="w-full">
      <div class="p-3 text-sm font-hairline text-gray-600">
        CHOOSE DELIVERY ADDRESS
      </div>
      <div class="w-full m-2 lg:flex">
        <ApolloQuery :query="require('~/gql/address/addresses.gql')">
          <template v-slot="{ result: { error, data }, isLoading }">
            <div v-if="isLoading">Loading........</div>
            <ErrComponent v-else-if="error" :error="error" />
            <div v-else-if="data && data.addresses">
              <div
                class="flex flex-wrap justify-between w-full p-2 m-1 bg-white border border-green-500 rounded shadow lg:w-1/3"
                v-for="(a, ix) in data.addresses"
                :key="a._id"
              >
                <label class="flex justify-between w-full cursor-pointer">
                  <div>
                    <Radio />
                  </div>
                  <div class="flex-1 ms-2">
                    <div class="font-semibold">
                      {{ a.firstName }} {{ a.lastName }}
                      <span v-if="ix === 0">(Default)</span>
                    </div>
                    <div class="py-2 text-xs">
                      <div>{{ a.address }}</div>
                      <div>{{ a.phone }}</div>
                      <div>{{ a.state }}</div>
                      <div>{{ a.city }}</div>
                      <div>{{ a.country }}</div>
                      <div>{{ a.zip }}</div>
                      <div class="py-2">
                        Mobile:
                        <span class="font-bold">{{ a.phone }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="office">
                    <div class="px-2 py-1 text-xs bg-gray-200 rounded-full">
                      OFFICE
                    </div>
                  </div>
                </label>
                <div class="flex w-full border-t border-gray-200">
                  <button
                    class="w-1/2 py-1 mt-1 tracking-widest text-blue-500 border-r border-gray-200"
                  >
                    Remove
                  </button>
                  <button
                    @click="go('/checkout/add')"
                    class="w-1/2 py-1 mt-1 tracking-widest text-blue-500"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </template>
        </ApolloQuery>
        <nuxt-link
          :to="localePath('/checkout/add')"
          class="flex justify-between px-4 py-2 m-1 my-2 bg-white rounded shadow focus:outline-none pointer lg:w-1/3"
        >
          <div>Add New Address</div>
          <ArrowRightIcon
            class="text-right focus:outline-none"
            aria-hidden="true"
          />
        </nuxt-link>
      </div>
    </div>
    <div
      class="fixed bottom-0 right-0 w-full p-2 bg-white lg:inset-auto lg:w-1/4 lg:absolute"
    >
      <button
        @click="$router.push('/checkout/address')"
        class="w-full p-3 mt-3 text-sm font-semibold tracking-widest text-white rounded bg-accent-900"
      >
        CONFIRM
      </button>
    </div>
  </div>
</template>

<script>
import { Radio } from '~/shared/components/ui'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader')
import ErrComponent from '~/components/ErrComponent'
export default {
  data() {
    return {
      office: false,
      a: {},
      // addresses: []
    }
  },
  created() {
    // this.getAddress()
  },
  components: { CheckoutHeader, Radio, ErrComponent },
  methods: {
    // async getAddress() {
    //   this.$store.commit('clearErr')
    //   this.addresses = (
    //     await this.$apollo.query({
    //       query: addresses
    //       // fetchPolicy: 'no-cache'
    //     })
    //   ).data.addresses
    //   this.addresses = a.data
    // },
    go(url) {
      this.$router.push(url)
    },
  },
  layout: 'none',
}
</script>
