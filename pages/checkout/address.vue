<template>
  <div class="container mx-auto">
    <div>
      <CheckoutHeader selected="address" />
      <div class="lg:mx-auto lg:container">
        <div class="flex flex-col w-full mx-auto sm:pb-20 lg:flex-row">
          <div class="container flex flex-col mx-auto lg:w-2/3">
            <span class="my-4 text-2xl text-center text-gray-500 lg:text-left">
              Select Delivery Address
            </span>
            <SelectAddress
              class="w-full mx-auto mb-4 bg-white rounded shadow"
              :returnUrl="'/checkout/edit-address'"
              :addReturnUrl="'/checkout/add'"
            />
            <nuxt-link :to="localePath('/checkout/add')">
              <Button
                class="w-full p-3 bg-secondary-500 focus:ring-secondary-500 md:w-1/3 md:mt-0"
              >
                ADD NEW ADDRESS
              </Button>
            </nuxt-link>
          </div>
          <div
            class="container relative flex flex-col w-full mx-auto mt-6 lg:ms-4 lg:w-1/3 lg:-mt-0"
          >
            <span
              class="hidden w-full mx-auto text-2xl text-center text-gray-500 sm:my-4 lg:text-start sm:flex"
            >
              Cart Summary
            </span>
            <div class="">
              <CartSummaryCheckout
                :loading="loading"
                :selectedAddress="selectedAddress"
                class="border-t rounded sm:border-t-0 sm:border sm:shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Radio, Button } from '~/shared/components/ui'
import SelectAddress from '~/components/User/Dashboard/SelectAddress'
import { mapMutations } from 'vuex'
import MY_ADDRESSES from '~/gql/address/myAddresses.gql'
import DELETE_ADDRESS from '~/gql/address/deleteAddress.gql'
import PriceDetails from '~/components/Cart/PriceDetails'
import Footer from '~/components/Footer'
import CartSummaryCheckout from '~/components/Checkout/CartSummaryCheckout.vue'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader')
export default {
  middleware: ['isAuth'],
  components: {
    SelectAddress,
    Radio,
    Button,
    PriceDetails,
    Footer,
    CartSummaryCheckout,
    CheckoutHeader,
  },
  data() {
    return {
      iconloading: false,
      addresses: null,
      selectedAddress: null,
      loading: false,
    }
  },
  async created() {
    await this.getAddress()
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    selectFirstAddress(x) {
      this.selectedAddress = x.addresses && x.addresses[0] && x.addresses[0].id
      return x
    },
    addressChanged(e) {
      this.selectedAddress = e
    },
    async getAddress() {
      try {
        this.loading = true
        this.addresses = (
          await this.$apollo.query({
            query: MY_ADDRESSES,
            fetchPolicy: 'no-cache',
          })
        ).data.myAddresses
        this.selectedAddress =
          this.addresses &&
          this.addresses.data &&
          this.addresses.data[0] &&
          this.addresses.data[0].id
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    async del(id) {
      this.$swal({
        title: 'Delete address?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.value) {
          try {
            this.iconloading = true
            this.clearErr()
            await this.$apollo.mutate({
              mutation: DELETE_ADDRESS,
              variables: { id },
              // refetchQueries: () => [{ query: ADDRESSES }],
            })
            // query.refetch()
            await this.getAddress()
            // this.$refs.adQ.getApolloQuery().refresh();
            this.success('Address deleted successfully')
          } catch (e) {
            this.setErr(e)
          } finally {
            this.iconloading = false
            this.busy(false)
          }
        }
      })
    },
  },
  head() {
    return {
      title: 'Select Address',
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
}
</script>
