<template>
  <div class="">
    <div class="bg-gray-50">
      <CheckoutHeader selected="address" />
      <div class="lg:mx-auto lg:container">
        <div class="flex flex-col w-full mx-auto pb-14 sm:pb-20 lg:flex-row">
          <div class="container w-full mx-auto lg:w-2/3">
            <span
              class="hidden mx-auto my-4 text-2xl text-center text-gray-500 lg:text-start sm:flex"
            >
              Edit Address
            </span>
            <EditAddress
              class="p-2 overflow-auto bg-white border rounded shadow md:p-5"
              :id="$route.query.id"
              :returnUrl="'/checkout/address'"
            />
          </div>
          <!-- <EditAddress go="checkout" id="add" class="w-2/3 bg-white border shadow rounded-xl" /> -->
          <div
            class="container relative w-full mx-auto mt-6 sm:px-2 lg:ms-8 lg:w-1/3 lg:mt-0"
          >
            <span
              class="hidden mx-auto my-4 text-2xl text-center text-gray-500 lg:text-start sm:flex"
            >
              Cart Details
            </span>
            <PriceDetails
              :btnname="'Continue'"
              :nextpage="`/checkout/payment-options?address=${$route.query.id}`"
              class="bg-white border rounded shadow"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-center">
      <Footer class="absolute bottom-0 items-center hidden sm:flex" />
    </div> -->
  </div>
</template>

<script>
import Nav from '~/components/Home/Nav'
const CheckoutHeader = () => import('~/components/Checkout/CheckoutHeader')
import EditAddress from '~/components/User/EditAddress'
import PriceDetails from '~/components/Cart/PriceDetails'

export default {
  head() {
    return {
      title: 'Edit Address',
    }
  },
  middleware: ['isAuth'],
  components: { Nav, PriceDetails, CheckoutHeader, EditAddress },
}
</script>
