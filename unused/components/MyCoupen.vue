<template>
  <div
    class="flex flex-col w-full p-5 pl-4 overflow-auto bg-white rounded ms-2 lg:pl-10 lg:ms-4 lg:w-8/12"
  >
    <span class="flex justify-center">
      <progress
        v-if="loading"
        class="absolute items-center material-progress-circular"
      />
    </span>
    <div v-if="coupons">
      <div>
        <span class="mb-4 text-lg font-semibold">
          Available Coupons {{ coupons.count }}
        </span>
        <div
          v-for="c in coupons.data"
          :key="c.id"
          class="w-full p-4 border cursor-pointer lg:w-3/4"
        >
          <div class="flex flex-col">
            <span class="flex flex-col justify-between mb-4 lg:flex-row">
              <span class="font-semibold text-green-500">
                {{ c.code }} {{ c.terms }}
              </span>
              <span id="demo" class="text-sm font-semibold text-gray-700">
                Valid till {{ c.validToDate }}
              </span>
            </span>
            <span class="flex flex-col justify-between lg:flex-row">
              <span class="text-sm">{{ c.text }}</span>
              <span class="font-semibold text-blue-500 cursor-pointer"
                >View T&C</span
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var d = new Date(1618287300000);
// document.getElementById("demo").innerHTML = d;
import COUPONS from '~/gql/cart/coupons.gql'
export default {
  data() {
    return {
      coupons: null,
      loading: false,
    }
  },
  async created() {
    this.loading = true
    this.getCoupons()
  },
  methods: {
    async getCoupons() {
      try {
        this.coupons = (
          await this.$apollo.query({
            query: COUPONS,
            fetchPolicy: 'no-cache',
          })
        ).data.coupons
        // console.log('couponsss', this.coupons)
      } catch (e) {
        // console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
