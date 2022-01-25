import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'

export default {
    selectPlay({ commit }, { list, index }) {
        commit('setPlayMode', PLAY_MODE.sequence)
        commit('setSequenceList', list)
        commit('setPlayingState', true)
        commit('setFullScreen', true)
        commit('setPlayList', list)
        commit('setCurrentIndex', index)
    },
    randomPlay({ commit }, list) {
        commit('setPlayMode', PLAY_MODE.random)
        commit('setSequenceList', list)
        commit('setPlayingState', true)
        commit('setFullScreen', true)
        commit('setPlayList', shuffle(list))
        commit('setCurrentIndex', 0)
    },
    setPlayMode({ commit, state, getters }, mode) {
        const currentId = getters.currentSong.id
        if (mode == PLAY_MODE.random) {
            commit('setPlayList', shuffle(state.sequenceList))
        } else {
            commit('setPlayList', state.sequenceList)
        }
        const index = state.playList.findIndex((song) => {
            return song.id == currentId
        })
        commit('setCurrentIndex', index)
        commit('setPlayMode', mode)
    },
    removeSong({ commit, state }, song) {

        const sequenceList = state.sequenceList.slice()
        const playList = state.playList.slice()

        const sequenceIndex = sequenceList.findIndex((item) => {
            return item.id === song.id
        })
        const playIndex = playList.findIndex((item) => {
            return item.id === song.id
        })

        if (sequenceIndex < 0 || playIndex < 0) {
            return
        }

        sequenceList.splice(sequenceIndex, 1)
        playList.splice(playIndex, 1)

        let currentIndex = state.currentIndex
        if (playIndex < currentIndex || currentIndex === playList.length) {
            currentIndex--
        }
        commit('setSequenceList', sequenceList)
        commit('setPlayList', playList)
        commit('setCurrentIndex', currentIndex)

        if (!playList.length) {
            commit('setPlayingState', false)
        }
    },

    clearSongList({ commit }) {
        commit('setSequenceList', [])
        commit('setPlayList', [])
        commit('setCurrentIndex', 0)
        commit('setPlayingState', false)
    },

    addSong({ commit, state }, song) {
        const playList = state.playList.slice()
        const sequenceList = state.sequenceList.slice()

        let currentIndex = state.currentIndex
        const playIndex = playList.findIndex((item) => {
            return item.id === song.id
        })

        if (playIndex > -1) {
            currentIndex = playIndex
        } else {
            playList.push(song)
            currentIndex = playList.length - 1
        }

        const sequenceIndex = sequenceList.findIndex((item) => {
            return item.id === song.id
        })
        if (sequenceIndex === -1) {
            sequenceList.push(song)
        }

        commit('setPlayList', playList)
        commit('setSequenceList', sequenceList)
        commit('setCurrentIndex', currentIndex)
        commit('setPlayingState', true)
        commit('setFullScreen', true)

    },
    setPlayHistory(state, songs) {
        state.playHistory = songs
    }
}