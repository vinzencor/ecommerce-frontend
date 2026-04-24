import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: auto-refresh on 401 token expired
let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as typeof error.config & { _retry?: boolean }

    const is401 =
      error.response?.status === 401 &&
      (error.response?.data?.message as string | undefined)?.toLowerCase().includes('expired')

    if (is401 && !original._retry) {
      original._retry = true

      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        // No refresh token — clear auth and let the app handle redirect
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        return Promise.reject(error)
      }

      if (isRefreshing) {
        // Queue this request until the refresh completes
        return new Promise((resolve) => {
          refreshQueue.push((newToken: string) => {
            original.headers.Authorization = `Bearer ${newToken}`
            resolve(api(original))
          })
        })
      }

      isRefreshing = true
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        )
        const newAccessToken: string = data.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)
        if (data.data.refreshToken) {
          localStorage.setItem('refreshToken', data.data.refreshToken)
        }

        // Flush queue
        refreshQueue.forEach((cb) => cb(newAccessToken))
        refreshQueue = []

        original.headers.Authorization = `Bearer ${newAccessToken}`
        return api(original)
      } catch {
        // Refresh failed — clear auth
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        refreshQueue = []
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
