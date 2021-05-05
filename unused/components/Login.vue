<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-200"
  >
    <div class="w-full px-4 lg:w-1/3">
      <div class="bg-white rounded shadow">
        <div class="text-white text-secondary">
          <h1 class="p-3 mb-2 text-xl text-center">
            <span class="font-extrabold" v-if="!signup">SIGN IN</span>
            <span class="font-extrabold" v-else>SIGN UP</span> TO YOUR ACCOUNT
          </h1>
        </div>
        <form
          novalidate
          autocomplete="off"
          @submit.stop.prevent="submit()"
          class="center"
        >
          <div class="p-6">
            <div>
              <input
                autocomplete="disabled"
                type="tel"
                v-model="uid"
                label="Phone"
                @input="onPhoneChange"
                class="bg-gray-200"
              />
            </div>
            <div v-if="showOTP">
              <input
                type="text"
                autocomplete="disabled"
                v-if="signup"
                v-model="firstName"
                label="Fisrt Name"
                class="w-full bg-gray-200"
              />
              <input
                type="text"
                autocomplete="disabled"
                v-if="signup"
                v-model="lastName"
                label="Last Name"
                class="w-full bg-gray-200"
              />
              <!-- <span class="mb-5 text-xs font-hairline text-accent-900">Please enter password</span>-->
              <!-- Show password box -->
              <div v-if="!isPhone">
                <input
                  autocomplete="disabled"
                  v-model="password"
                  name="password"
                  label="Password"
                  ref="password"
                  type="password"
                  class="w-full bg-gray-200"
                />
              </div>
              <!-- Show OTP box -->
              <div v-else class="text-center">
                <span class="mb-5 text-xs font-hairline text-accent-900">
                  Please enter OTP sent to mobile number
                </span>
                <div
                  class="relative inline-block w-32 p-2 mb-4 bg-gray-200 rounded otp-container"
                >
                  <div
                    id="wraper1"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 0 }"
                  ></div>
                  <div
                    id="wraper2"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 1 }"
                  ></div>
                  <div
                    id="wraper3"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 2 }"
                  ></div>
                  <div
                    id="wraper4"
                    class="absolute w-1 h-1 rounded otp-seperator"
                    :class="{ 'wraper-hide': otp.length > 3 }"
                  ></div>
                  <input
                    type="tel"
                    v-model="otp"
                    name="otp"
                    ref="otp"
                    class="w-32 pl-4 bg-transparent border border-gray-400 outline-none otp-content"
                    maxlength="4"
                    autocomplete="off"
                    @input="onOTPEnter(otp.length, $event)"
                  />
                </div>
              </div>
            </div>
            <div class="flex-col items-center justify-between mt-6">
              <button>{{ submitText }}</button>
              <!-- <span class="mt-2 text-xs">
                    <nuxt-link :to="localePath('/account/forgot-password')">Forgot Password?</nuxt-link>
             </span>-->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      fadeIn: '',
      disable: 'disable',
      p: {},
      msg: null,
      signup: false,
      uid: '',
      password: '',
      firstName: '',
      lastName: '',
      otp: '',
      showOTP: false,
    }
  },
  async mounted() {
    const isAuthenticated = !!this.$apolloHelpers.getToken()
    if (isAuthenticated) this.$router.push('/my')
  },
  async created() {
    // console.log(this.$route.query.ref, this.$route.query.for)
    // let geoCookie = await this.$cookies.get("geo");
    // let geo = await this.locateMe(geoCookie.coords);
    // console.log(geo);
  },
  computed: {
    isEmail() {
      if (this.uid.includes('@')) return true
      else return false
    },
    isPhone() {
      const phoneno = /^[+()\d-]+$/
      if (this.uid.length >= 10 && this.uid.match(phoneno)) return true
      else return false
    },
    submitText() {
      if (this.signup) {
        return 'Signup New Account'
      } else if (!this.isPhone && !this.isEmail && !this.showOTP) {
        return 'Verify'
      } else if (this.isPhone && !this.showOTP) {
        return 'Verify Phone' //Login Now
      } else if (this.isEmail && !this.showOTP) {
        return 'Verify Email' //Login Now
      } else if (this.isPhone && this.showOTP) {
        return 'Verify OTP'
      } else {
        return 'Login Now'
      }
    },
  },
  methods: {
    async submit() {
      if (!this.uid || this.uid == '') {
        return
      }
      if (!this.isPhone && !this.isEmail) {
        return
      }
      await this.phoneLogin()
    },
    async phoneLogin() {
      const phone = this.uid
      const otp = this.otp
      if (!this.showOTP) {
        // When clicked 1st time
        try {
          this.$store.dispatch('auth/getOtp', { phone })
          this.showOTP = true
          this.$nextTick(() => this.$refs.otp.focus())
          this.msg = 'Please enter OTP sent to your Mobile'
        } catch (e) {
        } finally {
        }
      } else {
        try {
          await this.$store.dispatch('auth/verifyOtp', { phone, otp })
          if (this.$route.query.ref && this.$route.query.for) {
            this.$router.push(
              `/my?ref=${this.$route.query.ref}&for=${this.$route.query.for}`
            )
          } else {
            const redirect = this.$route.hash.substr(1) || '/my'
            this.$router.push(redirect)
          }
        } catch (e) {
        } finally {
        }
      }
    },
    onOTPEnter(index, event) {
      const eventCode = event.which || event.keyCode
      if (index == 4) {
        this.submit() // Submit code
      }
    },
    onPhoneChange(e) {
      if (e.keyCode != 13) {
        this.showOTP = false
        this.p = {}
        return
      }
    },
  },
}
</script>

<style scoped>
.border-t {
  border-bottom: 1px solid lightgray;
}
.container {
  max-height: 80vh !important;
  min-height: 80vh !important;
}
.wraper-hide {
  visibility: hidden;
}
.border-t {
  border-bottom: 1px solid lightgray;
}
.big-button {
  background: linear-gradient(87deg, #fb6340, #da1c5f) !important;
  border-color: #fb6340;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.otp-container .otp-seperator {
  background-color: #dfe1e6;
  border: 1px solid #dfe1e6;
}
.otp-container #wraper1 {
  top: 20px;
  left: 28px;
}
.otp-container #wraper2 {
  top: 20px;
  left: 51px;
}
.otp-container #wraper3 {
  top: 20px;
  left: 76px;
}
.otp-container #wraper4 {
  top: 20px;
  left: 100px;
}
.otp-container .otp-content {
  letter-spacing: 15px;
  border: 1px solid transparent;
}
input + label {
  position: relative;
  z-index: 999;
}
</style>
