import { get } from './base'

export const getRecommend = () => get('/api/getRecommend')

export const getAlbum = (album) => get('/api/getAlbum', {
    id: album.id
})