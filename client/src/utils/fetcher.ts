import axios from 'axios'

console.log()

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BITMAX_API_URL,
})

export const fetcher = (url: string) =>
  axiosInstance.get(url).then(res => res.data)
