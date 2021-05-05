import { Submit } from '~/shared/components/ui'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      image: '',
    }
  },
  components: { Submit },
  methods: {
    ...mapMutations({
      clearErr: 'clearErr',
      setErr: 'setErr',
      success: 'success',
      busy: 'busy',
    }),
    imgPath(i) {
      return `${i}?a=${Math.random()}`
    },
    async saveImage(name, image) {
      try {
        this.settings[name] = image
        this.save(this.settings) // Save the image against settings
      } catch (e) {
        this.setErr(e)
      }
    },
    removeImage(name) {
      this.settings[name] = ''
      this.save(this.settings)
    },
  },
}
