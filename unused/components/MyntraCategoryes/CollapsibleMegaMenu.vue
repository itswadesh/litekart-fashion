<template>
  <div class="bg-white">
    <!-- <ul>
      <li v-for="(boards, i) in details" class="px-2" :key="i">
        <span @click="show(boards.name, 0)"> {{ boards.name + 'ssss' }}</span>
        <ul v-if="showId[0] == boards.name">
          <li v-for="(board, i) in boards.children" class="px-2" :key="i">
            <span @click="show(board.name, 1)">
              {{ board && board.name }}
            </span>
            <ul v-if="board.children.length != 0 && showId[1] === board.name">
              <li v-for="(classes, i) in board.children" class="px-2" :key="i">
                {{ classes && classes.name }}

                <ul v-if="classes.children.length != 0">
                  <li
                    v-for="(subjects, i) in classes.children"
                    class="px-2"
                    :key="i"
                  >
                    {{ subjects && subjects.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul> -->
    <ul v-for="(boards, i) in megamenu" class="justify-between" :key="i">
      <li
        class="relative flex font-semibold border-b-2 border-white"
        :class="{ 'bg-pink-200 py-3': isSideBar }"
      >
        <div
          v-if="!isSideBar"
          @click="showData(i)"
          class="flex w-full"
          :class="{ levelZero: !isSideBar }"
          v-bind:style="{ 'background-image': 'url(' + boards.img + ')' }"
        >
          <div
            class="flex items-center justify-between w-full pl-5"
            :class="{ '': !isSideBar }"
          >
            <div class="w-4/5">
              {{ boards.name }}
            </div>

            <div
              class="flex items-center justify-end w-1/5"
              v-if="boards.children.length != 0"
            >
              <chevron-down-icon
                v-if="showDataIndex == i"
                size="1x"
                class="inline text-gray-500 me-2 custom-class"
              ></chevron-down-icon>
              <chevron-right-icon
                v-else
                size="1x"
                class="inline text-gray-500 me-2 custom-class"
              ></chevron-right-icon>
            </div>
          </div>
          <!-- <div class="flex w-1/3 mx-2">
            <img v-lazy="boards.img" class="object-cover w-full h-16" />
          </div> -->
        </div>

        <div v-else class="flex w-full" :class="{ levelZero: !isSideBar }">
          <div
            class="flex items-center justify-between w-full pl-5"
            :class="{ '': !isSideBar }"
          >
            <div class="w-4/5" @click="showCategory">
              {{ boards.name }}
            </div>

            <div
              @click="showData(i)"
              class="flex items-center justify-end w-1/5"
              v-if="boards.children.length != 0"
            >
              <chevron-down-icon
                v-if="showDataIndex == i"
                size="1x"
                class="inline text-gray-500 me-2 custom-class"
              ></chevron-down-icon>
              <chevron-right-icon
                v-else
                size="1x"
                class="inline text-gray-500 me-2 custom-class"
              ></chevron-right-icon>
            </div>
          </div>
          <!-- <div class="flex w-1/3 mx-2">
            <img v-lazy="boards.img" class="object-cover w-full h-16" />
          </div> -->
        </div>
      </li>
      <ShowSubMenu
        class="pl-6"
        :show="showDataIndex == i"
        :details="boards.children"
      />

      <li class=""></li>
    </ul>
  </div>
</template>

<script>
import GET_DETAILS from '~/gql/category/megamenu.gql'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {},
  // computed: {
  //   ...mapGetters({ megamenu: 'megamenu' }),
  // },
  created() {
    this.getDetails()
  },

  props: {
    isSideBar: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      megamenu: null,
      showDataIndex: null,
      showId: [],
    }
  },

  methods: {
    ...mapMutations({ setErr: 'setErr' }),
    showCategory() {
      $nuxt.$emit('removeSidebar')
      // this.$emit('removeSidebar')
      this.$router.push('/category')
    },
    showData(i) {
      // console.log(this.showDataIndex === 0)
      if (this.showDataIndex != null) {
        this.showDataIndex = null
      } else {
        this.showDataIndex = i
      }
      // console.log(this.showDataIndex)
    },
    // show(id, index) {
    // console.log(index)
    //   console.log(this.showId.length)
    //   if (this.showId.length <= index) this.showId.push(id)
    //   else this.showId[index] = id

    //   console.log(this.showId[1])
    // },
    async getDetails() {
      try {
        this.megamenu = (
          await this.$apollo.query({
            query: GET_DETAILS,
            fetchPolicy: 'no-cache',
          })
        ).data.megamenu
      } catch (e) {
        this.setErr(e.toString())
      } finally {
      }
    },
  },
}
</script>

<style scoped>
.levelZero {
  height: 80px;
  width: 100%;
}
</style>
