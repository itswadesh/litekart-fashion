<template>
  <div class="min-h-screen bg-white">
    <BackButton to="/" />
    <div v-if="order" class="flex flex-col">
      {{ order.id }}
      <span>order Number: {{ order.orderNo }}</span>
      <span>qty:{{ order.amount.qty }}</span>

      <div v-for="(items, ix) in order.items" :key="ix">
        <img v-lazy="items.img" />
      </div>
    </div>
    <GMap class="w-full h-72" />
    <div class="py-3 text-xl font-bold text-center bg-white" v-if="loading">
      Searching Order
    </div>
    <h1 class="py-3 text-xl font-bold text-center bg-white" v-else-if="!order">
      Order Not Found
    </h1>
    <div v-else class>
      <h2
        v-if="order.delivery"
        class="py-3 mb-2 font-bold text-center text-gray-500 bg-yellow-200 border-t border-b-2 border-dashed text-md"
      >
        OTP:
        <span class="text-primary">{{ order.delivery.otp }}</span>
      </h2>
      <div class="w-full px-4 mt-4 text-lg tracking-wider">
        {{ order.items[0].status }}
        <div
          v-for="(s, ix) in settings.orderStatuses"
          :key="ix"
          v-if="s.public"
          class="flex py-4 border-b"
          :class="{
            'text-green-500': index == ix,
            'opacity-25': s.status !== order.items[0].status,
          }"
        >
          <div class="flex-1 leading-tight">
            <span class="text-lg font-bold">{{ s.title }}</span>
            <br />
            <span class="text-xs text-gray-600">{{ s.body }}</span>
          </div>
          <div class="flex">
            <div
              v-if="s.status == order.items[0].status"
              class="flex items-center justify-center w-10 h-10 bg-green-500 rounded-full"
            >
              <CheckIcon class="text-white" />
            </div>
            <img v-else class="w-12 h-12 ms-4" v-lazy="s.icon" alt />
          </div>
        </div>
      </div>
      <div class="my-4 text-center">
        OTP:
        <span class="font-bold text-accent-900">{{ order.otp }}</span>
      </div>
      <button
        @click="refresh()"
        class="fixed bottom-0 flex items-center justify-center w-full py-4 text-center text-white primary"
      >
        Refresh order status
        <RefreshCwIcon class="ms-2" />
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import { GMap, BackButton } from '~/shared/components/ui'
import StickyFooter from '~/components/StickyFooter.vue'
import ORDER from '~/gql/order/order.gql'
import SUBSCRIPTION_ORDER_UPDATED from '~/gql/order/SUBSCRIPTION_ORDER_UPDATED.gql'
// import Push from 'push.js'

export default {
  middleware: ['isAuth'],
  components: {
    GMap,
    BackButton,
    StickyFooter,
  },
  apollo: {
    $subscribe: {
      orderUpdated: {
        query: SUBSCRIPTION_ORDER_UPDATED,
        variables() {
          return {
            id: this.$route.query.id,
          }
        },
        result({ data }) {
          this.order = data.orderUpdated
          const status = this.order.items[0].status
          const currentStatus = this.settings.orderStatuses.filter(
            (s) => s.status == status
          )[0]
          Push.create(currentStatus.title, {
            body: currentStatus.body,
            icon: currentStatus.icon,
          })
        },
      },
    },
  },
  data() {
    return {
      order: null,
      loading: false,
      index: -1,
    }
  },
  computed: {
    ...mapGetters({ settings: 'settings' }),
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async refresh() {
      try {
        this.loading = true
        this.clearErr()
        // this.$store.commit('clearErr')
        this.order = (
          await this.$apollo.query({
            query: ORDER,
            variables: { id: this.$route.query.id },
            fetchPolicy: 'no-cache',
          })
        ).data.order
      } catch (e) {
        this.setErr(e)
        // this.$store.commit('setErr', e)
      } finally {
        this.busy(false)
        // this.$store.commit('busy', false)
        this.loading = false
      }
    },
  },
  async mounted() {
    this.$store.dispatch('cart/fetch')
    await this.refresh()
    try {
      this.$refs.map.route(
        `${this.order.delivery.start.lat},${this.order.delivery.start.lng}`,
        `${this.order.delivery.finish.lat},${this.order.delivery.finish.lng}`
      )
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
}
</script>
