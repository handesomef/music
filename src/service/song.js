import { get } from './base'

export const processSongs = (songs) => {
    if (!songs.length) return songs
    return get('/api/getSongsUrl', {
        mid: songs.map((song) => {
            return song.mid
        })
    }).then((result) => {
        const map = result.map
        return songs.map((song) => {
            song.url = map[song.mid]
            return song
        }).filter((song) => {
            return song.url.indexOf('vkey') > -1
        })

    })
}

export const getLyric = (song) => {
    if (song.lyric) {
        return Promise.resolve(song.lyric)
    }
    const mid = song.mid

    return get('/api/getLyric', { mid }).then((result) => {
        const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
        return lyric
    })
}