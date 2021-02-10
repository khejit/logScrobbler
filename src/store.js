import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    tracks: [],
    loading: false,
    loadingProgress: null,
  }),
  mutations: {
    setTracks(state, tracks) {
      state.tracks = tracks;
    },
    setLoading(state, value) {
      state.loading = !!value
    },
    setLoadingProgress(state, value) {
      if (value === null) {
        state.loadingProgress = null;
      } else {
        state.loadingProgress = +(value);
      }
    }
  },
  actions: {
    setTracks({ commit }, tracks) {
      commit('setTracks', tracks)
    },
    setLoading({ commit, dispatch }, value) {
      commit('setLoading', value);
      if (value == false) {
        dispatch('resetLoadingProgress');
      }
    },
    setLoadingProgress({ commit }, value) {
      commit('setLoadingProgress', value)
    },
    resetLoadingProgress({ commit }) {
      commit('setLoadingProgress', null)
    },
  }
})
