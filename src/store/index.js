import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: debug ? [createLogger()] : [],
  strict:debug
})
