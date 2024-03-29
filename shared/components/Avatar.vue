<template>
  <div class="relative mx-auto mt-4">
    <div v-if="$apollo.loading">Loading...</div>
    <div class="flex justify-center">
      <span
        class="inline-block w-20 h-20 p-2 text-center text-gray-600 bg-gray-200 rounded-full"
      >
        <div class="flex" v-if="img">
          <button
            type="button"
            @click="removeImage(img)"
            class="absolute flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer ms-12 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img v-lazy="img" alt class="object-cover w-16 h-16 rounded-full" />
        </div>
        <form enctype="multipart/form-data" novalidate v-else>
          <div class="dropbox hover:bg-blue-200">
            <input
              multiple
              type="file"
              name="photos"
              :disabled="isSaving"
              @change="uploadPhoto"
              accept="image/*"
              class="absolute w-full opacity-0 cursor-pointer"
            />
            <span v-if="isInitial">+</span>
          </div>
        </form>
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FILE_UPLOAD from '~/gql/file/fileUpload.gql'
import DELETE_FILE from '~/gql/product/deleteFile.gql'
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3
export default {
  // name required for removing
  props: {
    image: { required: false, default: '' },
    name: { required: false, default: 'avatar' },
    folder: { required: false, default: 'avatar' },
  },
  components: {},
  watch: {
    image() {
      this.img = this.image
    },
  },
  data() {
    return {
      img: null,
      currentStatus: 0,
      data: null,
      error: null,
    }
  },
  mounted() {
    this.img = this.image
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
  },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    async uploadPhoto({ target }) {
      try {
        this.clearErr()
        let images = (
          await this.$apollo.mutate({
            mutation: FIlE_UPLOAD,
            variables: { files: target.files, folder: this.folder },
            fetchPolicy: 'no-cache',
          })
        ).data.fileUpload
        images = images.map((o) => o.filename)
        if (!this.multi) {
          this.img = images[0]
          this.$emit('save', this.name, this.img)
        } else {
          this.$emit('save', this.name, images)
        }
      } catch (e) {
        this.setErr(e)
      }
    },
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    save(imagePath) {
      this.img = imagePath
      this.$emit('save', this.name, imagePath)
    },
    removeImage(image) {
      let vm = this
      this.$swal({
        title: 'Delete image?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          vm.deleteConfirmed(image)
        }
      })
    },
    async deleteConfirmed(image) {
      try {
        this.clearErr()
        this.img = ''
        await this.$apollo.mutate({
          mutation: DELETE_FILE,
          variables: { path: image },
          fetchPolicy: 'no-cache',
        })
        this.$emit('remove', this.name)
      } catch (e) {
        this.setErr(e)
      } finally {
        this.busy(false)
      }
    },
  },
}
</script>

<style scoped></style>
