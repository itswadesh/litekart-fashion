import UPDATE_PROFILE from '~/gql/user/updateProfile.gql'
import ME from '~/gql/user/me.gql'
import SIGN_OUT from '~/gql/user/signOut.gql'
import LOGIN from '~/gql/user/login.gql'
import REGISTER from '~/gql/user/register.gql'
import CHANGE_PASSWORD from '~/gql/user/changePassword.gql'
import GET_OTP from '~/gql/user/getOtp.gql'
import VERIFY_OTP from '~/gql/user/verifyOtp.gql'
import EMAIL_PASSWORD from '~/gql/user/emailPassword.gql'
import RESET_PASSWORD from '~/gql/user/resetPassword.gql'

export default {
  async fetch({ commit, state, getters }) {
    try {
      commit('clearErr', null, { root: true })
      commit('busy', true, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.query({
          query: ME,
          fetchPolicy: 'no-cache',
        })
      ).data.me
      commit('setUser', data)
      return data
    } catch (e) {
      commit('setUser', null)
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async getOtp({ commit, rootState }, { phone }) {
    try {
      commit('clearErr', null, { root: true })
      commit('busy', true, { root: true })
      await this.app.apolloProvider.defaultClient.mutate({
        mutation: GET_OTP,
        variables: { phone },
        fetchPolicy: 'no-cache',
      })
      commit('clearErr', null, { root: true })
      return
    } catch (e) {
      commit('setErr', e)
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async verifyOtp({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      commit('busy', true, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: VERIFY_OTP,
          variables,
          fetchPolicy: 'no-cache',
        })
      ).data.verifyOtp
      commit('setUser', data)
      commit('clearErr', null, { root: true })
      return data
    } catch (e) {
      commit('setErr', e, { root: true })
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async logout({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      const logout = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: SIGN_OUT,
          fetchPolicy: 'no-cache',
        })
      ).data.signOut
      if (logout) {
        commit('clearUser')
        this.app.router.push('/')
      } else commit('setErr', 'Logout error', { root: true })
    } catch (e) {
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async register({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: REGISTER,
          variables,
        })
      ).data.register

      // console.log(data, 'registerrrrr')
      if (data) {
        commit('setUser', {
          phone: data.phone,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          gender: data.gender,
          state: data.state,
          city: data.city,
          zip: data.zip,
          phone: data.phone,
          role: data.role,
          provider: data.provider,
          verified: data.verified,
        })
        commit('info', 'Registered successfully.', { root: true })
        return data
      }
    } catch (err) {
      throw err
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async login({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: LOGIN,
          variables,
          fetchPolicy: 'no-cache',
        })
      ).data.login
      if (data) {
        commit('setUser', {
          phone: data.phone,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          gender: data.gender,
          state: data.state,
          city: data.city,
          zip: data.zip,
          phone: data.phone,
          role: data.role,
          provider: data.provider,
          verified: data.verified,
        })
        return data
      }
    } catch (e) {
      // commit('setErr', e, { root: true })
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async changePassword({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: CHANGE_PASSWORD,
          variables,
          fetchPolicy: 'no-cache',
        })
      ).data.changePassword
    } catch (e) {
      commit('setErr', e, { root: true })
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async resetPassword({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      return (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: RESET_PASSWORD,
          variables,
          fetchPolicy: 'no-cache',
        })
      ).data.resetPassword
    } catch (e) {
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async emailPassword({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: EMAIL_PASSWORD,
          variables,
          fetchPolicy: 'no-cache',
        })
      ).data.emailPassword
      return data
    } catch (e) {
      throw e
    } finally {
      commit('busy', false, { root: true })
    }
  },
  async updateProfile({ commit, rootState }, variables) {
    try {
      commit('clearErr', null, { root: true })
      const data = (
        await this.app.apolloProvider.defaultClient.mutate({
          mutation: UPDATE_PROFILE,
          variables,
        })
      ).data.updateProfile
      commit('setUser', {
        phone: data.phone,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: data.avatar,
        gender: data.gender,
        state: data.state,
        city: data.city,
        zip: data.zip,
        phone: data.phone,
        role: data.role,
        verified: data.verified,
        provider: data.provider,
        info: data.info,
      })
      // commit('info', 'Profile updated.', { root: true }) // Also fired on location change
      commit('busy', false, { root: true })
      return data
    } catch (err) {
      throw err
    }
  },
}
