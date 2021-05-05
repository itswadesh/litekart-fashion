<template>
  <div class="p-2 pb-4 bg-white lg:p-8">
    <form
      v-if="a"
      class="w-full mb-1 lg:mx-15 form"
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit(a)"
    >
      <div class="grid grid-cols-2 gap-4 p-2 mb-10">
        <Textbox
          autofocus
          label="First Name"
          class="w-full col-span-1"
          name="firstName"
          v-model="a.firstName"
        />
        <Textbox
          label="Last Name"
          class="w-full col-span-1"
          name="lastName"
          v-model="a.lastName"
        />
        <Textbox
          autofocus
          label="City"
          class="w-full col-span-1"
          name="city"
          v-model="a.city"
        />
        <Textbox
          label="State"
          class="w-full col-span-1"
          name="satate"
          v-model="a.state"
        />
        <Textbox
          label="Address1"
          class="w-full col-span-2"
          name="name"
          v-model="a.address"
        />
        <Textbox
          label="Address2"
          class="w-full col-span-2"
          name="name"
          v-model="a.address"
        />
        <Textbox
          type="tel"
          label="Country"
          class="w-full col-span-1"
          name="name"
          v-model.number="a.country"
        />
        <Textbox
          label="ZIP Code"
          class="w-full col-span-1"
          name="name"
          v-model="a.zip"
        />
        <Textbox
          type="email"
          label="Email"
          class="w-full col-span-1"
          name="name"
          v-model="a.phone"
        />
        <Textbox
          type="tel"
          label="Phone Number"
          class="w-full col-span-1"
          name="name"
          v-model="a.phone"
        />
      </div>
      <div class="w-full p-2">
        <div class="flex justify-between w-full my-auto mb-0">
          <div class="w-1/2">
            <label class="cursor-pointer material-checkbox">
              <Checkbox />
              <!-- <input type="checkbox" /> -->
              <span class="text-gray-500">Make this as a default address</span>
            </label>
          </div>
          <!-- <button
            type="button"
            @click="$router.push('/my/address')"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest text-black bg-white lg:rounded"
          >
            CANCEL
          </button> -->
          <button
            type="submit"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest text-white bg-secondary-500 focus:outline-none hover:shadow-xl hover:bg-opacity-80 lg:rounded"
          >
            ADD ADDRESS
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Textbox, Checkbox } from '~/shared/components/ui'
import { mapMutations } from 'vuex'
import { Header } from '~/shared/components'
import vSelect from 'vue-select'
import SAVE_ADDRESS from '~/gql/address/saveAddress.gql'
import GET_STATES from '~/gql/state/states.gql'
import ADDRESS from '~/gql/address/address.gql'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      a: {},
      states: {},
    }
  },
  props: { id: { type: String }, go: { type: String } }, // if checkout, navigate to checkout
  components: { Header, Textbox, vSelect, Checkbox },
  async created() {
    this.a = this.$cookies.get('geo') || {}
    this.a.firstName = this.user.firstName
    this.a.lastName = this.user.lastName
    this.a.phone = this.user.phone
    const id = this.id
    try {
      this.states = (
        await this.$apollo.query({ query: GET_STATES })
      ).data.states
    } catch (e) {
      this.setErr(e)
    } finally {
      this.busy(false)
    }
    if (id === 'add') return
    try {
      this.a = (
        await this.$apollo.query({
          query: ADDRESS,
          variables: { id },
          fetchPolicy: 'no-cache',
        })
      ).data.address
    } catch (e) {
      this.setErr(e)
    } finally {
      this.busy(false)
    }
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async submit(address) {
      if (address.coords) delete address.coords.__typename
      try {
        if (!address.id) address.id = 'new'
        const addr = (this.a = (
          await this.$apollo.mutate({
            mutation: SAVE_ADDRESS,
            variables: address,
          })
        ).data.saveAddress)
        this.go == 'checkout'
          ? this.$router.push(`/checkout/payment-mobile?address=${addr.id}`)
          : this.$router.push('/my/address')
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  layout: 'none',
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(14px);
}
/* form ends */
</style>
