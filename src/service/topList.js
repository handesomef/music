import { get } from './base'

export  const getTopList = ()=> get('/api/getTopList')

export const getTopDetail = (top)=> get('/api/getTopDetail',{
    id:top.id,
    period: top.period
})
