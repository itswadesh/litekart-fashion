<template>
  <div
    class="sticky flex flex-col p-5 pl-10 overflow-auto bg-white rounded lg:pl-10 width"
  >
    <!-- <pre>{{profile.firstName}}</pre> -->
    <div v-if="profile">
      <div class="flex flex-col">
        <span class="flex flex-row mb-6">
          <h1 class="text-xl">Personal Information</h1>
          <span class="my-auto text-sm text-blue-600 cursor-pointer ms-6"
            >Edit</span
          >
        </span>

        <span class="flex flex-col md:flex-row">
          <input
            v-model="profile.firstName"
            type="text"
            class="w-4/5 h-12 pl-4 mb-3 capitalize border border-gray-400 rounded me-3 bg-gray-50 lg:w-1/3 lg:mb-0 focus:outline-none"
            placeholder="First Name"
          />

          <input
            v-model="profile.lastName"
            type="text"
            class="w-4/5 h-12 pl-4 capitalize border border-gray-400 rounded me-3 bg-gray-50 lg:w-1/3 focus:outline-none"
            placeholder="Last Name"
          />
        </span>
        <!-- {{profile}} -->
        <span class="flex flex-col mt-6 mb-10">
          <span class="mb-2 font-semibold">
            Your Gender: {{ profile.gender }}
            <!-- <input v-model="profile.gender" type="text" class="font-semibold" /> -->
          </span>
          <span class="flex flex-row font-semibold">
            <label class="me-4 material-radio">
              <input
                type="radio"
                id="one"
                value="Male"
                name="group"
                v-model="profile.gender"
              />
              <span class="text-gray-600">Male</span>
            </label>
            <label class="material-radio">
              <input
                type="radio"
                id="one"
                value="Female"
                name="group"
                v-model="profile.gender"
              />
              <span class="text-gray-600">Female</span>
            </label>
          </span>
        </span>
      </div>
      <!-- email address  -->
      <div>
        <span class="flex flex-row mb-6">
          <h1 class="text-xl">Email Address</h1>
          <span
            class="my-auto text-sm text-blue-600 cursor-pointer ms-2 me-2 md:ms-6 md:me-4"
          >
            Edit
          </span>
          <span
            class="my-auto text-sm text-blue-600 cursor-pointer ms-0 md:ms-6"
          >
            Change Password
          </span>
        </span>
        <span class="flex flex-row">
          <input
            v-model="profile.email"
            type="text"
            class="w-4/5 h-12 pl-4 border border-gray-400 rounded me-3 bg-gray-50 lg:w-1/3 focus:outline-none"
            placeholder="xyz123@abc.com"
          />
        </span>
      </div>
      <!-- mobile number  -->
      <div class="mt-10">
        <span class="flex flex-row mb-6">
          <h1 class="text-xl">Mobile Number</h1>
          <span class="my-auto text-sm text-blue-600 cursor-pointer ms-6 me-4">
            Edit
          </span>
        </span>
        <span class="flex flex-row">
          <input
            v-model="profile.phone"
            type="text"
            class="w-4/5 h-12 pl-4 border border-gray-400 rounded me-3 bg-gray-50 lg:w-1/3 focus:outline-none"
            placeholder="+918888888888"
          />
        </span>
      </div>
      <!-- faq -->
      <div class="flex flex-col flex-shrink-0 mt-10 mb-10 text-sm me-10 width2">
        <span class="mb-6 text-lg">FAQs</span>
        <span class="flex-shrink-0 mb-4 font-semibold">{{ info.q1 }}</span>
        <span class="mb-4">{{ info.a1 }}</span>
        <span class="flex-shrink-0 mb-4 font-semibold">{{ info.q2 }}</span>
        <span class="mb-4">{{ info.a2 }}</span>
        <span class="flex-shrink-0 mb-4 font-semibold">{{ info.q3 }}</span>
        <span class="mb-4">{{ info.a3 }}</span>
        <span class="flex-shrink-0 mb-4 font-semibold">{{ info.q4 }}</span>
        <span class="mb-4">{{ info.a4 }}</span>
      </div>
      <div class="flex flex-row justify-between">
        <button
          class="text-blue-600 duration-500 ease-in-out transform cursor-pointer hover:-translate-y-1 hover:scale-95"
        >
          Deactivate Account
        </button>
        <button
          @click="update"
          class="p-3 pl-6 pr-6 text-white duration-500 ease-in-out transform bg-blue-500 rounded shadow cursor-pointer me-4 hover:-translate-y-1 hover:scale-95 focus:outline-none"
        >
          Update Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import UPDATE_PROFILE from '~/gql/user/updateProfile.gql'
import ME from '~/gql/user/me.gql'
export default {
  data() {
    return {
      info: {
        q1: 'What happens when I update my email address (or mobile number)?',
        a1:
          'Your login email id (or mobile number) changes, likewise. Youll receive all your account related communication on your updated email address (or mobile number).',
        q2:
          'When will my  account be updated with the new email address (or mobile number)?',
        a2:
          'It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.',
        q3:
          'What happens to my existing  account when I update my email address (or mobile number)?',
        a3:
          "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.",
        q4:
          'Does my Seller account get affected when I update my email address?',
        a4:
          "Tablez has a 'single sign-on' policy. Any changes will reflect in your Seller account also.",
      },

      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
      },
    }
  },
  async created() {
    await this.getMe()
  },
  methods: {
    ...mapMutations({ success: 'success', setErr: 'setErr' }),
    async getMe() {
      try {
        this.profile = (
          await this.$apollo.query({
            query: ME,
            fetchPolicy: 'no-cache',
          })
        ).data.me
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
    // update profile method
    async update() {
      // console.log('update profile', this.profile)
      let msg = 'Profile Updated'
      try {
        // console.log(this.profile)
        const data = (
          await this.$apollo.mutate({
            mutation: UPDATE_PROFILE,
            variables: this.profile,
          })
        ).data.updateProfile
        this.success(msg)
      } catch (e) {
        // console.log(e)
      } finally {
      }
    },
  },
}
</script>

<style scoped>
.width {
  width: 50rem;
}
.width2 {
  width: 45rem;
}
</style>
