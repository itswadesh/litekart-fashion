<template>
  <div class="w-full xl:ms-3">
    <!-- <div class="flex flex-row justify-end">
          <Share :data="product" :host="host" />
          <WishButton :rounded="true" :pid="product.id" v-if="product.id" class="p-1 w-7 h-7"/>
      </div> -->
    <div class="flex flex-row w-full afterSizeSelector">
      <div v-if="product" class="flex flex-col w-full px-3">
        <div>
          <div class="w-full p-2 md:p-0">
            <span
              v-if="product.brand"
              class="py-4 md:py-3 text-primary-500 md:hidden"
            >
              {{ product.brand.name }}
            </span>
            <div
              class="py-2 text-lg font-medium text-gray-600 sm:text-xl md:mt-4 md:py-0 xl:mt-0 lh75"
            >
              {{ product.name }}
            </div>

            <!-- size chart demo button  -->
            <!-- <div>
              <button
                @click="sidebar = !sidebar"
                aria-label="Open Menu"
                class="overflow-x-hidden overflow-y-hidden transition ease-in-out focus:outline-none duration-1500"
              >
                Size chart
              </button>
              <div
                v-if="sidebar"
                @click="sidebar = false"
                class="fixed inset-0 z-30 w-screen h-screen bg-black opacity-50 cursor-auto"
              />
              <ProductSizeChart
                class="h-screen"
                :show="sidebar"
                :class="sidebar ? 'openSideBar' : 'closeSideBar'"
                @hideSidebar="sidebar = false"
              />
            </div> -->

            <div v-if="reviewSummary" class="flex flex-row mt-4">
              <div
                class="flex flex-row items-center justify-center w-20 h-8 my-auto text-base font-normal tracking-wider text-gray-600 bg-gray-300 rounded me-3"
              >
                <span class="my-auto me-1">{{ reviewSummary.avg }}</span>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0517 15.1844L10 15.1532L9.94833 15.1844L3.97123 18.7919L5.55738 11.9927L5.5711 11.9339L5.52548 11.8944L0.244617 7.31961L7.19845 6.72964L7.25854 6.72454L7.28207 6.66902L10 0.256259L12.7179 6.66902L12.7415 6.72454L12.8015 6.72964L19.7554 7.31961L14.4745 11.8944L14.4289 11.9339L14.4426 11.9927L16.0288 18.7919L10.0517 15.1844Z"
                    fill="#F2B200"
                    stroke="#95989A"
                    stroke-width="0.2"
                  />
                </svg>
              </div>
              <span class="my-auto text-lg font-light text-gray-500">
                {{ reviewSummary.count }}
                ratings and
                {{ reviewSummary.reviews && reviewSummary.reviews.length }}
                reviews
              </span>
            </div>

            <!-- share and add reviews and wishlist icon  -->
            <div class="flex flex-row justify-between w-full my-1">
              <nuxt-link
                :to="localePath(`/rate-this-product?id=${product.id}`)"
                class="py-1 my-auto text-sm text-gray-600 md:txt-base sm:text-base me-3 hover:text-primary-500"
              >
                Add a Review
              </nuxt-link>
            </div>
            <div class="">
              <span class="flex flex-row sm:py-2">
                <div
                  class="my-1 text-2xl font-medium text-gray-600 sm:text-3xl"
                >
                  {{ product.price | currency(settings.currency_symbol) }}
                </div>

                <span
                  v-if="product.price < product.mrp"
                  class="my-auto text-lg ms-3 sm:text-xl"
                >
                  <div class="flex flex-row my-auto text-gray-400">
                    <strike>
                      {{ product.mrp | currency(settings.currency_symbol) }}
                    </strike>
                    <span
                      v-if="product.price < product.mrp"
                      class="my-auto text-lg ms-2 text-secondary-400"
                    >
                      {{
                        Math.floor(100 - (product.price * 100) / product.mrp)
                      }}% off
                    </span>
                  </div>
                </span>
              </span>
              <span
                v-if="product.stock > 0 && product.stock < 5"
                class="text-lg font-thin text-gray-500"
              >
                Hurry, only few left!
              </span>
              <span class="mt-2 border-b shadow-sm"></span>
              <!-- <div class="mt-4">
                <span class="avl">Available offers</span>
                <ul class="mt-3 ms-5 subline">
                  <li class="py-2">
                    ratione reiciendis distinctio possimus quis eius.
                  </li>
                  <li class="py-2">Lorem ipsum dolor sit amet consectetur</li>
                  <li class="py-2">adipisicing elit. Aliquam vitae expedita</li>
                  <li class="py-2">facere id ipsa at, eligendi impedit esse</li>
                  <li class="py-2">odit! Porro totam velit iste provident</li>
                </ul>
              </div> -->
              <!-- <span class="mt-4 border-b shadow-sm"></span>-->

              <!-- select options  -->
              <div class="flex-col">
                <!-- <div
                  v-if="product.options && product.options.length"
                  class="items-center p-3 px-3 my-3 text-sm bg-gray-100 sizeSelector lg:my-0"
                  :class="{ 'shake-animation': shake }"
                >
                  <div>
                    <div
                      v-for="o in product.options"
                      :key="o.id"
                      class="flex flex-row my-3"
                    >
                      <span class="my-auto text-lg text-gray-500 me-3">
                        {{ o.name }}
                     </span>
                      <select
                        v-if="o.type == 'select'"
                        @change="$emit('optionChanged', selectedOptions)"
                        v-model="selectedOptions[o.id]"
                      >
                        <option
                          v-for="(i, ix) in o.values"
                          :key="ix"
                          :value="i.name"
                        >
                          {{ i.name }}
                        </option>
                      </select>
                      <div v-else-if="o.type == 'textbox'" class="flex">
                        <div class="text-xs">{{ o.name }}</div>
                        <input
                          type="text"
                          v-model="selectedOptions[o.id]"
                          @blur="$emit('optionChanged', selectedOptions)"
                        />
                      </div>
                      <div v-else-if="o.type == 'date'" class="flex">
                        <input
                          type="date"
                          id="start"
                          @blur="$emit('optionChanged', selectedOptions)"
                          v-model="selectedOptions[o.id]"
                        />
                      </div>
                      <div v-else-if="o.type == 'textarea'" class="flex">
                        <textarea
                          rows="3"
                          @blur="$emit('optionChanged', selectedOptions)"
                          v-model="selectedOptions[o.id]"
                        />
                      </div>
                      <div v-else-if="o.type == 'size'" class="flex flex-wrap">
                        <label
                          v-for="(i, ix) in o.values"
                          :key="ix + 'c'"
                          :class="
                            selectedOptions[o.id] == i.id
                              ? ` border-primary-500 bg-primary-500 text-white`
                              : `bg-gray-100 border-gray-400`
                          "
                          class="flex items-center justify-center w-12 h-12 m-1 text-gray-500 border-2 rounded-full cursor-pointer hover:text-primary-500 hover:border-primary-500 rouned-md focus:outline-none hover:font-bold"
                        >
                          <div class="text-xs uppercase sm:text-sm">
                            {{ i.name }}
                          </div>
                          <input
                            type="radio"
                            :value="i.id"
                            class="hidden"
                            v-model="selectedOptions[o.id]"
                            @change="$emit('optionChanged', selectedOptions)"
                          />
                        </label>
                      </div>
                      <div
                        v-else-if="o.type == 'colors'"
                        class="flex flex-wrap"
                      >
                        <label
                          :class="
                            selectedOptions[o.id] == i.id
                              ? `border-primary-500 text-white`
                              : `border-gray-200 text-black`
                          "
                          :style="
                            selectedOptions[o.id] == i.id
                              ? `background-color:${i.name}`
                              : ``
                          "
                          v-for="(i, ix) in o.values"
                          :key="ix + 'c'"
                          class="flex items-center justify-center w-12 h-12 m-1 border-2 rounded-full cursor-pointer focus:outline-none hover:font-bold"
                        >
                          <div class="text-xs">{{ i.name }}</div>
                          <input
                            type="radio"
                            :value="i.id"
                            class="hidden"
                            v-model="selectedOptions[o.id]"
                            @change="$emit('optionChanged', selectedOptions)"
                          />
                        </label>
                      </div>
                      <div v-else-if="o.type == 'radio'">
                        <label
                          v-for="(v, i) in o.values"
                          :key="i"
                          class="p-3 mx-4"
                        >
                          <input
                            class="my-auto text-primary-500 focus:ring-1 focus:ring-primary-500"
                            type="radio"
                            :name="v.id"
                            v-model="selectedOptions[o.id]"
                            :value="v.id"
                            :id="v.id"
                          />
                          <span class="-mb-2 text-lg text-gray-600">{{
                            v.name
                          }}</span>
                        </label>
                      </div>

                      <div v-else-if="o.type == 'checkbox'">
                        <Checkbox
                          @change="$emit('optionChanged', selectedOptions)"
                          :name="v.id"
                          v-model="selectedOptions[o.id]"
                          v-for="(v, i) in o.values"
                          :key="i"
                          :value="v.id"
                          :id="v.id"
                          >{{ v.name }}
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </div> -->
                <!-- <div
                  class="items-center p-3 px-3 my-3 text-sm bg-gray-100 lg:my-0"
                  :class="{ 'shake-animation': shake }"
                >
                  <div class="flex items-center">
                    <span class="me-4"> SELECT VARIANT</span>
                  </div>
                  <div v-if="product.variants">
                    <div v-for="v in product.variants" :key="v.id">
                      <div class="flex">
                        <button
                          @click="selectVariant(v)"
                          :class="{
                            'bg-primary-500 text-white':
                              v.id ==
                              (userSelectedVariant && userSelectedVariant.id),
                          }"
                          class="items-center justify-center w-12 h-12 m-1 border border-gray-400 rounded-full cursor-pointer focus:outline-none hover:border-secondary-500 hover:font-bold"
                          v-if="v.stock > 0"
                        >
                          <div class="text-xs">{{ v.size }}</div>
                          <div
                            v-if="v.stock < 5"
                            class="absolute w-12 text-xs font-semibold text-white bg-orange-500 rounded"
                          >
                            {{ v.stock }} left
                          </div>
                          <div class="text-xs" v-if="v">
                            {{ v.options[0].name }} {{ v.options[0].val }}
                          </div>
                        </button>
                        <button
                          v-else
                          class="w-12 h-12 m-1 text-gray-600 bg-gray-300 rounded-full cursor-not-allowed focus:outline-none"
                        >
                          <div class="text-xs">
                            {{ v.options[0].name }} {{ v.options[0].val }}
                          </div>
                          <div
                            class="absolute w-12 mt-5 text-xs font-semibold text-white rounded bg-secondary-500"
                          >
                            No stock
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div> -->
                <!-- <img
                      class="h-3 -mt-1 ms-6 me-2"
                      alt=""
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzOCIgaGVpZ2h0PSIxMiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9IiMyODc0RjAiIHN0cm9rZS13aWR0aD0iMS4zIj48cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0zNy4zNS42NUguNjV2MTAuN2gzNi43Vi42NXoiLz48cGF0aCBmaWxsPSIjODc4Nzg3IiBkPSJNNi42NSA4LjY1aDF2Mi43aC0xem00LTNIMTFsLS4zNS0uMzVWNWwtLjE1LjE1LS4xNS0uMTV2LjNsLS4zNS4zNWguMzV2NS43SDEwbC4zNS4zNXYuM2wuMTUtLjE1LjE1LjE1di0uM2wuMzUtLjM1aC0uMzV2LTUuN3ptNSAzSDE2bC0uMzUtLjM1VjhsLS4xNS4xNS0uMTUtLjE1di4zbC0uMzUuMzVoLjM1djIuN0gxNWwuMzUuMzV2LjNsLjE1LS4xNS4xNS4xNXYtLjNsLjM1LS4zNWgtLjM1di0yLjd6bTQtM2gxdjUuN2gtMXptNCAzaDF2Mi43aC0xem05IDBoMXYyLjdoLTF6bS00LTNoMXY1LjdoLTF6Ii8+PC9nPjwvc3ZnPg=="
                    /> -->
                <!-- <div class="flex items-center text-primary">
                      <span class="">SIZE CHART</span>
                      <i class="block -mt-1 ms-2 fa fa-angle-right"></i>
                    </div> -->
                <div
                  v-if="
                    pg &&
                    ((pg.colorGroup && pg.colorGroup.length) ||
                      (pg.sizeGroup && pg.sizeGroup.length))
                  "
                  class="p-3 px-3 my-3 text-sm bg-gray-100 lg:my-0"
                >
                  <div v-if="pg.sizeGroup && pg.sizeGroup.length">
                    <div class="flex flex-wrap items-center">
                      <span class="text-lg font-light text-gray-700 me-6">
                        Sizes:
                      </span>
                      <div class="flex">
                        <nuxt-link
                          :to="`/${i.slug}?id=${i.id}`"
                          v-for="(i, ix) in pg.sizeGroup"
                          :key="ix + 's'"
                          v-if="i.size"
                          :class="
                            i.id == product.id
                              ? ` border-primary-500 text-primary-500`
                              : `bg-gray-100 border-gray-500 text-gray-700`
                          "
                          class="flex items-center justify-center w-12 h-12 m-1 border rounded-full cursor-pointer hover:text-primary-500 hover:border-primary-500 focus:outline-none"
                        >
                          <div class="uppercase sm:text-lg">
                            {{ i.size.name }}
                          </div>
                        </nuxt-link>
                        <div
                          @click="sidebar = !sidebar" aria-label="Open Menu"
                          class="my-auto text-sm font-light text-gray-500 underline cursor-pointer ms-2 hover:text-gray-800 hover:font-medium"
                        >
                          Size chart
                        </div>
                        <div>
                          <div
                            v-if="sidebar"
                            @click="sidebar = false"
                            class="fixed inset-0 z-30 w-screen h-screen bg-black opacity-50 cursor-auto"
                          />
                          <ProductSizeChart
                            class="h-screen"
                            :show="sidebar"
                            :class="sidebar ? 'openSideBar' : 'closeSideBar'"
                            @hideSidebar="sidebar = false"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="pg.colorGroup && pg.colorGroup.length">
                    <div class="flex flex-wrap items-center">
                      <span class="text-lg font-light text-gray-700 me-4">
                        Colors:
                      </span>
                      <div class="flex flex-wrap overflow-y-auto">
                        <nuxt-link
                          :to="`/${i.slug}?id=${i.id}`"
                          v-for="(i, ix) in pg.colorGroup"
                          :key="ix + 'c'"
                          v-if="i.color"
                          :style="`background: ${i.color.color_code}`"
                          :class="
                            i.id == product.id
                              ? ` ring-primary-500 `
                              : `border-gray-500 `
                          "
                          class="flex items-center justify-center w-12 h-12 m-1 border-white rounded-full cursor-pointer ring-1 ring-white ring-inset hover:border-primary-500 focus:outline-none"
                        >
                          <div class="">
                            <!-- {{ i.color.name }} -->
                          </div>
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="flex items-center">
                    <span class="me-4"> SELECT SIZE</span>
                    
                  </div> -->
                  <!-- <div
                    class="relative flex flex-wrap px-3 py-4"
                    :class="{ 'shake-animation': shake }"
                  >
                    <div v-for="v in size" :key="v._id">
                      <button
                        @click="selectVariant(v)"
                        :class="{
                          'bg-primary-500 text-white':
                            v.size ==
                            (userSelectedVariant && userSelectedVariant.size),
                        }"
                        v-if="v.stock > 0"
                        class="w-12 h-12 m-1 border border-gray-400 rounded-full focus:outline-none hover:border-secondary-500 hover:font-bold"
                      >
                        <div class="text-xs">{{ v.size }}</div>
                        <div
                          v-if="v.stock < 5"
                          class="absolute w-12 text-xs font-semibold text-white bg-orange-500 rounded"
                        >
                          {{ v.stock }} left
                        </div>
                      </button>
                      <button
                        v-else
                        class="w-12 h-12 m-1 text-gray-600 bg-gray-300 rounded-full cursor-not-allowed focus:outline-none"
                      >
                        <div class="text-xs">{{ v.size }}</div>
                        <div
                          class="absolute w-12 mt-5 text-xs font-semibold text-white rounded bg-secondary-500"
                        >
                          No stock
                        </div>
                      </button>
                    </div>
                  </div> -->
                </div>
              </div>
              <!-- <div class="items-center p-3 px-3 my-3 text-sm bg-gray-100 lg:my-0"
          :class="{ 'shake-animation': shake }">
            <div v-if="product.options">
              <div v-for="o in product.options" :key="o.id"> -->
              <!-- color selector -->
              <!-- </div>
            </div>
              </div> -->
              <div
                class="flex flex-row justify-between mt-3 text-lg font-light"
              >
                <div
                  v-if="product.brand"
                  class="flex-row hidden my-auto md:flex"
                >
                  <span class="my-auto text-gray-500">Brand: </span>
                  <span class="my-auto text-primary-500 ms-1">
                    {{ product.brand.name }}
                  </span>
                </div>
                <div class="flex flex-row my-auto">
                  <span class="my-auto text-gray-500">Availability :</span>
                  <span
                    v-if="product.stock > 0"
                    class="my-auto text-secondary-200 ms-1"
                  >
                    {{ product.stock }} In Stock
                  </span>
                  <span v-else class="my-auto ms-1 text-accent-900">
                    Not Available
                  </span>
                </div>
              </div>
              <!-- deleivery  -->
              <div
                class="flex flex-col justify-between w-full my-5 mt-6 sm:flex-row"
              >
                <!-- <div class="me-3">
                  <span class="text-lg font-light text-gray-500">Delivery To:</span>
                  <input
                    type="text"
                    class="h-12 mt-2 border-none ring-1 ring-primary-500 focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter Pin"
                  />
                </div> -->
                <div class="flex flex-row">
                  <div class="me-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.64 2.35C12.19 0.9 10.2 0 7.99 0C3.57 0 0 3.58 0 8C0 12.42 3.57 16 7.99 16C11.72 16 14.83 13.45 15.72 10H13.64C12.82 12.33 10.6 14 7.99 14C4.68 14 1.99 11.31 1.99 8C1.99 4.69 4.68 2 7.99 2C9.65 2 11.13 2.69 12.21 3.78L8.99 7H15.99V0L13.64 2.35Z"
                        fill="#4A4A4A"
                      />
                    </svg>
                  </div>
                  <div class="flex flex-col">
                    <span class="-mt-2 text-lg font-light text-gray-500"
                      >{{ product.returnInfo }}
                    </span>
                    <span class="my-auto text-lg font-light text-gray-500"
                      >Cash on Delivery available</span
                    >
                  </div>
                </div>
              </div>
              <div class="my-5">
                <div class="flex flex-row">
                  <span class="my-auto text-lg font-light text-gray-500">
                    Delivery by:
                  </span>
                  <span class="my-auto text-lg font-light text-gray-700 ms-1">
                    {{ deliveryDate }}
                  </span>
                </div>
                <!-- <div
                  class="text-sm font-light text-gray-500 underline cursor-pointer hover:text-gray-800 hover:font-medium"
                >
                  View Details
                </div> -->
              </div>
              <span
                v-if="product.color"
                class="hidden my-6 text-gray-500 border-b shadow-sm sm:flex xl:my-4"
              >
                Color:
                <span class="ml-1 text-gray-600">
                  {{ product.color.name }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import REVIEWS from '~/gql/review/reviewSummary.gql'
import Share from '~/components/ProductDetails/Share'
import { Checkbox } from '~/shared/components/ui'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import WishButton from '~/components/WishButton.vue'
import ProductSizeChart from '~/components/ProductDetails/ProductSizeChart'
export default {
  props: {
    host: { type: String },
    pg: { type: Object },
    product: { type: Object },
    // loading: { type: Boolean },
  },
  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      getItemQty: 'cart/getItemQty',
      settings: 'settings',
    }),
  },
  data() {
    return {
      sidebar: false,
      selectedRadio: null,
      reviewSummary: null,
      selectedOptions: {},
      select: null,
      deliveryDate: null,
      shake: false,
      userSelectedVariant: null,
      addedToCart: false,
    }
  },
  async created() {
    this.getReviews()
    this.updatedDeliveryDates()
    if (this.product.options) {
      this.product.options.forEach((o) => {
        if (o.type == 'checkbox') {
          this.selectedOptions[o.name] = []
          if (o.default_option) {
            this.selectedOptions[o.name].push(o.default_option)
          }
        } else {
          this.selectedOptions[o.name] = null
          this.selectedOptions[o.name] = o.default_option
        }
        // console.log(this.product,this.selectedOptions)
      })
    }
  },
  mounted() {
    // console.log(this.product, 'product details')
  },
  components: {
    Share,
    Checkbox,
    WishButton,
    ProductSizeChart,
  },
  methods: {
    async getReviews() {
      const product = this.$route.query.id
      if (!product) return
      try {
        this.reviewSummary = (
          await this.$apollo.query({
            query: REVIEWS,
            variables: { product },
            fetchPolicy: 'no-cache',
          })
        ).data.reviewSummary
      } catch (e) {
      } finally {
      }
    },
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    ...mapActions({ addToCart: 'cart/addToCart' }),
    alertToSelectMandatoryOptions() {
      // Raised by AddToCart Button at detail page
      this.setErr('Please select a size')
      if (process.client) {
        const el = this.$el.getElementsByClassName('sizeSelector')[0]
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, 3000)
    },
    selectVariant(s) {
      this.updatedDeliveryDates()
      this.userSelectedVariant = s
      this.$emit('variantChanged', s)
      this.selectedImgIndex = 0
    },
    updatedDeliveryDates() {
      var now = new Date()
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      now.setDate(now.getDate() + 5)
      this.deliveryDate =
        now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear()
    },
    pushToLogin() {
      const query = this.$route.query
      let route = this.$route.path
      route = route.substr(1)
      if (!query || !query.id) this.$router.push(`/login?return=${route}`)
      else this.$router.push(`/login?return=${route}?id=${query.id}&wish=true`)
    },
    go(url) {
      this.$router.push(url)
    },
    async findVariation() {
      const pid = this.product.id
      const obj = this.selectedOptions
      const options = Object.keys(obj).map(function (key) {
        return { name: key, val: obj[key] }
      })
      // console.log('options', options)
      try {
        this.clearErr()
        const variant = (
          await this.$apollo.query({
            query: GET_VARIANT,
            variables: { pid, options },
            fetchPolicy: 'no-cache',
          })
        ).data.getVariant
        this.selectedVariant = variant
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },

    error(err) {
      this.setErr(err.err)
    },
    clearRecentItems() {
      this.RecentlyViewedProducts = []
    },
    // async getProduct() {
    //   this.loading = true
    //   try {
    //     this.product = (
    //       await this.$apollo.query({
    //         query: PRODUCT,
    //         variables: { id: this.$route.query.id },
    //         fetchPolicy: 'no-cache',
    //       })
    //     ).data.product
    //     this.updatedDeliveryDates()
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
}
</script>

<style scoped>
.openSideBar {
  right: 0;
  transition: 0.3s all;
}
.closeSideBar {
  right: -100%;
  transition: 0.3s all;
}
.lh75 {
  line-height: 1.1;
}
.custom-arrow {
  margin-right: -14px;
  height: 80px;
  width: 46px;
  padding: 6px;
  padding-top: 23px;
  /* background: wheat; */
  box-shadow: 10px;
}
.slick-prev:before,
.slick-next:before {
  /* font-family: "slick"; */
  font-size: 35px;
  line-height: 1;
  opacity: 1;
  color: #ba8638;
  box-shadow: 10px;
  -webkit-font-smoothing: antialiased;
}
.slick-prev {
  margin-left: -40px;
  z-index: 1;
  left: 0;
  box-shadow: 10px;
}

/** Hover Tooltip Css ***/
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 82px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-bottom: 7px;
  margin-left: -38px;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.tooltip .tooltiptext {
  opacity: 0;
  transition: opacity 0.5s;
}
.tooltip:hover .tooltiptext {
  opacity: 1;
}
.tooltip .tooltiptext::after {
  content: ' ';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
/** End Hover Tooltip Css ***/
.shake-animation {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  border: 1px solid red;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
